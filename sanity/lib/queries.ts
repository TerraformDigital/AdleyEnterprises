import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    siteTitle,
    legalName,
    phone,
    email,
    streetAddress,
    city,
    region,
    postalCode,
    country,
    serviceRadiusMiles,
    insured,
    yearsInBusiness,
    warrantyNote,
    aboutSummary,
    hours,
    seo
  }
`;

export const servicesQuery = groq`
  *[_type == "service"] | order(priority asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    body,
    featured,
    priority,
    seo
  }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    body,
    featured,
    priority,
    seo
  }
`;

export const locationPagesQuery = groq`
  *[_type == "locationPage"] | order(city asc) {
    _id,
    title,
    city,
    region,
    "slug": slug.current,
    shortDescription,
    body,
    seo
  }
`;

export const locationPageBySlugQuery = groq`
  *[_type == "locationPage" && slug.current == $slug][0] {
    _id,
    title,
    city,
    region,
    "slug": slug.current,
    shortDescription,
    body,
    seo
  }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    body,
    inquiryOnly,
    shippingScope,
    variants,
    seo
  }
`;

export const productsQuery = groq`
  *[_type == "product"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    body,
    inquiryOnly,
    shippingScope,
    variants,
    seo
  }
`;

export const faqItemsQuery = groq`
  *[_type == "faqItem"] | order(order asc, _createdAt asc) {
    _id,
    question,
    answer,
    order,
    seo
  }
`;

export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    body,
    seo
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    body,
    seo
  }
`;

export const projectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    city,
    summary,
    "serviceSlug": service->slug.current,
    beforeImage,
    afterImage
  }
`;
