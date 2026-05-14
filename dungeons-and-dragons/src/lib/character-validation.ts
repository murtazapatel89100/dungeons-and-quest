import type { CharacterState } from "./character-types";

export interface CharacterWarning {
  message: string;
  step: string;
  field?: string;
}

export function validateCharacter(state: CharacterState): CharacterWarning[] {
  const warnings: CharacterWarning[] = [];
  const { abilities, characterClass, identity, personality } =
    state;

  const addWarning = (message: string, step: string, field?: string) => {
    if (!warnings.some((w) => w.message === message)) {
      warnings.push({ message, step, field });
    }
  };

  // Global Rules - Ability Score Hard Limits (Level 1)
  const minStat = 8;
  const maxStat = 17;
  const maxPool = 75;

  let totalStats = 0;
  for (const [stat, val] of Object.entries(abilities)) {
    totalStats += val;
    if (val < minStat) {
      addWarning(
        `This ability score is below the minimum recommended threshold for playable characters.`,
        "abilities",
        stat,
      );
    }
    if (val > maxStat) {
      addWarning(
        `This ability score exceeds the recommended limit for a level 1 character.`,
        "abilities",
        stat,
      );
    }
  }

  if (totalStats > maxPool) {
    addWarning(
      "Your total ability score pool exceeds the recommended power range for level 1.",
      "abilities",
    );
  }

  // Class-specific
  if (characterClass === "Barbarian") {
    if (abilities.STR < 14)
      addWarning(
        "Barbarians typically rely on high Strength for effective melee combat.",
        "abilities",
        "STR",
      );
    if (abilities.CON < 14)
      addWarning(
        "Barbarians benefit heavily from high Constitution for survivability during rage.",
        "abilities",
        "CON",
      );
  }
  if (characterClass === "Bard") {
    if (abilities.CHA < 14)
      addWarning(
        "Bards depend heavily on Charisma for spellcasting and social influence.",
        "abilities",
        "CHA",
      );
  }
  if (characterClass === "Cleric") {
    if (abilities.WIS < 14)
      addWarning(
        "Clerics rely on Wisdom to strengthen healing and divine magic.",
        "abilities",
        "WIS",
      );
  }
  if (characterClass === "Druid") {
    if (abilities.WIS < 14)
      addWarning(
        "Druids channel nature magic primarily through Wisdom.",
        "abilities",
        "WIS",
      );
  }
  if (characterClass === "Fighter") {
    if (abilities.STR < 14 && abilities.DEX < 14)
      addWarning(
        "Most Fighters rely heavily on Strength or Dexterity for combat effectiveness.",
        "abilities",
      );
  }
  if (characterClass === "Monk") {
    if (abilities.DEX < 14)
      addWarning(
        "Monks rely heavily on Dexterity for defense and martial precision.",
        "abilities",
        "DEX",
      );
    if (abilities.WIS < 14)
      addWarning(
        "Wisdom enhances many Monk defensive and spiritual abilities.",
        "abilities",
        "WIS",
      );
  }
  if (characterClass === "Paladin") {
    if (abilities.CHA < 14)
      addWarning(
        "Paladins channel divine magic primarily through Charisma.",
        "abilities",
        "CHA",
      );
    if (abilities.STR < 14)
      addWarning(
        "Paladins are traditionally frontline holy warriors with martial specialization.",
        "abilities",
        "STR",
      );
  }
  if (characterClass === "Ranger") {
    if (abilities.DEX < 14)
      addWarning(
        "Rangers commonly depend on Dexterity for ranged combat and mobility.",
        "abilities",
        "DEX",
      );
    if (abilities.WIS < 14)
      addWarning(
        "Wisdom improves a Ranger's connection to nature and tracking abilities.",
        "abilities",
        "WIS",
      );
  }
  if (characterClass === "Rogue") {
    if (abilities.DEX < 14)
      addWarning(
        "Rogues rely heavily on Dexterity for stealth and precision attacks.",
        "abilities",
        "DEX",
      );
  }
  if (characterClass === "Sorcerer") {
    if (abilities.CHA < 14)
      addWarning(
        "Sorcerers channel innate magical power through Charisma.",
        "abilities",
        "CHA",
      );
  }
  if (characterClass === "Warlock") {
    if (abilities.CHA < 14)
      addWarning(
        "Warlocks rely heavily on Charisma for eldritch magic and pact abilities.",
        "abilities",
        "CHA",
      );
  }
  if (characterClass === "Wizard") {
    if (abilities.INT < 14)
      addWarning(
        "Wizards depend heavily on Intelligence for spellcasting mastery.",
        "abilities",
        "INT",
      );
  }

  // Deity
  const deity = identity?.deity;
  const alignment = identity?.alignment;
  if (deity === "Bahamut" && alignment === "Chaotic Evil")
    addWarning(
      "Bahamut is traditionally associated with justice, honor, and protection.",
      "details",
    );
  if (deity === "Lolth" && alignment === "Lawful Good")
    addWarning(
      "Lolth is commonly tied to manipulation, ambition, and darker philosophies.",
      "details",
    );
  if (deity === "Vecna" && alignment && alignment.includes("Good"))
    addWarning(
      "Vecna is associated with forbidden secrets, undeath, and dangerous knowledge.",
      "details",
    );
  if (deity === "Gruumsh" && personality?.traits?.includes("Pacifist"))
    addWarning(
      "Gruumsh traditionally values conquest, battle, and martial dominance.",
      "details",
    );

  // Power Build
  const maxAbility = Math.max(...Object.values(abilities));
  if (abilities.CON < 10 && maxAbility > 16) {
    addWarning(
      "This build prioritizes offense heavily over survivability.",
      "abilities",
    );
  }
  if (abilities.CON < 10) {
    addWarning(
      "Your current Constitution and armor combination may lead to fragile combat performance.",
      "abilities",
      "CON",
    );
  }

  // Low Damage Output Alert - approximated as no offensive stats > 13
  if (
    abilities.STR < 14 &&
    abilities.DEX < 14 &&
    abilities.INT < 14 &&
    abilities.CHA < 14
  ) {
    addWarning(
      "This build may struggle to contribute consistent damage during combat encounters.",
      "abilities",
    );
  }

  // Extreme Min-Max Warning - e.g., high max but multiple low stats
  const lowStatsCount = Object.values(abilities).filter((v) => v < 10).length;
  if (maxAbility >= 18 && lowStatsCount >= 2) {
    addWarning(
      "Highly specialized stat distributions may reduce flexibility outside your primary role.",
      "abilities",
    );
  }

  return warnings;
}
