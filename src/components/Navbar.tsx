"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import UiIcon from "@/components/UiIcon";
import { buttonClass } from "@/components/ui";
import { categories, categoryHref } from "@/data/services";
import { business, whatsappLink } from "@/lib/business";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services", hasMenu: true },
  { href: "/our-work", label: "Our Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);

  // Close menus on route change (state reset during render when the path changes).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setServicesOpen(false);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setMenuOpen(false);
      }
    }
    function onClick(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm shadow-navy/10">
      {/* Utility bar */}
      <div className="hidden bg-navy text-sm text-white/85 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2">
            <UiIcon name="pin" className="h-4 w-4 text-accent" />
            Serving {business.serviceAreaShort} · Residential, commercial & industrial
          </p>
          <div className="flex items-center gap-6">
            <a href={business.phoneHref} className="flex items-center gap-2 hover:text-accent-soft">
              <UiIcon name="phone" className="h-4 w-4 text-accent" />
              {business.phone}
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-accent-soft"
            >
              <UiIcon name="whatsapp" className="h-4 w-4 text-accent" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4 md:h-24">
          <Link href="/" className="shrink-0" aria-label="Hamile Engineering – home">
            <Logo preload className="h-16 w-auto md:h-20" />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) =>
                link.hasMenu ? (
                  <li key={link.href} ref={servicesRef} className="relative">
                    <button
                      type="button"
                      aria-expanded={servicesOpen}
                      aria-controls="services-menu"
                      onClick={() => setServicesOpen((v) => !v)}
                      className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:text-accent-strong ${
                        isActive(link.href) ? "text-accent-strong" : "text-navy"
                      }`}
                    >
                      Services
                      <UiIcon
                        name="chevron-down"
                        className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {servicesOpen && (
                      <div
                        id="services-menu"
                        className="absolute left-1/2 top-full mt-3 w-[min(44rem,90vw)] -translate-x-1/2 rounded-xl border border-navy/10 bg-white p-4 shadow-xl shadow-navy/15"
                      >
                        <ul className="grid grid-cols-2 gap-1">
                          {categories.map((c) => (
                            <li key={c.slug}>
                              <Link
                                href={categoryHref(c.slug)}
                                className="group flex gap-3 rounded-lg p-3 transition-colors hover:bg-mist"
                              >
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy text-accent">
                                  <Icon name={c.icon} className="h-5 w-5" />
                                </span>
                                <span>
                                  <span className="block text-sm font-bold text-navy group-hover:text-accent-strong">
                                    {c.name}
                                  </span>
                                  <span className="mt-0.5 line-clamp-2 block text-xs text-ink/65">{c.summary}</span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link
                          href="/services"
                          className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-mist py-2.5 text-sm font-semibold text-navy hover:text-accent-strong"
                        >
                          View all services <UiIcon name="arrow-right" className="h-4 w-4" />
                        </Link>
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={`relative rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:text-accent-strong ${
                        isActive(link.href)
                          ? "text-accent-strong after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:bg-accent"
                          : "text-navy"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/contact#quote" className={`${buttonClass("primary")} hidden sm:inline-flex`}>
              Request a Quote
            </Link>
            <button
              type="button"
              className="rounded-md p-2 text-navy hover:bg-mist lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <UiIcon name={menuOpen ? "x" : "menu"} className="h-7 w-7" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-navy/10 bg-white px-4 pb-6 pt-2 lg:hidden"
        >
          <ul className="divide-y divide-navy/10">
            {navLinks
              .filter((l) => !l.hasMenu)
              .map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`block py-3 font-semibold ${isActive(link.href) ? "text-accent-strong" : "text-navy"}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>
          <p className="mb-2 mt-5 text-xs label-technical text-ink/60">Services</p>
          <ul className="grid gap-1">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={categoryHref(c.slug)}
                  className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-semibold text-navy hover:bg-mist"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-navy text-accent">
                    <Icon name={c.icon} className="h-4 w-4" />
                  </span>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-3">
            <Link href="/contact#quote" className={buttonClass("primary", "lg")}>
              Request a Quote
            </Link>
            <a href={business.phoneHref} className={buttonClass("outline-dark", "lg")}>
              <UiIcon name="phone" /> Call {business.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
