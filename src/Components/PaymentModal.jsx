const GST_RATE = 0.18;

export default function PaymentModal({ item, orderId, onClose, onBack, onPay, paying }) {
  const currency  = item?.currency === "USD" ? "$" : "₹";
  const title     = item?.title || "Course";
  const basePrice = Number(item?.price ?? 0);
  const origPrice = item?.originalPrice ?? item?.origPrice ?? null;
  const tax       = Math.round(basePrice * GST_RATE);
  const total     = basePrice + tax;
  const benefits  = item?.benefits || ["Step-by-step lessons", "Lifetime access", "English captions", "Certificate of completion"];
  const shortId   = orderId ? `ORD-${String(orderId).slice(-5).toUpperCase()}` : "ORD-XXXXX";

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4 py-6 overflow-y-auto">
      <div className="w-full max-w-[760px] bg-[#0F1112] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl border border-white/10 relative my-auto" onClick={e => e.stopPropagation()}>

        {/* LEFT — course info */}
        <div className="w-full md:w-[240px] shrink-0 bg-[#1A1D1E] p-6 flex flex-col gap-4">
          <p className="text-[#C7E36B] text-[9px] font-bold tracking-widest uppercase">Own this course forever.</p>
          <div>
            {item?.image && (
              <img src={item.image} alt={title} className="w-full h-[100px] object-cover rounded-lg mb-3"
                onError={e => e.target.style.display = "none"} />
            )}
            <h3 className="text-white font-bold text-[13px] leading-snug">{title}</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-white font-black text-xl">{currency}{basePrice.toLocaleString("en-IN")}</span>
            {origPrice && origPrice > basePrice && (
              <span className="text-gray-500 line-through text-xs">{currency}{Number(origPrice).toLocaleString("en-IN")}</span>
            )}
          </div>
          <ul className="flex flex-col gap-2">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-[11px] text-gray-300">
                <svg className="shrink-0 mt-0.5" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT — order summary + pay */}
        <div className="flex-1 p-6 md:p-8 flex flex-col gap-5">
          {/* Back + Close row */}
          <div className="flex items-center justify-between">
            {onBack ? (
              <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all">
                ← Back
              </button>
            ) : <span />}
            <button onClick={onClose} className="text-gray-400 hover:text-white text-xl leading-none">✕</button>
          </div>

          <div>
            <h2 className="text-white font-black text-xl mb-0.5">Complete Your Enrollment</h2>
            <p className="text-gray-400 text-xs">Choose your preferred payment method to purchase {item?.type || "course"}</p>
          </div>

          {/* Order Summary */}
          <div className="bg-[#1A1D1E] rounded-xl p-4 border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white text-xs font-bold">Order Summary</span>
              <span className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded">{shortId}</span>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Original Price (1 item)</span>
                <span className="text-white">{currency}{basePrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="text-white">{currency}{basePrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Tax (GST)</span>
                <span className="text-white">{currency}{tax}</span>
              </div>
              <div className="flex justify-between text-white font-bold pt-2 border-t border-white/10 mt-1">
                <span>Total Payable</span>
                <span className="text-[#C7E36B]">{currency}{total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Coupon */}
          <div>
            <p className="text-gray-400 text-xs font-semibold mb-1.5">Have a coupon?</p>
            <input
              type="text"
              placeholder="Enter coupon code"
              className="w-full bg-[#1A1D1E] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#C7E36B]/50 placeholder-gray-600"
            />
          </div>

          {/* Pay button */}
          <button
            onClick={() => onPay({})}
            disabled={paying}
            className="w-full bg-[#C7E36B] text-black font-black text-sm py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 tracking-wide"
          >
            {paying ? "Processing..." : `Pay ${currency}${total.toLocaleString("en-IN")} SECURELY`}
          </button>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-5 flex-wrap -mt-2">
            {[["🛡", "Secure by Razorpay"], ["🔒", "256-bit SSL Encryption"], ["⚡", "Instant Enrollment"]].map(([icon, label]) => (
              <span key={label} className="flex items-center gap-1 text-[10px] text-gray-400 font-semibold">
                <span>{icon}</span>{label}
              </span>
            ))}
          </div>
          <p className="text-center text-[10px] text-gray-600 -mt-3">
            By Proceeding, you agree to Aifa's Terms & Conditions and Refund Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
