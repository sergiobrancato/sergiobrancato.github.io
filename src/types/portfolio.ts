/**
 * src/types/portfolio.ts
 * -----------------------------------------------------------------------------
 * The single TypeScript contract shared by the content files and the UI.
 *
 * You normally never edit this file to update the site: edit the files in
 * src/content/ instead. Come here only when you want to add a new *kind* of
 * information (for example, a new project field) — TypeScript will then guide
 * you to every place that needs updating.
 */

/* -------------------------------------------------------------------------- */
/*  Shared primitives                                                          */
/* -------------------------------------------------------------------------- */

export type SectionId =
  | "home"
  | "about"
  | "skills"
  | "experience"
  | "portfolio"
  | "contact";

export type Accent = "cyan" | "pink" | "amber" | "violet" | "emerald" | "blue";

export type NavIcon =
  | "home"
  | "user"
  | "layers"
  | "briefcase"
  | "folder"
  | "mail";

export type FactIcon = "graduation" | "globe" | "languages" | "target";

export type SkillIcon = "code" | "layout" | "server" | "megaphone";

export type LinkIcon =
  | "github"
  | "linkedin"
  | "mail"
  | "cv"
  | "external"
  | "docs"
  | "phone";

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export interface NavItem {
  /** Must match the id of the matching <section> in the page. */
  id: SectionId;
  /** Tooltip / accessible label shown in the rail. */
  label: string;
  /** Icon key resolved in components/layout/LeftNavRail.tsx. */
  icon: NavIcon;
}

/* -------------------------------------------------------------------------- */
/*  Profile, hero, about & contact                                             */
/* -------------------------------------------------------------------------- */

export interface SocialLink {
  label: string;
  href: string;
  icon: LinkIcon;
  /** Short descriptor shown under the link, e.g. "Code & experiments". */
  note?: string;
}

export interface QuickFact {
  id: string;
  label: string;
  value: string;
  detail: string;
  icon: FactIcon;
}

export interface Language {
  name: string;
  level: string;
}

export interface SectionIntro {
  /** Two-digit section number, e.g. "01". */
  index: string;
  /** Small mono label above the heading, e.g. "About". */
  label: string;
  /** Main heading, rendered in the display typeface. */
  heading: string;
  /** Italic serif tail of the heading, rendered in a warmer colour. */
  headingAccent: string;
  /** One or two sentences that orient a recruiter. */
  description: string;
}

export interface Profile {
  name: {
    first: string;
    last: string;
    full: string;
    initials: string;
  };
  /** Short role line used in metadata and the footer. */
  role: string;
  location: {
    city: string;
    country: string;
    countryCode: string;
    /** IANA timezone, used by the live hero clock. */
    timezone: string;
    /** Decorative coordinates, shown in mono type. */
    coordinates: string;
  };
  email: string;
  /** Path inside /public, e.g. "/cv/Sergio_Brancato_CV.pdf". */
  cvPath: string;

  availability: {
    /** e.g. "available" | "open" — used for the pulsing dot colour key. */
    tone: "available" | "open" | "closed";
    label: string;
    /** One-word status for compact UI, e.g. "Open". */
    statusLabel: string;
    /** Compact form for the contact card, e.g. "Available 2027". */
    shortLabel: string;
    detail: string;
  };

  typewriter: {
    prefix: string;
    phrases: string[];
  };

  hero: {
    eyebrow: string;
    intro: string;
    primaryCta: string;
    secondaryCta: string;
    /** Quiet text link beside the buttons. */
    tertiaryCta: string;
    scrollCue: string;
    /** Live "telemetry" panel shown on large screens. */
    telemetry: {
      title: string;
      status: string;
      rows: { label: string; value: string }[];
      footer: string;
    };
  };

  about: SectionIntro & {
    /** Each string is its own paragraph. */
    paragraphs: string[];
    quote: string;
    quoteAttribution: string;
    /** Label on the strip above the target-sector pills. */
    currentlyLabel: string;
    /** Short "currently" note inside the portrait plate. */
    currentFocus: string;
  };

  quickFacts: QuickFact[];
  languages: Language[];
  mobility: string[];
  targetSectors: string[];

  links: SocialLink[];

  contact: SectionIntro & {
    availabilityNote: string;
    /** Label above the large email address. */
    directLabel: string;
    /** Short reply-time promise beside the email card. */
    responseNote: string;
    emailLabel: string;
    copyLabel: string;
    copiedLabel: string;
    /** Label and note for the CV link in the "Elsewhere" grid. */
    cvLabel: string;
    cvNote: string;
    form: {
      title: string;
      description: string;
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitLabel: string;
      note: string;
      /** Reassurance line on the form, e.g. "No backend · No tracking". */
      privacyNote: string;
      /** Short helper list shown beside the form on desktop. */
      checklistLabel: string;
      checklist: string[];
      /** Toast shown after the mailto draft is opened. */
      toastLabel: string;
      /** Used to prefill the mailto subject. */
      subject: string;
    };
    elsewhereLabel: string;
  };

  footer: {
    tagline: string;
    note: string;
    backToTop: string;
  };

  seo: {
    /** Canonical production URL — update when you connect a custom domain. */
    url: string;
    title: string;
    description: string;
    keywords: string[];
  };
}

/* -------------------------------------------------------------------------- */
/*  Skills                                                                     */
/* -------------------------------------------------------------------------- */

export interface SkillCategory {
  id: string;
  index: string;
  title: string;
  description: string;
  icon: SkillIcon;
  /** Technologies / capabilities rendered as pills. */
  items: string[];
  /** Optional single-line proof point at the bottom of the card. */
  footnote: string;
}

export interface SkillsContent {
  intro: SectionIntro;
  categories: SkillCategory[];
  /** Tools shown in the thin strip beneath the cards. */
  toolbelt: string[];
  toolbeltLabel: string;
}

/* -------------------------------------------------------------------------- */
/*  Experience & education                                                     */
/* -------------------------------------------------------------------------- */

export type ExperienceType = "work" | "research" | "education";

export interface ExperienceItem {
  id: string;
  type: ExperienceType;
  role: string;
  organization: string;
  location: string;
  period: string;
  /** Shows a pulsing "Current" marker on the timeline. */
  current?: boolean;
  summary: string;
  bullets: string[];
  tags: string[];
  /** Optional credential or context line, e.g. "MSc programme · 120 ECTS". */
  credential?: string;
}

export interface ExperienceContent {
  intro: SectionIntro;
  /** Display labels for the three item types. */
  typeLabels: Record<ExperienceType, string>;
  /** Label on the pulsing marker for an ongoing item. */
  currentLabel: string;
  items: ExperienceItem[];
}

/* -------------------------------------------------------------------------- */
/*  Portfolio                                                                  */
/* -------------------------------------------------------------------------- */

export type ProjectCategory = "software" | "data" | "design";

export interface ProjectCategoryMeta {
  id: ProjectCategory;
  label: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  /** Optional caption shown beneath gallery images and in the lightbox. */
  caption?: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  icon: LinkIcon;
}

export interface CaseStudy {
  /** Plain-English summary — two or three short paragraphs. */
  overview: string[];
  challenge: string[];
  architecture: {
    summary: string;
    /** The stack, explained as layers rather than a naked logo wall. */
    layers: { label: string; detail: string }[];
  };
  features: { title: string; description: string }[];
  impact: { value: string; label: string }[];
}

export interface Project {
  /** URL-safe id — also used as the React key. */
  id: string;
  title: string;
  /** Domain line shown under the title, e.g. "Space systems · Telemetry". */
  subtitle: string;
  year: string;
  categories: ProjectCategory[];
  /** One sentence used on the card. */
  summary: string;
  /** Your role, shown in the case-study header. */
  role: string;
  timeframe: string;
  tech: string[];
  accent: Accent;
  cover: ImageAsset;
  gallery: ImageAsset[];
  caseStudy: CaseStudy;
  links: ProjectLink[];
}

export interface ProjectModalLabels {
  metaRole: string;
  metaTimeline: string;
  metaYear: string;
  metaStack: string;
  /** Suffix after the number of technologies, e.g. "tools". */
  toolsSuffix: string;
  overview: string;
  challenge: string;
  architecture: string;
  features: string;
  actionLinks: string;
}

export interface PortfolioContent {
  intro: SectionIntro;
  /** Label for the "show everything" filter. */
  allLabel: string;
  /** Short label used on cards and in the modal footer. */
  caseStudyLabel: string;
  categories: ProjectCategoryMeta[];
  /** Editable headings inside the case-study modal. */
  modalLabels: ProjectModalLabels;
  projects: Project[];
}
