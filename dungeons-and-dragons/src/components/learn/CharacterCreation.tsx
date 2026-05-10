"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { learnData } from "@/lib/data/learnData";
import {
  User,
  Leaf,
  Mountain,
  Flame,
  ShieldAlert,
  Sword,
  BookOpen,
  Scissors,
  Heart,
  Music,
  Activity,
  Brain,
  Eye,
  Zap,
  Shield,
  MessageCircle,
} from "lucide-react";

// Icon mapping helper
const getIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    User,
    Leaf,
    Mountain,
    Flame,
    ShieldAlert,
    Sword,
    BookOpen,
    Dagger: Scissors,
    Cross: Heart,
    Music,
  };
  const IconComponent = icons[iconName] || User;
  return <IconComponent className="w-6 h-6" />;
};

const abilities = [
  {
    name: "Strength",
    desc: "Physical power, athletic training, and the extent to which you can exert raw physical force.",
    icon: Sword,
  },
  { name: "Dexterity", desc: "Agility, reflexes, and balance.", icon: Zap },
  {
    name: "Constitution",
    desc: "Health, stamina, and vital force.",
    icon: Activity,
  },
  {
    name: "Intelligence",
    desc: "Mental acuity, information recall, and analytical skill.",
    icon: Brain,
  },
  { name: "Wisdom", desc: "Awareness, intuition, and insight.", icon: Eye },
  {
    name: "Charisma",
    desc: "Confidence, eloquence, and leadership.",
    icon: MessageCircle,
  },
];

export function CharacterCreation() {
  const [activeTab, setActiveTab] = useState<"races" | "classes" | "abilities">(
    "races",
  );
  const [selectedItem, setSelectedItem] = useState<number>(0);

  const handleTabChange = (tab: "races" | "classes" | "abilities") => {
    setActiveTab(tab);
    setSelectedItem(0);
  };

  return (
    <section className="relative w-full py-16">
      <div className="text-center mb-12">
        <h2 className="font-['Cinzel'] text-4xl text-[#F9FAFB] mb-4">
          Forging Your <span className="text-[#D4AF37]">Hero</span>
        </h2>
        <p className="text-[#9CA3AF] max-w-2xl mx-auto">
          Every adventurer needs an identity. Choose your lineage, your
          profession, and roll your core attributes.
        </p>
      </div>

      <div className="max-w-6xl mx-auto bg-[#111827] border border-[#1F2937] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[500px]">
        {/* Sidebar / Tabs */}
        <div className="md:w-64 bg-[#0B0F1A] p-6 border-r border-[#1F2937] flex flex-col gap-8">
          <div className="flex flex-row md:flex-col gap-2">
            <button
              onClick={() => handleTabChange("races")}
              className={`p-3 rounded-lg text-left font-['Cinzel'] transition-all ${
                activeTab === "races"
                  ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/50"
                  : "text-[#9CA3AF] hover:bg-[#1F2937] border border-transparent"
              }`}
            >
              Races
            </button>
            <button
              onClick={() => handleTabChange("classes")}
              className={`p-3 rounded-lg text-left font-['Cinzel'] transition-all ${
                activeTab === "classes"
                  ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/50"
                  : "text-[#9CA3AF] hover:bg-[#1F2937] border border-transparent"
              }`}
            >
              Classes
            </button>
            <button
              onClick={() => handleTabChange("abilities")}
              className={`p-3 rounded-lg text-left font-['Cinzel'] transition-all ${
                activeTab === "abilities"
                  ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/50"
                  : "text-[#9CA3AF] hover:bg-[#1F2937] border border-transparent"
              }`}
            >
              Ability Scores
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-10 relative overflow-hidden">
          {/* List of items depending on tab */}
          <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {activeTab === "races" &&
              learnData.races.map((race, idx) => (
                <button
                  key={race.name}
                  onClick={() => setSelectedItem(idx)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full border transition-all ${
                    selectedItem === idx
                      ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                      : "border-[#1F2937] text-[#9CA3AF] hover:border-[#374151]"
                  }`}
                >
                  {race.name}
                </button>
              ))}
            {activeTab === "classes" &&
              learnData.classes.map((cls, idx) => (
                <button
                  key={cls.name}
                  onClick={() => setSelectedItem(idx)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full border transition-all ${
                    selectedItem === idx
                      ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                      : "border-[#1F2937] text-[#9CA3AF] hover:border-[#374151]"
                  }`}
                >
                  {cls.name}
                </button>
              ))}
            {activeTab === "abilities" &&
              abilities.map((ab, idx) => (
                <button
                  key={ab.name}
                  onClick={() => setSelectedItem(idx)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full border transition-all ${
                    selectedItem === idx
                      ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                      : "border-[#1F2937] text-[#9CA3AF] hover:border-[#374151]"
                  }`}
                >
                  {ab.name}
                </button>
              ))}
          </div>

          {/* Details Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${selectedItem}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "races" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-[#1F2937] rounded-xl text-[#D4AF37]">
                      {getIcon(learnData.races[selectedItem].icon)}
                    </div>
                    <div>
                      <h3 className="font-['Cinzel'] text-3xl text-[#F9FAFB]">
                        {learnData.races[selectedItem].name}
                      </h3>
                      <p className="text-[#9CA3AF] italic">
                        {learnData.races[selectedItem].tagline}
                      </p>
                    </div>
                  </div>
                  <p className="text-[#E5E7EB] text-lg leading-relaxed">
                    {learnData.races[selectedItem].description}
                  </p>

                  <div className="bg-[#0B0F1A] border border-[#1F2937] p-6 rounded-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#D4AF37]" />
                    <h4 className="font-['Cinzel'] text-xl mb-4 text-[#D4AF37]">
                      Racial Traits
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[#9CA3AF]">
                      {learnData.races[selectedItem].traits.map((trait, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#6D28D9] rounded-full" />
                          {trait}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <blockquote className="border-l-2 border-[#1F2937] pl-4 text-[#9CA3AF] italic">
                    {learnData.races[selectedItem].flavor}
                  </blockquote>
                </div>
              )}

              {activeTab === "classes" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-[#1F2937] rounded-xl text-[#D4AF37]">
                      {getIcon(learnData.classes[selectedItem].icon)}
                    </div>
                    <div>
                      <h3 className="font-['Cinzel'] text-3xl text-[#F9FAFB]">
                        {learnData.classes[selectedItem].name}
                      </h3>
                      <p className="text-[#9CA3AF] italic">
                        {learnData.classes[selectedItem].tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-2">
                    <span className="px-3 py-1 bg-[#1F2937] text-xs uppercase tracking-wider rounded border border-[#374151] text-[#9CA3AF]">
                      Difficulty:{" "}
                      <span
                        className={
                          learnData.classes[selectedItem].difficulty ===
                          "Beginner"
                            ? "text-green-400"
                            : learnData.classes[selectedItem].difficulty ===
                                "Intermediate"
                              ? "text-yellow-400"
                              : "text-red-400"
                        }
                      >
                        {learnData.classes[selectedItem].difficulty}
                      </span>
                    </span>
                    <span className="px-3 py-1 bg-[#1F2937] text-xs uppercase tracking-wider rounded border border-[#374151] text-[#9CA3AF]">
                      Role: {learnData.classes[selectedItem].playstyle}
                    </span>
                  </div>

                  <p className="text-[#E5E7EB] text-lg leading-relaxed">
                    {learnData.classes[selectedItem].description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-[#0B0F1A] border border-[#1F2937] p-5 rounded-lg border-t-2 border-t-green-500/50">
                      <h4 className="font-['Cinzel'] text-lg mb-3 text-green-400">
                        Strengths
                      </h4>
                      <ul className="space-y-2 text-[#9CA3AF]">
                        {learnData.classes[selectedItem].strengths.map(
                          (str, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-green-500 mt-1">✓</span>{" "}
                              {str}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                    <div className="bg-[#0B0F1A] border border-[#1F2937] p-5 rounded-lg border-t-2 border-t-red-500/50">
                      <h4 className="font-['Cinzel'] text-lg mb-3 text-red-400">
                        Weaknesses
                      </h4>
                      <ul className="space-y-2 text-[#9CA3AF]">
                        {learnData.classes[selectedItem].weaknesses.map(
                          (wk, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-red-500 mt-1">✗</span> {wk}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "abilities" && (
                <div className="space-y-8">
                  <div className="flex items-center justify-center mb-8">
                    {/* Visual representation of stats - radar chart style or simpler */}
                    <div className="w-full max-w-md aspect-square bg-[#0B0F1A] rounded-full border border-[#1F2937] relative flex items-center justify-center p-8">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#6D28D9]/10 to-[#D4AF37]/10 rounded-full blur-xl" />

                      <div className="text-center z-10 space-y-4">
                        {(() => {
                          const AbIcon = abilities[selectedItem].icon;
                          return (
                            <AbIcon className="w-16 h-16 text-[#D4AF37] mx-auto" />
                          );
                        })()}
                        <h3 className="font-['Cinzel'] text-4xl text-[#F9FAFB]">
                          {abilities[selectedItem].name}
                        </h3>
                        <p className="text-[#9CA3AF] text-lg max-w-xs mx-auto">
                          {abilities[selectedItem].desc}
                        </p>
                      </div>

                      {/* Decorative outer ring */}
                      <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="48"
                          fill="none"
                          stroke="#1F2937"
                          strokeWidth="0.5"
                          strokeDasharray="2 4"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#374151"
                          strokeWidth="0.5"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
