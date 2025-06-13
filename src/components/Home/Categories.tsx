"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import Image from "next/image";

export default function Categories() {
  const { categories, loading } = useCategories();

  if (loading) {
    return (
      <div className="px-4 py-6 text-gray-500 text-center">Загрузка категорий...</div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="px-4 py-6 text-gray-400 text-center">Категории не найдены.</div>
    );
  }

  return (
    <section className="max-w-[1400px] mx-auto w-full px-2 xs:px-4 sm:px-6 md:px-10 xl:px-20 mt-2 mb-7 sm:mb-10">
      <h2 className="text-xl xs:text-2xl font-bold mb-5 sm:mb-6 text-gray-900 flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-pink-400" />
        Категории
      </h2>
      <div
        className="flex overflow-x-auto scrollbar-hide pb-3 gap-4 xs:gap-5 sm:gap-6 snap-x snap-mandatory"
        style={{ touchAction: "pan-x" }}
      >
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/menu/${cat.slug}`}
            className="shrink-0 flex flex-col items-center gap-2 snap-start select-none hover:scale-105 active:scale-95 transition-transform"
          >
            <div className="p-0.5 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 shadow-md">
              <div className="w-14 h-14 xs:w-16 xs:h-16 rounded-full bg-white flex items-center justify-center">
                <Image
                  src={cat.image || `/cat-${cat.slug}.png`}
                  alt={cat.name}
                  width={56}
                  height={56}
                  className="w-8 h-8 xs:w-10 xs:h-10 object-contain"
                />
              </div>
            </div>
            <span className="text-sm xs:text-base font-semibold text-gray-800 text-center truncate max-w-[90px]">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
