"use client";

import { useState, useEffect } from "react";

const slides = [
  "/hero/hero1.jpg",
  "/hero/hero2.jpg",
  "/hero/hero3.jpg",
  "/hero/hero4.jpg",
];

export default function Hero() {
  const [active, setActive] = useState(0);

  // 🔁 AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-black flex justify-center pt-24 pb-10">
      <div className="relative w-full max-w-7xl h-[520px] md:h-[580px] rounded-[20px] overflow-hidden">
        {/* 🎥 IMAGE */}
        <img
          key={active}
          src={slides[active]}
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover transition duration-700"
        />

        {/* 🌑 LIGHT DARK OVERLAY (NOT TOO HEAVY) */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* 🎬 CONTENT */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-[80px]">
          <p className="text-gray-300 uppercase tracking-[3px] text-sm mb-3">
            MOVIES
          </p>

          <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-tight max-w-xl">
            CREATING <br />
            WORLDS OF <br />
            ANIMATION
          </h1>

          {/* ✅ FIXED BUTTON (SMALL + CLEAN) */}
          <button className="mt-5 inline-flex items-center gap-2 bg-[#C7E36B] text-black px-3 py-2 text-xs font-semibold rounded hover:opacity-90 transition w-fit">
            <span className="text-sm">+</span>
            BOOK A FREE 30 MINS CONSULTATION
          </button>
        </div>

        {/* 🎞️ THUMBNAILS */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setActive(i)}
              className={`w-12 h-8 object-cover rounded cursor-pointer transition ${
                active === i
                  ? "border border-white scale-105"
                  : "opacity-60 hover:opacity-100"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
