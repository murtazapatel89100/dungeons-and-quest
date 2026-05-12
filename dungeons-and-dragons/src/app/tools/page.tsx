import type { Metadata } from "next";
import { DiceRoller } from "@/components/tools/DiceRoller";
import { LootGenerator } from "@/components/tools/LootGenerator";
import { NameGenerator } from "@/components/tools/NameGenerator";
import { ToolsHero } from "@/components/tools/ToolsHero";

export const metadata: Metadata = {
  title: "DM Utilities & Generators | Dice & Codex",
  description:
    "Interactive tools for Dungeon Masters: an advanced polyhedral dice roller, randomized loot generator, and instant NPC/Tavern name generators.",
  openGraph: {
    title: "DM Utilities & Generators | Dice & Codex",
    description:
      "Interactive tools for Dungeon Masters: an advanced polyhedral dice roller, randomized loot generator, and instant NPC/Tavern name generators.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dice & Codex DM Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DM Utilities & Generators | Dice & Codex",
    description:
      "Interactive dice rollers, loot generators, and name generators for your next session.",
    images: ["/og-image.jpg"],
  },
};

export default function ToolsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B0F1A] text-[#F9FAFB]">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe to inject as a string
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Dice & Codex DM Tools",
            operatingSystem: "Any",
            applicationCategory: "UtilitiesApplication",
            description:
              "Interactive dice roller and random generators for Dungeons & Dragons.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
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
