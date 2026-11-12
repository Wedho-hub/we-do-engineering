import type { Metadata } from "next";
import { business } from "@/lib/business";

/** Core search terms the business wants to rank for; merged into every page's keywords. */
export const siteKeywords = [
  "Hamile Engineering",
  "Hamile Contractors",
  "engineering contractors South Africa",
  "engineering company Southern Africa",
  "construction company South Africa",
  "building contractors South Africa",
  "civil construction South Africa",
  "welding services South Africa",
  "steel fabrication South Africa",
  "industrial pipe fitting South Africa",
  "fuel storage tank fabrication",
  "fuel tank installation South Africa",
  "renewable energy mechanical installation",
  "carpentry South Africa",
  "property maintenance South Africa",
  "renovations South Africa",
  "engineering contractors SADC region",
  "multi-trade contractor",
];

/** Consistent per-page metadata: unique title/description, canonical URL and Open Graph tags. */
export function pageMetadata({
  title,
  description,
  path,
  image,
  absoluteTitle = false,
  keywords = [],
}: {
  title: string;
  description: string;
  path: string;
  /** Page-specific share image (e.g. a project photo); defaults to the site Open Graph image. */
  image?: { url: string; width: number; height: number; alt: string };
  absoluteTitle?: boolean;
  /** Page-specific search terms, listed before the site-wide ones. */
  keywords?: string[];
}): Metadata {
  // A page-level openGraph object replaces the root one, so always provide an image.
  const shareImage = image ?? {
    url: "/opengraph-image.png",
    width: 1200,
    height: 630,
    alt: "Hamile Engineering – building, steel fabrication, pipe fitting, carpentry and maintenance",
  };
  const fullTitle = absoluteTitle ? title : `${title} | ${business.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: [...new Set([...keywords, ...siteKeywords])],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_ZA",
      siteName: business.name,
      title: fullTitle,
      description,
      url: path,
      images: [shareImage],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [shareImage.url] },
  };
}
