import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIP Calculator - Systematic Investment Plan Returns | UtilityLab",
  description: "Calculate your potential returns on Systematic Investment Plan (SIP) investments. Plan your wealth growth with our interactive SIP calculator.",
  keywords: "SIP calculator, investment calculator, mutual fund calculator, wealth planner, finance tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
