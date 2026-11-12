import Link from "next/link";
import Icon from "@/components/Icon";
import UiIcon from "@/components/UiIcon";
import { CategoryCard, DeliveryModel, PageHero, ProcessSteps, QuoteCta } from "@/components/sections";
import { Breadcrumbs } from "@/components/seo";
import { Container, SectionHeading } from "@/components/ui";
import { categories, categoryHref, servicePageHref, servicePagesFor } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contractor Services in Gqeberha",
  description:
    "All Hamile Engineering services: building and civil construction, welding and steel fabrication, industrial pipe fitting, fuel storage and energy infrastructure, carpentry, maintenance and renovations.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Construction, fabrication and maintenance services"
        intro="Seven trade disciplines under one contractor, available individually or bundled together. Find the service you need below, or request a quote and we'll point you in the right direction."
      >
        <Breadcrumbs items={[{ name: "Services", href: "/services" }]} />
      </PageHero>

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <CategoryCard key={c.slug} category={c} />
            ))}
          </div>
        </Container>
      </section>

      {/* Full A–Z of services per category for quick scanning and internal linking */}
      <section className="bg-white py-16 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="Service Directory"
            title="Everything we do, at a glance"
            intro="Popular services have their own pages with more detail — look for the arrow links."
          />
          <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => {
              const pages = servicePagesFor(c.slug);
              return (
                <div key={c.slug}>
                  <h2 className="flex items-center gap-3 text-lg font-bold text-navy">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-accent">
                      <Icon name={c.icon} className="h-5 w-5" />
                    </span>
                    <Link href={categoryHref(c.slug)} className="hover:text-accent-strong">
                      {c.name}
                    </Link>
                  </h2>
                  {pages.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {pages.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={servicePageHref(p)}
                            className="group inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-accent-strong"
                          >
                            <UiIcon name="arrow-right" className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5" />
                            {p.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="mt-4 text-sm leading-relaxed text-ink/65">{c.services.join(" · ")}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="How We Deliver"
            title="Individual services or bundled packages"
            intro="Hire us for one specialised trade, or bundle several into one coordinated project with our crews working simultaneously."
          />
          <DeliveryModel />
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20">
        <Container>
          <SectionHeading eyebrow="How It Works" title="How we work" intro="Simple, professional and transparent from start to finish." />
          <ProcessSteps />
        </Container>
      </section>

      <QuoteCta title="Not sure which service you need?" text="Describe the problem or project and we'll tell you how we can help — no obligation." />
    </>
  );
}
