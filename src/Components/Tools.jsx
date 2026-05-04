// "use client";

// const tools = [
//   "/Tools/newicon1.svg",
//   "/Tools/newicon2.png",
//   "/Tools/newicon3.svg",
//   "/Tools/newicon4.png",
//   "/Tools/newicon5.png",
//   "/Tools/newicon6.png",
//   "/Tools/newicon7.svg",
//   "/Tools/newicon8.png",
//   "/Tools/newicon9.png",
//   "/Tools/newicon7.svg",
//   "/Tools/newicon8.png",
//   "/Tools/newicon9.png",
// ];

// export default function Tools() {
//   return (
//     <section className="w-full bg-[#0B0F10] py-4 relative overflow-hidden">
//       {/* SIDE FADE (LEFT + RIGHT) */}
//       <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#0B0F10] to-transparent z-10"></div>
//       <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#0B0F10] to-transparent z-10"></div>

//       <div className="max-w-6xl mx-auto px-6 text-center relative z-20">
//         {/* TITLE */}
//         <h2 className="text-white text-3xl md:text-4xl font-semibold mb-14">
//           Tools we will use
//         </h2>

//         {/* GRID */}
//         <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
//           {tools.map((tool, i) => (
//             <div
//               key={i}
//               className="
//                 flex items-center justify-center
//                 h-24 md:h-28
//                 rounded-2xl
//                 bg-[#2f2f2f]
//                 transition duration-300
//               "
//             >
//               <img
//                 src={tool}
//                 alt="tool"
//                 className="h-10 md:h-12 object-contain opacity-80"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

import { motion } from "framer-motion";

const tools = [
  "/Tools/newicon1.svg",
  "/Tools/newicon2.png",
  "/Tools/newicon3.svg",
  "/Tools/newicon4.png",
  "/Tools/newicon5.png",
  "/Tools/newicon6.png",
  "/Tools/newicon7.svg",
  "/Tools/newicon8.png",
  "/Tools/newicon9.png",
];

export default function Tools() {
  return (
    <section className="w-full bg-[#0F1112] flex justify-center py-[40px] sm:py-[64px] relative overflow-hidden">
      
      {/* SIDE FADE */}
      <div className="absolute left-0 top-0 h-full w-[40px] sm:w-[80px] md:w-[180px] bg-gradient-to-r from-[#0F1112] to-transparent z-10" />
      <div className="absolute right-0 top-0 h-full w-[40px] sm:w-[80px] md:w-[180px] bg-gradient-to-l from-[#0F1112] to-transparent z-10" />

      {/* INNER CONTAINER */}
      <div className="w-full max-w-[1180px] flex flex-col items-center gap-[28px] sm:gap-[48px] px-[16px] sm:px-[24px] lg:px-0 relative z-20">
        
        {/* HEADING */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
            text-[#F0F0F0]
            font-montserrat font-black text-center
            text-[20px] leading-[28px]
            sm:text-[28px] sm:leading-[36px]
            md:text-[32px] md:leading-[40px]
          "
        >
          TOOLS WE WILL USE
        </motion.h2>

        {/* ROWS */}
        <div className="w-full flex flex-col gap-[20px] sm:gap-[32px] overflow-hidden">
          
          {[0, 1].map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              className="flex gap-[12px] sm:gap-[20px] md:gap-[24px]"
              animate={{
                x: rowIndex % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"],
              }}
              transition={{
                duration: window.innerWidth < 640 ? 18 : 24, // ✅ faster mobile
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...tools, ...tools].map((tool, i) => {
                const sizes = [
                  "h-[48px] w-[48px] sm:h-[64px] sm:w-[64px]",
                  "h-[60px] w-[60px] sm:h-[80px] sm:w-[80px]",
                  "h-[72px] w-[72px] sm:h-[96px] sm:w-[96px]",
                ];

                return (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -4, 0] }} // ✅ softer on mobile
                    transition={{
                      duration: 4 + (i % 2),
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`
                      flex items-center justify-center
                      ${sizes[i % sizes.length]}
                      bg-[#2A2D2E]
                      rounded-[12px] sm:rounded-[16px]
                      flex-shrink-0
                      hover:scale-105
                      transition
                    `}
                  >
                    <div className="w-[50%] h-[50%] flex items-center justify-center">
                      <img
                        src={tool}
                        alt="tool"
                        className="max-w-full max-h-full object-contain opacity-80"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}