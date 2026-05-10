"use client";

import React from "react";
import { useCharacter } from "./CharacterStateContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings2, Dice5 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  RACES,
  CLASSES_AND_SUBCLASSES,
  BACKGROUNDS,
  ALIGNMENTS,
} from "@/lib/character-data";

export function GeneratorControls() {
  const { state, updateNestedState, updateState } = useCharacter();

  const handleFullRandomize = () => {
    // A highly randomized generic set, accounting for locks
    const randomChoice = (arr: string[]) =>
      arr[Math.floor(Math.random() * arr.length)];
    const raceKeys = Object.keys(RACES);
    const classKeys = Object.keys(CLASSES_AND_SUBCLASSES);

    // Only randomize if NOT locked
    if (!state.generatorLocks.race) {
      const chosenRace = randomChoice(raceKeys);
      const subraces = RACES[chosenRace as keyof typeof RACES];
      const chosenSubrace = subraces.length > 0 ? randomChoice(subraces) : "";
      updateState({ race: chosenRace, subrace: chosenSubrace });
    }

    if (!state.generatorLocks.characterClass) {
      const chosenClass = randomChoice(classKeys);
      const subclasses =
        CLASSES_AND_SUBCLASSES[
          chosenClass as keyof typeof CLASSES_AND_SUBCLASSES
        ];
      const chosenSubclass =
        subclasses.length > 0 ? randomChoice(subclasses) : "";
      updateState({ characterClass: chosenClass, subclass: chosenSubclass });
    }

    if (!state.generatorLocks.background) {
      updateState({ background: randomChoice(BACKGROUNDS) });
      updateNestedState("identity", {
        alignment: randomChoice(ALIGNMENTS) as any,
      });
    }

    if (!state.generatorLocks.stats) {
      updateState({
        abilities: {
          STR: Math.floor(Math.random() * 16) + 3,
          DEX: Math.floor(Math.random() * 16) + 3,
          CON: Math.floor(Math.random() * 16) + 3,
          INT: Math.floor(Math.random() * 16) + 3,
          WIS: Math.floor(Math.random() * 16) + 3,
          CHA: Math.floor(Math.random() * 16) + 3,
        },
      });
    }

    // Additional logic could be added for equipment/spells when filters are on.
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
                    htmlFor={`lock-\${lockKey}`}
                    className="capitalize cursor-pointer text-sm"
                  >
                    {lockKey.replace(/([A-Z])/g, " $1").trim()}
                  </Label>
                  <Switch
                    id={`lock-\${lockKey}`}
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
                    htmlFor={`filter-\${filterKey}`}
                    className="capitalize cursor-pointer text-sm"
                  >
                    {filterKey.replace(/([A-Z])/g, " $1").trim()}
                  </Label>
                  <Switch
                    id={`filter-\${filterKey}`}
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
