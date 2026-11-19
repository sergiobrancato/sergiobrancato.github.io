/**
 * src/lib/accents.ts
 * -----------------------------------------------------------------------------
 * Accent colours used by project artwork, hover glows and category dots.
 * Content files refer to an accent by NAME ("cyan", "pink", …) so the palette
 * can be retuned here once without touching every project.
 */
import type { Accent } from "@/types/portfolio";

export const ACCENT_HEX: Record<Accent, string> = {
  cyan: "#22d3ee",
  pink: "#f472b6",
  amber: "#fbbf24",
  violet: "#a78bfa",
  emerald: "#34d399",
  blue: "#60a5fa",
};
