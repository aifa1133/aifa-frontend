"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const directors = [
  { name: "SHIVA PRASAD", role: "Creative Director", image: "/team/team1.png" },
  { name: "HEMANTH", role: "Vfx Supervisor", image: "/team/team2.png" },
  { name: "RAVI TEJA", role: "Creative Director", image: "/team/team3.png" },
  { name: "E ARUN KUMAR", role: "Co-Founder", image: "/team/team4.png" },
];

export default function Directors() {
  const [active, setActive] = useState(1);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % directors.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-[#0F1112] flex justify-center py-[64px] overflow-hidden">
      <div
        className="
  w-full max-w-[1366px]
  flex flex-col md:flex-row
  justify-between items-center
  gap-[40px] md:gap-[64px]
  px-[16px] sm:px-[24px] lg:px-0
"
      >
        {/* LEFT */}
        <div className="flex-1 text-center md:text-left">
          <h2
            className="text-[#F0F0F0] font-montserrat font-black 
          text-[36px] leading-[42px] 
          sm:text-[48px] sm:leading-[56px] 
          md:text-[64px] md:leading-[70px] 
          mb-4 md:mb-6"
          >
            LEARN FROM THE INDUSTRY <br /> LEADERS
          </h2>
        </div>

        {/* RIGHT - CAROUSEL */}
        <div className="hidden md:flex relative justify-center items-center h-[420px] flex-1 overflow-hidden [perspective:1000px]">
          {/* SIDE FADE */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#0B0F10] to-transparent z-40" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#0B0F10] to-transparent z-40" />

          {directors.map((item, i) => {
            const offset = i - active;

            return (
              <motion.div
                key={i}
                onClick={() => setActive(i)}
                animate={{
                  x: offset * 180,
                  scale: offset === 0 ? 1.15 : 0.85,
                  opacity: offset === 0 ? 1 : 0.45,
                  filter: offset === 0 ? "blur(0px)" : "blur(3px)",
                  rotateY: offset === 0 ? 0 : offset > 0 ? -12 : 12,
                  zIndex: offset === 0 ? 30 : 10,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 18,
                }}
                className="absolute cursor-pointer"
              >
                {/* CARD */}
                <div
                  className={`group w-[218px] h-[352px] rounded-[32px] overflow-hidden relative 
                  bg-[#0F1112] 
                  ${
                    offset === 0
                      ? "border border-[#D0E46A] shadow-[0_0_20px_rgba(208,228,106,0.3)]"
                      : "border border-[#DCDCDC]/20"
                  } 
                  transition`}
                >
                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  {/* GRADIENT */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1112] via-black/40 to-transparent" />

                  {/* TEXT */}
                  <div className="absolute bottom-6 w-full px-4 flex flex-col items-center text-center">
                    {/* NAME */}
                    <p
                      className="text-[#F0F0F0] font-montserrat font-bold 
                    text-[16px] leading-[24px] uppercase tracking-[0.05em]"
                    >
                      {item.name}
                    </p>

                    {/* ROLE */}
                    <p
                      className="text-[#9CA3AF] font-montserrat font-medium 
                    text-[13px] leading-[20px]"
                    >
                      {item.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        {/* MOBILE */}
        <div className="md:hidden w-full mt-[32px] flex flex-col items-center">
          <div className="relative w-full max-w-[330px] h-[320px] flex items-center justify-center overflow-hidden">
            {directors.map((item, i) => {
              const offset = i - active;

              return (
                <motion.div
                  key={i}
                  onClick={() => setActive(i)}
                  animate={{
                    x: offset * 95,
                    scale: offset === 0 ? 1 : 0.82,
                    opacity: offset === 0 ? 1 : 0.45,
                    zIndex: offset === 0 ? 30 : 10,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 18,
                  }}
                  className="absolute cursor-pointer"
                >
                  <div
                    className={`w-[150px] h-[250px] rounded-[18px] overflow-hidden relative
            ${
              offset === 0
                ? "border border-[#6E6E6E] shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                : ""
            }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1112] via-black/20 to-transparent" />

                    <div className="absolute bottom-3 left-0 w-full text-center px-2">
                      <p className="text-white text-[10px] font-bold uppercase leading-tight">
                        {item.name}
                      </p>

                      <p className="text-[#A0A0A0] text-[8px] mt-1">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
