/**
 * src/components/ui/SpotlightGrid.tsx
 * -----------------------------------------------------------------------------
 * The interactive ambient backdrop behind the hero.
 *
 * Layers, back to front:
 *   1. Two slow aurora blobs for depth.
 *   2. A faint architectural grid.
 *   3. A second grid revealed only beneath the cursor (GPU-friendly, driven by
 *      CSS custom properties written in a requestAnimationFrame loop).
 *   4. A fine constellation field and a rotating orbital diagram.
 *   5. A vignette that dissolves the whole scene into the page background.
 *
 * Performance notes: one rAF loop only while the pointer moves, no canvas, no
 * layout reads inside the loop, and all motion is disabled for visitors who
 * prefer reduced motion.
 */
"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Deterministic field — avoids hydration mismatches from Math.random(). */
const STARS = Array.from({ length: 26 }, (_, index) => ({
  left: (index * 37 + 9) % 96,
  top: (index * 53 + 6) % 88,
  size: index % 7 === 0 ? 2 : 1,
  opacity: 0.18 + (index % 4) * 0.09,
}));

export function SpotlightGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reduceMotion) return;

    let animationFrame = 0;
    let targetX = 52;
    let targetY = 34;
    let currentX = 52;
    let currentY = 34;

    const paint = () => {
      currentX += (targetX - currentX) * 0.075;
      currentY += (targetY - currentY) * 0.075;

      element.style.setProperty("--spot-x", `${currentX.toFixed(2)}%`);
      element.style.setProperty("--spot-y", `${currentY.toFixed(2)}%`);

      if (
        Math.abs(targetX - currentX) > 0.08 ||
        Math.abs(targetY - currentY) > 0.08
      ) {
        animationFrame = window.requestAnimationFrame(paint);
      } else {
        animationFrame = 0;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      targetX = ((event.clientX - rect.left) / rect.width) * 100;
      targetY = ((event.clientY - rect.top) / rect.height) * 100;

      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(paint);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={
        {
          "--spot-x": "52%",
          "--spot-y": "34%",
        } as React.CSSProperties
      }
    >
      {/* Aurora depth ----------------------------------------------------- */}
      <div className="absolute -left-40 -top-48 h-[34rem] w-[34rem] rounded-full bg-cyan-400/[0.07] blur-[130px] dark:bg-cyan-400/[0.09]" />
      <div className="absolute -right-32 top-[12%] h-[30rem] w-[30rem] rounded-full bg-pink-500/[0.06] blur-[130px] dark:bg-pink-500/[0.08]" />
      <div className="absolute bottom-0 left-1/3 h-[22rem] w-[38rem] rounded-full bg-orange-400/[0.05] blur-[120px] dark:bg-orange-400/[0.05]" />

      {/* Architecture grid ------------------------------------------------ */}
      <div className="absolute inset-0 bg-grid mask-radial-fade opacity-70" />

      {/* Cursor-revealed highlight grid ------------------------------------ */}
      <div
        className="absolute inset-0 bg-grid opacity-90"
        style={{
          WebkitMaskImage:
            "radial-gradient(420px circle at var(--spot-x) var(--spot-y), rgba(0,0,0,1), transparent 72%)",
          maskImage:
            "radial-gradient(420px circle at var(--spot-x) var(--spot-y), rgba(0,0,0,1), transparent 72%)",
        }}
      />

      {/* Warm/cool light pooling under the cursor -------------------------- */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(560px circle at var(--spot-x) var(--spot-y), rgba(56,189,248,0.10), transparent 60%), radial-gradient(300px circle at calc(var(--spot-x) + 8%) calc(var(--spot-y) + 6%), rgba(244,114,182,0.07), transparent 65%)",
        }}
      />

      {/* Constellation ---------------------------------------------------- */}
      {STARS.map((star, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-ink/60 dark:bg-white/70"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
          }}
          animate={
            reduceMotion
              ? undefined
              : { opacity: [star.opacity, star.opacity * 2.4, star.opacity] }
          }
          transition={{
            duration: 5 + (index % 5),
            repeat: Infinity,
            ease: "easeInOut",
            delay: (index % 8) * 0.45,
          }}
        />
      ))}

      {/* Orbital diagram -------------------------------------------------- */}
      <div className="absolute -right-[9rem] top-[8%] hidden h-[34rem] w-[34rem] opacity-50 sm:block lg:-right-24 lg:top-[6%]">
        <div className="absolute inset-0 animate-spin-slow">
          <div className="absolute inset-0 rounded-full border border-dashed border-ink/10 dark:border-white/[0.09]" />
          <div className="absolute inset-[12%] rounded-full border border-ink/[0.07] dark:border-white/[0.07]" />
          <div className="absolute inset-[28%] rounded-full border border-dashed border-ink/10 dark:border-white/[0.09]" />
          <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-cyan shadow-[0_0_16px_4px_rgba(34,211,238,0.35)]" />
          <span className="absolute bottom-[12%] right-[12%] h-1 w-1 rounded-full bg-accent-pink" />
        </div>
        <div className="absolute inset-[40%] rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.14),rgba(255,255,255,0.02)_55%,transparent_75%)] ring-1 ring-ink/[0.06] dark:ring-white/[0.08]" />
        <div className="absolute left-1/2 top-1/2 h-px w-[130%] -translate-x-1/2 -translate-y-1/2 rotate-[18deg] bg-gradient-to-r from-transparent via-ink/10 to-transparent dark:via-white/10" />
      </div>

      {/* Vignettes -------------------------------------------------------- */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-canvas/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-canvas via-canvas/70 to-transparent" />
    </div>
  );
}
