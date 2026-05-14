import type { Metadata } from "next";
import { constructMetadata, pageMetadata } from "@/../config/seo";
import { ComparisonTable } from "@/components/playstyles/ComparisonTable";
import { ExperienceCards } from "@/components/playstyles/ExperienceCards";
import { PathQuiz } from "@/components/playstyles/PathQuiz";
import { PlaystylesHero } from "@/components/playstyles/PlaystylesHero";
import { RecommendationsAndResources } from "@/components/playstyles/RecommendationsAndResources";

export const metadata: Metadata = constructMetadata(pageMetadata.playstyles);

export default function PlaystylesPage() {
  return (
    <main className="min-h-screen bg-[#0B0F1A]">
      <PlaystylesHero />
      <ExperienceCards />
      <ComparisonTable />
      <PathQuiz />
      <RecommendationsAndResources />
    </main>
  );
}
