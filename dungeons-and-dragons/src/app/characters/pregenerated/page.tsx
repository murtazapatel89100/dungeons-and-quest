import type { Metadata } from "next";
import { PreGeneratedCharacters } from "@/components/character-creator/PreGeneratedCharacters";

export const metadata: Metadata = {
  title: "Legendary Starter Roster | Dice & Codex",
  description:
    "Choose from pre-generated tabletop RPG characters designed for quick campaign starts. Pick your archetype and start playing with Dice & Codex.",
  openGraph: {
    title: "Legendary Starter Roster | Dice & Codex",
    description:
      "Choose from pre-generated characters designed for quick campaign starts.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dice & Codex Starter Roster",
      },
    ],
  },
};

export default function PregeneratedCharactersPage() {
  return (
    <div className="w-full grow pt-28 md:pt-32 pb-20 px-4 md:px-8 bg-[#0B0F1A]">
      <PreGeneratedCharacters />
    </div>
  );
}
