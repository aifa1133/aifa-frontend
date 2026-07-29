import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import BuyModal from "../Components/BuyModal";
import PaymentModal from "../Components/PaymentModal";
import SuccessModal from "../Components/SuccessModal";
import AddToCalendarModal from "../Components/AddToCalendarModal";
import SetPasswordModal from "../Components/SetPasswordModal";

const loadRazorpay = () =>
  new Promise(resolve => {
    if (window.Razorpay) { resolve(true); return; }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload  = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

function CountdownTimer({ scheduledAt }) {
  const [t, setT] = useState({ days:0, hours:0, minutes:0, seconds:0, started:false });
  useEffect(() => {
    const calc = () => {
      const diff = new Date(scheduledAt) - Date.now();
      if (diff <= 0) { setT({ days:0, hours:0, minutes:0, seconds:0, started:true }); return; }
      setT({ days:Math.floor(diff/86400000), hours:Math.floor((diff%86400000)/3600000), minutes:Math.floor((diff%3600000)/60000), seconds:Math.floor((diff%60000)/1000), started:false });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [scheduledAt]);
  return (
    <div className="flex gap-3 flex-wrap">
      {[["Days",t.days],["Hours",t.hours],["Minutes",t.minutes],["Seconds",t.seconds]].map(([l,v])=>(
        <div key={l} className="bg-white/10 rounded-xl p-3 text-center min-w-[64px]">
          <p className="text-2xl font-black text-white">{String(v).padStart(2,"0")}</p>
          <p className="text-[10px] text-gray-400 mt-1">{l}</p>
        </div>
      ))}
    </div>
  );
}

const FALLBACK = "/courses/v1.png";

export default function WorkshopDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling]   = useState(false);
  const [showBuyModal, setShowBuyModal]         = useState(false);
  const [showPayModal, setShowPayModal]         = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showSetPassword, setShowSetPassword]   = useState(false);
  const [buyerInfo, setBuyerInfo]               = useState(null);
  const [paidOrderId, setPaidOrderId]           = useState(null);
  const [totalPaid, setTotalPaid]               = useState(0);
  const [txId, setTxId] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [guestIsNew, setGuestIsNew]             = useState(false);
  const [buyEmailError, setBuyEmailError]       = useState("");
  const heroRef = useRef(null);
  const token = localStorage.getItem("aifa_token");
  const storedUser = JSON.parse(localStorage.getItem("aifa_user") || "{}");

  useEffect(() => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const userId = storedUser._id;
    fetch("/api/workshops", { headers })
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          const w = data.find(x => x._id === id);
          setWorkshop(w || null);
          const currentUser = JSON.parse(localStorage.getItem("aifa_user") || "{}");
          if (w && userId && !currentUser.isGuest) {
            const enrolled = w.registrations?.some(r => {
              const rid = r?.user?._id || r?._id || r?.user || r;
              return String(rid) === String(userId);
            });
            if (enrolled) {
              setIsEnrolled(true);
              const stored = JSON.parse(localStorage.getItem(`ws_purchase_${id}`) || "null");
              if (stored) { setTxId(stored.txId || ""); setPurchaseDate(stored.date || ""); }
            }
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, token]);

  const handleBookClick = () => setShowBuyModal(true);

  const handleBuyFormDone = async (buyer) => {
    setBuyerInfo(buyer);
    setBuyEmailError("");
    setShowBuyModal(false);

    // If not logged in, create/find user via guest-checkout to get a token
    if (!token) {
      try {
        const res = await fetch("/api/auth/guest-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: buyer.name, email: buyer.email, phone: buyer.phone }),
        });
        const data = await res.json();
        if (res.status === 409) {
          // Email belongs to an existing account — reopen BuyModal with error
          setBuyEmailError(data.message);
          setShowBuyModal(true);
          return;
        }
        if (res.ok && data.token) {
          localStorage.setItem("aifa_token", data.token);
          localStorage.setItem("aifa_user", JSON.stringify({
            name: data.name, _id: data._id, role: data.role,
            profilePicture: data.profilePicture || "",
            isGuest: true,
          }));
          if (data.isNewUser) setGuestIsNew(true);
        }
      } catch { /* network error — proceed; payment API will catch it */ }
    }

    setShowPayModal(true);
  };

  const handlePay = async () => {
    // Read token fresh — guest-checkout may have set it after initial render
    const activeToken = localStorage.getItem("aifa_token");
    const activeUser  = JSON.parse(localStorage.getItem("aifa_user") || "{}");

    if (!activeToken) {
      // Fallback: shouldn't happen if guest-checkout succeeded, but just in case
      setShowPayModal(false);
      setShowBuyModal(true);
      return;
    }
    setShowPayModal(false);
    setEnrolling(true);
    try {
      const loaded = await loadRazorpay();
      if (!loaded) { setEnrolling(false); setShowPayModal(true); return; }

      const h = { "Content-Type": "application/json", Authorization: `Bearer ${activeToken}` };
      const orderRes = await fetch("/api/payments/create-order", {
        method: "POST", headers: h,
        body: JSON.stringify({ itemType: "workshop", itemId: id }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        setEnrolling(false);
        setShowPayModal(true); // reopen modal with data still intact
        return;
      }

      const options = {
        key:         orderData.keyId,
        amount:      orderData.amount,
        currency:    "INR",
        name:        "AIFA Film Academy",
        description: workshop.title,
        order_id:    orderData.orderId,
        prefill:     { name: buyerInfo?.name || activeUser.name || "", email: buyerInfo?.email || activeUser.email || "", contact: buyerInfo?.phone || "" },
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
              const nowDate = new Date().toISOString();
              setTxId(orderData.txId || "");
              setPurchaseDate(nowDate);
              localStorage.setItem(`ws_purchase_${id}`, JSON.stringify({ txId: orderData.txId || "", date: nowDate }));
              setPaidOrderId(orderData.orderId || orderData.txId || "");
              setTotalPaid(orderData.amount ? Math.round(orderData.amount / 100) : workshop.price);
              setIsEnrolled(true);
              setShowSuccessModal(true);
            } else {
              alert("Payment verification failed. Contact support with payment ID: " + response.razorpay_payment_id);
            }
          } catch {
            alert("Verification error. Save your payment ID: " + response.razorpay_payment_id);
          }
          setEnrolling(false);
        },
        modal: { ondismiss: () => { setEnrolling(false); setShowPayModal(true); } },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      setEnrolling(false);
      setShowPayModal(true);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0B0F10] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#C7E36B] border-t-transparent rounded-full animate-spin"/>
    </div>
  );

  if (!workshop) return (
    <div className="min-h-screen bg-[#0B0F10] flex flex-col items-center justify-center text-white gap-3">
      <p className="text-xl font-bold">Workshop not found</p>
      <Link to="/workshops" className="text-[#C7E36B] text-sm hover:underline">← Back to Workshops</Link>
    </div>
  );

  const dt           = workshop.scheduledAt ? new Date(workshop.scheduledAt) : null;
  const sym          = workshop.currency === "USD" ? "$" : "₹";
  const regCount     = workshop.registrations?.length || 0;
  const seatsLeft    = (workshop.seats || 50) - regCount;
  const isFull       = seatsLeft <= 0;
  const hasDiscount  = workshop.originalPrice && workshop.originalPrice > workshop.price;
  const discount     = hasDiscount ? Math.round((1 - workshop.price / workshop.originalPrice) * 100) : 0;

  const fmtDate      = dt ? dt.toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long" }) : null;
  const fmtTime      = dt ? dt.toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit", hour12:true }) : null;
  const timeIST      = fmtTime ? `${fmtTime} IST` : null;
  const fmtDateLong  = dt ? dt.toLocaleDateString("en-IN", { day:"numeric", month:"long", year:"numeric" }) : null;
  const fmtTimeRange = fmtTime ? (workshop.endTime ? `${fmtTime} – ${workshop.endTime}` : fmtTime) : null;
  const orderId      = txId ? `#AIWA${txId.slice(-6).toUpperCase()}` : "#—";
  const purchasedOn  = purchaseDate ? new Date(purchaseDate).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" }) : null;

  const calLink = () => {
    if (!dt) return null;
    const durMs = (() => {
      const d = workshop.duration || "";
      const h = parseInt(d); if (!h) return 3 * 3600000;
      return (d.toLowerCase().includes("hour") || d.toLowerCase().includes("hr")) ? h * 3600000 : h * 60000;
    })();
    const end = new Date(dt.getTime() + durMs);
    const fmt = d => d.toISOString().replace(/[-:]/g,"").split(".")[0]+"Z";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(workshop.title)}&dates=${fmt(dt)}/${fmt(end)}&details=${encodeURIComponent(workshop.description||"")}&location=${encodeURIComponent(workshop.zoomLink||"Online")}`;
  };

  /* ── ENROLLED BUT NO ZOOM LINK — full-page empty state ── */
  if (isEnrolled && !workshop.zoomLink) {
    return (
      <div className="min-h-screen bg-[#0B0F10] text-white">
        {/* Post-payment modals must render in every enrolled view */}
        {showSuccessModal && (
          <SuccessModal
            item={{ ...workshop, type: "Workshop" }}
            orderId={paidOrderId}
            totalPaid={totalPaid}
            isLoggedIn={!guestIsNew}
            onCreateAccount={() => { setShowSuccessModal(false); if (workshop.scheduledAt) setShowCalendarModal(true); else setShowSetPassword(true); }}
            onNext={() => { setShowSuccessModal(false); if (workshop.scheduledAt) setShowCalendarModal(true); }}
          />
        )}
        {showCalendarModal && (
          <AddToCalendarModal
            item={{ ...workshop, type: "Workshop" }}
            onSkip={() => { setShowCalendarModal(false); if (guestIsNew) setShowSetPassword(true); }}
            onDone={() => { setShowCalendarModal(false); if (guestIsNew) setShowSetPassword(true); }}
          />
        )}
        {showSetPassword && (
          <SetPasswordModal
            email={buyerInfo?.email}
            token={localStorage.getItem("aifa_token")}
            itemType="Workshop"
            itemId={id}
          />
        )}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-2 text-xs text-gray-500 flex gap-2 flex-wrap">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <Link to="/workshops" className="hover:text-white transition-colors">Workshop</Link>
          <span>›</span>
          <span className="text-[#C7E36B]">{workshop.title}</span>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="bg-[#0F1112] border border-white/10 rounded-2xl flex flex-col items-center justify-center py-28 px-8 text-center min-h-[520px]">
            <div className="w-28 h-28 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8">
              <img src="/logoimage.png" alt="AIFA" className="w-18 h-18 w-[72px] h-[72px] object-contain opacity-70"
                onError={e => { e.target.style.display="none"; }}/>
            </div>
            <p className="text-white font-black text-2xl mb-3">Nothing to join yet</p>
            <p className="text-gray-500 text-sm max-w-[360px] leading-relaxed">Your live workshop link will appear here when the session is available.</p>
          </div>
        </div>
      </div>
    );
  }

  /* ── AFTER PURCHASE (with zoom link) ── */
  if (isEnrolled) {
    return (
      <div className="min-h-screen bg-[#0B0F10] text-white">
        {/* Post-payment modals */}
        {showSuccessModal && (
          <SuccessModal
            item={{ ...workshop, type: "Workshop" }}
            orderId={paidOrderId}
            totalPaid={totalPaid}
            isLoggedIn={!guestIsNew}
            onCreateAccount={() => { setShowSuccessModal(false); if (workshop.scheduledAt) setShowCalendarModal(true); else setShowSetPassword(true); }}
            onNext={() => { setShowSuccessModal(false); if (workshop.scheduledAt) setShowCalendarModal(true); }}
          />
        )}
        {showCalendarModal && (
          <AddToCalendarModal
            item={{ ...workshop, type: "Workshop" }}
            onSkip={() => { setShowCalendarModal(false); if (guestIsNew) setShowSetPassword(true); }}
            onDone={() => { setShowCalendarModal(false); if (guestIsNew) setShowSetPassword(true); }}
          />
        )}
        {showSetPassword && (
          <SetPasswordModal
            email={buyerInfo?.email}
            token={localStorage.getItem("aifa_token")}
            itemType="Workshop"
            itemId={id}
          />
        )}
        {/* BREADCRUMB */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-2 text-xs text-gray-500 flex gap-2 flex-wrap">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <Link to="/workshops" className="hover:text-white transition-colors">Workshop</Link>
          <span>›</span>
          <span className="text-[#C7E36B]">{workshop.title}</span>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          {/* HERO */}
          <div className="grid md:grid-cols-2 gap-8 mb-8 items-start">
            <img src={workshop.image || FALLBACK} alt={workshop.title}
              className="w-full h-[260px] md:h-[320px] object-cover rounded-2xl"
              onError={e => { e.target.src = FALLBACK; }}/>

            <div className="flex flex-col justify-center gap-4">
              <h1 className="text-2xl md:text-3xl font-black text-white">{workshop.title}</h1>
              {workshop.description && <p className="text-gray-400 text-sm leading-relaxed">{workshop.description}</p>}
              <div className="flex gap-3 text-sm text-gray-300 flex-wrap">
                {workshop.duration && <span className="flex items-center gap-1">⏱ {workshop.duration}</span>}
                <span className="flex items-center gap-1">🌐 {workshop.mode === "OFFLINE" ? "Offline" : "Online"}</span>
                {workshop.trainer && <span>👤 {workshop.trainer}</span>}
              </div>

              {/* PURCHASED BOX */}
              <div className="bg-[#0d2010] border border-green-500/40 rounded-xl px-5 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div>
                    <p className="text-green-400 font-bold text-sm">Purchased</p>
                    <p className="text-green-300/70 text-xs">Seat Confirmed</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs">Order ID: <span className="text-[#C7E36B] font-bold">{orderId}</span></p>
                  {purchasedOn && <p className="text-gray-500 text-[11px] mt-0.5">Purchased on {purchasedOn}</p>}
                </div>
              </div>

              {/* JOIN BUTTON */}
              <a href={workshop.zoomLink} target="_blank" rel="noreferrer"
                className="w-full flex justify-center items-center gap-2 bg-[#C7E36B] text-black font-black text-sm py-3 rounded-xl hover:opacity-90 transition">
                Join Online Workshop →
              </a>

              {/* ADD TO CALENDAR */}
              {calLink() && (
                <a href={calLink()} target="_blank" rel="noreferrer"
                  className="w-full flex justify-center items-center gap-2 border border-white/20 text-gray-300 text-sm font-semibold py-2.5 rounded-xl hover:bg-white/5 transition">
                  📅 Add to Calendar
                </a>
              )}
            </div>
          </div>

          {/* COUNTDOWN + BENEFITS — unified card */}
          {dt && (
            <div className="bg-white/5 border border-white/10 rounded-2xl mb-8 overflow-hidden">
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
                {/* Left: countdown */}
                <div className="p-6 flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#1a1f20] rounded-full flex items-center justify-center shrink-0">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 mb-1 font-semibold tracking-wide">Next Live Session</p>
                    <p className="text-base font-bold text-white mb-1">{fmtDateLong}, {fmtTime} (IST)</p>
                    <p className="text-xs text-gray-500 mb-4">Live session will start in</p>
                    <CountdownTimer scheduledAt={workshop.scheduledAt} />
                  </div>
                </div>
                {/* Right: benefits */}
                <div className="p-6">
                  <p className="text-sm font-bold text-white mb-4">Get ready for an interactive learning experience.</p>
                  {[
                    "Join a live hands-on session with the instructor",
                    "Ask questions and get real-time feedback",
                    "Work on practical exercises",
                  ].map((b, i) => (
                    <div key={i} className="flex items-start gap-2 mb-3">
                      <div className="w-5 h-5 rounded-full border border-green-500/50 flex items-center justify-center shrink-0 mt-0.5">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <p className="text-sm text-gray-400">{b}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VIDEO PREVIEW */}
          <div className="relative rounded-2xl overflow-hidden">
            <img src={workshop.image || FALLBACK} alt={workshop.title}
              className="w-full h-[280px] md:h-[380px] object-cover"
              onError={e => { e.target.src = FALLBACK; }}/>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-16 h-16 bg-[#C7E36B]/90 rounded-xl flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#0B0F10"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── BEFORE PURCHASE ── */
  return (
    <div className="min-h-screen bg-[#0B0F10] text-white pb-24">
      {showBuyModal && (
        <BuyModal
          item={{ ...workshop, benefits: ["Live interactive session", "Session recording access", "Downloadable resources", "Certificate of completion", "Direct trainer Q&A"] }}
          initialData={buyerInfo}
          emailError={buyEmailError}
          onClose={() => { setShowBuyModal(false); setBuyEmailError(""); }}
          onContinue={handleBuyFormDone}
        />
      )}
      {showPayModal && (
        <PaymentModal
          item={{ ...workshop, type: "Workshop", benefits: ["Live interactive session", "Session recording access", "Downloadable resources", "Certificate of completion", "Direct trainer Q&A"] }}
          orderId={paidOrderId}
          onClose={() => setShowPayModal(false)}
          onBack={() => { setShowPayModal(false); setShowBuyModal(true); }}
          onPay={handlePay}
          paying={enrolling}
        />
      )}
      {showSuccessModal && (
        <SuccessModal
          item={{ ...workshop, type: "Workshop" }}
          orderId={paidOrderId}
          totalPaid={totalPaid}
          isLoggedIn={!guestIsNew}
          onCreateAccount={() => { setShowSuccessModal(false); if (workshop.scheduledAt) setShowCalendarModal(true); else setShowSetPassword(true); }}
          onNext={() => { setShowSuccessModal(false); if (workshop.scheduledAt) setShowCalendarModal(true); }}
        />
      )}
      {showCalendarModal && (
        <AddToCalendarModal
          item={{ ...workshop, type: "Workshop" }}
          onSkip={() => { setShowCalendarModal(false); if (guestIsNew) setShowSetPassword(true); }}
          onDone={() => { setShowCalendarModal(false); if (guestIsNew) setShowSetPassword(true); }}
        />
      )}
      {showSetPassword && (
        <SetPasswordModal
          email={buyerInfo?.email}
          token={localStorage.getItem("aifa_token")}
          itemType="Workshop"
          itemId={id}
        />
      )}
      {/* BREADCRUMB */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-4 text-xs text-gray-500 flex gap-2 flex-wrap">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <span>›</span>
        <Link to="/workshops" className="hover:text-white transition-colors">Workshop</Link>
        <span>›</span>
        <span className="text-[#C7E36B]">{workshop.title}</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6" ref={heroRef}>
        {/* LIMITED SEATS BADGE */}
        {!isFull && (
          <span className="inline-block text-xs font-bold bg-white/10 text-white border border-white/20 px-3 py-1 rounded-full mb-5 tracking-wide">
            LIMITED SEATS
          </span>
        )}

        {/* HERO GRID */}
        <div className="grid md:grid-cols-[1fr_300px] gap-8 mb-10 items-start">
          {/* LEFT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-[1.1]">{workshop.title}</h1>
            {workshop.description && (
              <p className="text-gray-400 text-base mb-6 leading-relaxed">{workshop.description}</p>
            )}
            <div className="flex flex-wrap gap-3">
              {fmtDate && (
                <span className="bg-white/10 border border-white/20 text-white text-sm px-4 py-1.5 rounded-full font-semibold">{fmtDate}</span>
              )}
              {timeIST && (
                <span className="bg-white/10 border border-white/20 text-white text-sm px-4 py-1.5 rounded-full font-semibold">{timeIST}</span>
              )}
              <span className="bg-white/10 border border-white/20 text-white text-sm px-4 py-1.5 rounded-full font-semibold">
                {workshop.mode === "OFFLINE" ? "Offline" : "Live Online"}
              </span>
            </div>
          </div>

          {/* RIGHT — PRICE CARD */}
          <div className="flex flex-col gap-4 sticky top-24 py-2">
            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-white">{sym}{workshop.price}</span>
              {hasDiscount && (
                <>
                  <span className="text-gray-400 line-through text-lg">{sym}{workshop.originalPrice}</span>
                  <span className="text-[#C7E36B] text-sm font-bold">{discount}% off</span>
                </>
              )}
            </div>

            <button onClick={handleBookClick} disabled={enrolling || isFull}
              className="w-full bg-[#C7E36B] text-black font-black text-sm uppercase py-3 rounded-xl hover:opacity-90 transition disabled:opacity-60">
              {enrolling ? "Processing..." : isFull ? "SOLD OUT" : "RESERVE MY SEAT"}
            </button>
            <p className="text-[10px] text-gray-500 text-center font-semibold tracking-wide">SECURE PAYMENT & INSTANT ACCESS</p>

            <div className="border-t border-white/10 pt-3 space-y-2 text-xs text-gray-400 bg-white/5 rounded-xl px-4 pb-3 mt-1">
              {workshop.trainer    && <p>👤 Trainer: <span className="text-white font-semibold">{workshop.trainer}</span></p>}
              {workshop.sessionCode && <p>🔖 Session: <span className="text-white font-semibold">{workshop.sessionCode}</span></p>}
              {workshop.duration   && <p>⏱ Duration: <span className="text-white font-semibold">{workshop.duration}</span></p>}
              <p>🌐 Mode: <span className="text-white font-semibold">{workshop.mode === "OFFLINE" ? "Offline" : "Online"}</span></p>
              {!isFull && seatsLeft > 0 && (
                <p>🪑 <span className="text-[#C7E36B] font-semibold">{seatsLeft} seats remaining</span></p>
              )}
            </div>
          </div>
        </div>

        {/* VIDEO PREVIEW */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <img src={workshop.image || FALLBACK} alt={workshop.title}
            className="w-full h-[280px] md:h-[400px] object-cover"
            onError={e => { e.target.src = FALLBACK; }}/>
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="w-16 h-16 bg-[#C7E36B]/90 rounded-xl flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#0B0F10"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* STICKY BAR — hidden when any modal is open */}
      {!showBuyModal && !showPayModal && !showSuccessModal && !showCalendarModal && !showSetPassword && (
        buyerInfo && !isEnrolled ? (
          /* CONTINUE BOOKING WIDGET — appears when user has started but paused the flow */
          <div className="fixed bottom-0 left-0 right-0 z-40 px-4 py-3">
            <div className="max-w-2xl mx-auto bg-[#1A1D1E] border border-[#C7E36B]/30 rounded-2xl px-5 py-4 flex items-center justify-between gap-4 shadow-2xl shadow-black/60">
              <div className="flex items-center gap-3 min-w-0">
                {/* Progress dots */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#C7E36B]" title="Details filled" />
                  <div className="w-6 h-px bg-[#C7E36B]/40" />
                  <div className="w-2 h-2 rounded-full bg-[#C7E36B]/30 border border-[#C7E36B]/60" title="Payment pending" />
                  <div className="w-6 h-px bg-white/10" />
                  <div className="w-2 h-2 rounded-full bg-white/10" title="Done" />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-bold text-sm truncate">{workshop.title}</p>
                  <p className="text-[#C7E36B] text-xs font-semibold">Your seat is being held — complete payment</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => { setBuyerInfo(null); }}
                  className="text-gray-500 hover:text-gray-300 text-xs px-2 py-1 rounded-lg hover:bg-white/5 transition-all"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowPayModal(true)}
                  disabled={enrolling}
                  className="bg-[#C7E36B] text-black font-black text-sm px-5 py-2.5 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center gap-1.5"
                >
                  {enrolling ? "Processing..." : "Continue Booking →"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* NORMAL STICKY BAR */
          <div className="fixed bottom-0 left-0 right-0 bg-[#0F1112] border-t border-white/10 px-6 py-4 flex items-center justify-between z-40 gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <p className="text-white font-bold text-sm truncate">{workshop.title}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-[#C7E36B] font-black text-sm whitespace-nowrap">{sym}{workshop.price}</span>
                  {hasDiscount && <span className="text-gray-500 line-through text-xs">{sym}{workshop.originalPrice}</span>}
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-0.5">{isFull ? "SOLD OUT" : "LIMITED SEATS AVAILABLE"}</p>
            </div>
            <button onClick={handleBookClick} disabled={enrolling || isFull}
              className="bg-[#C7E36B] text-black font-black text-sm px-6 py-2.5 rounded-xl hover:opacity-90 transition disabled:opacity-60 whitespace-nowrap flex items-center gap-1 shrink-0">
              {enrolling ? "Processing..." : "Book your seat →"}
            </button>
          </div>
        )
      )}
    </div>
  );
}
