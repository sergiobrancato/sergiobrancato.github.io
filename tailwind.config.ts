/**
 * tailwind.config.ts
 * -----------------------------------------------------------------------------
 * Tailwind design tokens for the portfolio. Colours are CSS variables defined
 * in src/app/globals.css so dark / light mode stays in one place.
 *
 * To retune the whole site, edit the HSL values in globals.css — not every
 * component. Add new fonts in src/app/layout.tsx and expose them here.
 */
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Channel triplets let Tailwind apply opacity modifiers correctly.
        canvas: "rgb(var(--canvas-rgb) / <alpha-value>)",
        "canvas-soft": "rgb(var(--canvas-soft-rgb) / <alpha-value>)",
        surface: "rgb(var(--surface-rgb) / <alpha-value>)",
        "surface-strong": "rgb(var(--surface-strong-rgb) / <alpha-value>)",
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        "ink-soft": "rgb(var(--ink-soft-rgb) / <alpha-value>)",
        muted: "rgb(var(--muted-rgb) / <alpha-value>)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        "accent-pink": "rgb(var(--accent-pink-rgb) / <alpha-value>)",
        "accent-cyan": "rgb(var(--accent-cyan-rgb) / <alpha-value>)",
        "accent-amber": "rgb(var(--accent-amber-rgb) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      maxWidth: {
        shell: "78rem",
      },
      boxShadow: {
        hairline: "0 0 0 1px var(--line)",
        lift: "0 24px 60px -24px rgba(0, 0, 0, 0.55)",
        "lift-light": "0 28px 60px -32px rgba(15, 23, 42, 0.28)",
        glow: "0 0 0 1px rgba(255, 255, 255, 0.08), 0 18px 60px -18px rgba(244, 114, 182, 0.35)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.7" },
          "80%, 100%": { transform: "scale(2.4)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        blink: {
          "0%, 45%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "grid-drift": {
          "0%": { backgroundPosition: "0px 0px" },
          "100%": { backgroundPosition: "64px 64px" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        float: "float 7s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.24, 0.7, 0.32, 1) infinite",
        shimmer: "shimmer 5s linear infinite",
        blink: "blink 1.1s step-end infinite",
        "spin-slow": "spin-slow 48s linear infinite",
        "grid-drift": "grid-drift 24s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
