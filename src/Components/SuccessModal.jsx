export default function SuccessModal({ item, orderId, totalPaid, isLoggedIn, onCreateAccount, onNext }) {
  const currency = item?.currency === "USD" ? "$" : "₹";
  const shortId  = orderId ? `ORD-${String(orderId).slice(-5).toUpperCase()}` : "ORD-XXXXX";

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
      <div className="w-full max-w-[480px] bg-[#0F1112] rounded-2xl p-8 flex flex-col items-center border border-white/10 shadow-2xl">

        {/* Check icon */}
        <div className="w-16 h-16 rounded-full border-2 border-[#C7E36B] flex items-center justify-center mb-5">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>

        <h2 className="text-white font-black text-xl mb-1 text-center">
          {item?.type === "Workshop" ? "Workshop" : item?.type === "Bootcamp" ? "Bootcamp" : "Video course"} Purchased Successfully
        </h2>

        {/* Order summary box */}
        <div className="w-full bg-[#1A1D1E] rounded-xl p-4 mt-5 border border-white/5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white text-xs font-bold">Order Summary</span>
            <span className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded">{shortId}</span>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-gray-300 text-sm font-medium max-w-[260px] leading-snug">{item?.title}</span>
            <span className="text-white font-bold text-sm shrink-0 ml-3">{currency}{Number(totalPaid).toLocaleString("en-IN")}</span>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
            <span className="text-xs text-gray-400">Certificate Included</span>
            <span className="text-[10px] bg-[#C7E36B] text-black font-black px-3 py-0.5 rounded-full">Paid</span>
          </div>
        </div>

        {/* CTA */}
        {!isLoggedIn ? (
          <>
            <button onClick={onCreateAccount}
              className="w-full mt-5 bg-[#C7E36B] text-black font-black text-sm py-4 rounded-xl hover:opacity-90 transition-all">
              CREATE MY AIFA ACCOUNT
            </button>
            <p className="text-gray-500 text-[11px] mt-2 text-center">We'll use your enrollment email to set up your account.</p>
          </>
        ) : (
          <button onClick={onNext}
            className="w-full mt-5 bg-[#C7E36B] text-black font-black text-sm py-4 rounded-xl hover:opacity-90 transition-all">
            CONTINUE →
          </button>
        )}
      </div>
    </div>
  );
}
