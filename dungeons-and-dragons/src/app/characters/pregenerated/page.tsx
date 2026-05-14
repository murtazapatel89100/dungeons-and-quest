import type { Metadata } from "next";
import { PreGeneratedCharacters } from "@/components/character-creator/PreGeneratedCharacters";
import { constructMetadata, pageMetadata } from "@/../config/seo";


export const metadata: Metadata = constructMetadata(pageMetadata.charactersPregen);

export default function PregeneratedCharactersPage() {
  return (
    <div className="w-full grow pt-28 md:pt-32 pb-20 px-4 md:px-8 bg-[#0B0F1A]">
      <PreGeneratedCharacters />
    </div>
  );
}
