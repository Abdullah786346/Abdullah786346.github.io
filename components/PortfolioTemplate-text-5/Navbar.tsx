"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Link as ScrollLink } from 'react-scroll';
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";

const OFFSET_VALUE = -70; // Adjusted for glass header height
const SCROLL_DURATION = 600;

interface NavLink {
  id: string;
  label: string;
  to: string;
}

const NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'Home', to: 'Hero' },
  { id: 'about', label: 'About', to: 'AboutUs' },
  { id: 'qualification', label: 'Resume', to: 'Qualification' },
  { id: 'services', label: 'Services', to: 'OurServices' },
  { id: 'projects', label: 'Projects', to: 'MyProjects' },
  { id: 'contact', label: 'Contact', to: 'ContactMe' },
];

interface ScrollNavLinkProps {
  to: string;
  label: string;
  className?: string;
  onClick?: () => void;
}

const ScrollNavLink: React.FC<ScrollNavLinkProps> = ({ to, label, className = '', onClick }) => (
  <ScrollLink
    activeClass="text-[#01eeff] text-glow-cyan font-semibold border-b-2 border-[#01eeff]"
    to={to}
    spy
    smooth
    offset={OFFSET_VALUE}
    duration={SCROLL_DURATION}
    className={`text-gray-300 hover:text-[#01eeff] hover:text-glow-cyan transition-all duration-300 cursor-pointer py-1 px-1 text-sm md:text-[15px] font-medium tracking-wide ${className}`}
    onClick={onClick}
  >
    {label}
  </ScrollLink>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full glass-panel bg-[#030712]/70 text-white z-50 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 text-xl font-bold tracking-wider text-white hover:opacity-90 transition-opacity">
          <span className="text-[#01eeff] text-glow-cyan">M.</span>
          <span>Abdullah</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map(link => (
            <ScrollNavLink key={link.id} to={link.to} label={link.label} />
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#01eeff] p-2 hover:bg-white/5 rounded-full transition-colors focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? (
            <GiCancel className="w-6 h-6" />
          ) : (
            <GiHamburgerMenu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-0 left-0 w-full h-screen bg-[#030712]/95 backdrop-blur-xl text-white p-6 z-50 flex flex-col justify-center animate-fade-in">
          <button
            className="absolute right-6 top-6 text-[#01eeff] p-2 hover:bg-white/5 rounded-full transition-colors"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <GiCancel className="w-6 h-6" />
          </button>
          
          <div className="flex flex-col items-center space-y-8 mt-8">
            <Link href="/" className="text-3xl font-bold tracking-wider text-white mb-6" onClick={closeMenu}>
              <span className="text-[#01eeff] text-glow-cyan">M.</span>Abdullah
            </Link>
            {NAV_LINKS.map(link => (
              <ScrollNavLink
                key={link.id}
                to={link.to}
                label={link.label}
                className="text-2xl py-2"
                onClick={closeMenu}
              />
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;