import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Percentage Calculator - Precise Math Solutions | UtilityLab",
  description: "Calculate percentages, markups, discounts, and growth rates instantly. Perfect for business, finance, and everyday math calculations.",
  keywords: "percentage calculator, math tools, discount calculator, markup calculator, growth rate, financial tools, simple calculator",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
