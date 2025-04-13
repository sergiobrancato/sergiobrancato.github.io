"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Maximize2, Minimize2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BlurFade } from "../magicui/blur-fade";
import Image from "next/image";

// Define project types for filtering
type ProjectType = "All" | "Coding" | "Design" | "Marketing";

interface PortfolioItem {
  title: string;
  category: string;
  type: ProjectType | ProjectType[]; // A project can belong to multiple types
  description: string;
  info?: string[];
  technologies?: string[];
  imageUrl: string;
  additionalImages?: string[];
}

export default function Portfolio() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ProjectType>("All");
  const modalContentRef = useRef<HTMLDivElement>(null);
  const portfolioSectionRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);

  // Track the initial grid position to restore after modal closing
  const gridPositionRef = useRef<number | null>(null);

  const portfolioItems: PortfolioItem[] = [
    {
      title: "Amorim Cork Italia",
      category: "Marketing",
      type: "Marketing",
      description:
        "Marketing project carried out in a group for the Italian division of the company Amorim Cork, Amorim is a Portuguese company leader in the world for the production of cork in various fields: from bottle caps to acoustic insulation; the company's mission is to spread a 100% natural and sustainable product. Their request concerned their line of Xpur Vintage Qork caps, they needed to understand how to position the Xpur Vintage Qork cap in the world of wine, with particular attention to the organic and bio-dynamic wine market. There were various obstacles including the increase in screw caps on the market, the price not accessible to small companies, and the difficulty in making people understand the true value behind an Amorim cap. After creating a value proposition canvas and the buyer persona, questionnaires were organized for a random sample of people and questions were asked to some local companies in the sector. With the data collected, short-term solutions were proposed with the task of making the brand known online and offline; and other long-term ones to better publicize the values ​​regarding sustainability and the great quality of Amorim also taking inspiration from the Michelin company.",
      info: [
        "Company: Amorim",
        "website:https://www.amorimcorkitalia.com",
        "Presentation: /portfolio/amorim/pam.pdf",
      ],
      imageUrl: "/portfolio/amorim/amorimC.jpg",
      additionalImages: ["portfolio/amorim/amorim.jpg"],
    },
    {
      title: "Conceria LABA",
      category: "Marketing",
      type: "Marketing",
      description:
        "Work carried out in a group for Conceria LABA, a company from Vicenza that has been operating in the B2B market in the tanning sector for years, having several important and international clients in the fashion world. LABA's requests were to facilitate the elimination of intermediaries and to define the company's online identity. Given the great difficulty in satisfying the first point, the best thing is to focus on improving the online presence in order to acquire additional customers; to achieve the objective, it is important to act on the site by improving it and adding a blog section to better describe the company's commitment and goals and a catalog to improve the experience with customers. Subsequently, the social accounts of LinkedIn, Facebook and Instagram should be reviewed/created, each for different purposes.",
      info: [
        "Company: Conceria Laba",
        "website:https://www.concerialaba.it",
        "Presentation: /portfolio/laba/laba.pdf",
      ],
      imageUrl: "/portfolio/laba/labalog2.png",
      additionalImages: ["portfolio/laba/laba.png"],
    },
    {
      title: "CUS Padova",
      category: "Branding",
      type: "Design",
      description:
        "The CUS Padova women's basketball team wanted to increase interest in the team and possibly the number of registrations. The project involved a team of three people and consisted of designing and creating an advertising flyer that explained what CUS basketball was and what the peculiarities of the student-athlete career were. The whole thing was created keeping the colors of the logo and using photographs taken during a game, then presented through flyer mockups. The flyer was created entirely with Canva, while the mockups were created with Adobe Photoshop. The project allowed us to gain experience in terms of collecting and analyzing the customer's requirements and how to satisfy them in the design and implementation phase.",
      info: ["Company: CUS Padova", "website:https://www.cuspadova.it"],
      imageUrl: "/portfolio/cus/cuslog2.jpg",
      additionalImages: ["portfolio/cus/cus.jpg", "portfolio/cus/cus2.jpg"],
    },
    {
      title: "AirBnb logo restyle",
      category: "Design",
      type: "Design",
      description:
        "Individual work from the course 'multimedia communication' in which an alternative logo for the short-term rental company AirBnb was presented, created with Adobe Illustrator based on reflections described through the A.R.M.M. model. The A.R.M.M. is a reference model for the creation and evaluation of logos created by William Lidwell, an American professor and designer.",
      info: [
        "Company: AirBnb",
        "Software: Adobe Illustrator",
        "Font: Blanquotey",
        "ARMM analysis: /portfolio/airbnb/armm.pdf",
      ],
      imageUrl: "/portfolio/airbnb/airbnb.png",
      additionalImages: ["portfolio/airbnb/posterairbnb.jpg"],
    },
    {
      title: "Ettomio",
      category: "E-commerce",
      type: "Marketing",
      description:
        "Work done for the company Ettomio. The company deals with making Montessori and quality furniture made in Italy, various changes to their e-commerce were suggested on various aspects. Parameters such as the usability of the site, the tree structure and data regarding sales and sessions were analyzed; a keyword strategy, an editorial plan, and campaigns for Meta and Google Ads were then made.",
      info: [
        "Company: Ettomio",
        "Software: Adobe Illustrator",
        "Website: https://ettomio.com/it/",
        "Presentation: /portfolio/ettomio/etto.pdf",
      ],
      imageUrl: "/portfolio/ettomio/ettomio.png",
    },
  ];

  // Filter the portfolio items based on the active filter
  const filteredItems = portfolioItems.filter((item) => {
    if (activeFilter === "All") return true;

    // Handle both string and array types
    if (Array.isArray(item.type)) {
      return item.type.includes(activeFilter);
    }

    return item.type === activeFilter;
  });

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Unwanted Movement and Scrolling during filtering
  const changeFilter = (newFilter: ProjectType) => {
    if (newFilter === activeFilter) return;

    // Save current scroll position before filter change
    if (portfolioSectionRef.current) {
      const sectionRect = portfolioSectionRef.current.getBoundingClientRect();
      scrollPositionRef.current = window.scrollY + sectionRect.top;
    }

    setActiveFilter(newFilter);
  };

  // Effect to maintain scroll position after filter changes
  useEffect(() => {
    if (scrollPositionRef.current && !selectedItem) {
      window.scrollTo({
        top: scrollPositionRef.current,
        behavior: "auto",
      });
    }
  }, [activeFilter, filteredItems, selectedItem]);

  // Store scroll position and lock body scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      // Save grid position for later restoration
      if (portfolioSectionRef.current) {
        const rect = portfolioSectionRef.current.getBoundingClientRect();
        gridPositionRef.current = window.scrollY + rect.top;
      }

      // Save current scroll position
      scrollPositionRef.current = window.scrollY;

      // Disable scrolling on the body
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.width = "100%";
      document.body.style.paddingRight = `${
        window.innerWidth - document.documentElement.clientWidth
      }px`;
    } else {
      // Re-enable scrolling on the body
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";

      // Fix for card jumping on modal interaction
      // Use a short timeout to ensure DOM has updated first
      setTimeout(() => {
        if (gridPositionRef.current !== null) {
          window.scrollTo({
            top: gridPositionRef.current,
            behavior: "auto",
          });
        }
      }, 0);
    }

    return () => {
      if (document.body.style.position === "fixed") {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.paddingRight = "";
      }
    };
  }, [selectedItem]);

  // Handle wheel events to prevent propagation at boundaries
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!modalContentRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = modalContentRef.current;

    // If scrolling up and already at the top, or scrolling down and already at the bottom
    if (
      (e.deltaY < 0 && scrollTop <= 0) ||
      (e.deltaY > 0 && scrollTop + clientHeight >= scrollHeight)
    ) {
      e.preventDefault();
    }
  };

  // Close modal without affecting navigation
  const closeModal = (e: React.MouseEvent) => {
    // Prevent the event from propagating to parent elements
    e.stopPropagation();
    e.preventDefault();

    // Close the modal
    setSelectedItem(null);
    setIsFullscreen(false);
  };

  // Filter options
  const filterOptions: ProjectType[] = ["All", "Coding", "Design", "Marketing"];

  // Calculate the container height to prevent layout shifts
  // This ensures the container maintains a consistent height during filter transitions
  const containerHeight =
    Math.ceil(filteredItems.length / 3) * 360 +
    (Math.ceil(filteredItems.length / 3) - 1) * 24;
  const minHeight = Math.max(containerHeight, 500);

  return (
    <div
      ref={portfolioSectionRef}
      className="flex flex-col justify-center min-h-screen px-8 md:px-16 lg:px-24"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-8">Portfolio</h2>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filterOptions.map((filter) => (
          <button
            key={filter}
            onClick={() => changeFilter(filter)}
            className={`px-4 py-2 rounded-full transition-all ${
              activeFilter === filter
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Portfolio Grid with Animation - Using a stable height container */}
      <BlurFade inView inViewMargin="-300px">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 lg:gap-x-6 lg:gap-y-0 relative"
          style={{
            minHeight: "min(100vh, 775px)",
            height: "auto",
          }}
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={`${item.title}-${item.category}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.3,
                // Shorter animation duration helps stability
                delay: 0.05,
              }}
              className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer border-2 border-muted flex flex-col "
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItem(item);
              }}
              style={{
                height: "360px",
                position: "relative",
              }}
            >
              <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
                <Image
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                  priority={index < 6} // Prioritize loading first 6 images
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.category}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {Array.isArray(item.type) ? (
                    item.type.map((type) => (
                      <span
                        key={type}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                      >
                        {type}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      {item.type}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </BlurFade>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-xl text-muted-foreground mb-4">
            No projects found for this filter.
          </p>
          <button
            onClick={() => changeFilter("All")}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            View All Projects
          </button>
        </div>
      )}

      {/* Project Modal with improved positioning */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
              isFullscreen ? "" : "md:p-10"
            }`}
            onClick={closeModal}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80"
              aria-hidden="true"
            ></div>

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`
                relative bg-background rounded-lg shadow-xl overflow-hidden z-10
                ${
                  isFullscreen
                    ? "w-full h-full"
                    : "w-full max-w-3xl max-h-[90vh]"
                }
                flex flex-col
              `}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <div>
                  <h3 className="text-xl font-semibold">
                    {selectedItem.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedItem.category}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {Array.isArray(selectedItem.type) ? (
                      selectedItem.type.map((type) => (
                        <span
                          key={type}
                          className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                        >
                          {type}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {selectedItem.type}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFullscreen();
                    }}
                    className="p-2 rounded-full hover:bg-muted transition-colors"
                    aria-label={
                      isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                    }
                  >
                    {isFullscreen ? (
                      <Minimize2 className="h-5 w-5" />
                    ) : (
                      <Maximize2 className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItem(null);
                    }}
                    className="p-2 rounded-full hover:bg-muted transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content - Scrollable */}
              <div
                ref={modalContentRef}
                className="flex-1 overflow-y-auto p-4 overscroll-contain"
                onWheel={handleWheel}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Main Image */}
                <div className="mb-6">
                  <img
                    src={selectedItem.imageUrl || "/placeholder.svg"}
                    alt={selectedItem.title}
                    className="w-full h-auto rounded-md object-cover max-h-[50vh]"
                  />
                </div>

                {/* Project Description */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-2">Project Overview</h4>
                  <p className="text-foreground">{selectedItem.description}</p>
                </div>

                {/* Project Details */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-2">Project Details</h4>
                  <div className="border-2 rounded-2xl border-muted p-4 py-6 bg-card w-[50%]">
                    {selectedItem.info?.map((info, index) => {
                      const [labelRaw, valueRaw] = info.split(/:(.+)/); // split solo sulla prima occorrenza di ":"
                      const label = labelRaw.trim();
                      const value = valueRaw?.trim();

                      const isExternalLink = value?.startsWith("http");
                      const isPdf = value?.endsWith(".pdf");

                      return (
                        <div key={index} className="mb-2">
                          <span className="font-semibold">{label}:</span>{" "}
                          {isExternalLink ? (
                            <a
                              href={value}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline hover:text-blue-800"
                            >
                              Official website
                            </a>
                          ) : isPdf ? (
                            <a
                              href={value}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline hover:text-blue-800"
                            >
                              Download PDF
                            </a>
                          ) : (
                            <span>{value}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Technologies */}
                {selectedItem.technologies &&
                  selectedItem.technologies.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-bold mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.technologies?.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Additional Images */}
                {selectedItem.additionalImages &&
                  selectedItem.additionalImages.length > 0 && (
                    <div>
                      <h4 className="text-lg font-bold mb-2">
                        Project Gallery
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedItem.additionalImages.map((img, index) => (
                          <div
                            key={index}
                            className="rounded-md overflow-hidden"
                          >
                            <img
                              src={img}
                              alt={`${selectedItem.title} - Image ${index + 1}`}
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
