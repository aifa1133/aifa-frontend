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
  { image: "/video/video1.png", title: "Host in high quality, ad-free" },
  { image: "/video/video2.png", title: "Host in high quality, ad-free" },
  { image: "/video/video3.png", title: "Host in high quality, ad-free" },
  { image: "/video/video4.png", title: "Host in high quality, ad-free" },
  { image: "/video/video5.png", title: "Host in high quality, ad-free" },
  { image: "/video/video6.jpg", title: "Host in high quality, ad-free" },
];

export default function Features() {
  return (
    <section className="w-full bg-[#0B0F10] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white text-3xl md:text-4xl font-semibold text-center mb-16"
        >
          The platform that powers your video strategy
        </motion.h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* CARD */}
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[28px] overflow-hidden transition">
                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt="feature"
                    className="w-full h-[220px] object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* cinematic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="text-white text-lg font-semibold mb-3">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Ensure your video plays in the highest resolution, always
                    ad-free. No competitor distributions or random suggestions
                    here.
                  </p>

                  {/* BUTTON */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative bg-[#C7E36B] text-black px-5 py-3 text-sm font-medium rounded-md overflow-hidden group"
                  >
                    <span className="relative z-10">
                      + Learn about video hosting →
                    </span>

                    {/* glow */}
                    <span className="absolute inset-0 bg-white/40 blur-xl opacity-0 group-hover:opacity-40 transition duration-500"></span>
                  </motion.button>
                </div>
              </div>

              {/* OUTER GLOW */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-white/10 blur-2xl rounded-[28px]"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
