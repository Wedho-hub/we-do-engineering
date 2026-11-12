import { NextResponse, type NextRequest } from "next/server";
import { quoteCatalog } from "@/lib/quote-catalog";
import {
  normalise,
  safeFilename,
  sniffFileType,
  UPLOAD_LIMITS,
  validateQuote,
  validateUploads,
  type QuoteFields,
} from "@/lib/quote-validation";
import { isMailerConfigured, sendQuoteEmail, type Attachment } from "@/lib/mailer";

export const runtime = "nodejs";

// Best-effort, per-instance rate limiting (5 requests / 10 minutes per IP).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_REQUESTS;
}

const json = (body: unknown, status = 200) => NextResponse.json(body, { status });

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.startsWith("multipart/form-data")) {
    return json({ ok: false, message: "Unsupported request format." }, 415);
  }

  // Reject oversized bodies before parsing (allowance for form fields + multipart overhead).
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > UPLOAD_LIMITS.maxTotalBytes + 256 * 1024) {
    return json({ ok: false, message: "Your attachments are too large in total (max 4 MB)." }, 413);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return json({ ok: false, message: "Too many requests. Please try again later or contact us on WhatsApp." }, 429);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, message: "We couldn't read your submission. Please try again." }, 400);
  }

  // Honeypot: real users never fill this hidden field. Pretend success for bots.
  if (String(form.get("company_website") ?? "").length > 0) {
    return json({ ok: true });
  }

  const raw: Partial<Record<keyof QuoteFields, unknown>> = {};
  for (const key of ["name", "phone", "email", "customerType", "category", "service", "location", "description", "contactMethod"] as const) {
    raw[key] = form.get(key);
  }
  const result = validateQuote(normalise(raw), quoteCatalog);
  if (!result.ok) return json({ ok: false, errors: result.errors }, 400);

  const files = form.getAll("files").filter((v): v is File => typeof v !== "string" && v.size > 0);
  const uploadError = validateUploads(files.map((f) => ({ name: f.name, size: f.size, type: f.type })));
  if (uploadError) return json({ ok: false, errors: { files: uploadError } }, 400);

  const attachments: Attachment[] = [];
  for (const [i, file] of files.entries()) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const detected = sniffFileType(buffer.subarray(0, 16));
    if (!detected || detected !== file.type) {
      return json({ ok: false, errors: { files: `"${file.name}" doesn't look like a valid JPG, PNG, WebP or PDF file.` } }, 400);
    }
    attachments.push({ filename: safeFilename(file.name, i, detected), content: buffer, contentType: detected });
  }

  if (!isMailerConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[quote] Email not configured — logging submission instead:", {
        ...result.data,
        attachments: attachments.map((a) => `${a.filename} (${a.content.length} bytes)`),
      });
      return json({ ok: true, dev: true });
    }
    console.error("[quote] RESEND_API_KEY / QUOTE_TO_EMAIL not configured; quote request could not be delivered.");
    return json({ ok: false, fallback: true, message: "Our online form is temporarily unavailable." }, 503);
  }

  try {
    await sendQuoteEmail(result.data, quoteCatalog, attachments);
  } catch (err) {
    console.error("[quote] Failed to send quote email:", err);
    return json({ ok: false, fallback: true, message: "We couldn't send your request just now." }, 502);
  }

  return json({ ok: true });
}
