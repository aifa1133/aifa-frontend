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

          gap-[10px]

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

            grid
            grid-cols-2

            items-center

            gap-[80px]

            max-sm:grid-cols-1
            max-sm:gap-[36px]
          "
        >
          {/* LEFT SIDE */}
          <div
            className="
              flex
              flex-col

              items-start

              gap-[18px]

              max-sm:gap-[14px]
            "
          >
            {/* SMALL LABEL */}
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
              WHO IT’S FOR?
            </p>

            {/* MAIN HEADING */}
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
              RECRUITMENT
              <br />
              PROCESS
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
                max-w-[470px]

                text-[#CFCFCF]

                text-[18px]
                leading-[30px]

                max-sm:max-w-full
                max-sm:text-[15px]
                max-sm:leading-[26px]
              "
            >
              Designed for creators, professionals, and beginners looking to
              build with AI.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div
            className="
              w-full

              flex
              flex-col

              gap-[16px]

              max-sm:gap-[12px]
            "
          >
            {steps.map((step, index) => (
              <div
                key={index}
                className="
                  flex
                  flex-col

                  items-start

                  gap-[10px]

                  self-stretch

                  p-[15px]

                  rounded-[24px]

                  bg-[#282A2C]

                  border
                  border-[#343638]

                  transition-all
                  duration-300

                  hover:border-[#D0E46A]
                  hover:translate-x-[6px]

                  max-sm:p-[16px]
                  max-sm:rounded-[18px]
                  max-sm:gap-[8px]
                "
              >
                {/* TITLE */}
                <h3
                  className="
                    self-stretch

                    text-[#F0F0F0]

                    font-black

                    text-[24px]
                    leading-[32px]

                    tracking-[-0.5px]

                    max-sm:text-[18px]
                    max-sm:leading-[26px]
                  "
                >
                  {step.title}
                </h3>

                {/* DESCRIPTION */}
                <p
                  className="
                    self-stretch

                    text-[#CFCFCF]

                    text-[15px]
                    leading-[24px]

                    max-sm:text-[14px]
                    max-sm:leading-[22px]
                  "
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
