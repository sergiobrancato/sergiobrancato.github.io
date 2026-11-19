/**
 * scripts/preview.mjs
 * -----------------------------------------------------------------------------
 * Tiny zero-dependency static server for the exported `out/` folder.
 * `next start` is not compatible with `output: "export"`, so use:
 *
 *   npm run preview
 *
 * Runs on http://localhost:3000 by default. Override with PORT=4000.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "out",
);
const port = Number(process.env.PORT ?? 3000);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".ico": "image/x-icon",
};

if (!fs.existsSync(root)) {
  console.error("Missing out/ — run `npm run build` first.");
  process.exit(1);
}

http
  .createServer((request, response) => {
    const requested = decodeURIComponent((request.url ?? "/").split("?")[0]);
    const relative = requested.endsWith("/")
      ? `${requested}index.html`
      : requested;
    let file = path.resolve(root, `.${relative}`);

    // Never serve outside out/.
    if (!file.startsWith(root)) {
      response.writeHead(403).end("Forbidden");
      return;
    }

    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      file = path.join(root, "index.html");
    }

    response.writeHead(200, {
      "Content-Type": TYPES[path.extname(file).toLowerCase()] ?? "application/octet-stream",
    });
    fs.createReadStream(file).pipe(response);
  })
  .listen(port, () => {
    console.log(`Previewing out/ at http://localhost:${port}`);
  });
