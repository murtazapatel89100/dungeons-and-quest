"use client";

import { useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Wand2, FileText } from "lucide-react";
import {
    ALIGNMENTS,
    ARMOR,
    BACKGROUNDS,
    BACKGROUND_TRAITS,
    CLASSES_AND_SUBCLASSES,
    DEITIES,
    EQUIPMENT_PACKS,
    FEATS,
    FEATURES_TRAITS,
    GENDERS,
    GEAR,
    LANGUAGES,
    PERSONALITY_SUGGESTIONS,
    RACES,
    SKILLS,
    SPELLS,
    TOOLS,
    WEAPONS,
} from "@/lib/character-data";
import { INITIAL_CHARACTER_STATE, type CharacterState } from "@/lib/character-types";

type AbilityScore = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";

type QuickCharacter = {
    name: string;
    title: string;
    gender: string;
    age: string;
    height: string;
    weight: string;
    deity: string;
    race: string;
    subrace: string;
    characterClass: string;
    subclass: string;
    background: string;
    alignment: string;
    imageUrl: string;
    abilities: Record<AbilityScore, number>;
    skills: string[];
    savingThrows: AbilityScore[];
    feats: string[];
    features: string[];
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
    spells: string[];
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
    meta: {
        level: number;
        xp: number;
        inspiration: boolean;
        hitDice: string;
        proficiencyBonus: number;
    };
    backstory: string;
};

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

function chooseRandom<T>(items: readonly T[]): T {
    return items[Math.floor(Math.random() * items.length)];
}

function chooseMany<T>(items: readonly T[], count: number): T[] {
    const pool = [...items];
    const chosen: T[] = [];
    const maxCount = Math.min(count, pool.length);

    while (chosen.length < maxCount) {
        const index = Math.floor(Math.random() * pool.length);
        const [item] = pool.splice(index, 1);
        if (item !== undefined) {
            chosen.push(item);
        }
    }

    return chosen;
}

function rollAbilityScore() {
    return Math.floor(Math.random() * 16) + 3;
}

function formatHeight(totalInches: number) {
    const feet = Math.floor(totalInches / 12);
    const inches = totalInches % 12;
    return `${feet}'${inches}"`;
}

function generateIdentity() {
    const race = chooseRandom(Object.keys(RACES));
    const characterClass = chooseRandom(Object.keys(CLASSES_AND_SUBCLASSES));
    const subraces = RACES[race as keyof typeof RACES];
    const subclasses =
        CLASSES_AND_SUBCLASSES[
        characterClass as keyof typeof CLASSES_AND_SUBCLASSES
        ];

    return {
        race,
        characterClass,
        subrace: subraces.length > 0 ? chooseRandom(subraces) : "None",
        subclass: subclasses.length > 0 ? chooseRandom(subclasses) : "None",
    };
}

function generateDeity(alignment: string) {
    if (alignment.includes("Good")) {
        return chooseRandom(DEITIES.Good);
    }

    if (alignment.includes("Evil")) {
        return chooseRandom(DEITIES.Evil);
    }

    return chooseRandom([...DEITIES.Neutral, ...DEITIES.Good]);
}

function buildBackstory(character: QuickCharacter) {
    const trait = chooseRandom(character.personality.traits);
    const goal = chooseRandom(character.personality.goals);
    const secret = chooseRandom(character.personality.secrets);

    return `Raised as a ${character.background.toLowerCase()}, ${character.name} carries the mark of a ${character.alignment.toLowerCase()} ${character.characterClass.toLowerCase()} shaped by ${character.race.toLowerCase()} heritage. Guided by ${character.deity}, they rely on ${trait.toLowerCase()} instincts and chase ${goal.toLowerCase()} while guarding a secret: ${secret.toLowerCase()}.`;
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

function generateCharacter(): QuickCharacter {
    const identity = generateIdentity();
    const background = chooseRandom(BACKGROUNDS);
    const alignment = chooseRandom(ALIGNMENTS);
    const gender = chooseRandom(GENDERS);
    const title = chooseRandom([
        "the Emberbound",
        "the Quiet Blade",
        "of the Iron Oath",
        "the Moonmarked",
        "the Wild Chronicle",
        "the Storm Seeker",
    ]);
    const deity = generateDeity(alignment);
    const skills = chooseMany(
        [...CLASS_SKILL_POOLS[identity.characterClass], ...BACKGROUND_SKILL_POOLS[background], ...SKILLS],
        4,
    );
    const savingThrows = CLASS_SAVES[identity.characterClass];
    const feats = chooseMany(FEATS, 1);
    const features = chooseMany(
        [...(RACE_FEATURES[identity.race] ?? []), ...(CLASS_FEATURES[identity.characterClass] ?? []), ...FEATURES_TRAITS],
        4,
    );
    const languages = chooseMany(
        ["Common", ...LANGUAGES.filter((language) => language !== "Common")],
        3,
    );
    const armor = chooseMany(
        CLASS_ARMOR_POOLS[identity.characterClass] ?? [],
        2,
    );
    const weapons = chooseMany(
        CLASS_WEAPON_POOLS[identity.characterClass] ?? WEAPONS.Simple,
        3,
    );
    const tools = chooseMany(
        [...(BACKGROUND_TOOL_POOLS[background] ?? []), ...TOOLS],
        2,
    );
    const spells = SPELLCASTING_CLASSES.has(identity.characterClass)
        ? chooseMany([
            ...SPELLS.Cantrips,
            ...SPELLS.Level1,
            ...SPELLS.Level2,
        ], 5)
        : [];
    const equipment = [chooseRandom(EQUIPMENT_PACKS), ...chooseMany(GEAR, 3)];
    const currency = {
        cp: Math.floor(Math.random() * 15),
        sp: Math.floor(Math.random() * 40),
        ep: Math.floor(Math.random() * 6),
        gp: Math.floor(Math.random() * 75) + 5,
        pp: Math.floor(Math.random() * 3),
    };
    const personality = buildPersonality();
    const metaLevel = 1;
    
    // Create random image URL using their basic info as seed
    const seedId = `${identity.race}-${identity.characterClass}-${Date.now()}`.replace(/[^a-zA-Z0-9-]/g, '');

    const character: QuickCharacter = {
        name: `${identity.race} ${identity.characterClass}`,
        title,
        gender,
        age: `${18 + Math.floor(Math.random() * 90)}`,
        height: formatHeight(54 + Math.floor(Math.random() * 18)),
        weight: `${90 + Math.floor(Math.random() * 120)} lbs`,
        deity,
        race: identity.race,
        subrace: identity.subrace,
        characterClass: identity.characterClass,
        subclass: identity.subclass,
        background,
        alignment,
        imageUrl: `https://picsum.photos/seed/${seedId}/400/400`,
        abilities: {
            STR: rollAbilityScore(),
            DEX: rollAbilityScore(),
            CON: rollAbilityScore(),
            INT: rollAbilityScore(),
            WIS: rollAbilityScore(),
            CHA: rollAbilityScore(),
        },
        skills,
        savingThrows,
        feats,
        features,
        languages,
        proficiencies: {
            armor,
            weapons,
            tools,
        },
        weapons,
        armor,
        equipment,
        tools,
        currency,
        spells,
        personality,
        meta: {
            level: metaLevel,
            xp: 0,
            inspiration: false,
            hitDice: HIT_DICE[identity.characterClass] ?? "1d8",
            proficiencyBonus: 2,
        },
        backstory: "",
    };

    character.backstory = buildBackstory(character);
    return character;
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

export function QuickCharacterGenerator() {
    const router = useRouter();
    const [character, setCharacter] = useState<QuickCharacter>(generateCharacter());
    const [name, setName] = useState<string>("");

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleGenerateNew = () => {
        setCharacter(generateCharacter());
        setName("");
    };

    const handleViewSheet = () => {
        const finalName = name.trim() || character.name;
        
        const stateToSave: CharacterState = {
            ...INITIAL_CHARACTER_STATE,
            identity: {
                name: finalName,
                gender: character.gender,
                age: character.age,
                height: character.height,
                weight: character.weight,
                alignment: character.alignment as any,
                deity: character.deity,
                title: character.title,
                imageUrl: character.imageUrl,
            },
            race: character.race,
            subrace: character.subrace,
            characterClass: character.characterClass,
            subclass: character.subclass,
            background: character.background,
            abilities: character.abilities,
            skills: character.skills as any[],
            savingThrows: character.savingThrows,
            feats: character.feats,
            features: character.features,
            languages: character.languages,
            proficiencies: character.proficiencies,
            weapons: character.weapons,
            armor: character.armor,
            equipment: character.equipment,
            tools: character.tools,
            currency: character.currency,
            spells: { 0: character.spells },
            personality: {
                ...character.personality,
                backstory: character.backstory,
            },
            meta: character.meta,
        };
        localStorage.setItem("dnd_character_sheet", JSON.stringify(stateToSave));
        router.push("/characters/sheet");
    };

    const displayName = name.trim() || character.name;
    const conModifier = Math.floor((character.abilities.CON - 10) / 2);
    const hitPoints = Math.max(1, 8 + conModifier);

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="text-center mb-8">
                <h1 className="font-['Cinzel'] text-4xl md:text-5xl uppercase tracking-widest text-transparent bg-clip-text bg-linear-to-r from-[#D4AF37] to-[#E6C76A] mb-2">
                    Swift Hero Generator
                </h1>
                <p className="text-[#9CA3AF]">
                    Create a fully formed character in seconds. Customize the name or generate new heroes until you find the perfect fit.
                </p>
            </div>

            <Card className="bg-[#111827] border-[#D4AF37]/20">
                <CardHeader className="border-b border-white/10 flex flex-col md:flex-row gap-6 md:items-center">
                    <img 
                        src={character.imageUrl} 
                        alt={displayName} 
                        className="w-24 h-24 rounded-full object-cover border-2 border-[#D4AF37]/50 shadow-lg shadow-[#D4AF37]/20"
                    />
                    <div>
                        <CardTitle className="font-['Cinzel'] text-2xl text-[#F9FAFB]">
                            {displayName}
                        </CardTitle>
                        <p className="text-sm text-[#D4AF37] mt-1">
                            {character.title} • {character.background} • {character.alignment}
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="space-y-8 text-[#E5E7EB] pt-6">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <Label className="text-indigo-200 mb-3 block font-semibold">
                            Character Name
                        </Label>
                        <Input
                            value={name}
                            onChange={handleNameChange}
                            placeholder="Enter a name for your hero..."
                            className="bg-black/40 border-white/10 text-white placeholder:text-white/30 text-lg"
                        />
                        <p className="text-xs text-[#9CA3AF] mt-2">
                            Leave blank to keep the generated name and title.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h3 className="font-['Cinzel'] text-lg text-[#F9FAFB] mb-4 font-bold">
                                Core Identity
                            </h3>
                            <div className="space-y-3 text-sm">
                                <p><span className="text-[#9CA3AF]">Gender:</span> {character.gender}</p>
                                <p><span className="text-[#9CA3AF]">Age:</span> {character.age}</p>
                                <p><span className="text-[#9CA3AF]">Height:</span> {character.height}</p>
                                <p><span className="text-[#9CA3AF]">Weight:</span> {character.weight}</p>
                                <p><span className="text-[#9CA3AF]">Deity:</span> {character.deity}</p>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 lg:col-span-2">
                            <h3 className="font-['Cinzel'] text-lg text-[#F9FAFB] mb-4 font-bold">
                                Race, Class & Background
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="rounded-md bg-black/20 px-4 py-3 border border-white/10">
                                    <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">Race</p>
                                    <p className="text-lg font-semibold text-[#D4AF37]">{character.race}</p>
                                </div>
                                <div className="rounded-md bg-black/20 px-4 py-3 border border-white/10">
                                    <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">Subrace / Type</p>
                                    <p className="text-lg font-semibold text-[#D4AF37]">{character.subrace}</p>
                                </div>
                                <div className="rounded-md bg-black/20 px-4 py-3 border border-white/10">
                                    <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">Class</p>
                                    <p className="text-lg font-semibold text-[#D4AF37]">{character.characterClass}</p>
                                </div>
                                <div className="rounded-md bg-black/20 px-4 py-3 border border-white/10">
                                    <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">Subclass / Archetype</p>
                                    <p className="text-lg font-semibold text-[#D4AF37]">{character.subclass}</p>
                                </div>
                                <div className="rounded-md bg-black/20 px-4 py-3 border border-white/10 md:col-span-2">
                                    <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">Alignment</p>
                                    <p className="text-lg font-semibold text-[#D4AF37]">{character.alignment}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h3 className="font-['Cinzel'] text-lg text-[#F9FAFB] mb-4 font-bold">
                            Ability Scores
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                            {Object.entries(character.abilities).map(([ability, value]) => {
                                const modifier = Math.floor((value - 10) / 2);
                                const modifierString = modifier >= 0 ? `+${modifier}` : `${modifier}`;

                                return (
                                    <div
                                        className="rounded-md border border-white/10 bg-black/20 px-3 py-4 text-center hover:bg-black/30 transition-colors"
                                        key={ability}
                                    >
                                        <p className="text-xs text-[#9CA3AF] uppercase tracking-wide font-bold">
                                            {ability}
                                        </p>
                                        <p className="text-2xl font-bold text-[#D4AF37] mt-1">
                                            {value}
                                        </p>
                                        <p className="text-xs text-[#9CA3AF]">{modifierString}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h3 className="font-['Cinzel'] text-lg text-[#F9FAFB] mb-4 font-bold">
                                Skills, Saves & Feats
                            </h3>
                            <div className="space-y-5 text-sm">
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
                                    <DetailChipList items={character.feats.length > 0 ? character.feats : ["None"]} tone="slate" />
                                </div>
                                <div>
                                    <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Class / Racial Features</p>
                                    <DetailChipList items={character.features} tone="slate" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h3 className="font-['Cinzel'] text-lg text-[#F9FAFB] mb-4 font-bold">
                                Languages & Proficiencies
                            </h3>
                            <div className="space-y-5 text-sm">
                                <div>
                                    <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Languages</p>
                                    <DetailChipList items={character.languages} />
                                </div>
                                <div>
                                    <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Armor Proficiencies</p>
                                    <DetailChipList items={character.proficiencies.armor.length > 0 ? character.proficiencies.armor : ["None"]} tone="slate" />
                                </div>
                                <div>
                                    <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Weapon Proficiencies</p>
                                    <DetailChipList items={character.proficiencies.weapons.length > 0 ? character.proficiencies.weapons : ["None"]} tone="slate" />
                                </div>
                                <div>
                                    <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Tool Proficiencies</p>
                                    <DetailChipList items={character.proficiencies.tools.length > 0 ? character.proficiencies.tools : ["None"]} tone="slate" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h3 className="font-['Cinzel'] text-lg text-[#F9FAFB] mb-4 font-bold">
                                Weapons, Armor & Gear
                            </h3>
                            <div className="space-y-5 text-sm">
                                <div>
                                    <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Weapons</p>
                                    <DetailChipList items={character.weapons} />
                                </div>
                                <div>
                                    <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Armor</p>
                                    <DetailChipList items={character.armor.length > 0 ? character.armor : ["Unarmored"]} tone="indigo" />
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

                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h3 className="font-['Cinzel'] text-lg text-[#F9FAFB] mb-4 font-bold">
                                Spellbook & Resources
                            </h3>
                            <div className="space-y-5 text-sm">
                                <div>
                                    <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Known Spells</p>
                                    <DetailChipList items={character.spells.length > 0 ? character.spells : ["No spells"]} tone="indigo" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="rounded-md bg-black/20 px-4 py-3 border border-white/10 text-center">
                                        <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">Level</p>
                                        <p className="text-lg font-semibold text-[#D4AF37]">{character.meta.level}</p>
                                    </div>
                                    <div className="rounded-md bg-black/20 px-4 py-3 border border-white/10 text-center">
                                        <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">Hit Dice</p>
                                        <p className="text-lg font-semibold text-[#D4AF37]">{character.meta.hitDice}</p>
                                    </div>
                                    <div className="rounded-md bg-black/20 px-4 py-3 border border-white/10 text-center">
                                        <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">Hit Points</p>
                                        <p className="text-lg font-semibold text-[#D4AF37]">{hitPoints}</p>
                                    </div>
                                    <div className="rounded-md bg-black/20 px-4 py-3 border border-white/10 text-center">
                                        <p className="text-xs text-[#9CA3AF] uppercase tracking-wide">Prof. Bonus</p>
                                        <p className="text-lg font-semibold text-[#D4AF37]">+{character.meta.proficiencyBonus}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-5 gap-2 text-center text-xs">
                                    <div className="rounded-md bg-black/20 px-2 py-3 border border-white/10"><p className="text-[#9CA3AF]">CP</p><p className="font-semibold text-[#D4AF37]">{character.currency.cp}</p></div>
                                    <div className="rounded-md bg-black/20 px-2 py-3 border border-white/10"><p className="text-[#9CA3AF]">SP</p><p className="font-semibold text-[#D4AF37]">{character.currency.sp}</p></div>
                                    <div className="rounded-md bg-black/20 px-2 py-3 border border-white/10"><p className="text-[#9CA3AF]">EP</p><p className="font-semibold text-[#D4AF37]">{character.currency.ep}</p></div>
                                    <div className="rounded-md bg-black/20 px-2 py-3 border border-white/10"><p className="text-[#9CA3AF]">GP</p><p className="font-semibold text-[#D4AF37]">{character.currency.gp}</p></div>
                                    <div className="rounded-md bg-black/20 px-2 py-3 border border-white/10"><p className="text-[#9CA3AF]">PP</p><p className="font-semibold text-[#D4AF37]">{character.currency.pp}</p></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h3 className="font-['Cinzel'] text-lg text-[#F9FAFB] mb-4 font-bold">
                            Persona & Backstory
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Personality Traits</p>
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
                            </div>
                            <div className="space-y-4">
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
                        <div className="mt-6 rounded-lg border border-white/10 bg-black/20 p-4">
                            <p className="text-[#9CA3AF] uppercase tracking-wide text-xs mb-2">Backstory</p>
                            <p className="leading-relaxed text-[#E5E7EB]">{character.backstory}</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10">
                        <Button
                            onClick={handleGenerateNew}
                            className="bg-black/50 hover:bg-black/80 text-white font-semibold flex items-center justify-center gap-2 flex-1 border border-white/10"
                        >
                            <Wand2 className="w-4 h-4" />
                            Generate New Hero
                        </Button>
                        <Button
                            onClick={handleViewSheet}
                            className="bg-[#D4AF37] hover:bg-[#E6C76A] text-[#0B0F1A] font-bold flex items-center justify-center gap-2 flex-1"
                        >
                            <FileText className="w-4 h-4" />
                            View Character Sheet
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
