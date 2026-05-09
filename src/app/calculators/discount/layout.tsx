import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discount Calculator - Find Sales Savings & Final Price | UtilityLab",
  description: "Quickly calculate the final price after discounts. Support for multiple stacking discounts, tax calculation, and total savings tracking.",
  keywords: "discount calculator, sale calculator, shopping tools, savings calculator, price calculator",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
