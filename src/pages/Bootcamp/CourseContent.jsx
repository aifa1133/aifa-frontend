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
      {/* FIGMA EXACT CONTAINER */}
      <div
        className="
          w-full
          max-w-[1366px]

          flex
          flex-col
          justify-center
          items-center

          self-stretch

          px-[93px]
          pb-[64px]

          max-sm:px-[16px]
          max-sm:pb-[40px]
        "
      >
        {/* INNER CONTENT */}
        <div
          className="
            w-full
            max-w-[1180px]

            flex
            flex-col

            gap-[32px]

            max-sm:gap-[24px]
          "
        >
          {/* HEADER */}
          <div
            className="
    flex
    flex-col

    items-start

    gap-[16px]

    self-stretch

    pt-[64px]
    pr-[93px]
    pb-[48px]
    pl-[93px]

    max-sm:px-[16px]
    max-sm:pt-[40px]
    max-sm:pb-[24px]
  "
          >
            <p
              className="
      text-[#D0E46A]

      text-[18px]
      font-bold

      uppercase

      tracking-[1px]

      leading-[28px]

      max-sm:text-[14px]
      max-sm:leading-[22px]
    "
            >
              A PERFECTLY STRUCTURED COURSE
            </p>

            <h2
              className="
      text-[#F0F0F0]

      font-black

      text-[64px]
      leading-[72px]

      tracking-[-1.5px]

      max-sm:text-[34px]
      max-sm:leading-[42px]
      max-sm:tracking-[-1px]
    "
            >
              COURSE CONTENT
            </h2>
          </div>

          {/* ACCORDION */}
          <div
            className="
              flex
              flex-col

              gap-[16px]

              max-sm:gap-[12px]
            "
          >
            {sessions.map((item, index) => (
              <div
                key={index}
                className="
                  overflow-hidden

                  rounded-[24px]

                  border
                  border-[#343638]

                  bg-[#282A2C]

                  transition-all
                  duration-300

                  hover:border-[#D0E46A]

                  max-sm:rounded-[18px]
                "
              >
                {/* HEADER */}
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
                  <span
                    className="
                      text-[#F0F0F0]

                      font-black

                      text-[24px]
                      leading-[32px]

                      tracking-[-0.5px]

                      pr-[20px]

                      max-sm:text-[17px]
                      max-sm:leading-[26px]
                    "
                  >
                    {item.title}
                  </span>

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
                    {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>

                {/* CONTENT */}
                <div
                  className={`
                    overflow-hidden
                    transition-all
                    duration-300

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
                        max-w-[980px]

                        text-[#CFCFCF]

                        text-[16px]
                        leading-[28px]

                        max-sm:text-[14px]
                        max-sm:leading-[24px]
                      "
                    >
                      {item.desc}
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
