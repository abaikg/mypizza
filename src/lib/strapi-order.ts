const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "https://supportive-connection-48c9c03e13.strapiapp.com/api";

// 1. Создание Order Item'ов
export async function createOrderItems(items: any[]) {
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
        }
      }),
    });
    const json = await res.json();
    if (json?.data?.id) ids.push(json.data.id);
    else throw new Error("Ошибка создания позиции заказа");
  }
  return ids;
}

// 2. Создание самого заказа
export async function createOrder(order: {
  customer_name: string;
  phone: string;
  address: string;
  payment_type: "qr" | "cash";
  total: number;
  order_status?: string;
  order_items: number[];
}) {
  const res = await fetch(`${STRAPI_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: order }),
  });
  if (!res.ok) throw new Error("Ошибка оформления заказа");
  return await res.json();
}
