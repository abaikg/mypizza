// eslint.config.mjs
import eslintPluginTailwind from "eslint-plugin-tailwindcss";
import pluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  {
    plugins: {
      tailwindcss: eslintPluginTailwind,
    },
    extends: [
      "next",
      "next/core-web-vitals",
      "eslint:recommended",
      "plugin:tailwindcss/recommended",
      "plugin:prettier/recommended"
    ],
    rules: {
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-custom-classname": "off",
    },
  },
];
