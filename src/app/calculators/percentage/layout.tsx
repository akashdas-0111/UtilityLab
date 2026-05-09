import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Percentage Calculator - Quick Ratios & Growth | UtilityLab",
  description: "Calculate percentages, percentage increases, and decreases instantly. Easy-to-use tool for everyday math, business, and financial calculations.",
  keywords: "percentage calculator, percent increase, percent decrease, ratio calculator, math tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
