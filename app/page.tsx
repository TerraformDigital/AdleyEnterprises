import Link from "next/link";
import { Clock3, ShieldCheck, Wrench } from "lucide-react";

import { TrackedPhoneLink } from "@/components/analytics/tracked-phone-link";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/ui/reveal";
import {
  LocalBusinessJsonLd,
  OrganizationJsonLd,
  SimpleFaqJsonLd
} from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/metadata";
import { HOMEPAGE_FAQ_ITEMS } from "@/lib/seo";
import { getServiceIcon } from "@/lib/service-icons";
import {
  getFaqItems,
  getLocationPages,
  getServices,
  getSiteSettings
} from "@/sanity/lib/api";

export const revalidate = 300;

export async function generateMetadata() {
  return buildMetadata({
    title: "Adley Enterprises LLC | Fiberglass Boat Repair in Melrose, MN",
    description:
      "Fiberglass boat repair specialists in Melrose, MN. Hull collision repair, gel coat refinishing, scratch and dent correction, buffing and waxing. Serving Central Minnesota. Call (320) 726-0822.",
    path: "/",
    openGraphType: "website"
  });
}

export default async function HomePage() {
  const [settings, services, locations, faqs] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getLocationPages(),
    getFaqItems()
  ]);

  const featuredServices = services
    .slice()
    .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999))
    .slice(0, 5);

  return (
    <>
      <PageHero
        eyebrow="Fiberglass Boat Repair Specialists"
        title="Fiberglass Boat Repair for Melrose and Central Minnesota"
        description="Adley Enterprises LLC provides fiberglass-only repair services, including hull collision repair, gel coat refinishing, dent/scratch correction, and buffing/waxing."
        backgroundVideo={{
          src: "/video/homepage-hero-background.mp4",
          type: "video/mp4",
          poster: "/images/fiberglass-boat-repair-wide.avif"
        }}
        cta={
          <div className="inline-actions">
            <TrackedPhoneLink phone={settings.phone} context="home_hero" className="button button-primary">
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
          <h2>Why Boat Owners Choose Adley</h2>
          <div className="key-points">
            <article>
              <span className="icon-badge" aria-hidden="true">
                <Wrench size={20} />
              </span>
              <h3>Fiberglass-Only Focus</h3>
              <p>Repair workflows are designed specifically for fiberglass boats.</p>
            </article>
            <article>
              <span className="icon-badge" aria-hidden="true">
                <Clock3 size={20} />
              </span>
              <h3>15+ Years in Business</h3>
              <p>Experienced team serving Melrose and surrounding communities.</p>
            </article>
            <article>
              <span className="icon-badge" aria-hidden="true">
                <ShieldCheck size={20} />
              </span>
              <h3>Insured Service</h3>
              <p>Estimate-first process with phone, photo, or in-person inspection.</p>
            </article>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.05}>
        <section className="shell page-section">
          <div className="section-head">
            <h2>Core Services</h2>
            <Link href="/services">View All Services</Link>
          </div>
          <div className="card-grid">
            {featuredServices.map((service) => {
              const ServiceIcon = getServiceIcon(service.slug);

              return (
                <article key={service.slug} className="card">
                  <span className="icon-badge" aria-hidden="true">
                    <ServiceIcon size={20} />
                  </span>
                  <h3>
                    <Link href={`/services/${service.slug}`}>{service.title}</Link>
                  </h3>
                  <p>{service.shortDescription}</p>
                </article>
              );
            })}
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.1}>
        <section className="shell page-section">
          <div className="section-head">
            <h2>Service Area Coverage</h2>
            <Link href="/service-areas">View All Service Areas</Link>
          </div>
          <ul className="city-list">
            {locations.slice(0, 10).map((location) => (
              <li key={location.slug}>
                <Link href={`/service-areas/${location.slug}`}>{location.city}, MN</Link>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal delay={0.15}>
        <section className="shell page-section">
          <h2>Quick Answers</h2>
          <div className="faq-list">
            {faqs.slice(0, 4).map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>
                  {faq.answer
                    .map((block) =>
                      Array.isArray(block.children)
                        ? block.children.map((child) => (typeof child.text === "string" ? child.text : "")).join("")
                        : ""
                    )
                    .join(" ")}
                </p>
              </details>
            ))}
          </div>
        </section>
      </Reveal>

      <CtaBanner settings={settings} />
      <LocalBusinessJsonLd settings={settings} />
      <OrganizationJsonLd settings={settings} />
      <SimpleFaqJsonLd items={HOMEPAGE_FAQ_ITEMS} />
    </>
  );
}
