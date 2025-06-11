"use client";

import { useCart } from "@/hooks/useCart";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Plus,
  Minus,
  XCircle,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import { useEffect } from "react";
import CartItemOptions from "@/components/Cart/CartItemOptions";
import Image from "next/image";

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function CartSidebar({ open, onClose }: CartSidebarProps) {
  const items = useCart((state) => state.items);
  const removeItem = useCart((state) => state.removeItem);
  const increment = useCart((state) => state.incrementItem);
  const decrement = useCart((state) => state.decrementItem);
  const clear = useCart((state) => state.clearCart);

  const total = items.reduce(
    (sum, item) => sum + Number(item.variant.price ?? item.product.price) * item.quantity,
    0
  );

  // Закрытие по Esc
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, onClose]);

  // Функция для отправки заказа в WhatsApp
  const sendOrderToWhatsApp = () => {
    const phone = "996779715638"; // Твой номер без "+"
    const message = encodeURIComponent(
      `🛒 Новый заказ:\n\n` +
        items
          .map(
            (item) =>
              `${item.product.name} x${item.quantity} (${Number(item.variant.price ?? item.product.price)} c)` +
              (item.options && Object.values(item.options).length
                ? ` [${Object.values(item.options).join(", ")}]`
                : "")
          )
          .join("\n") +
        `\n\nИтого: ${total} c`
    );
    const waUrl = `https://wa.me/${phone}?text=${message}`;
    window.open(waUrl, "_blank");
    clear();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-[1.5px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.13 }}
            onClick={onClose}
          />
          {/* Cart sidebar */}
          <motion.aside
            className="
              fixed right-0 top-0 h-full bg-white z-50 shadow-2xl flex flex-col
              w-full max-w-[95vw] sm:max-w-[430px] md:max-w-md
              rounded-none md:rounded-l-2xl
              transition-all font-montserrat
            "
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.14, ease: "circOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="
                flex items-center justify-between p-4 sm:p-5 border-b
                bg-white/80 backdrop-blur sticky top-0 z-10
                min-h-[60px]
              "
            >
              <div className="flex items-center gap-2 font-bold text-xl sm:text-2xl">
                <ShoppingBag className="w-7 h-7 text-pink-500" /> Корзина
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-pink-500 text-3xl transition"
                aria-label="Закрыть"
              >
                <XCircle className="w-8 h-8" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5 flex-1 overflow-y-auto">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    key="empty"
                    className="flex flex-col items-center justify-center mt-12 gap-3"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.18 }}
                  >
                    <ShoppingCart className="w-16 h-16 text-gray-200 mb-4" />
                    <div className="text-gray-400 text-center text-base sm:text-lg font-semibold">
                      Корзина пуста
                    </div>
                  </motion.div>
                ) : (
                  <ul className="space-y-5">
                    {items.map((item) => (
                      <motion.li
                        layout
                        key={item.id}
                        initial={{ opacity: 0, y: 30, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 340,
                          damping: 22,
                          mass: 0.9,
                        }}
                        className="flex gap-3 sm:gap-4 border-b pb-4 last:border-none last:pb-0 group"
                      >
                        {/* КРАСИВЫЙ КВАДРАТНЫЙ БЛОК ПОД КАРТИНКУ */}
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 shadow">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                            quality={80}
                          />
                        </div>

                        {/* Основной контент */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="font-semibold text-base">
                              {item.product.name}
                            </div>
                            <CartItemOptions
                              product={item.product}
                              variant={item.variant}
                              options={item.options}
                            />
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              className="px-2 py-1 bg-pink-100 text-pink-600 rounded-xl hover:bg-pink-200 transition"
                              onClick={() => decrement(item.id)}
                              aria-label="Уменьшить количество"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold text-pink-600 select-none">
                              {item.quantity}
                            </span>
                            <button
                              className="px-2 py-1 bg-pink-100 text-pink-600 rounded-xl hover:bg-pink-200 transition"
                              onClick={() => increment(item.id)}
                              aria-label="Увеличить количество"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                          <div className="font-bold text-base">
                            {Number(item.variant.price ?? item.product.price) * item.quantity} c
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-xs text-red-400 hover:text-red-600 mt-2 transition flex items-center gap-1 group-hover:scale-110"
                            aria-label="Удалить товар"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-5 border-t bg-white/90 backdrop-blur sticky bottom-0 z-10">
              <div className="flex items-center justify-between mb-3">
                <span>Итого:</span>
                <span className="font-bold text-xl">{total} c</span>
              </div>
              <button
                className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-full py-3 font-bold text-base transition disabled:opacity-70"
                disabled={items.length === 0}
                onClick={sendOrderToWhatsApp}
              >
                Оформить заказ
              </button>
              {items.length > 0 && (
                <button
                  className="mt-2 text-xs text-gray-400 hover:text-pink-500 w-full flex items-center gap-1 justify-center"
                  onClick={clear}
                >
                  <Trash2 className="w-4 h-4" /> Очистить корзину
                </button>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
