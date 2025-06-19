"use client";

import Image from "next/image";
import Link from "next/link";
import { Carousel, Slide } from "../ui/Carousel";

type SlideData = {
  title: string;
  text: string;
  image: string;
  cta: string;
  href: string;
};

const slides: SlideData[] = [
  {
    title: "Скидка 20% на большие пиццы",
    text: "Закажи две и получи напиток в подарок",
    image: "/pizza.png",
    cta: "Выбрать пиццу",
    href: "/menu/pizza",
  },
  {
    title: "2+1 на роллы",
    text: "Самое время побаловать себя суши",
    image: "/cat-rolls.png",
    cta: "Заказать роллы",
    href: "/menu/rolls",
  },
  {
    title: "Бесплатная доставка от 500 c",
    text: "Собери корзину и сэкономь на доставке",
    image: "/mbank.png",
    cta: "К меню",
    href: "/menu",
  },
];

export default function Hero() {
  return (
    <section className="max-w-[1400px] mx-auto mt-20px px-3 xs:px-4 sm:px-6 md:px-10 xl:px-20">
      <Carousel className="rounded-3xl ">
        {slides.map((slide) => (
          <Slide key={slide.title} className="">
            <div
              className="
                relative w-full overflow-hidden
                flex flex-col-reverse lg:flex-row
                items-start lg:items-center
                gap-6 lg:gap-10 pl-3 xs:pl-4 sm:pl-6 md:pl-10 xl:pl-20
                pt-6 xs:pt-8 sm:pt-12 md:pt-24
                pb-6 xs:pb-8 sm:pb-12
                text-left lg:text-left
              "
            >
              <div className="flex-1 w-full flex flex-col items-start px-3">
                <h1
                  className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 xs:mb-4 sm:mb-6 text-pink-500 leading-tight w-full max-w-[450px]"
                >
                  {slide.title}
                </h1>
                <p className="mb-5 text-gray-700 text-sm xs:text-base w-full max-w-[420px]">{slide.text}</p>
                <Link
                  href={slide.href}
                  className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 xs:px-8 py-2.5 xs:py-3 rounded-full shadow-lg transition text-base xs:text-lg mt-2"
                >
                  {slide.cta}
                </Link>
              </div>
              <div className="flex-1 w-full flex items-center justify-center mb-4 xs:mb-0 px-3">
                <Image
                  src={slide.image}
                  alt=""
                  width={420}
                  height={420}
                  priority
                  className="w-52 xs:w-60 sm:w-72 md:w-80 lg:w-[340px] xl:w-[420px] mt-9 sm:mt-8 mb-4 max-w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </Slide>
        ))}
      </Carousel>
    </section>
  );
}
