import Link from "next/link";
import { notFound } from "next/navigation";
import PhotoGallery from "@/components/PhotoGallery";
import UiIcon from "@/components/UiIcon";
import { QuoteCta, Visual } from "@/components/sections";
import { Breadcrumbs, FaqList, JsonLd } from "@/components/seo";
import { ButtonLink, CheckList, Container, Eyebrow, SectionHeading, WhatsAppButton } from "@/components/ui";
import { getPhoto, photosForCategory } from "@/data/portfolio";
import {
  categoryHref,
  getCategory,
  getServicePage,
  quoteHref,
  servicePageHref,
  servicePages,
  servicePagesFor,
} from "@/data/services";
import { absoluteUrl, business } from "@/lib/business";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((p) => ({ category: p.category, service: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[category]/[service]">) {
  const { category, service } = await params;
  const page = getServicePage(category, service);
  if (!page) return {};
  const photo = getPhoto(page.image);
  return pageMetadata({
    title: page.seoTitle,
    description: page.seoDescription,
    path: servicePageHref(page),
    image: photo ? { url: photo.src, width: photo.width, height: photo.height, alt: photo.alt } : undefined,
    keywords: [page.name, `${page.name} South Africa`, `${page.name} Southern Africa`, `${page.name} Gqeberha`],
  });
}

export default async function ServiceDetailPage({ params }: PageProps<"/services/[category]/[service]">) {
  const { category: categorySlug, service } = await params;
  const page = getServicePage(categorySlug, service);
  const category = getCategory(categorySlug);
  if (!page || !category) notFound();

  const siblings = servicePagesFor(category.slug).filter((p) => p.slug !== page.slug);
  const photos = photosForCategory(category.slug).filter((p) => p.slug !== page.image);
  const whatsappMessage = `Hi Hamile Engineering, I'd like a quote for ${page.name.toLowerCase()}.`;

  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <div aria-hidden="true" className="bg-blueprint absolute inset-0 opacity-50" />
        <Container className="relative grid items-center gap-10 py-12 md:py-16 lg:grid-cols-2">
          <div>
            <Breadcrumbs
              items={[
                { name: "Services", href: "/services" },
                { name: category.shortName, href: categoryHref(category.slug) },
                { name: page.name, href: servicePageHref(page) },
              ]}
            />
            <Eyebrow tone="dark">{category.name}</Eyebrow>
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">{page.h1}</h1>
            <p className="mt-5 text-lg leading-relaxed text-white/85">{page.intro[0]}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={quoteHref(category.slug, page.prefillService)} size="lg">
                Get a Quote for This Service <UiIcon name="arrow-right" />
              </ButtonLink>
              <WhatsAppButton size="lg" message={whatsappMessage} />
            </div>
          </div>
          <Visual
            photoSlug={page.image}
            icon={page.icon ?? category.icon}
            label={page.name}
            sizes="(min-width: 1024px) 50vw, 100vw"
            preload
            className="aspect-4/3 rounded-2xl shadow-2xl ring-1 ring-white/10"
          />
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {page.intro.slice(1).map((p) => (
              <p key={p} className="mb-8 text-lg leading-relaxed text-ink/75">
                {p}
              </p>
            ))}
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h2 className="mb-4 text-xl font-bold text-navy">What&apos;s included</h2>
                <CheckList items={page.includes} />
              </div>
              <div>
                <h2 className="mb-4 text-xl font-bold text-navy">Ideal for</h2>
                <CheckList items={page.idealFor} />
              </div>
            </div>

            <div className="mt-12 rounded-2xl bg-mist p-7">
              <h2 className="text-xl font-bold text-navy">What affects the cost?</h2>
              <p className="mt-2 text-ink/75">
                We don&apos;t publish fixed prices because every job is different. Your quotation is based on:
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {page.pricingFactors.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-ink/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-ink/70">
                Send photos and measurements with your request and we can usually give you a clearer quotation, faster.
              </p>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-32 rounded-2xl bg-navy p-7 text-white">
              <h2 className="text-xl font-bold">Request a quote for {page.name.toLowerCase()}</h2>
              <p className="mt-2 text-white/80">
                Serving {business.serviceAreaShort}. We respond {business.responseTime}.
              </p>
              <div className="mt-6 grid gap-3">
                <ButtonLink href={quoteHref(category.slug, page.prefillService)} size="lg">
                  Request a Quote
                </ButtonLink>
                <WhatsAppButton message={whatsappMessage} size="lg" />
                <a href={business.phoneHref} className="flex items-center justify-center gap-2 py-2 font-semibold text-white/90 hover:text-accent-soft">
                  <UiIcon name="phone" className="h-4 w-4" /> {business.phone}
                </a>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      {photos.length > 0 && (
        <section className="bg-mist py-16 md:py-20">
          <Container>
            <SectionHeading eyebrow="Our Work" title={`Related ${category.shortName.toLowerCase()} projects`} />
            <PhotoGallery photos={photos} limit={4} />
          </Container>
        </section>
      )}

      <section className="py-16 md:py-20">
        <Container className="max-w-4xl">
          <SectionHeading eyebrow="FAQ" title={`${page.name}: questions & answers`} />
          <FaqList faqs={[...page.faqs, ...category.faqs.slice(0, 2)]} />
        </Container>
      </section>

      <section className="border-t border-navy/10 bg-white py-14">
        <Container>
          <h2 className="mb-6 text-xl font-bold text-navy">Related services</h2>
          <ul className="flex flex-wrap gap-3">
            {siblings.map((p) => (
              <li key={p.slug}>
                <Link
                  href={servicePageHref(p)}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-navy ring-1 ring-navy/15 hover:bg-mist hover:text-accent-strong"
                >
                  {p.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={categoryHref(category.slug)}
                className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy-dark"
              >
                All {category.shortName.toLowerCase()} services <UiIcon name="arrow-right" className="h-4 w-4" />
              </Link>
            </li>
          </ul>
        </Container>
      </section>

      <QuoteCta
        title={`Get a quote for ${page.name.toLowerCase()}`}
        category={category.slug}
        service={page.prefillService}
        whatsappMessage={whatsappMessage}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: page.name,
          serviceType: page.name,
          description: page.seoDescription,
          url: absoluteUrl(servicePageHref(page)),
          category: category.name,
          provider: { "@id": absoluteUrl("/#business") },
          areaServed: business.serviceAreas.map((a) => ({ "@type": a.type, name: a.name })),
        }}
      />
    </>
  );
}
