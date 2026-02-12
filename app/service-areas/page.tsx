import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { buildMetadata } from "@/lib/metadata";
import { getLocationPages, getSiteSettings } from "@/sanity/lib/api";

export const revalidate = 300;

export async function generateMetadata() {
  const settings = await getSiteSettings();

  return buildMetadata({
    title: `Service Areas within ${settings.serviceRadiusMiles} Miles of ${settings.city}, ${settings.region}`,
    description: "City-by-city coverage pages for fiberglass boat repair services in Central Minnesota.",
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
    </>
  );
}
