"use client";

import { ContactShadows, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Dices } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Suspense, useState } from "react";
import { Dice3D, type DiceType } from "../ui/3d/Dice3D";

export function DiceSystem() {
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [diceType, setDiceType] = useState<number>(20);

  const rollDice = (sides: number) => {
    if (isRolling) return;

    setIsRolling(true);
    setDiceType(sides);
    setResult(null);

    // Simulate roll delay
    setTimeout(() => {
      const finalResult = Math.floor(Math.random() * sides) + 1;
      setResult(finalResult);
      setIsRolling(false);
    }, 1200);
  };

  return (
    <section className="relative w-full py-16">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left side: Explanation */}
        <div className="flex-1 space-y-6">
          <h2 className="font-heading text-2xl md:text-4xl text-[#F9FAFB]">
            The <span className="text-[#D4AF37]">d20</span> System
          </h2>
          <p className="text-[#9CA3AF] text-base md:text-lg">
            Almost every action in Dungeons & Dragons is resolved using a
            twenty-sided die, known as a{" "}
            <strong className="text-[#F9FAFB]">d20</strong>.
          </p>
          <div className="bg-[#111827] border border-[#1F2937] p-6 rounded-lg border-l-4 border-l-[#D4AF37]">
            <h3 className="font-heading text-xl mb-2">How it works:</h3>
            <ol className="list-decimal list-inside space-y-2 text-[#9CA3AF]">
              <li>Roll a d20.</li>
              <li>Add any relevant modifiers (like your Strength score).</li>
              <li>
                Compare the total to a target number (like a monster's Armor
                Class).
              </li>
            </ol>
            <p className="mt-4 text-sm italic text-[#D4AF37]/80">
              "Roll a 20, and you achieve a Critical Hit. Roll a 1, and disaster
              may strike."
            </p>
          </div>
        </div>

        {/* Right side: Interactive Roller */}
        <div className="flex-1 flex flex-col items-center justify-center bg-[#111827] border border-[#1F2937] rounded-2xl p-8 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/5 to-[#6D28D9]/5 pointer-events-none" />

          <h3 className="font-heading text-xl text-[#F9FAFB] mb-4 relative z-10 flex items-center gap-2">
            <Dices className="text-[#D4AF37]" />
            Test Your Fate
          </h3>

          <div className="relative w-full h-[250px] flex items-center justify-center mb-4">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 40 }}
              style={{ width: "100%", height: "100%" }}
            >
              <ambientLight intensity={1.5} />
              <directionalLight position={[10, 10, 10]} intensity={2} />
              <Suspense fallback={null}>
                <Environment preset="city" />
                <Dice3D
                  sides={diceType as DiceType}
                  rolling={isRolling}
                  result={result}
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

            {/* Glowing effect on result */}
            <AnimatePresence>
              {result === 20 && !isRolling && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1.5 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#D4AF37] blur-[60px] opacity-20 rounded-full z-0 pointer-events-none"
                />
              )}
              {result === 1 && !isRolling && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1.5 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#DC2626] blur-[60px] opacity-20 rounded-full z-0 pointer-events-none"
                />
              )}
            </AnimatePresence>
          </div>

          <div className="h-10 flex items-center justify-center mb-6">
            {result !== null && !isRolling && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-heading text-2xl font-bold text-[#D4AF37]"
              >
                {result === 20
                  ? "CRITICAL!"
                  : result === 1
                    ? "FUMBLE!"
                    : `Result: ${result}`}
              </motion.div>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-3 relative z-10">
            <button
              type="button"
              onClick={() => rollDice(20)}
              disabled={isRolling}
              className="px-6 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/50 text-[#D4AF37] rounded hover:bg-[#D4AF37]/20 transition-colors font-heading tracking-wider disabled:opacity-50"
            >
              Roll d20
            </button>
            <button
              type="button"
              onClick={() => rollDice(6)}
              disabled={isRolling}
              className="px-6 py-2 bg-[#1F2937] border border-[#374151] text-[#9CA3AF] rounded hover:border-[#9CA3AF] transition-colors font-heading disabled:opacity-50"
            >
              Roll d6
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
