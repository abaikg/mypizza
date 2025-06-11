/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals", // базовый набор от Next.js
    "plugin:tailwindcss/recommended", // правила по Tailwind
    "prettier", // отключает конфликты с Prettier
  ],
  plugins: ["tailwindcss"],
  rules: {
    // ❌ Отключаем Next rule, если используешь <Image unoptimized /> на dev
    // "next/image": "off",

    // ❗ Можно добавить кастомные правила:
    "@next/next/no-html-link-for-pages": "off",
    "tailwindcss/no-custom-classname": "off", // если используешь кастомные имена классов
  },
  settings: {
    tailwindcss: {
      callees: ["classnames", "clsx", "ctl"],
      config: "tailwind.config.js",
    },
  },
};
