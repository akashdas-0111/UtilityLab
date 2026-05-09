import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salary Calculator - Convert Hourly, Monthly & Annual Pay | UtilityLab",
  description: "Convert your salary between hourly, weekly, monthly, and annual rates. Calculate your take-home pay based on working hours and weeks per year.",
  keywords: "salary calculator, paycheck converter, hourly to annual, monthly pay, income calculator",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
