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

const product = {
  _id: "product.adjustable-transducer-mounts",
  _type: "product",
  title: "Adjustable Transducer Mounts",
  slug: { _type: "slug", current: "adjustable-transducer-mounts" },
  summary:
    "Adjustable transducer board mounts available in port side, starboard side, and single transducer configurations.",
  inquiryOnly: true,
  shippingScope: "USA only",
  variants: [
    {
      _type: "object",
      _key: key(),
      name: "Port Side Mount",
      description: "Adjustable board setup configured for port-side transducer placement."
    },
    {
      _type: "object",
      _key: key(),
      name: "Starboard Side Mount",
      description: "Adjustable board setup configured for starboard-side transducer placement."
    },
    {
      _type: "object",
      _key: key(),
      name: "Single Transducer Mount",
      description: "Single transducer configuration for simplified mounting requirements."
    }
  ],
  body: [
    block(
      "Adley Enterprises offers adjustable transducer mount options designed for practical fitment and reliable positioning."
    ),
    block(
      "This is an inquiry-only product page. Public pricing is not listed. Contact us to discuss your setup and shipping details."
    ),
    block(
      "Shipping is available within the United States."
    )
  ],
  seo: {
    _type: "seo",
    metaTitle: "Adjustable Transducer Mounts | Adley Enterprises LLC",
    metaDescription:
      "Inquiry-only adjustable transducer mount options from Adley Enterprises. Port, starboard, and single transducer configurations."
  }
};

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
      "A practical checklist to identify fiberglass damage early and avoid bigger repair costs.",
    body: [
      "Fiberglass damage often starts small: hairline cracks, chips, and soft spots that are easy to ignore.",
      "The earlier you inspect and document changes, the easier it is to control repair scope.",
      "If you notice repeated cracking in the same zone, schedule a professional inspection before the damage spreads."
    ]
  },
  {
    title: "Gel Coat Repair vs Full Repaint: Which Is Right for Your Boat?",
    slug: "gel-coat-repair-vs-repaint",
    excerpt:
      "When to choose localized gel coat repair and when a larger refinishing scope makes more sense.",
    body: [
      "Not every faded or scratched surface needs a full repaint.",
      "Localized repair is often effective when damage is isolated and color matching can be controlled.",
      "Wider oxidation, heavy surface inconsistency, or repeated patch history may justify broader refinishing."
    ]
  },
  {
    title: "What to Do After a Hull Collision",
    slug: "what-to-do-after-hull-collision",
    excerpt:
      "Step-by-step actions for boat owners after impact damage to protect the hull and speed up repair.",
    body: [
      "Start with safety and document the affected area with clear photos from multiple angles.",
      "Avoid continued use until a repair professional confirms structural condition.",
      "Early assessment reduces the chance of moisture intrusion and additional laminate stress."
    ]
  },
  {
    title: "How Often Should You Buff and Wax a Fiberglass Boat?",
    slug: "how-often-buff-and-wax-fiberglass-boat",
    excerpt:
      "Maintenance interval guidance based on storage, usage patterns, and finish condition.",
    body: [
      "Buffing and waxing frequency depends on UV exposure, water conditions, and how the boat is stored.",
      "Routine finish maintenance helps preserve gloss and reduce surface degradation over time.",
      "Ask for a maintenance recommendation during your next repair or inspection visit."
    ]
  },
  {
    title: "How Photo Estimates Work for Fiberglass Boat Repair",
    slug: "how-photo-estimates-work",
    excerpt:
      "What photos to send and how to make your initial repair estimate faster and more accurate.",
    body: [
      "Photo estimates work best when you include wide shots, close-up damage shots, and a few angle variations.",
      "Include brief notes on when damage occurred and whether the area has previous repair history.",
      "Final scope is confirmed with in-person review when needed."
    ]
  },
  {
    title: "Spring Boat Prep Checklist for Central Minnesota",
    slug: "spring-boat-prep-central-minnesota",
    excerpt:
      "Pre-season fiberglass and finish checks to reduce delays when boating season starts.",
    body: [
      "Before launch, inspect hull surfaces, gel coat condition, and any known repaired zones.",
      "Address minor chips and cracks early so they do not become larger mid-season repairs.",
      "A pre-season detailing and finish protection service can improve durability and appearance."
    ]
  },
  {
    title: "Signs Your Boat Needs Professional Dent and Scratch Repair",
    slug: "signs-you-need-dent-scratch-repair",
    excerpt:
      "How to tell when cosmetic-looking damage may need professional correction.",
    body: [
      "If a scratch catches your fingernail or appears to cut through finish layers, schedule an inspection.",
      "Dents near stress zones can require more than surface correction.",
      "Professional repair protects both appearance and long-term surface integrity."
    ]
  },
  {
    title: "Service Areas We Cover Around Melrose, MN",
    slug: "service-areas-around-melrose",
    excerpt:
      "A quick overview of cities and communities within our regular fiberglass repair coverage area.",
    body: [
      "Adley Enterprises serves boat owners within roughly 30 miles of Melrose, Minnesota.",
      "Coverage includes St. Cloud, Sauk Rapids, Waite Park, St. Joseph, and nearby communities.",
      "If you are unsure whether you are inside our service range, call and we can confirm."
    ]
  },
  {
    title: "Adjustable Transducer Mounts: Port, Starboard, and Single Setups",
    slug: "adjustable-transducer-mount-options",
    excerpt:
      "Compare available transducer mount configurations and choose the right setup for your boat.",
    body: [
      "We offer port-side, starboard-side, and single transducer mount configurations.",
      "Each setup supports a practical installation path based on your transducer and hull layout.",
      "Contact us for fit questions and USA shipping details."
    ]
  },
  {
    title: "How to Protect Fiberglass Finish During Storage and Transport",
    slug: "protect-fiberglass-finish-storage-transport",
    excerpt:
      "Simple habits that help preserve finish quality between seasons and long hauls.",
    body: [
      "Clean and dry surfaces before storage to reduce buildup and staining risk.",
      "Use proper covers and avoid abrasive contact points during transport.",
      "Routine finish checks make it easier to spot early wear before it becomes larger repair work."
    ]
  }
];

const blogPosts = blogSeeds.map((post, index) => ({
  _id: `blog.${post.slug}`,
  _type: "blogPost",
  title: post.title,
  slug: { _type: "slug", current: post.slug },
  excerpt: post.excerpt,
  publishedAt: `2026-01-${String(index + 2).padStart(2, "0")}T09:00:00Z`,
  body: post.body.map((paragraph) => block(paragraph)),
  seo: {
    _type: "seo",
    metaTitle: `${post.title} | Adley Enterprises LLC`,
    metaDescription: post.excerpt
  }
}));

const documents = [siteSettings, ...services, ...locationPages, product, ...faqItems, ...blogPosts];

const jsonOutputPath = path.join(outputDir, "adley-seed.json");
const ndjsonOutputPath = path.join(outputDir, "adley-seed.ndjson");

fs.writeFileSync(jsonOutputPath, `${JSON.stringify(documents, null, 2)}\n`, "utf8");
fs.writeFileSync(ndjsonOutputPath, `${documents.map((doc) => JSON.stringify(doc)).join("\n")}\n`, "utf8");

console.log(`Wrote ${documents.length} documents:`);
console.log(`- ${jsonOutputPath}`);
console.log(`- ${ndjsonOutputPath}`);
