import type { Metadata } from "next";
import { ComparisonTable } from "@/components/playstyles/ComparisonTable";
import { ExperienceCards } from "@/components/playstyles/ExperienceCards";
import { PathQuiz } from "@/components/playstyles/PathQuiz";
import { PlaystylesHero } from "@/components/playstyles/PlaystylesHero";
import { RecommendationsAndResources } from "@/components/playstyles/RecommendationsAndResources";

export const metadata: Metadata = {
  title: "Choosing Your Playstyle | Dice & Codex",
  description:
    "Discover the many ways to experience tabletop RPGs: from high-fantasy epic combat to deep narrative roleplaying. Find the style that fits your group with Dice & Codex.",
  openGraph: {
    title: "Choosing Your Playstyle | Dice & Codex",
    description:
      "Discover the many ways to experience fantasy roleplaying, from classic tabletop to cinematic roleplay communities.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dice & Codex Playstyles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Choosing Your Playstyle | Dice & Codex",
    description: "Discover the many ways to experience tabletop roleplaying.",
    images: ["/og-image.jpg"],
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
