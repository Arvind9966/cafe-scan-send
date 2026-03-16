import { Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import type { MenuItem } from "@/lib/menu-data";

interface Props {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export default function MenuItemCard({ item, quantity, onAdd, onRemove }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between rounded-lg bg-card p-4 shadow-sm border border-border"
    >
      <div className="min-w-0">
        <p className="font-semibold text-card-foreground truncate">{item.name}</p>
        <p className="text-primary font-bold">₹{item.price}</p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {quantity > 0 && (
          <>
            <button
              onClick={onRemove}
              className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground active:scale-90 transition-transform"
              aria-label={`Remove ${item.name}`}
            >
              <Minus size={18} />
            </button>
            <motion.span
              key={quantity}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              className="w-6 text-center font-bold text-foreground"
            >
              {quantity}
            </motion.span>
          </>
        )}
        <button
          onClick={onAdd}
          className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground active:scale-90 transition-transform"
          aria-label={`Add ${item.name}`}
        >
          <Plus size={18} />
        </button>
      </div>
    </motion.div>
  );
}
