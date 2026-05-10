"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sword, RotateCcw, Dices } from "lucide-react";
import { learnData } from "@/lib/data/learnData";

export function ExampleAdventure() {
  const [currentNode, setCurrentNode] = useState<string>("start");
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const node = learnData.adventureFlow[currentNode];

  const handleChoice = (nextId: string, statCheck?: string) => {
    if (statCheck) {
      // Simulate a required dice roll before moving on
      setIsRolling(true);
      setDiceResult(null);

      setTimeout(() => {
        const roll = Math.floor(Math.random() * 20) + 1;
        setDiceResult(roll);
        setIsRolling(false);

        setTimeout(() => {
          setCurrentNode(nextId);
          setDiceResult(null); // Clear for next text
        }, 2000);
      }, 1000);
    } else {
      setCurrentNode(nextId);
    }
  };

  const resetAdventure = () => {
    setCurrentNode("start");
    setDiceResult(null);
  };

  return (
    <section className="relative w-full py-16">
      <div className="text-center mb-16">
        <h2 className="font-['Cinzel'] text-4xl text-[#F9FAFB] mb-4">
          Your First <span className="text-[#EC4899]">Adventure</span>
        </h2>
        <p className="text-[#9CA3AF] max-w-2xl mx-auto">
          Experience a tiny slice of D&D. Read the Dungeon Master's description
          and make your choice.
        </p>
      </div>

      <div className="max-w-3xl mx-auto relative">
        {/* Decorative Frame */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] via-[#EC4899] to-[#6D28D9] rounded-2xl blur opacity-20" />

        <div className="bg-[#0B0F1A] border border-[#1F2937] rounded-2xl p-6 md:p-10 relative shadow-2xl overflow-hidden min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1F2937]">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <Sword className="w-6 h-6" />
              <span className="font-['Cinzel'] font-bold tracking-widest">
                The Whispering Cave
              </span>
            </div>
            {currentNode !== "start" && (
              <button
                onClick={resetAdventure}
                className="text-[#9CA3AF] hover:text-[#F9FAFB] flex items-center gap-2 text-sm transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Restart
              </button>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-center relative">
            <AnimatePresence mode="wait">
              {isRolling ? (
                <motion.div
                  key="rolling"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Dices className="w-16 h-16 text-[#D4AF37] mb-4" />
                  </motion.div>
                  <p className="font-['Cinzel'] text-xl text-[#F9FAFB]">
                    Rolling the bones...
                  </p>
                </motion.div>
              ) : diceResult !== null ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <div
                    className={`text-6xl font-['Cinzel'] font-bold mb-4 ${diceResult >= 10 ? "text-green-500" : "text-red-500"}`}
                  >
                    {diceResult}
                  </div>
                  <p className="text-[#9CA3AF]">
                    {diceResult >= 10
                      ? "Success! Proceeding..."
                      : "Uh oh! But the story continues..."}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={currentNode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="bg-[#111827] p-6 rounded-lg border-l-4 border-l-[#EC4899]">
                    <p className="text-[#F9FAFB] text-lg font-serif italic leading-relaxed">
                      "{node.text}"
                    </p>
                  </div>

                  <div className="grid gap-3">
                    {node.choices.map((choice, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          handleChoice(choice.nextId, choice.statCheck)
                        }
                        className="p-4 bg-[#1F2937]/50 hover:bg-[#1F2937] border border-[#374151] hover:border-[#D4AF37] rounded-lg text-left transition-all duration-300 group flex justify-between items-center"
                      >
                        <span className="text-[#D1D5DB] group-hover:text-[#F9FAFB]">
                          {choice.text}
                        </span>
                        {choice.statCheck && (
                          <span className="text-xs bg-[#0B0F1A] border border-[#374151] px-2 py-1 rounded text-[#D4AF37] flex items-center gap-1">
                            <Dices className="w-3 h-3" /> {choice.statCheck}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
