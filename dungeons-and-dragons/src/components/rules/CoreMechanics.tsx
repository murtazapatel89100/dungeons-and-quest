"use client";

import { Scale, Target } from "lucide-react";
import { motion } from "motion/react";
import { rulesData } from "@/lib/data/rulesData";

export function CoreMechanics() {
  const { advantage, dc } = rulesData.mechanics;

  return (
    <section className="relative w-full py-16">
      <div className="text-center mb-16">
        <h2 className="font-heading text-2xl md:text-4xl text-[#F9FAFB] mb-4">
          Core <span className="text-[#3B82F6]">Mechanics</span>
        </h2>
        <p className="text-[#9CA3AF] max-w-2xl mx-auto">
          The fundamental engines that drive the game's resolution system.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-4">
        {/* Advantage / Disadvantage */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-[#111827] border border-[#1F2937] rounded-2xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6]/10 rounded-bl-full -mr-16 -mt-16" />

          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="p-3 bg-[#3B82F6]/20 rounded-lg border border-[#3B82F6]/30">
              <Scale className="w-8 h-8 text-[#60A5FA]" />
            </div>
            <h3 className="font-heading md:text-3xl text-2xl text-[#F9FAFB]">
              {advantage.title}
            </h3>
          </div>

          <p className="text-[#9CA3AF] mb-6 leading-relaxed relative z-10">
            {advantage.description}
          </p>

          <ul className="space-y-4 text-[#D1D5DB] relative z-10">
            {advantage.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1">✦</span>
                <span className="leading-relaxed">{rule}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Difficulty Class (DC) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-[#111827] border border-[#1F2937] rounded-2xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B]/10 rounded-bl-full -mr-16 -mt-16" />

          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="p-3 bg-[#F59E0B]/20 rounded-lg border border-[#F59E0B]/30">
              <Target className="w-8 h-8 text-[#FBBF24]" />
            </div>
            <h3 className="font-heading md:text-3xl text-2xl text-[#F9FAFB]">
              {dc.title}
            </h3>
          </div>

          <p className="text-[#9CA3AF] mb-6 leading-relaxed relative z-10">
            {dc.description}
          </p>

          <div className="bg-[#0B0F1A] rounded-xl border border-[#1F2937] overflow-hidden relative z-10">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#1F2937]/50 text-[#F9FAFB] font-heading uppercase">
                <tr>
                  <th className="px-6 py-4 font-semibold">Task Difficulty</th>
                  <th className="px-6 py-4 font-semibold text-right">
                    DC Target
                  </th>
                </tr>
              </thead>
              <tbody>
                {dc.table.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-[#1F2937] last:border-0 hover:bg-[#1F2937]/30 transition-colors"
                  >
                    <td className="px-6 py-3 text-[#9CA3AF]">
                      {row.difficulty}
                    </td>
                    <td className="px-6 py-3 text-[#FBBF24] font-bold text-right font-mono">
                      {row.dc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
