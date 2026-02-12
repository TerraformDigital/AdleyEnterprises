export interface ServiceMediaAsset {
  src: string;
  alt: string;
}

export interface ServiceMedia {
  card: ServiceMediaAsset;
  hero: ServiceMediaAsset;
  gallery: ServiceMediaAsset[];
}

const galleryAssets: ServiceMediaAsset[] = [
  {
    src: "/images/fiberglass-boat-repair-4-3-one.avif",
    alt: "Fiberglass boat hull repair preparation work at Adley Enterprises"
  },
  {
    src: "/images/fiberglass-boat-repair-4-3-two.avif",
    alt: "Fiberglass exterior surface refinishing process on a repaired hull section"
  },
  {
    src: "/images/fiberglass-boat-repair-4-3-three.avif",
    alt: "Technician polishing repaired fiberglass gel coat for final finish blending"
  },
  {
    src: "/images/fiberglass-boat-repair-4-3-four.avif",
    alt: "Detail buffing and waxing on a restored fiberglass boat side panel"
  },
  {
    src: "/images/checking-bodywork-on-boat-repair-optimized.jpg",
    alt: "Bodywork check during fiberglass boat repair process"
  },
  {
    src: "/images/polishing-boat-optimized.jpg",
    alt: "Final polishing work on a fiberglass boat hull"
  }
];

const sharedHero: ServiceMediaAsset = {
  src: "/images/fiberglass-boat-repair-wide.avif",
  alt: "Wide photo of fiberglass boat repair work in progress at Adley Enterprises"
};

const serviceMediaBySlug: Record<string, ServiceMedia> = {
  "fiberglass-boat-repair": {
    card: galleryAssets[0],
    hero: {
      ...sharedHero,
      alt: "Fiberglass boat structural and cosmetic repair in progress at Adley Enterprises"
    },
    gallery: [galleryAssets[0], galleryAssets[1], galleryAssets[2], galleryAssets[3]]
  },
  "hull-collision-repair": {
    card: galleryAssets[4],
    hero: {
      ...galleryAssets[4],
      alt: "Hull collision repair process with fiberglass reconstruction and finish correction"
    },
    gallery: [galleryAssets[4], galleryAssets[1], galleryAssets[2], galleryAssets[0]]
  },
  "gel-coat-exterior-painting": {
    card: galleryAssets[2],
    hero: {
      ...sharedHero,
      alt: "Gel coat and exterior fiberglass painting workflow for restored boat finish"
    },
    gallery: [galleryAssets[2], galleryAssets[1], galleryAssets[3], galleryAssets[0]]
  },
  "dent-scratch-repair": {
    card: galleryAssets[3],
    hero: {
      ...sharedHero,
      alt: "Dent and scratch repair with fiberglass finish blending and polishing"
    },
    gallery: [galleryAssets[3], galleryAssets[2], galleryAssets[1], galleryAssets[0]]
  },
  "buffing-waxing": {
    card: galleryAssets[5],
    hero: {
      ...galleryAssets[5],
      alt: "Buffing and waxing service for long-lasting fiberglass shine and protection"
    },
    gallery: [galleryAssets[5], galleryAssets[3], galleryAssets[2], galleryAssets[1]]
  }
};

const defaultMedia: ServiceMedia = {
  card: galleryAssets[0],
  hero: sharedHero,
  gallery: galleryAssets
};

export function getServiceMedia(slug: string): ServiceMedia {
  return serviceMediaBySlug[slug] ?? defaultMedia;
}
