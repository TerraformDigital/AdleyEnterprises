import Image from "next/image";
import { notFound } from "next/navigation";

import { RichText } from "@/components/portable-text";
import { PageHero } from "@/components/sections/page-hero";
import { BlogPostingJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { getBlogCover } from "@/lib/blog-covers";
import { buildMetadata } from "@/lib/metadata";
import { getBlogPostBySlug, getBlogPosts } from "@/sanity/lib/api";

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: "Post Not Found",
      description: "This blog post does not exist.",
      path: "/blog"
    });
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    seo: post.seo,
    imageUrl: post.coverImageUrl
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const cover = getBlogCover(post);
  const isRemoteCover = cover.url.startsWith("http");

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={post.title}
        description={`Published ${new Date(post.publishedAt).toLocaleDateString()}`}
      />

      <section className="shell page-section blog-hero-wrap">
        <figure className="blog-hero-figure">
          <Image
            src={cover.url}
            alt={cover.alt}
            width={1920}
            height={1080}
            className="blog-hero-image"
            priority
            unoptimized={isRemoteCover}
          />
          {cover.creditName ? (
            <figcaption className="small">
              Photo by{" "}
              {cover.creditUrl ? (
                <a href={cover.creditUrl} target="_blank" rel="noreferrer">
                  {cover.creditName}
                </a>
              ) : (
                cover.creditName
              )}
              {cover.source ? ` on ${cover.source}` : ""}
            </figcaption>
          ) : null}
        </figure>
      </section>

      <article className="shell page-section prose blog-post-prose">
        <p className="blog-post-excerpt">{post.excerpt}</p>
        <RichText value={post.body} />
      </article>

      <BlogPostingJsonLd post={post} cover={cover} />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` }
        ]}
      />
    </>
  );
}
