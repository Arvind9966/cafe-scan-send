export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  emoji: string;
}

export const menuItems: MenuItem[] = [
  // Combos
  { id: "cb1", name: "OTC Pizza + Cold Coffee", price: 129, category: "Combos", emoji: "🍕☕" },
  { id: "cb2", name: "Momo's Combo Platter (15 pcs)", price: 199, category: "Combos", emoji: "🥟🎉" },
  { id: "cb3", name: "Aloo Tikki Burger + Coke", price: 59, category: "Combos", emoji: "🍔🥤" },

  // Rolls
  { id: "r1", name: "Veg. Roll", price: 50, category: "Rolls", emoji: "🌯" },
  { id: "r2", name: "Chowmein Roll", price: 60, category: "Rolls", emoji: "🥡" },
  { id: "r3", name: "Aloo Tikki Roll", price: 70, category: "Rolls", emoji: "🥔" },
  { id: "r4", name: "Tandoori Roll", price: 70, category: "Rolls", emoji: "🔥" },
  { id: "r5", name: "Paneer Roll", price: 99, category: "Rolls", emoji: "🧀" },
  { id: "r6", name: "Cheese Roll", price: 99, category: "Rolls", emoji: "🧈" },
  { id: "r7", name: "Lala Spe. Roll", price: 129, category: "Rolls", emoji: "⭐" },

  // French Fries
  { id: "f1", name: "Salted Fries", price: 80, category: "French Fries", emoji: "🍟" },
  { id: "f2", name: "Masala Fries", price: 90, category: "French Fries", emoji: "🌶️" },
  { id: "f3", name: "Peri Peri Fries", price: 90, category: "French Fries", emoji: "🔥" },
  { id: "f4", name: "Cheese Fries", price: 99, category: "French Fries", emoji: "🧀" },
  { id: "f5", name: "Peri Peri + Cheese Fries", price: 129, category: "French Fries", emoji: "🧀🔥" },

  // Burger (Small)
  { id: "bs1", name: "Veg. Burger (S)", price: 49, category: "Burger", emoji: "🍔" },
  { id: "bs2", name: "Veg. Chowmein Burger (S)", price: 59, category: "Burger", emoji: "🍔" },
  { id: "bs3", name: "Double Tikki Burger (S)", price: 69, category: "Burger", emoji: "🍔" },
  { id: "bs4", name: "Crunchy Tikki Burger (S)", price: 69, category: "Burger", emoji: "🍔" },
  { id: "bs5", name: "Tandoori Spicy Burger (S)", price: 79, category: "Burger", emoji: "🌶️" },
  { id: "bs6", name: "Juicy Burger (S)", price: 79, category: "Burger", emoji: "🍔" },
  { id: "bs7", name: "Mexican Burger (S)", price: 79, category: "Burger", emoji: "🌮" },
  { id: "bs8", name: "Amul Cheese Burger (S)", price: 89, category: "Burger", emoji: "🧀" },
  { id: "bs9", name: "Paneer Makhni Burger (S)", price: 89, category: "Burger", emoji: "🍔" },
  { id: "bs10", name: "Korean Spicy Burger (S)", price: 89, category: "Burger", emoji: "🌶️" },
  { id: "bs11", name: "Cheese Bomb Burger (S)", price: 109, category: "Burger", emoji: "💣" },
  { id: "bs12", name: "Double Decker Burger (S)", price: 109, category: "Burger", emoji: "🍔" },
  { id: "bs13", name: "Special Burger (S)", price: 119, category: "Burger", emoji: "⭐" },

  // Burger (Large)
  { id: "bl1", name: "Veg. Burger (L)", price: 69, category: "Burger", emoji: "🍔" },
  { id: "bl2", name: "Veg. Chowmein Burger (L)", price: 79, category: "Burger", emoji: "🍔" },
  { id: "bl3", name: "Double Tikki Burger (L)", price: 89, category: "Burger", emoji: "🍔" },
  { id: "bl4", name: "Crunchy Tikki Burger (L)", price: 89, category: "Burger", emoji: "🍔" },
  { id: "bl5", name: "Tandoori Spicy Burger (L)", price: 99, category: "Burger", emoji: "🌶️" },
  { id: "bl6", name: "Juicy Burger (L)", price: 99, category: "Burger", emoji: "🍔" },
  { id: "bl7", name: "Mexican Burger (L)", price: 99, category: "Burger", emoji: "🌮" },
  { id: "bl8", name: "Amul Cheese Burger (L)", price: 109, category: "Burger", emoji: "🧀" },
  { id: "bl9", name: "Paneer Makhni Burger (L)", price: 109, category: "Burger", emoji: "🍔" },
  { id: "bl10", name: "Korean Spicy Burger (L)", price: 109, category: "Burger", emoji: "🌶️" },
  { id: "bl11", name: "Cheese Bomb Burger (L)", price: 129, category: "Burger", emoji: "💣" },
  { id: "bl12", name: "Double Decker Burger (L)", price: 129, category: "Burger", emoji: "🍔" },
  { id: "bl13", name: "Special Burger (L)", price: 129, category: "Burger", emoji: "⭐" },
  { id: "bl14", name: "Lala Special Burger", price: 149, category: "Burger", emoji: "👑" },
  { id: "bl15", name: "Lala Special Burger (L)", price: 199, category: "Burger", emoji: "👑" },

  // Momos (Half)
  { id: "mh1", name: "Steam Momos (H)", price: 50, category: "Momos", emoji: "🥟" },
  { id: "mh2", name: "Fried Momos (H)", price: 60, category: "Momos", emoji: "🥟" },
  { id: "mh3", name: "Kurkure Momos (H)", price: 99, category: "Momos", emoji: "🥟" },
  { id: "mh4", name: "Tandoori Momos (H)", price: 99, category: "Momos", emoji: "🔥" },
  { id: "mh5", name: "Gravy Momos (H)", price: 99, category: "Momos", emoji: "🍛" },

  // Momos (Full)
  { id: "mf1", name: "Steam Momos (F)", price: 70, category: "Momos", emoji: "🥟" },
  { id: "mf2", name: "Fried Momos (F)", price: 80, category: "Momos", emoji: "🥟" },
  { id: "mf3", name: "Kurkure Momos (F)", price: 149, category: "Momos", emoji: "🥟" },
  { id: "mf4", name: "Tandoori Momos (F)", price: 149, category: "Momos", emoji: "🔥" },
  { id: "mf5", name: "Gravy Momos (F)", price: 149, category: "Momos", emoji: "🍛" },

  // Chowmein
  { id: "c1", name: "Veg. Chowmein", price: 80, category: "Chowmein", emoji: "🍜" },
  { id: "c2", name: "Garlic Noodles", price: 99, category: "Chowmein", emoji: "🧄" },
  { id: "c3", name: "Hakka Noodles", price: 99, category: "Chowmein", emoji: "🍝" },
  { id: "c4", name: "Paneer Chowmein", price: 109, category: "Chowmein", emoji: "🧀" },
  { id: "c5", name: "Chowmein Momos", price: 129, category: "Chowmein", emoji: "🥟" },

  // Pav Bhaji
  { id: "p1", name: "Pav Bhaji", price: 99, category: "Pav Bhaji", emoji: "🍞" },
  { id: "p2", name: "Paneer Pav Bhaji", price: 130, category: "Pav Bhaji", emoji: "🧀" },
  { id: "p3", name: "Cheese Pav Bhaji", price: 130, category: "Pav Bhaji", emoji: "🧈" },
  { id: "p4", name: "Extra Pav", price: 30, category: "Pav Bhaji", emoji: "🍞" },
  { id: "p5", name: "Extra Bhaji", price: 60, category: "Pav Bhaji", emoji: "🥘" },

  // Maggi
  { id: "mg1", name: "Plain Maggi", price: 50, category: "Maggi", emoji: "🍜" },
  { id: "mg2", name: "Masala Maggi", price: 60, category: "Maggi", emoji: "🌶️" },
  { id: "mg3", name: "Vegetable Maggi", price: 70, category: "Maggi", emoji: "🥦" },
  { id: "mg4", name: "Paneer Maggi", price: 80, category: "Maggi", emoji: "🧀" },
  { id: "mg5", name: "Cheese Maggi", price: 99, category: "Maggi", emoji: "🧈" },

  // Shakes (Small)
  { id: "sh1s", name: "Vanilla Shake (S)", price: 59, category: "Shakes", emoji: "🥤" },
  { id: "sh2s", name: "Strawberry Shake (S)", price: 69, category: "Shakes", emoji: "🍓" },
  { id: "sh3s", name: "Butterscotch Shake (S)", price: 69, category: "Shakes", emoji: "🍯" },
  { id: "sh4s", name: "Saffron Shake (S)", price: 69, category: "Shakes", emoji: "🌼" },
  { id: "sh5s", name: "Chocolate Shake (S)", price: 69, category: "Shakes", emoji: "🍫" },
  { id: "sh6s", name: "Oreo Shake (S)", price: 69, category: "Shakes", emoji: "🍪" },
  { id: "sh7s", name: "Kitkat Shake (S)", price: 79, category: "Shakes", emoji: "🍫" },

  // Shakes (Large)
  { id: "sh1l", name: "Vanilla Shake (L)", price: 79, category: "Shakes", emoji: "🥤" },
  { id: "sh2l", name: "Strawberry Shake (L)", price: 89, category: "Shakes", emoji: "🍓" },
  { id: "sh3l", name: "Butterscotch Shake (L)", price: 89, category: "Shakes", emoji: "🍯" },
  { id: "sh4l", name: "Saffron Shake (L)", price: 89, category: "Shakes", emoji: "🌼" },
  { id: "sh5l", name: "Chocolate Shake (L)", price: 89, category: "Shakes", emoji: "🍫" },
  { id: "sh6l", name: "Oreo Shake (L)", price: 109, category: "Shakes", emoji: "🍪" },
  { id: "sh7l", name: "Kitkat Shake (L)", price: 109, category: "Shakes", emoji: "🍫" },

  // Mojito (Small)
  { id: "mj1s", name: "Virgin Mojito (S)", price: 59, category: "Mojito", emoji: "🍹" },
  { id: "mj2s", name: "Mint Mojito (S)", price: 59, category: "Mojito", emoji: "🌿" },
  { id: "mj3s", name: "Green Apple Mojito (S)", price: 59, category: "Mojito", emoji: "🍏" },
  { id: "mj4s", name: "Blue Lagoon (S)", price: 59, category: "Mojito", emoji: "🔵" },
  { id: "mj5s", name: "Watermelon Mojito (S)", price: 59, category: "Mojito", emoji: "🍉" },
  { id: "mj6s", name: "Lemon Ice Tea (S)", price: 59, category: "Mojito", emoji: "🍋" },
  { id: "mj7s", name: "Lemon Soda (S)", price: 49, category: "Mojito", emoji: "🍋" },

  // Mojito (Large)
  { id: "mj1l", name: "Virgin Mojito (L)", price: 89, category: "Mojito", emoji: "🍹" },
  { id: "mj2l", name: "Mint Mojito (L)", price: 89, category: "Mojito", emoji: "🌿" },
  { id: "mj3l", name: "Green Apple Mojito (L)", price: 89, category: "Mojito", emoji: "🍏" },
  { id: "mj4l", name: "Blue Lagoon (L)", price: 89, category: "Mojito", emoji: "🔵" },
  { id: "mj5l", name: "Watermelon Mojito (L)", price: 89, category: "Mojito", emoji: "🍉" },
  { id: "mj6l", name: "Lemon Ice Tea (L)", price: 89, category: "Mojito", emoji: "🍋" },
  { id: "mj7l", name: "Lemon Soda (L)", price: 79, category: "Mojito", emoji: "🍋" },

  // Cold Coffees (Small)
  { id: "cc1s", name: "Cold Coffee (S)", price: 59, category: "Cold Coffees", emoji: "☕" },
  { id: "cc2s", name: "Cold Coffee Chocochips (S)", price: 89, category: "Cold Coffees", emoji: "🍫" },
  { id: "cc3s", name: "Cold Coffee Icecream (S)", price: 89, category: "Cold Coffees", emoji: "🍦" },
  { id: "cc4s", name: "Cold Coffee Ice+Choco (S)", price: 99, category: "Cold Coffees", emoji: "🍨" },

  // Cold Coffees (Large)
  { id: "cc1l", name: "Cold Coffee (L)", price: 99, category: "Cold Coffees", emoji: "☕" },
  { id: "cc2l", name: "Cold Coffee Chocochips (L)", price: 109, category: "Cold Coffees", emoji: "🍫" },
  { id: "cc3l", name: "Cold Coffee Icecream (L)", price: 109, category: "Cold Coffees", emoji: "🍦" },
  { id: "cc4l", name: "Cold Coffee Ice+Choco (L)", price: 129, category: "Cold Coffees", emoji: "🍨" },

  // Sandwich (Regular)
  { id: "sw1", name: "Veg. Sandwich", price: 60, category: "Sandwich", emoji: "🥪" },
  { id: "sw2", name: "Bombay Sandwich", price: 60, category: "Sandwich", emoji: "🥪" },
  { id: "sw3", name: "Cheese Sandwich", price: 90, category: "Sandwich", emoji: "🧀" },
  { id: "sw4", name: "Paneer Sandwich", price: 90, category: "Sandwich", emoji: "🥪" },

  // Sandwich (Grilled)
  { id: "sw1g", name: "Veg. Sandwich (Grilled)", price: 70, category: "Sandwich", emoji: "🥪" },
  { id: "sw2g", name: "Bombay Sandwich (Grilled)", price: 70, category: "Sandwich", emoji: "🥪" },
  { id: "sw3g", name: "Cheese Sandwich (Grilled)", price: 99, category: "Sandwich", emoji: "🧀" },
  { id: "sw4g", name: "Paneer Sandwich (Grilled)", price: 99, category: "Sandwich", emoji: "🥪" },

  // Pizza (S 6")
  { id: "pz1s", name: "Single Topping Pizza (S)", price: 79, category: "Pizza", emoji: "🍕" },
  { id: "pz2s", name: "Veggie Delight (S)", price: 89, category: "Pizza", emoji: "🍕" },
  { id: "pz3s", name: "Margherita Pizza (S)", price: 99, category: "Pizza", emoji: "🍕" },
  { id: "pz4s", name: "Spicy Veg. Delight (S)", price: 99, category: "Pizza", emoji: "🌶️" },
  { id: "pz5s", name: "Veggie Corn Pizza (S)", price: 109, category: "Pizza", emoji: "🌽" },
  { id: "pz6s", name: "Paneer Pizza (S)", price: 129, category: "Pizza", emoji: "🧀" },

  // Pizza (M 8")
  { id: "pz1m", name: "Single Topping Pizza (M)", price: 109, category: "Pizza", emoji: "🍕" },
  { id: "pz2m", name: "Veggie Delight (M)", price: 119, category: "Pizza", emoji: "🍕" },
  { id: "pz3m", name: "Margherita Pizza (M)", price: 129, category: "Pizza", emoji: "🍕" },
  { id: "pz4m", name: "Spicy Veg. Delight (M)", price: 129, category: "Pizza", emoji: "🌶️" },
  { id: "pz5m", name: "Veggie Corn Pizza (M)", price: 139, category: "Pizza", emoji: "🌽" },
  { id: "pz6m", name: "Paneer Pizza (M)", price: 159, category: "Pizza", emoji: "🧀" },
  { id: "pz7", name: "Garlic Bread", price: 129, category: "Pizza", emoji: "🧄" },

  // Pasta
  { id: "pa1", name: "Red Sauce Pasta", price: 149, category: "Pasta", emoji: "🍝" },
  { id: "pa2", name: "White Sauce Pasta", price: 179, category: "Pasta", emoji: "🍝" },
  { id: "pa3", name: "Pink Sauce Pasta", price: 199, category: "Pasta", emoji: "🍝" },

  // Dessert
  { id: "ds1", name: "Vanilla Ice Cream", price: 30, category: "Dessert", emoji: "🍦" },
  { id: "ds2", name: "Strawberry Ice Cream", price: 40, category: "Dessert", emoji: "🍓" },
  { id: "ds3", name: "Butterscotch Ice Cream", price: 40, category: "Dessert", emoji: "🍯" },
  { id: "ds4", name: "Chocolate Ice Cream", price: 40, category: "Dessert", emoji: "🍫" },

  // Specials
  { id: "sp1", name: "Spring Rolls", price: 99, category: "Specials", emoji: "🌯" },
  { id: "sp2", name: "Vada Pav", price: 40, category: "Specials", emoji: "🥔" },
  { id: "sp3", name: "Sweet Corn", price: 40, category: "Specials", emoji: "🌽" },
  { id: "sp4", name: "Hot Coffee", price: 30, category: "Specials", emoji: "☕" },
];

export const WHATSAPP_NUMBER = "918387800800"; // Replace with actual number

export const categories = [...new Set(menuItems.map((item) => item.category))];
