"use client";
import React, { useState } from "react";
import { Dice5, UserCog, Users } from "lucide-react";
import { motion } from "motion/react";
import { DiceRollerModal } from "./DiceRollerModal";

const TOOLS = [
  {
    title: "Dice Roller",
    description: "Roll standard d4 to d100 with advantage/disadvantage toggles.",
    icon: Dice5,
    cta: "Roll Dice",
    color: "#6D28D9",
  },
  {
    title: "Character Generator",
    description: "Instantly create level-appropriate NPCs with full stat blocks.",
    icon: UserCog,
    cta: "Generate",
    color: "#D4AF37",
  },
  {
    title: "Encounter Builder",
    description: "Balance encounters for your party's level and create epic battles.",
    icon: Users,
    cta: "Build",
    color: "#DC2626",
  },
];

export function ToolHighlights() {
  const [isDiceModalOpen, setIsDiceModalOpen] = useState(false);

  return (
    <section className="py-24 px-6 md:px-12 bg-[#0B0F1A] relative z-20">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div className="text-left mb-8 md:mb-0">
            <h2 className="font-['Cinzel'] text-3xl md:text-5xl text-[#F9FAFB] uppercase tracking-widest mb-4">
              Arcane Tools
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-transparent opacity-70"></div>
            <p className="font-['Inter'] text-[#9CA3AF] mt-6 max-w-xl">
              Equip yourself with magical artifacts designed to enhance your campaign.
            </p>
          </div>
          
          <button className="px-6 py-2 border border-[#D4AF37] text-[#D4AF37] font-['Cinzel'] uppercase tracking-wider hover:bg-[#D4AF37]/10 transition-colors duration-300 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
            View All Tools
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {TOOLS.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.01 }}
              className="group relative bg-[#111827] border border-[#1F2937] hover:border-[#D4AF37]/50 rounded-sm p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 overflow-hidden"
            >
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111827] opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ backgroundImage: `linear-gradient(to right, transparent, ${tool.color})` }}
              />

              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 relative z-10 w-full flex-grow">
                <div 
                  className="w-16 h-16 flex-shrink-0 border border-[#1F2937] group-hover:border-[#D4AF37]/50 rounded-sm flex items-center justify-center bg-[#0B0F1A] transition-colors duration-300"
                  style={{ boxShadow: `0 0 15px ${tool.color}30` }}
                >
                  <tool.icon className="w-8 h-8 text-[#9CA3AF] group-hover:text-[#F9FAFB] transition-colors duration-300" style={{ filter: `drop-shadow(0 0 5px ${tool.color}80)` }} />
                </div>
                
                <div className="flex-grow">
                  <h3 className="font-['Cinzel'] text-xl font-bold text-[#F9FAFB] uppercase tracking-wider mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                    {tool.title}
                  </h3>
                  <p className="font-['Inter'] text-[#9CA3AF] text-sm leading-relaxed max-w-2xl">
                    {tool.description}
                  </p>
                </div>
              </div>

              <div className="relative z-10 mt-4 md:mt-0 w-full md:w-auto flex-shrink-0">
                <button 
                  onClick={() => {
                    if (tool.title === "Dice Roller") {
                      setIsDiceModalOpen(true);
                    }
                  }}
                  className="w-full md:w-auto px-8 py-3 bg-[#0B0F1A] border border-[#1F2937] group-hover:border-[#D4AF37] text-[#F9FAFB] group-hover:text-[#D4AF37] font-['Cinzel'] uppercase tracking-widest text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] whitespace-nowrap"
                >
                  {tool.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <DiceRollerModal 
          isOpen={isDiceModalOpen} 
          onClose={() => setIsDiceModalOpen(false)} 
        />
      </div>
    </section>
  );
}
