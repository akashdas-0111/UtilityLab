import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Generator | Secure & Random Password Creator | UtilityLab",
  description: "Create military-grade secure passwords instantly. Customizable length, character types, and real-time strength analysis. 100% private and free.",
};

export default function PasswordGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
