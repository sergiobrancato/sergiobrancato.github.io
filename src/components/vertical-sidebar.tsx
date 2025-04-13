"use client";

import type React from "react";

import { useEffect, useState } from "react";
import {
  FaHome,
  FaUser,
  FaSuitcase,
  FaFolderOpen,
  FaPaperPlane,
} from "react-icons/fa";
import { FaGears } from "react-icons/fa6";

interface NavItem {
  name: string;
  icon: string;
  ref: React.RefObject<HTMLDivElement>;
}

interface VerticalSidebarProps {
  navItems: NavItem[];
  onNavClick: (ref: React.RefObject<HTMLDivElement>) => void;
}

export function VerticalSidebar({
  navItems,
  onNavClick,
}: VerticalSidebarProps) {
  const [activeSection, setActiveSection] = useState("Home");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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

  /* Update active section based on scroll position --> D E P R E C A T E D */
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

  return (
    <div className="fixed inset-y-0 left-0 z-40 flex items-center">
      <nav className="py-4 pl-4">
        <ul className="flex flex-col gap-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.name;
            const isHovered = hoveredItem === item.name;

            return (
              <li key={item.name} className="relative">
                <button
                  onClick={() => onNavClick(item.ref)}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`flex items-center group transition-all duration-300 ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-full">
                    {getIcon(item.icon)}
                  </span>

                  {/* Label that appears on hover or when active */}
                  <span
                    className={`absolute left-12 whitespace-nowrap px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm border border-border shadow-md transition-all duration-300 ${
                      isHovered
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-2 pointer-events-none"
                    }`}
                  >
                    {item.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
