import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scientific Calculator - Advanced Math & Trig Functions | UtilityLab",
  description: "Perform advanced mathematical calculations with our scientific calculator. Supports trigonometry, logarithms, powers, and more with a sleek, interactive interface.",
  keywords: "scientific calculator, math tools, trigonometry, logarithms, square root, online calculator",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
