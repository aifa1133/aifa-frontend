"use client";

function Feature({ icon, text }) {
  return (
    <div className="flex items-center gap-[10px]">
      <img src={icon} alt={text} className="w-[18px] h-[18px] object-contain" />

      <p
        className="
          text-[#F0F0F0]
          text-[14px]
          sm:text-[15px]
          font-medium
          leading-[22px]
        "
      >
        {text}
      </p>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="w-[1330px] bg-[#0F1112] flex justify-center py-24">
      {/* MAIN CONTAINER */}
      <div
        className="
          w-full
          max-w-[1400px]
          xl:max-w-[1600px]

          px-[16px]
          sm:px-[40px]
          lg:px-[50px]

          py-[40px]
          sm:py-[50px]
        "
      >
        {/* CARD */}
        <div
          className="
            w-full

            rounded-[22px]
            border border-[#767779]
            bg-[#282A2C]

            p-[24px]
            sm:p-[40px]
            lg:p-[50px]

            flex
            flex-col
            lg:flex-row

            items-start
            gap-[40px]
          "
        >
          {/* LEFT CONTENT */}
          <div className="flex-1 flex flex-col items-start">
            <p
              className="
                text-[#D0E46A]
                font-bold

                text-[14px]
                sm:text-[16px]

                tracking-[1px]
                uppercase

                mb-[14px]
              "
            >
              A COURSE YOU’LL ACTUALLY FINISH
            </p>

            <h1
              className="
                text-[#F0F0F0]
                font-black

                text-[32px]
                sm:text-[48px]
                lg:text-[64px]

                leading-[38px]
                sm:leading-[56px]
                lg:leading-[72px]

                max-w-[650px]

                mb-[28px]
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
                bg-[#D0E46A]
                text-black
                font-bold

                px-[24px]
                py-[14px]

                rounded-[12px]

                transition-all
                duration-300

                hover:scale-[1.04]
                active:scale-[0.98]

                shadow-[0_0_25px_rgba(208,228,106,0.20)]
              "
            >
              ENROLL NOW
            </button>
          </div>

          {/* RIGHT FEATURES */}
        <div
  className="
    flex-1
    w-full

    flex
    flex-col

    gap-[20px]

    items-start
  "
>
  <Feature
    icon="/bootcampicons/icon1.svg"
    text="Beginner"
  />

  <Feature
    icon="/bootcampicons/icon2.svg"
    text="20 Assignments"
  />

  <Feature
    icon="/bootcampicons/icon3.svg"
    text="Downloadable Content"
  />

  <Feature
    icon="/bootcampicons/icon4.svg"
    text="Hands-on Training"
  />

  <Feature
    icon="/bootcampicons/icon5.svg"
    text="Portfolio Mentorship"
  />

  <Feature
    icon="/bootcampicons/icon6.svg"
    text="Certificate"
  />

  <Feature
    icon="/bootcampicons/icon7.svg"
    text="Class Recordings"
  />

  <Feature
    icon="/bootcampicons/icon8.svg"
    text="1 Month Duration"
  />
</div>
</div>
      </div>
    </section>
  );
}
