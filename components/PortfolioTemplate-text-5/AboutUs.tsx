"use client";
import Image from 'next/image';
import React, { useState, useEffect } from "react";
import { FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt, FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiRedux, SiRedis, SiFigma } from 'react-icons/si';

const ABOUT_CONTENT = {
  title: "About",
  subtitle: "Full-Stack Web Developer & UI/UX Designer",
  description: "I am a BS Computer Science student (Semester 7) at PMAS-Arid Agriculture University, Rawalpindi. With a solid foundation from my Frontend Developer Internship at Codic Solution and independent projects, I specialize in building highly interactive and performant web applications. I bring together technical logic (Node.js, Docker, Redis, Python) and frontend aesthetics (React.js, Next.js, Tailwind CSS, Figma) to create seamless user journeys.",
  linkedInUrl: "https://www.linkedin.com/in/muhammad-abdullah-7572762b9",
  breakpoint: 768
};

const SKILL_CATEGORIES = [
  {
    title: "Frontend Stack",
    skills: [
      { name: "React.js", icon: FaReact, color: "text-cyan-400" },
      { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#38bdf8]" },
      { name: "Redux Toolkit", icon: SiRedux, color: "text-[#764abc]" },
      { name: "JavaScript/ES6", icon: FaJs, color: "text-yellow-400" },
      { name: "HTML5 & CSS3", icon: FaHtml5, color: "text-orange-500" },
    ]
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
      { name: "Redis Caching", icon: SiRedis, color: "text-[#d82c20]" },
      { name: "Python", icon: FaPython, color: "text-blue-400" },
      { name: "REST APIs", icon: FaJs, color: "text-[#01eeff]" },
    ]
  },
  {
    title: "DevOps & Design",
    skills: [
      { name: "Docker", icon: FaDocker, color: "text-blue-500" },
      { name: "Git & GitHub", icon: FaGitAlt, color: "text-orange-600" },
      { name: "Figma UI/UX", icon: SiFigma, color: "text-pink-400" },
    ]
  }
];

export default function AboutMeSection() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < ABOUT_CONTENT.breakpoint);
    };

    handleResize(); // Check screen size on mount
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(document.documentElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleButtonClick = () => {
    window.open(ABOUT_CONTENT.linkedInUrl, "_blank");
  };

  return (
    <div className="relative min-h-screen py-24 px-6 md:px-12 bg-[#090f1d] flex flex-col items-center justify-center overflow-hidden">
      {/* Background glow spot */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#01eeff]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
        {/* Main Section Content Split */}
        <div className={`flex ${isSmallScreen ? "flex-col items-center text-center gap-8" : "flex-row items-start gap-16"} w-full mb-16`}>
          {/* Image section */}
          <div className="relative flex-shrink-0 flex justify-center items-center">
            <div className="relative group w-[220px] h-[330px] md:w-[280px] md:h-[420px]">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-t from-[#01eeff] to-purple-600 opacity-50 blur-sm group-hover:opacity-85 transition duration-500" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(1,238,255,0.15)] bg-slate-900">
                <Image
                  src="/assets/circle.png"
                  alt="Muhammad Abdullah"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  fill
                  sizes="(max-width: 640px) 100vw, 300px"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Text section */}
          <div className="text-white flex-grow flex flex-col justify-center">
            {/* Title */}
            <div className={`font-bold ${isSmallScreen ? "text-3xl" : "text-5xl"} mb-4 tracking-wide`}>
              {ABOUT_CONTENT.title}{" "}
              <span className="text-[#01eeff] text-glow-cyan">
                Me
              </span>
            </div>

            {/* Subtitle */}
            <div className={`text-[#01eeff] font-semibold ${isSmallScreen ? "text-lg" : "text-2xl"} mb-4 tracking-wide`}>
              {ABOUT_CONTENT.subtitle}
            </div>

            {/* Description */}
            <div className="text-gray-300 font-light text-base md:text-lg leading-relaxed mb-8">
              {ABOUT_CONTENT.description}
            </div>

            {/* Connect Button */}
            <div>
              <button
                onClick={handleButtonClick}
                className="bg-transparent text-[#01eeff] border border-[#01eeff] hover:bg-[#01eeff] hover:text-black font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(1,238,255,0.2)] hover:shadow-[0_0_25px_rgba(1,238,255,0.6)]"
              >
                Let&apos;s Connect on LinkedIn
              </button>
            </div>
          </div>
        </div>

        {/* Skills Section Grid */}
        <div className="w-full mt-8">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-10 tracking-wider">
            Technical <span className="text-[#01eeff] text-glow-cyan">Skills</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SKILL_CATEGORIES.map((category, index) => (
              <div
                key={index}
                className="glass-card bg-[#111827]/40 rounded-xl p-6 border border-white/5 shadow-xl"
              >
                <h4 className="text-lg md:text-xl font-bold text-white mb-6 border-b border-gray-800 pb-3 flex items-center justify-between">
                  <span>{category.title}</span>
                  <span className="w-2 h-2 rounded-full bg-[#01eeff] text-glow-cyan" />
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  {category.skills.map((skill, sIndex) => (
                    <div
                      key={sIndex}
                      className="flex items-center gap-2.5 p-2 rounded-lg bg-white/5 border border-white/5 hover:border-[#01eeff]/20 hover:bg-[#01eeff]/5 transition-all duration-300 group"
                    >
                      <skill.icon className={`w-5 h-5 ${skill.color} group-hover:scale-110 transition-transform`} />
                      <span className="text-gray-300 text-xs sm:text-sm font-medium group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

