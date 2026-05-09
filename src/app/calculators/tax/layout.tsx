import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tax Calculator - Estimate Your Income Tax | UtilityLab",
  description: "Calculate your estimated income tax based on current tax brackets. Professional financial planning tool for individuals and businesses.",
  keywords: "tax calculator, income tax, tax estimate, financial tools, tax brackets, income planning, tax savings",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
