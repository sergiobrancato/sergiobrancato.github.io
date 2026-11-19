/**
 * src/lib/motion.ts
 * -----------------------------------------------------------------------------
 * Shared Framer Motion timing and variants. Keeping easing and stagger values
 * here is what makes the whole site feel like one considered object rather than
 * a collection of unrelated animations.
 *
 * Style guide: reveals are fast (0.45–0.6s), travel no more than 20px, and
 * never delay the content a recruiter came to read.
 */
import type { Variants } from "framer-motion";

/** Signature ease — quick start, soft landing. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Standard viewport trigger: animate once, when 20% is visible. */
export const viewportOnce = { once: true, amount: 0.2 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE },
  },
};

/** Parent variant: staggers direct children that use `fadeUp`. */
export const staggerGroup: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};
