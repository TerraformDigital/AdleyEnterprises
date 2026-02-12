import type { BlogPost } from "@/types/content";

export interface BlogCover {
  url: string;
  alt: string;
  creditName?: string;
  creditUrl?: string;
  source?: string;
}

const defaultCover: BlogCover = {
  url: "/images/fiberglass-boat-repair-wide.avif",
  alt: "Fiberglass boat repair work in progress at Adley Enterprises"
};

const fallbackCoversBySlug: Record<string, BlogCover> = {
  "common-fiberglass-boat-damage": {
    url: "/images/fiberglass-boat-repair-4-3-one.avif",
    alt: "Close-up fiberglass boat hull surface prepared for repair"
  },
  "gel-coat-repair-vs-repaint": {
    url: "/images/fiberglass-boat-repair-4-3-two.avif",
    alt: "Gel coat and exterior refinishing work on a fiberglass boat"
  },
  "what-to-do-after-hull-collision": {
    url: "/images/checking-bodywork-on-boat-repair-optimized.jpg",
    alt: "Hull collision repair inspection and bodywork check"
  },
  "how-often-buff-and-wax-fiberglass-boat": {
    url: "/images/polishing-boat-optimized.jpg",
    alt: "Technician polishing fiberglass boat exterior"
  },
  "how-photo-estimates-work": {
    url: "/images/fiberglass-boat-repair-4-3-three.avif",
    alt: "Fiberglass repair area photographed for estimate review"
  },
  "spring-boat-prep-central-minnesota": {
    url: "/images/fiberglass-boat-repair-4-3-two.avif",
    alt: "Boat exterior prep and finish inspection before launch season"
  },
  "signs-you-need-dent-scratch-repair": {
    url: "/images/fiberglass-boat-repair-4-3-four.avif",
    alt: "Dent and scratch correction process on fiberglass side panel"
  },
  "service-areas-around-melrose": {
    url: "/images/fiberglass-boat-repair-wide.avif",
    alt: "Fiberglass boat repair team serving Central Minnesota customers"
  },
  "adjustable-transducer-mount-options": {
    url: "/images/fiberglass-boat-repair-4-3-one.avif",
    alt: "Boat setup image related to adjustable transducer mount fitment"
  },
  "protect-fiberglass-finish-storage-transport": {
    url: "/images/fiberglass-boat-repair-4-3-three.avif",
    alt: "Fiberglass finish polishing before storage and transport"
  }
};

export function getBlogCover(
  post: Pick<
    BlogPost,
    | "slug"
    | "title"
    | "coverImageUrl"
    | "coverImageAlt"
    | "coverImageCreditName"
    | "coverImageCreditUrl"
    | "coverImageSource"
  >
): BlogCover {
  if (post.coverImageUrl) {
    return {
      url: post.coverImageUrl,
      alt: post.coverImageAlt || `${post.title} cover image`,
      creditName: post.coverImageCreditName,
      creditUrl: post.coverImageCreditUrl,
      source: post.coverImageSource
    };
  }

  return fallbackCoversBySlug[post.slug] ?? defaultCover;
}
