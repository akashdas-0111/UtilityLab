import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Time Zone Converter - Global Clock & Meeting Planner | UtilityLab",
  description: "Convert time between multiple global time zones instantly. Plan international meetings and stay synced with teams across the world. Real-time updates and UTC offsets.",
  keywords: "time zone converter, world clock, meeting planner, utc offset, timezone sync, global time, travel tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
