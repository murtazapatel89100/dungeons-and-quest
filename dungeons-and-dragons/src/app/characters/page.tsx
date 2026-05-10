import { CharacterWizard } from "@/components/character-creator/CharacterWizard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Character Builder",
  description: "Create and forge your D&D hero's destiny. Choose your race, class, abilities, and background with our interactive character wizard.",
  openGraph: {
    title: "Character Builder",
    description: "Create and forge your D&D hero's destiny. Choose your race, class, abilities, and background with our interactive character wizard.",
  }
};

export default function CharactersPage() {
  return (
    <div className="w-full flex-grow pt-10 pb-20 px-4 md:px-8">
      <CharacterWizard />
    </div>
  );
}
