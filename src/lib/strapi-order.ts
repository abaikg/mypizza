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

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "https://supportive-connection-48c9c03e13.strapiapp.com/api";

// 1. Создаём заказ и получаем id
export async function createOrder(order: CreateOrderRequest) {
  const res = await fetch(`${STRAPI_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: order }),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

// 2. Создаём все позиции заказа (orderId — число, product — число)
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
          product: item.productId,
          quantity: item.quantity,
          price: item.price,
          options: item.options,
          order: orderId,
        },
      }),
    });
    const json = await res.json();
    if (json?.data?.id) ids.push(json.data.id);
    else throw new Error("Ошибка создания позиции заказа: " + JSON.stringify(json));
  }
  return ids;
}

// 3. После создания всех order-items — вызываем notify
export async function notifyTelegram(orderId: number) {
  // Рекомендуется через отдельный API-роут Next.js, например /api/notify-tg
  const res = await fetch("https://my-tg-bot-production-82e3.up.railway.app/api/notify-tg", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "order", entry: { id: orderId } }),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}
