"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Truck, Clock, CreditCard, MapPin, Gift, Smartphone, ChevronDown, Star, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Fake reviews
const REVIEWS = [
  {
    name: "Алина",
    text: "Заказываю постоянно, всегда быстро, вкусно, горячо! Курьер был очень вежлив.",
    stars: 5,
    avatar: "/avatar1.webp",
  },
  {
    name: "Руслан",
    text: "Люблю акции — бесплатная доставка и подарок к заказу, всегда радуют!",
    stars: 5,
    avatar: "/avatar2.webp",
  },
  {
    name: "Ирина",
    text: "Сделали заказ на самовывоз, всё вовремя, персонал приветливый.",
    stars: 4,
    avatar: "/avatar3.webp",
  },
];



const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, type: "spring" },
  }),
};

export default function DeliveryPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div className="bg-[#f6f4dd] min-h-screen py-0 md:py-6 px-0">
      {/* Хиро-блок */}
      <section className="w-full bg-gradient-to-br from-pink-100 to-pink-50 rounded-b-3xl shadow-md pb-10 pt-28 md:pt-32 px-4 md:px-0 flex flex-col items-center relative">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="flex flex-col items-center"
        >
          <Image
            src="/pizza.png"
            alt="Курьер"
            width={140}
            height={140}
            className="mb-2 drop-shadow-2xl"
            priority
          />
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 text-center mb-3 leading-tight">
            Доставка — <span className="text-pink-500">быстро и удобно</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-5 text-center max-w-2xl">
            Привезём любимую еду от 30 минут. Гарантия горячей пиццы, бонусы постоянным клиентам, SMS-уведомления и прозрачные условия!
          </p>
          <Link href="/menu">...</Link>
        </motion.div>
      </section>

      {/* Краткая сводка / summary */}
      <section className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 -mt-10 z-10 relative px-2">
        {[
          {
            icon: <Truck className="w-7 h-7 text-pink-500" />,
            title: "Доставка",
            desc: "от 30 мин",
          },
          {
            icon: <Clock className="w-7 h-7 text-pink-500" />,
            title: "10:00–23:00",
            desc: "ежедневно",
          },
          {
            icon: <CreditCard className="w-7 h-7 text-pink-500" />,
            title: "Оплата",
            desc: "нал, карта, QR",
          },
          {
            icon: <Gift className="w-7 h-7 text-pink-500" />,
            title: "Бонусы",
            desc: "акции и подарки",
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            className="bg-white rounded-2xl shadow p-4 flex flex-col items-center text-center border border-pink-100"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.7 }}
            variants={sectionVariants}
            custom={i}
          >
            {item.icon}
            <div className="font-bold text-base mt-2">{item.title}</div>
            <div className="text-xs text-gray-500">{item.desc}</div>
          </motion.div>
        ))}
      </section>

      {/* Подробные условия */}
      <section className="max-w-7xl mx-auto mt-10 grid sm:grid-cols-2 gap-7 px-3">
        {[
          {
            icon: <MapPin className="w-6 h-6 text-pink-400" />,
            title: "Зона доставки",
            text: (
              <>
                Вся территория г. Бишкек.<br />
                Для новых районов — уточняйте у оператора.<br />
                <span className="text-gray-400 text-xs">Скоро — по всему региону!</span>
              </>
            ),
          },
          {
            icon: <CreditCard className="w-6 h-6 text-pink-400" />,
            title: "Оплата",
            text: (
              <>
                Любой удобный способ:<br />
                <div className="flex flex-wrap gap-2 items-center mt-1 mb-1">

                  <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs text-green-600 font-bold">
                    <Image src="/mbank.png" alt="MBank" width={16} height={16} />
                    MBank
                  </span>

                  <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs text-blue-600 font-bold">
                    <Image src="/optima.png" alt="Optima" width={16} height={16} />
                    Optima
                  </span>

                  <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs text-orange-500 font-bold">
                    <Image src="/odengi.png" alt="O!Деньги" width={16} height={16} />
                    O!Деньги
                  </span>

                  <span className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded text-xs text-green-700 font-bold">
                    <span className="w-4 h-4 bg-green-50 rounded-full flex items-center justify-center mr-1">
                      <Image
                        src="/cash.png"
                        alt="Наличные"
                        width={16}
                        height={16}
                        className="rotate-[3deg]"
                      />
                    </span>
                    Наличные
                  </span>

                </div>
                <b>Оплата при получении</b> — <span className="text-gray-500">переводом, наличными или через кошелек.</span>
              </>
            ),
          },
          {
            icon: <Truck className="w-6 h-6 text-pink-400" />,
            title: "Минимальный заказ",
            text: (
              <>
                От <b>500 с</b> — доставка бесплатная.<br />
                Меньше — <b>200 с</b> к заказу.
              </>
            ),
          },
          {
            icon: <Clock className="w-6 h-6 text-pink-400" />,
            title: "Время доставки",
            text: (
              <>
                Обычно — <b>30–60 минут</b>.<br />
                В пиковые часы возможны задержки.<br />
                Всегда держим в курсе!
              </>
            ),
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            className="bg-white rounded-2xl shadow p-5 flex flex-col gap-2 border border-pink-100"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.7 }}
            variants={sectionVariants}
            custom={i}
          >
            <div className="flex items-center gap-2">
              {item.icon}
              <span className="text-lg font-semibold">{item.title}</span>
            </div>
            <div className="text-gray-700 text-base">{item.text}</div>
          </motion.div>
        ))}
      </section>


      {/* Отслеживание, SMS и уведомления */}
      <section className="max-w-7xl mx-auto mt-10 px-3 grid sm:grid-cols-2 gap-7">
        {[
          {
            icon: <Smartphone className="w-6 h-6 text-pink-400" />,
            title: "SMS и WhatsApp-уведомления",
            text: "Вы всегда знаете статус заказа: готовится, в пути, курьер подъезжает. Push и SMS — всегда в курсе.",
          },
          {
            icon: <Gift className="w-6 h-6 text-pink-400" />,
            title: "Бонусы и акции",
            text: "Каждый 7-й заказ — подарок! Следите за акциями и розыгрышами в Telegram и Instagram.",
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            className="bg-white rounded-2xl shadow p-5 flex flex-col gap-2 border border-pink-100"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.7 }}
            variants={sectionVariants}
            custom={i}
          >
            <div className="flex items-center gap-2">
              {item.icon}
              <span className="text-lg font-semibold">{item.title}</span>
            </div>
            <div className="text-gray-700 text-base">{item.text}</div>
          </motion.div>
        ))}
      </section>

      {/* FAQ — раскрывающиеся */}
      <section className="max-w-7xl mx-auto mt-10 px-3">
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="font-bold text-xl mb-4 flex items-center gap-2">
            <Info className="w-6 h-6 text-pink-500" /> Часто задаваемые вопросы
          </div>
          {[
            {
              q: "Можно заказать доставку на определённое время?",
              a: "Да, просто укажите желаемое время в комментарии к заказу. Мы постараемся привезти к этому времени.",
            },
            {
              q: "Что делать, если курьер задерживается?",
              a: "Мы всегда уведомляем о статусе заказа. Если возникла задержка — обязательно сообщим, и вы всегда можете позвонить или написать нам.",
            },
            {
              q: "Как оплатить по QR?",
              a: "Выберите вариант оплаты QR, после оформления заказа появится код. Также оператор может отправить код в мессенджере.",
            },
            {
              q: "Есть ли у вас самовывоз?",
              a: "Да, по адресу г. Бишкек, ул. Примерная, 123. Показать на карте можно по кнопке выше.",
            },
          ].map((item, i) => (
            <div key={i} className="mb-2">
              <button
                className="flex items-center justify-between w-full font-medium text-gray-800 text-left py-2 px-2 rounded-lg hover:bg-pink-50 transition"
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
              >
                <span>{item.q}</span>
                <ChevronDown className={`w-5 h-5 ml-2 transition-transform ${faqOpen === i ? "rotate-180" : ""}`} />
              </button>
              <motion.div
                initial={false}
                animate={{ height: faqOpen === i ? "auto" : 0, opacity: faqOpen === i ? 1 : 0 }}
                transition={{ duration: 0.27, ease: "easeInOut" }}
                className="overflow-hidden px-2"
              >
                {faqOpen === i && (
                  <div className="text-sm text-gray-600 py-2">{item.a}</div>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Отзывы клиентов */}
      <section className="max-w-7xl mx-auto mt-10 px-3">
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="font-bold text-xl mb-4 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-400" /> Ваши отзывы
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            {REVIEWS.map((r, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center bg-pink-50 rounded-xl shadow p-4 flex-1"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                variants={sectionVariants}
                custom={i}
              >
                <Image
                  src={r.avatar}
                  alt={r.name}
                  width={48}
                  height={48}
                  className="rounded-full border border-pink-200 mb-1"
                />
                <div className="font-semibold">{r.name}</div>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(r.stars)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-300" />
                  ))}
                </div>
                <div className="text-xs text-gray-700 text-center">{r.text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Контакты и call-to-action */}
      <section className="max-w-7xl mx-auto mt-10 px-3 mb-16">
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
          <div className="font-bold text-xl mb-2 flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-pink-500" /> Остались вопросы?
          </div>
          <div className="text-base text-gray-700 text-center mb-4">
            Напишите нам или позвоните — <b>+996 555 12-34-56</b><br />
            WhatsApp, Telegram, Viber — <span className="text-pink-500 font-semibold">всегда онлайн!</span>
          </div>
          <div className="flex gap-2 mt-2">
            <a href="tel:+996555123456" className="bg-pink-500 text-white font-bold px-5 py-2 rounded-full hover:bg-pink-600 transition shadow">
              Позвонить
            </a>
            <a href="https://wa.me/996555123456" className="bg-green-500 text-white font-bold px-5 py-2 rounded-full hover:bg-green-600 transition shadow">
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
