// "use client";

// export default function CourseCard() {
//   return (
//     <section className="w-full bg-[#0F1112] flex justify-center py-[48px]">
//       <div className="w-full max-w-[1366px] flex flex-col">
//         {/* TOP CARD */}
//         <div className="flex w-full overflow-hidden rounded-t-[20px]">
//           {/* IMAGE */}
//           <div className="flex-1 basis-0">
//             <img
//               src="/courses/course.png"
//               alt="course"
//               className="w-full h-[383px] object-cover"
//             />
//           </div>

//           {/* RIGHT CONTENT */}
//           <div className="w-[671px] flex flex-col justify-between items-start px-[24px] bg-[#414243]">
//             {/* TEXT */}
//             <div className="flex flex-col gap-[8px] py-[24px]">
//               <p className="text-[#F0F0F0] font-montserrat text-[18px] leading-[28px] font-bold tracking-wide mt-12">
//                 BEGINNER
//               </p>

//               <h2
//                 className="w-full text-[#F0F0F0] font-montserrat font-black
// text-[26px] leading-[34px]
// sm:text-[30px] sm:leading-[38px]
// md:text-[32px] md:leading-[40px] mt-4"
//               >
//                 AI FILMMAKING BOOTCAMP
//               </h2>

//               <p className="text-[#F0F0F0] font-montserrat text-[16px] leading-[24px] font-medium max-w-[520px] mt-6">
//                 Master AI-powered filmmaking from concept to final cut while
//                 learning how to create stunning, high-quality films faster using
//                 cutting-edge AI tools.
//               </p>
//             </div>

//             {/* BUTTON */}
//             <div className="w-full pb-[24px]">
//               <button className="flex w-full items-center justify-center gap-[4px] bg-[#D0E46A] text-[#0F1112] px-[30px] py-[12px] text-[18px] leading-[28px] font-bold font-montserrat rounded-[12px]">
//                 ENROLL BOOTCAMP
//               </button>
//             </div>
//           </div>
//         </div>{" "}
//         {/* ✅ CLOSED TOP CARD */}
//         {/* BOTTOM BAR */}
//         <div className="flex gap-[8px] mt-[8px]">
//           {/* ITEM */}
//           <div className="flex-1 bg-[#414243] rounded-[12px] px-[20px] py-[18px] flex flex-col gap-[6px]">
//             <div className="flex items-center gap-[6px]">
//               <img
//                 src="/Tagicon.svg"
//                 alt="duration"
//                 className="w-[14px] h-[14px]"
//               />
//               <p className="text-[#9CA3AF] font-montserrat text-[12px] font-semibold uppercase tracking-[0.08em]">
//                 Duration
//               </p>
//             </div>
//           <p className="text-[#F0F0F0] font-montserrat text-[18px] font-bold">3 HOURS</p>
//           </div>

//           {/* ITEM */}
//           <div className="flex-1 bg-[#414243] rounded-[12px] px-[20px] py-[18px] flex flex-col gap-[6px]">
//             <div className="flex items-center gap-[6px]">
//               <img
//                 src="/Tagicon1.svg"
//                 alt="pricing"
//                 className="w-[14px] h-[14px]"
//               />
//               <p className="text-[#9CA3AF] font-montserrat text-[12px] font-semibold uppercase tracking-[0.08em]">
//                 Pricing
//               </p>
//             </div>
//            <p className="text-[#F0F0F0] font-montserrat text-[18px] font-bold">₹499.00</p>
//           </div>

//           {/* ITEM */}
//           <div className="flex-1 bg-[#414243] rounded-[12px] px-[20px] py-[18px] flex flex-col gap-[6px]">
//             <div className="flex items-center gap-[6px]">
//               <img
//                 src="/Tagicon2.svg"
//                 alt="access"
//                 className="w-[14px] h-[14px]"
//               />
//               <p className="text-[#9CA3AF] font-montserrat text-[12px] font-semibold uppercase tracking-[0.08em]">
//                 Access
//               </p>
//             </div>
//            <p className="text-[#F0F0F0] font-montserrat text-[18px] font-bold">Lifetime</p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

export default function CourseCard() {
  return (
    <section className="w-full bg-[#0F1112] flex justify-center py-[40px] sm:py-[64px]">
      {/* CONTAINER */}
      <div className="w-full max-w-[1366px] flex flex-col gap-[10px] px-[16px] sm:px-[24px] md:px-[40px] lg:px-0">
        {/* TOP CARD */}
        <div className="flex flex-col lg:flex-row w-full overflow-hidden rounded-[16px] sm:rounded-[20px] lg:h-[383px]">
          {/* IMAGE */}
          <div className="w-full lg:w-1/2">
            <div
              className="
              w-full
              h-[200px] sm:h-[260px] md:h-[320px] lg:h-[383px]
              overflow-hidden
              rounded-t-[16px] sm:rounded-t-[20px]
              lg:rounded-t-none
              lg:rounded-l-[20px]
            "
            >
              <img
                src="/courses/course.png"
                alt="course"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div
            className="
            w-full lg:w-1/2 
            flex flex-col justify-between h-full
            bg-[#414243]
            px-[14px] sm:px-[20px] md:px-[24px]
            py-[20px] sm:py-[24px]
            rounded-b-[16px] sm:rounded-b-[20px]
            lg:rounded-b-none lg:rounded-tr-[20px]
          "
          >
            {/* TEXT */}
            <div className="flex flex-col gap-[6px] sm:gap-[8px]">
              <p className="text-[#F0F0F0] font-montserrat text-[12px] sm:text-[14px] md:text-[18px] font-bold uppercase tracking-wide">
                BEGINNER
              </p>

              <h2
                className="
                text-[#F0F0F0] font-montserrat font-black
                text-[20px] sm:text-[26px] md:text-[32px]
                leading-[28px] sm:leading-[34px] md:leading-[40px]
              "
              >
                AI FILMMAKING BOOTCAMP
              </h2>

              <p
                className="
                text-[#F0F0F0]
                text-[13px] sm:text-[15px] md:text-[16px]
                leading-[20px] sm:leading-[22px] md:leading-[24px]
                max-w-full sm:max-w-[520px]
              "
              >
                Master AI-powered filmmaking from concept to final cut while
                learning how to create stunning, high-quality films faster using
                cutting-edge AI tools.
              </p>
            </div>

            {/* BUTTON */}
            <button
              className="
              w-full sm:w-auto
              mt-[12px] sm:mt-[16px]
              bg-[#D0E46A] text-[#0F1112]
              px-[16px] sm:px-[24px]
              py-[10px] sm:py-[12px]
              text-[13px] sm:text-[15px] md:text-[16px]
              rounded-[10px] sm:rounded-[12px]
              font-bold font-montserrat
              hover:opacity-90 active:scale-[0.98]
              transition-all duration-200
            "
            >
              ENROLL BOOTCAMP
            </button>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[8px] sm:gap-[10px]">
          {/* ITEM */}
          <div className="bg-[#414243] rounded-[10px] sm:rounded-[12px] px-[14px] sm:px-[20px] py-[12px] sm:py-[18px] flex flex-col gap-[6px]">
            <div className="flex items-center gap-[6px]">
              <img
                src="/Tagicon.svg"
                alt=""
                className="w-[12px] h-[12px] sm:w-[14px] sm:h-[14px]"
              />
              <p className="text-[#9CA3AF] font-montserrat text-[10px] sm:text-[12px] font-semibold uppercase tracking-[0.08em]">
                Duration
              </p>
            </div>
            <p className="text-[#F0F0F0] font-montserrat text-[14px] sm:text-[18px] font-bold">
              3 HOURS
            </p>
          </div>

          {/* ITEM */}
          <div className="bg-[#414243] rounded-[10px] sm:rounded-[12px] px-[14px] sm:px-[20px] py-[12px] sm:py-[18px] flex flex-col gap-[6px]">
            <div className="flex items-center gap-[6px]">
              <img
                src="/Tagicon1.svg"
                alt=""
                className="w-[12px] h-[12px] sm:w-[14px] sm:h-[14px]"
              />
              <p className="text-[#9CA3AF] font-montserrat text-[10px] sm:text-[12px] font-semibold uppercase tracking-[0.08em]">
                Pricing
              </p>
            </div>
            <p className="text-[#F0F0F0] font-montserrat text-[14px] sm:text-[18px] font-bold">
              ₹499.00
            </p>
          </div>

          {/* ITEM */}
          <div className="bg-[#414243] rounded-[10px] sm:rounded-[12px] px-[14px] sm:px-[20px] py-[12px] sm:py-[18px] flex flex-col gap-[6px]">
            <div className="flex items-center gap-[6px]">
              <img
                src="/Tagicon2.svg"
                alt=""
                className="w-[12px] h-[12px] sm:w-[14px] sm:h-[14px]"
              />
              <p className="text-[#9CA3AF] font-montserrat text-[10px] sm:text-[12px] font-semibold uppercase tracking-[0.08em]">
                Access
              </p>
            </div>
            <p className="text-[#F0F0F0] font-montserrat text-[14px] sm:text-[18px] font-bold">
              Lifetime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
