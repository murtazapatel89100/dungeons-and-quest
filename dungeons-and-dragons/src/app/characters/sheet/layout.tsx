import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Character Sheet | Dice & Codex",
  description: "View and manage your hero's attributes, skills, and equipment.",
};

export default function CharacterSheetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
