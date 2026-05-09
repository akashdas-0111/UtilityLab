import { CategoryList } from "@/components/category-list";

export const metadata = {
  title: "Image & Visual Utilities | UtilityLab",
  description: "Professional-grade cropping, resizing, and color extraction tools.",
};

export default function ImageToolsPage() {
  return (
    <CategoryList 
      categoryKey="image-tools"
      title="Image & Visual Utilities"
      description="Professional-grade cropping, resizing, and color extraction tools."
      categoryName="Image"
    />
  );
}
