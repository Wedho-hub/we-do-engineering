import QuoteForm from "@/components/QuoteForm";
import UiIcon, { type UiIconName } from "@/components/UiIcon";
import { PageHero } from "@/components/sections";
import { Breadcrumbs } from "@/components/seo";
import { CheckList, Container, WhatsAppButton } from "@/components/ui";
import { business } from "@/lib/business";
import { pageMetadata } from "@/lib/metadata";
import { quoteCatalog } from "@/lib/quote-catalog";

export const metadata = pageMetadata({
  title: "Request a Quote – Contact Us",
  description:
    "Request a quotation from Hamile Engineering — based in Gqeberha, working across South Africa and Southern Africa. Send project details and photos online, WhatsApp us or call for building, welding, pipe fitting, carpentry and maintenance work.",
  path: "/contact",
});

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const params = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

  // Prefill from ?service=<category-slug>&item=<service name> links on service pages (validated against the catalogue).
  const requestedCategory = one(params.service);
  const category = quoteCatalog[requestedCategory] ? requestedCategory : "";
  const requestedItem = one(params.item);
  const service = category && quoteCatalog[category].services.includes(requestedItem) ? requestedItem : "";

  const contacts: { icon: UiIconName; label: string; value: string; href?: string; external?: boolean }[] = [
    { icon: "phone", label: "Call us", value: business.phone, href: business.phoneHref },
    { icon: "mail", label: "Email", value: business.email, href: `mailto:${business.email}` },
    { icon: "pin", label: "Service area", value: business.serviceAreaShort },
    { icon: "clock", label: "Hours", value: business.hours },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Request a quote"
        intro={`Tell us about your project and we'll get back to you ${business.responseTime} with next steps and a no-obligation quotation.`}
      >
        <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />
      </PageHero>

      <section className="py-12 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div id="quote" className="order-1 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/10 sm:p-8 md:p-10 lg:order-2 lg:col-span-8">
            <QuoteForm key={`${category}|${service}`} catalog={quoteCatalog} initialCategory={category} initialService={service} />
          </div>

          <aside className="order-2 space-y-6 lg:order-1 lg:col-span-4">
            <div className="rounded-2xl bg-navy p-7 text-white">
              <h2 className="text-xl font-bold">Prefer WhatsApp?</h2>
              <p className="mt-2 text-sm text-white/80">
                Send us a message with photos of the job — it&apos;s often the quickest way to get started.
              </p>
              <WhatsAppButton variant="primary" size="lg" label="Chat on WhatsApp" className="mt-5 w-full" />
            </div>

            <div className="rounded-2xl bg-white p-7 ring-1 ring-navy/10">
              <h2 className="text-lg font-bold text-navy">Contact details</h2>
              <ul className="mt-5 space-y-4">
                {contacts.map((c) => (
                  <li key={c.label} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-strong">
                      <UiIcon name={c.icon} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold uppercase tracking-wider text-ink/60">{c.label}</span>
                      {c.href ? (
                        <a href={c.href} className="break-words font-semibold text-navy hover:text-accent-strong">
                          {c.value}
                        </a>
                      ) : (
                        <span className="block font-semibold text-navy">{c.value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-mist p-7">
              <h2 className="text-lg font-bold text-navy">For a faster, more accurate quote</h2>
              <div className="mt-4 text-sm">
                <CheckList
                  items={[
                    "Photos of the area or item",
                    "Approximate measurements or quantities",
                    "Drawings or specifications, if you have them",
                    "Your preferred timing",
                  ]}
                />
              </div>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
