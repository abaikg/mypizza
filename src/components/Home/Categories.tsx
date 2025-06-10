"use client";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { categories } from "@/lib/mockData";
import Image from "next/image";

export default function Categories() {
  return (
    <section className="max-w-[1400px] mx-auto w-full px-2 xs:px-4 sm:px-6 md:px-10 xl:px-20 mt-2 mb-7 sm:mb-10">
      <h2 className="text-xl xs:text-2xl font-bold mb-5 sm:mb-6 text-gray-900 flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-pink-400" />
        Категории
      </h2>
      <div
        className="
          flex overflow-x-auto scrollbar-hide pb-2
          gap-2 xs:gap-3 sm:gap-4 md:gap-6
          snap-x snap-mandatory
        "
        style={{ touchAction: "pan-x" }}
      >
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/menu/${cat.slug}`}
            className="
              shrink-0 bg-white rounded-2xl 
              px-4 xs:px-5 py-3 xs:py-4 flex flex-col items-center 
              gap-1 xs:gap-2 shadow-sm hover:shadow-md
              hover:bg-pink-50 transition
              min-w-[92px] xs:min-w-[110px] sm:min-w-[124px] max-w-[140px]
              snap-start select-none
              hover:scale-[1.04] active:scale-[0.97] transition-transform
            "
          >
            <Image
              src={`/cat-${cat.slug}.png`}
              alt={cat.name}
              width={56} // sm:w-14 = 56px
              height={56}
              className="w-10 h-10 xs:w-12 sm:w-14 xs:h-14 object-contain"
            />            <span className="text-xs xs:text-base font-semibold text-gray-900 text-center truncate max-w-[90px]">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
