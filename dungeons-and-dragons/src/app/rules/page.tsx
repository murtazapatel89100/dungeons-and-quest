import type { Metadata } from "next";
import { CombatAdvanced } from "@/components/rules/CombatAdvanced";
import { ConditionsGrid } from "@/components/rules/ConditionsGrid";
import { CoreMechanics } from "@/components/rules/CoreMechanics";
import { EnvironmentRules } from "@/components/rules/EnvironmentRules";
import { RulesHero } from "@/components/rules/RulesHero";

export const metadata: Metadata = {
  title: "Dungeon Master Guide | Core Mechanics",
  description:
    "Advanced rules, status conditions, combat mechanics, and environmental hazards for running epic fantasy campaigns with Dice & Codex.",
  openGraph: {
    title: "Dungeon Master Guide | Core Mechanics",
    description:
      "Advanced rules, status conditions, combat mechanics, and environmental hazards for running epic fantasy campaigns.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dice & Codex DM Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dungeon Master Guide | Core Mechanics",
    description:
      "Advanced rules and mechanics for running epic fantasy campaigns.",
    images: ["/og-image.jpg"],
  },
};

export default function RulesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B0F1A] text-[#F9FAFB]">
      <RulesHero />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-32 pb-32">
        <CoreMechanics />
        <ConditionsGrid />
        <CombatAdvanced />
        <EnvironmentRules />
      </div>
    </div>
  );
}
