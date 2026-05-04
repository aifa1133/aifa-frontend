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
    price: "₹49.00",
  },
  {
    title: "Kling AI Video Masterclass",
    image: "/courses/v2.png",
    duration: "1h 10m",
    price: "₹49.00",
  },
  {
    title: "AI Background Magic",
    image: "/courses/v3.png",
    duration: "1h 10m",
    price: "₹49.00",
  },
];

export default function Courses() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollAmount = window.innerWidth < 640 ? 260 : 300; // ✅ mobile optimized

    el.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-[#0F1112] flex justify-center py-[40px] sm:py-[64px]">
      <div className="w-full max-w-[1180px] flex flex-col gap-[32px] sm:gap-[48px] px-[16px] sm:px-[24px] lg:px-0">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-[16px] sm:gap-0">
          <h2 className="text-[#F0F0F0] font-montserrat font-black text-[22px] sm:text-[32px] md:text-[40px] text-center sm:text-left">
            SELF PACED COURSES
          </h2>

          <div className="flex gap-[10px]">
            <button
              onClick={() => scroll("left")}
              className="bg-[#D0E46A] p-[10px] sm:p-[12px] rounded-[8px]"
            >
              <img src="/Arrowleft1.svg" className="w-[16px] sm:w-[18px]" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="bg-[#D0E46A] p-[10px] sm:p-[12px] rounded-[8px]"
            >
              <img src="/Arrowleft2.svg" className="w-[16px] sm:w-[18px]" />
            </button>
          </div>
        </div>

        {/* CAROUSEL */}
        <div
          ref={scrollRef}
          className="
            flex gap-[16px] sm:gap-[24px] 
            overflow-x-auto scrollbar-hide
            scroll-smooth
          "
        >
          {courses.map((course, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="
                min-w-[260px] sm:min-w-[300px] md:min-w-[336px]
                bg-[#111516]
                border border-white/10
                rounded-[10px] sm:rounded-[12px]
                overflow-hidden
                group relative
                hover:border-[#D0E46A]
                transition-all duration-300
              "
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="
                    w-full 
                    h-[200px] sm:h-[240px] md:h-[261px]
                    object-cover 
                    transition duration-500 group-hover:scale-105
                  "
                />

                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition" />

                <span className="absolute top-[10px] left-[10px] bg-black/70 text-white text-[11px] sm:text-[12px] px-[8px] py-[4px] rounded-[6px]">
                  {course.duration}
                </span>
              </div>

              {/* CONTENT */}
              <div className="flex flex-col gap-[6px] sm:gap-[8px] p-[16px] sm:p-[24px]">
                <h3 className="text-[#F0F0F0] font-montserrat font-bold text-[14px] sm:text-[16px] leading-[22px]">
                  {course.title}
                </h3>

                <div className="flex items-center gap-[6px] text-[12px] sm:text-[14px]">
                  <span className="text-[#D0E46A] font-bold">60% OFF</span>
                  <span className="line-through text-[#9CA3AF]">₹999</span>
                </div>

                <button
                  className="
                  mt-[6px] sm:mt-[8px]
                  w-full flex items-center justify-center
                  bg-[#F0F0F0] text-[#0F1112]
                  px-[14px] sm:px-[16px] 
                  py-[8px] sm:py-[10px]
                  text-[13px] sm:text-[14px]
                  font-semibold font-montserrat
                  rounded-[6px]
                  hover:bg-white
                  transition
                "
                >
                  BUY ₹399
                </button>
              </div>

              {/* GLOW */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-white/10 blur-xl" />
            </motion.div>
          ))}
        </div>

        {/* BOTTOM BUTTON */}
        <div className="flex justify-center">
          <button
            className="
            bg-[#D0E46A] text-[#0F1112]
            px-[20px] sm:px-[28px] 
            py-[10px] sm:py-[12px]
            text-[14px] sm:text-[18px]
            font-bold font-montserrat
            rounded-[8px] sm:rounded-[10px]
            hover:opacity-90
            transition
          "
          >
            EXPLORE COURSES
          </button>
        </div>
      </div>
    </section>
  );
}
