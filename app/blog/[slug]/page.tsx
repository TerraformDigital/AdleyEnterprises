import { notFound } from "next/navigation";

import { RichText } from "@/components/portable-text";
import { PageHero } from "@/components/sections/page-hero";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
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
    seo: post.seo
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={post.title}
        description={`Published ${new Date(post.publishedAt).toLocaleDateString()}`}
      />

      <article className="shell page-section prose">
        <RichText value={post.body} />
      </article>

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
