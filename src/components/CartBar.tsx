import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { CartItem } from "@/hooks/useCart";

interface Props {
  cartItems: CartItem[];
  totalPrice: number;
  totalItems: number;
  onPlaceOrder: () => void;
}

export default function CartBar({ cartItems, totalPrice, totalItems, onPlaceOrder }: Props) {
  if (totalItems === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-[0_-4px_20px_hsl(var(--foreground)/0.08)]"
      >
        <div className="max-w-lg mx-auto p-4">
          <div className="mb-3 max-h-28 overflow-y-auto space-y-1">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-muted-foreground">
                <span>{item.name} ×{item.quantity}</span>
                <span className="font-medium text-foreground">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <button
            onClick={onPlaceOrder}
            className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-lg text-lg flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
          >
            <ShoppingBag size={22} />
            Place Order · ₹{totalPrice}
            <span className="bg-primary-foreground/20 px-2 py-0.5 rounded-full text-sm">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
