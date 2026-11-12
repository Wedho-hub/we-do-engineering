/**
 * Quote request validation shared by the browser form and the /api/quote route handler.
 * Deliberately dependency-free (and free of path-alias imports) so it can be unit-tested
 * directly with `node --test`.
 */

export const CUSTOMER_TYPES = [
  "Homeowner",
  "Landlord / property owner",
  "Property management company",
  "Commercial business",
  "Building contractor / construction company",
  "Industrial company / maintenance department",
  "Property developer",
  "Other",
] as const;

export const CONTACT_METHODS = ["WhatsApp", "Phone call", "Email"] as const;

export const OTHER_CATEGORY = "other";

export const UPLOAD_LIMITS = {
  maxFiles: 5,
  /** Total request budget kept under typical serverless body limits (~4.5 MB on Vercel). */
  maxTotalBytes: 4 * 1024 * 1024,
  maxFileBytes: 4 * 1024 * 1024,
  /** Images are resized in the browser to this long-edge before upload. */
  imageMaxDimension: 1600,
  mimeTypes: ["image/jpeg", "image/png", "image/webp", "application/pdf"] as const,
  accept: ".jpg,.jpeg,.png,.webp,.heic,.heif,.pdf,image/*,application/pdf",
};

export type QuoteFields = {
  name: string;
  phone: string;
  email: string;
  customerType: string;
  category: string;
  service: string;
  location: string;
  description: string;
  contactMethod: string;
};

export type QuoteErrors = Partial<Record<keyof QuoteFields | "files", string>>;

/** The selectable service catalogue: category slug -> list of service names. */
export type QuoteCatalog = Record<string, { name: string; services: string[] }>;

export const EMPTY_QUOTE: QuoteFields = {
  name: "",
  phone: "",
  email: "",
  customerType: "",
  category: "",
  service: "",
  location: "",
  description: "",
  contactMethod: "WhatsApp",
};

const EMAIL_RE = /^[^\s@<>()]+@[^\s@<>()]+\.[^\s@<>()]{2,}$/;
const PHONE_CHARS_RE = /^[+\d\s()-]+$/;

export function normalise(input: Partial<Record<keyof QuoteFields, unknown>>): QuoteFields {
  const out = { ...EMPTY_QUOTE };
  for (const key of Object.keys(EMPTY_QUOTE) as (keyof QuoteFields)[]) {
    const v = input[key];
    out[key] = typeof v === "string" ? v.trim().replace(/\s+\n/g, "\n") : "";
  }
  return out;
}

export function validateQuote(
  fields: QuoteFields,
  catalog: QuoteCatalog,
): { ok: true; data: QuoteFields } | { ok: false; errors: QuoteErrors } {
  const errors: QuoteErrors = {};
  const f = fields;

  if (f.name.length < 2) errors.name = "Please enter your full name.";
  else if (f.name.length > 100) errors.name = "Name is too long.";

  const digits = f.phone.replace(/\D/g, "");
  if (!f.phone) errors.phone = "Please enter a phone number so we can reach you.";
  else if (!PHONE_CHARS_RE.test(f.phone) || digits.length < 9 || digits.length > 15)
    errors.phone = "Please enter a valid phone number, e.g. 082 123 4567.";

  if (f.email) {
    if (f.email.length > 254 || !EMAIL_RE.test(f.email)) errors.email = "Please enter a valid email address.";
  } else if (f.contactMethod === "Email") {
    errors.email = "Please enter your email address, as you prefer to be contacted by email.";
  }

  if (!(CUSTOMER_TYPES as readonly string[]).includes(f.customerType))
    errors.customerType = "Please tell us what type of customer you are.";

  const category = catalog[f.category];
  if (!category && f.category !== OTHER_CATEGORY) errors.category = "Please choose a service category.";
  if (f.service) {
    if (!category || !category.services.includes(f.service)) errors.service = "Please choose a service from the list.";
  }

  if (f.location.length < 2) errors.location = "Please tell us where the project is (suburb or town).";
  else if (f.location.length > 120) errors.location = "Location is too long.";

  if (f.description.length < 10) errors.description = "Please describe the work you need (at least a sentence).";
  else if (f.description.length > 3000) errors.description = "Please keep the description under 3000 characters.";

  if (!(CONTACT_METHODS as readonly string[]).includes(f.contactMethod))
    errors.contactMethod = "Please choose how you'd like us to contact you.";

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data: f };
}

export type UploadMeta = { name: string; size: number; type: string };

/** Size / count / declared-type checks. The server additionally verifies file signatures. */
export function validateUploads(files: UploadMeta[]): string | null {
  if (files.length > UPLOAD_LIMITS.maxFiles) return `Please attach no more than ${UPLOAD_LIMITS.maxFiles} files.`;
  let total = 0;
  for (const file of files) {
    if (!(UPLOAD_LIMITS.mimeTypes as readonly string[]).includes(file.type))
      return `"${file.name}" isn't a supported file type. Please use JPG, PNG, WebP or PDF.`;
    if (file.size === 0) return `"${file.name}" appears to be empty.`;
    if (file.size > UPLOAD_LIMITS.maxFileBytes) return `"${file.name}" is too large (max 4 MB per file).`;
    total += file.size;
  }
  if (total > UPLOAD_LIMITS.maxTotalBytes) return "Your attachments are too large in total (max 4 MB). Please remove a file.";
  return null;
}

/** Detects the real file type from its first bytes, ignoring the client-declared MIME type. */
export function sniffFileType(bytes: Uint8Array): (typeof UPLOAD_LIMITS.mimeTypes)[number] | null {
  const b = bytes;
  if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "image/jpeg";
  if (b.length >= 8 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 && b[4] === 0x0d && b[5] === 0x0a && b[6] === 0x1a && b[7] === 0x0a)
    return "image/png";
  if (
    b.length >= 12 &&
    b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 &&
    b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50
  )
    return "image/webp";
  if (b.length >= 5 && b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46 && b[4] === 0x2d) return "application/pdf";
  return null;
}

/** Makes a filename safe for email attachments. */
export function safeFilename(name: string, index: number, type: string): string {
  const ext = type === "application/pdf" ? "pdf" : type.split("/")[1].replace("jpeg", "jpg");
  const base = name
    .replace(/\.[^.]*$/, "")
    .replace(/[^\w.-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${base || `attachment-${index + 1}`}.${ext}`;
}

/** Plain-text summary used for the WhatsApp fallback message. */
export function quoteSummary(f: QuoteFields, catalog: QuoteCatalog): string {
  const cat = catalog[f.category]?.name ?? "Other";
  return [
    "Hi Hamile Engineering, I'd like a quote.",
    `Name: ${f.name}`,
    `Customer type: ${f.customerType}`,
    `Service: ${cat}${f.service ? ` – ${f.service}` : ""}`,
    `Location: ${f.location}`,
    `Details: ${f.description}`,
  ].join("\n");
}
