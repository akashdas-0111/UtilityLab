import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Age Calculator - Find Exact Age & Next Birthday | UtilityLab",
  description: "Determine your exact age in years, months, days, hours, and minutes. Calculate the time until your next birthday and see fun facts about your age.",
  keywords: "age calculator, chronological age, birthday countdown, how old am i, date calculator",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
