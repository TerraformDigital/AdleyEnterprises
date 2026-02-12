import type {
  BlogPost,
  FaqItem,
  LocationPage,
  Product,
  Service,
  SiteSettings
} from "@/types/content";

const paragraph = (text: string) => [
  {
    _type: "block",
    children: [{ _type: "span", text }]
  }
];

export const fallbackSiteSettings: SiteSettings = {
  siteTitle: "Adley Enterprises LLC",
  legalName: "Adley Enterprises LLC",
  phone: "+1 (320) 726-0822",
  email: "sales@adleyenterprises.com",
  streetAddress: "16 Industry Parkway NW",
  city: "Melrose",
  region: "MN",
  postalCode: "56352",
  country: "US",
  serviceRadiusMiles: 30,
  insured: true,
  yearsInBusiness: 15,
  warrantyNote:
    "Warranty claims are reviewed case-by-case with each written estimate and final repair scope approval.",
  aboutSummary:
    "Adley Enterprises LLC is a fiberglass-only boat repair shop serving Melrose and surrounding Central Minnesota communities with practical repair plans and quality finish work.",
  hours: [
    { day: "Monday", opens: "06:30", closes: "16:00" },
    { day: "Tuesday", opens: "06:30", closes: "16:00" },
    { day: "Wednesday", opens: "06:30", closes: "16:00" },
    { day: "Thursday", opens: "06:30", closes: "16:00" },
    { day: "Friday", notes: "By appointment only" },
    { day: "Saturday", notes: "Closed" },
    { day: "Sunday", notes: "Closed" }
  ]
};

export const fallbackServices: Service[] = [
  {
    title: "Fiberglass Boat Repair",
    slug: "fiberglass-boat-repair",
    shortDescription:
      "Fiberglass-only structural and cosmetic repair for cracked, chipped, gouged, or stressed boat surfaces.",
    body: paragraph(
      "Our fiberglass repair process includes inspection, repair planning, laminate correction, fairing, and finish blending for long-lasting results."
    ),
    featured: true,
    priority: 1
  },
  {
    title: "Hull Collision Repair",
    slug: "hull-collision-repair",
    shortDescription:
      "Impact and collision hull repair with fiberglass reconstruction, fairing, and finish blending.",
    body: paragraph(
      "We evaluate both visible and hidden collision damage, then complete a structured repair workflow from reconstruction through finish correction."
    ),
    featured: true,
    priority: 2
  },
  {
    title: "Gel Coat and Exterior Painting",
    slug: "gel-coat-exterior-painting",
    shortDescription:
      "Gel coat touch-up and exterior refinishing for durable protection and appearance.",
    body: paragraph(
      "We repair weathered or damaged exterior surfaces with gel coat correction and refinishing designed for clean appearance and protection."
    ),
    priority: 3
  },
  {
    title: "Dent and Scratch Repair",
    slug: "dent-scratch-repair",
    shortDescription:
      "Dent, chip, and scratch correction for fiberglass boat surfaces with finish-ready blending.",
    body: paragraph(
      "Damage is corrected with substrate prep, repair, fairing, and controlled finish blending to match nearby surfaces."
    ),
    priority: 4
  },
  {
    title: "Buffing and Waxing",
    slug: "buffing-waxing",
    shortDescription:
      "Protective finishing services to improve shine and help protect fiberglass surfaces.",
    body: paragraph(
      "Buffing and waxing helps maintain gloss, preserve gel coat, and reduce long-term finish wear from weather and use."
    ),
    priority: 5
  }
];

export const fallbackLocations: LocationPage[] = [
  "St. Cloud",
  "Sauk Rapids",
  "Waite Park",
  "St. Joseph",
  "Sauk Centre",
  "Cold Spring",
  "Long Prairie",
  "Albany",
  "Paynesville",
  "Richmond"
].map((city) => ({
  title: `Fiberglass Boat Repair in ${city}, MN`,
  slug: `${city
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/\s+/g, "-")}-mn`,
  city,
  region: "MN",
  shortDescription:
    `Adley Enterprises serves ${city}, MN with fiberglass-only boat repair, collision repair, and refinishing services.`,
  body: paragraph(
    `Boat owners in ${city}, MN can request estimates by phone, photo submission, or in-person inspection.`
  )
}));

export const fallbackProduct: Product = {
  title: "Adjustable Transducer Mounts",
  slug: "adjustable-transducer-mounts",
  summary:
    "Adjustable transducer board mounts for port side, starboard side, and single transducer setups.",
  body: paragraph(
    "This product is inquiry-based. Contact Adley Enterprises for fit guidance, setup options, and shipping details."
  ),
  inquiryOnly: true,
  shippingScope: "USA only",
  variants: [
    { name: "Port Side Mount" },
    { name: "Starboard Side Mount" },
    { name: "Single Transducer Mount" }
  ]
};

export const fallbackFaqs: FaqItem[] = [
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
  },
  {
    question: "How long does fiberglass repair usually take?",
    answer:
      "Turnaround time varies based on damage type, repair depth, finish work requirements, and schedule volume."
  },
  {
    question: "Do you handle hull collision and gel coat damage?",
    answer:
      "Yes. We handle both structural and cosmetic collision damage along with gel coat and exterior finish correction."
  },
  {
    question: "Do you offer buffing and waxing by itself?",
    answer:
      "Yes. Buffing and waxing can be scheduled as standalone service or bundled with other repair work."
  },
  {
    question: "Do you provide warranty coverage?",
    answer:
      "Warranty claims are reviewed with each written estimate and finalized during repair approval."
  },
  {
    question: "Which areas do you serve?",
    answer:
      "We serve approximately a 30-mile radius around Melrose, MN, including St. Cloud, Sauk Rapids, Waite Park, and nearby communities."
  },
  {
    question: "Do you sell adjustable transducer mounts?",
    answer:
      "Yes. We offer inquiry-only transducer mount options for port side, starboard side, and single transducer setups with USA shipping."
  }
].map((item, index) => ({
  question: item.question,
  order: index + 1,
  answer: paragraph(item.answer)
}));

export const fallbackBlogPosts: BlogPost[] = [
  {
    title: "Common Fiberglass Boat Damage and How to Spot It Early",
    slug: "common-fiberglass-boat-damage",
    excerpt:
      "Learn the most common signs of fiberglass damage and when to get a professional inspection.",
    publishedAt: "2026-01-05",
    body: paragraph(
      "Early damage detection helps reduce repair scope and cost, especially with repeated stress and impact exposure."
    )
  },
  {
    title: "Gel Coat Repair vs Full Repaint: Which Is Right for Your Boat?",
    slug: "gel-coat-repair-vs-repaint",
    excerpt:
      "How to decide between localized gel coat correction and full exterior refinishing.",
    publishedAt: "2026-01-12",
    body: paragraph(
      "The right path depends on the extent of surface damage, color match needs, and long-term use goals."
    )
  },
  {
    title: "What to Do After a Hull Collision",
    slug: "what-to-do-after-hull-collision",
    excerpt:
      "A practical owner checklist after impact damage before repair work starts.",
    publishedAt: "2026-01-19",
    body: paragraph(
      "Prioritize safety, damage documentation, and fast inspection to prevent additional structural problems."
    )
  },
  {
    title: "How Often Should You Buff and Wax a Fiberglass Boat?",
    slug: "how-often-buff-and-wax-fiberglass-boat",
    excerpt:
      "Maintenance timing guidance for appearance and finish protection.",
    publishedAt: "2026-01-26",
    body: paragraph(
      "Regular maintenance intervals vary by storage conditions, UV exposure, and usage patterns."
    )
  },
  {
    title: "Adjustable Transducer Mounts: Port, Starboard, and Single Setups",
    slug: "adjustable-transducer-mount-options",
    excerpt:
      "Overview of transducer mount options and when each setup is most useful.",
    publishedAt: "2026-02-02",
    body: paragraph(
      "Each mount layout should be selected based on hull design, electronics configuration, and performance goals."
    )
  },
  {
    title: "How Photo Estimates Work for Fiberglass Boat Repair",
    slug: "how-photo-estimates-work",
    excerpt:
      "What photos to send and how to make your initial repair estimate faster and more accurate.",
    publishedAt: "2026-02-08",
    body: paragraph(
      "Send wide shots, close-up damage views, and angle variations so we can review condition before in-person inspection."
    )
  },
  {
    title: "Spring Boat Prep Checklist for Central Minnesota",
    slug: "spring-boat-prep-central-minnesota",
    excerpt:
      "Pre-season fiberglass and finish checks to reduce delays when boating season starts.",
    publishedAt: "2026-02-11",
    body: paragraph(
      "Early spring inspections and small repair corrections can prevent larger issues during peak season."
    )
  },
  {
    title: "Signs You Need Professional Dent and Scratch Repair",
    slug: "signs-you-need-dent-scratch-repair",
    excerpt:
      "How to tell when cosmetic-looking damage may need professional correction.",
    publishedAt: "2026-02-14",
    body: paragraph(
      "If a scratch cuts beyond surface finish or appears near stress zones, professional review is recommended."
    )
  },
  {
    title: "Service Areas We Cover Around Melrose, MN",
    slug: "service-areas-around-melrose",
    excerpt:
      "A quick overview of communities within our regular fiberglass repair coverage area.",
    publishedAt: "2026-02-18",
    body: paragraph(
      "We serve a broad Central Minnesota coverage area and can confirm whether your city is inside our regular service range."
    )
  },
  {
    title: "How to Protect Fiberglass Finish During Storage and Transport",
    slug: "protect-fiberglass-finish-storage-transport",
    excerpt:
      "Simple habits that help preserve finish quality between seasons and long hauls.",
    publishedAt: "2026-02-21",
    body: paragraph(
      "Regular cleaning, dry storage prep, and abrasion protection reduce avoidable finish wear during off-season periods."
    )
  }
];
