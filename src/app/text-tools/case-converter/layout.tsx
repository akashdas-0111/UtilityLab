import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Converter - Transform Text Case Instantly | UtilityLab",
  description: "Change text case between UPPERCASE, lowercase, Title Case, sentence case, camelCase, and snake_case instantly. Includes live word and character counting.",
  keywords: "case converter, change text case, uppercase to lowercase, title case converter, camelcase converter, text formatter, writing tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
