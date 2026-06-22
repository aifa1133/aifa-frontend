"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CHECKLIST = [
  "1 Month Program",
  "Lifetime AIFA Membership (Worth ₹40,000)",
  "Certificate of Completion",
  "20 Assignments",
  "Portfolio Mentorship",
  "Session Recordings",
];

function LeftCard({ step, couponApplied, subtotal }) {
  return (
    <div className="bg-[#0F1112] border border-white/10 rounded-2xl p-6 space-y-4">
      <p className="text-[#C7E36B] text-[10px] uppercase font-bold tracking-wider">
        ONLY {step === 2 ? "12" : "FEW"} SEAT LEFT
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#C7E36B]/10 rounded-xl flex items-center justify-center text-2xl">🎬</div>
        <p className="text-white font-bold text-sm">AI Filmmaking Bootcamp</p>
      </div>
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-white">₹14,000</span>
        <span className="text-gray-400 line-through text-sm">₹19,000</span>
      </div>
      {step === 2 && couponApplied ? (
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
          <p className="text-green-400 text-sm font-bold">Total Payable: ₹{subtotal.toLocaleString()}</p>
          <p className="text-green-300 text-xs mt-0.5">Coupon SAVE500 applied</p>
        </div>
      ) : (
        <div className="space-y-2 pt-2">
          {CHECKLIST.map(item => (
            <div key={item} className="flex items-start gap-2">
              <span className="text-[#C7E36B] font-bold shrink-0">✓</span>
              <span className="text-gray-300 text-xs">{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BootcampEnroll() {
  const navigate = useNavigate();
  const [step, setStep]     = useState(1);
  const [form, setForm]     = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [payMethod, setPayMethod] = useState("upi");
  const [coupon, setCoupon]       = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [password, setPassword]         = useState("");
  const [confirmPw, setConfirmPw]       = useState("");
  const [showPw, setShowPw]             = useState(false);
  const [showCPw, setShowCPw]           = useState(false);

  const ORIGINAL = 14000;
  const DISCOUNT = couponApplied ? 700 : 0;
  const SUBTOTAL = ORIGINAL - DISCOUNT;
  const GST      = couponApplied ? 170 : 0;
  const TOTAL    = SUBTOTAL + GST;
  const ORDER    = "ORD-89241";

  const validateStep1 = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!/^\d{10}$/.test(form.phone.replace(/[\s+\-()]/g, ""))) e.phone = "Valid 10-digit mobile required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleCreateAccount = async () => {
    try {
      const res  = await fetch("https://aifa-backend-4an6.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("aifa_token", data.token);
        localStorage.setItem("aifa_user", JSON.stringify(data.user || {}));
      }
    } catch { /* ignore */ }
    navigate("/dashboard");
  };

  /* ── STEP 1 ── */
  if (step === 1) return (
    <div className="min-h-screen bg-[#0B0F10] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-[320px_1fr] gap-6">
          <LeftCard step={1} couponApplied={false} subtotal={SUBTOTAL} />

          <div className="bg-[#0F1112] border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-1">Reserve Your Seat</h2>
            <p className="text-gray-400 text-sm mb-6">You're one step away from joining the AI Filmmaking Bootcamp.</p>

            <div className="space-y-4">
              {[
                ["name",  "Full Name",      "text",  "John Doe"],
                ["email", "Email Address",  "email", "john@example.com"],
                ["phone", "Mobile Number",  "tel",   "+91 98566 55558"],
              ].map(([key, label, type, placeholder]) => (
                <div key={key}>
                  <label className="text-xs text-gray-400 font-semibold uppercase tracking-wide block mb-1.5">{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    className={`w-full bg-[#1A1D1E] border rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder-gray-600 ${errors[key] ? "border-red-500" : "border-white/20 focus:border-[#C7E36B]"}`}
                  />
                  {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
                </div>
              ))}
            </div>

            <button
              onClick={() => { if (validateStep1()) setStep(2); }}
              className="w-full bg-[#C7E36B] text-black font-bold py-3 rounded-xl mt-6 hover:bg-lime-300 transition-all"
            >
              CONTINUE TO PAYMENT →
            </button>

            <div className="flex items-center justify-center gap-5 mt-4 text-gray-500 text-[11px]">
              <span>🔒 Secure Payment</span>
              <span>🛡 Razorpay Secure</span>
              <span>🔒 SSL Protected</span>
            </div>
            <p className="text-center text-gray-500 text-[11px] mt-2">Instant Access After Enrollment</p>
          </div>
        </div>
      </div>
    </div>
  );

  /* ── STEP 2 ── */
  if (step === 2) return (
    <div className="min-h-screen bg-[#0B0F10] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-[320px_1fr] gap-6">
          <LeftCard step={2} couponApplied={couponApplied} subtotal={SUBTOTAL} />

          <div className="bg-[#0F1112] border border-white/10 rounded-2xl p-6 space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Complete Your Enrollment</h2>
              <p className="text-gray-400 text-sm">Choose your preferred payment method to reserve your seat.</p>
            </div>

            {/* Payment Methods */}
            <div className="space-y-2">
              {[
                { id: "upi",        label: "UPI",                   badge: "Instant Confirmation", sub: null },
                { id: "card",       label: "Credit / Debit Cards",   badge: null, sub: "VISA • Mastercard" },
                { id: "netbanking", label: "Net Banking & Wallets",  badge: null, sub: "🏦" },
                { id: "bnpl",       label: "Buy Now Pay Later",      badge: null, sub: null },
              ].map(pm => (
                <div key={pm.id} onClick={() => setPayMethod(pm.id)}
                  className={`border rounded-xl px-4 py-3 cursor-pointer transition-all ${payMethod === pm.id ? "border-[#C7E36B]/50 bg-[#C7E36B]/5" : "border-white/10 hover:border-white/20"}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${payMethod === pm.id ? "border-[#C7E36B]" : "border-gray-500"}`}>
                        {payMethod === pm.id && <div className="w-2 h-2 rounded-full bg-[#C7E36B]" />}
                      </div>
                      <span className="text-white text-sm font-medium">{pm.label}</span>
                      {pm.sub && <span className="text-gray-400 text-xs">{pm.sub}</span>}
                    </div>
                    {pm.badge && <span className="text-[10px] bg-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded-full">{pm.badge}</span>}
                  </div>

                  {pm.id === "upi" && payMethod === "upi" && (
                    <div className="mt-3 pl-7">
                      <div className="flex gap-2 mb-3">
                        {["GPay", "PhonePe", "Paytm", "BHIM"].map(app => (
                          <span key={app} className="text-[10px] bg-white/10 text-gray-300 px-2.5 py-1 rounded-lg font-medium">{app}</span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input placeholder="example@upi" className="flex-1 bg-[#1A1D1E] border border-white/20 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B] placeholder-gray-600" />
                        <button className="text-xs bg-white/10 text-white px-3 py-2 rounded-lg hover:bg-white/20 font-semibold">Verify</button>
                      </div>
                    </div>
                  )}

                  {pm.id === "bnpl" && payMethod === "bnpl" && (
                    <div className="mt-3 pl-7 grid grid-cols-2 gap-2">
                      {[{ name: "LazyPay", desc: "Pay in easy monthly installments" }, { name: "SimplPay", desc: "Pay later with one-click checkout" }].map(b => (
                        <div key={b.name} className="bg-[#1A1D1E] border border-white/10 rounded-xl px-3 py-2.5">
                          <p className="text-xs font-bold text-white">{b.name}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{b.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Coupon */}
            <div>
              <p className="text-xs text-gray-400 mb-2 font-medium">Have a coupon?</p>
              {!couponApplied ? (
                <div className="flex gap-2">
                  <input
                    value={coupon}
                    onChange={e => setCoupon(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 bg-[#1A1D1E] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#C7E36B] placeholder-gray-600"
                  />
                  <button
                    onClick={() => { if (coupon.trim().toUpperCase() === "SAVE500") setCouponApplied(true); }}
                    className="text-[#C7E36B] font-bold text-sm px-4 py-2.5 border border-[#C7E36B]/30 rounded-xl hover:bg-[#C7E36B]/5 transition-all"
                  >
                    Apply
                  </button>
                </div>
              ) : (
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 space-y-1.5">
                  <p className="text-green-400 text-sm font-bold">✓ You will save ₹700.00 on this order</p>
                  <div className="text-xs space-y-1 pt-1">
                    <div className="flex justify-between text-gray-400"><span>Original Price</span><span>₹14,000</span></div>
                    <div className="flex justify-between text-green-400"><span>Coupon Discount</span><span>-₹700</span></div>
                    <div className="flex justify-between text-white font-bold pt-1 border-t border-white/10"><span>Final Amount</span><span>₹13,300</span></div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary card (step 2C) */}
            {showSummary && (
              <div className="bg-[#1A1D1E] border border-white/10 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-white font-bold">Order Summary</p>
                  <span className="text-[10px] bg-white/10 text-gray-400 font-mono px-2 py-0.5 rounded">{ORDER}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-400">Original Price (1 item)</span><span className="text-white">₹14,000</span></div>
                  {couponApplied && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Coupon Code <span className="text-[#C7E36B]">[SAVE500]</span> ✓</span>
                      <span className="text-red-400">-₹700</span>
                    </div>
                  )}
                  <div className="border-t border-white/10 pt-2 flex justify-between"><span className="text-gray-400">Subtotal</span><span className="text-white">₹{SUBTOTAL.toLocaleString()}</span></div>
                  {couponApplied && <div className="flex justify-between"><span className="text-gray-400">Tax (GST)</span><span className="text-white">₹170</span></div>}
                  <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-base">
                    <span className="text-white">Total Payable</span>
                    <span className="text-[#C7E36B]">₹{TOTAL.toLocaleString()}</span>
                  </div>
                </div>
                <button onClick={() => setStep(3)} className="w-full bg-[#C7E36B] text-black font-bold py-3 rounded-xl mt-4 hover:bg-lime-300 transition-all">
                  Proceed to pay
                </button>
              </div>
            )}

            {/* Main CTA */}
            {!showSummary && (
              <button onClick={() => setShowSummary(true)} className="w-full bg-[#C7E36B] text-black font-bold py-3 rounded-xl hover:bg-lime-300 transition-all">
                Pay ₹{(couponApplied ? SUBTOTAL : ORIGINAL).toLocaleString()} SECURELY
              </button>
            )}

            <div className="flex items-center justify-center gap-4 text-gray-500 text-[11px]">
              <span>🔒 Secure by Razorpay</span>
              <span>🛡 256-bit SSL Encryption</span>
              <span>⚡ Instant Enrollment</span>
            </div>
            <p className="text-center text-gray-600 text-[11px]">
              By Proceeding, you agree to Aifa's Terms &amp; Conditions and Refund Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  /* ── STEP 3 ── */
  if (step === 3) return (
    <div className="min-h-screen bg-[#0B0F10] py-16 px-4 flex items-center justify-center">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-[#C7E36B]/10 border-4 border-[#C7E36B] flex items-center justify-center mx-auto mb-5">
            <svg className="w-10 h-10 text-[#C7E36B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="9 12 11 14 15 9" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Seat Successfully Reserved</h2>
          <p className="text-gray-400 text-sm">Welcome to the AI Filmmaking Bootcamp.</p>
        </div>

        <div className="bg-[#0F1112] border border-white/10 rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-white font-bold">Order Summary</p>
            <span className="text-[10px] bg-white/10 text-gray-400 font-mono px-2 py-0.5 rounded">{ORDER}</span>
          </div>
          <div className="space-y-3 text-sm divide-y divide-white/5">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-300">AI Filmmaking Bootcamp</span>
              <span className="text-white font-bold">₹14,000</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-300">Coupon code Applied</span>
              <span className="text-red-400">-₹250</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-300">Membership Included</span>
              <span className="text-[10px] bg-gray-500/20 text-gray-400 px-2 py-0.5 rounded-full">Paid</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-300">Certificate Included</span>
              <span className="text-[#C7E36B] font-bold">✓</span>
            </div>
          </div>
        </div>

        <button onClick={() => setStep(4)} className="w-full bg-[#C7E36B] text-black font-bold py-3 rounded-xl hover:bg-lime-300 transition-all mb-3">
          CREATE MY AIFA ACCOUNT
        </button>
        <p className="text-center text-gray-500 text-xs">We'll use your enrollment email to set up your account.</p>
      </div>
    </div>
  );

  /* ── STEP 4 ── */
  return (
    <div className="min-h-screen bg-[#0B0F10] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: account form */}
          <div className="bg-[#0F1112] border border-white/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-white">Complete Your AIFA Account</h2>
            <p className="text-gray-400 text-sm">Your seat has already been reserved.</p>

            <button className="w-full border border-white/20 text-white font-semibold py-3 rounded-xl hover:bg-white/5 flex items-center justify-center gap-3 transition-all text-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-gray-500 text-[11px] font-medium tracking-wider">OR CREATE PASSWORD</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {[["Password", password, setPassword, showPw, setShowPw], ["Confirm Password", confirmPw, setConfirmPw, showCPw, setShowCPw]].map(([label, val, setVal, show, setShow]) => (
              <div key={label}>
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wide block mb-1.5">{label}</label>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    value={val}
                    onChange={e => setVal(e.target.value)}
                    className="w-full bg-[#1A1D1E] border border-white/20 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#C7E36B] pr-14"
                  />
                  <button onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white transition-all">
                    {show ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            ))}

            <button onClick={handleCreateAccount} className="w-full bg-[#C7E36B] text-black font-bold py-3 rounded-xl hover:bg-lime-300 transition-all">
              ACCESS MY BOOTCAMP
            </button>
          </div>

          {/* Right: account benefits */}
          <div className="bg-[#1A1D1E] border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-5">Your AIFA Account Includes:</h3>
            <div className="space-y-4">
              {["Bootcamp Access", "Lifetime Membership", "Community Access", "Resources", "Video Courses"].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#C7E36B]/10 border border-[#C7E36B]/30 flex items-center justify-center shrink-0">
                    <span className="text-[#C7E36B] text-xs font-bold">✓</span>
                  </div>
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
