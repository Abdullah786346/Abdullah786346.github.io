"use client";
import React, { useState } from 'react';
import { FaLaptopCode, FaServer, FaPaintBrush, FaTimes } from 'react-icons/fa';

interface Service {
  title: string;
  description: string;
  modalContent: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ServiceModal: React.FC<{ service: Service; onClose: () => void }> = ({ service, onClose }) => {
  const Icon = service.icon;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/85 backdrop-blur-sm z-50 animate-fade-in px-4">
      <div className="glass-card bg-[#0f172a]/95 border border-[#01eeff]/35 rounded-xl p-8 max-w-lg w-full relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-[#01eeff] transition-colors p-1"
          aria-label="Close modal"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-[#01eeff]/10 flex items-center justify-center border border-[#01eeff]/20">
            <Icon className="w-6 h-6 text-[#01eeff] text-glow-cyan" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-wide">{service.title}</h2>
        </div>

        <p className="text-gray-300 font-light leading-relaxed mb-6 text-sm md:text-base">
          {service.modalContent}
        </p>

        <button
          onClick={onClose}
          className="glow-btn-cyan w-full bg-[#01eeff] text-gray-950 font-bold py-2.5 rounded-lg transition duration-300 hover:bg-white hover:text-black text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default function ServicesSection() {
  const [services] = useState<Service[]>([
    {
      title: 'UI/UX Design',
      description: 'Crafting pixel-perfect interface structures using Figma and Canva, placing focus on modern responsive layout architectures.',
      modalContent: 'As a UI/UX Designer, I prioritize human-centered design principles. I construct intuitive workflows, wireframes, and high-fidelity mockups in Figma, focusing on unified design tokens, typography scale, responsive grids, and accessible contrast ratios.',
      icon: FaPaintBrush,
    },
    {
      title: 'Frontend Development',
      description: 'Creating high-performance, single-page application systems with React.js, Next.js, and utility-first Tailwind CSS.',
      modalContent: 'My core frontend skill set enables me to translate visual drafts into interactive web code. I specialize in building responsive Next.js apps with smooth state operations, Redux flow control, optimized bundle loading, and SEO indexing structures.',
      icon: FaLaptopCode,
    },
    {
      title: 'Backend Engineering',
      description: 'Building secure RESTful APIs, caching systems with Redis, and containerized configurations with Docker.',
      modalContent: 'I design server architectures using Node.js, Express, and Python. I use Redis for API caching to increase speeds, write clean relational or document storage interfaces, and package environments with Docker for reliable execution.',
      icon: FaServer,
    },
  ]);

  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleOpenModal = (service: Service) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-[#030712]">
      {/* Background glow spot */}
      <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Title */}
      <div className="text-center mb-16 z-10">
        <span className="text-[#01eeff] text-sm font-semibold uppercase tracking-[0.2em] mb-2 block text-glow-cyan">
          What I Offer
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white">
          My Professional <span className="text-[#01eeff] text-glow-cyan">Services</span>
        </h2>
      </div>

      {/* Centered Grid for Service Boxes */}
      <div className="w-full max-w-6xl flex justify-center z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="glass-card bg-[#111827]/40 rounded-xl p-8 flex flex-col items-center text-center border border-white/5 shadow-xl transition-all duration-300 hover:border-[#01eeff]/20 hover:bg-[#01eeff]/5 group"
              >
                {/* Service Icon */}
                <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#01eeff]/30 group-hover:bg-[#01eeff]/10 transition-colors duration-300">
                  <Icon className="w-8 h-8 text-gray-400 group-hover:text-[#01eeff] group-hover:scale-110 transition-all duration-300" />
                </div>

                {/* Service Title */}
                <h3 className="text-white text-xl font-bold mb-4 tracking-wide group-hover:text-[#01eeff] transition-colors">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-gray-400 font-light text-sm md:text-base leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>

                {/* Button */}
                <button
                  onClick={() => handleOpenModal(service)}
                  className="bg-transparent border border-[#01eeff]/40 text-[#01eeff] hover:bg-[#01eeff] hover:text-black font-semibold text-sm py-2 px-6 rounded-lg transition duration-300 w-full"
                >
                  Read More
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Render the modal if a service is selected */}
      {selectedService && (
        <ServiceModal service={selectedService} onClose={handleCloseModal} />
      )}
    </div>
  );
}

