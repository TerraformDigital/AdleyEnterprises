import Link from "next/link";

import { TrackedPhoneLink } from "@/components/analytics/tracked-phone-link";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { FaqJsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/metadata";
import {
  getFaqItems,
  getLocationPages,
  getServices,
  getSiteSettings
} from "@/sanity/lib/api";

export const revalidate = 300;

export async function generateMetadata() {
  const settings = await getSiteSettings();

  return buildMetadata({
    title: `${settings.legalName} | Fiberglass Boat Repair in ${settings.city}, ${settings.region}`,
    description:
      "Fiberglass-only boat repair specialists serving Central Minnesota. Call for hull collision repair, gel coat work, dent repair, buffing, and waxing.",
    path: "/",
    seo: settings.seo
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

      <section className="shell page-section">
        <h2>Why Boat Owners Choose Adley</h2>
        <div className="key-points">
          <article>
            <h3>Fiberglass-Only Focus</h3>
            <p>Repair workflows are designed specifically for fiberglass boats.</p>
          </article>
          <article>
            <h3>15+ Years in Business</h3>
            <p>Experienced team serving Melrose and surrounding communities.</p>
          </article>
          <article>
            <h3>Insured Service</h3>
            <p>Estimate-first process with phone, photo, or in-person inspection.</p>
          </article>
        </div>
      </section>

      <section className="shell page-section">
        <div className="section-head">
          <h2>Core Services</h2>
          <Link href="/services">View All Services</Link>
        </div>
        <div className="card-grid">
          {featuredServices.map((service) => (
            <article key={service.slug} className="card">
              <h3>
                <Link href={`/services/${service.slug}`}>{service.title}</Link>
              </h3>
              <p>{service.shortDescription}</p>
            </article>
          ))}
        </div>
      </section>

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

      <CtaBanner settings={settings} />
      <FaqJsonLd faqs={faqs.slice(0, 8)} />
    </>
  );
}
