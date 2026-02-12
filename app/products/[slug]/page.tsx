import Link from "next/link";
import { notFound } from "next/navigation";

import { TrackedPhoneLink } from "@/components/analytics/tracked-phone-link";
import { RichText } from "@/components/portable-text";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { BreadcrumbJsonLd, ProductJsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/metadata";
import {
  getProductBySlug,
  getProducts,
  getSiteSettings
} from "@/sanity/lib/api";

export const revalidate = 300;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return buildMetadata({
      title: "Product Not Found",
      description: "This product page does not exist.",
      path: "/"
    });
  }

  return buildMetadata({
    title: product.title,
    description: product.summary,
    path: `/products/${product.slug}`,
    seo: product.seo
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [product, settings] = await Promise.all([getProductBySlug(slug), getSiteSettings()]);

  if (!product) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow="Product"
        title={product.title}
        description={product.summary}
        cta={
          <Link href="/contact" className="button button-primary">
            Request Product Inquiry
          </Link>
        }
      />

      <section className="shell page-section two-col">
        <article className="prose">
          <h2>Overview</h2>
          <RichText value={product.body} />
          <h2>Available Variants</h2>
          <ul>
            {product.variants.map((variant) => (
              <li key={variant.name}>{variant.name}</li>
            ))}
          </ul>
        </article>

        <aside className="panel">
          <h2>Ordering Information</h2>
          <p>This product is inquiry-only. Public pricing is not listed.</p>
          <p>
            <strong>Shipping Scope:</strong> {product.shippingScope}
          </p>
          <p>
            <TrackedPhoneLink phone={settings.phone} context={`product_${product.slug}`} className="button button-secondary">
              Call {settings.phone}
            </TrackedPhoneLink>
          </p>
        </aside>
      </section>

      <CtaBanner settings={settings} />
      <ProductJsonLd product={product} settings={settings} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: product.title, href: `/products/${product.slug}` }
        ]}
      />
    </>
  );
}
