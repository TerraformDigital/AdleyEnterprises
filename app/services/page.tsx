import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { buildMetadata } from "@/lib/metadata";
import { getServiceMedia } from "@/lib/service-images";
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
          .map((service) => {
            const media = getServiceMedia(service.slug);

            return (
            <article key={service.slug} className="card">
              <div className="service-card-image-wrap">
                <Image
                  src={media.card.src}
                  alt={media.card.alt}
                  fill
                  sizes="(max-width: 900px) 92vw, (max-width: 1120px) 46vw, 350px"
                  className="service-card-image"
                />
              </div>
              <h2>
                <Link href={`/services/${service.slug}`}>{service.title}</Link>
              </h2>
              <p>{service.shortDescription}</p>
              <p>
                <Link href={`/services/${service.slug}`}>Read details</Link>
              </p>
            </article>
            );
          })}
      </section>
    </>
  );
}
