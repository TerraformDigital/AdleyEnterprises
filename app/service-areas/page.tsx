import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/metadata";
import { getLocationPages } from "@/sanity/lib/api";

export const revalidate = 300;

export async function generateMetadata() {
  return buildMetadata({
    title: "Service Areas | Fiberglass Boat Repair Across the Midwest",
    description:
      "Adley Enterprises serves fiberglass boat owners across the Midwest, including Minnesota, Iowa, Wisconsin, Michigan, North Dakota, South Dakota, and Montana.",
    path: "/service-areas"
  });
}

export default async function ServiceAreasPage() {
  const locations = await getLocationPages();

  return (
    <>
      <PageHero
        eyebrow="Service Areas"
        title="Midwest Service Areas"
        description="We provide fiberglass boat repair services across Minnesota, Iowa, Wisconsin, Michigan, North Dakota, South Dakota, and Montana."
      />

      <section className="shell page-section">
        <div className="card-grid">
          {locations.map((location) => (
            <article key={location.slug} className="card">
              <h2>
                <Link href={`/service-areas/${location.slug}`}>{location.title}</Link>
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
