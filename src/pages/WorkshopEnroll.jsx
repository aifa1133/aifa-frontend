"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const GST_RATE = 0.18;

const loadRazorpay = () =>
  new Promise(resolve => {
    if (window.Razorpay) { resolve(true); return; }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload  = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

export default function WorkshopEnroll() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token      = localStorage.getItem("aifa_token");
  const isLoggedIn = !!token;
  const storedUser = (() => { try { return JSON.parse(localStorage.getItem("aifa_user") || "{}"); } catch { return {}; } })();

  const [workshop, setWorkshop] = useState(null);
  const [loading,  setLoading]  = useState(true);

  /* step: "info" (guest form) | "pay" (order summary) | "done" */
  const [step, setStep] = useState(isLoggedIn ? "pay" : "info");

  const [form,   setForm]   = useState({ name: storedUser.name || "", email: storedUser.email || "", phone: "" });
  const [errors, setErrors] = useState({});
  const [emailError, setEmailError] = useState("");

  const [couponInput,   setCouponInput]   = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponResult,  setCouponResult]  = useState(null);
  const [couponError,   setCouponError]   = useState("");

  const [paying,    setPaying]    = useState(false);
  const [guestIsNew, setGuestIsNew] = useState(false);
  const [tempPw,    setTempPw]    = useState("");

  /* ── Fetch workshop ── */
  useEffect(() => {
    if (!id) { navigate("/workshops"); return; }
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    fetch(`/api/workshops/${id}`, { headers })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?._id) {
          setWorkshop(data);
          /* Redirect if already enrolled */
          if (token) {
            const user = storedUser;
            const enrolled = data.registrations?.some(r => {
              const rid = r?.user?._id || r?.user || r;
              return String(rid) === String(user._id);
            });
            if (enrolled) navigate(`/workshops/${id}`, { replace: true });
          }
        } else {
          navigate("/workshops");
        }
      })
      .catch(() => navigate("/workshops"))
      .finally(() => setLoading(false));

    /* Pre-fill from profile */
    if (token) {
      fetch("/api/users/me", { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.ok ? r.json() : null)
        .then(d => { if (d) setForm(f => ({ ...f, name: d.name || f.name, email: d.email || f.email, phone: d.phone || f.phone })); })
        .catch(() => {});
    }
  }, [id]);

  /* ── Validation ── */
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!/^\d{10}$/.test(form.phone.replace(/[\s+\-()]/g, ""))) e.phone = "Valid 10-digit mobile required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  /* ── Guest form submit ── */
  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setEmailError("");

    try {
      const res = await fetch("/api/auth/guest-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone }),
      });
      const data = await res.json();
      if (res.status === 409) {
        setEmailError(data.message || "This email is linked to an existing account. Please log in.");
        return;
      }
      if (res.ok && data.token) {
        localStorage.setItem("aifa_token", data.token);
        localStorage.setItem("aifa_user", JSON.stringify({
          name: data.name, _id: data._id, role: data.role,
          profilePicture: data.profilePicture || "", isGuest: true,
        }));
        if (data.isNewUser) { setGuestIsNew(true); setTempPw(data.tempPw || ""); }
      }
    } catch { /* proceed; payment API will catch real errors */ }

    setStep("pay");
  };

  /* ── Coupon ── */
  const applyCoupon = async () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    setCouponLoading(true); setCouponError(""); setCouponResult(null);
    try {
      const res  = await fetch(`/api/payments/validate-coupon?code=${encodeURIComponent(code)}`);
      const data = await res.json();
      if (!res.ok || !data.valid) { setCouponError(data.message || "Invalid coupon code"); }
      else { setCouponResult(data); }
    } catch { setCouponError("Network error. Try again."); }
    setCouponLoading(false);
  };

  /* ── Payment ── */
  const handlePay = async () => {
    const activeToken = localStorage.getItem("aifa_token");
    if (!activeToken) { setStep("info"); return; }
    setPaying(true);

    try {
      const loaded = await loadRazorpay();
      if (!loaded) { alert("Payment gateway failed to load. Check your connection."); setPaying(false); return; }

      const h = { "Content-Type": "application/json", Authorization: `Bearer ${activeToken}` };
      const orderRes = await fetch("/api/payments/create-order", {
        method: "POST", headers: h,
        body: JSON.stringify({ itemType: "workshop", itemId: id, couponCode: couponResult?.couponCode || undefined }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) { alert(orderData.message || "Could not create order. Try again."); setPaying(false); return; }

      const activeUser = (() => { try { return JSON.parse(localStorage.getItem("aifa_user") || "{}"); } catch { return {}; } })();

      const options = {
        key:         orderData.keyId,
        amount:      orderData.amount,
        currency:    "INR",
        name:        "AIFA Film Academy",
        description: workshop.title,
        order_id:    orderData.orderId,
        prefill:     { name: form.name || activeUser.name || "", email: form.email || activeUser.email || "", contact: form.phone || "" },
        theme:       { color: "#C7E36B" },
        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/payments/verify", {
              method: "POST", headers: h,
              body: JSON.stringify({
                razorpay_order_id:   response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature:  response.razorpay_signature,
                txId: orderData.txId,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              setStep("done");
            } else {
              alert("Payment verification failed. Contact support with payment ID: " + response.razorpay_payment_id);
            }
          } catch {
            alert("Verification error. Save your payment ID: " + response.razorpay_payment_id);
          }
          setPaying(false);
        },
        modal: { ondismiss: () => setPaying(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      alert("Something went wrong. Please try again.");
      setPaying(false);
    }
  };

  /* ── Loading ── */
  if (loading) return (
    <div className="min-h-screen bg-[#0B0F10] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#C7E36B] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!workshop) return null;

  const basePrice      = Number(workshop.price || 0);
  const currency       = workshop.currency === "USD" ? "$" : "₹";
  const discountAmount = couponResult ? Math.round(basePrice * couponResult.discount) / 100 : 0;
  const discountedBase = basePrice - discountAmount;
  const tax            = Math.round(discountedBase * GST_RATE);
  const total          = discountedBase + tax;
  const shortId        = "ORD-XXXXX";

  const benefits = workshop.benefits || [
    "Live interactive session",
    "Session recording access",
    "Downloadable resources",
    "Certificate of completion",
    "Direct trainer Q&A",
  ];

  /* ── Success ── */
  if (step === "done") return (
    <div className="min-h-screen bg-[#0B0F10] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#111315] border border-white/10 rounded-2xl p-8 text-center space-y-5">
        <div className="text-6xl">🎉</div>
        <h2 className="text-white text-2xl font-bold">Seat Reserved!</h2>
        <p className="text-gray-400 text-sm">
          You&apos;ve successfully enrolled in <span className="text-white font-semibold">{workshop.title}</span>.
        </p>
        <p className="text-gray-500 text-xs">A confirmation email has been sent to your registered email address.</p>
        <button onClick={() => navigate(`/workshops/${id}`)}
          className="w-full py-3 bg-[#C7E36B] text-black font-bold rounded-xl hover:opacity-90 transition">
          View Workshop Details
        </button>
        <button onClick={() => navigate("/dashboard/workshops")}
          className="w-full py-2 text-gray-400 text-sm hover:text-white transition">
          Go to Dashboard
        </button>
      </div>
    </div>
  );

  /* ── Main page ── */
  return (
    <div className="min-h-screen bg-[#0B0F10]">
      {/* Back */}
      <div className="max-w-5xl mx-auto px-4 pt-8 pb-2">
        <button onClick={() => navigate("/workshops")}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back to Workshops
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-16 pt-6 flex flex-col md:flex-row gap-6">

        {/* LEFT — Workshop info */}
        <div className="w-full md:w-[280px] shrink-0 bg-[#111315] border border-white/10 rounded-2xl p-6 flex flex-col gap-4 h-fit">
          <p className="text-[#C7E36B] text-[10px] font-bold tracking-widest uppercase">Own this seat forever.</p>

          {workshop.image && (
            <img src={workshop.image} alt={workshop.title}
              className="w-full h-[130px] object-cover rounded-xl"
              onError={e => e.target.style.display = "none"} />
          )}

          <div>
            <h3 className="text-white font-bold text-[15px] leading-snug">{workshop.title}</h3>
            {workshop.scheduledAt && (
              <p className="text-gray-400 text-xs mt-1">
                {new Date(workshop.scheduledAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                {" · "}
                {new Date(workshop.scheduledAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}
              </p>
            )}
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-white font-black text-2xl">{currency}{basePrice.toLocaleString("en-IN")}</span>
          </div>

          <ul className="flex flex-col gap-2">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-gray-300">
                <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="flex-1 flex flex-col gap-5">

          {/* STEP: Guest info form */}
          {step === "info" && (
            <div className="bg-[#111315] border border-white/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-white font-black text-2xl mb-1">Reserve Your Seat</h2>
              <p className="text-gray-400 text-sm mb-6">Enter your details to continue to payment.</p>

              <form onSubmit={handleInfoSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs text-gray-400 font-semibold mb-1 block">Full Name</label>
                  <input type="text" placeholder="John Doe" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full bg-[#1A1D1E] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#C7E36B]/60 placeholder-gray-600" />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="text-xs text-gray-400 font-semibold mb-1 block">Email Address</label>
                  <input type="email" placeholder="john@example.com" value={form.email}
                    onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setEmailError(""); }}
                    className={`w-full bg-[#1A1D1E] border rounded-xl px-4 py-3 text-white text-sm outline-none placeholder-gray-600 ${emailError ? "border-red-500/70" : "border-white/10 focus:border-[#C7E36B]/60"}`} />
                  {emailError && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-2">
                      {emailError}
                      <button type="button" onClick={() => navigate("/login")} className="underline text-[#C7E36B] hover:opacity-80">Log in →</button>
                    </p>
                  )}
                  {errors.email && !emailError && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="text-xs text-gray-400 font-semibold mb-1 block">Mobile Number</label>
                  <input type="tel" placeholder="Enter 10-digit mobile number" value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                    inputMode="numeric" maxLength={10}
                    className="w-full bg-[#1A1D1E] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#C7E36B]/60 placeholder-gray-600" />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                <button type="submit"
                  className="w-full bg-[#C7E36B] text-black font-black text-sm py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all mt-2 tracking-wide">
                  CONTINUE TO PAYMENT →
                </button>
              </form>

              <div className="flex items-center justify-center gap-6 mt-5 flex-wrap">
                {[["🔒", "Secure Payment"], ["◎", "Razorpay Secure"], ["🔒", "SSL Protected"]].map(([icon, label]) => (
                  <span key={label} className="flex items-center gap-1.5 text-[11px] text-gray-400 font-semibold">
                    <span>{icon}</span>{label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* STEP: Order summary + pay */}
          {step === "pay" && (
            <div className="bg-[#111315] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-5">
              {/* Header */}
              <div className="flex items-center justify-between">
                {!isLoggedIn && (
                  <button onClick={() => setStep("info")}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all">
                    ← Back
                  </button>
                )}
                <div className={!isLoggedIn ? "" : ""}>
                  <h2 className="text-white font-black text-xl">Complete Your Enrollment</h2>
                  <p className="text-gray-400 text-xs">Choose your preferred payment method to purchase Workshop</p>
                </div>
              </div>

              {/* Logged-in user info */}
              {isLoggedIn && (
                <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                  <div className="w-8 h-8 rounded-full bg-[#C7E36B]/10 flex items-center justify-center text-[#C7E36B] font-bold text-sm shrink-0">
                    {(storedUser.name || "U")[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{storedUser.name || "Student"}</p>
                    <p className="text-gray-400 text-xs">Logged in · payment will be linked to your account</p>
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <div className="bg-[#1A1D1E] rounded-xl p-4 border border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white text-xs font-bold">Order Summary</span>
                  <span className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded">{shortId}</span>
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Original Price (1 item)</span>
                    <span className="text-white">{currency}{basePrice.toLocaleString("en-IN")}</span>
                  </div>
                  {couponResult && (
                    <div className="flex justify-between text-green-400">
                      <span>Coupon ({couponResult.couponCode}) -{couponResult.discount}%</span>
                      <span>-{currency}{discountAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-white">{currency}{discountedBase.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Tax (GST)</span>
                    <span className="text-white">{currency}{tax}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold pt-2 border-t border-white/10 mt-1">
                    <span>Total Payable</span>
                    <span className="text-[#C7E36B]">{currency}{total.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>

              {/* Coupon */}
              <div>
                <p className="text-gray-400 text-xs font-semibold mb-1.5">Have a coupon?</p>
                {couponResult ? (
                  <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                      <span className="text-green-400 text-sm font-bold">{couponResult.couponCode}</span>
                      <span className="text-green-300 text-xs">{couponResult.discount}% off applied</span>
                    </div>
                    <button onClick={() => { setCouponResult(null); setCouponError(""); setCouponInput(""); }}
                      className="text-gray-500 hover:text-red-400 text-xs transition-colors">Remove</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input type="text" placeholder="ENTER COUPON CODE" value={couponInput}
                      onChange={e => { setCouponInput(e.target.value.toUpperCase()); setCouponError(""); }}
                      onKeyDown={e => e.key === "Enter" && applyCoupon()}
                      className="flex-1 bg-[#1A1D1E] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#C7E36B]/50 placeholder-gray-600 uppercase" />
                    <button onClick={applyCoupon} disabled={couponLoading || !couponInput.trim()}
                      className="px-5 py-2.5 bg-[#C7E36B] text-black text-xs font-black rounded-xl hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all whitespace-nowrap">
                      {couponLoading ? "..." : "Apply"}
                    </button>
                  </div>
                )}
                {couponError && <p className="text-red-400 text-xs mt-1.5">{couponError}</p>}
              </div>

              {/* Pay button */}
              <button onClick={handlePay} disabled={paying}
                className="w-full bg-[#C7E36B] text-black font-black text-sm py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 tracking-wide">
                {paying ? "Processing..." : `Pay ${currency}${total.toLocaleString("en-IN", { maximumFractionDigits: 2 })} SECURELY`}
              </button>

              <div className="flex items-center justify-center gap-5 flex-wrap -mt-2">
                {[["🛡", "Secure by Razorpay"], ["🔒", "256-bit SSL Encryption"], ["⚡", "Instant Enrollment"]].map(([icon, label]) => (
                  <span key={label} className="flex items-center gap-1 text-[10px] text-gray-400 font-semibold">
                    <span>{icon}</span>{label}
                  </span>
                ))}
              </div>
              <p className="text-center text-[10px] text-gray-600 -mt-3">
                By Proceeding, you agree to Aifa&apos;s Terms &amp; Conditions and Refund Policy.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
