"use client";
import React from "react";
import { motion } from "motion/react";
import { BookOpen, UserPlus, Swords } from "lucide-react";

const STEPS = [
  {
    num: "I",
    title: "Learn the Basics",
    desc: "Understand the core mechanics, races, and classes.",
    icon: BookOpen,
  },
  {
    num: "II",
    title: "Create Your Character",
    desc: "Roll your stats and forge your unique hero.",
    icon: UserPlus,
  },
  {
    num: "III",
    title: "Start Your Adventure",
    desc: "Gather your party and enter the dungeon.",
    icon: Swords,
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-6 md:px-12 bg-[#111827] relative z-20 border-y border-[#D4AF37]/20">
      {/* Texture Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1759134335060-9ae159bc3e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwcGFyY2htZW50JTIwdGV4dHVyZXxlbnwxfHx8fDE3NzQ1NDU2OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080')", backgroundSize: "cover" }}
      />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-['Cinzel'] text-3xl md:text-5xl text-[#F9FAFB] uppercase tracking-widest mb-4"
          >
            The Hero's Journey
          </motion.h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#6D28D9] to-transparent mx-auto opacity-70"></div>
          <p className="font-['Inter'] text-[#9CA3AF] mt-6 max-w-xl mx-auto">
            Embark on your quest in three simple steps.
          </p>
        </div>

        <div className="relative flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto gap-12 md:gap-0">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[48px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-[#D4AF37]/20 via-[#6D28D9]/50 to-[#DC2626]/20 z-0" />
          
          {STEPS.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="relative z-10 flex flex-col items-center w-full md:w-1/3 group"
            >
              {/* Step Circle */}
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#6D28D9] blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="w-24 h-24 rounded-full border-2 border-[#D4AF37]/50 bg-[#0B0F1A] flex items-center justify-center relative shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:border-[#D4AF37] group-hover:scale-110 transition-all duration-300">
                  <span className="absolute -top-3 bg-[#111827] px-2 font-['Cinzel'] text-[#D4AF37] font-bold text-sm border border-[#D4AF37]/50 rounded-sm">
                    {step.num}
                  </span>
                  <step.icon className="w-10 h-10 text-[#F9FAFB] group-hover:text-[#D4AF37] transition-colors" />
                </div>
              </div>

              {/* Text Content */}
              <div className="text-center px-4">
                <h3 className="font-['Cinzel'] text-xl font-bold text-[#F9FAFB] uppercase tracking-wider mb-3 group-hover:text-[#D4AF37] transition-colors">
                  {step.title}
                </h3>
                <p className="font-['Inter'] text-[#9CA3AF] text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
