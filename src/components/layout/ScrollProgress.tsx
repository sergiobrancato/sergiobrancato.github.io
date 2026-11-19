/**
 * src/components/layout/ScrollProgress.tsx
 * -----------------------------------------------------------------------------
 * The hairline gradient progress bar at the very top of the page. Purely
 * decorative, computed from Framer Motion's scroll progress — no scroll
 * listeners of its own.
 */
"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent-cyan via-accent-pink to-accent"
    />
  );
}
