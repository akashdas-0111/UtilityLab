import { Metadata } from "next";

export const metadata: Metadata = {
  title: "IP Lookup - Precise Geolocation & Network Info | UtilityLab",
  description: "Find the geographic location, ISP, and network details for any IP address instantly. Discover your own public IP and network information with one click.",
  keywords: "ip lookup, what is my ip, ip geolocation, network tool, isp finder, ip address tracker, developer tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
