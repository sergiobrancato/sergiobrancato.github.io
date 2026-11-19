/**
 * src/content/profile.ts
 * -----------------------------------------------------------------------------
 * YOUR MASTER PROFILE. Edit this file to change:
 *   • your name, role, location, email and CV path
 *   • the typewriter phrases in the hero
 *   • hero, about and contact copy
 *   • recruiter quick facts, languages, mobility and target sectors
 *   • social links and navigation labels
 *
 * Nothing here is rendered directly — components read these objects, so you can
 * change every string without opening a .tsx file.
 *
 * QUICK START
 *   1. Replace email, links and cvPath below.
 *   2. Drop your PDF at public/cv/Sergio_Brancato_CV.pdf (or change cvPath).
 *   3. Adjust the typewriter phrases and availability line.
 */

import type { NavItem, Profile } from "@/types/portfolio";

/** The six anchors used by the left rail and the mobile dock. */
export const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "about", label: "About", icon: "user" },
  { id: "skills", label: "Capabilities", icon: "layers" },
  { id: "experience", label: "Experience", icon: "briefcase" },
  { id: "portfolio", label: "Portfolio", icon: "folder" },
  { id: "contact", label: "Contact", icon: "mail" },
];

export const profile: Profile = {
  name: {
    first: "Sergio",
    last: "Brancato",
    full: "Sergio Brancato",
    initials: "SB",
  },

  role: "Software engineer · Systems thinker · Technical communicator",

  location: {
    city: "Copenhagen",
    country: "Denmark",
    countryCode: "DK",
    timezone: "Europe/Copenhagen",
    coordinates: "55.6761° N · 12.5683° E",
  },

  email: "hello@sergiobrancato.dev",
  cvPath: "/cv/Sergio_Brancato_CV.pdf",

  availability: {
    tone: "available",
    label: "Open to European technical internships & MSc thesis collaborations",
    statusLabel: "Open",
    shortLabel: "Available 2027",
    detail: "2027 · Internship or thesis · Copenhagen or relocation",
  },

  typewriter: {
    prefix: "I’m a",
    phrases: [
      "software engineer with a systems mindset",
      "systems architect for high-stakes domains",
      "product builder grounded in research",
      "technical communicator who ships",
    ],
  },

  hero: {
    eyebrow: "Portfolio · 2026 · Copenhagen",
    primaryCta: "Explore projects",
    secondaryCta: "Download CV",
    tertiaryCta: "or start a conversation",
    scrollCue: "Scroll to explore",
    telemetry: {
      title: "Live profile",
      status: "Online",
      rows: [
        { label: "Focus", value: "Software × Systems" },
        { label: "Study", value: "MSc Software Design" },
        { label: "Base", value: "Copenhagen, DK" },
        { label: "Mobility", value: "EU-wide" },
        { label: "Sectors", value: "AER · DEF · CYB · FIN" },
      ],
      footer: "Local time · UTC+1",
    },
  },

  about: {
    index: "01",
    label: "About",
    heading: "Engineering rigour,",
    headingAccent: "human delivery.",
    description:
      "A software designer who can read the architecture, the research paper and the room.",
    paragraphs: [
      "I’m a Copenhagen-based software designer completing an MSc in Software Design at the IT University of Copenhagen, with a BSc in Communication behind me. The combination is deliberate: I wanted to understand both how systems are built and how people make sense of them.",
      "My work sits where software engineering meets product thinking and technical storytelling. I prototype interfaces for dense data, reason about architecture and security, and write the documentation that makes a system adoptable. I care about the unglamorous details — error states, latency budgets, naming, accessibility — because that is where trust is earned.",
      "I’m now looking for a technical internship or MSc thesis collaboration in aerospace, defence, cybersecurity, FinTech or scientific research: problems where correctness matters, with teams who believe clarity is part of the engineering.",
    ],
    quote: "The best systems are not only correct. They are legible.",
    quoteAttribution: "Working principle",
    currentlyLabel: "Currently seeking",
    currentFocus:
      "Exploring thesis directions in decision-support interfaces for high-consequence systems.",
  },

  quickFacts: [
    {
      id: "education",
      label: "Education",
      value: "MSc Software Design",
      detail: "IT University of Copenhagen · BSc Communication",
      icon: "graduation",
    },
    {
      id: "mobility",
      label: "European mobility",
      value: "Copenhagen-based",
      detail:
        "Open across Denmark, Switzerland, Italy, the Netherlands, France & wider Europe",
      icon: "globe",
    },
    {
      id: "languages",
      label: "Languages",
      value: "Italian · Native",
      detail: "English · C1 — professional working proficiency",
      icon: "languages",
    },
    {
      id: "sectors",
      label: "Target sectors",
      value: "Aerospace · Defence",
      detail: "Cybersecurity · FinTech · Scientific research",
      icon: "target",
    },
  ],

  languages: [
    { name: "Italian", level: "Native" },
    { name: "English", level: "C1" },
  ],

  mobility: [
    "Denmark",
    "Switzerland",
    "Italy",
    "Netherlands",
    "France",
    "Wider Europe",
  ],

  targetSectors: [
    "Aerospace",
    "Defence",
    "Cybersecurity",
    "FinTech",
    "Scientific research",
  ],

  links: [
    {
      label: "GitHub",
      href: "https://github.com/sergiobrancato",
      icon: "github",
      note: "Code, experiments & side projects",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/sergiobrancato",
      icon: "linkedin",
      note: "Experience, education & references",
    },
    {
      label: "Email",
      href: "mailto:hello@sergiobrancato.dev",
      icon: "mail",
      note: "Best for internship & thesis enquiries",
    },
  ],

  contact: {
    index: "05",
    label: "Contact",
    heading: "Let’s build something",
    headingAccent: "consequential.",
    description:
      "I’m looking for a team where software quality, clear thinking and real-world impact are treated as one problem. If that sounds like yours, I’d like to hear about it.",
    availabilityNote:
      "Open to technical internships and MSc thesis collaborations across Europe — from Copenhagen to Zurich, Amsterdam, Paris and beyond.",
    directLabel: "Direct line",
    responseNote: "I usually reply within two working days.",
    emailLabel: "Email",
    copyLabel: "Copy email",
    copiedLabel: "Email copied to clipboard",
    cvLabel: "Curriculum Vitae",
    cvNote: "PDF · Updated 2026",
    form: {
      title: "Send a note",
      description:
        "A short message is enough. Tell me the team, the problem and the timeline.",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@company.com",
      messageLabel: "Message",
      messagePlaceholder:
        "Hi Sergio — we’re working on … and we think you’d be a good fit for …",
      submitLabel: "Open email draft",
      note: "This static form opens your email client. No data leaves your browser.",
      privacyNote: "No backend · No tracking",
      checklistLabel: "A useful first note includes",
      checklist: [
        "The team, mission and what success looks like",
        "The problem you are trying to solve",
        "Timeline, location and the next step",
      ],
      toastLabel: "Email draft opened — thank you",
      subject: "Portfolio enquiry — internship or thesis collaboration",
    },
    elsewhereLabel: "Elsewhere",
  },

  footer: {
    tagline: "Software, systems & the words that hold them together.",
    note: "Designed and built in Copenhagen · Next.js · TypeScript · Tailwind CSS · Framer Motion",
    backToTop: "Back to top",
  },

  seo: {
    url: "https://sergiobrancato.dev",
    title: "Sergio Brancato — Software Engineer & Systems Thinker",
    description:
      "MSc Software Design student at ITU Copenhagen with a BSc in Communication. Building clear, resilient software for aerospace, defence, cybersecurity, FinTech and scientific research. Open to European internships and MSc thesis collaborations.",
    keywords: [
      "Sergio Brancato",
      "software engineer",
      "systems architect",
      "technical communicator",
      "MSc Software Design",
      "IT University of Copenhagen",
      "aerospace software",
      "defence technology",
      "cybersecurity",
      "FinTech",
      "CERN",
      "portfolio",
    ],
  },
};
