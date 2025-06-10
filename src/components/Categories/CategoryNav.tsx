"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useCategories } from "@/hooks/useCategories";
import Image from "next/image";

export default function CategoryNav() {
  const pathname = usePathname();
  const { categories, loading } = useCategories();

  // Массив категорий с "Все"
  const navItems = [
    { label: "Все", icon: "/cat-full.png", href: "/menu" },
    ...categories.map((cat) => ({
      label: cat.name,
      icon: cat.image || `/cat-${cat.slug}.png`,
      href: `/menu/${cat.slug}`,
      slug: cat.slug,
    })),
  ];

  if (loading) {
    return <div className="px-4 py-2 text-gray-400">Загрузка категорий...</div>;
  }

  return (
    <nav
      className={`
        w-full sticky bg-[#f6f4dd] top-[59px] z-40
        font-montserrat px-2 sm:px-4 py-3 sm:py-4
       
      `}
      aria-label="Категории меню"
    >
      <ul
        className={`
          flex flex-nowrap overflow-x-auto hide-scrollbar
          gap-2 sm:gap-3 md:gap-4 items-stretch
          lg:justify-center
        `}
      >
        {navItems.map((cat) => {
          // Определение активной категории
          const isActive =
            cat.href === "/menu"
              ? pathname === "/menu"
              : pathname === cat.href || pathname.startsWith(cat.href + "/");

          return (
            <li key={cat.label}>
              <Link
                href={cat.href}
                scroll={false}
                className={clsx(
                  "shrink-0 inline-flex items-center gap-2 px-3 sm:px-6 py-2 rounded-full transition-all duration-150",
                  "whitespace-nowrap select-none text-[15px] sm:text-base md:text-lg font-medium",
                  isActive
                    ? "bg-pink-500 text-white shadow font-semibold ring-2 ring-pink-400"
                    : "bg-white text-gray-700 border-none hover:bg-pink-100",
                  "outline-none border-none focus-visible:ring-2 focus-visible:ring-pink-300"
                )}
                tabIndex={0}
                aria-current={isActive ? "page" : undefined}
              >
                <Image
                  src={cat.icon}
                  alt={cat.label}
                  width={28} // md:w-7 = 28px
                  height={28}
                  className="w-6 h-6 md:w-7 md:h-7 object-contain"
                />                <span className="truncate">{cat.label}</span>
                {/* Анимированная точка-индикатор для активной */}
                {isActive && (
                  <span className="ml-2 w-2 h-2 bg-white border border-pink-400 rounded-full hidden md:inline-block shadow transition-all duration-300" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
      {/* Скрываем scrollbar на всех устройствах */}
      <style jsx global>{`
        .hide-scrollbar {
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </nav>
  );
}
