import eslintPluginTailwind from "eslint-plugin-tailwindcss";
import next from "eslint-config-next";
import globals from "globals";

export default [
  {
    name: "base",
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      tailwindcss: eslintPluginTailwind,
    },
    rules: {
      ...next.rules,
      "tailwindcss/no-custom-classname": "off",
    },
  },
  {
    name: "nextjs",
    files: ["**/*.{ts,tsx}"],
    ...next,
  },
];
