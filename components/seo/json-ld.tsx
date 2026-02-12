import { toAbsoluteUrl } from "@/lib/metadata";
import type { BlogCover } from "@/lib/blog-covers";
import type { BlogPost, FaqItem, Product, Service, SiteSettings } from "@/types/content";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data)
      }}
    />
  );
}

export function LocalBusinessJsonLd({ settings }: { settings: SiteSettings }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings.legalName,
    url: toAbsoluteUrl("/"),
    telephone: settings.phone,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.streetAddress,
      addressLocality: settings.city,
      addressRegion: settings.region,
      postalCode: settings.postalCode,
      addressCountry: settings.country
    },
    openingHoursSpecification: settings.hours
      .filter((hour) => hour.opens && hour.closes)
      .map((hour) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: hour.day,
        opens: hour.opens,
        closes: hour.closes
      })),
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 45.6736,
        longitude: -94.8048
      },
      geoRadius: settings.serviceRadiusMiles * 1609.34
    },
    description: settings.aboutSummary
  };

  return <JsonLd data={data} />;
}

export function ServiceJsonLd({
  service,
  settings
}: {
  service: Service;
  settings: SiteSettings;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: `${service.title} | ${settings.legalName}`,
    provider: {
      "@type": "LocalBusiness",
      name: settings.legalName,
      telephone: settings.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: settings.streetAddress,
        addressLocality: settings.city,
        addressRegion: settings.region,
        postalCode: settings.postalCode,
        addressCountry: settings.country
      }
    },
    areaServed: `${settings.serviceRadiusMiles} mile radius around ${settings.city}, ${settings.region}`,
    description: service.shortDescription,
    url: toAbsoluteUrl(`/services/${service.slug}`)
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
      : undefined;

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.summary,
    brand: {
      "@type": "Brand",
      name: product.brand || settings.legalName
    },
    mpn: product.mpn,
    color: product.color,
    material: product.material,
    category: product.category || "Marine hardware",
    countryOfOrigin: "US",
    image: imageUrl ? [imageUrl] : undefined,
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
    additionalProperty: product.variants.map((variant) => ({
      "@type": "PropertyValue",
      name: "Variant",
      value: variant.name
    })),
    url: productUrl,
    offers: product.price
      ? {
          "@type": "Offer",
          price: product.price.toFixed(2),
          priceCurrency: product.priceCurrency || "USD",
          availability: "https://schema.org/InStock",
          url: productUrl,
          seller: {
            "@type": "Organization",
            name: settings.legalName
          },
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
            }
          },
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: 30,
            returnMethod: "https://schema.org/ReturnByMail"
          }
        }
      : undefined
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
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [imageUrl],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: canonical,
    author: {
      "@type": "Organization",
      name: "Adley Enterprises LLC"
    },
    publisher: {
      "@type": "Organization",
      name: "Adley Enterprises LLC",
      url: toAbsoluteUrl("/")
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
