/**
 * src/components/layout/LeftNavRail.tsx
 * -----------------------------------------------------------------------------
 * SIGNATURE NAVIGATION.
 *
 * Desktop: a frosted vertical rail fixed to the left edge. The active section is
 *   tracked with IntersectionObserver (src/lib/useScrollSpy.ts) and marked by a
 *   single glowing pill that glides between icons via Framer Motion layoutId.
 * Mobile: the same six destinations become a floating bottom glass dock.
 *
 * To change icons or labels, edit `navItems` in src/content/profile.ts and the
 * icon map below. Nothing else needs to change.
 */
"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  FolderGit2,
  Home,
  Layers,
  Mail,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { navItems, profile } from "@/content/profile";
import { useScrollSpy } from "@/lib/useScrollSpy";
import type { NavIcon } from "@/types/portfolio";
import { cn } from "@/lib/utils";

const ICONS: Record<NavIcon, LucideIcon> = {
  home: Home,
  user: UserRound,
  layers: Layers,
  briefcase: Briefcase,
  folder: FolderGit2,
  mail: Mail,
};

const SPRING = { type: "spring", stiffness: 420, damping: 34 } as const;

export function LeftNavRail() {
  const activeId = useScrollSpy(navItems.map((item) => item.id));
  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/*  Monogram — top-left brand anchor                                  */}
      {/* ------------------------------------------------------------------ */}
      <a
        href="#home"
        aria-label={`${profile.name.full} — back to top`}
        className="group fixed left-5 top-6 z-50 hidden h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface/60 shadow-sm backdrop-blur-xl transition-colors hover:border-line-strong lg:flex"
      >
        <span className="font-display text-[0.95rem] font-semibold tracking-tight text-ink">
          {profile.name.initials}
        </span>
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-2 border-canvas bg-emerald-400" />
      </a>

      {/* ------------------------------------------------------------------ */}
      {/*  Desktop rail                                                      */}
      {/* ------------------------------------------------------------------ */}
      <nav
        aria-label="Section navigation"
        className="site-nav fixed left-5 top-1/2 z-50 hidden -translate-y-1/2 lg:block"
      >
        <div className="flex flex-col items-center gap-0.5 rounded-full border border-line bg-surface/45 p-1.5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          {navItems.map((item, index) => {
            const Icon = ICONS[item.icon];
            const isActive = activeId === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-label={item.label}
                aria-current={isActive ? "location" : undefined}
                className="group relative flex h-10 w-10 items-center justify-center rounded-full"
              >
                {isActive && (
                  <motion.span
                    layoutId="rail-active"
                    transition={reduceMotion ? { duration: 0 } : SPRING}
                    className="absolute inset-0 rounded-full border border-line bg-ink/[0.055] shadow-[0_0_22px_-8px_var(--accent)] dark:bg-white/[0.09]"
                  >
                    <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 translate-y-3 rounded-full bg-accent" />
                  </motion.span>
                )}

                <Icon
                  className={cn(
                    "relative h-[18px] w-[18px] transition-colors duration-200",
                    isActive
                      ? "text-ink"
                      : "text-muted group-hover:text-ink-soft",
                  )}
                  strokeWidth={1.7}
                />

                {/* Tooltip */}
                <span
                  role="tooltip"
                  className="pointer-events-none absolute left-full z-10 ml-4 flex -translate-x-1 items-center gap-2 whitespace-nowrap rounded-lg border border-line bg-surface-strong/95 px-2.5 py-1.5 text-[0.7rem] font-medium text-ink opacity-0 shadow-lift backdrop-blur-xl transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                >
                  <span className="font-mono text-[0.6rem] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>

        <div className="mt-3 flex justify-center">
          <span className="h-10 w-px bg-gradient-to-b from-line-strong to-transparent" />
        </div>
      </nav>

      {/* ------------------------------------------------------------------ */}
      {/*  Mobile dock                                                       */}
      {/* ------------------------------------------------------------------ */}
      <nav
        aria-label="Section navigation"
        className="site-nav fixed bottom-[max(0.9rem,env(safe-area-inset-bottom))] left-1/2 z-50 w-auto -translate-x-1/2 lg:hidden"
      >
        <div className="flex items-center gap-0.5 rounded-2xl border border-line bg-surface/75 p-1.5 shadow-[0_20px_50px_-18px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
          {navItems.map((item) => {
            const Icon = ICONS[item.icon];
            const isActive = activeId === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-label={item.label}
                aria-current={isActive ? "location" : undefined}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl"
              >
                {isActive && (
                  <motion.span
                    layoutId="dock-active"
                    transition={reduceMotion ? { duration: 0 } : SPRING}
                    className="absolute inset-0 rounded-xl border border-line bg-ink/[0.055] dark:bg-white/[0.09]"
                  />
                )}
                <Icon
                  className={cn(
                    "relative h-[18px] w-[18px] transition-colors",
                    isActive ? "text-ink" : "text-muted",
                  )}
                  strokeWidth={1.7}
                />
                <span className="sr-only">{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
