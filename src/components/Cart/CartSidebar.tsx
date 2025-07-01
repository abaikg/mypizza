"use client";
import { useState, useEffect, useRef } from "react";
import { useCart } from "@/hooks/useCart";
import CartItemOptions from "@/components/Cart/CartItemOptions";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, XCircle, ShoppingBag, ShoppingCart, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { createOrderWithCart } from "@/lib/strapi-order";
import type { OrderItemInput } from "@/types/order";

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

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState<"qr" | "cash">("qr");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const successTimer = useRef<NodeJS.Timeout | null>(null);

  const total = items.reduce(
    (sum, item) => sum + Number(item.variant.price ?? item.product.price) * item.quantity,
    0
  );
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, onClose]);

  useEffect(() => {
    if (success) {
      successTimer.current = setTimeout(() => setSuccess(false), 7000);
      return () => {
        if (successTimer.current) clearTimeout(successTimer.current);
      };
    }
  }, [success]);

  useEffect(() => {
    if (!open) setSuccess(false);
  }, [open]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Введите имя";
    if (!phone.trim()) newErrors.phone = "Введите телефон";
    if (!address.trim()) newErrors.address = "Введите адрес";
    return newErrors;
  };

  const isFormInvalid = !name.trim() || !phone.trim() || !address.trim() || total < 500;

  // --- ВАЖНО! handleOrder — теперь nested create ---
  const handleOrder = async () => {
    setSubmitAttempted(true);
    setSuccess(false);
    setErrors({});
    const fieldErrors = validate();
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0 || total < 500) return;
    setLoading(true);
    try {
      // 1. Преобразуем корзину в формат OrderItemInput[]
      const order_items: OrderItemInput[] = items.map((item) => ({
        product: Number(item.product.id),
        quantity: item.quantity,
        price: Number(item.variant.price ?? item.product.price),
        options: item.optionsReadable,
      }));

      // 2. Формируем тело заказа (без order_items)
      const orderData = {
        customer_name: name,
        phone,
        address,
        payment_type: payment,
        total,
        order_status: "pending",
      };

      // 3. Создаём всё через единую функцию
      await createOrderWithCart(orderData, order_items);

      setSuccess(true);
      clear();
      setName("");
      setPhone("");
      setAddress("");
      setPayment("qr");
      setSubmitAttempted(false);
    } catch (err: any) {
      setErrors({
        submit: err?.message || "Не удалось отправить заказ. Попробуйте позже.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-[1.5px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.13 }}
            onClick={onClose}
          />
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
            <div className="
                flex items-center justify-between p-4 sm:p-5 border-b
                bg-white/80 backdrop-blur sticky top-0 z-10
                min-h-[60px]
              ">
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
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center justify-center mt-14 gap-3 text-center"
                  >
                    <CheckCircle2 className="w-16 h-16 text-pink-500 mb-4" />
                    <div className="text-xl font-bold text-pink-500 mb-2">
                      Спасибо за заказ!
                    </div>
                    <div className="text-gray-700 text-base font-semibold">
                      Ваш заказ принят и находится в обработке.
                    </div>
                    <div className="text-gray-500 text-sm mt-1">
                      Наш менеджер свяжется с вами в ближайшее время.
                    </div>
                  </motion.div>
                ) : items.length === 0 ? (
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
            {!success && (
              <div className="p-4 sm:p-5 border-t bg-white/90 backdrop-blur sticky bottom-0 z-10">
                {items.length > 0 && (
                  <>
                    <div className="space-y-3 mb-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Ваше имя"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={`w-full px-4 py-2 border rounded-xl text-sm outline-pink-400 ${submitAttempted && errors.name ? "border-red-400" : ""
                            }`}
                        />
                        {submitAttempted && errors.name && (
                          <div className="text-red-500 text-xs mt-1">{errors.name}</div>
                        )}
                      </div>
                      <div>
                        <input
                          type="tel"
                          placeholder="Телефон"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={`w-full px-4 py-2 border rounded-xl text-sm outline-pink-400 ${submitAttempted && errors.phone ? "border-red-400" : ""
                            }`}
                        />
                        {submitAttempted && errors.phone && (
                          <div className="text-red-500 text-xs mt-1">{errors.phone}</div>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Адрес доставки"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className={`w-full px-4 py-2 border rounded-xl text-sm outline-pink-400 ${submitAttempted && errors.address ? "border-red-400" : ""
                            }`}
                        />
                        {submitAttempted && errors.address && (
                          <div className="text-red-500 text-xs mt-1">{errors.address}</div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setPayment("qr")}
                          className={`flex-1 py-2 rounded-xl text-sm font-medium border ${payment === "qr"
                            ? "bg-pink-500 text-white border-pink-500"
                            : "bg-white text-gray-600"
                            }`}
                        >
                          QR-код
                        </button>
                        <button
                          type="button"
                          onClick={() => setPayment("cash")}
                          className={`flex-1 py-2 rounded-xl text-sm font-medium border ${payment === "cash"
                            ? "bg-pink-500 text-white border-pink-500"
                            : "bg-white text-gray-600"
                            }`}
                        >
                          Наличные
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                      <span>Всего товаров:</span>
                      <span>{totalQuantity}</span>
                    </div>
                  </>
                )}
                <div className="flex items-center justify-between mb-3">
                  <span>Итого:</span>
                  <span className="font-bold text-xl">{total} c</span>
                </div>
                {errors.submit && (
                  <div className="mb-2 text-center text-sm text-red-500">{errors.submit}</div>
                )}
                <button
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-full py-3 font-bold text-base transition disabled:opacity-70"
                  disabled={items.length === 0 || isFormInvalid || loading}
                  onClick={handleOrder}
                >
                  {loading ? "Отправка..." : "Оформить заказ"}
                </button>
                {submitAttempted && total < 500 && (
                  <div className="mt-2 text-sm text-red-500 text-center">
                    Минимальная сумма заказа — 500 сомов
                  </div>
                )}
                {items.length > 0 && (
                  <button
                    className="mt-2 text-xs text-gray-400 hover:text-pink-500 w-full flex items-center gap-1 justify-center"
                    onClick={clear}
                  >
                    <Trash2 className="w-4 h-4" /> Очистить корзину
                  </button>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
