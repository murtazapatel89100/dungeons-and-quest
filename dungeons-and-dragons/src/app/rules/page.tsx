import type { Metadata } from "next";
import { CombatAdvanced } from "@/components/rules/CombatAdvanced";
import { ConditionsGrid } from "@/components/rules/ConditionsGrid";
import { CoreMechanics } from "@/components/rules/CoreMechanics";
import { EnvironmentRules } from "@/components/rules/EnvironmentRules";
import { RulesHero } from "@/components/rules/RulesHero";
import { constructMetadata, pageMetadata } from "@/../config/seo";


export const metadata: Metadata = constructMetadata(pageMetadata.rules);

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
