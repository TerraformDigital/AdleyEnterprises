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
    title: "Fiberglass Boat Repair in Melrose, MN | Adley Enterprises",
    description:
      "Structural and cosmetic fiberglass boat repair in Melrose, MN. Cracked, chipped, gouged, or stressed surfaces repaired. Free estimates. Call (320) 726-0822."
  },
  "hull-collision-repair": {
    title: "Hull Collision Repair | Fiberglass Boat Repair | Adley",
    description:
      "Impact and collision hull repair with fiberglass reconstruction, fairing, and finish blending. Melrose, MN. Free estimates. Call (320) 726-0822."
  },
  "gel-coat-exterior-painting": {
    title: "Gel Coat Repair & Exterior Painting | Adley Enterprises",
    description:
      "Gel coat touch-up and fiberglass exterior refinishing in Melrose, MN. Restore protection and appearance. Free estimates. Call (320) 726-0822."
  },
  "dent-scratch-repair": {
    title: "Dent & Scratch Repair | Fiberglass Boats | Adley Enterprises",
    description:
      "Fiberglass dent, chip, and scratch correction with finish-ready blending. Melrose, MN. Free estimates. Call (320) 726-0822."
  },
  "buffing-waxing": {
    title: "Boat Buffing & Waxing | Fiberglass Protection | Adley",
    description:
      "Professional buffing and waxing to restore shine and protect fiberglass surfaces. Melrose, MN. Call (320) 726-0822."
  }
};

export const LOCATION_METADATA_BY_SLUG: Record<string, { title: string; description: string }> = {
  "st-cloud-mn": {
    title: "Fiberglass Boat Repair Near St. Cloud, MN | Adley",
    description:
      "Fiberglass boat repair serving St. Cloud, MN. Hull collision repair, gel coat, dent correction, buffing. Located in Melrose - 30 min from St. Cloud. Call (320) 726-0822."
  },
  "sauk-rapids-mn": {
    title: "Fiberglass Boat Repair Near Sauk Rapids, MN | Adley",
    description:
      "Fiberglass boat repair serving Sauk Rapids, MN. Hull repair, gel coat refinishing, scratch correction. Located in Melrose. Call (320) 726-0822."
  },
  "waite-park-mn": {
    title: "Fiberglass Boat Repair Near Waite Park, MN | Adley",
    description:
      "Fiberglass boat repair serving Waite Park, MN. Full repair and refinishing services. Located in Melrose. Call (320) 726-0822."
  },
  "st-joseph-mn": {
    title: "Fiberglass Boat Repair Near St. Joseph, MN | Adley",
    description:
      "Fiberglass boat repair serving St. Joseph, MN. Structural and cosmetic repair. Located in Melrose. Call (320) 726-0822."
  },
  "sauk-centre-mn": {
    title: "Fiberglass Boat Repair Near Sauk Centre, MN | Adley",
    description:
      "Fiberglass boat repair serving Sauk Centre, MN. Hull collision repair, gel coat, buffing and waxing. Call (320) 726-0822."
  },
  "cold-spring-mn": {
    title: "Fiberglass Boat Repair Near Cold Spring, MN | Adley",
    description:
      "Fiberglass boat repair serving Cold Spring, MN. All repair and refinishing services. Located in Melrose. Call (320) 726-0822."
  },
  "long-prairie-mn": {
    title: "Fiberglass Boat Repair Near Long Prairie, MN | Adley",
    description:
      "Fiberglass boat repair serving Long Prairie, MN. Hull repair, gel coat, scratch correction. Located in Melrose. Call (320) 726-0822."
  },
  "albany-mn": {
    title: "Fiberglass Boat Repair Near Albany, MN | Adley",
    description:
      "Fiberglass boat repair serving Albany, MN. Full fiberglass repair and refinishing. Located in Melrose - just minutes away. Call (320) 726-0822."
  },
  "paynesville-mn": {
    title: "Fiberglass Boat Repair Near Paynesville, MN | Adley",
    description:
      "Fiberglass boat repair serving Paynesville, MN. Hull repair, gel coat, buffing and waxing. Located in Melrose. Call (320) 726-0822."
  },
  "richmond-mn": {
    title: "Fiberglass Boat Repair Near Richmond, MN | Adley",
    description:
      "Fiberglass boat repair serving Richmond, MN. Dent, scratch, and hull repair. Located in Melrose. Call (320) 726-0822."
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
