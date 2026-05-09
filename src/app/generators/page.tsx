import { CategoryList } from "@/components/category-list";

export const metadata = {
  title: "Random Data & Code Generators | UtilityLab",
  description: "Create secure passwords, QR codes, UUIDs, dummy text, and more instantly with our professional generators.",
};

export default function GeneratorsPage() {
  return (
    <CategoryList 
      categoryKey="generators"
      title="Professional Data & Code Generators"
      description="Create secure passwords, QR codes, UUIDs, dummy text, and more instantly with our professional generators."
      categoryName="Generators"
    />
  );
}
