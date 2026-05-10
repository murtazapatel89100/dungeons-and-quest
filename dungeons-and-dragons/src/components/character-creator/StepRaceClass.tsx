"use client";

import React, { useMemo } from "react";
import { useCharacter } from "./CharacterStateContext";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RACES, CLASSES_AND_SUBCLASSES } from "@/lib/character-data";
import { Input } from "@/components/ui/input";

export function StepRaceClass() {
  const { state, updateState, updateNestedState } = useCharacter();

  const currentRaceTypes = state.race
    ? RACES[state.race as keyof typeof RACES] || []
    : [];
  const currentClassTypes = state.characterClass
    ? CLASSES_AND_SUBCLASSES[
        state.characterClass as keyof typeof CLASSES_AND_SUBCLASSES
      ] || []
    : [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Race Section */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <h3 className="text-xl font-['Cinzel'] font-bold text-white mb-4">
          Race & Ancestry
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="space-y-2">
            <Label className="text-indigo-200">Race</Label>
            <Select
              value={state.race}
              onValueChange={(val) => {
                updateState({ race: val, subrace: "" }); // reset subrace on race change
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
                onValueChange={(val) => updateState({ subrace: val })}
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

        <h3 className="text-xl font-['Cinzel'] font-bold text-white mb-4">
          Class & Profession
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="space-y-2">
            <Label className="text-rose-200">Class</Label>
            <Select
              value={state.characterClass}
              onValueChange={(val) => {
                updateState({ characterClass: val, subclass: "" }); // reset subclass on class change
              }}
            >
              <SelectTrigger className="bg-black/40 border-white/10 text-white">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10 text-white max-h-[300px]">
                {Object.keys(CLASSES_AND_SUBCLASSES).map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    {cls}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {currentClassTypes.length > 0 && (
            <div className="space-y-2 animate-in fade-in zoom-in-95 duration-300">
              <Label className="text-rose-200">Subclass / Domain / Path</Label>
              <Select
                value={state.subclass}
                onValueChange={(val) => updateState({ subclass: val })}
              >
                <SelectTrigger className="bg-black/40 border-white/10 text-white">
                  <SelectValue placeholder="Select Subclass" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10 text-white max-h-[300px]">
                  {currentClassTypes.map((sc) => (
                    <SelectItem key={sc} value={sc}>
                      {sc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      {/* Leveling & Basic Meta */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label className="text-indigo-200">Level</Label>
          <Input
            type="number"
            min={1}
            max={20}
            value={state.meta.level}
            onChange={(e) =>
              updateNestedState("meta", {
                level: parseInt(e.target.value) || 1,
              })
            }
            className="bg-black/30 border-white/10 text-white font-['Cinzel'] text-xl"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-indigo-200">Experience Points (XP)</Label>
          <Input
            type="number"
            min={0}
            value={state.meta.xp}
            onChange={(e) =>
              updateNestedState("meta", { xp: parseInt(e.target.value) || 0 })
            }
            className="bg-black/30 border-white/10 text-white"
          />
        </div>
      </div>
    </div>
  );
}
