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
  "/Tools/newicon7.svg",
  "/Tools/newicon8.png",
  "/Tools/newicon9.png",
];

export default function Tools() {
  return (
    <section className="w-full bg-[#0B0F10] py-10 relative overflow-hidden">
      {/* SIDE FADE */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#0B0F10] to-transparent z-10"></div>
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#0B0F10] to-transparent z-10"></div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-20">
        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white text-3xl md:text-4xl font-semibold mb-14"
        >
          Tools we will use
        </motion.h2>

        {/* GRID */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {tools.map((tool, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{
                y: -8,
                scale: 1.05,
              }}
              className="relative group flex items-center justify-center h-24 md:h-28 rounded-2xl bg-[#2f2f2f] border border-white/5 backdrop-blur-lg overflow-hidden"
            >
              {/* ICON */}
              <img
                src={tool}
                alt="tool"
                className="h-10 md:h-12 object-contain opacity-70 group-hover:opacity-100 transition duration-300"
              />

              {/* GLOW EFFECT */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-white/10 blur-xl"></div>

              {/* BORDER GLOW */}
              <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/30 transition"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
