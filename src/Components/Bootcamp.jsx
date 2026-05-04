// // "use client";

// // const bootcamps = [
// //   {
// //     title: "AI Lego Animation Workshop",
// //     image: "/bootcamp/bootcamp1.png",
// //     duration: "35 HOURS",
// //     price: "USD 999.00",
// //     mode: "ONLINE",
// //   },
// //   {
// //     title: "AI Lego Animation Workshop",
// //     image: "/bootcamp/bootcamp2.jpg",
// //     duration: "35 HOURS",
// //     price: "USD 999.00",
// //     mode: "ONLINE",
// //   },
// //   {
// //     title: "AI Lego Animation Workshop",
// //     image: "/bootcamp/bootcamp3.jpg",
// //     duration: "35 HOURS",
// //     price: "USD 999.00",
// //     mode: "ONLINE",
// //   },
// // ];

// // export default function Bootcamps() {
// //   return (
// //     <section className="w-full bg-[#0B0F10] py-14">
// //       <div className="max-w-7xl mx-auto px-6">
// //         {/* TITLE */}
// //         <h2 className="text-white text-4xl font-semibold mb-10">
// //           AI Filmmaking Bootcamp
// //         </h2>

// //         {/* LIST */}
// //         <div className="flex flex-col gap-8">
// //           {bootcamps.map((item, i) => (
// //             <div key={i} className="rounded-2xl overflow-hidden">
// //               {/* TOP SECTION */}
// //               <div className="flex flex-col md:flex-row bg-[#dcdcdc] rounded-t-2xl">
// //                 {/* IMAGE */}
// //                 <img
// //                   src={item.image}
// //                   alt="bootcamp"
// //                   className="w-full md:w-[220px] h-[180px] object-cover"
// //                 />

// //                 {/* CONTENT */}
// //                 <div className="flex-1 px-8 py-6">
// //                   {/* TITLE */}
// //                   <h3 className="text-black text-3xl font-semibold mb-6">
// //                     {item.title}
// //                   </h3>

// //                   {/* INFO BOXES */}
// //                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
// //                     <div className="bg-[#cfcfcf] rounded-xl p-4">
// //                       <p className="text-xs text-black/60 uppercase">
// //                         ⏱ Duration
// //                       </p>
// //                       <p className="mt-1 font-semibold text-black">
// //                         {item.duration}
// //                       </p>
// //                     </div>

// //                     <div className="bg-[#cfcfcf] rounded-xl p-4">
// //                       <p className="text-xs text-black/60 uppercase">
// //                         💳 Pricing
// //                       </p>
// //                       <p className="mt-1 font-semibold text-black">
// //                         {item.price}
// //                       </p>
// //                     </div>

// //                     <div className="bg-[#cfcfcf] rounded-xl p-4">
// //                       <p className="text-xs text-black/60 uppercase">Mode</p>
// //                       <p className="mt-1 font-semibold text-black">
// //                         {item.mode}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* BOTTOM BUTTON */}
// //               <div className="bg-[#C7E36B] text-center py-4 text-base font-semibold text-black rounded-b-2xl">
// //                 RESERVE SPOT →
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// "use client";

// import { motion } from "framer-motion";

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
//     <section className="w-full bg-[#0B0F10] py-16">
//       <div className="max-w-7xl mx-auto px-6">

//         {/* TITLE */}
//         <motion.h2
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-white text-4xl font-semibold mb-12"
//         >
//           AI Filmmaking Bootcamp
//         </motion.h2>

//         {/* LIST */}
//         <div className="flex flex-col gap-10">
//           {bootcamps.map((item, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 60 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.2, duration: 0.6 }}
//               whileHover={{ scale: 1.02 }}
//               className="rounded-2xl overflow-hidden group transition-all duration-300"
//             >
//               {/* TOP */}
//               <div className="flex flex-col md:flex-row bg-[#dcdcdc] rounded-t-2xl relative overflow-hidden">

//                 {/* IMAGE */}
//                 <div className="overflow-hidden">
//                   <motion.img
//                     src={item.image}
//                     alt="bootcamp"
//                     className="w-full md:w-[240px] h-[200px] object-cover"
//                     whileHover={{ scale: 1.1 }}
//                     transition={{ duration: 0.5 }}
//                   />
//                 </div>

//                 {/* CONTENT */}
//                 <div className="flex-1 px-8 py-6">
//                   <h3 className="text-black text-3xl font-semibold mb-6">
//                     {item.title}
//                   </h3>

//                   {/* INFO */}
//                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

//                     {[
//                       { label: "⏱ Duration", value: item.duration },
//                       { label: "💳 Pricing", value: item.price },
//                       { label: "Mode", value: item.mode },
//                     ].map((info, idx) => (
//                       <motion.div
//                         key={idx}
//                         whileHover={{ y: -5 }}
//                         className="bg-white/60 backdrop-blur-md rounded-xl p-4 transition"
//                       >
//                         <p className="text-xs text-black/60 uppercase">
//                           {info.label}
//                         </p>
//                         <p className="mt-1 font-semibold text-black">
//                           {info.value}
//                         </p>
//                       </motion.div>
//                     ))}

//                   </div>
//                 </div>

//                 {/* GLOW EFFECT */}
//                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-white/20 blur-2xl"></div>
//               </div>

//               {/* BUTTON */}
//               <motion.div
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.97 }}
//                 className="bg-[#C7E36B] text-center py-4 text-base font-semibold text-black rounded-b-2xl cursor-pointer relative overflow-hidden group"
//               >
//                 <span className="relative z-10">RESERVE SPOT →</span>

//                 {/* hover glow */}
//                 <span className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-40 blur-xl transition duration-500"></span>
//               </motion.div>
//             </motion.div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }

// "use client";

// import { motion } from "framer-motion";

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
//     <section className="w-full bg-[#0B0F10] py-[64px] flex justify-center">
//       <div className="w-full max-w-[1180px] px-[16px]">
//         {/* TITLE */}
//         <motion.h2
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-[#F0F0F0] font-montserrat text-[40px] leading-[48px] font-semibold text-center mb-[48px]"
//         >
//           AI Filmmaking Bootcamp
//         </motion.h2>

//         {/* LIST */}
//         <div className="flex flex-col gap-[24px]">
//           {bootcamps.map((item, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 60 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.15, duration: 0.6 }}
//               className="inline-grid w-full gap-[8px] grid-cols-[266px_1fr] grid-rows-[200px_auto_auto] rounded-[20px] overflow-hidden"
//             >
//               {/* IMAGE */}
//               <img
//                 src={item.image}
//                 alt="bootcamp"
//                 className="w-[266px] h-[200px] object-cover rounded-tl-[20px] row-[1/span_1] col-[1/span_1]"
//               />

//               {/* TITLE */}
//               <div className="bg-[#E5E5E5] rounded-tr-[20px] flex flex-col justify-center items-start gap-[10px] px-[12px] py-[10px] h-[90px] row-[1/span_1] col-[2/span_1]">
//                 <h3 className="text-[#282A2C] font-montserrat text-[48px] leading-[56px] font-bold">
//                   {item.title}
//                 </h3>
//               </div>

//               {/* INFO CARDS */}
//               <div className="col-[2/span_1] flex gap-[8px]">
//                 {/* Duration */}
//                 <div className="flex-1 h-[81px] self-stretch bg-[#E5E5E5] rounded-[12px] px-[20px] py-[20px] flex flex-col justify-center items-start gap-[6px]">
//                   <p className="text-[#414243] font-montserrat text-[14px] leading-[20px] font-semibold">
//                     Duration
//                   </p>
//                   <p className="text-[#414243] font-montserrat text-[14px] leading-[20px] font-bold">
//                     {item.duration}
//                   </p>
//                 </div>

//                 {/* Pricing */}
//                 <div className="flex-1 h-[81px] self-stretch bg-[#E5E5E5] rounded-[12px] px-[20px] py-[20px] flex flex-col justify-center items-start gap-[6px]">
//                   <p className="text-[#414243] font-montserrat text-[14px] leading-[20px] font-semibold">
//                     Pricing
//                   </p>
//                   <p className="text-[#414243] font-montserrat text-[14px] leading-[20px] font-bold">
//                     {item.price}
//                   </p>
//                 </div>

//                 {/* Mode */}
//                 <div className="flex-1 h-[81px] self-stretch bg-[#E5E5E5] rounded-[12px] px-[20px] py-[20px] flex flex-col justify-center items-start gap-[6px]">
//                   <p className="text-[#414243] font-montserrat text-[14px] leading-[20px] font-semibold">
//                     Mode
//                   </p>
//                   <p className="text-[#414243] font-montserrat text-[14px] leading-[20px] font-bold">
//                     {item.mode}
//                   </p>
//                 </div>
//               </div>

//               {/* BUTTON */}
//               <motion.button
//                 whileTap={{ scale: 0.98 }}
//                 className="col-[1/span_2] flex w-full items-center justify-center gap-[4px] bg-[#D0E46A] text-[#0F1112] px-[30px] py-[12px] text-[18px] leading-[28px] font-bold font-montserrat rounded-b-[20px]"
//               >
//                 RESERVE SPOT →
//               </motion.button>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";

// import { motion } from "framer-motion";

// const bootcamps = [
//   {
//     title: "AI Lego Animation Workshop",
//     image: "/bootcamp/bootcamp1.png",
//     duration: "35 HOURS",
//     price: "USD 999.00",
//     mode: "ONLINE",
//   },
//   {
//     title: "AI Superhero Cinematic Workshop",
//     image: "/bootcamp/bootcamp2.jpg",
//     duration: "35 HOURS",
//     price: "USD 999.00",
//     mode: "ONLINE",
//   },
//   {
//     title: "AI Sci-Fi Movie Creator",
//     image: "/bootcamp/bootcamp3.jpg",
//     duration: "35 HOURS",
//     price: "USD 999.00",
//     mode: "ONLINE",
//   },
// ];
// export default function Bootcamps() {
//   return (
//     <section className="w-full bg-[#0B0F10] py-[64px] flex justify-center">
//       <div className="w-full max-w-[1180px] px-[16px] flex flex-col gap-[32px]">
//         {/* HEADING */}
//         <h1
//           className="text-[#F0F0F0] font-montserrat font-black
// text-[28px] leading-[34px]
// sm:text-[34px] sm:leading-[40px]
// md:text-[40px] md:leading-[48px]"
//         >
//           AI FILMMAKING WORKSHOPS
//         </h1>
//         <div className="w-full max-w-[1180px] px-[16px]">
//           <div className="flex flex-col gap-[24px]">
//             {bootcamps.map((item, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 60 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-[#0F1415] rounded-[20px] p-[8px]"
//               >
//                 {/* TOP SECTION */}
//                 <div className="flex gap-[8px]">
//                   {/* IMAGE */}
//                   <img
//                     src={item.image}
//                     alt="bootcamp"
//                     className="
//     w-[266px]
//     h-[180px]
//     object-cover
//     rounded-tl-[20px]
//     col-[1/span_1]
//     row-[1/span_1]
//   "
//                   />

//                   {/* RIGHT CONTENT */}
//                   <div className="flex-1 flex flex-col gap-[8px]">
//                     {/* TITLE */}
//                     <div className="bg-[#E5E5E5] rounded-[12px] h-[90px] px-[12px] py-[10px] flex flex-col justify-center w-full">
//                       <h3
//                         className="text-[#282A2C] font-montserrat font-bold
// text-[24px] leading-[36px]
// sm:text-[32px] sm:leading-[44px]
// md:text-[40px] md:leading-[56px]"
//                       >
//                         {item.title}
//                       </h3>
//                     </div>

//                     {/* INFO ROW */}
//                     <div className="flex gap-[8px]">
//                       {/* Duration */}
//                       <div className="flex-1 bg-[#DCDCDC] rounded-[8px] p-[20px] flex flex-col items-start gap-[6px]">
//                         <div className="flex items-center gap-[6px]">
//                           <img
//                             src="/Tagiconnew1.svg"
//                             alt=""
//                             className="w-[14px] h-[14px]  "
//                           />
//                           <p
//                             className="text-[#414243] font-montserrat font-semibold
// text-[14px] leading-[20px]"
//                           >
//                             Duration
//                           </p>
//                         </div>

//                         <p className="text-[14px] font-bold text-[#282A2C]">
//                           {item.duration}
//                         </p>
//                       </div>

//                       {/* Pricing */}
//                       <div className="flex-1 bg-[#DCDCDC] rounded-[8px] p-[20px] flex flex-col items-start gap-[6px]">
//                         <div className="flex items-center gap-[6px]">
//                           <img
//                             src="/Tagiconnew2.svg"
//                             alt="Pricing icon"
//                             className="w-[14px] h-[14px]"
//                           />
//                           <p
//                             className="text-[#414243] font-montserrat font-semibold
// text-[14px] leading-[20px]"
//                           >
//                             Pricing
//                           </p>
//                         </div>

//                         <p className="text-[14px] font-bold text-[#282A2C]">
//                           {item.price}
//                         </p>
//                       </div>

//                       {/* Mode */}
//                       <div className="flex-1 bg-[#DCDCDC] rounded-[8px] p-[20px] flex flex-col items-start gap-[6px]">
//                         <div className="flex items-center gap-[6px]">
//                           <img
//                             src="/Tagiconnew3.svg"
//                             alt="mode icon"
//                             className="w-[14px] h-[14px]"
//                           />
//                           <p
//                             className="text-[#414243] font-montserrat font-semibold
// text-[14px] leading-[20px]"
//                           >
//                             MODE
//                           </p>
//                         </div>

//                         <p className="text-[14px] font-bold text-[#282A2C]">
//                           {item.mode}
//                         </p>
//                       </div>

//                     </div>
//                   </div>
//                 </div>

//                 {/* BUTTON */}
//                 {/* <button className="mt-[8px] w-full bg-[#D0E46A] text-[#1A1A1A] py-[12px] rounded-b-[25px] font-bold">
//                 RESERVE SPOT <img src="/Arrowleft1.svg" alt="" />
//               </button> */}

//                 <button className="mt-[8px] w-full bg-[#D0E46A] text-[#1A1A1A] py-[12px] rounded-b-[25px] font-bold flex items-center justify-center gap-[6px]">
//                   RESERVE SPOT
//                   <img
//                     src="/Arrowleft2.svg"
//                     alt=""
//                     className="w-[16px] h-[16px]"
//                   />
//                 </button>
//               </motion.div>
//             ))}
//           </div>
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
    title: "AI Superhero Cinematic Workshop",
    image: "/bootcamp/bootcamp2.jpg",
    duration: "35 HOURS",
    price: "USD 999.00",
    mode: "ONLINE",
  },
  {
    title: "AI Sci-Fi Movie Creator",
    image: "/bootcamp/bootcamp3.jpg",
    duration: "35 HOURS",
    price: "USD 999.00",
    mode: "ONLINE",
  },
];

export default function Bootcamps() {
  return (
    <section className="w-full bg-[#0F1112] flex justify-center py-[40px] sm:py-[64px]">
      <div className="w-full max-w-[1180px] flex flex-col gap-[32px] sm:gap-[48px] px-[16px] sm:px-[24px] lg:px-0">
        {/* HEADING */}
        <h2 className="text-[#F0F0F0] font-montserrat font-black text-[22px] sm:text-[32px] md:text-[40px] text-center sm:text-left">
          AI FILMMAKING WORKSHOPS
        </h2>

        {/* LIST */}
        <div className="flex flex-col gap-[12px] sm:gap-[10px]">
          {bootcamps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-[#0F1415] rounded-[16px] sm:rounded-[20px] overflow-hidden"
            >
              {/* TOP SECTION (FIXED HERE) */}
              <div className="flex flex-col lg:flex-row gap-[10px] px-[12px] pt-[12px] pb-0 sm:px-[16px] sm:pt-[16px] sm:pb-0 lg:h-[260px]">
                {/* IMAGE */}
                <div className="w-full lg:w-[266px]">
                  <div className="w-full h-[160px] sm:h-[200px] lg:h-[200px] overflow-hidden rounded-tl-[16px] sm:rounded-tl-[20px]">
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex-1 flex flex-col gap-[8px] sm:gap-[10px]">
                  {/* TITLE */}
                  <div className="bg-[#DCDCDC] min-h-[80px] sm:h-[105px] px-[10px] sm:px-[12px] py-[8px] sm:py-[10px] flex items-center rounded-tr-[16px] sm:rounded-tr-[20px]">
                    <h3 className="text-[#282A2C] font-montserrat font-bold text-[18px] sm:text-[28px] md:text-[48px] leading-[26px] sm:leading-[34px] md:leading-[56px]">
                      {item.title}
                    </h3>
                  </div>

                  {/* INFO */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-[6px] sm:gap-[8px]">
                    {/* Duration */}
                    <div className="bg-[#DCDCDC] rounded-[6px] sm:rounded-[8px] p-[12px] sm:p-[20px] flex flex-col gap-[4px] sm:gap-[6px]">
                      <div className="flex items-center gap-[6px]">
                        <img
                          src="/Tagiconnew1.svg"
                          className="w-[12px] sm:w-[14px]"
                        />
                        <p className="text-[#414243] text-[10px] sm:text-[12px] font-semibold">
                          Duration
                        </p>
                      </div>
                      <p className="text-[#282A2C] text-[12px] sm:text-[14px] font-bold">
                        {item.duration}
                      </p>
                    </div>

                    {/* Pricing */}
                    <div className="bg-[#DCDCDC] rounded-[6px] sm:rounded-[8px] p-[12px] sm:p-[20px] flex flex-col gap-[4px] sm:gap-[6px]">
                      <div className="flex items-center gap-[6px]">
                        <img
                          src="/Tagiconnew2.svg"
                          className="w-[12px] sm:w-[14px]"
                        />
                        <p className="text-[#414243] text-[10px] sm:text-[12px] font-semibold">
                          Pricing
                        </p>
                      </div>
                      <p className="text-[#282A2C] text-[12px] sm:text-[14px] font-bold">
                        {item.price}
                      </p>
                    </div>

                    {/* Mode */}
                    <div className="bg-[#DCDCDC] rounded-[6px] sm:rounded-[8px] p-[12px] sm:p-[20px] flex flex-col gap-[4px] sm:gap-[6px]">
                      <div className="flex items-center gap-[6px]">
                        <img
                          src="/Tagiconnew3.svg"
                          className="w-[12px] sm:w-[14px]"
                        />
                        <p className="text-[#414243] text-[10px] sm:text-[12px] font-semibold">
                          Mode
                        </p>
                      </div>
                      <p className="text-[#282A2C] text-[12px] sm:text-[14px] font-bold">
                        {item.mode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* BUTTON (NO GAP NOW) */}
              <button className="w-full bg-[#D0E46A] text-[#1A1A1A] px-[20px] sm:px-[30px] py-[12px] sm:py-[12px] flex items-center justify-center gap-[4px] font-bold font-montserrat text-[12px] sm:text-[14px] rounded-b-[20px] sm:rounded-b-[25px] hover:opacity-90 active:scale-[0.98] transition-all duration-200">
                RESERVE SPOT
                <img
                  src="/Arrowleft2.svg"
                  className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px]"
                />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
