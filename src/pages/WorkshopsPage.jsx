"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MOCK_WORKSHOPS = [
  { _id: "mw1", title: "AI Lego Animation Workshop", image: "/courses/v1.png", duration: "3 Hours", price: 199, mode: "ONLINE" },
  { _id: "mw2", title: "AI Cinematic Workshop", image: "/courses/v2.png", duration: "3 Hours", price: 199, mode: "ONLINE" },
  { _id: "mw3", title: "AI Sci-Fi Movie Creator", image: "/courses/v3.png", duration: "3 Hours", price: 199, mode: "ONLINE" },
  { _id: "mw4", title: "AI Fantasy World Builder", image: "/courses/v4.png", duration: "3 Hours", price: 199, mode: "ONLINE" },
  { _id: "mw5", title: "AI Product Ad Filmmaking", image: "/courses/v4.png", duration: "3 Hours", price: 199, mode: "ONLINE" },
];

const FALLBACK_IMAGES = ["/courses/v1.png","/courses/v2.png","/courses/v3.png","/courses/v4.png"];

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(null);
  const [reserved, setReserved] = useState(new Set());
  const navigate = useNavigate();
  const token = localStorage.getItem("aifa_token");
  const isLoggedIn = !!token;

  useEffect(() => {
    fetch("/api/workshops")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setWorkshops(data);
        else setWorkshops(MOCK_WORKSHOPS);
      })
      .catch(() => { setWorkshops(MOCK_WORKSHOPS); })
      .finally(() => setLoading(false));

    if (token) {
      fetch("/api/users/me", { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.ok ? r.json() : null)
        .then(u => {
          if (u?.enrolledWorkshops?.length > 0)
            setReserved(new Set(u.enrolledWorkshops.map(String)));
        })
        .catch(() => {});
    }
  }, []);

  const handleReserve = async (workshop) => {
    if (!isLoggedIn) {
      alert("Please login or sign up to reserve a spot.");
      return;
    }
    if (!workshop._id || workshop._id.startsWith("mw")) {
      alert("Booking coming soon!");
      return;
    }
    if (reserved.has(workshop._id)) return;
    setEnrolling(workshop._id);
    try {
      const res = await fetch(`/api/workshops/${workshop._id}/register`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setReserved(prev => new Set([...prev, workshop._id]));
        setWorkshops(prev => prev.map(w =>
          w._id === workshop._id
            ? { ...w, registrations: [...(w.registrations || []), "me"] }
            : w
        ));
        alert("Spot reserved! Check your dashboard.");
        navigate("/dashboard");
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setEnrolling(null);
    }
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
            {!loading && workshops.map((item, i) => (
              <div key={item._id || i} className="w-full rounded-[24px] overflow-hidden bg-[#0F1112] border-[6px] border-[#0F1112]">
                {/* TOP SECTION */}
                <div className="flex flex-col md:flex-row gap-[6px] w-full">
                  {/* IMAGE */}
                  <div className="inline-grid w-full md:w-[266px] h-[200px] grid-cols-1 grid-rows-1 overflow-hidden rounded-tl-[20px] shrink-0 bg-[#1a1e1f]">
                    <img
                      src={item.image || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]}
                      alt={item.title}
                      className="w-full h-full object-cover object-center"
                      onError={e => { e.target.src = FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]; }}
                    />
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="flex-1 flex flex-col gap-[6px]">
                    {/* TITLE */}
                    <div className="flex h-[105px] px-[12px] py-[10px] flex-col justify-center items-start gap-[10px] self-stretch rounded-tr-[20px] bg-[#DCDCDC]">
                      <h3 className="self-stretch text-[#2B2D30] font-[Montserrat] text-[26px] leading-[34px] md:text-[56px] md:leading-[60px] font-black">
                        {item.title}
                      </h3>
                    </div>

                    {/* INFO BOXES */}
                    {(() => {
                      const registered = item.registrations?.length || 0;
                      const seats = item.seats || 50;
                      const remaining = seats - registered;
                      const isFull = remaining <= 0;
                      const isMock = item._id?.startsWith("mw");
                      return (
                        <>
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-[8px]">
                            <div className="flex flex-col items-start gap-[6px] flex-1 self-stretch p-[20px] rounded-[8px] bg-[#DCDCDC]">
                              <p className="text-[#6E7072] font-[Montserrat] text-[10px] leading-[14px] font-semibold uppercase">⏱ Duration</p>
                              <p className="text-[#2B2D30] font-[Montserrat] text-[16px] leading-[22px] font-bold uppercase">{item.duration}</p>
                            </div>
                            <div className="flex flex-col items-start gap-[6px] flex-1 self-stretch p-[20px] rounded-[8px] bg-[#DCDCDC]">
                              <p className="text-[#6E7072] font-[Montserrat] text-[10px] leading-[14px] font-semibold uppercase">⊞ Pricing</p>
                              <p className="text-[#2B2D30] font-[Montserrat] text-[16px] leading-[22px] font-bold">{item.currency==="USD"?"$":"₹"}{item.price}</p>
                            </div>
                            <div className="flex flex-col items-start gap-[6px] flex-1 self-stretch p-[20px] rounded-[8px] bg-[#DCDCDC]">
                              <p className="text-[#6E7072] font-[Montserrat] text-[10px] leading-[14px] font-semibold uppercase">⌨ Mode</p>
                              <p className="text-[#2B2D30] font-[Montserrat] text-[16px] leading-[22px] font-bold uppercase">{item.mode}</p>
                            </div>
                            <div className="flex flex-col items-start gap-[6px] flex-1 self-stretch p-[20px] rounded-[8px] bg-[#DCDCDC]">
                              <p className="text-[#6E7072] font-[Montserrat] text-[10px] leading-[14px] font-semibold uppercase">🪑 Seats</p>
                              {isMock ? (
                                <p className="text-[#2B2D30] font-[Montserrat] text-[16px] leading-[22px] font-bold">Limited</p>
                              ) : isFull ? (
                                <p className="text-red-600 font-[Montserrat] text-[16px] leading-[22px] font-bold">FULL</p>
                              ) : (
                                <>
                                  <p className="text-[#2B2D30] font-[Montserrat] text-[16px] leading-[22px] font-bold">{remaining} left</p>
                                  <div className="w-full bg-gray-300 rounded-full h-1 mt-1"><div className="bg-[#2B2D30] h-1 rounded-full" style={{width:`${Math.min(100,(registered/seats)*100)}%`}}/></div>
                                </>
                              )}
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* BUTTON */}
                {(() => {
                  const isFull = !item._id?.startsWith("mw") && (item.registrations?.length||0) >= (item.seats||50);
                  const isReserved = reserved.has(item._id);
                  return (
                    <button
                      onClick={() => handleReserve(item)}
                      disabled={enrolling === item._id || isFull || isReserved}
                      className={`flex justify-center items-center gap-[4px] px-[30px] py-[12px] w-full rounded-b-[25px] font-[Montserrat] text-[18px] leading-[28px] font-black uppercase transition
                        ${isReserved ? "bg-green-500/20 text-green-400 cursor-default border-t-2 border-green-500/30"
                        : isFull ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-[#D0E46A] text-[#0F1112] hover:opacity-90"}`}
                    >
                      {enrolling === item._id ? "Reserving..."
                        : isReserved ? "✓ Reserved"
                        : isFull ? "SOLD OUT"
                        : "RESERVE SPOT"}
                      {!isFull && !isReserved && <span className="text-[22px]">→</span>}
                    </button>
                  );
                })()}
              </div>
            ))}
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
