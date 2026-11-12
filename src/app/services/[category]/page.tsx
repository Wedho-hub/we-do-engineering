import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import PhotoGallery from "@/components/PhotoGallery";
import UiIcon from "@/components/UiIcon";
import { QuoteCta, Visual } from "@/components/sections";
import { Breadcrumbs, FaqList, JsonLd } from "@/components/seo";
import { ButtonLink, CheckList, Container, Eyebrow, SectionHeading, WhatsAppButton } from "@/components/ui";
import { getPhoto, photosForCategory } from "@/data/portfolio";
import {
  categories,
  categoryHref,
  getCategory,
  quoteHref,
  servicePageHref,
  servicePagesFor,
} from "@/data/services";
import { absoluteUrl, business } from "@/lib/business";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[category]">) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  const photo = getPhoto(category.image);
  return pageMetadata({
    title: category.seoTitle,
    description: category.seoDescription,
    path: categoryHref(category.slug),
    image: photo ? { url: photo.src, width: photo.width, height: photo.height, alt: photo.alt } : undefined,
    keywords: [category.name, `${category.name} South Africa`, `${category.name} Southern Africa`, `${category.name} Gqeberha`],
  });
}

export default async function CategoryPage({ params }: PageProps<"/services/[category]">) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const pages = servicePagesFor(category.slug);
  const photos = photosForCategory(category.slug);
  const others = categories.filter((c) => c.slug !== category.slug);

  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <div aria-hidden="true" className="bg-blueprint absolute inset-0 opacity-50" />
        <Container className="relative grid items-center gap-10 py-12 md:py-16 lg:grid-cols-2">
          <div>
            <Breadcrumbs items={[{ name: "Services", href: "/services" }, { name: category.name, href: categoryHref(category.slug) }]} />
            <Eyebrow tone="dark">Serving {business.serviceAreaShort}</Eyebrow>
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">{category.name}</h1>
            <p className="mt-5 text-lg leading-relaxed text-white/85">{category.intro[0]}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={quoteHref(category.slug)} size="lg">
                Request a Quote <UiIcon name="arrow-right" />
              </ButtonLink>
              <WhatsAppButton size="lg" message={`Hi Hamile Engineering, I'd like a quote for ${category.name.toLowerCase()}.`} />
            </div>
          </div>
          <Visual
            photoSlug={category.image}
            icon={category.icon}
            label={category.name}
            sizes="(min-width: 1024px) 50vw, 100vw"
            preload
            className="aspect-4/3 rounded-2xl shadow-2xl ring-1 ring-white/10"
          />
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-extrabold text-navy md:text-3xl">What we do</h2>
            {category.intro.slice(1).map((p) => (
              <p key={p} className="mt-4 text-lg leading-relaxed text-ink/75">
                {p}
              </p>
            ))}
            <h3 className="mt-10 text-lg font-bold text-navy">Services include</h3>
            <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {category.services.map((s) => (
                <li key={s}>
                  <Link
                    href={quoteHref(category.slug, s)}
                    className="group flex items-center gap-2.5 text-ink/80 hover:text-accent-strong"
                    title={`Request a quote for ${s.toLowerCase()}`}
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <aside className="lg:col-span-5">
            <div className="rounded-2xl bg-white p-7 ring-1 ring-navy/10">
              <h2 className="text-lg font-bold text-navy">Who we work with</h2>
              <div className="mt-4">
                <CheckList items={category.audiences} />
              </div>
              <div className="mt-7 rounded-xl bg-mist p-5">
                <p className="font-bold text-navy">Get a faster, more accurate quote</p>
                <p className="mt-1 text-sm text-ink/70">
                  Attach photos, measurements or drawings to your request — or send them on WhatsApp.
                </p>
                <ButtonLink href={quoteHref(category.slug)} className="mt-4 w-full">
                  Start your quote request
                </ButtonLink>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      {pages.length > 0 && (
        <section className="bg-white py-16 md:py-20">
          <Container>
            <SectionHeading eyebrow="Popular Services" title={`${category.shortName} services in detail`} />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pages.map((p) => (
                <Link
                  key={p.slug}
                  href={servicePageHref(p)}
                  className="group flex flex-col rounded-2xl border border-navy/10 bg-surface p-6 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lg"
                >
                  <h3 className="text-lg font-bold text-navy group-hover:text-accent-strong">{p.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{p.seoDescription}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-navy">
                    Learn more <UiIcon name="arrow-right" className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {photos.length > 0 && (
        <section className="bg-mist py-16 md:py-20">
          <Container>
            <SectionHeading
              eyebrow="Our Work"
              title={`${category.shortName} projects`}
              intro="Genuine photographs of our work. Tap any photo to view it larger."
            />
            <PhotoGallery photos={photos} limit={8} />
            <div className="mt-8 text-center">
              <ButtonLink href="/our-work" variant="outline-dark">
                View the full portfolio
              </ButtonLink>
            </div>
          </Container>
        </section>
      )}

      <section className="py-16 md:py-20">
        <Container className="max-w-4xl">
          <SectionHeading eyebrow="FAQ" title={`${category.shortName} – common questions`} />
          <FaqList faqs={category.faqs} />
        </Container>
      </section>

      <section className="border-t border-navy/10 bg-white py-14">
        <Container>
          <h2 className="mb-6 text-xl font-bold text-navy">Other services</h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((c) => (
              <li key={c.slug}>
                <Link
                  href={categoryHref(c.slug)}
                  className="flex h-full items-center gap-3 rounded-xl p-3 text-sm font-semibold text-navy ring-1 ring-navy/10 hover:bg-mist hover:text-accent-strong"
                >
                  <Icon name={c.icon} className="h-5 w-5 text-accent" />
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <QuoteCta
        title={`Need ${category.shortName.toLowerCase()} work done?`}
        category={category.slug}
        whatsappMessage={`Hi Hamile Engineering, I'd like a quote for ${category.name.toLowerCase()}.`}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: category.name,
          serviceType: category.name,
          description: category.seoDescription,
          url: absoluteUrl(categoryHref(category.slug)),
          provider: { "@id": absoluteUrl("/#business") },
          areaServed: business.serviceAreas.map((a) => ({ "@type": a.type, name: a.name })),
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: category.name,
            itemListElement: category.services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } })),
          },
        }}
      />
    </>
  );
}
