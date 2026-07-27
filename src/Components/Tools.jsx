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

// "use client";

// import { motion } from "framer-motion";

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
//   "/Tools/newicon9.png",
// ];

// export default function Tools() {
//   return (
//     <section
//       className="
//         w-full
//         bg-[#0F1112]
//         flex
//         justify-center
//         items-center
//         relative
//         overflow-hidden

//         px-[16px]
//         sm:px-[40px]
//         md:px-[60px]
//         lg:px-[93px]

//         py-[40px]
//         sm:py-[64px]
//       "
//     >
//       {/* LEFT SHADOW */}
//       <div
//         className="
//     absolute
//     left-0
//     top-0
//     h-full
//     w-[60px]
// sm:w-[120px]
//     z-40
//     pointer-events-none
//   "
//         style={{
//           background:
//             "linear-gradient(to right, #0F1112 0%, rgba(15,17,18,0.98) 20%, rgba(15,17,18,0.92) 40%, rgba(15,17,18,0.75) 60%, rgba(15,17,18,0.4) 80%, transparent 100%)",
//         }}
//       />

//       {/* RIGHT SHADOW */}
//       <div
//         className="
//     absolute
//     right-0
//     top-0
//     h-full
//    w-[60px]
// sm:w-[120px]
//     z-40
//     pointer-events-none
//   "
//         style={{
//           background:
//             "linear-gradient(to left, #0F1112 0%, rgba(15,17,18,0.98) 20%, rgba(15,17,18,0.92) 40%, rgba(15,17,18,0.75) 60%, rgba(15,17,18,0.4) 80%, transparent 100%)",
//         }}
//       />
//       {/* MAIN CONTAINER */}
//       <div
//         className="
//           w-full
//           max-w-[1400px]

//           flex
//           flex-col
//           justify-center
//           items-center

//           gap-[28px]
//           sm:gap-[48px]

//           relative
//           z-20
//         "
//       >
//         {/* HEADING */}
//         <motion.h2
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="
//             text-[#F0F0F0]
//             text-center
//             font-montserrat
//             font-black

//             text-[20px]
//             leading-[28px]

//             sm:text-[28px]
//             sm:leading-[36px]

//             md:text-[32px]
//             md:leading-[40px]
//           "
//         >
//           TOOLS WE WILL USE
//         </motion.h2>

//         {/* ROWS */}
//         <div className="w-full flex flex-col gap-[20px] sm:gap-[32px] overflow-hidden">
//           {[0, 1].map((row, rowIndex) => (
//             <motion.div
//               key={rowIndex}
//               className="flex gap-[16px]"
//               animate={{
//                 x: rowIndex % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"],
//               }}
//               transition={{
//                 duration: window.innerWidth < 640 ? 16 : 22,
//                 repeat: Infinity,
//                 ease: "linear",
//               }}
//             >
//               {[...tools, ...tools].map((tool, i) => (
//                 <motion.div
//                   key={i}
//                   animate={{ y: [0, -4, 0] }}
//                   transition={{
//                     duration: 4 + (i % 2),
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                   }}
//                   className="
//             group

//             flex
//            w-[140px]
// sm:w-[170px]

// h-[120px]
// sm:h-[140px]

//             p-[20px]

//             justify-center
//             items-center

//             gap-[10px]

//             rounded-[15px]

//             bg-[#303133]

//             flex-shrink-0
//             relative
//             overflow-hidden

//             transition-all
//             duration-300

//             hover:bg-[#3A3B3D]
//             hover:scale-[1.03]
//           "
//                 >
//                   {/* CENTER LIGHT EFFECT */}
//                   <div
//                     className="
//               absolute
//               inset-0

//               bg-gradient-to-r
//               from-transparent
//               via-white/[0.05]
//               to-transparent
//             "
//                   />

//                   {/* HOVER GLOW */}
//                   <div
//                     className="
//               absolute
//               inset-0

//               bg-white/5

//               opacity-0
//               group-hover:opacity-100

//               transition-all
//               duration-500
//             "
//                   />

//                   {/* IMAGE BOX */}
//                   <div
//                     className="
//     w-[100px]
//     h-[100px]

//     flex
//     justify-center
//     items-center

//     flex-shrink-0
//     aspect-square

//     relative
//     z-10
//   "
//                   >
//                     <img
//                       src={tool}
//                       alt="tool"
//                       className="
//       w-[100px]
//       h-[100px]

//       object-cover

//       mix-blend-luminosity

//       opacity-95
//       brightness-110

//       transition-all
//       duration-300

//       group-hover:scale-110
//       group-hover:brightness-125
//     "
//                     />
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
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
  "/Tools/newicon10.png",
  "/Tools/newicon11.png",
  "/Tools/newicon12.png",
];

export default function Tools() {
  return (
    <section
      className="
        w-full
        bg-[#0F1112]
        flex
        justify-center
        overflow-hidden

        px-[16px]
        sm:px-[40px]
        md:px-[60px]
        lg:px-[93px]

        py-[40px]
        sm:py-[64px]
      "
    >
      <div
        className="
          w-full
          max-w-[1400px]

          flex
          flex-col
          items-center

          gap-[32px]
          sm:gap-[48px]
        "
      >
        {/* HEADING */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            text-[#F0F0F0]
            text-center

            font-montserrat
            font-black

            text-[20px]
            leading-[28px]

            sm:text-[28px]
            sm:leading-[36px]

            md:text-[32px]
            md:leading-[40px]
          "
        >
          TOOLS WE WILL USE
        </motion.h2>

        {/* TOOL GRID */}
        {/* TOOLS ROWS */}
        <div className="w-full flex flex-col gap-[20px] overflow-hidden">
          {/* FIRST ROW */}
          <motion.div
            className="flex gap-[20px] w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...tools.slice(0, 6), ...tools.slice(0, 6)].map((tool, i) => (
              <div
                key={i}
                className="
          w-[190px]
          sm:w-[210px]

          h-[140px]
          sm:h-[160px]

          flex
          items-center
          justify-center

          bg-[#303133]
          rounded-[15px]

          flex-shrink-0
          overflow-hidden

          group
        "
              >
                <img
                  src={tool}
                  alt="tool"
                  className="
            max-w-[100px]
            max-h-[100px]

            w-auto
            h-auto

            object-contain
            mix-blend-luminosity

            transition-all
            duration-300

            group-hover:scale-110
          "
                />
              </div>
            ))}
          </motion.div>

          {/* SECOND ROW */}
          <motion.div
            className="flex gap-[20px] w-max"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...tools.slice(6, 12), ...tools.slice(6, 12)].map((tool, i) => (
              <div
                key={i}
                className="
          w-[190px]
          sm:w-[210px]

          h-[140px]
          sm:h-[160px]

          flex
          items-center
          justify-center

          bg-[#303133]
          rounded-[15px]

          flex-shrink-0
          overflow-hidden

          group
        "
              >
                <img
                  src={tool}
                  alt="tool"
                  className="
            max-w-[100px]
            max-h-[100px]

            w-auto
            h-auto

            object-contain
            mix-blend-luminosity

            transition-all
            duration-300

            group-hover:scale-110
          "
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
