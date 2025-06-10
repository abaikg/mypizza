"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { motion, AnimatePresence } from "framer-motion";
import CartSidebar from "../Cart/CartSidebar";
import { ShoppingCart, Home, Menu as MenuIcon, Phone, Truck } from "lucide-react";
import { cherryBomb } from "@/lib/font";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);
  const cartCount = useCart((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="fixed mb-20 top-0 left-0 w-full z-50 bg-[#f6f4dd] h-[60px] md:h-[70px] font-montserrat border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full px-3 sm:px-6 gap-1">
        {/* Логотип */}
        <Link href="/" className="flex items-center gap-2 shrink-0 select-none">
          <Image
            src="/cat-pizza.png"
            alt="Логотип"
            width={40}  // sm:w-10 = 40px
            height={40}
            className="w-8 h-8 sm:w-10 sm:h-10"
          />          <span
            className={`${cherryBomb.className} text-[1.65rem] sm:text-3xl font-bold italic text-pink-500 tracking-tight`}
            style={{ letterSpacing: "0.01em" }}
          >
            Three
          </span>
        </Link>

        {/* Desktop меню и корзина */}
        <nav className="hidden md:flex items-center gap-8 flex-1 justify-end">
          <NavLink href="/menu" icon={<MenuIcon className="w-5 h-5" />}>Меню</NavLink>
          <NavLink href="/contacts" icon={<Phone className="w-5 h-5" />}>Контакты</NavLink>
          <NavLink href="/delivery" icon={<Truck className="w-5 h-5" />}>Доставка</NavLink>
          <CartButton open={open} setOpen={setOpen} cartCount={cartCount} />
        </nav>

        {/* Мобильная корзина и бургер справа */}
        <div className="flex md:hidden items-center gap-1 sm:gap-2 ml-auto">
          <CartButton open={open} setOpen={setOpen} cartCount={cartCount} />
          <button
            className="ml-1 p-2 shrink-0 rounded-full hover:bg-pink-50 transition focus:outline-none focus:ring-2 focus:ring-pink-300"
            onClick={() => setMobileMenu((m) => !m)}
            aria-label="Открыть меню"
          >
            <MenuIcon className="w-7 h-7 text-pink-500" />
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed top-[60px] left-0 w-full bg-[#f6f4dd] border-b border-gray-200 z-40 md:hidden shadow-lg"
          >
            <nav className="flex flex-col gap-2 px-3 py-4">
              <MobileNavLink href="/" icon={<Home className="w-6 h-6" />} onClick={() => setMobileMenu(false)}>Главная</MobileNavLink>
              <MobileNavLink href="/menu" icon={<MenuIcon className="w-6 h-6" />} onClick={() => setMobileMenu(false)}>Меню</MobileNavLink>
              <MobileNavLink href="/contacts" icon={<Phone className="w-6 h-6" />} onClick={() => setMobileMenu(false)}>Контакты</MobileNavLink>
              <MobileNavLink href="/delivery" icon={<Truck className="w-6 h-6" />} onClick={() => setMobileMenu(false)}>Доставка</MobileNavLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Сайдбар корзины */}
      <CartSidebar open={open} onClose={() => setOpen(false)} />
    </header>
  );
}

// Кнопка корзины для переиспользования
function CartButton({ open, setOpen, cartCount }: { open: boolean, setOpen: (v: boolean) => void, cartCount: number }) {
  return (
    <motion.button
      className={`
        relative flex items-center justify-center shrink-0
        rounded-full text-black hover:text-pink-600 transition
        bg-white shadow border border-gray-200
        w-11 h-11 sm:w-12 sm:h-12
        focus:outline-none focus:ring-2 focus:ring-pink-300
      `}
      whileTap={{ scale: 1.09 }}
      onClick={() => setOpen(true)}
      aria-label="Открыть корзину"
    >
      <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7" />
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.span
            key={cartCount}
            initial={{ scale: 0, y: -8 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: -8 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.25 }}
            className="
              absolute -top-1.5 -right-1.5
              bg-pink-500 text-white text-xs font-bold
              rounded-full px-1.5 py-0.5 shadow
            "
          >
            {cartCount}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function NavLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1 font-medium text-black hover:text-pink-600 transition px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300"
    >
      {icon}
      <span className="hidden sm:inline">{children}</span>
    </Link>
  );
}

function MobileNavLink({ href, icon, children, onClick }: { href: string; icon: React.ReactNode; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 py-3 px-3 text-black bg-white rounded-2xl shadow hover:bg-pink-50 transition font-semibold text-lg active:scale-[0.98] select-none"
      onClick={onClick}
    >
      {icon}
      {children}
    </Link>
  );
}
