"use client";

import { motion } from "motion/react";
import { Gamepad2, Dices, Drama, Swords, Globe, Sparkles } from "lucide-react";
import { experienceData } from "@/lib/data/experienceData";

const iconMap: Record<string, any> = {
  Gamepad2,
  Dices,
  Drama,
  Swords,
  Globe,
  Sparkles,
};

export function ExperienceCards() {
  return (
    <section id="experiences" className="py-24 bg-[#0B0F1A] relative z-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-['Cinzel'] text-4xl md:text-5xl text-[#F9FAFB] mb-6"
          >
            The Realms of <span className="text-[#D4AF37]">Play</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#9CA3AF] text-xl max-w-2xl mx-auto"
          >
            Select a path below to discover how it shapes your adventure.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experienceData.experiences.map((exp, index) => {
            const Icon = iconMap[exp.iconType] || Sparkles;
            
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-[#111827] border border-[#1F2937] hover:border-transparent rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Dynamic Glowing Background */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${exp.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: exp.themeColor }} />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center bg-[#0B0F1A] border border-[#1F2937] group-hover:scale-110 transition-transform duration-500 shadow-lg"
                      style={{ borderColor: `${exp.themeColor}40` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: exp.themeColor }} />
                    </div>
                    <div>
                      <h3 className="font-['Cinzel'] text-2xl text-[#F9FAFB] group-hover:text-white transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-sm italic" style={{ color: exp.themeColor }}>
                        {exp.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-[#D1D5DB] leading-relaxed mb-6 flex-grow relative z-10">
                    {exp.description}
                  </p>

                  <div className="space-y-4 relative z-10">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-2">Key Features</h4>
                      <ul className="space-y-1">
                        {exp.topics.slice(0, 3).map((topic, i) => (
                          <li key={i} className="text-sm text-[#9CA3AF] flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: exp.themeColor }} />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[#1F2937]/50">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF] mb-2">Popular Examples</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.examples.map((ex, i) => (
                          <span 
                            key={i} 
                            className="text-xs px-2 py-1 rounded bg-[#0B0F1A] border border-[#1F2937] text-[#D1D5DB]"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
