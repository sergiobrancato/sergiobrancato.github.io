/**
 * src/content/projects.ts
 * -----------------------------------------------------------------------------
 * YOUR PORTFOLIO. This is the only file you need to touch to add a project.
 *
 * TO ADD A PROJECT IN 30 SECONDS
 *   1. Copy an existing project object and give it a unique `id`.
 *   2. Change title, subtitle, summary, tech, categories and links.
 *   3. Drop your images into public/projects/<your-id>/ and point `cover` and
 *      `gallery` at them (paths start with "/projects/...").
 *   4. Write the case study fields. All five modal sections are required.
 *
 * CATEGORIES drive the filter bar automatically:
 *   "software"  → Software & Systems
 *   "data"      → Data & Research
 *   "design"    → Design & Communication
 * A project may belong to more than one category.
 *
 * NOTE: These are bespoke starter case studies. Replace the copy, links and
 * artwork with your real projects before sending the site to a recruiter.
 */

import type { PortfolioContent } from "@/types/portfolio";

export const portfolioContent: PortfolioContent = {
  intro: {
    index: "04",
    label: "Selected work",
    heading: "Built to be used,",
    headingAccent: "not just shipped.",
    description: "Some of my personal projects.",
  },

  allLabel: "All work",
  caseStudyLabel: "",

  categories: [
    { id: "software", label: "Software & Systems" },
    { id: "design", label: "Design & Communication" },
    { id: "others", label: "Others" },
  ],

  modalLabels: {
    metaRole: "",
    metaTimeline: "Timeline",
    metaYear: "Year",
    metaStack: "Stack",
    toolsSuffix: "tools",
    overview: "Overview",
    challenge: "Challenge & Context",
    architecture: "Architecture & Tech Stack",
    features: "Key Features & Impact",
    actionLinks: "Action Links",
  },

  projects: [
    {
      id: "scrittura",
      title: "Scrittura",
      subtitle: "for who creates stories",
      year: "2026",
      categories: ["software"],
      summary:
        "Software created for a friend who loves writing fiction—designed to replace scattered notes with a single, structured desktop workspace for chapters, characters, and timelines.",

      timeframe: "",
      tech: ["Electron", "React", "TypeScript", "Vite", "Tailwind CSS"],
      accent: "gold",
      cover: {
        src: "/projects/scrittura/home.png",
        alt: "Scrittura desktop application interface with a clean, dark-mode design.",
      },
      gallery: [
        {
          src: "/projects/scrittura/capitoli.png",
          alt: "Scrittura chapter view with a clean, dark-mode design.",
          caption:
            "Chapter view: one screen for writing, editing, and managing story elements.",
        },
        {
          src: "/projects/scrittura/timeline.png",
          alt: "Scrittura timeline view with a clean, dark-mode design.",
          caption:
            "Timeline view: visualize your story's progression and key events.",
        },
        {
          src: "/projects/scrittura/personaggi.png",
          alt: "Scrittura character sheet with detailed profile information.",
          caption:
            "Character sheet: manage detailed profiles for each character in your story.",
        },
      ],
      caseStudy: {
        overview: [
          "Scrittura is an offline-first desktop application in Italian built for writing and organizing short stories and novels. It unifies manuscript drafting, customizable book covers, character sheets, and an interactive plot chronology into one distraction-free environment.",
          "I designed and built the application end-to-end around a writer's real workflow—connecting the editor directly to the story's timeline so that tagging a chapter with a narrative moment automatically updates the visual plot arc without manual duplication.",
        ],
        challenge: [
          "Writers often face a frustrating trade-off: minimalist text editors leave character traits and plot timelines scattered across separate documents, while heavy commercial suites overwhelm the drafting process with clutter and subscriptions.",
          "The core design challenge was making structural organization effortless at any scale. Whether outlining a short story or a multi-arc novel, the timeline needed to zoom smoothly from detailed event cards down to a minimalist bird's-eye view of dots, with instant reordering via chapter sliders or toggleable drag-and-drop.",
          "Built for daily offline use on Windows, reliability and accessibility were essential: full dark-mode legibility for long writing sessions, local-first storage with zero cloud dependency, and a double-click .exe installer requiring no terminal setup.",
        ],
        architecture: {
          summary:
            "An offline-first Electron desktop shell pairs a typed React and Tailwind CSS interface with local Node.js filesystem persistence over secure IPC.",
          layers: [
            {
              label: "Persistence",
              detail:
                "Node.js fs/promises stores stories, rich-text chapters, and timeline metadata as structured JSON in userData, copying portraits and book covers locally so file paths never break.",
            },
            {
              label: "Timeline sync",
              detail:
                "Node.js fs/promises stores stories, rich-text chapters, and timeline metadata as structured JSON in userData, copying portraits and book covers locally so file paths never break.",
            },
            {
              label: "Client",
              detail:
                "React, TypeScript, and Tailwind CSS power a dark-mode-first editor with rich-text formatting, a 3-level zoomable horizontal/vertical timeline, and drag-and-drop reordering.",
            },
            {
              label: "User experience",
              detail:
                "Packaged via electron-builder as a standalone Windows .exe installer with a custom vector icon, desktop shortcut creation, and a preloaded Italian sample story.",
            },
          ],
        },
        features: [],
        impact: [],
      },
      links: [
        {
          label: "GitHub repository",
          href: "https://github.com/sergiobrancato/scrittura",
          icon: "github",
        },
      ],
    },

    {
      id: "amorim",
      title: "Amorim Cork Italia",
      subtitle: "Sustainable Marketing · B2B & B2C Brand Strategy",
      year: "2024",
      categories: ["design"],
      summary:
        "An integrated B2B and B2C marketing strategy for Amorim Cork Italia to position the Xpür® Vintage Qork closure among organic wineries and introduce a consumer-facing wine sustainability rating system.",
      role: "Marketing & Communication Strategist",
      timeframe: "Academic Consulting Lab · Corporate Marketing (CIA)",
      tech: [],
      accent: "coral",
      cover: {
        src: "/projects/amorim/cover.jpg",
        alt: "Amorim Cork Italia sustainability rating system and Xpür Vintage Qork campaign overview.",
      },
      gallery: [
        {
          src: "/projects/amorim/amorim.jpg",
          alt: "Value Proposition Canvas and Buyer Persona for organic winemaker Roberto Trevisan.",
          caption:
            "B2B value proposition and buyer persona tailored to small organic and biodynamic wineries.",
        },
      ],
      caseStudy: {
        overview: [
          "Developed within the International Communication for Corporate Marketing (CIA) lab, this project formulated a comprehensive B2B and B2C communication strategy for Amorim Cork Italia—the Conegliano-based Italian branch of global cork leader Corticeira Amorim. The objective was to accelerate adoption of Xpür® Vintage Qork, a micro-granulated stopper composed of 80% natural cork and 20% plant-based binder treated with supercritical CO₂ anti-TCA technology.",
          "Working in a cross-functional team, we bridged technical enological advantages—sensory neutrality, oxidation protection, 100% recyclability, and a 10-year closure guarantee—with accessible consumer storytelling designed to transform the wine stopper into a recognizable symbol of environmental stewardship.",
        ],
        challenge: [
          "Small organic and biodynamic wineries—modeled through our buyer persona, winemaker Roberto Trevisan—strive to build 100% recyclable supply chains, but must balance higher raw material costs against limited market visibility and strict quality-preservation demands.",
          "Interviews with wine producers confirmed that closure choices are driven primarily by wine protection rather than stopper features alone. Meanwhile, our consumer survey showed that while buyers weigh price, quality, producer, and label first, 84% recognize that the cork moderately-to-heavily influences wine quality and 68% would prefer a 100% plant-based closure.",
          "The core challenge was closing this perception gap: reaching end consumers—61% of whom rely on social media as their primary channel—while giving partner wineries a simple, credible way to communicate sustainable packaging directly on the bottle.",
        ],
        architecture: {
          summary: "",
          layers: [],
        },
        features: [
          {
            title: "Value Proposition & Buyer Persona",
            description:
              "Mapped Xpür® Vintage Qork against organic winery pain points—connecting oxidation prevention and brand differentiation with sustainable production goals.",
          },
          {
            title: "Trade Fairs & Guided Winery Visits",
            description:
              "Short-term B2B activation combining educational facility tours with targeted presence at Vinitaly, ProWein, Vinòforum, and wine2wine.",
          },
          {
            title: "Social & Wine-Creator Campaign",
            description:
              "Short-term digital rollout for @amorimcorkitalia featuring behind-the-scenes production reels and collaborations with wine and sustainability creators.",
          },
          {
            title: "'Le Foglie Amorim' Scale & QR Code",
            description:
              "Long-term 1-to-5 leaf sustainability rating (water, farming method, transport, bottle CO₂, and stopper impact) paired with a buyer's guide and interactive bottle QR code.",
          },
        ],
        impact: [
          {
            value: "68%",
            label:
              "surveyed consumers favoring a 100% plant-based wine stopper",
          },
          {
            value: "84%",
            label:
              "consumers recognizing cork's moderate-to-high impact on wine quality",
          },
          {
            value: "-75% / -90%",
            label:
              "energy and CO₂ used by Xpür® supercritical extraction vs. conventional methods",
          },
        ],
      },
      links: [
        {
          label: "Amorim Cork Italia — Xpür®",
          href: "https://www.amorimcorkitalia.com/xpur",
          icon: "external",
        },
        {
          label: "Amorim project",
          href: "/projects/amorim/pam.pdf",
          icon: "docs",
        },
      ],
    },
    {
      id: "currency-converter",
      title: "Currency Converter",
      subtitle: "Android · Quick Settings utility & expression calculator",
      year: "2026",
      categories: ["software"],
      summary:
        "An offline-capable Android currency converter with a built-in arithmetic evaluator and a Quick Settings tile for one-tap access from anywhere.",
      role: "Android developer & UI designer",
      timeframe: "November 2026 · Personal project",
      tech: [
        "Kotlin",
        "Jetpack Compose",
        "Material 3",
        "DataStore",
        "TileService",
      ],
      accent: "silver",
      cover: {
        src: "/projects/convert/ui-overview.svg",
        alt: "Currency Converter Android app showing dual-currency conversion, inline math operators, and dark grey Material 3 cards.",
      },
      gallery: [
        {
          src: "/projects/convert/ui-overview.svg",
          alt: "Main converter interface with inline arithmetic operators and overlapping currency swap button.",
          caption:
            "Inline operators let users calculate totals before converting without switching apps.",
        },
        {
          src: "/projects/convert/tile.jpeg",
          alt: "Android Quick Settings panel featuring the custom Currency Converter tile.",
          caption:
            "Custom TileService integration places the converter alongside Wi-Fi and Bluetooth.",
        },
        {
          src: "/projects/convert/search.jpeg",
          alt: "Searchable currency selector supporting TWD, EUR, DKK, and global reference rates.",
          caption:
            "Searchable currency selection with automatic persistence of the last-used pair.",
        },
      ],
      caseStudy: {
        overview: [
          "Currency Converter is a lightweight Android utility designed to remove friction from everyday price checks while traveling or living abroad. Instead of unlocking the phone, hunting for an app, and juggling a separate calculator, users can pull down the Quick Settings shade and convert expressions in one step.",
          "Built in Kotlin and Jetpack Compose with a focus on clean, readable architecture, the app pairs a self-contained math expression parser with local rate caching so conversions work reliably both online and offline.",
        ],
        challenge: [
          "Real-world conversions rarely involve a single round number—splitting bills, adding tips, or summing items usually forces users to bounce between a calculator and a converter.",
          "System-level utilities need to launch instantaneously and behave predictably across modern Android versions, including Android 14+ PendingIntent requirements for Quick Settings tiles.",
          "The codebase needed to stay modular, readable, and easy to customize without relying on bloated third-party math or state-management libraries.",
        ],
        architecture: {
          summary:
            "Single-module MVVM architecture using StateFlow and Jetpack Compose, separating the expression parser, DataStore preferences, and Quick Settings TileService into clean, self-contained layers.",
          layers: [
            {
              label: "UI & Theme",
              detail:
                "Jetpack Compose interface styled with a neutral dark grey and black Material 3 palette, overlapping swap controls, and 2-decimal display rounding.",
            },
            {
              label: "Math Parser",
              detail:
                "Custom expression evaluator supporting addition, subtraction, multiplication, division, decimals, and nested parentheses with proper operator precedence.",
            },
            {
              label: "Persistence",
              detail:
                "Jetpack DataStore stores the last-selected currency pair, cached exchange rates for offline fallback, and Quick Settings onboarding state.",
            },
            {
              label: "System Tile",
              detail:
                "Android TileService with Android 14+ compatible PendingIntent launching and lifecycle tracking via onTileAdded().",
            },
          ],
        },
        features: [
          {
            title: "Quick Settings tile access",
            description:
              "Pin the converter directly to Android's Quick Settings panel for instant access from any screen.",
          },
          {
            title: "Built-in arithmetic evaluator",
            description:
              "Type expressions using +, −, ×, ÷, and parentheses directly in the amount field with real-time conversion.",
          },
          {
            title: "Offline-first rate caching",
            description:
              "Fetches live reference rates (including TWD, EUR, and DKK) and falls back automatically to cached rates without a connection.",
          },
          {
            title: "Persistent currency memory",
            description:
              "Remembers the last currency pair used and displays clean 2-decimal totals paired with 6-decimal unit exchange rates.",
          },
        ],
        impact: [],
      },
      links: [
        {
          label: "GitHub repository",
          href: "https://github.com/sergiobrancato/Converter",
          icon: "github",
        },
        {
          label: "Setup & architecture",
          href: "https://github.com/sergiobrancato/Converter#readme",
          icon: "docs",
        },
      ],
    },

    {
      id: "ettomio-ecommerce-seo",
      title: "Ettomio",
      subtitle: "E-Commerce strategy · SEO & digital marketing",
      year: "2023",
      categories: ["design"],
      summary:
        "An end-to-end e-commerce usability audit, SEO site architecture redesign, and full-funnel paid media strategy for Ettomio, an Italian sustainable Montessori children's furniture brand.",
      role: "E-Commerce & SEO strategist",
      timeframe: "Team of 3 · Academic project",
      tech: [
        "SEO",
        "Google Ads",
        "Meta Ads",
        "Google Trends",
        "Looker Studio",
        "UX Audit",
      ],
      accent: "blue",
      cover: {
        src: "/projects/ettomio/ettomio.png",
        alt: "Ettomio e-commerce and SEO strategy cover featuring Montessori house-bed product imagery and search architecture.",
      },
      gallery: [
        {
          src: "/projects/ettomio/ettomio.png",
          alt: "Competitive usability heatmap comparing Ettomio against four competitors across catalog navigation and checkout.",
          caption:
            "Usability benchmarking revealed strong catalog navigation alongside conversion friction in the checkout flow.",
        },
      ],
      caseStudy: {
        overview: [
          "Ettomio is an Italian brand crafting sustainable, Made-in-Italy Montessori children's furniture—from evolutionary house beds and foldable learning towers to natural textiles and futons. Our team developed a full-funnel e-commerce and digital marketing strategy to align organic discovery with paid acquisition.",
          "Working alongside Andrea Dallatorre and Francesco Pettenello, I contributed across competitive UX benchmarking, keyword and search-volume analysis, semantic site architecture, SEO editorial planning, and multi-channel media budgeting.",
        ],
        challenge: [
          "Competitive usability benchmarking against four industry rivals showed that while Ettomio outperformed peers in catalog navigation, major friction persisted in the checkout process.",
          "Comparing 2022 website sessions and revenue against Google Trends brand interest exposed clear misalignments—pointing to tracking inaccuracies and missed opportunities to capture seasonal demand peaks.",
          "High-intent product lines needed stronger unbranded search visibility and an informational content structure capable of educating parents on Montessori principles and sustainability.",
        ],
        architecture: {
          summary: "",
          layers: [],
        },
        features: [
          {
            title: "Competitive usability matrix",
            description:
              "Evaluated catalog navigation and checkout flows against four competitors, isolating checkout UX as the primary conversion bottleneck.",
          },
          {
            title: "Semantic tree & child-age filter",
            description:
              "Renamed and clustered categories around search intent while introducing a child-age selector during onboarding to personalize product discovery.",
          },
          {
            title: "Google Ads & Meta creative system",
            description:
              "Designed Exact/Phrase brand campaigns and Montessori bed ad groups on Google Ads, paired with emotion-led Facebook and Instagram Feed/Stories ads.",
          },
          {
            title: "12-month promotional roadmap",
            description:
              "Synchronized paid channels with seasonal peaks—including Winter/Summer Sales, Mother's Day free shipping, influencer drops, the 'Tendi un ramo all'Amazzonia' charity initiative, and Black Friday.",
          },
        ],
        impact: [
          {
            value: "64% / 36%",
            label: "demand creation vs. demand capture media split",
          },
          {
            value: "61.7%",
            label: "search volume in Montessori beds & learning towers",
          },
          {
            value: "5",
            label: "SEO editorial pillars built on brand strengths",
          },
        ],
      },
      links: [
        {
          label: "Client website",
          href: "https://ettomio.com",
          icon: "external",
        },
        {
          label: "Case study deck (PDF)",
          href: "/projects/ettomio/etto.pdf",
          icon: "docs",
        },
      ],
    },
  ],
};
