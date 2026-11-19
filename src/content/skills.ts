/**
 * src/content/skills.ts
 * -----------------------------------------------------------------------------
 * TECHNICAL STACK & CAPABILITIES.
 *
 * Add, remove or reorder a skill by editing the `items` array below. To create a
 * new capability card, duplicate an object, give it a unique `id` and pick an
 * icon: "code" | "layout" | "server" | "megaphone".
 *
 * This site intentionally avoids percentage bars: categories and proof points
 * tell a recruiter more than an arbitrary "87%".
 */

import type { SkillsContent } from "@/types/portfolio";

export const skillsContent: SkillsContent = {
  intro: {
    index: "02",
    label: "Capabilities",
    heading: "A stack chosen",
    headingAccent: "for the problem.",
    description:
      "Depth where it counts, breadth where it helps: the tools I reach for when a system has to be understandable, secure and genuinely usable.",
  },

  categories: [
    {
      id: "languages",
      index: "01",
      title: "Languages",
      description:
        "Readable, type-safe code — from browser interfaces to data pipelines and systems fundamentals.",
      icon: "code",
      items: [
        "TypeScript",
        "Python",
        "Java",
        "SQL",
        "C#",
        "Rust foundations",
        "Bash",
      ],
      footnote:
        "Comfortable moving between typed frontends, scripting, and low-level reasoning.",
    },
    {
      id: "frontend",
      index: "02",
      title: "Frontend & Data Visualisation",
      description:
        "Interfaces for dense information — fast, accessible and legible under pressure.",
      icon: "layout",
      items: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "Framer Motion",
        "D3.js",
        "Three.js / WebGL",
        "WCAG 2.2",
        "Design systems",
      ],
      footnote:
        "From design tokens to 60 fps data views, with accessibility designed in rather than bolted on.",
    },
    {
      id: "backend",
      index: "03",
      title: "Backend, Desktop & Security",
      description:
        "APIs, data models and the security thinking that keeps them honest.",
      icon: "server",
      items: [
        "Node.js",
        "FastAPI",
        "PostgreSQL",
        "Docker",
        "REST & GraphQL",
        "Git / CI",
        "Linux",
        "OWASP fundamentals",
      ],
      footnote:
        "I like systems that fail loudly in testing and quietly in production.",
    },
    {
      id: "product",
      index: "04",
      title: "Product & Communication",
      description:
        "The connective tissue: research, requirements, documentation and demos that make complexity usable.",
      icon: "megaphone",
      items: [
        "Technical writing",
        "UX research",
        "Information architecture",
        "Prototyping",
        "Workshop facilitation",
        "Stakeholder translation",
        "Italian / English",
      ],
      footnote:
        "A BSc in Communication is not a soft add-on — it is how I keep engineering honest.",
    },
  ],

  toolbeltLabel: "Also in the toolbelt",
  toolbelt: [
    "Figma",
    "Storybook",
    "Playwright",
    "Vitest",
    "GitHub Actions",
    "Vercel",
    "LaTeX",
    "Notion",
    "Adobe Creative Cloud",
  ],
};
