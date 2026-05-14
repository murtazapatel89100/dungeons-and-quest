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

export const CLASSES_AND_SUBCLASSES = {
  Barbarian: ["Berserker", "Totem Warrior"],
  Bard: ["Lore", "Valor"],
  Cleric: [
    "Knowledge",
    "Life",
    "Light",
    "Nature",
    "Tempest",
    "Trickery",
    "War",
  ],
  Druid: ["Land", "Moon"],
  Fighter: ["Champion", "Battle Master", "Eldritch Knight"],
  Monk: ["Open Hand", "Shadow", "Four Elements"],
  Paladin: ["Devotion", "Ancients", "Vengeance"],
  Ranger: ["Hunter", "Beast Master"],
  Rogue: ["Thief", "Assassin", "Arcane Trickster"],
  Sorcerer: ["Draconic", "Wild Magic"],
  Warlock: ["Archfey", "Fiend", "Great Old One"],
  Wizard: [
    "Abjuration",
    "Conjuration",
    "Divination",
    "Enchantment",
    "Evocation",
    "Illusion",
    "Necromancy",
    "Transmutation",
  ],
};

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
  { name: "Cast Spell", type: "Action", description: "Cast a standard spell", source: "Global" },
  { name: "Dash", type: "Action", description: "Gain extra movement this turn", source: "Global" },
  { name: "Dodge", type: "Action", description: "Focus entirely on defense", source: "Global" },
  { name: "Hide", type: "Action", description: "Attempt to remain unseen", source: "Global" },
  { name: "Search", type: "Action", description: "Investigate surroundings", source: "Global" },
  { name: "Help", type: "Action", description: "Assist an ally", source: "Global" },
  { name: "Disengage", type: "Action", description: "Move without provoking attacks", source: "Global" },
  { name: "Ready Action", type: "Action", description: "Prepare an action for later", source: "Global" },
  { name: "Use Object", type: "Action", description: "Interact with an item or object", source: "Global" },
  { name: "Off-Hand Attack", type: "Bonus Action", description: "Strike using secondary weapon", source: "Global" },
  { name: "Drink Potion", type: "Bonus Action", description: "Quickly consume a potion", source: "Global" },
  { name: "Rally Ally", type: "Bonus Action", description: "Encourage nearby teammate", source: "Global" },
  { name: "Combat Focus", type: "Bonus Action", description: "Enter tactical combat stance", source: "Global" },
  { name: "Spell Focus", type: "Bonus Action", description: "Enhance magical concentration", source: "Global" },
];

export const RACE_COMBAT_ACTIONS: Record<string, CombatAction[]> = {
  Human: [
    { name: "Adaptive Training", type: "Action", description: "Temporarily focus on a skill", source: "Race: Human" },
    { name: "Quick Recovery", type: "Bonus Action", description: "Regain minor stamina", source: "Race: Human" },
  ],
  Elf: [
    { name: "Keen Observation", type: "Action", description: "Sharpen senses temporarily", source: "Race: Elf" },
    { name: "Silent Movement", type: "Bonus Action", description: "Move quietly and gracefully", source: "Race: Elf" },
  ],
  "High Elf": [
    { name: "Arcane Spark", type: "Action", description: "Cast minor magical effect", source: "Subrace: High Elf" },
  ],
  "Wood Elf": [
    { name: "Forest Stride", type: "Bonus Action", description: "Move swiftly through terrain", source: "Subrace: Wood Elf" },
  ],
  Drow: [
    { name: "Darkness Invocation", type: "Action", description: "Summon magical darkness", source: "Subrace: Drow" },
    { name: "Shadow Veil", type: "Bonus Action", description: "Blend into shadows", source: "Subrace: Drow" },
  ],
  Dwarf: [
    { name: "Stone Endurance", type: "Action", description: "Resist incoming damage", source: "Race: Dwarf" },
    { name: "Battle Resilience", type: "Bonus Action", description: "Strengthen defensive stance", source: "Race: Dwarf" },
  ],
  "Hill Dwarf": [
    { name: "Durable Recovery", type: "Bonus Action", description: "Recover endurance gradually", source: "Subrace: Hill Dwarf" },
  ],
  "Mountain Dwarf": [
    { name: "Heavy Strike", type: "Action", description: "Deliver powerful melee attack", source: "Subrace: Mountain Dwarf" },
  ],
  Halfling: [
    { name: "Lucky Escape", type: "Action", description: "Avoid dangerous situation", source: "Race: Halfling" },
    { name: "Nimble Reposition", type: "Bonus Action", description: "Quickly reposition in combat", source: "Race: Halfling" },
  ],
  "Lightfoot Halfling": [
    { name: "Natural Sneak", type: "Bonus Action", description: "Hide behind allies or objects", source: "Subrace: Lightfoot Halfling" },
  ],
  "Stout Halfling": [
    { name: "Poison Resistance", type: "Bonus Action", description: "Resist harmful toxins", source: "Subrace: Stout Halfling" },
  ],
  Dragonborn: [
    { name: "Breath Weapon", type: "Action", description: "Exhale elemental energy", source: "Race: Dragonborn" },
  ],
  Gnome: [
    { name: "Arcane Tinker", type: "Action", description: "Imbue object with magic", source: "Race: Gnome" },
    { name: "Illusion Trick", type: "Bonus Action", description: "Create minor illusion", source: "Race: Gnome" },
  ],
  "Forest Gnome": [
    { name: "Beast Whisper", type: "Bonus Action", description: "Communicate with small creatures", source: "Subrace: Forest Gnome" },
  ],
  "Rock Gnome": [
    { name: "Mechanical Insight", type: "Action", description: "Analyze mechanisms quickly", source: "Subrace: Rock Gnome" },
  ],
  Aasimar: [
    { name: "Celestial Burst", type: "Action", description: "Release divine energy", source: "Race: Aasimar" },
    { name: "Divine Glow", type: "Bonus Action", description: "Illuminate holy aura", source: "Race: Aasimar" },
  ],
  "Protector Aasimar": [
    { name: "Radiant Wings", type: "Bonus Action", description: "Manifest celestial energy", source: "Subrace: Protector Aasimar" },
  ],
  "Scourge Aasimar": [
    { name: "Burning Radiance", type: "Action", description: "Emit destructive holy power", source: "Subrace: Scourge Aasimar" },
  ],
  "Fallen Aasimar": [
    { name: "Dread Presence", type: "Bonus Action", description: "Instill fear nearby", source: "Subrace: Fallen Aasimar" },
  ],
  Genasi: [
    { name: "Elemental Channel", type: "Action", description: "Manipulate elemental force", source: "Race: Genasi" },
  ],
  "Air Genasi": [
    { name: "Wind Step", type: "Bonus Action", description: "Move with air currents", source: "Subrace: Air Genasi" },
  ],
  "Earth Genasi": [
    { name: "Stone Skin", type: "Bonus Action", description: "Harden body defensively", source: "Subrace: Earth Genasi" },
  ],
  "Fire Genasi": [
    { name: "Flame Burst", type: "Action", description: "Ignite nearby enemies", source: "Subrace: Fire Genasi" },
  ],
  "Water Genasi": [
    { name: "Tidal Flow", type: "Bonus Action", description: "Move fluidly through combat", source: "Subrace: Water Genasi" },
  ],
  "Half-Elf": [
    { name: "Social Grace", type: "Bonus Action", description: "Gain advantage in dialogue", source: "Race: Half-Elf" },
    { name: "Versatile Training", type: "Action", description: "Adapt to new skill quickly", source: "Race: Half-Elf" },
  ],
  "Half-Orc": [
    { name: "Savage Strike", type: "Action", description: "Deliver brutal melee attack", source: "Race: Half-Orc" },
    { name: "Relentless Fury", type: "Bonus Action", description: "Push through pain", source: "Race: Half-Orc" },
  ],
  Tiefling: [
    { name: "Infernal Invocation", type: "Action", description: "Channel infernal magic", source: "Race: Tiefling" },
    { name: "Hellfire Focus", type: "Bonus Action", description: "Empower magical attacks", source: "Race: Tiefling" },
  ],
  Goliath: [
    { name: "Giant Strength", type: "Action", description: "Perform immense physical feat", source: "Race: Goliath" },
    { name: "Stone Balance", type: "Bonus Action", description: "Stabilize body and stance", source: "Race: Goliath" },
  ],
  Firbolg: [
    { name: "Hidden Step", type: "Bonus Action", description: "Briefly become unseen", source: "Race: Firbolg" },
    { name: "Nature Speech", type: "Action", description: "Connect with beasts and plants", source: "Race: Firbolg" },
  ],
  Tabaxi: [
    { name: "Claw Strike", type: "Action", description: "Attack with sharp claws", source: "Race: Tabaxi" },
    { name: "Feline Agility", type: "Bonus Action", description: "Burst into rapid movement", source: "Race: Tabaxi" },
  ],
  Kenku: [
    { name: "Mimicry", type: "Action", description: "Copy sounds and voices", source: "Race: Kenku" },
    { name: "Distracting Echo", type: "Bonus Action", description: "Confuse nearby enemies", source: "Race: Kenku" },
  ],
  Lizardfolk: [
    { name: "Bite Attack", type: "Action", description: "Attack with natural jaws", source: "Race: Lizardfolk" },
    { name: "Survival Instinct", type: "Bonus Action", description: "Heighten primal awareness", source: "Race: Lizardfolk" },
  ],
  Triton: [
    { name: "Water Surge", type: "Action", description: "Manipulate surrounding water", source: "Race: Triton" },
    { name: "Oceanic Grace", type: "Bonus Action", description: "Move gracefully in combat", source: "Race: Triton" },
  ],
  "Yuan-ti Pureblood": [
    { name: "Serpent Charm", type: "Action", description: "Influence weaker minds", source: "Race: Yuan-ti Pureblood" },
    { name: "Venom Focus", type: "Bonus Action", description: "Enhance toxic attacks", source: "Race: Yuan-ti Pureblood" },
  ],
  Goblin: [
    { name: "Dirty Strike", type: "Action", description: "Use underhanded combat trick", source: "Race: Goblin" },
    { name: "Nimble Escape", type: "Bonus Action", description: "Quickly retreat or hide", source: "Race: Goblin" },
  ],
  Hobgoblin: [
    { name: "Tactical Assault", type: "Action", description: "Coordinate precise attack", source: "Race: Hobgoblin" },
    { name: "Martial Discipline", type: "Bonus Action", description: "Improve combat focus", source: "Race: Hobgoblin" },
  ],
  Bugbear: [
    { name: "Long Reach Strike", type: "Action", description: "Attack from extended distance", source: "Race: Bugbear" },
    { name: "Ambush Momentum", type: "Bonus Action", description: "Gain advantage after surprise", source: "Race: Bugbear" },
  ],
  Orc: [
    { name: "Brutal Charge", type: "Action", description: "Rush enemy aggressively", source: "Race: Orc" },
    { name: "Aggressive Rush", type: "Bonus Action", description: "Close distance rapidly", source: "Race: Orc" },
  ],
  Kobold: [
    { name: "Trap Toss", type: "Action", description: "Deploy simple trap", source: "Race: Kobold" },
    { name: "Cowardly Dodge", type: "Bonus Action", description: "Avoid immediate danger", source: "Race: Kobold" },
  ],
};

export const CLASS_COMBAT_ACTIONS: Record<string, CombatAction[]> = {
  Barbarian: [
    { name: "Reckless Attack", type: "Action", description: "Attack aggressively", source: "Class: Barbarian" },
    { name: "Rage", type: "Bonus Action", description: "Enter primal fury", source: "Class: Barbarian" },
  ],
  Bard: [
    { name: "Inspiring Performance", type: "Action", description: "Encourage allies", source: "Class: Bard" },
    { name: "Bardic Inspiration", type: "Bonus Action", description: "Boost ally capabilities", source: "Class: Bard" },
  ],
  Cleric: [
    { name: "Divine Channel", type: "Action", description: "Invoke divine power", source: "Class: Cleric" },
    { name: "Healing Prayer", type: "Bonus Action", description: "Restore minor health", source: "Class: Cleric" },
  ],
  Druid: [
    { name: "Wild Shape", type: "Action", description: "Transform into beast", source: "Class: Druid" },
    { name: "Spirit Bloom", type: "Bonus Action", description: "Channel nature energy", source: "Class: Druid" },
  ],
  Fighter: [
    { name: "Action Surge", type: "Action", description: "Gain additional combat action", source: "Class: Fighter" },
    { name: "Second Wind", type: "Bonus Action", description: "Recover stamina quickly", source: "Class: Fighter" },
  ],
  Monk: [
    { name: "Flurry Strike", type: "Action", description: "Perform rapid attacks", source: "Class: Monk" },
    { name: "Martial Arts", type: "Bonus Action", description: "Follow up with swift strike", source: "Class: Monk" },
  ],
  Paladin: [
    { name: "Divine Smite", type: "Action", description: "Infuse attack with holy power", source: "Class: Paladin" },
    { name: "Sacred Oath", type: "Bonus Action", description: "Reinforce divine conviction", source: "Class: Paladin" },
  ],
  Ranger: [
    { name: "Hunter's Mark", type: "Action", description: "Mark dangerous prey", source: "Class: Ranger" },
    { name: "Tracking Stance", type: "Bonus Action", description: "Heighten tracking instincts", source: "Class: Ranger" },
  ],
  Rogue: [
    { name: "Sneak Attack", type: "Action", description: "Strike vulnerable target", source: "Class: Rogue" },
    { name: "Cunning Action", type: "Bonus Action", description: "Move or hide efficiently", source: "Class: Rogue" },
  ],
  Sorcerer: [
    { name: "Arcane Burst", type: "Action", description: "Release magical energy", source: "Class: Sorcerer" },
    { name: "Metamagic Focus", type: "Bonus Action", description: "Modify spellcasting behavior", source: "Class: Sorcerer" },
  ],
  Warlock: [
    { name: "Eldritch Blast", type: "Action", description: "Fire eldritch energy", source: "Class: Warlock" },
    { name: "Hex", type: "Bonus Action", description: "Curse enemy target", source: "Class: Warlock" },
  ],
  Wizard: [
    { name: "Arcane Cast", type: "Action", description: "Cast prepared spell", source: "Class: Wizard" },
    { name: "Spell Focus", type: "Bonus Action", description: "Strengthen magical precision", source: "Class: Wizard" },
  ],
};
