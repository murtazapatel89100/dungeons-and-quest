"use client";
import { ContactShadows, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Suspense, useState } from "react";
import { Dice3D } from "./ui/3d/Dice3D";

interface DiceRollerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DiceRollerModal({ isOpen, onClose }: DiceRollerModalProps) {
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const rollDice = () => {
    if (rolling) return;
    setRolling(true);
    setResult(null);

    const newResult = Math.floor(Math.random() * 20) + 1;

    setTimeout(() => {
      setResult(newResult);
      setRolling(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0F1A]/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[#111827] border-2 border-[#D4AF37]/50 p-8 shadow-[0_0_40px_rgba(109,40,217,0.2)] flex flex-col items-center"
          >
            {/* Corner Embellishments */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]"></div>

            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 text-[#9CA3AF] hover:text-[#D4AF37] z-10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-4 relative z-10 w-full">
              <h2 className="font-heading text-2xl md:text-3xl text-[#F9FAFB] uppercase tracking-widest mb-2">
                Test Your Fate
              </h2>
              <p className="font-sans text-[#9CA3AF] text-sm">
                Target Critical: 20
              </p>
            </div>

            {/* Sizing Fix: explicit height to ensure Canvas scales up correctly */}
            <div className="w-full relative flex flex-col items-center justify-center h-[350px] mt-4">
              <button
                type="button"
                className="w-full h-full cursor-pointer outline-hidden bg-transparent border-none p-0 block appearance-none"
                onClick={rollDice}
              >
                <Canvas
                  camera={{ position: [0, 0, 5.5], fov: 45 }}
                  style={{ width: "100%", height: "100%" }}
                >
                  <ambientLight intensity={1.5} />
                  <directionalLight position={[10, 10, 10]} intensity={2} />
                  <Suspense fallback={null}>
                    <Environment preset="city" />
                    <Dice3D sides={20} rolling={rolling} result={result} />
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
              </button>

              <div className="absolute bottom-0 left-0 w-full flex items-center justify-center pointer-events-none">
                {result !== null && !rolling && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="font-heading text-3xl md:text-4xl font-bold text-[#D4AF37] drop-shadow-[0_0_15px_rgba(0,0,0,1)] text-center bg-[#111827]/80 px-6 py-2 rounded-sm backdrop-blur-md border border-[#D4AF37]/30"
                  >
                    {result === 20
                      ? "Critical Success!"
                      : result === 1
                        ? "Critical Failure!"
                        : result}
                  </motion.div>
                )}
                {rolling && (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                    className="font-heading text-base md:text-xl text-[#9CA3AF] tracking-widest uppercase bg-[#111827]/80 px-6 py-2 rounded-sm backdrop-blur-md"
                    >
                    Click a die to roll
                  </motion.div>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-center relative z-10 w-full">
              <button
                type="button"
                onClick={rollDice}
                disabled={rolling}
                className="px-8 py-3 bg-[#0B0F1A] border border-[#D4AF37]/50 text-[#D4AF37] font-heading uppercase tracking-widest text-sm font-semibold transition-all duration-300 hover:bg-[#D4AF37]/10 hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {rolling ? "Rolling..." : "Roll Again"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
