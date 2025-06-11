import { notFound } from "next/navigation";
import CategoryPage from "@/components/Pages/CategoryPage"; // 👈 создадим клиентский

interface CategoryWrapperProps {
  params: { category: string };
}

export default function CategoryWrapper({ params }: CategoryWrapperProps) {
  const { category } = params;

  if (!category) return notFound();

  return <CategoryPage category={category} />;
}
