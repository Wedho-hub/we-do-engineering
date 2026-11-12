import Image from "@/components/Photo";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { DeliveryModel, PageHero, ProcessSteps, QuoteCta } from "@/components/sections";
import { Breadcrumbs } from "@/components/seo";
import { CheckList, Container, SectionHeading } from "@/components/ui";
import { getPhoto } from "@/data/portfolio";
import { categories, categoryHref } from "@/data/services";
import { business } from "@/lib/business";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About Us – Multi-Trade Contractors",
  description:
    "About Hamile Engineering: a hands-on, multi-trade team delivering building, steel fabrication, pipe fitting, fuel storage infrastructure, carpentry, maintenance and renovation work across South Africa and Southern Africa.",
  path: "/about",
});

const values: { icon: IconName; title: string; description: string }[] = [
  { icon: "tools", title: "Workmanship", description: "We take pride in work that is done properly — prepared well, built to last and finished neatly." },
  { icon: "handshake", title: "Reliability", description: "We show up when we say we will, communicate clearly and tell you early if anything changes." },
  { icon: "blueprint", title: "Problem solving", description: "We diagnose before we fix, and recommend practical solutions that suit the job and the budget." },
  { icon: "hard-hat", title: "Safety", description: "We plan work to keep our team, your people and your property safe on site." },
];

// Evidence drawn from the project photographs in our portfolio.
const experience = [
  "Commercial concrete slabs — reinforcement, pouring and screeding",
  "Paving and site works at service-station construction sites",
  "Above-ground fuel tank and dispenser installations",
  "Underground fuel tanks, sumps, fuel lines and dispenser pipework",
  "Fuel dispenser servicing and forecourt upgrades",
  "Flanged and underground pipework, including work at height",
  "Workshop fabrication: steel frames, stands, tanks and security cages",
  "On-site welding",
  "Timber decks, garden steps and timber-clad doors",
  "Roof cleaning and property maintenance",
];

export default function AboutPage() {
  const site = getPhoto("excavation-site-works-team")!;
  const workshop = getPhoto("workshop-steel-fabrication-assembly")!;

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A hands-on, multi-trade contracting team"
        intro="Hamile Engineering brings building, steel, pipework, timber and maintenance skills together — so customers get one dependable contractor instead of several."
      >
        <Breadcrumbs items={[{ name: "About", href: "/about" }]} />
      </PageHero>

      <section className="py-16 md:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="Who We Are" title="Practical skills across the trades" />
            <div className="space-y-4 text-lg leading-relaxed text-ink/75">
              <p>
                We are a {business.city}-based contractor working across South Africa and the wider region on homes, commercial properties, construction sites and
                industrial facilities. Our team works across concrete and civil works, welding and steel fabrication,
                industrial pipe fitting, fuel storage and dispensing infrastructure, renewable energy mechanical
                installations, carpentry, maintenance and renovations.
              </p>
              <p>
                That range matters. Real projects rarely stay inside one trade — a new gate needs a wall, a tank needs a
                base and pipework, a renovation needs building, carpentry and tiling. Because we cover these trades
                ourselves, you deal with one team that takes responsibility for the whole job. We can run several trades
                at the same time on one site, or you can hire us for a single specialised service.
              </p>
              <p>
                Our artisans are experienced, qualified and talented in their fields, and our managers are multiskilled
                and hands-on. They interpret engineering blueprints accurately and stay on site to make sure the work is
                done with precision and delivered on time.
              </p>
              <p>
                We let our work speak for itself. The photographs on this website are from our own sites and workshop.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-3/4 overflow-hidden rounded-2xl">
              <Image src={site.src} alt={site.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
            </div>
            <div className="relative mt-10 aspect-3/4 overflow-hidden rounded-2xl">
              <Image src={workshop.src} alt={workshop.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="Experience" title="Work we've delivered" intro="A snapshot of the kinds of projects shown in our portfolio." />
            <CheckList items={experience} />
            <Link href="/our-work" className="mt-8 inline-block font-bold text-navy underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-strong">
              See the project gallery
            </Link>
          </div>
          <div className="rounded-2xl bg-mist p-8">
            <h2 className="text-2xl font-bold text-navy">What we do</h2>
            <ul className="mt-6 space-y-3">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={categoryHref(c.slug)} className="group flex items-center gap-3 font-semibold text-navy hover:text-accent-strong">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-accent">
                      <Icon name={c.icon} className="h-5 w-5" />
                    </span>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading eyebrow="Our Values" title="What we stand for" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl bg-white p-7 ring-1 ring-navy/10 transition-shadow hover:shadow-lg">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent-strong">
                  <Icon name={v.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{v.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="How We Deliver"
            title="Individual services or bundled packages"
            intro="One specialised trade or a full multi-trade package, with crews working simultaneously under hands-on management."
          />
          <DeliveryModel />
        </Container>
      </section>

      <section className="bg-navy py-16 md:py-24">
        <Container>
          <SectionHeading tone="dark" eyebrow="How We Work" title="From enquiry to completion" />
          <ProcessSteps tone="dark" />
        </Container>
      </section>

      <QuoteCta title="Let's work together" />
    </>
  );
}
