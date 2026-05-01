import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Validator | Check & Debug JSON Online | UtilityLabs",
  description: "Validate your JSON code instantly with clear error messages and syntax highlighting. Fast, free, and 100% private developer tool.",
};

export default function JsonValidatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
