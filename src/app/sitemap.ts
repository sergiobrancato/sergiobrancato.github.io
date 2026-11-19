/**
 * src/app/sitemap.ts
 * -----------------------------------------------------------------------------
 * Generates sitemap.xml at build time. It is a single-page site, so this is one
 * entry — update profile.seo.url in src/content/profile.ts when you connect a
 * custom domain.
 */
import type { MetadataRoute } from "next";
import { HOME_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: HOME_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
