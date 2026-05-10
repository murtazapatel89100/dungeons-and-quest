export interface Condition {
  id: string;
  name: string;
  description: string;
  effects: string[];
  icon: string;
  color: string;
}

export interface RuleSection {
  title: string;
  description: string;
  items: { name: string; desc: string; detail?: string }[];
}

export const rulesData = {
  conditions: [
    {
      id: "blinded",
      name: "Blinded",
      description: "A blinded creature can't see and automatically fails any ability check that requires sight.",
      effects: [
        "Attack rolls against the creature have advantage.",
        "The creature's attack rolls have disadvantage."
      ],
      icon: "EyeOff",
      color: "border-slate-500"
    },
    {
      id: "charmed",
      name: "Charmed",
      description: "A charmed creature can't attack the charmer or target the charmer with harmful abilities or magical effects.",
      effects: [
        "The charmer has advantage on any ability check to interact socially with the creature."
      ],
      icon: "HeartHandshake",
      color: "border-pink-500"
    },
    {
      id: "frightened",
      name: "Frightened",
      description: "A frightened creature has disadvantage on ability checks and attack rolls while the source of its fear is within line of sight.",
      effects: [
        "The creature can't willingly move closer to the source of its fear."
      ],
      icon: "Ghost",
      color: "border-purple-500"
    },
    {
      id: "grappled",
      name: "Grappled",
      description: "A grappled creature's speed becomes 0, and it can't benefit from any bonus to its speed.",
      effects: [
        "The condition ends if the grappler is incapacitated.",
        "The condition ends if an effect removes the grappled creature from the reach of the grappler."
      ],
      icon: "Link",
      color: "border-orange-500"
    },
    {
      id: "paralyzed",
      name: "Paralyzed",
      description: "A paralyzed creature is incapacitated and can't move or speak.",
      effects: [
        "The creature automatically fails Strength and Dexterity saving throws.",
        "Attack rolls against the creature have advantage.",
        "Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."
      ],
      icon: "Zap",
      color: "border-yellow-500"
    },
    {
      id: "poisoned",
      name: "Poisoned",
      description: "A poisoned creature has disadvantage on attack rolls and ability checks.",
      effects: [
        "Often accompanied by taking poison damage at the start or end of a turn."
      ],
      icon: "Skull",
      color: "border-green-500"
    },
    {
      id: "prone",
      name: "Prone",
      description: "A prone creature's only movement option is to crawl, unless it stands up and thereby ends the condition.",
      effects: [
        "The creature has disadvantage on attack rolls.",
        "An attack roll against the creature has advantage if the attacker is within 5 feet. Otherwise, the attack roll has disadvantage."
      ],
      icon: "ArrowDownToLine",
      color: "border-red-500"
    },
    {
      id: "restrained",
      name: "Restrained",
      description: "A restrained creature's speed becomes 0, and it can't benefit from any bonus to its speed.",
      effects: [
        "Attack rolls against the creature have advantage.",
        "The creature's attack rolls have disadvantage.",
        "The creature has disadvantage on Dexterity saving throws."
      ],
      icon: "Lock",
      color: "border-amber-700"
    }
  ] as Condition[],

  mechanics: {
    advantage: {
      title: "Advantage & Disadvantage",
      description: "Sometimes a special ability or spell tells you that you have advantage or disadvantage on an ability check, a saving throw, or an attack roll.",
      rules: [
        "When you have either, you roll a second d20 when you make the roll.",
        "Use the higher of the two rolls if you have advantage.",
        "Use the lower roll if you have disadvantage.",
        "If multiple situations affect a roll and each grants advantage or imposes disadvantage on it, you don't roll more than one additional d20. If circumstances cause a roll to have both advantage and disadvantage, you are considered to have neither of them."
      ]
    },
    dc: {
      title: "Difficulty Class (DC)",
      description: "For every ability check, the DM decides which of the six abilities is relevant to the task at hand and the difficulty of the task, represented by a Difficulty Class.",
      table: [
        { difficulty: "Very easy", dc: 5 },
        { difficulty: "Easy", dc: 10 },
        { difficulty: "Medium", dc: 15 },
        { difficulty: "Hard", dc: 20 },
        { difficulty: "Very hard", dc: 25 },
        { difficulty: "Nearly impossible", dc: 30 }
      ]
    }
  },

  combat: [
    {
      title: "Cover",
      description: "Walls, trees, creatures, and other obstacles can provide cover during combat, making it more difficult to harm a target.",
      items: [
        { name: "Half Cover", desc: "+2 bonus to AC and Dexterity saving throws.", detail: "A target has half cover if an obstacle blocks at least half of its body. Examples: a low wall, a large piece of furniture, a narrow tree trunk." },
        { name: "Three-Quarters Cover", desc: "+5 bonus to AC and Dexterity saving throws.", detail: "A target has three-quarters cover if about three-quarters of it is covered by an obstacle. Examples: a portcullis, an arrow slit." },
        { name: "Total Cover", desc: "Can't be targeted directly by an attack or a spell.", detail: "A target has total cover if it is completely concealed by an obstacle." }
      ]
    },
    {
      title: "Damage Types",
      description: "Different attacks, damaging spells, and other harmful effects deal different types of damage. Damage types have no rules of their own, but other rules, such as damage resistance, rely on the types.",
      items: [
        { name: "Physical", desc: "Bludgeoning, Piercing, and Slashing." },
        { name: "Elemental", desc: "Acid, Cold, Fire, Lightning, and Thunder." },
        { name: "Arcane/Divine", desc: "Force, Necrotic, Poison, Psychic, and Radiant." }
      ]
    },
    {
      title: "Death Saving Throws",
      description: "Whenever you start your turn with 0 hit points, you must make a special saving throw to determine whether you creep closer to death or hang onto life.",
      items: [
        { name: "Roll a d20", desc: "If the roll is 10 or higher, you succeed. Otherwise, you fail. A success or failure has no effect by itself." },
        { name: "Three Strikes", desc: "On your third success, you become stable. On your third failure, you die." },
        { name: "Rolling 1 or 20", desc: "When you make a death saving throw and roll a 1 on the d20, it counts as two failures. If you roll a 20, you regain 1 hit point." }
      ]
    }
  ] as RuleSection[],

  environment: {
    resting: {
      title: "Resting",
      description: "Heroic though they might be, adventurers can't spend every hour of the day in the thick of exploration, social interaction, and combat.",
      types: [
        {
          name: "Short Rest",
          duration: "At least 1 hour",
          benefits: "A character can spend one or more Hit Dice to regain hit points. Some class features (like Warlock spell slots or Fighter Action Surge) are also regained."
        },
        {
          name: "Long Rest",
          duration: "At least 8 hours",
          benefits: "A character regains all lost hit points and regains spent Hit Dice, up to a number of dice equal to half of the character's total number of them. Also restores all spell slots and long-rest abilities."
        }
      ]
    },
    vision: {
      title: "Vision and Light",
      description: "The most fundamental tasks of adventuring—noticing danger, finding hidden objects, hitting an enemy in combat—rely heavily on a character's ability to see.",
      categories: [
        { name: "Lightly Obscured", desc: "Creatures have disadvantage on Wisdom (Perception) checks that rely on sight. Examples: dim light, patchy fog, moderate foliage." },
        { name: "Heavily Obscured", desc: "A creature suffers from the blinded condition. Examples: darkness, opaque fog, dense foliage." },
        { name: "Darkvision", desc: "Many creatures have Darkvision, allowing them to see in dim light within a specified radius as if it were bright light, and in darkness as if it were dim light (can't discern color in darkness)." }
      ]
    },
    hazards: {
      title: "Common Hazards",
      description: "Adventurers face dangers far beyond monsters. The environment itself can be deadly.",
      types: [
        { name: "Falling", desc: "A creature takes 1d6 bludgeoning damage for every 10 feet it falls, to a maximum of 20d6. The creature lands prone, unless it avoids taking damage." },
        { name: "Suffocating", desc: "A creature can hold its breath for a number of minutes equal to 1 + its Constitution modifier (minimum of 30 seconds). When a creature runs out of breath, it can survive for a number of rounds equal to its Constitution modifier before it drops to 0 HP and is dying." }
      ]
    }
  }
};
