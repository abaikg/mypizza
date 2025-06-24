const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "https://supportive-connection-48c9c03e13.strapiapp.com/api";

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

/**
 * Создаёт заказ и возвращает его id
 */
export async function createOrder(order: CreateOrderRequest): Promise<number> {
  const res = await fetch(`${STRAPI_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: order }),
  });
  if (!res.ok) throw new Error(await res.text());
  const json = await res.json();
  return json.data.id;
}

/**
 * Создаёт все позиции заказа и привязывает их к заказу по id
 */
export async function createOrderItemsWithOrderId(items: OrderItemRequest[], orderId: number): Promise<number[]> {
  const ids: number[] = [];
  for (const item of items) {
    const res = await fetch(`${STRAPI_URL}/order-items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          product: item.productId,
          quantity: item.quantity,
          price: item.price,
          options: item.options,
          order: orderId, // <- Важно! Строго по полю модели
        }
      }),
    });
    const json = await res.json();
    if (json?.data?.id) ids.push(json.data.id);
    else throw new Error("Ошибка создания позиции заказа: " + JSON.stringify(json));
  }
  return ids;
}
