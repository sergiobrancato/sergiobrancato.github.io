/**
 * src/app/page.tsx
 * -----------------------------------------------------------------------------
 * HOME PAGE — a clean assembly of the six sections, in scroll order.
 *
 * There is deliberately almost nothing here. Add a section by creating it in
 * src/components/sections/ and placing it in the list below; add a navigation
 * anchor by editing navItems in src/content/profile.ts.
 */
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <PortfolioSection />
      <ContactSection />
    </>
  );
}
