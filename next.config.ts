import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
];

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "i.ebayimg.com"
      }
    ]
  },
  async redirects() {
    const legacyCityServiceAreaSlugs = [
      "st-cloud-mn",
      "sauk-rapids-mn",
      "waite-park-mn",
      "st-joseph-mn",
      "sauk-centre-mn",
      "cold-spring-mn",
      "long-prairie-mn",
      "albany-mn",
      "paynesville-mn",
      "richmond-mn"
    ];

    return legacyCityServiceAreaSlugs.map((slug) => ({
      source: `/service-areas/${slug}`,
      destination: "/service-areas/minnesota",
      permanent: true
    }));
  },
  async headers() {
    const previewRobotsHeader =
      process.env.VERCEL_ENV === "preview" ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : [];

    return [
      {
        source: "/(.*)",
        headers: [...securityHeaders, ...previewRobotsHeader]
      }
    ];
  }
};

export default nextConfig;
