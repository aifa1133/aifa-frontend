// export default function Companies() {
//   const logos = [
//     "/logos/nb1.svg",
//     "/logos/nb2svg.svg",
//     "/logos/nb3.svg",
//     "/logos/Vector.svg",
//     "/logos/Vector1.svg",

//     "/logos/logo1.png",
//   ];

//   return (
//     <section className="w-full bg-[#0b0b0b] py-10">
//       <div className="max-w-7xl mx-auto px-6 text-center">
//         {/* Title */}
//         <p className="text-gray-400 text-xs tracking-widest uppercase mb-8">
//           Our learners works at
//         </p>

//         {/* Logos */}
//         <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
//           {logos.map((logo, i) => (
//             <img
//               key={i}
//               src={logo}
//               alt="logo"
//               className="h-6 md:h-8 object-contain opacity-70 hover:opacity-100 transition duration-300"
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";

export default function Companies() {
  const logos = [
    { src: "/logos/companylogo1.png", scale: 1 },
    { src: "/logos/companylogo2.png", scale: 1 },

    // { src: "/logos/companylogo4.png", scale: 1 },
    // { src: "/logos/companylogo5.png", scale: 3.2 }, // Meta - bigger

    // { src: "/logos/companylogo7.png", scale: 1 }, // Epic Games - bigger
    { src: "/logos/companylogo8.png", scale: 1 },
    { src: "/logos/companylogo9.png", scale: 1 },
    { src: "/logos/companylogo10.png", scale: 1 },
  ];

  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrame;

    // SMOOTH SPEED
    const speed = 1;

    const autoScroll = () => {
      if (!isPaused) {
        el.scrollLeft += speed;

        // SMOOTH INFINITE LOOP
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
      }

      animationFrame = requestAnimationFrame(autoScroll);
    };

    animationFrame = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused]);

  return (
    <section className="w-full bg-[#0F1112] flex justify-center py-[40px] sm:py-[64px] overflow-hidden">
      {/* CONTAINER */}
      <div className="w-full max-w-[1440px] flex flex-col items-center gap-[24px] px-[16px] sm:px-[24px] lg:px-0">
        {/* TITLE */}
        <h2
          className="
            text-[#F0F0F0]
            text-center
            font-montserrat
            font-black
            text-[18px]
            leading-[26px]
            sm:text-[22px]
            sm:leading-[30px]
            md:text-[24px]
            md:leading-[32px]
            uppercase
          "
        >
          OUR LEARNERS WORKS AT
        </h2>

        {/* SCROLLER WRAPPER */}
        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* LEFT FADE */}
          <div className="absolute left-0 top-0 z-10 h-full w-[50px] sm:w-[80px] bg-gradient-to-r from-[#0F1112] to-transparent pointer-events-none" />

          {/* RIGHT FADE */}
          <div className="absolute right-0 top-0 z-10 h-full w-[50px] sm:w-[80px] bg-gradient-to-l from-[#0F1112] to-transparent pointer-events-none" />

          {/* TRACK */}
          <div
            ref={scrollRef}
            className="
              flex
              items-center
         gap-x-[28px] sm:gap-x-[40px]
              overflow-x-hidden
              whitespace-nowrap
              scrollbar-hide
              py-[16px]
            "
          >
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="
                  flex
                  items-center
                  justify-center
                  min-w-[100px]
                  sm:min-w-[140px]
                  md:min-w-[160px]
                  relative
                  group
                  flex-shrink-0
                "
              >
                {/* LOGO */}
                <img
                  src={logo.src}
                  alt={`company-logo-${index}`}
                  style={{
                    transform: `scale(${logo.scale})`,
                  }}
                  className="
    h-[32px]
    sm:h-[32px]
    md:h-[40px]

    max-w-[160px]
    object-contain

    opacity-90
    brightness-110

    transition-all
    duration-300

    hover:opacity-100
    hover:brightness-125

    relative
    z-10
  "
                />
                {/* GLOW EFFECT */}
                <div
                  className="
                    absolute
                    w-[60px]
                    h-[30px]
                    bg-white/10
                    blur-2xl
                    opacity-0
                    transition-all
                    duration-500
                    group-hover:opacity-100
                  "
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
