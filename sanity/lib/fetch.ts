import { client, hasSanityConfig } from "@/sanity/lib/client";

interface SanityFetchOptions<T> {
  query: string;
  params?: Record<string, unknown>;
  fallback: T;
  revalidate?: number;
}

export async function sanityFetch<T>({
  query,
  params,
  fallback,
  revalidate = 300
}: SanityFetchOptions<T>): Promise<T> {
  if (!hasSanityConfig) {
    return fallback;
  }

  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate }
    });
  } catch (error) {
    console.error("Sanity fetch failed, serving fallback data", error);
    return fallback;
  }
}
