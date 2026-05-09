import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cron Parser - Human Readable Cron Expressions | UtilityLab",
  description: "Decode any cron expression into plain English and calculate the next execution times. Perfect for debugging scheduled tasks and cloud functions.",
  keywords: "cron parser, cron expression builder, human readable cron, cron scheduler, next execution time, developer tools, serverless tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
