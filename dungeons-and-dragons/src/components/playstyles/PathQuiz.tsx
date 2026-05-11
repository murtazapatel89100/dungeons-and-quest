"use client";

import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Question = {
  id: string;
  question: string;
  options: { label: string; resultTag: string }[];
};

const questions: Question[] = [
  {
    id: "q1",
    question: "Do you enjoy video games and digital RPGs?",
    options: [
      {
        label: "Yes, I prefer visual gameplay and let the game do the math.",
        resultTag: "video-games",
      },
      {
        label: "Sometimes, but I prefer tabletop imagination.",
        resultTag: "tabletop",
      },
      {
        label: "Not really, I prefer text-based or spoken roleplay.",
        resultTag: "rp-communities",
      },
    ],
  },
  {
    id: "q2",
    question: "What excites you most in a fantasy setting?",
    options: [
      {
        label: "Complex tactical combat and optimized builds.",
        resultTag: "tactical",
      },
      {
        label: "Deep character interactions and dramatic acting.",
        resultTag: "rp-communities",
      },
      {
        label: "Creating massive worlds and drawing maps.",
        resultTag: "worldbuilding",
      },
      {
        label: "A healthy mix of combat, exploration, and roleplay.",
        resultTag: "tabletop",
      },
    ],
  },
  {
    id: "q3",
    question: "How do you prefer to play?",
    options: [
      {
        label: "With a dedicated group of friends for months.",
        resultTag: "tabletop",
      },
      {
        label: "In massive online communities with hundreds of players.",
        resultTag: "rp-communities",
      },
      { label: "By myself, exploring at my own pace.", resultTag: "solo" },
    ],
  },
];

export function PathQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  const handleOptionSelect = (tag: string) => {
    setScores((prev) => ({
      ...prev,
      [tag]: (prev[tag] || 0) + 1,
    }));

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const getTopResult = () => {
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const topTag = sorted[0]?.[0] || "tabletop";

    // Map tag to friendly names
    const names: Record<string, string> = {
      "video-games": "Video Game RPGs (like Baldur's Gate 3)",
      tabletop: "Classic Tabletop D&D",
      "rp-communities": "Roleplay Communities",
      tactical: "Tactical Combat Campaigns",
      worldbuilding: "Lore & Worldbuilding",
      solo: "Solo & AI Adventures",
    };

    return names[topTag];
  };

  const resetQuiz = () => {
    setScores({});
    setCurrentStep(0);
    setIsFinished(false);
  };

  return (
    <section
      id="quiz"
      className="py-24 bg-[#0B0F1A] relative border-t border-[#1F2937]"
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 mx-auto bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6 border border-[#D4AF37]/30"
          >
            <Sparkles className="w-8 h-8 text-[#D4AF37]" />
          </motion.div>
          <h2 className="font-['Cinzel'] text-4xl text-[#F9FAFB] mb-4">
            Consult the <span className="text-[#D4AF37]">Oracle</span>
          </h2>
          <p className="text-[#9CA3AF]">
            Answer a few questions to discover your ideal D&D experience.
          </p>
        </div>

        <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden min-h-[400px] flex flex-col justify-center">
          {/* Progress bar */}
          {!isFinished && (
            <div className="absolute top-0 left-0 w-full h-1 bg-[#1F2937]">
              <motion.div
                className="h-full bg-[#D4AF37]"
                initial={{ width: 0 }}
                animate={{
                  width: `${(currentStep / questions.length) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div
                key={`step-${currentStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-2xl mx-auto"
              >
                <span className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-4 block">
                  Question {currentStep + 1} of {questions.length}
                </span>
                <h3 className="text-2xl md:text-3xl font-['Cinzel'] text-[#F9FAFB] mb-8 leading-tight">
                  {questions[currentStep].question}
                </h3>

                <div className="space-y-4">
                  {questions[currentStep].options.map((opt) => (
                    <button
                      type="button"
                      key={opt.label}
                      onClick={() => handleOptionSelect(opt.resultTag)}
                      className="w-full text-left p-6 rounded-xl border border-[#374151] bg-[#0B0F1A]/50 hover:bg-[#1F2937] hover:border-[#D4AF37] transition-all duration-300 text-[#D1D5DB] hover:text-white flex items-center justify-between group"
                    >
                      <span>{opt.label}</span>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all text-[#D4AF37]" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center w-full max-w-2xl mx-auto py-8"
              >
                <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-[#D4AF37] to-[#F59E0B] rounded-full blur-[20px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none" />

                <h3 className="text-[#9CA3AF] text-lg mb-2 uppercase tracking-widest">
                  The Oracle Decrees:
                </h3>
                <h4 className="font-['Cinzel'] text-4xl md:text-5xl text-[#F9FAFB] mb-8">
                  {getTopResult()}
                </h4>

                <p className="text-[#D1D5DB] mb-12">
                  Based on your answers, this path aligns perfectly with your
                  interests. Scroll down to see specific recommendations to get
                  started!
                </p>

                <button
                  type="button"
                  onClick={resetQuiz}
                  className="mx-auto flex items-center gap-2 text-[#9CA3AF] hover:text-[#D4AF37] transition-colors pb-1 border-b border-transparent hover:border-[#D4AF37]"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retake Quiz
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
