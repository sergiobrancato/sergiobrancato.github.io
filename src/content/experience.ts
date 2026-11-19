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
    description:
      "Research, product work and a communication foundation — building toward technology that carries real consequence.",
  },

  typeLabels: {
    work: "Industry",
    research: "Research",
    education: "Education",
  },

  currentLabel: "Current",

  items: [
    {
      id: "research-assistant",
      type: "research",
      role: "Research Assistant — Human-Centred Computing",
      organization: "IT University of Copenhagen",
      location: "Copenhagen, Denmark",
      period: "2026 — Present",
      current: true,
      summary:
        "Designing and evaluating decision-support prototypes for complex, time-sensitive work.",
      bullets: [
        "Built and moderated usability studies, turning qualitative findings into prioritised design and engineering changes.",
        "Prototyped data-dense interfaces in React and D3 to make multi-variable scenarios easier to reason about under time pressure.",
        "Wrote study protocols, consent materials and a reproducible analysis trail for a mixed-methods research team.",
      ],
      tags: ["React", "D3.js", "Mixed methods", "Research operations"],
      credential: "Faculty of Digital Design · Part-time",
    },
    {
      id: "independent-practice",
      type: "work",
      role: "Independent Software & Communication Practice",
      organization: "Freelance",
      location: "Copenhagen / Remote",
      period: "2024 — Present",
      current: true,
      summary:
        "Partnering with small teams to ship clear, maintainable digital products end to end.",
      bullets: [
        "Designed and shipped accessible Next.js sites and internal tools for research and culture-sector clients.",
        "Translated domain-heavy requirements into product specs, component libraries and documentation non-specialists can follow.",
        "Set up CI, analytics and content workflows so teams can maintain their own products after handover.",
      ],
      tags: ["Next.js", "TypeScript", "Content design", "CI/CD"],
    },
    {
      id: "msc-software-design",
      type: "education",
      role: "MSc in Software Design",
      organization: "IT University of Copenhagen",
      location: "Copenhagen, Denmark",
      period: "2025 — 2027 (expected)",
      current: true,
      summary:
        "A research-led programme at the intersection of software architecture, interaction design and applied computer science.",
      bullets: [
        "Coursework across software architecture, distributed systems, human–computer interaction and applied algorithms.",
        "Studio projects spanning security engineering, data visualisation and product design.",
        "Developing a thesis direction around decision support for high-consequence systems.",
      ],
      tags: [
        "Software architecture",
        "Distributed systems",
        "HCI",
        "Security",
      ],
      credential: "MSc programme · 120 ECTS",
    },
    {
      id: "product-communication-intern",
      type: "work",
      role: "Digital Product & Communications Intern",
      organization: "Technology consultancy",
      location: "Milan, Italy",
      period: "2023 — 2024",
      summary:
        "Connected user research and engineering delivery on a multilingual B2B platform.",
      bullets: [
        "Supported product discovery by mapping user journeys and converting interview notes into validated requirements.",
        "Produced release notes, interface copy and onboarding material for a multilingual product team.",
        "Built a lightweight analytics dashboard used in weekly product reviews.",
      ],
      tags: ["UX research", "Information architecture", "Technical writing"],
    },
    {
      id: "bsc-communication",
      type: "education",
      role: "BSc in Communication",
      organization: "University of Milan",
      location: "Milan, Italy",
      period: "2021 — 2024",
      summary:
        "The foundation for how I think about audiences, argument, media and meaning.",
      bullets: [
        "Studied communication theory, rhetoric, media systems and qualitative research methods.",
        "Focused on how technical and scientific ideas travel between experts, institutions and the public.",
        "Built the writing and research habits that now underpin my technical documentation.",
      ],
      tags: [
        "Communication theory",
        "Qualitative research",
        "Technical writing",
      ],
    },
  ],
};
