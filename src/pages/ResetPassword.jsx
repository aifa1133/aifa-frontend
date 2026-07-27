import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = new URLSearchParams(window.location.search).get("token");

  const handleReset = async () => {
    if (!password || password.length < 6) { setMsg("Password must be at least 6 characters."); return; }
    if (password !== confirm) { setMsg("Passwords do not match."); return; }
    if (!token) { setMsg("Invalid reset link."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Password reset successfully! Redirecting to login...");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setMsg(data.message || "Reset failed.");
      }
    } catch {
      setMsg("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F10] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#0F1112] border border-white/10 rounded-2xl p-8">
        <h2 className="text-white text-2xl font-semibold mb-2">Reset Password</h2>
        <p className="text-gray-400 text-sm mb-6">Enter your new password below.</p>
        <input
          type="password"
          placeholder="New password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white mb-4 outline-none focus:border-[#C7E36B]"
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleReset()}
          className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white mb-4 outline-none focus:border-[#C7E36B]"
        />
        {msg && (
          <p className={`text-sm mb-4 ${msg.includes("success") ? "text-green-400" : "text-red-400"}`}>{msg}</p>
        )}
        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-[#C7E36B] text-black py-3 rounded-md font-semibold disabled:opacity-60"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}
