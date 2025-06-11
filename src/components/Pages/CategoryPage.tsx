"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/Products/ProductCard";
import ProductModal from "@/components/Products/ProductModal";
import CategoryNav from "@/components/Categories/CategoryNav";
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
    return products.filter((p) => String(p.category) === String(cat.id));
  }, [products, cat]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (loadingCategories || loadingProducts) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-pink-400 mb-4" />
        <div className="text-center text-gray-400 text-lg">Загрузка...</div>
      </div>
    );
  }

  if (!cat) return null;

  return (
    <div className="container mx-auto px-2 py-2 max-w-7xl">
      <CategoryNav />

      <motion.h1
        className="text-3xl font-extrabold mb-6 tracking-tight text-gray-900"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {cat.name}
      </motion.h1>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-14 mb-16">
          <span className="text-6xl mb-4">🛒</span>
          <div className="text-lg text-gray-400 font-semibold">
            В этой категории пока нет товаров
          </div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.1 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
