import Image from "next/image";
import Link from "next/link";
import { Factory, ShieldCheck, SlidersHorizontal } from "lucide-react";

import { TrackedPhoneLink } from "@/components/analytics/tracked-phone-link";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { SimpleFaqJsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/metadata";
import { formatPrice, getProductImage, productPageFaqs } from "@/lib/products";
import { getProducts, getSiteSettings } from "@/sanity/lib/api";

export const revalidate = 300;

export async function generateMetadata() {
  return buildMetadata({
    title: "Adjustable Transducer Mounts - American Made",
    description:
      "American-made adjustable transducer mounting boards built in Melrose, MN. Single ($91) and dual ($175.50) configurations with free shipping.",
    path: "/products"
  });
}

export default async function ProductsPage() {
  const [products, settings] = await Promise.all([getProducts(), getSiteSettings()]);

  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Transducer Mounts Made Easy"
        description="Adley Enterprises manufactures adjustable transducer mounting boards in-house at our Melrose, Minnesota fiberglass shop. Every board is American-made and built by the same hands that repair fiberglass boats."
      />

      <section className="shell page-section">
        <p className="lead">
          A poorly mounted transducer limits sonar performance. Adley&apos;s adjustable boards are designed so anglers can dial
          in the right angle for their hull and electronics setup, improving the quality of readings where it matters most.
        </p>
      </section>

      <section className="shell page-section">
        <h2>Product Lineup</h2>
        <div className="card-grid product-card-grid">
          {products.map((product) => {
            const image = getProductImage(product);

            return (
              <article key={product.slug} className="card product-card">
                <div className="product-card-image-wrap">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 900px) 92vw, (max-width: 1120px) 46vw, 360px"
                    className="product-card-image"
                    unoptimized={image.url.startsWith("http")}
                  />
                </div>
                <p className="service-card-kicker">
                  <span className="icon-badge" aria-hidden="true">
                    <SlidersHorizontal size={18} />
                  </span>
                  Transducer Mount
                </p>
                <h3 className="product-card-title">
                  <Link href={`/products/${product.slug}`}>{product.title}</Link>
                </h3>
                <p>{product.summary}</p>
                <p className="product-price-row">
                  <span className="product-price">{formatPrice(product.price, product.priceCurrency)}</span>
                  <span className="product-shipping-chip">Free Shipping</span>
                </p>
                <p>
                  <Link href={`/products/${product.slug}`}>View details</Link>
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="shell page-section">
        <h2>Why Adley Transducer Boards</h2>
        <div className="key-points">
          <article>
            <span className="icon-badge" aria-hidden="true">
              <Factory size={20} />
            </span>
            <h3>American Made</h3>
            <p>Manufactured in Melrose, Minnesota. Not mass-produced overseas.</p>
          </article>
          <article>
            <span className="icon-badge" aria-hidden="true">
              <ShieldCheck size={20} />
            </span>
            <h3>Built by Fiberglass Pros</h3>
            <p>Designed in the same shop trusted for fiberglass boat repair work.</p>
          </article>
          <article>
            <span className="icon-badge" aria-hidden="true">
              <SlidersHorizontal size={20} />
            </span>
            <h3>Adjustable Design</h3>
            <p>Dial in your transducer angle for stronger sonar performance on the water.</p>
          </article>
        </div>
      </section>

      <section className="shell page-section">
        <h2>How to Order</h2>
        <div className="card-grid">
          <article className="card">
            <h3>Buy Direct</h3>
            <p>Order direct by phone or email. This is the preferred route and supports local Minnesota manufacturing.</p>
            <p>
              <TrackedPhoneLink phone={settings.phone} context="products_order_direct">
                {settings.phone}
              </TrackedPhoneLink>
            </p>
            <p>
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
            </p>
          </article>
          <article className="card">
            <h3>Buy on eBay</h3>
            <p>Also available through the official adleyenterprises eBay store with 100% positive feedback.</p>
            <p>
              <a
                href="https://www.ebay.com/sch/adleyenterprises/m.html"
                target="_blank"
                rel="noreferrer"
              >
                Visit eBay Store
              </a>
            </p>
          </article>
          <article className="card">
            <h3>Shipping and Returns</h3>
            <p>Free USPS Priority Mail shipping in the USA on listed board products.</p>
            <p>30-day return window. See each product page for item-level policy details.</p>
          </article>
        </div>
      </section>

      <section className="shell page-section">
        <h2>Quick Product FAQs</h2>
        <div className="faq-list">
          {productPageFaqs.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="shell page-section panel">
        <h2>Need Help Choosing the Right Board?</h2>
        <p>
          Questions about fitment, transducer compatibility, or side orientation? Call{" "}
          <TrackedPhoneLink phone={settings.phone} context="products_footer_cta">
            {settings.phone}
          </TrackedPhoneLink>{" "}
          or email <a href={`mailto:${settings.email}`}>{settings.email}</a>.
        </p>
      </section>

      <CtaBanner settings={settings} />
      <SimpleFaqJsonLd items={productPageFaqs} />
    </>
  );
}
