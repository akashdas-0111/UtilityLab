import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Number Generator - Fair & Secure Randomization | UtilityLab",
  description: "Generate truly random numbers for giveaways, research, or gaming. Set custom ranges, generate bulk lists, and ensure unique results with our professional tool.",
  keywords: "random number generator, pick a number, randomizer, bulk random numbers, unique random list, fair random, gaming tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
