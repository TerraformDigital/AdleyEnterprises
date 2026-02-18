import {
  fallbackBlogPosts,
  fallbackFaqs,
  fallbackLocations,
  fallbackProducts,
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
  PortableTextBlock,
  Product,
  ProjectEntry,
  Service,
  SiteSettings
} from "@/types/content";

function textBlock(text: string): PortableTextBlock {
  return {
    _type: "block",
    children: [{ _type: "span", text }]
  };
}

const serviceOverridesBySlug: Record<
  string,
  Pick<Service, "title" | "shortDescription" | "body">
> = {
  "gel-coat-exterior-painting": {
    title: "Gel Coat Repair and Refinishing",
    shortDescription: "Gel coat touch-up and refinishing for durable protection and appearance.",
    body: [
      textBlock(
        "Sun, abrasion, and repeated use eventually wear down gel coat surfaces. We repair and refinish damaged sections with attention to color blend and finish consistency."
      ),
      textBlock(
        "Projects range from localized gel coat correction to broader refinishing work. We review your boat condition and recommend the best path based on damage depth and coverage area."
      ),
      textBlock("Our goal is a clean, durable finish that supports both appearance and long-term protection.")
    ]
  },
  "dent-scratch-repair": {
    title: "Chip and Scratch Repair",
    shortDescription: "Chip and scratch correction for fiberglass boat surfaces with finish-ready blending.",
    body: [
      textBlock(
        "Chips and scratches can reduce finish quality and expose fiberglass to additional wear. We assess depth and surrounding condition before selecting a repair approach."
      ),
      textBlock(
        "Repairs include prep, material correction, fairing, and final finish blending so repaired sections align with nearby surfaces as closely as possible."
      ),
      textBlock(
        "If you are not sure whether damage is cosmetic or structural, send photos and we can advise next steps."
      )
    ]
  }
};

const copyReplacements: Array<[RegExp, string]> = [
  [/Gel Coat and Exterior Painting/g, "Gel Coat Repair and Refinishing"],
  [/gel coat and exterior painting/g, "gel coat repair and refinishing"],
  [/dent and scratch repair/g, "chip and scratch repair"],
  [/Dent and Scratch Repair/g, "Chip and Scratch Repair"],
  [/dent\/scratch/g, "chip/scratch"],
  [/Dent\/scratch/g, "Chip/scratch"],
  [/dent, chip, and scratch correction/g, "chip and scratch correction"],
  [/Dent, chip, and scratch correction/g, "Chip and scratch correction"],
  [/Dents and scratches/g, "Chips and scratches"],
  [/dents and scratches/g, "chips and scratches"]
];

function normalizeServiceCopy(text: string): string {
  return copyReplacements.reduce((value, [pattern, replacement]) => value.replace(pattern, replacement), text);
}

function normalizePortableTextBlocks(blocks?: Service["body"]): Service["body"] {
  if (!blocks?.length) {
    return blocks;
  }

  return blocks.map((block) => ({
    ...block,
    children: Array.isArray(block.children)
      ? block.children.map((child) => ({
          ...child,
          text: typeof child.text === "string" ? normalizeServiceCopy(child.text) : child.text
        }))
      : block.children
  }));
}

function withServiceOverrides(service: Service): Service {
  const override = serviceOverridesBySlug[service.slug];

  if (!override) {
    return {
      ...service,
      title: normalizeServiceCopy(service.title),
      shortDescription: normalizeServiceCopy(service.shortDescription),
      body: normalizePortableTextBlocks(service.body)
    };
  }

  return {
    ...service,
    ...override
  };
}

function withLocationCopyUpdates(location: LocationPage): LocationPage {
  return {
    ...location,
    title: normalizeServiceCopy(location.title),
    shortDescription: normalizeServiceCopy(location.shortDescription),
    body: normalizePortableTextBlocks(location.body)
  };
}

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

  const source = services.length > 0 ? services : fallbackServices;
  return source.map((service) => withServiceOverrides(service));
}

export async function getServiceBySlug(slug: string) {
  const service = await sanityFetch<Service | null>({
    query: serviceBySlugQuery,
    params: { slug },
    fallback: fallbackServices.find((item) => item.slug === slug) ?? null
  });

  return service ? withServiceOverrides(service) : null;
}

export async function getLocationPages() {
  const locations = await sanityFetch<LocationPage[]>({
    query: locationPagesQuery,
    fallback: fallbackLocations
  });

  const source = locations.length > 0 ? locations : fallbackLocations;
  return source.map((location) => withLocationCopyUpdates(location));
}

export async function getLocationPageBySlug(slug: string) {
  const location = await sanityFetch<LocationPage | null>({
    query: locationPageBySlugQuery,
    params: { slug },
    fallback: fallbackLocations.find((item) => item.slug === slug) ?? null
  });

  return location ? withLocationCopyUpdates(location) : null;
}

export async function getProductBySlug(slug: string) {
  const product = await sanityFetch<Product | null>({
    query: productBySlugQuery,
    params: { slug },
    fallback: fallbackProducts.find((item) => item.slug === slug) ?? null
  });

  if (!product) {
    return null;
  }

  const fallback = fallbackProducts.find((item) => item.slug === product.slug);
  return fallback ? { ...fallback, ...product } : product;
}

export async function getProducts() {
  const products = await sanityFetch<Product[]>({
    query: productsQuery,
    fallback: fallbackProducts
  });

  const fallbackBySlug = new Map(fallbackProducts.map((item) => [item.slug, item]));
  const merged = products.map((product) => {
    const fallback = fallbackBySlug.get(product.slug);
    return fallback ? { ...fallback, ...product } : product;
  });

  const requiredSlugs = [
    "single-adjustable-transducer-board",
    "dual-transducer-board-port-side",
    "dual-transducer-board-starboard-side"
  ];
  const hasRequiredSet = requiredSlugs.every((slug) => merged.some((item) => item.slug === slug));
  const source = hasRequiredSet ? merged : fallbackProducts;

  return source.filter((item) => item.isPublished !== false);
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
