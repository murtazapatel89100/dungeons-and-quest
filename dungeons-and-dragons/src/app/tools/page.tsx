import { ToolsHero } from "@/components/tools/ToolsHero";
import { DiceRoller } from "@/components/tools/DiceRoller";
import { LootGenerator } from "@/components/tools/LootGenerator";
import { NameGenerator } from "@/components/tools/NameGenerator";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DM Utilities & Generators",
  description: "Interactive tools for Dungeon Masters: an advanced polyhedral dice roller, randomized loot generator, and instant NPC/Tavern name generators.",
  openGraph: {
    title: "DM Utilities & Generators",
    description: "Interactive tools for Dungeon Masters: an advanced polyhedral dice roller, randomized loot generator, and instant NPC/Tavern name generators.",
  }
};

export default function ToolsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B0F1A] text-[#F9FAFB]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Arcane Scroll DM Tools",
            "operatingSystem": "Any",
            "applicationCategory": "UtilitiesApplication",
            "description": "Interactive dice roller and random generators for Dungeons & Dragons.",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          }),
        }}
      />
      <ToolsHero />
      
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-32 pb-32">
        <DiceRoller />
        <LootGenerator />
        <NameGenerator />
      </div>
    </div>
  );
}

