import type { Metadata, Viewport } from "next";
import { Geist, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactDock from "@/components/ContactDock";
import { JsonLd, businessJsonLd } from "@/components/seo";
import { business } from "@/lib/business";
import { siteKeywords } from "@/lib/metadata";
import MotionProvider from "@/components/MotionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Montserrat matches the typeface specified in the Hamile Engineering logo artwork.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const defaultDescription =
  "Hamile Engineering – building and civil construction, welding and steel fabrication, industrial pipe fitting, carpentry, property maintenance and renovations in Gqeberha. Request a quote.";

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: "Hamile Engineering | Building, Welding & Maintenance Contractors in Gqeberha",
    template: "%s | Hamile Engineering",
  },
  description: defaultDescription,
  applicationName: business.name,
  keywords: siteKeywords,
  category: "Construction and engineering",
  creator: business.name,
  publisher: business.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Canonical URLs are set per page via pageMetadata() so pages never inherit the homepage canonical.
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: business.name,
    title: "Hamile Engineering | Building. Fabricating. Maintaining. Delivering.",
    description: defaultDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamile Engineering",
    description: defaultDescription,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#1e3a5f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZA" data-scroll-behavior="smooth" className={`${geistSans.variable} ${montserrat.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-surface text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-bold focus:text-ink"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <ContactDock />
        <MotionProvider />
        <JsonLd data={businessJsonLd()} />
      </body>
    </html>
  );
}
