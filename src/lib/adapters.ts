import { Product, Category, ProductOption, ProductVariant } from "@/types/product";
import {
  ProductRaw,
  CategoryRaw,
  ProductOptionRaw,
  ProductVariantRaw,
  StrapiImage,
  RichTextBlock,
} from "@/types/strapi";

// Получить абсолютный URL из Strapi image
function getImageUrlFromArray(images?: StrapiImage[]): string {
  if (!images?.length) return "";

  const img = images[0];
  const url =
    img.formats?.small?.url ||
    img.formats?.thumbnail?.url ||
    img.url;

  if (!url) return "";

  // ✅ Если уже абсолютный — не трогаем
  if (url.startsWith("http")) return url;

  // ✅ Если относительный — приклеиваем домен
  const base = (process.env.NEXT_PUBLIC_API_URL || "https://supportive-connection-48c9c03e13.strapiapp.com/api").replace(/\/api$/, "");
  return `${base}${url}`;
}



// Парсим rich-text: возвращаем plain-text (первый параграф)
function parseDescription(desc: RichTextBlock[]): string {
  if (!Array.isArray(desc) || desc.length === 0) return "";

  return desc
    .map((block) =>
      Array.isArray(block.children)
        ? block.children.map((child) => child.text).join(" ")
        : ""
    )
    .join("\n");
}

// Получаем минимальную цену из вариантов
function getMinPrice(variants: ProductVariantRaw[]): number {
  if (!Array.isArray(variants)) return 0;
  return Math.min(
    ...variants.map((v) => Number(v.price) || 0).filter((n) => n > 0)
  );
}

// ——— Адаптеры ——— //

function adaptOption(opt: ProductOptionRaw): ProductOption {
  return {
    id: String(opt.id),
    name: opt.name,
    values: Array.isArray(opt.option_values)
      ? opt.option_values.map((v) => ({
          id: String(v.id),
          value: v.value,
          optionId: String(opt.id),
        }))
      : [],
  };
}

function adaptVariant(variant: ProductVariantRaw): ProductVariant {
  return {
    id: String(variant.id),
    price: Number(variant.price),
    optionValues: Array.isArray(variant.option_values)
      ? variant.option_values.map((v) => ({
          id: String(v.id),
          value: v.value,
          optionId: String(v.option_id ?? ""),
        }))
      : [],
  };
}

export function adaptProduct(raw: ProductRaw): Product {
  return {
    id: String(raw.id),
    name: raw.name,
    description: parseDescription(raw.description),
    image: getImageUrlFromArray(raw.image),
    category: raw.category?.slug || "",
    price: getMinPrice(raw.product_variants),
    options: raw.product_options.map(adaptOption),
    variants: raw.product_variants.map(adaptVariant),
    badges: raw.badges ?? "",
    isPopular: raw.isPopular ?? false,
    isNew: raw.isNew ?? false,
  };
}

export function adaptCategory(raw: CategoryRaw): Category {
  const getImageUrl = (img?: StrapiImage): string => {
    if (!img) return "";

    const url = img.formats?.small?.url || img.formats?.thumbnail?.url || img.url;

    if (!url) return "";

    // ✅ если уже абсолютный URL
    if (url.startsWith("http")) return url;

    const base = (process.env.NEXT_PUBLIC_API_URL || "https://supportive-connection-48c9c03e13.strapiapp.com/api").replace(/\/api$/, "");
    return `${base}${url}`;
  };

  return {
    id: String(raw.id),
    name: raw.name,
    slug: raw.slug,
    image: getImageUrl(raw.bannerImage),
  };
}
