export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  emoji: string;
}

export const menuItems: MenuItem[] = [
  { id: "1", name: "Veg Sandwich", price: 120, category: "Snacks", emoji: "🥪" },
  { id: "2", name: "French Fries", price: 100, category: "Snacks", emoji: "🍟" },
  { id: "3", name: "Margherita Pizza", price: 220, category: "Snacks", emoji: "🍕" },
  { id: "4", name: "Paneer Wrap", price: 160, category: "Snacks", emoji: "🌯" },
  { id: "5", name: "Cold Coffee", price: 150, category: "Beverages", emoji: "🥤" },
  { id: "6", name: "Masala Tea", price: 60, category: "Beverages", emoji: "☕" },
  { id: "7", name: "Fresh Lime Soda", price: 80, category: "Beverages", emoji: "🍋" },
  { id: "8", name: "Mango Shake", price: 130, category: "Beverages", emoji: "🥭" },
  { id: "9", name: "Chocolate Brownie", price: 140, category: "Desserts", emoji: "🍫" },
  { id: "10", name: "Ice Cream Sundae", price: 170, category: "Desserts", emoji: "🍨" },
];

export const WHATSAPP_NUMBER = "918000702671"; // Replace with actual number

export const categories = [...new Set(menuItems.map((item) => item.category))];
