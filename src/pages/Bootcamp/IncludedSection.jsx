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
    <section className="w-full bg-[#5C6335] flex justify-center relative overflow-hidden">
      {/* GLOW */}
      <div className="absolute right-0 top-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-[#D9E7A3]/20 blur-[120px] rounded-full" />

      {/* FIGMA CONTAINER */}
      <div
        className="
        relative
        w-full max-w-[1180px]

        px-[16px] sm:px-[40px] lg:px-[93px]
        py-[40px] sm:py-[64px]

        grid lg:grid-cols-2
        gap-[32px] sm:gap-[48px]
        items-center
      "
      >
        {/* LEFT */}
        <div>
          <h2
            className="
            text-[#F0F0F0]
            font-black

            text-[28px]
            sm:text-[36px]
            md:text-[40px]

            leading-[34px]
            sm:leading-[44px]
            md:leading-[48px]

            mb-4 sm:mb-6
          "
          >
            WHAT’S INCLUDED <br /> WITH THE <br /> BOOTCAMP
          </h2>

          <p
            className="
            text-[#DCDCDC]
            text-[14px] sm:text-[16px]
            leading-[22px] sm:leading-[24px]
            mb-6 sm:mb-10
            max-w-[420px]
          "
          >
            Everything you need to learn, build, and grow with AI inside and
            beyond the course.
          </p>

          <div className="w-[200px] sm:w-[260px] md:w-[320px]">
            <img
              src="/testing2.png"
              alt="illustration"
              className="w-full object-contain drop-shadow-xl"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-[12px] sm:gap-[16px]">
          {items.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-[16px] p-[1px] bg-gradient-to-br from-white/20 to-transparent"
            >
              <div
                className="
                relative
                rounded-[16px]
                bg-[#D9E7A3]/95

                px-[16px] sm:px-[24px]
                py-[14px] sm:py-[18px]

                border border-white/20
                transition duration-300
                hover:scale-[1.03]
              "
              >
                {/* GLOW */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-white/10 blur-xl rounded-[16px]" />

                <h3
                  className="
                  relative z-10
                  text-[#585F37]
                  font-black

                  text-[18px]
                  sm:text-[22px]
                  md:text-[24px]

                  leading-[24px]
                  sm:leading-[28px]
                  md:leading-[32px]

                  mb-1
                "
                >
                  {item.title}
                </h3>

                <p className="relative z-10 text-[12px] sm:text-[13px] text-[#4B4B4B]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
