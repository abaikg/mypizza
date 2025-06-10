"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const CONTACTS = {
  phone: "+996700123456",
  phoneDisplay: "+996 700 123 456",
  email: "pizza@example.com",
  address: "г. Бишкек, ул. Чуй, 92",
  mapUrl: "https://yandex.com/maps/org/gum_chynar/168645062335/?indoorLevel=1&ll=74.614535%2C42.874939&z=16.813",
  whatsapp: "996700123456",
  whatsappUrl: "https://wa.me/996700123456",
};

export default function ContactsPage() {
  return (
    <main className="container mt-10 mx-auto max-w-7xl px-4 py-10 sm:py-16 font-montserrat">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">Контакты</h1>

      <div className="space-y-6">

        {/* Телефон */}
        <motion.a
          whileHover={{ scale: 1.03, backgroundColor: "#FDECF3" }}
          whileTap={{ scale: 0.98 }}
          href={`tel:${CONTACTS.phone}`}
          className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition cursor-pointer"
          aria-label="Позвонить"
        >
          <Phone className="w-7 h-7 text-pink-500 flex-shrink-0" />
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {CONTACTS.phoneDisplay}
            </div>
            <div className="text-gray-600 text-sm">Позвонить нам с 10:00 до 23:00</div>
          </div>
        </motion.a>

        {/* WhatsApp */}
        <motion.a
          whileHover={{ scale: 1.03, backgroundColor: "#E2F7E1" }}
          whileTap={{ scale: 0.98 }}
          href={CONTACTS.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition cursor-pointer"
          aria-label="Написать в WhatsApp"
        >
          <FaWhatsapp className="w-7 h-7 text-green-500 flex-shrink-0" />
          <div>
            <div className="text-lg font-semibold text-gray-900">WhatsApp</div>
            <div className="text-gray-600 text-sm">Быстрый чат с оператором</div>
          </div>
        </motion.a>

        {/* Email */}
        <motion.a
          whileHover={{ scale: 1.03, backgroundColor: "#FDECF3" }}
          whileTap={{ scale: 0.98 }}
          href={`mailto:${CONTACTS.email}`}
          className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition cursor-pointer"
          aria-label="Написать на email"
        >
          <Mail className="w-7 h-7 text-pink-500 flex-shrink-0" />
          <div>
            <div className="text-lg font-semibold text-gray-900">{CONTACTS.email}</div>
            <div className="text-gray-600 text-sm">Пишите нам по любым вопросам</div>
          </div>
        </motion.a>

        {/* Адрес (клик — карта) */}
        <motion.a
          whileHover={{ scale: 1.03, backgroundColor: "#FDECF3" }}
          whileTap={{ scale: 0.98 }}
          href={CONTACTS.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition cursor-pointer"
          aria-label="Открыть адрес на карте"
        >
          <MapPin className="w-7 h-7 text-pink-500 flex-shrink-0" />
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {CONTACTS.address}
            </div>
            <div className="text-gray-600 text-sm">
              Открыть адрес на карте (Яндекс)
            </div>
          </div>
        </motion.a>

        {/* Часы работы */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-5 transition select-none"
        >
          <Clock className="w-7 h-7 text-pink-500 flex-shrink-0" />
          <div>
            <div className="text-lg font-semibold text-gray-900">
              Ежедневно 10:00 — 23:00
            </div>
            <div className="text-gray-600 text-sm">
              Приём и выдача заказов без выходных
            </div>
          </div>
        </motion.div>
      </div>

      {/* Карта */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-pink-500" /> Мы на карте
        </h2>
        <div className="rounded-2xl overflow-hidden shadow">
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A4e09a166bd09c483ad62f054eaacb6cb4d32b55f4e3be1fa403bb5b6a3205b44&amp;source=constructor"
            width="100%"
            height="260"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Карта"
          />
        </div>
      </div>

      {/* Преимущества */}
      <section className="mt-12 text-center">
        <h2 className="text-xl font-semibold mb-4">Почему выбирают нас?</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-4">
          <div>
            <span className="text-3xl font-bold text-pink-500">10 000+</span>
            <div className="text-gray-700">заказов доставлено</div>
          </div>
          <div>
            <span className="text-3xl font-bold text-pink-500">1 500+</span>
            <div className="text-gray-700">довольных клиентов</div>
          </div>
          <div>
            <span className="text-3xl font-bold text-pink-500">5 лет</span>
            <div className="text-gray-700">на рынке</div>
          </div>
        </div>
      </section>

      {/* Для бизнеса */}
      <section className="mt-12 border-t pt-8">
        <h2 className="text-lg font-semibold mb-2">Для бизнеса</h2>
        <p className="text-gray-700">
          Мы сотрудничаем с корпоративными клиентами и юридическими лицами.
          По вопросам оптовых поставок или выставления счета — <a className="underline text-pink-500" href="mailto:sales@pizza.com">sales@pizza.com</a>
        </p>
      </section>
    </main>
  );
}
