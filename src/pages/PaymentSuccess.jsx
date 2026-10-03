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
    isNewUser,
    guestToken,
    userEmail,
  } = location.state || {};

  const destination = redirectTo || (workshopId ? `/workshops/${workshopId}` : "/dashboard/workshops");

  /* password setup state (new guest users only) */
  const [password, setPassword]       = useState("");
  const [confirmPw, setConfirmPw]     = useState("");
  const [showPw, setShowPw]           = useState(false);
  const [pwSaving, setPwSaving]       = useState(false);
  const [pwDone, setPwDone]           = useState(false);
  const [pwError, setPwError]         = useState("");

  /* pause auto-redirect while the new user hasn't set a password yet */
  const shouldCountdown = !isNewUser || pwDone;

  useEffect(() => {
    if (!shouldCountdown) return;
    if (countdown <= 0) { navigate(destination); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, shouldCountdown]);

  const handleSetPassword = async (e) => {
    e.preventDefault();
    setPwError("");
    if (password.length < 6) { setPwError("Password must be at least 6 characters"); return; }
    if (password !== confirmPw) { setPwError("Passwords do not match"); return; }
    if (!guestToken) { setPwError("Session expired. Please complete the purchase again."); return; }

    setPwSaving(true);
    try {
      const res = await fetch("/api/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${guestToken}` },
        body: JSON.stringify({ password }),
      });
      let data = {};
      try { data = await res.json(); } catch {}
      if (!res.ok) { setPwError(data.message || "Failed to set password. Please try again."); return; }

      setPwDone(true);
      setTimeout(() => navigate("/login", { state: { prefillEmail: userEmail } }), 2000);
    } catch {
      setPwError("Network error. Please check your connection and try again.");
    } finally {
      setPwSaving(false);
    }
  };

  const radius = 22;
  const circ = 2 * Math.PI * radius;
  const progress = circ - (countdown / 30) * circ;

  return (
    <div className="min-h-screen bg-[#0B0F10] flex flex-col items-center justify-center px-4 py-12 text-white">

      {/* Animated checkmark circle */}
      <div className="relative w-24 h-24 mb-6">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r={radius} fill="none" stroke="#1a1d1e" strokeWidth="3" />
          <circle
            cx="28" cy="28" r={radius}
            fill="none"
            stroke="#C7E36B"
            strokeWidth="3"
            strokeDasharray={circ}
            strokeDashoffset={shouldCountdown ? progress : circ}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#C7E36B" />
            <path d="M7.5 12.5l3 3 6-6" stroke="#0B0F10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-black text-center mb-2">Payment Successful!</h1>
      <p className="text-gray-400 text-sm text-center max-w-md mb-8">
        {workshopTitle
          ? <>Your seat for <span className="text-white font-semibold">"{workshopTitle}"</span> has been confirmed.</>
          : "Your payment was processed successfully and your seat is confirmed."}
      </p>

      {/* ── Side-by-side: Order details + Password / Action ── */}
      <div className={`w-full max-w-3xl flex flex-col ${isNewUser ? "md:flex-row" : ""} gap-5 mb-8`}>

        {/* LEFT — Order details */}
        {(paymentId || orderId) && (
          <div className="flex-1 bg-[#111315] border border-white/10 rounded-2xl p-5 space-y-3">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-3">Order Summary</p>
            {orderId && (
              <div className="flex justify-between text-sm gap-4">
                <span className="text-gray-400 shrink-0">Order ID</span>
                <span className="text-[#C7E36B] font-semibold text-right break-all">{orderId}</span>
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
              <span className="text-green-400 font-semibold">Confirmed ✓</span>
            </div>
            <p className="text-gray-600 text-xs pt-2 border-t border-white/5">
              A confirmation email has been sent to your registered email address.
            </p>

            {/* Action buttons for returning users shown inside left card */}
            {(!isNewUser || pwDone) && (
              <div className="flex flex-col gap-2 pt-3 border-t border-white/5">
                <button
                  onClick={() => navigate(destination)}
                  className="w-full py-3 bg-[#C7E36B] text-black font-black rounded-xl hover:opacity-90 transition text-sm tracking-wide"
                >
                  VIEW WORKSHOP DETAILS
                </button>
                <button
                  onClick={() => navigate("/dashboard/workshops")}
                  className="w-full py-2.5 text-gray-400 text-sm hover:text-white transition"
                >
                  Go to My Workshops
                </button>
              </div>
            )}
          </div>
        )}

        {/* RIGHT — Set password (new users) */}
        {isNewUser && !pwDone && (
          <div className="flex-1 bg-[#111315] border border-[#C7E36B]/30 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <h2 className="text-white font-black text-base">Set Your Password</h2>
            </div>
            <p className="text-gray-400 text-xs mb-5">
              Create a password to access your account and workshop anytime.
            </p>
            <form onSubmit={handleSetPassword} className="flex flex-col gap-3">
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="New password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#1A1D1E] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#C7E36B]/60 pr-10"
                />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition">
                  {showPw
                    ? <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
              <input
                type={showPw ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPw}
                onChange={e => setConfirmPw(e.target.value)}
                required
                className="w-full bg-[#1A1D1E] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#C7E36B]/60"
              />
              {pwError && <p className="text-red-400 text-xs">{pwError}</p>}
              <button
                type="submit"
                disabled={pwSaving}
                className="w-full py-3.5 bg-[#C7E36B] text-black font-black rounded-xl hover:opacity-90 transition text-sm tracking-wide disabled:opacity-50"
              >
                {pwSaving ? "SAVING..." : "SET PASSWORD & CONTINUE →"}
              </button>
            </form>
          </div>
        )}

        {/* Password set confirmation */}
        {isNewUser && pwDone && (
          <div className="flex-1 bg-[#111315] border border-green-500/30 rounded-2xl p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <div>
              <p className="text-white font-bold">Password set!</p>
              <p className="text-gray-400 text-xs">Redirecting to login in 2 seconds…</p>
            </div>
          </div>
        )}
      </div>

      {/* Countdown */}
      {shouldCountdown && (
        <p className="text-gray-600 text-xs">
          Redirecting automatically in <span className="text-gray-400 font-semibold">{countdown}s</span>
        </p>
      )}
      {isNewUser && !pwDone && (
        <p className="mt-8 text-gray-600 text-xs">Set your password to continue</p>
      )}
    </div>
  );
}
