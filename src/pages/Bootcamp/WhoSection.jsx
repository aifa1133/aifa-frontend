"use client";

const steps = [
  {
    title: "FILMMAKERS & VIDEO CREATORS",
    desc: "Level up your storytelling with AI-powered video creation.",
  },
  {
    title: "AD & MARKETING PROFESSIONALS",
    desc: "Create high-converting ads and brand content using AI tools.",
  },
  {
    title: "CONTENT CREATORS & INFLUENCERS",
    desc: "Produce scroll-stopping reels and videos faster with AI.",
  },
  {
    title: "DESIGNERS & CREATIVE PROFESSIONALS",
    desc: "Expand your skillset with AI-driven visuals and workflows.",
  },
  {
    title: "FREELANCERS & AGENCY OWNERS",
    desc: "Offer AI video services and grow your income streams.",
  },
];

export default function WhoSection() {
  return (
    <section className="w-full bg-[#070B14] flex justify-center">
      {/* FIGMA CONTAINER */}
      <div
        className="
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
          <p
            className="
            text-[#F0F0F0]
            font-bold

            text-[14px]
            sm:text-[16px]
            md:text-[18px]

            leading-[22px]
            sm:leading-[26px]
            md:leading-[28px]

            mb-2 sm:mb-3
          "
          >
            WHO IT’S FOR?
          </p>

          <h2
            className="
            text-[#F0F0F0]
            font-black

            text-[28px]
            sm:text-[40px]
            md:text-[48px]

            leading-[34px]
            sm:leading-[44px]
            md:leading-[52px]

            mb-4 sm:mb-6
          "
          >
            RECRUITMENT <br /> PROCESS
          </h2>

          <p
            className="
            text-[#DCDCDC]
            text-[13px] sm:text-[14px]
            leading-[20px] sm:leading-[22px]
            max-w-[420px]
          "
          >
            Designed for creators, professionals, and beginners looking to build
            with AI.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-[12px] sm:gap-[16px]">
          {steps.map((step, index) => (
            <div
              key={index}
              className="
                bg-[#282A2C]
                border border-white/10
                rounded-[16px]

                px-[16px] sm:px-[20px]
                py-[14px] sm:py-[18px]

                transition duration-300
                hover:scale-[1.02]
              "
            >
              <h3
                className="
                text-[#F0F0F0]
                font-black

                text-[16px]
                sm:text-[20px]
                md:text-[22px]

                leading-[22px]
                sm:leading-[28px]

                mb-1
              "
              >
                {step.title}
              </h3>

              <p
                className="
                text-[#DCDCDC]
                text-[12px] sm:text-[13px]
                leading-[18px] sm:leading-[20px]
              "
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
