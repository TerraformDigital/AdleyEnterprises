import type { LucideIcon } from "lucide-react";
import { PaintbrushVertical, ShieldAlert, Sparkles, Wrench } from "lucide-react";

const serviceIconMap: Record<string, LucideIcon> = {
  "fiberglass-boat-repair": Wrench,
  "hull-collision-repair": ShieldAlert,
  "gel-coat-exterior-painting": PaintbrushVertical,
  "dent-scratch-repair": Wrench,
  "buffing-waxing": Sparkles
};

export function getServiceIcon(slug: string): LucideIcon {
  return serviceIconMap[slug] ?? Wrench;
}
