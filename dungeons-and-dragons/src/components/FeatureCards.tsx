"use client";
import React from "react";
import { BookOpen, UserPlus, FileText, Wand2 } from "lucide-react";
import { motion } from "motion/react";

const FEATURES = [
  {
    title: "Learn Basics",
    description: "Master the core concepts of tabletop roleplaying.",
    icon: BookOpen,
    color: "from-[#D4AF37]/20 to-transparent",
    border: "border-[#D4AF37]/40",
    shadow: "hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]",
  },
  {
    title: "Character Creation",
    description: "Forge unique heroes with rich backgrounds and stats.",
    icon: UserPlus,
    color: "from-[#6D28D9]/20 to-transparent",
    border: "border-[#6D28D9]/40",
    shadow: "hover:shadow-[0_0_25px_rgba(109,40,217,0.3)]",
  },
  {
    title: "Rules & Mechanics",
    description: "Dive deep into combat, spells, and skill checks.",
    icon: FileText,
    color: "from-[#DC2626]/20 to-transparent",
    border: "border-[#DC2626]/40",
    shadow: "hover:shadow-[0_0_25px_rgba(220,38,38,0.3)]",
  },
  {
    title: "Tools & Generators",
    description: "Access dice rollers, name generators, and more.",
    icon: Wand2,
    color: "from-[#059669]/20 to-transparent",
    border: "border-[#059669]/40",
    shadow: "hover:shadow-[0_0_25px_rgba(5,150,105,0.3)]",
  }
];

export function FeatureCards() {
  return (
    <section className="py-24 px-6 md:px-12 bg-[#0B0F1A] relative z-20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-['Cinzel'] text-3xl md:text-5xl text-[#F9FAFB] uppercase tracking-widest mb-4">
            The Grimoire's Knowledge
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto opacity-50"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className={`relative bg-[#111827] border ${feature.border} p-8 rounded-sm group overflow-hidden transition-all duration-300 ${feature.shadow}`}
            >
              <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${feature.color} opacity-30 group-hover:opacity-60 transition-opacity duration-500`} />
              
              {/* Parchment texture overlay */}
              <div className="absolute inset-0 mix-blend-overlay opacity-10 pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1759134335060-9ae159bc3e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwcGFyY2htZW50JTIwdGV4dHVyZXxlbnwxfHx8fDE3NzQ1NDU2OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080')" }} />

              <div className="relative z-10 flex flex-col items-center text-center h-full">
                <div className="mb-6 p-4 border border-[#D4AF37]/30 rounded-full bg-[#0B0F1A]/50 backdrop-blur-sm group-hover:scale-110 transition-transform duration-500 shadow-inner">
                  <feature.icon className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="font-['Cinzel'] text-xl font-bold text-[#F9FAFB] uppercase tracking-wider mb-4 group-hover:text-[#D4AF37] transition-colors">
                  {feature.title}
                </h3>
                <p className="font-['Inter'] text-[#9CA3AF] text-sm leading-relaxed flex-grow">
                  {feature.description}
                </p>
                
                <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-['Cinzel'] text-[#D4AF37] text-xs uppercase tracking-widest">Explore</span>
                  <div className="w-4 h-[1px] bg-[#D4AF37]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
