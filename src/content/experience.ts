/**
 * src/content/experience.ts
 * -----------------------------------------------------------------------------
 * EXPERIENCE & EDUCATION TIMELINE.
 *
 * Each item needs a unique `id` and a `type`:
 *   "work" | "research" | "education"
 *
 * Put items in the order you want them displayed (newest first works well).
 * Set `current: true` on anything ongoing to get the pulsing marker.
 *
 * NOTE: The positions, dates and metrics below are editable starter content
 * based on the background brief. Replace them with your real CV details before
 * publishing — especially the BSc institution and year range.
 */

import type { ExperienceContent } from "@/types/portfolio";

export const experienceContent: ExperienceContent = {
  intro: {
    index: "03",
    label: "Trajectory",
    heading: "A path through",
    headingAccent: "systems and stories.",
    description: "Research, projects and work. Not in chronological order",
  },

  typeLabels: {
    work: "Industry",
    research: "Research",
    education: "Education",
  },

  currentLabel: "Current",

  items: [
    {
      id: "web-developer",
      type: "work",
      role: "Web developer",
      organization: "University of Padua",
      location: "Remote",
      period: "2025 — Present",
      current: true,
      summary:
        "Research grant awarded by the University of Padua. My role involved developing and maintaining a landing page and a dashboard for the T.I.P.S. project, a group of researchers which aims to collect and analyse digital contents available on the web. Main accomplished tasks:",
      bullets: [
        "Developed a full-stack dashboard using Next.js and REST APIs to analyze online news data.",
        "Implemented interactive data visualizations using D3.js and Nivo.",
        "Integrated JWT authentication and collaborated closely with UI/UX designers to improve platform usability.",
      ],
      tags: [
        "Next.js",
        "Nivo",
        "D3.js",
        "JWT Auth",
        "Data visualization",
        "REST API",
      ],
      credential: "",
    },
    {
      id: "data-analysis",
      type: "research",
      role: "Data analysis",
      organization: "Water&Life Lab.",
      location: "Padua, Italy",
      period: "2024",
      current: false,
      summary:
        "I collaborated with the company Water & Life Lab, a chemical analysis laboratory, for which I personally analyzed customer satisfaction data provided by the company. I applied multiple regression models, and discussed my findings with the company to provide insights and recommendations on what their customers valued the most",
      bullets: [],
      tags: [
        "Statgraphics centurion",
        "Data analytics",
        "Microsoft Excel",
        "Customer satisfaction",
      ],
    },
    {
      id: "barback",
      type: "work",
      role: "Barback & Bartender",
      organization: "Zefside cocktail bar",
      location: "Copenhagen, Denmark",
      period: "2026",
      current: false,
      summary:
        "Managing tasks in a busy enviroment, coordinating work with others co-workers and ensuring a pleasent experience for the customers. A great learning experience for understanding how to work under pressure",
      bullets: [],
      tags: [
        "Customer-facing roles",
        "Teamwork",
        "Time management",
        "work under pressure",
      ],
      credential: "MSc programme · 120 ECTS",
    },
    {
      id: "promoter",
      type: "work",
      role: "Sales executive & promoter",
      organization: "ELLE Promozioni s.r.l.s.",
      location: "Padua, Italy",
      period: "2023",
      summary:
        "Promotion and sale of RELX products at affiliated tobaconist shops in Padua and its province. I learned how to talk with clients, handle sales and explaing product details in an efficient and clear way.",
      bullets: [],
      tags: [
        "Customer-facing roles",
        "Direct sales",
        "Persuasive communication",
      ],
    },
  ],
};
