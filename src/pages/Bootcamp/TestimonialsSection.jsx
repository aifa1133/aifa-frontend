"use client";

import { FaArrowRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Prerna Singh",
    role: "AI Filmmaker & Creator",
    text: "He specializes in helping creators transform ideas into cinematic visuals using AI—leveraging emerging tools not just for experimentation, but to build real-world, monetizable creative projects. His focus is on turning complex AI workflows into simple, repeatable systems that empower storytellers to produce professional-quality content.",
    img: "/test1.png",
  },
  {
    name: "David Robert",
    role: "Content Creator",
    text: "He specializes in helping creators transform ideas into cinematic visuals using AI—leveraging emerging tools not just for experimentation, but to build real-world, monetizable creative projects. His focus is on turning complex AI workflows into simple, repeatable systems that empower storytellers to produce professional-quality content.",
    img: "/test1.png",
  },
  {
    name: "Tejasvi Kalbu",
    role: "Visual Designer",
    text: "He specializes in helping creators transform ideas into cinematic visuals using AI—leveraging emerging tools not just for experimentation, but to build real-world, monetizable creative projects. His focus is on turning complex AI workflows into simple, repeatable systems that empower storytellers to produce professional-quality content.",
    img: "/test1.png",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-[#0D0F10] flex justify-center overflow-hidden">
      <div
        className="
          w-full
          max-w-[1400px]

          px-5
          sm:px-8
          md:px-12
          lg:px-[80px]

          py-[80px]

          max-sm:px-[16px]
          max-sm:py-[40px]
        "
      >
        {/* HEADER */}
        <div
          className="
            relative
            flex
            flex-col
            items-center

            mb-[60px]

            max-sm:mb-[36px]
          "
        >
          {/* TOP LABEL */}
          <p
            className="
              text-[#D0E46A]
              uppercase
              tracking-[3px]

              text-[13px]
              sm:text-[14px]

              font-bold

              mb-4

              max-sm:mb-[10px]
            "
          >
            Testimonials
          </p>

          {/* HEADING */}
          <h2
            className="
              text-center
              uppercase

              text-[#F0F0F0]

              font-[Montserrat]
              font-black

              tracking-[-2px]

              text-[30px]
              sm:text-[40px]
              md:text-[52px]
              lg:text-[64px]

              leading-[38px]
              sm:leading-[48px]
              md:leading-[60px]
              lg:leading-[72px]

              max-sm:text-[34px]
              max-sm:leading-[42px]
              max-sm:tracking-[-1px]
            "
          >
            HEAR WHAT OUR
            <br />
            TRAINEES HAVE TO SAY
          </h2>

          {/* GLOW */}
          <div
            className="
              absolute
              top-[30%]

              w-[280px]
              h-[120px]

              bg-[#D0E46A]

              opacity-10
              blur-[100px]

              rounded-full

              max-sm:w-[180px]
              max-sm:h-[80px]
            "
          ></div>

          {/* BUTTON */}
          <button
            className="
              absolute
              right-0
              top-1/2

              -translate-y-1/2

              hidden
              lg:flex

              items-center
              justify-center

              px-[30px]
              py-[12px]

              gap-[8px]

              rounded-[12px]

              bg-[#D0E46A]

              text-black

              transition-all
              duration-300

              hover:scale-[1.04]
              hover:shadow-[0_0_30px_rgba(208,228,106,0.35)]
            "
          >
            <FaArrowRight className="text-[18px]" />
          </button>
        </div>

        {/* GRID */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3

            gap-6

            max-sm:gap-[16px]
          "
        >
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="
                group
                relative

                rounded-[28px]

                border
                border-[#2B2D2F]

                bg-[#161819]/80
                backdrop-blur-xl

                overflow-hidden

                transition-all
                duration-500

                hover:border-[#D0E46A]
                hover:-translate-y-2

                max-sm:rounded-[20px]
              "
            >
              {/* CARD GLOW */}
              <div
                className="
                  absolute
                  inset-0

                  opacity-0
                  group-hover:opacity-100

                  transition-all
                  duration-500

                  bg-gradient-to-b
                  from-[#D0E46A10]
                  to-transparent
                "
              ></div>

              {/* CONTENT */}
              <div
                className="
                  relative
                  p-[28px]
                  min-h-[280px]

                  max-sm:p-[18px]
                  max-sm:min-h-auto
                "
              >
                <p
                  className="
                    text-[#E7E7E7]

                    text-[17px]
                    sm:text-[18px]

                    leading-[32px]

                    font-medium

                    max-sm:text-[14px]
                    max-sm:leading-[24px]
                  "
                >
                  “{item.text}”
                </p>
              </div>

              {/* USER */}
              <div
                className="
                  relative

                  flex
                  items-center

                  gap-4

                  px-[28px]
                  py-[24px]

                  border-t
                  border-[#2F3234]

                  bg-[#1A1C1D]

                  max-sm:px-[18px]
                  max-sm:py-[16px]
                  max-sm:gap-[12px]
                "
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="
                    w-[64px]
                    h-[64px]

                    rounded-full

                    object-cover

                    border
                    border-[#3A3D3F]

                    max-sm:w-[52px]
                    max-sm:h-[52px]
                  "
                />

                <div>
                  <h4
                    className="
                      text-[#F0F0F0]

                      font-black

                      text-[20px]
                      sm:text-[22px]

                      leading-[28px]

                      max-sm:text-[18px]
                      max-sm:leading-[24px]
                    "
                  >
                    {item.name}
                  </h4>

                  <p
                    className="
                      text-[#A9A9A9]

                      text-[14px]

                      leading-[22px]

                      max-sm:text-[12px]
                      max-sm:leading-[18px]
                    "
                  >
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