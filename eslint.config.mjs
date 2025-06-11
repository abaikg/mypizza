// eslint.config.mjs
import eslintPluginTailwind from "eslint-plugin-tailwindcss";
import prettierPluginRecommended from "eslint-plugin-prettier/recommended"; // не обязательно импортировать — можно просто подключить через extends

export default [
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      tailwindcss: eslintPluginTailwind,
    },
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json", // если используешь строгую типизацию
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    settings: {
      tailwindcss: {
        callees: ["clsx", "classnames", "cva"],
        config: "tailwind.config.js",
      },
    },
    extends: [
      "eslint:recommended",
      "next",
      "next/core-web-vitals",
      "plugin:tailwindcss/recommended",
      "plugin:prettier/recommended", // обязательно последним — чтобы Prettier перекрывал конфликты
    ],
    rules: {
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-custom-classname": "off",
    },
  },
];
