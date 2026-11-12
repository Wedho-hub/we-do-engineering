import Image from "next/image";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import UiIcon from "@/components/UiIcon";
import { CategoryCard, DeliveryModel, ProcessSteps, QuoteCta } from "@/components/sections";
import { FaqList } from "@/components/seo";
import { ButtonLink, CheckList, Container, SectionHeading } from "@/components/ui";
import { featuredPhotos, getPhoto } from "@/data/portfolio";
import { categories, categoryHref, servicePageHref, servicePages, type Faq } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { business } from "@/lib/business";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Hamile Engineering | Building, Welding & Maintenance Contractors in Gqeberha",
  description:
    "Building and civil construction, welding and steel fabrication, industrial pipe fitting, fuel storage tank fabrication and installation, carpentry, maintenance and renovations in Gqeberha.",
  path: "/",
  absoluteTitle: true,
});

const trust: { icon: IconName; title: string; text: string }[] = [
  { icon: "tools", title: "Individual or bundled", text: "Hire one specialist trade, or bundle building, steel, pipework, fuel systems and more." },
  { icon: "industry", title: "Residential to industrial", text: "Homes, rentals, commercial premises and industrial sites." },
  { icon: "gear", title: "Workshop & on-site", text: "Fabrication in the workshop, installation and repairs on site." },
  { icon: "handshake", title: "Clear quotations", text: `No-obligation quotes, with a response ${business.responseTime}.` },
];

const reasons: { icon: IconName; title: string; text: string }[] = [
  { icon: "hard-hat", title: "Experienced, qualified artisans", text: "Qualified tradespeople who are talented in their fields and take pride in work that is level, square, secure and built to last." },
  { icon: "team", title: "Hands-on, multiskilled managers", text: "Our managers understand every trade on site and lead the work in person, so decisions are made quickly and correctly." },
  { icon: "blueprint", title: "Accurate blueprint interpretation", text: "We read engineering drawings and specifications accurately and build to them, without guesswork." },
  { icon: "gear", title: "Simultaneous multi-trade operations", text: "Civil, steel, pipework and mechanical crews work in parallel under one plan, which shortens programmes." },
  { icon: "stopwatch", title: "On time, with precision", text: "We plan properly, deliver to the agreed programme and get it right the first time." },
  { icon: "calendar", title: "Reliable communication", text: "We confirm scope, timing and access upfront, and keep you updated while the work is underway." },
];

const sectors: { title: string; icon: IconName; text: string; who: string[]; links: string[] }[] = [
  {
    title: "Residential",
    icon: "home-repair",
    text: "For homeowners and landlords who want one dependable contractor for building work, decks, gates, repairs and renovations.",
    who: ["Homeowners", "Landlords & property owners", "Property management companies"],
    links: ["paving-driveways", "wooden-decking", "steel-gates-burglar-bars", "handyman-services", "bathroom-renovations"],
  },
  {
    title: "Commercial",
    icon: "handshake",
    text: "For businesses, developers and contractors who need capable teams for slabs, paving, steelwork and maintenance — on schedule.",
    who: ["Commercial businesses", "Property developers", "Building & construction contractors"],
    links: ["concrete-slabs-foundations", "building-extensions", "carports-steel-structures", "renewable-energy-mechanical-installations", "roof-repairs-waterproofing"],
  },
  {
    title: "Industrial",
    icon: "industry",
    text: "For plants, fuel sites and maintenance departments that need pipe fitting, tank fabrication, fuel systems and shutdown support done safely.",
    who: ["Industrial companies", "Maintenance departments", "Construction companies"],
    links: ["industrial-pipe-fitting", "above-ground-fuel-tank-fabrication", "fuel-storage-dispensing-installation", "fuel-infrastructure-decommissioning", "industrial-maintenance-shutdowns"],
  },
];

const faqs: Faq[] = [
  {
    question: "What services does Hamile Engineering offer?",
    answer:
      "We offer building and civil construction, welding and steel fabrication, industrial pipe fitting and mechanical services, fuel storage and energy infrastructure (above-ground tank fabrication, fuel system installation, maintenance and decommissioning, and renewable energy mechanical installations), carpentry and woodwork, property maintenance and handyman services, and renovations. You can hire us for one specialised service or bundle several together.",
  },
  {
    question: "Which areas do you serve?",
    answer: `We are based in ${business.city} and serve ${business.serviceAreas.join(" and ")}. For projects further afield, send us the details and we will let you know if we can help.`,
  },
  {
    question: "How do I get a quotation?",
    answer:
      "Use the quote request form, WhatsApp or call us. Include photos, measurements and the project location if you can — it helps us quote accurately and quickly.",
  },
  {
    question: "How much will my project cost?",
    answer:
      "Every job is different, so we price each one on its scope, materials, access and timing. Once we understand the work, you receive a clear, no-obligation quotation before anything starts.",
  },
  {
    question: "Do you work for businesses and industrial clients as well as homeowners?",
    answer:
      "Yes. We work with homeowners, landlords, property managers, commercial businesses, building contractors, property developers and industrial maintenance departments.",
  },
];

export default function HomePage() {
  const hero = getPhoto("concrete-slab-pour-screeding")!;
  const team = getPhoto("team-on-site-concrete-pour")!;
  const categoryNames = Object.fromEntries(categories.map((c) => [c.slug, c.shortName]));
  const pageBySlug = Object.fromEntries(servicePages.map((p) => [p.slug, p]));

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-navy-dark text-white">
        <Image
          src={hero.src}
          alt=""
          fill
          preload
          sizes="100vw"
          className="-z-10 object-cover object-[50%_35%] opacity-45"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-navy-dark via-navy-dark/85 to-navy/40" />
        <Container className="py-20 md:py-28 lg:py-32">
          <div className="animate-fade-up max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/15 px-4 py-1.5 text-sm font-semibold text-accent-soft">
              <UiIcon name="pin" className="h-4 w-4" />
              Multi-trade contractors in {business.city}
            </p>
            <h1 className="text-4xl font-extrabold uppercase leading-[1.05] sm:text-5xl lg:text-6xl">
              Building. Fabricating. Maintaining. <span className="text-accent">Delivering.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
              Professional building, civil construction, welding, steel fabrication, industrial pipe fitting, fuel storage
              infrastructure, carpentry and property maintenance. Individual trades or bundled, run simultaneously and
              delivered on time.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact#quote" size="lg" className="uppercase tracking-wide">
                Request a Quote <UiIcon name="arrow-right" />
              </ButtonLink>
              <ButtonLink href="#our-work" variant="outline-light" size="lg" className="uppercase tracking-wide">
                Explore Our Work
              </ButtonLink>
            </div>
          </div>

          {/* Quick service finder */}
          <nav aria-label="Find a service" className="mt-14">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/70">What do you need?</p>
            <ul className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={categoryHref(c.slug)}
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-accent hover:text-ink"
                  >
                    <Icon name={c.icon} className="h-4 w-4" />
                    {c.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      {/* Trust indicators */}
      <section aria-label="Why customers choose us" className="border-b border-navy/10 bg-white">
        <Container>
          <ul className="grid grid-cols-1 divide-y divide-navy/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {trust.map((t) => (
              <li key={t.title} className="flex items-start gap-4 py-6 lg:px-6 lg:first:pl-0">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-strong">
                  <Icon name={t.icon} className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-bold text-navy">{t.title}</span>
                  <span className="mt-0.5 block text-sm text-ink/70">{t.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Services overview */}
      <section className="py-16 md:py-24" id="services">
        <Container>
          <SectionHeading
            eyebrow="Our Services"
            title="One contractor for building, steel, pipework, fuel systems, timber and maintenance"
            intro="Choose a service to see exactly what's included — or request a quote and tell us what you need."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <CategoryCard key={c.slug} category={c} />
            ))}
          </div>
        </Container>
      </section>

      {/* Delivery model */}
      <section className="bg-navy py-16 text-white md:py-24">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="How We Deliver"
            title="Individual services or bundled packages"
            intro="Choose a single specialised service, or bundle several trades together. Either way, the work is managed by hands-on people and delivered on time."
          />
          <DeliveryModel tone="dark" />
        </Container>
      </section>

      {/* Our work */}
      <section id="our-work" className="bg-mist py-16 md:py-24">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              align="left"
              eyebrow="Our Work"
              title="Real projects, real workmanship"
              intro="Genuine photographs from our sites and workshop — concrete, paving, steel fabrication, pipe fitting, fuel tank installations, decking and maintenance."
            />
            <ButtonLink href="/our-work" variant="outline-dark" className="mb-10 self-start md:mb-14 md:self-auto">
              View full portfolio <UiIcon name="arrow-right" className="h-4 w-4" />
            </ButtonLink>
          </div>
          <FeaturedCarousel photos={featuredPhotos} categoryNames={categoryNames} />
        </Container>
      </section>

      {/* Why choose */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="relative lg:col-span-5">
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl">
                <Image
                  src={team.src}
                  alt={team.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-2 max-w-[16rem] rounded-xl bg-navy p-5 text-white shadow-xl sm:-right-6">
                <p className="font-display text-lg font-extrabold">Concrete, steel, pipe and timber.</p>
                <p className="mt-1 text-sm text-white/80">Multiple trades running at once, coordinated by one team.</p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <SectionHeading
                align="left"
                eyebrow="Why Hamile Engineering"
                title="Why choose Hamile Engineering"
                intro="We are a hands-on, multi-trade team of experienced, qualified artisans led by managers who work on site. That means precise work, delivered on time, with fewer contractors to manage."
              />
              <ul className="grid gap-5 sm:grid-cols-2">
                {reasons.map((r) => (
                  <li key={r.title} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy text-accent">
                      <Icon name={r.icon} className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-bold text-navy">{r.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-ink/70">{r.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Residential / commercial / industrial */}
      <section className="bg-navy py-16 text-white md:py-24">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="Who We Work With"
            title="Residential, commercial and industrial solutions"
            intro="The same standard of workmanship, whether it's a family home, a business premises or an industrial plant."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {sectors.map((s) => (
              <article key={s.title} className="flex flex-col rounded-2xl bg-white/5 p-7 ring-1 ring-white/10">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-ink">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-2xl font-bold">{s.title}</h3>
                <p className="mt-3 text-white/80">{s.text}</p>
                <div className="mt-5">
                  <CheckList items={s.who} tone="dark" />
                </div>
                <ul className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                  {s.links.map((slug) => {
                    const p = pageBySlug[slug];
                    return (
                      <li key={slug}>
                        <Link
                          href={servicePageHref(p)}
                          className="inline-block rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-accent hover:text-ink"
                        >
                          {p.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="How It Works"
            title="How our process works"
            intro="Simple, transparent and professional from your first message to the final walk-through."
          />
          <ProcessSteps />
        </Container>
      </section>

      {/* Testimonials — shown only when genuine testimonials have been added in src/data/testimonials.ts */}
      {testimonials.length > 0 && (
        <section className="bg-mist py-16 md:py-24">
          <Container>
            <SectionHeading eyebrow="Testimonials" title="What our customers say" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <figure key={t.name + t.quote.slice(0, 20)} className="rounded-2xl bg-white p-7 ring-1 ring-navy/10">
                  <blockquote className="leading-relaxed text-ink/80">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-5 font-bold text-navy">
                    {t.name}
                    {t.context && <span className="block text-sm font-normal text-ink/60">{t.context}</span>}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-mist py-16 md:py-24">
        <Container className="max-w-4xl">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
          <FaqList faqs={faqs} />
        </Container>
      </section>

      <QuoteCta />
    </>
  );
}
