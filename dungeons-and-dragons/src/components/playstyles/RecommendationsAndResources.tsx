"use client";

import { motion } from "motion/react";
import { experienceData } from "@/lib/data/experienceData";
import { ExternalLink, BookOpen, Map, Users } from "lucide-react";

export function RecommendationsAndResources() {
  return (
    <section className="py-24 bg-[#0B0F1A] relative">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Beginner Recommendations */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-['Cinzel'] text-4xl text-[#F9FAFB] mb-4"
            >
              Beginner <span className="text-[#D4AF37]">Recommendations</span>
            </motion.h2>
            <p className="text-[#9CA3AF] max-w-2xl mx-auto">
              Not sure where to begin? Here are the best starting points based on your gaming background.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#111827] border border-[#1F2937] p-8 rounded-2xl relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#2563EB]/20 rounded-full blur-xl" />
              <h3 className="font-['Cinzel'] text-2xl text-[#2563EB] mb-4">For Video Game Players</h3>
              <p className="text-[#D1D5DB] mb-6">Start with <strong>Baldur's Gate 3</strong>. It perfectly adapts D&D 5th Edition rules into a visual, automated system, making it the best interactive tutorial available.</p>
              <div className="bg-[#0B0F1A] p-4 rounded-lg border border-[#1F2937]">
                <span className="text-sm text-[#9CA3AF] uppercase tracking-wider block mb-2">Next Step</span>
                <span className="text-[#F9FAFB]">Join a beginner-friendly online campaign once you understand the combat mechanics.</span>
              </div>
            </div>

            <div className="bg-[#111827] border border-[#1F2937] p-8 rounded-2xl relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#D4AF37]/20 rounded-full blur-xl" />
              <h3 className="font-['Cinzel'] text-2xl text-[#D4AF37] mb-4">For Storytelling Lovers</h3>
              <p className="text-[#D1D5DB] mb-6">Look for <strong>Roleplay Communities</strong> or "Story-heavy" campaigns. These games prioritize acting and dialogue over grid-based combat math.</p>
              <div className="bg-[#0B0F1A] p-4 rounded-lg border border-[#1F2937]">
                <span className="text-sm text-[#9CA3AF] uppercase tracking-wider block mb-2">Next Step</span>
                <span className="text-[#F9FAFB]">Create a character backstory and practice reading the rules for skill checks.</span>
              </div>
            </div>

            <div className="bg-[#111827] border border-[#1F2937] p-8 rounded-2xl relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#DC2626]/20 rounded-full blur-xl" />
              <h3 className="font-['Cinzel'] text-2xl text-[#DC2626] mb-4">For Strategy Players</h3>
              <p className="text-[#D1D5DB] mb-6">Dive into <strong>Tactical Campaigns</strong>. Look for "Mega-Dungeon" or "Combat Heavy" tags when searching for groups to play with.</p>
              <div className="bg-[#0B0F1A] p-4 rounded-lg border border-[#1F2937]">
                <span className="text-sm text-[#9CA3AF] uppercase tracking-wider block mb-2">Next Step</span>
                <span className="text-[#F9FAFB]">Study class optimization and combat positioning rules in the Basic Rules.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div>
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-['Cinzel'] text-4xl text-[#F9FAFB] mb-4"
            >
              Dive <span className="text-[#D4AF37]">Deeper</span>
            </motion.h2>
            <p className="text-[#9CA3AF]">
              While our site provides the essential tools and rules to get started, these platforms offer massive external ecosystems for advanced play.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {experienceData.resources.map((resourceGroup, i) => {
              const Icon = resourceGroup.category === "Learn" ? BookOpen : resourceGroup.category === "Play" ? Users : Map;
              
              return (
                <div key={i} className="border border-[#1F2937] rounded-xl overflow-hidden">
                  <div className="bg-[#111827] p-6 border-b border-[#1F2937] flex items-center gap-3">
                    <Icon className="w-6 h-6 text-[#D4AF37]" />
                    <h3 className="font-['Cinzel'] text-xl text-[#F9FAFB]">{resourceGroup.category}</h3>
                  </div>
                  <div className="p-6 bg-[#0B0F1A]">
                    <ul className="space-y-4">
                      {resourceGroup.links.map((link, j) => (
                        <li key={j}>
                          <a 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[#D1D5DB] hover:text-[#D4AF37] transition-colors group"
                          >
                            <span>{link.name}</span>
                            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
