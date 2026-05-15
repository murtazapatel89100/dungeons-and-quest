"use client";

import { UserPlus } from "lucide-react";
import { motion } from "motion/react";

export function CharactersHero() {
  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#0B0F1A]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage:
              "url('/images/homepage/banner/hero-character.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A]/80 via-[#0B0F1A]/60 to-[#0B0F1A] z-10" />

        {/* Magical Orbs/Portals */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#6D28D9]/20 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-6 md:mb-8 p-3 md:p-4 rounded-full border border-[#D4AF37]/30 bg-[#111827]/80 backdrop-blur-sm shadow-[0_0_50px_rgba(212,175,55,0.2)]"
        >
          <UserPlus className="w-8 h-8 md:w-12 md:h-12 text-[#D4AF37]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="font-accent text-2xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#F9FAFB] to-[#9CA3AF] drop-shadow-2xl mb-6 leading-tight"
        >
          Forge Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FBBF24] to-[#D4AF37] filter drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
            Legendary Hero
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="text-base md:text-2xl text-[#D1D5DB] max-w-3xl mx-auto mb-10 md:mb-12 font-bold leading-relaxed"
        >
          Whether you're crafting a detailed back-story or jumping straight into
          the fray, your journey begins here. Choose your path and bring your
          character to life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <button
            type="button"
            onClick={() => {
              const element = document.getElementById("wizard-start");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] hover:from-[#FBBF24] hover:to-[#D4AF37] text-[#0B0F1A] font-heading font-bold text-base md:text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            Start Creating
          </button>
        </motion.div>
      </div>

      {/* Bottom fade out */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/80 to-transparent z-10" />
    </section>
  );
}
