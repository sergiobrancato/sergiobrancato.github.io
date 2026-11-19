/**
 * src/lib/utils.ts
 * -----------------------------------------------------------------------------
 * Tiny shared helpers. `cn` merges conditional class names and resolves
 * conflicting Tailwind utilities (e.g. "p-2 p-4" becomes "p-4").
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
