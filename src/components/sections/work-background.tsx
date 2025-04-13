"use client";

import type React from "react";
import { motion } from "framer-motion";
import { BlurFade } from "@/components/magicui/blur-fade";

interface WorkCardProps {
  title: string;
  years: string;
  description: string;
  skills: string[];
  icon: React.ReactNode;
  borderColor: string;
  iconColor: string;
  bgColor: string;
  textColor: string;
}

const WorkCard = ({
  title,
  years,
  description,
  skills,
  icon,
  borderColor,
  iconColor,
  bgColor,
  textColor,
}: WorkCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`bg-card rounded-lg shadow-lg overflow-hidden border-t-4 ${borderColor}`}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${iconColor}`}
          >
            {icon}
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-sm text-muted-foreground">{years}</p>
          </div>
        </div>

        <p className="mb-4 text-foreground">{description}</p>

        <div className="mt-8">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className={`text-xs font-semibold px-2 py-1 rounded-full ${bgColor} ${textColor}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function WorkBackground() {
  return (
    <div className="flex flex-col justify-center min-h-screen px-8 md:px-16 lg:px-24">
      <h2 className="text-4xl md:text-5xl font-bold mb-8">Work Background</h2>
      <BlurFade inView inViewMargin="-300px">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Software Development */}
          <WorkCard
            title="Software Development"
            years="2016 - Present"
            description="I took my first steps in programming during my first year of high school, starting with C to build a solid foundation in coding principles. Over time, my curiosity led me to explore web development, and eventually I discovered a strong interest in cross-platform applications. Today, my focus is on developing hybrid apps using Flutter — a powerful framework by Google based on the Dart language."
            skills={[
              "React",
              "Next.js",
              "Node.js",
              "TypeScript",
              "RESTful APIs",
              "Postman",
              "Flutter",
              "Dart",
              "HTML & CSS",
              "JavaScript",
              "Git",
              "C",
            ]}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            }
            borderColor="border-blue-500"
            iconColor="bg-blue-500"
            bgColor="bg-blue-100"
            textColor="text-blue-900"
          />

          {/* UI/UX Design */}
          <WorkCard
            title="UI/UX Design"
            years="2015 - Present"
            description="I've always had a strong passion for visual design. Since 2015, I've been familiar with Photoshop and similar tools, developing the ability to create flyers, posters, retouch photos, work with typography, and enhance existing designs. This creative background helps me bring a polished and thoughtful aesthetic to every project I work on."
            skills={[
              "Wireframing",
              "Prototyping",
              "Visual Design",
              "Design Systems",
              "Responsive Design",
            ]}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            }
            borderColor="border-purple-500"
            iconColor="bg-purple-500"
            bgColor="bg-purple-100"
            textColor="text-purple-900"
          />

          {/* Digital Marketing */}
          <WorkCard
            title="Digital Marketing"
            years="2021 - Present"
            description="I began my academic journey in Communication at the university of Padua with a strong interest in marketing, particularly in digital marketing. This path gave me the opportunity to explore the field more deeply. Especially valuable were a research project conducted for Amorim Cork and a collaboration with Storeis aimed at enhancing the e-commerce experience for Ettomio—both experiences strengthened my understanding of user-centered strategy and digital growth."
            skills={[
              "SEO",
              "Social Media",
              "Email Marketing",
              "Analytics",
              "Campaign Management",
              "Newsletter",
            ]}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
              </svg>
            }
            borderColor="border-green-500"
            iconColor="bg-green-500"
            bgColor="bg-green-100"
            textColor="text-green-900"
          />
        </div>{" "}
      </BlurFade>
    </div>
  );
}
