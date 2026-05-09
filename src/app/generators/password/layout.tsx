import { Metadata } from "metadata";

export const metadata: Metadata = {
  title: "Password Generator - Secure & Random Passwords | UtilityLab",
  description: "Create strong, cryptographically secure passwords with our custom generator. Support for multiple character sets, length control, and password strength analysis.",
  keywords: "password generator, secure password, random password, strong password, cybersecurity tools, password manager",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
