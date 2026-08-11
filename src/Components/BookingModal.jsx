import { useState, useEffect, useCallback } from "react";

/* ── helpers ── */
const MONTHS    = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const SHORT_MON = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS      = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
const TIME_SLOTS = ["09:00am","10:00am","11:00am","12:00pm","01:00pm","02:00pm","03:00pm","04:00pm","05:00pm","06:00pm"];

function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y, m)    { return new Date(y, m, 1).getDay(); }
function isPast(y, m, d) {
  const t = new Date(); t.setHours(0,0,0,0);
  return new Date(y, m, d) < t;
}

/* ── Confetti ── */
const COLORS = ["#C7E36B","#FBBF24","#60a5fa","#f472b6","#a78bfa","#34d399","#fb923c","#fff"];
function Confetti() {
  const items = Array.from({ length: 90 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 1.4,
    dur: 2 + Math.random() * 1.5,
    color: COLORS[i % COLORS.length],
    size: 7 + Math.random() * 8,
    isCircle: Math.random() > 0.5,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {items.map(p => (
        <div key={p.id} style={{
          position:"absolute", left:`${p.x}%`, top:"-24px",
          width:p.size, height:p.size,
          background:p.color,
          borderRadius: p.isCircle ? "50%" : "2px",
          animation:`cfFall ${p.dur}s ease-in ${p.delay}s both`,
        }}/>
      ))}
      <style>{`@keyframes cfFall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(105vh) rotate(720deg);opacity:0}}`}</style>
    </div>
  );
}

/* ── Main Modal ── */
export default function BookingModal({ onClose }) {
  const today = new Date();
  const [step, setStep]     = useState(1);   // 1=pick, 2=form, 3=success
  const [year, setYear]     = useState(today.getFullYear());
  const [month, setMonth]   = useState(today.getMonth());
  const [selDate, setDate]  = useState(null);
  const [selTime, setTime]  = useState(null);
  const [confirming, setConfirming] = useState(false); // show Confirm btn next to slot
  const [form, setForm]     = useState({ name:"", email:"", phone:"", topic:"" });
  const [err, setErr]       = useState("");
  const [loading, setLoading] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const onBd = useCallback(e => { if (e.target===e.currentTarget) onClose(); }, [onClose]);
  useEffect(() => {
    const h = e => { if(e.key==="Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const daysCount = getDaysInMonth(year, month);
  const firstDay  = getFirstDay(year, month);

  const prevMonth = () => {
    if (month===0) { setMonth(11); setYear(y=>y-1); } else setMonth(m=>m-1);
    setDate(null); setTime(null); setConfirming(false);
  };
  const nextMonth = () => {
    if (month===11) { setMonth(0); setYear(y=>y+1); } else setMonth(m=>m+1);
    setDate(null); setTime(null); setConfirming(false);
  };

  const pickDay = d => {
    if (isPast(year, month, d)) return;
    setDate(d); setTime(null); setConfirming(false);
  };

  const pickTime = t => {
    setTime(t); setConfirming(true);
  };

  const fmtFull = () => selDate ? `${DAYS[(new Date(year,month,selDate)).getDay()]}, ${SHORT_MON[month]} ${selDate}` : "";

  const handleConfirm = () => {
    if (!selDate || !selTime) return;
    setErr(""); setStep(2);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name.trim())  { setErr("Name is required."); return; }
    if (!/\S+@\S+\.\S+/.test(form.email)) { setErr("Valid email is required."); return; }
    if (!form.phone.trim()) { setErr("Phone is required."); return; }
    setErr(""); setLoading(true);
    try {
      const res = await fetch("/api/consultations", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          name:form.name.trim(), email:form.email.trim(), phone:form.phone.trim(),
          preferredDate:`${selDate} ${MONTHS[month]} ${year}`,
          preferredTime:selTime,
          topic:form.topic.trim(),
        }),
      });
      const data = await res.json().catch(()=>({}));
      if (!res.ok) throw new Error(data.message||"Submission failed");
      setStep(3); setConfetti(true); setTimeout(()=>setConfetti(false), 4500);
    } catch(ex) {
      setErr(ex.message||"Something went wrong. Please try again.");
    } finally { setLoading(false); }
  };

  /* wide = show time panel alongside calendar */
  const showTimeSide = !!selDate && step===1;

  return (
    <>
      {confetti && <Confetti />}

      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onBd}>
        <div
          className="relative bg-white rounded-2xl shadow-2xl overflow-hidden flex"
          style={{ width: showTimeSide ? "min(900px,96vw)" : "min(760px,96vw)", maxHeight:"90vh", transition:"width 0.3s ease" }}
        >
          {/* ── LEFT INFO PANEL ── */}
          <div className="w-[220px] shrink-0 border-r border-gray-200 flex flex-col p-6 gap-3" style={{overflowY:"auto"}}>
            <div className="w-12 h-12 rounded-xl bg-[#4f7df3]/10 flex items-center justify-center mb-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f7df3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <p className="text-xs text-gray-500 font-semibold">AIFA Academy</p>
            <h2 className="text-[17px] font-black text-gray-900 leading-snug">Free Counselling<br/>Call</h2>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              30 min
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Phone / Video
            </div>

            {selDate && step===1 && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide mb-1">Selected</p>
                <p className="text-sm font-bold text-gray-800">{fmtFull()}</p>
                {selTime && <p className="text-sm text-[#4f7df3] font-semibold mt-0.5">{selTime}</p>}
              </div>
            )}

            <p className="text-[11px] text-gray-400 mt-auto leading-relaxed">Book a free 30-minute session with our expert counsellor to discuss your learning goals.</p>
          </div>

          {/* ── CENTER: CALENDAR ── */}
          {step === 1 && (
            <div className="flex-1 p-6 overflow-y-auto border-r border-gray-200">
              <h3 className="text-[15px] font-bold text-gray-900 mb-5">Select a Date &amp; Time</h3>

              {/* Month nav */}
              <div className="flex items-center justify-between mb-4">
                <button onClick={prevMonth} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <span className="text-sm font-bold text-gray-900">{MONTHS[month]} {year}</span>
                <button onClick={nextMonth} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 mb-2">
                {DAYS.map(d => (
                  <div key={d} className="text-center text-[10px] font-bold text-gray-400 py-1 tracking-wide">{d}</div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-y-1">
                {Array.from({length:firstDay}).map((_,i)=><div key={`ep${i}`}/>)}
                {Array.from({length:daysCount},(_,i)=>i+1).map(d => {
                  const past    = isPast(year, month, d);
                  const isSel   = selDate===d;
                  const isToday = d===today.getDate() && month===today.getMonth() && year===today.getFullYear();
                  return (
                    <button
                      key={d}
                      onClick={() => pickDay(d)}
                      disabled={past}
                      className={`mx-auto flex items-center justify-center rounded-full text-sm font-semibold transition-all
                        ${past ? "text-gray-300 cursor-not-allowed w-9 h-9" : "w-9 h-9 cursor-pointer hover:bg-[#4f7df3]/10"}
                        ${isSel ? "bg-[#4f7df3] text-white hover:bg-[#4f7df3]" : ""}
                        ${!past && !isSel ? "text-[#4f7df3] font-bold" : ""}
                        ${past ? "text-gray-300" : ""}
                        ${isToday && !isSel ? "ring-2 ring-[#4f7df3]/40" : ""}
                      `}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── RIGHT: TIME SLOTS ── */}
          {step === 1 && showTimeSide && (
            <div className="w-[200px] shrink-0 p-6 overflow-y-auto">
              <p className="text-sm font-bold text-gray-900 mb-4">{fmtFull()}</p>
              <div className="flex flex-col gap-2">
                {TIME_SLOTS.map(t => {
                  const isSel = selTime===t;
                  return (
                    <div key={t} className="flex gap-2 items-center">
                      <button
                        onClick={() => pickTime(t)}
                        className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-bold border-2 transition-all text-center
                          ${isSel
                            ? "border-[#4f7df3] bg-[#4f7df3]/10 text-[#4f7df3]"
                            : "border-[#4f7df3] text-[#4f7df3] hover:bg-[#4f7df3]/5 bg-white"}
                        `}
                      >
                        {t}
                      </button>
                      {isSel && (
                        <button
                          onClick={handleConfirm}
                          className="py-2.5 px-3 bg-[#4f7df3] text-white text-sm font-bold rounded-lg hover:bg-[#3d6ee0] transition-colors whitespace-nowrap"
                        >
                          Confirm
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── STEP 2: FORM ── */}
          {step === 2 && (
            <div className="flex-1 p-8 overflow-y-auto">
              <button onClick={()=>{setStep(1);setErr("");}} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 mb-5 transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                Back to calendar
              </button>
              <div className="mb-5 p-3 bg-blue-50 rounded-xl flex items-center gap-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f7df3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <div>
                  <p className="text-xs font-bold text-blue-700">{fmtFull()}</p>
                  <p className="text-xs text-blue-500">{selTime} · 30 min</p>
                </div>
              </div>

              <h3 className="text-[16px] font-black text-gray-900 mb-4">Enter Your Details</h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="text-[11px] text-gray-500 font-bold uppercase tracking-wide mb-1 block">Full Name *</label>
                  <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}
                    placeholder="John Doe"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#4f7df3] transition-colors placeholder-gray-400"/>
                </div>
                <div>
                  <label className="text-[11px] text-gray-500 font-bold uppercase tracking-wide mb-1 block">Email *</label>
                  <input type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}
                    placeholder="john@example.com"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#4f7df3] transition-colors placeholder-gray-400"/>
                </div>
                <div>
                  <label className="text-[11px] text-gray-500 font-bold uppercase tracking-wide mb-1 block">Phone *</label>
                  <input value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value.replace(/[^\d\s\-\+]/g,"")}))}
                    placeholder="+91 98765 43210"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#4f7df3] transition-colors placeholder-gray-400"/>
                </div>
                <div>
                  <label className="text-[11px] text-gray-500 font-bold uppercase tracking-wide mb-1 block">
                    What would you like to discuss? <span className="normal-case font-normal text-gray-400">(optional)</span>
                  </label>
                  <textarea value={form.topic} onChange={e=>setForm(f=>({...f,topic:e.target.value}))}
                    rows={3} placeholder="e.g. I'd like to learn about the AI/ML bootcamp..."
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#4f7df3] transition-colors placeholder-gray-400 resize-none"/>
                </div>
                {err && <p className="text-red-500 text-xs">{err}</p>}
                <button type="submit" disabled={loading}
                  className="w-full h-11 bg-[#4f7df3] hover:bg-[#3d6ee0] text-white font-bold text-sm rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {loading ? <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" strokeOpacity=".25"/><path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/></svg> : "Schedule Event"}
                </button>
              </form>
            </div>
          )}

          {/* ── STEP 3: SUCCESS ── */}
          {step === 3 && (
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5"
                style={{animation:"sPop 0.5s ease-out"}}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">You are scheduled!</h3>
              <p className="text-gray-500 text-sm mb-2">A calendar invitation has been sent to your email.</p>
              <div className="bg-blue-50 rounded-xl px-6 py-4 mt-2 mb-6">
                <p className="text-[#4f7df3] font-bold text-base">{fmtFull()}</p>
                <p className="text-[#4f7df3] text-sm">{selTime} · 30 min · Free Counselling Call</p>
              </div>
              <button onClick={onClose}
                className="px-8 h-11 bg-[#4f7df3] hover:bg-[#3d6ee0] text-white font-bold text-sm rounded-xl transition-colors">
                Done
              </button>
            </div>
          )}

          {/* Close btn (only step 1) */}
          {step === 1 && (
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      <style>{`@keyframes sPop{0%{transform:scale(0.4);opacity:0}70%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}`}</style>
    </>
  );
}
