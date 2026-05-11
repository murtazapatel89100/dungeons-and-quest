"use client";

import { Footprints, Repeat, ShieldAlert, Swords, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const combatSteps = [
  {
    id: 1,
    title: "Roll Initiative",
    icon: Repeat,
    desc: "Everyone rolls a d20 + Dexterity modifier to determine the turn order.",
  },
  {
    id: 2,
    title: "Take Your Turn",
    icon: Swords,
    desc: "When it's your turn, you can Move, take one Action, and one Bonus Action.",
  },
  {
    id: 3,
    title: "Movement",
    icon: Footprints,
    desc: "You can move a distance up to your speed (usually 30 feet).",
  },
  {
    id: 4,
    title: "Action",
    icon: Zap,
    desc: "The main thing you do: Attack, Cast a Spell, Dash, Disengage, Dodge, or Help.",
  },
  {
    id: 5,
    title: "Reactions",
    icon: ShieldAlert,
    desc: "Special responses that happen outside your turn, like an Attack of Opportunity or casting Shield.",
  },
];

export function CombatBasics() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="relative w-full py-16">
      <div className="text-center mb-16">
        <h2 className="font-['Cinzel'] text-4xl text-[#F9FAFB] mb-4">
          The Flow of <span className="text-[#DC2626]">Combat</span>
        </h2>
        <p className="text-[#9CA3AF] max-w-2xl mx-auto">
          When steel clashes and magic erupts, time slows down into structured
          rounds. Here is how a typical combat encounter flows.
        </p>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Timeline visualization */}
        <div className="flex-1 relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-8 bottom-8 w-1 bg-[#1F2937] rounded-full z-0" />

          <div className="space-y-6 relative z-10">
            {combatSteps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.id}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveStep(idx);
                    }
                  }}
                  className="flex items-center gap-6 cursor-pointer group focus:outline-hidden focus:ring-1 focus:ring-[#DC2626] rounded-xl p-1"
                  onClick={() => setActiveStep(idx)}
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1.2 : 1,
                      backgroundColor: isActive ? "#DC2626" : "#111827",
                      borderColor: isActive ? "#F87171" : "#374151",
                    }}
                    className="w-16 h-16 rounded-full border-2 flex items-center justify-center shrink-0 shadow-lg relative transition-colors duration-300"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeGlow"
                        className="absolute inset-0 rounded-full bg-[#DC2626] blur-md opacity-50"
                      />
                    )}
                    <Icon
                      className={`w-8 h-8 relative z-10 transition-colors duration-300 ${isActive ? "text-white" : "text-[#9CA3AF] group-hover:text-[#F9FAFB]"}`}
                    />
                  </motion.div>

                  <div
                    className={`p-4 rounded-xl border transition-all duration-300 w-full ${
                      isActive
                        ? "bg-[#111827] border-[#DC2626]/50 shadow-[0_0_20px_rgba(220,38,38,0.1)]"
                        : "bg-transparent border-transparent hover:border-[#1F2937]"
                    }`}
                  >
                    <h3
                      className={`font-['Cinzel'] text-xl mb-1 ${isActive ? "text-[#F9FAFB]" : "text-[#9CA3AF] group-hover:text-[#D1D5DB]"}`}
                    >
                      {step.id}. {step.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Details Panel */}
        <div className="flex-1 flex items-center">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-[#111827] border border-[#1F2937] rounded-2xl p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#DC2626]/10 rounded-bl-full blur-xl" />

            <h3 className="font-['Cinzel'] text-3xl text-[#F9FAFB] mb-4 border-b border-[#1F2937] pb-4">
              {combatSteps[activeStep].title}
            </h3>
            <p className="text-[#9CA3AF] text-lg leading-relaxed min-h-[120px]">
              {combatSteps[activeStep].desc}
            </p>

            {/* Contextual Visual/Example */}
            <div className="mt-8 bg-[#0B0F1A] p-6 rounded-lg border border-[#1F2937]">
              {activeStep === 0 && (
                <div className="text-center font-mono text-sm text-[#D4AF37]">
                  [ DM ]: "Roll Initiative!"
                  <br />[ Player (Dex 14) ]: Rolls d20 (15) + 2 = 17.
                  <br />[ Goblin ]: Rolls d20 (8) + 2 = 10.
                </div>
              )}
              {activeStep === 3 && (
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-[#1F2937] p-2 rounded text-xs text-[#9CA3AF]">
                    Attack (Weapon)
                  </div>
                  <div className="bg-[#1F2937] p-2 rounded text-xs text-[#9CA3AF]">
                    Cast Spell
                  </div>
                  <div className="bg-[#1F2937] p-2 rounded text-xs text-[#9CA3AF]">
                    Dash (Double Move)
                  </div>
                  <div className="bg-[#1F2937] p-2 rounded text-xs text-[#9CA3AF]">
                    Dodge (Adv. on saves)
                  </div>
                </div>
              )}
              {activeStep !== 0 && activeStep !== 3 && (
                <div className="flex items-center justify-center text-[#9CA3AF] italic text-sm h-full">
                  Keep in mind, you only get one turn per round.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
