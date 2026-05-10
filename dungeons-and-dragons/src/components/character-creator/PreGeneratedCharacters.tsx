"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, Download } from "lucide-react";
import {
    ARMOR,
    BACKGROUND_TRAITS,
    DEITIES,
    EQUIPMENT_PACKS,
    FEATS,
    FEATURES_TRAITS,
    LANGUAGES,
    PERSONALITY_SUGGESTIONS,
    SKILLS,
    SPELLS,
    TOOLS,
    WEAPONS,
} from "@/lib/character-data";

interface PreGeneratedCharacter {
    id: string;
    name: string;
    gender: string;
    race: string;
    subrace: string;
    characterClass: string;
    subclass: string;
    background: string;
    alignment: string;
    archetype: string;
    style: string;
    highlights: string[];
    abilities: Record<"STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA", number>;
    proficiencies: string[];
    signature_weapon: string;
    armor: string;
    spells?: string[];
    description: string;
}

type AbilityScore = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";

type DetailedPreGeneratedCharacter = PreGeneratedCharacter & {
    title: string;
    age: string;
    height: string;
    weight: string;
    deity: string;
    skills: string[];
    savingThrows: AbilityScore[];
    feats: string[];
    features: string[];
    languages: string[];
    loadout: {
        armor: string[];
        weapons: string[];
        tools: string[];
    };
    weapons: string[];
    armorList: string[];
    equipment: string[];
    tools: string[];
    currency: {
        cp: number;
        sp: number;
        ep: number;
        gp: number;
        pp: number;
    };
    spellsKnown: string[];
    personality: {
        traits: string[];
        quirks: string[];
        fears: string[];
        goals: string[];
        secrets: string[];
        ideals: string[];
        bonds: string[];
        flaws: string[];
    };
    backstory: string;
    meta: {
        level: number;
        xp: number;
        inspiration: boolean;
        hitDice: string;
        proficiencyBonus: number;
    };
    hitPoints: number;
};

const PREGENERATED_CHARACTERS: PreGeneratedCharacter[] = [
    {
        id: "thorin-embershield",
        name: "Thorin Embershield",
        gender: "Male",
        race: "Dwarf",
        subrace: "Mountain",
        characterClass: "Fighter",
        subclass: "Champion",
        background: "Soldier",
        alignment: "Lawful Good",
        archetype: "Dwarf Fighter (Champion)",
        style: "Frontline tank and weapon specialist.",
        highlights: ["High Constitution", "Heavy Armor", "Battle Control"],
        abilities: { STR: 16, DEX: 10, CON: 15, INT: 11, WIS: 13, CHA: 10 },
        proficiencies: ["Longsword", "Heavy Armor", "Shield", "Intimidation"],
        signature_weapon: "Warhammer",
        armor: "Plate Armor",
        description:
            "A grizzled dwarven warrior with decades of battle experience. Thorin is a master of the frontline, using his exceptional constitution and armor to protect his allies while dealing steady damage.",
    },
    {
        id: "lyra-moonwhisper",
        name: "Lyra Moonwhisper",
        gender: "Female",
        race: "Elf",
        subrace: "High",
        characterClass: "Wizard",
        subclass: "Evocation",
        background: "Sage",
        alignment: "Chaotic Good",
        archetype: "Elf Wizard (Evocation)",
        style: "Ranged spell damage and battlefield shaping.",
        highlights: ["Arcane Burst", "Crowd Control", "Utility Magic"],
        abilities: { STR: 8, DEX: 13, CON: 12, INT: 16, WIS: 14, CHA: 11 },
        proficiencies: ["Arcana", "Investigation", "Dagger", "Quarterstaff"],
        signature_weapon: "Quarterstaff",
        armor: "Robe (AC 12)",
        spells: ["Fireball", "Lightning Bolt", "Prestidigitation", "Mage Hand"],
        description:
            "An arcane scholar with an affinity for destructive magic. Lyra uses powerful spells to control the battlefield and overwhelm enemies with elemental power.",
    },
    {
        id: "kestrel-nightstep",
        name: "Kestrel Nightstep",
        gender: "Male",
        race: "Halfling",
        subrace: "Lightfoot",
        characterClass: "Rogue",
        subclass: "Thief",
        background: "Criminal",
        alignment: "Chaotic Neutral",
        archetype: "Halfling Rogue (Thief)",
        style: "Stealth, scouting, and precision strikes.",
        highlights: ["Sneak Attack", "Lockpicking", "Mobility"],
        abilities: { STR: 9, DEX: 16, CON: 11, INT: 12, WIS: 14, CHA: 13 },
        proficiencies: ["Stealth", "Sleight of Hand", "Acrobatics", "Thieves' Tools"],
        signature_weapon: "Rapier",
        armor: "Leather Armor",
        description:
            "A nimble halfling with a talent for getting into and out of trouble. Kestrel's speed and stealth make him perfect for scouting, infiltration, and surgical strikes.",
    },
    {
        id: "seraphine-dawnbrand",
        name: "Seraphine Dawnbrand",
        gender: "Female",
        race: "Human",
        subrace: "Standard",
        characterClass: "Paladin",
        subclass: "Devotion",
        background: "Acolyte",
        alignment: "Lawful Good",
        archetype: "Human Paladin (Devotion)",
        style: "Defensive support with divine burst damage.",
        highlights: ["Party Support", "Divine Smite", "High Survivability"],
        abilities: { STR: 15, DEX: 11, CON: 14, INT: 10, WIS: 16, CHA: 14 },
        proficiencies: ["Insight", "Medicine", "Longsword", "Heavy Armor"],
        signature_weapon: "Longsword",
        armor: "Plate Armor",
        spells: ["Divine Smite", "Bless", "Cure Wounds"],
        description:
            "A devoted paladin of unwavering faith. Seraphine protects her companions through divine magic and righteous combat, combining healing and defensive magic with martial prowess.",
    },
    {
        id: "garrick-stormcaller",
        name: "Garrick Stormcaller",
        gender: "Male",
        race: "Half-Orc",
        subrace: "None",
        characterClass: "Barbarian",
        subclass: "Berserker",
        background: "Outlander",
        alignment: "Chaotic Neutral",
        archetype: "Half-Orc Barbarian (Berserker)",
        style: "Raw damage and battlefield presence through primal fury.",
        highlights: ["Massive Damage", "Rage Mitigation", "Intimidation"],
        abilities: { STR: 17, DEX: 10, CON: 16, INT: 9, WIS: 12, CHA: 10 },
        proficiencies: ["Survival", "Athletics", "Greataxe", "Medium Armor"],
        signature_weapon: "Greataxe",
        armor: "Hide Armor",
        description:
            "A fierce half-orc warrior who channels primal rage into devastating attacks. Garrick's raw power makes him an unstoppable force in combat.",
    },
    {
        id: "mira-silverstring",
        name: "Mira Silverstring",
        gender: "Female",
        race: "Half-Elf",
        subrace: "None",
        characterClass: "Bard",
        subclass: "Lore",
        background: "Entertainer",
        alignment: "Neutral Good",
        archetype: "Half-Elf Bard (Lore)",
        style: "Control, support, and inspiration through performance.",
        highlights: ["Crowd Control", "Team Inspiration", "Skill Versatility"],
        abilities: { STR: 10, DEX: 14, CON: 12, INT: 13, WIS: 13, CHA: 16 },
        proficiencies: ["Performance", "Persuasion", "Deception", "Lute"],
        signature_weapon: "Rapier",
        armor: "Leather Armor",
        spells: ["Vicious Mockery", "Healing Word", "Tasha's Hideous Laughter"],
        description:
            "A charismatic performer and magical scholar. Mira uses her bardic magic and silver tongue to support allies and control the flow of battle.",
    },
    {
        id: "thorgrim-ironforge",
        name: "Thorgrim Ironforge",
        gender: "Male",
        race: "Dwarf",
        subrace: "Hill",
        characterClass: "Cleric",
        subclass: "Tempest",
        background: "Acolyte",
        alignment: "Chaotic Good",
        archetype: "Dwarf Cleric (Tempest)",
        style: "Healing support with thunderous offense.",
        highlights: ["Healing & Buffs", "Offensive Magic", "Channel Divinity"],
        abilities: { STR: 13, DEX: 10, CON: 14, INT: 12, WIS: 16, CHA: 12 },
        proficiencies: ["Medicine", "Insight", "Warhammer", "Heavy Armor"],
        signature_weapon: "Warhammer",
        armor: "Plate Armor",
        spells: ["Healing Word", "Cure Wounds", "Spiritual Weapon"],
        description:
            "A devoted priest of the storm gods. Thorgrim combines potent healing magic with destructive offensive spells, striking a balance between support and damage.",
    },
    {
        id: "sylara-shadowbow",
        name: "Sylara Shadowbow",
        gender: "Female",
        race: "Elf",
        subrace: "Wood",
        characterClass: "Ranger",
        subclass: "Hunter",
        background: "Hermit",
        alignment: "Neutral Good",
        archetype: "Elf Ranger (Hunter)",
        style: "Ranged precision and nature mastery.",
        highlights: ["Ranged Damage", "Survival Skills", "Nature Magic"],
        abilities: { STR: 12, DEX: 15, CON: 13, INT: 11, WIS: 15, CHA: 10 },
        proficiencies: ["Survival", "Perception", "Longbow", "Light Armor"],
        signature_weapon: "Longbow",
        armor: "Leather Armor",
        spells: ["Hunter's Mark", "Pass Without Trace"],
        description:
            "A skilled hunter and tracker from the wilderness. Sylara excels at ranged combat and survival, using her connection to nature to outmaneuver foes.",
    },
    {
        id: "aldrick-spiritweaver",
        name: "Aldrick Spiritweaver",
        gender: "Male",
        race: "Tiefling",
        subrace: "None",
        characterClass: "Warlock",
        subclass: "Fiend",
        background: "Charlatan",
        alignment: "Chaotic Evil",
        archetype: "Tiefling Warlock (Fiend)",
        style: "Eldritch power and dark pacts.",
        highlights: ["Eldritch Blast", "Invocations", "Dark Pact Powers"],
        abilities: { STR: 10, DEX: 14, CON: 11, INT: 13, WIS: 10, CHA: 15 },
        proficiencies: ["Arcana", "Deception", "Dagger", "Light Armor"],
        signature_weapon: "Dagger",
        armor: "Leather Armor",
        spells: ["Eldritch Blast", "Agonizing Blast", "Hex"],
        description:
            "A warlock bound by an otherworldly pact. Aldrick wields eldritch power for his own gain, trading morality for magical might.",
    },
];

const CLASS_SKILL_POOLS: Record<string, string[]> = {
    Barbarian: ["Athletics", "Survival", "Intimidation"],
    Bard: ["Performance", "Persuasion", "Deception", "Insight"],
    Cleric: ["Insight", "Medicine", "Religion"],
    Druid: ["Nature", "Animal Handling", "Survival", "Insight"],
    Fighter: ["Athletics", "Intimidation", "Perception"],
    Monk: ["Acrobatics", "Stealth", "Insight"],
    Paladin: ["Athletics", "Persuasion", "Insight"],
    Ranger: ["Survival", "Perception", "Nature", "Stealth"],
    Rogue: ["Stealth", "Sleight of Hand", "Deception", "Acrobatics"],
    Sorcerer: ["Arcana", "Deception", "Persuasion"],
    Warlock: ["Arcana", "Deception", "Intimidation"],
    Wizard: ["Arcana", "History", "Insight"],
};

const BACKGROUND_SKILL_POOLS: Record<string, string[]> = {
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

const BACKGROUND_TOOL_POOLS: Record<string, string[]> = {
    Charlatan: ["Disguise Kit", "Forgery Kit"],
    Criminal: ["Thieves' Tools"],
    Entertainer: ["Disguise Kit"],
    "Guild Artisan": ["Alchemist Supplies", "Forgery Kit"],
    Hermit: ["Herbalism Kit"],
    Noble: ["Forgery Kit"],
    Sailor: ["Forgery Kit"],
    Soldier: ["Gaming Set"],
    Urchin: ["Thieves' Tools"],
};

const CLASS_SAVES: Record<string, [AbilityScore, AbilityScore]> = {
    Barbarian: ["STR", "CON"],
    Bard: ["DEX", "CHA"],
    Cleric: ["WIS", "CHA"],
    Druid: ["INT", "WIS"],
    Fighter: ["STR", "CON"],
    Monk: ["STR", "DEX"],
    Paladin: ["WIS", "CHA"],
    Ranger: ["STR", "DEX"],
    Rogue: ["DEX", "INT"],
    Sorcerer: ["CON", "CHA"],
    Warlock: ["WIS", "CHA"],
    Wizard: ["INT", "WIS"],
};

const CLASS_ARMOR_POOLS: Record<string, string[]> = {
    Barbarian: ARMOR.Medium,
    Bard: ARMOR.Light,
    Cleric: ARMOR.Heavy,
    Druid: ARMOR.Medium,
    Fighter: [...ARMOR.Medium, ...ARMOR.Heavy],
    Monk: [],
    Paladin: ARMOR.Heavy,
    Ranger: ARMOR.Medium,
    Rogue: ARMOR.Light,
    Sorcerer: [],
    Warlock: ARMOR.Light,
    Wizard: [],
};

const CLASS_WEAPON_POOLS: Record<string, string[]> = {
    Barbarian: [...WEAPONS.Martial, ...WEAPONS.Simple],
    Bard: [...WEAPONS.Simple, "Rapier", "Shortsword"],
    Cleric: [...WEAPONS.Simple, "Mace", "Warhammer"],
    Druid: [...WEAPONS.Simple, "Sickle", "Quarterstaff"],
    Fighter: [...WEAPONS.Martial, ...WEAPONS.Simple],
    Monk: ["Quarterstaff", "Shortsword", "Dart"],
    Paladin: [...WEAPONS.Martial, ...WEAPONS.Simple],
    Ranger: [...WEAPONS.Ranged, "Shortsword", "Rapier"],
    Rogue: ["Rapier", "Shortsword", ...WEAPONS.Ranged],
    Sorcerer: [...WEAPONS.Simple, "Dagger", "Quarterstaff"],
    Warlock: [...WEAPONS.Simple, "Dagger", "Quarterstaff"],
    Wizard: [...WEAPONS.Simple, "Dagger", "Quarterstaff"],
};

const CLASS_FEATURES: Record<string, string[]> = {
    Barbarian: ["Rage", "Unarmored Defense"],
    Bard: ["Bardic Inspiration", "Jack of All Trades"],
    Cleric: ["Spellcasting", "Divine Domain"],
    Druid: ["Spellcasting", "Wild Shape"],
    Fighter: ["Second Wind", "Action Surge"],
    Monk: ["Martial Arts", "Ki"],
    Paladin: ["Divine Sense", "Lay on Hands"],
    Ranger: ["Favored Foe", "Natural Explorer"],
    Rogue: ["Sneak Attack", "Expertise"],
    Sorcerer: ["Spellcasting", "Sorcery Points"],
    Warlock: ["Eldritch Invocations", "Pact Magic"],
    Wizard: ["Spellcasting", "Arcane Recovery"],
};

const RACE_FEATURES: Record<string, string[]> = {
    Human: ["Adaptable", "Versatile"],
    Elf: ["Darkvision", "Fey Ancestry"],
    Dwarf: ["Darkvision", "Dwarven Resilience"],
    Halfling: ["Lucky", "Brave"],
    Dragonborn: ["Draconic Ancestry", "Breath Weapon"],
    Gnome: ["Gnome Cunning", "Tinker"],
    "Half-Elf": ["Darkvision", "Fey Ancestry"],
    "Half-Orc": ["Relentless Endurance", "Savage Attacks"],
    Tiefling: ["Hellish Resistance", "Infernal Legacy"],
    Aasimar: ["Celestial Resistance", "Healing Hands"],
    Genasi: ["Elemental Gift"],
    Goliath: ["Stone's Endurance"],
    Firbolg: ["Hidden Step", "Powerful Build"],
    Tabaxi: ["Cat's Claw", "Feline Agility"],
    Kenku: ["Mimicry"],
    Lizardfolk: ["Bite", "Hunter's Lore"],
    Triton: ["Amphibious", "Control Air and Water"],
    "Yuan-ti Pureblood": ["Magic Resistance", "Poison Immunity"],
    Goblin: ["Nimble Escape"],
    Hobgoblin: ["Martial Training"],
    Bugbear: ["Long-Limbed", "Surprise Attack"],
    Orc: ["Aggressive", "Powerful Build"],
    Kobold: ["Pack Tactics", "Grovel, Cower, and Beg"],
};

const SPELLCASTING_CLASSES = new Set([
    "Bard",
    "Cleric",
    "Druid",
    "Paladin",
    "Ranger",
    "Sorcerer",
    "Warlock",
    "Wizard",
]);

const HIT_DICE: Record<string, string> = {
    Barbarian: "1d12",
    Bard: "1d8",
    Cleric: "1d8",
    Druid: "1d8",
    Fighter: "1d10",
    Monk: "1d8",
    Paladin: "1d10",
    Ranger: "1d10",
    Rogue: "1d8",
    Sorcerer: "1d6",
    Warlock: "1d8",
    Wizard: "1d6",
};

function chooseMany<T>(items: readonly T[], count: number): T[] {
    const pool = [...items];
    const selected: T[] = [];
    const maxCount = Math.min(count, pool.length);

    while (selected.length < maxCount) {
        const index = Math.floor(Math.random() * pool.length);
        const [item] = pool.splice(index, 1);
        if (item !== undefined) {
            selected.push(item);
        }
    }

    return selected;
}

function pickRandom<T>(items: readonly T[]): T {
    return items[Math.floor(Math.random() * items.length)];
}

function formatHeight(totalInches: number) {
    const feet = Math.floor(totalInches / 12);
    const inches = totalInches % 12;
    return `${feet}'${inches}"`;
}

function buildPersonality() {
    return {
        traits: chooseMany(BACKGROUND_TRAITS.Traits, 2),
        quirks: chooseMany(PERSONALITY_SUGGESTIONS.Quirks, 2),
        fears: chooseMany(PERSONALITY_SUGGESTIONS.Fears, 1),
        goals: chooseMany(PERSONALITY_SUGGESTIONS.Goals, 2),
        secrets: chooseMany(PERSONALITY_SUGGESTIONS.Secrets, 1),
        ideals: chooseMany(BACKGROUND_TRAITS.Ideals, 2),
        bonds: chooseMany(BACKGROUND_TRAITS.Bonds, 1),
        flaws: chooseMany(BACKGROUND_TRAITS.Flaws, 1),
    };
}

function generateDetailedCharacter(character: PreGeneratedCharacter): DetailedPreGeneratedCharacter {
    const skills = chooseMany(
        [...CLASS_SKILL_POOLS[character.characterClass], ...BACKGROUND_SKILL_POOLS[character.background], ...SKILLS],
        4,
    );
    const savingThrows = CLASS_SAVES[character.characterClass];
    const feats = chooseMany(FEATS, 1);
    const features = chooseMany(
        [...(RACE_FEATURES[character.race] ?? []), ...(CLASS_FEATURES[character.characterClass] ?? []), ...FEATURES_TRAITS],
        4,
    );
    const languages = chooseMany(
        ["Common", ...LANGUAGES.filter((language) => language !== "Common")],
        3,
    );
    const armorList = chooseMany(CLASS_ARMOR_POOLS[character.characterClass] ?? [], 2);
    const weapons = chooseMany(CLASS_WEAPON_POOLS[character.characterClass] ?? WEAPONS.Simple, 3);
    const tools = chooseMany([...(BACKGROUND_TOOL_POOLS[character.background] ?? []), ...TOOLS], 2);
    const equipment = [pickRandom(EQUIPMENT_PACKS), ...chooseMany(TOOLS, 2)];
    const spellsKnown = SPELLCASTING_CLASSES.has(character.characterClass)
        ? chooseMany([...SPELLS.Cantrips, ...SPELLS.Level1, ...SPELLS.Level2], 5)
        : [];
    const deity = character.alignment.includes("Good")
        ? pickRandom(DEITIES.Good)
        : character.alignment.includes("Evil")
            ? pickRandom(DEITIES.Evil)
            : pickRandom([...DEITIES.Neutral, ...DEITIES.Good]);
    const personality = buildPersonality();
    const title = pickRandom([
        "the Emberbound",
        "the Quiet Blade",
        "of the Iron Oath",
        "the Moonmarked",
        "the Wild Chronicle",
        "the Storm Seeker",
    ]);

    return {
        ...character,
        title,
        age: `${18 + Math.floor(Math.random() * 90)}`,
        height: formatHeight(54 + Math.floor(Math.random() * 18)),
        weight: `${90 + Math.floor(Math.random() * 120)} lbs`,
        deity,
        skills,
        savingThrows,
        feats,
        features,
        languages,
        loadout: {
            armor: armorList,
            weapons,
            tools,
        },
        weapons,
        armorList,
        equipment,
        tools,
        currency: {
            cp: Math.floor(Math.random() * 15),
            sp: Math.floor(Math.random() * 40),
            ep: Math.floor(Math.random() * 6),
            gp: Math.floor(Math.random() * 75) + 5,
            pp: Math.floor(Math.random() * 3),
        },
        spellsKnown,
        personality,
        backstory:
            `${character.description} ` +
            `Their life as a ${character.background.toLowerCase()} shaped a ${character.alignment.toLowerCase()} worldview, ` +
            `and their bond with ${deity} continues to influence every choice they make.`,
        meta: {
            level: 1,
            xp: 0,
            inspiration: false,
            hitDice: HIT_DICE[character.characterClass] ?? "1d8",
            proficiencyBonus: 2,
        },
        hitPoints: Math.max(1, 8 + Math.floor((character.abilities.CON - 10) / 2)),
    };
}

function DetailChipList({
    items,
    tone = "gold",
}: {
    items: string[];
    tone?: "gold" | "indigo" | "slate";
}) {
    const toneClass =
        tone === "indigo"
            ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-200"
            : tone === "slate"
                ? "bg-white/5 border-white/10 text-[#E5E7EB]"
                : "bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#D4AF37]";

    return (
        <div className="flex flex-wrap gap-2">
            {items.map((item) => (
                <span
                    key={item}
                    className={`rounded-full border px-3 py-1 text-xs ${toneClass}`}
                >
                    {item}
                </span>
            ))}
        </div>
    );
}

export function PreGeneratedCharacters() {
    const [selectedCharacterId, setSelectedCharacterId] = useState<string>(
        PREGENERATED_CHARACTERS[0].id,
    );

    const detailedCharacters = useMemo(
        () => PREGENERATED_CHARACTERS.map(generateDetailedCharacter),
        [],
    );

    const selectedCharacter =
        detailedCharacters.find((character) => character.id === selectedCharacterId) ??
        detailedCharacters[0];

    const abilityModifier = (value: number) => {
        const mod = Math.floor((value - 10) / 2);
        return mod >= 0 ? `+${mod}` : `${mod}`;
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-center mb-8">
                <h1 className="font-['Cinzel'] text-4xl md:text-5xl uppercase tracking-widest text-transparent bg-clip-text bg-linear-to-r from-[#D4AF37] to-[#E6C76A] mb-2">
                    Legendary Starter Roster
                </h1>
                <p className="text-[#9CA3AF] max-w-2xl mx-auto">
                    Choose from battle-tested heroes ready for adventure. View full details to understand each hero's strengths and capabilities.
                </p>
                <p className="mt-4 text-sm text-[#D4AF37] uppercase tracking-[0.3em]">
                    Featured Hero: {selectedCharacter.name}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {detailedCharacters.map((character) => {
                    const isSelected = selectedCharacterId === character.id;
                    const featureChips = character.features.slice(0, 3).reduce<
                        Array<{ key: string; label: string }>
                    >((chips, feature) => {
                        const occurrence = chips.filter((chip) => chip.label === feature).length + 1;
                        chips.push({
                            key: `${character.id}-${feature}-${occurrence}`,
                            label: occurrence === 1 ? feature : `${feature} ${occurrence}`,
                        });
                        return chips;
                    }, []);

                    return (
                        <Card
                            key={character.id}
                            className={`bg-[#111827] border-2 transition-all cursor-pointer ${isSelected ? "border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20" : "border-white/10 hover:border-[#D4AF37]/50"
                                }`}
                            onClick={() => setSelectedCharacterId(character.id)}
                        >
                            <div className="w-full h-40 bg-linear-to-br from-[#D4AF37]/10 to-[#9CA3AF]/5 border-b border-white/10 flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-[#9CA3AF] text-sm">Character Portrait</p>
                                    <p className="text-[#D4AF37] text-lg font-['Cinzel'] font-bold mt-2">
                                        {character.name.split(" ")[0]}
                                    </p>
                                </div>
                            </div>

                            <CardHeader className="pb-3">
                                <CardTitle className="font-['Cinzel'] text-xl text-[#F9FAFB]">
                                    {character.name}
                                </CardTitle>
                                <p className="text-xs text-[#D4AF37] font-semibold mt-1">
                                    {character.gender} {character.race}
                                </p>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm font-semibold text-[#F9FAFB]">
                                        {character.characterClass} ({character.subclass})
                                    </p>
                                    <p className="text-xs text-[#9CA3AF]">{character.archetype}</p>
                                    <p className="text-sm text-[#E5E7EB] mt-2 italic">
                                        {character.style}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div className="rounded-md border border-white/10 bg-black/20 px-3 py-2">
                                        <p className="text-[#9CA3AF] uppercase tracking-wide">Skills</p>
                                        <p className="mt-1 text-[#D4AF37]">{character.skills.slice(0, 2).join(", ")}</p>
                                    </div>
                                    <div className="rounded-md border border-white/10 bg-black/20 px-3 py-2">
                                        <p className="text-[#9CA3AF] uppercase tracking-wide">Weapon</p>
                                        <p className="mt-1 text-[#D4AF37]">{character.signature_weapon}</p>
                                    </div>
                                    <div className="rounded-md border border-white/10 bg-black/20 px-3 py-2">
                                        <p className="text-[#9CA3AF] uppercase tracking-wide">Armor</p>
                                        <p className="mt-1 text-[#D4AF37]">{character.armorList[0] ?? character.armor}</p>
                                    </div>
                                    <div className="rounded-md border border-white/10 bg-black/20 px-3 py-2">
                                        <p className="text-[#9CA3AF] uppercase tracking-wide">Spells</p>
                                        <p className="mt-1 text-[#D4AF37]">{character.spellsKnown.length > 0 ? `${character.spellsKnown.length} known` : "None"}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
                                    {featureChips.map((feature) => (
                                        <span
                                            key={feature.key}
                                            className="text-xs bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] rounded-full px-2 py-1"
                                        >
                                            {feature.label}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-2 pt-2 border-t border-white/10">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 gap-1"
                                            >
                                                <Eye className="w-4 h-4" />
                                                View Details
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#111827] border-[#D4AF37]/20">
                                            <DialogHeader>
                                                <DialogTitle className="font-['Cinzel'] text-2xl text-[#D4AF37]">
                                                    {character.name}
                                                </DialogTitle>
                                            </DialogHeader>

                                            <div className="space-y-6 text-[#E5E7EB]">
                                                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                                    <h3 className="font-['Cinzel'] font-bold text-[#D4AF37] mb-3">
                                                        Quick Identity
                                                    </h3>
                                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                                        <p><span className="text-[#9CA3AF]">Title:</span> {character.title}</p>
                                                        <p><span className="text-[#9CA3AF]">Age:</span> {character.age}</p>
                                                        <p><span className="text-[#9CA3AF]">Height:</span> {character.height}</p>
                                                        <p><span className="text-[#9CA3AF]">Weight:</span> {character.weight}</p>
                                                        <p><span className="text-[#9CA3AF]">Deity:</span> {character.deity}</p>
                                                        <p><span className="text-[#9CA3AF]">Languages:</span> {character.languages.join(", ")}</p>
                                                    </div>
                                                </div>

                                                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                                    <h3 className="font-['Cinzel'] font-bold text-[#D4AF37] mb-3">
                                                        Identity
                                                    </h3>
                                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                                        <p><span className="text-[#9CA3AF]">Gender:</span> {character.gender}</p>
                                                        <p><span className="text-[#9CA3AF]">Race:</span> {character.race}</p>
                                                        <p><span className="text-[#9CA3AF]">Background:</span> {character.background}</p>
                                                        <p><span className="text-[#9CA3AF]">Alignment:</span> {character.alignment}</p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                                        <h3 className="font-['Cinzel'] font-bold text-[#D4AF37] mb-3">
                                                            Class & Archetype
                                                        </h3>
                                                        <div className="space-y-2 text-sm">
                                                            <p><span className="text-[#9CA3AF]">Class:</span> {character.characterClass}</p>
                                                            <p><span className="text-[#9CA3AF]">Subclass:</span> {character.subclass}</p>
                                                        </div>
                                                    </div>

                                                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                                        <h3 className="font-['Cinzel'] font-bold text-[#D4AF37] mb-3">
                                                            Equipment
                                                        </h3>
                                                        <div className="space-y-2 text-sm">
                                                            <p><span className="text-[#9CA3AF]">Weapon:</span> {character.signature_weapon}</p>
                                                            <p><span className="text-[#9CA3AF]">Armor:</span> {character.armor}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                                        <h3 className="font-['Cinzel'] font-bold text-[#D4AF37] mb-3">
                                                            Skills & Saving Throws
                                                        </h3>
                                                        <div className="space-y-4 text-sm">
                                                            <div>
                                                                <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Skill Proficiencies</p>
                                                                <DetailChipList items={character.skills} />
                                                            </div>
                                                            <div>
                                                                <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Saving Throws</p>
                                                                <DetailChipList items={character.savingThrows} tone="indigo" />
                                                            </div>
                                                            <div>
                                                                <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Feats</p>
                                                                <DetailChipList items={character.feats} tone="slate" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                                        <h3 className="font-['Cinzel'] font-bold text-[#D4AF37] mb-3">
                                                            Features & Proficiencies
                                                        </h3>
                                                        <div className="space-y-4 text-sm">
                                                            <div>
                                                                <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Features</p>
                                                                <DetailChipList items={character.features} tone="slate" />
                                                            </div>
                                                            <div>
                                                                <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Armor</p>
                                                                <DetailChipList items={character.loadout.armor.length > 0 ? character.loadout.armor : ["Unarmored"]} tone="slate" />
                                                            </div>
                                                            <div>
                                                                <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Weapons</p>
                                                                <DetailChipList items={character.loadout.weapons} />
                                                            </div>
                                                            <div>
                                                                <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Tools</p>
                                                                <DetailChipList items={character.loadout.tools.length > 0 ? character.loadout.tools : ["None"]} tone="indigo" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                                        <h3 className="font-['Cinzel'] font-bold text-[#D4AF37] mb-3">
                                                            Weapons, Armor & Gear
                                                        </h3>
                                                        <div className="space-y-4 text-sm">
                                                            <div>
                                                                <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Signature Weapons</p>
                                                                <DetailChipList items={character.weapons} />
                                                            </div>
                                                            <div>
                                                                <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Armor Loadout</p>
                                                                <DetailChipList items={character.armorList.length > 0 ? character.armorList : [character.armor]} tone="indigo" />
                                                            </div>
                                                            <div>
                                                                <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Equipment Packs & Gear</p>
                                                                <DetailChipList items={character.equipment} tone="slate" />
                                                            </div>
                                                            <div>
                                                                <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Tools</p>
                                                                <DetailChipList items={character.tools.length > 0 ? character.tools : ["None"]} tone="slate" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                                        <h3 className="font-['Cinzel'] font-bold text-[#D4AF37] mb-3">
                                                            Resources
                                                        </h3>
                                                        <div className="grid grid-cols-2 gap-3 text-center text-xs">
                                                            <div className="rounded-md bg-black/20 px-2 py-3 border border-white/10"><p className="text-[#9CA3AF]">Level</p><p className="font-semibold text-[#D4AF37]">{character.meta.level}</p></div>
                                                            <div className="rounded-md bg-black/20 px-2 py-3 border border-white/10"><p className="text-[#9CA3AF]">Hit Dice</p><p className="font-semibold text-[#D4AF37]">{character.meta.hitDice}</p></div>
                                                            <div className="rounded-md bg-black/20 px-2 py-3 border border-white/10"><p className="text-[#9CA3AF]">HP</p><p className="font-semibold text-[#D4AF37]">{character.hitPoints}</p></div>
                                                            <div className="rounded-md bg-black/20 px-2 py-3 border border-white/10"><p className="text-[#9CA3AF]">Prof. Bonus</p><p className="font-semibold text-[#D4AF37]">+{character.meta.proficiencyBonus}</p></div>
                                                        </div>
                                                        <div className="mt-4 grid grid-cols-5 gap-2 text-center text-xs">
                                                            <div className="rounded-md bg-black/20 px-2 py-3 border border-white/10"><p className="text-[#9CA3AF]">CP</p><p className="font-semibold text-[#D4AF37]">{character.currency.cp}</p></div>
                                                            <div className="rounded-md bg-black/20 px-2 py-3 border border-white/10"><p className="text-[#9CA3AF]">SP</p><p className="font-semibold text-[#D4AF37]">{character.currency.sp}</p></div>
                                                            <div className="rounded-md bg-black/20 px-2 py-3 border border-white/10"><p className="text-[#9CA3AF]">EP</p><p className="font-semibold text-[#D4AF37]">{character.currency.ep}</p></div>
                                                            <div className="rounded-md bg-black/20 px-2 py-3 border border-white/10"><p className="text-[#9CA3AF]">GP</p><p className="font-semibold text-[#D4AF37]">{character.currency.gp}</p></div>
                                                            <div className="rounded-md bg-black/20 px-2 py-3 border border-white/10"><p className="text-[#9CA3AF]">PP</p><p className="font-semibold text-[#D4AF37]">{character.currency.pp}</p></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                                    <h3 className="font-['Cinzel'] font-bold text-[#D4AF37] mb-3">
                                                        Persona
                                                    </h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                        <div>
                                                            <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Traits</p>
                                                            <DetailChipList items={character.personality.traits} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Quirks</p>
                                                            <DetailChipList items={character.personality.quirks} tone="slate" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Fears</p>
                                                            <DetailChipList items={character.personality.fears} tone="indigo" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Goals</p>
                                                            <DetailChipList items={character.personality.goals} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Ideals</p>
                                                            <DetailChipList items={character.personality.ideals} tone="indigo" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Bonds</p>
                                                            <DetailChipList items={character.personality.bonds} tone="slate" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Flaws</p>
                                                            <DetailChipList items={character.personality.flaws} tone="indigo" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Secrets</p>
                                                            <DetailChipList items={character.personality.secrets} tone="slate" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                                    <h3 className="font-['Cinzel'] font-bold text-[#D4AF37] mb-3">
                                                        Backstory
                                                    </h3>
                                                    <p className="text-sm leading-relaxed text-[#E5E7EB]">
                                                        {character.backstory}
                                                    </p>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                                        <h3 className="font-['Cinzel'] font-bold text-[#D4AF37] mb-3">
                                                            Ability Scores
                                                        </h3>
                                                        <div className="grid grid-cols-3 gap-3">
                                                            {Object.entries(character.abilities).map(
                                                                ([ability, value]) => (
                                                                    <div
                                                                        key={ability}
                                                                        className="bg-black/20 rounded border border-white/10 p-2 text-center"
                                                                    >
                                                                        <p className="text-xs text-[#9CA3AF] uppercase">
                                                                            {ability}
                                                                        </p>
                                                                        <p className="text-lg font-bold text-[#D4AF37]">
                                                                            {value}
                                                                        </p>
                                                                        <p className="text-xs text-[#9CA3AF]">
                                                                            {abilityModifier(value)}
                                                                        </p>
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                                        <h3 className="font-['Cinzel'] font-bold text-[#D4AF37] mb-3">
                                                            Class Snapshot
                                                        </h3>
                                                        <div className="space-y-3 text-sm">
                                                            <p><span className="text-[#9CA3AF]">Class:</span> {character.characterClass}</p>
                                                            <p><span className="text-[#9CA3AF]">Subclass:</span> {character.subclass}</p>
                                                            <p><span className="text-[#9CA3AF]">Background:</span> {character.background}</p>
                                                            <p><span className="text-[#9CA3AF]">Alignment:</span> {character.alignment}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {character.spellsKnown.length > 0 && (
                                                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                                        <h3 className="font-['Cinzel'] font-bold text-[#D4AF37] mb-3">
                                                            Known Spells & Abilities
                                                        </h3>
                                                        <div className="flex flex-wrap gap-2">
                                                            {character.spellsKnown.map((spell) => (
                                                                <span
                                                                    key={spell}
                                                                    className="text-xs bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 rounded-full px-3 py-1"
                                                                >
                                                                    {spell}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </DialogContent>
                                    </Dialog>

                                    <Button
                                        size="sm"
                                        className="bg-[#D4AF37] hover:bg-[#E6C76A] text-[#0B0F1A] font-semibold flex-1 gap-1"
                                    >
                                        <Download className="w-4 h-4" />
                                        Choose Hero
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
