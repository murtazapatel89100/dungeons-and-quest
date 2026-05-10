"use client";

import { motion } from "motion/react";
import { experienceData } from "@/lib/data/experienceData";

const scoreColors: Record<string, string> = {
  "Low": "text-gray-500",
  "Medium": "text-yellow-500",
  "High": "text-green-400",
  "Very High": "text-purple-400 font-bold",
};

export function ComparisonTable() {
  return (
    <section className="py-24 bg-[#111827] relative border-t border-[#1F2937]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-['Cinzel'] text-4xl text-[#F9FAFB] mb-4"
          >
            Compare <span className="text-[#D4AF37]">Experiences</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#9CA3AF] max-w-2xl mx-auto"
          >
            At a glance, see which path offers the mechanics and social environment you crave.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto rounded-2xl border border-[#1F2937] shadow-2xl bg-[#0B0F1A]"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1F2937]/50 border-b border-[#374151]">
                <th className="p-6 font-['Cinzel'] text-[#D4AF37] text-lg font-bold">Experience</th>
                <th className="p-6 font-['Cinzel'] text-[#F9FAFB] text-sm uppercase tracking-wider">Social Level</th>
                <th className="p-6 font-['Cinzel'] text-[#F9FAFB] text-sm uppercase tracking-wider">Combat Focus</th>
                <th className="p-6 font-['Cinzel'] text-[#F9FAFB] text-sm uppercase tracking-wider">Roleplay Focus</th>
                <th className="p-6 font-['Cinzel'] text-[#F9FAFB] text-sm uppercase tracking-wider">Beginner Friendly</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F2937]">
              {experienceData.comparisonData.map((stat, index) => (
                <tr 
                  key={stat.id} 
                  className="hover:bg-[#1F2937]/30 transition-colors duration-300 group"
                >
                  <td className="p-6 font-['Cinzel'] text-[#F9FAFB] font-bold group-hover:text-[#D4AF37] transition-colors">
                    {stat.name}
                  </td>
                  <td className={`p-6 ${scoreColors[stat.social]}`}>{stat.social}</td>
                  <td className={`p-6 ${scoreColors[stat.combat]}`}>{stat.combat}</td>
                  <td className={`p-6 ${scoreColors[stat.roleplay]}`}>{stat.roleplay}</td>
                  <td className={`p-6 ${scoreColors[stat.beginnerFriendly]}`}>{stat.beginnerFriendly}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
