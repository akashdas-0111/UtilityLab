import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dummy Image Generator | Batch Export, SVG, PNG | UtilityLabs",
  description: "Create customizable placeholder dummy images instantly. Support for gradients, exact dimensions, text overlays, bulk generation, and fast SVG/PNG exports.",
};

export default function DummyImageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
