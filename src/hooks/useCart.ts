import { useState, useCallback } from "react";
import type { MenuItem } from "@/lib/menu-data";

export interface CartItem extends MenuItem {
  quantity: number;
}

export function useCart() {
  const [items, setItems] = useState<Map<string, CartItem>>(new Map());

  const addItem = useCallback((item: MenuItem) => {
    setItems((prev) => {
      const next = new Map(prev);
      const existing = next.get(item.id);
      next.set(item.id, { ...item, quantity: (existing?.quantity ?? 0) + 1 });
      return next;
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => {
      const next = new Map(prev);
      const existing = next.get(itemId);
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        next.delete(itemId);
      } else {
        next.set(itemId, { ...existing, quantity: existing.quantity - 1 });
      }
      return next;
    });
  }, []);

  const getQuantity = useCallback((itemId: string) => items.get(itemId)?.quantity ?? 0, [items]);

  const cartItems = Array.from(items.values()).filter((i) => i.quantity > 0);
  const totalPrice = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const clear = useCallback(() => setItems(new Map()), []);

  return { cartItems, totalPrice, totalItems, addItem, removeItem, getQuantity, clear };
}
