"use client";
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Who is Abdullah Sajid (Muhammad Abdullah)?",
    answer: "Muhammad Abdullah (popularly known as Abdullah Sajid) is a Full-Stack Web Developer, Next.js Specialist, and Software Engineering student based in Rawalpindi, Pakistan. He specializes in building high-performance web applications using React.js, Next.js, Node.js, TypeScript, Docker, and Redis.",
  },
  {
    question: "What web development services does Abdullah Sajid offer?",
    answer: "Abdullah Sajid offers full-stack web application development, custom Next.js frontend architecture, RESTful API design with Node.js & Express, database modeling (MongoDB & SQL), Redis caching integration, Docker containerization, and responsive UI/UX design prototyping using Figma.",
  },
  {
    question: "What tech stack does Abdullah Sajid specialize in?",
    answer: "His primary technical stack includes Next.js (App Router, SSR, SSG), React.js, TypeScript, JavaScript (ES6+), Tailwind CSS, Redux Toolkit, Node.js, Express, Redis, Docker, Git/GitHub, and Figma.",
  },
  {
    question: "How can I contact or hire Abdullah Sajid for software projects?",
    answer: "You can reach out directly via email at muhammadabdullahfscem@gmail.com, call +92 344 5076088, or connect on LinkedIn (in/muhammad-abdullah-7572762b9) and GitHub (Abdullah786346).",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="FAQ" className="bg-[#030712] min-h-[60vh] py-24 px-6 md:px-12 relative overflow-hidden flex flex-col justify-center items-center">
      {/* Background glow spot */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#01eeff]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl w-full z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-[#01eeff] text-sm font-semibold uppercase tracking-[0.2em] mb-2 block text-glow-cyan">
            Common Questions
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">
            Frequently Asked <span className="text-[#01eeff] text-glow-cyan">Questions</span>
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="glass-card bg-[#111827]/40 border border-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#01eeff]/20"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full p-6 text-left flex justify-between items-center space-x-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg md:text-xl font-bold text-white tracking-wide">
                    {faq.question}
                  </span>
                  <FaChevronDown
                    className={`w-5 h-5 text-[#01eeff] transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-gray-300 font-light text-sm md:text-base leading-relaxed border-t border-white/5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
