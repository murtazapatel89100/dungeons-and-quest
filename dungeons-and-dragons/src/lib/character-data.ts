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
];

export const GEAR = ["Rope", "Torch", "Rations", "Waterskin", "Bedroll"];

export const TOOLS = [
	"Thieves' Tools",
	"Disguise Kit",
	"Forgery Kit",
	"Herbalism Kit",
	"Alchemist Supplies",
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
