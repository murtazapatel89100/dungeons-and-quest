import type { Metadata } from "next";
import { QuickCharacterGenerator } from "@/components/character-creator/QuickCharacterGenerator";

export const metadata: Metadata = {
  title: "Swift Hero Generator",
  description:
    "Generate a playable Dungeons & Dragons character instantly with randomized race, class, background, and abilities.",
  openGraph: {
    title: "Swift Hero Generator",
    description:
      "Generate a playable Dungeons & Dragons character instantly with randomized race, class, background, and abilities.",
  },
};

export default function QuickCharactersPage() {
  return (
    <div className="w-full grow pt-28 md:pt-32 pb-20 px-4 md:px-8 bg-[#0B0F1A]">
      <QuickCharacterGenerator />
    </div>
  );
}
