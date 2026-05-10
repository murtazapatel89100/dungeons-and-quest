"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-16 px-6 lg:px-12 text-center flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1759134335060-9ae159bc3e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwcGFyY2htZW50JTIwdGV4dHVyZXxlbnwxfHx8fDE3NzQ1NDU2OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080')",
        }}
      />
      <div className="relative z-10 p-12 bg-[#111827]/80 backdrop-blur-md rounded-sm border border-[#D4AF37]/30 shadow-[0_0_30px_rgba(109,40,217,0.2)]">
        <h1 className="text-4xl md:text-5xl font-['Cinzel'] text-[#F9FAFB] uppercase tracking-widest mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {title}
        </h1>
        <p className="text-[#9CA3AF] font-['Inter'] text-lg">
          This section of the grimoire is currently sealed.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-block px-6 py-2 border border-[#D4AF37] text-[#D4AF37] font-['Cinzel'] uppercase tracking-wider hover:bg-[#D4AF37]/10 transition-colors duration-300 shadow-[0_0_10px_rgba(212,175,55,0.2)]"
          >
            Return to Map
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
