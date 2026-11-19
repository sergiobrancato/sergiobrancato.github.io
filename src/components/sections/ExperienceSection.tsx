/**
 * src/components/sections/ExperienceSection.tsx
 * -----------------------------------------------------------------------------
 * EXPERIENCE & EDUCATION TIMELINE (#experience).
 *
 * A single continuous timeline with type-coloured markers: industry, research
 * and education remain visually distinct. On mobile the date moves inside the
 * card so the line stays readable at 360px.
 *
 * Edit src/content/experience.ts to change roles, dates or bullets.
 */
"use client";

import { MapPin } from "lucide-react";
import { experienceContent } from "@/content/experience";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { cn } from "@/lib/utils";
import type { ExperienceType } from "@/types/portfolio";

const TYPE_STYLES: Record<ExperienceType, { dot: string; badge: string }> = {
  work: {
    dot: "bg-sky-400",
    badge:
      "border-sky-500/25 bg-sky-500/[0.08] text-sky-700 dark:text-sky-300",
  },
  research: {
    dot: "bg-violet-400",
    badge:
      "border-violet-500/25 bg-violet-500/[0.08] text-violet-700 dark:text-violet-300",
  },
  education: {
    dot: "bg-amber-400",
    badge:
      "border-amber-500/25 bg-amber-500/[0.08] text-amber-700 dark:text-amber-300",
  },
};

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative scroll-mt-20 border-t border-line py-24 sm:py-28 lg:py-32"
    >
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            id="experience-heading"
            section={experienceContent.intro}
          />
        </Reveal>

        <div className="relative mt-12 lg:mt-16">
          {/* Timeline spine */}
          <span
            aria-hidden="true"
            className="absolute bottom-3 left-[7px] top-3 w-px bg-gradient-to-b from-line-strong via-line to-transparent md:left-[9.25rem]"
          />

          <ol className="space-y-4">
            {experienceContent.items.map((entry, index) => {
              const styles = TYPE_STYLES[entry.type];

              return (
                <li
                  key={entry.id}
                  className="relative grid grid-cols-1 gap-3 md:grid-cols-[8.5rem_1.5rem_minmax(0,1fr)] md:gap-0"
                >
                  {/* Date column (desktop) */}
                  <div className="hidden pl-0 pr-6 pt-6 text-right md:block">
                    <p className="font-mono text-[0.68rem] leading-relaxed text-ink-soft">
                      {entry.period}
                    </p>
                  </div>

                  {/* Node */}
                  <div className="absolute left-0 top-6 flex w-[15px] justify-center md:static md:flex md:justify-center md:pt-[1.75rem]">
                    <span className="relative flex h-3 w-3 items-center justify-center">
                      {entry.current && (
                        <span
                          className={cn(
                            "absolute inset-0 animate-ping rounded-full opacity-30",
                            styles.dot,
                          )}
                        />
                      )}
                      <span
                        className={cn(
                          "relative h-2.5 w-2.5 rounded-full ring-4 ring-canvas",
                          styles.dot,
                        )}
                      />
                    </span>
                  </div>

                  {/* Card */}
                  <Reveal delay={Math.min(index * 0.05, 0.2)} className="ml-8 md:ml-0">
                    <SpotlightCard className="group rounded-2xl border border-line bg-surface/75 p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong sm:p-6">
                      <div className="relative z-10">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.56rem] uppercase tracking-[0.14em]",
                              styles.badge,
                            )}
                          >
                            <span
                              className={cn("h-1 w-1 rounded-full", styles.dot)}
                            />
                            {experienceContent.typeLabels[entry.type]}
                          </span>

                          {entry.current && (
                            <span className="inline-flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                              </span>
                              {experienceContent.currentLabel}
                            </span>
                          )}

                          <span className="ml-auto font-mono text-[0.56rem] uppercase tracking-[0.12em] text-muted md:hidden">
                            {entry.period}
                          </span>
                        </div>

                        <h3 className="mt-4 text-[1.05rem] font-medium leading-snug tracking-[-0.015em] text-ink sm:text-[1.15rem]">
                          {entry.role}
                        </h3>

                        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.78rem] text-ink-soft">
                          <span>{entry.organization}</span>
                          <span className="hidden h-3 w-px bg-line sm:block" />
                          <span className="inline-flex items-center gap-1 text-muted">
                            <MapPin className="h-3 w-3" strokeWidth={1.6} />
                            {entry.location}
                          </span>
                        </div>

                        <p className="mt-3.5 text-[0.82rem] leading-relaxed text-muted">
                          {entry.summary}
                        </p>

                        <ul className="mt-4 space-y-2">
                          {entry.bullets.map((bullet, bulletIndex) => (
                            <li
                              key={bulletIndex}
                              className="flex items-start gap-2.5 text-[0.79rem] leading-[1.7] text-muted"
                            >
                              <span className="mt-[0.5rem] h-[3px] w-[3px] shrink-0 rounded-full bg-accent/80" />
                              {bullet}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-5 flex flex-wrap items-center gap-1.5">
                          {entry.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-line bg-canvas/50 px-2 py-0.5 font-mono text-[0.58rem] text-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {entry.credential && (
                          <p className="mt-4 border-t border-line pt-3 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-muted/80">
                            {entry.credential}
                          </p>
                        )}
                      </div>
                    </SpotlightCard>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
