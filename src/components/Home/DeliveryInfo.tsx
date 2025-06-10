"use client";
import { MapPin, Truck, Phone } from "lucide-react";
import Link from "next/link";

export default function DeliveryInfo() {
  return (
    <section className="max-w-[1400px] mx-auto w-full px-2 xs:px-4 sm:px-6 md:px-10 xl:px-20 mb-10 sm:mb-14">
      <div className="bg-white rounded-2xl shadow p-4 xs:p-7 flex flex-col md:flex-row items-center gap-4 xs:gap-6 md:gap-12">
        <div className="flex-1 w-full space-y-2 xs:space-y-3">
          <h2 className="text-lg xs:text-xl font-semibold text-gray-900 mb-1 xs:mb-2 flex items-center gap-2">
            <Truck className="w-5 h-5 text-pink-500" />
            Быстрая доставка по городу
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-sm xs:text-base space-y-0.5 xs:space-y-1">
            <li>Доставим за 30–60 минут</li>
            <li>Бесплатно при заказе от 500 с</li>
            <li>Вежливые курьеры, горячая пицца</li>
            <li>Самовывоз без очереди</li>
          </ul>
        </div>
        <div className="flex-1 w-full flex flex-col items-center">
          <MapPin className="w-8 h-8 text-pink-400 mb-1 xs:mb-2" />
          <span className="text-sm xs:text-md text-gray-700 text-center">г. Бишкек, ул. Примерная, 123</span>
          <span className="text-sm xs:text-md text-gray-700 text-center">10:00 – 23:00, без выходных</span>
          <Link
            href="tel:+996700123456"
            className="mt-3 xs:mt-4 inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-5 xs:px-6 py-1.5 xs:py-2 rounded-full font-semibold shadow transition text-xs xs:text-base"
          >
            <Phone className="w-5 h-5" /> Позвонить
          </Link>
        </div>
      </div>
    </section>
  );
}
