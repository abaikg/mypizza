import { useState, useMemo } from "react";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { motion, AnimatePresence } from "framer-motion";
import ProductBadges from "@/components/Products/ProductBadges";

import {
  Product,
  OptionValue,
  ProductVariant,
  ProductOption,
} from "@/types/product";
import {
  getDefaultOptionValues,
  findVariant,
  isSameVariant,
} from "@/components/Products/helpers";

interface Props {
  product: Product;
  onClose: () => void;
}

// Проверяет, существует ли вариант при изменении одной опции
function isOptionValueAvailable(
  product: Product,
  optionIdx: number,
  testValue: OptionValue,
  selectedValues: OptionValue[]
): boolean {
  const testValues = [...selectedValues];
  testValues[optionIdx] = testValue;
  return !!findVariant(product.variants, testValues);
}

export default function ProductModal({ product, onClose }: Props) {
  const [selectedValues, setSelectedValues] = useState<OptionValue[]>(() =>
    getDefaultOptionValues(product)
  );
  const [quantity, setQuantity] = useState(1);

  const currentVariant = useMemo(
    () => findVariant(product.variants, selectedValues),
    [product.variants, selectedValues]
  );

  const cartItems = useCart((state) => state.items);
  const addItem = useCart((state) => state.addItem);

  const cartItem = useMemo(
    () =>
      cartItems.find(
        (item) =>
          item.product.id === product.id &&
          isSameVariant(selectedValues, item.variant as unknown as ProductVariant)
      ),
    [cartItems, product.id, selectedValues]
  );

  const handleOptionChange = (option: ProductOption, value: OptionValue) => {
    setSelectedValues((prev) =>
      prev.map((v, idx) => (product.options[idx].id === option.id ? value : v))
    );
  };

  const handleAdd = () => {
    if (!currentVariant) return;
    const options = product.options.reduce((acc, option, idx) => {
      acc[option.id] = selectedValues[idx]?.id;
      return acc;
    }, {} as Record<string, string>);
    addItem(product, options, quantity);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-xs sm:max-w-md relative shadow-2xl"
          initial={{ scale: 0.9, opacity: 0, y: 60 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 40 }}
          transition={{ duration: 0.22, type: "spring", bounce: 0.18 }}
        >
          <button
            className="absolute right-3 top-3 text-pink-400 hover:text-pink-600 text-2xl transition-colors"
            onClick={onClose}
            aria-label="Закрыть"
          >
            ×
          </button>

          <ProductBadges
            isPopular={product.isPopular}
            isNew={product.isNew}
            badges={product.badges}
          />

          <div className="font-bold text-2xl mb-1">{product.name}</div>
          <div className="text-gray-500 mb-3">{product.description}</div>

          <div className="w-full flex justify-center mb-4">
            <div className="relative w-full max-w-[180px] aspect-square bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden shadow">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-2"
                sizes="(max-width: 640px) 150px, (max-width: 768px) 180px, 220px"
                priority
              />
            </div>
          </div>

          {/* Опции */}
          {product.options.map((option, idx) => (
            <div key={option.id} className="mb-4">
              <div className="font-semibold mb-1 text-gray-700">{option.name}</div>
              <div className="flex gap-2 flex-wrap">
                {option.values.length > 0 ? (
                  option.values.map((val) => {
                    const isSelected = selectedValues[idx]?.id === val.id;
                    const isAvailable = isOptionValueAvailable(product, idx, val, selectedValues);
                    return (
                      <button
                        key={val.id}
                        className={`
                          px-3 py-1 rounded-xl border font-medium transition relative
                          ${isSelected ? "bg-pink-500 text-white border-pink-600" : ""}
                          ${
                            !isSelected && isAvailable
                              ? "bg-gray-100 text-gray-800 border-gray-200"
                              : ""
                          }
                          ${
                            !isAvailable
                              ? "bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed"
                              : ""
                          }
                        `}
                        onClick={() => isAvailable && handleOptionChange(option, val)}
                        type="button"
                        disabled={!isAvailable}
                        title={isAvailable ? "" : "Недоступно с текущими опциями"}
                      >
                        {val.value}
                      </button>
                    );
                  })
                ) : (
                  <span className="text-gray-400 text-xs">Нет значений</span>
                )}
              </div>
            </div>
          ))}

          {/* Количество */}
          <div className="flex items-center mt-4 gap-3">
            <span className="font-medium">Количество:</span>
            <button
              type="button"
              className="px-3 py-1 rounded-xl bg-pink-100 text-pink-600 font-bold text-lg hover:bg-pink-200 transition"
              onClick={() => setQuantity((qty) => Math.max(1, qty - 1))}
            >
              −
            </button>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-12 border rounded-xl px-2 py-1 text-center font-semibold text-pink-600 border-pink-200 focus:border-pink-400"
            />
            <button
              type="button"
              className="px-3 py-1 rounded-xl bg-pink-100 text-pink-600 font-bold text-lg hover:bg-pink-200 transition"
              onClick={() => setQuantity((qty) => qty + 1)}
            >
              +
            </button>
          </div>

          {/* Сообщение если вариант не найден */}
          {!currentVariant && (
            <div className="mt-4 text-sm text-red-500 font-medium text-center">
              Такой вариант товара недоступен. Пожалуйста, выберите другие опции.
            </div>
          )}

          {/* Кнопка добавления */}
          <motion.button
            className={`
              mt-7 w-full font-bold py-3 rounded-2xl transition
              focus:outline-none focus:ring-2
              ${
                currentVariant
                  ? "bg-pink-500 hover:bg-pink-600 text-white focus:ring-pink-400"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
              ${cartItem && currentVariant ? "border-2 border-green-400" : ""}
            `}
            onClick={currentVariant ? handleAdd : undefined}
            whileTap={currentVariant ? { scale: 1.08 } : undefined}
            disabled={!currentVariant}
          >
            {currentVariant
              ? cartItem
                ? "Уже в корзине! Добавить ещё"
                : `Добавить в корзину • ${(currentVariant?.price ?? product.price) * quantity} с`
              : "Выберите доступную комбинацию"}
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
