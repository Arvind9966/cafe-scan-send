import { useState } from "react";
import { Plus, Pencil, Trash2, ArrowLeft, LogOut, Eye, EyeOff, Save, X } from "lucide-react";
import { useMenuStore, type StoredMenuItem } from "@/hooks/useMenuStore";
import { Link } from "react-router-dom";

const ADMIN_PASSWORD = "admin123";

const CATEGORY_OPTIONS = [
  "Rolls", "French Fries", "Burger", "Momos", "Chowmein", "Pav Bhaji", "Maggi",
  "Shakes", "Mojito", "Cold Coffees", "Sandwich", "Pizza", "Pasta", "Dessert", "Specials", "Combos",
];

const EMOJI_MAP: Record<string, string> = {
  "Rolls": "🌯", "French Fries": "🍟", "Burger": "🍔", "Momos": "🥟",
  "Chowmein": "🍜", "Pav Bhaji": "🍞", "Maggi": "🍜", "Shakes": "🥤",
  "Mojito": "🍹", "Cold Coffees": "☕", "Sandwich": "🥪", "Pizza": "🍕",
  "Pasta": "🍝", "Dessert": "🍦", "Specials": "⭐", "Combos": "🎉",
};

const VARIANT_OPTIONS = [
  { value: "", label: "No Variant" },
  { value: "(S)", label: "Small (S)" },
  { value: "(L)", label: "Large (L)" },
  { value: "(H)", label: "Half (H)" },
  { value: "(F)", label: "Full (F)" },
  { value: "(M)", label: "Medium (M)" },
  { value: "(Grilled)", label: "Grilled" },
];

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground text-sm mt-1">Lala Laaya Burger</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            {error && <p className="text-destructive text-sm mt-1">Incorrect password</p>}
          </div>
          <button type="submit" className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg active:scale-[0.98] transition-transform">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

interface ItemFormData {
  name: string;
  price: string;
  category: string;
  customCategory: string;
  emoji: string;
  available: boolean;
  variant: string;
}

const emptyForm: ItemFormData = { name: "", price: "", category: CATEGORY_OPTIONS[0], customCategory: "", emoji: "", available: true, variant: "" };

function parseVariantFromName(name: string): { baseName: string; variant: string } {
  for (const opt of VARIANT_OPTIONS) {
    if (opt.value && name.endsWith(` ${opt.value}`)) {
      return { baseName: name.replace(` ${opt.value}`, ""), variant: opt.value };
    }
  }
  return { baseName: name, variant: "" };
}

function buildNameWithVariant(baseName: string, variant: string): string {
  return variant ? `${baseName} ${variant}` : baseName;
}

function ItemForm({ initial, onSave, onCancel }: {
  initial?: ItemFormData;
  onSave: (data: ItemFormData) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<ItemFormData>(initial || emptyForm);

  const handleCategoryChange = (cat: string) => {
    setForm((f) => ({ ...f, category: cat, emoji: f.emoji || EMOJI_MAP[cat] || "🍽️" }));
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-3">
      <input
        type="text"
        placeholder="Item name"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
      />
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Price (₹)"
          value={form.price}
          onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
          className="flex-1 px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        <input
          type="text"
          placeholder="Emoji"
          value={form.emoji}
          onChange={(e) => setForm((f) => ({ ...f, emoji: e.target.value }))}
          className="w-20 px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>
      <div className="flex gap-2">
        <select
          value={form.category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="flex-1 px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={form.variant}
          onChange={(e) => setForm((f) => ({ ...f, variant: e.target.value }))}
          className="w-36 px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          {VARIANT_OPTIONS.map((v) => (
            <option key={v.value} value={v.value}>{v.label}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={form.available}
            onChange={(e) => setForm((f) => ({ ...f, available: e.target.checked }))}
            className="rounded accent-primary"
          />
          Available
        </label>
        <div className="flex gap-2">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground active:scale-95 transition-transform">
            <X size={16} />
          </button>
          <button
            onClick={() => { if (form.name && form.price) onSave(form); }}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold flex items-center gap-1.5 active:scale-95 transition-transform"
          >
            <Save size={16} /> Save
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { items, categories, addItem, updateItem, deleteItem, toggleAvailability } = useMenuStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const filtered = filterCategory === "All" ? items : items.filter((i) => i.category === filterCategory);

  const handleAdd = (data: ItemFormData) => {
    const finalName = buildNameWithVariant(data.name, data.variant);
    addItem({
      name: finalName,
      price: Number(data.price),
      category: data.category,
      emoji: data.emoji || EMOJI_MAP[data.category] || "🍽️",
      available: data.available,
    });
    setShowAddForm(false);
  };

  const handleEdit = (id: string, data: ItemFormData) => {
    const finalName = buildNameWithVariant(data.name, data.variant);
    updateItem(id, {
      name: finalName,
      price: Number(data.price),
      category: data.category,
      emoji: data.emoji || EMOJI_MAP[data.category] || "🍽️",
      available: data.available,
    });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto pb-8">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="p-2 -ml-2 rounded-full active:bg-secondary transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="font-display text-lg font-bold text-foreground">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">{items.length} items</p>
            </div>
          </div>
          <button onClick={onLogout} className="flex items-center gap-1.5 text-sm text-muted-foreground px-3 py-2 rounded-lg active:bg-secondary transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="px-4 mt-4 space-y-4">
        {/* Add Button */}
        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full py-3 rounded-xl border-2 border-dashed border-primary/30 text-primary font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform hover:bg-primary/5"
          >
            <Plus size={20} /> Add New Item
          </button>
        ) : (
          <ItemForm onSave={handleAdd} onCancel={() => setShowAddForm(false)} />
        )}

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                filterCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="space-y-2">
          {filtered.map((item) =>
            editingId === item.id ? (
              <ItemForm
                key={item.id}
                initial={{
                  name: parseVariantFromName(item.name).baseName,
                  price: String(item.price),
                  category: item.category,
                  emoji: item.emoji,
                  available: item.available,
                  variant: parseVariantFromName(item.name).variant,
                }}
                onSave={(data) => handleEdit(item.id, data)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div
                key={item.id}
                className={`bg-card border border-border rounded-xl p-3 flex items-center gap-3 transition-opacity ${
                  !item.available ? "opacity-50" : ""
                }`}
              >
                <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground text-sm truncate">{item.name}</p>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="text-primary font-bold text-sm">₹{item.price}</span>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{item.category}</span>
                    {parseVariantFromName(item.name).variant && (
                      <span className="text-xs font-semibold text-accent-foreground bg-accent px-2 py-0.5 rounded-full">
                        {VARIANT_OPTIONS.find(v => v.value === parseVariantFromName(item.name).variant)?.label || parseVariantFromName(item.name).variant}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => toggleAvailability(item.id)}
                    title={item.available ? "Mark out of stock" : "Mark available"}
                    className={`p-2 rounded-lg transition-colors ${
                      item.available ? "text-success active:bg-success/10" : "text-muted-foreground active:bg-secondary"
                    }`}
                  >
                    {item.available ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <button
                    onClick={() => setEditingId(item.id)}
                    className="p-2 rounded-lg text-muted-foreground active:bg-secondary transition-colors"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => { if (confirm("Delete this item?")) deleteItem(item.id); }}
                    className="p-2 rounded-lg text-destructive active:bg-destructive/10 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const [authed, setAuthed] = useState(false);

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;
  return <AdminDashboard onLogout={() => setAuthed(false)} />;
}
