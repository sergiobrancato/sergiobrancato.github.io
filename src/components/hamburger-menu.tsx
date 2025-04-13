"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  FaHome,
  FaUser,
  FaSuitcase,
  FaFolderOpen,
  FaPaperPlane,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { FaGears } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  name: string;
  icon: string;
  ref: React.RefObject<HTMLDivElement>;
}

interface HamburgerMenuProps {
  navItems: NavItem[];
  onNavClick: (ref: React.RefObject<HTMLDivElement>) => void;
}

export function HamburgerMenu({ navItems, onNavClick }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      // md breakpoint in Tailwind is 768px
      setIsMobile(window.innerWidth < 768);

      // Close menu if screen size increases beyond md breakpoint
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    // Initial check
    checkIfMobile();

    // Add resize listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Function to get the icon component based on the icon name
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "FaHome":
        return <FaHome className="h-5 w-5" />;
      case "FaUser":
        return <FaUser className="h-5 w-5" />;
      case "FaGears":
        return <FaGears className="h-5 w-5" />;
      case "FaSuitcase":
        return <FaSuitcase className="h-5 w-5" />;
      case "FaFolderOpen":
        return <FaFolderOpen className="h-5 w-5" />;
      case "FaPaperPlane":
        return <FaPaperPlane className="h-5 w-5" />;
      default:
        return <FaHome className="h-5 w-5" />;
    }
  };

  // Handle navigation click - close menu and navigate
  const handleNavClick = (ref: React.RefObject<HTMLDivElement>) => {
    setIsOpen(false);
    onNavClick(ref);
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Find which section is currently in view
      navItems.forEach((item) => {
        if (item.ref.current) {
          const element = item.ref.current;
          const { top, bottom } = element.getBoundingClientRect();

          // If the section is in the viewport
          if (
            top <= window.innerHeight / 2 &&
            bottom >= window.innerHeight / 2
          ) {
            setActiveSection(item.name);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('[data-menu="hamburger"]')) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  // Lock body scroll when menu is open on mobile
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isMobile]);

  return (
    <>
      {/* Hamburger Button */}
      <button
        data-menu="hamburger"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="fixed top-4 left-4 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border shadow-md hover:bg-muted transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <FaTimes className="h-5 w-5" />
        ) : (
          <FaBars className="h-5 w-5" />
        )}
      </button>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Menu Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-menu="hamburger"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 z-50 h-full w-64 bg-background border-r border-border shadow-xl"
          >
            <div className="flex flex-col h-full">
              {/* Menu Header */}
              <div className="p-4 border-b border-border">
                <h2 className="text-xl font-bold">Menu</h2>
              </div>

              {/* Menu Items */}
              <nav className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-2">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.name;

                    return (
                      <li key={item.name}>
                        <button
                          onClick={() => handleNavClick(item.ref)}
                          className={`flex items-center w-full p-3 rounded-md transition-colors ${
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-muted text-foreground"
                          }`}
                        >
                          <span className="flex items-center justify-center w-8 h-8">
                            {getIcon(item.icon)}
                          </span>
                          <span className="ml-3">{item.name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Menu Footer */}
              <div className="p-4 border-t border-border">
                <p className="text-sm text-muted-foreground">Sergio Brancato</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
