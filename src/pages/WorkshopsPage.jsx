"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const fmtDateBox = (scheduledAt) => {
  if (!scheduledAt) return "—";
  const dt = new Date(scheduledAt);
  const mon = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"][dt.getMonth()];
  const h = dt.getHours(); const ampm = h >= 12 ? "PM" : "AM"; const h12 = h % 12 || 12;
  const mins = dt.getMinutes();
  return `${String(dt.getDate()).padStart(2,"0")}-${mon}-${dt.getFullYear()} | ${h12}${mins ? ":"+String(mins).padStart(2,"0") : ""} ${ampm}`;
};

const googleCalLink = (w) => {
  if (!w.scheduledAt) return null;
  const start = new Date(w.scheduledAt);
  const end = new Date(start.getTime() + 3 * 3600000);
  const fmt = d => d.toISOString().replace(/[-:]/g,"").split(".")[0]+"Z";
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(w.title)}&dates=${fmt(start)}/${fmt(end)}`;
};

const MOCK_WORKSHOPS = [
  { _id: "mw1", title: "AI Lego Animation Workshop", image: "/courses/v1.png", duration: "3 Hours", price: 199, mode: "ONLINE" },
  { _id: "mw2", title: "AI Cinematic Workshop", image: "/courses/v2.png", duration: "3 Hours", price: 199, mode: "ONLINE" },
  { _id: "mw3", title: "AI Sci-Fi Movie Creator", image: "/courses/v3.png", duration: "3 Hours", price: 199, mode: "ONLINE" },
  { _id: "mw4", title: "AI Fantasy World Builder", image: "/courses/v4.png", duration: "3 Hours", price: 199, mode: "ONLINE" },
  { _id: "mw5", title: "AI Product Ad Filmmaking", image: "/courses/v4.png", duration: "3 Hours", price: 199, mode: "ONLINE" },
];

const FALLBACK_IMAGES = ["/courses/v1.png","/courses/v2.png","/courses/v3.png","/courses/v4.png"];

const getStatus = (w) => {
  if (w.isCancelled) return "Cancelled";
  if (!w.isPublished) return "Draft";
  if (!w.scheduledAt) return "Upcoming";
  const now = Date.now();
  const start = new Date(w.scheduledAt).getTime();
  const durMins = (() => { const d = w.duration || ""; const n = parseInt(d); if (!n) return 120; if (d.toLowerCase().includes("hour") || d.toLowerCase().includes("hr")) return n * 60; return n; })();
  const end = start + durMins * 60000;
  if (now < start) return "Upcoming";
  if (now >= start && now <= end) return "Live";
  return "Completed";
};
const STATUS_STYLE = {
  Live:      "bg-green-500 text-white",
  Upcoming:  "bg-blue-500/80 text-white",
  Completed: "bg-gray-500 text-white",
  Cancelled: "bg-red-500 text-white",
};

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reserved, setReserved] = useState(new Set());
  const [highlighted, setHighlighted] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("aifa_token");
  const isLoggedIn = !!token;

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("aifa_user") || "{}")._id;

    const loadWorkshops = (attempt = 1) => {
      fetch("/api/workshops")
        .then(async (r) => {
          const ct = r.headers.get("content-type") || "";
          if (!ct.includes("application/json")) {
            // Render cold-start returns HTML "Redirecting..." — retry once after 3s
            if (attempt < 3) {
              setTimeout(() => loadWorkshops(attempt + 1), 3000);
            } else {
              setWorkshops(MOCK_WORKSHOPS);
              setLoading(false);
            }
            return null;
          }
          return r.json();
        })
        .then((data) => {
          if (!data) return;
          if (Array.isArray(data) && data.length > 0) {
            setWorkshops(data);
            const storedUser = JSON.parse(localStorage.getItem("aifa_user") || "{}");
            if (userId && storedUser.emailVerified !== false) {
              const myIds = new Set(
                data.filter(w =>
                  w.registrations?.some(r => {
                    const rid = r?.user?._id || r?.user || r;
                    return String(rid) === String(userId);
                  })
                ).map(w => String(w._id))
              );
              setReserved(myIds);
            }
          } else {
            setWorkshops(MOCK_WORKSHOPS);
          }
        })
        .catch(() => {
          if (attempt < 3) {
            setTimeout(() => loadWorkshops(attempt + 1), 3000);
          } else {
            setWorkshops(MOCK_WORKSHOPS);
          }
        })
        .finally(() => {
          setLoading(false);
          const hash = window.location.hash.slice(1);
          if (hash) {
            setHighlighted(hash);
            setTimeout(() => {
              const el = document.getElementById(hash);
              if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 300);
          }
        });
    };

    loadWorkshops();
  }, []);

  const handleReserve = (workshop) => {
    if (!workshop._id || workshop._id.startsWith("mw")) {
      alert("Booking coming soon!");
      return;
    }
    navigate(`/workshops/${workshop._id}`);
  };

  return (
    <>
      {/* WORKSHOP SECTION */}
      <section className="bg-[#0B0F10] text-white py-16">
        <div className="max-w-[1180px] mx-auto px-4">
          <h2 className="w-full text-[#E5E7EB] font-[Montserrat] text-[32px] leading-[40px] sm:text-[40px] sm:leading-[48px] md:text-[48px] md:leading-[56px] font-black mb-12">
            AI Filmmaking Workshop
          </h2>

          <div className="flex flex-col gap-[20px]">
            {loading && [1,2,3].map(n => (
              <div key={n} className="w-full rounded-[24px] overflow-hidden bg-[#0F1112] border-[6px] border-[#0F1112] animate-pulse">
                <div className="flex flex-col md:flex-row gap-[6px] w-full">
                  <div className="w-full md:w-[266px] h-[200px] bg-white/10 rounded-tl-[20px] shrink-0"/>
                  <div className="flex-1 flex flex-col gap-[6px]">
                    <div className="h-[105px] bg-white/10 rounded-tr-[20px]"/>
                    <div className="grid grid-cols-4 gap-[8px]">
                      {[1,2,3,4].map(k=><div key={k} className="h-[80px] bg-white/10 rounded-[8px]"/>)}
                    </div>
                  </div>
                </div>
                <div className="h-[52px] bg-white/10"/>
              </div>
            ))}
            {!loading && workshops.map((item, i) => {
              const registered = item.registrations?.length || 0;
              const seats = item.seats || 50;
              const isFull = (seats - registered) <= 0;
              const isMock = item._id?.startsWith("mw");
              const isReserved = reserved.has(item._id);
              const cur = item.currency === "USD" ? "USD" : "INR";
              const priceStr = `${cur} ${parseFloat(item.price || 0).toFixed(2)}`;
              const status = isMock ? null : getStatus(item);
              const dt = item.scheduledAt ? new Date(item.scheduledAt) : null;
              const fmtDate = dt ? dt.toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}) : null;
              const fmtTime = dt ? dt.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit",hour12:true}) : null;
              const fmtDateLong = dt ? dt.toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"}) : null;
              const fmtTimeRange = fmtTime ? (item.endTime ? `${fmtTime} - ${item.endTime}` : fmtTime) : null;
              const dateBoxStr = fmtDateBox(item.scheduledAt);
              const calLink = googleCalLink(item);

              return (
                <div key={item._id || i} id={item._id}
                  className={`w-full rounded-[20px] overflow-hidden bg-[#0F1112] border-2 transition-all duration-500 ${
                    isReserved ? "border-[#C7E36B]" :
                    highlighted===item._id ? "border-[#D0E46A] shadow-[0_0_0_3px_rgba(208,228,106,0.3)]" :
                    "border-transparent"}`}>
                  {/* TOP SECTION */}
                  <div className="flex flex-col md:flex-row gap-3 w-full cursor-pointer p-3"
                    onClick={() => { if (!isMock && item._id) navigate(`/workshops/${item._id}`); }}>
                    {/* IMAGE — fills full height, badge overlaid on top-left */}
                    <div className="relative w-full md:w-[240px] min-h-[180px] md:self-stretch shrink-0 bg-[#1a1e1f] overflow-hidden rounded-tl-[18px]">
                      {item.sessionCode && (
                        <span className="absolute top-2 left-2 z-10 text-[11px] bg-[#2C3A10] text-[#D0E46A] font-bold px-2 py-0.5 rounded-full">• {item.sessionCode}</span>
                      )}
                      <img
                        src={item.image || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                        onError={e => { e.target.src = FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]; }}
                      />
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex-1 flex flex-col gap-3">
                      {/* TITLE + META */}
                      <div className="relative px-[16px] py-[14px] flex flex-col justify-center gap-[6px] self-stretch rounded-tr-[18px] bg-[#DCDCDC] flex-1">
                        {status && status !== "Draft" && status !== "Completed" && (
                          <div>
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit ${STATUS_STYLE[status] || "bg-gray-500 text-white"}`}>
                              {status === "Live" && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block"/>}{status}
                            </span>
                          </div>
                        )}
                        {isReserved && (
                          <span className="absolute top-3 right-3 text-[10px] bg-[#2C3A10] text-white font-black px-2.5 py-1 rounded-full tracking-wide flex items-center gap-1.5"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>CONFIRMED</span>
                        )}
                        <h3 className="self-stretch text-[#2B2D30] font-[Montserrat] text-[22px] leading-[28px] md:text-[36px] md:leading-[42px] font-black pr-20">
                          {item.title}
                        </h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#6E7072] font-semibold">
                          {fmtDate && <span>📅 {fmtDate}</span>}
                          {item.trainer && <span>👤 {item.trainer}</span>}
                        </div>
                      </div>

                      {/* INFO BOXES */}
                      {isReserved ? (
                        <div className="flex gap-3">
                          <div className="flex flex-col items-start flex-1 gap-[4px] px-5 py-3 bg-[#DCDCDC] rounded-[8px]">
                            <p className="text-[#6E7072] font-[Montserrat] text-[10px] font-semibold uppercase">⏱ Duration</p>
                            <p className="text-[#2B2D30] font-[Montserrat] text-[14px] font-bold uppercase">{item.duration || "—"}</p>
                          </div>
                          <div className="flex flex-col items-start flex-1 gap-[4px] px-5 py-3 bg-[#DCDCDC] rounded-[8px]">
                            <p className="text-[#6E7072] font-[Montserrat] text-[10px] font-semibold uppercase">⊞ Pricing</p>
                            <p className="text-[#2B2D30] font-[Montserrat] text-[14px] font-bold uppercase">SEAT CONFIRMED</p>
                          </div>
                          <div className="flex flex-col items-start flex-1 gap-[4px] px-5 py-3 bg-[#DCDCDC] rounded-[8px]">
                            <p className="text-[#6E7072] font-[Montserrat] text-[10px] font-semibold uppercase">⌨ Mode</p>
                            <p className="text-[#2B2D30] font-[Montserrat] text-[14px] font-bold uppercase">{item.mode === "OFFLINE" ? "OFFLINE" : "ONLINE"}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-3">
                          <div className="flex flex-col items-start flex-1 gap-[4px] px-5 py-3 bg-[#DCDCDC] rounded-[8px]">
                            <p className="text-[#6E7072] font-[Montserrat] text-[10px] font-semibold uppercase">⏱ Duration</p>
                            <p className="text-[#2B2D30] font-[Montserrat] text-[14px] font-bold uppercase">{item.duration || "—"}</p>
                          </div>
                          <div className="flex flex-col items-start flex-1 gap-[4px] px-5 py-3 bg-[#DCDCDC] rounded-[8px]">
                            <p className="text-[#6E7072] font-[Montserrat] text-[10px] font-semibold uppercase">⊞ Pricing</p>
                            <p className="text-[#2B2D30] font-[Montserrat] text-[14px] font-bold">{priceStr}</p>
                          </div>
                          <div className="flex flex-col items-start flex-1 gap-[4px] px-5 py-3 bg-[#DCDCDC] rounded-[8px]">
                            <p className="text-[#6E7072] font-[Montserrat] text-[10px] font-semibold uppercase">📅 Date & Time</p>
                            <p className="text-[#2B2D30] font-[Montserrat] text-[12px] font-bold leading-tight">{dateBoxStr}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* BOTTOM */}
                  {isReserved ? (
                    <div className="flex items-center justify-between gap-3 px-5 py-3.5 bg-[#E2F199] flex-wrap">
                      {/* Left: date info */}
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#C7E36B]/50 flex items-center justify-center shrink-0">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C3A10" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        </div>
                        <div>
                          {fmtDateLong && <p className="text-[#1a2600] text-xs font-black font-[Montserrat]">DATE: {fmtDateLong}</p>}
                          {fmtTimeRange && <p className="text-[#3a5000] text-[11px] font-semibold font-[Montserrat]">at {fmtTimeRange}</p>}
                        </div>
                      </div>
                      {/* Right: buttons */}
                      <div className="flex items-center gap-2">
                        {item.zoomLink ? (
                          <a href={item.zoomLink} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                            className="flex items-center gap-1 bg-[#C7E36B] text-black font-black text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition font-[Montserrat] whitespace-nowrap">
                            Join Workshop →
                          </a>
                        ) : (
                          <button disabled
                            className="flex items-center gap-1 bg-[#C7E36B]/40 text-black/40 font-black text-sm px-5 py-2.5 rounded-xl cursor-not-allowed font-[Montserrat] whitespace-nowrap">
                            Join Workshop →
                          </button>
                        )}
                        {calLink && (
                          <a href={calLink} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                            className="flex items-center bg-white text-[#1a2600] font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-gray-50 transition border border-gray-300 font-[Montserrat] whitespace-nowrap">
                            Add to calendar
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleReserve(item); }}
                      disabled={isFull}
                      className={`flex justify-center items-center gap-[4px] px-[30px] py-[12px] w-full rounded-b-[20px] font-[Montserrat] text-[18px] leading-[28px] font-black uppercase transition
                        ${isFull ? "bg-gray-400 text-white cursor-not-allowed" : "bg-[#D0E46A] text-[#0F1112] hover:opacity-90"}`}
                    >
                      {isFull ? "SOLD OUT" : <><span>RESERVE SPOT</span><span className="text-[22px]">→</span></>}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="flex w-full justify-center items-center bg-[#0F1112] py-[32px] md:py-[48px]">
        <div className="w-full max-w-[1366px] px-[16px] sm:px-[24px] md:px-[60px] lg:px-[93px] flex flex-col justify-center items-center">
          <div className="w-full max-w-[1180px] bg-[#E39494] rounded-[24px] md:rounded-[40px] px-[20px] py-[40px] sm:px-[32px] sm:py-[48px] md:px-[48px] md:py-[64px] text-center">
            <img src="/logoimage.png" alt="support" className="w-[72px] h-[72px] md:w-[96px] md:h-[96px] rounded-full object-cover mx-auto mb-[20px] md:mb-[24px]" />
            <h2 className="text-[#000000] text-center font-[Montserrat] text-[32px] leading-[40px] sm:text-[44px] sm:leading-[52px] md:text-[64px] md:leading-[70px] font-[900] mb-[16px]">
              Not sure which workshop is <br className="hidden md:block" /> right for you?
            </h2>
            <p className="text-[#000000] text-center font-[Montserrat] text-[18px] leading-[28px] sm:text-[24px] sm:leading-[32px] md:text-[32px] md:leading-[40px] font-bold mb-[28px] md:mb-[32px]">
              Get personalised guidance from our team
            </p>
            <button className="inline-flex justify-center items-center gap-[8px] px-[22px] py-[12px] md:px-[30px] md:py-[12px] rounded-[12px] bg-[#D0E46A] text-[#0F1112] font-[Montserrat] text-[15px] md:text-[18px] font-bold leading-[28px] uppercase transition-all duration-300 hover:opacity-90">
              CHAT WITH US NOW
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
