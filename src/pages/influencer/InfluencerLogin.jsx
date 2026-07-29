import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function InfluencerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <div className="min-h-screen w-full bg-[#0B0F10] flex items-center justify-center p-4">
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

        <form onSubmit={submit} className="bg-[#0F1112] border border-white/10 rounded-2xl p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-2.5 rounded-xl">
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
            <label className="block text-[11px] text-gray-400 font-semibold mb-1.5">Password</label>
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

        <p className="text-center text-[11px] text-gray-600 mt-6">
          © {new Date().getFullYear()} AIFA. All rights reserved.
        </p>
      </div>
    </div>
  );
}
