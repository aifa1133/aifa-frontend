import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InfluencerChangePassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const user = (() => { try { return JSON.parse(localStorage.getItem("influencer_user") || "{}"); } catch { return {}; } })();
  const isMandatory = !!user.mustChangePassword;

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const toggleShow = (k) => () => setShow((s) => ({ ...s, [k]: !s[k] }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.newPassword.length < 6) { setError("New password must be at least 6 characters"); return; }
    if (form.newPassword !== form.confirmPassword) { setError("New passwords do not match"); return; }

    setLoading(true);
    try {
      const token = localStorage.getItem("influencer_token");
      const res = await fetch("/api/influencer/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword: form.currentPassword, newPassword: form.newPassword }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.message || "Failed to update password");

      // Update stored profile so guard doesn't redirect again
      if (d.influencer) localStorage.setItem("influencer_user", JSON.stringify(d.influencer));

      navigate("/influencer/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0F10] flex items-center justify-center p-4">
      {!isMandatory && (
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 flex items-center gap-2 text-gray-400 hover:text-white text-sm font-semibold transition-colors group"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="group-hover:-translate-x-0.5 transition-transform">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back
        </button>
      )}

      <div className="w-full max-w-[420px]">
        <div className="text-center mb-8">
          <img src="/logos/aifabetalogo.svg" alt="AIFA" className="h-7 mx-auto mb-3"
            onError={(e) => { e.target.style.display = "none"; }} />
          <div className="w-14 h-14 bg-[#C7E36B]/10 border border-[#C7E36B]/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" fill="none" stroke="#C7E36B" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h1 className="text-2xl font-black text-white">Set Your New Password</h1>
          <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
            {isMandatory
              ? "For security, please change your initial password to continue."
              : "Update your influencer portal password."}
          </p>
        </div>

        <form onSubmit={submit} className="bg-[#0F1112] border border-white/10 rounded-2xl p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-2.5 rounded-xl">
              {error}
            </div>
          )}

          {/* Current Password */}
          <div>
            <label className="block text-[11px] text-gray-400 font-semibold mb-1.5">
              {isMandatory ? "Admin-Provided Password" : "Current Password"}
            </label>
            <div className="relative">
              <input
                type={show.current ? "text" : "password"}
                value={form.currentPassword}
                onChange={set("currentPassword")}
                placeholder={isMandatory ? "Enter admin-provided password" : "Enter current password"}
                autoComplete="current-password"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 pr-16 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/60 transition-colors"
              />
              <button type="button" onClick={toggleShow("current")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-gray-400 hover:text-[#C7E36B] transition-colors">
                {show.current ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-[11px] text-gray-400 font-semibold mb-1.5">New Password</label>
            <div className="relative">
              <input
                type={show.new ? "text" : "password"}
                value={form.newPassword}
                onChange={set("newPassword")}
                placeholder="Min 6 characters"
                autoComplete="new-password"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 pr-16 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/60 transition-colors"
              />
              <button type="button" onClick={toggleShow("new")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-gray-400 hover:text-[#C7E36B] transition-colors">
                {show.new ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-[11px] text-gray-400 font-semibold mb-1.5">Confirm New Password</label>
            <div className="relative">
              <input
                type={show.confirm ? "text" : "password"}
                value={form.confirmPassword}
                onChange={set("confirmPassword")}
                placeholder="Confirm new password"
                autoComplete="new-password"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 pr-16 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/60 transition-colors"
              />
              <button type="button" onClick={toggleShow("confirm")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-gray-400 hover:text-[#C7E36B] transition-colors">
                {show.confirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#C7E36B] text-black text-sm font-black hover:bg-[#d4ec85] disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2"
          >
            {loading ? "Saving…" : "Save & Continue to Dashboard"}
          </button>

          {isMandatory && (
            <p className="text-[11px] text-gray-500 text-center pt-1">
              This step is required before accessing your dashboard.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
