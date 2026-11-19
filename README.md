# Sergio Brancato — Portfolio

A recruiter-ready personal portfolio built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS** and **Framer Motion**. Dark-first, editorial, static-exported, and designed so that **every word and image path lives in `src/content/`** — you can update the site without touching JSX.

---

## 1. Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Useful commands:

| Command | What it does |
| --- | --- |
| `npm run dev` | Local development with hot reload |
| `npm run build` | Static production build into `out/` |
| `npm run preview` | Serve the built `out/` folder locally (after a build) |
| `npm run typecheck` | TypeScript check, no emit |

> `next start` is intentionally not used: the site is a static export, so `npm run preview` serves `out/` with a small zero-dependency Node server.

> **Before publishing:** update your email, social URLs, CV and the starter experience/projects below. Search for `sergiobrancato.dev` and `https://github.com/sergiobrancato` in `src/content/` and replace them with your real links.

---

## 2. The one rule: edit content, not components

Everything a visitor reads is data. Components only decide *how* it looks.

| File | Controls |
| --- | --- |
| `src/content/profile.ts` | Name, role, location, email, CV path, availability, typewriter phrases, hero/about/contact copy, quick facts, languages, mobility, sectors, social links, footer, SEO |
| `src/content/skills.ts` | Capability categories, technology pills, toolbelt strip |
| `src/content/experience.ts` | Work, research and education timeline entries |
| `src/content/projects.ts` | All projects, filters, cover art, galleries, full case studies, action links |

### Change the typewriter phrases

In `src/content/profile.ts`:

```ts
typewriter: {
  prefix: "I’m a",
  phrases: [
    "software engineer with a systems mindset",
    "systems architect for high-stakes domains",
    "product builder grounded in research",
    "technical communicator who ships",
  ],
},
```

Add or remove strings freely. The gradient typewriter and screen-reader text update automatically.

### Swap the CV

1. Drop your PDF at `public/cv/Sergio_Brancato_CV.pdf`.
2. If you use another filename, update `cvPath` in `profile.ts`.

The “Download CV” button, contact card and metadata all use that path, including on GitHub Pages.

### Update links and email

Edit `email` and `links` in `profile.ts`. The email is used by:

- the copy-email button,
- the `mailto:` links,
- the contact form,
- structured data for search engines.

The current CV and experience entries are starter content. Replace the placeholder BSc institution/years and any metrics with your real details before sending the site out.

---

## 3. Add a project in about 30 seconds

1. **Create an image folder:** `public/projects/my-project/`.
2. Drop in `cover.svg` (or `.png` / `.jpg`) plus 3–4 gallery images.
3. Open `src/content/projects.ts`, copy an existing project object and change:

```ts
{
  id: "my-project",                 // unique, URL-safe
  title: "My Project",
  subtitle: "Domain · What it is",
  year: "2026",
  categories: ["software", "data"], // drives the filter bar
  summary: "One sentence for the card.",
  role: "Your role",
  timeframe: "8 weeks · Studio",
  tech: ["TypeScript", "React", "PostgreSQL"],
  accent: "cyan",                   // cyan | pink | amber | violet | emerald | blue
  cover: { src: "/projects/my-project/cover.png", alt: "Describe the image" },
  gallery: [
    { src: "/projects/my-project/01.png", alt: "…", caption: "Optional caption" },
  ],
  caseStudy: {
    overview: ["…"],
    challenge: ["…"],
    architecture: {
      summary: "…",
      layers: [{ label: "API", detail: "…" }],
    },
    features: [{ title: "…", description: "…" }],
    impact: [{ value: "40%", label: "faster review cycle" }],
  },
  links: [
    { label: "GitHub repository", href: "https://github.com/…", icon: "github" },
  ],
},
```

4. Save. The card, filter counts, modal gallery, lightbox and case-study layout are generated automatically.

**Image guidance:** 16:10 works best (e.g. 1600×1000). Local paths always start with `/projects/...`; `assetPath()` adds the GitHub Pages base path for you. The starter artwork in `public/projects/` is original SVG, so it stays sharp at any size.

### Add or rename a filter category

Edit `categories` in `projects.ts`:

```ts
categories: [
  { id: "software", label: "Software & Systems" },
  { id: "data", label: "Data & Research" },
  { id: "design", label: "Design & Communication" },
],
```

If you add a new `id`, extend `ProjectCategory` in `src/types/portfolio.ts` as well.

### Add an experience entry

In `src/content/experience.ts`, duplicate an item. Set `type` to `"work"`, `"research"` or `"education"`, and set `current: true` for an ongoing role.

---

## 4. Design system

- **Dark default:** obsidian `#050505`, hairline borders, frosted glass, oversized solid display name, gradient typewriter.
- **Light:** warm off-white `#FAFAF9`, slate type, architectural shadows.
- **Accent:** orange → pink → cyan, used sparingly for signal, never for decoration.
- **Typography:** Space Grotesk (display), Inter (body), JetBrains Mono (labels), Instrument Serif (editorial italics).
- **Motion:** one easing curve and a fast reveal rhythm, defined in `src/lib/motion.ts`.

To retheme the entire site, edit the CSS variables in `src/app/globals.css`:

```css
:root {
  --canvas: #fafaf9;
  --canvas-rgb: 250 250 249; /* keep in sync with --canvas */
  --ink: #09090b;
  --accent: #ea580c;
}
.dark {
  --canvas: #050505;
  --canvas-rgb: 5 5 5;
  --ink: #fafafa;
  --accent: #fb923c;
}
```

The hex values are for hand-written CSS; the `*-rgb` channel triplets power Tailwind opacity utilities such as `bg-surface/70` and `text-muted/60`. When you change a colour, update both.

The social preview lives at `public/og.png` (with an editable `public/og.svg` source). If you change your name or positioning, update that card so link previews stay accurate. Case-study modal headings are editable under `modalLabels` in `src/content/projects.ts`.

### Signature interactions

- Fixed left icon rail with an IntersectionObserver scroll-spy and a `layoutId` glowing indicator (`src/lib/useScrollSpy.ts`, `LeftNavRail.tsx`).
- Cursor-reactive hero grid and constellation (`SpotlightGrid.tsx`).
- Gradient typewriter (`TypewriterText.tsx`).
- Mouse-tracking spotlights on cards (`SpotlightCard.tsx`).
- Animated portfolio filters, modal/full-screen case studies, gallery carousel and lightbox (`PortfolioSection.tsx`, `ProjectModal.tsx`).
- Copy-email toast and static-friendly mailto form (`ContactSection.tsx`).

All motion respects `prefers-reduced-motion`.

---

## 5. Project structure

```text
├── .github/workflows/deploy.yml   # Build & deploy to GitHub Pages on push to main
├── icon.png                       # Source SB monogram for favicon generation
├── public/
│   ├── cv/                        # Your PDF CV
│   ├── projects/                  # One folder per project (cover + gallery)
│   ├── favicon.ico                # Multi-size 16/32/48/64 favicon
│   ├── icon.png                   # 512px app icon
│   ├── apple-touch-icon.png       # 180px iOS home-screen icon
│   ├── og.png / og.svg            # Social-share card (PNG + editable source)
│   └── .nojekyll                  # Keeps _next assets on GitHub Pages
├── scripts/
│   └── preview.mjs                # Zero-dependency preview server for out/
├── src/
│   ├── content/                   # ⭐ SINGLE SOURCE OF TRUTH
│   │   ├── profile.ts
│   │   ├── skills.ts
│   │   ├── experience.ts
│   │   └── projects.ts
│   ├── types/
│   │   └── portfolio.ts           # Interfaces shared by content + UI
│   ├── lib/
│   │   ├── accents.ts             # Project accent palette
│   │   ├── assets.ts              # Base-path helper for GitHub Pages
│   │   ├── motion.ts              # Shared easing + variants
│   │   ├── site.ts                # Canonical origin + home URL for SEO
│   │   ├── useScrollSpy.ts        # IntersectionObserver scroll spy
│   │   └── utils.ts               # cn() class merger
│   ├── components/
│   │   ├── layout/
│   │   │   ├── LeftNavRail.tsx    # Desktop rail + mobile bottom dock
│   │   │   ├── ScrollProgress.tsx # Top gradient progress bar
│   │   │   ├── ThemeProvider.tsx  # next-themes wrapper
│   │   │   └── ThemeToggle.tsx    # Fixed sun/moon switch
│   │   ├── ui/
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectModal.tsx
│   │   │   ├── Reveal.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   ├── SpotlightCard.tsx
│   │   │   ├── SpotlightGrid.tsx
│   │   │   └── TypewriterText.tsx
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── AboutSection.tsx
│   │       ├── SkillsSection.tsx
│   │       ├── ExperienceSection.tsx
│   │       ├── PortfolioSection.tsx
│   │       └── ContactSection.tsx
│   └── app/
│       ├── layout.tsx             # Fonts, SEO, theme shell, navigation
│       ├── page.tsx               # The six sections, in order
│       ├── globals.css            # Tokens, utilities, grain, grid
│       ├── robots.ts              # Generated robots.txt
│       └── sitemap.ts             # Generated sitemap.xml
├── next.config.ts                 # Static export + base path
├── tailwind.config.ts             # Design tokens
└── README.md
```

Every file starts with a plain-English header comment explaining its purpose and how to edit it.

---

## 6. Deploy to GitHub Pages

The included workflow builds the static site and publishes `out/`.

1. This repository is already connected to:
   `https://github.com/sergiobrancato/sergiobrancato.github.io.git`

   ```bash
   git remote add origin https://github.com/sergiobrancato/sergiobrancato.github.io.git
   git push -u origin main
   ```

2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually). Because this is the
   `sergiobrancato.github.io` user site, it appears at:
   `https://sergiobrancato.github.io/`

The workflow runs only on `main`; the `dev` branch is safe for iteration and will never overwrite the live site.

That is it. The workflow reads the repository’s base path from `actions/configure-pages` and passes it as `NEXT_PUBLIC_BASE_PATH`, which both Next.js and `assetPath()` use. It also passes the Pages origin as `NEXT_PUBLIC_SITE_URL`, so canonical links, Open Graph images, the sitemap and robots.txt point at the deployed URL automatically. For a user/organisation site (`<username>.github.io`), the base path is empty and the same build works.

For other static hosts, either set `NEXT_PUBLIC_SITE_URL` at build time or edit `profile.seo.url` in `src/content/profile.ts`.

### Custom domain

1. Add a `CNAME` file or configure the domain in **Settings → Pages**.
2. Update `profile.seo.url` to your canonical domain.
3. In the Pages settings, keep the base path behavior from `configure-pages`; a custom domain normally resolves to an empty base path.

### Deploying elsewhere

`npm run build` produces a completely static `out/` directory. Upload it to Netlify, Cloudflare Pages, Vercel, an S3 bucket or any static host.

---

## 7. Contact form

The form is intentionally static: submitting it composes a `mailto:` draft with the visitor’s name, email and message. Nothing is sent to a server and no tracking script is loaded.

If you would rather use a form backend (Formspree, Basin, your own endpoint), replace `handleSubmit` in `src/components/sections/ContactSection.tsx`. Keep the copy in `profile.contact.form` — it is already data-driven.

---

## 8. Accessibility & performance notes

- Semantic landmarks, a skip link, visible focus rings and 44px targets.
- Modal focus trapping, `Esc` to close, focus restoration.
- Screen-reader text for the animated typewriter; alt text and captions required by the content types.
- `prefers-reduced-motion` disables the typewriter, parallax, ambient motion and the film-grain animation.
- Zero UI libraries beyond icons; Framer Motion is the only animation runtime.
- Images are static and `loading="lazy"`; the build is a fully static export.

When you add real screenshots, compress them (WebP/AVIF recommended, keep a PNG fallback if useful) and keep the 16:10 ratio.

---

## 9. Troubleshooting

**Images 404 on GitHub Pages.** Ensure the path starts with `/` and is passed through `assetPath()` (the components already do this). Confirm the repo name matches the deploy base path.

**The CV downloads as HTML.** Make sure `public/cv/` contains an actual `.pdf` at the exact path in `profile.cvPath`.

**Fonts look different in a build.** `next/font/google` downloads fonts at build time; run the build with network access. The generated build is self-hosted afterwards.

**Theme flashes on first load.** Keep `suppressHydrationWarning` on `<html>` and leave `defaultTheme="dark"` in `ThemeProvider.tsx`.

---

Built with care in Copenhagen. If you change the design, keep the content files sacred — future you will be grateful.
