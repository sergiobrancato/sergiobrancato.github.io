/**
 * src/components/ui/SectionHeading.tsx
 * -----------------------------------------------------------------------------
 * The shared editorial section header: index number, mono label, large display
 * heading with an italic serif tail, and a short recruiter-facing summary.
 *
 * All copy comes from the SectionIntro object in src/content/*.ts.
 */
import type { SectionIntro } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  section: SectionIntro;
  className?: string;
  /** Use "center" for sections that should feel like a statement. */
  align?: "left" | "center";
  /** Optional id, so the parent <section> can reference it with aria-labelledby. */
  id?: string;
}

export function SectionHeading({
  section,
  className,
  align = "left",
  id,
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "relative max-w-3xl",
        isCentered && "mx-auto text-center",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3",
          isCentered && "justify-center",
        )}
      >
        <span className="font-mono text-[0.6875rem] font-medium tracking-[0.3em] text-accent">
          {section.index}
        </span>
        <span className="h-px w-8 bg-line-strong" />
        <span className="mono-label">{section.label}</span>
      </div>

      <h2
        id={id}
        className="mt-5 text-[2.15rem] font-semibold leading-[1.03] text-ink sm:text-5xl lg:text-[3.6rem]"
      >
        {section.heading}{" "}
        <span className="font-serif font-normal italic tracking-[-0.02em] text-ink-soft">
          {section.headingAccent}
        </span>
      </h2>

      <p
        className={cn(
          "mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-muted sm:text-base",
          isCentered && "mx-auto",
        )}
      >
        {section.description}
      </p>
    </div>
  );
}
