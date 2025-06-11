import CategoryPage from "@/components/Pages/CategoryPage";
import { notFound } from "next/navigation";

export default function CategoryWrapper({
  params,
}: {
  params: { category: string };
}) {
  if (!params?.category) return notFound();

  return <CategoryPage category={params.category} />;
}
