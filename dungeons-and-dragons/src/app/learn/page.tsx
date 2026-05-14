import type { Metadata } from "next";
import { constructMetadata, pageMetadata } from "@/../config/seo";
import { CampaignStructure } from "@/components/learn/CampaignStructure";
import { CharacterCreation } from "@/components/learn/CharacterCreation";
import { CombatBasics } from "@/components/learn/CombatBasics";
import { DiceSystem } from "@/components/learn/DiceSystem";
import { ExampleAdventure } from "@/components/learn/ExampleAdventure";
import { Glossary } from "@/components/learn/Glossary";
import { HeroSection } from "@/components/learn/HeroSection";
import { IntroSection } from "@/components/learn/IntroSection";
import { JourneyNavigator } from "@/components/learn/JourneyNavigator";
import { Roleplaying } from "@/components/learn/Roleplaying";
import { Spellcasting } from "@/components/learn/Spellcasting";

export const metadata: Metadata = constructMetadata(pageMetadata.learn);

export default function LearnPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B0F1A] text-[#F9FAFB]">
      <HeroSection />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-32 pb-32">
        <JourneyNavigator />
        <div id="intro">
          <IntroSection />
        </div>
        <div id="dice">
          <DiceSystem />
        </div>
        <div id="character">
          <CharacterCreation />
        </div>
        <div id="combat">
          <CombatBasics />
        </div>
        <div id="magic">
          <Spellcasting />
        </div>
        <div id="roleplaying">
          <Roleplaying />
        </div>
        <div id="campaigns">
          <CampaignStructure />
        </div>
        <div id="glossary">
          <Glossary />
        </div>
        <div id="adventure">
          <ExampleAdventure />
        </div>
      </div>
    </div>
  );
}
