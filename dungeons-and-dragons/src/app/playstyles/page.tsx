import type { Metadata } from "next";
import { ComparisonTable } from "@/components/playstyles/ComparisonTable";
import { ExperienceCards } from "@/components/playstyles/ExperienceCards";
import { PathQuiz } from "@/components/playstyles/PathQuiz";
import { PlaystylesHero } from "@/components/playstyles/PlaystylesHero";
import { RecommendationsAndResources } from "@/components/playstyles/RecommendationsAndResources";

export const metadata: Metadata = {
  title: "Choose Your Adventure | Playstyles",
  description:
    "Discover the many ways to experience Dungeons & Dragons, from classic tabletop to cinematic video games and roleplay communities.",
  openGraph: {
    title: "Choose Your Adventure | D&D Playstyles",
    description: "Discover the many ways to experience Dungeons & Dragons.",
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
