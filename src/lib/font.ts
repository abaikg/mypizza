import { Cherry_Bomb_One } from "next/font/google";

export const cherryBomb = Cherry_Bomb_One({
  weight: "400", // этот шрифт только с 400 (Regular)
  subsets: ["latin"], // если нужен кириллический
  display: "swap",
});
