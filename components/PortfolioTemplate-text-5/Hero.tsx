"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { HiOutlineDocumentDownload } from 'react-icons/hi';
import { Link as ScrollLink } from 'react-scroll';

const ROLES = ["Full-Stack Developer", "Frontend Engineer", "Next.js Specialist", "UI/UX Designer"];
const TYPING_SPEED = 120;
const DELETING_SPEED = 60;
const PAUSE_DURATION = 1500;

const Hero = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    const tick = () => {
      const i = loopNum % ROLES.length;
      const fullText = ROLES[i];
      const updatedText = isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === fullText) {
        setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const delay = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    const ticker = setInterval(tick, delay);
    return () => clearInterval(ticker);
  }, [text, isDeleting, loopNum]);

  return (
    <div className="relative bg-[#030712] min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
      {/* Visual Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#01eeff]/10 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] animate-pulse-glow" />

      <div className="flex flex-col-reverse md:flex-row items-center max-w-7xl mx-auto w-full z-10 gap-12 md:gap-8 pt-20">
        {/* Text Content */}
        <div className="text-left md:w-1/2 flex flex-col justify-center">
          <span className="text-[#01eeff] text-glow-cyan text-xs sm:text-sm md:text-base font-semibold uppercase tracking-[0.2em] mb-2">
            Welcome to my World
          </span>
          <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-wide mb-1 leading-none">
            Hello, It&apos;s Me
          </h1>
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 leading-tight">
            Muhammad Abdullah
          </h2>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl mb-3 font-medium min-h-[36px]">
            I&apos;m a <span className="text-[#01eeff] text-glow-cyan font-bold">{text}</span>
            <span className="animate-pulse text-[#01eeff]">|</span>
          </p>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-lg mb-6 leading-relaxed">
            A passionate engineer dedicated to building responsive, scalable full-stack web applications and exceptional user experiences.
          </p>

          {/* Social Links & Action Button */}
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="/Abdullah-best.pdf"
              download="Muhammad_Abdullah_CV.pdf"
              className="glow-btn-cyan flex items-center gap-2 bg-[#01eeff] text-gray-950 font-bold px-6 py-3 rounded-lg hover:bg-white hover:text-black transition duration-300 text-sm sm:text-base"
            >
              <HiOutlineDocumentDownload className="w-5 h-5" />
              Download CV
            </a>

            <div className="flex items-center space-x-4">
              <a
                href="https://www.linkedin.com/in/muhammad-abdullah-7572762b9"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-11 h-11 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-[#01eeff] hover:border-[#01eeff] hover:shadow-[0_0_15px_rgba(1,238,255,0.4)] transition-all duration-300"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/Abdullah786346"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-11 h-11 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-[#01eeff] hover:border-[#01eeff] hover:shadow-[0_0_15px_rgba(1,238,255,0.4)] transition-all duration-300"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center items-center">
          <div className="relative group">
            {/* Spinning/pulsing aura background */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#01eeff] to-blue-600 opacity-60 blur-md group-hover:opacity-100 group-hover:blur-lg transition duration-1000 group-hover:duration-200 animate-pulse" />
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden border-2 border-[#01eeff] shadow-[0_0_30px_rgba(1,238,255,0.3)] bg-gray-950 flex justify-center items-center">
              <Image
                src="/assets/goodimage.png"
                alt="Muhammad Abdullah"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden sm:flex flex-col items-center cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
        <ScrollLink to="AboutUs" spy smooth offset={-70} duration={600}>
          <div className="w-[30px] h-[50px] rounded-3xl border-2 border-gray-500 flex justify-center p-1.5 hover:border-[#01eeff] hover:shadow-[0_0_10px_rgba(1,238,255,0.3)] transition-colors">
            <div className="w-[6px] h-[10px] rounded-full bg-[#01eeff] animate-bounce" />
          </div>
        </ScrollLink>
      </div>
    </div>
  );
};

export default Hero;

