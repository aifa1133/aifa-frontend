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
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section
      className="
        w-full
        bg-[#0F1112]

        flex
        justify-center
      "
    >
      {/* FIGMA EXACT CONTAINER */}
      <div
        className="
          w-full
          max-w-[1366px]

          px-[93px]
          py-[64px]

          flex
          flex-col

          items-start

          gap-[30px]

          bg-[#0F1112]

          max-sm:px-[16px]
          max-sm:py-[40px]
        "
      >
        {/* INNER WRAPPER */}
        <div
          className="
            w-full
            max-w-[1180px]

            flex
            flex-col

            gap-[40px]

            max-sm:gap-[28px]
          "
        >
          {/* TOP */}
          <div
            className="
              flex
              flex-col

              items-center

              gap-[14px]

              max-sm:gap-[10px]
            "
          >
            {/* SMALL TEXT */}
            <p
              className="
                text-[#D0E46A]

                text-[16px]
                font-bold

                uppercase

                tracking-[1px]

                leading-[24px]

                max-sm:text-[13px]
                max-sm:leading-[20px]
              "
            >
              NEED MORE DETAILS?
            </p>

            {/* HEADING */}
            <h2
              className="
                text-[#F0F0F0]

                text-center

                font-black

                text-[64px]
                leading-[72px]

                tracking-[-1.5px]

                max-sm:text-[34px]
                max-sm:leading-[42px]
                max-sm:tracking-[-1px]
              "
            >
              FREQUENTLY-ASKED
              <br />
              QUESTIONS
            </h2>
          </div>

          {/* FAQ LIST */}
          <div
            className="
              w-full

              flex
              flex-col

              gap-[16px]

              max-sm:gap-[12px]
            "
          >
            {faqs.map((item, index) => (
              <div
                key={index}
                className="
                  w-full

                  rounded-[24px]

                  border
                  border-[#343638]

                  bg-[#282A2C]

                  overflow-hidden

                  transition-all
                  duration-300

                  max-sm:rounded-[18px]
                "
              >
                {/* QUESTION */}
                <button
                  onClick={() => toggle(index)}
                  className="
                    w-full

                    flex
                    items-center
                    justify-between

                    px-[24px]
                    py-[22px]

                    text-left

                    max-sm:px-[16px]
                    max-sm:py-[16px]
                  "
                >
                  {/* QUESTION TEXT */}
                  <span
                    className="
                      text-[#F0F0F0]

                      font-black

                      text-[24px]
                      leading-[34px]

                      tracking-[-0.5px]

                      pr-[20px]

                      max-sm:text-[17px]
                      max-sm:leading-[26px]
                      max-sm:pr-[12px]
                    "
                  >
                    {item.q}
                  </span>

                  {/* ICON */}
                  <span
                    className="
                      flex
                      items-center
                      justify-center

                      min-w-[44px]
                      h-[44px]

                      rounded-full

                      bg-[#3A3D3F]

                      text-[#F0F0F0]

                      text-[14px]

                      shrink-0

                      max-sm:min-w-[36px]
                      max-sm:h-[36px]
                      max-sm:text-[12px]
                    "
                  >
                    {openIndex === index ? <FaMinus /> : <FaPlus />}
                  </span>
                </button>

                {/* ANSWER */}
                <div
                  className={`
                    transition-all
                    duration-500
                    overflow-hidden

                    ${
                      openIndex === index
                        ? "max-h-[300px] opacity-100"
                        : "max-h-0 opacity-0"
                    }
                  `}
                >
                  <div
                    className="
                      px-[24px]
                      pb-[24px]

                      max-sm:px-[16px]
                      max-sm:pb-[18px]
                    "
                  >
                    <p
                      className="
                        max-w-[1000px]

                        text-[#CFCFCF]

                        text-[16px]
                        leading-[28px]

                        max-sm:text-[14px]
                        max-sm:leading-[24px]
                      "
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
