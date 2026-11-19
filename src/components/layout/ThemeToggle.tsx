/**
 * src/components/layout/ThemeToggle.tsx
 * -----------------------------------------------------------------------------
 * The sun / moon switch fixed in the top-right corner. It reads and writes the
 * theme through next-themes, so it stays in sync everywhere.
 *
 * Visual: frosted glass pill, rotating icon swap, warm ring on hover.
 * Accessibility: real <button>, explicit aria-label, 44px hit area.
 */
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  // Keep the server and first client render identical: next-themes resolves the
  // theme only after mount. A stable label avoids a hydration attribute mismatch.
  const label = !mounted
    ? "Toggle colour theme"
    : isDark
      ? "Switch to light mode"
      : "Switch to dark mode";

  return (
    <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
      <button
        type="button"
        aria-label={label}
        title={label}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface/70 text-ink shadow-sm backdrop-blur-xl transition-colors duration-300 hover:border-line-strong hover:bg-surface-strong/90"
      >
        {/* Soft halo appears on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_120%,rgba(251,146,60,0.28),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <span className="relative flex h-5 w-5 items-center justify-center overflow-hidden">
          {mounted ? (
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? "moon" : "sun"}
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, rotate: -70, scale: 0.6 }
                }
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, rotate: 70, scale: 0.6 }
                }
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="absolute flex items-center justify-center"
              >
                {isDark ? (
                  <Moon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                ) : (
                  <Sun className="h-[18px] w-[18px]" strokeWidth={1.6} />
                )}
              </motion.span>
            </AnimatePresence>
          ) : (
            <span className="h-4 w-4 rounded-full border border-line" />
          )}
        </span>
      </button>
    </div>
  );
}
