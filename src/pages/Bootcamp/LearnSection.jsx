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
    <section className="w-full bg-[#0F1112] flex justify-center">
      {/* FIGMA CONTAINER */}
      <div
        className="
        w-full 
        max-w-[1180px]

        px-[16px] sm:px-[40px] lg:px-[93px]   /* 93px desktop */
        py-[40px] sm:py-[64px]                /* 64px top-bottom */

        flex flex-col 
        items-center 
        gap-[16px]
      "
      >
        {/* HEADING */}
        <h2
          className="
          text-[#F0F0F0]
          font-black

          text-[28px]
          sm:text-[40px]
          md:text-[56px]
          lg:text-[64px]

          leading-[34px]
          sm:leading-[46px]
          md:leading-[62px]
          lg:leading-[70px]

          text-center
        "
        >
          WHAT YOU WILL LEARN
        </h2>

        {/* DESCRIPTION */}
        <p
          className="
          text-[#DCDCDC]
          text-[14px] sm:text-[16px]
          leading-[24px] sm:leading-[28px]

          text-center
          max-w-[720px]
        "
        >
          Master the complete process of creating high-quality, cinematic AI
          videos from idea and prompting to final output.
        </p>

        {/* GRID */}
        <div
          className="
          w-full
          grid
          grid-cols-1 sm:grid-cols-2 md:grid-cols-3

          gap-[12px] sm:gap-[16px]
          mt-[16px]
        "
        >
          {benefits.map((item, index) => (
            <div
              key={index}
              className="
                bg-[#282A2C]
                border border-white/10
                rounded-[16px]

                px-[16px] sm:px-[20px]
                py-[16px] sm:py-[20px]

                text-[#F0F0F0]

                text-[16px] sm:text-[20px] md:text-[24px]
                leading-[24px] sm:leading-[28px] md:leading-[32px]

                font-black

                transition duration-300
                hover:scale-[1.04]
              "
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
