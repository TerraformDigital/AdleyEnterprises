import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { buildMetadata } from "@/lib/metadata";
import { getProducts } from "@/sanity/lib/api";

export const revalidate = 300;

export async function generateMetadata() {
  return buildMetadata({
    title: "Marine Products",
    description: "Inquiry-only marine products including adjustable transducer mounts.",
    path: "/products"
  });
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Marine Products"
        description="Inquiry-only product pages for available marine hardware offerings."
      />

      <section className="shell page-section card-grid">
        {products.map((product) => (
          <article key={product.slug} className="card">
            <h2>
              <Link href={`/products/${product.slug}`}>{product.title}</Link>
            </h2>
            <p>{product.summary}</p>
            <p>
              <Link href={`/products/${product.slug}`}>View Product Details</Link>
            </p>
          </article>
        ))}
      </section>
    </>
  );
}
