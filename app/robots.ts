import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  const isPreviewDeployment = process.env.VERCEL_ENV === "preview";

  if (isPreviewDeployment) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/"
      },
      sitemap: `${SITE_URL}/sitemap.xml`
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/_next/", "/studio/"]
    },
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
