"use client";

export default function Companies() {
  const logos = [
    { src: "/logos/companylogo1.png" },
    { src: "/logos/companylogo2.png" },
    { src: "/logos/companylogo8.png" },
    { src: "/logos/companylogo9.png" },
    { src: "/logos/companylogo10.png" },
  ];

  // Triple the list so the loop is seamless at any screen width
  const track = [...logos, ...logos, ...logos];

  return (
    <section className="w-full bg-[#0F1112] flex justify-center py-[40px] sm:py-[64px] overflow-hidden">
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .marquee-track {
          animation: marquee 22s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="w-full max-w-[1440px] flex flex-col items-center gap-[24px]">
        {/* TITLE */}
        <h2 className="text-[#F0F0F0] text-center font-montserrat font-black text-[18px] sm:text-[22px] md:text-[24px] uppercase px-4">
          OUR LEARNERS WORKS AT
        </h2>

        {/* SCROLLER */}
        <div className="relative w-full overflow-hidden">
          {/* LEFT FADE */}
          <div className="absolute left-0 top-0 z-10 h-full w-[60px] sm:w-[100px] bg-gradient-to-r from-[#0F1112] to-transparent pointer-events-none" />
          {/* RIGHT FADE */}
          <div className="absolute right-0 top-0 z-10 h-full w-[60px] sm:w-[100px] bg-gradient-to-l from-[#0F1112] to-transparent pointer-events-none" />

          {/* TRACK */}
          <div className="marquee-track flex items-center gap-x-[48px] sm:gap-x-[72px] py-[16px] w-max">
            {track.map((logo, i) => (
              <img
                key={i}
                src={logo.src}
                alt={`company-${i}`}
                className="h-[32px] sm:h-[36px] md:h-[42px] max-w-[160px] object-contain opacity-80 brightness-110 hover:opacity-100 hover:brightness-125 transition-all duration-300 flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
