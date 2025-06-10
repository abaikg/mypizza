"use client";
import Link from "next/link";
import { MapPin, Phone, Mail, Heart } from "lucide-react";
import { cherryBomb } from "@/lib/font";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#f6f4dd] border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col md:flex-row justify-between gap-8 md:gap-12 font-montserrat">
        {/* Левый блок — лого и копирайт */}
        <div className="flex flex-col gap-3 items-start">
          <Link href="/" className="flex items-center gap-2 select-none">
            <Image
              src="/cat-pizza.png"
              alt="Логотип"
              width={28}  // w-7 = 28px
              height={28}
              className="w-7 h-7"
            />            <span className={`${cherryBomb.className} text-2xl font-bold italic text-pink-500 tracking-tight`}>
              Three
            </span>
          </Link>
          <span className="text-gray-600 text-sm mt-2">
            © {new Date().getFullYear()} Three Pizza. Все права защищены.
          </span>
        </div>

        {/* Центральный блок — меню */}
        <nav className="flex flex-col gap-2 sm:gap-3">
          <span className="font-semibold text-gray-900 mb-1">Меню</span>
          <Link href="/menu" className="hover:text-pink-500 transition">Меню</Link>
          <Link href="/contacts" className="hover:text-pink-500 transition">Контакты</Link>
          <Link href="/delivery" className="hover:text-pink-500 transition">Доставка</Link>
        </nav>

        {/* Правый блок — контакты */}
        <div className="flex flex-col gap-2 sm:gap-3">
          <span className="font-semibold text-gray-900 mb-1">Контакты</span>
          <div className="flex items-center gap-2 text-gray-700">
            <Phone className="w-5 h-5 text-pink-500" />
            <Link href="tel:+996700123456" className="hover:text-pink-500 transition font-medium">
              +996 700 123 456
            </Link>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Mail className="w-5 h-5 text-pink-500" />
            <Link href="mailto:pizza@example.com" className="hover:text-pink-500 transition font-medium">
              pizza@example.com
            </Link>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="w-5 h-5 text-pink-500" />
            <span>г. Бишкек, ул. Примерная, 123</span>
          </div>
        </div>
      </div>
      {/* Линия и соц. сети или фраза */}
      <div className="border-t border-gray-200 text-center py-4 text-sm text-gray-500">
        Сделано с <Heart className="inline w-4 h-4 text-pink-400 mx-1 -mt-1" /> для вас!
      </div>
    </footer>
  );
}
