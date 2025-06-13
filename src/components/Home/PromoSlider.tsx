"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Gift } from "lucide-react";

const promotions = [
  {
    title: "Скидка 20% на все пиццы",
    description: "Только до конца месяца",
    image: "/EPNDN5Z7pJqFluBKR5CiYN6BCk.avif",
  },
  {
    title: "Два ролла по цене одного",
    description: "С понедельника по среду",
    image: "/GrMb28ZBimSdmMOxXPl9kD2dlE.avif",
  },
  {
    title: "Бесплатная доставка от 1000 с",
    description: "При онлайн‑оплате",
    image: "/vtNegrYfppnZJV5SpQd607Hls8.avif",
  },
];

export default function PromoSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % promotions.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () =>
    setIndex((prev) => (prev - 1 + promotions.length) % promotions.length);
  const next = () => setIndex((prev) => (prev + 1) % promotions.length);

  return (
    <section className="max-w-[1400px] mx-auto w-full px-2 xs:px-4 sm:px-6 md:px-10 xl:px-20 my-8">
      <h2 className="text-xl xs:text-2xl font-bold mb-5 sm:mb-6 text-gray-900 flex items-center gap-2">
        <Gift className="w-6 h-6 text-pink-400" /> Акции
      </h2>
      <div className="relative">
        <div className="overflow-hidden rounded-2xl shadow">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="relative h-52 sm:h-64 md:h-72 lg:h-80"
            >
              <Image
                src={promotions[index].image}
                alt={promotions[index].title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow mb-2">
                  {promotions[index].title}
                </h3>
                <p className="text-white text-sm sm:text-base drop-shadow">
                  {promotions[index].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white text-gray-700 rounded-full p-1 backdrop-blur"
          aria-label="Предыдущий слайд"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white text-gray-700 rounded-full p-1 backdrop-blur"
          aria-label="Следующий слайд"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      <div className="flex justify-center gap-2 mt-3">
        {promotions.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-colors ${i === index ? "bg-pink-500" : "bg-gray-300"}`}
            aria-label={`Слайд ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
