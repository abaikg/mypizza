// types/order.ts

export interface OrderItemInput {
  product: number; 
  quantity: number;
  price: number;
  options?: Record<string, any>;
}

export interface CreateOrderInput {
  customer_name: string;
  phone: string;
  address: string;
  payment_type: "qr" | "cash";
  total: number;
  order_status?: string;
  order_items: []; // тут только id!
}
