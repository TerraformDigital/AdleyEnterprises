import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/metadata";
import { getLocationPages, getSiteSettings } from "@/sanity/lib/api";

export const revalidate = 300;

export async function generateMetadata() {
  return buildMetadata({
    title: "Service Areas | Fiberglass Boat Repair in Central Minnesota",
    description:
      "Adley Enterprises serves boat owners across Central Minnesota including St. Cloud, Sauk Rapids, Sauk Centre, Cold Spring, Paynesville, and surrounding communities.",
    path: "/service-areas"
  });
}

export default async function ServiceAreasPage() {
  const [locations, settings] = await Promise.all([getLocationPages(), getSiteSettings()]);

  return (
    <>
      <PageHero
        eyebrow="Service Areas"
        title="Central Minnesota Service Areas"
        description={`Adley Enterprises provides fiberglass boat repair service within roughly ${settings.serviceRadiusMiles} miles of ${settings.city}.`}
      />

      <section className="shell page-section">
        <div className="card-grid">
          {locations.map((location) => (
            <article key={location.slug} className="card">
              <h2>
                <Link href={`/service-areas/${location.slug}`}>{location.city}, {location.region}</Link>
              </h2>
              <p>{location.shortDescription}</p>
            </article>
          ))}
        </div>
      </section>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" }
        ]}
      />
    </>
  );
}
