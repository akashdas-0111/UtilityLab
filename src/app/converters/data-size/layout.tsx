import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Size Converter - Bytes, MB, GB & TB | UtilityLab",
  description: "Convert digital storage sizes between bytes, kilobytes, megabytes, gigabytes, and more. Support for both standard (1000) and binary (1024) conversion bases.",
  keywords: "data converter, mb to gb, bytes to mb, storage calculator, binary data size, digital unit converter",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
