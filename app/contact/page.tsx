import { TrackedPhoneLink } from "@/components/analytics/tracked-phone-link";
import { QuoteForm } from "@/components/forms/quote-form";
import { PageHero } from "@/components/sections/page-hero";
import { buildMetadata } from "@/lib/metadata";
import { getSiteSettings } from "@/sanity/lib/api";

export const revalidate = 300;

export async function generateMetadata() {
  return buildMetadata({
    title: "Contact and Request Quote",
    description:
      "Call Adley Enterprises LLC or submit a quote form for fiberglass boat repair and refinishing services.",
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
                {hour.day}: {hour.notes ?? `${hour.opens}-${hour.closes}`}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Quote Form</h2>
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
