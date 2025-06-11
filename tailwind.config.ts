import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx}", // это обязательно!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
