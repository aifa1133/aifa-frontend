"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BootcampCardMobile from "./BootcampCardMobile";

const MOCK_WORKSHOPS = [
  { _id: null, title: "AI Filmmaking Workshop",       image: "/bootcamp/bootcamp1.png", duration: "3 HOURS", price: "INR 999.00", date: "25-JUL-2026 | 10 AM" },
  { _id: null, title: "AI Advertising Workshop",      image: "/bootcamp/bootcamp2.png", duration: "3 HOURS", price: "INR 999.00", date: "28-JUL-2026 | 3 PM"  },
  { _id: null, title: "AI Animation Workshop",        image: "/bootcamp/bootcamp3.png", duration: "3 HOURS", price: "INR 999.00", date: "30-JUL-2026 | 5 PM"  },
  { _id: null, title: "AI Content Creation Workshop", image: "/bootcamp/bootcamp4.png", duration: "3 HOURS", price: "INR 999.00", date: "30-JUL-2026 | 4 PM"  },
];

const FALLBACK_IMAGES = ["/bootcamp/bootcamp1.png","/bootcamp/bootcamp2.png","/bootcamp/bootcamp3.png","/bootcamp/bootcamp4.png"];

const fmtDateBox = (scheduledAt) => {
  if (!scheduledAt) return "—";
  const dt = new Date(scheduledAt);
  const mon = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"][dt.getMonth()];
  const h = dt.getHours(); const ampm = h >= 12 ? "PM" : "AM"; const h12 = h % 12 || 12;
  const mins = dt.getMinutes();
  return `${String(dt.getDate()).padStart(2,"0")}-${mon}-${dt.getFullYear()} | ${h12}${mins ? ":"+String(mins).padStart(2,"0") : ""} ${ampm}`;
};

const fmtPrice = (w) => {
  if (!w.price && w.price !== 0) return "—";
  const sym = w.currency === "USD" ? "USD" : "INR";
  return `${sym} ${parseFloat(w.price).toFixed(2)}`;
};

export default function Bootcamps() {
  const navigate = useNavigate();
  const [workshops, setWorkshops] = useState(MOCK_WORKSHOPS);

  useEffect(() => {
    fetch("/api/workshops")
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data
            .filter(w => w.isPublished !== false)
            .slice(0, 4)
            .map((w, i) => ({
              _id:      w._id,
              title:    w.title,
              image:    w.image || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
              duration: w.duration || "3 HOURS",
              price:    fmtPrice(w),
              date:     fmtDateBox(w.scheduledAt),
            }));
          if (mapped.length > 0) setWorkshops(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const handleViewDetails = (item) => {
    if (item._id) navigate(`/workshops/${item._id}`);
    else navigate("/workshops");
  };

  const handleReserve = (item) => {
    if (item._id) navigate(`/workshops/${item._id}`);
    else navigate("/workshops");
  };

  return (
    <section className="w-full bg-[#0F1112] flex justify-center py-[40px] sm:py-[64px]">
      <div className="w-full max-w-[1440px] mx-auto px-[16px] sm:px-[24px] md:px-[40px] lg:px-[60px] flex flex-col gap-[32px] sm:gap-[48px]">
        <h2 className="text-[#F0F0F0] font-montserrat font-black text-[22px] sm:text-[32px] md:text-[40px] text-center sm:text-left">
          AI FILMMAKING WORKSHOPS
        </h2>

        <div className="flex flex-col gap-[0] sm:gap-[10px]">
          {workshops.map((item, i) => (
            <motion.div
              key={item._id || i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="hidden sm:block bg-[#0F1415] rounded-[20px] overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-[266px_1fr] grid-rows-[auto_auto] gap-[8px] p-[12px] sm:p-[16px]">
                  {/* IMAGE */}
                  <div className="w-full h-[180px] sm:h-[200px] lg:w-[266px] lg:h-[200px] overflow-hidden rounded-[20px]">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>

                  {/* RIGHT CONTENT */}
                  <div className="flex flex-col gap-[6px]">
                    {/* TITLE */}
                    <div className="flex flex-col justify-center items-start h-[80px] sm:h-[105px] px-[12px] py-[10px] bg-[#DCDCDC] rounded-tr-[20px]">
                      <h3 className="text-[#282A2C] font-montserrat font-bold text-[16px] sm:text-[24px] md:text-[36px] leading-tight">
                        {item.title}
                      </h3>
                    </div>

                    {/* INFO BOXES */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-[8px]">
                      <div className="flex flex-col p-[12px] sm:p-[20px] gap-[6px] bg-[#DCDCDC] rounded-[8px]">
                        <p className="flex items-center gap-[4px] text-[10px] sm:text-[12px] font-semibold text-[#414243]">
                          <img src="/Clockicon.svg" alt="clock" className="w-[12px] h-[12px] object-contain" />
                          DURATION
                        </p>
                        <p className="text-[12px] sm:text-[14px] font-bold text-[#282A2C]">{item.duration}</p>
                      </div>
                      <div className="flex flex-col p-[12px] sm:p-[20px] gap-[6px] bg-[#DCDCDC] rounded-[8px]">
                        <p className="flex items-center gap-[4px] text-[10px] sm:text-[12px] font-semibold text-[#414243]">
                          <img src="/moneyicon.svg" alt="money" className="w-[12px] h-[12px] object-contain" />
                          PRICING
                        </p>
                        <p className="text-[12px] sm:text-[14px] font-bold text-[#282A2C]">{item.price}</p>
                      </div>
                      <div className="flex flex-col p-[12px] sm:p-[20px] gap-[6px] bg-[#DCDCDC] rounded-[8px]">
                        <p className="flex items-center gap-[4px] text-[10px] sm:text-[12px] font-semibold text-[#414243]">
                          <img src="/laptopicon.svg" alt="date" className="w-[12px] h-[12px] object-contain" />
                          DATE & TIME
                        </p>
                        <p className="text-[12px] sm:text-[14px] font-bold text-[#282A2C]">{item.date}</p>
                      </div>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="lg:col-span-2 flex flex-col gap-[8px] mt-[4px]">
                    <button
                      type="button"
                      onClick={() => handleViewDetails(item)}
                      className="flex w-full justify-center items-center px-[30px] py-[12px] rounded-[8px] bg-[#F2FEB1] text-[#0F1112] font-[Montserrat] text-[18px] font-bold leading-[28px] hover:bg-[#EAF99A] transition-all duration-300 cursor-pointer"
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReserve(item)}
                      className="flex w-full justify-center items-center px-[30px] py-[10px] gap-[4px] rounded-b-[20px] bg-[#D0E46A] text-[#1A1A1A] font-[Montserrat] text-[14px] font-bold uppercase hover:bg-[#BDD250] transition-all duration-300 cursor-pointer"
                    >
                      RESERVE SPOT
                      <img src="/Arrowleft2.svg" alt="arrow" className="w-[16px] h-[16px]" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="block sm:hidden">
                <BootcampCardMobile item={item} onViewDetails={() => handleViewDetails(item)} onReserve={() => handleReserve(item)} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
