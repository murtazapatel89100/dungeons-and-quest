import type { ReactNode } from "react";

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-[#0B0F1A] text-[#F9FAFB] pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-widest text-[#D4AF37] mb-4">
          {title}
        </h1>
        <p className="text-[#9CA3AF] text-sm mb-12 italic">
          Last Updated: {lastUpdated}
        </p>
        <div className="prose prose-invert prose-indigo max-w-none space-y-8 text-[#E5E7EB]">
          {children}
        </div>
      </div>
    </main>
  );
}
