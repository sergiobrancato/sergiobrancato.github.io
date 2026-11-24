/**
 * src/components/ui/ProjectModal.tsx
 * -----------------------------------------------------------------------------
 * THE CASE-STUDY MODAL.
 *
 * Features
 *   • Centered modal ⇄ full-screen view (animated with Framer Motion layout).
 *   • Image carousel with thumbnail strip and a click-to-zoom lightbox.
 *   • Structured case study: overview, challenge, architecture, features,
 *     impact and action links.
 *   • Closes on Esc, backdrop click or the close button; locks page scroll;
 *     traps focus and restores it on close.
 *
 * All content comes from the selected Project object in src/content/projects.ts.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Github,
  Maximize2,
  Minimize2,
  X,
  ZoomIn,
  type LucideIcon,
} from "lucide-react";
import { assetPath } from "@/lib/assets";
import { ACCENT_HEX } from "@/lib/accents";
import { EASE } from "@/lib/motion";
import { portfolioContent } from "@/content/projects";
import type { LinkIcon, Project } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const LINK_ICONS: Record<LinkIcon, LucideIcon> = {
  github: Github,
  external: ExternalLink,
  docs: FileText,
  mail: ExternalLink,
  cv: FileText,
  linkedin: ExternalLink,
  phone: ExternalLink,
};

/* -------------------------------------------------------------------------- */
/*  Small internal building blocks                                            */
/* -------------------------------------------------------------------------- */

function CaseBlock({
  index,
  title,
  children,
  className,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("border-t border-line pt-6", className)}>
      <div className="flex items-center gap-3">
        <span className="font-mono text-[0.6rem] tracking-[0.2em] text-accent">
          {index}
        </span>
        <h3 className="font-display text-[1.02rem] font-medium tracking-[-0.015em] text-ink">
          {title}
        </h3>
        <span className="h-px flex-1 bg-line" />
      </div>
      <div className="mt-3.5">{children}</div>
    </section>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((text, index) => (
        <p key={index} className="text-[0.84rem] leading-[1.75] text-ink-soft">
          {text}
        </p>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main modal                                                                */
/* -------------------------------------------------------------------------- */

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const gallery = project.gallery;
  const activeImage = gallery[activeIndex] ?? gallery[0];
  const accent = ACCENT_HEX[project.accent];

  const showPrevious = () =>
    setActiveIndex(
      (current) => (current - 1 + gallery.length) % gallery.length,
    );
  const showNext = () =>
    setActiveIndex((current) => (current + 1) % gallery.length);

  /* Lock page scroll, remember focus, restore everything on close. -------- */
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    html.classList.add("modal-open");
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusTimer = window.setTimeout(
      () => closeButtonRef.current?.focus(),
      60,
    );

    return () => {
      window.clearTimeout(focusTimer);
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.paddingRight = previousPadding;
      html.classList.remove("modal-open");
      previousFocus?.focus?.();
    };
  }, []);

  /* Focus the lightbox close button when zoom opens. ---------------------- */
  useEffect(() => {
    if (!lightboxOpen) return;
    const timer = window.setTimeout(
      () => lightboxCloseRef.current?.focus(),
      40,
    );
    return () => window.clearTimeout(timer);
  }, [lightboxOpen]);

  /* Keyboard: Esc, arrows, and a simple focus trap. ----------------------- */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        if (lightboxOpen) setLightboxOpen(false);
        else onClose();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
        return;
      }

      if (event.key !== "Tab") return;

      const scope = lightboxOpen ? lightboxRef.current : panelRef.current;
      if (!scope) return;

      const focusables = Array.from(
        scope.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getClientRects().length > 0);

      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (!scope.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, onClose, gallery.length]);

  const categoryLabels = project.categories.map(
    (id) =>
      portfolioContent.categories.find((category) => category.id === id)
        ?.label ?? id,
  );

  // Render above the fixed site navigation, regardless of section stacking.
  // This only executes on the client, after a project has been selected.
  if (typeof document === "undefined") return null;

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-0 sm:p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.25 }}
    >
      {/* Backdrop — click closes. Esc and the close button are the accessible path. */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/65 backdrop-blur-md dark:bg-black/80"
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        layout
        initial={
          reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.985 }
        }
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={
          reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.985 }
        }
        transition={{
          duration: reduceMotion ? 0 : 0.35,
          ease: EASE,
          layout: reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 300, damping: 34 },
        }}
        className={cn(
          "relative flex w-full flex-col overflow-hidden border border-line bg-canvas shadow-[0_60px_160px_-40px_rgba(0,0,0,0.85)]",
          isFullscreen
            ? "h-[100dvh] max-w-none rounded-none border-0 sm:p-0"
            : "h-[min(92dvh,60rem)] max-w-5xl rounded-2xl",
          "max-sm:h-[100dvh] max-sm:max-w-none max-sm:rounded-none max-sm:border-0",
        )}
      >
        {/* Header ------------------------------------------------------- */}
        <header className="relative z-20 flex shrink-0 items-center justify-between gap-4 border-b border-line bg-canvas/95 px-4 py-3.5 backdrop-blur-xl sm:px-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: accent }}
              />
              <p className="truncate font-mono text-[0.56rem] uppercase tracking-[0.18em] text-muted">
                {project.subtitle}
              </p>
            </div>
            <h2
              id="project-modal-title"
              className="mt-0.5 truncate font-display text-[1.1rem] font-medium tracking-[-0.02em] text-ink"
            >
              {project.title}
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsFullscreen((current) => !current)}
              aria-label={
                isFullscreen ? "Exit full-screen view" : "Expand to full screen"
              }
              title={isFullscreen ? "Exit full screen" : "Full screen"}
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-ink sm:flex"
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" strokeWidth={1.6} />
              ) : (
                <Maximize2 className="h-4 w-4" strokeWidth={1.6} />
              )}
            </button>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:bg-surface hover:text-ink"
            >
              <X className="h-4 w-4" strokeWidth={1.7} />
            </button>
          </div>
        </header>

        {/* Scrollable body ---------------------------------------------- */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div
            className={cn(
              "mx-auto w-full p-4 sm:p-6 lg:p-8",
              isFullscreen ? "max-w-[86rem]" : "max-w-5xl",
            )}
          >
            {/* Gallery -------------------------------------------------- */}
            <div className="relative overflow-hidden rounded-xl border border-line bg-[#06070a]">
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label="Open image in full-screen lightbox"
                className="group relative block w-full cursor-zoom-in"
              >
                <div className="relative aspect-[16/10] w-full">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.img
                      key={activeImage.src}
                      src={assetPath(activeImage.src)}
                      alt={activeImage.alt}
                      initial={{ opacity: 0, scale: 1.015 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.3,
                        ease: EASE,
                      }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </AnimatePresence>
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
                  />
                </div>
              </button>

              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPrevious}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/85 backdrop-blur-md transition-colors hover:bg-black/60 hover:text-white"
                  >
                    <ChevronLeft className="h-4 w-4" strokeWidth={1.8} />
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/85 backdrop-blur-md transition-colors hover:bg-black/60 hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
                  </button>
                </>
              )}

              <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 flex items-center justify-between">
                <span className="pointer-events-auto rounded-full border border-white/15 bg-black/45 px-2.5 py-1 font-mono text-[0.55rem] tracking-[0.16em] text-white/80 backdrop-blur-md">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(gallery.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  aria-label="Zoom image"
                  className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white/80 backdrop-blur-md transition-colors hover:bg-black/65 hover:text-white"
                >
                  <ZoomIn className="h-3 w-3" strokeWidth={1.8} />
                  Zoom
                </button>
              </div>
            </div>

            <div className="mt-2.5 flex items-start justify-between gap-4">
              <p className="min-h-[1.2rem] text-[0.7rem] leading-relaxed text-muted">
                {activeImage.caption ?? activeImage.alt}
              </p>
              <span className="hidden shrink-0 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-muted/70 sm:block">
                {project.year} · {project.timeframe}
              </span>
            </div>

            {/* Thumbnails ----------------------------------------------- */}
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {gallery.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View image ${index + 1}: ${image.alt}`}
                  aria-current={index === activeIndex}
                  className={cn(
                    "relative aspect-[16/10] w-20 shrink-0 overflow-hidden rounded-md border transition-all duration-200 sm:w-24",
                    index === activeIndex
                      ? "border-ink opacity-100 ring-1 ring-ink/20"
                      : "border-line opacity-55 hover:opacity-100",
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={assetPath(image.src)}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Summary + metadata --------------------------------------- */}
            <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start">
              <div>
                <div className="flex flex-wrap gap-1.5">
                  {categoryLabels.map((label) => (
                    <span
                      key={label}
                      className="rounded-full border border-line bg-surface/70 px-2.5 py-1 font-mono text-[0.58rem] text-ink-soft"
                    >
                      {label}
                    </span>
                  ))}
                </div>
                <p className="mt-3 max-w-2xl text-[0.9rem] leading-relaxed text-ink-soft">
                  {project.summary}
                </p>
              </div>
            </div>

            {/* Case study ------------------------------------------------ */}
            <div className="mt-8 space-y-7">
              <div className="grid gap-7 lg:grid-cols-2">
                <CaseBlock
                  index="01"
                  title={portfolioContent.modalLabels.overview}
                >
                  <Paragraphs items={project.caseStudy.overview} />
                </CaseBlock>

                <CaseBlock
                  index="02"
                  title={portfolioContent.modalLabels.challenge}
                >
                  <Paragraphs items={project.caseStudy.challenge} />
                </CaseBlock>
              </div>

              {(project.caseStudy.architecture.summary.trim().length > 0 ||
                project.caseStudy.architecture.layers.length > 0 ||
                project.tech.length > 0) && (
                <CaseBlock
                  index="03"
                  title={
                    portfolioContent.modalLabels.architecture ?? "Architecture"
                  }
                >
                  {project.caseStudy.architecture.summary.trim().length > 0 && (
                    <p className="max-w-3xl text-[0.84rem] leading-[1.75] text-ink-soft">
                      {project.caseStudy.architecture.summary}
                    </p>
                  )}

                  {project.caseStudy.architecture.layers.length > 0 && (
                    <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {project.caseStudy.architecture.layers.map((layer) => (
                        <div
                          key={layer.label}
                          className="rounded-lg border border-line bg-surface/50 p-3.5"
                        >
                          <p className="font-mono text-[0.54rem] uppercase tracking-[0.16em] text-ink">
                            {layer.label}
                          </p>
                          <p className="mt-1.5 text-[0.74rem] leading-relaxed text-muted">
                            {layer.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {project.tech.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-line bg-canvas/60 px-2.5 py-1 font-mono text-[0.62rem] text-ink-soft"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </CaseBlock>
              )}

              {(project.caseStudy.features.length > 0 ||
                project.caseStudy.impact.length > 0) && (
                <CaseBlock
                  index="04"
                  title={portfolioContent.modalLabels.features ?? "Features"}
                >
                  {project.caseStudy.features.length > 0 && (
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {project.caseStudy.features.map((feature, index) => (
                        <div
                          key={feature.title}
                          className="rounded-lg border border-line bg-surface/50 p-4"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[0.52rem] text-accent">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <p className="text-[0.8rem] font-medium text-ink">
                              {feature.title}
                            </p>
                          </div>
                          <p className="mt-1.5 text-[0.73rem] leading-relaxed text-muted">
                            {feature.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {project.caseStudy.impact.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-2.5">
                      {project.caseStudy.impact.map((metric) => (
                        <div
                          key={metric.label}
                          className="rounded-lg border border-line bg-canvas/50 px-3 py-3.5"
                        >
                          <p className="font-display text-lg font-medium tracking-[-0.03em] text-ink">
                            {metric.value}
                          </p>
                          <p className="mt-1 text-[0.6rem] leading-snug text-muted">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CaseBlock>
              )}

              <CaseBlock
                index="05"
                title={portfolioContent.modalLabels.actionLinks}
              >
                <div className="flex flex-wrap gap-2">
                  {project.links.map((link, index) => {
                    const Icon = LINK_ICONS[link.icon];
                    const isExternal = link.href.startsWith("http");

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noreferrer noopener" : undefined}
                        className={cn(
                          "group inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[0.75rem] font-medium transition-all duration-200",
                          index === 0
                            ? "border-transparent bg-ink text-canvas hover:-translate-y-0.5"
                            : "border-line bg-surface/60 text-ink hover:-translate-y-0.5 hover:border-line-strong",
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.7} />
                        {link.label}
                        <ExternalLink
                          className="h-3 w-3 opacity-40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          strokeWidth={1.7}
                        />
                      </a>
                    );
                  })}
                </div>
              </CaseBlock>
            </div>

            <p className="mt-8 border-t border-line pt-4 text-center font-mono text-[0.52rem] uppercase tracking-[0.18em] text-muted/60">
              {portfolioContent.caseStudyLabel} · {project.title} ·{" "}
              {project.year}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Lightbox ------------------------------------------------------ */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            ref={lightboxRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} image viewer`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
            className="fixed inset-0 z-[95] flex flex-col bg-black/95 backdrop-blur-xl"
          >
            <div className="flex shrink-0 items-center justify-between px-4 py-3.5 text-white/70 sm:px-6">
              <span className="font-mono text-[0.62rem] tracking-[0.16em]">
                {project.title} · {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(gallery.length).padStart(2, "0")}
              </span>
              <button
                ref={lightboxCloseRef}
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close image viewer"
                className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-[0.68rem] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                Close
                <X className="h-3.5 w-3.5" strokeWidth={1.8} />
              </button>
            </div>

            <div
              className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-4 sm:px-16"
              onClick={() => setLightboxOpen(false)}
            >
              <motion.img
                key={activeImage.src}
                src={assetPath(activeImage.src)}
                alt={activeImage.alt}
                onClick={(event) => event.stopPropagation()}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
                className="max-h-full max-w-full cursor-default object-contain shadow-2xl"
              />

              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      showPrevious();
                    }}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/85 backdrop-blur transition-colors hover:bg-white/15 hover:text-white sm:left-5"
                  >
                    <ChevronLeft className="h-5 w-5" strokeWidth={1.7} />
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      showNext();
                    }}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/85 backdrop-blur transition-colors hover:bg-white/15 hover:text-white sm:right-5"
                  >
                    <ChevronRight className="h-5 w-5" strokeWidth={1.7} />
                  </button>
                </>
              )}
            </div>

            <p className="shrink-0 px-4 pb-5 text-center text-[0.7rem] text-white/55 sm:px-16">
              {activeImage.caption ?? activeImage.alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>,
    document.body,
  );
}
