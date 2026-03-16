import { motion, AnimatePresence } from "framer-motion";
import type { SizeVariant } from "@/lib/menu-groups";

interface Props {
  itemName: string;
  emoji: string;
  variants: SizeVariant[];
  onSelect: (variant: SizeVariant) => void;
  onClose: () => void;
}

export default function SizePicker({ itemName, emoji, variants, onSelect, onClose }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          exit={{ y: 200 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg bg-card rounded-t-2xl p-5 pb-8 border-t border-border"
        >
          <div className="w-10 h-1 rounded-full bg-muted mx-auto mb-4" />
          <h3 className="font-display text-lg font-bold text-foreground text-center mb-1">
            {emoji} {itemName}
          </h3>
          <p className="text-sm text-muted-foreground text-center mb-4">Choose a size</p>
          <div className="space-y-2">
            {variants.map((v) => (
              <button
                key={v.item.id}
                onClick={() => onSelect(v)}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl border border-border bg-background hover:border-primary/50 active:scale-[0.98] transition-all"
              >
                <span className="font-semibold text-foreground">{v.label}</span>
                <span className="font-bold text-primary">₹{v.item.price}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
