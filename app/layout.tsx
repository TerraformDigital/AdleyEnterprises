import type { Metadata } from "next";
import type { ReactNode } from "react";

import { TrackingScripts } from "@/components/analytics/tracking-scripts";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { LocalBusinessJsonLd } from "@/components/seo/json-ld";
import { PRIMARY_KEYWORDS, SITE_URL } from "@/lib/constants";
import { getSiteSettings } from "@/sanity/lib/api";

import "./globals.css";

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
  }
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
        <TrackingScripts />
        <SiteHeader />
        <LocalBusinessJsonLd settings={settings} />
        <main>{children}</main>
        <SiteFooter settings={settings} />
      </body>
    </html>
  );
}
