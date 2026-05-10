import type { Metadata } from "next";
import { PreGeneratedCharacters } from "@/components/character-creator/PreGeneratedCharacters";

export const metadata: Metadata = {
  title: "Legendary Starter Roster",
  description:
    "Choose from pre-generated Dungeons & Dragons characters designed for quick campaign starts.",
  openGraph: {
    title: "Legendary Starter Roster",
    description:
      "Choose from pre-generated Dungeons & Dragons characters designed for quick campaign starts.",
  },
};

export default function PregeneratedCharactersPage() {
  return (
    <div className="w-full grow pt-28 md:pt-32 pb-20 px-4 md:px-8 bg-[#0B0F1A]">
      <PreGeneratedCharacters />
    </div>
  );
}
