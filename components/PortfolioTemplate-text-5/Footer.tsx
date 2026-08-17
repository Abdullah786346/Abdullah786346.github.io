"use client";

import React, { useState } from "react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db, isConfigured } from "@/lib/firebase";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState("");

  const handleNewsletterSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      setSubscriptionMessage("Please enter a valid email address.");
      return;
    }

    setIsSubscribing(true);
    setSubscriptionMessage("");

    try {
      // Check Firebase configuration
      if (!isConfigured || !db) {
        setSubscriptionMessage(
          "Newsletter is temporarily unavailable. Please try again later."
        );
        return;
      }

      // Check if email already exists
      const subscribersRef = collection(db, "newsletter_subscribers");

      const existingQuery = query(
        subscribersRef,
        where("email", "==", trimmedEmail)
      );

      const existingSnapshot = await getDocs(existingQuery);

      if (!existingSnapshot.empty) {
        setSubscriptionMessage(
          "This email is already subscribed to our newsletter."
        );
        return;
      }

      // Save subscriber directly to Firebase Firestore
      await addDoc(subscribersRef, {
        email: trimmedEmail,
        subscribedAt: new Date().toISOString(),
        status: "active",
      });

      // Success
      setSubscriptionMessage(
        "Successfully subscribed to newsletter!"
      );

      setEmail("");
    } catch (error) {
      console.error(
        "Newsletter subscription error:",
        error
      );

      setSubscriptionMessage(
        "Unable to subscribe. Please check your connection and try again."
      );
    } finally {
      setIsSubscribing(false);
    }
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: FaLinkedinIn,
      href: "https://www.linkedin.com/in/muhammad-abdullah-7572762b9",
      label: "LinkedIn",
    },
    {
      icon: FaGithub,
      href: "https://github.com/Abdullah786346",
      label: "GitHub",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "#Hero" },
    { name: "About", href: "#AboutUs" },
    { name: "Resume", href: "#Qualification" },
    { name: "Services", href: "#OurServices" },
    { name: "Projects", href: "#MyProjects" },
    { name: "Contact", href: "#ContactMe" },
  ];

  const services = [
    "UI/UX Design",
    "Frontend Development",
    "Backend Engineering",
    "Next.js Development",
    "Responsive Design",
  ];

  return (
    <footer className="bg-[#030712] border-t border-white/5 text-white">

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* About Section */}
          <div className="space-y-6">

            <h3 className="text-xl font-bold tracking-wide">
              <span className="text-[#01eeff] text-glow-cyan">
                M.
              </span>
              Abdullah
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed font-light">
              BS Computer Science student & Full-Stack Developer
              specializing in React/Next.js, Node.js, Redis,
              Docker, and clean interactive designs.
            </p>

            <div className="space-y-3 pt-2">

              {/* Email */}
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <MdEmail className="text-[#01eeff] w-4 h-4" />

                <a
                  href="mailto:muhammadabdullahfscem@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  muhammadabdullahfscem@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <MdPhone className="text-[#01eeff] w-4 h-4" />

                <a
                  href="tel:03445076088"
                  className="hover:text-white transition-colors"
                >
                  +92 344 5076088
                </a>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <MdLocationOn className="text-[#01eeff] w-4 h-4" />

                <span>
                  Rawalpindi, Pakistan
                </span>
              </div>

            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">

            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 border-l-2 border-[#01eeff] pl-3">
              Quick Links
            </h4>

            <ul className="space-y-3 font-light text-sm">

              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#01eeff] transition duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}

            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">

            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 border-l-2 border-[#01eeff] pl-3">
              Services
            </h4>

            <ul className="space-y-3 font-light text-sm text-gray-400">

              {services.map((service, index) => (
                <li key={index}>
                  {service}
                </li>
              ))}

            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">

            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 border-l-2 border-[#01eeff] pl-3">
              Newsletter
            </h4>

            <p className="text-gray-400 text-sm font-light">
              Subscribe to receive technical guides and project
              updates.
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="space-y-3"
            >

              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSubscriptionMessage("");
                }}
                placeholder="Enter your email"
                required
                disabled={isSubscribing}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#01eeff]/80 focus:ring-2 focus:ring-[#01eeff]/15 text-white rounded-lg transition-all duration-300 focus:outline-none text-sm disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={isSubscribing}
                className="glow-btn-cyan w-full bg-[#01eeff] text-gray-950 font-bold py-2.5 rounded-lg hover:bg-white hover:text-black transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isSubscribing
                  ? "Subscribing..."
                  : "Subscribe"}
              </button>

            </form>

            {subscriptionMessage && (
              <p
                className={`text-xs ${
                  subscriptionMessage.includes(
                    "Successfully"
                  )
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {subscriptionMessage}
              </p>
            )}

          </div>
        </div>
      </div>

      {/* Social Links & Copyright */}
      <div className="border-t border-white/5 bg-[#020617]/50">

        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Social Links */}
          <div className="flex space-x-4">

            {socialLinks.map((social, index) => {
              const Icon = social.icon;

              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#01eeff]/10 hover:border-[#01eeff] hover:shadow-[0_0_15px_rgba(1,238,255,0.4)] transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}

          </div>

          {/* Copyright */}
          <div className="text-center md:text-right font-light text-xs text-gray-500">

            <p>
              © {currentYear} Muhammad Abdullah.
              All rights reserved.
            </p>

            <p className="mt-1">
              Built with Next.js & Tailwind CSS
            </p>

          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;
