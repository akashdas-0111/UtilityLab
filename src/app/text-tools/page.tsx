import { CategoryList } from "@/components/category-list";

export const metadata = {
  title: "Text & Content Mastery | UtilityLab",
  description: "Manipulate strings, generate placeholder content, and clean data.",
};

export default function TextToolsPage() {
  return (
    <CategoryList 
      categoryKey="text-tools"
      title="Text & Content Mastery"
      description="Manipulate strings, generate placeholder content, and clean data."
      categoryName="Text"
    />
  );
}
