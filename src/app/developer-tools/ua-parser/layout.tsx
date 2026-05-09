import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Agent Parser - Deep Device & Browser Insights | UtilityLab",
  description: "Decode any User Agent string instantly. Identify browsers, operating systems, hardware devices, and engines with our professional developer tool.",
  keywords: "user agent parser, ua parser, browser detection, os detection, device info, web developer tools, debugging tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
