/**
 * src/app/layout.tsx
 * -----------------------------------------------------------------------------
 * ROOT SHELL.
 *
 * Owns everything that appears on every page: fonts, SEO metadata, the theme
 * provider, the fixed left navigation, the theme toggle, the scroll-progress
 * bar and the film-grain overlay.
 *
 * To change fonts, edit the next/font imports below and the CSS variables they
 * expose. To change SEO copy, edit profile.seo in src/content/profile.ts.
 */
import type { Metadata, Viewport } from "next";
import {
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google";
import type { ReactNode } from "react";
import { profile } from "@/content/profile";
import { experienceContent } from "@/content/experience";
import { assetPath } from "@/lib/assets";
import { HOME_URL, SITE_URL } from "@/lib/site";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LeftNavRail } from "@/components/layout/LeftNavRail";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import "./globals.css";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const serifFont = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: profile.seo.title,
    template: `%s — ${profile.name.full}`,
  },
  description: profile.seo.description,
  keywords: profile.seo.keywords,
  authors: [{ name: profile.name.full, url: HOME_URL }],
  creator: profile.name.full,
  applicationName: `${profile.name.full} — Portfolio`,
  alternates: {
    canonical: assetPath("/"),
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: HOME_URL,
    siteName: `${profile.name.full} — Portfolio`,
    title: profile.seo.title,
    description: profile.seo.description,
    images: [
      {
        url: assetPath("/og.png"),
        width: 1200,
        height: 630,
        alt: `${profile.name.full} — ${profile.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: profile.seo.title,
    description: profile.seo.description,
    images: [assetPath("/og.png")],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: assetPath("/favicon.ico"), sizes: "any" },
      {
        url: assetPath("/icon.png"),
        type: "image/png",
        sizes: "512x512",
      },
    ],
    shortcut: assetPath("/favicon.ico"),
    apple: [
      {
        url: assetPath("/apple-touch-icon.png"),
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
  colorScheme: "dark light",
};

/** Rich result for recruiters, search engines and link unfurls. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name.full,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: HOME_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location.city,
    addressCountry: profile.location.countryCode,
  },
  alumniOf: experienceContent.items
    .filter((entry) => entry.type === "education")
    .map((entry) => ({
      "@type": "EducationalOrganization",
      name: entry.organization,
    })),
  knowsLanguage: profile.languages.map((language) => ({
    "@type": "Language",
    name: language.name,
  })),
  sameAs: profile.links
    .filter((link) => link.href.startsWith("http"))
    .map((link) => link.href),
  knowsAbout: profile.targetSectors,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable} ${serifFont.variable} font-sans`}
      >
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only z-[100] rounded-full bg-ink px-4 py-2 text-sm font-medium text-canvas focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>

          <ScrollProgress />
          <LeftNavRail />
          <ThemeToggle />

          <main id="main">{children}</main>

          <div className="site-grain" aria-hidden="true" />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
