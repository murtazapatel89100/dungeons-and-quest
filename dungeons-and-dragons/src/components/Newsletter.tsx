"use client";
import React from "react";
import { Send } from "lucide-react";
import { motion } from "motion/react";

export function Newsletter() {
  return (
    <section className="py-24 px-6 md:px-12 bg-[#111827] relative z-20 border-t border-[#D4AF37]/20">
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1759134335060-9ae159bc3e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwcGFyY2htZW50JTIwdGV4dHVyZXxlbnwxfHx8fDE3NzQ1NDU2OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080')", backgroundSize: "cover" }}
      />
      <div className="container mx-auto max-w-4xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0B0F1A] border border-[#D4AF37]/30 p-12 relative overflow-hidden group shadow-[0_0_30px_rgba(0,0,0,0.5)]"
        >
          {/* Magical Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#D4AF37]/10 to-[#6D28D9]/10 blur-[100px] pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity duration-500" />
          
          <h2 className="font-['Cinzel'] text-3xl text-[#F9FAFB] uppercase tracking-widest mb-4 relative z-10">
            Join the Adventurer's Guild
          </h2>
          <p className="font-['Inter'] text-[#9CA3AF] mb-8 max-w-lg mx-auto relative z-10">
            Receive missives from the frontlines, exclusive tools, and updates on the latest rulebook additions.
          </p>

          <form className="flex flex-col sm:flex-row max-w-md mx-auto relative z-10 gap-4 sm:gap-0" onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex-grow">
              <input 
                type="email" 
                placeholder="Enter your email address..."
                className="w-full bg-[#111827] border border-[#1F2937] text-[#F9FAFB] px-4 py-3 font-['Inter'] focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all duration-300 placeholder:text-[#9CA3AF]/50"
              />
            </div>
            <button 
              type="submit"
              className="px-6 py-3 bg-[#111827] border border-[#D4AF37]/50 sm:border-l-0 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors duration-300 flex items-center justify-center gap-2 group/btn"
            >
              <span className="font-['Cinzel'] uppercase text-sm tracking-wider font-semibold">Subscribe</span>
              <Send className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
