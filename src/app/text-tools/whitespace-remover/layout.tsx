import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Whitespace Remover - Clean & Trim Text Instantly | UtilityLab",
  description: "Remove extra spaces, tabs, and empty lines from your text effortlessly. Clean up code, data lists, or messy documents with our professional whitespace tool.",
  keywords: "whitespace remover, trim text, remove empty lines, clean text, text formatter, developer tools, data cleaning",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
