import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retirement Planner - Calculate Your Nest Egg | UtilityLab",
  description: "Plan your retirement with our comprehensive calculator. Estimate how much you need to save to maintain your lifestyle and see if your current plan is on track.",
  keywords: "retirement planner, pension calculator, nest egg, financial independence, FIRE calculator, wealth growth",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
