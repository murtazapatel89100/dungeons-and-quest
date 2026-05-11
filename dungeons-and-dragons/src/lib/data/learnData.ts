export interface Race {
  name: string;
  tagline: string;
  description: string;
  traits: string[];
  flavor: string;
  icon: string; // lucide icon name or image path
}

export interface Class {
  name: string;
  tagline: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  playstyle: string;
  strengths: string[];
  weaknesses: string[];
  icon: string;
}

export interface Spell {
  name: string;
  level: string; // Cantrip, 1st Level, etc.
  school: string;
  castingTime: string;
  duration: string;
  description: string;
  visualIcon: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: "Mechanic" | "Roleplay" | "World" | "Combat";
}

export interface AdventureNode {
  id: string;
  text: string;
  choices: { text: string; nextId: string; statCheck?: string }[];
}

export const learnData = {
  races: [
    {
      name: "Human",
      tagline: "Versatile and ambitious.",
      description:
        "Found everywhere in the multiverse, humans are the most adaptable and ambitious people among the common races.",
      traits: [
        "+1 to all Ability Scores",
        "Extra Language",
        "Varied Alignments",
      ],
      flavor: '"I\'ll see this through, even if it takes a lifetime."',
      icon: "User",
    },
    {
      name: "Elf",
      tagline: "Graceful and long-lived.",
      description:
        "Elves are a magical people of otherworldly grace, living in the world but not entirely part of it.",
      traits: ["Darkvision", "Keen Senses", "Fey Ancestry", "Trance"],
      flavor: '"Time is a river. We simply swim in it longer than others."',
      icon: "Leaf",
    },
    {
      name: "Dwarf",
      tagline: "Stout and enduring.",
      description:
        "Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal.",
      traits: [
        "Darkvision",
        "Dwarven Resilience",
        "Combat Training",
        "Stonecunning",
      ],
      flavor: '"The mountain endures, and so do we."',
      icon: "Mountain",
    },
    {
      name: "Tiefling",
      tagline: "Marked by fiendish heritage.",
      description:
        "To be greeted with stares and whispers, to suffer violence and insult on the street—such is the lot of the tiefling.",
      traits: ["Darkvision", "Hellish Resistance", "Infernal Legacy"],
      flavor: '"My blood is a curse to some, but a weapon to me."',
      icon: "Flame",
    },
    {
      name: "Dragonborn",
      tagline: "Proud draconic kin.",
      description:
        "Born of dragons, as their name proclaims, the dragonborn walk proudly through a world that greets them with fearful incomprehension.",
      traits: ["Draconic Ancestry", "Breath Weapon", "Damage Resistance"],
      flavor: '"The fire inside burns brighter than the fire around me."',
      icon: "ShieldAlert",
    },
  ] as Race[],

  classes: [
    {
      name: "Fighter",
      tagline: "Master of martial combat.",
      description:
        "A master of martial combat, skilled with a variety of weapons and armor.",
      difficulty: "Beginner",
      playstyle: "Frontline Melee / Ranged Striker",
      strengths: ["High HP", "Action Surge", "Versatile Weapons"],
      weaknesses: ["Limited Magic", "Vulnerable to Saving Throws"],
      icon: "Sword",
    },
    {
      name: "Wizard",
      tagline: "Scholarly magic user.",
      description:
        "A scholarly magic-user capable of manipulating the structures of reality.",
      difficulty: "Advanced",
      playstyle: "Utility / Area Damage / Controller",
      strengths: ["Huge Spell List", "High Damage", "Utility Magic"],
      weaknesses: ["Very Low HP", "Requires Preparation", "Squishy"],
      icon: "BookOpen",
    },
    {
      name: "Rogue",
      tagline: "Stealthy opportunist.",
      description:
        "A scoundrel who uses stealth and trickery to overcome obstacles and enemies.",
      difficulty: "Intermediate",
      playstyle: "Burst Damage / Skill Monkey",
      strengths: ["Sneak Attack", "Many Skills", "Evasion"],
      weaknesses: ["Low Sustained Damage", "Relies on Positioning"],
      icon: "Dagger", // We'll map this to a Lucide icon
    },
    {
      name: "Cleric",
      tagline: "Divine champion.",
      description:
        "A priestly champion who wields divine magic in service of a higher power.",
      difficulty: "Beginner",
      playstyle: "Support / Healer / Frontline Hybrid",
      strengths: ["Excellent Healing", "Heavy Armor Access", "Buffs"],
      weaknesses: ["Dependent on Deity", "Slower Movement"],
      icon: "Cross", // We'll map this
    },
    {
      name: "Bard",
      tagline: "Inspiring performer.",
      description:
        "An inspiring magician whose power echoes the music of creation.",
      difficulty: "Intermediate",
      playstyle: "Support / Face / Jack of All Trades",
      strengths: [
        "Bardic Inspiration",
        "Excellent Social Skills",
        "Versatile Magic",
      ],
      weaknesses: ["Jack of All Trades, Master of None", "Requires Creativity"],
      icon: "Music",
    },
  ] as Class[],

  spells: [
    {
      name: "Fireball",
      level: "3rd Level",
      school: "Evocation",
      castingTime: "1 Action",
      duration: "Instantaneous",
      description:
        "A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame. Each creature in a 20-foot-radius sphere centered on that point must make a Dexterity saving throw. A target takes 8d6 fire damage on a failed save, or half as much damage on a successful one.",
      visualIcon: "Flame",
    },
    {
      name: "Mage Hand",
      level: "Cantrip",
      school: "Conjuration",
      castingTime: "1 Action",
      duration: "1 Minute",
      description:
        "A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration or until you dismiss it as an action. The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again. You can use your action to control the hand.",
      visualIcon: "Hand",
    },
    {
      name: "Cure Wounds",
      level: "1st Level",
      school: "Evocation",
      castingTime: "1 Action",
      duration: "Instantaneous",
      description:
        "A creature you touch regains a number of hit points equal to 1d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs.",
      visualIcon: "Heart",
    },
    {
      name: "Shield",
      level: "1st Level",
      school: "Abjuration",
      castingTime: "1 Reaction",
      duration: "1 Round",
      description:
        "An invisible barrier of magical force appears and protects you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack, and you take no damage from magic missile.",
      visualIcon: "Shield",
    },
  ] as Spell[],

  glossary: [
    {
      term: "AC (Armor Class)",
      definition:
        "A number representing how hard a character is to hit in combat. An attack roll must equal or exceed this number to deal damage.",
      category: "Mechanic",
    },
    {
      term: "Advantage",
      definition:
        "Roll two d20s and use the higher result. Granted by favorable circumstances.",
      category: "Mechanic",
    },
    {
      term: "Disadvantage",
      definition:
        "Roll two d20s and use the lower result. Caused by unfavorable circumstances.",
      category: "Mechanic",
    },
    {
      term: "Campaign",
      definition:
        "A series of interconnected adventures forming a continuous storyline, often lasting months or years.",
      category: "World",
    },
    {
      term: "Cantrip",
      definition:
        "A simple, well-practiced spell that can be cast at will, without using a spell slot.",
      category: "Mechanic",
    },
    {
      term: "Check (Ability Check)",
      definition:
        "Rolling a d20 and adding a relevant modifier to determine the success or failure of an attempted action.",
      category: "Mechanic",
    },
    {
      term: "DM (Dungeon Master)",
      definition:
        "The player who creates the world, narrates the story, and plays all the monsters and non-player characters.",
      category: "Roleplay",
    },
    {
      term: "HP (Hit Points)",
      definition:
        "A measure of a character's physical and mental resilience. When HP reaches 0, the character falls unconscious.",
      category: "Combat",
    },
    {
      term: "Initiative",
      definition:
        "A Dexterity check rolled at the start of combat to determine the order of turns.",
      category: "Combat",
    },
    {
      term: "NPC (Non-Player Character)",
      definition:
        "Any character in the game world controlled by the Dungeon Master rather than a player.",
      category: "World",
    },
    {
      term: "Saving Throw",
      definition:
        "A d20 roll made to resist a spell, trap, poison, or other harmful effect.",
      category: "Mechanic",
    },
    {
      term: "Spell Slot",
      definition:
        "The magical energy required to cast spells of 1st level and higher. Characters have a limited number that replenish upon resting.",
      category: "Mechanic",
    },
  ] as GlossaryTerm[],

  adventureFlow: {
    start: {
      id: "start",
      text: "You stand before the gaping maw of the Whispering Cave. The air smells damp, and a faint, unnatural green glow pulses from deep within. A battered wooden sign reads: 'Danger - Goblins.'",
      choices: [
        { text: "Draw your weapon and charge in loudly.", nextId: "charge" },
        { text: "Light a torch and proceed cautiously.", nextId: "cautious" },
        {
          text: "Attempt to sneak in using the shadows.",
          nextId: "sneak",
          statCheck: "Dexterity (Stealth)",
        },
      ],
    },
    charge: {
      id: "charge",
      text: "You rush in, your boots echoing off the stone walls. Your battle cry surprises a group of three goblins playing dice. They scramble for their crude rusty swords!",
      choices: [
        {
          text: "Swing your weapon at the nearest goblin.",
          nextId: "combat_win",
          statCheck: "Strength (Attack)",
        },
        {
          text: "Intimidate them into surrendering.",
          nextId: "intimidate",
          statCheck: "Charisma (Intimidation)",
        },
      ],
    },
    cautious: {
      id: "cautious",
      text: "The torchlight reveals jagged stalactites. Suddenly, the light reflects off a pair of yellow eyes. A goblin archer has spotted you and knocks an arrow!",
      choices: [
        {
          text: "Dive behind a stalagmite for cover.",
          nextId: "cover",
          statCheck: "Dexterity (Acrobatics)",
        },
        { text: "Cast a Fireball (if you're a Wizard).", nextId: "magic_win" },
      ],
    },
    sneak: {
      id: "sneak",
      text: "You melt into the shadows, stepping silently over loose rocks. You manage to bypass the goblin lookouts and find a glowing chest in a side cavern.",
      choices: [
        {
          text: "Carefully inspect the chest for traps.",
          nextId: "chest_investigate",
          statCheck: "Intelligence (Investigation)",
        },
        {
          text: "Pry it open immediately with a crowbar.",
          nextId: "chest_trap",
        },
      ],
    },
    combat_win: {
      id: "combat_win",
      text: "Your strike is true! (CRITICAL HIT). The goblin drops its weapon in fear, and the others flee deeper into the cave. You survive your first encounter.",
      choices: [{ text: "Play Again", nextId: "start" }],
    },
    intimidate: {
      id: "intimidate",
      text: "You bellow a terrifying roar. The goblins, cowardly by nature, shriek and scatter, leaving behind a small pouch of gold pieces.",
      choices: [{ text: "Play Again", nextId: "start" }],
    },
    cover: {
      id: "cover",
      text: "You hit the dirt just as an arrow ricochets off the stone where your head was. You are safe, but now you must prepare for a fight.",
      choices: [{ text: "Play Again", nextId: "start" }],
    },
    magic_win: {
      id: "magic_win",
      text: "You chant an arcane incantation. A bead of fire shoots from your fingertip and erupts in the cave. The goblins are incinerated instantly.",
      choices: [{ text: "Play Again", nextId: "start" }],
    },
    chest_investigate: {
      id: "chest_investigate",
      text: "You notice a thin wire connected to the latch. A poison dart trap! You carefully disarm it and claim the magical glowing shortsword inside.",
      choices: [{ text: "Play Again", nextId: "start" }],
    },
    chest_trap: {
      id: "chest_trap",
      text: "As you pry the lid open, a hidden mechanism clicks. A poison dart shoots into your shoulder. You take 1d4 poison damage, but you get the loot!",
      choices: [{ text: "Play Again", nextId: "start" }],
    },
  } as Record<string, AdventureNode>,
};
