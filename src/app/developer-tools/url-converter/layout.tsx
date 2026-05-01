import { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Encoder & Decoder | Smart URL Parser & Debugger | UtilityLabs",
  description: "Safely encode and decode URL parameters. Features smart URL breakdown, query parameter editor, and normalization for UTM/tracking removal.",
};

export default function UrlConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
