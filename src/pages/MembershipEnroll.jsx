import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const loadRazorpay = () =>
  new Promise(resolve => {
    if (window.Razorpay) { resolve(true); return; }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload  = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

const PRICE     = 1;
const ORIG      = 15000;
const FEATURES  = [
  "Access to all current courses",
  "All future courses included",
  "Lifetime access (one-time payment)",
  "Access to resources",
  "Community access",
  "Career & Job Opportunities",
  "Priority support & updates",
];

export default function MembershipEnroll() {
  const navigate   = useNavigate();
  const token      = localStorage.getItem("aifa_token");
  const isLoggedIn = !!token;
  const storedUser = JSON.parse(localStorage.getItem("aifa_user") || "{}");

  const [step, setStep]       = useState(isLoggedIn ? 2 : 1);
  const [form, setForm]       = useState({ name: storedUser.name || "", email: "", phone: "" });
  const [errors, setErrors]   = useState({});
  const [paying, setPaying]   = useState(false);
  const [authToken, setAuthToken] = useState(token || "");
  const [coupon, setCoupon]   = useState("");
  const [couponMsg, setCouponMsg] = useState(null);
  const [discount, setDiscount]  = useState(0);

  /* Pre-fill from profile */
  useEffect(() => {
    if (!isLoggedIn) return;
    fetch("/api/users/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(p => setForm(f => ({ ...f, name: p.name || storedUser.name || "", email: p.email || "" })))
      .catch(() => {});
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!/^\d{10}$/.test(form.phone.replace(/[\s+\-()]/g, ""))) e.phone = "Valid 10-digit mobile required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const applyCoupon = async () => {
    if (!coupon.trim()) return;
    const r = await fetch(`/api/payments/validate-coupon?code=${coupon.trim().toUpperCase()}`).catch(() => null);
    if (!r || !r.ok) { setCouponMsg({ ok: false, text: "Invalid or expired coupon." }); return; }
    const d = await r.json();
    if (d.valid) {
      const disc = Math.round(PRICE * d.discount / 100);
      setDiscount(disc);
      setCouponMsg({ ok: true, text: `${d.discount}% off applied — you save ₹${disc.toLocaleString("en-IN")}` });
    } else {
      setDiscount(0); setCouponMsg({ ok: false, text: "Invalid or expired coupon." });
    }
  };

  const finalPrice = Math.max(0, PRICE - discount);

  const handlePay = async () => {
    setPaying(true);
    try {
      let tok = authToken;
      if (!tok) {
        if (!validate()) { setPaying(false); return; }
        const pw = "AIFA_" + Math.random().toString(36).slice(2, 10) + "!1";
        const sr = await fetch("/api/auth/signup", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, password: pw }),
        });
        const sd = await sr.json();
        if (sd.token) {
          tok = sd.token;
          localStorage.setItem("aifa_token", tok);
          localStorage.setItem("aifa_user", JSON.stringify({ _id: sd._id, name: sd.name, role: sd.role || "student" }));
          setAuthToken(tok);
        } else {
          alert(sd.message || "Could not create account. Try again.");
          setPaying(false); return;
        }
      }

      const h = { "Content-Type": "application/json", Authorization: `Bearer ${tok}` };
      const loaded = await loadRazorpay();
      if (!loaded) { alert("Payment gateway failed to load."); setPaying(false); return; }

      const orderRes = await fetch("/api/payments/create-order", {
        method: "POST", headers: h,
        body: JSON.stringify({ itemType: "membership", couponCode: coupon.trim().toUpperCase() || undefined }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) { alert(orderData.message || "Could not create order."); setPaying(false); return; }

      const options = {
        key:         orderData.keyId,
        amount:      orderData.amount,
        currency:    "INR",
        name:        "AIFA Film Academy",
        description: "Pro Membership — All Courses Unlocked",
        order_id:    orderData.orderId,
        prefill:     { name: form.name, email: form.email, contact: form.phone },
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
            const vd = await verifyRes.json();
            if (verifyRes.ok && vd.success) {
              /* Refresh user in localStorage */
              fetch("/api/users/me", { headers: { Authorization: `Bearer ${tok}` } })
                .then(r => r.json())
                .then(p => { if (p._id) localStorage.setItem("aifa_user", JSON.stringify({ ...JSON.parse(localStorage.getItem("aifa_user")||"{}"), isPro: true })); })
                .catch(() => {});
              setStep(3);
            } else {
              alert("Payment verification failed. Contact support with payment ID: " + response.razorpay_payment_id);
            }
          } catch { alert("Verification error."); }
          setPaying(false);
        },
        modal: { ondismiss: () => setPaying(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch { alert("Something went wrong. Please try again."); setPaying(false); }
  };

  /* ── Step 3: Success ── */
  if (step === 3) {
    return (
      <div className="min-h-screen bg-[#0B0F10] text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#C7E36B]/15 border-2 border-[#C7E36B] flex items-center justify-center mx-auto text-4xl">🎉</div>
          <h1 className="text-2xl font-black text-white">You're a Pro Member!</h1>
          <p className="text-gray-400 text-sm leading-relaxed">You now have lifetime access to all current and future AIFA courses, resources, and community.</p>
          <button onClick={() => navigate("/dashboard/video-courses")} className="w-full bg-[#C7E36B] hover:bg-lime-300 text-black font-bold py-4 rounded-xl transition-all text-base">
            Start Learning →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F10] text-white">
      <div className="max-w-[900px] mx-auto px-6 py-10">

        {/* Back */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors">← Back</button>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left: Summary */}
          <div className="lg:w-[380px] shrink-0">
            <div className="bg-[#111A0D] border border-[#C7E36B]/30 rounded-2xl p-7 sticky top-6">
              <div className="absolute top-4 right-4 bg-[#C7E36B] text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase">BEST VALUE</div>
              <p className="text-xs font-bold text-[#C7E36B] uppercase tracking-widest mb-2">All Courses Unlocked</p>
              <h2 className="text-xl font-bold mb-4">Unlock Pro Membership</h2>
              <div className="flex items-end gap-2 mb-5">
                <span className="text-3xl font-black">₹{finalPrice.toLocaleString("en-IN")}</span>
                <span className="text-gray-500 line-through text-base mb-1">₹{ORIG.toLocaleString("en-IN")}</span>
              </div>
              <ul className="flex flex-col gap-2.5 mb-6">
                {FEATURES.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <span className="text-[#C7E36B] shrink-0 mt-0.5">✓</span>{f}
                  </li>
                ))}
              </ul>
              {/* Coupon */}
              <div className="border-t border-white/10 pt-5">
                <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide font-semibold">Coupon Code</p>
                <div className="flex gap-2">
                  <input value={coupon} onChange={e => { setCoupon(e.target.value); setCouponMsg(null); setDiscount(0); }}
                    placeholder="Enter code" className="flex-1 bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50" />
                  <button onClick={applyCoupon} className="bg-[#C7E36B] text-black text-xs font-bold px-3 py-2 rounded-lg hover:bg-lime-300 transition-all">Apply</button>
                </div>
                {couponMsg && <p className={`text-xs mt-2 ${couponMsg.ok ? "text-[#C7E36B]" : "text-red-400"}`}>{couponMsg.text}</p>}
              </div>
            </div>
          </div>

          {/* Right: Form / Review */}
          <div className="flex-1">
            {step === 1 && (
              <div className="space-y-5">
                <h1 className="text-xl font-bold">Your Details</h1>
                {[["name","Full Name","text"],["email","Email Address","email"],["phone","Phone Number","tel"]].map(([k,label,type]) => (
                  <div key={k}>
                    <label className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1 block">{label}</label>
                    <input type={type} value={form[k]} onChange={e => setForm(f => ({...f, [k]: e.target.value}))}
                      className={`w-full bg-white/5 border ${errors[k] ? "border-red-500" : "border-white/15"} rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50`}
                      placeholder={label} />
                    {errors[k] && <p className="text-xs text-red-400 mt-1">{errors[k]}</p>}
                  </div>
                ))}
                <button onClick={() => { if (validate()) setStep(2); }} className="w-full bg-[#C7E36B] hover:bg-lime-300 text-black font-bold py-4 rounded-xl transition-all text-sm mt-2">Continue →</button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h1 className="text-xl font-bold">Review & Pay</h1>
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
                  <div className="flex justify-between text-sm"><span className="text-gray-400">Name</span><span className="text-white font-medium">{form.name}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-400">Email</span><span className="text-white font-medium">{form.email}</span></div>
                  {form.phone && <div className="flex justify-between text-sm"><span className="text-gray-400">Phone</span><span className="text-white font-medium">{form.phone}</span></div>}
                  <div className="border-t border-white/10 pt-3 flex justify-between text-sm font-bold">
                    <span className="text-gray-300">Total</span>
                    <span className="text-[#C7E36B] text-base">₹{finalPrice.toLocaleString("en-IN")}</span>
                  </div>
                </div>
                {!isLoggedIn && (
                  <button onClick={() => setStep(1)} className="text-gray-400 hover:text-white text-sm transition-colors">← Edit details</button>
                )}
                <button onClick={handlePay} disabled={paying} className="w-full bg-[#C7E36B] hover:bg-lime-300 disabled:opacity-60 text-black font-bold py-4 rounded-xl transition-all text-base">
                  {paying ? "Processing..." : `Pay ₹${finalPrice.toLocaleString("en-IN")} →`}
                </button>
                <p className="text-xs text-gray-600 text-center">Secured by Razorpay · One-time payment · Lifetime access</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
