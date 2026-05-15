"use client";

import {
  BookMarked,
  Compass,
  Dices,
  Map as MapIcon,
  MessageSquare,
  ScrollText,
  Swords,
  Users,
  Wand2,
} from "lucide-react";
import { motion } from "motion/react";

const chapters = [
  { id: "01", title: "What is DnD?", icon: Users, targetId: "intro" },
  { id: "02", title: "Understanding Dice", icon: Dices, targetId: "dice" },
  {
    id: "03",
    title: "Character Creation",
    icon: Compass,
    targetId: "character",
  },
  { id: "04", title: "Combat Basics", icon: Swords, targetId: "combat" },
  { id: "05", title: "Magic & Spells", icon: Wand2, targetId: "magic" },
  {
    id: "06",
    title: "Roleplaying",
    icon: MessageSquare,
    targetId: "roleplaying",
  },
  { id: "07", title: "Campaigns", icon: MapIcon, targetId: "campaigns" },
  { id: "08", title: "Glossary", icon: BookMarked, targetId: "glossary" },
  { id: "09", title: "Adventure", icon: ScrollText, targetId: "adventure" },
];

export function JourneyNavigator() {
  const scrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 100; // Offset for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full py-16">
      <div className="text-center mb-12">
        <h2 className="font-heading text-2xl md:text-4xl text-[#D4AF37] mb-4">
          Your Journey Begins
        </h2>
        <p className="text-[#9CA3AF] font-sans max-w-2xl mx-auto">
          Follow the path to master the rules and concepts of Dungeons &
          Dragons.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto flex flex-wrap justify-center gap-6 px-4">
        {/* Connecting Line (Desktop only for simplicity in MVP, could use SVG for complex curves) */}
        <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent -translate-y-1/2 z-0" />

        {chapters.map((chapter, index) => {
          const Icon = chapter.icon;
          return (
            <motion.div
              role="button"
              tabIndex={0}
              key={chapter.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => scrollToSection(chapter.targetId)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  scrollToSection(chapter.targetId);
                }
              }}
              className="relative z-10 flex flex-col items-center group cursor-pointer w-28 md:w-32 outline-hidden"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#111827] border-2 border-[#1F2937] group-hover:border-[#D4AF37] shadow-lg flex items-center justify-center mb-4 transition-colors duration-300 relative">
                {/* Number Badge */}
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#6D28D9] text-white text-xs font-bold flex items-center justify-center border border-[#111827]">
                  {chapter.id}
                </div>
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/10 blur-md transition-all duration-300" />
                <Icon className="w-8 h-8 text-[#9CA3AF] group-hover:text-[#D4AF37] transition-colors duration-300 z-10" />
              </div>
              <h3 className="text-center font-heading text-sm md:text-base text-[#9CA3AF] group-hover:text-[#F9FAFB] transition-colors duration-300">
                {chapter.title}
              </h3>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
