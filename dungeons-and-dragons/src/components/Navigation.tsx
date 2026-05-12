"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import navLinks from "../../config/links.json";
import siteConfig from "../../config/site.json";

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

	// biome-ignore lint/correctness/useExhaustiveDependencies: close menu on navigation
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
					<Image
						src="/assets/logo.png"
						alt="Dice & Codex"
						width={100}
						height={100}
						className="w-20 h-20"
						loading="eager"
					/>
					<span className="font-['Cinzel'] text-xl md:text-4xl font-bold uppercase tracking-widest text-[#F9FAFB] group-hover:text-[#D4AF37] transition-colors duration-300">
						{siteConfig.name}
					</span>
				</Link>

				{/* Desktop Nav */}
				<nav className="hidden md:flex items-center gap-8">
					{navLinks.map((link) => (
						<Link
							key={link.path}
							href={link.path}
							className={`font-['Cinzel'] uppercase text-sm md:text-lg tracking-wider transition-all duration-300 hover:text-[#D4AF37] hover:drop-shadow-[0_0_5px_rgba(212,175,55,0.5)] ${
								pathname === link.path ? "text-[#D4AF37]" : "text-[#9CA3AF]"
							}`}
						>
							{link.name}
						</Link>
					))}
				</nav>

				{/* Mobile Menu Toggle */}
				<button
					type="button"
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
			{mobileMenuOpen && (
				<div className="absolute top-full left-0 w-full bg-[#0B0F1A]/95 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-xl py-6 px-6 flex flex-col gap-6 md:hidden z-40">
					{navLinks.map((link) => (
						<Link
							key={link.path}
							href={link.path}
							className="font-['Cinzel'] uppercase text-lg tracking-wider text-[#9CA3AF] hover:text-[#D4AF37] transition-colors border-b border-[#9CA3AF]/10 pb-3"
						>
							{link.name}
						</Link>
					))}
				</div>
			)}
		</header>
	);
}
