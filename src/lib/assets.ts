/**
 * src/lib/assets.ts
 * -----------------------------------------------------------------------------
 * GitHub Pages helper. Project sites are served from /<repo-name>/, so any file
 * inside /public needs that prefix at runtime.
 *
 * Use `assetPath()` for EVERY local image, the CV and other public assets:
 *   <img src={assetPath(project.cover.src)} />
 *
 * Absolute URLs (https://), mailto:, tel: and #anchors are returned untouched,
 * which makes this safe to use with content links too.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string): string {
  if (!path) return path;

  // Leave external links, anchors and non-http schemes alone.
  if (/^(?:[a-z]+:|\/\/|#)/i.test(path)) {
    return path;
  }

  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalised}`;
}

/** Convenience alias used by the CV buttons. */
export function cvPath(path: string): string {
  return assetPath(path);
}
