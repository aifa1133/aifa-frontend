"use client";

import { useState, useRef, useEffect } from "react";
import { useIsPro, ProUpgradeModal } from "../Components/ProGate";

const STATIC_TALENTS = [
  { name: "Sarah Jenkins", location: "San Francisco, CA", avatar: "/talent/avatar1.jpg", works: ["/talent/ta1.png", "/talent/ta2.png", "/talent/ta3.png"] },
  { name: "Rajiv K",       location: "Mumbai, India",      avatar: "/talent/avatar2.png", works: ["/talent/ta4.png", "/talent/ta5.png", "/talent/ta6.png"] },
  { name: "Jessica",       location: "New York, USA",      avatar: "/talent/avatar3.png", works: ["/talent/ta7.png", "/talent/ta8.png", "/talent/ta9.png"] },
];

const filters = [
  { name: "All" },
  { name: "AI Filmmakers",          img: "/hire-talent/ai-filmmakers.jpg" },
  { name: "Video Editors",          img: "/hire-talent/video-editors.jpg" },
  { name: "AI Artists & Designers", img: "/hire-talent/ai-artists.jpg" },
  { name: "Prompt Engineers",       img: "/hire-talent/prompt-engineers.jpg" },
  { name: "VFX & CGI Artists",      img: "/hire-talent/vfx-cgi.jpg" },
  { name: "Sound Designers",        img: "/hire-talent/sound-designers.jpg" },
  { name: "3D Artists",             img: "/hire-talent/3d-artists.jpg" },
];

function TalentBlock({ t, onInquiry, locked, onLockedClick }) {
  const cardInner = (
    <div>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mb-6">
        <div className="flex items-center gap-4">
          <img src={t.avatar} alt={t.name} className="w-[48px] h-[48px] md:w-[56px] md:h-[56px] rounded-full object-cover" />
          <div>
            <h3 className="text-[#F0F0F0] font-[Montserrat] text-[18px] leading-[28px] font-[700]">{t.name}</h3>
            <p className="text-[#DCDCDC] font-[Montserrat] text-[14px] leading-[20px] font-[400] mt-1">{t.location}</p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-[4px] bg-[#D0E46A] text-black px-[16px] py-[10px] rounded-[4px] w-full sm:w-auto">
          <span className="font-[Montserrat] text-[14px] font-[600]">SEND INQUIRY</span>
          <img src="/Arrowleftsend.svg" alt="" className="w-[20px] h-[20px]" />
        </div>
      </div>
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {t.works.map((img, idx) => (
          <div key={idx} className="rounded-[16px] overflow-hidden border border-white/10">
            <img src={img} alt="work" className="w-full h-[260px] lg:h-[280px] object-cover" />
          </div>
        ))}
      </div>
      <div className="sm:hidden flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2">
        {t.works.map((img, idx) => (
          <div key={idx} className="min-w-[85%] flex-shrink-0 snap-center rounded-[16px] overflow-hidden border border-white/10">
            <img src={img} alt="work" className="w-full h-[240px] object-cover" />
          </div>
        ))}
      </div>
    </div>
  );

  if (locked) {
    return (
      <div className="relative cursor-pointer" onClick={onLockedClick}>
        <div className="blur-sm opacity-50 pointer-events-none select-none">{cardInner}</div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="bg-[#111315]/90 border border-white/10 rounded-2xl px-6 py-4 flex items-center gap-3 shadow-xl">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span className="text-white text-sm font-semibold">Pro Members Only — Tap to Unlock</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mb-6">
        <div className="flex items-center gap-4">
          <img src={t.avatar} alt={t.name} className="w-[48px] h-[48px] md:w-[56px] md:h-[56px] rounded-full object-cover" />
          <div>
            <h3 className="text-[#F0F0F0] font-[Montserrat] text-[18px] leading-[28px] font-[700]">{t.name}</h3>
            <p className="text-[#DCDCDC] font-[Montserrat] text-[14px] leading-[20px] font-[400] mt-1">{t.location}</p>
          </div>
        </div>
        <button
          onClick={() => onInquiry(t)}
          className="flex justify-center items-center gap-[4px] bg-[#D0E46A] text-black px-[16px] py-[10px] rounded-[4px] w-full sm:w-auto hover:opacity-90 transition"
        >
          <span className="font-[Montserrat] text-[14px] font-[600]">SEND INQUIRY</span>
          <img src="/Arrowleftsend.svg" alt="" className="w-[20px] h-[20px]" />
        </button>
      </div>
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {t.works.map((img, idx) => (
          <div key={idx} className="rounded-[16px] overflow-hidden border border-white/10 group">
            <img src={img} alt="work" className="w-full h-[260px] lg:h-[280px] object-cover transition duration-500 group-hover:scale-105" />
          </div>
        ))}
      </div>
      <div className="sm:hidden flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-2">
        {t.works.map((img, idx) => (
          <div key={idx} className="min-w-[85%] flex-shrink-0 snap-center rounded-[16px] overflow-hidden border border-white/10">
            <img src={img} alt="work" className="w-full h-[240px] object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

function InquiryModal({ talent, onClose }) {
  const stored = (() => { try { return JSON.parse(localStorage.getItem("aifa_user") || "{}"); } catch { return {}; } })();
  const [form, setForm] = useState({ name: stored.name || "", email: stored.email || "", message: "", budget: "" });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) { setErr("Please fill in all required fields."); return; }
    setSending(true); setErr("");
    try {
      const token = localStorage.getItem("aifa_token");
      const res = await fetch("/api/service-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ talentName: talent.name, type: "hire-talent", senderName: form.name, senderEmail: form.email, message: form.message, budget: form.budget }),
      });
      if (res.ok) { setDone(true); setTimeout(onClose, 2500); }
      else { setErr("Failed to send. Please try again."); }
    } catch { setErr("Network error. Please try again."); }
    setSending(false);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#1A1D1E] border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
        {done ? (
          <div className="flex flex-col items-center py-8 gap-4">
            <div className="w-16 h-16 rounded-full bg-[#C7E36B]/15 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 className="text-white font-bold text-lg">Inquiry Sent!</h3>
            <p className="text-gray-400 text-sm text-center">Your inquiry to <span className="text-white font-semibold">{talent.name}</span> has been sent. We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={submit}>
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-white font-bold text-base">Send Inquiry</h3>
                <p className="text-gray-400 text-xs mt-0.5">To: <span className="text-[#C7E36B]">{talent.name}</span> · {talent.location}</p>
              </div>
              <button type="button" onClick={onClose} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all text-lg">✕</button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-gray-400 font-semibold uppercase block mb-1">Your Name *</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name"
                    className="w-full bg-[#0B0F10] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#C7E36B]/50 transition-colors" />
                </div>
                <div>
                  <label className="text-[11px] text-gray-400 font-semibold uppercase block mb-1">Your Email *</label>
                  <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@email.com"
                    className="w-full bg-[#0B0F10] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#C7E36B]/50 transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-[11px] text-gray-400 font-semibold uppercase block mb-1">Project Description *</label>
                <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={4} placeholder="Describe your project, requirements, timeline…"
                  className="w-full bg-[#0B0F10] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#C7E36B]/50 transition-colors resize-none" />
              </div>
              <div>
                <label className="text-[11px] text-gray-400 font-semibold uppercase block mb-1">Budget <span className="text-gray-600 normal-case font-normal">(optional)</span></label>
                <select value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                  className="w-full bg-[#0B0F10] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#C7E36B]/50 transition-colors">
                  <option value="">Select budget range</option>
                  <option>Under ₹10,000</option>
                  <option>₹10,000 – ₹50,000</option>
                  <option>₹50,000 – ₹1,00,000</option>
                  <option>₹1,00,000 – ₹5,00,000</option>
                  <option>₹5,00,000+</option>
                </select>
              </div>
            </div>

            {err && <p className="text-red-400 text-xs font-semibold mt-3">{err}</p>}

            <div className="flex gap-3 mt-5">
              <button type="button" onClick={onClose} className="flex-1 border border-white/10 text-gray-300 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-white/5 transition-all">Cancel</button>
              <button type="submit" disabled={sending}
                className="flex-1 flex items-center justify-center gap-2 bg-[#D0E46A] text-black text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-[#C7E36B] transition-all disabled:opacity-60">
                {sending ? "Sending…" : <><span>SEND INQUIRY</span><img src="/Arrowleftsend.svg" alt="" className="w-4 h-4" /></>}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

const PAGE_SIZE = 6;

export default function HireTalent() {
  const [selected, setSelected]   = useState("All");
  const [search, setSearch]       = useState("");
  const [country, setCountry]     = useState("");
  const [city, setCity]           = useState("");
  const scrollRef = useRef(null);
  const [talents, setTalents]     = useState(STATIC_TALENTS);
  const [page, setPage]           = useState(1);
  const [hasMore, setHasMore]     = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [inquiryTalent, setInquiryTalent] = useState(null);
  const isPro = useIsPro();

  const fetchTalents = async (pageNum = 1, append = false) => {
    try {
      const r = await fetch(`/api/talent?page=${pageNum}&limit=${PAGE_SIZE}`);
      if (!r.ok) return;
      const data = await r.json();
      // Handle both old (array) and new (paginated) response
      if (Array.isArray(data)) {
        if (data.length > 0) setTalents(data);
      } else if (data.items) {
        setTalents(prev => append ? [...prev, ...data.items] : (data.items.length > 0 ? data.items : prev));
        setHasMore(data.hasMore || false);
        setPage(data.page || 1);
      }
    } catch {}
  };

  useEffect(() => { fetchTalents(1, false); }, []);

  const loadMore = async () => {
    if (!isPro) { setShowModal(true); return; }
    setLoadingMore(true);
    await fetchTalents(page + 1, true);
    setLoadingMore(false);
  };

  const filteredTalents = talents.filter(t => {
    const q = search.toLowerCase();
    const matchSearch = !q || t.name?.toLowerCase().includes(q) || t.location?.toLowerCase().includes(q) || (t.skills || []).some(s => s.toLowerCase().includes(q));
    const matchCategory = selected === "All" || (t.skills || []).some(s => s.toLowerCase().includes(selected.toLowerCase())) || t.category?.toLowerCase().includes(selected.toLowerCase());
    const matchCountry = !country || t.location?.toLowerCase().includes(country.toLowerCase());
    const matchCity = !city || t.location?.toLowerCase().includes(city.toLowerCase());
    return matchSearch && matchCategory && matchCountry && matchCity;
  });

  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });

  return (
    <section className="bg-[#0B0F10] text-white overflow-hidden pt-[80px] sm:pt-[100px] lg:pt-[120px] pb-[64px]">
      <style>{`.scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}`}</style>

      <div className="w-full max-w-[1440px] mx-auto px-[16px] sm:px-[24px] md:px-[40px] lg:px-[60px] xl:px-[93px]">

        {/* TOP BAR */}
        <div className="flex flex-col gap-4 mb-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <h2 className="text-[#F0F0F0] font-[Montserrat] text-[28px] leading-[36px] sm:text-[32px] sm:leading-[40px] font-[900]">AVAILABLE TALENT</h2>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <select value={country} onChange={e => setCountry(e.target.value === "Select A Country" ? "" : e.target.value)}
                className="bg-[#111] border border-white/10 h-[48px] px-4 rounded-[6px] w-full sm:w-[200px] text-white outline-none">
                <option>Select A Country</option>
                <option>India</option><option>USA</option><option>UK</option>
              </select>
              <input type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)}
                className="bg-[#111] border border-white/10 h-[48px] px-4 rounded-[6px] w-full sm:w-[160px] text-white outline-none placeholder-gray-600" />
            </div>
          </div>
          {/* SEARCH BAR */}
          <div className="relative w-full">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, skill or location…"
              className="w-full bg-[#111] border border-white/10 h-[52px] pl-11 pr-4 rounded-[8px] text-white text-[15px] outline-none placeholder-gray-600 focus:border-[#C7E36B]/50 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors text-lg">✕</button>
            )}
          </div>
        </div>

        {/* FILTER SLIDER */}
        <div className="flex items-center gap-2 mb-12">
          <button onClick={() => scroll("left")} className="min-w-[40px] h-[40px] md:min-w-[48px] md:h-[48px] flex items-center justify-center rounded-full bg-white">
            <img src="/Arrowleftnewhire1.svg" alt="left" className="w-[18px] h-[18px]" />
          </button>
          <div ref={scrollRef} className="flex gap-3 overflow-x-auto scrollbar-hide flex-1 scroll-smooth">
            {filters.map((f, i) => (
              <button key={i} onClick={() => setSelected(f.name)}
                className={`relative min-w-[150px] sm:min-w-[180px] md:min-w-[188px] h-[56px] md:h-[64px] flex-shrink-0 rounded-[6px] flex items-center justify-center overflow-hidden transition-all duration-300 ${selected === f.name ? "bg-[#C7E36B] text-black" : "text-[#F0F0F0] border border-white/10"}`}>
                {f.img && (<><img src={f.img} alt={f.name} className="absolute inset-0 w-full h-full object-cover" /><div className="absolute inset-0 bg-black/50" /></>)}
                <span className="relative z-10 text-[13px] sm:text-[14px] font-medium px-3 text-center">{f.name}</span>
              </button>
            ))}
          </div>
          <button onClick={() => scroll("right")} className="min-w-[40px] h-[40px] md:min-w-[48px] md:h-[48px] flex items-center justify-center rounded-full bg-white">
            <img src="/Arrowleftnewhire.svg" alt="right" className="w-[18px] h-[18px]" />
          </button>
        </div>

        {/* TALENT LIST — first open, rest locked for non-Pro */}
        <div className="space-y-[64px] mb-[64px]">
          {filteredTalents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <p className="text-gray-500 text-[16px] font-semibold">No talent found for "{search || selected}"</p>
              <button onClick={() => { setSearch(""); setSelected("All"); setCountry(""); setCity(""); }}
                className="text-[#C7E36B] text-sm font-semibold hover:underline">Clear all filters</button>
            </div>
          ) : (
            filteredTalents.map((t, i) => (
              <TalentBlock
                key={i}
                t={t}
                onInquiry={t => setInquiryTalent(t)}
                locked={i > 0 && !isPro}
                onLockedClick={() => setShowModal(true)}
              />
            ))
          )}
        </div>

        {/* Load more */}
        {(hasMore || !isPro) && (
          <div className="flex justify-center mt-[64px]">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="flex justify-center items-center gap-[8px] bg-[#F0F0F0] text-black px-[20px] py-[12px] rounded-[4px] transition-all duration-300 hover:bg-[#e4e4e4] w-full sm:w-auto disabled:opacity-60"
            >
              {loadingMore ? (
                <><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Loading…</>
              ) : !isPro ? (
                <>🔒 LOAD MORE PROFILES</>
              ) : (
                "LOAD MORE PROFILES"
              )}
            </button>
          </div>
        )}
      </div>

      {showModal && <ProUpgradeModal onClose={() => setShowModal(false)} />}
      {inquiryTalent && <InquiryModal talent={inquiryTalent} onClose={() => setInquiryTalent(null)} />}
    </section>
  );
}
