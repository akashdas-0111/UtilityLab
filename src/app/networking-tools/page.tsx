import { CategoryList } from "@/components/category-list";

export const metadata = {
  title: "Network Diagnostics | UtilityLab",
  description: "IP lookup, header checking, and connectivity audit tools.",
};

export default function NetworkingToolsPage() {
  return (
    <CategoryList 
      categoryKey="networking-tools"
      title="Network Diagnostics"
      description="IP lookup, header checking, and connectivity audit tools."
      categoryName="Networking"
    />
  );
}
