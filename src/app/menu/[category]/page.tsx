import { use } from "react";
import { notFound } from "next/navigation";
import CategoryPage from "@/components/Pages/CategoryPage";

export default function CategoryWrapper({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params); 

  if (!category) return notFound();

  return <CategoryPage category={category} />;
}
