"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Gem, Sparkles } from "lucide-react";
import { toolsData } from "@/lib/data/toolsData";

type LootRarity = "common" | "uncommon" | "rare" | "epic";

export function LootGenerator() {
  const [generatedLoot, setGeneratedLoot] = useState<{ rarity: LootRarity; item: any } | null>(null);
  const [isOpening, setIsOpening] = useState(false);

  const generateLoot = () => {
    if (isOpening) return;
    setIsOpening(true);
    setGeneratedLoot(null);

    // Roll for rarity: Common 50%, Uncommon 30%, Rare 15%, Epic 5%
    setTimeout(() => {
      const roll = Math.random() * 100;
      let rarity: LootRarity = "common";
      
      if (roll > 95) rarity = "epic";
      else if (roll > 80) rarity = "rare";
      else if (roll > 50) rarity = "uncommon";

      const items = toolsData.loot[rarity];
      const randomItem = items[Math.floor(Math.random() * items.length)];

      setGeneratedLoot({ rarity, item: randomItem });
      setIsOpening(false);
    }, 800);
  };

  const rarityColors = {
    common: "text-gray-300 border-gray-600 shadow-[0_0_15px_rgba(156,163,175,0.2)]",
    uncommon: "text-green-400 border-green-600 shadow-[0_0_15px_rgba(74,222,128,0.3)]",
    rare: "text-blue-400 border-blue-600 shadow-[0_0_15px_rgba(96,165,250,0.4)]",
    epic: "text-purple-500 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
  };

  return (
    <section className="relative w-full py-16">
      <div className="text-center mb-12">
        <h2 className="font-['Cinzel'] text-4xl text-[#F9FAFB] mb-4 flex items-center justify-center gap-4">
          <Gem className="w-10 h-10 text-[#F59E0B]" />
          Loot <span className="text-[#F59E0B]">Generator</span>
        </h2>
        <p className="text-[#9CA3AF] max-w-2xl mx-auto">
          Crack open a chest and discover what treasures await. Rarities range from common gear to legendary epic artifacts.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-[#111827] border border-[#1F2937] rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col items-center">
        
        <button
          onClick={generateLoot}
          disabled={isOpening}
          className="relative group mb-10"
        >
          <motion.div
            animate={{ 
              rotate: isOpening ? [-5, 5, -5, 5, 0] : 0,
              scale: isOpening ? 1.1 : 1
            }}
            transition={{ duration: 0.5 }}
            className="w-32 h-32 rounded-xl bg-gradient-to-br from-[#854D0E] to-[#422006] border-4 border-[#F59E0B] flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.2)] group-hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] transition-shadow"
          >
            <div className="w-full h-4 bg-[#F59E0B] absolute top-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="w-6 h-6 rounded bg-[#422006] border-2 border-[#F59E0B]" />
            </div>
            {isOpening && <Sparkles className="w-12 h-12 text-[#FBBF24] absolute animate-ping" />}
          </motion.div>
          
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 text-center">
            <span className="font-['Cinzel'] text-[#F59E0B] font-bold tracking-widest uppercase text-sm group-hover:text-[#FBBF24] transition-colors">
              {isOpening ? "Opening..." : "Open Chest"}
            </span>
          </div>
        </button>

        <div className="w-full h-[160px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {generatedLoot ? (
              <motion.div
                key={generatedLoot.item.name}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`w-full p-6 rounded-xl border bg-[#0B0F1A] flex flex-col items-center text-center ${rarityColors[generatedLoot.rarity]}`}
              >
                <span className="text-xs font-bold tracking-widest uppercase mb-1 opacity-80">
                  {generatedLoot.rarity} {generatedLoot.item.type}
                </span>
                <h3 className="font-['Cinzel'] text-2xl font-bold mb-2">
                  {generatedLoot.item.name}
                </h3>
                <p className="text-[#D1D5DB] text-sm">
                  {generatedLoot.item.desc}
                </p>
              </motion.div>
            ) : (
              <div className="text-[#4B5563] italic text-sm">
                The chest is closed.
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
