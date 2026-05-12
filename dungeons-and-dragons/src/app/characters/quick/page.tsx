import type { Metadata } from "next";
import { QuickCharacterGenerator } from "@/components/character-creator/QuickCharacterGenerator";

export const metadata: Metadata = {
  title: "Swift Hero Generator | Dice & Codex",
  description:
    "Generate a playable tabletop RPG character instantly with randomized race, class, background, and abilities using Dice & Codex.",
  openGraph: {
    title: "Swift Hero Generator | Dice & Codex",
    description:
      "Generate a playable character instantly with randomized race, class, and background.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dice & Codex Swift Generator",
      },
    ],
  },
};

export default function QuickCharactersPage() {
  return (
    <div className="w-full grow pt-28 md:pt-32 pb-20 px-4 md:px-8 bg-[#0B0F1A]">
      <QuickCharacterGenerator />
    </div>
  );
}
