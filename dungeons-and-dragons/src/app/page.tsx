import { HeroCarousel } from "@/components/HeroCarousel";
import { FeatureCards } from "@/components/FeatureCards";
import { HowItWorks } from "@/components/HowItWorks";
import { ToolHighlights } from "@/components/ToolHighlights";
import { Newsletter } from "@/components/Newsletter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroCarousel />
      <FeatureCards />
      <HowItWorks />
      <ToolHighlights />
      <Newsletter />
    </div>
  );
}
