"use client";

import {
  ChevronLeft,
  Download,
  Heart,
  ScrollText,
  Sparkles,
  Sword,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { calculateArmorClass, getWeaponDamage } from "@/lib/character-rules";
import type {
  AbilityStat,
  CharacterState,
  SkillName,
} from "@/lib/character-types";

// Note: Metadata cannot be exported from a Client Component.
// For dynamic metadata based on character state, a different approach would be needed.
// However, we can provide a default via a layout or by converting this to a server component wrapper.
// Given the existing project structure, we will keep it as is or add it if the user confirms the strategy.

const SKILL_STAT_MAP: Record<string, AbilityStat> = {
  Acrobatics: "DEX",
  "Animal Handling": "WIS",
  Arcana: "INT",
  Athletics: "STR",
  Deception: "CHA",
  History: "INT",
  Insight: "WIS",
  Intimidation: "CHA",
  Investigation: "INT",
  Medicine: "WIS",
  Nature: "INT",
  Perception: "WIS",
  Performance: "CHA",
  Persuasion: "CHA",
  Religion: "INT",
  "Sleight of Hand": "DEX",
  Stealth: "DEX",
  Survival: "WIS",
};

const ABILITIES: AbilityStat[] = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

export default function CharacterSheetPage() {
  const [character, setCharacter] = useState<CharacterState | null>(null);
  const [activeTab, setActiveTab] = useState<
    "actions" | "spells" | "inventory" | "features" | "background"
  >("actions");
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("dnd_character_sheet");
    if (data) {
      try {
        setCharacter(JSON.parse(data));
      } catch (e) {
        console.error("Failed to parse character data", e);
      }
    }
  }, []);

  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0c]">
        <div className="text-white text-xl animate-pulse font-heading flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-indigo-500" /> Summoning your
          hero...
        </div>
      </div>
    );
  }

  const calculateModifier = (score: number) => Math.floor((score - 10) / 2);
  const formatMod = (mod: number) => (mod >= 0 ? `+${mod}` : String(mod));

  const getSkillMod = (skillName: string) => {
    const stat = SKILL_STAT_MAP[skillName];
    const baseMod = calculateModifier(character.abilities[stat]);
    const isProficient = character.skills.includes(skillName as SkillName);
    return baseMod + (isProficient ? character.meta.proficiencyBonus : 0);
  };

  const getSaveMod = (stat: AbilityStat) => {
    const baseMod = calculateModifier(character.abilities[stat]);
    const isProficient = character.savingThrows.includes(stat);
    return baseMod + (isProficient ? character.meta.proficiencyBonus : 0);
  };

  const passivePerception = 10 + getSkillMod("Perception");
  const passiveInvestigation = 10 + getSkillMod("Investigation");
  const passiveInsight = 10 + getSkillMod("Insight");

  const initiative = calculateModifier(character.abilities.DEX);
  const armorClass = calculateArmorClass(
    character.armor,
    character.abilities,
    character.characterClass,
  );

  // Calculate max HP from hit dice for level 1 (max of hit dice + con mod)
  const hitDiceValue = character.meta?.hitDice
    ? parseInt(character.meta.hitDice.split("d")[1], 10)
    : 8;
  const maxHp = Math.max(
    1,
    hitDiceValue + calculateModifier(character.abilities.CON),
  );

  const getSpellcastingStat = (cls: string): AbilityStat => {
    switch (cls) {
      case "Bard":
      case "Paladin":
      case "Sorcerer":
      case "Warlock":
        return "CHA";
      case "Cleric":
      case "Druid":
      case "Ranger":
        return "WIS";
      case "Wizard":
      case "Fighter":
      case "Rogue":
      default:
        return "INT";
    }
  };

  const spellStat = getSpellcastingStat(character.characterClass);
  const spellMod = calculateModifier(character.abilities[spellStat]);

  return (
    <div className="min-h-screen bg-[#0f1115] text-slate-300 relative overflow-x-hidden font-sans pt-24 pb-12">
      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-900/30 blur-[150px] rounded-full animate-pulse duration-[10000ms]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-amber-900/20 blur-[120px] rounded-full animate-pulse duration-[8000ms]" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 p-4 sm:p-6 space-y-6">
        {/* Action Controls - Hidden in PDF */}
        <div className="flex justify-between items-center gap-4 no-print-actions">
          <Button
            variant="ghost"
            onClick={() => router.push("/characters/custom")}
            className="text-indigo-400 hover:text-indigo-300 hover:bg-white/5"
          >
            <ChevronLeft className="w-5 h-5 mr-1" /> Back
          </Button>
          <Button
            className="bg-indigo-600 hover:bg-indigo-500 text-white"
            onClick={async () => {
              try {
                const res = await fetch("/api/export-pdf", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(character),
                });

                if (!res.ok) throw new Error("Failed to generate PDF");

                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${character.identity.name || "character"}-sheet.pdf`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
              } catch (error) {
                console.error("PDF export error:", error);
                alert("Failed to generate PDF. Please try again.");
              }
            }}
          >
            <Download className="w-4 h-4 mr-2" /> Export PDF
          </Button>
        </div>

        {/* Character Identity Header - Captured in PDF */}
        <div className="bg-[#1a1d24]/90 backdrop-blur-md p-6 rounded-xl border border-white/5 shadow-xl flex flex-col sm:flex-row items-center sm:items-end gap-6 character-identity-section">
          <div className="relative group">
            {character.identity.imageUrl ? (
              /* biome-ignore lint/performance/noImgElement: Using img for character portrait as it is dynamic and external */
              <img
                src={character.identity.imageUrl}
                alt="Portrait"
                className="w-32 h-32 rounded-xl object-cover border-2 border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
              />
            ) : (
              <div className="w-32 h-32 rounded-xl bg-[#2a2d35] flex items-center justify-center border-2 border-indigo-500/30 shadow-inner">
                <Sword className="w-12 h-12 text-slate-600" />
              </div>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black text-white font-heading tracking-tight drop-shadow-sm">
              {character.identity.name || "Unnamed Hero"}
            </h1>
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-indigo-300 font-medium">
              <span className="flex items-center gap-1.5 uppercase text-xs tracking-widest">
                <Sparkles className="w-3 h-3" /> {character.race}{" "}
                {character.characterClass}
              </span>
              <span className="hidden sm:inline text-white/20">•</span>
              <span className="uppercase text-xs tracking-widest">
                {character.background}
              </span>
              <span className="hidden sm:inline text-white/20">•</span>
              <span className="uppercase text-xs tracking-widest">
                {character.identity.alignment}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-6">
          {/* LEFT SIDEBAR (Abilities, Saves, Senses, Proficiencies, Skills) */}
          <div className="w-full xl:w-[340px] flex-shrink-0 flex flex-col gap-6">
            {/* Ability Scores */}
            <div className="grid grid-cols-3 sm:grid-cols-6 xl:grid-cols-3 gap-3">
              {ABILITIES.map((stat) => {
                const score = character.abilities[stat];
                const mod = calculateModifier(score);
                return (
                  <div
                    key={stat}
                    className="bg-[#1a1d24]/90 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center shadow-md relative overflow-hidden group hover:border-indigo-500/30 transition-colors"
                  >
                    <span className="text-[10px] font-bold text-slate-400 mb-1 tracking-wider uppercase">
                      {stat}
                    </span>
                    <span className="text-2xl font-black text-white">
                      {formatMod(mod)}
                    </span>
                    <div className="mt-1 w-8 h-5 rounded-full bg-black/50 flex items-center justify-center border border-white/5">
                      <span className="text-xs font-semibold text-slate-300">
                        {score}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Saving Throws */}
            <div className="bg-[#1a1d24]/90 border border-white/5 rounded-xl p-4 shadow-md">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 pb-2 border-b border-white/5">
                Saving Throws
              </h3>
              <div className="space-y-2">
                {ABILITIES.map((stat) => {
                  const isProficient = character.savingThrows.includes(stat);
                  const mod = getSaveMod(stat);
                  return (
                    <div key={stat} className="flex items-center text-sm">
                      <div
                        className={`w-3 h-3 rounded-full border border-slate-500 mr-3 flex items-center justify-center ${isProficient ? "bg-indigo-500 border-indigo-500" : ""}`}
                      >
                        {isProficient && (
                          <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        )}
                      </div>
                      <span className="w-8 font-mono text-slate-300">
                        {formatMod(mod)}
                      </span>
                      <span className="text-slate-200">{stat}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-[#1a1d24]/90 border border-white/5 rounded-xl p-4 shadow-md">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 pb-2 border-b border-white/5">
                Skills
              </h3>
              <div className="space-y-1.5">
                {Object.keys(SKILL_STAT_MAP).map((skill) => {
                  const stat = SKILL_STAT_MAP[skill];
                  const isProficient = character.skills.includes(
                    skill as SkillName,
                  );
                  const mod = getSkillMod(skill);
                  return (
                    <div
                      key={skill}
                      className="flex items-center text-sm hover:bg-white/5 p-1 rounded transition-colors"
                    >
                      <div
                        className={`w-3 h-3 rounded-full border border-slate-500 mr-2 flex-shrink-0 flex items-center justify-center ${isProficient ? "bg-indigo-500 border-indigo-500" : ""}`}
                      >
                        {isProficient && (
                          <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        )}
                      </div>
                      <span className="w-8 font-mono text-slate-300 flex-shrink-0">
                        {formatMod(mod)}
                      </span>
                      <span className="text-slate-200 flex-1 truncate">
                        {skill}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono w-6 text-right">
                        {stat.substring(0, 3)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Senses */}
            <div className="bg-[#1a1d24]/90 border border-white/5 rounded-xl p-4 shadow-md space-y-3">
              <div className="flex items-center justify-between bg-black/40 p-2 rounded-lg border border-white/5">
                <span className="text-sm text-slate-300">
                  Passive Perception
                </span>
                <span className="text-lg font-bold text-indigo-300">
                  {passivePerception}
                </span>
              </div>
              <div className="flex items-center justify-between bg-black/40 p-2 rounded-lg border border-white/5">
                <span className="text-sm text-slate-300">
                  Passive Investigation
                </span>
                <span className="text-lg font-bold text-indigo-300">
                  {passiveInvestigation}
                </span>
              </div>
              <div className="flex items-center justify-between bg-black/40 p-2 rounded-lg border border-white/5">
                <span className="text-sm text-slate-300">Passive Insight</span>
                <span className="text-lg font-bold text-indigo-300">
                  {passiveInsight}
                </span>
              </div>
              <div className="pt-2 text-xs text-slate-400 text-center">
                Senses
              </div>
            </div>

            {/* Proficiencies & Training */}
            <div className="bg-[#1a1d24]/90 border border-white/5 rounded-xl p-4 shadow-md">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 pb-2 border-b border-white/5">
                Proficiencies & Training
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-[10px] uppercase text-indigo-400 mb-1">
                    Armor
                  </h4>
                  <p className="text-sm text-slate-300 leading-tight">
                    {character.proficiencies.armor.length > 0
                      ? character.proficiencies.armor.join(", ")
                      : "None"}
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase text-indigo-400 mb-1">
                    Weapons
                  </h4>
                  <p className="text-sm text-slate-300 leading-tight">
                    {character.proficiencies.weapons.length > 0
                      ? character.proficiencies.weapons.join(", ")
                      : "None"}
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase text-indigo-400 mb-1">
                    Tools
                  </h4>
                  <p className="text-sm text-slate-300 leading-tight">
                    {character.proficiencies.tools.length > 0
                      ? character.proficiencies.tools.join(", ")
                      : "None"}
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase text-indigo-400 mb-1">
                    Languages
                  </h4>
                  <p className="text-sm text-slate-300 leading-tight">
                    {character.languages?.join(", ") || "None"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            {/* Top Bar Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              <div className="bg-[#1a1d24]/90 border border-white/5 rounded-xl p-3 flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400 w-min">
                  Proficiency Bonus
                </span>
                <span className="text-2xl font-black text-white">
                  {formatMod(character.meta.proficiencyBonus)}
                </span>
              </div>
              <div className="bg-[#1a1d24]/90 border border-white/5 rounded-xl p-3 flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400 w-min">
                  Walking Speed
                </span>
                <span className="text-2xl font-black text-white">
                  30
                  <span className="text-sm font-normal text-slate-500 ml-0.5">
                    ft.
                  </span>
                </span>
              </div>
              <div className="bg-[#1a1d24]/90 border border-white/5 rounded-xl p-3 flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400 w-min">
                  Initiative
                </span>
                <span className="text-2xl font-black text-indigo-400">
                  {formatMod(initiative)}
                </span>
              </div>
              <div className="bg-[#1a1d24]/90 border border-white/5 rounded-xl p-3 flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400 w-min">
                  Armor Class
                </span>
                <span className="text-3xl font-black text-white">
                  {armorClass}
                </span>
              </div>

              {/* HP Block spans 2 columns on lg */}
              <div className="col-span-2 bg-[#1a1d24]/90 border border-red-900/30 rounded-xl p-3 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] uppercase font-bold text-red-400/80">
                    Hit Points
                  </span>
                  <Heart className="w-3 h-3 text-red-500/50" />
                </div>
                <div className="flex items-end gap-2">
                  <div className="text-3xl font-black text-white leading-none">
                    {maxHp}
                  </div>
                  <div className="text-lg text-slate-500 leading-none mb-0.5">
                    / {maxHp}
                  </div>
                  <div className="ml-auto text-sm text-slate-500 border border-white/10 px-2 py-1 rounded bg-black/40">
                    Temp --
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex overflow-x-auto custom-scrollbar gap-2 bg-[#1a1d24]/80 p-2 rounded-xl border border-white/5 flex-shrink-0">
              {(
                [
                  "actions",
                  "spells",
                  "inventory",
                  "features",
                  "background",
                ] as const
              ).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors \${
                    activeTab === tab 
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/50" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab === "features" ? "Features & Traits" : tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 bg-[#1a1d24]/90 border border-white/5 rounded-xl p-6 shadow-xl min-h-[500px]">
              {activeTab === "actions" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-lg font-bold text-white mb-4 font-heading border-b border-white/10 pb-2">
                    Actions in Combat
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3 bg-white/5 p-2 rounded">
                        Attack Actions
                      </h3>
                      {character.weapons.length > 0 ? (
                        <div className="grid gap-3">
                          {character.weapons.map((w) => {
                            const isFinesse = [
                              "Rapier",
                              "Shortsword",
                              "Dagger",
                              "Scimitar",
                              "Dart",
                            ].includes(w);
                            const isRanged = [
                              "Longbow",
                              "Shortbow",
                              "Light Crossbow",
                              "Sling",
                              "Dart",
                            ].includes(w);

                            const strMod = calculateModifier(
                              character.abilities.STR,
                            );
                            const dexMod = calculateModifier(
                              character.abilities.DEX,
                            );

                            const attackStatMod = isRanged
                              ? dexMod
                              : isFinesse
                                ? Math.max(strMod, dexMod)
                                : strMod;
                            
                            const damageDice = getWeaponDamage(w);

                            return (
                              <div
                                key={w}
                                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-black/40 border border-white/5 p-3 rounded-lg hover:border-indigo-500/30 transition-colors"
                              >
                                <div>
                                  <span className="font-bold text-white text-base">
                                    {w}
                                  </span>
                                  <p className="text-xs text-slate-400">
                                    Weapon Attack
                                  </p>
                                </div>
                                <div className="flex gap-4 mt-2 sm:mt-0">
                                  <div className="text-center">
                                    <div className="text-sm font-mono font-bold text-indigo-300">
                                      {formatMod(
                                        attackStatMod +
                                          character.meta.proficiencyBonus,
                                      )}
                                    </div>
                                    <div className="text-[10px] text-slate-500 uppercase">
                                      Hit
                                    </div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-sm font-mono font-bold text-red-300">
                                      {damageDice}{" "}
                                      {attackStatMod !== 0 &&
                                        (attackStatMod > 0
                                          ? `+ ${attackStatMod}`
                                          : `- ${Math.abs(attackStatMod)}`)}
                                    </div>
                                    <div className="text-[10px] text-slate-500 uppercase">
                                      Damage
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-500 italic px-2">
                          No weapons equipped.
                        </p>
                      )}

                      {/* Unarmed Strike */}
                      <div className="mt-3 flex justify-between items-center bg-black/40 border border-white/5 p-3 rounded-lg">
                        <div>
                          <span className="font-bold text-white text-base">
                            Unarmed Strike
                          </span>
                          <p className="text-xs text-slate-400">Melee Attack</p>
                        </div>
                        <div className="flex gap-4">
                          <div className="text-center">
                            <div className="text-sm font-mono font-bold text-indigo-300">
                              {formatMod(
                                (character.characterClass === "Monk"
                                  ? Math.max(
                                      calculateModifier(character.abilities.STR),
                                      calculateModifier(character.abilities.DEX),
                                    )
                                  : calculateModifier(character.abilities.STR)) +
                                  character.meta.proficiencyBonus,
                              )}
                            </div>
                            <div className="text-[10px] text-slate-500 uppercase">
                              Hit
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-mono font-bold text-red-300">
                              {character.characterClass === "Monk" ? "1d4" : "1"}{" "}
                              {(() => {
                                const mod =
                                  character.characterClass === "Monk"
                                    ? Math.max(
                                        calculateModifier(character.abilities.STR),
                                        calculateModifier(character.abilities.DEX),
                                      )
                                    : calculateModifier(character.abilities.STR);
                                if (mod === 0) return "";
                                return mod > 0 ? `+ ${mod}` : `- ${Math.abs(mod)}`;
                              })()}
                            </div>
                            <div className="text-[10px] text-slate-500 uppercase">
                              Damage
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3 bg-white/5 p-2 rounded">
                        Combat Actions
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {(character.combatActions || [])
                          .filter(
                            (a) =>
                              a.type === "Action" &&
                              a.name !== "Attack" &&
                              a.name !== "Cast Spell",
                          )
                          .map((action) => (
                            <div
                              key={action.name}
                              className="bg-black/40 border border-white/5 p-3 rounded-lg hover:bg-white/5 transition-colors"
                            >
                              <p className="font-bold text-white text-sm">
                                {action.name}
                              </p>
                              <p className="text-[10px] text-slate-400 mt-1">
                                {action.description}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3 bg-white/5 p-2 rounded">
                        Bonus Actions
                      </h3>
                      {(character.combatActions || []).filter(
                        (a) => a.type === "Bonus Action",
                      ).length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {(character.combatActions || [])
                            .filter((a) => a.type === "Bonus Action")
                            .map((action) => (
                              <div
                                key={action.name}
                                className="bg-black/40 border border-white/5 p-3 rounded-lg hover:bg-white/5 transition-colors"
                              >
                                <p className="font-bold text-white text-sm">
                                  {action.name}
                                </p>
                                <p className="text-[10px] text-slate-400 mt-1">
                                  {action.description}
                                </p>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-400 px-2 italic">
                          No bonus actions available.
                        </p>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3 bg-white/5 p-2 rounded">
                        Reactions
                      </h3>
                      <p className="text-sm text-slate-400 px-2 italic">
                        Opportunity Attack
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "spells" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-lg font-bold text-white mb-4 font-heading border-b border-white/10 pb-2 flex justify-between items-center">
                    <span>Spellbook</span>
                    <span className="text-xs font-sans font-normal text-slate-400 bg-black/50 px-2 py-1 rounded">
                      Spell Attack: +
                      {spellMod +
                        character.meta.proficiencyBonus}{" "}
                      | Save DC:{" "}
                      {8 +
                        spellMod +
                        character.meta.proficiencyBonus}
                    </span>
                  </h2>

                  {Object.entries(character.spells).some(
                    ([_, list]) => list.length > 0,
                  ) ? (
                    <div className="space-y-6">
                      {Object.entries(character.spells).map(
                        ([level, spellList]) => {
                          if (spellList.length === 0) return null;
                          const levelNum = parseInt(level, 10);
                          return (
                            <div key={level}>
                              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3 bg-white/5 p-2 rounded flex justify-between">
                                <span>
                                  {levelNum === 0
                                    ? "Cantrips"
                                    : `Level \${levelNum} Spells`}
                                </span>
                                {levelNum > 0 && (
                                  <span className="text-slate-500 font-mono">
                                    Slots: 2 / 2
                                  </span>
                                )}
                              </h3>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {spellList.map((spell) => (
                                  <div
                                    key={spell}
                                    className="bg-black/40 border border-white/5 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                                  >
                                    <span className="font-bold text-indigo-200">
                                      {spell}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        },
                      )}
                    </div>
                  ) : (
                    <div className="py-12 text-center flex flex-col items-center justify-center opacity-50">
                      <Sparkles className="w-12 h-12 mb-4 text-slate-500" />
                      <p className="text-base md:text-lg text-slate-400">
                        This character knows no spells.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "inventory" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex justify-between items-end border-b border-white/10 pb-2 mb-4">
                    <h2 className="text-lg font-bold text-white font-heading">
                      Inventory
                    </h2>

                    {/* Currency Block */}
                    <div className="flex gap-2 text-xs font-mono font-bold">
                      <div className="bg-[#b0632b]/20 text-[#b0632b] px-2 py-1 rounded border border-[#b0632b]/30 flex gap-1">
                        <span className="opacity-70">CP</span>{" "}
                        {character.currency.cp}
                      </div>
                      <div className="bg-slate-400/20 text-slate-300 px-2 py-1 rounded border border-slate-400/30 flex gap-1">
                        <span className="opacity-70">SP</span>{" "}
                        {character.currency.sp}
                      </div>
                      <div className="bg-[#b8860b]/20 text-[#b8860b] px-2 py-1 rounded border border-[#b8860b]/30 flex gap-1">
                        <span className="opacity-70">EP</span>{" "}
                        {character.currency.ep}
                      </div>
                      <div className="bg-amber-400/20 text-amber-400 px-2 py-1 rounded border border-amber-400/30 flex gap-1">
                        <span className="opacity-70">GP</span>{" "}
                        {character.currency.gp}
                      </div>
                      <div className="bg-[#e5e4e2]/20 text-[#e5e4e2] px-2 py-1 rounded border border-[#e5e4e2]/30 flex gap-1">
                        <span className="opacity-70">PP</span>{" "}
                        {character.currency.pp}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3 bg-white/5 p-2 rounded">
                        Weapons & Armor
                      </h3>
                      <ul className="space-y-2">
                        {[...character.weapons, ...character.armor].length >
                        0 ? (
                          [...character.weapons, ...character.armor].map(
                            (item) => (
                              <li
                                key={item}
                                className="text-sm text-slate-300 bg-black/40 p-2.5 rounded-lg border border-white/5 flex items-center justify-between"
                              >
                                <span>{item}</span>
                                <span className="text-[10px] text-slate-500 uppercase bg-white/5 px-2 py-0.5 rounded">
                                  Equipped
                                </span>
                              </li>
                            ),
                          )
                        ) : (
                          <li className="text-sm text-slate-500 italic px-2">
                            None
                          </li>
                        )}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3 bg-white/5 p-2 rounded">
                        Gear & Tools
                      </h3>
                      <ul className="space-y-2">
                        {[...character.equipment, ...character.tools].length >
                        0 ? (
                          [...character.equipment, ...character.tools].map(
                            (item) => (
                              <li
                                key={item}
                                className="text-sm text-slate-300 bg-black/40 p-2.5 rounded-lg border border-white/5 flex items-center justify-between"
                              >
                                <span>{item}</span>
                                <span className="text-xs text-slate-500">
                                  1
                                </span>
                              </li>
                            ),
                          )
                        ) : (
                          <li className="text-sm text-slate-500 italic px-2">
                            None
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "features" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-lg font-bold text-white mb-4 font-heading border-b border-white/10 pb-2">
                    Features & Traits
                  </h2>

                  {character.features.length > 0 ? (
                    <div className="space-y-4">
                      {character.features.map((feature) => (
                        <div
                          key={feature}
                          className="bg-black/40 border border-white/5 p-4 rounded-xl hover:bg-white/5 transition-colors"
                        >
                          <h4 className="font-bold text-indigo-300 mb-1">
                            {feature}
                          </h4>
                          <p className="text-sm text-slate-400 leading-relaxed">
                            A specific capability granted by your race, class,
                            or background. (Details would typically expand
                            here).
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 italic text-center py-8">
                      No special features recorded.
                    </p>
                  )}
                </div>
              )}

              {activeTab === "background" && (
                <div className="space-y-6 animate-in fade-in duration-300 h-full flex flex-col">
                  <h2 className="text-lg font-bold text-white mb-4 font-heading border-b border-white/10 pb-2">
                    Character Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
                        <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">
                          Personality Traits
                        </h4>
                        <p className="text-sm text-slate-300">
                          {character.personality?.traits?.[0] ||
                            "None recorded."}
                        </p>
                        {character.personality?.traits?.[1] && (
                          <p className="text-sm text-slate-300 mt-2">
                            {character.personality.traits[1]}
                          </p>
                        )}
                      </div>

                      <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
                        <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">
                          Ideals
                        </h4>
                        <p className="text-sm text-slate-300">
                          {character.personality?.ideals?.[0] ||
                            "None recorded."}
                        </p>
                      </div>

                      <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
                        <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">
                          Bonds
                        </h4>
                        <p className="text-sm text-slate-300">
                          {character.personality?.bonds?.[0] ||
                            "None recorded."}
                        </p>
                      </div>

                      <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
                        <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">
                          Flaws
                        </h4>
                        <p className="text-sm text-slate-300">
                          {character.personality?.flaws?.[0] ||
                            "None recorded."}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <div className="bg-black/40 border border-white/5 p-5 rounded-xl flex-1">
                        <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <ScrollText className="w-4 h-4" /> Backstory
                        </h4>
                        <div className="text-sm text-slate-300/90 leading-loose">
                          {character.personality?.backstory ? (
                            <p className="whitespace-pre-wrap">
                              {character.personality.backstory}
                            </p>
                          ) : (
                            <p className="italic text-slate-500">
                              The origins of this hero remain shrouded in
                              mystery...
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
