"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useCategories } from "@/hooks/useCategories";
import Image from "next/image";

export default function CategoryNav() {
  const pathname = usePathname();
  const { categories, loading } = useCategories();

  const navItems = [
    { label: "Все", icon: "/cat-full.png", href: "/menu" },
    ...categories.map((cat) => ({
      label: cat.name,
      icon: cat.image || `/cat-${cat.slug}.png`,
      href: `/menu/${cat.slug}`,
      slug: cat.slug,
    })),
  ];

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
        {loading
          ? // 👉 Скелетон — 6 фейковых элементов
            Array.from({ length: 6 }).map((_, i) => (
              <li key={`skeleton-${i}`}>
                <div
                  className={clsx(
                    "shrink-0 inline-flex items-center gap-2 px-3 sm:px-6 py-2 rounded-full",
                    "bg-white text-gray-300 border border-gray-200 animate-pulse",
                    "w-[120px] h-[42px] sm:h-[48px]"
                  )}
                >
                  <div className="w-6 h-6 bg-gray-200 rounded-full" />
                  <span className="w-16 h-4 bg-gray-200 rounded" />
                </div>
              </li>
            ))
          : navItems.map((cat) => {
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
                      width={28}
                      height={28}
                      className="w-6 h-6 md:w-7 md:h-7 object-contain"
                    />
                    <span className="truncate">{cat.label}</span>

                    {isActive && (
                      <span className="ml-2 w-2 h-2 bg-white border border-pink-400 rounded-full hidden md:inline-block shadow transition-all duration-300" />
                    )}
                  </Link>
                </li>
              );
            })}
      </ul>

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
