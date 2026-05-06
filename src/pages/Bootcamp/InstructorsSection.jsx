"use client";

const instructors = [
  {
    name: "RAVI TEJA",
    img: "/insta1.png",
    short:
      "Ravi Teja is an AI Filmmaker and creative technologist, and one of the lead instructors at AIFA.",
    long: "He specializes in helping creators transform ideas into cinematic visuals using AI—leveraging emerging tools not just for experimentation, but to build real-world, monetizable creative projects.",
  },
  {
    name: "SHERIN",
    img: "/insta2.png",
    short:
      "Ravi Teja is an AI Filmmaker and creative technologist, and one of the lead instructors at AIFA.",
    long: "He specializes in helping creators transform ideas into cinematic visuals using AI—leveraging emerging tools not just for experimentation, but to build real-world, monetizable creative projects.",
  },
  {
    name: "ARUN KUMAR",
    img: "/insta3.png",
    short:
      "Ravi Teja is an AI Filmmaker and creative technologist, and one of the lead instructors at AIFA.",
    long: "He specializes in helping creators transform ideas into cinematic visuals using AI—leveraging emerging tools not just for experimentation, but to build real-world, monetizable creative projects.",
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
        flex flex-col gap-[32px] sm:gap-[48px]
      "
      >
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
        "
        >
          GET TO KNOW OUR INSTRUCTORS
        </h2>

        {/* GRID */}
        <div
          className="
          grid
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          gap-[12px] sm:gap-[16px]
        "
        >
          {instructors.map((person, index) => (
            <div
              key={index}
              className="
                bg-gradient-to-b from-[#1A1F2E] to-[#0F172A]
                border border-white/10
                rounded-[16px]
                overflow-hidden

                transition duration-300
                hover:scale-[1.02]
              "
            >
              {/* TOP */}
              <div className="p-[16px] sm:p-[20px] border-b border-white/10">
                {/* IMAGE */}
                <div className="w-[48px] h-[48px] sm:w-[64px] sm:h-[64px] rounded-full overflow-hidden mb-[12px] border border-white/20">
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
                "
                >
                  {person.name}
                </h3>

                {/* SHORT */}
                <p
                  className="
                  text-[#DCDCDC]
                  text-[13px] sm:text-[15px]
                  leading-[20px] sm:leading-[22px]
                "
                >
                  {person.short}
                </p>
              </div>

              {/* BOTTOM */}
              <div className="p-[16px] sm:p-[20px]">
                <p
                  className="
                  text-[#F0F0F0]
                  text-[13px] sm:text-[14px]
                  leading-[20px] sm:leading-[22px]
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
