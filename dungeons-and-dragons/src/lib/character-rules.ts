import {
  ARMOR,
  EQUIPMENT_PACKS,
  GEAR,
  SKILLS,
  WEAPONS,
} from "./character-data";
import type { AbilityStat, CharacterState, SkillName } from "./character-types";

type AbilityScores = Record<AbilityStat, number>;
type ClassRule = {
  abilityPriority: AbilityStat[];
  skillPool: SkillName[];
  savingThrows: [AbilityStat, AbilityStat];
  armor: string[];
  weapons: string[];
  tools: string[];
  packs: string[];
  spells: Record<number, string[]>;
  features: string[];
  hitDice: string;
};

type RaceRule = {
  abilityBonuses: Partial<Record<AbilityStat, number>>;
  languages: string[];
  weapons: string[];
  armor: string[];
  tools: string[];
  features: string[];
  preferredClasses?: string[];
};

export const BACKGROUND_SKILL_POOLS: Record<string, SkillName[]> = {
  Acolyte: ["Insight", "Religion"],
  Charlatan: ["Deception", "Sleight of Hand"],
  Criminal: ["Deception", "Stealth"],
  Entertainer: ["Performance", "Acrobatics"],
  "Folk Hero": ["Animal Handling", "Survival"],
  "Guild Artisan": ["Insight", "Persuasion"],
  Hermit: ["Medicine", "Religion"],
  Noble: ["History", "Persuasion"],
  Outlander: ["Athletics", "Survival"],
  Sage: ["Arcana", "History"],
  Sailor: ["Athletics", "Perception"],
  Soldier: ["Athletics", "Intimidation"],
  Urchin: ["Sleight of Hand", "Stealth"],
};

export const BACKGROUND_TOOL_POOLS: Record<string, string[]> = {
  Charlatan: ["Disguise Kit", "Forgery Kit"],
  Criminal: ["Thieves' Tools"],
  Entertainer: ["Disguise Kit", "Lute"],
  "Guild Artisan": ["Alchemist Supplies", "Forgery Kit"],
  Hermit: ["Herbalism Kit"],
  Noble: ["Gaming Set"],
  Sailor: ["Navigator's Tools"],
  Soldier: ["Gaming Set"],
  Urchin: ["Thieves' Tools"],
};

export const CLASS_RULES: Record<string, ClassRule> = {
  Barbarian: {
    abilityPriority: ["STR", "CON", "DEX", "WIS", "CHA", "INT"],
    skillPool: [
      "Animal Handling",
      "Athletics",
      "Intimidation",
      "Nature",
      "Perception",
      "Survival",
    ],
    savingThrows: ["STR", "CON"],
    armor: [...ARMOR.Light, ...ARMOR.Medium, ...ARMOR.Shield],
    weapons: [...WEAPONS.Simple, ...WEAPONS.Martial, ...WEAPONS.Ranged],
    tools: [],
    packs: ["Explorer's Pack"],
    spells: {},
    features: ["Rage", "Unarmored Defense"],
    hitDice: "1d12",
  },
  Bard: {
    abilityPriority: ["CHA", "DEX", "CON", "INT", "WIS", "STR"],
    skillPool: SKILLS as SkillName[],
    savingThrows: ["DEX", "CHA"],
    armor: ARMOR.Light,
    weapons: [
      ...WEAPONS.Simple,
      "Hand Crossbow",
      "Longsword",
      "Rapier",
      "Shortsword",
    ],
    tools: ["Lute", "Disguise Kit"],
    packs: ["Entertainer's Pack", "Diplomat's Pack", "Dungeoneer's Pack"],
    spells: {
      0: ["Mage Hand", "Minor Illusion"],
      1: ["Cure Wounds", "Detect Magic", "Sleep"],
      2: ["Invisibility", "Hold Person"],
    },
    features: ["Spellcasting", "Bardic Inspiration", "Jack of All Trades"],
    hitDice: "1d8",
  },
  Cleric: {
    abilityPriority: ["WIS", "CON", "STR", "CHA", "DEX", "INT"],
    skillPool: ["History", "Insight", "Medicine", "Persuasion", "Religion"],
    savingThrows: ["WIS", "CHA"],
    armor: [...ARMOR.Light, ...ARMOR.Medium, ...ARMOR.Heavy, ...ARMOR.Shield],
    weapons: WEAPONS.Simple,
    tools: [],
    packs: ["Priest's Pack", "Explorer's Pack"],
    spells: {
      0: ["Sacred Flame"],
      1: ["Cure Wounds", "Detect Magic"],
      2: ["Hold Person"],
    },
    features: ["Spellcasting", "Divine Domain"],
    hitDice: "1d8",
  },
  Druid: {
    abilityPriority: ["WIS", "CON", "DEX", "INT", "STR", "CHA"],
    skillPool: [
      "Animal Handling",
      "Insight",
      "Medicine",
      "Nature",
      "Perception",
      "Religion",
      "Survival",
    ],
    savingThrows: ["INT", "WIS"],
    armor: [...ARMOR.Light, ...ARMOR.Medium, ...ARMOR.Shield],
    weapons: [
      "Club",
      "Dagger",
      "Dart",
      "Javelin",
      "Mace",
      "Quarterstaff",
      "Scimitar",
      "Sickle",
      "Sling",
      "Spear",
    ],
    tools: ["Herbalism Kit"],
    packs: ["Explorer's Pack"],
    spells: {
      0: ["Mage Hand"],
      1: ["Cure Wounds", "Detect Magic"],
      2: ["Hold Person"],
    },
    features: ["Spellcasting", "Wild Shape"],
    hitDice: "1d8",
  },
  Fighter: {
    abilityPriority: ["STR", "CON", "DEX", "WIS", "INT", "CHA"],
    skillPool: [
      "Acrobatics",
      "Animal Handling",
      "Athletics",
      "History",
      "Insight",
      "Intimidation",
      "Perception",
      "Survival",
    ],
    savingThrows: ["STR", "CON"],
    armor: [...ARMOR.Light, ...ARMOR.Medium, ...ARMOR.Heavy, ...ARMOR.Shield],
    weapons: [...WEAPONS.Simple, ...WEAPONS.Martial, ...WEAPONS.Ranged],
    tools: [],
    packs: ["Dungeoneer's Pack", "Explorer's Pack"],
    spells: {},
    features: ["Second Wind", "Action Surge"],
    hitDice: "1d10",
  },
  Monk: {
    abilityPriority: ["DEX", "WIS", "CON", "STR", "INT", "CHA"],
    skillPool: [
      "Acrobatics",
      "Athletics",
      "History",
      "Insight",
      "Religion",
      "Stealth",
    ],
    savingThrows: ["STR", "DEX"],
    armor: [],
    weapons: [...WEAPONS.Simple, "Shortsword"],
    tools: ["Artisan's Tools"],
    packs: ["Dungeoneer's Pack", "Explorer's Pack"],
    spells: {},
    features: ["Martial Arts", "Ki"],
    hitDice: "1d8",
  },
  Paladin: {
    abilityPriority: ["STR", "CHA", "CON", "WIS", "DEX", "INT"],
    skillPool: [
      "Athletics",
      "Insight",
      "Intimidation",
      "Medicine",
      "Persuasion",
      "Religion",
    ],
    savingThrows: ["WIS", "CHA"],
    armor: [...ARMOR.Light, ...ARMOR.Medium, ...ARMOR.Heavy, ...ARMOR.Shield],
    weapons: [...WEAPONS.Simple, ...WEAPONS.Martial, ...WEAPONS.Ranged],
    tools: [],
    packs: ["Priest's Pack", "Explorer's Pack"],
    spells: {
      1: ["Cure Wounds", "Detect Magic"],
    },
    features: ["Divine Sense", "Lay on Hands", "Divine Smite"],
    hitDice: "1d10",
  },
  Ranger: {
    abilityPriority: ["DEX", "WIS", "CON", "STR", "INT", "CHA"],
    skillPool: [
      "Animal Handling",
      "Athletics",
      "Insight",
      "Investigation",
      "Nature",
      "Perception",
      "Stealth",
      "Survival",
    ],
    savingThrows: ["STR", "DEX"],
    armor: [...ARMOR.Light, ...ARMOR.Medium, ...ARMOR.Shield],
    weapons: [...WEAPONS.Simple, ...WEAPONS.Martial, ...WEAPONS.Ranged],
    tools: [],
    packs: ["Dungeoneer's Pack", "Explorer's Pack"],
    spells: {
      1: ["Cure Wounds", "Detect Magic"],
      2: ["Hold Person"],
    },
    features: ["Favored Foe", "Natural Explorer"],
    hitDice: "1d10",
  },
  Rogue: {
    abilityPriority: ["DEX", "INT", "CON", "CHA", "WIS", "STR"],
    skillPool: [
      "Acrobatics",
      "Athletics",
      "Deception",
      "Insight",
      "Intimidation",
      "Investigation",
      "Perception",
      "Performance",
      "Persuasion",
      "Sleight of Hand",
      "Stealth",
    ],
    savingThrows: ["DEX", "INT"],
    armor: ARMOR.Light,
    weapons: [
      ...WEAPONS.Simple,
      "Hand Crossbow",
      "Longsword",
      "Rapier",
      "Shortsword",
    ],
    tools: ["Thieves' Tools"],
    packs: ["Burglar's Pack", "Dungeoneer's Pack", "Explorer's Pack"],
    spells: {},
    features: ["Sneak Attack", "Expertise"],
    hitDice: "1d8",
  },
  Sorcerer: {
    abilityPriority: ["CHA", "CON", "DEX", "WIS", "INT", "STR"],
    skillPool: [
      "Arcana",
      "Deception",
      "Insight",
      "Intimidation",
      "Persuasion",
      "Religion",
    ],
    savingThrows: ["CON", "CHA"],
    armor: [],
    weapons: ["Dagger", "Dart", "Light Crossbow", "Quarterstaff", "Sling"],
    tools: [],
    packs: ["Dungeoneer's Pack", "Explorer's Pack"],
    spells: {
      0: ["Fire Bolt", "Mage Hand", "Minor Illusion", "Ray of Frost"],
      1: ["Magic Missile", "Shield", "Burning Hands", "Sleep"],
      2: ["Mirror Image", "Scorching Ray"],
    },
    features: ["Spellcasting", "Sorcery Points"],
    hitDice: "1d6",
  },
  Warlock: {
    abilityPriority: ["CHA", "CON", "DEX", "WIS", "INT", "STR"],
    skillPool: [
      "Arcana",
      "Deception",
      "History",
      "Intimidation",
      "Investigation",
      "Nature",
      "Religion",
    ],
    savingThrows: ["WIS", "CHA"],
    armor: ARMOR.Light,
    weapons: WEAPONS.Simple,
    tools: [],
    packs: ["Scholar's Pack", "Dungeoneer's Pack"],
    spells: {
      0: ["Eldritch Blast", "Mage Hand", "Minor Illusion"],
      1: ["Burning Hands", "Shield", "Detect Magic"],
      2: ["Invisibility", "Hold Person", "Mirror Image"],
    },
    features: ["Pact Magic", "Eldritch Invocations"],
    hitDice: "1d8",
  },
  Wizard: {
    abilityPriority: ["INT", "CON", "DEX", "WIS", "CHA", "STR"],
    skillPool: [
      "Arcana",
      "History",
      "Insight",
      "Investigation",
      "Medicine",
      "Religion",
    ],
    savingThrows: ["INT", "WIS"],
    armor: [],
    weapons: ["Dagger", "Dart", "Light Crossbow", "Quarterstaff", "Sling"],
    tools: [],
    packs: ["Scholar's Pack", "Explorer's Pack"],
    spells: {
      0: ["Fire Bolt", "Mage Hand", "Minor Illusion", "Ray of Frost"],
      1: ["Magic Missile", "Shield", "Burning Hands", "Sleep", "Detect Magic"],
      2: ["Invisibility", "Mirror Image", "Hold Person", "Scorching Ray"],
      3: ["Fireball", "Lightning Bolt"],
      4: ["Dimension Door"],
      7: ["Teleport"],
      9: ["Wish"],
    },
    features: ["Spellcasting", "Arcane Recovery"],
    hitDice: "1d6",
  },
};

export const RACE_RULES: Record<string, RaceRule> = {
  Human: {
    abilityBonuses: { STR: 1, DEX: 1, CON: 1, INT: 1, WIS: 1, CHA: 1 },
    languages: ["Common"],
    weapons: [],
    armor: [],
    tools: [],
    features: ["Adaptable", "Versatile"],
  },
  Elf: {
    abilityBonuses: { DEX: 2 },
    languages: ["Common", "Elvish"],
    weapons: ["Longsword", "Shortsword", "Shortbow", "Longbow"],
    armor: [],
    tools: [],
    features: ["Darkvision", "Fey Ancestry"],
    preferredClasses: ["Wizard", "Ranger", "Rogue"],
  },
  Dwarf: {
    abilityBonuses: { CON: 2 },
    languages: ["Common", "Dwarvish"],
    weapons: ["Battleaxe", "Handaxe", "Light Hammer", "Warhammer"],
    armor: [],
    tools: ["Smith's Tools", "Brewer's Supplies", "Mason's Tools"],
    features: ["Darkvision", "Dwarven Resilience"],
    preferredClasses: ["Fighter", "Cleric", "Barbarian"],
  },
  Halfling: {
    abilityBonuses: { DEX: 2 },
    languages: ["Common", "Halfling"],
    weapons: [],
    armor: [],
    tools: [],
    features: ["Lucky", "Brave"],
    preferredClasses: ["Rogue", "Bard", "Ranger"],
  },
  Dragonborn: {
    abilityBonuses: { STR: 2, CHA: 1 },
    languages: ["Common", "Draconic"],
    weapons: [],
    armor: [],
    tools: [],
    features: ["Draconic Ancestry", "Breath Weapon"],
    preferredClasses: ["Paladin", "Fighter", "Sorcerer"],
  },
  Gnome: {
    abilityBonuses: { INT: 2 },
    languages: ["Common", "Gnomish"],
    weapons: [],
    armor: [],
    tools: ["Tinker's Tools"],
    features: ["Gnome Cunning", "Tinker"],
    preferredClasses: ["Wizard", "Rogue"],
  },
  "Half-Elf": {
    abilityBonuses: { CHA: 2, DEX: 1, CON: 1 },
    languages: ["Common", "Elvish"],
    weapons: [],
    armor: [],
    tools: [],
    features: ["Darkvision", "Fey Ancestry"],
    preferredClasses: ["Bard", "Warlock", "Paladin"],
  },
  "Half-Orc": {
    abilityBonuses: { STR: 2, CON: 1 },
    languages: ["Common", "Orc"],
    weapons: [],
    armor: [],
    tools: [],
    features: ["Relentless Endurance", "Savage Attacks"],
    preferredClasses: ["Barbarian", "Fighter", "Paladin"],
  },
  Tiefling: {
    abilityBonuses: { CHA: 2, INT: 1 },
    languages: ["Common", "Infernal"],
    weapons: [],
    armor: [],
    tools: [],
    features: ["Hellish Resistance", "Infernal Legacy"],
    preferredClasses: ["Warlock", "Sorcerer", "Bard"],
  },
  Aasimar: {
    abilityBonuses: { CHA: 2, WIS: 1 },
    languages: ["Common", "Celestial"],
    weapons: [],
    armor: [],
    tools: [],
    features: ["Celestial Resistance", "Healing Hands"],
    preferredClasses: ["Cleric", "Paladin", "Sorcerer"],
  },
  Genasi: {
    abilityBonuses: { CON: 2 },
    languages: ["Common", "Primordial"],
    weapons: [],
    armor: [],
    tools: [],
    features: ["Elemental Gift"],
    preferredClasses: ["Druid", "Sorcerer", "Fighter"],
  },
  Goliath: {
    abilityBonuses: { STR: 2, CON: 1 },
    languages: ["Common", "Giant"],
    weapons: [],
    armor: [],
    tools: [],
    features: ["Stone's Endurance", "Powerful Build"],
    preferredClasses: ["Barbarian", "Fighter", "Paladin"],
  },
  Firbolg: {
    abilityBonuses: { WIS: 2, STR: 1 },
    languages: ["Common", "Elvish", "Giant"],
    weapons: [],
    armor: [],
    tools: [],
    features: ["Hidden Step", "Powerful Build"],
    preferredClasses: ["Druid", "Cleric", "Ranger"],
  },
  Tabaxi: {
    abilityBonuses: { DEX: 2, CHA: 1 },
    languages: ["Common"],
    weapons: [],
    armor: [],
    tools: [],
    features: ["Cat's Claw", "Feline Agility"],
    preferredClasses: ["Rogue", "Monk", "Bard"],
  },
  Kenku: {
    abilityBonuses: { DEX: 2, WIS: 1 },
    languages: ["Common"],
    weapons: [],
    armor: [],
    tools: ["Forgery Kit"],
    features: ["Mimicry"],
    preferredClasses: ["Rogue", "Ranger", "Monk"],
  },
  Lizardfolk: {
    abilityBonuses: { CON: 2, WIS: 1 },
    languages: ["Common", "Draconic"],
    weapons: [],
    armor: [],
    tools: [],
    features: ["Bite", "Hunter's Lore"],
    preferredClasses: ["Druid", "Ranger", "Barbarian"],
  },
  Triton: {
    abilityBonuses: { STR: 1, CON: 1, CHA: 1 },
    languages: ["Common", "Primordial"],
    weapons: [],
    armor: [],
    tools: [],
    features: ["Amphibious", "Control Air and Water"],
    preferredClasses: ["Paladin", "Fighter", "Warlock"],
  },
  "Yuan-ti Pureblood": {
    abilityBonuses: { CHA: 2, INT: 1 },
    languages: ["Common", "Abyssal", "Draconic"],
    weapons: [],
    armor: [],
    tools: [],
    features: ["Magic Resistance", "Poison Immunity"],
    preferredClasses: ["Warlock", "Sorcerer", "Rogue"],
  },
  Goblin: {
    abilityBonuses: { DEX: 2, CON: 1 },
    languages: ["Common", "Goblin"],
    weapons: [],
    armor: [],
    tools: [],
    features: ["Nimble Escape"],
    preferredClasses: ["Rogue", "Ranger", "Fighter"],
  },
  Hobgoblin: {
    abilityBonuses: { CON: 2, INT: 1 },
    languages: ["Common", "Goblin"],
    weapons: ["Longsword", "Longbow"],
    armor: ARMOR.Light,
    tools: [],
    features: ["Martial Training"],
    preferredClasses: ["Fighter", "Wizard", "Ranger"],
  },
  Bugbear: {
    abilityBonuses: { STR: 2, DEX: 1 },
    languages: ["Common", "Goblin"],
    weapons: [],
    armor: [],
    tools: [],
    features: ["Long-Limbed", "Surprise Attack"],
    preferredClasses: ["Rogue", "Barbarian", "Fighter"],
  },
  Orc: {
    abilityBonuses: { STR: 2, CON: 1 },
    languages: ["Common", "Orc"],
    weapons: [],
    armor: [],
    tools: [],
    features: ["Aggressive", "Powerful Build"],
    preferredClasses: ["Barbarian", "Fighter", "Paladin"],
  },
  Kobold: {
    abilityBonuses: { DEX: 2 },
    languages: ["Common", "Draconic"],
    weapons: [],
    armor: [],
    tools: [],
    features: ["Pack Tactics", "Grovel, Cower, and Beg"],
    preferredClasses: ["Rogue", "Ranger", "Sorcerer"],
  },
};

const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

export function uniqueItems<T>(items: readonly T[]): T[] {
  return Array.from(new Set(items));
}

export function getClassRule(characterClass: string) {
  return CLASS_RULES[characterClass];
}

export function getRaceRule(race: string) {
  return RACE_RULES[race];
}

export function getAvailableSkills(characterClass: string, background = "") {
  const classSkills =
    getClassRule(characterClass)?.skillPool ?? (SKILLS as SkillName[]);
  return uniqueItems([
    ...classSkills,
    ...(BACKGROUND_SKILL_POOLS[background] ?? []),
  ]);
}

export function getAvailableArmor(race: string, characterClass: string) {
  return uniqueItems([
    ...(getClassRule(characterClass)?.armor ?? []),
    ...(getRaceRule(race)?.armor ?? []),
  ]);
}

export function getAvailableWeapons(race: string, characterClass: string) {
  return uniqueItems([
    ...(getClassRule(characterClass)?.weapons ?? []),
    ...(getRaceRule(race)?.weapons ?? []),
  ]);
}

export function getAvailableTools(
  race: string,
  characterClass: string,
  background = "",
) {
  return uniqueItems([
    ...(getClassRule(characterClass)?.tools ?? []),
    ...(getRaceRule(race)?.tools ?? []),
    ...(BACKGROUND_TOOL_POOLS[background] ?? []),
  ]);
}

export function getAvailablePacks(characterClass: string) {
  return getClassRule(characterClass)?.packs ?? EQUIPMENT_PACKS;
}

export function getAvailableSpells(characterClass: string) {
  return getClassRule(characterClass)?.spells ?? {};
}

export function isSpellcaster(characterClass: string) {
  return Object.values(getAvailableSpells(characterClass)).some(
    (spells) => spells.length > 0,
  );
}

export function getRecommendedClassesForRace(race: string) {
  return getRaceRule(race)?.preferredClasses ?? [];
}

export function buildDefaultAbilities(
  race: string,
  characterClass: string,
): AbilityScores {
  const priority = getClassRule(characterClass)?.abilityPriority ?? [
    "STR",
    "DEX",
    "CON",
    "INT",
    "WIS",
    "CHA",
  ];
  const scores = {} as AbilityScores;

  priority.forEach((ability, index) => {
    scores[ability] = STANDARD_ARRAY[index] ?? 10;
  });

  for (const [ability, bonus] of Object.entries(
    getRaceRule(race)?.abilityBonuses ?? {},
  )) {
    scores[ability as AbilityStat] = Math.min(
      20,
      (scores[ability as AbilityStat] ?? 10) + (bonus ?? 0),
    );
  }

  return scores;
}

export function buildDefaultSpells(characterClass: string) {
  const availableSpells = getAvailableSpells(characterClass);
  const defaultSpells: CharacterState["spells"] = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
  };

  for (const [level, spells] of Object.entries(availableSpells)) {
    const numericLevel = Number(level);
    defaultSpells[numericLevel] =
      numericLevel === 0 ? spells.slice(0, 2) : spells.slice(0, 3);
  }

  return defaultSpells;
}

export function buildCharacterDefaults({
  race,
  characterClass,
  background = "",
}: {
  race: string;
  characterClass: string;
  background?: string;
}): Partial<CharacterState> {
  const classRule = getClassRule(characterClass);
  const raceRule = getRaceRule(race);
  const skills = getAvailableSkills(characterClass, background).slice(0, 4);
  const armor = getAvailableArmor(race, characterClass).slice(
    0,
    classRule?.armor.length ? 2 : 0,
  );
  const weapons = getAvailableWeapons(race, characterClass).slice(0, 3);
  const tools = getAvailableTools(race, characterClass, background).slice(0, 2);
  const equipment = uniqueItems([
    ...getAvailablePacks(characterClass).slice(0, 1),
    ...GEAR.slice(0, 3),
  ]);

  return {
    abilities: buildDefaultAbilities(race, characterClass),
    skills,
    savingThrows: classRule?.savingThrows ?? [],
    features: uniqueItems([
      ...(raceRule?.features ?? []),
      ...(classRule?.features ?? []),
    ]),
    languages: uniqueItems(["Common", ...(raceRule?.languages ?? [])]),
    proficiencies: {
      armor: getAvailableArmor(race, characterClass),
      weapons: getAvailableWeapons(race, characterClass),
      tools: getAvailableTools(race, characterClass, background),
    },
    armor,
    weapons,
    equipment,
    tools,
    spells: buildDefaultSpells(characterClass),
    meta: {
      level: 1,
      xp: 0,
      inspiration: false,
      hitDice: classRule?.hitDice ?? "1d8",
      proficiencyBonus: 2,
    },
  };
}

export function filterCharacterSelections(
  state: CharacterState,
): Partial<CharacterState> {
  const allowedSkills = getAvailableSkills(
    state.characterClass,
    state.background,
  );
  const allowedArmor = getAvailableArmor(state.race, state.characterClass);
  const allowedWeapons = getAvailableWeapons(state.race, state.characterClass);
  const allowedPacks = getAvailablePacks(state.characterClass);
  const availableSpells = getAvailableSpells(state.characterClass);

  return {
    skills: state.skills.filter((skill) => allowedSkills.includes(skill)),
    armor: state.armor.filter((item) => allowedArmor.includes(item)),
    weapons: state.weapons.filter((item) => allowedWeapons.includes(item)),
    equipment: state.equipment.filter(
      (item) => allowedPacks.includes(item) || GEAR.includes(item),
    ),
    spells: Object.fromEntries(
      Object.entries(state.spells).map(([level, spells]) => [
        Number(level),
        spells.filter((spell) =>
          (availableSpells[Number(level)] ?? []).includes(spell),
        ),
      ]),
    ) as CharacterState["spells"],
  };
}
