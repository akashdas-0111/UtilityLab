import { CategoryList } from "@/components/category-list";

export const metadata = {
  title: "Developer Utilities | UtilityLab",
  description: "JSON, JWT, SQL, and system debuggers for professional engineering.",
};

export default function DeveloperToolsPage() {
  return (
    <CategoryList 
      categoryKey="developer-tools"
      title="Developer Utilities"
      description="JSON, JWT, SQL, and system debuggers for professional engineering."
      categoryName="Developer"
    />
  );
}
