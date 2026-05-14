"use client";

import { FileText, Wand2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ALIGNMENTS,
  BACKGROUND_TRAITS,
  BACKGROUNDS,
  CLASSES_AND_SUBCLASSES,
  DEITIES,
  FEATS,
  GENDERS,
  PERSONALITY_SUGGESTIONS,
  RACES,
} from "@/lib/character-data";
import {
  buildCharacterDefaults,
  getAvailableSpells,
  getClassRule,
  getRecommendedClassesForRace,
} from "@/lib/character-rules";
import {
  type Alignment,
  type CharacterState,
  INITIAL_CHARACTER_STATE,
  type SkillName,
} from "@/lib/character-types";

type AbilityScore = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";

type QuickCharacter = {
  name: string;
  title: string;
  gender: string;
  age: string;
  height: string;
  weight: string;
  deity: string;
  race: string;
  subrace: string;
  characterClass: string;
  subclass: string;
  background: string;
  alignment: string;
  imageUrl: string;
  abilities: Record<AbilityScore, number>;
  skills: string[];
  savingThrows: AbilityScore[];
  feats: string[];
  features: string[];
  languages: string[];
  proficiencies: {
    armor: string[];
    weapons: string[];
    tools: string[];
  };
  weapons: string[];
  armor: string[];
  equipment: string[];
  tools: string[];
  currency: {
    cp: number;
    sp: number;
    ep: number;
    gp: number;
    pp: number;
  };
  spells: string[];
  personality: {
    traits: string[];
    quirks: string[];
    fears: string[];
    goals: string[];
    secrets: string[];
    ideals: string[];
    bonds: string[];
    flaws: string[];
  };
  meta: {
    level: number;
    xp: number;
    inspiration: boolean;
    hitDice: string;
    proficiencyBonus: number;
  };
  backstory: string;
};

function chooseRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function chooseMany<T>(items: readonly T[], count: number): T[] {
  const pool = [...items];
  const chosen: T[] = [];
  const maxCount = Math.min(count, pool.length);

  while (chosen.length < maxCount) {
    const index = Math.floor(Math.random() * pool.length);
    const [item] = pool.splice(index, 1);
    if (item !== undefined) {
      chosen.push(item);
    }
  }

  return chosen;
}

function formatHeight(totalInches: number) {
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return `${feet}'${inches}"`;
}

function generateIdentity() {
  const race = chooseRandom(Object.keys(RACES));
  const recommendedClasses = getRecommendedClassesForRace(race);
  const characterClass = chooseRandom(
    recommendedClasses.length > 0
      ? recommendedClasses
      : Object.keys(CLASSES_AND_SUBCLASSES),
  );
  const subraces = RACES[race as keyof typeof RACES];
  const subclasses =
    CLASSES_AND_SUBCLASSES[
      characterClass as keyof typeof CLASSES_AND_SUBCLASSES
    ];

  return {
    race,
    characterClass,
    subrace: subraces.length > 0 ? chooseRandom(subraces) : "None",
    subclass: subclasses.length > 0 ? chooseRandom(subclasses) : "None",
  };
}

function generateDeity(alignment: string) {
  if (alignment.includes("Good")) {
    return chooseRandom(DEITIES.Good);
  }

  if (alignment.includes("Evil")) {
    return chooseRandom(DEITIES.Evil);
  }

  return chooseRandom([...DEITIES.Neutral, ...DEITIES.Good]);
}

import { getAlignmentBackstories } from "@/lib/backstory-generator";

function buildBackstory(character: QuickCharacter) {
  const trait = chooseRandom(character.personality.traits);
  const goal = chooseRandom(character.personality.goals);
  const secret = chooseRandom(character.personality.secrets);
  
  const backstories = getAlignmentBackstories(character.alignment, character.race, character.characterClass, character.background);
  const baseStory = chooseRandom(backstories);

  return `${baseStory} Guided by ${character.deity}, ${character.name} relies on ${trait.toLowerCase()} instincts and chases ${goal.toLowerCase()} while guarding a secret: ${secret.toLowerCase()}.`;
}

function buildPersonality() {
  return {
    traits: chooseMany(BACKGROUND_TRAITS.Traits, 2),
    quirks: chooseMany(PERSONALITY_SUGGESTIONS.Quirks, 2),
    fears: chooseMany(PERSONALITY_SUGGESTIONS.Fears, 1),
    goals: chooseMany(PERSONALITY_SUGGESTIONS.Goals, 2),
    secrets: chooseMany(PERSONALITY_SUGGESTIONS.Secrets, 1),
    ideals: chooseMany(BACKGROUND_TRAITS.Ideals, 2),
    bonds: chooseMany(BACKGROUND_TRAITS.Bonds, 1),
    flaws: chooseMany(BACKGROUND_TRAITS.Flaws, 1),
  };
}

function generateCharacter(level = 1): QuickCharacter {
  const identity = generateIdentity();
  const background = chooseRandom(BACKGROUNDS);
  const alignment = chooseRandom(ALIGNMENTS);
  const gender = chooseRandom(GENDERS);
  const title = chooseRandom([
    "the Emberbound",
    "the Quiet Blade",
    "of the Iron Oath",
    "the Moonmarked",
    "the Wild Chronicle",
    "the Storm Seeker",
  ]);
  const deity = generateDeity(alignment);
  const defaults = buildCharacterDefaults({
    race: identity.race,
    characterClass: identity.characterClass,
    background,
  });
  const feats = chooseMany(FEATS, 1);
  const spellPool = Object.values(
    getAvailableSpells(identity.characterClass),
  ).flat();
  const spells = chooseMany(spellPool, Math.min(5, spellPool.length));
  const currency = {
    cp: Math.floor(Math.random() * 15),
    sp: Math.floor(Math.random() * 40),
    ep: Math.floor(Math.random() * 6),
    gp: Math.floor(Math.random() * 75) + 5,
    pp: Math.floor(Math.random() * 3),
  };
  const personality = buildPersonality();
  const metaLevel = level;

  const abilities = { ...(defaults.abilities ?? INITIAL_CHARACTER_STATE.abilities) };
  
  // Stat boost for level 2: ensure minimum values
  if (level >= 2) {
    for (const stat in abilities) {
      const key = stat as AbilityScore;
      // If it's a primary stat for the class, set higher minimum
      const classRule = getClassRule(identity.characterClass);
      const isPrimary = classRule?.abilityPriority.slice(0, 2).includes(key);
      const minVal = isPrimary ? 14 : 12;
      if (abilities[key] < minVal) {
        abilities[key] = minVal;
      }
    }
  }

  const isFemale = gender === "Female";
  const maxPortraits = isFemale ? 5 : 7;
  const portraitNum = Math.floor(Math.random() * maxPortraits) + 1;
  const prefix = isFemale ? "female" : "male";
  const imageUrl = `/images/character-portraits/${prefix}-portrait-${portraitNum}.png`;

  const character: QuickCharacter = {
    name: `${identity.race} ${identity.characterClass}`,
    title,
    gender,
    age: `${18 + Math.floor(Math.random() * 90)}`,
    height: formatHeight(54 + Math.floor(Math.random() * 18)),
    weight: `${90 + Math.floor(Math.random() * 120)} lbs`,
    deity,
    race: identity.race,
    subrace: identity.subrace,
    characterClass: identity.characterClass,
    subclass: level >= 2 ? identity.subclass : "None",
    background,
    alignment,
    imageUrl,
    abilities,
    skills: defaults.skills ?? [],
    savingThrows: defaults.savingThrows ?? [],
    feats,
    features: defaults.features ?? [],
    languages: defaults.languages ?? ["Common"],
    proficiencies: defaults.proficiencies ?? {
      armor: [],
      weapons: [],
      tools: [],
    },
    weapons: defaults.weapons ?? [],
    armor: defaults.armor ?? [],
    equipment: defaults.equipment ?? [],
    tools: defaults.tools ?? [],
    currency,
    spells,
    personality,
    meta: {
      level: metaLevel,
      xp: level >= 2 ? 300 : 0,
      inspiration: false,
      hitDice: defaults.meta?.hitDice ?? "1d8",
      proficiencyBonus: 2,
    },
    backstory: "",
  };

  character.backstory = buildBackstory(character);
  return character;
}

function DetailChipList({
  items,
  tone = "gold",
}: {
  items: string[];
  tone?: "gold" | "indigo" | "slate";
}) {
  const toneClass =
    tone === "indigo"
      ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-200"
      : tone === "slate"
        ? "bg-white/5 border-white/10 text-[#E5E7EB]"
        : "bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#D4AF37]";

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={`rounded-full border px-3 py-1 text-xs ${toneClass}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function QuickCharacterGenerator() {
  const router = useRouter();
  const [level, setLevel] = useState<number>(1);
  const [character, setCharacter] = useState<QuickCharacter>(
    generateCharacter(1),
  );
  const [name, setName] = useState<string>("");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleGenerateNew = () => {
    setCharacter(generateCharacter(level));
    setName("");
  };

  const handleLevelChange = (newLevel: number) => {
    if (newLevel === level) return;
    setLevel(newLevel);
    setCharacter(prev => {
      const updated = { ...prev };
      const classRule = getClassRule(updated.characterClass);
      const primaryStats = classRule?.abilityPriority.slice(0, 2) || [];
      
      if (newLevel === 2 && prev.meta.level === 1) {
        updated.meta = { ...prev.meta, level: 2, xp: 300 };
        updated.abilities = { ...prev.abilities };
        for (const stat in updated.abilities) {
          const key = stat as AbilityScore;
          updated.abilities[key] += primaryStats.includes(key) ? 2 : 1;
        }
        const subclasses = CLASSES_AND_SUBCLASSES[updated.characterClass as keyof typeof CLASSES_AND_SUBCLASSES];
        updated.subclass = subclasses && subclasses.length > 0 ? chooseRandom(subclasses) : "None";
      } else if (newLevel === 1 && prev.meta.level === 2) {
        updated.meta = { ...prev.meta, level: 1, xp: 0 };
        updated.abilities = { ...prev.abilities };
        for (const stat in updated.abilities) {
          const key = stat as AbilityScore;
          updated.abilities[key] -= primaryStats.includes(key) ? 2 : 1;
        }
        updated.subclass = "None";
      }
      return updated;
    });
  };

  const handleViewSheet = () => {
    const finalName = name.trim() || character.name;

    const stateToSave: CharacterState = {
      ...INITIAL_CHARACTER_STATE,
      identity: {
        name: finalName,
        gender: character.gender,
        age: character.age,
        height: character.height,
        weight: character.weight,
        alignment: character.alignment as Alignment,
        deity: character.deity,
        title: character.title,
        imageUrl: character.imageUrl,
      },
      race: character.race,
      subrace: character.subrace,
      characterClass: character.characterClass,
      subclass: character.subclass,
      background: character.background,
      abilities: character.abilities,
      skills: character.skills as SkillName[],
      savingThrows: character.savingThrows,
      feats: character.feats,
      features: character.features,
      languages: character.languages,
      proficiencies: character.proficiencies,
      weapons: character.weapons,
      armor: character.armor,
      equipment: character.equipment,
      tools: character.tools,
      currency: character.currency,
      spells: { 0: character.spells },
      personality: {
        ...character.personality,
        backstory: character.backstory,
      },
      meta: character.meta,
    };
    localStorage.setItem("dnd_character_sheet", JSON.stringify(stateToSave));
    router.push("/characters/sheet");
  };

  const displayName = name.trim() || character.name;
  const conModifier = Math.floor((character.abilities.CON - 10) / 2);
  const hitPoints = Math.max(1, (character.meta.level === 2 ? 16 : 8) + conModifier);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="font-['Cinzel'] text-4xl md:text-5xl uppercase tracking-widest text-transparent bg-clip-text bg-linear-to-r from-[#D4AF37] to-[#E6C76A] mb-2">
          Swift Hero Generator
        </h1>
        <p className="text-[#9CA3AF]">
          Create a fully formed character in seconds. Customize the name or
          generate new heroes until you find the perfect fit.
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <Button
          onClick={() => handleLevelChange(1)}
          className={`${level === 1 ? 'bg-[#D4AF37] text-[#0B0F1A]' : 'bg-white/5 text-white border-white/10'} font-bold border`}
        >
          Level 1
        </Button>
        <Button
          onClick={() => handleLevelChange(2)}
          className={`${level === 2 ? 'bg-[#D4AF37] text-[#0B0F1A]' : 'bg-white/5 text-white border-white/10'} font-bold border`}
        >
          Level 2
        </Button>
      </div>

      <Card className="bg-[#111827] border-[#D4AF37]/20">
        <CardHeader className="border-b border-white/10 flex flex-col md:flex-row gap-6 md:items-center">
          <div className="relative group w-24 h-24 shrink-0">
            {/* biome-ignore lint/performance/noImgElement: External character portrait preview */}
            <img
              src={character.imageUrl}
              alt={displayName}
              className="w-24 h-24 rounded-full object-cover border-2 border-[#D4AF37]/50 shadow-lg shadow-[#D4AF37]/20"
            />
            <button
              type="button"
              disabled
              className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-not-allowed border-2 border-dashed border-[#D4AF37]/50"
            >
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider text-center px-1 leading-tight">
                Add Your Own<br/>Image
              </span>
              <span className="text-[8px] text-white/70 uppercase tracking-widest mt-1">
                (Coming Soon)
              </span>
            </button>
          </div>
          <div>
            <CardTitle className="font-['Cinzel'] text-2xl text-[#F9FAFB]">
              {displayName}
            </CardTitle>
            <p className="text-sm text-[#D4AF37] mt-1">
              {character.title} • {character.background} • {character.alignment}
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-8 text-[#E5E7EB] pt-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <Label className="text-indigo-200 mb-3 block font-semibold">
              Character Name
            </Label>
            <Input
              value={name}
              onChange={handleNameChange}
              placeholder="Enter a name for your hero..."
              className="bg-black/40 border-white/10 text-white placeholder:text-white/30 text-lg"
            />
            <p className="text-xs text-[#9CA3AF] mt-2">
              Leave blank to keep the generated name and title.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-['Cinzel'] text-lg text-[#F9FAFB] mb-4 font-bold">
                Core Identity
              </h3>
              <div className="space-y-3 text-sm">
                <p>
                  <span className="text-[#9CA3AF]">Gender:</span>{" "}
                  {character.gender}
                </p>
                <p>
                  <span className="text-[#9CA3AF]">Age:</span> {character.age}
                </p>
                <p>
                  <span className="text-[#9CA3AF]">Height:</span>{" "}
                  {character.height}
                </p>
                <p>
                  <span className="text-[#9CA3AF]">Weight:</span>{" "}
                  {character.weight}
                </p>
                <p>
                  <span className="text-[#9CA3AF]">Deity:</span>{" "}
                  {character.deity}
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 lg:col-span-2">
              <h3 className="font-['Cinzel'] text-lg text-[#F9FAFB] mb-4 font-bold">
                Race, Class & Background
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-md bg-black/20 px-4 py-3 border border-white/10">
                  <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">
                    Race
                  </p>
                  <p className="text-lg font-semibold text-[#D4AF37]">
                    {character.race}
                  </p>
                </div>
                <div className="rounded-md bg-black/20 px-4 py-3 border border-white/10">
                  <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">
                    Subrace / Type
                  </p>
                  <p className="text-lg font-semibold text-[#D4AF37]">
                    {character.subrace}
                  </p>
                </div>
                <div className="rounded-md bg-black/20 px-4 py-3 border border-white/10">
                  <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">
                    Class
                  </p>
                  <p className="text-lg font-semibold text-[#D4AF37]">
                    {character.characterClass}
                  </p>
                </div>
                <div className="rounded-md bg-black/20 px-4 py-3 border border-white/10">
                  <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">
                    Subclass / Archetype
                  </p>
                  <p className="text-lg font-semibold text-[#D4AF37]">
                    {character.subclass}
                  </p>
                </div>
                <div className="rounded-md bg-black/20 px-4 py-3 border border-white/10 md:col-span-2">
                  <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">
                    Alignment
                  </p>
                  <p className="text-lg font-semibold text-[#D4AF37]">
                    {character.alignment}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="font-['Cinzel'] text-lg text-[#F9FAFB] mb-4 font-bold">
              Ability Scores
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {Object.entries(character.abilities).map(([ability, value]) => {
                const modifier = Math.floor((value - 10) / 2);
                const modifierString =
                  modifier >= 0 ? `+${modifier}` : `${modifier}`;

                return (
                  <div
                    className="rounded-md border border-white/10 bg-black/20 px-3 py-4 text-center hover:bg-black/30 transition-colors"
                    key={ability}
                  >
                    <p className="text-xs text-[#9CA3AF] uppercase tracking-wide font-bold">
                      {ability}
                    </p>
                    <p className="text-2xl font-bold text-[#D4AF37] mt-1">
                      {value}
                    </p>
                    <p className="text-xs text-[#9CA3AF]">{modifierString}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-['Cinzel'] text-lg text-[#F9FAFB] mb-4 font-bold">
                Skills, Saves & Feats
              </h3>
              <div className="space-y-5 text-sm">
                <div>
                  <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                    Skill Proficiencies
                  </p>
                  <DetailChipList items={character.skills} />
                </div>
                <div>
                  <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                    Saving Throws
                  </p>
                  <DetailChipList
                    items={character.savingThrows}
                    tone="indigo"
                  />
                </div>
                <div>
                  <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                    Feats
                  </p>
                  <DetailChipList
                    items={
                      character.feats.length > 0 ? character.feats : ["None"]
                    }
                    tone="slate"
                  />
                </div>
                <div>
                  <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                    Class / Racial Features
                  </p>
                  <DetailChipList items={character.features} tone="slate" />
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-['Cinzel'] text-lg text-[#F9FAFB] mb-4 font-bold">
                Languages & Proficiencies
              </h3>
              <div className="space-y-5 text-sm">
                <div>
                  <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                    Languages
                  </p>
                  <DetailChipList items={character.languages} />
                </div>
                <div>
                  <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                    Armor Proficiencies
                  </p>
                  <DetailChipList
                    items={
                      character.proficiencies.armor.length > 0
                        ? character.proficiencies.armor
                        : ["None"]
                    }
                    tone="slate"
                  />
                </div>
                <div>
                  <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                    Weapon Proficiencies
                  </p>
                  <DetailChipList
                    items={
                      character.proficiencies.weapons.length > 0
                        ? character.proficiencies.weapons
                        : ["None"]
                    }
                    tone="slate"
                  />
                </div>
                <div>
                  <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                    Tool Proficiencies
                  </p>
                  <DetailChipList
                    items={
                      character.proficiencies.tools.length > 0
                        ? character.proficiencies.tools
                        : ["None"]
                    }
                    tone="slate"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-['Cinzel'] text-lg text-[#F9FAFB] mb-4 font-bold">
                Weapons, Armor & Gear
              </h3>
              <div className="space-y-5 text-sm">
                <div>
                  <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                    Weapons
                  </p>
                  <DetailChipList items={character.weapons} />
                </div>
                <div>
                  <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                    Armor
                  </p>
                  <DetailChipList
                    items={
                      character.armor.length > 0
                        ? character.armor
                        : ["Unarmored"]
                    }
                    tone="indigo"
                  />
                </div>
                <div>
                  <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                    Equipment Packs & Gear
                  </p>
                  <DetailChipList items={character.equipment} tone="slate" />
                </div>
                <div>
                  <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                    Tools
                  </p>
                  <DetailChipList
                    items={
                      character.tools.length > 0 ? character.tools : ["None"]
                    }
                    tone="slate"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-['Cinzel'] text-lg text-[#F9FAFB] mb-4 font-bold">
                Spellbook & Resources
              </h3>
              <div className="space-y-5 text-sm">
                <div>
                  <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                    Known Spells
                  </p>
                  <DetailChipList
                    items={
                      character.spells.length > 0
                        ? character.spells
                        : ["No spells"]
                    }
                    tone="indigo"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-md bg-black/20 px-4 py-3 border border-white/10 text-center">
                    <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">
                      Level
                    </p>
                    <p className="text-lg font-semibold text-[#D4AF37]">
                      {character.meta.level}
                    </p>
                  </div>
                  <div className="rounded-md bg-black/20 px-4 py-3 border border-white/10 text-center">
                    <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">
                      Hit Dice
                    </p>
                    <p className="text-lg font-semibold text-[#D4AF37]">
                      {character.meta.hitDice}
                    </p>
                  </div>
                  <div className="rounded-md bg-black/20 px-4 py-3 border border-white/10 text-center">
                    <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">
                      Hit Points
                    </p>
                    <p className="text-lg font-semibold text-[#D4AF37]">
                      {hitPoints}
                    </p>
                  </div>
                  <div className="rounded-md bg-black/20 px-4 py-3 border border-white/10 text-center">
                    <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">
                      Prof. Bonus
                    </p>
                    <p className="text-lg font-semibold text-[#D4AF37]">
                      +{character.meta.proficiencyBonus}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-2 text-center text-xs">
                  <div className="rounded-md bg-black/20 px-2 py-3 border border-white/10">
                    <p className="text-[#9CA3AF]">CP</p>
                    <p className="font-semibold text-[#D4AF37]">
                      {character.currency.cp}
                    </p>
                  </div>
                  <div className="rounded-md bg-black/20 px-2 py-3 border border-white/10">
                    <p className="text-[#9CA3AF]">SP</p>
                    <p className="font-semibold text-[#D4AF37]">
                      {character.currency.sp}
                    </p>
                  </div>
                  <div className="rounded-md bg-black/20 px-2 py-3 border border-white/10">
                    <p className="text-[#9CA3AF]">EP</p>
                    <p className="font-semibold text-[#D4AF37]">
                      {character.currency.ep}
                    </p>
                  </div>
                  <div className="rounded-md bg-black/20 px-2 py-3 border border-white/10">
                    <p className="text-[#9CA3AF]">GP</p>
                    <p className="font-semibold text-[#D4AF37]">
                      {character.currency.gp}
                    </p>
                  </div>
                  <div className="rounded-md bg-black/20 px-2 py-3 border border-white/10">
                    <p className="text-[#9CA3AF]">PP</p>
                    <p className="font-semibold text-[#D4AF37]">
                      {character.currency.pp}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="font-['Cinzel'] text-lg text-[#F9FAFB] mb-4 font-bold">
              Persona & Backstory
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-4">
                <div>
                  <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                    Personality Traits
                  </p>
                  <DetailChipList items={character.personality.traits} />
                </div>
                <div>
                  <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                    Quirks
                  </p>
                  <DetailChipList
                    items={character.personality.quirks}
                    tone="slate"
                  />
                </div>
                <div>
                  <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                    Fears
                  </p>
                  <DetailChipList
                    items={character.personality.fears}
                    tone="indigo"
                  />
                </div>
                <div>
                  <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                    Goals
                  </p>
                  <DetailChipList items={character.personality.goals} />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                    Ideals
                  </p>
                  <DetailChipList
                    items={character.personality.ideals}
                    tone="indigo"
                  />
                </div>
                <div>
                  <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                    Bonds
                  </p>
                  <DetailChipList
                    items={character.personality.bonds}
                    tone="slate"
                  />
                </div>
                <div>
                  <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                    Flaws
                  </p>
                  <DetailChipList
                    items={character.personality.flaws}
                    tone="indigo"
                  />
                </div>
                <div>
                  <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                    Secrets
                  </p>
                  <DetailChipList
                    items={character.personality.secrets}
                    tone="slate"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-lg border border-white/10 bg-black/20 p-4">
              <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                Backstory
              </p>
              <p className="leading-relaxed text-[#E5E7EB]">
                {character.backstory}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10">
            <Button
              onClick={handleGenerateNew}
              className="bg-black/50 hover:bg-black/80 text-white font-semibold flex items-center justify-center gap-2 flex-1 border border-white/10"
            >
              <Wand2 className="w-4 h-4" />
              Generate New Hero
            </Button>
            <Button
              onClick={handleViewSheet}
              className="bg-[#D4AF37] hover:bg-[#E6C76A] text-[#0B0F1A] font-bold flex items-center justify-center gap-2 flex-1"
            >
              <FileText className="w-4 h-4" />
              View Character Sheet
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
