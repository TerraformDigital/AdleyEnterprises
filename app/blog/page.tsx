import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { getBlogCover } from "@/lib/blog-covers";
import { buildMetadata } from "@/lib/metadata";
import { getBlogPosts } from "@/sanity/lib/api";

export const revalidate = 300;

export async function generateMetadata() {
  return buildMetadata({
    title: "Boat Repair Blog",
    description:
      "Educational posts about fiberglass repair, gel coat restoration, and maintenance for boat owners.",
    path: "/blog"
  });
}

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Fiberglass Repair Insights"
        description="Helpful repair and maintenance guidance for fiberglass boat owners."
      />

      <section className="shell page-section card-grid">
        {posts.map((post) => {
          const cover = getBlogCover(post);
          const isRemote = cover.url.startsWith("http");

          return (
            <article key={post.slug} className="card blog-card">
              <Link href={`/blog/${post.slug}`} className="blog-card-media-link" aria-label={post.title}>
                <Image
                  src={cover.url}
                  alt={cover.alt}
                  width={1600}
                  height={1000}
                  className="blog-card-media"
                  unoptimized={isRemote}
                />
              </Link>
              <h2>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>{post.excerpt}</p>
              <p className="small">Published {new Date(post.publishedAt).toLocaleDateString()}</p>
            </article>
          );
        })}
      </section>
    </>
  );
}
