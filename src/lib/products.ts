import { calculateLineTotal, type SaleUnit } from "./weight";

export type Product = {
  id: string;
  name: string;
  price: number;
  saleUnit: SaleUnit;
  category?: string;
  active?: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export function getCartItemTotal(item: CartItem) {
  return calculateLineTotal(item.product.saleUnit, item.quantity, item.product.price);
}

export function getCartTotal(items: CartItem[]) {
  return Math.round(items.reduce((total, item) => total + getCartItemTotal(item), 0) * 100) / 100;
}
