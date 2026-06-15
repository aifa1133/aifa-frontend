import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // "login" | "signup" | "forgot"
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Login failed"); return; }
      if (data.role === "admin") { setError("Use the admin portal to sign in."); return; }
      localStorage.setItem("aifa_token", data.token);
      localStorage.setItem("aifa_user", JSON.stringify(data));
      navigate("/dashboard");
    } catch { setError("Network error. Please try again."); }
    finally { setLoading(false); }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Signup failed"); return; }
      localStorage.setItem("aifa_token", data.token);
      localStorage.setItem("aifa_user", JSON.stringify(data));
      navigate("/dashboard");
    } catch { setError("Network error. Please try again."); }
    finally { setLoading(false); }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Request failed"); return; }
      setSuccess("Reset link sent! Check your inbox.");
    } catch { setError("Network error. Please try again."); }
    finally { setLoading(false); }
  };

  const switchMode = (m) => { setMode(m); setError(""); setSuccess(""); };

  return (
    <div className="min-h-screen bg-[#0B0F10] flex items-center justify-center px-4">
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative w-full max-w-[420px]">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <a href="/">
            <img src="/logos/aifabetalogo.svg" alt="AIFA" className="h-8" />
          </a>
        </div>

        {/* Card */}
        <div className="bg-[#0F1112] border border-white/10 rounded-2xl p-8 shadow-2xl">

          {/* ── LOGIN ── */}
          {mode === "login" && (
            <>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                  <span className="text-[#a78bfa] text-xs font-semibold tracking-widest uppercase">Student Portal</span>
                </div>
                <h1 className="text-white text-2xl font-bold mt-2">Welcome back</h1>
                <p className="text-white/40 text-sm mt-1">Sign in to continue learning.</p>
              </div>

              {error && <ErrorBox msg={error} />}

              <form onSubmit={handleLogin} className="space-y-5">
                <Field label="Email Address" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
                <PasswordField label="Password" name="password" value={form.password} onChange={handleChange} show={showPassword} toggle={() => setShowPassword(v => !v)} />

                <div className="flex justify-end">
                  <button type="button" onClick={() => switchMode("forgot")} className="text-white/40 hover:text-white/70 text-xs transition-colors">
                    Forgot password?
                  </button>
                </div>

                <SubmitBtn loading={loading} label="Sign In" loadingLabel="Signing in…" color="purple" />
              </form>

              <p className="text-center text-white/30 text-sm mt-6">
                New to AIFA?{" "}
                <button onClick={() => switchMode("signup")} className="text-[#a78bfa] hover:text-[#c4b5fd] transition-colors font-medium">
                  Create an account
                </button>
              </p>
            </>
          )}

          {/* ── SIGNUP ── */}
          {mode === "signup" && (
            <>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                  <span className="text-[#a78bfa] text-xs font-semibold tracking-widest uppercase">Student Portal</span>
                </div>
                <h1 className="text-white text-2xl font-bold mt-2">Create your account</h1>
                <p className="text-white/40 text-sm mt-1">Start your AI filmmaking journey.</p>
              </div>

              {error && <ErrorBox msg={error} />}

              <form onSubmit={handleSignup} className="space-y-4">
                <Field label="Full Name" type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
                <Field label="Email Address" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
                <Field label="Phone Number" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                <PasswordField label="Password" name="password" value={form.password} onChange={handleChange} show={showPassword} toggle={() => setShowPassword(v => !v)} />

                <SubmitBtn loading={loading} label="Create Account" loadingLabel="Creating…" color="purple" />
              </form>

              <p className="text-center text-white/30 text-sm mt-6">
                Already have an account?{" "}
                <button onClick={() => switchMode("login")} className="text-[#a78bfa] hover:text-[#c4b5fd] transition-colors font-medium">
                  Sign in
                </button>
              </p>
            </>
          )}

          {/* ── FORGOT PASSWORD ── */}
          {mode === "forgot" && (
            <>
              <div className="mb-8">
                <button onClick={() => switchMode("login")} className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-4 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to sign in
                </button>
                <h1 className="text-white text-2xl font-bold">Reset password</h1>
                <p className="text-white/40 text-sm mt-1">We'll send a reset link to your email.</p>
              </div>

              {error && <ErrorBox msg={error} />}
              {success && (
                <div className="mb-6 flex items-start gap-3 bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3">
                  <svg className="w-4 h-4 text-green-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-green-400 text-sm">{success}</p>
                </div>
              )}

              <form onSubmit={handleForgot} className="space-y-5">
                <Field label="Email Address" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
                <SubmitBtn loading={loading} label="Send Reset Link" loadingLabel="Sending…" color="purple" />
              </form>
            </>
          )}
        </div>

        {/* Back to site */}
        <p className="text-center text-white/30 text-xs mt-6">
          <a href="/" className="text-white/50 hover:text-white/80 transition-colors underline underline-offset-2">
            ← Back to AIFA
          </a>
        </p>
      </div>
    </div>
  );
}

/* ── Shared sub-components ── */

function ErrorBox({ msg }) {
  return (
    <div className="mb-6 flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
      <svg className="w-4 h-4 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="text-red-400 text-sm">{msg}</p>
    </div>
  );
}

function Field({ label, type, name, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#7C3AED]/60 focus:bg-white/8 transition-all"
      />
    </div>
  );
}

function PasswordField({ label, name, value, onChange, show, toggle }) {
  return (
    <div>
      <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          required
          placeholder="••••••••"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-11 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#7C3AED]/60 focus:bg-white/8 transition-all"
        />
        <button type="button" onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
          {show ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

function SubmitBtn({ loading, label, loadingLabel, color }) {
  const bg = color === "purple"
    ? "bg-[#7C3AED] hover:bg-[#6d28d9]"
    : "bg-[#C7E36B] hover:bg-[#d4ed7a]";
  const text = color === "purple" ? "text-white" : "text-[#0B0F10]";
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full ${bg} ${text} disabled:opacity-50 disabled:cursor-not-allowed font-bold text-sm py-3 rounded-xl transition-all duration-200 mt-1`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          {loadingLabel}
        </span>
      ) : label}
    </button>
  );
}
