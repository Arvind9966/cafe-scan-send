import { Bell, Receipt, Droplets } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/menu-data";

interface Props {
  tableNumber: string;
}

const actions = [
  { label: "Call Waiter", icon: Bell, message: "🔔 Please send a waiter" },
  { label: "Request Bill", icon: Receipt, message: "🧾 Please bring the bill" },
  { label: "Need Water", icon: Droplets, message: "💧 Please bring water" },
];

export default function QuickActions({ tableNumber }: Props) {
  const send = (msg: string) => {
    const full = `${msg}\n🪑 Table: ${tableNumber}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(full)}`, "_blank");
  };

  return (
    <div className="flex gap-2">
      {actions.map((a) => (
        <button
          key={a.label}
          onClick={() => send(a.message)}
          className="flex-1 flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium active:scale-95 transition-transform"
        >
          <a.icon size={20} />
          {a.label}
        </button>
      ))}
    </div>
  );
}
