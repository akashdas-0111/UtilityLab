import type { Metadata } from "next";
import { Ubuntu, Ubuntu_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  variable: "--font-ubuntu",
  weight: ["300", "400", "500", "700"],
});

const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"],
  variable: "--font-ubuntu-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.utilitylabs.xyz"),
  title: "UtilityLabs | Professional Tools & Utilities",
  description: "A comprehensive suite of professional calculators, converters, and developer utilities for everyday tasks.",
  openGraph: {
    title: "UtilityLabs | Professional Tools & Utilities",
    description: "High-performance digital tools for developers and professionals.",
    url: "https://www.utilitylabs.xyz",
    siteName: "UtilityLabs",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${ubuntu.variable} ${ubuntuMono.variable} antialiased bg-gray-950 text-gray-100 min-h-screen flex flex-col`}
        style={{ fontFamily: 'var(--font-ubuntu)' }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
