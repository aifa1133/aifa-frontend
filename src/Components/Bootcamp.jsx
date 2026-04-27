// "use client";

// const bootcamps = [
//   {
//     title: "AI Lego Animation Workshop",
//     image: "/bootcamp/bootcamp1.png",
//     duration: "35 HOURS",
//     price: "USD 999.00",
//     mode: "ONLINE",
//   },
//   {
//     title: "AI Lego Animation Workshop",
//     image: "/bootcamp/bootcamp2.jpg",
//     duration: "35 HOURS",
//     price: "USD 999.00",
//     mode: "ONLINE",
//   },
//   {
//     title: "AI Lego Animation Workshop",
//     image: "/bootcamp/bootcamp3.jpg",
//     duration: "35 HOURS",
//     price: "USD 999.00",
//     mode: "ONLINE",
//   },
// ];

// export default function Bootcamps() {
//   return (
//     <section className="w-full bg-[#0B0F10] py-14">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* TITLE */}
//         <h2 className="text-white text-4xl font-semibold mb-10">
//           AI Filmmaking Bootcamp
//         </h2>

//         {/* LIST */}
//         <div className="flex flex-col gap-8">
//           {bootcamps.map((item, i) => (
//             <div key={i} className="rounded-2xl overflow-hidden">
//               {/* TOP SECTION */}
//               <div className="flex flex-col md:flex-row bg-[#dcdcdc] rounded-t-2xl">
//                 {/* IMAGE */}
//                 <img
//                   src={item.image}
//                   alt="bootcamp"
//                   className="w-full md:w-[220px] h-[180px] object-cover"
//                 />

//                 {/* CONTENT */}
//                 <div className="flex-1 px-8 py-6">
//                   {/* TITLE */}
//                   <h3 className="text-black text-3xl font-semibold mb-6">
//                     {item.title}
//                   </h3>

//                   {/* INFO BOXES */}
//                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                     <div className="bg-[#cfcfcf] rounded-xl p-4">
//                       <p className="text-xs text-black/60 uppercase">
//                         ⏱ Duration
//                       </p>
//                       <p className="mt-1 font-semibold text-black">
//                         {item.duration}
//                       </p>
//                     </div>

//                     <div className="bg-[#cfcfcf] rounded-xl p-4">
//                       <p className="text-xs text-black/60 uppercase">
//                         💳 Pricing
//                       </p>
//                       <p className="mt-1 font-semibold text-black">
//                         {item.price}
//                       </p>
//                     </div>

//                     <div className="bg-[#cfcfcf] rounded-xl p-4">
//                       <p className="text-xs text-black/60 uppercase">Mode</p>
//                       <p className="mt-1 font-semibold text-black">
//                         {item.mode}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* BOTTOM BUTTON */}
//               <div className="bg-[#C7E36B] text-center py-4 text-base font-semibold text-black rounded-b-2xl">
//                 RESERVE SPOT →
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { motion } from "framer-motion";

const bootcamps = [
  {
    title: "AI Lego Animation Workshop",
    image: "/bootcamp/bootcamp1.png",
    duration: "35 HOURS",
    price: "USD 999.00",
    mode: "ONLINE",
  },
  {
    title: "AI Lego Animation Workshop",
    image: "/bootcamp/bootcamp2.jpg",
    duration: "35 HOURS",
    price: "USD 999.00",
    mode: "ONLINE",
  },
  {
    title: "AI Lego Animation Workshop",
    image: "/bootcamp/bootcamp3.jpg",
    duration: "35 HOURS",
    price: "USD 999.00",
    mode: "ONLINE",
  },
];

export default function Bootcamps() {
  return (
    <section className="w-full bg-[#0B0F10] py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white text-4xl font-semibold mb-12"
        >
          AI Filmmaking Bootcamp
        </motion.h2>

        {/* LIST */}
        <div className="flex flex-col gap-10">
          {bootcamps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl overflow-hidden group transition-all duration-300"
            >
              {/* TOP */}
              <div className="flex flex-col md:flex-row bg-[#dcdcdc] rounded-t-2xl relative overflow-hidden">

                {/* IMAGE */}
                <div className="overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt="bootcamp"
                    className="w-full md:w-[240px] h-[200px] object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* CONTENT */}
                <div className="flex-1 px-8 py-6">
                  <h3 className="text-black text-3xl font-semibold mb-6">
                    {item.title}
                  </h3>

                  {/* INFO */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    
                    {[
                      { label: "⏱ Duration", value: item.duration },
                      { label: "💳 Pricing", value: item.price },
                      { label: "Mode", value: item.mode },
                    ].map((info, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -5 }}
                        className="bg-white/60 backdrop-blur-md rounded-xl p-4 transition"
                      >
                        <p className="text-xs text-black/60 uppercase">
                          {info.label}
                        </p>
                        <p className="mt-1 font-semibold text-black">
                          {info.value}
                        </p>
                      </motion.div>
                    ))}

                  </div>
                </div>

                {/* GLOW EFFECT */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-white/20 blur-2xl"></div>
              </div>

              {/* BUTTON */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#C7E36B] text-center py-4 text-base font-semibold text-black rounded-b-2xl cursor-pointer relative overflow-hidden group"
              >
                <span className="relative z-10">RESERVE SPOT →</span>

                {/* hover glow */}
                <span className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-40 blur-xl transition duration-500"></span>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}