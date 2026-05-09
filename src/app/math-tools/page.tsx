import { CategoryList } from "@/components/category-list";

export const metadata = {
  title: "Mathematical & Scientific Utilities | UtilityLab",
  description: "Algebra solvers, unit converters, statistics, and number theory tools.",
};

export default function MathToolsPage() {
  return (
    <CategoryList 
      categoryKey="math-tools"
      title="Mathematical & Scientific Utilities"
      description="Algebra solvers, unit converters, statistics, and number theory tools."
      categoryName="Math"
    />
  );
}
