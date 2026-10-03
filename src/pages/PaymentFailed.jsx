import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function PaymentFailed() {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(30);

  const {
    workshopTitle,
    workshopId,
    paymentId,
    errorMessage,
    retryPath,
  } = location.state || {};

  const retryDestination = retryPath || (workshopId ? `/workshops/${workshopId}/pay` : "/workshops");

  useEffect(() => {
    if (countdown <= 0) {
      navigate(retryDestination);
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

      {/* Animated X circle */}
      <div className="relative w-28 h-28 mb-8">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r={radius} fill="none" stroke="#1a1d1e" strokeWidth="3" />
          <circle
            cx="28" cy="28" r={radius}
            fill="none"
            stroke="#ef4444"
            strokeWidth="3"
            strokeDasharray={circ}
            strokeDashoffset={progress}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#ef4444" />
            <path d="M8 8l8 8M16 8l-8 8" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-black text-center mb-2">Payment Failed</h1>
      <p className="text-gray-400 text-sm text-center max-w-sm mb-8">
        {workshopTitle
          ? <>Your payment for <span className="text-white font-semibold">"{workshopTitle}"</span> could not be completed.</>
          : "Your payment could not be processed. No amount has been charged."}
      </p>

      {/* Error / payment details */}
      <div className="w-full max-w-sm bg-[#111315] border border-red-500/20 rounded-2xl p-5 mb-8 space-y-3">
        {errorMessage && (
          <div className="flex justify-between text-sm gap-4">
            <span className="text-gray-400 shrink-0">Reason</span>
            <span className="text-red-400 text-right">{errorMessage}</span>
          </div>
        )}
        {paymentId && (
          <div className="flex justify-between text-sm gap-4">
            <span className="text-gray-400 shrink-0">Payment ID</span>
            <span className="text-gray-200 font-mono text-xs break-all text-right">{paymentId}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Status</span>
          <span className="text-red-400 font-semibold">Failed ✗</span>
        </div>
        <p className="text-gray-600 text-xs pt-1 border-t border-white/5">
          No amount has been deducted. You can safely retry the payment.
        </p>
      </div>

      {/* Action buttons */}
      <div className="w-full max-w-sm flex flex-col gap-3">
        <button
          onClick={() => navigate(retryDestination)}
          className="w-full py-3.5 bg-[#C7E36B] text-black font-black rounded-xl hover:opacity-90 transition text-sm tracking-wide"
        >
          RETRY PAYMENT →
        </button>
        <button
          onClick={() => navigate("/workshops")}
          className="w-full py-3 text-gray-400 text-sm hover:text-white transition"
        >
          Back to Workshops
        </button>
        <a
          href={`https://wa.me/919052088000?text=Hi%2C%20my%20payment%20failed.%20Payment%20ID%3A%20${paymentId || "N/A"}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 text-center text-gray-500 text-xs hover:text-gray-300 transition"
        >
          Need help? Chat with us on WhatsApp →
        </a>
      </div>

      {/* Countdown */}
      <p className="mt-8 text-gray-600 text-xs">
        Returning to payment page in <span className="text-gray-400 font-semibold">{countdown}s</span>
      </p>
    </div>
  );
}
