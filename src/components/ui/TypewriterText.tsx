/**
 * src/components/ui/TypewriterText.tsx
 * -----------------------------------------------------------------------------
 * The gradient kinetic typewriter beneath the hero name.
 *
 * It cycles through `profile.typewriter.phrases` — edit that array to change the
 * identities, no component change required.
 *
 * Accessibility: the animated line is aria-hidden, while a visually hidden
 * static list gives screen readers every phrase once.
 */
"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface TypewriterTextProps {
  phrases: string[];
  prefix?: string;
  className?: string;
}

type Phase = "typing" | "pausing" | "deleting";

export function TypewriterText({
  phrases,
  prefix,
  className,
}: TypewriterTextProps) {
  const reduceMotion = useReducedMotion();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [visibleText, setVisibleText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    if (reduceMotion || phrases.length === 0) return;

    const phrase = phrases[phraseIndex % phrases.length];
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (visibleText.length < phrase.length) {
        // Slightly irregular rhythm reads as human typing, not a metronome.
        const delay = 34 + (visibleText.length % 4) * 9;
        timer = setTimeout(
          () => setVisibleText(phrase.slice(0, visibleText.length + 1)),
          delay,
        );
      } else {
        timer = setTimeout(() => setPhase("pausing"), 1850);
      }
    } else if (phase === "pausing") {
      timer = setTimeout(() => setPhase("deleting"), 320);
    } else {
      if (visibleText.length > 0) {
        timer = setTimeout(
          () => setVisibleText(phrase.slice(0, visibleText.length - 1)),
          20,
        );
      } else {
        timer = setTimeout(() => {
          setPhraseIndex((current) => (current + 1) % phrases.length);
          setPhase("typing");
        }, 220);
      }
    }

    return () => clearTimeout(timer);
  }, [visibleText, phase, phraseIndex, phrases, reduceMotion]);

  const staticPhrase = phrases[0] ?? "";
  const displayText = reduceMotion ? staticPhrase : visibleText;

  return (
    <div className={className}>
      <p className="sr-only">
        {phrases.join(". ")}
        {"."}
      </p>

      <div
        aria-hidden="true"
        className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-display text-[clamp(1rem,2.5vw,1.65rem)] font-medium tracking-[-0.02em]"
      >
        {prefix && (
          <span className="hidden font-normal text-muted sm:inline">
            {prefix}
          </span>
        )}
        <span className="inline-flex min-h-[1.35em] items-baseline">
          <span className="text-gradient">{displayText}</span>
          <span className="ml-1 inline-block h-[1.05em] w-[2px] translate-y-[0.14em] animate-blink rounded-full bg-gradient-to-b from-accent-pink to-accent" />
        </span>
      </div>
    </div>
  );
}
