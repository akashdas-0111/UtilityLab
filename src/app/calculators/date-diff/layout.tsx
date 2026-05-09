import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Date Difference Calculator - Days Between Dates | UtilityLab",
  description: "Calculate the exact number of days, weeks, months, and years between two dates. Ideal for project planning, event tracking, and personal milestones.",
  keywords: "date calculator, days between dates, time difference, date duration, calendar tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
