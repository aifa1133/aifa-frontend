import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SetPasswordModal({ email, token, itemType, itemId }) {
  const [pw, setPw]           = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (pw.length < 8)       { setError("Password must be at least 8 characters"); return; }
    if (pw !== confirm)      { setError("Passwords do not match"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/users/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ password: pw }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Failed to set password"); setLoading(false); return; }

      // Upgrade guest to real user — remove isGuest flag
      try {
        const u = JSON.parse(localStorage.getItem("aifa_user") || "{}");
        delete u.isGuest;
        localStorage.setItem("aifa_user", JSON.stringify(u));
        window.dispatchEvent(new Event("storage"));
      } catch {}

      if (itemType === "Workshop") navigate(`/workshops/${itemId}`);
      else if (itemType === "Bootcamp") navigate("/bootcamp");
      else navigate("/dashboard");
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  const benefits = itemType === "Workshop"
    ? ["Live interactive session", "Session recording access", "Certificate of completion", "Direct trainer Q&A"]
    : ["Step-by-step lessons", "Lifetime access to this course", "English captions", "Certificate of completion"];

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0F10] flex items-center justify-center px-4">
      <div className="w-full max-w-[780px] flex flex-col md:flex-row overflow-hidden rounded-2xl border border-white/10 shadow-2xl">

        {/* LEFT */}
        <div className="flex-1 bg-[#0F1112] p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-white font-black text-2xl mb-1">Complete Your AIFA Account</h2>
          <p className="text-gray-400 text-sm mb-7">Your {itemType || "Video course"} is ready to view</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <label className="text-xs text-gray-400 font-semibold mb-1 block">password</label>
              <input
                type={showPw ? "text" : "password"}
                value={pw}
                onChange={e => setPw(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#1A1D1E] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#C7E36B]/50 pr-10"
              />
              <button type="button" onClick={() => setShowPw(v => !v)}
                className="absolute right-3 bottom-3 text-gray-400 hover:text-white text-xs">
                {showPw ? "🙈" : "👁"}
              </button>
            </div>

            <div className="relative">
              <label className="text-xs text-gray-400 font-semibold mb-1 block">confirm password</label>
              <input
                type={showConfirm ? "text" : "password"}
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#1A1D1E] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#C7E36B]/50 pr-10"
              />
              <button type="button" onClick={() => setShowConfirm(v => !v)}
                className="absolute right-3 bottom-3 text-gray-400 hover:text-white text-xs">
                {showConfirm ? "🙈" : "👁"}
              </button>
            </div>

            {error && <p className="text-red-400 text-xs">{error}</p>}

            <button type="submit" disabled={loading}
              className="w-full bg-[#C7E36B] text-black font-black text-sm py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 mt-1">
              {loading ? "Setting up..." : `ACCESS MY ${(itemType || "VIDEO COURSE").toUpperCase()}`}
            </button>
          </form>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-[280px] shrink-0 bg-[#1A1D1E] p-8 flex flex-col justify-center gap-5">
          <div>
            <h3 className="text-white font-black text-lg leading-snug">Your AIFA Account Includes:</h3>
          </div>
          <ul className="flex flex-col gap-3">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
