import type { Metadata } from "next";
import { constructMetadata, pageMetadata } from "@/../config/seo";

export const metadata: Metadata = constructMetadata(
  pageMetadata.charactersSheet,
);

export default function CharacterSheetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
