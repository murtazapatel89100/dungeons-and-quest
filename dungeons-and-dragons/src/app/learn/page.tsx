import { HeroSection } from "@/components/learn/HeroSection";
import { JourneyNavigator } from "@/components/learn/JourneyNavigator";
import { IntroSection } from "@/components/learn/IntroSection";
import { DiceSystem } from "@/components/learn/DiceSystem";
import { CharacterCreation } from "@/components/learn/CharacterCreation";
import { CombatBasics } from "@/components/learn/CombatBasics";
import { Spellcasting } from "@/components/learn/Spellcasting";
import { Roleplaying } from "@/components/learn/Roleplaying";
import { CampaignStructure } from "@/components/learn/CampaignStructure";
import { Glossary } from "@/components/learn/Glossary";
import { ExampleAdventure } from "@/components/learn/ExampleAdventure";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Player's Handbook | Learn D&D",
  description: "Master the basics of Dungeons & Dragons. From character creation to combat and magic, start your journey here.",
  openGraph: {
    title: "Player's Handbook | Learn D&D",
    description: "Master the basics of Dungeons & Dragons. From character creation to combat and magic, start your journey here.",
  }
};

export default function LearnPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B0F1A] text-[#F9FAFB]">
      <HeroSection />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-32 pb-32">
        <JourneyNavigator />
        <div id="intro"><IntroSection /></div>
        <div id="dice"><DiceSystem /></div>
        <div id="character"><CharacterCreation /></div>
        <div id="combat"><CombatBasics /></div>
        <div id="magic"><Spellcasting /></div>
        <div id="roleplaying"><Roleplaying /></div>
        <div id="campaigns"><CampaignStructure /></div>
        <div id="glossary"><Glossary /></div>
        <div id="adventure"><ExampleAdventure /></div>
      </div>
    </div>
  );
}
