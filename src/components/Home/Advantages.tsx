"use client";
import { ShoppingBag, Users, Award } from "lucide-react";

const advantages = [
  {
    value: "10 000+",
    label: "заказов доставлено",
    icon: ShoppingBag,
    color: "bg-pink-100 text-pink-500",
  },
  {
    value: "1 500+",
    label: "довольных клиентов",
    icon: Users,
    color: "bg-yellow-100 text-yellow-500",
  },
  {
    value: "5 лет",
    label: "на рынке",
    icon: Award,
    color: "bg-green-100 text-green-500",
  },
];

export default function Advantages() {
  return (
    <section className="max-w-[1400px] mx-auto w-full px-2 xs:px-4 sm:px-6 md:px-10 xl:px-20 mb-12">
      <h2 className="text-lg xs:text-xl font-semibold mb-8 text-center text-gray-900">
        Почему выбирают нас?
      </h2>
      <div
        className="
          flex flex-col md:flex-row
          gap-4 md:gap-8
          items-center md:items-stretch
          justify-center
        "
      >
        {advantages.map((adv) => (
          <div
            key={adv.label}
            className={`
              w-full 
              flex flex-col items-center justify-center
              rounded-3xl shadow bg-white px-4 xs:px-6 py-8
              hover:shadow-lg transition
              group
            `}
          >
            <span className={`mb-3 p-3 rounded-full text-2xl ${adv.color} flex items-center justify-center`}>
              <adv.icon className="w-7 h-7" />
            </span>
            <div className="text-2xl xs:text-3xl font-bold text-pink-500 group-hover:scale-105 transition">
              {adv.value}
            </div>
            <div className="text-gray-700 text-xs xs:text-base mt-1 text-center">
              {adv.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
