"use client";

import { Beer, Map as MapIcon, ScrollText, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toolsData } from "@/lib/data/toolsData";

type GeneratorType = "tavern" | "npc" | "town";

export function NameGenerator() {
  const [activeTab, setActiveTab] = useState<GeneratorType>("tavern");
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);

  const generateNames = useCallback((type: GeneratorType) => {
    const newNames: string[] = [];
    const data = toolsData.names[type];

    for (let i = 0; i < 5; i++) {
      if (type === "tavern") {
        // biome-ignore lint/suspicious/noExplicitAny: Complex name data structure
        const { adjectives, nouns } = data as any;
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        newNames.push(`The ${adj} ${noun}`);
      } else if (type === "npc") {
        // biome-ignore lint/suspicious/noExplicitAny: Complex name data structure
        const { first, last } = data as any;
        const f = first[Math.floor(Math.random() * first.length)];
        const l = last[Math.floor(Math.random() * last.length)];
        newNames.push(`${f} ${l}`);
      } else if (type === "town") {
        // biome-ignore lint/suspicious/noExplicitAny: Complex name data structure
        const { prefixes, suffixes } = data as any;
        const pre = prefixes[Math.floor(Math.random() * prefixes.length)];
        const suf = suffixes[Math.floor(Math.random() * suffixes.length)];
        newNames.push(`${pre}${suf}`);
      }
    }

    setGeneratedNames(newNames);
  }, []);

  // Generate names on mount and tab change
  useEffect(() => {
    generateNames(activeTab);
  }, [activeTab, generateNames]);

  const handleTabChange = (type: GeneratorType) => {
    setActiveTab(type);
  };

  return (
    <section className="relative w-full py-16">
      <div className="text-center mb-12">
        <h2 className="font-['Cinzel'] text-4xl text-[#F9FAFB] mb-4 flex items-center justify-center gap-4">
          <ScrollText className="w-10 h-10 text-[#3B82F6]" />
          Name <span className="text-[#3B82F6]">Generator</span>
        </h2>
        <p className="text-[#9CA3AF] max-w-2xl mx-auto">
          Stuck for a name? Generate highly thematic taverns, towns, and NPCs on
          the fly.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[400px]">
        {/* Sidebar / Tabs */}
        <div className="md:w-64 bg-[#0B0F1A] p-6 border-r border-[#1F2937] flex flex-col gap-4">
          <button
            type="button"
            onClick={() => handleTabChange("tavern")}
            className={`p-4 rounded-xl text-left font-['Cinzel'] transition-all flex items-center gap-3 ${
              activeTab === "tavern"
                ? "bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                : "text-[#9CA3AF] hover:bg-[#1F2937] border border-transparent"
            }`}
          >
            <Beer className="w-5 h-5" /> Taverns
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("npc")}
            className={`p-4 rounded-xl text-left font-['Cinzel'] transition-all flex items-center gap-3 ${
              activeTab === "npc"
                ? "bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                : "text-[#9CA3AF] hover:bg-[#1F2937] border border-transparent"
            }`}
          >
            <User className="w-5 h-5" /> NPCs
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("town")}
            className={`p-4 rounded-xl text-left font-['Cinzel'] transition-all flex items-center gap-3 ${
              activeTab === "town"
                ? "bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                : "text-[#9CA3AF] hover:bg-[#1F2937] border border-transparent"
            }`}
          >
            <MapIcon className="w-5 h-5" /> Towns
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-10 relative overflow-hidden bg-gradient-to-br from-[#111827] to-[#0B0F1A] flex flex-col">
          <div className="flex-1 flex flex-col gap-3">
            <AnimatePresence mode="popLayout">
              {generatedNames.map((name, idx) => (
                <motion.div
                  key={`${activeTab}-${name}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-[#0B0F1A] border border-[#1F2937] p-4 rounded-lg flex items-center group hover:border-[#3B82F6]/50 transition-colors"
                >
                  <span className="text-[#60A5FA] font-['Cinzel'] text-xl tracking-wide">
                    {name}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => generateNames(activeTab)}
              className="px-8 py-3 bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6] rounded font-['Cinzel'] tracking-widest uppercase hover:bg-[#3B82F6] hover:text-[#F9FAFB] transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
            >
              Generate More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
