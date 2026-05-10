export const toolsData = {
  names: {
    tavern: {
      adjectives: ["Prancing", "Rusty", "Golden", "Laughing", "Broken", "Silver", "Crimson", "Wandering", "Sleepy", "Black", "White", "Blind", "Drunken", "Singing", "Howling", "Salty"],
      nouns: ["Pony", "Dragon", "Shield", "Boar", "Crown", "Lion", "Goblin", "Griffin", "Mermaid", "Swan", "Raven", "Toad", "Unicorn", "Wolf", "Hound", "Sailor"]
    },
    npc: {
      first: ["Aelar", "Bram", "Caelen", "Darik", "Elora", "Faelen", "Gareth", "Halia", "Iliyar", "Jorin", "Kael", "Lyra", "Mael", "Nia", "Orik", "Pyra", "Quin", "Rael", "Sila", "Tarik", "Uriel", "Vex", "Wren", "Xylia", "Yara", "Zane"],
      last: ["Stormrider", "Ironfist", "Swiftbrook", "Shadowcloak", "Lightbringer", "Silverleaf", "Fireforge", "Nightbreeze", "Stonebreaker", "Winterchill", "Dawncaller"]
    },
    town: {
      prefixes: ["Oak", "River", "Stone", "Iron", "Gold", "Silver", "Shadow", "Winter", "Summer", "Spring", "Fall", "High", "Low", "Deep", "Dark", "Light"],
      suffixes: ["wood", "ford", "bridge", "guard", "keep", "watch", "haven", "hollow", "peak", "valley", "lake", "run", "brook", "stone", "gate", "port"]
    }
  },

  loot: {
    common: [
      { name: "Healing Potion", desc: "Regain 2d4+2 HP.", type: "Consumable" },
      { name: "50 ft. Hempen Rope", desc: "Standard adventuring gear.", type: "Gear" },
      { name: "10 Gold Pieces", desc: "A handful of standard currency.", type: "Wealth" },
      { name: "Dagger", desc: "A simple melee weapon. 1d4 piercing.", type: "Weapon" },
      { name: "Lantern & Oil", desc: "Provides bright light for 30ft.", type: "Gear" }
    ],
    uncommon: [
      { name: "Bag of Holding", desc: "An extra-dimensional space inside a bag.", type: "Wondrous Item" },
      { name: "Goggles of Night", desc: "Grants 60ft of Darkvision.", type: "Wondrous Item" },
      { name: "Potion of Invisibility", desc: "Become invisible for 1 hour.", type: "Consumable" },
      { name: "Pearl (100gp)", desc: "A valuable gemstone.", type: "Wealth" },
      { name: "+1 Longsword", desc: "Magical weapon. +1 to attack and damage.", type: "Weapon" }
    ],
    rare: [
      { name: "Ring of Protection", desc: "+1 to AC and Saving Throws.", type: "Ring" },
      { name: "Wand of Fireballs", desc: "Cast Fireball up to 7 times.", type: "Wand" },
      { name: "Cloak of Displacement", desc: "Attacks against you have disadvantage.", type: "Wondrous Item" },
      { name: "Sapphire (1000gp)", desc: "A pristine, sparkling gem.", type: "Wealth" },
      { name: "+2 Battleaxe", desc: "Magical weapon. +2 to attack and damage.", type: "Weapon" }
    ],
    epic: [
      { name: "Vorpal Sword", desc: "Ignores resistance to slashing damage. On a 20, cuts off the target's head.", type: "Weapon" },
      { name: "Staff of the Magi", desc: "Grants immense magical power and a myriad of spells.", type: "Staff" },
      { name: "Belt of Storm Giant Strength", desc: "Your Strength score becomes 29.", type: "Wondrous Item" },
      { name: "King's Crown (50,000gp)", desc: "A legendary artifact encrusted with jewels.", type: "Wealth" }
    ]
  }
};
