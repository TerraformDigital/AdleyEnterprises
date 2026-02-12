import { createClient } from "next-sanity";

import { apiVersion, dataset, hasSanityConfig, projectId, token, useCdn } from "@/sanity/env";

export const client = createClient({
  apiVersion,
  dataset,
  projectId: projectId || "missing-project-id",
  useCdn,
  token,
  perspective: "published"
});

export { hasSanityConfig };
