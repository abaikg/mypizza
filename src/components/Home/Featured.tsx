"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import Image from "next/image";

export default function Featured() {
  const { products, loading } = useProducts();
  const { categories } = useCategories();

  // Пример отбора самых популярных/первых 3х (можно заменить на сортировку по isPopular)
  const featured = products
    .filter((p) => p.isPopular) // или по твоему флагу
    .slice(0, 3);

  if (loading) {
    return (
      <section className="max-w-[1400px] mx-auto w-full px-2 xs:px-4 sm:px-6 md:px-10 xl:px-20 mb-10 sm:mb-14">
        <h2 className="text-xl xs:text-2xl font-bold mb-8 flex items-center gap-2 text-gray-900">
          <span className="w-6 h-6 text-yellow-400">★</span>
          Популярное сегодня
        </h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm animate-pulse h-[330px]" />
          ))}
        </div>
      </section>
    );
  }

  if (!featured.length) return null;

  return (
    <section className="max-w-[1400px] mx-auto w-full px-2 xs:px-4 sm:px-6 md:px-10 xl:px-20 mb-10 sm:mb-14">
      <h2 className="text-xl xs:text-2xl font-bold mb-8 flex items-center gap-2 text-gray-900">
        <span className="w-6 h-6 text-yellow-400">★</span>
        Популярное сегодня
      </h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-8">
        {featured.map((product) => {
          // Типизация изображения продукта
          type ProductImage = string | { url: string };
          const getProductImageSrc = (image: ProductImage | ProductImage[] | undefined): string => {
            if (!image) return "";
            if (typeof image === "string") return image;
            if (Array.isArray(image) && image.length > 0 && typeof image[0] === "object" && "url" in image[0]) {
              return (image[0] as { url: string }).url;
            }
            return "";
          };

          // Цена из варианта (минимальная из product.variants)
          const minPrice =
            product.variants?.length > 0
              ? Math.min(...product.variants.map((v) => Number(v.price)))
              : Number(product.price);

          // Ссылка на страницу продукта или на категорию
          // Категория приходит как slug, поэтому просто используем его
          const catSlug = product.category;

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition flex flex-col items-center px-5 py-7"
            >
              <Image
                src={getProductImageSrc(product.image)}
                alt={product.name}
                width={208} // sm:w-52 = 208px
                height={208}
                className="w-40 h-40 sm:w-52 sm:h-52 object-contain mb-5"
              />
              <h3 className="font-bold text-lg text-gray-900 text-center mb-1">{product.name}</h3>
              <p className="text-gray-600 text-sm text-center mb-3 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between w-full mt-auto gap-2">
                <span className="font-bold text-xl text-pink-500">{minPrice} с</span>
                {/* Ссылка на страницу продукта */}
                <Link
                  href={catSlug ? `/menu/${catSlug}` : `/menu`}
                  className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-5 py-2 font-semibold text-sm flex items-center gap-1 transition"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Подробнее
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
