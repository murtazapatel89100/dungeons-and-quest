import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Arcane Scroll",
  description: "Your comprehensive grimoire for all things Dungeons & Dragons.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0B0F1A] text-[#F9FAFB] font-['Inter'] flex flex-col relative overflow-x-hidden">
        {/* Background Texture Overlay */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 mix-blend-overlay"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1759134335060-9ae159bc3e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwcGFyY2htZW50JTIwdGV4dHVyZXxlbnwxfHx8fDE3NzQ1NDU2OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080')", backgroundSize: "cover" }}
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
