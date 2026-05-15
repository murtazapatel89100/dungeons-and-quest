"use client";

import { Shield, Skull, Sword } from "lucide-react";
import { motion } from "motion/react";
import { rulesData } from "@/lib/data/rulesData";

const iconMap = [Shield, Sword, Skull];

export function CombatAdvanced() {
  return (
    <section className="relative w-full py-16">
      <div className="text-center mb-16">
        <h2 className="font-heading text-2xl md:text-4xl text-[#F9FAFB] mb-4">
          Advanced <span className="text-[#DC2626]">Combat</span>
        </h2>
        <p className="text-[#9CA3AF] max-w-2xl mx-auto">
          Beyond simply rolling to attack, combat involves utilizing cover,
          understanding damage types, and fighting for your life when knocked
          down.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4">
        {rulesData.combat.map((section, idx) => {
          const Icon = iconMap[idx] || Shield;

          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15 }}
              className="bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden flex flex-col group hover:border-[#DC2626]/50 transition-colors duration-300 shadow-lg"
            >
              <div className="p-6 border-b border-[#1F2937] bg-[#0B0F1A]/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#DC2626]/5 rounded-full blur-xl -mr-8 -mt-8 group-hover:bg-[#DC2626]/10 transition-colors" />
                <div className="flex items-center gap-3 mb-2 relative z-10">
                  <Icon className="w-6 h-6 text-[#DC2626]" />
                  <h3 className="font-heading text-2xl text-[#F9FAFB]">
                    {section.title}
                  </h3>
                </div>
                <p className="text-[#9CA3AF] text-sm relative z-10">
                  {section.description}
                </p>
              </div>

              <div className="p-6 flex-1 bg-gradient-to-b from-[#111827] to-[#0B0F1A]">
                <ul className="space-y-6">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <h4 className="font-bold text-[#F9FAFB] mb-1 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                        {item.name}
                      </h4>
                      <p className="text-[#D1D5DB] text-sm mb-1">{item.desc}</p>
                      {item.detail && (
                        <p className="text-[#9CA3AF] text-xs italic border-l border-[#374151] pl-3 mt-2">
                          {item.detail}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
