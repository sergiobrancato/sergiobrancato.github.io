/**
 * src/components/sections/HeroSection.tsx
 * -----------------------------------------------------------------------------
 * FULL-VIEWPORT HERO (#home).
 *
 * Composition: availability badge → oversized name with chromatic edge glow →
 * gradient typewriter → positioning statement → CTAs → live "telemetry" panel.
 *
 * Copy comes from src/content/profile.ts. The animation is orchestrated with a
 * single Framer Motion stagger so the page feels composed, not assembled.
 */
"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Languages,
  MapPin,
} from "lucide-react";
import { profile } from "@/content/profile";
import { assetPath } from "@/lib/assets";
import { EASE } from "@/lib/motion";
import { SpotlightGrid } from "@/components/ui/SpotlightGrid";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { cn } from "@/lib/utils";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.085, delayChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const nameLine = {
  hidden: { y: "112%" },
  show: { y: "0%", transition: { duration: 0.95, ease: EASE } },
};

const STATUS_DOT: Record<string, string> = {
  available: "bg-emerald-400",
  open: "bg-sky-400",
  closed: "bg-zinc-500",
};

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const [localTime, setLocalTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: profile.location.timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const update = () => setLocalTime(formatter.format(new Date()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      <SpotlightGrid />

      <div className="section-shell relative z-10 flex flex-1 flex-col justify-center pb-20 pt-20 sm:pb-28 sm:pt-28 lg:pb-24 lg:pt-24">
        <motion.div
          variants={container}
          initial={reduceMotion ? false : "hidden"}
          animate="show"
          className="grid items-end gap-12 xl:grid-cols-[minmax(0,1fr)_19.5rem] xl:gap-16"
        >
          {/* Main column ------------------------------------------------- */}
          <div>
            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-x-5 gap-y-3"
            >
              <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/50 py-1.5 pl-3 pr-4 backdrop-blur-xl">
                <span className="relative flex h-2 w-2">
                  <span
                    className={cn(
                      "absolute inline-flex h-full w-full animate-pulse-ring rounded-full",
                      STATUS_DOT[profile.availability.tone],
                    )}
                  />
                  <span
                    className={cn(
                      "relative inline-flex h-2 w-2 rounded-full",
                      STATUS_DOT[profile.availability.tone],
                    )}
                  />
                </span>
                <span className="text-[0.66rem] font-medium leading-none tracking-[0.01em] text-ink-soft sm:text-[0.7rem]">
                  {profile.availability.label}
                </span>
              </span>

              <span className="hidden font-mono text-[0.625rem] uppercase tracking-[0.22em] text-muted sm:inline">
                {profile.hero.eyebrow}
              </span>
            </motion.div>

            <h1
              id="hero-title"
              className="mt-8 font-display font-semibold leading-[0.82] tracking-[-0.062em] text-[clamp(3.6rem,11.5vw,8.75rem)]"
            >
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span variants={nameLine} className="block">
                  {profile.name.first}
                </motion.span>
              </span>
              <span className="relative block overflow-hidden pb-[0.08em]">
                <motion.span variants={nameLine} className="relative block">
                  {/* Optical bloom behind the letters */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 hidden select-none text-white/15 blur-[22px] dark:block"
                  >
                    {profile.name.last}
                  </span>
                  <span className="name-sheen text-chromatic relative">
                    {profile.name.last}
                  </span>
                </motion.span>
              </span>
            </h1>

            <motion.div variants={item} className="mt-6 sm:mt-7">
              <TypewriterText
                phrases={profile.typewriter.phrases}
                prefix={profile.typewriter.prefix}
              />
            </motion.div>

            <motion.p
              variants={item}
              className="mt-6 max-w-2xl text-[0.98rem] leading-relaxed text-muted sm:text-[1.06rem] sm:leading-relaxed"
            >
              {profile.hero.intro}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#portfolio"
                className="group relative inline-flex h-12 items-center gap-2.5 overflow-hidden rounded-full bg-ink px-6 text-[0.875rem] font-medium text-canvas transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-accent-pink via-rose-500 to-accent transition-transform duration-300 ease-out group-hover:translate-y-0" />
                <span className="relative transition-colors duration-300 group-hover:text-white">
                  {profile.hero.primaryCta}
                </span>
                <ArrowUpRight
                  className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                  strokeWidth={1.8}
                />
              </a>

              <a
                href={assetPath(profile.cvPath)}
                download
                className="group inline-flex h-12 items-center gap-2.5 rounded-full border border-line bg-surface/40 px-6 text-[0.875rem] font-medium text-ink backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface-strong/70"
              >
                <Download
                  className="h-4 w-4 text-muted transition-colors group-hover:text-ink"
                  strokeWidth={1.7}
                />
                {profile.hero.secondaryCta}
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="link-underline ml-1 hidden text-[0.8125rem] text-muted transition-colors hover:text-ink sm:inline"
              >
                {profile.hero.tertiaryCta}
              </a>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[0.75rem] text-muted"
            >
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" strokeWidth={1.6} />
                {profile.location.city}, {profile.location.country} · open to
                relocation
              </span>
              <span className="hidden h-3 w-px bg-line sm:block" />
              <span className="inline-flex items-center gap-2">
                <Languages className="h-3.5 w-3.5" strokeWidth={1.6} />
                {profile.languages
                  .map((language) => `${language.name} ${language.level}`)
                  .join(" · ")}
              </span>
            </motion.div>
          </div>

          {/* Telemetry panel --------------------------------------------- */}
          <motion.aside
            variants={item}
            aria-label="Profile summary"
            className="relative hidden overflow-hidden rounded-2xl border border-line bg-surface/35 p-5 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.8)] backdrop-blur-2xl xl:block"
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent"
            />
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-muted">
                {profile.hero.telemetry.title}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-emerald-500 dark:text-emerald-400">
                  {profile.hero.telemetry.status}
                </span>
              </span>
            </div>

            <div className="mt-5 space-y-3.5">
              {profile.hero.telemetry.rows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-4 border-b border-line pb-2.5 last:border-0 last:pb-0"
                >
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                    {row.label}
                  </span>
                  <span className="text-right font-mono text-[0.68rem] text-ink-soft">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-line bg-canvas/40 p-3.5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted">
                    {profile.hero.telemetry.footer}
                  </p>
                  <p className="mt-1 font-mono text-xl tabular-nums tracking-tight text-ink">
                    {localTime ?? "--:--:--"}
                  </p>
                </div>
                <div className="flex items-end gap-[3px]" aria-hidden="true">
                  {[7, 12, 9, 16, 11, 5].map((height, index) => (
                    <motion.span
                      key={index}
                      className="w-[3px] rounded-full bg-gradient-to-t from-accent/40 to-accent-cyan"
                      animate={
                        reduceMotion
                          ? undefined
                          : { height: [height, height * 0.45, height] }
                      }
                      transition={{
                        duration: 1.8 + index * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.12,
                      }}
                      style={{ height }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-4 font-mono text-[0.56rem] uppercase tracking-[0.18em] text-muted/80">
              {profile.location.coordinates}
            </p>
          </motion.aside>
        </motion.div>

        {/* Scroll cue ---------------------------------------------------- */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-14 flex items-center justify-between gap-6 lg:mt-16"
        >
          <a
            href="#about"
            className="group inline-flex items-center gap-3 text-muted transition-colors hover:text-ink"
            aria-label={profile.hero.scrollCue}
          >
            <span className="relative flex h-9 w-[1.15rem] items-start justify-center overflow-hidden rounded-full border border-line-strong pt-1.5">
              <motion.span
                className="h-1 w-1 rounded-full bg-accent"
                animate={
                  reduceMotion ? undefined : { y: [0, 14, 0], opacity: [1, 0.2, 1] }
                }
                transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em]">
              {profile.hero.scrollCue}
            </span>
            <ArrowDown
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
              strokeWidth={1.6}
            />
          </a>

          <span className="hidden font-mono text-[0.58rem] uppercase tracking-[0.24em] text-muted/70 sm:block">
            {profile.availability.detail}
          </span>
        </motion.div>
      </div>

      {/* Editorial edge label ------------------------------------------- */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 rotate-90 font-mono text-[0.55rem] uppercase tracking-[0.4em] text-muted/60 2xl:block"
      >
        Software · Systems · Story
      </span>
    </section>
  );
}
