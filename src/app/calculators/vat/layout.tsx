import { Metadata } from "next";

export const metadata: Metadata = {
  title: "VAT Calculator - Add or Remove Value Added Tax | UtilityLab",
  description: "Calculate Value Added Tax (VAT) for any amount. Easily add VAT to a net price or remove it from a gross price with custom tax rates.",
  keywords: "VAT calculator, sales tax, value added tax, net to gross, gross to net, business tools",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
