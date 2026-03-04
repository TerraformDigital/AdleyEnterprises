export const BUSINESS_INFO = {
  legalName: "Adley Enterprises LLC",
  streetAddress: "16 Industry Parkway NW",
  city: "Melrose",
  region: "MN",
  postalCode: "56352",
  country: "US",
  phoneDisplay: "+1 (320) 726-0822",
  phoneTel: "+13207260822",
  email: "sales@adleyenterprises.com",
  geo: {
    latitude: 45.6747,
    longitude: -94.8094
  },
  ebayStoreUrl: "https://www.ebay.com/sch/adleyenterprises/m.html",
  logoPath: "/images/Adley-Enterprises-logo-concept-white.png",
  ogImagePath: "/images/Adley-Enterprises-OG.jpg"
} as const;

export const SERVICE_METADATA_BY_SLUG: Record<string, { title: string; description: string }> = {
  "fiberglass-boat-repair": {
    title: "Fiberglass Boat Repair Across the Midwest | Adley",
    description:
      "Structural and cosmetic fiberglass boat repair across the Midwest. Cracked, chipped, gouged, or stressed surfaces repaired. Free estimates. Call (320) 726-0822."
  },
  "hull-collision-repair": {
    title: "Hull Collision Repair Across the Midwest | Adley",
    description:
      "Impact and collision hull repair with fiberglass reconstruction, fairing, and finish blending across the Midwest. Free estimates. Call (320) 726-0822."
  },
  "gel-coat-exterior-painting": {
    title: "Gel Coat Repair & Refinishing Across the Midwest | Adley",
    description:
      "Gel coat touch-up and fiberglass refinishing for Midwest boat owners. Restore protection and appearance. Free estimates. Call (320) 726-0822."
  },
  "dent-scratch-repair": {
    title: "Chip & Scratch Repair Across the Midwest | Adley",
    description:
      "Fiberglass chip and scratch correction with finish-ready blending across the Midwest. Free estimates. Call (320) 726-0822."
  },
  "buffing-waxing": {
    title: "Boat Buffing & Waxing Across the Midwest | Adley",
    description:
      "Professional buffing and waxing to restore shine and protect fiberglass surfaces across the Midwest. Call (320) 726-0822."
  }
};

export const LOCATION_METADATA_BY_SLUG: Record<string, { title: string; description: string }> = {
  minnesota: {
    title: "Fiberglass Boat Repair in Minnesota | Adley Enterprises",
    description:
      "Fiberglass boat repair services for Minnesota boat owners. Hull collision repair, gel coat refinishing, chip and scratch correction, buffing and waxing. Call (320) 726-0822."
  },
  iowa: {
    title: "Fiberglass Boat Repair in Iowa | Adley Enterprises",
    description:
      "Fiberglass boat repair services for Iowa boat owners. Hull collision repair, gel coat refinishing, chip and scratch correction, buffing and waxing. Call (320) 726-0822."
  },
  wisconsin: {
    title: "Fiberglass Boat Repair in Wisconsin | Adley Enterprises",
    description:
      "Fiberglass boat repair services for Wisconsin boat owners. Hull collision repair, gel coat refinishing, chip and scratch correction, buffing and waxing. Call (320) 726-0822."
  },
  michigan: {
    title: "Fiberglass Boat Repair in Michigan | Adley Enterprises",
    description:
      "Fiberglass boat repair services for Michigan boat owners. Hull collision repair, gel coat refinishing, chip and scratch correction, buffing and waxing. Call (320) 726-0822."
  },
  "north-dakota": {
    title: "Fiberglass Boat Repair in North Dakota | Adley Enterprises",
    description:
      "Fiberglass boat repair services for North Dakota boat owners. Hull collision repair, gel coat refinishing, chip and scratch correction, buffing and waxing. Call (320) 726-0822."
  },
  "south-dakota": {
    title: "Fiberglass Boat Repair in South Dakota | Adley Enterprises",
    description:
      "Fiberglass boat repair services for South Dakota boat owners. Hull collision repair, gel coat refinishing, chip and scratch correction, buffing and waxing. Call (320) 726-0822."
  },
  montana: {
    title: "Fiberglass Boat Repair in Montana | Adley Enterprises",
    description:
      "Fiberglass boat repair services for Montana boat owners. Hull collision repair, gel coat refinishing, chip and scratch correction, buffing and waxing. Call (320) 726-0822."
  }
};

export const PRODUCT_METADATA_BY_SLUG: Record<string, { title: string; description: string }> = {
  "single-adjustable-transducer-board": {
    title: "Single Adjustable Transducer Board | $91 - Free Shipping",
    description:
      "American Made Single Adjustable Transducer Board - $91.00. Built in Melrose, MN. Adjustable design for optimal fish finder performance. Free USPS Priority Mail."
  },
  "dual-transducer-board-port-side": {
    title: "Dual Transducer Board - Port Side | $175.50 - Free Shipping",
    description:
      "American Made Dual Transducer Board, port side mount - $175.50. Adjustable dual transducer setup. Built in Melrose, MN. Free shipping."
  },
  "dual-transducer-board-starboard-side": {
    title: "Dual Transducer Board - Starboard | $175.50 - Free Shipping",
    description:
      "American Made Dual Transducer Board, starboard side - $175.50. Adjustable dual mount. Built in Melrose, MN. Free shipping."
  }
};

export const HOMEPAGE_FAQ_ITEMS: Array<{ question: string; answer: string }> = [
  {
    question: "What types of boats do you repair?",
    answer:
      "We repair fiberglass boats only. Our shop focuses on fiberglass-specific repair and refinishing workflows."
  },
  {
    question: "Do you repair aluminum boats?",
    answer: "No. We focus exclusively on fiberglass boat repair services."
  },
  {
    question: "How do I request an estimate?",
    answer:
      "You can call us directly, submit your information through the quote form, and include photos if available."
  },
  {
    question: "Can I send photos before bringing the boat in?",
    answer: "Yes. Photo submission is encouraged for faster initial review and estimate planning."
  }
];
