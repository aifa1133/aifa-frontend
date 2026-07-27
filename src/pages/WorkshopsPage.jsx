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

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState(MOCK_WORKSHOPS);
  const [enrolling, setEnrolling] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("aifa_token");

  useEffect(() => {
    fetch("/api/workshops")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setWorkshops(data); })
      .catch(() => {});
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
    setEnrolling(workshop._id);
    try {
      const token = localStorage.getItem("aifa_token");
      const res = await fetch(`/api/workshops/${workshop._id}/register`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
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
            {workshops.map((item, i) => (
              <div key={item._id || i} className="w-full rounded-[24px] overflow-hidden bg-[#0F1112] border-[6px] border-[#0F1112]">
                {/* TOP SECTION */}
                <div className="flex flex-col md:flex-row gap-[6px] w-full">
                  {/* IMAGE */}
                  <div className="inline-grid w-full md:w-[266px] h-[200px] grid-cols-1 grid-rows-1 overflow-hidden rounded-tl-[20px] shrink-0 bg-[lightgray]">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover object-center" />
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-[8px]">
                      <div className="flex flex-col items-start gap-[6px] flex-1 self-stretch p-[20px] rounded-[8px] bg-[#DCDCDC]">
                        <p className="text-[#6E7072] font-[Montserrat] text-[10px] leading-[14px] font-semibold uppercase">⏱ Duration</p>
                        <p className="text-[#2B2D30] font-[Montserrat] text-[16px] leading-[22px] font-bold uppercase">{item.duration}</p>
                      </div>
                      <div className="flex flex-col items-start gap-[6px] flex-1 self-stretch p-[20px] rounded-[8px] bg-[#DCDCDC]">
                        <p className="text-[#6E7072] font-[Montserrat] text-[10px] leading-[14px] font-semibold uppercase">⊞ Pricing</p>
                        <p className="text-[#2B2D30] font-[Montserrat] text-[16px] leading-[22px] font-bold">
                          ₹{item.price || item.price}
                        </p>
                      </div>
                      <div className="flex flex-col items-start gap-[6px] flex-1 self-stretch p-[20px] rounded-[8px] bg-[#DCDCDC]">
                        <p className="text-[#6E7072] font-[Montserrat] text-[10px] leading-[14px] font-semibold uppercase">⌨ Mode</p>
                        <p className="text-[#2B2D30] font-[Montserrat] text-[16px] leading-[22px] font-bold uppercase">{item.mode}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  onClick={() => handleReserve(item)}
                  disabled={enrolling === item._id}
                  className="flex justify-center items-center gap-[4px] px-[30px] py-[12px] w-full rounded-b-[25px] bg-[#D0E46A] text-[#0F1112] font-[Montserrat] text-[18px] leading-[28px] font-black uppercase hover:opacity-90 transition disabled:opacity-60"
                >
                  {enrolling === item._id ? "Reserving..." : "RESERVE SPOT"}
                  <span className="text-[22px]">→</span>
                </button>
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
