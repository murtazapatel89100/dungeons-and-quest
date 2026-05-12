import type { Metadata } from "next";
import { CharacterWizard } from "@/components/character-creator/CharacterWizard";

export const metadata: Metadata = {
  title: "Custom Character Forge | Dice & Codex",
  description:
    "Build a fully custom tabletop RPG hero with complete control over every character detail using the Dice & Codex wizard.",
  openGraph: {
    title: "Custom Character Forge | Dice & Codex",
    description:
      "Build a fully custom character with complete control over every detail.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dice & Codex Custom Forge",
      },
    ],
  },
};

export default function CustomCharactersPage() {
  return (
    <div className="w-full grow pt-28 md:pt-32 pb-20 px-4 md:px-8 bg-[#0B0F1A] text-[#F9FAFB]">
      <CharacterWizard />
    </div>
  );
}
