import { TrackedPhoneLink } from "@/components/analytics/tracked-phone-link";
import { QuoteForm } from "@/components/forms/quote-form";
import { PageHero } from "@/components/sections/page-hero";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { formatBusinessHoursRange } from "@/lib/hours";
import { buildMetadata } from "@/lib/metadata";
import { getSiteSettings } from "@/sanity/lib/api";

export const revalidate = 300;

export async function generateMetadata() {
  return buildMetadata({
    title: "Contact Us & Request a Quote | Adley Enterprises",
    description:
      "Request a fiberglass repair estimate or order transducer mounts. Call (320) 726-0822 or use our online form. Adley Enterprises, Melrose, MN.",
    path: "/contact"
  });
}

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Request a Fiberglass Boat Repair Estimate"
        description="Call us or submit your boat details, damage notes, and photo links for a faster estimate review."
      />

      <section className="shell page-section contact-grid">
        <div>
          <h2>Contact Information</h2>
          <p>
            <strong>Phone:</strong>{" "}
            <TrackedPhoneLink phone={settings.phone} context="contact_page">
              {settings.phone}
            </TrackedPhoneLink>
          </p>
          <p>
            <strong>Email:</strong> <a href={`mailto:${settings.email}`}>{settings.email}</a>
          </p>
          <p>
            <strong>Address:</strong> {settings.streetAddress}, {settings.city}, {settings.region} {settings.postalCode}
          </p>

          <h3>Hours</h3>
          <ul className="list-reset">
            {settings.hours.map((hour) => (
              <li key={hour.day}>
                {hour.day}: {hour.notes ?? formatBusinessHoursRange(hour.opens, hour.closes)}
              </li>
            ))}
          </ul>

          <h3 className="contact-map-heading">Location Map</h3>
          <div className="map-embed-wrap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2787.873238119137!2d-94.84081798698143!3d45.67344501933109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52b5bd6b7fa5a9d3%3A0x22a039a71aa118ac!2s16%20Industry%20Pkwy%2C%20Melrose%2C%20MN%2056352!5e0!3m2!1sen!2sus!4v1772650555907!5m2!1sen!2sus"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Adley Enterprises location map"
            />
          </div>
        </div>

        <div>
          <h2>Quote Form</h2>
          <QuoteForm />
        </div>
      </section>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" }
        ]}
      />
    </>
  );
}
