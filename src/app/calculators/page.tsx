import { CategoryList } from "@/components/category-list";

export const metadata = {
  title: "Financial & Daily Calculators | UtilityLab",
  description: "SIP, EMI, Tax, and investment tools for precise financial planning.",
};

export default function CalculatorsPage() {
  return (
    <CategoryList 
      categoryKey="calculators"
      title="Financial & Daily Calculators"
      description="SIP, EMI, Tax, and investment tools for precise financial planning."
      categoryName="Calculators"
    />
  );
}
