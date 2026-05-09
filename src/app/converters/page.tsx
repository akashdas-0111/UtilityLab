import { CategoryList } from "@/components/category-list";

export const metadata = {
  title: "Universal Format Converters | UtilityLab",
  description: "Seamlessly switch between data types, units, and media formats.",
};

export default function ConvertersPage() {
  return (
    <CategoryList 
      categoryKey="converters"
      title="Universal Format Converters"
      description="Seamlessly switch between data types, units, and media formats."
      categoryName="Converters"
    />
  );
}
