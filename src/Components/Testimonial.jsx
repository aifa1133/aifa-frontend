"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "S. S. RAJAMOULI",
    quote: "AIFA IS A GREAT PLACE FOR THE FUTURE OF AI FILMMAKING.",
    image: "/movies/movie.png",
  },
  {
    name: "KARAN JOHAR",
    quote: "AIFA is the perfect stage for the evolution of AI in cinema.",
    image: "/movies/movie2.png",
  },
  {
    name: "ZOYA AKHTAR",
    quote: "AIFA is shaping the future of AI-powered filmmaking.",
    image: "/movies/movie3.png",
  },
  {
    name: "ANURAG KASHYAP",
    quote: "AIFA stands at the forefront of AI-driven filmmaking innovation.",
    image: "/movies/movie4.png",
  },
];

export default function Testimonial() {
  const [active, setActive] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-[#0F1112] flex justify-center">
      <div
        className="
        w-full max-w-[1400px] 
        px-[16px] sm:px-[24px] md:px-[93px] 
        py-[40px] sm:py-[64px] 
        flex flex-col md:flex-row 
        items-center justify-center 
        gap-[20px] md:gap-[10px]
      "
      >
        {/* IMAGE */}
        <div className="flex-1 flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[active].image}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="
                w-[200px] h-[300px]
                sm:w-[280px] sm:h-[420px]
                md:w-[400px] md:h-[580px]
                rounded-[120px] sm:rounded-[150px] md:rounded-[180px]
                overflow-hidden
              "
            >
              <img
                src={testimonials[active].image}
                alt="person"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CONTENT */}
        <div className="flex-1 text-center md:text-left">
          <AnimatePresence mode="wait">
            <motion.h2
              key={testimonials[active].quote}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="
                text-[#F0F0F0] font-montserrat font-black 
                text-[22px] leading-[30px]
                sm:text-[34px] sm:leading-[42px]
                md:text-[44px] md:leading-[52px]
                tracking-[-0.5px] 
                mb-4 sm:mb-6
              "
            >
              “{testimonials[active].quote}”
            </motion.h2>
          </AnimatePresence>

          <motion.p
            key={testimonials[active].name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="
              text-[#9CA3AF] font-montserrat font-semibold 
              text-[12px] sm:text-[14px] 
              uppercase tracking-[0.12em] 
              mb-6 sm:mb-8
            "
          >
            {testimonials[active].name}
          </motion.p>

          {/* DOTS */}
          <div className="flex gap-3 justify-center md:justify-start">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`transition-all duration-300 rounded-full ${
                  active === i
                    ? "w-6 h-2.5 bg-[#F0F0F0]"
                    : "w-2.5 h-2.5 bg-[#6B7280]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
