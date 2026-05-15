import {
  ARMOR,
  CLASS_COMBAT_ACTIONS,
  EQUIPMENT_PACKS,
  GEAR,
  GLOBAL_COMBAT_ACTIONS,
  RACE_COMBAT_ACTIONS,
  SKILLS,
  WEAPONS,
} from "./character-data";
import type {
  AbilityStat,
  CharacterState,
  CombatAction,
  SkillName,
} from "./character-types";

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
    skillPool: ["Athletics", "Survival", "Intimidation", "Animal Handling"],
    savingThrows: ["STR", "CON"],
    armor: [...ARMOR.Light, ...ARMOR.Medium, ...ARMOR.Shield],
    weapons: ["Greataxe", "Handaxe", "Javelin"],
    tools: [],
    packs: ["Explorer's Pack"],
    spells: {},
    features: ["Rage", "Unarmored Defense"],
    hitDice: "1d12",
  },
  Bard: {
    abilityPriority: ["CHA", "DEX", "CON", "WIS", "INT", "STR"],
    skillPool: ["Performance", "Persuasion", "Deception", "Insight"],
    savingThrows: ["DEX", "CHA"],
    armor: ARMOR.Light,
    weapons: ["Rapier", "Dagger", "Shortsword"],
    tools: ["Lute", "Disguise Kit"],
    packs: ["Entertainer's Pack"],
    spells: {
      0: ["Vicious Mockery", "Mage Hand"],
      1: ["Cure Wounds", "Bane"],
    },
    features: ["Spellcasting", "Bardic Inspiration"],
    hitDice: "1d8",
  },
  Cleric: {
    abilityPriority: ["WIS", "CON", "STR", "CHA", "DEX", "INT"],
    skillPool: ["Religion", "Medicine", "Insight", "History"],
    savingThrows: ["WIS", "CHA"],
    armor: [...ARMOR.Light, ...ARMOR.Medium, ...ARMOR.Heavy, ...ARMOR.Shield],
    weapons: ["Mace", "Light Crossbow"],
    tools: [],
    packs: ["Priest's Pack"],
    spells: {
      0: ["Sacred Flame", "Thaumaturgy", "Guidance"],
      1: ["Healing Word", "Cure Wounds", "Bless"],
    },
    features: ["Spellcasting", "Divine Domain"],
    hitDice: "1d8",
  },
  Druid: {
    abilityPriority: ["WIS", "CON", "DEX", "INT", "CHA", "STR"],
    skillPool: ["Nature", "Animal Handling", "Survival", "Medicine"],
    savingThrows: ["INT", "WIS"],
    armor: [...ARMOR.Light, ...ARMOR.Medium, ...ARMOR.Shield],
    weapons: ["Quarterstaff", "Scimitar", "Sling"],
    tools: ["Herbalism Kit"],
    packs: ["Explorer's Pack"],
    spells: {
      0: ["Druidcraft", "Shillelagh"],
      1: ["Cure Wounds", "Entangle"],
    },
    features: ["Spellcasting"],
    hitDice: "1d8",
  },
  Fighter: {
    abilityPriority: ["STR", "CON", "DEX", "WIS", "CHA", "INT"],
    skillPool: ["Athletics", "Intimidation", "Survival", "Perception"],
    savingThrows: ["STR", "CON"],
    armor: [...ARMOR.Light, ...ARMOR.Medium, ...ARMOR.Heavy, ...ARMOR.Shield],
    weapons: ["Longsword", "Shield", "Handaxe"],
    tools: [],
    packs: ["Dungeoneer's Pack"],
    spells: {},
    features: ["Second Wind", "Fighting Style"],
    hitDice: "1d10",
  },
  Monk: {
    abilityPriority: ["DEX", "WIS", "CON", "STR", "CHA", "INT"],
    skillPool: ["Acrobatics", "Stealth", "Insight", "Athletics"],
    savingThrows: ["STR", "DEX"],
    armor: [],
    weapons: ["Quarterstaff", "Shortsword", "Dagger"],
    tools: ["Artisan's Tools"],
    packs: ["Dungeoneer's Pack"],
    spells: {},
    features: ["Unarmored Defense", "Martial Arts"],
    hitDice: "1d8",
  },
  Paladin: {
    abilityPriority: ["STR", "CHA", "CON", "WIS", "DEX", "INT"],
    skillPool: ["Persuasion", "Athletics", "Religion", "Insight"],
    savingThrows: ["WIS", "CHA"],
    armor: [...ARMOR.Light, ...ARMOR.Medium, ...ARMOR.Heavy, ...ARMOR.Shield],
    weapons: ["Warhammer", "Shield", "Javelin"],
    tools: [],
    packs: ["Priest's Pack"],
    spells: {
      1: ["Cure Wounds", "Bless"],
    },
    features: ["Divine Sense", "Lay on Hands"],
    hitDice: "1d10",
  },
  Ranger: {
    abilityPriority: ["DEX", "WIS", "CON", "STR", "INT", "CHA"],
    skillPool: ["Survival", "Nature", "Perception", "Stealth"],
    savingThrows: ["STR", "DEX"],
    armor: [...ARMOR.Light, ...ARMOR.Medium, ...ARMOR.Shield],
    weapons: ["Longbow", "Shortsword", "Shortsword"],
    tools: [],
    packs: ["Explorer's Pack"],
    spells: {
      1: ["Hunter's Mark", "Cure Wounds"],
    },
    features: ["Favored Enemy", "Natural Explorer"],
    hitDice: "1d10",
  },
  Rogue: {
    abilityPriority: ["DEX", "CHA", "CON", "INT", "WIS", "STR"],
    skillPool: ["Stealth", "Sleight of Hand", "Acrobatics", "Deception"],
    savingThrows: ["DEX", "INT"],
    armor: ARMOR.Light,
    weapons: ["Rapier", "Shortbow", "Dagger"],
    tools: ["Thieves' Tools"],
    packs: ["Burglar's Pack"],
    spells: {},
    features: ["Sneak Attack", "Expertise"],
    hitDice: "1d8",
  },
  Sorcerer: {
    abilityPriority: ["CHA", "CON", "DEX", "WIS", "INT", "STR"],
    skillPool: ["Arcana", "Persuasion", "Deception", "Insight"],
    savingThrows: ["CON", "CHA"],
    armor: [],
    weapons: ["Dagger", "Dagger", "Light Crossbow"],
    tools: [],
    packs: ["Dungeoneer's Pack"],
    spells: {
      0: ["Fire Bolt", "Ray of Frost", "Mage Hand", "Prestidigitation"],
      1: ["Magic Missile", "Shield"],
    },
    features: ["Spellcasting", "Sorcerous Origin"],
    hitDice: "1d6",
  },
  Warlock: {
    abilityPriority: ["CHA", "CON", "DEX", "WIS", "INT", "STR"],
    skillPool: ["Arcana", "Deception", "Intimidation", "Investigation"],
    savingThrows: ["WIS", "CHA"],
    armor: ARMOR.Light,
    weapons: ["Dagger", "Dagger", "Light Crossbow"],
    tools: [],
    packs: ["Scholar's Pack"],
    spells: {
      0: ["Eldritch Blast", "Minor Illusion"],
      1: ["Hex", "Hellish Rebuke"],
    },
    features: ["Pact Magic", "Otherworldly Patron"],
    hitDice: "1d8",
  },
  Wizard: {
    abilityPriority: ["INT", "CON", "DEX", "WIS", "CHA", "STR"],
    skillPool: ["Arcana", "Investigation", "History", "Religion"],
    savingThrows: ["INT", "WIS"],
    armor: [],
    weapons: ["Quarterstaff", "Dagger"],
    tools: [],
    packs: ["Scholar's Pack"],
    spells: {
      0: ["Fire Bolt", "Mage Hand", "Light"],
      1: ["Magic Missile", "Shield", "Sleep"],
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

export function getAvailableCombatActions(
  race: string,
  subrace: string,
  characterClass: string,
): CombatAction[] {
  const actions: CombatAction[] = [...GLOBAL_COMBAT_ACTIONS];

  if (RACE_COMBAT_ACTIONS[race]) {
    actions.push(...RACE_COMBAT_ACTIONS[race]);
  }

  // Handle subrace specific actions (e.g., "High Elf")
  const subraceKey = subrace ? `${subrace} ${race}` : "";
  if (subraceKey && RACE_COMBAT_ACTIONS[subraceKey]) {
    actions.push(...RACE_COMBAT_ACTIONS[subraceKey]);
  } else if (subrace && RACE_COMBAT_ACTIONS[subrace]) {
    // Some subraces might be listed directly (e.g., "Drow")
    actions.push(...RACE_COMBAT_ACTIONS[subrace]);
  }

  if (CLASS_COMBAT_ACTIONS[characterClass]) {
    actions.push(...CLASS_COMBAT_ACTIONS[characterClass]);
  }

  // Remove duplicates by name
  const uniqueActions: CombatAction[] = [];
  const seenNames = new Set<string>();
  for (const action of actions) {
    if (!seenNames.has(action.name)) {
      seenNames.add(action.name);
      uniqueActions.push(action);
    }
  }

  return uniqueActions;
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
  subrace = "",
  characterClass,
  background = "",
}: {
  race: string;
  subrace?: string;
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
    combatActions: getAvailableCombatActions(race, subrace, characterClass),
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
    combatActions: getAvailableCombatActions(
      state.race,
      state.subrace,
      state.characterClass,
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

export function getWeaponDamage(weaponName: string): string {
  const damageMap: Record<string, string> = {
    Greataxe: "1d12",
    Greatsword: "1d10",
    Longsword: "1d8",
    Rapier: "1d8",
    Warhammer: "1d8",
    Longbow: "1d8",
    Mace: "1d6",
    Quarterstaff: "1d6",
    Shortsword: "1d6",
    Scimitar: "1d6",
    Handaxe: "1d6",
    "Light Crossbow": "1d8",
    Shortbow: "1d6",
    Javelin: "1d6",
    Dagger: "1d4",
    Sling: "1d4",
    Club: "1d4",
    Sickle: "1d4",
    Dart: "1d4",
    "Unarmed Strike": "1", // Monks overwrite this in the UI
  };
  return damageMap[weaponName] || "1d6";
}

export function calculateArmorClass(
  armorList: string[],
  abilities: Record<AbilityStat, number>,
  characterClass: string,
): number {
  const dexMod = Math.floor((abilities.DEX - 10) / 2);
  const conMod = Math.floor((abilities.CON - 10) / 2);
  const wisMod = Math.floor((abilities.WIS - 10) / 2);

  let baseAC = 10 + dexMod;
  let hasShield = false;

  const armorLower = armorList.map((a) => a.toLowerCase());
  if (armorLower.some((a) => a.includes("shield"))) {
    hasShield = true;
  }

  // Check unarmored defense
  if (characterClass === "Barbarian" && !armorLower.some((a) => a.includes("armor"))) {
    baseAC = 10 + dexMod + conMod;
  } else if (characterClass === "Monk" && !armorLower.some((a) => a.includes("armor")) && !hasShield) {
    baseAC = 10 + dexMod + wisMod;
  } else if (armorLower.some((a) => a.includes("plate"))) {
    baseAC = 18; // Heavy armor, no DEX
  } else if (armorLower.some((a) => a.includes("chain mail"))) {
    baseAC = 16; // Heavy armor, no DEX
  } else if (armorLower.some((a) => a.includes("scale mail") || a.includes("breastplate"))) {
    baseAC = 14 + Math.min(2, dexMod); // Medium armor max 2 DEX
  } else if (armorLower.some((a) => a.includes("chain shirt"))) {
    baseAC = 13 + Math.min(2, dexMod); // Medium armor max 2 DEX
  } else if (armorLower.some((a) => a.includes("hide"))) {
    baseAC = 12 + Math.min(2, dexMod); // Medium armor max 2 DEX
  } else if (armorLower.some((a) => a.includes("studded leather"))) {
    baseAC = 12 + dexMod; // Light armor
  } else if (armorLower.some((a) => a.includes("leather"))) {
    baseAC = 11 + dexMod; // Light armor
  } else if (characterClass === "Sorcerer" || characterClass === "Wizard") {
    // Draconic Resilience or Mage Armor often used, simplify to baseline
    baseAC = 10 + dexMod;
  }

  if (hasShield) {
    baseAC += 2;
  }

  return baseAC;
}
