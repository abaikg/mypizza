interface CartItemOptionsProps {
  product: any;  // { options: [{ id, name, ... }], ... }
  variant: any;  // { optionValues: [{ id, value }], ... }
  options: Record<string, string>; // { [optionId]: valueId }
}

export default function CartItemOptions({ product, variant, options }: CartItemOptionsProps) {
  if (!product.options || !variant.optionValues || !options) return null;

  // Для каждой опции находим valueId в options, потом ищем value в variant.optionValues
  const formatted = product.options
    .map((opt: any) => {
      const valueId = options[opt.id];
      if (!valueId) return null;
      const val = variant.optionValues.find((v: any) => String(v.id) === String(valueId));
      return val ? `${opt.name}: ${val.value}` : null;
    })
    .filter(Boolean)
    .join(" • ");

  return (
    <div className="text-gray-400 text-xs mb-1 truncate max-w-[90px] sm:max-w-[200px]">
      {formatted || "—"}
    </div>
  );
}
