/**
 * src/components/ui/ProjectCard.tsx
 * -----------------------------------------------------------------------------
 * A portfolio card with cover art, domain line, tech pills and a tactile hover:
 * lift, image scale, accent glow and a cursor-tracked spotlight.
 *
 * The whole card is clickable through an accessible full-surface <button>; the
 * button opens the case-study modal supplied by PortfolioSection.
 *
 * Content comes from src/content/projects.ts — no edits needed here.
 */
"use client";

import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { assetPath } from "@/lib/assets";
import { ACCENT_HEX } from "@/lib/accents";
import { portfolioContent } from "@/content/projects";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import type { Project } from "@/types/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: () => void;
}

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const accent = ACCENT_HEX[project.accent];
  const categoryLabel =
    portfolioContent.categories.find(
      (category) => category.id === project.categories[0],
    )?.label ?? "";
  const extraTech = project.tech.length - 3;

  return (
    <SpotlightCard
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/80 shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1.5 hover:border-line-strong hover:shadow-[0_34px_90px_-52px_var(--project-accent)]"
      // CSS variable consumed by the hover glow and detail dots.
      style={{ "--project-accent": accent } as CSSProperties}
    >
      {/* Full-surface accessible trigger */}
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${project.title} case study`}
        className="absolute inset-0 z-20 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
      />

      {/* Accent hairline */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-30 h-px origin-left scale-x-0 bg-[linear-gradient(90deg,transparent,var(--project-accent),transparent)] transition-transform duration-500 group-hover:scale-x-100"
      />

      {/* Cover */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#06070a]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assetPath(project.cover.src)}
          alt={project.cover.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/25 transition-opacity duration-500 group-hover:from-black/50"
        />

        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <span className="rounded-full border border-white/15 bg-black/35 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-white/80 backdrop-blur-md">
            {project.year}
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white/85 backdrop-blur-md transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/15">
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.7} />
          </span>
        </div>

        <div className="absolute inset-x-4 bottom-3 flex items-end justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-white/75">
            <span
              className="h-1 w-1 rounded-full"
              style={{ background: accent }}
            />
            {categoryLabel} · {portfolioContent.caseStudyLabel}
          </span>
          <span className="font-mono text-[0.55rem] text-white/55">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="relative flex flex-1 flex-col p-5">
        <p className="font-mono text-[0.56rem] uppercase leading-relaxed tracking-[0.17em] text-muted">
          {project.subtitle}
        </p>
        <h3 className="mt-2 font-display text-[1.3rem] font-medium tracking-[-0.025em] text-ink">
          {project.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[0.79rem] leading-relaxed text-muted">
          {project.summary}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-5">
          {project.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-line bg-canvas/50 px-2 py-0.5 font-mono text-[0.58rem] text-ink-soft"
            >
              {tech}
            </span>
          ))}
          {extraTech > 0 && (
            <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[0.58rem] text-muted">
              +{extraTech}
            </span>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}
