import type { Metadata } from "next";
import { FeatureCards } from "@/components/FeatureCards";
import { HeroCarousel } from "@/components/HeroCarousel";
import { HowItWorks } from "@/components/HowItWorks";
import { ToolHighlights } from "@/components/ToolHighlights";

export const metadata: Metadata = {
  title: "Dice & Codex | Your Ultimate D&D Companion",
  description:
    "Master your D&D adventures with character builders, rule guides, and interactive tools designed for both players and DMs.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroCarousel />
      <FeatureCards />
      <HowItWorks />
      <ToolHighlights />
    </div>
  );
}
