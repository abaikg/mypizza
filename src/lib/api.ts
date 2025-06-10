import { strapi } from './axios';

export const getCategories = async () => {
  const res = await strapi.get("/categories", {
    params: { populate: "*" }, // подтягиваем все связи (bannerImage)
  });
  return res.data.data;
};


export const getProducts = async () => {
  const res = await strapi.get("/products", {
params: {
  populate: {
    image: true,
    category: true,
    product_options: { // Для отображения доступных опций в модалке
      populate: {
        // Имя поля в "Product Option", ссылающегося на "Option Value"
        option_values: true, // Замените 'option_values' на реальное имя поля, если оно другое
      },
    },
    product_variants: { // Для вариантов продукта
      populate: {
        // Имя поля в "Product Variant", ссылающегося на "Option Value"
        option_values: true, // Замените 'option_values' на реальное имя поля, если оно другое
      },
    },
  },
}
  });
  return res.data.data;
};