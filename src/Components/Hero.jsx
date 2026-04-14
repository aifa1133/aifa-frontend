import { useState } from "react";

const slides = [
  "/hero/hero1.jpg",
  "/hero/hero2.jpg",
  "/hero/hero3.jpg",
  "/hero/hero4.jpg",
];

export default function Hero() {
  const [active, setActive] = useState(0);

  return (
    <section className="w-full bg-black flex justify-center pt-24 pb-10">
      {/* Main Container */}
      <div className="relative w-full max-w-7xl h-[520px] md:h-[588px] rounded-[24px] overflow-hidden">
        {/* Background Image */}
        <img
          src={slides[active]}
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Red Gradient Overlay (LEFT SIDE GLOW) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2a0000]/90 via-[#1a0000]/60 to-transparent"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-[100px]">
          {/* Small Title */}
          <p className="text-gray-300 uppercase tracking-widest text-sm mb-3">
            Movies
          </p>

          {/* Big Heading */}
          <h1 className="text-white text-3xl md:text-6xl font-extrabold leading-tight max-w-xl">
            CREATING <br />
            WORLDS OF <br />
            ANIMATION
          </h1>

          {/* Button */}
          <button className="mt-6 inline-flex items-center gap-2 bg-[#C7E36B] text-black px-2 py-2 text-sm font-semibold rounded hover:scale-105 transition">
            <span className="text-lg">+</span>
            BOOK A FREE 30 MINS CONSULTATION
          </button>
        </div>

        {/* Bottom Thumbnails */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setActive(i)}
              className={`w-14 h-10 md:w-16 md:h-12 object-cover rounded cursor-pointer border-2 transition-all duration-300 ${
                active === i
                  ? "border-[#C7E36B] scale-110"
                  : "border-transparent opacity-60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
