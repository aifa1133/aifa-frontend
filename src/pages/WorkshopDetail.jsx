import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

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
  const token = localStorage.getItem("aifa_token");

  useEffect(() => {
    fetch("/api/workshops")
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          const w = data.find(x => x._id === id);
          setWorkshop(w || null);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));

    if (token) {
      fetch("/api/users/me", { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.ok ? r.json() : null)
        .then(u => {
          if (u?.enrolledWorkshops?.some(wid => String(wid) === id)) setIsEnrolled(true);
        })
        .catch(() => {});
    }
  }, [id, token]);

  const handleReserve = async () => {
    if (!token) { navigate("/login"); return; }
    setEnrolling(true);
    try {
      const res  = await fetch(`/api/workshops/${id}/register`, { method:"POST", headers:{ Authorization:`Bearer ${token}` } });
      const data = await res.json();
      if (res.ok || data.message === "Already registered") setIsEnrolled(true);
      else alert(data.message || "Could not reserve. Try again.");
    } catch { alert("Network error."); }
    setEnrolling(false);
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

  const dt      = workshop.scheduledAt ? new Date(workshop.scheduledAt) : null;
  const sym     = workshop.currency === "USD" ? "$" : "₹";
  const regCount = workshop.registrations?.length || 0;
  const seatsLeft = (workshop.seats || 50) - regCount;
  const isFull   = seatsLeft <= 0;

  const fmtDate  = dt ? dt.toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long" }) : null;
  const fmtTime  = dt ? dt.toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit", hour12:true }) : null;
  const timeIST  = fmtTime ? (workshop.endTime ? `${fmtTime} – ${workshop.endTime} IST` : `${fmtTime} IST`) : null;
  const fmtDateLong = dt ? dt.toLocaleDateString("en-IN", { day:"numeric", month:"long", year:"numeric" }) : null;
  const fmtTimeRange = fmtTime ? (workshop.endTime ? `${fmtTime} - ${workshop.endTime}` : fmtTime) : null;

  const calLink = () => {
    if (!dt) return null;
    const end = new Date(dt.getTime() + 3 * 3600000);
    const fmt = d => d.toISOString().replace(/[-:]/g,"").split(".")[0]+"Z";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(workshop.title)}&dates=${fmt(dt)}/${fmt(end)}&details=${encodeURIComponent(workshop.description||"")}&location=${encodeURIComponent(workshop.zoomLink||"Online")}`;
  };

  /* ── AFTER PURCHASE ── */
  if (isEnrolled) {
    const hasZoom = !!workshop.zoomLink;
    return (
      <div className="min-h-screen bg-[#0B0F10] text-white">
        {/* BREADCRUMB */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-2 text-xs text-gray-500 flex gap-2 flex-wrap">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/workshops" className="hover:text-white transition-colors">Workshop</Link>
          <span>/</span>
          <span className="text-[#C7E36B]">{workshop.title}</span>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          {/* HERO */}
          <div className="grid md:grid-cols-2 gap-8 mb-8 items-start">
            <img src={workshop.image || FALLBACK} alt={workshop.title}
              className="w-full h-[260px] md:h-[300px] object-cover rounded-2xl"
              onError={e => { e.target.src = FALLBACK; }}/>
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl md:text-3xl font-black text-white mb-2">{workshop.title}</h1>
              {workshop.description && <p className="text-gray-400 text-sm mb-4 leading-relaxed">{workshop.description}</p>}
              <div className="flex gap-3 mb-5 text-sm text-gray-300 flex-wrap">
                <span>⏱ {workshop.duration || "3 Hours"}</span>
                <span>🌐 {workshop.mode === "OFFLINE" ? "Offline" : "Online"}</span>
                {workshop.trainer && <span>👤 {workshop.trainer}</span>}
              </div>
              {/* PURCHASED BOX */}
              <div className="flex items-center gap-4 bg-[#0d2010] border border-green-500/40 rounded-xl px-5 py-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div className="flex-1">
                  <p className="text-green-400 font-bold text-sm">Purchased</p>
                  <p className="text-green-300/80 text-xs">Seat Confirmed</p>
                </div>
              </div>
              {hasZoom ? (
                <a href={workshop.zoomLink} target="_blank" rel="noreferrer"
                  className="w-full flex justify-center items-center gap-2 bg-[#C7E36B] text-black font-black text-sm uppercase py-3 rounded-xl hover:opacity-90 transition">
                  Join Online Workshop →
                </a>
              ) : (
                <div className="w-full bg-white/5 border border-white/10 rounded-xl py-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600"><path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/></svg>
                  </div>
                  <p className="text-white font-bold text-sm mb-1">Nothing to join yet</p>
                  <p className="text-gray-500 text-xs">Your live workshop link will appear here when the session is available.</p>
                </div>
              )}
            </div>
          </div>

          {/* COUNTDOWN + BENEFITS */}
          {dt && (
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0 text-lg">📅</div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 mb-0.5 font-semibold uppercase tracking-wide">Next Live Session</p>
                    <p className="text-base font-bold text-white mb-0.5">{fmtDateLong}, {fmtTime} (IST)</p>
                    <p className="text-xs text-gray-500 mb-4">Live session will start in</p>
                    <CountdownTimer scheduledAt={workshop.scheduledAt} />
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-sm font-bold text-white mb-4">Get ready for an interactive learning experience.</p>
                {["Join a live hands-on session with the instructor","Ask questions and get real-time feedback","Work on practical exercises"].map((b,i)=>(
                  <div key={i} className="flex items-start gap-2 mb-3">
                    <div className="w-5 h-5 rounded-full border border-green-500/50 flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <p className="text-sm text-gray-400">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIDEO */}
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
      {/* BREADCRUMB */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-2 text-xs text-gray-500 flex gap-2 flex-wrap">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link to="/workshops" className="hover:text-white transition-colors">Workshop</Link>
        <span>/</span>
        <span className="text-[#C7E36B]">{workshop.title}</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* LIMITED SEATS */}
        {!isFull && seatsLeft <= 20 && (
          <span className="inline-block text-xs font-bold bg-[#C7E36B]/20 text-[#C7E36B] border border-[#C7E36B]/40 px-3 py-1 rounded-full mb-5">
            LIMITED SEATS
          </span>
        )}

        {/* HERO GRID */}
        <div className="grid md:grid-cols-[1fr_300px] gap-8 mb-10 items-start">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-[1.1]">{workshop.title}</h1>
            {workshop.description && (
              <p className="text-gray-400 text-base mb-6 leading-relaxed">{workshop.description}</p>
            )}
            <div className="flex flex-wrap gap-3">
              {fmtDate && (
                <span className="bg-white/10 text-gray-200 text-sm px-4 py-1.5 rounded-full font-semibold">{fmtDate}</span>
              )}
              {timeIST && (
                <span className="bg-white/10 text-gray-200 text-sm px-4 py-1.5 rounded-full font-semibold">{timeIST}</span>
              )}
              <span className="bg-white/10 text-gray-200 text-sm px-4 py-1.5 rounded-full font-semibold">
                {workshop.mode === "OFFLINE" ? "Offline" : "Live Online"}
              </span>
            </div>
          </div>

          {/* PRICE CARD */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4 sticky top-24">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">{sym}{workshop.price}</span>
            </div>
            <button onClick={handleReserve} disabled={enrolling || isFull}
              className="w-full bg-[#C7E36B] text-black font-black text-sm uppercase py-3 rounded-xl hover:opacity-90 transition disabled:opacity-60">
              {enrolling ? "Reserving..." : isFull ? "SOLD OUT" : "RESERVE MY SEAT"}
            </button>
            <p className="text-[10px] text-gray-500 text-center font-semibold">SECURE PAYMENT & INSTANT ACCESS</p>
            <div className="border-t border-white/10 pt-3 space-y-2 text-xs text-gray-400">
              {workshop.trainer && <p>👤 Trainer: <span className="text-white font-semibold">{workshop.trainer}</span></p>}
              {workshop.sessionCode && <p>🔖 Session: <span className="text-white font-semibold">{workshop.sessionCode}</span></p>}
              <p>⏱ Duration: <span className="text-white font-semibold">{workshop.duration}</span></p>
              <p>🌐 Mode: <span className="text-white font-semibold">{workshop.mode === "OFFLINE" ? "Offline" : "Online"}</span></p>
              {!isFull && seatsLeft > 0 && (
                <p>🪑 <span className="text-[#C7E36B] font-semibold">{seatsLeft} seats remaining</span></p>
              )}
            </div>
          </div>
        </div>

        {/* VIDEO */}
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

      {/* STICKY BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0F1112] border-t border-white/10 px-6 py-4 flex items-center justify-between z-50 gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-white font-bold text-sm truncate">{workshop.title}</p>
            <span className="text-[#C7E36B] font-black text-sm whitespace-nowrap">{sym}{workshop.price}</span>
          </div>
          <p className="text-gray-500 text-xs">{isFull ? "SOLD OUT" : "LIMITED SEATS AVAILABLE"}</p>
        </div>
        <button onClick={handleReserve} disabled={enrolling || isFull}
          className="bg-[#C7E36B] text-black font-black text-sm uppercase px-6 py-2.5 rounded-xl hover:opacity-90 transition disabled:opacity-60 whitespace-nowrap flex items-center gap-1 shrink-0">
          {enrolling ? "Reserving..." : "Book your seat →"}
        </button>
      </div>
    </div>
  );
}
