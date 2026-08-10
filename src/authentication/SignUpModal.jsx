import { useState, useRef } from "react";

const PWD_RULES = [
  { label: "At least 12 characters", test: p => p.length >= 12 },
  { label: "One uppercase letter",   test: p => /[A-Z]/.test(p) },
  { label: "One lowercase letter",   test: p => /[a-z]/.test(p) },
  { label: "One number",             test: p => /[0-9]/.test(p) },
  { label: "No spaces",              test: p => p.length > 0 && !/\s/.test(p) },
];

function PasswordStrength({ password }) {
  const passed = PWD_RULES.filter(r => r.test(password)).length;
  return (
    <div className="absolute left-0 right-0 top-full mt-1 z-20 bg-[#1A1D1E] border border-white/20 rounded-xl p-4 shadow-xl">
      <p className="text-xs font-bold text-gray-300 mb-2">Password must have:</p>
      <div className="space-y-1.5">
        {PWD_RULES.map(r => (
          <div key={r.label} className="flex items-center gap-2">
            <span className={`text-sm font-bold ${r.test(password) ? "text-[#C7E36B]" : "text-gray-600"}`}>
              {r.test(password) ? "✓" : "○"}
            </span>
            <span className={`text-xs ${r.test(password) ? "text-gray-300" : "text-gray-500"}`}>{r.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-1">
        {[0,1,2,3].map(i => (
          <div key={i} className={`flex-1 h-1 rounded-full transition-colors ${i < passed ? (passed <= 1 ? "bg-red-400" : passed <= 2 ? "bg-yellow-400" : passed <= 3 ? "bg-blue-400" : "bg-[#C7E36B]") : "bg-white/10"}`}/>
        ))}
      </div>
    </div>
  );
}

export default function SignUpModal({ onClose, onSwitchToLogin }) {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [phone, setPhone]     = useState("");
  const [otp, setOtp]         = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showPwdStrength, setShowPwdStrength] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [error, setError]     = useState("");
  const [msg, setMsg]         = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep]       = useState(1); // 1 = info, 2 = email-otp, 3 = password
  const pwdRef = useRef(null);

  const handleContinue = async () => {
    setError("");
    if (!name || !email || !phone) { setError("Please fill in all fields."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-email-otp", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.message || "Failed to send OTP.");
      else { setStep(2); setMsg("We've emailed you a 6-digit code."); }
    } catch { setError("Network error. Please try again."); }
    finally { setLoading(false); }
  };

  const handleVerifyOtp = async () => {
    setError("");
    if (!otp || otp.length < 6) { setError("Enter the 6-digit code."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-email-otp", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.message || "Invalid code.");
      else { setStep(3); setMsg(""); }
    } catch { setError("Network error."); }
    finally { setLoading(false); }
  };

  const handleResendOtp = async () => {
    setError(""); setMsg("");
    setLoading(true);
    try {
      await fetch("/api/auth/send-email-otp", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setMsg("OTP resent! Check your email.");
    } catch {}
    finally { setLoading(false); }
  };

  const handleSignup = async () => {
    setError("");
    const allPassed = PWD_RULES.every(r => r.test(password));
    if (!allPassed) { setError("Password does not meet all requirements."); setShowPwdStrength(true); return; }
    if (!termsChecked) { setError("Please agree to the Terms and Privacy Policy."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.message || "Signup failed.");
      else {
        localStorage.setItem("aifa_token", data.token);
        localStorage.setItem("aifa_user", JSON.stringify({ name: data.name, _id: data._id, role: data.role }));
        onClose();
        window.location.reload();
      }
    } catch { setError("Network error. Please try again."); }
    finally { setLoading(false); }
  };

  const stepLabel = step === 1 ? "Step 1 Of 3" : step === 2 ? "Step 2 Of 3" : "Step 3 Of 3";

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div onClick={e => e.stopPropagation()} className="w-full max-w-xl bg-[#0B0F10] rounded-[32px] p-6 md:p-10 relative border border-white/10">
        <button onClick={onClose} className="absolute top-5 right-5 text-white text-2xl">✕</button>

        <p className="text-gray-400 text-sm mb-1">{stepLabel}</p>
        <h2 className="text-white text-3xl md:text-4xl font-semibold mb-8">Sign up</h2>

        {/* ── STEP 1: Info ── */}
        {step === 1 && (
          <>
            <input type="text" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)}
              className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white mb-4 outline-none focus:border-[#C7E36B]"/>
            <input type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white mb-4 outline-none focus:border-[#C7E36B]"/>
            <div className="flex gap-3 mb-6">
              <div className="flex items-center border border-white/20 rounded-xl px-4 py-3 text-white shrink-0">+91</div>
              <input type="text" placeholder="Enter Phone" value={phone} onChange={e => setPhone(e.target.value)}
                className="flex-1 bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-[#C7E36B]"/>
            </div>
            {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
            <button onClick={handleContinue} disabled={loading} className="w-full bg-[#C7E36B] text-black py-3 rounded-md font-semibold disabled:opacity-60">
              {loading ? "Sending code..." : "+ CONTINUE"}
            </button>
          </>
        )}

        {/* ── STEP 2: Email OTP ── */}
        {step === 2 && (
          <>
            <p className="text-gray-400 text-sm mb-6">
              We've emailed a 6-digit code to <strong className="text-white">{email}</strong>
            </p>
            {msg && <p className="text-green-400 text-sm mb-3">{msg}</p>}
            <input type="text" maxLength={6} placeholder="Enter 6-digit code" value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, ""))}
              onKeyDown={e => e.key === "Enter" && handleVerifyOtp()}
              className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white mb-6 text-center text-2xl tracking-widest outline-none focus:border-[#C7E36B]"/>
            {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
            <button onClick={handleVerifyOtp} disabled={loading} className="w-full bg-[#C7E36B] text-black py-3 rounded-md font-semibold disabled:opacity-60 mb-3">
              {loading ? "Verifying..." : "+ CONTINUE"}
            </button>
            <p onClick={handleResendOtp} className="text-center text-gray-400 text-sm cursor-pointer hover:text-white">
              Did not get the code? <span className="text-blue-400">Click to resend</span>
            </p>
            <button onClick={() => { setStep(1); setOtp(""); setError(""); }} className="w-full mt-3 text-gray-400 text-sm underline cursor-pointer hover:text-white transition">
              Back
            </button>
          </>
        )}

        {/* ── STEP 3: Password ── */}
        {step === 3 && (
          <>
            <p className="text-gray-400 text-sm mb-4">Create a strong password for your account</p>
            <div className="relative mb-2" ref={pwdRef}>
              <input
                type={showPwd ? "text" : "password"}
                placeholder="Create Password (min 12 characters)"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setShowPwdStrength(true)}
                onBlur={() => setTimeout(() => setShowPwdStrength(false), 200)}
                onKeyDown={e => e.key === "Enter" && handleSignup()}
                className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-[#C7E36B] pr-16"
              />
              <button onClick={() => setShowPwd(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white">
                {showPwd ? "Hide" : "Show"}
              </button>
              {showPwdStrength && password.length > 0 && <PasswordStrength password={password}/>}
            </div>

            <div className="flex items-start gap-3 mt-5 mb-4">
              <button
                onClick={() => setTermsChecked(p => !p)}
                className={`mt-0.5 w-5 h-5 shrink-0 rounded border-2 flex items-center justify-center transition-colors ${termsChecked ? "bg-[#C7E36B] border-[#C7E36B]" : "border-white/30 bg-transparent"}`}
              >
                {termsChecked && <span className="text-black text-xs font-bold">✓</span>}
              </button>
              <p className="text-gray-400 text-sm leading-relaxed">
                I have read and agree to the{" "}
                <span className="text-blue-400 cursor-pointer hover:underline">Terms of Service</span> and{" "}
                <span className="text-blue-400 cursor-pointer hover:underline">Privacy Policy</span>
              </p>
            </div>

            {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
            <button onClick={handleSignup} disabled={loading} className="w-full bg-[#C7E36B] text-black py-3 rounded-md font-semibold disabled:opacity-60">
              {loading ? "Creating Account..." : "+ CREATE ACCOUNT"}
            </button>
            <button onClick={() => { setStep(2); setError(""); }} className="w-full mt-3 text-gray-400 text-sm underline cursor-pointer hover:text-white transition">
              Back
            </button>
          </>
        )}

        <p className="text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <span onClick={onSwitchToLogin} className="text-blue-400 cursor-pointer">Click here</span>
        </p>
      </div>
    </div>
  );
}
