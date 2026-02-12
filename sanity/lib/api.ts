import {
  fallbackBlogPosts,
  fallbackFaqs,
  fallbackLocations,
  fallbackProduct,
  fallbackServices,
  fallbackSiteSettings
} from "@/lib/fallback-content";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  blogPostBySlugQuery,
  blogPostsQuery,
  faqItemsQuery,
  locationPageBySlugQuery,
  locationPagesQuery,
  productBySlugQuery,
  productsQuery,
  projectsQuery,
  serviceBySlugQuery,
  servicesQuery,
  siteSettingsQuery
} from "@/sanity/lib/queries";
import type {
  BlogPost,
  FaqItem,
  LocationPage,
  Product,
  ProjectEntry,
  Service,
  SiteSettings
} from "@/types/content";

export async function getSiteSettings() {
  return sanityFetch<SiteSettings>({
    query: siteSettingsQuery,
    fallback: fallbackSiteSettings
  });
}

export async function getServices() {
  return sanityFetch<Service[]>({
    query: servicesQuery,
    fallback: fallbackServices
  });
}

export async function getServiceBySlug(slug: string) {
  const service = await sanityFetch<Service | null>({
    query: serviceBySlugQuery,
    params: { slug },
    fallback: fallbackServices.find((item) => item.slug === slug) ?? null
  });

  return service;
}

export async function getLocationPages() {
  return sanityFetch<LocationPage[]>({
    query: locationPagesQuery,
    fallback: fallbackLocations
  });
}

export async function getLocationPageBySlug(slug: string) {
  return sanityFetch<LocationPage | null>({
    query: locationPageBySlugQuery,
    params: { slug },
    fallback: fallbackLocations.find((item) => item.slug === slug) ?? null
  });
}

export async function getProductBySlug(slug: string) {
  return sanityFetch<Product | null>({
    query: productBySlugQuery,
    params: { slug },
    fallback: slug === fallbackProduct.slug ? fallbackProduct : null
  });
}

export async function getProducts() {
  return sanityFetch<Product[]>({
    query: productsQuery,
    fallback: [fallbackProduct]
  });
}

export async function getFaqItems() {
  return sanityFetch<FaqItem[]>({
    query: faqItemsQuery,
    fallback: fallbackFaqs
  });
}

export async function getBlogPosts() {
  return sanityFetch<BlogPost[]>({
    query: blogPostsQuery,
    fallback: fallbackBlogPosts
  });
}

export async function getBlogPostBySlug(slug: string) {
  return sanityFetch<BlogPost | null>({
    query: blogPostBySlugQuery,
    params: { slug },
    fallback: fallbackBlogPosts.find((item) => item.slug === slug) ?? null
  });
}

export async function getProjects() {
  return sanityFetch<ProjectEntry[]>({
    query: projectsQuery,
    fallback: []
  });
}
