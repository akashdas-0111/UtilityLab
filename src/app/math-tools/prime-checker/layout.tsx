import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prime Number Checker - Explore Number Theory | UtilityLab",
  description: "Check if any number is prime, find its factors, and discover the next prime in the sequence instantly. Essential for students and mathematicians.",
  keywords: "prime number checker, is it prime, prime finder, number theory, factors of a number, math tools, education tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
