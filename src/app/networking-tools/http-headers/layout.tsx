import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTTP Header Checker - Inspect Web Server Responses | UtilityLab",
  description: "Analyze the HTTP headers of any website instantly. View security headers, server info, caching policies, and more for optimized web development.",
  keywords: "http header checker, inspect headers, website headers, security headers, server info, web developer tools, networking tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
