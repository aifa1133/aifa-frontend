"use client";

function Feature({ icon, text }) {
  return (
    <div className="flex items-center gap-[10px]">
      <img src={icon} alt="" className="w-[16px] h-[16px]" />
      <p className="text-[#F0F0F0] text-[14px]">{text}</p>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="w-full bg-[#0F1112] flex justify-center">
      {/* CONTAINER */}
      <div
        className="
        w-full 
        max-w-[1400px] xl:max-w-[1600px]
        px-[16px] sm:px-[40px] lg:px-[50px]
        py-[40px] sm:py-[50px]
      "
      >
        {/* CARD */}
        <div
          className="
          w-full
          bg-[#151718]
          border border-[#2A2D2F]
          rounded-[24px]

          px-[20px] sm:px-[32px] md:px-[48px]
          py-[24px] sm:py-[32px] md:py-[40px]

          flex flex-col lg:flex-row
          items-start
          gap-[24px] sm:gap-[40px]
        "
        >
          {/* LEFT */}
          <div className="flex-1 flex flex-col">
            <p
              className="
              text-[#D0E46A]
              font-bold
              text-[14px] sm:text-[16px] md:text-[18px]
              leading-[28px]
              mb-3
            "
            >
              A COURSE YOU’LL ACTUALLY FINISH
            </p>

            <h1
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

              mb-6
              max-w-[560px]
            "
            >
              Build AI-Powered Films <br />
              An AI Fellowship for <br />
              Creators
            </h1>

            <button
              className="
              w-fit
              bg-[#D0E46A]
              text-black
              font-bold

              px-[20px] sm:px-[24px]
              py-[10px] sm:py-[12px]

              rounded-[10px]

              hover:scale-[1.05]
              active:scale-[0.97]
              transition
              shadow-[0_0_20px_rgba(208,228,106,0.25)]
            "
            >
              ENROLL NOW
            </button>
          </div>

          {/* RIGHT → FIXED GRID */}
          <div
            className="
            flex-1
            grid grid-cols-1 sm:grid-cols-2
            gap-x-[40px]
            gap-y-[14px]
          "
          >
            <Feature icon="/bootcampicons/icon1.svg" text="Beginner" />
            <Feature icon="/bootcampicons/icon2.svg" text="20 Assignments" />
            <Feature
              icon="/bootcampicons/icon3.svg"
              text="Downloadable Content"
            />
            <Feature icon="/bootcampicons/icon4.svg" text="Hands-on Training" />
            <Feature
              icon="/bootcampicons/icon5.svg"
              text="Portfolio Mentorship"
            />
            <Feature icon="/bootcampicons/icon6.svg" text="Certificate" />
            <Feature icon="/bootcampicons/icon7.svg" text="Class Recordings" />
            <Feature icon="/bootcampicons/icon8.svg" text="1 Month duration" />
          </div>
        </div>
      </div>
    </section>
  );
}
