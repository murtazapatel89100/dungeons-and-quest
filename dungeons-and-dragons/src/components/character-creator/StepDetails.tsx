"use client";

import React from "react";
import { useCharacter } from "./CharacterStateContext";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  PERSONALITY_SUGGESTIONS,
  BACKGROUND_TRAITS,
} from "@/lib/character-data";
import { Button } from "@/components/ui/button";
import { Dice5 } from "lucide-react";

export function StepDetails() {
  const { state, updateNestedState } = useCharacter();

  const handleRandomize = (
    category: string,
    source: "personality" | "background",
    targetKey: string,
  ) => {
    let pool: string[] = [];
    if (source === "personality") {
      pool =
        PERSONALITY_SUGGESTIONS[
          category as keyof typeof PERSONALITY_SUGGESTIONS
        ] || [];
    } else {
      pool =
        BACKGROUND_TRAITS[category as keyof typeof BACKGROUND_TRAITS] || [];
    }

    if (pool.length > 0) {
      const randomItem = pool[Math.floor(Math.random() * pool.length)];
      // Append to existing traits or replace, let's just append if it's text, but our state holds arrays.. wait.
      // Wait, let's just join the array to a string for Textarea, or manage it as single string.
      // Our state is actually arrays of strings: `traits: string[];` in CharacterState.
      // For simplicity, let's treat the Textarea as joining the strings with a newline.

      const currentList: string[] =
        state.personality[targetKey as keyof typeof state.personality] || [];
      if (!currentList.includes(randomItem)) {
        updateNestedState("personality", {
          [targetKey]: [...currentList, randomItem],
        });
      }
    }
  };

  const handleTextChange = (targetKey: string, value: string) => {
    // split by newline to re-form array
    const list = value.split("\\n").filter(Boolean);
    updateNestedState("personality", { [targetKey]: list });
  };

  const renderSection = (
    title: string,
    dataKey: keyof typeof state.personality,
    sourceInfo: { source: "personality" | "background"; category: string },
  ) => {
    const value = (state.personality[dataKey] || []).join("\\n");
    return (
      <div className="space-y-2 bg-black/20 p-4 rounded-xl border border-white/5">
        <div className="flex justify-between items-center mb-1">
          <Label className="text-indigo-200 capitalize text-base">
            {title}
          </Label>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-indigo-400 hover:text-indigo-300 hover:bg-white/10"
            onClick={() =>
              handleRandomize(sourceInfo.category, sourceInfo.source, dataKey)
            }
          >
            <Dice5 className="w-4 h-4 mr-1" /> Suggest
          </Button>
        </div>
        <Textarea
          value={value}
          onChange={(e) => handleTextChange(dataKey, e.target.value)}
          placeholder={`Enter \${title.toLowerCase()} (one per line)...`}
          className="bg-black/40 border-white/10 text-white placeholder:text-white/20 min-h-[80px]"
        />
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
      <div className="border-b border-white/10 pb-4 shrink-0">
        <h2 className="text-2xl font-['Cinzel'] font-bold text-white mb-2">
          Persona & Backstory
        </h2>
        <p className="text-muted-foreground">
          Flesh out the soul, the flaws, and the motivations of your hero.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-max">
        {renderSection("Personality Traits", "traits", {
          source: "personality",
          category: "Traits",
        })}
        {renderSection("Ideals", "ideals", {
          source: "background",
          category: "Ideals",
        })}
        {renderSection("Bonds", "bonds", {
          source: "background",
          category: "Bonds",
        })}
        {renderSection("Flaws", "flaws", {
          source: "background",
          category: "Flaws",
        })}
        {renderSection("Quirks", "quirks", {
          source: "personality",
          category: "Quirks",
        })}
        {renderSection("Fears", "fears", {
          source: "personality",
          category: "Fears",
        })}
        {renderSection("Goals", "goals", {
          source: "personality",
          category: "Goals",
        })}
        {renderSection("Secrets", "secrets", {
          source: "personality",
          category: "Secrets",
        })}
      </div>
    </div>
  );
}
