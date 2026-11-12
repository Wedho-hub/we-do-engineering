import Link from "next/link";
import Logo from "@/components/Logo";
import UiIcon from "@/components/UiIcon";
import { categories, categoryHref } from "@/data/services";
import { business, developer, whatsappLink } from "@/lib/business";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "All Services" },
  { href: "/our-work", label: "Our Work" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/contact#quote", label: "Request a Quote" },
];

export default function Footer() {
  return (
    <footer className="bg-ink pb-24 text-white/75">
      <div className="h-1 bg-accent" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="Hamile Engineering – home" className="inline-block">
              <Logo onDark className="h-28 w-auto" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              Building, civil construction, welding and steel fabrication, industrial pipe fitting, carpentry, property
              maintenance and renovations — for homes, businesses and industry across South Africa and the region.
            </p>
          </div>

          <div className="lg:col-span-4">
            <h2 className="label-technical mb-4 text-xs text-white">Services</h2>
            <ul className="space-y-2.5 text-sm">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={categoryHref(c.slug)} className="hover:text-accent-soft">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="label-technical mb-4 text-xs text-white">Company</h2>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-accent-soft">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="label-technical mb-4 text-xs text-white">Get in Touch</h2>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={business.phoneHref} className="flex items-start gap-2 hover:text-accent-soft">
                  <UiIcon name="phone" className="mt-0.5 h-4 w-4 text-accent" />
                  {business.phone}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 hover:text-accent-soft"
                >
                  <UiIcon name="whatsapp" className="mt-0.5 h-4 w-4 text-accent" />
                  WhatsApp us
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="flex items-start gap-2 break-all hover:text-accent-soft">
                  <UiIcon name="mail" className="mt-0.5 h-4 w-4 text-accent" />
                  {business.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <UiIcon name="pin" className="mt-0.5 h-4 w-4 text-accent" />
                {business.serviceAreaShort}
              </li>
              <li className="flex items-start gap-2">
                <UiIcon name="clock" className="mt-0.5 h-4 w-4 text-accent" />
                {business.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Hamile Engineering. All rights reserved.</p>
          <p>Photos in our portfolio are of genuine Hamile Engineering work unless marked as illustrations.</p>
        </div>

        {/* Developer credit: its own row, clear of the floating WhatsApp button and the mobile contact bar. */}
        <div className="mt-8 flex justify-center lg:justify-start">
          {developer.url ? (
            <a
              href={developer.url}
              target="_blank"
              rel="noopener"
              data-reveal="pop"
              className="group inline-flex items-center gap-3 rounded-full border border-accent/60 bg-accent/10 py-2 pl-4 pr-2 text-white shadow-[0_0_24px_-6px_rgba(249,115,22,0.55)] transition-colors hover:border-accent hover:bg-accent/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span className="label-technical text-[0.65rem] text-white/70">Website by</span>
              <span className="font-display text-lg font-bold tracking-wide text-accent-soft">{developer.name}</span>
              <span
                aria-hidden="true"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-ink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 11 11 5M6 5h5v5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : (
            <p className="inline-flex items-center gap-3 rounded-full border border-accent/60 bg-accent/10 px-4 py-2">
              <span className="label-technical text-[0.65rem] text-white/70">Website by</span>
              <span className="font-display text-lg font-bold tracking-wide text-accent-soft">{developer.name}</span>
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
