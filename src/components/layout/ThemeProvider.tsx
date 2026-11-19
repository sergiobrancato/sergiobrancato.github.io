/**
 * src/components/layout/ThemeProvider.tsx
 * -----------------------------------------------------------------------------
 * Wraps the app in next-themes so dark / light mode can be toggled anywhere.
 * Dark is the default; system preference is deliberately ignored to keep the
 * portfolio's first impression consistent.
 */
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
