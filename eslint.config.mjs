import eslintPluginTailwind from "eslint-plugin-tailwindcss";

export default [
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      tailwindcss: eslintPluginTailwind,
    },
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    settings: {
      tailwindcss: {
        callees: ["clsx", "classnames", "cva"],
        config: "tailwind.config.ts", // если у тебя TypeScript
      },
    },
    extends: [
      "eslint:recommended",
      "next",
      "next/core-web-vitals",
      "plugin:tailwindcss/recommended",
      "plugin:prettier/recommended"
    ],
    rules: {
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-custom-classname": "off"
    }
  }
];
