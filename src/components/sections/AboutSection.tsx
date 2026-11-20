/**
 * src/components/sections/AboutSection.tsx
 * -----------------------------------------------------------------------------
 * ABOUT & RECRUITER SNAPSHOT (#about).
 *
 * Layout: narrative + identity plate, followed by the four-fact bento grid and
 * a compact "currently seeking" strip. All text comes from profile.about,
 * profile.quickFacts and profile.targetSectors.
 */
"use client";

import {
  Crosshair,
  Globe2,
  GraduationCap,
  Languages,
  Radar,
  type LucideIcon,
} from "lucide-react";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import type { FactIcon } from "@/types/portfolio";

const FACT_ICONS: Record<FactIcon, LucideIcon> = {
  graduation: GraduationCap,
  globe: Globe2,
  languages: Languages,
  target: Crosshair,
};

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative scroll-mt-20 border-t border-line py-24 sm:py-28 lg:py-32"
    >
      <div className="section-shell">
        <Reveal>
          <SectionHeading id="about-heading" section={profile.about} />
        </Reveal>

        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-12">
          {/* Narrative ---------------------------------------------------- */}
          <Reveal className="lg:col-span-7" delay={0.05}>
            <SpotlightCard className="h-full rounded-2xl border border-line bg-surface/80 p-7 shadow-[var(--shadow-card)] sm:p-9 lg:p-10">
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span className="mono-label">Profile / 01</span>
                  <span className="h-px w-16 bg-gradient-to-r from-line-strong to-transparent" />
                </div>

                <div className="mt-6 space-y-5 text-[0.925rem] leading-[1.78] text-ink-soft">
                  {profile.about.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className={
                        index === 0
                          ? "text-[1.02rem] leading-[1.72] text-ink sm:text-[1.075rem]"
                          : undefined
                      }
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <figure className="mt-8 border-l border-line-strong pl-5">
                  <blockquote className="font-serif text-[1.55rem] italic leading-snug tracking-[-0.01em] text-ink sm:text-[1.8rem]">
                    “{profile.about.quote}”
                  </blockquote>
                  <figcaption className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-muted">
                    {profile.about.quoteAttribution}
                  </figcaption>
                </figure>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Identity plate ----------------------------------------------- */}
          <Reveal className="lg:col-span-5" delay={0.12}>
            <div className="relative h-full min-h-[23rem] overflow-hidden rounded-2xl border border-white/10 bg-[#08080b] p-6 text-white shadow-lift sm:p-7">
              {/* Atmosphere */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-dot-grid opacity-[0.22] [background-image:radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)]"
              />
              <div
                aria-hidden="true"
                className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-[80px]"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-pink-500/20 blur-[80px]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />

              <div className="relative flex items-center justify-between">
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.24em] text-white/50">
                  Identity
                </span>
              </div>

              {/* Orbital monogram */}
              <div className="relative mx-auto mt-8 h-[13.5rem] w-[13.5rem] sm:mt-10">
                <div className="absolute inset-0 animate-spin-slow">
                  <div className="absolute inset-0 rounded-full border border-dashed border-white/20" />
                  <div className="absolute inset-[14%] rounded-full border border-white/[0.08]" />
                  <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_14px_3px_rgba(103,232,249,0.5)]" />
                  <span className="absolute bottom-[14%] right-[14%] h-1 w-1 rounded-full bg-pink-400" />
                </div>
                <div className="absolute inset-[24%] flex items-center justify-center rounded-full border border-white/10 bg-white/[0.035] backdrop-blur-sm">
                  <span className="font-display text-[3.2rem] font-semibold leading-none tracking-[-0.06em] text-white">
                    {profile.name.initials}
                  </span>
                </div>
                <span className="absolute inset-x-0 -top-1 text-center font-mono text-[0.45rem] uppercase tracking-[0.34em] text-white">
                  Marketing
                </span>

                <span className="absolute -left-1 top-1/2 -translate-y-1/2 -rotate-90 font-mono text-[0.45rem] uppercase tracking-[0.34em] text-white">
                  Software
                </span>
                <span className="absolute -right-2 top-1/2 -translate-y-1/2 rotate-90 font-mono text-[0.45rem] uppercase tracking-[0.34em] text-white">
                  Systems
                </span>
                <span className="absolute inset-x-0 -bottom-1 text-center font-mono text-[0.45rem] uppercase tracking-[0.34em] text-white">
                  Design
                </span>
              </div>

              <div className="relative mt-9 border-t border-white/10 pt-5">
                <p className="font-display text-lg font-medium tracking-tight">
                  {profile.name.full}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[0.55rem] text-white/70">
                    MSc Software Design
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[0.55rem] text-white/70">
                    BSc Communication
                  </span>
                </div>

                <p className="mt-4 text-[0.72rem] leading-relaxed text-white/45">
                  {profile.about.currentFocus}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Quick facts bento -------------------------------------------- */}
          {profile.quickFacts.map((fact, index) => {
            const Icon = FACT_ICONS[fact.icon];

            return (
              <Reveal
                key={fact.id}
                className="sm:col-span-1 xl:col-span-3 lg:col-span-6"
                delay={0.06 * index}
              >
                <SpotlightCard className="group h-full rounded-2xl border border-line bg-surface/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[var(--shadow-card)] sm:p-6">
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-start justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-canvas/60 text-ink-soft transition-colors duration-300 group-hover:text-accent">
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                      </span>
                      <span className="font-mono text-[0.55rem] tracking-[0.2em] text-muted/60">
                        0{index + 1}
                      </span>
                    </div>

                    <p className="mt-6 mono-label text-[0.6rem]">
                      {fact.label}
                    </p>
                    <p className="mt-2 font-display text-[1.05rem] font-medium leading-snug tracking-[-0.01em] text-ink">
                      {fact.value}
                    </p>
                    <p className="mt-2 text-[0.78rem] leading-relaxed text-muted">
                      {fact.detail}
                    </p>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}

          {/* Seeking strip ------------------------------------------------ 
          <Reveal className="lg:col-span-12" delay={0.1}>
            <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface/50 px-5 py-5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-start gap-4">
                <span className="relative mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-canvas/60 text-accent">
                  <Radar className="h-4 w-4" strokeWidth={1.6} />
                  <span className="absolute inset-0 animate-ping rounded-full border border-accent/20 opacity-30 [animation-duration:3.5s]" />
                </span>
                <div>
                  <p className="mono-label text-[0.58rem]">
                    {profile.about.currentlyLabel}
                  </p>
                  <p className="mt-1 text-[0.82rem] text-ink-soft">
                    {profile.availability.detail}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {profile.targetSectors.map((sector) => (
                  <span key={sector} className="chip">
                    {sector}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>*/}
        </div>
      </div>
    </section>
  );
}
