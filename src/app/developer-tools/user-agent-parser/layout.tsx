import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Agent Parser - Detect Browser & Device Info | UtilityLab",
  description: "Decode any User Agent string to reveal browser, operating system, device model, and engine details instantly. Detect your current system info with one click.",
  keywords: "user agent parser, browser detector, os detector, device detection, ua decoder, web developer tools, client info",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
