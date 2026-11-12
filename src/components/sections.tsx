import Image from "next/image";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import IllustrationPanel from "@/components/IllustrationPanel";
import UiIcon from "@/components/UiIcon";
import { ButtonLink, Container, WhatsAppButton } from "@/components/ui";
import { getPhoto } from "@/data/portfolio";
import { categoryHref, quoteHref, type CategorySlug, type ServiceCategory } from "@/data/services";
import { business } from "@/lib/business";

/** Genuine project photo if available, otherwise a clearly labelled illustration. */
export function Visual({
  photoSlug,
  icon,
  label,
  sizes,
  className = "",
  preload = false,
}: {
  photoSlug: string | null;
  icon: IconName;
  label: string;
  sizes: string;
  className?: string;
  preload?: boolean;
}) {
  const photo = getPhoto(photoSlug);
  if (!photo) return <IllustrationPanel icon={icon} label={label} className={className} />;
  return (
    <div className={`relative overflow-hidden bg-mist ${className}`}>
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} preload={preload} className="object-cover" />
    </div>
  );
}

export function CategoryCard({ category }: { category: ServiceCategory }) {
  return (
    <Link
      href={categoryHref(category.slug)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl hover:shadow-navy/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/50"
    >
      <div className="relative">
        <Visual
          photoSlug={category.image}
          icon={category.icon}
          label={category.name}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-16/10"
        />
        <span className="absolute -bottom-6 left-6 flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-accent shadow-lg ring-4 ring-white transition-colors group-hover:bg-accent group-hover:text-ink">
          <Icon name={category.icon} className="h-6 w-6" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 pt-10">
        <h3 className="text-lg font-bold text-navy group-hover:text-accent-strong">{category.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{category.summary}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-navy">
          Explore service
          <UiIcon name="arrow-right" className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export const processSteps = [
  { title: "Tell us what you need", text: "Send a quote request, WhatsApp or call — photos and measurements help us understand the job quickly." },
  { title: "Assessment & quotation", text: "We assess the scope, visit site where needed, and give you a clear written quotation." },
  { title: "Scheduling", text: "We agree a start date, confirm materials and access, and keep you updated on progress." },
  { title: "Quality delivery", text: "We complete the work to a high standard, clean up, and walk through the finished job with you." },
];

export function ProcessSteps({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((s, i) => (
        <li
          key={s.title}
          className={`relative rounded-2xl p-6 ${tone === "dark" ? "bg-white/5 ring-1 ring-white/10" : "bg-white ring-1 ring-navy/10"}`}
        >
          <span className="font-display text-4xl font-extrabold text-accent">{String(i + 1).padStart(2, "0")}</span>
          <h3 className={`mt-3 text-lg font-bold ${tone === "dark" ? "text-white" : "text-navy"}`}>{s.title}</h3>
          <p className={`mt-2 text-sm leading-relaxed ${tone === "dark" ? "text-white/75" : "text-ink/70"}`}>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export const commitments: { icon: IconName; title: string; text: string }[] = [
  { icon: "stopwatch", title: "On time", text: "Realistic programmes, agreed upfront and delivered on schedule." },
  { icon: "nut-screw", title: "Precision", text: "Measured, set out and built accurately to the specification." },
  { icon: "hard-hat", title: "Qualified artisans", text: "Experienced, qualified tradespeople who are talented in their fields." },
  { icon: "team", title: "Hands-on managers", text: "Multiskilled managers who lead from the site, not from a distance." },
  { icon: "blueprint", title: "Blueprint accuracy", text: "Engineering drawings and specifications interpreted correctly." },
];

/** How we deliver: individual vs bundled services, simultaneous multi-trade operations and our commitments. */
export function DeliveryModel({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const card = dark ? "bg-white/5 ring-1 ring-white/10" : "bg-white ring-1 ring-navy/10";
  const heading = dark ? "text-white" : "text-navy";
  const body = dark ? "text-white/75" : "text-ink/70";
  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-3">
        <article className={`rounded-2xl p-7 ${card}`}>
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent-strong">
            <Icon name="wrench" className="h-6 w-6" />
          </span>
          <h3 className={`mt-5 text-xl font-bold ${heading}`}>Specialised individual services</h3>
          <p className={`mt-2 leading-relaxed ${body}`}>
            Need one trade done well? Appoint us for a single scope, such as a weld repair, a concrete slab, a fuel tank or a
            dispenser service, and get a specialist team focused on that job.
          </p>
        </article>
        <article className={`rounded-2xl p-7 ${card}`}>
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent-strong">
            <Icon name="handshake" className="h-6 w-6" />
          </span>
          <h3 className={`mt-5 text-xl font-bold ${heading}`}>Bundled multi-trade packages</h3>
          <p className={`mt-2 leading-relaxed ${body}`}>
            Combine civil, steel, pipework, mechanical and finishing work under one contract, one programme and one point
            of contact, with no gaps between contractors.
          </p>
        </article>
        <article className="rounded-2xl bg-accent p-7 text-ink">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-accent">
            <Icon name="gear" className="h-6 w-6" />
          </span>
          <h3 className="mt-5 text-xl font-bold">Simultaneous multi-trade operations</h3>
          <p className="mt-2 leading-relaxed text-ink/85">
            On larger projects our civil, fabrication, pipe-fitting and mechanical crews work at the same time, coordinated
            by hands-on managers. The site progresses on every front and the programme stays short.
          </p>
        </article>
      </div>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {commitments.map((c) => (
          <li key={c.title} className="flex gap-3">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${dark ? "bg-accent text-ink" : "bg-navy text-accent"}`}>
              <Icon name={c.icon} className="h-5 w-5" />
            </span>
            <span>
              <span className={`block font-bold ${heading}`}>{c.title}</span>
              <span className={`mt-0.5 block text-sm leading-relaxed ${body}`}>{c.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function QuoteCta({
  title = "Ready to get your project moving?",
  text = `Tell us what you need and we'll respond ${business.responseTime} with next steps and a no-obligation quotation.`,
  category,
  service,
  whatsappMessage,
}: {
  title?: string;
  text?: string;
  category?: CategorySlug;
  service?: string;
  whatsappMessage?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy py-16 text-white md:py-20">
      <div aria-hidden="true" className="bg-blueprint absolute inset-0 opacity-60" />
      <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <Container className="relative">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">{title}</h2>
            <p className="mt-4 text-lg text-white/80">{text}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href={quoteHref(category, service)} size="lg">
              Request a Quote <UiIcon name="arrow-right" />
            </ButtonLink>
            <WhatsAppButton size="lg" message={whatsappMessage} />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div aria-hidden="true" className="bg-blueprint absolute inset-0 opacity-50" />
      <div aria-hidden="true" className="absolute inset-y-0 right-0 w-1/3 bg-linear-to-l from-navy-dark to-transparent" />
      <Container className="relative py-14 md:py-20">
        {children}
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent-soft">
          <span aria-hidden="true" className="h-0.5 w-6 bg-accent" />
          {eyebrow}
        </p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{intro}</p>
      </Container>
    </section>
  );
}
