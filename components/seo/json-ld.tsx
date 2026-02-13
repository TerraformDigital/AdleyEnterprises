import { JsonLd } from "@/components/JsonLd";
import type { BlogCover } from "@/lib/blog-covers";
import { toAbsoluteUrl } from "@/lib/metadata";
import { BUSINESS_INFO } from "@/lib/seo";
import type { BlogPost, FaqItem, Product, Service, SiteSettings } from "@/types/content";

const BUSINESS_ID = `${toAbsoluteUrl("/")}#business`;
const ORGANIZATION_ID = `${toAbsoluteUrl("/")}#organization`;

function toDialString(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits.startsWith("+") ? digits : `+${digits}`;
}

export function LocalBusinessJsonLd({ settings }: { settings: SiteSettings }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: settings.legalName,
    image: toAbsoluteUrl(BUSINESS_INFO.logoPath),
    logo: toAbsoluteUrl(BUSINESS_INFO.logoPath),
    description:
      "Fiberglass boat repair specialists and adjustable transducer mount manufacturer in Melrose, Minnesota. Serving Central MN including St. Cloud, Sauk Rapids, and surrounding communities.",
    url: toAbsoluteUrl("/"),
    telephone: toDialString(settings.phone),
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.streetAddress,
      addressLocality: settings.city,
      addressRegion: settings.region,
      postalCode: settings.postalCode,
      addressCountry: settings.country
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_INFO.geo.latitude,
      longitude: BUSINESS_INFO.geo.longitude
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "06:30",
        closes: "16:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "06:30",
        closes: "16:00",
        description: "By appointment only"
      }
    ],
    priceRange: "$$",
    areaServed: [
      { "@type": "City", name: "Melrose" },
      { "@type": "City", name: "St. Cloud" },
      { "@type": "City", name: "Sauk Rapids" },
      { "@type": "City", name: "Waite Park" },
      { "@type": "City", name: "St. Joseph" },
      { "@type": "City", name: "Sauk Centre" },
      { "@type": "City", name: "Cold Spring" },
      { "@type": "City", name: "Long Prairie" },
      { "@type": "City", name: "Albany" },
      { "@type": "City", name: "Paynesville" },
      { "@type": "City", name: "Richmond" }
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Fiberglass Boat Repair Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fiberglass Boat Repair" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hull Collision Repair" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gel Coat and Exterior Painting" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dent and Scratch Repair" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Buffing and Waxing" } }
      ]
    },
    sameAs: [BUSINESS_INFO.ebayStoreUrl]
  };

  return <JsonLd data={data} />;
}

export function OrganizationJsonLd({ settings }: { settings: SiteSettings }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: settings.legalName,
    url: toAbsoluteUrl("/"),
    logo: toAbsoluteUrl(BUSINESS_INFO.logoPath),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: toDialString(settings.phone),
      contactType: "customer service",
      email: settings.email,
      availableLanguage: "English",
      areaServed: "US"
    }
  };

  return <JsonLd data={data} />;
}

export function ServiceJsonLd({
  service
}: {
  service: Service;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "State", name: "Minnesota" },
    serviceType: service.title,
    url: toAbsoluteUrl(`/services/${service.slug}`)
  };

  return <JsonLd data={data} />;
}

export function CityServiceJsonLd({
  city,
  slug,
  description
}: {
  city: string;
  slug: string;
  description: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Fiberglass Boat Repair Near ${city}, MN`,
    description,
    provider: { "@id": BUSINESS_ID },
    areaServed: {
      "@type": "City",
      name: city,
      containedInPlace: { "@type": "State", name: "Minnesota" }
    },
    url: toAbsoluteUrl(`/service-areas/${slug}`)
  };

  return <JsonLd data={data} />;
}

export function FaqJsonLd({ faqs }: { faqs: FaqItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: toPlainText(item.answer)
      }
    }))
  };

  return <JsonLd data={data} />;
}

export function ProductJsonLd({
  product,
  settings
}: {
  product: Product;
  settings: SiteSettings;
}) {
  const productUrl = toAbsoluteUrl(`/products/${product.slug}`);
  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].url.startsWith("http")
        ? product.images[0].url
        : toAbsoluteUrl(product.images[0].url)
      : toAbsoluteUrl(BUSINESS_INFO.ogImagePath);

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    brand: {
      "@type": "Brand",
      name: product.brand || "Adley Enterprises"
    },
    mpn: product.mpn,
    color: product.color,
    material: product.material,
    countryOfOrigin: "US",
    manufacturer: {
      "@type": "Organization",
      name: settings.legalName,
      address: {
        "@type": "PostalAddress",
        streetAddress: settings.streetAddress,
        addressLocality: settings.city,
        addressRegion: settings.region,
        postalCode: settings.postalCode,
        addressCountry: settings.country
      }
    },
    offers: product.price
      ? {
          "@type": "Offer",
          price: product.price.toFixed(2),
          priceCurrency: product.priceCurrency || "USD",
          availability: "https://schema.org/InStock",
          url: productUrl,
          seller: { "@id": BUSINESS_ID },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: {
              "@type": "MonetaryAmount",
              value: "0",
              currency: product.priceCurrency || "USD"
            },
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: "US"
            },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              businessDays: {
                "@type": "QuantitativeValue",
                minValue: 2,
                maxValue: 5
              }
            }
          },
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: 30,
            returnMethod: "https://schema.org/ReturnByMail"
          }
        }
      : undefined,
    image: imageUrl,
    description: product.summary,
    category: product.category || "Sporting Goods > Fishing > Fishfinders"
  };

  return <JsonLd data={data} />;
}

export function SimpleFaqJsonLd({
  items
}: {
  items: Array<{ question: string; answer: string }>;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return <JsonLd data={data} />;
}

export function BreadcrumbJsonLd({
  items
}: {
  items: Array<{ name: string; href: string }>;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.href)
    }))
  };

  return <JsonLd data={data} />;
}

export function BlogPostingJsonLd({
  post,
  cover
}: {
  post: BlogPost;
  cover: BlogCover;
}) {
  const canonical = toAbsoluteUrl(`/blog/${post.slug}`);
  const imageUrl = cover.url.startsWith("http") ? cover.url : toAbsoluteUrl(cover.url);

  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [imageUrl],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "Adley Enterprises LLC",
      url: toAbsoluteUrl("/")
    },
    publisher: {
      "@type": "Organization",
      name: "Adley Enterprises LLC",
      logo: {
        "@type": "ImageObject",
        url: toAbsoluteUrl(BUSINESS_INFO.logoPath)
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical
    }
  };

  return <JsonLd data={data} />;
}

function toPlainText(blocks: FaqItem["answer"]) {
  return blocks
    .map((block) => {
      const children = Array.isArray(block.children) ? block.children : [];
      return children.map((child) => child.text).join("");
    })
    .join(" ");
}
