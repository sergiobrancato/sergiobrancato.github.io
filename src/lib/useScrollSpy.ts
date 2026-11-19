/**
 * src/lib/useScrollSpy.ts
 * -----------------------------------------------------------------------------
 * Tracks which section is currently in the viewport for the icon rail.
 *
 * How it works: an IntersectionObserver watches each section against a narrow
 * band in the middle of the screen. The first section in document order that
 * intersects that band wins. A small scroll fallback keeps "Contact" active at
 * the very bottom of the page, where the band can miss.
 *
 * Usage:
 *   const activeId = useScrollSpy(["home", "about", "skills"]);
 */
"use client";

import { useEffect, useState } from "react";
import type { SectionId } from "@/types/portfolio";

interface ScrollSpyOptions {
  /** Root margin that defines the activation band. Defaults to the middle 10%. */
  rootMargin?: string;
  /** Vertical offset (px) used by the bottom-of-page fallback. */
  bottomOffset?: number;
}

export function useScrollSpy(
  sectionIds: readonly SectionId[],
  options: ScrollSpyOptions = {},
): SectionId {
  const { rootMargin = "-45% 0px -45% 0px", bottomOffset = 8 } = options;
  const [activeId, setActiveId] = useState<SectionId>(sectionIds[0] ?? "home");

  // Join the ids so the effect only re-runs when the actual list changes.
  const idKey = sectionIds.join("|");

  useEffect(() => {
    const ids = idKey.split("|") as SectionId[];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }

        const nextActive = ids.find((id) => (visibility.get(id) ?? 0) > 0);
        if (nextActive) {
          setActiveId(nextActive);
        }
      },
      {
        rootMargin,
        threshold: [0, 0.05, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((element) => observer.observe(element));

    const handleScroll = () => {
      const doc = document.documentElement;
      const atBottom =
        window.innerHeight + window.scrollY >= doc.scrollHeight - bottomOffset;

      if (atBottom) {
        setActiveId(ids[ids.length - 1] ?? activeId);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
    // activeId is intentionally omitted: it is only a fallback value.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idKey, rootMargin, bottomOffset]);

  return activeId;
}
