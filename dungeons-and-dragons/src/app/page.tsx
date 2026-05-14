import type { Metadata } from "next";
import { FeatureCards } from "@/components/FeatureCards";
import { HeroCarousel } from "@/components/HeroCarousel";
import { HowItWorks } from "@/components/HowItWorks";
import { ToolHighlights } from "@/components/ToolHighlights";
import { constructMetadata, pageMetadata } from "@/../config/seo";


export const metadata: Metadata = constructMetadata(pageMetadata.home);

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
