import Link from "next/link";
import UiIcon from "@/components/UiIcon";
import { absoluteUrl, business } from "@/lib/business";
import type { Faq } from "@/data/services";

/** Renders JSON-LD safely (escapes "<" to prevent script injection, per Next.js guidance). */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** GeneralContractor (LocalBusiness subtype). Contact fields are only included once confirmed. */
export function businessJsonLd(): Record<string, unknown> {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": absoluteUrl("/#business"),
    name: business.name,
    // Former trading name, so existing searches and citations still resolve to this business.
    alternateName: "Hamile Contractors",
    slogan: business.tagline,
    description: business.description,
    knowsAbout: [
      "Building and civil construction",
      "Welding and steel fabrication",
      "Industrial pipe fitting",
      "Fuel storage tank fabrication and installation",
      "Renewable energy mechanical installations",
      "Carpentry",
      "Property maintenance and renovations",
    ],
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/hamile-contractors-logo.png"),
    image: absoluteUrl("/opengraph-image.png"),
    areaServed: business.serviceAreas.map((name) => ({ "@type": "City", name })),
    address: {
      "@type": "PostalAddress",
      addressLocality: business.city,
      addressRegion: business.region,
      addressCountry: business.country,
    },
  };
  if (business.contactDetailsConfirmed) {
    data.telephone = business.phone;
    data.email = business.email;
  }
  return data;
}

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items, tone = "dark" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className={`flex flex-wrap items-center gap-1.5 text-sm ${tone === "dark" ? "text-white/70" : "text-ink/60"}`}>
          {all.map((c, i) => (
            <li key={c.href} className="flex items-center gap-1.5">
              {i > 0 && <UiIcon name="chevron-right" className="h-3.5 w-3.5 opacity-60" />}
              {i === all.length - 1 ? (
                <span aria-current="page" className={tone === "dark" ? "text-white" : "text-navy"}>
                  {c.name}
                </span>
              ) : (
                <Link href={c.href} className={tone === "dark" ? "hover:text-accent-soft" : "hover:text-accent-strong"}>
                  {c.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: absoluteUrl(c.href),
          })),
        }}
      />
    </>
  );
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <>
      <div className="divide-y divide-navy/10 overflow-hidden rounded-xl border border-navy/10 bg-white">
        {faqs.map((f) => (
          <details key={f.question} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-navy hover:bg-mist [&::-webkit-details-marker]:hidden">
              {f.question}
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mist text-navy transition-transform group-open:rotate-180 group-open:bg-accent group-open:text-ink">
                <UiIcon name="chevron-down" className="h-4 w-4" />
              </span>
            </summary>
            <p className="px-5 pb-5 leading-relaxed text-ink/75">{f.answer}</p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />
    </>
  );
}
