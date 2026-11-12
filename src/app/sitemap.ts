import type { MetadataRoute } from "next";
import { categories, categoryHref, servicePageHref, servicePages } from "@/data/services";
import { absoluteUrl } from "@/lib/business";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number, changeFrequency: "weekly" | "monthly" = "monthly") => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, "weekly"),
    entry("/services", 0.9),
    ...categories.map((c) => entry(categoryHref(c.slug), 0.9)),
    ...servicePages.map((p) => entry(servicePageHref(p), 0.8)),
    entry("/our-work", 0.8, "weekly"),
    entry("/contact", 0.8),
    entry("/about", 0.6),
  ];
}
