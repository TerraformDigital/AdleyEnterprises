import type { Metadata } from "next";

import { SITE_URL } from "@/lib/constants";
import type { SeoFields } from "@/types/content";

const defaultTitle = "Adley Enterprises LLC | Fiberglass Boat Repair in Melrose, MN";
const defaultDescription =
  "Fiberglass boat repair specialists serving Melrose, MN and nearby Central Minnesota communities.";

export const toAbsoluteUrl = (path: string) => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, SITE_URL).toString();
};

export function buildMetadata({
  title,
  description,
  path,
  seo
}: {
  title?: string;
  description?: string;
  path: string;
  seo?: SeoFields;
}): Metadata {
  const finalTitle = seo?.metaTitle ?? title ?? defaultTitle;
  const finalDescription = seo?.metaDescription ?? description ?? defaultDescription;
  const canonical = seo?.canonicalUrl ?? toAbsoluteUrl(path);

  return {
    title: finalTitle,
    description: finalDescription,
    alternates: {
      canonical
    },
    robots: seo?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: canonical,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription
    }
  };
}
