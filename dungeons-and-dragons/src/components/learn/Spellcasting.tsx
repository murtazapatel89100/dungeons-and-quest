"use client";

import {
  Flame,
  Hand,
  Heart,
  type LucideIcon,
  Shield,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { learnData } from "@/lib/data/learnData";

const getSpellIcon = (iconName: string) => {
  const icons: Record<string, LucideIcon> = { Flame, Hand, Heart, Shield };
  const IconComponent = icons[iconName] || Sparkles;
  return <IconComponent className="w-8 h-8" />;
};

export function Spellcasting() {
  return (
    <section className="relative w-full py-16">
      <div className="text-center mb-16">
        <h2 className="font-['Cinzel'] text-4xl text-[#F9FAFB] mb-4">
          Wielding <span className="text-[#6D28D9]">Magic</span>
        </h2>
        <p className="text-[#9CA3AF] max-w-2xl mx-auto">
          The weave of magic permeates the world. Learn how to harness it, from
          simple cantrips to world-altering spells.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mb-16 grid md:grid-cols-3 gap-8">
        {/* Magic Concepts */}
        <div className="bg-[#111827] border border-[#1F2937] p-6 rounded-xl border-t-2 border-t-[#6D28D9]">
          <h3 className="font-['Cinzel'] text-xl text-[#F9FAFB] mb-3">
            Cantrips
          </h3>
          <p className="text-[#9CA3AF] text-sm">
            Simple, well-practiced spells that can be cast at will without
            expending any resources. They are your magical bread and butter.
          </p>
        </div>
        <div className="bg-[#111827] border border-[#1F2937] p-6 rounded-xl border-t-2 border-t-[#6D28D9]">
          <h3 className="font-['Cinzel'] text-xl text-[#F9FAFB] mb-3">
            Spell Slots
          </h3>
          <p className="text-[#9CA3AF] text-sm">
            Think of these as your "mana." Powerful spells require a spell slot
            to cast. You have a limited number that replenish upon resting.
          </p>
        </div>
        <div className="bg-[#111827] border border-[#1F2937] p-6 rounded-xl border-t-2 border-t-[#6D28D9]">
          <h3 className="font-['Cinzel'] text-xl text-[#F9FAFB] mb-3">
            Concentration
          </h3>
          <p className="text-[#9CA3AF] text-sm">
            Some ongoing spells require active focus. If you take damage while
            concentrating, you must roll to see if you drop the spell.
          </p>
        </div>
      </div>

      <h3 className="font-['Cinzel'] text-2xl text-center text-[#D4AF37] mb-8">
        Spellbook Showcase
      </h3>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {learnData.spells.map((spell, idx) => (
          <motion.div
            key={spell.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.1 }}
            className="group relative h-full perspective-[1000px]"
          >
            {/* The Card */}
            <div className="bg-gradient-to-b from-[#1F2937] to-[#0B0F1A] border border-[#374151] rounded-xl p-6 h-full flex flex-col relative overflow-hidden transition-transform duration-500 group-hover:shadow-[0_0_30px_rgba(109,40,217,0.3)] group-hover:-translate-y-2">
              {/* Magical Background effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#6D28D9]/20 rounded-full blur-[40px] -mr-16 -mt-16 group-hover:bg-[#6D28D9]/40 transition-colors duration-500" />

              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="p-3 bg-[#111827] rounded-lg border border-[#374151] text-[#A78BFA] group-hover:text-[#D4AF37] group-hover:border-[#D4AF37]/50 transition-colors duration-300">
                  {getSpellIcon(spell.visualIcon)}
                </div>
                <div className="text-right">
                  <span className="block text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                    {spell.level}
                  </span>
                  <span className="block text-xs text-[#9CA3AF]">
                    {spell.school}
                  </span>
                </div>
              </div>

              <h4 className="font-['Cinzel'] text-2xl text-[#F9FAFB] mb-2 relative z-10">
                {spell.name}
              </h4>

              <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-[#9CA3AF] border-y border-[#1F2937] py-2 relative z-10">
                <div>
                  <span className="font-bold text-[#D1D5DB]">Time:</span>{" "}
                  {spell.castingTime}
                </div>
                <div>
                  <span className="font-bold text-[#D1D5DB]">Duration:</span>{" "}
                  {spell.duration}
                </div>
              </div>

              <p className="text-sm text-[#E5E7EB] leading-relaxed relative z-10 flex-grow">
                {spell.description}
              </p>

              {/* Overlay gradient for text readability if too long */}
              <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#0B0F1A] to-transparent pointer-events-none" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
