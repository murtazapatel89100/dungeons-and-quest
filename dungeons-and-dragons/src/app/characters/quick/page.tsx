import type { Metadata } from "next";
import { constructMetadata, pageMetadata } from "@/../config/seo";
import { QuickCharacterGenerator } from "@/components/character-creator/QuickCharacterGenerator";

export const metadata: Metadata = constructMetadata(
  pageMetadata.charactersQuick,
);

export default function QuickCharactersPage() {
  return (
    <div className="w-full grow pt-28 md:pt-32 pb-20 px-4 md:px-8 bg-[#0B0F1A]">
      <QuickCharacterGenerator />
    </div>
  );
}
