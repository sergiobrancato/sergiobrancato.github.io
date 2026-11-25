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

  email: "sergiobrancato.jobs@gmail.com",
  cvPath: "/cv/Sergio_Brancato.pdf",

  availability: {
    tone: "available",
    label: "Open to work",
    statusLabel: "Open",
    shortLabel: "Available",
    detail: "2027 · Internship or thesis · Copenhagen or relocation",
  },

  typewriter: {
    prefix: "I’m a",
    phrases: [
      "software developer with a system mindset",
      "detail-oriented professional",
      "product builder grounded in research",
      "technical communicator",
    ],
  },

  hero: {
    eyebrow: "Portfolio · 2026",
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
    heading: "Technical thinking,",
    headingAccent: "human connection.",
    description:
      "A software developer who can read the architecture, the research paper and the room.",
    paragraphs: [
      "I started my path studying how people communicate and make sense of science and technology during my bachelor in Communication at the University of Padua, Italy;  before realizing I didn't just want to analyze digital systems, I wanted to build them. That curiosity led me to Copenhagen, where I am completing an MSc in Software Design at the IT University of Copenhagen, bridging human-centered communication with full-stack engineering, data systems, and software architecture.",
      "My background blends academic research, web development, and fast-paced teamwork. Alongside my studies, I worked as a research web developer in Padua and took on several customer-facing roles across Italy and Copenhagen, sharpening my ability to stay calm under pressure and communicate clearly with anyone. Outside of coursework, I enjoy building personal projects to practice my skills or to simplify either my or my friends life/work. ",
    ],
    quote:
      "The most dangerous phrase in the language is, 'We've always done it this way.'",
    quoteAttribution:
      "Grace Hopper (Computer Scientist & U.S. Navy Rear Admiral)",
    currentlyLabel: "Currently seeking",
    currentFocus: "Exploring various directions in the job market.",
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
      detail: "Open to relocate across Europe",
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
      detail: "Cybersecurity · FinTech · Scientific research · Startup",
      icon: "target",
    },
  ],

  languages: [
    { name: "Italian", level: "Native" },
    { name: "English", level: "C1" },
  ],

  mobility: ["Copenhagen, Denmark", "Europe-wide (relocation open)"],

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
      href: "https://www.linkedin.com/in/sergio-b-16a54a36b/",
      icon: "linkedin",
      note: "Experience, education & references",
    },
    {
      label: "Email",
      href: "sergiobrancato.jobs@gmail.com",
      icon: "mail",
      note: "Best for internship & thesis enquiries",
    },
  ],

  contact: {
    index: "05",
    label: "Contact",
    heading: "Let’s build something",
    headingAccent: ".",
    description:
      "If you have a project or questions, I'd love to hear them from you. Reach out via email or LinkedIn, and I'll get back to you as soon as possible.",
    availabilityNote: "",
    directLabel: "Direct line",
    responseNote: "I usually reply within two working days.",
    emailLabel: "Email",
    copyLabel: "Copy email",
    copiedLabel: "Email copied to clipboard",
    cvLabel: "Curriculum Vitae",
    cvNote: "PDF · Updated 2026",
    form: {
      title: "Send a note",
      description: "A short message is enough.",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@company.com",
      messageLabel: "Message",
      messagePlaceholder:
        "Hi Sergio — we’re working on … and we think you’d be a good fit for …",
      submitLabel: "Open email draft",
      note: "This will open your email client with a prefilled draft. You can edit it before sending.",
      privacyNote: "",
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
    tagline: "",
    note: "",
    backToTop: "Back to top",
  },

  seo: {
    url: "https://github.io/sergiobrancato",
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
