import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TrackingScripts } from "@/components/analytics/tracking-scripts";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { LocalBusinessJsonLd } from "@/components/seo/json-ld";
import { PRIMARY_KEYWORDS, SITE_URL } from "@/lib/constants";
import { UNIVERSAL_OG_IMAGE_PATH, toAbsoluteUrl } from "@/lib/metadata";
import { getSiteSettings } from "@/sanity/lib/api";

import "./globals.css";

const UNIVERSAL_OG_IMAGE = toAbsoluteUrl(UNIVERSAL_OG_IMAGE_PATH);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Adley Enterprises LLC | Fiberglass Boat Repair in Melrose, MN",
    template: "%s | Adley Enterprises LLC"
  },
  description:
    "Fiberglass boat repair, hull collision repair, gel coat refinishing, and marine detailing services in Central Minnesota.",
  keywords: PRIMARY_KEYWORDS,
  alternates: {
    canonical: SITE_URL
  },
  openGraph: {
    title: "Adley Enterprises LLC | Fiberglass Boat Repair in Melrose, MN",
    description:
      "Fiberglass boat repair, hull collision repair, gel coat refinishing, and marine detailing services in Central Minnesota.",
    url: SITE_URL,
    type: "website",
    siteName: "Adley Enterprises LLC",
    locale: "en_US",
    images: [
      {
        url: UNIVERSAL_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Adley Enterprises LLC"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Adley Enterprises LLC | Fiberglass Boat Repair in Melrose, MN",
    description:
      "Fiberglass boat repair, hull collision repair, gel coat refinishing, and marine detailing services in Central Minnesota.",
    images: [UNIVERSAL_OG_IMAGE]
  },
  icons: {
    icon: [
      { url: "/images/adley-site-icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/adley-site-icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/adley-site-icons/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/images/adley-site-icons/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/adley-site-icons/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
    ],
    shortcut: "/images/adley-site-icons/favicon.ico",
    apple: [
      { url: "/images/adley-site-icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/images/adley-site-icons/apple-touch-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/images/adley-site-icons/apple-touch-icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/images/adley-site-icons/apple-touch-icon-76x76.png", sizes: "76x76", type: "image/png" },
      { url: "/images/adley-site-icons/apple-touch-icon-60x60.png", sizes: "60x60", type: "image/png" }
    ]
  },
  manifest: "/images/adley-site-icons/site.webmanifest",
  other: {
    "msapplication-TileColor": "#111111",
    "msapplication-config": "/images/adley-site-icons/browserconfig.xml"
  },
  robots: process.env.VERCEL_ENV === "preview" ? { index: false, follow: false } : { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: "#111111"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en-US">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <TrackingScripts />
        <SiteHeader settings={settings} />
        <LocalBusinessJsonLd settings={settings} />
        <main id="main-content">{children}</main>
        <SiteFooter settings={settings} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
