import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Converter | UPPERCASE, lowercase, Title Case & More | UtilityLabs",
  description: "Change text case instantly. Convert to UPPERCASE, lowercase, Title Case, Sentence case, and aLtErNaTe cAsE. Free, fast, and private online text tool.",
};

export default function CaseConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
