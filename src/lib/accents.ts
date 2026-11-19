/**
 * src/lib/accents.ts
 * -----------------------------------------------------------------------------
 * The project accent palette. Content files (src/content/projects.ts) refer to
 * an accent by name, never by hex, so the palette can be retuned in one place.
 *
 * 42 accents, organised as 12 chromatic hue families with three related tones
 * each (roughly soft → core → deep), plus a grey-to-white neutral family.
 *
 * Every colour is chosen to sit on BOTH backgrounds used by the site:
 *   dark  #050505   and   light  #fafaf9
 * The values drive the card hover glow, the accent hairline, the category dot
 * and the modal header dot. They are accents, not body text.
 *
 * TO USE ONE:
 *   accent: "jade"   // in src/content/projects.ts
 *
 * TO ADD ANOTHER:
 *   1. Add the name to the Accent union in src/types/portfolio.ts.
 *   2. Add its hex here. TypeScript will flag the missing entry.
 */
import type { Accent } from "@/types/portfolio";

export const ACCENT_HEX: Record<Accent, string> = {
  // Cyan — pale ice to deep aqua
  ice: "#67e8f9",
  cyan: "#22d3ee",
  aqua: "#06b6d4",

  // Sky / blue
  sky: "#38bdf8",
  azure: "#0ea5e9",
  blue: "#60a5fa",

  // Indigo / cobalt
  periwinkle: "#818cf8",
  indigo: "#6366f1",
  cobalt: "#3b82f6",

  // Violet
  lavender: "#c4b5fd",
  violet: "#a78bfa",
  iris: "#8b5cf6",

  // Fuchsia / magenta
  lilac: "#f0abfc",
  fuchsia: "#e879f9",
  magenta: "#d946ef",

  // Pink / rose
  blush: "#f9a8d4",
  pink: "#f472b6",
  rose: "#fb7185",

  // Coral / red
  coral: "#ff8a65",
  red: "#f87171",
  crimson: "#ef4444",

  // Peach / orange
  peach: "#fdba74",
  orange: "#fb923c",
  tangerine: "#f97316",

  // Apricot / amber / gold
  apricot: "#fcd34d",
  amber: "#fbbf24",
  gold: "#f59e0b",

  // Lemon / lime
  lemon: "#fde047",
  lime: "#a3e635",
  chartreuse: "#84cc16",

  // Mint / green / emerald
  mint: "#6ee7b7",
  green: "#4ade80",
  emerald: "#34d399",

  // Seafoam / teal
  seafoam: "#5eead4",
  teal: "#2dd4bf",
  turquoise: "#14b8a6",

  // Neutral — graphite through white
  graphite: "#475569",
  steel: "#64748b",
  slate: "#94a3b8",
  silver: "#cbd5e1",
  pearl: "#e2e8f0",
  white: "#f8fafc",
};

/** Insertion order — handy for a future accent picker or docs. */
export const ACCENT_NAMES = Object.keys(ACCENT_HEX) as Accent[];

/**
 * One signature mid-tone from each chromatic family. These 12 are the most
 * distinct choices if you want every project card to read as a different hue.
 */
export const ACCENT_CORE = [
  "red",
  "orange",
  "amber",
  "lime",
  "green",
  "teal",
  "cyan",
  "blue",
  "indigo",
  "violet",
  "magenta",
  "pink",
] as const satisfies readonly Accent[];

/** The neutral options, ordered dark grey → white. */
export const ACCENT_NEUTRALS = [
  "graphite",
  "steel",
  "slate",
  "silver",
  "pearl",
  "white",
] as const satisfies readonly Accent[];
