/**
 * src/components/sections/PortfolioSection.tsx
 * -----------------------------------------------------------------------------
 * INTERACTIVE PORTFOLIO (#portfolio).
 *
 * • The filter bar is generated from portfolioContent.categories, so adding a
 *   new category in src/content/projects.ts is enough to extend it.
 * • Active filter indicator glides with Framer Motion layoutId.
 * • Cards animate in/out with a snappy popLayout transition.
 * • Selecting a card mounts the case-study modal with focus management.
 */
"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { portfolioContent } from "@/content/projects";
import { EASE } from "@/lib/motion";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Project, ProjectCategory } from "@/types/portfolio";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectCategory;

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const reduceMotion = useReducedMotion();

  const filters = useMemo(
    () => [
      { id: "all" as const, label: portfolioContent.allLabel },
      ...portfolioContent.categories,
    ],
    [],
  );

  const filteredProjects = useMemo(
    () =>
      activeFilter === "all"
        ? portfolioContent.projects
        : portfolioContent.projects.filter((project) =>
            project.categories.includes(activeFilter),
          ),
    [activeFilter],
  );

  const countFor = (filter: Filter) =>
    filter === "all"
      ? portfolioContent.projects.length
      : portfolioContent.projects.filter((project) =>
          project.categories.includes(filter),
        ).length;

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="relative scroll-mt-20 border-t border-line py-24 sm:py-28 lg:py-32"
    >
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            id="portfolio-heading"
            section={portfolioContent.intro}
          />
        </Reveal>

        {/* Filter bar -------------------------------------------------- */}
        <Reveal delay={0.08}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:mt-12">
            <div
              role="group"
              aria-label="Filter projects by discipline"
              className="flex w-fit max-w-full flex-wrap gap-1 rounded-2xl border border-line bg-surface/55 p-1.5 backdrop-blur-xl sm:rounded-full"
            >
              {filters.map((filter) => {
                const isActive = activeFilter === filter.id;
                const count = countFor(filter.id);

                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveFilter(filter.id)}
                    aria-pressed={isActive}
                    className={cn(
                      "relative flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.72rem] font-medium transition-colors duration-200",
                      isActive
                        ? "text-canvas"
                        : "text-muted hover:text-ink",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="portfolio-filter-pill"
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 32 }
                        }
                        className="absolute inset-0 rounded-full bg-ink shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]"
                      />
                    )}
                    <span className="relative z-10 whitespace-nowrap">
                      {filter.label}
                    </span>
                    <span
                      className={cn(
                        "relative z-10 font-mono text-[0.55rem]",
                        isActive ? "text-canvas/60" : "text-muted/60",
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
              Showing {filteredProjects.length} of{" "}
              {portfolioContent.projects.length} projects
            </p>
          </div>
        </Reveal>

        {/* Grid --------------------------------------------------------- */}
        <motion.div
          layout
          className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.36,
                  ease: EASE,
                  layout: reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 320, damping: 32 },
                }}
                className="h-full"
              >
                <ProjectCard
                  project={project}
                  index={index}
                  onOpen={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="mt-7 rounded-2xl border border-dashed border-line py-16 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              No projects in this category yet
            </p>
          </div>
        )}
      </div>

      {/* Modal --------------------------------------------------------- */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
