import { CategoryList } from "@/components/category-list";

export const metadata = {
  title: "SEO & Content Strategy | UtilityLab",
  description: "Meta generators, keyword analysis, and sitemap creators for digital growth.",
};

export default function SEOToolsPage() {
  return (
    <CategoryList 
      categoryKey="seo-tools"
      title="SEO & Content Strategy"
      description="Meta generators, keyword analysis, and sitemap creators for digital growth."
      categoryName="SEO"
    />
  );
}
