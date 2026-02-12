export interface PortableTextSpan {
  _type: string;
  text: string;
  marks?: string[];
  _key?: string;
  [key: string]: unknown;
}

export interface PortableTextBlock {
  _type: string;
  children: PortableTextSpan[];
  _key?: string;
  style?: string;
  listItem?: "bullet" | "number";
  level?: number;
  markDefs?: Array<Record<string, unknown>>;
  [key: string]: unknown;
}

export type PortableTextValue = PortableTextBlock[];

export interface SanityImage {
  _type?: "image";
  asset?: {
    _ref?: string;
    _type?: "reference";
    url?: string;
  };
  alt?: string;
}

export interface SeoFields {
  metaTitle?: string;
  metaDescription?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
  ogImage?: SanityImage;
}

export interface BusinessHour {
  _key?: string;
  day: string;
  opens?: string;
  closes?: string;
  notes?: string;
}

export interface SiteSettings {
  _id?: string;
  siteTitle: string;
  legalName: string;
  phone: string;
  email: string;
  streetAddress: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  serviceRadiusMiles: number;
  insured: boolean;
  yearsInBusiness: number;
  warrantyNote: string;
  aboutSummary: string;
  seo?: SeoFields;
  hours: BusinessHour[];
}

export interface Service {
  _id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  body?: PortableTextValue;
  featured?: boolean;
  priority?: number;
  seo?: SeoFields;
}

export interface LocationPage {
  _id?: string;
  title: string;
  slug: string;
  city: string;
  region: string;
  shortDescription: string;
  body?: PortableTextValue;
  seo?: SeoFields;
}

export interface ProductVariant {
  _key?: string;
  name: string;
  description?: string;
}

export interface ProductImage {
  _key?: string;
  url: string;
  alt: string;
}

export interface ProductSpecification {
  _key?: string;
  label: string;
  value: string;
}

export interface Product {
  _id?: string;
  title: string;
  slug: string;
  summary: string;
  price?: number;
  priceCurrency?: string;
  mpn?: string;
  ebayItemNumber?: string;
  ebayUrl?: string;
  type?: string;
  material?: string;
  color?: string;
  brand?: string;
  category?: string;
  condition?: string;
  shippingInfo?: string;
  returnPolicy?: string;
  stockNote?: string;
  unitsSoldNote?: string;
  locationNote?: string;
  madeIn?: string;
  compatibilityNote?: string;
  socialProofNote?: string;
  isPublished?: boolean;
  body?: PortableTextValue;
  inquiryOnly: boolean;
  shippingScope: string;
  images?: ProductImage[];
  specifications?: ProductSpecification[];
  relatedProductSlugs?: string[];
  variants: ProductVariant[];
  seo?: SeoFields;
}

export interface FaqItem {
  _id?: string;
  question: string;
  answer: PortableTextValue;
  order?: number;
  seo?: SeoFields;
}

export interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  body: PortableTextValue;
  coverImageUrl?: string;
  coverImageAlt?: string;
  coverImageCreditName?: string;
  coverImageCreditUrl?: string;
  coverImageSource?: string;
  seo?: SeoFields;
}

export interface ProjectEntry {
  _id?: string;
  title: string;
  slug: string;
  city: string;
  summary: string;
  serviceSlug?: string;
  beforeImage?: SanityImage;
  afterImage?: SanityImage;
}
