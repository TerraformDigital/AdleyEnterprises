import fs from "node:fs";
import path from "node:path";

const outputDir = path.join(process.cwd(), "sanity/seed");

let keyCounter = 0;
const key = () => `k${(keyCounter += 1).toString(36)}`;

const block = (text, style = "normal") => ({
  _type: "block",
  _key: key(),
  style,
  markDefs: [],
  children: [
    {
      _type: "span",
      _key: key(),
      text,
      marks: []
    }
  ]
});

const listItemBlock = (text, listItem = "bullet", level = 1, style = "normal") => ({
  _type: "block",
  _key: key(),
  style,
  listItem,
  level,
  markDefs: [],
  children: [
    {
      _type: "span",
      _key: key(),
      text,
      marks: []
    }
  ]
});

const toSlug = (value) =>
  value
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const defaultSeo = {
  _type: "seo",
  metaTitle: "Adley Enterprises LLC | Fiberglass Boat Repair in Melrose, MN",
  metaDescription:
    "Fiberglass-only boat repair, hull collision repair, gel coat refinishing, and detailing services for Central Minnesota boat owners."
};

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
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
    "Adley Enterprises LLC is a fiberglass-only boat repair shop serving Melrose and surrounding Central Minnesota communities. We focus on practical repairs, quality finish work, and clear estimate communication.",
  hours: [
    { _type: "object", _key: key(), day: "Monday", opens: "06:30", closes: "16:00" },
    { _type: "object", _key: key(), day: "Tuesday", opens: "06:30", closes: "16:00" },
    { _type: "object", _key: key(), day: "Wednesday", opens: "06:30", closes: "16:00" },
    { _type: "object", _key: key(), day: "Thursday", opens: "06:30", closes: "16:00" },
    { _type: "object", _key: key(), day: "Friday", notes: "By appointment only" },
    { _type: "object", _key: key(), day: "Saturday", notes: "Closed" },
    { _type: "object", _key: key(), day: "Sunday", notes: "Closed" }
  ],
  seo: defaultSeo
};

const services = [
  {
    _id: "service.fiberglass-boat-repair",
    _type: "service",
    title: "Fiberglass Boat Repair",
    slug: { _type: "slug", current: "fiberglass-boat-repair" },
    shortDescription:
      "Fiberglass-only structural and cosmetic repair for cracked, chipped, gouged, or stressed boat surfaces.",
    featured: true,
    priority: 1,
    body: [
      block(
        "Our fiberglass boat repair process starts with a damage inspection and clear estimate. We document what is cosmetic vs structural so you understand the repair plan before work begins."
      ),
      block(
        "Typical repairs include stress cracks, gouges, impact fractures, and worn finish areas. Surface prep, fiberglass rebuilding, fairing, and finish matching are completed as one coordinated workflow."
      ),
      block(
        "Adley Enterprises works on fiberglass boats only. This keeps tools, materials, and processes focused on long-lasting fiberglass repair outcomes."
      )
    ],
    seo: {
      _type: "seo",
      metaTitle: "Fiberglass Boat Repair Near Melrose, MN | Adley Enterprises LLC",
      metaDescription:
        "Professional fiberglass boat repair in Central Minnesota. Request an estimate by call, photos, or in-person inspection."
    }
  },
  {
    _id: "service.hull-collision-repair",
    _type: "service",
    title: "Hull Collision Repair",
    slug: { _type: "slug", current: "hull-collision-repair" },
    shortDescription:
      "Impact and collision hull repair with fiberglass reconstruction, fairing, and finish blending.",
    featured: true,
    priority: 2,
    body: [
      block(
        "Hull collision damage can involve both visible finish issues and hidden structural stress. We inspect impact areas, map repair zones, and build a practical repair scope for safe return to service."
      ),
      block(
        "Repairs may include crack stabilization, laminate reconstruction, fairing, and exterior finish correction. Each project is reviewed based on collision severity and hull condition."
      ),
      block(
        "If you have recent collision damage, call first and send photos. Early assessment helps prevent additional moisture intrusion or stress-related growth of damaged areas."
      )
    ],
    seo: {
      _type: "seo",
      metaTitle: "Boat Hull Collision Repair in Central Minnesota | Adley Enterprises",
      metaDescription:
        "Hull collision repair for fiberglass boats near Melrose, MN. Call for inspection and written estimate."
    }
  },
  {
    _id: "service.gel-coat-exterior-painting",
    _type: "service",
    title: "Gel Coat and Exterior Painting",
    slug: { _type: "slug", current: "gel-coat-exterior-painting" },
    shortDescription:
      "Gel coat touch-up and exterior refinishing to restore appearance and help protect fiberglass surfaces.",
    featured: true,
    priority: 3,
    body: [
      block(
        "Sun, abrasion, and repeated use eventually wear down gel coat surfaces. We repair and refinish damaged sections with attention to color blend and finish consistency."
      ),
      block(
        "Projects range from localized gel coat correction to larger exterior refinishing work. We review your boat condition and recommend the best path based on damage depth and coverage area."
      ),
      block(
        "Our goal is a clean, durable finish that supports both appearance and long-term protection."
      )
    ],
    seo: {
      _type: "seo",
      metaTitle: "Gel Coat Repair and Exterior Boat Painting | Adley Enterprises",
      metaDescription:
        "Gel coat touch-up and exterior refinishing for fiberglass boats in Melrose, MN and nearby cities."
    }
  },
  {
    _id: "service.dent-scratch-repair",
    _type: "service",
    title: "Dent and Scratch Repair",
    slug: { _type: "slug", current: "dent-scratch-repair" },
    shortDescription:
      "Dent, chip, and scratch correction for fiberglass boat surfaces with finish-ready blending.",
    featured: true,
    priority: 4,
    body: [
      block(
        "Dents and scratches can reduce finish quality and expose fiberglass to additional wear. We assess depth and surrounding condition before selecting a repair approach."
      ),
      block(
        "Repairs include prep, material correction, fairing, and final finish blending so repaired sections align with nearby surfaces as closely as possible."
      ),
      block(
        "If you are not sure whether damage is cosmetic or structural, send photos and we can advise next steps."
      )
    ],
    seo: {
      _type: "seo",
      metaTitle: "Boat Dent and Scratch Repair in Minnesota | Adley Enterprises",
      metaDescription:
        "Fiberglass dent and scratch repair for boat owners in the Melrose area. Request your estimate today."
    }
  },
  {
    _id: "service.buffing-waxing",
    _type: "service",
    title: "Buffing and Waxing",
    slug: { _type: "slug", current: "buffing-waxing" },
    shortDescription:
      "Professional buffing and waxing to improve gloss and preserve fiberglass finish quality.",
    featured: true,
    priority: 5,
    body: [
      block(
        "Buffing and waxing helps maintain finish clarity, improve appearance, and reduce surface dulling caused by weather and storage conditions."
      ),
      block(
        "We offer buffing/waxing as a standalone service or as part of a larger repair and refinishing scope."
      ),
      block(
        "Consistent maintenance is one of the best ways to protect gel coat and extend the life of your exterior finish."
      )
    ],
    seo: {
      _type: "seo",
      metaTitle: "Boat Buffing and Waxing in Central Minnesota | Adley Enterprises",
      metaDescription:
        "Fiberglass boat buffing and waxing services for lasting shine and finish protection near Melrose, MN."
    }
  }
];

const locationCities = [
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
];

const locationPages = locationCities.map((city, index) => {
  const slug = `${toSlug(city)}-mn`;

  return {
    _id: `location.${slug}`,
    _type: "locationPage",
    title: `Fiberglass Boat Repair in ${city}, MN`,
    slug: { _type: "slug", current: slug },
    city,
    region: "MN",
    shortDescription:
      `Adley Enterprises provides fiberglass-only boat repair services for ${city}, MN, including collision repair, gel coat work, and finish restoration.`,
    body: [
      block(
        `${city} boat owners can request fiberglass repair estimates by phone, photo submission, or in-person inspection at our Melrose location.`
      ),
      block(
        "Common requests include hull collision repair, crack and gouge correction, dent and scratch repair, and finish restoration with buffing and waxing."
      ),
      block(
        "Repair timelines vary by damage severity and parts/material needs. We provide a written estimate before work is approved."
      )
    ],
    seo: {
      _type: "seo",
      metaTitle: `Fiberglass Boat Repair in ${city}, MN | Adley Enterprises LLC`,
      metaDescription:
        `Fiberglass-only boat repair services for ${city}, MN. Call Adley Enterprises for estimates and scheduling.`
    }
  };
});

const singleBoardImages = [
  {
    _type: "object",
    _key: key(),
    url: "/images/products/single-adjustable-board-01.jpg",
    alt: "Single Adjustable Transducer board by Adley Enterprises - primary view"
  },
  {
    _type: "object",
    _key: key(),
    url: "/images/products/single-adjustable-board-02.jpg",
    alt: "American Made Single Adjustable Transducer board detail view"
  }
];

const dualPortImages = [
  {
    _type: "object",
    _key: key(),
    url: "/images/products/dual-port-adjustable-board-01.jpg",
    alt: "American Made Dual Transducer Board Port Side Adjustable Mount"
  },
  {
    _type: "object",
    _key: key(),
    url: "/images/products/dual-port-starboard-board-01.jpg",
    alt: "Adjustable dual transducer boards showing port and starboard orientations"
  }
];

const dualStarboardImages = [
  {
    _type: "object",
    _key: key(),
    url: "/images/products/dual-port-starboard-board-01.jpg",
    alt: "Adjustable dual transducer boards showing port and starboard orientations"
  },
  {
    _type: "object",
    _key: key(),
    url: "/images/products/dual-starboard-adjustable-board-02.jpg",
    alt: "Dual transducer mount detail image for starboard-side setup"
  }
];

const makeSpec = (label, value) => ({
  _type: "object",
  _key: key(),
  label,
  value
});

const products = [
  {
    _id: "product.single-adjustable-transducer-board",
    _type: "product",
    title: "American Made Single Adjustable Transducer Board",
    slug: { _type: "slug", current: "single-adjustable-transducer-board" },
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
    isPublished: true,
    images: singleBoardImages,
    specifications: [
      makeSpec("Brand", "Adley Enterprises"),
      makeSpec("Model", "Single Adjustable Transducer Board"),
      makeSpec("MPN", "11-1-2023-SDB"),
      makeSpec("Type", "Adjustable"),
      makeSpec("Material", "Plastic"),
      makeSpec("Color", "Black"),
      makeSpec("Made In", "USA (Melrose, MN)"),
      makeSpec("Shipping", "Free USPS Priority Mail"),
      makeSpec("Returns", "30 days (buyer pays return shipping)"),
      makeSpec("Dimensions", "To be confirmed"),
      makeSpec("Weight", "To be confirmed")
    ],
    relatedProductSlugs: ["dual-transducer-board-port-side", "dual-transducer-board-starboard-side"],
    variants: [
      {
        _type: "object",
        _key: key(),
        name: "Single transducer setup"
      }
    ],
    body: [
      block(
        "This board is designed for anglers running a single transducer setup who need clean mounting and precise adjustment without switching to disposable bracket hardware."
      ),
      block(
        "The core advantage is angle control. Instead of being stuck with a fixed plate, you can dial the transducer position to improve sonar returns based on your hull behavior, load, and typical running speed."
      ),
      block(
        "Each board is built by Adley Enterprises in Melrose, Minnesota by the same team that performs fiberglass boat repairs."
      )
    ],
    seo: {
      _type: "seo",
      metaTitle: "American Made Single Adjustable Transducer Board | Adley Enterprises Transducer Mounts",
      metaDescription:
        "American Made Single Adjustable Transducer Board - $91.00. Adjustable transducer mount built in Melrose, MN with free USPS Priority Mail shipping."
    }
  },
  {
    _id: "product.dual-transducer-board-port-side",
    _type: "product",
    title: "American Made Dual Transducer Board - Port Side Adjustable Mount",
    slug: { _type: "slug", current: "dual-transducer-board-port-side" },
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
      "Designed for dual transducer layouts where port-side mounting and adjustability are required.",
    socialProofNote: "Premium adjustable mount built by fiberglass repair professionals in Minnesota.",
    isPublished: true,
    images: dualPortImages,
    specifications: [
      makeSpec("Brand", "Adley Enterprises"),
      makeSpec("Model", "Dual Transducer Board - Port Side Adjustable Mount"),
      makeSpec("MPN", "To be confirmed"),
      makeSpec("Type", "Adjustable dual mount (port side)"),
      makeSpec("Material", "Plastic"),
      makeSpec("Color", "Black"),
      makeSpec("Made In", "USA (Melrose, MN)"),
      makeSpec("Shipping", "Free delivery"),
      makeSpec("Returns", "30 days (buyer pays return shipping)"),
      makeSpec("Dimensions", "To be confirmed"),
      makeSpec("Weight", "To be confirmed")
    ],
    relatedProductSlugs: ["single-adjustable-transducer-board", "dual-transducer-board-starboard-side"],
    variants: [
      {
        _type: "object",
        _key: key(),
        name: "Dual transducer port-side configuration"
      }
    ],
    body: [
      block(
        "This dual-board configuration is intended for anglers running two transducers and needing a dedicated port-side layout."
      ),
      block(
        "Compared with flat fixed plates, this setup gives you more control over angle and final position during install."
      ),
      block(
        "eBay item number and final MPN are being confirmed. Contact us directly if you want this configuration before published listing details are finalized."
      )
    ],
    seo: {
      _type: "seo",
      metaTitle: "American Made Dual Transducer Board - Port Side | Adley Enterprises Transducer Mounts",
      metaDescription:
        "Dual Transducer Board - Port Side Adjustable Mount for $175.50. American-made in Melrose, MN with free USA shipping."
    }
  },
  {
    _id: "product.dual-transducer-board-starboard-side",
    _type: "product",
    title: "American Made Dual Transducer Board - Starboard Side Adjustable Mount",
    slug: { _type: "slug", current: "dual-transducer-board-starboard-side" },
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
      "Designed for dual transducer layouts that require starboard-side orientation.",
    socialProofNote: "Built in the same Minnesota shop trusted for fiberglass repair work.",
    isPublished: true,
    images: dualStarboardImages,
    specifications: [
      makeSpec("Brand", "Adley Enterprises"),
      makeSpec("Model", "Dual Transducer Board - Starboard Side Adjustable Mount"),
      makeSpec("MPN", "To be confirmed"),
      makeSpec("Type", "Adjustable dual mount (starboard side)"),
      makeSpec("Material", "Plastic"),
      makeSpec("Color", "Black"),
      makeSpec("Made In", "USA (Melrose, MN)"),
      makeSpec("Shipping", "Free delivery"),
      makeSpec("Returns", "30 days (buyer pays return shipping)"),
      makeSpec("Dimensions", "To be confirmed"),
      makeSpec("Weight", "To be confirmed")
    ],
    relatedProductSlugs: ["single-adjustable-transducer-board", "dual-transducer-board-port-side"],
    variants: [
      {
        _type: "object",
        _key: key(),
        name: "Dual transducer starboard-side configuration"
      }
    ],
    body: [
      block(
        "This starboard-side dual board is built for boats where transducer placement, cable routing, and stern layout are best served on the right-side configuration."
      ),
      block(
        "The adjustable design allows fine positioning during setup instead of committing to a fixed angle from the start."
      ),
      block(
        "You can order through eBay or contact Adley directly to confirm fit before purchase."
      )
    ],
    seo: {
      _type: "seo",
      metaTitle: "American Made Dual Transducer Board - Starboard Side | Adley Enterprises Transducer Mounts",
      metaDescription:
        "Dual Transducer Board - Starboard Side Adjustable Mount for $175.50. American-made in Melrose, MN with free delivery."
    }
  },
  {
    _id: "product.transducer-mounting-board",
    _type: "product",
    title: "American-Made Transducer Mounting Board",
    slug: { _type: "slug", current: "transducer-mounting-board" },
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
    locationNote: "Melrose, Minnesota",
    madeIn: "USA (Melrose, MN)",
    compatibilityNote:
      "This is listed as a standard board option on eBay. Confirm final fit and application details before ordering.",
    socialProofNote: "Client confirmation pending for website publishing.",
    isPublished: false,
    images: singleBoardImages,
    specifications: [
      makeSpec("Brand", "Adley Enterprises"),
      makeSpec("Model", "Transducer Mounting Board"),
      makeSpec("Type", "Standard (non-adjustable)"),
      makeSpec("Material", "Plastic"),
      makeSpec("Color", "Black"),
      makeSpec("Made In", "USA (Melrose, MN)"),
      makeSpec("Shipping", "Free delivery"),
      makeSpec("Returns", "Free returns")
    ],
    relatedProductSlugs: ["single-adjustable-transducer-board"],
    variants: [
      {
        _type: "object",
        _key: key(),
        name: "Basic mounting board"
      }
    ],
    body: [block("This board is held as optional pending client confirmation for website publishing.")],
    seo: {
      _type: "seo",
      metaTitle: "American-Made Transducer Mounting Board | Adley Enterprises",
      metaDescription:
        "Standard transducer mounting board listed at $35.66 with free delivery. Publication pending confirmation."
    }
  }
];

const faqItems = [
  {
    q: "What types of boats do you repair?",
    a: "We repair fiberglass boats only. Our shop focuses on fiberglass-specific repair and refinishing workflows."
  },
  {
    q: "Do you repair aluminum boats?",
    a: "No. We focus exclusively on fiberglass boat repair services."
  },
  {
    q: "How do I request an estimate?",
    a: "You can call us directly, submit your information through the quote form, and include photos if available."
  },
  {
    q: "Can I send photos before bringing the boat in?",
    a: "Yes. Photo submission is encouraged for faster initial review and estimate planning."
  },
  {
    q: "How long does fiberglass repair usually take?",
    a: "Turnaround time varies based on damage type, repair depth, finish work requirements, and schedule volume."
  },
  {
    q: "Do you handle hull collision and gel coat damage?",
    a: "Yes. We handle both structural and cosmetic collision damage along with gel coat and exterior finish correction."
  },
  {
    q: "Do you offer buffing and waxing by itself?",
    a: "Yes. Buffing and waxing can be scheduled as standalone service or bundled with other repair work."
  },
  {
    q: "Do you provide warranty coverage?",
    a: "Warranty claims are reviewed with each written estimate and finalized during repair approval."
  },
  {
    q: "Which areas do you serve?",
    a: "We serve approximately a 30-mile radius around Melrose, MN, including St. Cloud, Sauk Rapids, Waite Park, and nearby communities."
  },
  {
    q: "Do you sell adjustable transducer mounts?",
    a: "Yes. We offer inquiry-only transducer mount options for port side, starboard side, and single transducer setups with USA shipping."
  }
].map((item, index) => ({
  _id: `faq.${index + 1}`,
  _type: "faqItem",
  question: item.q,
  answer: [block(item.a)],
  order: index + 1,
  seo: { _type: "seo" }
}));

const blogSeeds = [
  {
    title: "Common Fiberglass Boat Damage and How to Spot It Early",
    slug: "common-fiberglass-boat-damage",
    excerpt:
      "A practical checklist for spotting fiberglass damage before it turns into a bigger structural repair.",
    coverImageUrl: "/images/fiberglass-boat-repair-4-3-one.avif",
    coverImageAlt: "Fiberglass hull area prepped for structural and cosmetic repair",
    body: [
      { style: "normal", text: "Most fiberglass failures start as small visual changes: light spider cracking, chips near edges, and stress lines around hardware. Early inspection usually means simpler repairs, shorter downtime, and lower risk of hidden moisture intrusion." },
      { style: "h2", text: "What to Watch for During Routine Checks" },
      { listItem: "bullet", text: "Spider cracks that keep returning in the same area." },
      { listItem: "bullet", text: "Chips or gouges that expose fibers under the gel coat surface." },
      { listItem: "bullet", text: "Soft or flexing sections when you apply light hand pressure." },
      { listItem: "bullet", text: "Discoloration, bubbling, or dull patches that spread over time." },
      { style: "h3", text: "Simple Documentation That Speeds Up Estimates" },
      { style: "normal", text: "Take a wide photo of the whole panel, then medium and close-up shots of the damage. Include one angled photo to show depth and one photo with a ruler or tape measure for scale." },
      { style: "normal", text: "If cracks are growing or damage is near high-load zones, schedule inspection before the next run." }
    ]
  },
  {
    title: "Gel Coat Repair vs Full Repaint: Which Is Right for Your Boat?",
    slug: "gel-coat-repair-vs-repaint",
    excerpt:
      "How to decide between targeted gel coat correction and broader exterior refinishing.",
    coverImageUrl: "/images/fiberglass-boat-repair-4-3-two.avif",
    coverImageAlt: "Technician preparing fiberglass surface for gel coat restoration",
    body: [
      { style: "normal", text: "Boat owners often ask whether they need spot gel coat repair or full repainting. The best answer depends on coverage area, damage depth, and finish consistency." },
      { style: "h2", text: "When Spot Gel Coat Repair Is Usually Enough" },
      { listItem: "bullet", text: "Damage is isolated to one or two sections." },
      { listItem: "bullet", text: "The surrounding finish is still stable and not heavily oxidized." },
      { listItem: "bullet", text: "Color matching can be blended without obvious patch transitions." },
      { style: "h2", text: "When Broader Refinishing Makes More Sense" },
      { listItem: "bullet", text: "Multiple repaired sections create inconsistent color or gloss." },
      { listItem: "bullet", text: "Oxidation and weathering are present across wide panels." },
      { listItem: "bullet", text: "Previous patch history makes new touch-up blending unreliable." },
      { style: "normal", text: "Adley Enterprises does not publish one-size-fits-all pricing. Every estimate is tied to real hull condition and finish scope." }
    ]
  },
  {
    title: "What to Do After a Hull Collision",
    slug: "what-to-do-after-hull-collision",
    excerpt:
      "A step-by-step owner checklist after impact damage to protect the hull and speed up repairs.",
    coverImageUrl: "/images/checking-bodywork-on-boat-repair-optimized.jpg",
    coverImageAlt: "Hull collision damage inspection before fiberglass repair begins",
    body: [
      { style: "normal", text: "Collision damage is not always limited to what you can see on the surface. Fiberglass can fracture beneath the finish, so what looks small may still need structural correction." },
      { style: "h2", text: "Immediate Steps After Impact" },
      { listItem: "bullet", text: "Prioritize safety and remove the boat from operation." },
      { listItem: "bullet", text: "Photograph damage from wide, medium, and close-up angles." },
      { listItem: "bullet", text: "Note where the impact happened and what was hit." },
      { listItem: "bullet", text: "Avoid additional runs until structural condition is reviewed." },
      { style: "h3", text: "What to Avoid Before Inspection" },
      { listItem: "bullet", text: "Do not grind, sand, or fill the area before evaluation." },
      { listItem: "bullet", text: "Do not apply temporary coatings that hide crack edges." },
      { style: "normal", text: "Early assessment helps reduce moisture intrusion risk and prevents stress cracks from expanding while the boat is parked." }
    ]
  },
  {
    title: "How Often Should You Buff and Wax a Fiberglass Boat?",
    slug: "how-often-buff-and-wax-fiberglass-boat",
    excerpt:
      "Maintenance interval guidance based on storage, use patterns, and Central Minnesota conditions.",
    coverImageUrl: "/images/polishing-boat-optimized.jpg",
    coverImageAlt: "Technician buffing and polishing a fiberglass boat side panel",
    body: [
      { style: "normal", text: "Buffing and waxing keeps fiberglass finishes cleaner, glossier, and better protected from weather exposure." },
      { style: "h2", text: "Typical Service Rhythm by Use Case" },
      { listItem: "bullet", text: "Indoor stored / moderate use: usually one full correction cycle per season." },
      { listItem: "bullet", text: "Outdoor stored / frequent weekend use: often two cycles per season." },
      { listItem: "bullet", text: "Heavy sun exposure or frequent trailering: touch-up intervals may be shorter." },
      { style: "h3", text: "Signs It Is Time for Service" },
      { listItem: "bullet", text: "Water no longer beads consistently on the surface." },
      { listItem: "bullet", text: "The hull looks chalky or dull after washing." },
      { listItem: "bullet", text: "Fine swirl marks are visible in direct sunlight." },
      { style: "normal", text: "Regular maintenance helps protect earlier repair work and keeps finish quality consistent through the season." }
    ]
  },
  {
    title: "How Photo Estimates Work for Fiberglass Boat Repair",
    slug: "how-photo-estimates-work",
    excerpt:
      "What photos to send and how to make your initial repair estimate faster and more accurate.",
    coverImageUrl: "/images/fiberglass-boat-repair-4-3-three.avif",
    coverImageAlt: "Close-up photo capture of fiberglass repair area for estimate review",
    body: [
      { style: "normal", text: "Photo estimates help start the conversation quickly, especially when you are comparing timelines before hauling the boat in." },
      { style: "h2", text: "Best Photo Set to Send" },
      { listItem: "bullet", text: "One full-side image so damage context is clear." },
      { listItem: "bullet", text: "Two medium shots showing the exact repair zone." },
      { listItem: "bullet", text: "Two close-ups that capture crack depth or edge condition." },
      { listItem: "bullet", text: "An angled shot to reveal contour distortion or dent shape." },
      { style: "h3", text: "Information to Include" },
      { listItem: "bullet", text: "Boat make/model and approximate year." },
      { listItem: "bullet", text: "How the damage happened and when it happened." },
      { listItem: "bullet", text: "Whether the area was previously repaired." },
      { style: "normal", text: "Photo estimates are an initial planning step. Final scope is confirmed through in-person inspection when required." }
    ]
  },
  {
    title: "Spring Boat Prep Checklist for Central Minnesota",
    slug: "spring-boat-prep-central-minnesota",
    excerpt:
      "Pre-season fiberglass inspection and finish prep to reduce downtime during Minnesota’s launch window.",
    coverImageUrl: "/images/fiberglass-boat-repair-4-3-two.avif",
    coverImageAlt: "Spring-season fiberglass hull prep before boating launch",
    body: [
      { style: "normal", text: "In Central Minnesota, spring launch dates come fast. A structured pre-season check helps catch fiberglass issues before service queues get crowded." },
      { style: "h2", text: "Pre-Launch Inspection Checklist" },
      { listItem: "bullet", text: "Inspect high-stress zones for fresh cracks and impact marks." },
      { listItem: "bullet", text: "Check previous repair areas for movement or finish edge changes." },
      { listItem: "bullet", text: "Look for oxidation or chalking on exposed gel coat surfaces." },
      { listItem: "bullet", text: "Confirm all hardware mount points are sealed and stable." },
      { style: "h3", text: "Why Early Scheduling Helps" },
      { style: "normal", text: "Small corrections are easier to schedule before peak season. Waiting until launch weekend can delay repairs when demand spikes." }
    ]
  },
  {
    title: "Signs Your Boat Needs Professional Dent and Scratch Repair",
    slug: "signs-you-need-dent-scratch-repair",
    excerpt:
      "How to tell when cosmetic-looking damage could indicate deeper fiberglass correction needs.",
    coverImageUrl: "/images/fiberglass-boat-repair-4-3-four.avif",
    coverImageAlt: "Dent and scratch correction work on fiberglass hull panel",
    body: [
      { style: "normal", text: "Not all scratches are equal. Some are light finish marks, while others cut deep enough to expose substrate and invite further degradation." },
      { style: "h2", text: "Red Flags That Need Professional Review" },
      { listItem: "bullet", text: "Scratches that catch a fingernail and appear layered." },
      { listItem: "bullet", text: "Dents near chine lines, corners, or hardware zones." },
      { listItem: "bullet", text: "Damage with surrounding spider cracks or dull halos." },
      { listItem: "bullet", text: "Repeated chips in the same impact-prone location." },
      { style: "h3", text: "What Affects Repair Scope" },
      { listItem: "bullet", text: "Depth and spread of the damage." },
      { listItem: "bullet", text: "Location relative to stress and load points." },
      { listItem: "bullet", text: "Need for color blending across adjacent panels." },
      { style: "normal", text: "Professional review helps separate true cosmetic touch-up work from deeper correction needs." }
    ]
  },
  {
    title: "Service Areas We Cover Around Melrose, MN",
    slug: "service-areas-around-melrose",
    excerpt:
      "An overview of Central Minnesota communities regularly served from the Melrose shop.",
    coverImageUrl: "/images/fiberglass-boat-repair-wide.avif",
    coverImageAlt: "Adley Enterprises repair shop servicing Central Minnesota boat owners",
    body: [
      { style: "normal", text: "Adley Enterprises serves approximately a 30-mile radius around Melrose, MN, with regular fiberglass repair requests from nearby cities and lake communities." },
      { style: "h2", text: "Common Cities in the Primary Service Radius" },
      { listItem: "bullet", text: "St. Cloud, Sauk Rapids, Waite Park, and St. Joseph." },
      { listItem: "bullet", text: "Sauk Centre, Cold Spring, Long Prairie, and Albany." },
      { listItem: "bullet", text: "Paynesville, Richmond, and surrounding communities." },
      { style: "normal", text: "If you are outside that radius, call anyway. In some cases, owners still choose Melrose service for fiberglass-only specialization." },
      { style: "normal", text: "Appointment scheduling is recommended, especially during pre-season and mid-summer demand windows." }
    ]
  },
  {
    title: "Adjustable Transducer Mounts: Port, Starboard, and Single Setups",
    slug: "adjustable-transducer-mount-options",
    excerpt:
      "How to choose between single, port-side dual, and starboard-side dual transducer mount setups.",
    coverImageUrl: "/images/fiberglass-boat-repair-4-3-one.avif",
    coverImageAlt: "Boat stern area prepared for adjustable transducer mount setup",
    body: [
      { style: "normal", text: "Adley Enterprises builds inquiry-only adjustable transducer mounts for owners who need practical fitment options and clean installation paths." },
      { style: "h2", text: "Core Configuration Options" },
      { listItem: "bullet", text: "Single transducer mount for simpler sonar layouts." },
      { listItem: "bullet", text: "Dual mount (port side) for side-specific electronics setups." },
      { listItem: "bullet", text: "Dual mount (starboard side) for opposite-side routing needs." },
      { style: "h3", text: "What to Confirm Before Ordering" },
      { listItem: "bullet", text: "Exact transducer model and bracket footprint." },
      { listItem: "bullet", text: "Preferred side and cable path to electronics." },
      { listItem: "bullet", text: "Stern clearance and trailer proximity." },
      { style: "normal", text: "Public pricing is not listed. Contact Adley Enterprises with your setup details for fit guidance and USA shipping options." }
    ]
  },
  {
    title: "How to Protect Fiberglass Finish During Storage and Transport",
    slug: "protect-fiberglass-finish-storage-transport",
    excerpt:
      "Practical storage and transport habits that reduce avoidable finish wear between seasons.",
    coverImageUrl: "/images/fiberglass-boat-repair-4-3-three.avif",
    coverImageAlt: "Fiberglass finish polishing and protection before seasonal storage",
    body: [
      { style: "normal", text: "Storage and transport are two common sources of avoidable finish wear. A few setup changes can protect gel coat and reduce spring repair needs." },
      { style: "h2", text: "Pre-Storage Protection Steps" },
      { listItem: "bullet", text: "Wash and fully dry surfaces before covering." },
      { listItem: "bullet", text: "Remove residue around fittings, seams, and rub rail zones." },
      { listItem: "bullet", text: "Apply protective wax before long off-season storage." },
      { listItem: "bullet", text: "Use breathable covers to reduce trapped moisture." },
      { style: "h3", text: "Transport Protection Checklist" },
      { listItem: "bullet", text: "Secure straps to avoid rubbing against painted/gel surfaces." },
      { listItem: "bullet", text: "Pad frequent contact points on trailer supports." },
      { listItem: "bullet", text: "Inspect tie-down pressure after first miles on the road." },
      { style: "normal", text: "Monthly off-season checks help catch dull patches or abrasion early, before the next launch window." }
    ]
  }
];

const toBlogBlock = (entry) => {
  if (entry.listItem) {
    return listItemBlock(entry.text, entry.listItem, entry.level ?? 1, entry.style ?? "normal");
  }

  return block(entry.text, entry.style ?? "normal");
};

const blogPosts = blogSeeds.map((post, index) => ({
  _id: `blog.${post.slug}`,
  _type: "blogPost",
  title: post.title,
  slug: { _type: "slug", current: post.slug },
  excerpt: post.excerpt,
  publishedAt: `2026-01-${String(index + 2).padStart(2, "0")}T09:00:00Z`,
  coverImageUrl: post.coverImageUrl,
  coverImageAlt: post.coverImageAlt,
  body: post.body.map((entry) => toBlogBlock(entry)),
  seo: {
    _type: "seo",
    metaTitle: `${post.title} | Adley Enterprises LLC`,
    metaDescription: post.excerpt
  }
}));

const documents = [siteSettings, ...services, ...locationPages, ...products, ...faqItems, ...blogPosts];

const jsonOutputPath = path.join(outputDir, "adley-seed.json");
const ndjsonOutputPath = path.join(outputDir, "adley-seed.ndjson");

fs.writeFileSync(jsonOutputPath, `${JSON.stringify(documents, null, 2)}\n`, "utf8");
fs.writeFileSync(ndjsonOutputPath, `${documents.map((doc) => JSON.stringify(doc)).join("\n")}\n`, "utf8");

console.log(`Wrote ${documents.length} documents:`);
console.log(`- ${jsonOutputPath}`);
console.log(`- ${ndjsonOutputPath}`);
