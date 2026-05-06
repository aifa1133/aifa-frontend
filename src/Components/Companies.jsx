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
    "/logos/companylogo1.png",
    "/logos/companylogo2.png",
    "/logos/companylogo3.png",
    "/logos/companylogo4.png",
    "/logos/companylogo5.jpg",
    "/logos/companylogo6.png",
    "/logos/companylogo6.png",
  ];

  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let frame;
    const speed = window.innerWidth < 640 ? 0.6 : 0.4; // ✅ faster on mobile

    const scroll = () => {
      if (!isPaused) {
        el.scrollLeft += speed;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      frame = requestAnimationFrame(scroll);
    };

    frame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(frame);
  }, [isPaused]);

  return (
    <section className="w-full bg-[#0F1112] flex justify-center py-[40px] sm:py-[64px]">
      {/* INNER CONTAINER */}
      <div className="w-full max-w-[1180px] flex flex-col items-center gap-[20px] sm:gap-[26px] px-[16px] sm:px-[24px] lg:px-0">
        {/* TITLE */}
        <p
          className="
          text-[#F0F0F0]
          font-montserrat font-black text-center
          text-[16px] leading-[24px]
          sm:text-[20px] sm:leading-[28px]
          md:text-[24px] md:leading-[32px]
        "
        >
          OUR LEARNERS WORKS AT
        </p>

        {/* SCROLLER */}
        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* LEFT FADE */}
          <div className="absolute left-0 top-0 h-full w-[40px] sm:w-[60px] md:w-[80px] bg-gradient-to-r from-[#0F1112] to-transparent z-10" />

          {/* RIGHT FADE */}
          <div className="absolute right-0 top-0 h-full w-[40px] sm:w-[60px] md:w-[80px] bg-gradient-to-l from-[#0F1112] to-transparent z-10" />

          {/* TRACK */}
          <div
            ref={scrollRef}
            className="
              flex items-center 
              gap-[20px] sm:gap-[40px] md:gap-[48px] 
              overflow-x-auto scrollbar-hide
              scroll-smooth
            "
          >
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="
                  flex items-center justify-center 
                  min-w-[80px] sm:min-w-[120px] md:min-w-[140px] 
                  group relative
                "
              >
                <img
                  src={logo}
                  alt="logo"
                  className="
                    h-[20px] sm:h-[28px] md:h-[32px]
                    object-contain
                    grayscale opacity-60
                    group-hover:grayscale-0 group-hover:opacity-100
                    transition-all duration-300
                  "
                />

                {/* glow */}
                <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 blur-xl bg-white/10 w-[40px] h-[20px] sm:w-[60px] sm:h-[30px]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
