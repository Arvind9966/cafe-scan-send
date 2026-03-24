import { useState } from "react";
import { Send, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import type { CartItem } from "@/hooks/useCart";
import { WHATSAPP_NUMBER } from "@/lib/menu-data";
import { submitOrderToSheet } from "@/lib/google-form";

interface Props {
  cartItems: CartItem[];
  totalPrice: number;
  tableNumber: string;
  onBack: () => void;
  onDone: () => void;
}

export default function OrderConfirmation({ cartItems, totalPrice, tableNumber, onBack, onDone }: Props) {
  const [name, setName] = useState("");

  const handleSend = () => {
    const itemsList = cartItems.map((i) => `${i.name} x${i.quantity}`).join("\n");
    const message = `*New Order*\n\nName: ${name || "Guest"}\nTable: ${tableNumber}\n\n*Items:*\n${itemsList}\n\n*Total: Rs.${totalPrice}*`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
    onDone();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 z-50 bg-background flex flex-col"
    >
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full active:bg-secondary transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="font-display text-xl font-bold">Confirm Order</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="bg-secondary/50 rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Table</p>
          <p className="text-2xl font-bold text-foreground">#{tableNumber}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-3">Order Summary</h3>
          <div className="space-y-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between py-2 border-b border-border last:border-0">
                <span className="text-foreground">{item.name} ×{item.quantity}</span>
                <span className="font-semibold text-foreground">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 pt-3 border-t-2 border-primary/20">
            <span className="text-lg font-bold text-foreground">Total</span>
            <span className="text-lg font-bold text-primary">₹{totalPrice}</span>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <button
          onClick={handleSend}
          className="w-full bg-success text-success-foreground font-bold py-4 rounded-lg text-lg flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
        >
          <Send size={22} />
          Send Order via WhatsApp
        </button>
      </div>
    </motion.div>
  );
}
