/**
 * src/app/robots.ts
 * -----------------------------------------------------------------------------
 * Generates robots.txt at build time and points crawlers at the generated
 * sitemap. Update the domain via profile.seo.url in src/content/profile.ts.
 */
import type { MetadataRoute } from "next";
import { HOME_URL, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${HOME_URL}sitemap.xml`,
    host: SITE_URL,
  };
}
