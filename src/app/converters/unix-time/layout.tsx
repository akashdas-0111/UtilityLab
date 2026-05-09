import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter - Epoch Time Tool | UtilityLab",
  description: "Convert Unix timestamps to human-readable dates and vice versa. Support for milliseconds, seconds, and multiple time zones. Real-time live clock included.",
  keywords: "unix timestamp, epoch time, date to unix, unix to date, time converter, developer tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
