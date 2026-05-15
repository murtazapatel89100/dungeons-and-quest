import { Handshake, Mail, MessageSquare } from "lucide-react";
import type { Metadata } from "next";
import { constructMetadata, pageMetadata } from "@/../config/seo";
import contactConfig from "../../../config/contact.json";

export const metadata: Metadata = constructMetadata(pageMetadata.contact);

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0B0F1A] text-[#F9FAFB] pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16 text-center sm:text-left">
          <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-widest text-[#D4AF37] mb-4">
            Get In Touch
          </h1>
          <p className="text-[#9CA3AF] text-lg max-w-2xl">
            Have a question, found a bug, or want to contribute to the codex?
            We'd love to hear from you.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* General Inquiries */}
          <div className="bg-[#111827]/50 border border-[#D4AF37]/10 p-8 rounded-2xl hover:border-[#D4AF37]/30 transition-all group">
            <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="font-heading text-xl font-bold mb-3 text-white">
              General Inquiries
            </h3>
            <p className="text-[#9CA3AF] text-sm mb-6">
              For general questions about the site, tools, or guides.
            </p>
            <a
              href={`mailto:${contactConfig.email}`}
              className="text-[#D4AF37] hover:text-[#E6C76A] font-semibold flex items-center gap-2 transition-colors"
            >
              {contactConfig.email}
            </a>
          </div>

          {/* Bug Reports */}
          <div className="bg-[#111827]/50 border border-[#D4AF37]/10 p-8 rounded-2xl hover:border-[#D4AF37]/30 transition-all group">
            <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {/* Placeholder for Github icon */}
              <MessageSquare className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="font-heading text-xl font-bold mb-3 text-white">
              Bug Reports
            </h3>
            <p className="text-[#9CA3AF] text-sm mb-6">
              Found an issue? Report it on our GitHub repository.
            </p>
            <a
              href={contactConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4AF37] hover:text-[#E6C76A] font-semibold flex items-center gap-2 transition-colors"
            >
              GitHub Repository
            </a>
          </div>

          {/* Community */}
          <div className="bg-[#111827]/50 border border-[#D4AF37]/10 p-8 rounded-2xl hover:border-[#D4AF37]/30 transition-all group">
            <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="font-heading text-xl font-bold mb-3 text-white">
              Join the Community
            </h3>
            <p className="text-[#9CA3AF] text-sm mb-6">
              Connect with other players and DMs on our Discord.
            </p>
            <a
              href={contactConfig.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4AF37] hover:text-[#E6C76A] font-semibold flex items-center gap-2 transition-colors"
            >
              Join our Discord
            </a>
          </div>

          {/* Collaboration */}
          <div className="bg-[#111827]/50 border border-[#D4AF37]/10 p-8 rounded-2xl hover:border-[#D4AF37]/30 transition-all group border-dashed">
            <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Handshake className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="font-heading text-xl font-bold mb-3 text-white">
              {contactConfig.collaboration.title}
            </h3>
            <p className="text-[#9CA3AF] text-sm mb-6">
              {contactConfig.collaboration.description}
            </p>
            <a
              href={`mailto:${contactConfig.collaboration.email}`}
              className="text-[#D4AF37] hover:text-[#E6C76A] font-semibold flex items-center gap-2 transition-colors"
            >
              {contactConfig.collaboration.email}
            </a>
          </div>
        </div>

        <section className="mt-24 bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-8 md:p-12 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-[80px] rounded-full -mr-32 -mt-32" />
          <h2 className="font-heading text-3xl font-bold mb-6 text-white relative z-10">
            Collaboration Opportunities
          </h2>
          <p className="text-[#9CA3AF] text-base md:text-lg max-w-2xl mx-auto mb-8 relative z-10">
            Are you a writer, artist, or developer with a love for tabletop
            games? We are looking for contributors to help us create new
            content, refine our tools, and make Dice & Codex the best TTRPG
            companion on the web.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <a
              href={`mailto:${contactConfig.collaboration.email}`}
              className="bg-[#D4AF37] hover:bg-[#E6C76A] text-[#0B0F1A] px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-[#D4AF37]/10"
            >
              Contact for Collaboration
            </a>
            <a
              href={contactConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 text-[#D4AF37] px-8 py-3 rounded-full font-bold transition-all"
            >
              Contribute on GitHub
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
