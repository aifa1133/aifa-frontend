"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const loadRazorpay = () =>
  new Promise(resolve => {
    if (window.Razorpay) { resolve(true); return; }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload  = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

export default function CourseEnroll() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token      = localStorage.getItem("aifa_token");
  const isLoggedIn = !!token;
  const storedUser = JSON.parse(localStorage.getItem("aifa_user") || "{}");

  /* ── State ── */
  const [step, setStep]         = useState(isLoggedIn ? 2 : 1); // 1=form, 2=review, 3=success
  const [course, setCourse]     = useState(null);
  const [loading, setLoading]   = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [form, setForm]     = useState({ name: storedUser.name || "", email: "", phone: "" });
  const [errors, setErrors] = useState({});

  const [paying, setPaying]     = useState(false);
  const [authToken, setAuthToken] = useState(token || "");
  const [tempPw, setTempPw]     = useState("");
  const [orderId, setOrderId]   = useState("");
  const [txId, setTxId]         = useState("");

  const [showSummary, setShowSummary] = useState(false);

  /* ── Fetch course ── */
  useEffect(() => {
    if (!id || id.startsWith("m")) { setNotFound(true); setLoading(false); return; }

    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    fetch(`/api/courses/${id}`, { headers })
      .then(r => r.json())
      .then(data => {
        if (data._id) {
          setCourse(data);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));

    if (isLoggedIn) {
      fetch("/api/courses/enrolled", { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json())
        .then(enrolled => {
          if (Array.isArray(enrolled) && enrolled.some(c => String(c._id) === id)) {
            navigate(`/courses/${id}/watch`, { replace: true });
          }
        })
        .catch(() => {});

      /* Pre-fill email from profile */
      fetch("/api/users/me", { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json())
        .then(profile => {
          setForm(f => ({ ...f, name: profile.name || storedUser.name || "", email: profile.email || "" }));
        })
        .catch(() => {});
    }
  }, [id]);

  /* ── Validation ── */
  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!/^\d{10}$/.test(form.phone.replace(/[\s+\-()]/g, ""))) e.phone = "Valid 10-digit mobile required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  /* ── Payment ── */
  const handlePay = async () => {
    setPaying(true);
    try {
      let tok = authToken;

      /* Step 1 users: auto-create account */
      if (!tok) {
        if (!validate()) { setPaying(false); return; }
        const pw = "AIFA_" + Math.random().toString(36).slice(2, 10) + "!1";
        const sr = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, password: pw }),
        });
        const sd = await sr.json();
        if (sd.token) {
          tok = sd.token;
          localStorage.setItem("aifa_token", tok);
          localStorage.setItem("aifa_user", JSON.stringify({ _id: sd._id, name: sd.name, role: sd.role || "student" }));
          setAuthToken(tok);
          setTempPw(pw);
        } else {
          alert(sd.message?.includes("already exists")
            ? "An account with this email already exists. Please log in first."
            : sd.message || "Could not create account. Try again.");
          setPaying(false); return;
        }
      }

      const h = { "Content-Type": "application/json", Authorization: `Bearer ${tok}` };

      const loaded = await loadRazorpay();
      if (!loaded) { alert("Payment gateway failed to load. Check your connection."); setPaying(false); return; }

      const orderRes = await fetch("/api/payments/create-order", {
        method: "POST", headers: h,
        body: JSON.stringify({ itemType: "course", itemId: course._id }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) { alert(orderData.message || "Could not create order. Try again."); setPaying(false); return; }

      setOrderId(orderData.orderId || "");
      setTxId(orderData.txId || "");

      const options = {
        key:         orderData.keyId,
        amount:      orderData.amount,
        currency:    "INR",
        name:        "AIFA Film Academy",
        description: course.title,
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
            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              setStep(3);
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

  /* ── Loading / not found ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1112] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C7E36B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !course) {
    return (
      <div className="min-h-screen bg-[#0F1112] flex flex-col items-center justify-center gap-4 text-center px-4">
        <span className="text-5xl">🎬</span>
        <h2 className="text-white text-2xl font-bold">Course not found</h2>
        <p className="text-gray-400 text-sm">This course is coming soon or the link is invalid.</p>
        <button onClick={() => navigate("/courses")} className="mt-4 px-6 py-2 bg-[#C7E36B] text-black font-bold rounded-lg text-sm hover:bg-lime-300 transition-colors">
          Browse Courses
        </button>
      </div>
    );
  }

  const discount = course.originalPrice && course.originalPrice > course.price
    ? Math.round((1 - course.price / course.originalPrice) * 100) : 0;

  /* ── Step 3: Success ── */
  if (step === 3) {
    return (
      <div className="min-h-screen bg-[#0F1112] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[#181C1E] border border-white/10 rounded-2xl p-8 text-center space-y-6">
          <div className="text-6xl">🎉</div>
          <h2 className="text-white text-2xl font-bold">Payment Successful!</h2>
          <p className="text-gray-400 text-sm">
            You&apos;ve successfully purchased <span className="text-white font-semibold">{course.title}</span>.
          </p>

          {authToken ? (
            <>
              <p className="text-gray-400 text-xs">You can now start watching your course.</p>
              <button
                onClick={() => navigate(`/courses/${id}/watch`)}
                className="w-full py-3 bg-[#C7E36B] text-black font-bold rounded-xl hover:bg-lime-300 transition-colors"
              >
                Watch Now!
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full py-2 text-gray-400 text-sm hover:text-white transition-colors"
              >
                Go to Dashboard
              </button>
            </>
          ) : (
            <>
              <p className="text-gray-400 text-xs">
                An account has been created for you. Set your password to access your course anytime.
              </p>
              <button
                onClick={() => navigate(`/courses/${id}/setup`, { state: { tempPw, email: form.email, courseId: id } })}
                className="w-full py-3 bg-[#C7E36B] text-black font-bold rounded-xl hover:bg-lime-300 transition-colors"
              >
                Create My AIFA Account
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  /* ── Order Summary Popup ── */
  const OrderSummary = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#181C1E] border border-white/10 rounded-2xl p-6 max-w-sm w-full space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-bold text-lg">Order Summary</h3>
          <button onClick={() => setShowSummary(false)} className="text-gray-400 hover:text-white text-xl leading-none">×</button>
        </div>
        <div className="flex gap-3 items-center">
          <img src={course.image} alt={course.title} className="w-16 h-12 object-cover rounded-lg" />
          <div>
            <p className="text-white text-sm font-semibold">{course.title}</p>
            {course.duration && <p className="text-gray-400 text-xs">{course.duration} · Lifetime access</p>}
          </div>
        </div>
        <div className="border-t border-white/10 pt-3 space-y-2">
          {discount > 0 && (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Original Price</span>
                <span className="text-gray-400 line-through">₹{course.originalPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#C7E36B]">Discount ({discount}% off)</span>
                <span className="text-[#C7E36B]">- ₹{course.originalPrice - course.price}</span>
              </div>
            </>
          )}
          <div className="flex justify-between font-bold border-t border-white/10 pt-2">
            <span className="text-white">Total</span>
            <span className="text-white text-lg">₹{course.price}</span>
          </div>
        </div>
        <button
          onClick={() => { setShowSummary(false); handlePay(); }}
          disabled={paying}
          className="w-full py-3 bg-[#C7E36B] text-black font-bold rounded-xl hover:bg-lime-300 transition-colors disabled:opacity-60"
        >
          {paying ? "Processing..." : `Pay ₹${course.price}`}
        </button>
        <p className="text-gray-500 text-xs text-center">Secure payment powered by Razorpay</p>
      </div>
    </div>
  );

  /* ── Step 1 & 2: Main payment page ── */
  return (
    <div className="min-h-screen bg-[#0F1112]">
      {showSummary && <OrderSummary />}

      {/* Back */}
      <div className="max-w-5xl mx-auto px-4 pt-8">
        <button onClick={() => navigate("/courses")} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors mb-8">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to Courses
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-16 grid md:grid-cols-[1fr_420px] gap-8">

        {/* LEFT — Course info */}
        <div className="space-y-6">
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <img src={course.image} alt={course.title} className="w-full h-56 object-cover" />
            <div className="bg-[#181C1E] p-5 space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                {course.category && <span className="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded-full">{course.category}</span>}
                {course.level && <span className="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded-full">{course.level}</span>}
              </div>
              <h1 className="text-white font-bold text-xl leading-tight">{course.title}</h1>
              {course.description && <p className="text-gray-400 text-sm leading-relaxed">{course.description}</p>}
              {course.duration && (
                <div className="flex items-center gap-4 text-gray-400 text-sm pt-1">
                  <span>⏱ {course.duration}</span>
                  <span>♾ Lifetime access</span>
                  {course.instructor && <span>👤 {course.instructor}</span>}
                </div>
              )}
            </div>
          </div>

          {/* What you get */}
          <div className="bg-[#181C1E] border border-white/10 rounded-2xl p-5 space-y-3">
            <h3 className="text-white font-semibold">What you&apos;ll get</h3>
            {[
              "Full course access — watch at your own pace",
              "Lifetime access — revisit anytime",
              course.lessons?.length > 0 ? `${course.lessons.length} video lessons` : "Video lessons",
              "Certificate of completion",
              "AIFA community access",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-[#C7E36B] font-bold mt-0.5 shrink-0">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Payment form */}
        <div className="space-y-4">
          {/* Price card */}
          <div className="bg-[#181C1E] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-white text-4xl font-bold">₹{course.price}</span>
              {discount > 0 && (
                <>
                  <span className="text-gray-400 line-through text-lg">₹{course.originalPrice}</span>
                  <span className="text-[#C7E36B] text-sm font-bold">{discount}% off</span>
                </>
              )}
            </div>
            {discount > 0 && (
              <p className="text-[#C7E36B] text-xs font-semibold">
                You save ₹{course.originalPrice - course.price}!
              </p>
            )}
          </div>

          {/* Form — only for non-logged-in users */}
          {!isLoggedIn && step === 1 && (
            <div className="bg-[#181C1E] border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-white font-semibold">Your details</h3>

              {["name", "email", "phone"].map(field => (
                <div key={field}>
                  <label className="block text-gray-400 text-xs mb-1 uppercase tracking-wide">
                    {field === "phone" ? "Mobile Number" : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                    value={form[field]}
                    onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    placeholder={field === "phone" ? "10-digit mobile" : ""}
                    className={`w-full bg-[#0F1112] border rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors ${
                      errors[field] ? "border-red-500" : "border-white/10 focus:border-[#C7E36B]"
                    }`}
                  />
                  {errors[field] && <p className="text-red-400 text-xs mt-1">{errors[field]}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Logged-in user summary */}
          {isLoggedIn && (
            <div className="bg-[#181C1E] border border-white/10 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C7E36B]/10 flex items-center justify-center text-[#C7E36B] font-bold text-sm">
                {(storedUser.name || "U")[0].toUpperCase()}
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{storedUser.name || "Student"}</p>
                <p className="text-gray-400 text-xs">Logged in · payment will be linked to your account</p>
              </div>
            </div>
          )}

          {/* CTA buttons */}
          <button
            onClick={() => setShowSummary(true)}
            className="w-full py-4 bg-[#C7E36B] text-black font-bold text-lg rounded-xl hover:bg-lime-300 transition-colors"
          >
            Buy Now — ₹{course.price}
          </button>

          <button
            onClick={handlePay}
            disabled={paying}
            className="w-full py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-colors disabled:opacity-60 text-sm"
          >
            {paying ? "Processing payment..." : "Pay directly with Razorpay"}
          </button>

          <p className="text-gray-500 text-xs text-center">
            🔒 Secure payment · UPI · Cards · Net Banking · Wallets
          </p>

          <p className="text-gray-600 text-xs text-center">
            By purchasing, you agree to AIFA&apos;s terms. Payments processed securely by Razorpay.
          </p>
        </div>
      </div>
    </div>
  );
}
