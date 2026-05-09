import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UUID Generator - v1, v4 & v7 Identifiers | UtilityLab",
  description: "Generate unique, cryptographically secure UUIDs (v1, v4, v7) instantly. Perfect for database keys, session IDs, and software development testing.",
  keywords: "uuid generator, guid generator, v4 uuid, v7 uuid, unique identifier, bulk uuid generator, developer tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
