import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { buildMetadata } from "@/lib/metadata";
import { getServiceIcon } from "@/lib/service-icons";
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
          .map((service, index) => {
            const media = getServiceMedia(service.slug);
            const ServiceIcon = getServiceIcon(service.slug);

            return (
              <Reveal key={service.slug} delay={Math.min(index * 0.05, 0.3)}>
                <article className="card">
                  <div className="service-card-image-wrap">
                    <Image
                      src={media.card.src}
                      alt={media.card.alt}
                      fill
                      sizes="(max-width: 900px) 92vw, (max-width: 1120px) 46vw, 350px"
                      className="service-card-image"
                    />
                  </div>
                  <p className="service-card-kicker">
                    <span className="icon-badge" aria-hidden="true">
                      <ServiceIcon size={18} />
                    </span>
                    Fiberglass Service
                  </p>
                  <h2>
                    <Link href={`/services/${service.slug}`}>{service.title}</Link>
                  </h2>
                  <p>{service.shortDescription}</p>
                  <p>
                    <Link href={`/services/${service.slug}`}>Read details</Link>
                  </p>
                </article>
              </Reveal>
            );
          })}
      </section>
    </>
  );
}
