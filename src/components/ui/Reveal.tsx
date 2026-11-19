/**
 * src/components/ui/Reveal.tsx
 * -----------------------------------------------------------------------------
 * A fast, consistent "fade up into view" wrapper used by every section.
 *
 * Usage:
 *   <Reveal delay={0.1}>…</Reveal>
 *
 * Keeps motion accessible: when the visitor prefers reduced motion the content
 * is rendered immediately with no transform.
 */
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before animating. Keep below 0.25 for reading flow. */
  delay?: number;
  /** Vertical travel in pixels. */
  y?: number;
}

export function Reveal({ children, className, delay = 0, y = 18 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
