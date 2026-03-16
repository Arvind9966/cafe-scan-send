import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
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
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const items = q ? menuItems.filter((i) => i.name.toLowerCase().includes(q)) : menuItems;
    return categories
      .map((cat) => ({ category: cat, items: items.filter((i) => i.category === cat) }))
      .filter((g) => g.items.length > 0);
  }, [search]);

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

      {/* Search */}
      <div className="px-4 mt-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search menu..."
            className="w-full pl-10 pr-10 py-3 rounded-lg border border-input bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 mt-6 space-y-6">
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No items found</p>
        )}
        {filtered.map(({ category, items }) => (
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
