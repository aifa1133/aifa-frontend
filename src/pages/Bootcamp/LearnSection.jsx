"use client";

const benefits = [
  "UNDERSTAND AI VIDEO MODELS",
  "MASTER PROMPTING FOR VISUALS",
  "CREATE CINEMATIC SCENES",
  "CONTROL STYLE & CONSISTENCY",
  "BUILD END-TO-END VIDEOS",
  "USE AI TOOLS & WORKFLOWS",
  "CREATE ADS & SOCIAL CONTENT",
  "EDIT & ENHANCE WITH AI",
  "BUILD A STRONG PORTFOLIO",
];

export default function LearnSection() {
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

          flex
          flex-col
          justify-center
          items-center

          px-[93px]
          py-[64px]

          max-sm:px-[16px]
          max-sm:py-[40px]
        "
      >
        {/* INNER */}
        <div
          className="
            w-full
            max-w-[1180px]

            flex
            flex-col
            items-center

            gap-[20px]

            max-sm:gap-[14px]
          "
        >
          {/* TITLE */}
          <h2
            className="
              text-[#F0F0F0]

              text-center
              font-black

              text-[64px]
              leading-[70px]

              tracking-[-1.5px]

              max-sm:text-[34px]
              max-sm:leading-[42px]
              max-sm:tracking-[-1px]
            "
          >
            WHAT YOU WILL LEARN
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              max-w-[760px]

              text-center

              text-[#CFCFCF]

              text-[18px]
              font-normal
              leading-[30px]

              max-sm:text-[15px]
              max-sm:leading-[26px]
            "
          >
            Master the complete process of creating high-quality, cinematic AI
            videos from idea and prompting to final output.
          </p>

          {/* GRID */}
          <div
            className="
              mt-[18px]

              w-full

              grid
              grid-cols-3

              gap-[18px]

              max-sm:grid-cols-1
              max-sm:gap-[14px]
              max-sm:mt-[12px]
            "
          >
            {benefits.map((item, index) => (
              <div
                key={index}
                className="
                  w-full

                  flex
                  items-center

                  px-[25px]
                  py-[22px]

                  rounded-[24px]

                  bg-[#282A2C]

                  border
                  border-[#343638]

                  min-h-[96px]

                  transition-all
                  duration-300

                  hover:border-[#D0E46A]
                  hover:translate-y-[-4px]

                  max-sm:px-[18px]
                  max-sm:py-[16px]
                  max-sm:rounded-[18px]
                "
              >
                <p
                  className="
                    w-full

                    text-[#F0F0F0]

                    font-['Montserrat']

                    text-[22px]
                    font-black

                    leading-[30px]

                    max-sm:text-[18px]
                    max-sm:leading-[26px]
                  "
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
