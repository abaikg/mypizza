export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string; // slug категории
  price: number; // минимальная цена
  options: ProductOption[];
  variants: ProductVariant[];
  badges?: string;
  isPopular?: boolean;
  isNew?: boolean;
}

export interface ProductOption {
  id: string;
  name: string;
  values: OptionValue[]; 
}

export interface OptionValue {
  id: string;
  value: string;
  optionId: string; 
}

export interface ProductVariant {
  id: string;
  price: number;
  optionValues: OptionValue[]; 
}

export type ProductOptionsState = Record<string, string>; 

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  options: ProductOptionsState;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
}
