"use client";

import { motion } from "motion/react";
import { Book, Crown, Users } from "lucide-react";

export function IntroSection() {
  return (
    <section className="relative w-full">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-['Cinzel'] text-4xl md:text-5xl text-[#F9FAFB] mb-6"
        >
          What is <span className="text-[#D4AF37]">D&D?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-[#9CA3AF] max-w-3xl mx-auto leading-relaxed"
        >
          Dungeons & Dragons is a game of collaborative storytelling. There is
          no board to cross, no single way to win, and no limits to your
          imagination. You and your friends create a story together, guiding
          your heroes through quests for treasure, battles with deadly foes, and
          daring rescues.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Dungeon Master Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-[#111827] border border-[#1F2937] rounded-xl p-8 hover:border-[#6D28D9]/50 transition-colors duration-300 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#6D28D9]/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />

          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-[#6D28D9]/20 rounded-lg border border-[#6D28D9]/30">
              <Crown className="w-8 h-8 text-[#A78BFA]" />
            </div>
            <h3 className="font-['Cinzel'] text-2xl text-[#F9FAFB]">
              The Dungeon Master
            </h3>
          </div>

          <ul className="space-y-4 text-[#9CA3AF]">
            <li className="flex items-start gap-3">
              <span className="text-[#A78BFA] mt-1">✦</span>
              <span>
                <strong>The Storyteller:</strong> Creates the world, describes
                what happens, and controls the monsters.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A78BFA] mt-1">✦</span>
              <span>
                <strong>The Referee:</strong> Interprets the rules and decides
                the outcome of actions based on dice rolls.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A78BFA] mt-1">✦</span>
              <span>
                <strong>The Host:</strong> Plays the role of every other
                character (NPC) the players meet.
              </span>
            </li>
          </ul>
        </motion.div>

        {/* The Players Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-[#111827] border border-[#1F2937] rounded-xl p-8 hover:border-[#DC2626]/50 transition-colors duration-300 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#DC2626]/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />

          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-[#DC2626]/20 rounded-lg border border-[#DC2626]/30">
              <Users className="w-8 h-8 text-[#F87171]" />
            </div>
            <h3 className="font-['Cinzel'] text-2xl text-[#F9FAFB]">
              The Players
            </h3>
          </div>

          <ul className="space-y-4 text-[#9CA3AF]">
            <li className="flex items-start gap-3">
              <span className="text-[#F87171] mt-1">✦</span>
              <span>
                <strong>The Heroes:</strong> Each player controls a single
                character (their Adventurer) in the world.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#F87171] mt-1">✦</span>
              <span>
                <strong>Decision Makers:</strong> They decide what their
                characters say, where they go, and how they fight.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#F87171] mt-1">✦</span>
              <span>
                <strong>The Party:</strong> Players work together as a team to
                overcome challenges set by the DM.
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
