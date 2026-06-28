import { useState } from "react";
import { Send, ArrowLeft, Smartphone, Wallet, Check, CheckCircle2, Copy, QrCode } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { CartItem } from "@/hooks/useCart";
import { WHATSAPP_NUMBER, UPI_ID, UPI_PAYEE_NAME } from "@/lib/menu-data";
import { submitOrderToSheet } from "@/lib/google-form";
import paytmIcon from "@/assets/upi/paytm.png";
import paytmQr from "@/assets/paytm-qr.png";


interface Props {
  cartItems: CartItem[];
  totalPrice: number;
  tableNumber: string;
  onBack: () => void;
  onDone: () => void;
}

type PaymentMode = "counter" | "upi";

export default function OrderConfirmation({ cartItems, totalPrice, tableNumber, onBack, onDone }: Props) {
  const [name, setName] = useState("");
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("counter");
  const [awaitingPaymentConfirm, setAwaitingPaymentConfirm] = useState(false);
  const [copiedField, setCopiedField] = useState<"upi" | "amount" | null>(null);

  const buildMessageAndSend = (mode: PaymentMode) => {
    const itemsList = cartItems.map((i) => `${i.name} x${i.quantity}`).join("\n");
    const paymentLabel = mode === "upi" ? "Online (UPI)" : "Pay at Counter";
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    submitOrderToSheet({
      name: name || "Guest",
      table: tableNumber,
      items: `${itemsList}\n\nPayment Mode: ${paymentLabel}`,
      total: `Rs.${totalPrice}`,
    });

    const paymentBlock =
      mode === "upi"
        ? `*Payment Mode:* Online (Manual UPI QR)\n*Payment Status:* Customer marked as Paid\n_Please verify payment before preparing order._`
        : `*Payment Mode:* Pay at Counter`;

    const message =
      `*New Order*\n\n` +
      `*Customer:* ${name || "Guest"}\n` +
      `*Table:* ${tableNumber}\n\n` +
      `*Items:*\n${itemsList}\n\n` +
      `*Total:* Rs.${totalPrice}\n\n` +
      `${paymentBlock}\n\n` +
      `*Timestamp:* ${timestamp}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
    onDone();
  };

  const copyToClipboard = async (value: string, field: "upi" | "amount") => {
    await navigator.clipboard?.writeText(value);
    setCopiedField(field);
    window.setTimeout(() => setCopiedField(null), 1800);
  };

  const handleSend = () => {
    if (paymentMode === "upi") {
      setAwaitingPaymentConfirm(true);
    } else {
      buildMessageAndSend("counter");
    }
  };

  const primaryLabel =
    paymentMode === "upi" ? "Pay Online via UPI" : "Send Order via WhatsApp";


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

        {/* Payment Method Selection */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Choose Payment Method</h3>
          <div className="space-y-3">
            <PaymentCard
              selected={paymentMode === "upi"}
              onClick={() => { setPaymentMode("upi"); setAwaitingPaymentConfirm(false); }}
              icon={<Smartphone size={22} />}
              iconBg="bg-success/15 text-success"
              title="Pay Online (UPI)"
              subtitle="Scan QR or copy UPI ID, then enter amount manually"
              accent="🟢"
            />
            <PaymentCard
              selected={paymentMode === "counter"}
              onClick={() => { setPaymentMode("counter"); setAwaitingPaymentConfirm(false); }}
              icon={<Wallet size={22} />}
              iconBg="bg-muted text-muted-foreground"
              title="Pay at Counter"
              subtitle="Pay after receiving your order"
              accent="⚪"
            />
          </div>

          {paymentMode === "upi" && (
            <div className="mt-3 p-3 rounded-lg border border-primary/20 bg-primary/5 text-sm text-muted-foreground">
              Paytm is blocking direct payment links, so use the QR or copy option below for a normal manual UPI payment.
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <AnimatePresence mode="wait">
          {!awaitingPaymentConfirm ? (
            <motion.button
              key="send"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleSend}
              className="w-full bg-success text-success-foreground font-bold py-4 rounded-lg text-lg flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
            >
              {paymentMode === "upi" ? <Smartphone size={22} /> : <Send size={22} />}
              {primaryLabel}
            </motion.button>
          ) : (
            <motion.div
              key="paid"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              {paymentMode === "upi" && (
                <div className="rounded-2xl border border-border bg-card p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-success/15 text-success flex items-center justify-center">
                      <QrCode size={22} />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Pay with UPI QR</p>
                      <p className="text-xs text-muted-foreground">Enter ₹{totalPrice} manually in your UPI app</p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="rounded-2xl border border-border bg-background p-3">
                      <img
                        src={paytmQr}
                        alt="Paytm merchant QR code for Lala Laaya Burger UPI payment"
                        className="w-44 h-44 object-contain"
                        width={176}
                        height={176}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <CopyButton
                      label={copiedField === "upi" ? "Copied" : "Copy UPI ID"}
                      value={UPI_ID}
                      onClick={() => copyToClipboard(UPI_ID, "upi")}
                    />
                    <CopyButton
                      label={copiedField === "amount" ? "Copied" : "Copy Amount"}
                      value={`₹${totalPrice}`}
                      onClick={() => copyToClipboard(String(totalPrice), "amount")}
                    />
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-secondary/60 p-3">
                    <img src={paytmIcon} alt="Paytm" className="w-8 h-8 object-contain" width={32} height={32} />
                    <p className="text-xs text-muted-foreground">
                      Payee: <span className="font-semibold text-foreground">{UPI_PAYEE_NAME}</span><br />
                      UPI ID: <span className="font-semibold text-foreground">{UPI_ID}</span>
                    </p>
                  </div>
                </div>
              )}
              <p className="text-center text-sm text-muted-foreground">
                After completing payment, tap below to send your order.
              </p>
              <button
                onClick={() => buildMessageAndSend("upi")}
                className="w-full bg-success text-success-foreground font-bold py-4 rounded-lg text-lg flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
              >
                <CheckCircle2 size={22} />
                Continue to Send Order
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setAwaitingPaymentConfirm(false)}
                  className="flex-1 text-primary text-sm py-2 font-medium"
                >
                  Change Payment
                </button>
                <button
                  onClick={() => setAwaitingPaymentConfirm(false)}
                  className="flex-1 text-muted-foreground text-sm py-2"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </motion.div>
  );
}

function CopyButton({ label, value, onClick }: { label: string; value: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl border border-border bg-background p-3 text-left active:scale-[0.98] transition-transform"
    >
      <span className="flex items-center gap-2 text-sm font-bold text-foreground">
        <Copy size={15} />
        {label}
      </span>
      <span className="mt-1 block text-xs text-muted-foreground break-all">{value}</span>
    </button>
  );
}

interface PaymentCardProps {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
  accent: string;
}

function PaymentCard({ selected, onClick, icon, iconBg, title, subtitle, accent }: PaymentCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      animate={{
        borderColor: selected ? "hsl(var(--primary))" : "hsl(var(--border))",
        backgroundColor: selected ? "hsl(var(--primary) / 0.05)" : "hsl(var(--card))",
      }}
      transition={{ duration: 0.2 }}
      className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left shadow-sm"
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground flex items-center gap-1.5">
          <span className="text-xs">{accent}</span>
          {title}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
      <motion.div
        animate={{
          scale: selected ? 1 : 0.8,
          opacity: selected ? 1 : 0.3,
        }}
        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
          selected ? "bg-primary border-primary" : "border-border bg-transparent"
        }`}
      >
        {selected && <Check size={14} className="text-primary-foreground" strokeWidth={3} />}
      </motion.div>
    </motion.button>
  );
}
