"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="
        w-full
        flex flex-col-reverse lg:flex-row
        items-start
        gap-6 lg:gap-10
        pt-6 xs:pt-8 sm:pt-12 md:pt-24
        pb-6 xs:pb-8 sm:pb-12
        px-3 xs:px-4 sm:px-6 md:px-10 xl:px-20
        max-w-[1400px] mx-auto
        text-left lg:text-left
      "
    >
      {/* TEXT BLOCK */}
      <div className="flex-1 w-full flex flex-col items-start">
        <h1
          className="
            text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold
            mb-2 xs:mb-4 sm:mb-6 text-pink-500 leading-tight
            w-full max-w-[420px]
            text-left
          "
        >
          Вкуснейшая доставка{" "}
          <span className="text-black font-bold">до двери</span>
        </h1>

        <p className="mb-4 xs:mb-6 text-base xs:text-lg text-gray-500 w-full max-w-[420px] text-left">
          Пицца, роллы, десерты и напитки
        </p>

        <p className="mb-5 text-gray-700 text-sm xs:text-base w-full max-w-[420px] text-left">
          Готовим быстро, доставляем с заботой, работаем каждый день.
        </p>

        <Link
          href="/menu"
          className="
            inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold
            px-6 xs:px-8 py-2.5 xs:py-3 rounded-full shadow transition
            text-base xs:text-lg mt-2
            text-left
          "
        >
          Посмотреть меню
        </Link>
      </div>

      {/* IMAGE BLOCK */}
      <div className="flex-1 w-full flex items-center justify-center mb-4 xs:mb-0">
        <Image
          src="/pizza.png"
          alt="Пицца"
          width={420}
          height={420}
          priority
          className="w-52 xs:w-60 sm:w-72 md:w-80 lg:w-[340px] xl:w-[420px] mt-9 sm:mt-8 mb-4 max-w-full h-auto object-contain drop-shadow-2xl"
        />
      </div>
    </section>
  );
}
