import Image from "next/image";
import Link from "next/link";

import siteConfig from "../../config/site.json";

export function Footer() {
  return (
    <footer className="bg-[#0B0F1A] border-t border-[#111827] py-12 px-6 md:px-12 relative z-10 w-full">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0B0F1A] px-4">
        <div className="w-8 h-8 rotate-45 border border-[#D4AF37]/30 flex items-center justify-center shadow-[0_0_15px_rgba(109,40,217,0.2)]">
          <div className="w-2 h-2 bg-[#D4AF37]/50 rounded-full" />
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mt-6">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-3 mb-4 inline-flex">
            <Image
              src="/assets/logo.png"
              alt="Dice & Codex"
              width={100}
              height={100}
              className="w-20 h-20"
              loading="eager"
            />
            <span className="font-['Cinzel'] text-xl md:text-4xl font-bold uppercase tracking-widest text-[#F9FAFB]">
              {siteConfig.name}
            </span>
          </Link>
          <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-sm">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <h4 className="font-['Cinzel'] uppercase text-[#D4AF37] tracking-widest text-sm mb-4">
            Resources
          </h4>
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                href="/learn"
                className="text-[#9CA3AF] hover:text-[#F9FAFB] text-sm transition-colors"
              >
                Player's Handbook
              </Link>
            </li>
            <li>
              <Link
                href="/rules"
                className="text-[#9CA3AF] hover:text-[#F9FAFB] text-sm transition-colors"
              >
                Dungeon Master Guide
              </Link>
            </li>
            <li>
              <Link
                href="/tools"
                className="text-[#9CA3AF] hover:text-[#F9FAFB] text-sm transition-colors"
              >
                DM Utilities
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-['Cinzel'] uppercase text-[#D4AF37] tracking-widest text-sm mb-4">
            Connect
          </h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/contact"
                className="text-[#9CA3AF] hover:text-[#F9FAFB] text-sm transition-colors font-semibold"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="text-[#9CA3AF] hover:text-[#F9FAFB] text-sm transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-[#9CA3AF] hover:text-[#F9FAFB] text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="/cookies"
                className="text-[#9CA3AF] hover:text-[#F9FAFB] text-sm transition-colors"
              >
                Cookie Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-12 pt-6 border-t border-[#111827] text-center">
        <p className="text-[#9CA3AF]/60 text-xs mb-2">
          Inspired by fantasy tabletop roleplaying games.
        </p>
        <p className="text-[#9CA3AF]/60 text-xs">
          © {new Date().getFullYear()} {siteConfig.name}. Dungeons & Dragons and
          Wizards of the Coast are trademarks of their respective owners.
        </p>
      </div>
    </footer>
  );
}
