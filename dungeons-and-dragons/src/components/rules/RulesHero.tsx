"use client";

import { Scroll } from "lucide-react";
import { motion } from "motion/react";

export function RulesHero() {
  return (
    <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/homepage/banner/hero-rules.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A]/90 via-[#0B0F1A]/70 to-[#0B0F1A] z-10" />
      </div>

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex justify-center mb-6"
        >
          <div className="p-4 rounded-full bg-[#111827]/80 border border-[#10B981]/30 shadow-[0_0_40px_rgba(16,185,129,0.15)] relative">
            <div className="absolute inset-0 bg-[#10B981]/20 rounded-full blur-md animate-pulse" />
            <Scroll className="w-12 h-12 text-[#10B981] relative z-10" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="font-['Cinzel'] text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#F9FAFB] to-[#9CA3AF] drop-shadow-lg mb-6 leading-tight"
        >
          The Master's <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#10B981]">
            Codex
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="text-xl md:text-2xl text-[#9CA3AF] max-w-2xl mx-auto mb-10 font-light"
        >
          A reference guide to the core mechanics, conditions, and environmental
          rules that govern the world.
        </motion.p>
      </div>

      {/* Bottom fade out */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0B0F1A] to-transparent z-10" />
    </section>
  );
}
