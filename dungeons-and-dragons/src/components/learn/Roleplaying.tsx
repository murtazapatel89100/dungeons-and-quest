"use client";

import { Drama, MessageSquare, Theater } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export function Roleplaying() {
  const [selectedAction, setSelectedAction] = useState<number | null>(null);

  const actions = [
    {
      id: 1,
      label: "Threaten",
      result:
        "You grab the merchant by the collar. He squeaks in fear, giving you the item for half price, but the town guards might hear about this later.",
      color: "hover:border-red-500 hover:text-red-400",
    },
    {
      id: 2,
      label: "Persuade",
      result:
        "You compliment his wares and charm him with a smile. He happily gives you a 10% discount and mentions a rumor about a nearby dungeon.",
      color: "hover:border-purple-500 hover:text-purple-400",
    },
    {
      id: 3,
      label: "Investigate",
      result:
        "You notice the potion he's selling has a forged seal. Confronting him, he panics and gives it to you for free to keep you quiet.",
      color: "hover:border-blue-500 hover:text-blue-400",
    },
    {
      id: 4,
      label: "Ignore",
      result:
        "You walk past without a word. He shrugs and goes back to polishing a mysterious brass lamp.",
      color: "hover:border-gray-500 hover:text-gray-400",
    },
  ];

  return (
    <section className="relative w-full py-16">
      <div className="text-center mb-16">
        <h2 className="font-['Cinzel'] text-4xl text-[#F9FAFB] mb-4">
          The Art of <span className="text-[#3B82F6]">Roleplaying</span>
        </h2>
        <p className="text-[#9CA3AF] max-w-2xl mx-auto">
          Not every problem requires a sword. Interacting with the world and its
          inhabitants is often the most memorable part of the game.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-[#111827] border border-[#1F2937] p-8 rounded-xl shadow-lg relative">
          <Drama className="absolute top-4 right-4 w-12 h-12 text-[#1F2937]/50" />
          <h3 className="font-['Cinzel'] text-2xl text-[#F9FAFB] mb-4">
            Speaking in Character
          </h3>
          <p className="text-[#9CA3AF] leading-relaxed mb-4">
            You can act out your character's voice and mannerisms, or simply
            describe what they do. Both are perfectly valid ways to play!
          </p>
          <div className="space-y-4 text-sm italic border-l-2 border-[#3B82F6] pl-4">
            <p className="text-[#D1D5DB]">
              <strong className="text-[#3B82F6] not-italic">
                First-person:
              </strong>{" "}
              "I slam my tankard on the table and demand to know where the
              goblin camp is!"
            </p>
            <p className="text-[#D1D5DB]">
              <strong className="text-[#3B82F6] not-italic">
                Third-person:
              </strong>{" "}
              "My character, Grom, slams his tankard on the table and
              intimidates the barkeep."
            </p>
          </div>
        </div>

        <div className="bg-[#111827] border border-[#1F2937] p-8 rounded-xl shadow-lg relative">
          <Theater className="absolute top-4 right-4 w-12 h-12 text-[#1F2937]/50" />
          <h3 className="font-['Cinzel'] text-2xl text-[#F9FAFB] mb-4">
            Character Motivation
          </h3>
          <p className="text-[#9CA3AF] leading-relaxed">
            Your character isn't just a set of stats. Think about their:
          </p>
          <ul className="mt-4 space-y-2 text-[#D1D5DB] list-disc list-inside">
            <li>
              <strong>Ideals:</strong> What drives them? (e.g., Justice, Greed)
            </li>
            <li>
              <strong>Bonds:</strong> Who or what do they care about?
            </li>
            <li>
              <strong>Flaws:</strong> What is their weakness? (e.g., Easily
              angered)
            </li>
          </ul>
        </div>
      </div>

      {/* Interactive Scenario */}
      <div className="max-w-4xl mx-auto bg-[#0B0F1A] border-2 border-[#1F2937] rounded-2xl p-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />

        <h3 className="font-['Cinzel'] text-2xl text-[#F9FAFB] mb-6 flex items-center gap-3">
          <MessageSquare className="text-[#D4AF37]" />
          Interactive Scenario
        </h3>

        <div className="bg-[#111827] p-6 rounded-lg border border-[#374151] mb-8 relative">
          <span className="absolute -top-3 left-6 bg-[#0B0F1A] px-2 text-xs text-[#9CA3AF] font-bold tracking-widest uppercase">
            The Dungeon Master
          </span>
          <p className="text-[#F9FAFB] text-lg font-serif italic">
            "You enter a dusty shop. Behind the counter, a suspicious merchant
            with a scarred eye eyes you nervously. 'Got some rare goods, I do.
            No refunds,' he mutters."
          </p>
        </div>

        <p className="text-[#9CA3AF] mb-4 uppercase text-sm tracking-widest font-bold">
          How do you respond?
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {actions.map((action) => (
            <button
              type="button"
              key={action.label}
              onClick={() => setSelectedAction(action.id)}
              className={`p-3 rounded border bg-[#111827] transition-all duration-300 font-['Cinzel'] ${
                selectedAction === action.id
                  ? "border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10 scale-105"
                  : `border-[#374151] text-[#9CA3AF] ${action.color}`
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>

        <div className="h-24">
          <AnimatePresence mode="wait">
            {selectedAction && (
              <motion.div
                key={selectedAction}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-[#1F2937]/50 rounded-lg border border-[#374151] text-[#D1D5DB]"
              >
                <strong className="text-[#D4AF37] font-['Cinzel']">
                  Outcome:{" "}
                </strong>
                {actions.find((a) => a.id === selectedAction)?.result}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
