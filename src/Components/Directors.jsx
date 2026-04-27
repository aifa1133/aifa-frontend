// "use client";

// const directors = [
//   {
//     name: "Sherin",
//     role: "Head of Product",
//     image: "/team/team3.png",
//   },
//   {
//     name: "Ravi Teja",
//     role: "Head of Academics",
//     image: "/team/team5.png",
//   },
//   {
//     name: "E Arun Kumar",
//     role: "Head of Product",
//     image: "/team/team3.png",
//   },
//   {
//     name: "Satyarth",
//     role: "Head of Product",
//     image: "/team/team4.png",
//   },
// ];

// export default function Directors() {
//   return (
//     <section className="w-full bg-[#0B0F10] py-16 md:py-24 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-10 md:gap-16">
//         {/* LEFT */}
//         <div className="flex-1 text-center md:text-left">
//           <h2 className="text-white text-3xl md:text-5xl font-medium leading-tight mb-4 md:mb-6">
//             The AI Directors era <br /> has arrived
//           </h2>

//           <p className="text-gray-400 text-sm md:text-base mb-6 md:mb-8 max-w-md mx-auto md:mx-0">
//             From vision to final frame, work with the most renowned AI Video
//             Directors to create scroll-stopping content and campaigns that drive
//             real impact.
//           </p>

//           <button className="bg-[#C7E36B] text-black px-5 md:px-6 py-2 md:py-3 text-sm font-medium rounded-md">
//             + Find your AI Director →
//           </button>
//         </div>

//         {/* RIGHT */}
//         <div className="flex-1 relative flex justify-center items-center w-full">
//           {/* 🔥 BACK LINE */}
//           <div className="hidden md:block absolute top-1/2 w-[120%] h-[1px] bg-white/20 -translate-y-1/2"></div>

//           {/* MOBILE → SCROLL */}
//           <div className="flex md:hidden gap-4 overflow-x-auto px-2 w-full">
//             {directors.map((item, i) => (
//               <div
//                 key={i}
//                 className="min-w-[160px] h-[240px] rounded-[20px] overflow-hidden border border-white/10 bg-black"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-full h-full object-cover"
//                 />

//                 <div className="absolute bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3 w-full">
//                   <p className="text-white text-xs font-semibold">
//                     {item.name}
//                   </p>
//                   <p className="text-gray-300 text-[10px]">{item.role}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* DESKTOP STACK */}
//           <div className="hidden md:flex relative items-center justify-center">
//             {directors.map((item, i) => {
//               const isCenter = i === 1;

//               return (
//                 <div
//                   key={i}
//                   className={`
//                     absolute transition-all duration-500
//                     w-48 md:w-56 h-80 md:h-[360px]
//                     rounded-[28px] overflow-hidden
//                     bg-black
//                     ${
//                       isCenter
//                         ? "z-30 scale-110 border border-white/40 shadow-xl"
//                         : "z-10 opacity-60 scale-95 border border-white/10"
//                     }
//                   `}
//                   style={{
//                     transform: `translateX(${(i - 1) * 150}px)`,
//                   }}
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-full h-full object-cover"
//                   />

//                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
//                     <p className="text-white text-sm font-semibold">
//                       {item.name}
//                     </p>
//                     <p className="text-gray-300 text-xs">{item.role}</p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const directors = [
  { name: "Sherin", role: "Head of Product", image: "/team/team3.png" },
  { name: "Ravi Teja", role: "Head of Academics", image: "/team/team5.png" },
  { name: "E Arun Kumar", role: "Head of Product", image: "/team/team3.png" },
  { name: "Satyarth", role: "Head of Product", image: "/team/team4.png" },
];

export default function Directors() {
  const [active, setActive] = useState(1);

  // 🎬 AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % directors.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-[#0B0F10] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
        {/* LEFT */}
        <div className="flex-1">
          <h2 className="text-white text-5xl font-semibold mb-6 leading-tight">
            The AI Directors era <br /> has arrived
          </h2>

          <p className="text-gray-400 mb-8 max-w-md">
           From vision to final frame, work with the most renowned AI Video
             Directors to create scroll-stopping content and campaigns that drive
             real impact.
          </p>

          <button className="bg-[#C7E36B] text-black px-6 py-3 rounded-md font-medium hover:scale-105 transition">
            + Find your AI Director →
          </button>
        </div>

        {/* RIGHT - ADVANCED CAROUSEL */}
        <div className="flex-1 relative flex justify-center items-center h-[420px]">
          {directors.map((item, i) => {
            const offset = i - active;

            return (
              <motion.div
                key={i}
                onClick={() => setActive(i)}
                animate={{
                  x: offset * 180,
                  scale: offset === 0 ? 1.15 : 0.85,
                  opacity: offset === 0 ? 1 : 0.4,
                  filter: offset === 0 ? "blur(0px)" : "blur(3px)",
                  zIndex: offset === 0 ? 30 : 10,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                }}
                className="absolute cursor-pointer"
              >
                {/* CARD */}
                <div className="w-56 h-[360px] rounded-[28px] overflow-hidden relative bg-black group border border-white/10">
                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                  {/* TEXT */}
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-semibold">{item.name}</p>
                    <p className="text-gray-300 text-sm">{item.role}</p>
                  </div>

                  {/* GLOW */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-white/10 blur-xl"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
