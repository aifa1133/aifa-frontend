"use client";

function Feature({ icon, text }) {
  return (
    <div
      className="
        flex
        items-center
        gap-[10px]
        self-stretch
      "
    >
      <img
        src={icon}
        alt={text}
        className="
          w-[18px]
          h-[18px]
          object-contain
          shrink-0

          max-sm:w-[16px]
          max-sm:h-[16px]
        "
      />

      <p
        className="
          text-[#F0F0F0]
          text-[16px]
          font-medium
          leading-[24px]
          tracking-[0px]

          max-sm:text-[14px]
          max-sm:leading-[22px]
        "
      >
        {text}
      </p>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      className="
        w-full
        bg-[#0F1112]

        flex
        justify-center
      "
    >
      {/* FIGMA OUTER CONTAINER */}
      <div
        className="
          w-full
          max-w-[1440px]

          flex
          flex-col
          justify-center
          items-center

          px-[93px]
          py-[64px]

          bg-[#0F1112]

          max-sm:px-[16px]
          max-sm:py-[32px]
        "
      >
        {/* FIGMA INNER CONTAINER */}
        <div
          className="
            flex
            justify-between
            items-center
            self-stretch

            w-full

            rounded-[24px]
            border border-[#767779]
            bg-[#282A2C]

            px-[56px]
            py-[56px]

            gap-[80px]

            max-sm:flex-col
            max-sm:items-start
            max-sm:px-[20px]
            max-sm:py-[24px]
            max-sm:gap-[40px]
          "
        >
          {/* LEFT CONTENT */}
          <div
            className="
              flex
              flex-col
              items-start

              max-w-[620px]

              max-sm:max-w-full
            "
          >
            <p
              className="
                text-[#D0E46A]

                text-[14px]
                font-bold
                uppercase

                tracking-[1.5px]
                leading-[20px]

                mb-[18px]

                max-sm:text-[12px]
                max-sm:leading-[18px]
                max-sm:mb-[14px]
              "
            >
              A COURSE YOU’LL ACTUALLY FINISH
            </p>

            <h1
              className="
                text-[#F0F0F0]

                text-[64px]
                font-black

                leading-[72px]
                tracking-[-1.5px]

                mb-[32px]

                max-sm:text-[34px]
                max-sm:leading-[42px]
                max-sm:tracking-[-1px]
                max-sm:mb-[24px]
              "
            >
              Build AI-Powered
              <br />
              Films An AI
              <br />
              Fellowship for Creators
            </h1>

            <button
              className="
                flex
                items-center
                justify-center

                bg-[#D0E46A]
                text-black

                text-[15px]
                font-bold
                leading-[20px]

                px-[28px]
                py-[16px]

                rounded-[14px]

                transition-all
                duration-300

                hover:scale-[1.03]

                max-sm:w-full
                max-sm:text-[14px]
                max-sm:px-[20px]
                max-sm:py-[14px]
              "
            >
              ENROLL NOW
            </button>
          </div>

          {/* RIGHT FEATURES */}
          <div
            className="
              flex
              flex-col

              justify-center
              items-start

              gap-[22px]

              min-w-[320px]

              max-sm:min-w-full
              max-sm:gap-[18px]
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

            <Feature icon="/bootcampicons/icon8.svg" text="1 Month Duration" />
          </div>
        </div>
      </div>
    </section>
  );
}
