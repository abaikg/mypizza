export interface OrderItemRequest {
  productId: number;
  quantity: number;
  price: number;
  options?: Record<string, any>;
}

export interface CreateOrderRequest {
  customer_name: string;
  phone: string;
  address: string;
  payment_type: "qr" | "cash";
  total: number;
  order_status?: string;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "https://supportive-connection-48c9c03e13.strapiapp.com/api";

// 1. Создать заказ и получить его id
export async function createOrder(order: CreateOrderRequest) {
  const res = await fetch(`${STRAPI_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: order }),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

// 2. Создать все позиции заказа и связать их с заказом
export async function createOrderItemsWithOrderId(
  items: OrderItemRequest[],
  orderId: number
): Promise<number[]> {
  const ids: number[] = [];
  for (const item of items) {
    const res = await fetch(`${STRAPI_URL}/order-items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          product: item.productId,   // <--- id продукта!
          quantity: item.quantity,
          price: item.price,
          options: item.options,
          order: orderId,            // <--- id заказа! (ВАЖНО!)
        },
      }),
    });
    const json = await res.json();
    if (json?.data?.id) ids.push(json.data.id);
    else throw new Error("Ошибка создания позиции заказа: " + JSON.stringify(json));
  }
  return ids;
}
