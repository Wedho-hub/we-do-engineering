import { categories } from "@/data/services";
import type { QuoteCatalog } from "@/lib/quote-validation";

/** Service options for the quote form, derived from the services catalogue. */
export const quoteCatalog: QuoteCatalog = Object.fromEntries(
  categories.map((c) => [c.slug, { name: c.name, services: c.services }]),
);
