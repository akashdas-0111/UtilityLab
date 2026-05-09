import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bionic Reading Converter - Speed Read Any Text | UtilityLab",
  description: "Boost your reading speed and focus with our Bionic Reading converter. Automatically highlights the most important parts of words to guide your eyes through text effortlessly.",
  keywords: "bionic reading, speed reading tool, focus reading, dyslexia tools, reading guide, text accessibility, productivity tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
