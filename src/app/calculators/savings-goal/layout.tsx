import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Savings Goal Calculator - Plan for Your Dreams | UtilityLab",
  description: "Calculate how much you need to save each month to reach your financial goals. Whether it's a new car, a house, or a vacation, we help you plan your savings strategy.",
  keywords: "savings goal, goal calculator, financial planning, save money, deposit calculator, wealth building",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
