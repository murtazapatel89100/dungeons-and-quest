"use client";

import { motion } from "motion/react";
import { Map, Clock, Users, Target } from "lucide-react";

export function CampaignStructure() {
  return (
    <section className="relative w-full py-16">
      <div className="text-center mb-16">
        <h2 className="font-['Cinzel'] text-4xl text-[#F9FAFB] mb-4">
          The <span className="text-[#10B981]">Adventure</span> Structure
        </h2>
        <p className="text-[#9CA3AF] max-w-2xl mx-auto">
          How is a game of D&D actually organized? From a single night of play
          to an epic multi-year saga.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="relative flex flex-col items-center">
          {/* Main vertical line */}
          <div className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[#10B981] via-[#3B82F6] to-[#8B5CF6] opacity-50 z-0" />

          {/* Node 1: The Campaign */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-2xl mb-12 relative z-10"
          >
            <div className="bg-[#111827] border-2 border-[#10B981]/50 p-6 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.1)] flex items-start gap-6">
              <div className="p-4 bg-[#10B981]/20 rounded-full shrink-0">
                <Map className="w-8 h-8 text-[#10B981]" />
              </div>
              <div>
                <h3 className="font-['Cinzel'] text-2xl text-[#F9FAFB] mb-2">
                  The Campaign
                </h3>
                <p className="text-[#9CA3AF]">
                  The overarching story. Like a TV show series, a campaign
                  connects all your adventures together. It can last for months
                  or even years, tracking your characters from level 1 to
                  god-like power.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Node 2: The Session */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-xl mb-12 relative z-10 ml-0 md:ml-24"
          >
            <div className="bg-[#111827] border border-[#3B82F6]/50 p-6 rounded-xl flex items-start gap-6">
              <div className="p-4 bg-[#3B82F6]/20 rounded-full shrink-0">
                <Clock className="w-8 h-8 text-[#3B82F6]" />
              </div>
              <div>
                <h3 className="font-['Cinzel'] text-xl text-[#F9FAFB] mb-2">
                  The Session
                </h3>
                <p className="text-[#9CA3AF] text-sm">
                  Like a single episode of a TV show. This is one sitting of
                  play, usually lasting 3-4 hours, where you gather around the
                  table (or virtually) with your friends.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Connected elements (Quests & NPCs) */}
          <div className="w-full max-w-3xl flex flex-col md:flex-row gap-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 bg-[#111827] border border-[#8B5CF6]/50 p-6 rounded-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-[#8B5CF6]" />
                <h3 className="font-['Cinzel'] text-xl text-[#F9FAFB]">
                  Quests
                </h3>
              </div>
              <p className="text-[#9CA3AF] text-sm">
                Specific objectives within the campaign. Slaying a dragon,
                rescuing a captive, or retrieving a stolen artifact.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 bg-[#111827] border border-[#EC4899]/50 p-6 rounded-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-[#EC4899]" />
                <h3 className="font-['Cinzel'] text-xl text-[#F9FAFB]">NPCs</h3>
              </div>
              <p className="text-[#9CA3AF] text-sm">
                Non-Player Characters. The merchants, kings, villains, and
                bystanders controlled by the Dungeon Master that flesh out the
                world.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
