"use client";

import React, { useState, useCallback } from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { addDoc, collection } from "firebase/firestore";
import { db, isConfigured } from "@/lib/firebase";

const FORM_CONFIG = {
  INITIAL_STATE: {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    message: "",
  },

  MESSAGES: {
    SUCCESS:
      "Your message has been sent successfully! I will get back to you soon.",

    NETWORK_ERROR:
      "Unable to send your message. Please check your connection and try again.",

    CONFIG_ERROR:
      "Contact form is temporarily unavailable. Please email me directly.",

    DEFAULT_ERROR:
      "Failed to send message. Please try again.",
  },
};

const ContactMe: React.FC = () => {
  const [formData, setFormData] = useState(
    FORM_CONFIG.INITIAL_STATE
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Handle input changes
  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement
      >
    ) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  // Submit contact form directly to Firebase Firestore
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setIsSubmitting(true);
      setSubmitMessage("");

      try {
        // Check Firebase configuration
        if (!isConfigured || !db) {
          setSubmitMessage(
            FORM_CONFIG.MESSAGES.CONFIG_ERROR
          );
          return;
        }

        // Prepare data
        const contactData = {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          mobileNumber: formData.mobileNumber.trim(),
          email: formData.email.trim().toLowerCase(),
          message: formData.message.trim(),
          submittedAt: new Date().toISOString(),
          status: "new",
        };

        // Save directly to Firestore
        await addDoc(
          collection(db, "contact_messages"),
          contactData
        );

        // Success
        setSubmitMessage(
          FORM_CONFIG.MESSAGES.SUCCESS
        );

        // Reset form
        setFormData(FORM_CONFIG.INITIAL_STATE);
      } catch (error) {
        console.error(
          "Contact form submission error:",
          error
        );

        setSubmitMessage(
          FORM_CONFIG.MESSAGES.NETWORK_ERROR
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData]
  );

  return (
    <div className="bg-[#090f1d] min-h-screen py-24 px-6 md:px-12 relative overflow-hidden flex flex-col justify-center items-center">

      {/* Background glow */}
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Title */}
      <div className="text-center mb-16 z-10">
        <span className="text-[#01eeff] text-sm font-semibold uppercase tracking-[0.2em] mb-2 block text-glow-cyan">
          Get In Touch
        </span>

        <h2 className="text-3xl md:text-5xl font-extrabold text-white">
          Contact{" "}
          <span className="text-[#01eeff] text-glow-cyan">
            Me
          </span>
        </h2>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-5 gap-12 z-10">

        {/* Contact Information */}
        <div className="lg:col-span-2 space-y-6 flex flex-col justify-center">

          <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">
            Let&apos;s Discuss Your Project
          </h3>

          <p className="text-gray-400 font-light leading-relaxed mb-8 text-sm md:text-base">
            I am available for junior roles and internship
            engagements immediately. If you have questions or
            want to collaborate, feel free to drop a message.
          </p>

          <div className="space-y-6">

            {/* Email */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 shadow-md">

              <div className="w-12 h-12 rounded-lg bg-[#01eeff]/10 flex items-center justify-center border border-[#01eeff]/20">
                <MdEmail className="w-6 h-6 text-[#01eeff]" />
              </div>

              <div>
                <span className="text-xs text-gray-500 block uppercase font-bold tracking-wider">
                  Email Me
                </span>

                <a
                  href="mailto:muhammadabdullahfscem@gmail.com"
                  className="text-gray-200 hover:text-[#01eeff] text-sm sm:text-base transition-colors font-medium"
                >
                  muhammadabdullahfscem@gmail.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 shadow-md">

              <div className="w-12 h-12 rounded-lg bg-[#01eeff]/10 flex items-center justify-center border border-[#01eeff]/20">
                <MdPhone className="w-6 h-6 text-[#01eeff]" />
              </div>

              <div>
                <span className="text-xs text-gray-500 block uppercase font-bold tracking-wider">
                  Call Me
                </span>

                <a
                  href="tel:03445076088"
                  className="text-gray-200 hover:text-[#01eeff] text-sm sm:text-base transition-colors font-medium"
                >
                  +92 344 5076088
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 shadow-md">

              <div className="w-12 h-12 rounded-lg bg-[#01eeff]/10 flex items-center justify-center border border-[#01eeff]/20">
                <MdLocationOn className="w-6 h-6 text-[#01eeff]" />
              </div>

              <div>
                <span className="text-xs text-gray-500 block uppercase font-bold tracking-wider">
                  Location
                </span>

                <span className="text-gray-200 text-sm sm:text-base font-medium">
                  Rawalpindi, Pakistan
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3 glass-card bg-[#111827]/30 border border-white/5 rounded-xl p-8 shadow-xl">

          <form
            className="space-y-6"
            onSubmit={handleSubmit}
          >

            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              <div>
                <label
                  htmlFor="firstName"
                  className="sr-only"
                >
                  First Name
                </label>

                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full h-12 px-4 py-2 bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#01eeff]/80 focus:ring-2 focus:ring-[#01eeff]/15 text-white rounded-lg transition-all duration-300 focus:outline-none text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="sr-only"
                >
                  Last Name
                </label>

                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full h-12 px-4 py-2 bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#01eeff]/80 focus:ring-2 focus:ring-[#01eeff]/15 text-white rounded-lg transition-all duration-300 focus:outline-none text-sm"
                  required
                />
              </div>

            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              <div>
                <label
                  htmlFor="mobileNumber"
                  className="sr-only"
                >
                  Mobile Number
                </label>

                <input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="text"
                  placeholder="Phone Number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="w-full h-12 px-4 py-2 bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#01eeff]/80 focus:ring-2 focus:ring-[#01eeff]/15 text-white rounded-lg transition-all duration-300 focus:outline-none text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="sr-only"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-12 px-4 py-2 bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#01eeff]/80 focus:ring-2 focus:ring-[#01eeff]/15 text-white rounded-lg transition-all duration-300 focus:outline-none text-sm"
                  required
                />
              </div>

            </div>

            {/* Message */}
            <div>

              <label
                htmlFor="message"
                className="sr-only"
              >
                Your Message
              </label>

              <textarea
                id="message"
                name="message"
                placeholder="Write your message here..."
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#01eeff]/80 focus:ring-2 focus:ring-[#01eeff]/15 text-white rounded-lg transition-all duration-300 focus:outline-none text-sm resize-none"
                required
              />

            </div>

            {/* Status Message */}
            {submitMessage && (
              <div
                className={`text-center p-3 rounded-lg text-sm font-medium ${
                  submitMessage.includes("successfully")
                    ? "bg-green-600/25 border border-green-600/30 text-green-300"
                    : "bg-red-600/25 border border-red-600/30 text-red-300"
                }`}
              >
                {submitMessage}
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center sm:text-right">

              <button
                type="submit"
                disabled={isSubmitting}
                className="glow-btn-cyan w-full sm:w-auto px-8 py-3 bg-[#01eeff] text-gray-950 font-bold rounded-lg hover:bg-white hover:text-black transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isSubmitting
                  ? "Sending..."
                  : "Send Message"}
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
