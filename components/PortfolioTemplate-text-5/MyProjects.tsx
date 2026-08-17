"use client";
import React from 'react';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  src: string;
  repoUrl: string;
  liveUrl?: string;
}

const PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: 'Real-Time Auction System',
    description: 'A high-performance bidding web platform. Features live state syncing using WebSockets, concurrent bid queue handling, and cached auction tracking for millisecond responsiveness.',
    tech: ['Next.js', 'Node.js', 'Redis', 'Docker', 'WebSockets'],
    src: '/assets/pic 1.svg',
    repoUrl: 'https://github.com/Abdullah786346',
  },
  {
    id: 'project-2',
    title: 'Heal Me – Donation App',
    description: 'Crowdfunding platform allowing patients and contributors to list, explore, and fund healthcare campaigns. Integrated with real-time donation progress bars and verification flows.',
    tech: ['React.js', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB'],
    src: '/assets/pic 2.svg',
    repoUrl: 'https://github.com/Abdullah786346/WebisteForDonation.git',
  },
  {
    id: 'project-3',
    title: 'Poultry Science Platform',
    description: 'A comprehensive academic and operational portal providing responsive resource directories, diagnosis logs, and educational guides for poultry health management.',
    tech: ['Next.js', 'Tailwind CSS', 'Redux', 'API Integration'],
    src: '/assets/pic 3.svg',
    repoUrl: 'https://github.com/Abdullah786346',
  },
];

const ProjectGallery: React.FC = () => {
  return (
    <div className="bg-[#090f1d] min-h-screen py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Visual background spot */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#01eeff] text-sm font-semibold uppercase tracking-[0.2em] mb-2 block text-glow-cyan">
            Recent Work
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">
            My Featured <span className="text-[#01eeff] text-glow-cyan">Projects</span>
          </h2>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="glass-card bg-[#111827]/40 rounded-xl overflow-hidden border border-white/5 shadow-xl flex flex-col group"
            >
              {/* Image Container with Hover Zoom */}
              <div className="relative h-48 w-full bg-slate-950/60 overflow-hidden border-b border-white/5">
                <Image
                  src={project.src}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-4 transition-transform duration-500 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090f1d]/90 to-transparent opacity-60" />
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#01eeff] transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 font-light text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 text-xs font-semibold text-gray-300 bg-white/5 rounded-md border border-white/5 group-hover:border-[#01eeff]/10 group-hover:text-[#01eeff] transition-colors duration-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center space-x-4 border-t border-gray-800 pt-4 mt-auto">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-gray-400 hover:text-[#01eeff] text-sm font-medium transition-colors"
                  >
                    <FaGithub className="w-4 h-4" />
                    Source Code
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-gray-400 hover:text-[#01eeff] text-sm font-medium transition-colors ml-auto"
                    >
                      <FaExternalLinkAlt className="w-3.5 h-3.5" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectGallery;

