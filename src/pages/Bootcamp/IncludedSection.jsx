"use client";

const items = [
  {
    title: "LIFETIME AIFA MEMBERSHIP",
    desc: "Access to the AIFA ecosystem, updates, and opportunities.",
  },
  {
    title: "STEP-BY-STEP CURRICULUM",
    desc: "Follow a clear path from basics to advanced.",
  },
  {
    title: "DOWNLOADABLE PROJECT FILES",
    desc: "Access all files and resources used in the course.",
  },
  {
    title: "LIVE SESSION RECORDINGS",
    desc: "Get access to all session recordings to revisit lessons anytime.",
  },
  {
    title: "ASSIGNMENTS & PRACTICAL EXERCISES",
    desc: "Apply what you learn through hands-on projects.",
  },
  {
    title: "CERTIFICATE OF COMPLETION",
    desc: "Showcase your skills with a verified certificate.",
  },
];

export default function IncludedSection() {
  return (
    <section className="w-full bg-[#585F37] flex justify-center relative overflow-hidden">
      {/* GLOW */}
      <div className="absolute right-0 top-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-[#D9E7A3]/20 blur-[120px] rounded-full" />

      {/* FIGMA EXACT CONTAINER */}
      <div
        className="
          relative

          w-full
          max-w-[1366px]

          flex
          flex-col

          items-start

          gap-[10px]

          px-[93px]
          py-[64px]

          bg-[#585F37]

          max-sm:px-[16px]
          max-sm:py-[40px]
        "
      >
        {/* INNER GRID */}
        <div
          className="
            w-full
            max-w-[1180px]

            grid
            lg:grid-cols-2

            items-center

            gap-[48px]

            max-sm:grid-cols-1
            max-sm:gap-[32px]
          "
        >
          {/* LEFT */}
          <div>
            <h2
              className="
                text-[#F0F0F0]
                font-black

                text-[40px]
                leading-[48px]

                tracking-[-1px]

                mb-[24px]

                max-sm:text-[34px]
                max-sm:leading-[42px]
              "
            >
              WHAT’S INCLUDED <br /> WITH THE <br /> BOOTCAMP
            </h2>

            <p
              className="
                text-[#DCDCDC]

                text-[16px]
                leading-[24px]

                mb-[40px]

                max-w-[420px]

                max-sm:text-[14px]
                max-sm:leading-[22px]
                max-sm:mb-[24px]
              "
            >
              Everything you need to learn, build, and grow with AI inside and
              beyond the course.
            </p>

            <div className="w-[320px] max-sm:w-[220px]">
              <img
                src="/testing2.png"
                alt="illustration"
                className="w-full object-contain drop-shadow-xl"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="
              flex
              flex-col

              gap-[16px]

              max-sm:gap-[12px]
            "
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="
                  group
                  relative

                  rounded-[16px]

                  p-[1px]

                  bg-gradient-to-br
                  from-white/20
                  to-transparent
                "
              >
                <div
                  className="
                    relative

                    rounded-[16px]

                    bg-[#D9E7A3]/95

                    px-[24px]
                    py-[18px]

                    border
                    border-white/20

                    transition
                    duration-300

                    hover:scale-[1.03]

                    max-sm:px-[16px]
                    max-sm:py-[14px]
                  "
                >
                  {/* GLOW */}
                  <div
                    className="
                      absolute
                      inset-0

                      opacity-0
                      group-hover:opacity-100

                      transition

                      bg-white/10
                      blur-xl

                      rounded-[16px]
                    "
                  />

                  <h3
                    className="
                      relative
                      z-10

                      text-[#585F37]
                      font-black

                      text-[24px]
                      leading-[32px]

                      mb-1

                      max-sm:text-[18px]
                      max-sm:leading-[26px]
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      relative
                      z-10

                      text-[#4B4B4B]

                      text-[13px]

                      max-sm:text-[12px]
                    "
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}