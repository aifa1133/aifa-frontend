"use client";

import { FaArrowRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Prerna Singh",
    role: "Ravi Teja is an AI Filmmaker.",
    text: "He specializes in helping creators transform ideas into cinematic visuals using AI—leveraging emerging tools not just for experimentation, but to build real-world, monetizable creative projects.",
    img: "/test1.png",
  },
  {
    name: "David Robert",
    role: "Ravi Teja is an AI Filmmaker.",
    text: "He specializes in helping creators transform ideas into cinematic visuals using AI—leveraging emerging tools not just for experimentation, but to build real-world, monetizable creative projects.",
    img: "/test1.png",
  },
  {
    name: "Tejasvi Kalbu",
    role: "Ravi Teja is an AI Filmmaker.",
    text: "He specializes in helping creators transform ideas into cinematic visuals using AI—leveraging emerging tools not just for experimentation, but to build real-world, monetizable creative projects.",
    img: "/test1.png",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-[#070B14] flex justify-center">
      {/* CONTAINER */}
      <div className="w-full max-w-[1180px] px-[16px] sm:px-[40px] lg:px-[93px] py-[40px] sm:py-[64px] flex flex-col gap-[32px] sm:gap-[48px]">
        {/* HEADER */}
        <div className="relative text-center">
          <p className="text-[#F0F0F0]/70 text-[12px] sm:text-[14px] uppercase tracking-[2px] font-semibold mb-2">
            TESTIMONIALS
          </p>

          <h2 className="text-[#F0F0F0] font-black text-[24px] sm:text-[32px] md:text-[40px] leading-[30px] sm:leading-[38px] md:leading-[48px]">
            HEAR WHAT OUR <br /> TRAINEES HAVE TO SAY
          </h2>

          {/* DESKTOP BUTTON */}
          <button className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 bg-[#A3E635] text-black p-[12px] rounded-[10px] hover:scale-[1.05] transition">
            <FaArrowRight />
          </button>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[12px] sm:gap-[16px]">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-[#1A1F2E] border border-white/10 rounded-[16px] p-[16px] sm:p-[20px] flex flex-col justify-between hover:scale-[1.02] transition"
            >
              {/* TEXT */}
              <p className="text-[#F0F0F0] text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] mb-[16px]">
                {item.text}
              </p>

              {/* USER */}
              <div className="flex items-center gap-[10px] border-t border-white/10 pt-[12px]">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-full object-cover"
                />

                <div>
                  <h4 className="text-[#F0F0F0] font-bold text-[14px] sm:text-[16px]">
                    {item.name}
                  </h4>

                  <p className="text-[#DCDCDC] text-[12px] sm:text-[14px]">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
