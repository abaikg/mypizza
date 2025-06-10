export interface ImageFormat {
  url: string;
}

export interface StrapiImage {
  url: string;
  formats?: {
    small?: ImageFormat;
    thumbnail?: ImageFormat;
  };
}

export interface RichTextChild {
  text: string;
}

export interface RichTextBlock {
  children: RichTextChild[];
}

// Сырые типы с бэка Strapi
export interface ProductOptionRaw {
  id: string | number;
  name: string;
  option_values: {
    id: string | number;
    value: string;
  }[];
}

export interface ProductVariantRaw {
  id: string | number;
  price: number | string;
  option_values: {
    option_id: any;
    id: string | number;
    value: string;
  }[];
}

export interface ProductRaw {
  id: string | number;
  name: string;
  description: RichTextBlock[];
  image: StrapiImage[];
  category?: { slug: string };
  product_variants: ProductVariantRaw[];
  product_options: ProductOptionRaw[];
  badges?: string;
  isPopular?: boolean;
  isNew?: boolean;
}

export interface CategoryRaw {
  id: string | number;
  name: string;
  slug: string;
  bannerImage?: StrapiImage;
}
