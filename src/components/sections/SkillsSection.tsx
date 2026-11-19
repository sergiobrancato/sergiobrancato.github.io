/**
 * src/components/sections/SkillsSection.tsx
 * -----------------------------------------------------------------------------
 * TECHNICAL STACK & CAPABILITIES (#skills).
 *
 * Four scannable capability cards — no percentage bars. Each card has an icon,
 * a short rationale, technology pills and one proof-point footnote. The toolbelt
 * strip closes the section with supporting tools.
 *
 * Edit src/content/skills.ts to change anything here.
 */
"use client";

import {
  Braces,
  Megaphone,
  PanelsTopLeft,
  ServerCog,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { skillsContent } from "@/content/skills";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import type { SkillIcon } from "@/types/portfolio";

const SKILL_ICONS: Record<SkillIcon, LucideIcon> = {
  code: Braces,
  layout: PanelsTopLeft,
  server: ServerCog,
  megaphone: Megaphone,
};

export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative scroll-mt-20 border-t border-line py-24 sm:py-28 lg:py-32"
    >
      <div className="section-shell">
        <Reveal>
          <SectionHeading id="skills-heading" section={skillsContent.intro} />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16">
          {skillsContent.categories.map((category, index) => {
            const Icon = SKILL_ICONS[category.icon];

            return (
              <Reveal key={category.id} delay={0.05 * index}>
                <SpotlightCard className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/75 p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-line-strong sm:p-8">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent-pink/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  <div className="relative z-10 flex flex-col">
                    <div className="flex items-start justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-canvas/60 text-ink-soft transition-all duration-300 group-hover:border-accent/25 group-hover:text-accent">
                        <Icon className="h-5 w-5" strokeWidth={1.55} />
                      </span>
                      <span className="font-mono text-[0.58rem] tracking-[0.22em] text-muted/60">
                        {category.index} / 04
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-medium tracking-[-0.02em] text-ink sm:text-[1.35rem]">
                      {category.title}
                    </h3>
                    <p className="mt-2.5 max-w-md text-[0.85rem] leading-relaxed text-muted">
                      {category.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {category.items.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center rounded-full border border-line bg-canvas/40 px-2.5 py-1 font-mono text-[0.66rem] leading-none text-ink-soft transition-colors duration-200 hover:border-line-strong hover:text-ink"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <p className="mt-6 flex items-start gap-2 border-t border-line pt-4 text-[0.72rem] leading-relaxed text-muted">
                      <span className="mt-[0.35rem] h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                      {category.footnote}
                    </p>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>

        {/* Toolbelt ------------------------------------------------------ */}
        <Reveal delay={0.1}>
          <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-line bg-surface/40 px-6 py-5 backdrop-blur-xl sm:flex-row sm:items-center sm:gap-8">
            <span className="mono-label flex shrink-0 items-center gap-2 text-[0.6rem]">
              <Wrench className="h-3.5 w-3.5" strokeWidth={1.6} />
              {skillsContent.toolbeltLabel}
            </span>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {skillsContent.toolbelt.map((tool) => (
                <span
                  key={tool}
                  className="font-mono text-[0.7rem] tracking-[0.01em] text-ink-soft"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
