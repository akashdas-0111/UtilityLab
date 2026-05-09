import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Age Calculator - Calculate Exact Age Instantly | UtilityLab",
  description: "Find your exact age in years, months, days, and even minutes. Calculate time between two dates for birthdays, anniversaries, and project milestones.",
  keywords: "age calculator, calculate age, birth date tool, time between dates, birthday calculator, chronological age, life milestones",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
