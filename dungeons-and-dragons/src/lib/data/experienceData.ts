export interface Experience {
  id: string;
  title: string;
  subtitle: string;
  themeColor: string;
  bgGradient: string;
  iconType: string;
  bestFor: string[];
  topics: string[];
  description: string;
  examples: string[];
}

export interface ComparisonStat {
  id: string;
  name: string;
  social: "Low" | "Medium" | "High" | "Very High";
  combat: "Low" | "Medium" | "High" | "Very High";
  roleplay: "Low" | "Medium" | "High" | "Very High";
  beginnerFriendly: "Low" | "Medium" | "High" | "Very High";
}

export const experienceData = {
  experiences: [
    {
      id: "video-games",
      title: "Video Game RPGs",
      subtitle: "Cinematic, tactical, and fully visualized",
      themeColor: "#2563EB", // Mystic Blue
      bgGradient: "from-[#2563EB]/20 to-[#0B0F1A]",
      iconType: "Gamepad2",
      bestFor: ["Gamers", "Beginners", "Solo Players", "RPG Fans"],
      topics: [
        "Turn-based combat",
        "Companion systems",
        "Dialogue choices",
        "Digital adaptation of DnD rules",
        "Exploration and quests",
      ],
      description:
        "For players who love visual storytelling and want to experience the magic of D&D without the pressure of a live table. These games handle all the complex math and rules for you.",
      examples: [
        "Baldur's Gate 3",
        "Solasta: Crown of the Magister",
        "Neverwinter Nights",
      ],
    },
    {
      id: "tabletop",
      title: "Tabletop D&D",
      subtitle: "The classic pen & paper experience",
      themeColor: "#D4AF37", // Gold
      bgGradient: "from-[#D4AF37]/20 to-[#0B0F1A]",
      iconType: "Dices",
      bestFor: ["Social players", "Creative thinkers", "Storytellers", "Long-form campaign lovers"],
      topics: [
        "Physical or digital dice",
        "Character sheets",
        "Dungeon Masters",
        "Collaborative storytelling",
        "Imagination-driven gameplay",
      ],
      description:
        "Gather around a table (or a virtual one) with friends. One person runs the world, while the rest play the heroes. It's an engine for infinite imagination where you can try literally anything.",
      examples: ["In-Person Homebrew", "Roll20 Campaigns", "D&D Adventurers League"],
    },
    {
      id: "rp-communities",
      title: "Roleplay Communities",
      subtitle: "Focus on character and collaborative writing",
      themeColor: "#6D28D9", // Arcane Purple
      bgGradient: "from-[#6D28D9]/20 to-[#0B0F1A]",
      iconType: "Drama",
      bestFor: ["Writers", "Actors", "Storytellers", "Character-focused players"],
      topics: [
        "Discord RP servers",
        "Text roleplay",
        "Voice roleplay",
        "Character interactions",
        "Living worlds",
      ],
      description:
        "Skip the heavy combat math and focus entirely on acting, writing, and becoming your character. These communities build massive, living worlds where hundreds of characters interact daily.",
      examples: ["West Marches Servers", "Discord Text RP", "Voice Acting Groups"],
    },
    {
      id: "tactical",
      title: "Tactical Combat",
      subtitle: "Strategy, optimization, and glorious battle",
      themeColor: "#DC2626", // Crimson
      bgGradient: "from-[#DC2626]/20 to-[#0B0F1A]",
      iconType: "Swords",
      bestFor: ["Strategy gamers", "Min-maxers", "Combat enthusiasts", "Wargamers"],
      topics: [
        "Difficult encounters",
        "Optimized builds",
        "Dungeon crawling",
        "Battle strategy",
        "Tactical positioning",
      ],
      description:
        "Treat D&D like a complex game of chess. Focus on creating the most powerful character possible and conquering impossible odds through clever use of grid positioning, spells, and teamwork.",
      examples: ["Mega-Dungeons", "Arena Combat Servers", "Meatgrinder Campaigns"],
    },
    {
      id: "worldbuilding",
      title: "Lore & Worldbuilding",
      subtitle: "Create universes from scratch",
      themeColor: "#10B981", // Emerald
      bgGradient: "from-[#10B981]/20 to-[#0B0F1A]",
      iconType: "Globe",
      bestFor: ["Writers", "Artists", "Fantasy creators", "Aspiring Dungeon Masters"],
      topics: [
        "Fantasy world creation",
        "Map design",
        "Kingdoms and politics",
        "Pantheons and gods",
        "Custom campaign settings",
      ],
      description:
        "You don't even need to play the game to enjoy D&D! Many people find joy purely in designing intricate fantasy maps, writing histories of fallen empires, and creating their own monsters.",
      examples: ["World Anvil", "Inkarnate Mapmaking", "Homebrew Creation"],
    },
    {
      id: "solo",
      title: "Solo & AI Adventures",
      subtitle: "Explore at your own pace",
      themeColor: "#8B5CF6", // Violet
      bgGradient: "from-[#8B5CF6]/20 to-[#0B0F1A]",
      iconType: "Sparkles",
      bestFor: ["Introverts", "Solo players", "Experimental players", "Casual adventurers"],
      topics: [
        "Solo campaign modules",
        "AI Dungeon Masters",
        "Procedural storytelling",
        "Journaling RPGs",
        "Sandbox exploration",
      ],
      description:
        "Don't have a group? No problem. Modern tools, AI, and beautifully crafted solo-adventure books allow you to experience D&D completely independently, writing your own story as you go.",
      examples: ["AI-Assisted Campaigns", "Choose-Your-Own-Adventure Books", "Solo Oracle Systems"],
    },
  ] as Experience[],

  comparisonData: [
    {
      id: "bg3",
      name: "Video Game RPGs",
      social: "Low",
      combat: "High",
      roleplay: "Medium",
      beginnerFriendly: "Very High",
    },
    {
      id: "tabletop",
      name: "Tabletop D&D",
      social: "Very High",
      combat: "Medium",
      roleplay: "Very High",
      beginnerFriendly: "Medium",
    },
    {
      id: "rp",
      name: "RP Communities",
      social: "High",
      combat: "Low",
      roleplay: "Very High",
      beginnerFriendly: "Medium",
    },
    {
      id: "tactical",
      name: "Tactical Combat",
      social: "Medium",
      combat: "Very High",
      roleplay: "Low",
      beginnerFriendly: "Low",
    },
    {
      id: "solo",
      name: "Solo & AI",
      social: "Low",
      combat: "Medium",
      roleplay: "High",
      beginnerFriendly: "High",
    },
  ] as ComparisonStat[],

  resources: [
    {
      category: "Learn",
      links: [
        { name: "Basic Rules (D&D Beyond)", url: "https://www.dndbeyond.com/sources/basic-rules" },
        { name: "System Reference Document", url: "https://dnd.wizards.com/resources/systems-reference-document" },
      ]
    },
    {
      category: "Play",
      links: [
        { name: "Roll20 Virtual Tabletop", url: "https://roll20.net/" },
        { name: "D&D Beyond", url: "https://www.dndbeyond.com/" },
        { name: "StartPlaying (Find a Group)", url: "https://startplaying.games/" },
      ]
    },
    {
      category: "Create",
      links: [
        { name: "Inkarnate (Map Making)", url: "https://inkarnate.com/" },
        { name: "World Anvil (Worldbuilding)", url: "https://www.worldanvil.com/" },
      ]
    }
  ]
};
