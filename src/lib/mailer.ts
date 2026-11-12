// Server-side only: imported exclusively by the /api/quote route handler.
import { business } from "@/lib/business";
import type { QuoteCatalog, QuoteFields } from "@/lib/quote-validation";

export type Attachment = { filename: string; content: Buffer; contentType: string };

export function isMailerConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.QUOTE_TO_EMAIL);
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function renderHtml(f: QuoteFields, catalog: QuoteCatalog, attachments: Attachment[]): string {
  const rows: [string, string][] = [
    ["Name", f.name],
    ["Phone", f.phone],
    ["Email", f.email || "—"],
    ["Preferred contact", f.contactMethod],
    ["Customer type", f.customerType],
    ["Service category", catalog[f.category]?.name ?? "Other / not sure"],
    ["Specific service", f.service || "—"],
    ["Project location", f.location],
    ["Attachments", attachments.length ? attachments.map((a) => a.filename).join(", ") : "None"],
  ];
  return `<div style="font-family:Arial,sans-serif;color:#1a1a2e;max-width:640px">
  <h2 style="color:#1e3a5f;border-bottom:3px solid #f97316;padding-bottom:8px">New quote request</h2>
  <table style="border-collapse:collapse;width:100%">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;font-weight:bold;vertical-align:top;white-space:nowrap">${k}</td><td style="padding:6px 0">${escape(v)}</td></tr>`,
    )
    .join("")}</table>
  <h3 style="color:#1e3a5f">Project description</h3>
  <p style="white-space:pre-wrap;background:#f0f4f8;padding:12px;border-radius:6px">${escape(f.description)}</p>
</div>`;
}

/**
 * Sends the quote request by email using the Resend HTTP API (no SDK dependency).
 * Required env: RESEND_API_KEY, QUOTE_TO_EMAIL. Optional: QUOTE_FROM_EMAIL (a sender on a verified domain).
 */
export async function sendQuoteEmail(f: QuoteFields, catalog: QuoteCatalog, attachments: Attachment[]): Promise<void> {
  const from = process.env.QUOTE_FROM_EMAIL || `${business.name} Website <onboarding@resend.dev>`;
  const categoryName = catalog[f.category]?.name ?? "Other";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: process.env.QUOTE_TO_EMAIL!.split(",").map((s) => s.trim()),
      reply_to: f.email || undefined,
      subject: `Quote request: ${f.service || categoryName} – ${f.location} (${f.name})`,
      html: renderHtml(f, catalog, attachments),
      attachments: attachments.map((a) => ({ filename: a.filename, content: a.content.toString("base64") })),
    }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Email provider responded ${res.status}: ${detail.slice(0, 300)}`);
  }
}
