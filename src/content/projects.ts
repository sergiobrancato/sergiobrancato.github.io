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
    description:
      "Six projects across systems, data and communication — each one a small argument for clarity under constraints.",
  },

  allLabel: "All work",
  caseStudyLabel: "Case study",

  categories: [
    { id: "software", label: "Software & Systems" },
    { id: "data", label: "Data & Research" },
    { id: "design", label: "Design & Communication" },
  ],

  modalLabels: {
    metaRole: "Role",
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
      id: "orbit-atlas",
      title: "Orbit Atlas",
      subtitle: "Space systems · Telemetry intelligence",
      year: "2026",
      categories: ["software", "data"],
      summary:
        "A mission-control surface that turns satellite telemetry, conjunction warnings and orbital history into one readable operational picture.",
      role: "Product engineer & interface design",
      timeframe: "10 weeks · MSc studio",
      tech: ["Next.js", "TypeScript", "D3.js", "WebGL", "Python"],
      accent: "sky",
      cover: {
        src: "/projects/orbit-atlas/cover.svg",
        alt: "Orbit Atlas mission-control dashboard with orbital plot, telemetry charts and status panels.",
      },
      gallery: [
        {
          src: "/projects/orbit-atlas/gallery-01.svg",
          alt: "Orbit Atlas mission overview with satellite health cards and live telemetry.",
          caption: "Mission overview: one screen for health, link status and active warnings.",
        },
        {
          src: "/projects/orbit-atlas/gallery-02.svg",
          alt: "Orbital track replay view with ground track and timeline scrubber.",
          caption: "Time-travel replay keeps orbital state and telemetry in sync.",
        },
        {
          src: "/projects/orbit-atlas/gallery-03.svg",
          alt: "Conjunction risk panel showing miss distance and uncertainty.",
          caption: "Every risk score carries its rationale — no unexplained red badges.",
        },
        {
          src: "/projects/orbit-atlas/gallery-04.svg",
          alt: "Orbit Atlas component library and colour accessibility notes.",
          caption: "A small component system keeps the console coherent under pressure.",
        },
      ],
      caseStudy: {
        overview: [
          "Orbit Atlas is a prototype decision-support surface for small satellite operations teams. It turns raw telemetry, orbital elements and conjunction warnings into one readable operational picture.",
          "I led the interface architecture and frontend, and worked with a simulated operator to pressure-test the workflows that matter during a pass: what is healthy, what is changing, and what needs attention now.",
        ],
        challenge: [
          "Operators were juggling a telemetry plotter, a spreadsheet of orbital elements and a separate warning feed. Each tool was competent; together they made prioritisation slow and error-prone.",
          "The hard part was not drawing an orbit. It was deciding what deserved attention: a temperature drift, a degraded link or a close approach with a 30-minute window can all look urgent in isolation.",
          "The interface also had to survive an eight-hour shift, a projector in a bright room, and a reviewer who may be colour-blind. Legibility was a functional requirement.",
        ],
        architecture: {
          summary:
            "An event-driven telemetry pipeline feeds a typed React client. WebGL handles the orbital scene; a small Python service owns propagation and risk scoring.",
          layers: [
            {
              label: "Ingestion",
              detail:
                "A Python worker normalises telemetry frames and TLE sets into a time-series store with deterministic fixtures for replay.",
            },
            {
              label: "Domain service",
              detail:
                "Propagation and conjunction scoring are exposed over a typed API. Each risk level ships with the factors behind it.",
            },
            {
              label: "Client",
              detail:
                "Next.js and TypeScript, D3 for time-series, WebGL for the orbital scene, and a reducer-driven replay clock shared across every view.",
            },
            {
              label: "Quality",
              detail:
                "Playwright smoke tests, seeded data, reduced-motion support and a keyboard-first interaction model.",
            },
          ],
        },
        features: [
          {
            title: "Operational overview",
            description:
              "A single-screen health summary: link status, battery trend, thermal envelope and active warnings, ranked by consequence.",
          },
          {
            title: "Time-travel replay",
            description:
              "Scrub the mission timeline to reconstruct an anomaly with telemetry and orbit state moving together.",
          },
          {
            title: "Explainable conjunction risk",
            description:
              "Each close approach shows miss distance, uncertainty and the inputs driving the score, so an operator can disagree with the system.",
          },
          {
            title: "Accessible by default",
            description:
              "Colour-blind-safe encodings, redundant shape and label cues, reduced motion, and full keyboard navigation.",
          },
        ],
        impact: [
          { value: "12k", label: "telemetry points replayed at 60 fps" },
          { value: "4 → 1", label: "operator workflows consolidated into one surface" },
          { value: "100%", label: "risk scores with visible rationale" },
        ],
      },
      links: [
        {
          label: "GitHub repository",
          href: "https://github.com/sergiobrancato/orbit-atlas",
          icon: "github",
        },
        {
          label: "Live demo",
          href: "https://sergiobrancato.github.io/orbit-atlas/",
          icon: "external",
        },
        {
          label: "Case-study notes",
          href: "https://github.com/sergiobrancato/orbit-atlas#readme",
          icon: "docs",
        },
      ],
    },

    {
      id: "sentinel-access",
      title: "Sentinel",
      subtitle: "Cybersecurity · Zero-trust access reviews",
      year: "2026",
      categories: ["software"],
      summary:
        "An access-review console that makes policy decisions explainable, reviewable and auditable — without slowing security teams down.",
      role: "Full-stack engineer",
      timeframe: "8 weeks · Systems security studio",
      tech: ["Go", "React", "Open Policy Agent", "PostgreSQL", "Docker"],
      accent: "violet",
      cover: {
        src: "/projects/sentinel-access/cover.svg",
        alt: "Sentinel access-review console with policy graph and review queue.",
      },
      gallery: [
        {
          src: "/projects/sentinel-access/gallery-01.svg",
          alt: "Sentinel access review queue with risk grouping and reviewer assignments.",
          caption: "Review queues grouped by blast radius, not alphabetically.",
        },
        {
          src: "/projects/sentinel-access/gallery-02.svg",
          alt: "Policy simulation view showing proposed changes before deployment.",
          caption: "Simulate a policy change against real access graphs before shipping it.",
        },
        {
          src: "/projects/sentinel-access/gallery-03.svg",
          alt: "Permission diff showing added and removed capabilities.",
          caption: "Diffs speak in capabilities and consequences, not raw policy syntax.",
        },
        {
          src: "/projects/sentinel-access/gallery-04.svg",
          alt: "Audit ledger export with policy provenance.",
          caption: "Every decision resolves to a policy line and an immutable ledger entry.",
        },
      ],
      caseStudy: {
        overview: [
          "Sentinel is an access-review console for teams moving from static roles to policy-as-code. It gives reviewers a queue, a diff and an explanation for every decision, then writes the evidence an auditor will ask for.",
          "The project asked a simple question: can a security tool explain itself? The answer had to hold up in a live review, not just a demo.",
        ],
        challenge: [
          "Access reviews often live in spreadsheets: slow, detached from the policy engine and impossible to audit with confidence.",
          "Reviewers were being asked to approve changes expressed as hundreds of lines of Rego. They needed to see capabilities, affected resources and blast radius — in language they could defend.",
          "Auditors needed an immutable trail. Engineers needed a fast path. Both needs had to be served by the same decision record.",
        ],
        architecture: {
          summary:
            "A Go API evaluates authorization through Open Policy Agent, records an append-only audit ledger in PostgreSQL, and streams a React console.",
          layers: [
            {
              label: "Policy",
              detail:
                "OPA policies are versioned in git. A simulation endpoint evaluates proposed changes against the current access graph before merge.",
            },
            {
              label: "API",
              detail:
                "Go service handles review queues, approvals and evidence export, with structured decision logs from the first request.",
            },
            {
              label: "Evidence",
              detail:
                "PostgreSQL append-only ledger stores policy hash, input snapshot and reviewer action for every decision.",
            },
            {
              label: "Client",
              detail:
                "React console with optimistic updates, explicit loading and failure states, and a keyboard-driven review flow.",
            },
          ],
        },
        features: [
          {
            title: "Policy simulator",
            description:
              "Run a proposed policy against the real access graph and see who gains or loses what before anything ships.",
          },
          {
            title: "Capability diffs",
            description:
              "Translate Rego changes into readable capabilities, affected resources and a plain-language risk summary.",
          },
          {
            title: "Risk-ranked queues",
            description:
              "Sort reviews by blast radius, privilege level and inactivity, so the highest-consequence decisions get human attention first.",
          },
          {
            title: "Audit-ready export",
            description:
              "One click produces a signed evidence bundle: policy version, decision inputs, reviewer and timestamp.",
          },
        ],
        impact: [
          { value: "6 days → 90 min", label: "prototype review cycle for a 40-service estate" },
          { value: "100%", label: "decisions traceable to a policy line" },
          { value: "0", label: "standing admin rights required for reviewers" },
        ],
      },
      links: [
        {
          label: "GitHub repository",
          href: "https://github.com/sergiobrancato/sentinel-access",
          icon: "github",
        },
        {
          label: "Architecture notes",
          href: "https://github.com/sergiobrancato/sentinel-access#architecture",
          icon: "docs",
        },
      ],
    },

    {
      id: "helios-explorer",
      title: "Helios",
      subtitle: "Scientific research · Solar observation data",
      year: "2025",
      categories: ["data", "software"],
      summary:
        "A cross-filtered explorer that makes four decades of solar observation data usable without writing a single query.",
      role: "Data interface engineer",
      timeframe: "6 weeks · Research collaboration",
      tech: ["Python", "FastAPI", "DuckDB", "React", "Plotly"],
      accent: "amber",
      cover: {
        src: "/projects/helios-explorer/cover.svg",
        alt: "Helios solar data explorer with sunspot charts, spectrum bands and filters.",
      },
      gallery: [
        {
          src: "/projects/helios-explorer/gallery-01.svg",
          alt: "Helios cross-filtered dataset view with time range and instrument filters.",
          caption: "Cross-filtering keeps the question and the evidence on the same screen.",
        },
        {
          src: "/projects/helios-explorer/gallery-02.svg",
          alt: "Solar cycle comparison chart with annotations.",
          caption: "Cycle comparisons are precomputed, annotated and reproducible.",
        },
        {
          src: "/projects/helios-explorer/gallery-03.svg",
          alt: "Data provenance panel showing source files and processing steps.",
          caption: "Every chart can reveal its provenance trail and export it.",
        },
        {
          src: "/projects/helios-explorer/gallery-04.svg",
          alt: "Helios export dialog with analysis-ready dataset options.",
          caption: "Exports carry the filters, versions and citation metadata with them.",
        },
      ],
      caseStudy: {
        overview: [
          "Helios is a research-data explorer for a solar physics group sitting on forty years of heterogeneous observations. It lets researchers move from a question to a defensible, citable dataset without writing SQL.",
          "I designed the interaction model and built the frontend against a FastAPI/DuckDB backend developed with the research team.",
        ],
        challenge: [
          "The archive spans multiple instruments, file formats and calibration periods. Researchers knew the questions but not the schema, so exploratory work depended on one or two power users.",
          "Scientific trust is non-negotiable: a beautiful chart is worthless if you cannot explain which files, versions and filters produced it.",
          "The tool had to fit existing habits — annotations, exports, citations — rather than asking a lab to change how it works.",
        ],
        architecture: {
          summary:
            "Parquet observations are queried through DuckDB behind a FastAPI service. The React client owns cross-filter state and requests only the aggregates it needs.",
          layers: [
            {
              label: "Data",
              detail:
                "Heterogeneous observations are normalised into partitioned Parquet with a versioned schema and calibration metadata.",
            },
            {
              label: "Query",
              detail:
                "FastAPI exposes typed aggregate endpoints; DuckDB handles wide time-range scans without loading raw data into the browser.",
            },
            {
              label: "Interface",
              detail:
                "React with a single cross-filter store, URL-serialised state and Plotly charts tuned for dense scientific series.",
            },
            {
              label: "Provenance",
              detail:
                "Each query returns source partitions, schema version and filter state, embedded in every export.",
            },
          ],
        },
        features: [
          {
            title: "Cross-filtered exploration",
            description:
              "Brush a time range, isolate an instrument, or select a cycle — every chart and count updates together.",
          },
          {
            title: "Provenance by default",
            description:
              "A slide-over panel shows the exact source files, calibration version and filters behind the current view.",
          },
          {
            title: "Reproducible exports",
            description:
              "Download CSV or a publication-ready figure with a citation stub and the query state attached.",
          },
          {
            title: "Annotation layer",
            description:
              "Researchers can pin notes to a time range and share a durable URL with collaborators.",
          },
        ],
        impact: [
          { value: "40 yrs", label: "of observations in one explorable index" },
          { value: "0 SQL", label: "required to reach a citable dataset" },
          { value: "100%", label: "exports carrying provenance metadata" },
        ],
      },
      links: [
        {
          label: "GitHub repository",
          href: "https://github.com/sergiobrancato/helios-explorer",
          icon: "github",
        },
        {
          label: "Data notes",
          href: "https://github.com/sergiobrancato/helios-explorer#data",
          icon: "docs",
        },
      ],
    },

    {
      id: "lumen-design-system",
      title: "Lumen",
      subtitle: "Design systems · Scientific software",
      year: "2025",
      categories: ["design", "software"],
      summary:
        "A design system and documentation layer that gave three research tools one coherent, accessible interface language.",
      role: "Design systems lead",
      timeframe: "12 weeks · Product team",
      tech: ["Figma", "Storybook", "TypeScript", "Radix UI", "Tokens Studio"],
      accent: "pink",
      cover: {
        src: "/projects/lumen-design-system/cover.svg",
        alt: "Lumen design system cover with component grid, colour tokens and type scale.",
      },
      gallery: [
        {
          src: "/projects/lumen-design-system/gallery-01.svg",
          alt: "Lumen component library overview with buttons, fields and data table.",
          caption: "Components documented by job, not by visual category.",
        },
        {
          src: "/projects/lumen-design-system/gallery-02.svg",
          alt: "Design token pipeline diagram from Figma to CSS variables.",
          caption: "One token source, two consumers: Figma and production CSS.",
        },
        {
          src: "/projects/lumen-design-system/gallery-03.svg",
          alt: "Accessibility annotations for focus states and contrast.",
          caption: "Accessibility notes ship with the component, not in a separate PDF.",
        },
        {
          src: "/projects/lumen-design-system/gallery-04.svg",
          alt: "Documentation page layout with usage guidance and code example.",
          caption: "Usage, misuse and migration guidance sit beside the preview.",
        },
      ],
      caseStudy: {
        overview: [
          "Lumen is a design system for a family of scientific analysis tools used by researchers who live in dense interfaces for hours at a time. It covers tokens, React components and the documentation that keeps them honest.",
          "I led the system end to end: audit, token architecture, component API design, accessibility criteria and the adoption plan for three product teams.",
        ],
        challenge: [
          "Each tool had evolved its own table, filter bar and empty state. Researchers paid the tax: the same action looked different depending on which product they opened.",
          "Accessibility was inconsistent, especially focus visibility and chart contrast — exactly the details that matter in long analytical sessions.",
          "Designers and engineers were maintaining parallel component libraries, so drift was guaranteed.",
        ],
        architecture: {
          summary:
            "A single token source generates Figma styles and CSS variables. React components wrap Radix primitives; Storybook documents usage, accessibility and migration.",
          layers: [
            {
              label: "Tokens",
              detail:
                "Semantic tokens for colour, type, spacing, elevation and data visualisation, authored once and published to both Figma and CSS.",
            },
            {
              label: "Components",
              detail:
                "TypeScript React components on Radix primitives, with documented states, slots and data-density modes.",
            },
            {
              label: "Documentation",
              detail:
                "Storybook pages pair live examples with usage, misuse, keyboard behaviour and accessibility annotations.",
            },
            {
              label: "Quality gates",
              detail:
                "Contrast checks, interaction tests and visual regression snapshots run on every pull request.",
            },
          ],
        },
        features: [
          {
            title: "48 documented components",
            description:
              "From data tables and filter chips to dialogs and empty states, each with states, API notes and examples.",
          },
          {
            title: "Semantic tokens",
            description:
              "Colour and spacing names describe intent, not hex values, making theme changes and data-viz consistency tractable.",
          },
          {
            title: "Accessibility annotations",
            description:
              "Focus order, keyboard maps and contrast requirements are part of the component contract.",
          },
          {
            title: "Adoption playbook",
            description:
              "A migration guide, codemods where possible, and a weekly open clinic for the three product teams.",
          },
        ],
        impact: [
          { value: "3", label: "product teams adopted the system" },
          { value: "40%", label: "fewer UI defects in the pilot release" },
          { value: "AA", label: "contrast baseline across core components" },
        ],
      },
      links: [
        {
          label: "GitHub repository",
          href: "https://github.com/sergiobrancato/lumen-design-system",
          icon: "github",
        },
        {
          label: "Storybook",
          href: "https://sergiobrancato.github.io/lumen-design-system/",
          icon: "external",
        },
        {
          label: "Usage guidelines",
          href: "https://github.com/sergiobrancato/lumen-design-system#usage",
          icon: "docs",
        },
      ],
    },

    {
      id: "cadence-risk",
      title: "Cadence",
      subtitle: "FinTech · Private portfolio risk analytics",
      year: "2026",
      categories: ["software", "data"],
      summary:
        "A browser-based scenario engine that lets risk analysts explore portfolio outcomes in milliseconds — without portfolio data leaving the machine.",
      role: "Frontend & WebAssembly engineer",
      timeframe: "9 weeks · FinTech studio",
      tech: ["Rust", "WebAssembly", "React", "D3.js", "TypeScript"],
      accent: "emerald",
      cover: {
        src: "/projects/cadence-risk/cover.svg",
        alt: "Cadence portfolio risk dashboard with distribution curves and scenario controls.",
      },
      gallery: [
        {
          src: "/projects/cadence-risk/gallery-01.svg",
          alt: "Cadence scenario workspace with risk distribution and drawdown controls.",
          caption: "Scenario sliders recompute the distribution locally, not on a server.",
        },
        {
          src: "/projects/cadence-risk/gallery-02.svg",
          alt: "Monte Carlo simulation controls and performance panel.",
          caption: "A Rust simulation core compiled to WebAssembly keeps runs private and fast.",
        },
        {
          src: "/projects/cadence-risk/gallery-03.svg",
          alt: "Portfolio exposure and correlation matrix.",
          caption: "Exposure and correlation views stay linked to the active scenario.",
        },
        {
          src: "/projects/cadence-risk/gallery-04.svg",
          alt: "Audit-ready export snapshot of a risk scenario.",
          caption: "Every export captures assumptions, seeds and model version.",
        },
      ],
      caseStudy: {
        overview: [
          "Cadence is a private scenario-analysis workspace for portfolio risk. Analysts can stress a portfolio, inspect outcome distributions and export the assumptions behind a decision — entirely in the browser.",
          "I built the WebAssembly simulation layer and the visual analytics interface, working with a former risk analyst on the domain model.",
        ],
        challenge: [
          "Scenario analysis in many small firms is batched overnight. By the time results arrive, the conversation has moved on.",
          "Sending a client portfolio to a third-party compute service raises data-protection questions that are hard to answer and easy to avoid.",
          "Speed alone is not enough: analysts need to see which assumptions drive the result, and reproduce the run later.",
        ],
        architecture: {
          summary:
            "A Rust simulation core compiles to WebAssembly and runs in a Web Worker. React owns the scenario state; D3 renders distributions without blocking input.",
          layers: [
            {
              label: "Simulation core",
              detail:
                "Rust models correlated asset returns, seeded Monte Carlo runs and drawdown statistics, compiled to WASM with a small typed boundary.",
            },
            {
              label: "Scheduling",
              detail:
                "A dedicated Web Worker keeps the main thread free; results stream back in chunks so charts update progressively.",
            },
            {
              label: "Interface",
              detail:
                "React scenario controls with debounced recomputation, D3 distributions and a linked exposure matrix.",
            },
            {
              label: "Privacy",
              detail:
                "CSV import, simulation and export all happen locally. No portfolio payload is ever sent to a server.",
            },
          ],
        },
        features: [
          {
            title: "Instant scenarios",
            description:
              "Adjust horizon, confidence and allocation weights and watch the outcome distribution recompute in milliseconds.",
          },
          {
            title: "Explainable risk",
            description:
              "Contribution-to-risk views show which holdings and correlations are driving the tail, not just the headline number.",
          },
          {
            title: "Local-first privacy",
            description:
              "A strict no-upload model makes the tool usable with sensitive client data.",
          },
          {
            title: "Reproducible exports",
            description:
              "A scenario snapshot captures inputs, RNG seed, model version and timestamp for later review.",
          },
        ],
        impact: [
          { value: "40 ms", label: "median local recompute for a 500-asset scenario" },
          { value: "0 bytes", label: "of portfolio data sent to a server" },
          { value: "5×", label: "more scenarios explored per review session" },
        ],
      },
      links: [
        {
          label: "GitHub repository",
          href: "https://github.com/sergiobrancato/cadence-risk",
          icon: "github",
        },
        {
          label: "Model notes",
          href: "https://github.com/sergiobrancato/cadence-risk#model",
          icon: "docs",
        },
        {
          label: "Live demo",
          href: "https://sergiobrancato.github.io/cadence-risk/",
          icon: "external",
        },
      ],
    },

    {
      id: "field-notes",
      title: "Field Notes",
      subtitle: "Research communication · Interactive publishing",
      year: "2025",
      categories: ["design", "data"],
      summary:
        "A scrollytelling platform that turns dense research into an explorable narrative — accessible, citable and authorable without a frontend team.",
      role: "Designer & frontend engineer",
      timeframe: "10 weeks · Independent",
      tech: ["Next.js", "MDX", "Three.js", "D3.js", "Content design"],
      accent: "blue",
      cover: {
        src: "/projects/field-notes/cover.svg",
        alt: "Field Notes interactive research story with topographic lines and citation cards.",
      },
      gallery: [
        {
          src: "/projects/field-notes/gallery-01.svg",
          alt: "Field Notes reading view with narrative column and figure annotation.",
          caption: "The narrative stays readable; interaction is an enhancement, not a toll gate.",
        },
        {
          src: "/projects/field-notes/gallery-02.svg",
          alt: "Scrollytelling scene with a map transforming alongside the text.",
          caption: "Scenes are declared in MDX with accessible text alternatives.",
        },
        {
          src: "/projects/field-notes/gallery-03.svg",
          alt: "Citation hover card showing source metadata.",
          caption: "Citations resolve to structured sources, not dead-end footnotes.",
        },
        {
          src: "/projects/field-notes/gallery-04.svg",
          alt: "Authoring workflow from Markdown to static publication.",
          caption: "A researcher can publish a story without touching a component.",
        },
      ],
      caseStudy: {
        overview: [
          "Field Notes is a publishing platform for research that deserves more than a PDF. It combines long-form narrative, interactive figures and structured citations, then exports a fast static site.",
          "I designed the reading experience and built the MDX pipeline, figure primitives and citation system. The test case was a real environmental research story.",
        ],
        challenge: [
          "Research communication often forces a choice: a readable article or an interactive explorable — rarely both, and almost never with a credible citation trail.",
          "Interactive stories frequently break keyboard navigation, screen readers and print. Accessibility is usually added after the animation budget is spent.",
          "Researchers do not have time to become frontend engineers. The authoring format had to be plain text with guardrails.",
        ],
        architecture: {
          summary:
            "MDX content is compiled at build time. A small registry of figure components, citation data and scroll scenes gives authors power without bespoke code.",
          layers: [
            {
              label: "Content",
              detail:
                "MDX with frontmatter, typed citation keys and a limited set of narrative components documented in the author guide.",
            },
            {
              label: "Figures",
              detail:
                "D3 and Three.js primitives receive data and a text description; every interactive figure has a static fallback.",
            },
            {
              label: "Reading layer",
              detail:
                "Next.js static export, progressive enhancement for scroll scenes, print styles and reduced-motion variants.",
            },
            {
              label: "Citations",
              detail:
                "A structured bibliography powers hover cards, reference lists and machine-readable metadata.",
            },
          ],
        },
        features: [
          {
            title: "MDX authoring",
            description:
              "Researchers write Markdown, choose from documented figure components and publish through a normal git workflow.",
          },
          {
            title: "Scrollytelling with guardrails",
            description:
              "Scenes declare start and end states; reduced-motion and no-JS readers get the full argument in a static layout.",
          },
          {
            title: "Structured citations",
            description:
              "Hover cards, reference lists and metadata all draw from one bibliography, so sources cannot drift.",
          },
          {
            title: "Print and screen-reader parity",
            description:
              "Every figure ships with a caption and text alternative; the print stylesheet preserves the narrative.",
          },
        ],
        impact: [
          { value: "2.4×", label: "pilot read-through versus the PDF version" },
          { value: "100%", label: "figures with text alternatives" },
          { value: "0", label: "bespoke components needed per story" },
        ],
      },
      links: [
        {
          label: "GitHub repository",
          href: "https://github.com/sergiobrancato/field-notes",
          icon: "github",
        },
        {
          label: "Live story",
          href: "https://sergiobrancato.github.io/field-notes/",
          icon: "external",
        },
        {
          label: "Author guide",
          href: "https://github.com/sergiobrancato/field-notes#authoring",
          icon: "docs",
        },
      ],
    },
  ],
};
