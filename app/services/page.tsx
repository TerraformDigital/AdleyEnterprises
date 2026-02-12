import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { buildMetadata } from "@/lib/metadata";
import { getServices } from "@/sanity/lib/api";

export const revalidate = 300;

export async function generateMetadata() {
  return buildMetadata({
    title: "Fiberglass Boat Repair Services",
    description:
      "Explore fiberglass boat repair, hull collision repair, gel coat refinishing, dent/scratch repair, and buffing/waxing services.",
    path: "/services"
  });
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Fiberglass Boat Repair Services"
        description="Comprehensive fiberglass-only repair and refinishing services for Central Minnesota boat owners."
      />

      <section className="shell page-section card-grid">
        {services
          .slice()
          .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999))
          .map((service) => (
            <article key={service.slug} className="card">
              <h2>
                <Link href={`/services/${service.slug}`}>{service.title}</Link>
              </h2>
              <p>{service.shortDescription}</p>
              <p>
                <Link href={`/services/${service.slug}`}>Read details</Link>
              </p>
            </article>
          ))}
      </section>
    </>
  );
}
