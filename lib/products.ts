import type { Product } from "@/types/content";

export const productPageFaqs: Array<{ question: string; answer: string }> = [
  {
    question: "What transducer brands are compatible with your boards?",
    answer:
      "Our adjustable boards work with most popular fish finder transducers including many Garmin, Lowrance, and Humminbird setups. Contact us with your exact model and we will confirm compatibility."
  },
  {
    question: "What's the difference between the Single and Dual boards?",
    answer:
      "The Single board is for one transducer. The Dual boards mount two transducers side by side and are available in Port Side or Starboard Side orientation based on your transom layout."
  },
  {
    question: "Are these really made in Minnesota?",
    answer:
      "Yes. Every board is manufactured in our Melrose, Minnesota fiberglass shop."
  },
  {
    question: "Do you offer free shipping?",
    answer:
      "Yes. Transducer boards ship free within the United States."
  },
  {
    question: "Can I return a board if it doesn't fit my setup?",
    answer:
      "Yes. We accept returns within 30 days. Return shipping details follow the policy listed on each product page."
  },
  {
    question: "Do you make custom transducer mounts?",
    answer:
      "Contact us to discuss custom configurations. Availability depends on current shop schedule and design requirements."
  }
];

export function formatPrice(price?: number, currency = "USD") {
  if (typeof price !== "number") {
    return "Contact for pricing";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2
  }).format(price);
}

export function getProductImage(product: Product, fallback = "/images/fiberglass-boat-repair-4-3-one.avif") {
  return product.images && product.images.length > 0 ? product.images[0] : { url: fallback, alt: product.title };
}
