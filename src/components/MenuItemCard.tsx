import { Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import type { GroupedMenuItem } from "@/lib/menu-groups";

interface Props {
  group: GroupedMenuItem;
  totalQuantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export default function MenuItemCard({ group, totalQuantity, onAdd, onRemove }: Props) {
  const hasVariants = group.variants.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between rounded-lg bg-card p-4 shadow-sm border border-border"
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-2xl flex-shrink-0">{group.emoji}</span>
        <div className="min-w-0">
          <p className="font-semibold text-card-foreground truncate">{group.baseName}</p>
          <p className="text-primary font-bold">
            {hasVariants ? `from ₹${group.startingPrice}` : `₹${group.startingPrice}`}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {totalQuantity > 0 && (
          <>
            <button
              onClick={onRemove}
              className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground active:scale-90 transition-transform"
              aria-label={`Remove ${group.baseName}`}
            >
              <Minus size={18} />
            </button>
            <motion.span
              key={totalQuantity}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              className="w-6 text-center font-bold text-foreground"
            >
              {totalQuantity}
            </motion.span>
          </>
        )}
        <button
          onClick={onAdd}
          className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground active:scale-90 transition-transform"
          aria-label={`Add ${group.baseName}`}
        >
          <Plus size={18} />
        </button>
      </div>
    </motion.div>
  );
}
