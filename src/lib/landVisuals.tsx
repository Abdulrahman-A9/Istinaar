import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Coffee,
  Landmark,
  Mountain,
  Palette,
  Shirt,
  ShoppingBag,
  Store,
  Tent,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";

function resolveLandIcon(activityOrType: string): LucideIcon {
  const text = activityOrType.trim();

  if (text.includes("كافيه") || text.includes("مقهى")) return Coffee;
  if (text.includes("مطعم") || text.includes("وجبات") || text.includes("مخبز")) return UtensilsCrossed;
  if (text.includes("مخيم")) return Tent;
  if (text.includes("سوق") || text.includes("متجر") || text.includes("هدايا")) return ShoppingBag;
  if (text.includes("ملابس")) return Shirt;
  if (text.includes("حرف") || text.includes("تراث")) return Palette;
  if (text.includes("فعاليات") || text.includes("مهرجان") || text.includes("ترفيه")) return Landmark;
  if (text.includes("سياحي") || text.includes("جلسات") || text.includes("طبيعية")) return Mountain;
  if (text.includes("خدمات") || text.includes("مغسلة")) return Wrench;
  if (text.includes("تجاري")) return Store;

  return Building2;
}

export function getLandActivityIcon(activityOrType: string, size = 18, className?: string) {
  const Icon = resolveLandIcon(activityOrType);
  return <Icon size={size} className={className} />;
}

export function getLandPrimaryIcon(land: { activities?: string[]; type?: string }, size = 28, className?: string) {
  return getLandActivityIcon(land.activities?.[0] ?? land.type ?? "", size, className);
}