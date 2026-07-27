"use client";

const instructors = [
  {
    name: "RAVI TEJA",
    img: "/insta1.png",
    short:
      "Ravi Teja is an AI Filmmaker and creative technologist, and one of the lead instructors at AIFA.",
    long: "He specializes in helping creators transform ideas into cinematic visuals using AI—leveraging emerging tools not just for experimentation, but to build real-world, monetizable creative projects. His focus is on turning complex AI workflows into simple, repeatable systems that empower storytellers to produce professional-quality content.",
  },
  {
    name: "SHERIN",
    img: "/insta2.png",
    short:
      "Ravi Teja is an AI Filmmaker and creative technologist, and one of the lead instructors at AIFA.",
    long: "He specializes in helping creators transform ideas into cinematic visuals using AI—leveraging emerging tools not just for experimentation, but to build real-world, monetizable creative projects. His focus is on turning complex AI workflows into simple, repeatable systems that empower storytellers to produce professional-quality content.",
  },
  {
    name: "ARUN KUMAR",
    img: "/insta3.png",
    short:
      "Ravi Teja is an AI Filmmaker and creative technologist, and one of the lead instructors at AIFA.",
    long: "He specializes in helping creators transform ideas into cinematic visuals using AI—leveraging emerging tools not just for experimentation, but to build real-world, monetizable creative projects. His focus is on turning complex AI workflows into simple, repeatable systems that empower storytellers to produce professional-quality content.",
  },
];

export default function InstructorsSection() {
  return (
    <section className="w-full bg-[#070B14] flex justify-center">
      {/* FIGMA CONTAINER */}
      <div
        className="
        w-full max-w-[1180px]

        px-[16px] sm:px-[40px] lg:px-[93px]
        py-[40px] sm:py-[64px]

        flex flex-col

        gap-[32px] sm:gap-[48px]

        max-sm:px-[16px]
        max-sm:py-[36px]
        max-sm:gap-[28px]
      "
      >
        {/* HEADING */}
        <h2
          className="
            relative
            inline-block

            text-[#F0F0F0]
            font-black
            uppercase
            tracking-[-1px]

            text-[26px]
            sm:text-[34px]
            md:text-[40px]

            leading-[34px]
            sm:leading-[42px]
            md:leading-[48px]

            font-[Montserrat]

            max-sm:text-[28px]
            max-sm:leading-[36px]
          "
        >
          <span className="relative z-10">GET TO KNOW OUR INSTRUCTORS</span>
        </h2>

        {/* GRID */}
        <div
          className="
            grid
            grid-cols-1 sm:grid-cols-2 lg:grid-cols-3

            gap-[12px] sm:gap-[16px]

            max-sm:gap-[16px]
          "
        >
          {instructors.map((person, index) => (
            <div
              key={index}
              className="
                bg-[#282A2C]
                border border-white/10
                rounded-[16px]
                overflow-hidden

                transition duration-300
                hover:scale-[1.02]

                max-sm:rounded-[14px]
              "
            >
              {/* TOP */}
              <div
                className="
                  p-[16px] sm:p-[20px]
                  border-b border-white/10

                  max-sm:p-[16px]
                "
              >
                {/* IMAGE */}
                <div
                  className="
                    w-[48px]
                    h-[48px]

                    sm:w-[64px]
                    sm:h-[64px]

                    rounded-full
                    overflow-hidden

                    mb-[12px]

                    border border-white/20

                    max-sm:w-[56px]
                    max-sm:h-[56px]
                  "
                >
                  <img
                    src={person.img}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* NAME */}
                <h3
                  className="
                    text-[#F0F0F0]
                    font-black

                    text-[18px]
                    sm:text-[22px]
                    md:text-[24px]

                    leading-[24px]
                    sm:leading-[28px]
                    md:leading-[32px]

                    mb-[8px]

                    max-sm:text-[20px]
                    max-sm:leading-[28px]
                  "
                >
                  {person.name}
                </h3>

                {/* SHORT */}
                <p
                  className="
                    text-[#DCDCDC]

                    text-[13px]
                    sm:text-[15px]

                    leading-[20px]
                    sm:leading-[22px]

                    max-sm:text-[14px]
                    max-sm:leading-[22px]
                  "
                >
                  {person.short}
                </p>
              </div>

              {/* BOTTOM */}
              <div
                className="
                  p-[16px] sm:p-[20px]

                  max-sm:p-[16px]
                "
              >
                <p
                  className="
                    text-[#F0F0F0]

                    text-[13px]
                    sm:text-[14px]

                    leading-[20px]
                    sm:leading-[22px]

                    max-sm:text-[14px]
                    max-sm:leading-[22px]
                  "
                >
                  {person.long}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
