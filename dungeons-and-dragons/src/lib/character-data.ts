import type { CombatAction } from "./character-types";

export const ALIGNMENTS = [
  "Lawful Good",
  "Neutral Good",
  "Chaotic Good",
  "Lawful Neutral",
  "True Neutral",
  "Chaotic Neutral",
  "Lawful Evil",
  "Neutral Evil",
  "Chaotic Evil",
];

export const GENDERS = ["Male", "Female", "Non-binary", "Other"];

export const DEITIES = {
  Good: ["Pelor", "Bahamut", "Moradin", "Corellon"],
  Neutral: ["Kord", "Mystra", "Gond"],
  Evil: ["Tiamat", "Lolth", "Gruumsh", "Vecna"],
};

export const RACES = {
  Human: ["Standard", "Variant"],
  Elf: ["High", "Wood", "Drow"],
  Dwarf: ["Hill", "Mountain"],
  Halfling: ["Lightfoot", "Stout"],
  Dragonborn: [
    "Black",
    "Blue",
    "Brass",
    "Bronze",
    "Copper",
    "Gold",
    "Green",
    "Red",
    "Silver",
    "White",
  ],
  Gnome: ["Forest", "Rock"],
  "Half-Elf": [],
  "Half-Orc": [],
  Tiefling: [],
  // Expanded
  Aasimar: ["Protector", "Scourge", "Fallen"],
  Genasi: ["Air", "Earth", "Fire", "Water"],
  Goliath: [],
  Firbolg: [],
  Tabaxi: [],
  Kenku: [],
  Lizardfolk: [],
  Triton: [],
  "Yuan-ti Pureblood": [],
  // Monster-like
  Goblin: [],
  Hobgoblin: [],
  Bugbear: [],
  Orc: [],
  Kobold: [],
};

export const CLASSES = [
  "Barbarian",
  "Bard",
  "Cleric",
  "Druid",
  "Fighter",
  "Monk",
  "Paladin",
  "Ranger",
  "Rogue",
  "Sorcerer",
  "Warlock",
  "Wizard",
];

export const SKILLS = [
  "Acrobatics",
  "Animal Handling",
  "Arcana",
  "Athletics",
  "Deception",
  "History",
  "Insight",
  "Intimidation",
  "Investigation",
  "Medicine",
  "Nature",
  "Perception",
  "Performance",
  "Persuasion",
  "Religion",
  "Sleight of Hand",
  "Stealth",
  "Survival",
];

export const ABILITIES = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

export const BACKGROUNDS = [
  "Acolyte",
  "Charlatan",
  "Criminal",
  "Entertainer",
  "Folk Hero",
  "Guild Artisan",
  "Hermit",
  "Noble",
  "Outlander",
  "Sage",
  "Sailor",
  "Soldier",
  "Urchin",
];

export const WEAPONS = {
  Simple: [
    "Club",
    "Dagger",
    "Greatclub",
    "Handaxe",
    "Javelin",
    "Light Hammer",
    "Mace",
    "Quarterstaff",
    "Sickle",
    "Spear",
  ],
  Martial: [
    "Battleaxe",
    "Flail",
    "Glaive",
    "Greataxe",
    "Greatsword",
    "Halberd",
    "Lance",
    "Longsword",
    "Maul",
    "Morningstar",
    "Pike",
    "Rapier",
    "Scimitar",
    "Shortsword",
    "Trident",
    "War Pick",
    "Warhammer",
    "Whip",
  ],
  Ranged: [
    "Light Crossbow",
    "Dart",
    "Shortbow",
    "Sling",
    "Heavy Crossbow",
    "Hand Crossbow",
    "Longbow",
  ],
};

export const ARMOR = {
  Light: ["Padded", "Leather", "Studded Leather"],
  Medium: ["Hide", "Chain Shirt", "Scale Mail", "Breastplate", "Half Plate"],
  Heavy: ["Ring Mail", "Chain Mail", "Splint", "Plate"],
  Shield: ["Shield"],
};

export const EQUIPMENT_PACKS = [
  "Explorer's Pack",
  "Dungeoneer's Pack",
  "Scholar's Pack",
  "Priest's Pack",
  "Burglar's Pack",
  "Entertainer's Pack",
  "Diplomat's Pack",
];

export const GEAR = ["Rope", "Torch", "Rations", "Waterskin", "Bedroll"];

export const TOOLS = [
  "Thieves' Tools",
  "Disguise Kit",
  "Forgery Kit",
  "Herbalism Kit",
  "Alchemist Supplies",
  "Artisan's Tools",
  "Brewer's Supplies",
  "Gaming Set",
  "Lute",
  "Mason's Tools",
  "Navigator's Tools",
  "Smith's Tools",
  "Tinker's Tools",
];

export const SPELLS = {
  Cantrips: [
    "Fire Bolt",
    "Mage Hand",
    "Minor Illusion",
    "Eldritch Blast",
    "Ray of Frost",
    "Sacred Flame",
  ],
  Level1: [
    "Magic Missile",
    "Cure Wounds",
    "Shield",
    "Burning Hands",
    "Sleep",
    "Detect Magic",
  ],
  Level2: ["Invisibility", "Mirror Image", "Hold Person", "Scorching Ray"],
  Level3: ["Fireball", "Lightning Bolt"],
  Level4: ["Dimension Door"],
  Level7: ["Teleport"],
  Level9: ["Wish"],
};

export const LANGUAGES = [
  "Common",
  "Dwarvish",
  "Elvish",
  "Giant",
  "Gnomish",
  "Goblin",
  "Halfling",
  "Orc",
  "Draconic",
  "Infernal",
  "Celestial",
  "Abyssal",
  "Sylvan",
  "Undercommon",
  "Primordial",
];

export const FEATS = [
  "Alert",
  "Athlete",
  "Actor",
  "Charger",
  "Crossbow Expert",
  "Defensive Duelist",
  "Dual Wielder",
  "Dungeon Delver",
  "Durable",
  "Elemental Adept",
  "Great Weapon Master",
  "Healer",
  "Heavy Armor Master",
  "Inspiring Leader",
  "Keen Mind",
  "Lucky",
  "Mage Slayer",
  "Magic Initiate",
  "Mobile",
  "Polearm Master",
  "Resilient",
  "Ritual Caster",
  "Savage Attacker",
  "Sentinel",
  "Sharpshooter",
  "Shield Master",
  "Skilled",
  "Skulker",
  "Tavern Brawler",
  "Tough",
  "War Caster",
];

export const FEATURES_TRAITS = [
  // Racial
  "Darkvision",
  "Fey Ancestry",
  "Brave",
  "Relentless Endurance",
  "Lucky",
  // Class
  "Rage",
  "Sneak Attack",
  "Divine Smite",
  "Spellcasting",
  "Action Surge",
  "Wild Shape",
];

export const PERSONALITY_SUGGESTIONS = {
  Traits: ["Brave", "Cowardly", "Curious", "Arrogant", "Kind", "Ruthless"],
  Quirks: [
    "Talks to animals",
    "Laughs at wrong moments",
    "Hoards items",
    "Afraid of silence",
  ],
  Fears: ["Darkness", "Fire", "Death", "Betrayal"],
  Goals: ["Power", "Wealth", "Revenge", "Knowledge", "Redemption"],
  Secrets: [
    "Hidden identity",
    "Past crime",
    "Forbidden magic",
    "Royal lineage",
  ],
};

export const BACKGROUND_TRAITS = {
  Ideals: ["Justice", "Power", "Freedom", "Knowledge", "Faith"],
  Bonds: ["Family", "Revenge", "Duty", "Lost love"],
  Flaws: ["Greed", "Pride", "Fearful", "Reckless"],
  Traits: ["Friendly", "Suspicious", "Loud", "Quiet", "Sarcastic"],
};

export const GLOBAL_COMBAT_ACTIONS: CombatAction[] = [
  { name: "Attack", type: "Action", description: "Perform a weapon or unarmed attack", source: "Global" },
  { name: "Cast Spell", type: "Action", description: "Cast an available spell", source: "Global" },
  { name: "Dash", type: "Action", description: "Gain extra movement this turn", source: "Global" },
  { name: "Dodge", type: "Action", description: "Focus fully on defense", source: "Global" },
  { name: "Hide", type: "Action", description: "Attempt to remain unseen", source: "Global" },
  { name: "Search", type: "Action", description: "Investigate surroundings", source: "Global" },
  { name: "Help", type: "Action", description: "Assist an ally", source: "Global" },
  { name: "Disengage", type: "Action", description: "Move without provoking attacks", source: "Global" },
  { name: "Use Object", type: "Action", description: "Interact with an item or object", source: "Global" },
  { name: "Off-Hand Attack", type: "Bonus Action", description: "Strike with secondary light weapon (requires dual wielding)", source: "Global" },
  { name: "Drink Potion", type: "Bonus Action", description: "Quickly consume a potion", source: "Global" },
  { name: "Combat Focus", type: "Bonus Action", description: "Enter a disciplined battle stance", source: "Global" },
];

export const RACE_COMBAT_ACTIONS: Record<string, CombatAction[]> = {
  Dragonborn: [
    { name: "Breath Weapon", type: "Action", description: "Exhale elemental energy", source: "Race" },
  ],
  Elf: [
    { name: "Silent Movement", type: "Bonus Action", description: "Move quietly and carefully", source: "Race" },
  ],
  Aasimar: [
    { name: "Healing Hands", type: "Action", description: "Touch a creature to restore hit points", source: "Race" },
  ],
};

export const CLASS_COMBAT_ACTIONS: Record<string, CombatAction[]> = {
  Barbarian: [
    { name: "Rage", type: "Bonus Action", description: "Enter a primal fury for increased damage and resistance", source: "Class" },
  ],
  Bard: [
    { name: "Bardic Inspiration", type: "Bonus Action", description: "Inspire an ally with a 1d6 bonus to a roll", source: "Class" },
  ],
  Cleric: [
    { name: "Healing Word", type: "Bonus Action", description: "Heal a creature within range (Spell dependent)", source: "Class" },
  ],
  Fighter: [
    { name: "Second Wind", type: "Bonus Action", description: "Recover 1d10 + level hit points", source: "Class" },
  ],
  Monk: [
    { name: "Martial Arts", type: "Bonus Action", description: "Make one unarmed strike after an attack", source: "Class" },
  ],
  Ranger: [
    { name: "Hunter's Mark", type: "Bonus Action", description: "Deal extra damage to a marked target (Spell dependent)", source: "Class" },
  ],
  Rogue: [
    { name: "Sneak Attack", type: "Action", description: "Deal extra 1d6 damage on a precise strike (Passive condition)", source: "Class" },
  ],
  Warlock: [
    { name: "Hex", type: "Bonus Action", description: "Curse a target for extra necrotic damage (Spell dependent)", source: "Class" },
  ],
};
