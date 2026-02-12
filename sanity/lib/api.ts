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

function withBlogFallback(post: BlogPost): BlogPost {
  const fallback = fallbackBlogPosts.find((item) => item.slug === post.slug);

  if (!fallback) {
    return post;
  }

  const shouldUpgradeBody = !post.body || post.body.length < 5;

  return {
    ...fallback,
    ...post,
    excerpt: post.excerpt || fallback.excerpt,
    body: shouldUpgradeBody ? fallback.body : post.body,
    coverImageUrl: post.coverImageUrl || fallback.coverImageUrl,
    coverImageAlt: post.coverImageAlt || fallback.coverImageAlt,
    coverImageCreditName: post.coverImageCreditName || fallback.coverImageCreditName,
    coverImageCreditUrl: post.coverImageCreditUrl || fallback.coverImageCreditUrl,
    coverImageSource: post.coverImageSource || fallback.coverImageSource
  };
}

export async function getSiteSettings() {
  return sanityFetch<SiteSettings>({
    query: siteSettingsQuery,
    fallback: fallbackSiteSettings
  });
}

export async function getServices() {
  const services = await sanityFetch<Service[]>({
    query: servicesQuery,
    fallback: fallbackServices
  });

  return services.length > 0 ? services : fallbackServices;
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
  const locations = await sanityFetch<LocationPage[]>({
    query: locationPagesQuery,
    fallback: fallbackLocations
  });

  return locations.length > 0 ? locations : fallbackLocations;
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
  const products = await sanityFetch<Product[]>({
    query: productsQuery,
    fallback: [fallbackProduct]
  });

  return products.length > 0 ? products : [fallbackProduct];
}

export async function getFaqItems() {
  const faqs = await sanityFetch<FaqItem[]>({
    query: faqItemsQuery,
    fallback: fallbackFaqs
  });

  return faqs.length > 0 ? faqs : fallbackFaqs;
}

export async function getBlogPosts() {
  const posts = await sanityFetch<BlogPost[]>({
    query: blogPostsQuery,
    fallback: fallbackBlogPosts
  });

  return posts.length > 0 ? posts.map((post) => withBlogFallback(post)) : fallbackBlogPosts;
}

export async function getBlogPostBySlug(slug: string) {
  const post = await sanityFetch<BlogPost | null>({
    query: blogPostBySlugQuery,
    params: { slug },
    fallback: fallbackBlogPosts.find((item) => item.slug === slug) ?? null
  });

  return post ? withBlogFallback(post) : null;
}

export async function getProjects() {
  return sanityFetch<ProjectEntry[]>({
    query: projectsQuery,
    fallback: []
  });
}
