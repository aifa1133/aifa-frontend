import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function InfluencerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* Forgot password flow: "request" → "verify" → done */
  const [fpStep, setFpStep] = useState(null); // null | "request" | "verify"
  const [fpEmail, setFpEmail] = useState("");
  const [fpOtp, setFpOtp] = useState("");
  const [fpPassword, setFpPassword] = useState("");
  const [fpLoading, setFpLoading] = useState(false);
  const [fpMsg, setFpMsg] = useState("");
  const [fpError, setFpError] = useState("");
  const [showFpPw, setShowFpPw] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("influencer_token")) {
      navigate("/influencer/dashboard", { replace: true });
    }
  }, [navigate]);

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) { setError("Enter your email and password"); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/influencer/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.message || "Login failed");
      localStorage.setItem("influencer_token", d.token);
      localStorage.setItem("influencer_user", JSON.stringify(d.influencer));
      navigate("/influencer/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    if (!fpEmail.trim()) { setFpError("Enter your email"); return; }
    setFpLoading(true); setFpError(""); setFpMsg("");
    try {
      const res = await fetch("/api/influencer/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: fpEmail.trim() }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.message || "Failed");
      setFpMsg(d.message);
      setFpStep("verify");
    } catch (err) {
      setFpError(err.message);
    }
    setFpLoading(false);
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    if (!fpOtp.trim() || !fpPassword) { setFpError("Enter the code and new password"); return; }
    setFpLoading(true); setFpError("");
    try {
      const res = await fetch("/api/influencer/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: fpEmail.trim(), otp: fpOtp.trim(), password: fpPassword }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.message || "Failed");
      setFpStep(null);
      setError("");
      setFpMsg("");
      setFpOtp(""); setFpPassword(""); setFpEmail("");
      setError("Password updated — sign in with your new password.");
    } catch (err) {
      setFpError(err.message);
    }
    setFpLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0F10] flex items-center justify-center p-4">
      {/* Back to home */}
      <a href="/" className="absolute top-5 left-5 flex items-center gap-2 text-gray-400 hover:text-white text-sm font-semibold transition-colors group">
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="group-hover:-translate-x-0.5 transition-transform"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        Back to Dashboard
      </a>
      <div className="w-full max-w-[420px]">
        {/* Brand */}
        <div className="text-center mb-8">
          <img src="/logos/aifabetalogo.svg" alt="AIFA" className="h-7 mx-auto mb-3"
            onError={(e) => { e.target.style.display = "none"; }} />
          <h1 className="text-2xl font-black text-white">Influencer Portal</h1>
          <p className="text-xs text-gray-400 mt-1.5">
            Sign in to track your referrals, commissions and payouts.
          </p>
        </div>

        {/* ── FORGOT PASSWORD: request OTP ── */}
        {fpStep === "request" && (
          <form onSubmit={sendOtp} className="bg-[#0F1112] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-bold text-white">Reset Password</h2>
              <button type="button" onClick={() => { setFpStep(null); setFpError(""); setFpMsg(""); }}
                className="text-xs text-gray-400 hover:text-white transition-colors">Cancel</button>
            </div>
            <p className="text-xs text-gray-400">Enter your email to receive a 6-digit reset code.</p>
            {fpError && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-2.5 rounded-xl">{fpError}</div>}
            {fpMsg && <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-xs px-3 py-2.5 rounded-xl">{fpMsg}</div>}
            <div>
              <label className="block text-[11px] text-gray-400 font-semibold mb-1.5">Email Address</label>
              <input type="email" value={fpEmail} onChange={(e) => setFpEmail(e.target.value)} placeholder="you@example.com" autoComplete="username"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/60 transition-colors" />
            </div>
            <button type="submit" disabled={fpLoading}
              className="w-full py-3 rounded-xl bg-[#C7E36B] text-black text-sm font-black hover:bg-[#d4ec85] disabled:opacity-50 transition-colors">
              {fpLoading ? "Sending…" : "Send Reset Code"}
            </button>
          </form>
        )}

        {/* ── FORGOT PASSWORD: enter OTP + new password ── */}
        {fpStep === "verify" && (
          <form onSubmit={resetPassword} className="bg-[#0F1112] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-bold text-white">Enter Reset Code</h2>
              <button type="button" onClick={() => { setFpStep(null); setFpError(""); setFpMsg(""); }}
                className="text-xs text-gray-400 hover:text-white transition-colors">Cancel</button>
            </div>
            <p className="text-xs text-gray-400">Check your email for a 6-digit code (valid 10 min).</p>
            {fpError && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-2.5 rounded-xl">{fpError}</div>}
            <div>
              <label className="block text-[11px] text-gray-400 font-semibold mb-1.5">6-Digit Code</label>
              <input type="text" inputMode="numeric" maxLength={6} value={fpOtp} onChange={(e) => setFpOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="123456"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/60 transition-colors tracking-[0.4em] font-bold" />
            </div>
            <div>
              <label className="block text-[11px] text-gray-400 font-semibold mb-1.5">New Password</label>
              <div className="relative">
                <input type={showFpPw ? "text" : "password"} value={fpPassword} onChange={(e) => setFpPassword(e.target.value)} placeholder="Min 6 characters" autoComplete="new-password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 pr-16 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/60 transition-colors" />
                <button type="button" onClick={() => setShowFpPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-gray-400 hover:text-[#C7E36B] transition-colors">
                  {showFpPw ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => { setFpStep("request"); setFpError(""); }}
                className="px-4 py-3 rounded-xl bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors">
                Resend
              </button>
              <button type="submit" disabled={fpLoading}
                className="flex-1 py-3 rounded-xl bg-[#C7E36B] text-black text-sm font-black hover:bg-[#d4ec85] disabled:opacity-50 transition-colors">
                {fpLoading ? "Updating…" : "Set New Password"}
              </button>
            </div>
          </form>
        )}

        {/* ── LOGIN FORM ── */}
        {!fpStep && (
          <form onSubmit={submit} className="bg-[#0F1112] border border-white/10 rounded-2xl p-6 space-y-4">
            {error && (
              <div className={`text-xs px-3 py-2.5 rounded-xl border ${error.startsWith("Password updated") ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-red-500/10 border-red-500/30 text-red-400"}`}>
                {error}
              </div>
            )}

            <div>
              <label className="block text-[11px] text-gray-400 font-semibold mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="username"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/60 transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] text-gray-400 font-semibold">Password</label>
                <button type="button" onClick={() => { setFpEmail(email); setFpStep("request"); setFpError(""); setFpMsg(""); }}
                  className="text-[11px] text-[#C7E36B] hover:underline transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 pr-16 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/60 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-gray-400 hover:text-[#C7E36B] transition-colors"
                >
                  {showPw ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#C7E36B] text-black text-sm font-black hover:bg-[#d4ec85] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>

            <p className="text-[11px] text-gray-500 text-center pt-1">
              Don&apos;t have an account? Influencer accounts are created by the AIFA team —
              contact <span className="text-[#C7E36B]">info@aifa.co.in</span> to join.
            </p>
          </form>
        )}

        <p className="text-center text-[11px] text-gray-600 mt-6">
          © {new Date().getFullYear()} AIFA. All rights reserved.
        </p>
      </div>
    </div>
  );
}
