import type {
  BlogPost,
  FaqItem,
  LocationPage,
  PortableTextBlock,
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

const richBlock = (text: string, style: "normal" | "h2" | "h3" = "normal"): PortableTextBlock => ({
  _type: "block",
  style,
  children: [{ _type: "span", text }]
});

const bullet = (text: string): PortableTextBlock => ({
  _type: "block",
  style: "normal",
  listItem: "bullet" as const,
  level: 1,
  children: [{ _type: "span", text }]
});

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

const singleBoardImages = [
  {
    url: "/images/products/single-adjustable-board-01.jpg",
    alt: "Single Adjustable Transducer board by Adley Enterprises - primary view"
  },
  {
    url: "/images/products/single-adjustable-board-02.jpg",
    alt: "American Made Single Adjustable Transducer board detail view"
  }
];

const dualPortImages = [
  {
    url: "/images/products/dual-port-adjustable-board-01.jpg",
    alt: "American Made Dual Transducer Board Port Side Adjustable Mount"
  },
  {
    url: "/images/products/dual-port-starboard-board-01.jpg",
    alt: "Adjustable dual transducer boards showing port and starboard orientations"
  }
];

const dualStarboardImages = [
  {
    url: "/images/products/dual-port-starboard-board-01.jpg",
    alt: "Adjustable dual transducer boards showing port and starboard orientations"
  },
  {
    url: "/images/products/dual-starboard-adjustable-board-02.jpg",
    alt: "Dual transducer mount detail image for starboard-side setup"
  }
];

export const fallbackProducts: Product[] = [
  {
    title: "American Made Single Adjustable Transducer Board",
    slug: "single-adjustable-transducer-board",
    summary:
      "Adjustable mount for single transducer setups. Built in Melrose, MN with free shipping in the USA.",
    price: 91,
    priceCurrency: "USD",
    mpn: "11-1-2023-SDB",
    ebayItemNumber: "204657035281",
    ebayUrl: "https://www.ebay.com/itm/204657035281",
    brand: "Adley Enterprises",
    type: "Adjustable",
    material: "Plastic",
    color: "Black",
    category: "Sporting Goods > Fishing > Fishfinders",
    condition: "New",
    inquiryOnly: false,
    shippingScope: "USA only",
    shippingInfo: "Free USPS Priority Mail shipping (2-5 business days) in the USA.",
    returnPolicy: "30-day returns. Buyer pays return shipping.",
    stockNote: "10+ available",
    unitsSoldNote: "5+ sold",
    locationNote: "Melrose, Minnesota",
    madeIn: "USA (Melrose, MN)",
    compatibilityNote:
      "Works with most popular fish finder transducer systems including common Garmin, Lowrance, and Humminbird setups. Contact us with your exact model to confirm fit.",
    socialProofNote:
      "100% positive seller feedback on eBay. Recent buyers report on-time delivery with no issues.",
    images: singleBoardImages,
    specifications: [
      { label: "Brand", value: "Adley Enterprises" },
      { label: "Model", value: "Single Adjustable Transducer Board" },
      { label: "MPN", value: "11-1-2023-SDB" },
      { label: "Type", value: "Adjustable" },
      { label: "Material", value: "Plastic" },
      { label: "Color", value: "Black" },
      { label: "Made In", value: "USA (Melrose, MN)" },
      { label: "Shipping", value: "Free USPS Priority Mail" },
      { label: "Returns", value: "30 days (buyer pays return shipping)" },
      { label: "Dimensions", value: "To be confirmed" },
      { label: "Weight", value: "To be confirmed" }
    ],
    relatedProductSlugs: ["dual-transducer-board-port-side", "dual-transducer-board-starboard-side"],
    variants: [{ name: "Single transducer setup" }],
    body: [
      richBlock(
        "This board is designed for anglers running a single transducer setup who need clean mounting and precise adjustment without switching to disposable bracket hardware."
      ),
      richBlock(
        "The core advantage is angle control. Instead of being stuck with a fixed plate, you can dial the transducer position to improve sonar returns based on your hull behavior, load, and typical running speed."
      ),
      richBlock(
        "Each board is built by Adley Enterprises in Melrose, Minnesota by the same team that performs fiberglass boat repairs. That practical shop experience matters when designing products that need to hold up in real marine conditions."
      ),
      richBlock(
        "If you are replacing an existing mount, send your current transducer model and stern photo before ordering. We can help confirm fit before shipment."
      )
    ],
    seo: {
      metaTitle: "American Made Single Adjustable Transducer Board | Adley Enterprises Transducer Mounts",
      metaDescription:
        "American Made Single Adjustable Transducer Board - $91.00. Adjustable transducer mount built in Melrose, MN with free USPS Priority Mail shipping."
    }
  },
  {
    title: "American Made Dual Transducer Board - Port Side Adjustable Mount",
    slug: "dual-transducer-board-port-side",
    summary:
      "Dual adjustable mount for port-side transducer configurations. Built in Melrose, MN with free USA shipping.",
    price: 175.5,
    priceCurrency: "USD",
    mpn: "To be confirmed",
    brand: "Adley Enterprises",
    type: "Adjustable dual mount (port side)",
    material: "Plastic",
    color: "Black",
    category: "Sporting Goods > Fishing > Fishfinders",
    condition: "New",
    inquiryOnly: false,
    shippingScope: "USA only",
    shippingInfo: "Free delivery in the USA.",
    returnPolicy: "30-day returns. Buyer pays return shipping.",
    stockNote: "Availability in eBay store",
    locationNote: "Melrose, Minnesota",
    madeIn: "USA (Melrose, MN)",
    compatibilityNote:
      "Designed for dual transducer layouts where port-side mounting and adjustability are required. Contact us with your electronics configuration to verify fit.",
    socialProofNote: "Premium adjustable mount built by fiberglass repair professionals in Minnesota.",
    images: dualPortImages,
    specifications: [
      { label: "Brand", value: "Adley Enterprises" },
      { label: "Model", value: "Dual Transducer Board - Port Side Adjustable Mount" },
      { label: "MPN", value: "To be confirmed" },
      { label: "Type", value: "Adjustable dual mount (port side)" },
      { label: "Material", value: "Plastic" },
      { label: "Color", value: "Black" },
      { label: "Made In", value: "USA (Melrose, MN)" },
      { label: "Shipping", value: "Free delivery" },
      { label: "Returns", value: "30 days (buyer pays return shipping)" },
      { label: "Dimensions", value: "To be confirmed" },
      { label: "Weight", value: "To be confirmed" }
    ],
    relatedProductSlugs: ["single-adjustable-transducer-board", "dual-transducer-board-starboard-side"],
    variants: [{ name: "Dual transducer port-side configuration" }],
    body: [
      richBlock(
        "This dual-board configuration is intended for anglers running two transducers and needing a dedicated port-side layout. The adjustable mount design helps fine-tune placement to improve real-world sonar performance."
      ),
      richBlock(
        "Compared with flat fixed plates, this setup gives you more control over angle and final position during install. That flexibility is useful when balancing multiple sonar sources on the same transom."
      ),
      richBlock(
        "Every board is manufactured in Adley's Melrose fiberglass shop. The focus is durability, repeatable setup, and clean mounting for serious fishing electronics."
      ),
      richBlock(
        "eBay item number and final MPN are being confirmed. Contact us directly if you want this configuration before published listing details are finalized."
      )
    ],
    seo: {
      metaTitle: "American Made Dual Transducer Board - Port Side | Adley Enterprises Transducer Mounts",
      metaDescription:
        "Dual Transducer Board - Port Side Adjustable Mount for $175.50. American-made in Melrose, MN with free USA shipping."
    }
  },
  {
    title: "American Made Dual Transducer Board - Starboard Side Adjustable Mount",
    slug: "dual-transducer-board-starboard-side",
    summary:
      "Dual adjustable mount for starboard-side transducer configurations. American made and built in Melrose, MN.",
    price: 175.5,
    priceCurrency: "USD",
    mpn: "To be confirmed",
    ebayItemNumber: "204657042455",
    ebayUrl: "https://www.ebay.com/itm/204657042455",
    brand: "Adley Enterprises",
    type: "Adjustable dual mount (starboard side)",
    material: "Plastic",
    color: "Black",
    category: "Sporting Goods > Fishing > Fishfinders",
    condition: "New",
    inquiryOnly: false,
    shippingScope: "USA only",
    shippingInfo: "Free delivery in the USA.",
    returnPolicy: "30-day returns. Buyer pays return shipping.",
    stockNote: "Availability in eBay store",
    locationNote: "Melrose, Minnesota",
    madeIn: "USA (Melrose, MN)",
    compatibilityNote:
      "Designed for dual transducer layouts that require starboard-side orientation. Contact us with your setup details to confirm fit.",
    socialProofNote: "Built in the same Minnesota shop trusted for fiberglass repair work.",
    images: dualStarboardImages,
    specifications: [
      { label: "Brand", value: "Adley Enterprises" },
      { label: "Model", value: "Dual Transducer Board - Starboard Side Adjustable Mount" },
      { label: "MPN", value: "To be confirmed" },
      { label: "Type", value: "Adjustable dual mount (starboard side)" },
      { label: "Material", value: "Plastic" },
      { label: "Color", value: "Black" },
      { label: "Made In", value: "USA (Melrose, MN)" },
      { label: "Shipping", value: "Free delivery" },
      { label: "Returns", value: "30 days (buyer pays return shipping)" },
      { label: "Dimensions", value: "To be confirmed" },
      { label: "Weight", value: "To be confirmed" }
    ],
    relatedProductSlugs: ["single-adjustable-transducer-board", "dual-transducer-board-port-side"],
    variants: [{ name: "Dual transducer starboard-side configuration" }],
    body: [
      richBlock(
        "This starboard-side dual board is built for boats where transducer placement, cable routing, and stern layout are best served on the right-side configuration."
      ),
      richBlock(
        "The adjustable design allows fine positioning during setup instead of committing to a fixed angle from the start. That control helps maximize sonar clarity and coverage for advanced fishing electronics."
      ),
      richBlock(
        "Adley manufactures these mounts in-house in Melrose, Minnesota. They are not generic imports and are designed by people who work on fiberglass boats daily."
      ),
      richBlock(
        "You can order through eBay or contact Adley directly to confirm fit before purchase."
      )
    ],
    seo: {
      metaTitle: "American Made Dual Transducer Board - Starboard Side | Adley Enterprises Transducer Mounts",
      metaDescription:
        "Dual Transducer Board - Starboard Side Adjustable Mount for $175.50. American-made in Melrose, MN with free delivery."
    }
  },
  {
    title: "American-Made Transducer Mounting Board",
    slug: "transducer-mounting-board",
    summary:
      "Entry-level non-adjustable transducer mounting board for budget-conscious setups.",
    price: 35.66,
    priceCurrency: "USD",
    brand: "Adley Enterprises",
    type: "Standard mounting board",
    material: "Plastic",
    color: "Black",
    category: "Sporting Goods > Fishing > Fishfinders",
    condition: "New",
    inquiryOnly: false,
    shippingScope: "USA only",
    shippingInfo: "Free delivery and free returns (per eBay listing).",
    returnPolicy: "Free returns.",
    stockNote: "To be confirmed",
    locationNote: "Melrose, Minnesota",
    madeIn: "USA (Melrose, MN)",
    compatibilityNote:
      "This is listed as a standard board option on eBay. Confirm final fit and application details before ordering.",
    socialProofNote:
      "Client confirmation pending for website publishing.",
    isPublished: false,
    images: singleBoardImages,
    specifications: [
      { label: "Brand", value: "Adley Enterprises" },
      { label: "Model", value: "Transducer Mounting Board" },
      { label: "Type", value: "Standard (non-adjustable)" },
      { label: "Material", value: "Plastic" },
      { label: "Color", value: "Black" },
      { label: "Made In", value: "USA (Melrose, MN)" },
      { label: "Shipping", value: "Free delivery" },
      { label: "Returns", value: "Free returns" }
    ],
    relatedProductSlugs: ["single-adjustable-transducer-board"],
    variants: [{ name: "Basic mounting board" }],
    body: paragraph(
      "This lower-cost standard mounting board appears in the eBay store but is currently held as pending client confirmation for website publishing."
    ),
    seo: {
      metaTitle: "American-Made Transducer Mounting Board | Adley Enterprises",
      metaDescription:
        "Standard transducer mounting board listed at $35.66 with free delivery. Publication pending confirmation."
    }
  }
];

export const fallbackProduct = fallbackProducts[0];

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
      "A practical checklist for spotting fiberglass damage before it turns into a bigger structural repair.",
    publishedAt: "2026-01-05",
    coverImageUrl: "/images/fiberglass-boat-repair-4-3-one.avif",
    coverImageAlt: "Fiberglass hull area prepped for structural and cosmetic repair",
    body: [
      richBlock(
        "Most fiberglass failures start as small visual changes: light spider cracking, chips near edges, and stress lines around hardware. Early inspection usually means simpler repairs, shorter downtime, and lower risk of hidden moisture intrusion."
      ),
      richBlock("What to Watch for During Routine Checks", "h2"),
      bullet("Spider cracks that keep returning in the same area."),
      bullet("Chips or gouges that expose fibers under the gel coat surface."),
      bullet("Soft or flexing sections when you apply light hand pressure."),
      bullet("Discoloration, bubbling, or dull patches that spread over time."),
      richBlock("Simple Documentation That Speeds Up Estimates", "h3"),
      richBlock(
        "Take a wide photo of the whole panel, then medium and close-up shots of the damage. Include one angled photo to show depth and one photo with a ruler or tape measure for scale. Add the boat make/model and where the damage is located."
      ),
      richBlock("When to Schedule a Professional Inspection", "h3"),
      richBlock(
        "If cracks are growing, if damage is near transom or high-load zones, or if there was recent impact, get the hull inspected before the next run. A fast review can prevent a cosmetic issue from becoming a structural correction."
      )
    ]
  },
  {
    title: "Gel Coat Repair vs Full Repaint: Which Is Right for Your Boat?",
    slug: "gel-coat-repair-vs-repaint",
    excerpt:
      "How to decide between targeted gel coat correction and broader exterior refinishing.",
    publishedAt: "2026-01-12",
    coverImageUrl: "/images/fiberglass-boat-repair-4-3-two.avif",
    coverImageAlt: "Technician preparing fiberglass surface for gel coat restoration",
    body: [
      richBlock(
        "Boat owners often ask whether they need spot gel coat repair or full repainting. The best answer depends on coverage area, damage depth, existing finish condition, and how closely you need color and gloss matched."
      ),
      richBlock("When Spot Gel Coat Repair Is Usually Enough", "h2"),
      bullet("Damage is isolated to one or two sections."),
      bullet("The surrounding finish is still stable and not heavily oxidized."),
      bullet("Color matching can be blended without obvious patch transitions."),
      richBlock(
        "Localized correction is often the faster path when the substrate is healthy and the issue is primarily surface-level."
      ),
      richBlock("When Broader Refinishing Makes More Sense", "h2"),
      bullet("Multiple repaired sections create inconsistent color or gloss."),
      bullet("Oxidation and weathering are present across wide panels."),
      bullet("Previous patch history makes new touch-up blending unreliable."),
      richBlock(
        "In those cases, a larger refinishing scope can produce a cleaner, longer-lasting visual result compared to repeated patching."
      ),
      richBlock(
        "Adley Enterprises does not publish one-size-fits-all pricing because every hull condition is different. The estimate process reviews repair depth, prep time, and finish scope so the recommendation matches your actual boat."
      )
    ]
  },
  {
    title: "What to Do After a Hull Collision",
    slug: "what-to-do-after-hull-collision",
    excerpt:
      "A step-by-step owner checklist after impact damage to protect the hull and speed up repairs.",
    publishedAt: "2026-01-19",
    coverImageUrl: "/images/checking-bodywork-on-boat-repair-optimized.jpg",
    coverImageAlt: "Hull collision damage inspection before fiberglass repair begins",
    body: [
      richBlock(
        "Collision damage is not always limited to what you can see on the surface. Fiberglass can fracture beneath the finish, so what looks small may still need structural correction."
      ),
      richBlock("Immediate Steps After Impact", "h2"),
      bullet("Prioritize safety and remove the boat from operation."),
      bullet("Photograph damage from wide, medium, and close-up angles."),
      bullet("Note where the impact happened and what was hit."),
      bullet("Avoid additional runs until structural condition is reviewed."),
      richBlock(
        "If you have insurance involvement, keep photos and timeline notes organized. That documentation helps keep inspection and claim conversations clear."
      ),
      richBlock("What to Avoid Before Inspection", "h3"),
      bullet("Do not grind, sand, or fill the area before evaluation."),
      bullet("Do not apply temporary coatings that hide crack edges."),
      bullet("Do not assume no leak means no structural concern."),
      richBlock(
        "Call with photos as soon as possible. Early assessment helps reduce moisture intrusion risk and prevents stress cracks from expanding while the boat is parked."
      )
    ]
  },
  {
    title: "How Often Should You Buff and Wax a Fiberglass Boat?",
    slug: "how-often-buff-and-wax-fiberglass-boat",
    excerpt:
      "Maintenance interval guidance based on storage, use patterns, and Central Minnesota conditions.",
    publishedAt: "2026-01-26",
    coverImageUrl: "/images/polishing-boat-optimized.jpg",
    coverImageAlt: "Technician buffing and polishing a fiberglass boat side panel",
    body: [
      richBlock(
        "Buffing and waxing keeps fiberglass finishes cleaner, glossier, and better protected from weather exposure. The right schedule depends less on the calendar and more on how the boat is stored and used."
      ),
      richBlock("Typical Service Rhythm by Use Case", "h2"),
      bullet("Indoor stored / moderate use: usually one full correction cycle per season."),
      bullet("Outdoor stored / frequent weekend use: often two cycles per season."),
      bullet("Heavy sun exposure or frequent trailering: touch-up intervals may be shorter."),
      richBlock(
        "If your finish already shows oxidation, a one-time corrective buffing stage may be needed before normal maintenance waxing."
      ),
      richBlock("Signs It Is Time for Service", "h3"),
      bullet("Water no longer beads consistently on the surface."),
      bullet("The hull looks chalky or dull after washing."),
      bullet("Fine swirl marks are visible in direct sunlight."),
      richBlock(
        "Regular maintenance protects earlier repair work too. If you recently completed collision or gel coat corrections, ask for a maintenance interval recommendation tied to your storage setup."
      )
    ]
  },
  {
    title: "Adjustable Transducer Mounts: Port, Starboard, and Single Setups",
    slug: "adjustable-transducer-mount-options",
    excerpt:
      "How to choose between single, port-side dual, and starboard-side dual transducer mount setups.",
    publishedAt: "2026-02-02",
    coverImageUrl: "/images/fiberglass-boat-repair-4-3-one.avif",
    coverImageAlt: "Boat stern area prepared for adjustable transducer mount setup",
    body: [
      richBlock(
        "Adley Enterprises builds inquiry-only adjustable transducer mounts for anglers and boat owners who need practical fitment options. The right layout depends on hull geometry, current electronics, and cable routing."
      ),
      richBlock("Core Configuration Options", "h2"),
      bullet("Single transducer mount for simpler sonar layouts."),
      bullet("Dual mount (port side) for side-specific electronics setups."),
      bullet("Dual mount (starboard side) for opposite-side routing needs."),
      richBlock(
        "Each configuration is intended to make mounting cleaner while allowing adjustment during setup and testing."
      ),
      richBlock("What to Confirm Before Ordering", "h3"),
      bullet("Your exact transducer model and bracket footprint."),
      bullet("Preferred side and cable path to your electronics panel."),
      bullet("Clearance at the stern and trailer bunk proximity."),
      richBlock(
        "Public pricing is not listed. Contact Adley Enterprises with your setup details for fit guidance and USA shipping options."
      )
    ]
  },
  {
    title: "How Photo Estimates Work for Fiberglass Boat Repair",
    slug: "how-photo-estimates-work",
    excerpt:
      "What photos to send and how to make your initial repair estimate faster and more accurate.",
    publishedAt: "2026-02-08",
    coverImageUrl: "/images/fiberglass-boat-repair-4-3-three.avif",
    coverImageAlt: "Close-up photo capture of fiberglass repair area for estimate review",
    body: [
      richBlock(
        "Photo estimates help start the conversation quickly, especially when you are comparing timelines before hauling the boat in. Good photos reduce back-and-forth and improve first-pass estimate quality."
      ),
      richBlock("Best Photo Set to Send", "h2"),
      bullet("One full-side image so damage context is clear."),
      bullet("Two medium shots showing the exact repair zone."),
      bullet("Two close-ups that capture crack depth or edge condition."),
      bullet("An angled shot to reveal contour distortion or dent shape."),
      bullet("A scale reference using tape measure or known object."),
      richBlock("Information to Include With Photos", "h3"),
      bullet("Boat make/model and approximate year."),
      bullet("How the damage happened and when it happened."),
      bullet("Whether the area was previously repaired."),
      richBlock(
        "Photo estimates are an initial planning step. Final scope is confirmed through in-person inspection when required, especially for collision-related or structurally sensitive areas."
      )
    ]
  },
  {
    title: "Spring Boat Prep Checklist for Central Minnesota",
    slug: "spring-boat-prep-central-minnesota",
    excerpt:
      "Pre-season fiberglass inspection and finish prep to reduce downtime during Minnesota’s launch window.",
    publishedAt: "2026-02-11",
    coverImageUrl: "/images/fiberglass-boat-repair-4-3-two.avif",
    coverImageAlt: "Spring-season fiberglass hull prep before boating launch",
    body: [
      richBlock(
        "In Central Minnesota, spring launch dates come fast. A structured pre-season check helps catch fiberglass issues before service queues get crowded."
      ),
      richBlock("Pre-Launch Inspection Checklist", "h2"),
      bullet("Inspect high-stress zones for fresh cracks and impact marks."),
      bullet("Check previous repair areas for movement or finish edge changes."),
      bullet("Look for oxidation or chalking on exposed gel coat surfaces."),
      bullet("Confirm all hardware mount points are sealed and stable."),
      richBlock(
        "Small corrections are easier to schedule before peak season. Waiting until first launch weekend can delay repairs when demand spikes."
      ),
      richBlock("Why Off-Season and Early Spring Scheduling Helps", "h3"),
      richBlock(
        "Early scheduling gives more flexibility for structural work, curing windows, and finish matching. If your boat needs both repair and detailing, combining services in one planned window can reduce total downtime."
      )
    ]
  },
  {
    title: "Signs You Need Professional Dent and Scratch Repair",
    slug: "signs-you-need-dent-scratch-repair",
    excerpt:
      "How to tell when cosmetic-looking damage could indicate deeper fiberglass correction needs.",
    publishedAt: "2026-02-14",
    coverImageUrl: "/images/fiberglass-boat-repair-4-3-four.avif",
    coverImageAlt: "Dent and scratch correction work on fiberglass hull panel",
    body: [
      richBlock(
        "Not all scratches are equal. Some are light finish marks, while others cut deep enough to expose substrate and invite further degradation."
      ),
      richBlock("Red Flags That Need Professional Review", "h2"),
      bullet("Scratches that catch a fingernail and appear layered."),
      bullet("Dents near chine lines, corners, or hardware zones."),
      bullet("Damage with surrounding spider cracks or dull halos."),
      bullet("Repeated chips in the same impact-prone location."),
      richBlock(
        "If a repair area is left untreated too long, minor finish damage can expand under stress, water exposure, and temperature changes."
      ),
      richBlock("What Affects Repair Scope", "h3"),
      bullet("Depth and spread of the damage."),
      bullet("Location relative to stress and load points."),
      bullet("Need for color blending across adjacent panels."),
      richBlock(
        "Adley Enterprises can review by phone and photo first, then confirm the final process with in-person inspection as needed."
      )
    ]
  },
  {
    title: "Service Areas We Cover Around Melrose, MN",
    slug: "service-areas-around-melrose",
    excerpt:
      "An overview of Central Minnesota communities regularly served from the Melrose shop.",
    publishedAt: "2026-02-18",
    coverImageUrl: "/images/fiberglass-boat-repair-wide.avif",
    coverImageAlt: "Adley Enterprises repair shop servicing Central Minnesota boat owners",
    body: [
      richBlock(
        "Adley Enterprises serves approximately a 30-mile radius around Melrose, MN, with regular fiberglass repair requests from nearby cities and regional lake communities."
      ),
      richBlock("Common Cities in the Primary Service Radius", "h2"),
      bullet("St. Cloud"),
      bullet("Sauk Rapids"),
      bullet("Waite Park"),
      bullet("St. Joseph"),
      bullet("Sauk Centre"),
      bullet("Cold Spring"),
      bullet("Long Prairie"),
      bullet("Albany"),
      bullet("Paynesville"),
      bullet("Richmond"),
      richBlock(
        "If you are outside that radius, contact the team anyway. In some cases, owners still choose Melrose service for fiberglass-only specialization."
      ),
      richBlock(
        "Appointment scheduling is recommended, especially during pre-season and mid-summer windows when demand increases."
      )
    ]
  },
  {
    title: "How to Protect Fiberglass Finish During Storage and Transport",
    slug: "protect-fiberglass-finish-storage-transport",
    excerpt:
      "Practical storage and transport habits that reduce avoidable finish wear between seasons.",
    publishedAt: "2026-02-21",
    coverImageUrl: "/images/fiberglass-boat-repair-4-3-three.avif",
    coverImageAlt: "Fiberglass finish polishing and protection before seasonal storage",
    body: [
      richBlock(
        "Storage and transport are two common sources of avoidable finish wear. A few setup changes can protect gel coat and reduce spring repair needs."
      ),
      richBlock("Pre-Storage Protection Steps", "h2"),
      bullet("Wash and fully dry surfaces before covering."),
      bullet("Remove residue around fittings, seams, and rub rail zones."),
      bullet("Apply protective wax before long off-season storage."),
      bullet("Use breathable covers to reduce trapped moisture."),
      richBlock("Transport Protection Checklist", "h3"),
      bullet("Secure straps to avoid rubbing against painted/gel surfaces."),
      bullet("Pad frequent contact points on trailer supports."),
      bullet("Inspect tie-down pressure after first miles on the road."),
      richBlock(
        "Add quick monthly checks during off-season storage. Spotting dull patches or abrasion early makes correction faster and helps preserve the overall finish."
      )
    ]
  }
];
