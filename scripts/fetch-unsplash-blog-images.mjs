#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const accessKey = process.env.UNSPLASH_ACCESS_KEY;
const utmSource = process.env.UNSPLASH_UTM_SOURCE || "adley_enterprises_site";
const shouldApplySeed = process.argv.includes("--apply-seed");

if (!accessKey) {
  console.error("Missing UNSPLASH_ACCESS_KEY. Add it to your environment and run again.");
  process.exit(1);
}

const topics = [
  {
    slug: "common-fiberglass-boat-damage",
    query: "fiberglass boat hull repair",
    fallbackAlt: "Fiberglass boat hull repair in progress"
  },
  {
    slug: "gel-coat-repair-vs-repaint",
    query: "boat gel coat restoration",
    fallbackAlt: "Gel coat restoration work on a fiberglass boat"
  },
  {
    slug: "what-to-do-after-hull-collision",
    query: "damaged boat hull inspection",
    fallbackAlt: "Boat hull collision damage inspection"
  },
  {
    slug: "how-often-buff-and-wax-fiberglass-boat",
    query: "boat polishing detailer",
    fallbackAlt: "Boat polishing and waxing service"
  },
  {
    slug: "how-photo-estimates-work",
    query: "boat repair photo inspection",
    fallbackAlt: "Boat repair area photographed for estimate"
  },
  {
    slug: "spring-boat-prep-central-minnesota",
    query: "boat pre season maintenance",
    fallbackAlt: "Pre-season boat maintenance inspection"
  },
  {
    slug: "signs-you-need-dent-scratch-repair",
    query: "boat hull scratch repair",
    fallbackAlt: "Fiberglass boat scratch and dent repair"
  },
  {
    slug: "service-areas-around-melrose",
    query: "fishing boat on lake",
    fallbackAlt: "Fishing boat in a Midwest lake setting"
  },
  {
    slug: "adjustable-transducer-mount-options",
    query: "boat transducer mount",
    fallbackAlt: "Boat transducer mount at the stern"
  },
  {
    slug: "protect-fiberglass-finish-storage-transport",
    query: "boat cover storage trailer",
    fallbackAlt: "Boat prepared for covered storage and transport"
  }
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function searchUnsplash(query) {
  const searchUrl = new URL("https://api.unsplash.com/search/photos");
  searchUrl.searchParams.set("query", query);
  searchUrl.searchParams.set("orientation", "landscape");
  searchUrl.searchParams.set("per_page", "8");
  searchUrl.searchParams.set("content_filter", "high");

  const response = await fetch(searchUrl, {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
      "Accept-Version": "v1"
    }
  });

  if (!response.ok) {
    throw new Error(`Unsplash search failed (${response.status}) for query "${query}"`);
  }

  const data = await response.json();
  return Array.isArray(data.results) ? data.results : [];
}

async function triggerDownload(downloadLocation) {
  if (!downloadLocation) {
    return;
  }

  const url = new URL(downloadLocation);
  url.searchParams.set("client_id", accessKey);

  try {
    await fetch(url.toString());
  } catch {
    // Non-fatal: image metadata can still be used.
  }
}

function buildImageUrl(rawUrl) {
  const url = new URL(rawUrl);
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("w", "1600");
  url.searchParams.set("q", "80");
  return url.toString();
}

async function main() {
  const usedIds = new Set();
  const manifest = [];

  for (const topic of topics) {
    const results = await searchUnsplash(topic.query);
    const photo = results.find((item) => !usedIds.has(item.id)) || results[0];

    if (!photo) {
      console.warn(`No Unsplash result for ${topic.slug} (${topic.query})`);
      continue;
    }

    usedIds.add(photo.id);

    await triggerDownload(photo.links?.download_location);

    manifest.push({
      slug: topic.slug,
      coverImageUrl: buildImageUrl(photo.urls?.raw || photo.urls?.regular),
      coverImageAlt: photo.alt_description || photo.description || topic.fallbackAlt,
      coverImageCreditName: photo.user?.name,
      coverImageCreditUrl: `${photo.user?.links?.html}?utm_source=${utmSource}&utm_medium=referral`,
      coverImageSource: "Unsplash"
    });

    await sleep(250);
  }

  const outputPath = path.join(process.cwd(), "sanity/seed/blog-image-manifest.json");
  await fs.writeFile(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(`Wrote image manifest: ${outputPath}`);

  if (!shouldApplySeed) {
    return;
  }

  const seedJsonPath = path.join(process.cwd(), "sanity/seed/adley-seed.json");
  const seedNdjsonPath = path.join(process.cwd(), "sanity/seed/adley-seed.ndjson");
  const seedRaw = await fs.readFile(seedJsonPath, "utf8");
  const docs = JSON.parse(seedRaw);
  const manifestBySlug = Object.fromEntries(manifest.map((item) => [item.slug, item]));

  for (const doc of docs) {
    if (doc?._type !== "blogPost") {
      continue;
    }

    const slug = doc.slug?.current;
    const image = slug ? manifestBySlug[slug] : null;
    if (!image) {
      continue;
    }

    doc.coverImageUrl = image.coverImageUrl;
    doc.coverImageAlt = image.coverImageAlt;
    doc.coverImageCreditName = image.coverImageCreditName;
    doc.coverImageCreditUrl = image.coverImageCreditUrl;
    doc.coverImageSource = image.coverImageSource;
  }

  await fs.writeFile(seedJsonPath, `${JSON.stringify(docs, null, 2)}\n`, "utf8");
  await fs.writeFile(seedNdjsonPath, `${docs.map((doc) => JSON.stringify(doc)).join("\n")}\n`, "utf8");
  console.log(`Updated seed files with Unsplash image fields: ${seedJsonPath} and ${seedNdjsonPath}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
