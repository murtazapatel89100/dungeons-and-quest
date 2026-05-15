"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CLASSES, RACES } from "@/lib/character-data";
import {
  buildCharacterDefaults,
  getRecommendedClassesForRace,
} from "@/lib/character-rules";
import { useCharacter } from "./CharacterStateContext";

export function StepRaceClass() {
  const { state, updateState } = useCharacter();

  const currentRaceTypes = state.race
    ? RACES[state.race as keyof typeof RACES] || []
    : [];
  const recommendedClasses = getRecommendedClassesForRace(state.race);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Race Section */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <h3 className="text-xl font-heading font-bold text-white mb-4">
          Race & Ancestry
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="space-y-2">
            <Label className="text-indigo-200">Race</Label>
            <Select
              value={state.race}
              onValueChange={(val) => {
                updateState({
                  race: val,
                  subrace: "",
                  ...buildCharacterDefaults({
                    race: val,
                    subrace: "",
                    characterClass: state.characterClass,
                    background: state.background,
                  }),
                });
              }}
            >
              <SelectTrigger className="bg-black/40 border-white/10 text-white">
                <SelectValue placeholder="Select Race" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10 text-white max-h-[300px]">
                {Object.keys(RACES).map((race) => (
                  <SelectItem key={race} value={race}>
                    {race}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {currentRaceTypes.length > 0 && (
            <div className="space-y-2 animate-in fade-in zoom-in-95 duration-300">
              <Label className="text-indigo-200">Subrace / Type</Label>
              <Select
                value={state.subrace}
                onValueChange={(val) => {
                  updateState({
                    subrace: val,
                    ...buildCharacterDefaults({
                      race: state.race,
                      subrace: val,
                      characterClass: state.characterClass,
                      background: state.background,
                    }),
                  });
                }}
              >
                <SelectTrigger className="bg-black/40 border-white/10 text-white">
                  <SelectValue placeholder="Select Subrace" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10 text-white max-h-[300px]">
                  {currentRaceTypes.map((sr) => (
                    <SelectItem key={sr} value={sr}>
                      {sr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      {/* Class Section */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <h3 className="text-xl font-heading font-bold text-white mb-4">
          Class & Profession
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="space-y-2">
            <Label className="text-rose-200">Class</Label>
            <Select
              value={state.characterClass}
              onValueChange={(val) => {
                updateState({
                  characterClass: val,
                  ...buildCharacterDefaults({
                    race: state.race,
                    subrace: state.subrace,
                    characterClass: val,
                    background: state.background,
                  }),
                });
              }}
            >
              <SelectTrigger className="bg-black/40 border-white/10 text-white">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10 text-white max-h-[300px]">
                {CLASSES.map((cls) => {
                  const isRecommended = recommendedClasses.includes(cls);

                  return (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                      {isRecommended ? " (recommended)" : ""}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {recommendedClasses.length > 0 && (
              <p className="text-xs text-rose-100/70">
                Recommended for {state.race}: {recommendedClasses.join(", ")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
