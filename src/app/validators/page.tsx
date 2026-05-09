import { CategoryList } from "@/components/category-list";

export const metadata = {
  title: "Diagnostic & Validation Tools | UtilityLab",
  description: "Ensure the integrity and correctness of your data, code, and configurations.",
};

export default function ValidatorsPage() {
  return (
    <CategoryList 
      categoryKey="validators"
      title="Diagnostic & Validation Tools"
      description="Ensure the integrity and correctness of your data, code, and configurations."
      categoryName="Validators"
    />
  );
}
