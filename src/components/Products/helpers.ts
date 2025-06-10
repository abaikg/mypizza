// helpers.ts

import { OptionValue, Product, ProductVariant } from "@/types/product";

export function getDefaultOptionValues(product: Product): OptionValue[] {
  return product.options.map(opt => opt.values[0]);
}

export function isSameVariant(selected: OptionValue[], variant: ProductVariant): boolean {
  if (!variant.optionValues || selected.length !== variant.optionValues.length) return false;
  return variant.optionValues.every(v =>
    selected.some(sel => sel.id === v.id)
  );
}


export function findVariant(variants: ProductVariant[], selected: OptionValue[]): ProductVariant | undefined {
  return variants.find(v => isSameVariant(selected, v));
}
