// import { Category, Product } from "@/types/product";

// export const categories: Category[] = [
//   { id: "pizza", name: "Пицца", slug: "pizza", image: "/cat-pizza.png" },
//   { id: "rolls", name: "Роллы", slug: "rolls", image: "/cat-rolls.png" },
//   { id: "snacks", name: "Закуски", slug: "snacks", image: "/cat-snacks.png" },
//   { id: "drinks", name: "Напитки", slug: "drinks", image: "/cat-drinks.png" },
//   { id: "desserts", name: "Десерты", slug: "desserts", image: "/cat-desserts.png" },
// ];

// export const products: Product[] = [
//   // Пиццы (7)
//   {
//     id: "margarita",
//     name: "Маргарита",
//     description: "Классическая пицца с томатами и сыром.",
//     image: "/pizza.png",
//     price: 450,
//     category: "pizza",
//     options: [
//       { id: "size", name: "Размер", values: ["25 см", "30 см", "35 см"] },
//       { id: "dough", name: "Тесто", values: ["Тонкое", "Толстое"] },
//     ],
//   },
//   {
//     id: "pepperoni",
//     name: "Пепперони",
//     description: "Пицца с пикантной пепперони и сыром.",
//     image: "/pizza.png",
//     price: 550,
//     category: "pizza",
//     options: [
//       { id: "size", name: "Размер", values: ["25 см", "30 см", "35 см"] },
//       { id: "dough", name: "Тесто", values: ["Тонкое", "Толстое"] },
//     ],
//   },
//   {
//     id: "four_cheese",
//     name: "Четыре сыра",
//     description: "Пицца с миксом из четырех сыров.",
//     image: "/pizza.png",
//     price: 590,
//     category: "pizza",
//     options: [
//       { id: "size", name: "Размер", values: ["25 см", "30 см"] },
//       { id: "dough", name: "Тесто", values: ["Тонкое", "Толстое"] },
//     ],
//   },
//   {
//     id: "bbq_chicken",
//     name: "BBQ Чикен",
//     description: "Пицца с курицей BBQ и красным луком.",
//     image: "/images/bbq_chicken.jpg",
//     price: 610,
//     category: "pizza",
//     options: [
//       { id: "size", name: "Размер", values: ["25 см", "30 см", "35 см"] },
//       { id: "dough", name: "Тесто", values: ["Тонкое", "Толстое"] },
//     ],
//   },
//   {
//     id: "hawaiian",
//     name: "Гавайская",
//     description: "Пицца с ветчиной и ананасами.",
//     image: "/images/hawaiian.jpg",
//     price: 520,
//     category: "pizza",
//     options: [
//       { id: "size", name: "Размер", values: ["25 см", "30 см"] },
//       { id: "dough", name: "Тесто", values: ["Тонкое", "Толстое"] },
//     ],
//   },
//   {
//     id: "veggie",
//     name: "Овощная",
//     description: "Пицца с болгарским перцем, оливками и помидорами.",
//     image: "/images/veggie.jpg",
//     price: 500,
//     category: "pizza",
//     options: [
//       { id: "size", name: "Размер", values: ["25 см", "30 см"] },
//       { id: "dough", name: "Тесто", values: ["Тонкое", "Толстое"] },
//     ],
//   },
//   {
//     id: "meat_lovers",
//     name: "Мясная",
//     description: "Пицца с ветчиной, беконом и колбасой.",
//     image: "/images/meat_lovers.jpg",
//     price: 630,
//     category: "pizza",
//     options: [
//       { id: "size", name: "Размер", values: ["25 см", "30 см", "35 см"] },
//       { id: "dough", name: "Тесто", values: ["Тонкое", "Толстое"] },
//     ],
//   },

//   // Роллы (7)
//   {
//     id: "california",
//     name: "Калифорния",
//     description: "Ролл с крабовым мясом, авокадо и икрой.",
//     image: "/images/california.jpg",
//     price: 320,
//     category: "rolls",
//     options: [
//       { id: "size", name: "Порция", values: ["8 шт.", "16 шт."] },
//     ],
//   },
//   {
//     id: "philadelphia",
//     name: "Филадельфия",
//     description: "Ролл с лососем и сливочным сыром.",
//     image: "/images/philadelphia.jpg",
//     price: 400,
//     category: "rolls",
//     options: [
//       { id: "size", name: "Порция", values: ["8 шт.", "16 шт."] },
//     ],
//   },
//   {
//     id: "tempura",
//     name: "Темпура ролл",
//     description: "Горячий ролл в темпурном кляре.",
//     image: "/images/tempura.jpg",
//     price: 380,
//     category: "rolls",
//     options: [
//       { id: "size", name: "Порция", values: ["8 шт.", "16 шт."] },
//     ],
//   },
//   {
//     id: "unagi",
//     name: "Унаги",
//     description: "Ролл с копченым угрем и кунжутом.",
//     image: "/images/unagi.jpg",
//     price: 420,
//     category: "rolls",
//     options: [
//       { id: "size", name: "Порция", values: ["8 шт."] },
//     ],
//   },
//   {
//     id: "spicy_tuna",
//     name: "Спайси туна",
//     description: "Ролл с острым тунцом и огурцом.",
//     image: "/images/spicy_tuna.jpg",
//     price: 410,
//     category: "rolls",
//     options: [
//       { id: "size", name: "Порция", values: ["8 шт."] },
//     ],
//   },
//   {
//     id: "dragon",
//     name: "Дракон",
//     description: "Ролл с угрем, авокадо и огурцом.",
//     image: "/images/dragon.jpg",
//     price: 440,
//     category: "rolls",
//     options: [
//       { id: "size", name: "Порция", values: ["8 шт."] },
//     ],
//   },
//   {
//     id: "shrimp_tempura",
//     name: "Креветка темпура",
//     description: "Ролл с креветкой в темпуре и авокадо.",
//     image: "/images/shrimp_tempura.jpg",
//     price: 430,
//     category: "rolls",
//     options: [
//       { id: "size", name: "Порция", values: ["8 шт."] },
//     ],
//   },

//   // Закуски (7)
//   {
//     id: "fries",
//     name: "Картофель фри",
//     description: "Классический картофель фри с соусом.",
//     image: "/images/fries.jpg",
//     price: 150,
//     category: "snacks",
//     options: [
//       { id: "portion", name: "Порция", values: ["Маленькая", "Большая"] },
//     ],
//   },
//   {
//     id: "cheese_sticks",
//     name: "Сырные палочки",
//     description: "Горячие палочки с плавленым сыром.",
//     image: "/images/cheese_sticks.jpg",
//     price: 180,
//     category: "snacks",
//     options: [
//       { id: "portion", name: "Порция", values: ["6 шт.", "12 шт."] },
//     ],
//   },
//   {
//     id: "nuggets",
//     name: "Куриные наггетсы",
//     description: "Сочные куриные наггетсы с хрустящей корочкой.",
//     image: "/images/nuggets.jpg",
//     price: 170,
//     category: "snacks",
//     options: [
//       { id: "portion", name: "Порция", values: ["6 шт.", "12 шт."] },
//     ],
//   },
//   {
//     id: "onion_rings",
//     name: "Луковые кольца",
//     description: "Хрустящие кольца лука в панировке.",
//     image: "/images/onion_rings.jpg",
//     price: 160,
//     category: "snacks",
//     options: [
//       { id: "portion", name: "Порция", values: ["8 шт."] },
//     ],
//   },
//   {
//     id: "spring_rolls",
//     name: "Спринг-роллы",
//     description: "Овощные роллы с соусом.",
//     image: "/images/spring_rolls.jpg",
//     price: 190,
//     category: "snacks",
//     options: [
//       { id: "portion", name: "Порция", values: ["4 шт."] },
//     ],
//   },
//   {
//     id: "garlic_bread",
//     name: "Чесночные гренки",
//     description: "Поджаренные гренки с чесночным маслом.",
//     image: "/images/garlic_bread.jpg",
//     price: 140,
//     category: "snacks",
//     options: [
//       { id: "portion", name: "Порция", values: ["6 шт."] },
//     ],
//   },
//   {
//     id: "mozzarella_sticks",
//     name: "Моцарелла в панировке",
//     description: "Палочки моцареллы в золотистой панировке.",
//     image: "/images/mozzarella_sticks.jpg",
//     price: 200,
//     category: "snacks",
//     options: [
//       { id: "portion", name: "Порция", values: ["6 шт."] },
//     ],
//   },

//   // Десерты (7)
//   {
//     id: "tiramisu",
//     name: "Тирамису",
//     description: "Итальянский десерт с кофе и сыром маскарпоне.",
//     image: "/images/tiramisu.jpg",
//     price: 240,
//     category: "desserts",
//     options: [],
//   },
//   {
//     id: "cheesecake",
//     name: "Чизкейк",
//     description: "Классический сливочный чизкейк.",
//     image: "/images/cheesecake.jpg",
//     price: 230,
//     category: "desserts",
//     options: [],
//   },
//   {
//     id: "brownie",
//     name: "Брауни",
//     description: "Шоколадный десерт с орехами.",
//     image: "/images/brownie.jpg",
//     price: 210,
//     category: "desserts",
//     options: [],
//   },
//   {
//     id: "panna_cotta",
//     name: "Панна-котта",
//     description: "Нежный итальянский десерт из сливок.",
//     image: "/images/panna_cotta.jpg",
//     price: 250,
//     category: "desserts",
//     options: [],
//   },
//   {
//     id: "apple_pie",
//     name: "Яблочный пирог",
//     description: "Пирог с сочными яблоками и корицей.",
//     image: "/images/apple_pie.jpg",
//     price: 220,
//     category: "desserts",
//     options: [],
//   },
//   {
//     id: "creme_brulee",
//     name: "Крем-брюле",
//     description: "Классический французский десерт с карамельной корочкой.",
//     image: "/images/creme_brulee.jpg",
//     price: 260,
//     category: "desserts",
//     options: [],
//   },
//   {
//     id: "profiteroles",
//     name: "Профитроли",
//     description: "Заварные пирожные с кремом.",
//     image: "/images/profiteroles.jpg",
//     price: 210,
//     category: "desserts",
//     options: [],
//   },

//   // Напитки (7)
//   {
//     id: "cola",
//     name: "Coca-Cola",
//     description: "Газированный напиток 0,5 л.",
//     image: "/images/cola.jpg",
//     price: 90,
//     category: "drinks",
//     options: [
//       { id: "size", name: "Размер", values: ["0,33 л", "0,5 л", "1 л"] },
//     ],
//   },
//   {
//     id: "juice",
//     name: "Яблочный сок",
//     description: "Свежий яблочный сок.",
//     image: "/images/juice.jpg",
//     price: 80,
//     category: "drinks",
//     options: [
//       { id: "size", name: "Размер", values: ["0,33 л", "0,5 л"] },
//     ],
//   },
//   {
//     id: "water",
//     name: "Вода",
//     description: "Чистая питьевая вода 0,5 л.",
//     image: "/images/water.jpg",
//     price: 50,
//     category: "drinks",
//     options: [
//       { id: "size", name: "Размер", values: ["0,5 л", "1 л"] },
//     ],
//   },
//   {
//     id: "fanta",
//     name: "Fanta",
//     description: "Освежающий напиток 0,5 л.",
//     image: "/images/fanta.jpg",
//     price: 90,
//     category: "drinks",
//     options: [
//       { id: "size", name: "Размер", values: ["0,5 л"] },
//     ],
//   },
//   {
//     id: "sprite",
//     name: "Sprite",
//     description: "Газированный напиток 0,5 л.",
//     image: "/images/sprite.jpg",
//     price: 90,
//     category: "drinks",
//     options: [
//       { id: "size", name: "Размер", values: ["0,5 л"] },
//     ],
//   },
//   {
//     id: "tea",
//     name: "Чай",
//     description: "Чёрный или зелёный чай.",
//     image: "/images/tea.jpg",
//     price: 60,
//     category: "drinks",
//     options: [
//       { id: "type", name: "Вид", values: ["Чёрный", "Зелёный"] },
//     ],
//   },
//   {
//     id: "coffee",
//     name: "Кофе",
//     description: "Свежесваренный кофе.",
//     image: "/images/coffee.jpg",
//     price: 100,
//     category: "drinks",
//     options: [
//       { id: "type", name: "Тип", values: ["Американо", "Капучино", "Эспрессо"] },
//     ],
//   },
// ];
