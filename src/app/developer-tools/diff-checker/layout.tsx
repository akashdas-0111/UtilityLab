import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diff Checker - Compare Text & Code Instantly | UtilityLab",
  description: "Identify differences between two versions of text or code with our powerful side-by-side diffing tool. Precise highlighting for added, removed, and modified lines.",
  keywords: "diff checker, compare text, code difference, text comparison tool, developer tools, file diff, online diff tool",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
