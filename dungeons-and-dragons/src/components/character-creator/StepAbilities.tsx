"use client";

import { Calculator, Dice5 } from "lucide-react";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ABILITIES, SKILLS } from "@/lib/character-data";
import {
  buildDefaultAbilities,
  getAvailableSkills,
  getClassRule,
} from "@/lib/character-rules";
import type { AbilityStat, SkillName } from "@/lib/character-types";
import { validateCharacter } from "@/lib/character-validation";
import { useCharacter } from "./CharacterStateContext";

const _STAT_NAMES: Record<AbilityStat, string> = {
  STR: "Strength",
  DEX: "Dexterity",
  CON: "Constitution",
  INT: "Intelligence",
  WIS: "Wisdom",
  CHA: "Charisma",
};

export function StepAbilities() {
  const { state, updateNestedState, updateState } = useCharacter();
  const warnings = useMemo(() => validateCharacter(state), [state]);

  const getModifier = (score: number) => {
    const mod = Math.floor((score - 10) / 2);
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  const handleRollStats = () => {
    const roll4d6DropLowest = () => {
      const rolls = Array.from(
        { length: 4 },
        () => Math.floor(Math.random() * 6) + 1,
      );
      rolls.sort((a, b) => a - b);
      const sum = rolls[1] + rolls[2] + rolls[3];
      // Clamp between 8 and 17 as per restrictions.md
      return Math.min(17, Math.max(8, sum));
    };

    const newScores = Array.from({ length: 6 }, () => roll4d6DropLowest());
    newScores.sort((a, b) => b - a); // Sort descending

    const priority =
      getClassRule(state.characterClass)?.abilityPriority || ABILITIES;
    const abilities = {} as Record<AbilityStat, number>;

    priority.forEach((stat, index) => {
      abilities[stat as AbilityStat] = newScores[index];
    });

    updateState({ abilities });
  };

  const setStandardArray = () => {
    updateState({
      abilities: buildDefaultAbilities(state.race, state.characterClass),
    });
  };

  const toggleSkill = (skill: SkillName) => {
    const newSkills = state.skills.includes(skill)
      ? state.skills.filter((s) => s !== skill)
      : [...state.skills, skill];
    updateState({ skills: newSkills });
  };
  const availableSkills = getAvailableSkills(
    state.characterClass,
    state.background,
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Abilities Section */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 relative z-10 gap-4">
          <div>
            <h3 className="text-xl font-['Cinzel'] font-bold text-white">
              Ability Scores
            </h3>
            <p className="text-sm text-muted-foreground">
              Define your core physical and mental traits.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={setStandardArray}
              className="border-white/10 bg-black/40 hover:bg-white/10 hover:text-white"
            >
              <Calculator className="w-4 h-4 mr-2" /> Standard Array
            </Button>
            <Button
              size="sm"
              onClick={handleRollStats}
              className="bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              <Dice5 className="w-4 h-4 mr-2" /> Roll Stats
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
          {ABILITIES.map((statRaw) => {
            const stat = statRaw as AbilityStat;
            const score = state.abilities[stat] || 10;
            const modifier = getModifier(score);
            const hasWarning = warnings.some(
              (w) => w.step === "abilities" && w.field === stat,
            );

            return (
              <div
                key={stat}
                className={`bg-black/40 border rounded-lg p-4 flex flex-col items-center justify-center text-center group transition-colors ${
                  hasWarning
                    ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                    : "border-white/5 hover:border-emerald-500/30"
                }`}
              >
                <span
                  className={`${hasWarning ? "text-red-500" : "text-emerald-400"} font-bold tracking-widest text-sm mb-2 transition-colors`}
                >
                  {stat}
                </span>
                <Input
                  type="number"
                  min={3}
                  max={20}
                  value={score}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10) || 3;
                    updateNestedState("abilities", { [stat]: val });
                  }}
                  className={`w-16 text-center text-2xl font-['Cinzel'] bg-transparent border-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 !p-0 transition-colors ${hasWarning ? "text-red-500" : "text-white"}`}
                />
                <div
                  className={`mt-2 text-xs font-semibold px-2 py-1 rounded transition-colors ${hasWarning ? "bg-red-500/10 text-red-500" : "bg-white/10 text-muted-foreground group-hover:bg-emerald-500/20 group-hover:text-emerald-200"}`}
                >
                  {modifier} Mod
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
        <h3 className="text-xl font-['Cinzel'] font-bold text-white mb-4 relative z-10">
          Skill Proficiencies
        </h3>
        <p className="text-sm text-muted-foreground mb-6 relative z-10">
          Select the skills your character is naturally gifted or trained in.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 relative z-10">
          {SKILLS.map((skillRaw) => {
            const skill = skillRaw as SkillName;
            const isProficient = state.skills.includes(skill);
            const isAvailable = availableSkills.includes(skill);

            return (
              <label
                key={skill}
                htmlFor={`skill-${skill}`}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-colors border-none text-left w-full ${
                  isAvailable
                    ? isProficient
                      ? "bg-indigo-500/10 cursor-pointer"
                      : "bg-transparent hover:bg-white/5 cursor-pointer"
                    : "bg-black/20 opacity-45 cursor-not-allowed"
                }`}
              >
                <Checkbox
                  id={`skill-${skill}`}
                  checked={isProficient}
                  disabled={!isAvailable}
                  onCheckedChange={() => toggleSkill(skill)}
                  className={`border-white/20 ${isProficient ? "bg-indigo-500 border-indigo-500 text-white" : ""}`}
                />
                <span className="text-indigo-100 flex-1">{skill}</span>
                {!isAvailable && (
                  <span className="text-[0.65rem] uppercase tracking-wide text-white/40">
                    Unavailable
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
