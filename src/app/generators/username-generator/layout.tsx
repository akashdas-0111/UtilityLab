import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Username Generator | Creative & Unique Handles | UtilityLabs",
  description: "Generate 20+ unique username suggestions based on your name or interests. Customizable options for numbers and underscores. Free, private, and fast online tool.",
};

export default function UsernameGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
