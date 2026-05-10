import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Character Builder Hub",
  description:
    "Choose how you want to build your next hero: full custom creation, one-click quick build, or pre-built character templates.",
  openGraph: {
    title: "Character Builder Hub",
    description:
      "Choose how you want to build your next hero: full custom creation, one-click quick build, or pre-built character templates.",
  },
};

const CHARACTER_PATHS = [
  {
    title: "Custom Character Forge",
    description:
      "Build every detail from scratch, including identity, class, abilities, equipment, and personality.",
    href: "/characters/custom",
    cta: "Start Custom Build",
  },
  {
    title: "Swift Hero Generator",
    description:
      "Create a playable character in seconds with randomized race, class, background, and stats.",
    href: "/characters/quick",
    cta: "Generate Quickly",
  },
  {
    title: "Legendary Starter Roster",
    description:
      "Pick from ready-made archetypes you can use immediately or adapt for your campaign.",
    href: "/characters/pregenerated",
    cta: "Browse Pre-Built Heroes",
  },
] as const;

export default function CharactersPage() {
  return (
    <div className="w-full grow pt-28 md:pt-32 pb-20 px-4 md:px-8 bg-[#0B0F1A] text-[#F9FAFB]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="font-['Cinzel'] text-3xl md:text-5xl uppercase tracking-widest">
            Character Creation Paths
          </h1>
          <p className="mt-4 text-[#9CA3AF] max-w-3xl mx-auto">
            Select your preferred creation flow to begin your next Dungeons &
            Dragons adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CHARACTER_PATHS.map((path) => (
            <Card
              key={path.href}
              className="bg-[#111827] border-[#D4AF37]/20 h-full flex flex-col overflow-hidden"
            >
              <CardContent className="flex-1 relative p-0 h-44 md:h-48">
                <div className="absolute inset-0 bg-linear-to-br from-[#D4AF37]/25 via-[#111827] to-[#9CA3AF]/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,250,251,0.12),transparent_40%),linear-gradient(to_top,rgba(11,15,26,0.96),rgba(11,15,26,0.2)_62%,rgba(11,15,26,0.05))]" />
                <div className="absolute inset-0 border border-dashed border-[#D4AF37]/30" />
                <div className="relative z-10 flex h-full flex-col justify-between p-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] mb-3">
                      Hero Path
                    </p>
                    <CardTitle className="font-['Cinzel'] text-2xl text-[#F9FAFB] max-w-[12ch] leading-tight">
                      {path.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-[#E5E7EB] max-w-[28ch] bg-black/35 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                    {path.description}
                  </CardDescription>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-[#0B0F1A] hover:bg-[#E6C76A] transition-colors"
                  href={path.href}
                >
                  {path.cta}
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
