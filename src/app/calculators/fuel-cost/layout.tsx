import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fuel Cost Calculator - Plan Your Trip Expenses | UtilityLab",
  description: "Estimate the fuel cost for your next road trip. Calculate gas expenses based on distance, fuel efficiency, and current fuel prices.",
  keywords: "fuel cost calculator, gas calculator, trip cost, fuel efficiency, road trip tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
