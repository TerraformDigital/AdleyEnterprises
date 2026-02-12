import Link from "next/link";
import { notFound } from "next/navigation";

import { TrackedPhoneLink } from "@/components/analytics/tracked-phone-link";
import { RichText } from "@/components/portable-text";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/metadata";
import {
  getLocationPageBySlug,
  getLocationPages,
  getServices,
  getSiteSettings
} from "@/sanity/lib/api";

export const revalidate = 300;

export async function generateStaticParams() {
  const locations = await getLocationPages();
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = await getLocationPageBySlug(slug);

  if (!location) {
    return buildMetadata({
      title: "Location Not Found",
      description: "This location page does not exist.",
      path: "/service-areas"
    });
  }

  return buildMetadata({
    title: `${location.title} | ${location.city}, ${location.region}`,
    description: location.shortDescription,
    path: `/service-areas/${location.slug}`,
    seo: location.seo
  });
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [location, settings, services] = await Promise.all([
    getLocationPageBySlug(slug),
    getSiteSettings(),
    getServices()
  ]);

  if (!location) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow="Location Page"
        title={`Fiberglass Boat Repair in ${location.city}, ${location.region}`}
        description={location.shortDescription}
        cta={
          <div className="inline-actions">
            <TrackedPhoneLink
              phone={settings.phone}
              context={`location_${location.slug}_hero`}
              className="button button-primary"
            >
              Call {settings.phone}
            </TrackedPhoneLink>
            <Link href="/contact" className="button button-secondary">
              Request Quote
            </Link>
          </div>
        }
      />

      <section className="shell page-section two-col">
        <article className="prose">
          <h2>Local Service Coverage</h2>
          <RichText value={location.body} />
          <p>
            We service fiberglass boats only and provide written estimates prior to repair authorization.
          </p>
        </article>
        <aside className="panel">
          <h2>Available Services in {location.city}</h2>
          <ul className="list-reset">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`}>{service.title}</Link>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <CtaBanner settings={settings} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: `${location.city}, ${location.region}`, href: `/service-areas/${location.slug}` }
        ]}
      />
    </>
  );
}
