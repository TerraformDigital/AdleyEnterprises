import type { MetadataRoute } from "next";

import { toAbsoluteUrl } from "@/lib/metadata";
import {
  getBlogPosts,
  getLocationPages,
  getProducts,
  getServices
} from "@/sanity/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, locations, products, posts] = await Promise.all([
    getServices(),
    getLocationPages(),
    getProducts(),
    getBlogPosts()
  ]);

  const staticRoutes = [
    "/",
    "/about",
    "/services",
    "/products",
    "/service-areas",
    "/gallery",
    "/faq",
    "/blog",
    "/contact"
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((path) => ({
      url: toAbsoluteUrl(path),
      lastModified: now
    })),
    ...services.map((service) => ({
      url: toAbsoluteUrl(`/services/${service.slug}`),
      lastModified: now
    })),
    ...locations.map((location) => ({
      url: toAbsoluteUrl(`/service-areas/${location.slug}`),
      lastModified: now
    })),
    ...products.map((product) => ({
      url: toAbsoluteUrl(`/products/${product.slug}`),
      lastModified: now
    })),
    ...posts.map((post) => ({
      url: toAbsoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.publishedAt)
    }))
  ];
}
