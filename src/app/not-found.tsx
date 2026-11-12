import Link from "next/link";
import Icon from "@/components/Icon";
import { ButtonLink, Container } from "@/components/ui";
import { categories, categoryHref } from "@/data/services";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="py-20 md:py-28">
      <Container className="max-w-3xl text-center">
        <p className="font-mono text-6xl font-semibold tabular-nums text-accent">404</p>
        <h1 className="mt-4 text-3xl font-extrabold text-navy md:text-4xl">We couldn&apos;t find that page</h1>
        <p className="mt-4 text-lg text-ink/70">It may have moved. Try one of our services below, or request a quote.</p>
        <ul className="mt-10 grid gap-3 text-left sm:grid-cols-2">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={categoryHref(c.slug)}
                className="flex items-center gap-3 rounded-xl bg-white p-4 font-semibold text-navy ring-1 ring-navy/10 hover:text-accent-strong"
              >
                <Icon name={c.icon} className="h-5 w-5 text-accent" />
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/contact#quote" size="lg">
            Request a Quote
          </ButtonLink>
          <ButtonLink href="/" variant="outline-dark" size="lg">
            Back to home
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
