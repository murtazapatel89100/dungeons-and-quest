"use client";

import { AlertTriangle, Eye, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BACKGROUND_TRAITS,
  DEITIES,
  FEATS,
  PERSONALITY_SUGGESTIONS,
} from "@/lib/character-data";
import {
  buildCharacterDefaults,
  getAvailableSpells,
  getClassRule,
} from "@/lib/character-rules";
import {
  type Alignment,
  type CharacterState,
  type CombatAction,
  INITIAL_CHARACTER_STATE,
  type SkillName,
} from "@/lib/character-types";
import { validateCharacter } from "@/lib/character-validation";

interface PreGeneratedCharacter {
  id: string;
  name: string;
  gender: string;
  race: string;
  subrace: string;
  characterClass: string;
  background: string;
  alignment: string;
  archetype: string;
  style: string;
  highlights: string[];
  abilities: Record<"STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA", number>;
  proficiencies: string[];
  signature_weapon: string;
  armor: string;
  spells?: string[];
  description: string;
}

type AbilityScore = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";

type DetailedPreGeneratedCharacter = PreGeneratedCharacter & {
  title: string;
  age: string;
  height: string;
  weight: string;
  deity: string;
  skills: string[];
  savingThrows: AbilityScore[];
  feats: string[];
  features: string[];
  combatActions: CombatAction[];
  languages: string[];
  loadout: {
    armor: string[];
    weapons: string[];
    tools: string[];
  };
  weapons: string[];
  armorList: string[];
  equipment: string[];
  tools: string[];
  currency: {
    cp: number;
    sp: number;
    ep: number;
    gp: number;
    pp: number;
  };
  spellsKnown: string[];
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
  backstory: string;
  meta: {
    inspiration: boolean;
    hitDice: string;
    proficiencyBonus: number;
  };
  hitPoints: number;
};

const PREGENERATED_CHARACTERS: PreGeneratedCharacter[] = [
  {
    id: "thorin-embershield",
    name: "Thorin Embershield",
    gender: "Male",
    race: "Dwarf",
    subrace: "Mountain",
    characterClass: "Fighter",
    background: "Soldier",
    alignment: "Lawful Good",
    archetype: "Dwarf Fighter",
    style: "Frontline tank and weapon specialist.",
    highlights: ["High Constitution", "Heavy Armor", "Battle Control"],
    abilities: { STR: 16, DEX: 10, CON: 15, INT: 11, WIS: 13, CHA: 10 },
    proficiencies: ["Longsword", "Heavy Armor", "Shield", "Intimidation"],
    signature_weapon: "Warhammer",
    armor: "Plate Armor",
    description:
      "A grizzled dwarven warrior with decades of battle experience. Thorin is a master of the frontline, using his exceptional constitution and armor to protect his allies while dealing steady damage.",
  },
  {
    id: "lyra-moonwhisper",
    name: "Lyra Moonwhisper",
    gender: "Female",
    race: "Elf",
    subrace: "High",
    characterClass: "Wizard",
    background: "Sage",
    alignment: "Chaotic Good",
    archetype: "Elf Wizard",
    style: "Ranged spell damage and battlefield shaping.",
    highlights: ["Arcane Burst", "Crowd Control", "Utility Magic"],
    abilities: { STR: 8, DEX: 13, CON: 12, INT: 16, WIS: 14, CHA: 11 },
    proficiencies: ["Arcana", "Investigation", "Dagger", "Quarterstaff"],
    signature_weapon: "Quarterstaff",
    armor: "Robe (AC 12)",
    spells: ["Fireball", "Lightning Bolt", "Prestidigitation", "Mage Hand"],
    description:
      "An arcane scholar with an affinity for destructive magic. Lyra uses powerful spells to control the battlefield and overwhelm enemies with elemental power.",
  },
  {
    id: "kestrel-nightstep",
    name: "Kestrel Nightstep",
    gender: "Male",
    race: "Halfling",
    subrace: "Lightfoot",
    characterClass: "Rogue",
    background: "Criminal",
    alignment: "Chaotic Neutral",
    archetype: "Halfling Rogue",
    style: "Stealth, scouting, and precision strikes.",
    highlights: ["Sneak Attack", "Lockpicking", "Mobility"],
    abilities: { STR: 9, DEX: 16, CON: 11, INT: 12, WIS: 14, CHA: 13 },
    proficiencies: [
      "Stealth",
      "Sleight of Hand",
      "Acrobatics",
      "Thieves' Tools",
    ],
    signature_weapon: "Rapier",
    armor: "Leather Armor",
    description:
      "A nimble halfling with a talent for getting into and out of trouble. Kestrel's speed and stealth make him perfect for scouting, infiltration, and surgical strikes.",
  },
  {
    id: "seraphine-dawnbrand",
    name: "Seraphine Dawnbrand",
    gender: "Female",
    race: "Human",
    subrace: "Standard",
    characterClass: "Paladin",
    background: "Acolyte",
    alignment: "Lawful Good",
    archetype: "Human Paladin",
    style: "Defensive support with divine burst damage.",
    highlights: ["Party Support", "Divine Smite", "High Survivability"],
    abilities: { STR: 15, DEX: 11, CON: 14, INT: 10, WIS: 16, CHA: 14 },
    proficiencies: ["Insight", "Medicine", "Longsword", "Heavy Armor"],
    signature_weapon: "Longsword",
    armor: "Plate Armor",
    spells: ["Divine Smite", "Bless", "Cure Wounds"],
    description:
      "A devoted paladin of unwavering faith. Seraphine protects her companions through divine magic and righteous combat, combining healing and defensive magic with martial prowess.",
  },
  {
    id: "garrick-stormcaller",
    name: "Garrick Stormcaller",
    gender: "Male",
    race: "Half-Orc",
    subrace: "None",
    characterClass: "Barbarian",
    background: "Outlander",
    alignment: "Chaotic Neutral",
    archetype: "Half-Orc Barbarian",
    style: "Raw damage and battlefield presence through primal fury.",
    highlights: ["Massive Damage", "Rage Mitigation", "Intimidation"],
    abilities: { STR: 17, DEX: 10, CON: 16, INT: 9, WIS: 12, CHA: 10 },
    proficiencies: ["Survival", "Athletics", "Greataxe", "Medium Armor"],
    signature_weapon: "Greataxe",
    armor: "Hide Armor",
    description:
      "A fierce half-orc warrior who channels primal rage into devastating attacks. Garrick's raw power makes him an unstoppable force in combat.",
  },
  {
    id: "mira-silverstring",
    name: "Mira Silverstring",
    gender: "Female",
    race: "Half-Elf",
    subrace: "None",
    characterClass: "Bard",
    background: "Entertainer",
    alignment: "Neutral Good",
    archetype: "Half-Elf Bard",
    style: "Control, support, and inspiration through performance.",
    highlights: ["Crowd Control", "Team Inspiration", "Skill Versatility"],
    abilities: { STR: 10, DEX: 14, CON: 12, INT: 13, WIS: 13, CHA: 16 },
    proficiencies: ["Performance", "Persuasion", "Deception", "Lute"],
    signature_weapon: "Rapier",
    armor: "Leather Armor",
    spells: ["Vicious Mockery", "Healing Word", "Tasha's Hideous Laughter"],
    description:
      "A charismatic performer and magical scholar. Mira uses her bardic magic and silver tongue to support allies and control the flow of battle.",
  },
  {
    id: "thorgrim-ironforge",
    name: "Thorgrim Ironforge",
    gender: "Male",
    race: "Dwarf",
    subrace: "Hill",
    characterClass: "Cleric",
    background: "Acolyte",
    alignment: "Chaotic Good",
    archetype: "Dwarf Cleric",
    style: "Healing support with thunderous offense.",
    highlights: ["Healing & Buffs", "Offensive Magic", "Channel Divinity"],
    abilities: { STR: 13, DEX: 10, CON: 14, INT: 12, WIS: 16, CHA: 12 },
    proficiencies: ["Medicine", "Insight", "Warhammer", "Heavy Armor"],
    signature_weapon: "Warhammer",
    armor: "Plate Armor",
    spells: ["Healing Word", "Cure Wounds", "Spiritual Weapon"],
    description:
      "A devoted priest of the storm gods. Thorgrim combines potent healing magic with destructive offensive spells, striking a balance between support and damage.",
  },
  {
    id: "sylara-shadowbow",
    name: "Sylara Shadowbow",
    gender: "Female",
    race: "Elf",
    subrace: "Wood",
    characterClass: "Ranger",
    background: "Hermit",
    alignment: "Neutral Good",
    archetype: "Elf Ranger",
    style: "Ranged precision and nature mastery.",
    highlights: ["Ranged Damage", "Survival Skills", "Nature Magic"],
    abilities: { STR: 12, DEX: 15, CON: 13, INT: 11, WIS: 15, CHA: 10 },
    proficiencies: ["Survival", "Perception", "Longbow", "Light Armor"],
    signature_weapon: "Longbow",
    armor: "Leather Armor",
    spells: ["Hunter's Mark", "Pass Without Trace"],
    description:
      "A skilled hunter and tracker from the wilderness. Sylara excels at ranged combat and survival, using her connection to nature to outmaneuver foes.",
  },
  {
    id: "aldrick-spiritweaver",
    name: "Aldrick Spiritweaver",
    gender: "Male",
    race: "Tiefling",
    subrace: "None",
    characterClass: "Warlock",
    background: "Charlatan",
    alignment: "Chaotic Evil",
    archetype: "Tiefling Warlock",
    style: "Eldritch power and dark pacts.",
    highlights: ["Eldritch Blast", "Invocations", "Dark Pact Powers"],
    abilities: { STR: 10, DEX: 14, CON: 11, INT: 13, WIS: 10, CHA: 15 },
    proficiencies: ["Arcana", "Deception", "Dagger", "Light Armor"],
    signature_weapon: "Dagger",
    armor: "Leather Armor",
    spells: ["Eldritch Blast", "Agonizing Blast", "Hex"],
    description:
      "A warlock bound by an otherworldly pact. Aldrick wields eldritch power for his own gain, trading morality for magical might.",
  },
];

function chooseMany<T>(items: readonly T[], count: number): T[] {
  const pool = [...items];
  const selected: T[] = [];
  const maxCount = Math.min(count, pool.length);

  while (selected.length < maxCount) {
    const index = Math.floor(Math.random() * pool.length);
    const [item] = pool.splice(index, 1);
    if (item !== undefined) {
      selected.push(item);
    }
  }

  return selected;
}

function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function formatHeight(totalInches: number) {
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return `${feet}'${inches}"`;
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

import { getAlignmentBackstories } from "@/lib/backstory-generator";

function generateDetailedCharacter(
  character: PreGeneratedCharacter,
): DetailedPreGeneratedCharacter {
  const defaults = buildCharacterDefaults({
    race: character.race,
    characterClass: character.characterClass,
    background: character.background,
  });
  const feats = chooseMany(FEATS, 1);
  const spellPool = Object.values(
    getAvailableSpells(character.characterClass),
  ).flat();
  const spellsKnown =
    character.spells && character.spells.length > 0
      ? character.spells.filter((spell) => spellPool.includes(spell))
      : chooseMany(spellPool, Math.min(5, spellPool.length));
  const deity = character.alignment.includes("Good")
    ? pickRandom(DEITIES.Good)
    : character.alignment.includes("Evil")
      ? pickRandom(DEITIES.Evil)
      : pickRandom([...DEITIES.Neutral, ...DEITIES.Good]);
  const personality = buildPersonality();
  const title = pickRandom([
    "the Emberbound",
    "the Quiet Blade",
    "of the Iron Oath",
    "the Moonmarked",
    "the Wild Chronicle",
    "the Storm Seeker",
  ]);

  const backstories = getAlignmentBackstories(
    character.alignment,
    character.race,
    character.characterClass,
    character.background,
  );
  const generatedBackstory = pickRandom(backstories);

  return {
    ...character,
    title,
    age: `${18 + Math.floor(Math.random() * 90)}`,
    height: formatHeight(54 + Math.floor(Math.random() * 18)),
    weight: `${90 + Math.floor(Math.random() * 120)} lbs`,
    deity,
    skills: defaults.skills ?? [],
    savingThrows: defaults.savingThrows ?? [],
    feats,
    features: defaults.features ?? [],
    combatActions: defaults.combatActions ?? [],
    languages: defaults.languages ?? ["Common"],
    loadout: {
      armor: defaults.armor ?? [],
      weapons: defaults.weapons ?? [],
      tools: defaults.tools ?? [],
    },
    weapons: defaults.weapons ?? [],
    armorList: defaults.armor ?? [],
    equipment: defaults.equipment ?? [],
    tools: defaults.tools ?? [],
    currency: {
      cp: Math.floor(Math.random() * 15),
      sp: Math.floor(Math.random() * 40),
      ep: Math.floor(Math.random() * 6),
      gp: Math.floor(Math.random() * 75) + 5,
      pp: Math.floor(Math.random() * 3),
    },
    spellsKnown,
    personality,
    backstory: `${character.description} ${generatedBackstory} Their bond with ${deity} continues to influence every choice they make.`,
    meta: {
      inspiration: false,
      hitDice: defaults.meta?.hitDice ?? "1d8",
      proficiencyBonus: 2,
    },
    hitPoints: Math.max(1, 8 + Math.floor((character.abilities.CON - 10) / 2)),
  };
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

function buildStateToSave(
  char: DetailedPreGeneratedCharacter,
): CharacterState {
  return {
    ...INITIAL_CHARACTER_STATE,
    identity: {
      name: char.name,
      gender: char.gender,
      age: char.age,
      height: char.height,
      weight: char.weight,
      alignment: char.alignment as Alignment,
      deity: char.deity,
      title: char.title,
      imageUrl: `/images/character-portraits/pregen/${char.id}.png`,
    },
    race: char.race,
    subrace: char.subrace,
    characterClass: char.characterClass,
    background: char.background,
    abilities: char.abilities,
    skills: char.skills as SkillName[],
    savingThrows: char.savingThrows,
    feats: char.feats,
    features: char.features,
    combatActions: char.combatActions,
    languages: char.languages,
    proficiencies: {
      armor: char.loadout.armor,
      weapons: char.loadout.weapons,
      tools: char.loadout.tools,
    },
    weapons: char.weapons,
    armor: char.armorList,
    equipment: char.equipment,
    tools: char.tools,
    currency: char.currency,
    spells: { 0: char.spellsKnown },
    personality: {
      ...char.personality,
      backstory: char.backstory,
    },
    meta: char.meta,
  };
}

export function PreGeneratedCharacters() {
  const router = useRouter();
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>(
    PREGENERATED_CHARACTERS[0].id,
  );

  const detailedCharacters = useMemo(
    () => PREGENERATED_CHARACTERS.map(generateDetailedCharacter),
    [],
  );

  const selectedCharacter =
    detailedCharacters.find(
      (character) => character.id === selectedCharacterId,
    ) ?? detailedCharacters[0];

  const abilityModifier = (value: number) => {
    const mod = Math.floor((value - 10) / 2);
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  const handleViewSheet = (character: DetailedPreGeneratedCharacter) => {
    const stateToSave = buildStateToSave(character);
    localStorage.setItem("dnd_character_sheet", JSON.stringify(stateToSave));
    router.push("/characters/sheet");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h1 className="font-['Cinzel'] text-4xl md:text-5xl uppercase tracking-widest text-transparent bg-clip-text bg-linear-to-r from-[#D4AF37] to-[#E6C76A] mb-2">
          Legendary Starter Roster
        </h1>
        <p className="text-[#9CA3AF] max-w-2xl mx-auto">
          Choose from battle-tested heroes ready for adventure. View full
          details to understand each hero's strengths and capabilities.
        </p>
        <p className="mt-4 text-sm text-[#D4AF37] uppercase tracking-[0.3em]">
          Featured Hero: {selectedCharacter.name}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {detailedCharacters.map((character) => {
          const isSelected = selectedCharacterId === character.id;
          const characterState = buildStateToSave(character);
          const warnings = validateCharacter(characterState);

          const featureChips = character.features
            .slice(0, 3)
            .reduce<Array<{ key: string; label: string }>>((chips, feature) => {
              const occurrence =
                chips.filter((chip) => chip.label === feature).length + 1;
              chips.push({
                key: `${character.id}-${feature}-${occurrence}`,
                label: occurrence === 1 ? feature : `${feature} ${occurrence}`,
              });
              return chips;
            }, []);

          return (
            <Card
              key={character.id}
              role="button"
              tabIndex={0}
              className={`bg-[#111827] border-2 transition-all cursor-pointer ${
                isSelected
                  ? "border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20"
                  : "border-white/10 hover:border-[#D4AF37]/50"
              }`}
              onClick={() => setSelectedCharacterId(character.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedCharacterId(character.id);
                }
              }}
            >
              <div className="w-full h-40 bg-linear-to-br from-[#D4AF37]/10 to-[#9CA3AF]/5 border-b border-white/10 flex items-center justify-center relative overflow-hidden">
                {/* biome-ignore lint/performance/noImgElement: External seed-based images */}
                <img
                  src={`/images/character-portraits/pregen/${character.id}.png`}
                  alt={character.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
                />
                <div className="text-center relative z-10 drop-shadow-md">
                  <p className="text-[#D4AF37] text-2xl font-['Cinzel'] font-black mt-2 tracking-wider">
                    {character.name.split(" ")[0]}
                  </p>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div>
                  <CardTitle className="font-['Cinzel'] text-xl text-[#F9FAFB]">
                    {character.name}
                  </CardTitle>
                  <p className="text-xs text-[#D4AF37] font-semibold mt-1">
                    {character.gender} {character.race}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-[#F9FAFB]">
                    {character.characterClass}
                  </p>
                  <p className="text-xs text-[#9CA3AF]">
                    {character.archetype}
                  </p>
                  <p className="text-sm text-[#E5E7EB] mt-2 italic">
                    {character.style}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-md border border-white/10 bg-black/20 px-3 py-2">
                    <p className="text-[#9CA3AF] uppercase tracking-wide">
                      Skills
                    </p>
                    <p className="mt-1 text-[#D4AF37]">
                      {character.skills.slice(0, 2).join(", ")}
                    </p>
                  </div>
                  <div className="rounded-md border border-white/10 bg-black/20 px-3 py-2">
                    <p className="text-[#9CA3AF] uppercase tracking-wide">
                      Stats
                    </p>
                    <p className="mt-1 text-[#D4AF37]">
                      STR {character.abilities.STR}, DEX{" "}
                      {character.abilities.DEX}...
                    </p>
                  </div>
                  <div className="rounded-md border border-white/10 bg-black/20 px-3 py-2">
                    <p className="text-[#9CA3AF] uppercase tracking-wide">
                      Armor
                    </p>
                    <p className="mt-1 text-[#D4AF37]">
                      {character.armorList[0] ?? character.armor}
                    </p>
                  </div>
                  <div className="rounded-md border border-white/10 bg-black/20 px-3 py-2">
                    <p className="text-[#9CA3AF] uppercase tracking-wide">
                      Spells
                    </p>
                    <p className="mt-1 text-[#D4AF37]">
                      {character.spellsKnown.length > 0
                        ? `${character.spellsKnown.length} known`
                        : "None"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
                  {featureChips.map((feature) => (
                    <span
                      key={feature.key}
                      className="text-xs bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] rounded-full px-2 py-1"
                    >
                      {feature.label}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 pt-2 border-t border-white/10">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#111827] border-[#D4AF37]/20">
                      <DialogHeader>
                        <DialogTitle className="font-['Cinzel'] text-2xl text-[#D4AF37]">
                          {character.name}
                        </DialogTitle>
                      </DialogHeader>

                      <div className="space-y-6 text-[#E5E7EB]">
                        {warnings.length > 0 && (
                          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertTriangle className="w-5 h-5 text-amber-500" />
                              <h3 className="font-semibold text-amber-500">
                                Character Build Recommendations
                              </h3>
                            </div>
                            <ul className="list-disc list-inside space-y-1 pl-7">
                              {warnings.map((warning) => (
                                <li
                                  key={warning.message}
                                  className="text-sm text-amber-200/80"
                                >
                                  {warning.message}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                          {/* biome-ignore lint/performance/noImgElement: External seed-based images */}
                          <img
                            src={`/images/character-portraits/pregen/${character.id}.png`}
                            alt={character.name}
                            className="w-32 h-32 rounded-full object-cover border-2 border-[#D4AF37]/50 shadow-lg shadow-[#D4AF37]/20"
                          />
                          <div className="flex-1 w-full grid grid-cols-2 gap-3 text-sm">
                            <div className="col-span-2 mb-2">
                              <h3 className="font-['Cinzel'] font-bold text-[#D4AF37] mb-1">
                                Quick Identity
                              </h3>
                            </div>
                            <p>
                              <span className="text-[#9CA3AF]">Title:</span>{" "}
                              {character.title}
                            </p>
                            <p>
                              <span className="text-[#9CA3AF]">Age:</span>{" "}
                              {character.age}
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
                            <p>
                              <span className="text-[#9CA3AF]">Languages:</span>{" "}
                              {character.languages.join(", ")}
                            </p>
                          </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                          <h3 className="font-['Cinzel'] font-bold text-[#D4AF37] mb-3">
                            Identity
                          </h3>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <p>
                              <span className="text-[#9CA3AF]">Gender:</span>{" "}
                              {character.gender}
                            </p>
                            <p>
                              <span className="text-[#9CA3AF]">Race:</span>{" "}
                              {character.race}
                            </p>
                            <p>
                              <span className="text-[#9CA3AF]">
                                Background:
                              </span>{" "}
                              {character.background}
                            </p>
                            <p>
                              <span className="text-[#9CA3AF]">Alignment:</span>{" "}
                              {character.alignment}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                            <h3 className="font-['Cinzel'] font-bold text-[#D4AF37] mb-3">
                              Class & Archetype
                            </h3>
                            <div className="space-y-2 text-sm">
                              <p>
                                <span className="text-[#9CA3AF]">Class:</span>{" "}
                                {character.characterClass}
                              </p>
                            </div>
                          </div>

                          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                            <h3 className="font-['Cinzel'] font-bold text-[#D4AF37] mb-3">
                              Equipment
                            </h3>
                            <div className="space-y-2 text-sm">
                              <p>
                                <span className="text-[#9CA3AF]">Weapon:</span>{" "}
                                {character.signature_weapon}
                              </p>
                              <p>
                                <span className="text-[#9CA3AF]">Armor:</span>{" "}
                                {character.armor}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                            <h3 className="font-['Cinzel'] font-bold text-[#D4AF37] mb-3">
                              Skills & Saving Throws
                            </h3>
                            <div className="space-y-4 text-sm">
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
                                  items={character.feats}
                                  tone="slate"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                            <h3 className="font-['Cinzel'] font-bold text-[#D4AF37] mb-3">
                              Features & Proficiencies
                            </h3>
                            <div className="space-y-4 text-sm">
                              <div>
                                <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                                  Features
                                </p>
                                <DetailChipList
                                  items={character.features}
                                  tone="slate"
                                />
                              </div>
                              <div>
                                <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                                  Armor
                                </p>
                                <DetailChipList
                                  items={
                                    character.loadout.armor.length > 0
                                      ? character.loadout.armor
                                      : ["Unarmored"]
                                  }
                                  tone="slate"
                                />
                              </div>
                              <div>
                                <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                                  Weapons
                                </p>
                                <DetailChipList
                                  items={character.loadout.weapons}
                                />
                              </div>
                              <div>
                                <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                                  Tools
                                </p>
                                <DetailChipList
                                  items={
                                    character.loadout.tools.length > 0
                                      ? character.loadout.tools
                                      : ["None"]
                                  }
                                  tone="indigo"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                          <h3 className="font-['Cinzel'] font-bold text-[#D4AF37] mb-3">
                            Combat Actions & Bonus Actions
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                                Actions
                              </p>
                              <div className="space-y-2">
                                {character.combatActions
                                  .filter((a) => a.type === "Action")
                                  .map((action) => (
                                    <div
                                      key={action.name}
                                      className="p-3 rounded bg-black/20 border border-white/5"
                                    >
                                      <p className="text-xs font-bold text-[#D4AF37]">
                                        {action.name}
                                      </p>
                                      <p className="text-[10px] text-[#9CA3AF]">
                                        {action.description}
                                      </p>
                                    </div>
                                  ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                                Bonus Actions
                              </p>
                              <div className="space-y-2">
                                {character.combatActions
                                  .filter((a) => a.type === "Bonus Action")
                                  .map((action) => (
                                    <div
                                      key={action.name}
                                      className="p-3 rounded bg-black/20 border border-white/5"
                                    >
                                      <p className="text-xs font-bold text-indigo-300">
                                        {action.name}
                                      </p>
                                      <p className="text-[10px] text-[#9CA3AF]">
                                        {action.description}
                                      </p>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                            <h3 className="font-['Cinzel'] font-bold text-[#D4AF37] mb-3">
                              Weapons, Armor & Gear
                            </h3>
                            <div className="space-y-4 text-sm">
                              <div>
                                <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                                  Signature Weapons
                                </p>
                                <DetailChipList items={character.weapons} />
                              </div>
                              <div>
                                <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                                  Armor Loadout
                                </p>
                                <DetailChipList
                                  items={
                                    character.armorList.length > 0
                                      ? character.armorList
                                      : [character.armor]
                                  }
                                  tone="indigo"
                                />
                              </div>
                              <div>
                                <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                                  Equipment Packs & Gear
                                </p>
                                <DetailChipList
                                  items={character.equipment}
                                  tone="slate"
                                />
                              </div>
                              <div>
                                <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                                  Tools
                                </p>
                                <DetailChipList
                                  items={
                                    character.tools.length > 0
                                      ? character.tools
                                      : ["None"]
                                  }
                                  tone="slate"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                            <h3 className="font-['Cinzel'] font-bold text-[#D4AF37] mb-3">
                              Resources
                            </h3>
                            <div className="grid grid-cols-2 gap-3 text-center text-xs">
                              <div className="rounded-md bg-black/20 px-2 py-3 border border-white/10">
                                <p className="text-[#9CA3AF]">Hit Dice</p>
                                <p className="font-semibold text-[#D4AF37]">
                                  {character.meta.hitDice}
                                </p>
                              </div>
                              <div className="rounded-md bg-black/20 px-2 py-3 border border-white/10">
                                <p className="text-[#9CA3AF]">HP</p>
                                <p className="font-semibold text-[#D4AF37]">
                                  {character.hitPoints}
                                </p>
                              </div>
                              <div className="rounded-md bg-black/20 px-2 py-3 border border-white/10">
                                <p className="text-[#9CA3AF]">Prof. Bonus</p>
                                <p className="font-semibold text-[#D4AF37]">
                                  +2
                                </p>
                              </div>
                            </div>
                            <div className="mt-4 grid grid-cols-5 gap-2 text-center text-xs">
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

                        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                          <h3 className="font-['Cinzel'] font-bold text-[#D4AF37] mb-3">
                            Persona
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">
                                Traits
                              </p>
                              <DetailChipList
                                items={character.personality.traits}
                              />
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
                              <DetailChipList
                                items={character.personality.goals}
                              />
                            </div>
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

                        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                          <h3 className="font-['Cinzel'] font-bold text-[#D4AF37] mb-3">
                            Backstory
                          </h3>
                          <p className="text-sm leading-relaxed text-[#E5E7EB]">
                            {character.backstory}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                            <h3 className="font-['Cinzel'] font-bold text-[#D4AF37] mb-3">
                              Ability Scores
                            </h3>
                            <div className="grid grid-cols-3 gap-3">
                              {Object.entries(character.abilities).map(
                                ([ability, value]) => (
                                  <div
                                    key={ability}
                                    className="bg-black/20 rounded border border-white/10 p-2 text-center"
                                  >
                                    <p className="text-xs text-[#9CA3AF] uppercase">
                                      {ability}
                                    </p>
                                    <p className="text-lg font-bold text-[#D4AF37]">
                                      {value}
                                    </p>
                                    <p className="text-xs text-[#9CA3AF]">
                                      {abilityModifier(value)}
                                    </p>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>

                          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                            <h3 className="font-['Cinzel'] font-bold text-[#D4AF37] mb-3">
                              Class Snapshot
                            </h3>
                            <div className="space-y-3 text-sm">
                              <p>
                                <span className="text-[#9CA3AF]">Class:</span>{" "}
                                {character.characterClass}
                              </p>
                              <p>
                                <span className="text-[#9CA3AF]">
                                  Background:
                                </span>{" "}
                                {character.background}
                              </p>
                              <p>
                                <span className="text-[#9CA3AF]">
                                  Alignment:
                                </span>{" "}
                                {character.alignment}
                              </p>
                            </div>
                          </div>
                        </div>

                        {character.spellsKnown.length > 0 && (
                          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                            <h3 className="font-['Cinzel'] font-bold text-[#D4AF37] mb-3">
                              Known Spells & Abilities
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {character.spellsKnown.map((spell) => (
                                <span
                                  key={spell}
                                  className="text-xs bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 rounded-full px-3 py-1"
                                >
                                  {spell}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    size="sm"
                    className="bg-[#D4AF37] hover:bg-[#E6C76A] text-[#0B0F1A] font-semibold flex-1 gap-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewSheet(character);
                    }}
                  >
                    <FileText className="w-4 h-4" />
                    View Sheet
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
