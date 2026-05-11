import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

import siteConfig from "../../config/site.json";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
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
  ],
  authors: [{ name: "Arcane Scroll Team" }],
  creator: "Arcane Scroll",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/og-image.jpg", // We will generate a generic one or use a placeholder
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Open Graph Image`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className="min-h-screen bg-[#0B0F1A] text-[#F9FAFB] font-['Inter'] flex flex-col relative overflow-x-hidden">
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe to inject as a string
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteConfig.name,
              url: siteConfig.url,
              description: siteConfig.description,
              potentialAction: {
                "@type": "SearchAction",
                target: `${siteConfig.url}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Background Texture Overlay */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1759134335060-9ae159bc3e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwcGFyY2htZW50JTIwdGV4dHVyZXxlbnwxfHx8fDE3NzQ1NDU2OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080')",
            backgroundSize: "cover",
          }}
        />

        <Navigation />
        <main className="flex-grow flex flex-col z-10 relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
