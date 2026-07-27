import { useState, useEffect, useRef } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Turnstile } from "@marsidev/react-turnstile";
import { GOOGLE_OAUTH_ENABLED } from "../main.jsx";

function saveUser(data) {
  localStorage.setItem("aifa_token", data.token);
  localStorage.setItem("aifa_user", JSON.stringify({ name: data.name, _id: data._id, role: data.role }));
}

// Defined outside the component so React never remounts children on re-render (fixes focus loss bug)
function Backdrop({ onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-lg bg-[#0B0F10] rounded-2xl p-6 md:p-8 relative border border-white/10">
        <button onClick={onClose} className="absolute top-4 right-4 text-white text-xl">✕</button>
        {children}
      </div>
    </div>
  );
}

// views: email-login | phone-login | phone-otp | forgot-email | forgot-otp | forgot-newpass
export default function LoginModal({ onClose, onSwitchToSignup }) {
  const [view, setView]               = useState("email-login");
  const [email, setEmail]             = useState("");
  const [password, setPassword]       = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone]             = useState("");
  const [otp, setOtp]                 = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOtp, setForgotOtp]     = useState("");
  const [resetToken, setResetToken]   = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPwd, setShowNewPwd]   = useState(false);
  const [error, setError]             = useState("");
  const [msg, setMsg]                 = useState("");
  const [loading, setLoading]         = useState(false);
  const [turnstileSiteKey, setTurnstileSiteKey] = useState("");
  const [turnstileToken, setTurnstileToken]     = useState("");
  const turnstileRef = useRef(null);

  useEffect(() => {
    fetch("/api/config/public")
      .then(r => r.json())
      .then(d => { if (d.TURNSTILE_SITE_KEY) setTurnstileSiteKey(d.TURNSTILE_SITE_KEY); })
      .catch(() => {});
  }, []);

  const resetTurnstile = () => {
    setTurnstileToken("");
    if (turnstileRef.current) turnstileRef.current.reset();
  };

  const TurnstileWidget = () => {
    if (!turnstileSiteKey) return null;
    return (
      <Turnstile
        ref={turnstileRef}
        siteKey={turnstileSiteKey}
        onSuccess={setTurnstileToken}
        onError={() => setTurnstileToken("")}
        onExpire={() => setTurnstileToken("")}
        options={{ theme: "dark", size: "flexible" }}
        className="mb-4"
      />
    );
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true); setError("");
      try {
        const res = await fetch("/api/auth/google", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: tokenResponse.access_token }),
        });
        const data = await res.json();
        if (!res.ok) setError(data.message || "Google login failed.");
        else { saveUser(data); onClose(); window.location.href = data.role === "admin" ? "/admin" : "/dashboard"; }
      } catch { setError("Google login failed. Please try again."); }
      finally { setLoading(false); }
    },
    onError: () => setError("Google login was cancelled or failed."),
  });

  // ── EMAIL LOGIN ────────────────────────────────────────────
  const handleEmailLogin = async () => {
    setError("");
    if (!email || !password) { setError("Please enter email and password."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email address."); return; }
    if (turnstileSiteKey && !turnstileToken) { setError("Please complete the CAPTCHA."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, turnstileToken }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Login failed."); resetTurnstile(); }
      else { saveUser(data); onClose(); window.location.href = data.role === "admin" ? "/admin" : "/dashboard"; }
    } catch { setError("Network error. Please try again."); }
    finally { setLoading(false); }
  };

  // ── PHONE OTP ──────────────────────────────────────────────
  const handleSendPhoneOtp = async () => {
    setError(""); setMsg("");
    if (!phone) { setError("Enter your phone number."); return; }
    if (turnstileSiteKey && !turnstileToken) { setError("Please complete the CAPTCHA."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, turnstileToken }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Failed to send OTP."); resetTurnstile(); }
      else { setView("phone-otp"); setMsg("OTP sent to your phone."); }
    } catch { setError("Network error."); }
    finally { setLoading(false); }
  };

  const handleVerifyPhoneOtp = async () => {
    setError("");
    if (!otp) { setError("Enter the OTP."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.message || "Invalid OTP.");
      else { saveUser(data); onClose(); window.location.href = data.role === "admin" ? "/admin" : "/dashboard"; }
    } catch { setError("Network error."); }
    finally { setLoading(false); }
  };

  // ── FORGOT PASSWORD OTP ────────────────────────────────────
  const handleForgotSendOtp = async () => {
    setError(""); setMsg("");
    if (!forgotEmail) { setError("Enter your email address."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) { setError("Please enter a valid email address."); return; }
    if (turnstileSiteKey && !turnstileToken) { setError("Please complete the CAPTCHA."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password-otp", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail, turnstileToken }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Failed to send OTP."); resetTurnstile(); }
      else { setView("forgot-otp"); setMsg("Check your email for the 6-digit code."); }
    } catch { setError("Network error."); }
    finally { setLoading(false); }
  };

  const handleForgotVerifyOtp = async () => {
    setError("");
    if (!forgotOtp) { setError("Enter the OTP."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-reset-otp", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail, otp: forgotOtp }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.message || "Invalid OTP.");
      else { setResetToken(data.resetToken); setView("forgot-newpass"); }
    } catch { setError("Network error."); }
    finally { setLoading(false); }
  };

  const handleResetPassword = async () => {
    setError("");
    if (!newPassword || newPassword.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password-otp", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetToken, password: newPassword }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.message || "Reset failed.");
      else { setMsg("Password reset! Please log in."); setView("email-login"); }
    } catch { setError("Network error."); }
    finally { setLoading(false); }
  };

  // ── PHONE LOGIN VIEW ───────────────────────────────────────
  if (view === "phone-login") return (
    <Backdrop onClose={onClose}>
      <button onClick={() => { setView("email-login"); setError(""); setPhone(""); }} className="text-gray-400 text-sm mb-4 hover:text-white flex items-center gap-1">← Back to Login</button>
      <p className="text-gray-400 text-sm">Login via Phone</p>
      <h2 className="text-white text-2xl font-semibold mb-6">Enter your number</h2>
      <div className="flex gap-3 mb-4">
        <div className="flex items-center border border-white/20 rounded-lg px-4 py-3 text-white shrink-0">+91</div>
        <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, ""))} onKeyDown={e => e.key === "Enter" && handleSendPhoneOtp()} className="flex-1 bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-[#C7E36B]"/>
      </div>
      <TurnstileWidget />
      {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
      <button onClick={handleSendPhoneOtp} disabled={loading} className="w-full bg-[#C7E36B] text-black py-3 rounded-md font-semibold disabled:opacity-60">
        {loading ? "Sending OTP..." : "GET OTP"}
      </button>
    </Backdrop>
  );

  // ── PHONE OTP VERIFY VIEW ──────────────────────────────────
  if (view === "phone-otp") return (
    <Backdrop onClose={onClose}>
      <button onClick={() => { setView("phone-login"); setError(""); setOtp(""); }} className="text-gray-400 text-sm mb-4 hover:text-white flex items-center gap-1">← Change Number</button>
      <h2 className="text-white text-2xl font-semibold mb-2">Enter OTP</h2>
      <p className="text-gray-400 text-sm mb-6">We sent a 6-digit code to <strong className="text-white">+91 {phone}</strong></p>
      {msg && <p className="text-green-400 text-sm mb-3">{msg}</p>}
      <input type="text" maxLength={6} placeholder="6-digit OTP" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ""))} onKeyDown={e => e.key === "Enter" && handleVerifyPhoneOtp()} className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white mb-4 text-center text-2xl tracking-widest outline-none focus:border-[#C7E36B]"/>
      {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
      <button onClick={handleVerifyPhoneOtp} disabled={loading} className="w-full bg-[#C7E36B] text-black py-3 rounded-md font-semibold disabled:opacity-60">
        {loading ? "Verifying..." : "VERIFY AND LOGIN"}
      </button>
      <p onClick={handleSendPhoneOtp} className="text-center text-gray-400 text-sm mt-4 cursor-pointer hover:text-white">Did not get the code? Resend OTP</p>
    </Backdrop>
  );

  // ── FORGOT PASSWORD: EMAIL VIEW ────────────────────────────
  if (view === "forgot-email") return (
    <Backdrop onClose={onClose}>
      <button onClick={() => { setView("email-login"); setError(""); setForgotEmail(""); }} className="text-gray-400 text-sm mb-4 hover:text-white flex items-center gap-1">← Back to Login</button>
      <h2 className="text-white text-2xl font-semibold mb-2">Forgot Password</h2>
      <p className="text-gray-400 text-sm mb-6">Enter your email and we'll send a 6-digit reset code.</p>
      <input type="email" placeholder="Enter your email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleForgotSendOtp()} className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white mb-4 outline-none focus:border-[#C7E36B]"/>
      <TurnstileWidget />
      {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
      <button onClick={handleForgotSendOtp} disabled={loading} className="w-full bg-[#C7E36B] text-black py-3 rounded-md font-semibold disabled:opacity-60">
        {loading ? "Sending..." : "SEND OTP"}
      </button>
    </Backdrop>
  );

  // ── FORGOT PASSWORD: OTP VIEW ──────────────────────────────
  if (view === "forgot-otp") return (
    <Backdrop onClose={onClose}>
      <button onClick={() => { setView("forgot-email"); setError(""); setForgotOtp(""); }} className="text-gray-400 text-sm mb-4 hover:text-white flex items-center gap-1">← Change Email</button>
      <h2 className="text-white text-2xl font-semibold mb-2">Enter Reset Code</h2>
      <p className="text-gray-400 text-sm mb-6">We emailed a 6-digit code to <strong className="text-white">{forgotEmail}</strong></p>
      {msg && <p className="text-green-400 text-sm mb-3">{msg}</p>}
      <input type="text" maxLength={6} placeholder="6-digit code" value={forgotOtp} onChange={e => setForgotOtp(e.target.value.replace(/\D/g, ""))} onKeyDown={e => e.key === "Enter" && handleForgotVerifyOtp()} className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white mb-4 text-center text-2xl tracking-widest outline-none focus:border-[#C7E36B]"/>
      {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
      <button onClick={handleForgotVerifyOtp} disabled={loading} className="w-full bg-[#C7E36B] text-black py-3 rounded-md font-semibold disabled:opacity-60">
        {loading ? "Verifying..." : "VERIFY CODE"}
      </button>
      <p onClick={handleForgotSendOtp} className="text-center text-gray-400 text-sm mt-4 cursor-pointer hover:text-white">Did not get the code? Resend</p>
    </Backdrop>
  );

  // ── FORGOT PASSWORD: NEW PASSWORD VIEW ─────────────────────
  if (view === "forgot-newpass") return (
    <Backdrop onClose={onClose}>
      <h2 className="text-white text-2xl font-semibold mb-2">Set New Password</h2>
      <p className="text-gray-400 text-sm mb-6">Create a new password for your account.</p>
      <div className="relative mb-6">
        <input type={showNewPwd ? "text" : "password"} placeholder="New password (min 6 characters)" value={newPassword} onChange={e => setNewPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleResetPassword()} className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-[#C7E36B] pr-20"/>
        <button onClick={() => setShowNewPwd(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white">{showNewPwd ? "Hide" : "Show"}</button>
      </div>
      {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
      <button onClick={handleResetPassword} disabled={loading} className="w-full bg-[#C7E36B] text-black py-3 rounded-md font-semibold disabled:opacity-60">
        {loading ? "Resetting..." : "RESET PASSWORD"}
      </button>
    </Backdrop>
  );

  // ── MAIN EMAIL LOGIN VIEW ──────────────────────────────────
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-lg bg-[#0B0F10] rounded-2xl p-6 md:p-8 relative border border-white/10">
        <button onClick={onClose} className="absolute top-4 right-4 text-white text-xl">✕</button>

        <p className="text-gray-400 text-sm">Step 1 Of 2</p>
        <h2 className="text-white text-3xl font-semibold mb-6">Login</h2>

        {msg && <p className="text-green-400 text-sm mb-3">{msg}</p>}

        <input type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white mb-4 outline-none focus:border-[#C7E36B]"/>
        <input type={showPassword ? "text" : "password"} placeholder="Enter Your Password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleEmailLogin()} className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white mb-3 outline-none focus:border-[#C7E36B]"/>

        <div className="flex items-center gap-2 mb-4">
          <input type="checkbox" id="show-pwd" onChange={() => setShowPassword(p => !p)} />
          <label htmlFor="show-pwd" className="text-gray-400 text-sm cursor-pointer">Show password</label>
        </div>

        {turnstileSiteKey && (
          <Turnstile
            ref={turnstileRef}
            siteKey={turnstileSiteKey}
            onSuccess={setTurnstileToken}
            onError={() => setTurnstileToken("")}
            onExpire={() => setTurnstileToken("")}
            options={{ theme: "dark", size: "flexible" }}
            className="mb-4"
          />
        )}

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        <button onClick={handleEmailLogin} disabled={loading} className="w-full bg-[#C7E36B] text-black py-3 rounded-md font-semibold mb-4 disabled:opacity-60">
          {loading ? "Logging in..." : "+ VERIFY AND LOGIN"}
        </button>

        <p onClick={() => { setView("forgot-email"); setError(""); setMsg(""); setForgotOtp(""); resetTurnstile(); }} className="text-center text-blue-400 text-sm mb-4 cursor-pointer hover:underline">
          forgot password?
        </p>

        <p onClick={() => { setView("phone-login"); setError(""); setMsg(""); resetTurnstile(); }} className="text-center text-gray-300 text-sm mb-6 cursor-pointer hover:text-white underline">
          Login via phone number
        </p>

        {GOOGLE_OAUTH_ENABLED && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-[1px] bg-white/10"></div>
              <span className="text-gray-500 text-xs">OR</span>
              <div className="flex-1 h-[1px] bg-white/10"></div>
            </div>
            <button onClick={() => googleLogin()} disabled={loading} className="w-full border border-white/20 text-white py-3 rounded-md flex justify-center gap-2 hover:bg-white/5 disabled:opacity-60 transition-all">
              <img src="/icons/google.png" className="w-4 h-4" alt="Google"/>
              Login Via Google
            </button>
          </>
        )}

        <p className="text-center text-gray-400 text-sm mt-6">
          or create an account on Aifa?{" "}
          <span onClick={onSwitchToSignup} className="text-white underline cursor-pointer">Sign up</span>
        </p>
      </div>
    </div>
  );
}
