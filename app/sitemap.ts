import type { MetadataRoute } from "next";

import { toAbsoluteUrl } from "@/lib/metadata";
import {
  getBlogPosts,
  getLocationPages,
  getProducts,
  getServices
} from "@/sanity/lib/api";

function buildStaticEntry(
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number
): MetadataRoute.Sitemap[number] {
  return {
    url: toAbsoluteUrl(path),
    lastModified: new Date(),
    changeFrequency,
    priority
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, locations, products, posts] = await Promise.all([
    getServices(),
    getLocationPages(),
    getProducts(),
    getBlogPosts()
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    buildStaticEntry("/", "weekly", 1),
    buildStaticEntry("/services", "monthly", 0.9),
    buildStaticEntry("/service-areas", "monthly", 0.8),
    buildStaticEntry("/products", "monthly", 0.9),
    buildStaticEntry("/faq", "monthly", 0.6),
    buildStaticEntry("/blog", "weekly", 0.7),
    buildStaticEntry("/contact", "yearly", 0.7),
    buildStaticEntry("/about", "yearly", 0.6),
    buildStaticEntry("/gallery", "monthly", 0.5)
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: toAbsoluteUrl(`/services/${service.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: service.slug === "fiberglass-boat-repair" ? 0.9 : 0.8
  }));

  const locationPages: MetadataRoute.Sitemap = locations.map((location) => ({
    url: toAbsoluteUrl(`/service-areas/${location.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7
  }));

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: toAbsoluteUrl(`/products/${product.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8
  }));

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => {
    const parsedDate = new Date(post.publishedAt);

    return {
      url: toAbsoluteUrl(`/blog/${post.slug}`),
      lastModified: Number.isNaN(parsedDate.valueOf()) ? new Date() : parsedDate,
      changeFrequency: "monthly",
      priority: 0.6
    };
  });

  return [
    ...staticPages,
    ...servicePages,
    ...locationPages,
    ...productPages,
    ...blogPages
  ];
}
