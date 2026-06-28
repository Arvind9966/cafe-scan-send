import { useState } from "react";
import { Send, ArrowLeft, Smartphone, Wallet, Check, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { CartItem } from "@/hooks/useCart";
import { WHATSAPP_NUMBER, UPI_ID, UPI_PAYEE_NAME } from "@/lib/menu-data";
import { submitOrderToSheet } from "@/lib/google-form";
import gpayIcon from "@/assets/upi/gpay.png";
import phonepeIcon from "@/assets/upi/phonepe.png";
import paytmIcon from "@/assets/upi/paytm.png";
import bhimIcon from "@/assets/upi/bhim.png";
import upiIcon from "@/assets/upi/upi.png";


interface Props {
  cartItems: CartItem[];
  totalPrice: number;
  tableNumber: string;
  onBack: () => void;
  onDone: () => void;
}

type PaymentMode = "counter" | "upi";

type UpiAppId = "any" | "gpay" | "phonepe" | "paytm" | "bhim";

const UPI_APPS: { id: UpiAppId; name: string; icon: string; scheme: string; androidPackage?: string }[] = [
  { id: "gpay", name: "Google Pay", icon: gpayIcon, scheme: "tez://upi/pay", androidPackage: "com.google.android.apps.nbu.paisa.user" },
  { id: "phonepe", name: "PhonePe", icon: phonepeIcon, scheme: "phonepe://pay", androidPackage: "com.phonepe.app" },
  { id: "paytm", name: "Paytm", icon: paytmIcon, scheme: "paytmmp://pay", androidPackage: "net.one97.paytm" },
  { id: "bhim", name: "BHIM", icon: bhimIcon, scheme: "bhim://upi/pay", androidPackage: "in.org.npci.upiapp" },
  { id: "any", name: "Other UPI App", icon: upiIcon, scheme: "upi://pay" },
];

export default function OrderConfirmation({ cartItems, totalPrice, tableNumber, onBack, onDone }: Props) {
  const [name, setName] = useState("");
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("counter");
  const [showAppPicker, setShowAppPicker] = useState(false);
  const [awaitingPaymentConfirm, setAwaitingPaymentConfirm] = useState(false);
  const [noUpiApp, setNoUpiApp] = useState(false);

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
        ? `*Payment Mode:* Online (UPI)\n*Payment Status:* Customer marked as Paid\n_Please verify payment before preparing order._`
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

  const buildUpiQuery = () => {
    // Match the exact params of the Paytm QR (no amount/currency).
    // Paytm's risk policy rejects pre-filled amounts on .ptys static-QR VPAs
    // when launched from third-party deep links. Customer enters amount in-app,
    // exactly like scanning the QR.
    const params = new URLSearchParams({
      pa: UPI_ID,
      pn: "Paytm",
      tn: "Verified Paytm Merchant",
    });

    return params.toString();
  };


  const launchSpecificApp = (app: typeof UPI_APPS[number]) => {
    const query = buildUpiQuery();
    const isAndroid = /Android/i.test(navigator.userAgent);

    let url: string;
    if (app.id === "any" && isAndroid) {
      // Android intent URL with no package -> forces system chooser
      url =
        `intent://pay?${query}#Intent;scheme=upi;` +
        `S.browser_fallback_url=${encodeURIComponent("https://www.npci.org.in/what-we-do/upi/product-overview")};end`;
    } else if (isAndroid && app.androidPackage && app.id !== "any") {
      // Android intent pinned to specific package -> opens that app directly
      url =
        `intent://pay?${query}#Intent;scheme=upi;package=${app.androidPackage};end`;
    } else {
      // iOS or "any" fallback -> use app-specific scheme or generic upi://
      url = `${app.scheme}?${query}`;
    }

    setNoUpiApp(false);
    setShowAppPicker(false);
    setAwaitingPaymentConfirm(true);

    let handled = false;
    const onHide = () => {
      if (document.hidden) handled = true;
    };
    document.addEventListener("visibilitychange", onHide);
    const start = Date.now();

    window.location.href = url;

    window.setTimeout(() => {
      document.removeEventListener("visibilitychange", onHide);
      if (!handled && !document.hidden && Date.now() - start < 2500) {
        setNoUpiApp(true);
      }
    }, 1500);
  };

  const handleSend = () => {
    if (paymentMode === "upi") {
      setShowAppPicker(true);
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
              onClick={() => { setPaymentMode("upi"); setNoUpiApp(false); setAwaitingPaymentConfirm(false); }}
              icon={<Smartphone size={22} />}
              iconBg="bg-success/15 text-success"
              title="Pay Online (UPI)"
              subtitle="Opens your installed UPI app (GPay, PhonePe, Paytm…)"
              accent="🟢"
            />
            <PaymentCard
              selected={paymentMode === "counter"}
              onClick={() => { setPaymentMode("counter"); setNoUpiApp(false); setAwaitingPaymentConfirm(false); }}
              icon={<Wallet size={22} />}
              iconBg="bg-muted text-muted-foreground"
              title="Pay at Counter"
              subtitle="Pay after receiving your order"
              accent="⚪"
            />
          </div>

          {noUpiApp && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-3 rounded-lg border border-destructive/30 bg-destructive/10 text-sm text-destructive"
            >
              No UPI application was found on this device. Please choose "Pay at Counter" or install a UPI app and try again.
            </motion.div>
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
              className="space-y-2"
            >
              <p className="text-center text-sm text-muted-foreground">
                Once your UPI payment is complete, tap below to send your order.
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
                  onClick={() => { setAwaitingPaymentConfirm(false); setShowAppPicker(true); }}
                  className="flex-1 text-primary text-sm py-2 font-medium"
                >
                  Reopen UPI App
                </button>
                <button
                  onClick={() => { setAwaitingPaymentConfirm(false); setNoUpiApp(false); }}
                  className="flex-1 text-muted-foreground text-sm py-2"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* UPI App Picker Bottom Sheet */}
      <AnimatePresence>
        {showAppPicker && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAppPicker(false)}
              className="fixed inset-0 z-[60] bg-black/50"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[61] bg-background rounded-t-3xl p-5 pb-8 shadow-2xl"
            >
              <div className="w-12 h-1.5 bg-border rounded-full mx-auto mb-4" />
              <h3 className="font-display text-lg font-bold text-center mb-1">Choose UPI App</h3>
              <p className="text-center text-sm text-muted-foreground mb-2">
                Paying <span className="font-bold text-foreground">₹{totalPrice}</span> to {UPI_PAYEE_NAME}
              </p>
              <p className="text-center text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/30 rounded-lg px-3 py-2 mb-5">
                ⚠️ Please enter the amount <b>₹{totalPrice}</b> manually in your UPI app
              </p>

              <div className="grid grid-cols-2 gap-3">
                {UPI_APPS.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => launchSpecificApp(app)}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-border bg-card active:scale-95 active:border-primary transition-all"
                  >
                    <img
                      src={app.icon}
                      alt={app.name}
                      className="w-12 h-12 object-contain"
                      width={48}
                      height={48}
                      loading="lazy"
                    />
                    <span className="text-sm font-semibold text-foreground">{app.name}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowAppPicker(false)}
                className="w-full mt-4 py-3 text-muted-foreground text-sm font-medium"
              >
                Cancel
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
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
