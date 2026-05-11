"use client";

import {
  ArrowDownToLine,
  CircleHelp,
  EyeOff,
  Ghost,
  HeartHandshake,
  Link,
  Lock,
  Skull,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { rulesData } from "@/lib/data/rulesData";

const getConditionIcon = (iconName: string) => {
  // biome-ignore lint/suspicious/noExplicitAny: Complex icon mapping from lucide-react
  const icons: Record<string, any> = {
    EyeOff,
    HeartHandshake,
    Ghost,
    Link,
    Zap,
    Skull,
    ArrowDownToLine,
    Lock,
  };
  const IconComponent = icons[iconName] || CircleHelp;
  return <IconComponent className="w-8 h-8" />;
};

export function ConditionsGrid() {
  const [activeConditionId, setActiveConditionId] = useState<string | null>(
    null,
  );

  return (
    <section className="relative w-full py-16">
      <div className="text-center mb-16">
        <h2 className="font-['Cinzel'] text-4xl text-[#F9FAFB] mb-4">
          Status <span className="text-[#EC4899]">Conditions</span>
        </h2>
        <p className="text-[#9CA3AF] max-w-2xl mx-auto">
          Conditions alter a creature's capabilities in a variety of ways and
          can arise as a result of a spell, a class feature, a monster's attack,
          or other effects.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {rulesData.conditions.map((condition, idx) => {
          const isActive = activeConditionId === condition.id;

          return (
            <motion.div
              key={condition.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.05 }}
              className="relative perspective-[1000px]"
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() =>
                  setActiveConditionId(isActive ? null : condition.id)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveConditionId(isActive ? null : condition.id);
                  }
                }}
                className={`bg-[#111827] border cursor-pointer h-full transition-all duration-500 rounded-xl overflow-hidden group ${
                  isActive
                    ? `border-[#F9FAFB] shadow-[0_0_30px_rgba(255,255,255,0.1)] ring-2 ring-offset-2 ring-offset-[#0B0F1A] ${condition.color.replace("border-", "ring-")}`
                    : `border-[#1F2937] hover:${condition.color}`
                }`}
              >
                {/* Always visible header */}
                <div
                  className={`p-6 flex flex-col items-center justify-center text-center transition-colors ${isActive ? "bg-[#1F2937]/50" : ""}`}
                >
                  <div
                    className={`p-4 rounded-full mb-4 bg-[#0B0F1A] border transition-colors duration-300 ${isActive ? condition.color : `border-[#374151] group-hover:${condition.color}`} text-[#D1D5DB]`}
                  >
                    {getConditionIcon(condition.icon)}
                  </div>
                  <h3 className="font-['Cinzel'] text-xl text-[#F9FAFB]">
                    {condition.name}
                  </h3>
                </div>

                {/* Expandable Details */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 overflow-hidden"
                    >
                      <div className="pt-4 border-t border-[#374151]">
                        <p className="text-[#9CA3AF] text-sm mb-4 leading-relaxed italic">
                          {condition.description}
                        </p>
                        <ul className="space-y-2">
                          {condition.effects.map((effect, eIdx) => (
                            <li
                              key={`${condition.id}-effect-${eIdx}`}
                              className="text-sm text-[#D1D5DB] flex items-start gap-2"
                            >
                              <span className="text-[#EC4899] mt-1 text-xs">
                                ◆
                              </span>
                              <span>{effect}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
