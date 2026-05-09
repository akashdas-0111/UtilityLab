import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calories Burned Calculator - Estimate Exercise Energy | UtilityLab",
  description: "Calculate calories burned during various physical activities based on your weight and duration. Compare different exercises to optimize your fitness routine.",
  keywords: "calories burned, exercise calculator, weight loss tools, fitness tracker, MET values",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
