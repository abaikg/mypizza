// hooks/useProducts.ts
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import { adaptProduct } from "@/lib/adapters";
import { Product } from "@/types/product";

// Возвращает товары + loading
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // защита от setState после unmount
    const load = async () => {
      try {
        const raw = await getProducts();
        const adapted = raw.map(adaptProduct);
        if (isMounted) setProducts(adapted);
      } catch (err) {
        console.error("Ошибка загрузки товаров:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => { isMounted = false; };
  }, []);

  return { products, loading };
}
