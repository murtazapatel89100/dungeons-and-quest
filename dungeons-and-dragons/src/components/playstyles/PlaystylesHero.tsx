"use client";

import { Compass } from "lucide-react";
import { motion } from "motion/react";

export function PlaystylesHero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0B0F1A]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage:
              "url('/images/homepage/banner/hero-playstyle.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A]/80 via-[#0B0F1A]/60 to-[#0B0F1A] z-10" />

        {/* Magical Orbs/Portals */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2563EB]/20 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6D28D9]/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
      </div>

      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-8 p-4 rounded-full border border-[#D4AF37]/30 bg-[#111827]/80 backdrop-blur-sm shadow-[0_0_50px_rgba(212,175,55,0.2)]"
        >
          <Compass className="w-12 h-12 text-[#D4AF37]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="font-['Cinzel'] text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#F9FAFB] to-[#9CA3AF] drop-shadow-2xl mb-6 leading-tight"
        >
          Choose Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FBBF24] to-[#D4AF37] filter drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
            Adventure
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="text-xl md:text-2xl text-[#D1D5DB] max-w-3xl mx-auto mb-12 font-light leading-relaxed"
        >
          From tabletop storytelling to cinematic RPGs, discover the path that
          fits your style. The world of Dungeons & Dragons is vast—how will you
          explore it?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("paths")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] hover:from-[#FBBF24] hover:to-[#D4AF37] text-[#0B0F1A] font-['Cinzel'] font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            Explore Paths
          </button>
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("quiz")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-4 bg-[#111827]/80 hover:bg-[#1F2937] backdrop-blur-md border border-[#374151] hover:border-[#D4AF37]/50 text-[#F9FAFB] font-['Cinzel'] font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Find Your Playstyle
          </button>
        </motion.div>
      </div>

      {/* Bottom fade out */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/80 to-transparent z-10" />
    </section>
  );
}
