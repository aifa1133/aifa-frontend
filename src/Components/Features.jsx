// "use client";

// const features = [
//   {
//     image: "/video/video1.png",
//     title: "Host in high quality, ad-free",
//   },
//   {
//     image: "/video/video2.png",
//     title: "Host in high quality, ad-free",
//   },
//   {
//     image: "/video/video3.png",
//     title: "Host in high quality, ad-free",
//   },
//   {
//     image: "/video/video4.png",
//     title: "Host in high quality, ad-free",
//   },
//   {
//     image: "/video/video5.png",
//     title: "Host in high quality, ad-free",
//   },
//   {
//     image: "/video/video6.jpg",
//     title: "Host in high quality, ad-free",
//   },
// ];

// export default function Features() {
//   return (
//     <section className="w-full bg-[#0B0F10] py-20">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* TITLE */}
//         <h2 className="text-white text-3xl md:text-4xl font-semibold text-center mb-16">
//           The platform that powers your video strategy
//         </h2>

//         {/* GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
//           {features.map((item, i) => (
//             <div key={i}>
//               {/* IMAGE */}
//               <div className="overflow-hidden rounded-[28px] mb-6">
//                 <img
//                   src={item.image}
//                   alt="feature"
//                   className="w-full h-[220px] object-cover"
//                 />
//               </div>

//               {/* TITLE */}
//               <h3 className="text-white text-lg font-semibold mb-3">
//                 {item.title}
//               </h3>

//               {/* DESCRIPTION */}
//               <p className="text-gray-400 text-sm leading-relaxed mb-5">
//                 Ensure your video play in their highest resolution, always
//                 ad-free. No competitor distributions or random suggestion here
//               </p>

//               {/* BUTTON */}
//               <button className="bg-[#C7E36B] text-black px-5 py-3 text-sm font-medium rounded-md">
//                 + Learn about video hosting →
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { motion } from "framer-motion";
const features = [
  {
    image: "/video/video1.jpg",
    title: "Hire Top AI Talent",
    desc: "Work with skilled creators for your next project. Find professionals ready to bring your ideas to life.",
  },

  {
    image: "/video/video2.jpg",
    title: "Explore AI Job Opportunities",
    desc: "Discover roles in AI filmmaking and creative tech. Apply to companies building the future of content.",
  },

  {
    image: "/video/video3.jpg",
    title: "Access Powerful AI Resources",
    desc: "Learn faster with curated tools, prompts, and workflows.",
  },

  {
    image: "/video/video4.jpg",
    title: "Join the Creator Community",
    desc: "Connect, collaborate, and grow with fellow creators. Be part of discussions, challenges, and live events.",
  },

  {
    image: "/video/video5.jpg",
    title: "Get End-to-End AI Services",
    desc: "From concept to final cut, we handle everything. Create high-quality, impactful content with ease.",
  },

  {
    image: "/video/video6.jpg",
    title: "Upgrade to Pro Membership",
    desc: "Unlock premium tools, content, and exclusive access. Get priority features and insider opportunities.",
  },
];

export default function Features() {
  return (
    <section className="w-full bg-[#0F1112] flex justify-center py-[40px] sm:py-[64px]">
      <div className="w-full max-w-[1180px] flex flex-col gap-[32px] sm:gap-[64px] px-[16px] sm:px-[24px] lg:px-0">
        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
        text-[#F0F0F0]
        text-center

        font-montserrat
        font-black

        text-[20px]
        leading-[28px]

        sm:text-[32px]
        sm:leading-[40px]

        md:text-[40px]
        md:leading-[48px]
      "
        >
          EVERYTHING YOU NEED TO CREATE WITH AI
        </motion.h2>

        {/* GRID */}
        <div
          className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3

        gap-x-[11px]
        gap-y-[24px] sm:gap-y-[60px]
      "
        >
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="
            group

            flex
            flex-col

            w-full

            bg-transparent
          "
            >
              {/* IMAGE */}
              <div
                className="
    relative

    flex
    justify-center
    items-center

    w-full
    max-w-[386px]

    h-[275px]

    aspect-[153/109]

    overflow-hidden

    rounded-[48px]
  "
              >
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="
      w-full
      h-full

      object-cover
    "
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.5 }}
                />

                {/* OVERLAY */}
                <div
                  className="
                absolute
                inset-0

                bg-gradient-to-t
                from-black/70
                via-transparent
                to-transparent
              "
                />
              </div>

              {/* CONTENT */}
              <div
                className="
              flex
              flex-col

              items-start

              gap-[16px]

              pt-[24px]

              w-full
            "
              >
                {/* TITLE */}
                <h3
                  className="
    text-[#F0F0F0]

    font-montserrat
    text-[20px]
    font-bold
    leading-[28px]
  "
                >
                  {item.title}
                </h3>

                {/* DESCRIPTION */}
                <p
                  className="
    text-[#F0F0F0]

    font-montserrat
    font-medium

    text-[14px]
    leading-[20px]
  "
                >
                  {item.desc}
                </p>

                {/* BUTTON */}
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  className="
    flex
    justify-center
    items-center

    gap-[4px]

    self-stretch
    w-full

    px-[30px]
    py-[12px]

    rounded-[8px]

    bg-[#303133]

    text-[#F0F0F0]

    font-montserrat
    text-[14px]
    font-medium
    leading-[20px]

    transition-all
    duration-300

    hover:bg-[#3A3B3C]
  "
                >
                  LEARN MORE
                  <img
                    src="/Arrowleftnew.svg"
                    alt="arrow"
                    className="w-[14px] h-[14px] object-contain"
                  />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
