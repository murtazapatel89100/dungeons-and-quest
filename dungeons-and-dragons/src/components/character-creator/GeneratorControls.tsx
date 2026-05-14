"use client";

import { Dice5, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  ALIGNMENTS,
  BACKGROUNDS,
  CLASSES,
  RACES,
} from "@/lib/character-data";
import { buildCharacterDefaults } from "@/lib/character-rules";
import type { Alignment } from "@/lib/character-types";
import { useCharacter } from "./CharacterStateContext";

export function GeneratorControls() {
  const { state, updateNestedState, updateState } = useCharacter();

  const handleFullRandomize = () => {
    // A highly randomized generic set, accounting for locks
    const randomChoice = (arr: string[] | readonly string[]) =>
      arr[Math.floor(Math.random() * arr.length)];
    const raceKeys = Object.keys(RACES);

    let nextRace = state.race;
    let nextClass = state.characterClass;
    let nextBackground = state.background;
    let nextSubrace = state.subrace;

    if (!state.generatorLocks.race) {
      const chosenRace = randomChoice(raceKeys);
      const subraces = RACES[chosenRace as keyof typeof RACES];
      const chosenSubrace = subraces.length > 0 ? randomChoice(subraces) : "";
      nextRace = chosenRace;
      nextSubrace = chosenSubrace;
    }

    if (!state.generatorLocks.characterClass) {
      nextClass = randomChoice(CLASSES);
    }

    if (!state.generatorLocks.background) {
      nextBackground = randomChoice(BACKGROUNDS);
      updateNestedState("identity", {
        alignment: randomChoice(ALIGNMENTS) as Alignment,
      });
    }

    const defaults = buildCharacterDefaults({
      race: nextRace,
      characterClass: nextClass,
      background: nextBackground,
    });

    updateState({
      race: nextRace,
      subrace: nextSubrace,
      characterClass: nextClass,
      background: nextBackground,
      ...defaults,
      ...(state.generatorLocks.stats ? { abilities: state.abilities } : {}),
      ...(state.generatorLocks.equipment
        ? {
            armor: state.armor,
            weapons: state.weapons,
            equipment: state.equipment,
            tools: state.tools,
            proficiencies: state.proficiencies,
          }
        : {}),
      ...(state.generatorLocks.spells ? { spells: state.spells } : {}),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-100 mt-4 md:mt-0 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
        >
          <Settings2 className="w-4 h-4 mr-2" /> Generator Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-slate-950 border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-['Cinzel'] tracking-wide border-b border-white/10 pb-4">
            Generator Controls
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-4">
          {/* Locks Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-indigo-300">Preserve (Locks)</h4>
            <div className="space-y-3">
              {Object.keys(state.generatorLocks).map((lockKey) => (
                <div
                  key={lockKey}
                  className="flex items-center justify-between"
                >
                  <Label
                    htmlFor={`lock-${lockKey}`}
                    className="capitalize cursor-pointer text-sm"
                  >
                    {lockKey.replace(/([A-Z])/g, " $1").trim()}
                  </Label>
                  <Switch
                    id={`lock-${lockKey}`}
                    checked={
                      state.generatorLocks[
                        lockKey as keyof typeof state.generatorLocks
                      ]
                    }
                    onCheckedChange={(val) =>
                      updateNestedState("generatorLocks", { [lockKey]: val })
                    }
                    className="data-[state=checked]:bg-rose-600"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Filters Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-emerald-300">
              Filters & Priorities
            </h4>
            <div className="space-y-3">
              {Object.keys(state.generatorFilters).map((filterKey) => (
                <div
                  key={filterKey}
                  className="flex items-center justify-between"
                >
                  <Label
                    htmlFor={`filter-${filterKey}`}
                    className="capitalize cursor-pointer text-sm"
                  >
                    {filterKey.replace(/([A-Z])/g, " $1").trim()}
                  </Label>
                  <Switch
                    id={`filter-${filterKey}`}
                    checked={
                      state.generatorFilters[
                        filterKey as keyof typeof state.generatorFilters
                      ]
                    }
                    onCheckedChange={(val) =>
                      updateNestedState("generatorFilters", {
                        [filterKey]: val,
                      })
                    }
                    className="data-[state=checked]:bg-emerald-600"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 mt-4 border-t border-white/10 flex justify-end">
          <Button
            onClick={handleFullRandomize}
            className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg w-full sm:w-auto"
          >
            <Dice5 className="w-4 h-4 mr-2" /> Full Random Generation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
