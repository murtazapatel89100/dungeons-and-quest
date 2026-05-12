import type { Metadata } from "next";
import { ComparisonTable } from "@/components/playstyles/ComparisonTable";
import { ExperienceCards } from "@/components/playstyles/ExperienceCards";
import { PathQuiz } from "@/components/playstyles/PathQuiz";
import { PlaystylesHero } from "@/components/playstyles/PlaystylesHero";
import { RecommendationsAndResources } from "@/components/playstyles/RecommendationsAndResources";

export const metadata: Metadata = {
  title: "Choosing Your Playstyle | Adventure Archetypes",
  description:
    "Discover the many ways to experience Dungeons & Dragons: from high-fantasy epic combat to deep narrative roleplaying. Find the style that fits your group.",
  openGraph: {
    title: "Choosing Your Playstyle | Adventure Archetypes",
    description:
      "Discover the many ways to experience Dungeons & Dragons, from classic tabletop to cinematic roleplay communities.",
  },
};

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
