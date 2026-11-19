/**
 * src/lib/site.ts
 * -----------------------------------------------------------------------------
 * Canonical site URLs used by SEO metadata, the sitemap and robots.txt.
 *
 * Priority:
 *   1. NEXT_PUBLIC_SITE_URL — set automatically by the GitHub Pages workflow
 *      from actions/configure-pages (`origin`).
 *   2. profile.seo.url — the human-edited fallback for custom domains.
 *
 * NEXT_PUBLIC_BASE_PATH is applied to the home URL, matching next.config.ts.
 */
import { profile } from "@/content/profile";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Origin only, e.g. https://sergiobrancato.dev or https://username.github.io */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? profile.seo.url
).replace(/\/$/, "");

/** Full home URL including the Pages base path, e.g. origin/repo/ */
export const HOME_URL = `${SITE_URL}${basePath}/`;
