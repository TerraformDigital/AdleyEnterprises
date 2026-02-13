import { RichText } from "@/components/portable-text";
import { PageHero } from "@/components/sections/page-hero";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/metadata";
import { getFaqItems } from "@/sanity/lib/api";

export const revalidate = 300;

export async function generateMetadata() {
  return buildMetadata({
    title: "FAQ - Fiberglass Boat Repair & Transducer Mounts | Adley",
    description:
      "Frequently asked questions about fiberglass boat repair, transducer mounts, estimates, and service areas. Adley Enterprises, Melrose, MN.",
    path: "/faq"
  });
}

export default async function FaqPage() {
  const faqs = await getFaqItems();

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Straight answers to common fiberglass boat repair, estimate, and scheduling questions."
      />

      <section className="shell page-section faq-list">
        {faqs.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <div className="prose">
              <RichText value={faq.answer} />
            </div>
          </details>
        ))}
      </section>

      <FaqJsonLd faqs={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "FAQ", href: "/faq" }
        ]}
      />
    </>
  );
}
