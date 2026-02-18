import type { LucideIcon } from "lucide-react";
import { ShieldAlert, Sparkles, Wrench } from "lucide-react";

const serviceIconMap: Record<string, LucideIcon> = {
  "fiberglass-boat-repair": Wrench,
  "hull-collision-repair": ShieldAlert,
  "gel-coat-exterior-painting": Wrench,
  "dent-scratch-repair": Wrench,
  "buffing-waxing": Sparkles
};

export function getServiceIcon(slug: string): LucideIcon {
  return serviceIconMap[slug] ?? Wrench;
}
