"use client";

import { ContactShadows, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Dices, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Suspense, useState } from "react";
import { Dice3D, type DiceType } from "../ui/3d/Dice3D";

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
        timestamp: new Date(),
      };

      setHistory((prev) => [newRoll, ...prev].slice(0, 10)); // Keep last 10 rolls
      setIsRolling(false);
    }, 1200);
  };

  const clearHistory = () => {
    setHistory([]);
    setCurrentDice(null);
  };

  return (
    <section className="relative w-full py-16" id="dice-roller">
      <div className="text-center mb-12">
        <h2 className="font-['Cinzel'] text-4xl text-[#F9FAFB] mb-4 flex items-center justify-center gap-4">
          <Dices className="w-10 h-10 text-[#8B5CF6]" />
          Polyhedral <span className="text-[#8B5CF6]">Dice Roller</span>
        </h2>
        <p className="text-[#9CA3AF] max-w-2xl mx-auto">
          Select a die to roll. Your recent rolls are recorded in the history
          log below.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 px-4">
        {/* Roller Interface */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#8B5CF6]/10 via-[#111827] to-[#111827] opacity-50" />

          <div className="relative z-10 w-full mb-8">
            <div className="h-56 flex items-center justify-center">
              {currentDice ? (
                <Canvas
                  camera={{ position: [0, 0, 5], fov: 40 }}
                  style={{ width: "100%", height: "100%" }}
                >
                  <ambientLight intensity={1.5} />
                  <directionalLight position={[10, 10, 10]} intensity={2} />
                  <Suspense fallback={null}>
                    <Environment preset="city" />
                    <Dice3D
                      key={`${currentDice}-${history[0]?.id}`}
                      sides={currentDice as DiceType}
                      rolling={isRolling}
                      result={isRolling ? null : history[0]?.result}
                      color="#2D1B69"
                      edgeColor="#8B5CF6"
                    />
                  </Suspense>
                  <ContactShadows
                    position={[0, -2, 0]}
                    opacity={0.6}
                    scale={10}
                    blur={2}
                    far={4}
                    color="#000000"
                  />
                </Canvas>
              ) : (
                <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-[#374151] flex items-center justify-center text-[#4B5563]">
                  <Dices className="w-12 h-12" />
                </div>
              )}
            </div>
            <div className="h-8 flex items-center justify-center mt-4">
              {currentDice && !isRolling && history[0] && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-[#A78BFA] font-['Cinzel'] tracking-widest uppercase text-xl font-bold"
                >
                  Result: {history[0].result}
                </motion.p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 relative z-10">
            {diceTypes.map((d) => (
              <button
                type="button"
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
            <h3 className="font-['Cinzel'] text-[#F9FAFB] font-bold tracking-wider">
              Roll History
            </h3>
            <button
              type="button"
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
                      idx === 0
                        ? "bg-[#8B5CF6]/10 border border-[#8B5CF6]/30"
                        : "bg-[#0B0F1A] border border-[#1F2937]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-10 text-center text-xs text-[#9CA3AF] bg-[#111827] rounded py-1 border border-[#374151]">
                        d{roll.diceType}
                      </span>
                      <span className="text-[#6B7280] text-xs">
                        {roll.timestamp.toLocaleTimeString([], {
                          hour12: false,
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </span>
                    </div>
                    <span
                      className={`font-bold font-mono text-lg ${
                        roll.result === roll.diceType
                          ? "text-[#10B981]"
                          : roll.result === 1
                            ? "text-[#EF4444]"
                            : "text-[#F9FAFB]"
                      }`}
                    >
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
