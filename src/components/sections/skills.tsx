"use client";

import { useEffect, useRef, useState } from "react";

export default function Skills() {
  const skills = [
    { name: "Adobe Photoshop", level: 80 },
    { name: "Next.js", level: 85 },
    { name: "UI/UX Design", level: 80 },
    { name: "Canva", level: 90 },
    { name: "HTML / CSS", level: 90 },
    { name: "Microsoft Office", level: 70 },
    { name: "Dart, Flutter", level: 65 },
    { name: "Javascript", level: 80 },
    { name: "Adobe Illustrator", level: 70 },
  ];

  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 } // Attiva quando il 30% della sezione è visibile
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col justify-center min-h-screen px-8 md:px-16 lg:px-24"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-8">Skills</h2>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-12">
        {skills.map((skill, index) => (
          <div key={index} className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="font-medium">{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className={`bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 h-2.5 rounded-full transition-all duration-[1500ms] ease-in-out ${
                  isVisible ? "w-full" : "w-0"
                }`}
                style={
                  isVisible ? { width: `${skill.level}%` } : { width: "0%" }
                }
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
