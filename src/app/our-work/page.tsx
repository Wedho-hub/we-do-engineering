import PhotoGallery from "@/components/PhotoGallery";
import { PageHero, QuoteCta } from "@/components/sections";
import { Breadcrumbs, JsonLd } from "@/components/seo";
import { Container } from "@/components/ui";
import { galleryPhotos } from "@/data/portfolio";
import { categories } from "@/data/services";
import { absoluteUrl } from "@/lib/business";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Our Work – Project Gallery",
  description:
    "Photos of genuine Hamile Engineering projects: concrete slabs and foundations, paving, steel fabrication and welding, pipe fitting, fuel tank installations, timber decks and roof maintenance.",
  path: "/our-work",
});

export default function OurWorkPage() {
  // Only offer filters for categories that actually have photos.
  const filters = categories
    .filter((c) => galleryPhotos.some((p) => p.category === c.slug))
    .map((c) => ({ value: c.slug, label: c.shortName }));

  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Project gallery"
        intro="Every photo here is from our own sites and workshop. Filter by service and tap any project to view it larger."
      >
        <Breadcrumbs items={[{ name: "Our Work", href: "/our-work" }]} />
      </PageHero>

      <section className="py-14 md:py-20">
        <Container>
          <PhotoGallery photos={galleryPhotos} filters={filters} />
          <p className="mt-10 text-center text-sm text-ink/60">
            We&apos;re adding new projects regularly. Want to see examples of something specific? Ask us when you request a quote.
          </p>
        </Container>
      </section>

      <QuoteCta title="Like what you see?" text="Tell us about your project and we'll put the same care into your job." />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: "Hamile Engineering project gallery",
          url: absoluteUrl("/our-work"),
          image: galleryPhotos.map((p) => ({
            "@type": "ImageObject",
            contentUrl: absoluteUrl(p.src),
            name: p.title,
            description: p.description,
          })),
        }}
      />
    </>
  );
}
