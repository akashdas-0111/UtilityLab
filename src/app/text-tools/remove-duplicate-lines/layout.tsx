import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove Duplicate Lines | Online List Cleaner | UtilityLabs",
  description: "Quickly remove duplicate lines from lists and text files. Customizable case sensitivity and whitespace trimming. Fast, private, and free online tool.",
};

export default function RemoveDuplicateLinesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
