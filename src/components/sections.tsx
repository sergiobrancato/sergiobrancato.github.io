"use client";

import type React from "react";

import { useRef } from "react";
import { HamburgerMenu } from "@/components/hamburger-menu";
import { VerticalSidebar } from "../components/vertical-sidebar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import WorkBackground from "@/components/sections/work-background";
import Portfolio from "@/components/sections/portfolio";
import Contact from "@/components/sections/contact";

export function Sections() {
  // Refs for each section to enable scrolling
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Function to scroll to a section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Navigation items with refs
  const navItems = [
    {
      name: "Home",
      icon: "FaHome",
      ref: homeRef as React.RefObject<HTMLDivElement>,
    },
    {
      name: "About me",
      icon: "FaUser",
      ref: aboutRef as React.RefObject<HTMLDivElement>,
    },
    {
      name: "Skills",
      icon: "FaGears",
      ref: skillsRef as React.RefObject<HTMLDivElement>,
    },
    {
      name: "Work Background",
      icon: "FaSuitcase",
      ref: workRef as React.RefObject<HTMLDivElement>,
    },
    {
      name: "Projects",
      icon: "FaFolderOpen",
      ref: portfolioRef as React.RefObject<HTMLDivElement>,
    },
    {
      name: "Contact",
      icon: "FaPaperPlane",
      ref: contactRef as React.RefObject<HTMLDivElement>,
    },
  ];

  return (
    <div className="relative">
      {/* Theme Toggle in top right corner */}
      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>

      {/* Hamburger Menu - Only visible on small screens */}
      <div className="md:hidden">
        <HamburgerMenu navItems={navItems} onNavClick={scrollToSection} />
      </div>

      {/* Vertical Sidebar - Only visible on medium screens and larger */}
      <div className="hidden md:block">
        <VerticalSidebar navItems={navItems} onNavClick={scrollToSection} />
      </div>

      {/* Main content */}
      <div className="w-full overflow-y-auto">
        {/* Each section takes up full viewport height */}
        <section ref={homeRef} id="home" className="min-h-screen">
          <Hero />
        </section>

        <section ref={aboutRef} id="about" className="min-h-screen">
          <About />
        </section>

        <section ref={skillsRef} id="skills" className="min-h-screen">
          <Skills />
        </section>

        <section ref={workRef} id="work" className="min-h-screen">
          <WorkBackground />
        </section>

        <section ref={portfolioRef} id="portfolio" className="min-h-screen">
          <Portfolio />
        </section>

        <section ref={contactRef} id="contact" className="min-h-screen">
          <Contact />
        </section>
      </div>
    </div>
  );
}
