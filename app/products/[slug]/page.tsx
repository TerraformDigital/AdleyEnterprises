import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { TrackedPhoneLink } from "@/components/analytics/tracked-phone-link";
import { RichText } from "@/components/portable-text";
import { CtaBanner } from "@/components/sections/cta-banner";
import { BreadcrumbJsonLd, ProductJsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/metadata";
import { formatPrice, getProductImage } from "@/lib/products";
import { getProductBySlug, getProducts, getSiteSettings } from "@/sanity/lib/api";

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
      path: "/products"
    });
  }

  return buildMetadata({
    title: `${product.title} | Adley Enterprises Transducer Mounts`,
    description:
      `${product.title} - ${formatPrice(product.price, product.priceCurrency)}. Adjustable transducer mount made in Minnesota with free shipping in the USA.`,
    path: `/products/${product.slug}`,
    seo: product.seo,
    imageUrl: getProductImage(product).url
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [product, allProducts, settings] = await Promise.all([
    getProductBySlug(slug),
    getProducts(),
    getSiteSettings()
  ]);

  if (!product) {
    notFound();
  }

  const gallery = product.images && product.images.length > 0 ? product.images : [getProductImage(product)];

  const relatedProducts = (product.relatedProductSlugs || [])
    .map((relatedSlug) => allProducts.find((item) => item.slug === relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const fallbackRelated = allProducts
    .filter((item) => item.slug !== product.slug)
    .slice(0, 2);

  const related = relatedProducts.length > 0 ? relatedProducts : fallbackRelated;

  const ebayUrl = product.ebayUrl || "https://www.ebay.com/sch/adleyenterprises/m.html";

  return (
    <>
      <section className="hero">
        <div className="shell hero-content">
          <p className="eyebrow">Product</p>
          <p className="small">
            <Link href="/">Home</Link> / <Link href="/products">Products</Link> / {product.title}
          </p>
          <h1>{product.title}</h1>
          <p className="lead">{product.summary}</p>
          <div className="hero-cta">
            <span className="product-price-large">{formatPrice(product.price, product.priceCurrency)}</span>
            <span className="product-shipping-chip">Free Shipping</span>
          </div>
        </div>
      </section>

      <section className="shell page-section two-col">
        <article className="prose">
          <div className="product-gallery">
            {gallery.map((image, index) => (
              <figure key={`${image.url}-${index}`} className="product-gallery-item">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 900px) 92vw, 760px"
                  className="product-gallery-image"
                  priority={index === 0}
                  unoptimized={image.url.startsWith("http")}
                />
              </figure>
            ))}
          </div>

          <h2>Overview</h2>
          <RichText value={product.body} />

          <h2>Compatibility Notes</h2>
          <p>{product.compatibilityNote || "Contact us with your exact fish finder and transducer model for fit confirmation."}</p>

          <h2>Specifications</h2>
          <table className="product-spec-table">
            <tbody>
              {(product.specifications || []).map((spec) => (
                <tr key={`${spec.label}-${spec.value}`}>
                  <th scope="row">{spec.label}</th>
                  <td>{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Related Products</h2>
          <ul>
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/products/${item.slug}`}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </article>

        <aside className="panel">
          <h2>Order Options</h2>
          <p>
            <a href={ebayUrl} target="_blank" rel="noreferrer" className="button button-primary">
              Order on eBay
            </a>
          </p>
          <p>
            <TrackedPhoneLink phone={settings.phone} context={`product_${product.slug}_phone`} className="button button-secondary">
              Call {settings.phone}
            </TrackedPhoneLink>
          </p>
          <p>
            <a href={`mailto:${settings.email}`} className="button button-secondary">
              Email to Order
            </a>
          </p>
          <p>
            <strong>Shipping:</strong> {product.shippingInfo || "Free shipping in the USA"}
          </p>
          <p>
            <strong>Returns:</strong> {product.returnPolicy || "30-day returns"}
          </p>
          <p>
            <strong>Condition:</strong> {product.condition || "New"}
          </p>
          <p>
            <strong>Stock:</strong> {product.stockNote || "In stock"}
          </p>
          {product.unitsSoldNote ? (
            <p>
              <strong>Units Sold:</strong> {product.unitsSoldNote}
            </p>
          ) : null}
          {product.socialProofNote ? (
            <p>
              <strong>Seller Feedback:</strong> {product.socialProofNote}
            </p>
          ) : null}
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
