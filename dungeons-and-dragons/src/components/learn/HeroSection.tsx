"use client";

import { BookOpen } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/homepage/banner/hero-adventure.png"
          alt="Hero Adventure Background"
          fill
          priority
          className="object-cover object-center"
          quality={10}
        />

        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0B0F1A]/80 via-[#0B0F1A]/60 to-[#0B0F1A]" />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {mounted &&
          [...Array(20)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-[#D4AF37]/40 blur-[2px]"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, -200],
                x: [0, Math.random() * 50 - 25, Math.random() * 50 - 25],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            />
          ))}
      </div>

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex justify-center mb-6"
        >
          <div className="p-4 rounded-full bg-[#111827]/80 border border-[#D4AF37]/30 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
            <BookOpen className="w-12 h-12 text-[#D4AF37]" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="font-accent text-2xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#F9FAFB] to-[#9CA3AF] drop-shadow-lg mb-6 leading-tight"
        >
          Learn the World of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FBBF24] to-[#D4AF37]">
            Dungeons & Dragons
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="text-base md:text-2xl font-bold text-[#9CA3AF] max-w-2xl mx-auto mb-10"
        >
          From your first dice roll to your first campaign. Step into a realm of
          infinite imagination and collaborative storytelling.
        </motion.p>
      </div>

      {/* Bottom fade out */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0B0F1A] to-transparent z-10" />
    </section>
  );
}
