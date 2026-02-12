import { PageHero } from "@/components/sections/page-hero";
import { buildMetadata } from "@/lib/metadata";
import { getProjects } from "@/sanity/lib/api";

export const revalidate = 300;

export async function generateMetadata() {
  return buildMetadata({
    title: "Repair Project Gallery",
    description: "Browse recent fiberglass repair project examples from Adley Enterprises LLC.",
    path: "/gallery"
  });
}

export default async function GalleryPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Fiberglass Repair Project Gallery"
        description="Before/after project examples and completed fiberglass repair highlights."
      />

      <section className="shell page-section">
        {projects.length === 0 ? (
          <p>
            No project entries are published yet. Add project records in Sanity to display before/after examples on this
            page.
          </p>
        ) : (
          <div className="card-grid">
            {projects.map((project) => (
              <article key={project.slug || project.title} className="card">
                <h2>{project.title}</h2>
                <p>{project.summary}</p>
                <p>
                  <strong>City:</strong> {project.city}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
