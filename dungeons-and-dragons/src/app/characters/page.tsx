import type { Metadata } from "next";
import Link from "next/link";
import { CharactersHero } from "@/components/character-creator/CharactersHero";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Character Builder Hub | Dice & Codex",
  description:
    "Choose how you want to build your next hero: full custom creation, one-click quick build, or pre-built character templates with the Dice & Codex generator.",
  openGraph: {
    title: "Character Builder Hub | Dice & Codex",
    description:
      "Choose how you want to build your next hero: full custom creation, one-click quick build, or pre-built character templates.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dice & Codex Character Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Character Builder Hub | Dice & Codex",
    description: "Build your next hero with our interactive character tools.",
    images: ["/og-image.jpg"],
  },
};

const CHARACTER_PATHS = [
  {
    title: "Custom Character Forge",
    description:
      "Build every detail from scratch, including identity, class, abilities, equipment, and personality.",
    href: "/characters/custom",
    cta: "Start Custom Build",
    imageUrl: "https://picsum.photos/seed/custom-character-forge/1600/1200",
  },
  {
    title: "Swift Hero Generator",
    description:
      "Create a playable character in seconds with randomized race, class, background, and stats.",
    href: "/characters/quick",
    cta: "Generate Quickly",
    imageUrl: "https://picsum.photos/seed/swift-hero-generator/1600/1200",
    showBadge: false,
  },
  {
    title: "Legendary Starter Roster",
    description:
      "Pick from ready-made archetypes you can use immediately or adapt for your campaign.",
    href: "/characters/pregenerated",
    cta: "Browse Pre-Built Heroes",
    imageUrl: "https://picsum.photos/seed/legendary-starter-roster/1600/1200",
  },
] as const;

export default function CharactersPage() {
  return (
    <div className="w-full grow bg-[#0B0F1A] text-[#F9FAFB]">
      <CharactersHero />

      <div id="creation-paths" className="mx-auto max-w-8xl px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {CHARACTER_PATHS.map((path) => (
            <Card
              key={path.href}
              className="group h-full overflow-hidden border-[#D4AF37]/20 bg-[#0F172A]/85 shadow-2xl shadow-black/30 transition-transform duration-300 hover:-translate-y-1"
            >
              <CardContent className="relative p-0">
                <div className="relative h-96 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${path.imageUrl})` }}
                  />
                  <div className="absolute inset-0 bg-linear-to-br from-[#D4AF37]/20 via-[#111827]/35 to-[#0B0F1A]/90" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_36%),linear-gradient(to_bottom,rgba(15,23,42,0.05),rgba(11,15,26,0.7)_76%,rgba(11,15,26,0.98))]" />
                  <div className="absolute inset-0 border border-white/10" />
                  <div className="absolute inset-4 rounded-3xl border border-white/15 bg-black/30 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                    <div className="flex h-full flex-col justify-between gap-6 text-left">
                      <div className="space-y-3 pt-1">
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
                          Hero Path
                        </p>
                        <CardTitle className="min-h-30 max-w-[13ch] font-['Cinzel'] text-3xl leading-tight text-[#F9FAFB]">
                          {path.title}
                        </CardTitle>
                        <CardDescription className="max-w-[34ch] text-base leading-6 text-[#E5E7EB]">
                          {path.description}
                        </CardDescription>
                      </div>
                      <div>
                        <Link
                          className="inline-flex items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-[#0B0F1A] transition-colors hover:bg-[#E6C76A]"
                          href={path.href}
                        >
                          {path.cta}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
