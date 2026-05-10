"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { rulesData } from "@/lib/data/rulesData";
import { Flame, Eye, MountainSnow } from "lucide-react";

export function EnvironmentRules() {
  const [activeTab, setActiveTab] = useState<"resting" | "vision" | "hazards">("resting");
  const { resting, vision, hazards } = rulesData.environment;

  return (
    <section className="relative w-full py-16">
      <div className="text-center mb-12">
        <h2 className="font-['Cinzel'] text-4xl text-[#F9FAFB] mb-4">
          The <span className="text-[#10B981]">Environment</span>
        </h2>
        <p className="text-[#9CA3AF] max-w-2xl mx-auto">
          The world is a dangerous place. Surviving means knowing when to rest, how to see in the dark, and how to avoid deadly hazards.
        </p>
      </div>

      <div className="max-w-5xl mx-auto bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[400px]">
        
        {/* Sidebar / Tabs */}
        <div className="md:w-64 bg-[#0B0F1A] p-6 border-r border-[#1F2937] flex flex-col gap-4">
          <button 
            onClick={() => setActiveTab("resting")}
            className={`p-4 rounded-xl text-left font-['Cinzel'] transition-all flex items-center gap-3 ${
              activeTab === "resting" ? "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]" : "text-[#9CA3AF] hover:bg-[#1F2937] border border-transparent"
            }`}
          >
            <Flame className="w-5 h-5" /> Resting
          </button>
          <button 
            onClick={() => setActiveTab("vision")}
            className={`p-4 rounded-xl text-left font-['Cinzel'] transition-all flex items-center gap-3 ${
              activeTab === "vision" ? "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]" : "text-[#9CA3AF] hover:bg-[#1F2937] border border-transparent"
            }`}
          >
            <Eye className="w-5 h-5" /> Vision & Light
          </button>
          <button 
            onClick={() => setActiveTab("hazards")}
            className={`p-4 rounded-xl text-left font-['Cinzel'] transition-all flex items-center gap-3 ${
              activeTab === "hazards" ? "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]" : "text-[#9CA3AF] hover:bg-[#1F2937] border border-transparent"
            }`}
          >
            <MountainSnow className="w-5 h-5" /> Hazards
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-10 relative overflow-hidden bg-gradient-to-br from-[#111827] to-[#0B0F1A]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col"
            >
              {activeTab === "resting" && (
                <div>
                  <h3 className="font-['Cinzel'] text-3xl text-[#F9FAFB] mb-4">{resting.title}</h3>
                  <p className="text-[#9CA3AF] mb-8 leading-relaxed max-w-2xl">{resting.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {resting.types.map((rest, idx) => (
                      <div key={idx} className="bg-[#0B0F1A] border border-[#1F2937] p-6 rounded-xl border-t-2 border-t-[#10B981]">
                        <h4 className="font-['Cinzel'] text-xl text-[#F9FAFB] mb-2">{rest.name}</h4>
                        <span className="inline-block px-2 py-1 bg-[#111827] border border-[#374151] rounded text-xs text-[#10B981] mb-4">
                          {rest.duration}
                        </span>
                        <p className="text-[#D1D5DB] text-sm leading-relaxed">{rest.benefits}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "vision" && (
                <div>
                  <h3 className="font-['Cinzel'] text-3xl text-[#F9FAFB] mb-4">{vision.title}</h3>
                  <p className="text-[#9CA3AF] mb-8 leading-relaxed max-w-2xl">{vision.description}</p>
                  
                  <div className="space-y-4">
                    {vision.categories.map((cat, idx) => (
                      <div key={idx} className="bg-[#0B0F1A] border border-[#1F2937] p-5 rounded-lg flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="w-1/3 shrink-0">
                          <h4 className="font-bold text-[#F9FAFB] text-lg">{cat.name}</h4>
                        </div>
                        <div className="w-2/3">
                          <p className="text-[#D1D5DB] text-sm">{cat.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "hazards" && (
                <div>
                  <h3 className="font-['Cinzel'] text-3xl text-[#F9FAFB] mb-4">{hazards.title}</h3>
                  <p className="text-[#9CA3AF] mb-8 leading-relaxed max-w-2xl">{hazards.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {hazards.types.map((hazard, idx) => (
                      <div key={idx} className="bg-[#0B0F1A] border border-[#1F2937] p-6 rounded-xl group hover:border-[#F59E0B]/50 transition-colors">
                        <h4 className="font-['Cinzel'] text-xl text-[#F59E0B] mb-3 group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] transition-all">
                          {hazard.name}
                        </h4>
                        <p className="text-[#D1D5DB] text-sm leading-relaxed">{hazard.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
