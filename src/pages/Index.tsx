import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { UtensilsCrossed } from "lucide-react";
import { menuItems, categories } from "@/lib/menu-data";
import { useCart } from "@/hooks/useCart";
import MenuItemCard from "@/components/MenuItemCard";
import CartBar from "@/components/CartBar";
import OrderConfirmation from "@/components/OrderConfirmation";
import QuickActions from "@/components/QuickActions";
import cafeHero from "@/assets/cafe-hero.jpg";

export default function Index() {
  const [searchParams] = useSearchParams();
  const tableNumber = searchParams.get("table") || "1";
  const { cartItems, totalPrice, totalItems, addItem, removeItem, getQuantity, clear } = useCart();
  const [showConfirm, setShowConfirm] = useState(false);

  const grouped = useMemo(
    () => categories.map((cat) => ({ category: cat, items: menuItems.filter((i) => i.category === cat) })),
    []
  );

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto pb-40">
      {/* Hero */}
      <div className="relative h-40 overflow-hidden">
        <img src={cafeHero} alt="Cafe" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl font-bold text-foreground">Lala Laaya Burger</h1>
          </div>
          <div className="inline-block mt-1 bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full">
            Table #{tableNumber}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-4">
        <QuickActions tableNumber={tableNumber} />
      </div>

      {/* Menu */}
      <div className="px-4 mt-6 space-y-6">
        {grouped.map(({ category, items }) => (
          <section key={category}>
            <h2 className="font-display text-lg font-bold text-foreground mb-3">{category}</h2>
            <div className="space-y-2">
              {items.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  quantity={getQuantity(item.id)}
                  onAdd={() => addItem(item)}
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Cart */}
      <CartBar
        cartItems={cartItems}
        totalPrice={totalPrice}
        totalItems={totalItems}
        onPlaceOrder={() => setShowConfirm(true)}
      />

      {/* Confirmation */}
      {showConfirm && (
        <OrderConfirmation
          cartItems={cartItems}
          totalPrice={totalPrice}
          tableNumber={tableNumber}
          onBack={() => setShowConfirm(false)}
          onDone={() => { clear(); setShowConfirm(false); }}
        />
      )}
    </div>
  );
}
