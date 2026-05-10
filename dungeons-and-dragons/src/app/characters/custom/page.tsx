import type { Metadata } from "next";
import { CharacterWizard } from "@/components/character-creator/CharacterWizard";

export const metadata: Metadata = {
  title: "Custom Character Forge",
  description:
    "Build a fully custom Dungeons & Dragons hero with complete control over every character detail.",
  openGraph: {
    title: "Custom Character Forge",
    description:
      "Build a fully custom Dungeons & Dragons hero with complete control over every character detail.",
  },
};

export default function CustomCharactersPage() {
  return (
    <div className="w-full grow pt-28 md:pt-32 pb-20 px-4 md:px-8 bg-[#0B0F1A] text-[#F9FAFB]">
      <CharacterWizard />
    </div>
  );
}
