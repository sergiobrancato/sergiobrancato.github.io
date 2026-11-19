/**
 * next.config.ts
 * -----------------------------------------------------------------------------
 * Next.js configuration. The site is a fully static export so it can be hosted
 * on GitHub Pages (or any static host).
 *
 * GitHub Pages:
 *   • User site (sergiobrancato.github.io): configure-pages returns base_path "",
 *     so Next.js is given an empty basePath and the site lives at the domain root.
 *   • Project site (username.github.io/repo): NEXT_PUBLIC_BASE_PATH=/repo, which
 *     Next.js and src/lib/assets.ts apply to every local asset.
 *
 * Local development leaves the variable empty, so basePath is "".
 */
import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    // Static hosting has no Next.js image optimisation server.
    unoptimized: true,
  },
};

export default nextConfig;
