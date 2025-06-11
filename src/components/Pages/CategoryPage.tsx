"use client";

import { useState, useMemo } from "react";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/Products/ProductCard";
import ProductModal from "@/components/Products/ProductModal";
import CategoryNav from "@/components/Categories/CategoryNav";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import type { Product } from "@/types/product";

interface Props {
  category: string;
}

export default function CategoryPage({ category }: Props) {
  const { categories, loading: loadingCategories } = useCategories();
  const { products, loading: loadingProducts } = useProducts();

  const cat = useMemo(
    () => categories.find((c) => c.slug === category),
    [categories, category]
  );

  const filtered = useMemo(() => {
    if (!cat) return [];
    return products.filter((p) => String(p.category) === String(cat.slug) || String(p.category) === String(cat.id));
  }, [products, cat]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const isLoading = loadingCategories || loadingProducts;

  return (
    <div className="container mx-auto px-2 py-10 max-w-7xl">
      <CategoryNav />
      <h1 className="pt-[60px] text-2xl font-extrabold mb-6 tracking-tight text-gray-900">
        {cat?.name}
      </h1>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {Array.from({ length: 8 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <span className="text-6xl mb-4">🛒</span>
          <div className="text-lg text-gray-400 font-semibold text-center">
            В этой категории пока нет товаров
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
