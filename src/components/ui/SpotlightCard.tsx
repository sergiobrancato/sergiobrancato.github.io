/**
 * src/components/ui/SpotlightCard.tsx
 * -----------------------------------------------------------------------------
 * A card that tracks the cursor and paints a soft radial highlight beneath it.
 * Used by the about bento, capability cards and project cards for a consistent
 * tactile hover language.
 *
 * The highlight itself is CSS (`.spotlight` in globals.css); this component only
 * writes two custom properties. No React state, no re-renders.
 */
"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Optional inline styles — used for per-project accent variables. */
  style?: CSSProperties;
}

export function SpotlightCard({
  children,
  className,
  style,
}: SpotlightCardProps) {
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      className={cn("spotlight", className)}
      style={style}
      onPointerMove={handlePointerMove}
    >
      {children}
    </div>
  );
}
