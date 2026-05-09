import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investment Return Calculator - Calculate ROI & CAGR | UtilityLab",
  description: "Calculate your Return on Investment (ROI) and Compound Annual Growth Rate (CAGR). Understand how your investments performed over time with our detailed breakdown.",
  keywords: "ROI calculator, CAGR calculator, investment returns, profit calculator, finance tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
