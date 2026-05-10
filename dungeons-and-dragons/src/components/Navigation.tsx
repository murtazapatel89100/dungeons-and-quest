"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Dice5 } from "lucide-react";
import siteConfig from "../../config/site.json";
import { motion, AnimatePresence } from "motion/react";
import navLinks from "../../config/links.json";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0B0F1A]/95 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group relative z-10">
          <Dice5 className="w-8 h-8 text-[#D4AF37] group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.8)] transition-all duration-300" />
          <span className="font-['Cinzel'] text-xl md:text-2xl font-bold uppercase tracking-widest text-[#F9FAFB] group-hover:text-[#D4AF37] transition-colors duration-300">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`font-['Cinzel'] uppercase text-sm tracking-wider transition-all duration-300 hover:text-[#D4AF37] hover:drop-shadow-[0_0_5px_rgba(212,175,55,0.5)] ${
                pathname === link.path ? "text-[#D4AF37]" : "text-[#9CA3AF]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#6D28D9] rounded-sm blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
          <button className="relative px-6 py-2.5 bg-[#111827] border border-[#D4AF37]/50 text-[#D4AF37] font-['Cinzel'] uppercase text-sm tracking-widest font-semibold overflow-hidden hover:bg-[#D4AF37]/10 transition-colors duration-300 flex items-center gap-2 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            <span>Start Adventure</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F9FAFB]/10 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_1.5s_infinite]" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-[#F9FAFB] hover:text-[#D4AF37] transition-colors relative z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Menu className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#0B0F1A]/95 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-xl py-6 px-6 flex flex-col gap-6 md:hidden z-40"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="font-['Cinzel'] uppercase text-lg tracking-wider text-[#9CA3AF] hover:text-[#D4AF37] transition-colors border-b border-[#9CA3AF]/10 pb-3"
              >
                {link.name}
              </Link>
            ))}
            <button className="mt-4 px-6 py-3 bg-[#111827] border border-[#D4AF37] text-[#D4AF37] font-['Cinzel'] uppercase tracking-widest font-semibold hover:bg-[#D4AF37]/10 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              Start Adventure
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
