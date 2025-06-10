import { useEffect, useState } from "react";
import { getCategories } from "@/lib/api";
import { adaptCategory } from "@/lib/adapters";
import { Category } from "@/types/product";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await getCategories();
        const adapted = raw.map(adaptCategory);
        setCategories(adapted);
      } catch (err) {
        console.error("Ошибка загрузки категорий:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { categories, loading };
}
