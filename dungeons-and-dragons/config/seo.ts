import { Metadata } from "next";
import siteConfig from "./site.json";

export const defaultSEO = {
  title: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  ogImage: "/assets/og-banner.png",
  keywords: [
    "D&D",
    "Dungeons and Dragons",
    "TTRPG",
    "Tabletop",
    "RPG",
    "5e",
    "Character Builder",
    "Dice Roller",
    "Dungeon Master",
    "Player Handbook",
    "Dice & Codex",
  ],
};

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title,
  description,
  image = defaultSEO.ogImage,
  noIndex = false,
}: SEOProps = {}): Metadata {
  return {
    title: title ? `${title} | ${defaultSEO.title}` : defaultSEO.title,
    description: description || defaultSEO.description,
    keywords: defaultSEO.keywords,
    authors: [{ name: "Arcane Scroll Team" }],
    creator: "Arcane Scroll",
    metadataBase: new URL(defaultSEO.url),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: defaultSEO.url,
      title: title ? `${title} | ${defaultSEO.title}` : defaultSEO.title,
      description: description || defaultSEO.description,
      siteName: defaultSEO.title,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title ? `${title} - ${defaultSEO.title}` : defaultSEO.title,
        },
      ],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export const pageMetadata = {
  home: {
    title: "Your Ultimate D&D Companion",
    description: "Master your D&D adventures with character builders, rule guides, and interactive tools designed for both players and DMs."
  },
  learn: {
    title: "Player's Handbook | Learn Tabletop RPGs",
    description: "Master the basics of fantasy roleplaying. From character creation to combat and magic, start your journey with the Dice & Codex guide."
  },
  characters: {
    title: "Character Builder Hub",
    description: "Choose how you want to build your next hero: full custom creation, one-click quick build, or pre-built character templates."
  },
  charactersCustom: {
    title: "Custom Character Creator",
    description: "Build your D&D hero from scratch. Choose your race, class, background, and roll stats with our interactive step-by-step character creator."
  },
  charactersPregen: {
    title: "Pre-Generated Characters",
    description: "Jump right into the action with our roster of balanced, ready-to-play level 1 characters for your next D&D campaign."
  },
  charactersQuick: {
    title: "Quick Hero Generator",
    description: "Instantly generate a complete, randomized level 1 D&D character with full stats, spells, and backstory."
  },
  charactersSheet: {
    title: "Character Sheet",
    description: "View, manage, and export your D&D character sheet."
  },
  rules: {
    title: "Dungeon Master Guide | Core Mechanics",
    description: "Advanced rules, status conditions, combat mechanics, and environmental hazards for running epic fantasy campaigns."
  },
  tools: {
    title: "DM Utilities & Generators",
    description: "Interactive tools for Dungeon Masters: an advanced polyhedral dice roller, randomized loot generator, and instant NPC/Tavern name generators."
  },
  playstyles: {
    title: "Choosing Your Playstyle",
    description: "Discover the many ways to experience fantasy roleplaying, from classic tabletop to cinematic roleplay communities."
  },
  contact: {
    title: "Contact Us",
    description: "Get in touch with the Dice & Codex team for support, feedback, or collaboration opportunities."
  },
  privacy: {
    title: "Privacy Policy",
    description: "Read the Dice & Codex privacy policy."
  },
  terms: {
    title: "Terms of Service",
    description: "Read the Dice & Codex terms of service."
  },
  cookies: {
    title: "Cookie Policy",
    description: "Read the Dice & Codex cookie policy."
  }
};
