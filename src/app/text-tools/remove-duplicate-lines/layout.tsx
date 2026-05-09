import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Duplicate Line Remover - Clean Your Lists Fast | UtilityLab",
  description: "Quickly remove duplicate lines from any list or document. Sort your results alphabetically and clean up your data instantly. 100% browser-based.",
  keywords: "remove duplicate lines, clean list, deduplicate text, sort list, list cleaner, data cleaning tools, developer tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
