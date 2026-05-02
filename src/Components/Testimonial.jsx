"use client";

import { useState } from "react";

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

  return (
    <section className="w-full bg-[#0B0F10] py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-20">
        {/* IMAGE */}
        <div className="flex-1 flex justify-center">
          <div
            className="
            w-[260px] h-[380px]
            sm:w-[320px] sm:h-[460px]
            md:w-[400px] md:h-[580px]
            rounded-[140px] md:rounded-[180px]
            overflow-hidden
          "
          >
            <img
              src={testimonials[active].image}
              alt="person"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 text-center md:text-left">
          {/* QUOTE */}
          <h2
            className="text-[#F0F0F0] font-montserrat font-black 
          text-[30px] leading-[38px] 
          sm:text-[38px] sm:leading-[46px] 
          md:text-[44px] md:leading-[52px] 
          tracking-[-0.5px] mb-6"
          >
            “{testimonials[active].quote}”
          </h2>

          {/* NAME */}
          <p
            className="text-[#9CA3AF] font-montserrat font-semibold 
          text-[14px] uppercase tracking-[0.12em] mb-8"
          >
            {testimonials[active].name}
          </p>

          {/* DOTS */}
          <div className="flex gap-3 justify-center md:justify-start mt-48">
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
