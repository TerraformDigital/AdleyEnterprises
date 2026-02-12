import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell page-section">
      <h1>Page Not Found</h1>
      <p>The page you requested could not be found.</p>
      <Link href="/" className="button button-primary">
        Return Home
      </Link>
    </section>
  );
}
