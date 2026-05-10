"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Dices, RotateCcw } from "lucide-react";

type RollRecord = {
  id: string;
  diceType: number;
  result: number;
  timestamp: Date;
};

export function DiceRoller() {
  const [history, setHistory] = useState<RollRecord[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [currentDice, setCurrentDice] = useState<number | null>(null);

  const diceTypes = [4, 6, 8, 10, 12, 20, 100];

  const rollDice = (max: number) => {
    if (isRolling) return;
    
    setIsRolling(true);
    setCurrentDice(max);
    
    // Simulate roll animation time
    setTimeout(() => {
      const result = Math.floor(Math.random() * max) + 1;
      
      const newRoll: RollRecord = {
        id: Math.random().toString(36).substr(2, 9),
        diceType: max,
        result,
        timestamp: new Date()
      };
      
      setHistory(prev => [newRoll, ...prev].slice(0, 10)); // Keep last 10 rolls
      setIsRolling(false);
    }, 600);
  };

  const clearHistory = () => {
    setHistory([]);
    setCurrentDice(null);
  };

  return (
    <section className="relative w-full py-16">
      <div className="text-center mb-12">
        <h2 className="font-['Cinzel'] text-4xl text-[#F9FAFB] mb-4 flex items-center justify-center gap-4">
          <Dices className="w-10 h-10 text-[#8B5CF6]" />
          Polyhedral <span className="text-[#8B5CF6]">Dice Roller</span>
        </h2>
        <p className="text-[#9CA3AF] max-w-2xl mx-auto">
          Select a die to roll. Your recent rolls are recorded in the history log below.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 px-4">
        
        {/* Roller Interface */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#8B5CF6]/10 via-[#111827] to-[#111827] opacity-50" />
          
          <div className="relative z-10 w-full mb-8">
            <div className="h-40 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {currentDice ? (
                  <motion.div
                    key={history[0]?.id || "empty"}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ 
                      scale: isRolling ? [1, 1.2, 1] : 1, 
                      rotate: isRolling ? [0, 180, 360] : 0 
                    }}
                    transition={{ duration: 0.6 }}
                    className={`w-32 h-32 rounded-2xl flex items-center justify-center shadow-2xl border-2 ${
                      history[0]?.result === currentDice 
                        ? "bg-[#10B981]/20 border-[#10B981] text-[#10B981] shadow-[0_0_30px_rgba(16,185,129,0.3)]" 
                        : history[0]?.result === 1 
                        ? "bg-[#EF4444]/20 border-[#EF4444] text-[#EF4444] shadow-[0_0_30px_rgba(239,68,68,0.3)]"
                        : "bg-[#8B5CF6]/20 border-[#8B5CF6] text-[#A78BFA] shadow-[0_0_30px_rgba(139,92,246,0.3)]"
                    }`}
                  >
                    <span className="font-['Cinzel'] font-bold text-6xl">
                      {isRolling ? "?" : history[0]?.result}
                    </span>
                  </motion.div>
                ) : (
                  <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-[#374151] flex items-center justify-center text-[#4B5563]">
                    <Dices className="w-12 h-12" />
                  </div>
                )}
              </AnimatePresence>
            </div>
            {currentDice && !isRolling && (
              <p className="text-center mt-4 text-[#9CA3AF] font-['Cinzel'] tracking-widest uppercase">
                Rolled a d{currentDice}
              </p>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-3 relative z-10">
            {diceTypes.map((d) => (
              <button
                key={d}
                disabled={isRolling}
                onClick={() => rollDice(d)}
                className="w-14 h-14 rounded-lg bg-[#0B0F1A] border border-[#374151] hover:border-[#8B5CF6] hover:text-[#A78BFA] transition-all flex items-center justify-center font-bold text-[#F9FAFB] hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                d{d}
              </button>
            ))}
          </div>
        </div>

        {/* History Log */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-2xl flex flex-col overflow-hidden shadow-xl">
          <div className="p-4 border-b border-[#1F2937] flex justify-between items-center bg-[#0B0F1A]/50">
            <h3 className="font-['Cinzel'] text-[#F9FAFB] font-bold tracking-wider">Roll History</h3>
            <button 
              onClick={clearHistory}
              disabled={history.length === 0 || isRolling}
              className="text-[#9CA3AF] hover:text-[#EF4444] transition-colors disabled:opacity-50 p-1"
              title="Clear History"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 p-2 overflow-y-auto max-h-[350px]">
            {history.length === 0 ? (
              <div className="h-full flex items-center justify-center text-[#4B5563] text-sm italic">
                No rolls yet.
              </div>
            ) : (
              <AnimatePresence>
                {history.map((roll, idx) => (
                  <motion.div
                    key={roll.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`flex items-center justify-between p-3 rounded-lg mb-2 ${
                      idx === 0 ? "bg-[#8B5CF6]/10 border border-[#8B5CF6]/30" : "bg-[#0B0F1A] border border-[#1F2937]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-10 text-center text-xs text-[#9CA3AF] bg-[#111827] rounded py-1 border border-[#374151]">
                        d{roll.diceType}
                      </span>
                      <span className="text-[#6B7280] text-xs">
                        {roll.timestamp.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' })}
                      </span>
                    </div>
                    <span className={`font-bold font-mono text-lg ${
                      roll.result === roll.diceType ? "text-[#10B981]" : roll.result === 1 ? "text-[#EF4444]" : "text-[#F9FAFB]"
                    }`}>
                      {roll.result}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
        
      </div>
    </section>
  );
}
