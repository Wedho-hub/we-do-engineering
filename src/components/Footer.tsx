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
    <footer className="bg-ink pb-24 text-white/75 lg:pb-0">
      <div className="h-1 bg-accent" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="Hamile Engineering – home" className="inline-block">
              <Logo onDark className="h-28 w-auto" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              Building, civil construction, welding and steel fabrication, industrial pipe fitting, carpentry, property
              maintenance and renovations — for homes, businesses and industry in {business.city}.
            </p>
          </div>

          <div className="lg:col-span-4">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white">Services</h2>
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
            <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white">Company</h2>
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
            <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white">Get in Touch</h2>
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
                {business.serviceAreas.join(", ")}
              </li>
              <li className="flex items-start gap-2">
                <UiIcon name="clock" className="mt-0.5 h-4 w-4 text-accent" />
                {business.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Hamile Engineering. All rights reserved.</p>
          <p>Photos in our portfolio are of genuine Hamile Engineering work unless marked as illustrations.</p>
          <p>
            Developed by{" "}
            {developer.url ? (
              <a
                href={developer.url}
                target="_blank"
                rel="noopener"
                className="font-semibold text-white/80 underline decoration-accent underline-offset-2 hover:text-accent-soft"
              >
                {developer.name}
              </a>
            ) : (
              <span className="font-semibold text-white/80">{developer.name}</span>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
