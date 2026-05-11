"use client";

import React, { useMemo } from "react";
import { useCharacter } from "./CharacterStateContext";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  PERSONALITY_SUGGESTIONS,
  BACKGROUND_TRAITS,
} from "@/lib/character-data";
import { Button } from "@/components/ui/button";
import { Dice5, BookOpen } from "lucide-react";

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
      const currentList: string[] =
        (state.personality as any)[targetKey] || [];
      if (!currentList.includes(randomItem)) {
        updateNestedState("personality", {
          [targetKey]: [...currentList, randomItem],
        });
      }
    }
  };

  const handleTextChange = (targetKey: string, value: string) => {
    const list = value.split("\\n").filter(Boolean);
    updateNestedState("personality", { [targetKey]: list });
  };

  const generatedBackstories = useMemo(() => {
    const race = state.race || "adventurer";
    const charClass = state.characterClass || "hero";
    const bg = state.background || "wanderer";
    
    return [
      `Born as a ${race}, I was raised with the typical traditions of my people until an incident forced me to learn the ways of a ${charClass}. My life as a ${bg} taught me to survive the harsh realities of the world. Now, I seek to make a name for myself and uncover the truth behind the mysteries of my past.`,
      `The path of a ${charClass} was never an easy one, especially for a ${race} like me. Coming from a background as a ${bg}, I had to claw my way up, learning the hard lessons of trust and betrayal. I have lost much, but my resolve remains unbroken as I set out on this new journey.`,
      `As a ${bg}, I always felt a calling to something greater. When my affinity for the skills of a ${charClass} became apparent, I left my homeland behind. Being a ${race} in unfamiliar lands has its challenges, but my unique heritage and training give me the edge I need to forge my own legend.`,
    ];
  }, [state.race, state.characterClass, state.background]);

  const selectBackstory = (story: string) => {
    updateNestedState("personality", { backstory: story });
  };

  const renderSection = (
    title: string,
    dataKey: keyof typeof state.personality,
    sourceInfo: { source: "personality" | "background"; category: string },
  ) => {
    const value = ((state.personality as any)[dataKey] || []).join("\\n");
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
        
        {/* Backstory Section - spanning full width */}
        <div className="space-y-4 md:col-span-2 bg-black/20 p-4 rounded-xl border border-indigo-500/20">
          <div className="flex justify-between items-center mb-1">
            <Label className="text-indigo-200 text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" /> Backstory
            </Label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {generatedBackstories.map((story, idx) => (
              <div 
                key={idx}
                onClick={() => selectBackstory(story)}
                className="text-xs p-3 rounded-lg border border-white/10 bg-black/40 hover:bg-indigo-500/20 hover:border-indigo-500/50 cursor-pointer transition-colors text-white/80 line-clamp-4"
              >
                {story}
              </div>
            ))}
          </div>

          <Textarea
            value={state.personality.backstory || ""}
            onChange={(e) => updateNestedState("personality", { backstory: e.target.value })}
            placeholder="Write your hero's origins, or click a suggestion above to start..."
            className="bg-black/40 border-white/10 text-white placeholder:text-white/20 min-h-[120px]"
          />
        </div>

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

