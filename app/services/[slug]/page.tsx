import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { TrackedPhoneLink } from "@/components/analytics/tracked-phone-link";
import { RichText } from "@/components/portable-text";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/json-ld";
import { Reveal } from "@/components/ui/reveal";
import { buildMetadata } from "@/lib/metadata";
import { getServiceIcon } from "@/lib/service-icons";
import { getServiceMedia } from "@/lib/service-images";
import {
  getFaqItems,
  getLocationPages,
  getServiceBySlug,
  getServices,
  getSiteSettings
} from "@/sanity/lib/api";

export const revalidate = 300;

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return buildMetadata({
      title: "Service Not Found",
      description: "This service page does not exist.",
      path: "/services"
    });
  }

  return buildMetadata({
    title: `${service.title} in Central Minnesota`,
    description: service.shortDescription,
    path: `/services/${service.slug}`,
    seo: service.seo
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [service, settings, faqs, locations] = await Promise.all([
    getServiceBySlug(slug),
    getSiteSettings(),
    getFaqItems(),
    getLocationPages()
  ]);

  if (!service) {
    notFound();
  }

  const media = getServiceMedia(service.slug);
  const ServiceIcon = getServiceIcon(service.slug);

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.title}
        description={service.shortDescription}
        cta={
          <div className="inline-actions">
            <TrackedPhoneLink phone={settings.phone} context={`service_${service.slug}_hero`} className="button button-primary">
              Call {settings.phone}
            </TrackedPhoneLink>
            <Link href="/contact" className="button button-secondary">
              Request Quote
            </Link>
          </div>
        }
      />

      <Reveal>
        <section className="shell page-section">
          <div className="service-hero-image-wrap">
            <Image
              src={media.hero.src}
              alt={media.hero.alt}
              fill
              sizes="(max-width: 900px) 92vw, 1120px"
              className="service-hero-image"
              priority
            />
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.05}>
        <section className="shell page-section two-col">
          <article className="prose">
            <p className="service-card-kicker">
              <span className="icon-badge" aria-hidden="true">
                <ServiceIcon size={18} />
              </span>
              Fiberglass Repair Service
            </p>
            <h2>Service Overview</h2>
            <RichText value={service.body} />
            <h2>Recent Project Photos</h2>
            <div className="service-gallery-grid">
              {media.gallery.map((asset, index) => (
                <figure key={`${asset.src}-${index}`} className="service-gallery-item">
                  <Image
                    src={asset.src}
                    alt={asset.alt}
                    fill
                    sizes="(max-width: 900px) 92vw, (max-width: 1120px) 50vw, 500px"
                    className="service-gallery-image"
                  />
                </figure>
              ))}
            </div>
            <h2>Quick Answer</h2>
            <p>
              {service.title} is available for fiberglass boats within approximately {settings.serviceRadiusMiles} miles of
              {" "}
              {settings.city}, {settings.region}. Estimate requests can be submitted by phone, photos, or in-person
              inspection.
            </p>
          </article>

          <aside className="panel">
            <h2>Need an Estimate?</h2>
            <p>
              Call <TrackedPhoneLink phone={settings.phone} context={`service_${service.slug}_panel`}>{settings.phone}</TrackedPhoneLink> or submit the
              quote form.
            </p>
            <p>
              <Link href="/contact" className="button button-primary">
                Start Quote Request
              </Link>
            </p>
            <h3>Related FAQs</h3>
            <ul className="list-reset">
              {faqs.slice(0, 5).map((faq) => (
                <li key={faq.question}>
                  <Link href="/faq">{faq.question}</Link>
                </li>
              ))}
            </ul>
            <h3>Nearby Service Areas</h3>
            <ul className="list-reset">
              {locations.slice(0, 6).map((location) => (
                <li key={location.slug}>
                  <Link href={`/service-areas/${location.slug}`}>
                    {location.city}, {location.region}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </section>
      </Reveal>

      <CtaBanner settings={settings} />
      <ServiceJsonLd service={service} settings={settings} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.title, href: `/services/${service.slug}` }
        ]}
      />
    </>
  );
}
