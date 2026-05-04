// "use client";

// import { useState, useEffect } from "react";

// const slides = [
//   "/hero/hero1.jpg",
//   "/hero/hero2.jpg",
//   "/hero/hero3.jpg",
//   "/hero/hero4.jpg",
// ];

// export default function Hero() {
//   const [active, setActive] = useState(0);

//   // 🔁 AUTO SLIDE
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActive((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="w-full bg-black flex justify-center pt-24 pb-10">
//       <div className="relative w-full max-w-7xl h-[520px] md:h-[580px] rounded-[20px] overflow-hidden">
//         {/* 🎥 IMAGE */}
//         <img
//           key={active}
//           src={slides[active]}
//           alt="hero"
//           className="absolute inset-0 w-full h-full object-cover transition duration-700"
//         />

//         {/* 🌑 LIGHT DARK OVERLAY (NOT TOO HEAVY) */}
//         <div className="absolute inset-0 bg-black/40"></div>

//         {/* 🎬 CONTENT */}
//         <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-[80px]">
//           <p className="text-[#F0F0F0] font-montserrat text-[32px] leading-[40px] font-bold tracking-[0.02em] mb-3 uppercase">
//             FILMS
//           </p>

//           <h1 className="text-[#F0F0F0] font-montserrat text-[64px] leading-[70px] font-black max-w-[620px]">
//             CREATE <br />
//             HOLLYWOOD <br />
//             STYLE AI FILMS
//           </h1>

//           {/* ✅ FIXED BUTTON (SMALL + CLEAN) */}
//           <button className="mt-5 inline-flex items-center justify-center gap-[4px] bg-[#D0E46A] text-[#0F1112] px-[30px] py-[12px] text-[18px] leading-[28px] font-bold font-montserrat rounded-[12px] hover:opacity-90 transition-all duration-200 w-fit">
//             BOOK A FREE 30 MINS CONSULTATION
//           </button>
//         </div>

//         {/* 🎞️ THUMBNAILS */}
//         <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
//           {slides.map((img, i) => (
//             <img
//               key={i}
//               src={img}
//               onClick={() => setActive(i)}
//               className={`w-12 h-8 object-cover rounded cursor-pointer transition ${
//                 active === i
//                   ? "border border-white scale-105"
//                   : "opacity-60 hover:opacity-100"
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";

const slides = [
  {
    video: "/hero/web1.mp4",
    tag: "FILMS",
    thumb: "/hero/hero1.jpg",
    title: "CREATE HOLLYWOOD STYLE AI FILMS",
  },
  {
    video: "/hero/web2.mp4",
    tag: "MENTORSHIP",
    thumb: "/hero/hero2.jpg",
    title: "TRAIN WITH INDUSTRY EXPERTS",
  },
  {
    video: "/hero/web4.mp4",
    tag: "PROJECTS",
    thumb: "/hero/hero3.jpg",
    title: "BUILD REAL PROJECTS",
  },
  {
    video: "/hero/web5.mp4",
    tag: "EARNINGS",
    thumb: "/hero/hero4.jpg",
    title: "EARN WITH YOUR SKILLS",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [active]);

  return (
    <section className="w-full bg-[#0F1112] flex justify-center py-[24px] sm:py-[32px]">
      <div className="w-full max-w-[1180px] flex flex-col gap-[20px] sm:gap-[24px] px-[16px] sm:px-[24px] lg:px-0">
        {/* HERO */}
        <div
          className="
          relative w-full 
          h-[420px] sm:h-[520px] md:h-[652px]   /* ✅ responsive height */
          rounded-[16px] sm:rounded-[24px] 
          overflow-hidden
        "
        >
          {/* VIDEO */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={slides[active].video} type="video/mp4" />
          </video>

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* CONTENT */}
          <div
            className="
              relative z-10 h-full flex flex-col justify-center items-start 
              px-[16px] sm:px-[32px] md:px-[60px] lg:px-[93px] 
              gap-[24px] sm:gap-[40px] md:gap-[60px]
            "
          >
            {/* TEXT */}
            <div>
              <p
                className="text-[#F0F0F0] font-montserrat 
                text-[16px] sm:text-[20px] md:text-[32px] 
                font-bold uppercase"
              >
                {slides[active].tag}
              </p>

              <h1
                className="
                  mt-2 text-[#F0F0F0] font-montserrat font-black
                  text-[24px] leading-[30px]
                  sm:text-[36px] sm:leading-[42px]
                  md:text-[52px] md:leading-[58px]
                  lg:text-[64px] lg:leading-[70px]
                  max-w-[90%] sm:max-w-[620px]
                "
              >
                {slides[active].title}
              </h1>
            </div>

            {/* BUTTON */}
            <button
              className="
                inline-flex items-center justify-center gap-[4px]
                bg-[#D0E46A] text-[#0F1112]
                px-[16px] py-[8px]
                sm:px-[20px] sm:py-[10px]
                md:px-[24px] md:py-[12px]
                text-[12px] sm:text-[14px] md:text-[18px]
                leading-[20px] sm:leading-[24px]
                font-bold font-montserrat
                rounded-[10px] sm:rounded-[12px]
                hover:opacity-90
                transition-all duration-200
              "
            >
              BOOK A FREE 30 MINS CONSULTATION
            </button>
          </div>

          {/* THUMBNAILS */}
          <div
            className="
            absolute bottom-3 sm:bottom-4 md:bottom-6 
            left-1/2 -translate-x-1/2 
            flex gap-2 sm:gap-3 z-20
          "
          >
            {slides.map((slide, i) => (
              <img
                key={i}
                src={slide.thumb}
                onClick={() => setActive(i)}
                className={`
                  w-[36px] h-[24px] 
                  sm:w-[48px] sm:h-[32px] 
                  md:w-[52px] md:h-[36px]
                  object-cover rounded-[6px] cursor-pointer
                  transition-all
                  ${
                    active === i
                      ? "border border-white scale-105"
                      : "opacity-60 hover:opacity-100"
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
