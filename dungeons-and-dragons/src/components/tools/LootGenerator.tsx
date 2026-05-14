"use client";

import { Gem, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toolsData } from "@/lib/data/toolsData";

type LootRarity = "common" | "uncommon" | "rare" | "epic";

function LootChest({
  isOpen,
  isOpening,
}: {
  isOpen: boolean;
  isOpening: boolean;
}) {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      {/* Glow Effect */}
      <motion.div
        animate={{
          scale: isOpening ? [1, 1.2, 1] : isOpen ? 1.1 : 1,
          opacity: isOpen ? 0.8 : 0.3,
        }}
        className={`absolute inset-0 rounded-full blur-3xl transition-colors duration-500 ${
          isOpen ? "bg-[#FBBF24]" : "bg-[#F59E0B]/20"
        }`}
      />

      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
        animate={
          isOpening
            ? {
                rotate: [0, -2, 2, -2, 2, 0],
                x: [0, -1, 1, -1, 1, 0],
              }
            : { rotate: 0, x: 0 }
        }
        transition={{ duration: 0.5, repeat: isOpening ? Infinity : 0 }}
      >
        {/* Chest Base */}
        <path
          d="M15 55 L85 55 L85 85 Q85 90 80 90 L20 90 Q15 90 15 85 Z"
          fill="#5D3A1A"
          stroke="#3D2611"
          strokeWidth="2"
        />
        {/* Base Trim */}
        <path d="M15 55 L85 55 L85 60 L15 60 Z" fill="#F59E0B" />
        <path d="M25 60 L30 60 L30 90 L25 90 Z" fill="#D97706" />
        <path d="M70 60 L75 60 L75 90 L70 90 Z" fill="#D97706" />

        {/* Chest Lid Group */}
        <motion.g
          animate={{
            rotateX: isOpen ? -60 : 0,
            y: isOpen ? -10 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          style={{ originX: "50%", originY: "55%" }}
        >
          <path
            d="M15 55 L85 55 L85 45 Q85 30 50 30 Q15 30 15 45 Z"
            fill="#854D0E"
            stroke="#3D2611"
            strokeWidth="2"
          />
          {/* Lid Trim */}
          <path d="M15 50 L85 50 L85 55 L15 55 Z" fill="#F59E0B" />
          <path d="M25 32 L30 32 L30 50 L25 50 Z" fill="#D97706" />
          <path d="M70 32 L75 32 L75 50 L70 50 Z" fill="#D97706" />

          {/* Lock */}
          <rect
            x="45"
            y="48"
            width="10"
            height="12"
            rx="2"
            fill="#FBBF24"
            stroke="#B45309"
            strokeWidth="1"
          />
          <circle cx="50" cy="54" r="2" fill="#78350F" />
        </motion.g>

        {/* Interior Glow (visible when open) */}
        <AnimatePresence>
          {isOpen && (
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <defs>
                <radialGradient id="treasureGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
                </radialGradient>
              </defs>
              <ellipse
                cx="50"
                cy="50"
                rx="30"
                ry="15"
                fill="url(#treasureGlow)"
              />
            </motion.g>
          )}
        </AnimatePresence>
      </motion.svg>

      {/* Sparkles */}
      <AnimatePresence>
        {isOpening && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0.5],
                  x: (Math.random() - 0.5) * 150,
                  y: (Math.random() - 0.5) * 150,
                }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                className="absolute left-1/2 top-1/2"
              >
                <Sparkles className="w-6 h-6 text-[#FBBF24]" />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function LootGenerator() {
  const [generatedLoot, setGeneratedLoot] = useState<{
    rarity: LootRarity;
    // biome-ignore lint/suspicious/noExplicitAny: Complex loot item structure from data
    item: any;
  } | null>(null);
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
    }, 1500);
  };

  const rarityColors = {
    common:
      "text-gray-300 border-gray-600 shadow-[0_0_15px_rgba(156,163,175,0.2)]",
    uncommon:
      "text-green-400 border-green-600 shadow-[0_0_15px_rgba(74,222,128,0.3)]",
    rare: "text-blue-400 border-blue-600 shadow-[0_0_15px_rgba(96,165,250,0.4)]",
    epic: "text-purple-500 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]",
  };

  return (
    <section className="relative w-full py-16">
      <div className="text-center mb-12 px-4">
        <h2 className="font-['Cinzel'] text-4xl text-[#F9FAFB] mb-4 flex items-center justify-center gap-4">
          <Gem className="w-10 h-10 text-[#F59E0B]" />
          Loot <span className="text-[#F59E0B]">Generator</span>
        </h2>
        <p className="text-[#9CA3AF] max-w-2xl mx-auto">
          Crack open a chest and discover what treasures await. Rarities range
          from common gear to legendary epic artifacts.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-8 md:p-12 shadow-2xl flex flex-col items-center gap-12">
          {/* Interaction Area */}
          <div className="flex flex-col items-center gap-6 w-full">
            <button
              type="button"
              onClick={generateLoot}
              disabled={isOpening}
              className="relative group cursor-pointer focus:outline-hidden"
            >
              <LootChest
                isOpen={!!generatedLoot || isOpening}
                isOpening={isOpening}
              />

              <div className="mt-4 text-center">
                <span className="font-['Cinzel'] text-[#F59E0B] font-bold tracking-[0.2em] uppercase text-sm group-hover:text-[#FBBF24] transition-colors">
                  {isOpening
                    ? "Opening..."
                    : generatedLoot
                      ? "Loot Found!"
                      : "Unlock Chest"}
                </span>
              </div>
            </button>
          </div>

          {/* Result Area */}
          <div className="w-full min-h-[200px] flex items-center justify-center border-t border-[#1F2937] pt-8">
            <AnimatePresence mode="wait">
              {generatedLoot ? (
                <motion.div
                  key={generatedLoot.item.name}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`w-full p-6 md:p-8 rounded-xl border bg-[#0B0F1A]/80 backdrop-blur-md flex flex-col items-center text-center transition-all duration-500 ${rarityColors[generatedLoot.rarity]}`}
                >
                  <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-2 opacity-80">
                    {generatedLoot.rarity} {generatedLoot.item.type}
                  </span>
                  <h3 className="font-['Cinzel'] text-2xl md:text-3xl font-bold mb-3 text-[#F9FAFB]">
                    {generatedLoot.item.name}
                  </h3>
                  <div className="w-12 h-[1px] bg-[#F59E0B]/30 mb-4" />
                  <p className="text-[#D1D5DB] text-sm md:text-base italic leading-relaxed max-w-lg">
                    "{generatedLoot.item.desc}"
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-4 text-[#4B5563]"
                >
                  <div className="flex items-center gap-4 opacity-20">
                    <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#F9FAFB]" />
                    <Gem className="w-5 h-5" />
                    <div className="w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#F9FAFB]" />
                  </div>
                  <p className="italic text-sm tracking-wide font-['Cinzel']">
                    The ancient hoard awaits...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
