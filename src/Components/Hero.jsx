// "use client";

// import { useState, useEffect } from "react";

// const slides = [
//   "/hero/hero1.jpg",
//   "/hero/hero2.jpg",
//   "/hero/hero3.jpg",
//   "/hero/hero4.jpg",
// ];

// export default function Hero() {
//   const [active, setActive] = useState(0);

//   // 🔁 AUTO SLIDE
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActive((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="w-full bg-black flex justify-center pt-24 pb-10">
//       <div className="relative w-full max-w-7xl h-[520px] md:h-[580px] rounded-[20px] overflow-hidden">
//         {/* 🎥 IMAGE */}
//         <img
//           key={active}
//           src={slides[active]}
//           alt="hero"
//           className="absolute inset-0 w-full h-full object-cover transition duration-700"
//         />

//         {/* 🌑 LIGHT DARK OVERLAY (NOT TOO HEAVY) */}
//         <div className="absolute inset-0 bg-black/40"></div>

//         {/* 🎬 CONTENT */}
//         <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-[80px]">
//           <p className="text-[#F0F0F0] font-montserrat text-[32px] leading-[40px] font-bold tracking-[0.02em] mb-3 uppercase">
//             FILMS
//           </p>

//           <h1 className="text-[#F0F0F0] font-montserrat text-[64px] leading-[70px] font-black max-w-[620px]">
//             CREATE <br />
//             HOLLYWOOD <br />
//             STYLE AI FILMS
//           </h1>

//           {/* ✅ FIXED BUTTON (SMALL + CLEAN) */}
//           <button className="mt-5 inline-flex items-center justify-center gap-[4px] bg-[#D0E46A] text-[#0F1112] px-[30px] py-[12px] text-[18px] leading-[28px] font-bold font-montserrat rounded-[12px] hover:opacity-90 transition-all duration-200 w-fit">
//             BOOK A FREE 30 MINS CONSULTATION
//           </button>
//         </div>

//         {/* 🎞️ THUMBNAILS */}
//         <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
//           {slides.map((img, i) => (
//             <img
//               key={i}
//               src={img}
//               onClick={() => setActive(i)}
//               className={`w-12 h-8 object-cover rounded cursor-pointer transition ${
//                 active === i
//                   ? "border border-white scale-105"
//                   : "opacity-60 hover:opacity-100"
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";

// import { useState, useEffect, useRef } from "react";

// const slides = [
//   {
//     video: "/hero/web1.mp4",
//     tag: "FILMS",
//     thumb: "/hero/hero1.jpg",
//     title: "CREATE HOLLYWOOD STYLE AI FILMS",
//   },
//   {
//     video: "/hero/web2.mp4",
//     tag: "MENTORSHIP",
//     thumb: "/hero/hero2.jpg",
//     title: "TRAIN WITH INDUSTRY EXPERTS",
//   },
//   {
//     video: "/hero/web4.mp4",
//     tag: "PROJECTS",
//     thumb: "/hero/hero3.jpg",
//     title: "BUILD REAL PROJECTS",
//   },
//   {
//     video: "/hero/web5.mp4",
//     tag: "EARNINGS",
//     thumb: "/hero/hero4.jpg",
//     title: "EARN WITH YOUR SKILLS",
//   },
// ];

// export default function Hero() {
//   const [active, setActive] = useState(0);

//   const videoRef = useRef(null);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActive((prev) => (prev + 1) % slides.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.load();
//       videoRef.current.play();
//     }
//   }, [active]);

//   return (
//     <section className="w-full bg-[#0F1112] flex justify-center">
//       {/* CONTAINER */}
//       <div
//         className="
//       w-full
//       max-w-[1440px]

//       flex
//       flex-col
//       justify-center
//       items-start

//       gap-[24px]

//       px-[16px]
//       sm:px-[24px]
//       md:px-[40px]
//       lg:px-[60px]

//       py-[20px]
//       sm:py-[32px]
//     "
//       >
//         {/* HERO */}
//         <div
//           className="
//         relative

//         w-full

//         h-[420px]
//         sm:h-[520px]
//         md:h-[588px]

//         flex
//         flex-col
//         justify-center
//         items-start

//         gap-[24px]
//         sm:gap-[40px]
//         md:gap-[60px]

//         px-[16px]
//         sm:px-[32px]
//         md:px-[60px]
//         lg:px-[80px]

//         rounded-[20px]
//         sm:rounded-[24px]

//         overflow-hidden
//       "
//         >
//           {/* VIDEO */}
//           <video
//             ref={videoRef}
//             className="
//           absolute
//           inset-0

//           w-full
//           h-full

//           object-cover
//         "
//             autoPlay
//             muted
//             loop
//             playsInline
//           >
//             <source src={slides[active].video} type="video/mp4" />
//           </video>

//           {/* OVERLAY */}
//           <div className="absolute inset-0 bg-black/40"></div>

//           {/* CONTENT */}
//           <div
//             className="
//           relative
//           z-10

//           flex
//           flex-col
//           justify-center
//           items-start

//           gap-[24px]
//           sm:gap-[40px]
//           md:gap-[60px]
//         "
//           >
//             {/* TEXT */}
//             <div>
//               <p
//                 className="
//               text-[#F0F0F0]

//               font-montserrat
//               font-bold

//               uppercase

//               text-[16px]
//               sm:text-[22px]
//               md:text-[32px]
//             "
//               >
//                 {slides[active].tag}
//               </p>

//              <h1
//   className="
//     mt-2

//     text-[#F0F0F0]

//     font-montserrat
//     font-black

//     text-[28px]
//     leading-[34px]

//     sm:text-[40px]
//     sm:leading-[46px]

//     md:text-[52px]
//     md:leading-[58px]

//     lg:text-[64px]
//     lg:leading-[70px]

//     max-w-[95%]
//     sm:max-w-[620px]
//   "
// >
//   {slides[active].title}
// </h1>
//             </div>

//             {/* BUTTON */}
//             <button
//               className="
//             inline-flex
//             items-center
//             justify-center

//             gap-[4px]

//             px-[16px]
//             py-[8px]

//             sm:px-[20px]
//             sm:py-[10px]

//             md:px-[24px]
//             md:py-[12px]

//             rounded-[10px]
//             sm:rounded-[12px]

//             bg-[#D0E46A]
//             text-[#0F1112]

//             font-montserrat
//             font-bold

//             text-[12px]
//             sm:text-[14px]
//             md:text-[18px]

//             leading-[20px]
//             sm:leading-[24px]

//             transition-all
//             duration-300

//             hover:opacity-90
//           "
//             >
//               BOOK A FREE 30 MINS CONSULTATION
//             </button>
//           </div>

//           {/* THUMBNAILS */}
//           <div
//             className="
//           absolute

//           bottom-[16px]
//           sm:bottom-[24px]

//           left-1/2
//           -translate-x-1/2

//           flex
//           items-center

//           gap-[8px]
//           sm:gap-[12px]

//           z-20
//         "
//           >
//             {slides.map((slide, i) => (
//               <img
//                 key={i}
//                 src={slide.thumb}
//                 onClick={() => setActive(i)}
//                 className={`
//               w-[36px]
//               h-[24px]

//               sm:w-[48px]
//               sm:h-[32px]

//               md:w-[52px]
//               md:h-[36px]

//               object-cover

//               rounded-[6px]

//               cursor-pointer

//               transition-all

//               ${
//                 active === i
//                   ? "border border-white scale-105"
//                   : "opacity-60 hover:opacity-100"
//               }
//             `}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";

const slides = [
  {
    video: "/hero/web1.mp4",
    thumb: "/hero/hero1.jpg",
    tag: "FILMS",
    title: "CREATE HOLLYWOOD STYLE AI FILMS",
  },
  {
    video: "/hero/web2.mp4",
    thumb: "/hero/hero2.jpg",
    tag: "MENTORSHIP",
    title: "TRAIN WITH INDUSTRY EXPERTS",
  },
  {
    video: "/hero/web4.mp4",
    thumb: "/hero/hero3.jpg",
    tag: "PROJECTS",
    title: "BUILD REAL PROJECTS",
  },
  {
    video: "/hero/web5.mp4",
    thumb: "/hero/hero4.jpg",
    tag: "EARNINGS",
    title: "EARN WITH YOUR SKILLS",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  const videoRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [active]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* MAIN VIDEO */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="
          absolute
          inset-0

          w-full
          h-full

          object-cover
        "
      >
        <source src={slides[active].video} type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* VIGNETTE */}
      <div
        className="
          absolute
          inset-0

          bg-[radial-gradient(circle,transparent_20%,rgba(0,0,0,0.85)_100%)]
        "
      />

      {/* CONTENT */}
      <div
        className="
          relative
          z-10

          w-full
          h-full

          flex
          items-center

          px-[20px]
          sm:px-[40px]
          md:px-[60px]
          lg:px-[100px]
        "
      >
        <div
          className="
            flex
            flex-col

            items-start

            max-w-[950px]
          "
        >
          {/* TAG */}
          <p
            className="
              text-white

              font-montserrat
              font-bold

              uppercase

              tracking-[0.06em]

              text-[16px]
              sm:text-[24px]
              md:text-[32px]
            "
          >
            {slides[active].tag}
          </p>

          {/* TITLE */}
          <h1
            className="
              mt-[10px]

              text-white

              font-montserrat
              font-black

              uppercase

              tracking-[-0.05em]

              text-[42px]
              leading-[42px]

              sm:text-[64px]
              sm:leading-[64px]

              md:text-[90px]
              md:leading-[86px]

              lg:text-[120px]
              lg:leading-[110px]

              max-w-[1000px]
            "
          >
            {slides[active].title}
          </h1>

          {/* DESCRIPTION */}
          <p
            className="
              mt-[24px]

              text-white/80

              font-montserrat

              text-[15px]
              leading-[24px]

              sm:text-[18px]
              sm:leading-[30px]

              max-w-[680px]
            "
          >
            Learn cinematic AI filmmaking, storytelling, editing, visual
            direction, and professional production workflows with industry-level
            mentorship.
          </p>

          {/* BUTTON */}
          <button
            className="
              mt-[40px]

              flex
              items-center

              gap-[12px]

              px-[24px]
              py-[14px]

              rounded-[8px]

              bg-white/10
              backdrop-blur-md

              border
              border-white/20

              text-white

              font-montserrat
              font-semibold

              text-[15px]
              sm:text-[18px]

              transition-all
              duration-300

              hover:bg-white/20
            "
          >
            BOOK A FREE 30 MINS CONSULTATION
          </button>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE THUMBNAILS */}
      <div
        className="
          absolute

          right-[16px]
          sm:right-[24px]
          md:right-[40px]

          top-1/2
          -translate-y-1/2

          z-20

          flex
          flex-col

          gap-[12px]
        "
      >
        {slides.map((slide, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`
              group

              relative

              overflow-hidden

              rounded-[12px]

              transition-all
              duration-500

              ${
                active === i
                  ? "border border-white scale-[1.05]"
                  : "opacity-60 hover:opacity-100"
              }
            `}
          >
            {/* THUMB IMAGE */}
            <div
              className="
                relative

                w-[90px]
                sm:w-[110px]
                md:w-[130px]

                h-[60px]
                sm:h-[72px]
                md:h-[84px]

                overflow-hidden
              "
            >
              <img
                src={slide.thumb}
                alt={slide.title}
                className="
                  w-full
                  h-full

                  object-cover

                  transition-all
                  duration-[1200ms]

                  group-hover:scale-[1.08]
                  group-hover:-translate-y-[6px]
                "
              />
            </div>

            {/* DARK OVERLAY */}
            <div
              className="
                absolute
                inset-0

                bg-black/20

                group-hover:bg-black/0

                transition-all
                duration-500
              "
            />

            {/* ACTIVE BORDER */}
            {active === i && (
              <div
                className="
                  absolute
                  inset-0

                  border
                  border-white

                  rounded-[12px]
                "
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
