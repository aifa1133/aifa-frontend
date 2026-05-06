"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function CourseContent() {
  const [openIndex, setOpenIndex] = useState(null);

  const sessions = [
    {
      title: "Session 1: Introduction to AI Filmmaking",
      desc: "Build a cinematic AI-powered short film from concept to final output. You'll create a compelling story, generate visuals using AI tools, design scenes, craft voiceovers, and add music for a polished finish.",
    },
    {
      title: "Session 2: Screen Writing",
      desc: "Learn storytelling and script structure for cinematic output.",
    },
    {
      title: "Session 3: Previsualization",
      desc: "Plan scenes visually before production using AI tools.",
    },
    {
      title: "Session 4: Prompt Engineering",
      desc: "Master prompts to generate consistent high-quality visuals.",
    },
    {
      title: "Session 5: Creating with AI",
      desc: "Hands-on creation using multiple AI tools.",
    },
    {
      title: "Session 6: Cinematography",
      desc: "Understand camera angles, lighting, and composition.",
    },
    {
      title: "Session 7: Character Design",
      desc: "Design consistent characters using AI workflows.",
    },
  ];

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="w-full bg-[#070B14] flex justify-center">
      {/* CONTAINER */}
      <div
        className="
        w-full max-w-[1180px]
        px-[16px] sm:px-[40px] lg:px-[93px]
        py-[40px] sm:py-[64px]
        flex flex-col gap-[24px] sm:gap-[32px]
      "
      >
        {/* HEADER */}
        <div>
          <p className="text-[#F0F0F0] text-[14px] sm:text-[18px] font-bold mb-2">
            A PERFECTLY STRUCTURED COURSE
          </p>

          <h2
            className="
            text-[#F0F0F0]
            font-black
            text-[28px] sm:text-[36px] md:text-[40px]
            leading-[34px] sm:leading-[44px] md:leading-[48px]
          "
          >
            COURSE CONTENT
          </h2>
        </div>

        {/* ACCORDION */}
        <div className="flex flex-col gap-[10px] sm:gap-[16px]">
          {sessions.map((item, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-[12px] bg-[#0F172A]/60 backdrop-blur-md overflow-hidden"
            >
              {/* HEADER */}
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-[16px] sm:px-[24px] py-[14px] sm:py-[16px] text-left text-white"
              >
                <span className="text-[14px] sm:text-[18px] md:text-[20px] truncate max-w-[80%]">
                  {item.title}
                </span>

                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>

              {/* CONTENT */}
              <div
                className={`
                  px-[16px] sm:px-[24px]
                  transition-all duration-300
                  overflow-hidden
                  ${
                    openIndex === index
                      ? "max-h-[300px] pb-[12px] opacity-100"
                      : "max-h-0 opacity-0"
                  }
                  text-[#DCDCDC]
                  text-[14px] sm:text-[16px]
                  leading-[22px] sm:leading-[28px]
                `}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
