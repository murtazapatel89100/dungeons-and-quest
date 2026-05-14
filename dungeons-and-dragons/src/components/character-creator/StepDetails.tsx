"use client";

import { BookOpen, Dice5 } from "lucide-react";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getAlignmentBackstories } from "@/lib/backstory-generator";
import {
  BACKGROUND_TRAITS,
  PERSONALITY_SUGGESTIONS,
} from "@/lib/character-data";
import type { PersonalityTraits } from "@/lib/character-types";
import { useCharacter } from "./CharacterStateContext";

export function StepDetails() {
  const { state, updateNestedState } = useCharacter();

  const handleRandomize = (
    category: string,
    source: "personality" | "background",
    targetKey: keyof PersonalityTraits,
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
      const currentList = (state.personality[targetKey] as string[]) || [];
      if (!currentList.includes(randomItem)) {
        updateNestedState("personality", {
          [targetKey]: [...currentList, randomItem],
        });
      }
    }
  };

  const handleTextChange = (
    targetKey: keyof PersonalityTraits,
    value: string,
  ) => {
    const list = value.split("\n").filter(Boolean);
    updateNestedState("personality", { [targetKey]: list });
  };

  const generatedBackstories = useMemo(() => {
    const race = state.race || "adventurer";
    const charClass = state.characterClass || "hero";
    const bg = state.background || "wanderer";
    const alignment = state.identity?.alignment || "True Neutral";

    return getAlignmentBackstories(alignment, race, charClass, bg);
  }, [state.race, state.characterClass, state.background, state.identity?.alignment]);

  const selectBackstory = (story: string) => {
    updateNestedState("personality", { backstory: story });
  };

  const renderSection = (
    title: string,
    dataKey: keyof PersonalityTraits,
    sourceInfo: { source: "personality" | "background"; category: string },
  ) => {
    const value = ((state.personality[dataKey] as string[]) || []).join("\n");
    return (
      <div className="space-y-2 bg-black/20 p-4 rounded-xl border border-white/5">
        <div className="flex justify-between items-center mb-1">
          <Label className="text-indigo-200 capitalize text-base">
            {title}
          </Label>
          <Button
            type="button"
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
          placeholder={`Enter ${title.toLowerCase()} (one per line)...`}
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
            {generatedBackstories.map((story) => (
              <button
                key={story}
                type="button"
                onClick={() => selectBackstory(story)}
                className="text-left text-xs p-3 rounded-lg border border-white/10 bg-black/40 hover:bg-indigo-500/20 hover:border-indigo-500/50 cursor-pointer transition-colors text-white/80 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              >
                {story}
              </button>
            ))}
          </div>

          <Textarea
            value={state.personality.backstory || ""}
            onChange={(e) =>
              updateNestedState("personality", { backstory: e.target.value })
            }
            placeholder="Write your hero's origins, or click a suggestion above to start..."
            className="bg-black/40 border-white/10 text-white placeholder:text-white/20 min-h-[250px]"
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
