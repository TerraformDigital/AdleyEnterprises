import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/metadata";
import { getSiteSettings } from "@/sanity/lib/api";

export const revalidate = 300;

export async function generateMetadata() {
  return buildMetadata({
    title: "About Adley Enterprises | Fiberglass Boat Repair, Melrose MN",
    description:
      "Meet the team behind Adley Enterprises. 15+ years of fiberglass boat repair experience in Melrose, Minnesota.",
    path: "/about"
  });
}

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHero
        eyebrow="About"
        title="Fiberglass Boat Repair Expertise Since Day One"
        description={`${settings.legalName} focuses exclusively on fiberglass boat repair and refinishing for boat owners across Central Minnesota.`}
      />

      <section className="shell page-section prose">
        <p>{settings.aboutSummary}</p>
        <p>
          We are insured and provide written estimates before work begins. Repair timelines vary based on damage type,
          scope, and parts availability.
        </p>
        <p>{settings.warrantyNote}</p>
      </section>

      <CtaBanner settings={settings} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" }
        ]}
      />
    </>
  );
}
