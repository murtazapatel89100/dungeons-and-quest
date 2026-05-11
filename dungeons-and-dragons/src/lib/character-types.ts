export type Alignment =
  | "Lawful Good"
  | "Neutral Good"
  | "Chaotic Good"
  | "Lawful Neutral"
  | "True Neutral"
  | "Chaotic Neutral"
  | "Lawful Evil"
  | "Neutral Evil"
  | "Chaotic Evil";

export type AbilityStat = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";

export type SkillName =
  | "Acrobatics"
  | "Animal Handling"
  | "Arcana"
  | "Athletics"
  | "Deception"
  | "History"
  | "Insight"
  | "Intimidation"
  | "Investigation"
  | "Medicine"
  | "Nature"
  | "Perception"
  | "Performance"
  | "Persuasion"
  | "Religion"
  | "Sleight of Hand"
  | "Stealth"
  | "Survival";

export interface CharacterIdentity {
  name: string;
  gender: string;
  age: string;
  height: string;
  weight: string;
  alignment: Alignment | "";
  deity: string;
  title: string;
  imageUrl?: string;
}

export interface PersonalityTraits {
  traits: string[];
  quirks: string[];
  fears: string[];
  goals: string[];
  secrets: string[];
  ideals: string[];
  bonds: string[];
  flaws: string[];
  backstory?: string;
}

export interface CharacterState {
  identity: CharacterIdentity;
  race: string;
  subrace: string;
  characterClass: string;
  subclass: string;
  background: string;
  abilities: Record<AbilityStat, number>;
  skills: SkillName[];
  savingThrows: AbilityStat[];
  feats: string[];
  features: string[]; // racial and class features
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
  spells: Record<number, string[]>; // level -> list of spells (0 = cantrip)
  personality: PersonalityTraits;
  meta: {
    level: number;
    xp: number;
    inspiration: boolean;
    hitDice: string; // e.g., "1d8"
    proficiencyBonus: number;
  };
  generatorLocks: {
    race: boolean;
    characterClass: boolean;
    background: boolean;
    stats: boolean;
    equipment: boolean;
    spells: boolean;
  };
  generatorFilters: {
    magicOnly: boolean;
    martialOnly: boolean;
    beginnerFriendly: boolean;
    advancedOnly: boolean;
    roleplayFocused: boolean;
    combatFocused: boolean;
  };
}

export const INITIAL_CHARACTER_STATE: CharacterState = {
  identity: {
    name: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
    alignment: "",
    deity: "",
    title: "",
  },
  race: "",
  subrace: "",
  characterClass: "",
  subclass: "",
  background: "",
  abilities: { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 },
  skills: [],
  savingThrows: [],
  feats: [],
  features: [],
  languages: ["Common"],
  proficiencies: { armor: [], weapons: [], tools: [] },
  weapons: [],
  armor: [],
  equipment: [],
  tools: [],
  currency: { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 },
  spells: {
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
  },
  personality: {
    traits: [],
    quirks: [],
    fears: [],
    goals: [],
    secrets: [],
    ideals: [],
    bonds: [],
    flaws: [],
  },
  meta: {
    level: 1,
    xp: 0,
    inspiration: false,
    hitDice: "1d8",
    proficiencyBonus: 2,
  },
  generatorLocks: {
    race: false,
    characterClass: false,
    background: false,
    stats: false,
    equipment: false,
    spells: false,
  },
  generatorFilters: {
    magicOnly: false,
    martialOnly: false,
    beginnerFriendly: false,
    advancedOnly: false,
    roleplayFocused: false,
    combatFocused: false,
  },
};
