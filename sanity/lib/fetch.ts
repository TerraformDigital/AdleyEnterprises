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
    const queryParams = params ?? {};
    const data = await client.fetch<T | null>(query, queryParams, {
      next: { revalidate }
    });

    if (data === null || data === undefined) {
      return fallback;
    }

    return data;
  } catch (error) {
    console.error("Sanity fetch failed, serving fallback data", error);
    return fallback;
  }
}
