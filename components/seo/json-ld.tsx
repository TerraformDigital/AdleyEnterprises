import { toAbsoluteUrl } from "@/lib/metadata";
import type { FaqItem, Product, Service, SiteSettings } from "@/types/content";

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
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.summary,
    brand: settings.legalName,
    category: "Marine hardware",
    additionalProperty: product.variants.map((variant) => ({
      "@type": "PropertyValue",
      name: "Variant",
      value: variant.name
    })),
    url: toAbsoluteUrl(`/products/${product.slug}`)
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

function toPlainText(blocks: FaqItem["answer"]) {
  return blocks
    .map((block) => {
      const children = Array.isArray(block.children) ? block.children : [];
      return children.map((child) => child.text).join("");
    })
    .join(" ");
}
