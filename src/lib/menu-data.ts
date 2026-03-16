export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  variant?: string;
}

export const menuItems: MenuItem[] = [
  // Rolls
  { id: "r1", name: "Veg. Roll", price: 40, category: "Rolls" },
  { id: "r2", name: "Chowmein Roll", price: 50, category: "Rolls" },
  { id: "r3", name: "Aloo Tikki Roll", price: 60, category: "Rolls" },
  { id: "r4", name: "Tandoori Roll", price: 60, category: "Rolls" },
  { id: "r5", name: "Paneer Makhni Roll", price: 80, category: "Rolls" },
  { id: "r6", name: "Cheese Roll", price: 80, category: "Rolls" },
  { id: "r7", name: "Lala Spe. Roll", price: 99, category: "Rolls" },

  // French Fries
  { id: "f1", name: "Salted Fries", price: 70, category: "French Fries" },
  { id: "f2", name: "Masala Fries", price: 80, category: "French Fries" },
  { id: "f3", name: "Peri Peri Fries", price: 80, category: "French Fries" },
  { id: "f4", name: "Cheese Fries", price: 90, category: "French Fries" },

  // Burger (Small)
  { id: "bs1", name: "Veg. Burger (S)", price: 39, category: "Burger" },
  { id: "bs2", name: "Veg. Chowmein Burger (S)", price: 49, category: "Burger" },
  { id: "bs3", name: "Double Tikki Burger (S)", price: 59, category: "Burger" },
  { id: "bs4", name: "Crunchy Tikki Burger (S)", price: 59, category: "Burger" },
  { id: "bs5", name: "Tandoori Spicy Burger (S)", price: 69, category: "Burger" },
  { id: "bs6", name: "Juicy Burger (S)", price: 69, category: "Burger" },
  { id: "bs7", name: "Mexican Burger (S)", price: 69, category: "Burger" },
  { id: "bs8", name: "Amul Cheese Burger (S)", price: 79, category: "Burger" },
  { id: "bs9", name: "Paneer Makhni Burger (S)", price: 79, category: "Burger" },
  { id: "bs10", name: "Special Burger (S)", price: 99, category: "Burger" },

  // Burger (Large)
  { id: "bl1", name: "Veg. Burger (L)", price: 59, category: "Burger" },
  { id: "bl2", name: "Veg. Chowmein Burger (L)", price: 69, category: "Burger" },
  { id: "bl3", name: "Double Tikki Burger (L)", price: 79, category: "Burger" },
  { id: "bl4", name: "Crunchy Tikki Burger (L)", price: 79, category: "Burger" },
  { id: "bl5", name: "Tandoori Spicy Burger (L)", price: 89, category: "Burger" },
  { id: "bl6", name: "Juicy Burger (L)", price: 89, category: "Burger" },
  { id: "bl7", name: "Mexican Burger (L)", price: 89, category: "Burger" },
  { id: "bl8", name: "Amul Cheese Burger (L)", price: 99, category: "Burger" },
  { id: "bl9", name: "Paneer Makhni Burger (L)", price: 99, category: "Burger" },
  { id: "bl10", name: "Special Burger (L)", price: 119, category: "Burger" },
  { id: "bl11", name: "Lala Special Burger", price: 149, category: "Burger" },

  // Momos (Half)
  { id: "mh1", name: "Steam Momos (H)", price: 40, category: "Momos" },
  { id: "mh2", name: "Fried Momos (H)", price: 50, category: "Momos" },
  { id: "mh3", name: "Kurkure Momos (H)", price: 80, category: "Momos" },
  { id: "mh4", name: "Tandoori Momos (H)", price: 80, category: "Momos" },
  { id: "mh5", name: "Gravy Momos (H)", price: 80, category: "Momos" },

  // Momos (Full)
  { id: "mf1", name: "Steam Momos (F)", price: 60, category: "Momos" },
  { id: "mf2", name: "Fried Momos (F)", price: 70, category: "Momos" },
  { id: "mf3", name: "Kurkure Momos (F)", price: 119, category: "Momos" },
  { id: "mf4", name: "Tandoori Momos (F)", price: 119, category: "Momos" },
  { id: "mf5", name: "Gravy Momos (F)", price: 119, category: "Momos" },

  // Chowmein
  { id: "c1", name: "Veg. Chowmein", price: 60, category: "Chowmein" },
  { id: "c2", name: "Paneer Chowmein", price: 80, category: "Chowmein" },
  { id: "c3", name: "Garlic Noodles", price: 80, category: "Chowmein" },
  { id: "c4", name: "Hakka Noodles", price: 80, category: "Chowmein" },
  { id: "c5", name: "Chowmein Momos", price: 99, category: "Chowmein" },

  // Pav Bhaji
  { id: "p1", name: "Pav Bhaji", price: 80, category: "Pav Bhaji" },
  { id: "p2", name: "Masala Pav Bhaji", price: 90, category: "Pav Bhaji" },
  { id: "p3", name: "Paneer Pav Bhaji", price: 120, category: "Pav Bhaji" },
  { id: "p4", name: "Cheese Pav Bhaji", price: 120, category: "Pav Bhaji" },
  { id: "p5", name: "Extra Pav", price: 30, category: "Pav Bhaji" },
  { id: "p6", name: "Extra Bhaji", price: 40, category: "Pav Bhaji" },

  // Maggi
  { id: "mg1", name: "Plain Maggi", price: 50, category: "Maggi" },
  { id: "mg2", name: "Masala Maggi", price: 60, category: "Maggi" },
  { id: "mg3", name: "Vegetable Maggi", price: 70, category: "Maggi" },
  { id: "mg4", name: "Paneer Maggi", price: 80, category: "Maggi" },
  { id: "mg5", name: "Cheese Maggi", price: 99, category: "Maggi" },
];

export const WHATSAPP_NUMBER = "918000702671"; // Replace with actual number

export const categories = [...new Set(menuItems.map((item) => item.category))];
