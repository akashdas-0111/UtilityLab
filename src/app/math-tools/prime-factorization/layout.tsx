import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prime Factorization - Break Down Any Number | UtilityLab",
  description: "Discover the prime factors of any number instantly. Understand the building blocks of integers with detailed exponent notation and factor lists.",
  keywords: "prime factorization, factors of a number, prime factors, number theory, math tools, education tools, integer breakdown",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
