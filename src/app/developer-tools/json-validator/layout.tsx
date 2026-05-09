import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Validator & Formatter - Clean & Validate Code | UtilityLab",
  description: "Validate, beautify, and minify your JSON code instantly. Detect syntax errors with precise line highlighting and format messy data for better readability.",
  keywords: "json validator, json formatter, beautify json, minify json, json lint, developer tools, debug json",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
