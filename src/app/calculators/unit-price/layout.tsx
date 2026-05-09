import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unit Price Calculator - Compare Grocery Deals | UtilityLab",
  description: "Find the best value for your money by comparing unit prices of different products. Calculate price per ounce, gram, or liter instantly.",
  keywords: "unit price calculator, price comparison, grocery savings, value for money, shopping tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
