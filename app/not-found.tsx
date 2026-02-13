import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Adley Enterprises LLC",
  description: "The page you are looking for does not exist.",
  robots: {
    index: false,
    follow: true
  }
};

export default function NotFound() {
  return (
    <section className="shell page-section panel">
      <p className="eyebrow">404</p>
      <h1>Page Not Found</h1>
      <p>The page you requested could not be found. Use one of the links below to continue.</p>
      <div className="inline-actions">
        <Link href="/" className="button button-primary">
          Homepage
        </Link>
        <Link href="/services" className="button button-secondary">
          Services
        </Link>
        <Link href="/products" className="button button-secondary">
          Products
        </Link>
        <Link href="/contact" className="button button-secondary">
          Contact
        </Link>
      </div>
    </section>
  );
}
