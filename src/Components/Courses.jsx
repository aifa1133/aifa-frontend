// "use client";

// import { ChevronLeft, ChevronRight } from "lucide-react";

// const courses = [
//   {
//     title: "Google Flow Masterclass",
//     image: "/courses/v1.png",
//     duration: "1h 10m",
//     price: "₹49.00",
//   },
//   {
//     title: "Kling AI Video Masterclass",
//     image: "/courses/v2.png",
//     duration: "1h 10m",
//     price: "₹49.00",
//   },
//   {
//     title: "AI Background Magic",
//     image: "/courses/v3.png",
//     duration: "1h 10m",
//     price: "₹49.00",
//   },
// ];

// export default function Courses() {
//   return (
//     <section className="w-full bg-[#0B0F10] py-16">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-10">
//           <h2 className="text-white text-3xl md:text-4xl font-semibold">
//             Self Paced Courses
//           </h2>

//           <div className="flex gap-3">
//             <button className="bg-[#C7E36B] p-3 rounded-md">
//               <ChevronLeft size={18} />
//             </button>
//             <button className="bg-[#C7E36B] p-3 rounded-md">
//               <ChevronRight size={18} />
//             </button>
//           </div>
//         </div>

//         {/* CARDS */}
//         <div className="grid md:grid-cols-3 gap-6">
//           {courses.map((course, i) => (
//             <div
//               key={i}
//               className="bg-[#111516] border border-white/10 rounded-xl overflow-hidden"
//             >
//               {/* IMAGE */}
//               <div className="relative">
//                 <img
//                   src={course.image}
//                   alt={course.title}
//                   className="w-full h-[220px] object-cover"
//                 />

//                 {/* DURATION */}
//                 <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-md">
//                   {course.duration}
//                 </span>
//               </div>

//               {/* CONTENT */}
//               <div className="p-5">
//                 <h3 className="text-white text-base font-semibold mb-3">
//                   {course.title}
//                 </h3>

//                 {/* PRICE */}
//                 <div className="flex items-center gap-2 text-sm mb-5">
//                   <span className="text-[#C7E36B] font-semibold">95% off</span>
//                   <span className="line-through text-gray-400">₹799</span>
//                 </div>

//                 {/* BUTTON */}
//                 <button className="w-full bg-[#E5E5E5] text-black py-2 rounded-md text-sm font-medium hover:bg-white transition">
//                   Buy {course.price}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* BOTTOM BUTTON */}
//         <div className="flex justify-center mt-12">
//           <button className="bg-[#C7E36B] text-black px-6 py-3 text-sm font-semibold rounded-md">
//             + Explore Courses
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const courses = [
  {
    title: "Google Flow Masterclass",
    image: "/courses/v1.png",
    duration: "1h 10m",
  },
  {
    title: "Kling AI Video Masterclass",
    image: "/courses/v2.png",
    duration: "1h 10m",
  },
  {
    title: "AI Background Magic",
    image: "/courses/v3.png",
    duration: "1h 10m",
  },
];

export default function Courses() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full overflow-x-hidden bg-[#0F1112] flex justify-center py-[40px] sm:py-[64px]">
      <div className="w-full max-w-[1180px] flex flex-col gap-[32px] sm:gap-[48px] px-[16px] sm:px-[24px] lg:px-0">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-[16px]">
          <h2 className="text-[#F0F0F0] font-montserrat font-black text-[22px] sm:text-[32px] md:text-[40px] text-center sm:text-left">
            SELF PACED COURSES
          </h2>

          {/* arrows only desktop */}
          <div className="hidden sm:flex gap-[10px]">
            <button
              onClick={() => scroll("left")}
              className="bg-[#D0E46A] p-[12px] rounded-[8px]"
            >
              ←
            </button>
            <button
              onClick={() => scroll("right")}
              className="bg-[#D0E46A] p-[12px] rounded-[8px]"
            >
              →
            </button>
          </div>
        </div>

        {/* CARDS */}
        <div
          ref={scrollRef}
          className="
            flex flex-col
            sm:flex-row
            gap-[16px] sm:gap-[24px]

            overflow-x-hidden sm:overflow-x-auto
          "
        >
          {courses.map((course, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="
                w-full
                sm:min-w-[300px]
                md:min-w-[336px]

                bg-[#111516]
                border border-white/10
                rounded-[12px]
                overflow-hidden
                group
                transition-all duration-300
              "
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-[200px] sm:h-[240px] md:h-[261px] object-cover"
                />

                <span className="absolute top-[10px] left-[10px] bg-black/70 text-white text-[12px] px-[8px] py-[4px] rounded-[6px]">
                  {course.duration}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-[16px] sm:p-[24px] flex flex-col gap-[8px]">
                <h3 className="text-[#F0F0F0] font-bold text-[14px] sm:text-[16px]">
                  {course.title}
                </h3>

                <div className="flex gap-[6px] text-[12px] sm:text-[14px]">
                  <span className="text-[#D0E46A] font-bold">60% OFF</span>
                  <span className="line-through text-gray-400">₹999</span>
                </div>

                <button className="mt-[8px] w-full bg-white text-black py-[10px] rounded-[6px] font-semibold">
                  BUY ₹399
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* BUTTON */}
        <div className="flex justify-center">
          <button className="bg-[#D0E46A] text-black px-[24px] py-[12px] rounded-[10px] font-bold">
            EXPLORE COURSES
          </button>
        </div>
      </div>
    </section>
  );
}
