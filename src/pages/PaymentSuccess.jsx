import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(30);

  const {
    workshopTitle,
    workshopId,
    paymentId,
    orderId,
    redirectTo,
  } = location.state || {};

  const destination = redirectTo || (workshopId ? `/workshops/${workshopId}` : "/dashboard/workshops");

  useEffect(() => {
    if (countdown <= 0) {
      navigate(destination);
      return;
    }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const radius = 22;
  const circ = 2 * Math.PI * radius;
  const progress = circ - (countdown / 30) * circ;

  return (
    <div className="min-h-screen bg-[#0B0F10] flex flex-col items-center justify-center px-4 text-white">

      {/* Animated checkmark circle */}
      <div className="relative w-28 h-28 mb-8">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r={radius} fill="none" stroke="#1a1d1e" strokeWidth="3" />
          <circle
            cx="28" cy="28" r={radius}
            fill="none"
            stroke="#C7E36B"
            strokeWidth="3"
            strokeDasharray={circ}
            strokeDashoffset={progress}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#C7E36B" />
            <path d="M7.5 12.5l3 3 6-6" stroke="#0B0F10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-black text-center mb-2">Payment Successful!</h1>
      <p className="text-gray-400 text-sm text-center max-w-sm mb-8">
        {workshopTitle
          ? <>Your seat for <span className="text-white font-semibold">"{workshopTitle}"</span> has been confirmed.</>
          : "Your payment was processed successfully and your seat is confirmed."}
      </p>

      {/* Order details */}
      {(paymentId || orderId) && (
        <div className="w-full max-w-sm bg-[#111315] border border-white/10 rounded-2xl p-5 mb-8 space-y-3">
          {orderId && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Order ID</span>
              <span className="text-[#C7E36B] font-semibold">{orderId}</span>
            </div>
          )}
          {paymentId && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Payment ID</span>
              <span className="text-gray-200 font-mono text-xs break-all text-right max-w-[200px]">{paymentId}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Status</span>
            <span className="text-green-400 font-semibold">Confirmed ✓</span>
          </div>
          <p className="text-gray-600 text-xs pt-1 border-t border-white/5">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      )}

      {/* Action buttons */}
      <div className="w-full max-w-sm flex flex-col gap-3">
        <button
          onClick={() => navigate(destination)}
          className="w-full py-3.5 bg-[#C7E36B] text-black font-black rounded-xl hover:opacity-90 transition text-sm tracking-wide"
        >
          VIEW WORKSHOP DETAILS
        </button>
        <button
          onClick={() => navigate("/dashboard/workshops")}
          className="w-full py-3 text-gray-400 text-sm hover:text-white transition"
        >
          Go to My Workshops
        </button>
      </div>

      {/* Countdown */}
      <p className="mt-8 text-gray-600 text-xs">
        Redirecting automatically in <span className="text-gray-400 font-semibold">{countdown}s</span>
      </p>
    </div>
  );
}
