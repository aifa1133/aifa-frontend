"use client";

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    q: "How is this microcourse different from YouTube tutorials?",
    a: "Focused, structured, and practical. Each lesson is concise and designed to deliver clear results without unnecessary fluff. You'll follow a step-by-step system that builds real photo enhancement skills, not just random tips.",
  },
  {
    q: "What’s the difference between buying a single microcourse and getting All-Access?",
    a: "All-access gives you access to every course including future updates, making it more cost-effective long term.",
  },
  {
    q: "How long will I have access to the course?",
    a: "You get lifetime access to all purchased content.",
  },
  {
    q: "Do I need prior experience with AI tools?",
    a: "No, the course is beginner-friendly and guides you step-by-step.",
  },
  {
    q: "What software do I need?",
    a: "We cover industry-standard tools and AI platforms used in modern workflows.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="w-full bg-[#070B14] flex justify-center">
      {/* FIGMA CONTAINER */}
      <div
        className="
        w-full max-w-[1180px]

        px-[16px] sm:px-[40px] lg:px-[93px]
        py-[40px] sm:py-[64px]

        flex flex-col items-center
        gap-[24px] sm:gap-[32px]
      "
      >
        {/* TOP TEXT */}
        <p className="text-[#9CA3AF] text-[12px] sm:text-[14px] uppercase tracking-wide">
          NEED MORE DETAILS?
        </p>

        {/* HEADING */}
        <h2
          className="
          text-[#F0F0F0]
          font-black

          text-[24px]
          sm:text-[32px]
          md:text-[40px]

          leading-[30px]
          sm:leading-[38px]
          md:leading-[48px]

          text-center
        "
        >
          FREQUENTLY-ASKED QUESTIONS
        </h2>

        {/* FAQ LIST */}
        <div className="w-full flex flex-col gap-[10px] sm:gap-[16px] mt-[8px]">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-[16px] bg-[#0F1112] overflow-hidden"
            >
              {/* QUESTION */}
              <button
                onClick={() => toggle(index)}
                className="
                  w-full flex justify-between items-center

                  px-[16px] sm:px-[24px]
                  py-[14px] sm:py-[18px]

                  text-left text-[#F0F0F0]
                "
              >
                <span
                  className="
                  font-bold

                  text-[14px]
                  sm:text-[18px]
                  md:text-[20px]

                  leading-[20px]
                  sm:leading-[26px]
                  md:leading-[28px]

                  pr-4
                "
                >
                  {item.q}
                </span>

                <span className="text-[12px] sm:text-[14px]">
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </button>

              {/* ANSWER */}
              <div
                className={`
                  px-[16px] sm:px-[24px]
                  transition-all duration-300
                  overflow-hidden

                  ${
                    openIndex === index
                      ? "max-h-[300px] pb-[14px] sm:pb-[18px] opacity-100"
                      : "max-h-0 opacity-0"
                  }

                  text-[#DCDCDC]

                  text-[13px]
                  sm:text-[16px]

                  leading-[20px]
                  sm:leading-[26px]
                `}
              >
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
