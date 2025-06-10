"use client";

import { useState } from "react";
import ProductCard from "@/components/Products/ProductCard";
import CategoryNav from "@/components/Categories/CategoryNav";
import ProductModal from "@/components/Products/ProductModal";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/product";

export default function MenuPage() {
  const { categories, loading: loadingCategories } = useCategories();
  const { products, loading: loadingProducts } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Loader
  if (loadingCategories || loadingProducts) {
    return <div className="px-4 py-10 text-lg">Загрузка меню...</div>;
  }

  if (!categories.length || !products.length) {
    return <div className="px-4 py-10 text-lg">Нет товаров или категорий</div>;
  }

  return (
    <div className="bg-[#f6f4dd] min-h-screen">
      {/* Категории */}
      <div className="sticky top-[59px] left-0 w-full z-30 bg-[#f6f4dd]">
        <CategoryNav />
      </div>

      <div className="pt-[60px] mx-auto px-2 sm:px-4 md:px-8 py-8 max-w-7xl">
        {categories.map((category) => {
          // Фильтрация: зависит, что кладёшь в Product.category (id или slug)
          const filtered = products.filter(
            (p) => p.category === category.slug || p.category === category.id
          );
          if (!filtered.length) return null;

          return (
            <section key={category.id} className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{category.name}</h2>
              <div
                className="
                  grid 
                  grid-cols-2
                  md:grid-cols-3
                  lg:grid-cols-4
                  gap-4 sm:gap-6 lg:gap-8
                "
              >
                {filtered.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </div>
  );
}
