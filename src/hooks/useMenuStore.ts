import { useState, useEffect, useCallback } from "react";
import { menuItems as defaultItems, categories as defaultCategories } from "@/lib/menu-data";
import type { MenuItem } from "@/lib/menu-data";

export interface StoredMenuItem extends MenuItem {
  available: boolean;
}

const STORAGE_KEY = "lala-menu-items";

function loadItems(): StoredMenuItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  // Seed from defaults
  return defaultItems.map((item) => ({ ...item, available: true }));
}

function saveItems(items: StoredMenuItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function useMenuStore() {
  const [items, setItems] = useState<StoredMenuItem[]>(loadItems);

  useEffect(() => {
    saveItems(items);
  }, [items]);

  const addItem = useCallback((item: Omit<StoredMenuItem, "id">) => {
    setItems((prev) => {
      const id = `custom_${Date.now()}`;
      return [...prev, { ...item, id } as StoredMenuItem];
    });
  }, []);

  const updateItem = useCallback((id: string, updates: Partial<StoredMenuItem>) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...updates } : i)));
  }, []);

  const deleteItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const toggleAvailability = useCallback((id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, available: !i.available } : i)));
  }, []);

  const categories = [...new Set(items.map((i) => i.category))];

  const availableItems = items.filter((i) => i.available);

  return { items, availableItems, categories, addItem, updateItem, deleteItem, toggleAvailability };
}

// Standalone loader for public menu (no admin state needed)
export function getPublicMenu() {
  const items = loadItems();
  const available = items.filter((i) => i.available);
  const categories = [...new Set(available.map((i) => i.category))];
  return { items: available, categories };
}
