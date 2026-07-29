import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BuyModal({ item, onClose, onContinue, initialData, emailError }) {
  const navigate = useNavigate();
  const storedUser = (() => { try { return JSON.parse(localStorage.getItem("aifa_user") || "{}"); } catch { return {}; } })();
  const token = localStorage.getItem("aifa_token");

  const [form, setForm] = useState(
    initialData
      ? { name: initialData.name || "", email: initialData.email || "", phone: initialData.phone || "" }
      : { name: "", email: "", phone: "" }
  );
  const [errors, setErrors] = useState({});

  // Pre-fill from API if logged in and no initialData passed
  useEffect(() => {
    if (initialData || !token) return;
    fetch("/api/users/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d) setForm({ name: d.name || "", email: d.email || "", phone: d.phone || "" });
      })
      .catch(() => {
        setForm({ name: storedUser.name || "", email: storedUser.email || "", phone: "" });
      });
  }, [token]);

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Full name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email is required";
    if (form.phone.replace(/\D/g, "").length !== 10) e.phone = "Enter a valid 10-digit mobile number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onContinue(form);
  };

  // Price display
  const price    = item?.price ?? item?.salePrice ?? 0;
  const origPrice = item?.originalPrice ?? item?.origPrice ?? null;
  const currency  = item?.currency === "USD" ? "$" : "₹";
  const title     = item?.title || "Course";
  const benefits  = item?.benefits || [
    "Step-by-step lessons",
    "Lifetime access to this course",
    "Downloadable assets & files",
    "English captions",
    "Certificate of completion",
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
      <div className="w-full max-w-[820px] bg-[#0F1112] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl border border-white/10 relative" onClick={e => e.stopPropagation()}>

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10 text-xl leading-none"
        >✕</button>

        {/* LEFT — course info */}
        <div className="w-full md:w-[280px] shrink-0 bg-[#1A1D1E] p-6 flex flex-col gap-4">
          <p className="text-[#C7E36B] text-[10px] font-bold tracking-widest uppercase">Own this course forever.</p>

          <div>
            {item?.image && (
              <img src={item.image} alt={title} className="w-full h-[120px] object-cover rounded-lg mb-3" />
            )}
            <h3 className="text-white font-bold text-[15px] leading-snug">{title}</h3>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-white font-black text-2xl">{currency}{Number(price).toLocaleString("en-IN")}</span>
            {origPrice && origPrice > price && (
              <span className="text-gray-500 line-through text-sm">{currency}{Number(origPrice).toLocaleString("en-IN")}</span>
            )}
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

        {/* RIGHT — form */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
          <h2 className="text-white font-black text-2xl md:text-3xl mb-1">Reserve Your Seat</h2>
          <p className="text-gray-400 text-sm mb-6">Own this course forever.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Full Name */}
            <div>
              <label className="text-xs text-gray-400 font-semibold mb-1 block">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full bg-[#1A1D1E] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#C7E36B]/60 placeholder-gray-600"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-xs text-gray-400 font-semibold mb-1 block">Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className={`w-full bg-[#1A1D1E] border rounded-xl px-4 py-3 text-white text-sm outline-none placeholder-gray-600 ${emailError ? "border-red-500/70 focus:border-red-400" : "border-white/10 focus:border-[#C7E36B]/60"}`}
              />
              {(errors.email || emailError) && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-2">
                  {errors.email || emailError}
                  {emailError && (
                    <button type="button" onClick={() => { onClose(); navigate("/login"); }}
                      className="underline text-[#C7E36B] hover:opacity-80">
                      Log in →
                    </button>
                  )}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="text-xs text-gray-400 font-semibold mb-1 block">Mobile Number</label>
              <input
                type="tel"
                placeholder="Enter mobile number"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                inputMode="numeric"
                maxLength={10}
                className="w-full bg-[#1A1D1E] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#C7E36B]/60 placeholder-gray-600"
              />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#C7E36B] text-black font-black text-sm py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all mt-2 tracking-wide"
            >
              CONTINUE TO PAYMENT →
            </button>
          </form>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-5 flex-wrap">
            {[
              { icon: "🔒", label: "Secure Payment" },
              { icon: "◎", label: "Razorpay Secure" },
              { icon: "🔒", label: "SSL Protected" },
            ].map(b => (
              <span key={b.label} className="flex items-center gap-1.5 text-[11px] text-gray-400 font-semibold">
                <span>{b.icon}</span>{b.label}
              </span>
            ))}
          </div>
          <p className="text-center text-[11px] text-gray-500 mt-3">Instant Access After Enrollment</p>
        </div>
      </div>
    </div>
  );
}
