"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SLIDES = [
  {
    id: 1,
    image: "/images/homepage/banner/hero-adventure.png",
    title: "Begin Your Adventure",
    subtitle:
      "Learn the fundamentals of Dungeons & Dragons and step into a world of imagination",
    cta: "Start Learning",
    path: "/learn",
  },
  {
    id: 2,
    image: "/images/homepage/banner/hero-character.png",
    title: "Forge Your Character",
    subtitle: "Create unique heroes with races, classes, and abilities",
    cta: "Build Your Character",
    path: "/characters",
  },
  {
    id: 3,
    image: "/images/homepage/banner/hero-rules.png",
    title: "Master the Rules",
    subtitle: "Understand combat, spells, and gameplay mechanics",
    cta: "Explore Rules",
    path: "/rules",
  },
  {
    id: 4,
    image: "/images/homepage/banner/hero-tools.png",
    title: "Arcane Instruments",
    subtitle:
      "Equip yourself with powerful tools to manage campaigns, track initiative, and generate encounters",
    cta: "Discover Tools",
    path: "/tools",
  },
  {
    id: 5,
    image: "/images/homepage/banner/hero-playstyle.png",

    title: "Choose Your Adventure",

    subtitle:
      "From tabletop campaigns and cinematic RPGs to immersive roleplay communities, discover the style of fantasy adventure that fits you best.",

    cta: "Explore Playstyles",

    path: "/playstyles",
  },
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0B0F1A]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${SLIDES[currentIndex].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A]/70 via-[#0B0F1A]/50 to-[#0B0F1A]" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 mt-16">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-heading text-2xl sm:text-4xl md:text-7xl lg:text-8xl text-[#F9FAFB] uppercase tracking-[0.1em] md:tracking-[0.2em] font-bold mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
              style={{ textShadow: "0 0 20px rgba(212,175,55,0.3)" }}
            >
              {SLIDES[currentIndex].title}
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-sans text-base font-bold md:text-xl lg:text-2xl text-[#9CA3AF] max-w-2xl mb-12 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-2"
            >
              {SLIDES[currentIndex].subtitle}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#6D28D9] rounded-sm blur opacity-50 group-hover:opacity-100 transition duration-500" />
              <button
                type="button"
                className="relative px-8 py-4 bg-[#111827] border border-[#D4AF37]/50 text-[#D4AF37] font-heading uppercase text-base md:text-lg tracking-widest font-bold hover:bg-[#D4AF37]/20 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                onClick={() => router.push(SLIDES[currentIndex].path)}
              >
                {SLIDES[currentIndex].cta}
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
        <button
          type="button"
          onClick={prevSlide}
          className="p-2 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/20 hover:border-[#D4AF37] transition-all rounded-sm backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex gap-3">
          {SLIDES.map((slide, idx) => (
            <button
              type="button"
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rotate-45 border transition-all duration-300 ${
                idx === currentIndex
                  ? "border-[#D4AF37] bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                  : "border-[#9CA3AF]/50 bg-transparent hover:border-[#D4AF37]/50"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={nextSlide}
          className="p-2 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/20 hover:border-[#D4AF37] transition-all rounded-sm backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#0B0F1A] to-transparent z-10 pointer-events-none" />
    </div>
  );
}
