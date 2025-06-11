import CategoryPage from "@/components/Pages/CategoryPage";
import { notFound } from "next/navigation";

interface Props {
  params: { category: string };
}

export default function CategoryWrapper({ params }: Props) {
  if (!params?.category) return notFound();
  return <CategoryPage category={params.category} />;
}
