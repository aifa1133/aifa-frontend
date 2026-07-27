import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CourseSetup() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("aifa_token");
  const user  = (() => { try { return JSON.parse(localStorage.getItem("aifa_user") || "{}"); } catch { return {}; } })();

  useEffect(() => {
    fetch(`/api/courses/${id}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) setCourse(d); })
      .catch(() => {});
  }, [id]);

  const handleSetPassword = async () => {
    setError("");
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (/\s/.test(password))  { setError("Password cannot contain spaces."); return; }
    if (password !== confirm)  { setError("Passwords do not match."); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/users/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ password }),
      });
      if (res.ok) setDone(true);
      else { const d = await res.json(); setError(d.message || "Failed to save password."); }
    } catch { setError("Network error. Please try again."); }
    finally { setSaving(false); }
  };

  return (
    <div className="min-h-screen bg-[#0B0F10] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/aifa-logo.png" alt="AIFA" className="h-10 mx-auto mb-3" onError={e => { e.target.style.display="none"; }} />
          <p className="text-[#C7E36B] text-xs font-bold uppercase tracking-widest">AIFA Film Academy</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">

          {done ? (
            /* ── Success state ── */
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C7E36B]/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">🎉</div>
              <h2 className="text-white text-2xl font-bold mb-2">You're all set!</h2>
              <p className="text-gray-400 text-sm mb-6">Your account is ready. Start watching your course now.</p>
              {course && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 text-left">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Your Course</p>
                  <p className="text-white font-semibold text-sm">{course.title}</p>
                </div>
              )}
              <button
                onClick={() => navigate(`/courses/${id}/watch`)}
                className="w-full bg-[#C7E36B] text-black font-bold py-3 rounded-xl hover:bg-lime-300 transition-all mb-3">
                Watch Now →
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full border border-white/20 text-gray-400 font-semibold py-3 rounded-xl hover:bg-white/5 transition-all text-sm">
                Go to Dashboard
              </button>
            </div>
          ) : (
            /* ── Setup form ── */
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#C7E36B]/20 rounded-full flex items-center justify-center text-xl">🔐</div>
                <div>
                  <h2 className="text-white font-bold text-lg">Set your password</h2>
                  <p className="text-gray-400 text-xs">Hi {user.name || "there"} — secure your new account</p>
                </div>
              </div>

              {course && (
                <div className="bg-[#C7E36B]/10 border border-[#C7E36B]/30 rounded-xl p-3 mb-6">
                  <p className="text-[10px] text-[#C7E36B] font-bold uppercase mb-0.5">Course purchased</p>
                  <p className="text-white text-sm font-semibold">{course.title}</p>
                </div>
              )}

              <p className="text-gray-400 text-sm mb-5">
                We created a temporary account for you. Set a permanent password to keep access to your course.
              </p>

              <div className="relative mb-3">
                <input
                  type={showPwd ? "text" : "password"}
                  placeholder="Create password (min 8 characters)"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white outline-none focus:border-[#C7E36B] text-sm pr-16"
                />
                <button onClick={() => setShowPwd(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white">
                  {showPwd ? "Hide" : "Show"}
                </button>
              </div>

              <input
                type={showPwd ? "text" : "password"}
                placeholder="Confirm password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSetPassword()}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white outline-none focus:border-[#C7E36B] text-sm mb-4"
              />

              {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

              <button
                onClick={handleSetPassword}
                disabled={saving}
                className="w-full bg-[#C7E36B] text-black font-bold py-3 rounded-xl hover:bg-lime-300 transition-all disabled:opacity-60 mb-3">
                {saving ? "Saving..." : "Set Password & Continue →"}
              </button>

              <button
                onClick={() => navigate(`/courses/${id}/watch`)}
                className="w-full text-gray-500 text-sm underline hover:text-gray-300 transition-all">
                Skip for now — watch course first
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
