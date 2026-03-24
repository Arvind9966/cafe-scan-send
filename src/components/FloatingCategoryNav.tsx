import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UtensilsCrossed } from "lucide-react";

const CATEGORY_EMOJIS: Record<string, string> = {
  Combos: "🎉",
  Rolls: "🌯",
  "French Fries": "🍟",
  Burger: "🍔",
  Momos: "🥟",
  Chowmein: "🍜",
  "Pav Bhaji": "🍞",
  Maggi: "🍜",
  Shakes: "🥤",
  Mojito: "🍹",
  "Cold Coffees": "☕",
  Sandwich: "🥪",
  Pizza: "🍕",
  Pasta: "🍝",
  Dessert: "🍦",
  Specials: "⭐",
};

interface Props {
  categories: string[];
}

export default function FloatingCategoryNav({ categories }: Props) {
  const [open, setOpen] = useState(false);

  const scrollTo = (category: string) => {
    const el = document.getElementById(`cat-${category}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
  };

  return (
    <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-3 w-56 max-h-[60vh] overflow-y-auto rounded-2xl shadow-2xl border border-white/10"
            style={{ background: "#111" }}
          >
            <div className="p-3 border-b border-white/10">
              <p className="text-white/60 text-xs font-medium uppercase tracking-wider">Browse Menu</p>
            </div>
            <div className="p-2 space-y-0.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => scrollTo(cat)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-white/90 hover:bg-white/10 active:bg-white/15 transition-colors"
                >
                  <span className="text-lg">{CATEGORY_EMOJIS[cat] || "🍽️"}</span>
                  <span className="text-sm font-medium truncate">{cat}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen((o) => !o)}
        className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors"
        style={{ background: open ? "#333" : "#111" }}
        aria-label="Browse menu categories"
      >
        {open ? (
          <X size={22} className="text-white" />
        ) : (
          <UtensilsCrossed size={22} className="text-white" />
        )}
      </motion.button>
    </div>
  );
}
