"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, BookMarked } from "lucide-react";
import { learnData } from "@/lib/data/learnData";

export function Glossary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Mechanic", "Roleplay", "World", "Combat"];

  const filteredGlossary = useMemo(() => {
    return learnData.glossary.filter((item) => {
      const matchesSearch =
        item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <section className="relative w-full py-16">
      <div className="text-center mb-12">
        <h2 className="font-['Cinzel'] text-4xl text-[#F9FAFB] mb-4">
          Arcane <span className="text-[#FBBF24]">Glossary</span>
        </h2>
        <p className="text-[#9CA3AF] max-w-2xl mx-auto">
          A quick reference for the common terminology you will hear at the
          table.
        </p>
      </div>

      <div className="max-w-5xl mx-auto bg-[#111827] border border-[#1F2937] rounded-2xl p-6 md:p-8 shadow-xl">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0B0F1A] border border-[#374151] rounded-lg py-3 pl-12 pr-4 text-[#F9FAFB] focus:outline-none focus:border-[#FBBF24] transition-colors font-['Inter']"
            />
          </div>

          <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 scrollbar-hide shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-[#FBBF24]/20 text-[#FBBF24] border border-[#FBBF24]/50"
                    : "bg-[#0B0F1A] text-[#9CA3AF] border border-[#374151] hover:border-[#9CA3AF]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Glossary List */}
        <div className="grid md:grid-cols-2 gap-4 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence>
            {filteredGlossary.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12 text-[#9CA3AF]"
              >
                <BookMarked className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No terms found matching your query.</p>
              </motion.div>
            ) : (
              filteredGlossary.map((item, idx) => (
                <motion.div
                  key={item.term}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#0B0F1A] border border-[#1F2937] p-5 rounded-xl hover:border-[#FBBF24]/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-['Cinzel'] text-xl text-[#F9FAFB]">
                      {item.term}
                    </h4>
                    <span className="text-xs px-2 py-1 bg-[#111827] border border-[#374151] rounded text-[#9CA3AF]">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-[#D1D5DB] text-sm leading-relaxed">
                    {item.definition}
                  </p>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Custom Scrollbar CSS for this component scope */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0B0F1A; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #374151; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4B5563; 
        }
      `,
        }}
      />
    </section>
  );
}
