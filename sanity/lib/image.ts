import createImageUrlBuilder from "@sanity/image-url";

import { dataset, projectId } from "@/sanity/env";
import type { SanityImage } from "@/types/content";

const builder = createImageUrlBuilder({
  projectId: projectId || "missing-project-id",
  dataset
});

export function urlFor(source: SanityImage) {
  return builder.image(source);
}
