/**
 * Single source of truth for Hamile Engineering business details.
 *
 * Contact details are read from environment variables so they can be set per deployment
 * (e.g. in Vercel project settings) without code changes. See `.env.example`.
 *
 * IMPORTANT: the fallback values below are PLACEHOLDERS. Until real values are configured,
 * `contactDetailsConfirmed` is false and the phone/email/address are left out of the
 * structured data (JSON-LD) so search engines are never given unverified information.
 */

const PLACEHOLDER_PHONE = "+27 00 000 0000";
const PLACEHOLDER_WHATSAPP = "27000000000";
const PLACEHOLDER_EMAIL = "info@example.co.za";

const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE?.trim() || PLACEHOLDER_PHONE;
const whatsapp = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || PLACEHOLDER_WHATSAPP).replace(/\D/g, "");
const email = process.env.NEXT_PUBLIC_BUSINESS_EMAIL?.trim() || PLACEHOLDER_EMAIL;

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const business = {
  name: "Hamile Engineering",
  legalName: "Hamile Engineering",
  tagline: "Building. Fabricating. Maintaining. Delivering.",
  description:
    "Multi-trade contractor providing building and civil construction, welding and steel fabrication, industrial pipe fitting, fuel storage tank fabrication and installation, renewable energy mechanical installations, carpentry, property maintenance and renovations.",
  siteUrl: resolveSiteUrl(),

  phone,
  phoneHref: `tel:${phone.replace(/[^\d+]/g, "")}`,
  whatsapp,
  email,

  /** Primary city used for local SEO copy. */
  city: "Gqeberha",
  region: "Eastern Cape",
  country: "ZA",
  /**
   * Areas served, confirmed by the owner: the whole of South Africa and the wider
   * Southern African region, from the Gqeberha base. These drive page copy and structured data.
   */
  serviceAreas: [
    { name: "South Africa", type: "Country" },
    { name: "Southern Africa", type: "Place" },
  ],
  /** Short label for badges and inline copy. */
  serviceAreaShort: "South Africa & Southern Africa",
  /** Sentence-style label for body copy. */
  serviceAreaLabel: "the whole of South Africa and the wider Southern African region",

  hours: "Mon – Fri: 07:00 – 17:00",
  responseTime: "within one business day",

  contactDetailsConfirmed:
    phone !== PLACEHOLDER_PHONE && whatsapp !== PLACEHOLDER_WHATSAPP && email !== PLACEHOLDER_EMAIL,
} as const;

/** Website developer credit shown in the footer. */
export const developer = {
  name: "Tishbite",
  url: "https://tishbitedigital.co.za",
} as const;

/** Builds a WhatsApp click-to-chat link with an optional prefilled message. */
export function whatsappLink(message?: string): string {
  const text = message ?? `Hi ${business.name}, I'd like to request a quote.`;
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function absoluteUrl(path = "/"): string {
  return `${business.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
