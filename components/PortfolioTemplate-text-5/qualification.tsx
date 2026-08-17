"use client";
import React from 'react';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';

const TIMELINE_DATA = [
  {
    type: 'experience',
    title: 'Frontend Developer Intern',
    institution: 'Codic Solution',
    period: '2024',
    details: 'Worked in a dynamic environment to develop responsive interfaces. Built features with React.js, Next.js, and Tailwind CSS. Utilized Git for version control and collaborated with backend developers to link APIs.',
    icon: FaBriefcase,
  },
  {
    type: 'education',
    title: 'BS Computer Science (Semester 7)',
    institution: 'PMAS-Arid Agriculture University, Rawalpindi',
    period: '2023 - 2027',
    details: 'Studying core areas including Algorithms, Data Structures, Web Engineering, Database Design, and Software Methodologies. Maintaining a high academic standard.',
    icon: FaGraduationCap,
  },
  {
    type: 'education',
    title: 'FSc Pre-Engineering',
    institution: 'Punjab College of Information Technology',
    period: '2020 - 2022',
    details: 'Completed pre-engineering studies with focus on advanced Mathematics, Physics, and analytical coursework.',
    icon: FaGraduationCap,
  },
];

const Qualification = () => {
  return (
    <div className="bg-[#030712] min-h-screen py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Visual Ambient Spot */}
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#01eeff] text-sm font-semibold uppercase tracking-[0.2em] mb-2 block text-glow-cyan">
            My Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">
            Education & <span className="text-[#01eeff] text-glow-cyan">Experience</span>
          </h2>
        </div>

        {/* Timeline container */}
        <div className="relative border-l border-gray-800 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12">
          {TIMELINE_DATA.map((item, index) => (
            <div key={index} className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-[45px] md:-left-[61px] top-1.5 w-8 h-8 rounded-full bg-[#111827] border-2 border-gray-700 flex items-center justify-center text-gray-400 group-hover:border-[#01eeff] group-hover:text-[#01eeff] group-hover:shadow-[0_0_15px_rgba(1,238,255,0.6)] transition-all duration-300 z-10">
                <item.icon className="w-4 h-4" />
              </div>

              {/* Glowing Pulse Ring for current experience */}
              {index === 0 && (
                <div className="absolute -left-[49px] md:-left-[65px] top-0.5 w-10 h-10 rounded-full border border-[#01eeff]/40 animate-ping pointer-events-none" />
              )}

              {/* Timeline Card */}
              <div className="glass-card bg-[#111827]/30 border border-white/5 p-6 rounded-xl relative shadow-lg">
                {/* Content Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                  <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-[#01eeff] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-[#01eeff] bg-[#01eeff]/10 border border-[#01eeff]/20 rounded-full w-fit">
                    {item.period}
                  </span>
                </div>

                <h4 className="text-gray-300 font-medium text-sm md:text-base mb-3 flex items-center gap-1.5">
                  {item.institution}
                </h4>

                <p className="text-gray-400 font-light text-sm md:text-base leading-relaxed">
                  {item.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Qualification;

