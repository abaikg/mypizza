import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import { CheckCircle } from "lucide-react";
import ProductModal from "./ProductModal";
import ProductBadges from "./ProductBadges";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  product: Product;
  onClick?: () => void;
}

export default function ProductCard({ product }: Props) {
  const cartItems = useCart((state) => state.items);
  const [modalOpen, setModalOpen] = useState(false);
  const hasAny = cartItems.some((item) => item.product.id === product.id);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(236,72,153,0.10)" }}
        whileTap={{ scale: 0.99 }}
        className={`
          relative group
          bg-white rounded-2xl shadow transition-shadow duration-200
          flex flex-col px-3 pt-3 pb-4 min-h-[360px]
          cursor-pointer border border-transparent
          focus:outline-none focus:ring-2 focus:ring-pink-400
          select-none overflow-hidden
          ${hasAny ? "border-green-400 shadow-green-100" : "border-gray-100"}
        `}
        onClick={() => setModalOpen(true)}
        tabIndex={0}
        role="button"
        aria-label={`Открыть ${product.name}`}
      >
        {/* Верхний блок: бейджи и чекбокс */}
        <div className="flex items-center justify-between w-full mb-2">
          <ProductBadges
            isPopular={product.isPopular}
            isNew={product.isNew}
            badges={product.badges}
          />
          {hasAny && (
            <motion.span
              className="ml-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <CheckCircle className="w-6 h-6 text-green-500 drop-shadow" />
            </motion.span>
          )}
        </div>
        {/* Картинка товара */}
        <div className="w-full aspect-square relative mb-2 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-2 transition-transform duration-200 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 25vw"
            priority
          />
        </div>
        {/* Контент */}
        <div className="w-full flex-1 flex flex-col items-start mt-1">
          <div className="font-bold text-base text-gray-900 mb-0.5 w-full truncate text-left">
            {product.name}
          </div>
          {product.price && (
            <div className="text-pink-500 font-bold text-[17px] mb-1">
              {product.price} c
            </div>
          )}
          <div className="text-gray-500 text-sm mb-4 line-clamp-2 w-full text-left">
            {product.description}
          </div>
        </div>
        {/* Кнопка В корзину — прибита к низу, но с отступом */}
        <motion.button
          className={`
            w-full bg-pink-500 hover:bg-pink-600 text-white rounded-xl px-4 py-2 font-semibold text-sm shadow transition
            focus:outline-none focus:ring-2 focus:ring-pink-400
            mt-auto
            ${hasAny ? "border border-green-400" : ""}
          `}
          tabIndex={0}
          onClick={e => {
            e.stopPropagation();
            setModalOpen(true); // или сразу addItem, если хочешь быстрый add
          }}
        >
          {hasAny ? "Добавить ещё" : "В корзину"}
        </motion.button>
      </motion.div>

      {/* Модальное окно товара */}
      <AnimatePresence>
        {modalOpen && (
          <ProductModal product={product} onClose={() => setModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
