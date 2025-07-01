// lib/strapi-order.ts

import type { OrderItemInput, CreateOrderInput } from "@/types/order";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "https://supportive-connection-48c9c03e13.strapiapp.com/api";

// Создать один Order Item
export async function createOrderItem(item: OrderItemInput): Promise<number> {
  const res = await fetch(`${STRAPI_URL}/order-items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: item }),
  });
  if (!res.ok) throw new Error(await res.text());
  const json = await res.json();
  return json.data.id; // id созданного Order Item
}

// Создать массив Order Item (последовательно)
export async function createAllOrderItems(items: OrderItemInput[]): Promise<number[]> {
  const ids: number[] = [];
  for (const item of items) {
    const id = await createOrderItem(item);
    ids.push(id);
  }
  return ids;
}

// Создать Order с привязанными Order Item
export async function createOrder(order: Omit<CreateOrderInput, "order_items">, orderItemIds: number[]) {
  const res = await fetch(`${STRAPI_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: { ...order, order_items: orderItemIds },
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

// Функция, которая всё делает сразу
export async function createOrderWithCart(
  orderData: Omit<CreateOrderInput, "order_items">,
  items: OrderItemInput[]
) {
  const orderItemIds = await createAllOrderItems(items);
  return await createOrder(orderData, orderItemIds);
}
