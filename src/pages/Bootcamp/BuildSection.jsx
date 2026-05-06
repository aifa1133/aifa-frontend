"use client";

const data = [
  {
    title: "AI SHORT FILM",
    desc: "Create a complete story-driven video with scenes and visuals.",
    img: "/bootcamp1.jpg",
  },
  {
    title: "PRODUCT AD FILM",
    desc: "Produce a high-quality commercial-style video for products or services.",
    img: "/bootcamp6.jpg",
  },
  {
    title: "SOCIAL MEDIA REELS",
    desc: "Make scroll-stopping content optimized for Instagram, YouTube, and TikTok.",
    img: "/bootcamp3.jpg",
  },
  {
    title: "CINEMATIC POSTERS",
    desc: "Design high-impact visuals for storytelling and marketing.",
    img: "/bootcamp4.jpg",
  },
  {
    title: "PORTFOLIO-READY PROJECTS",
    desc: "Build a professional portfolio to showcase your work or get clients.",
    img: "/bootcamp5.jpg",
  },
];

export default function BuildSection() {
  return (
    <section className="w-full bg-[#070B14] flex justify-center">
      {/* FIGMA CONTAINER */}
      <div
        className="
        w-full 
        max-w-[1180px]

        px-[16px] sm:px-[40px] lg:px-[93px]
        py-[40px] sm:py-[64px]

        flex flex-col gap-[48px] sm:gap-[64px]
      "
      >
        {/* HEADER */}
        <div className="text-center flex flex-col gap-[12px]">
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
          "
          >
            WHAT YOU WILL BUILD
          </h2>

          <p
            className="
            text-[#DCDCDC]
            text-[14px] sm:text-[16px]
            leading-[24px] sm:leading-[28px]
            max-w-[720px]
            mx-auto
          "
          >
            Build real, portfolio-ready projects as you learn films, ads, and
            social content created step by step.
          </p>
        </div>

        {/* ZIG-ZAG LIST */}
        <div className="flex flex-col gap-[40px] sm:gap-[64px]">
          {data.map((item, index) => (
            <div
              key={index}
              className={`
                flex flex-col
                lg:flex-row
                items-center
                gap-[24px] sm:gap-[40px]

                ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}
              `}
            >
              {/* TEXT */}
              <div className="flex-1 text-center lg:text-left">
                <p
                  className="
                  text-[#F0F0F0]
                  text-[14px] sm:text-[18px]
                  leading-[24px] sm:leading-[28px]
                  font-bold
                  mb-2
                "
                >
                  BEGINNER
                </p>

                <h3
                  className="
                  text-[#F0F0F0]
                  font-black

                  text-[22px]
                  sm:text-[28px]
                  md:text-[32px]

                  leading-[28px]
                  sm:leading-[36px]
                  md:leading-[40px]

                  mb-3
                "
                >
                  {item.title}
                </h3>

                <p
                  className="
                  text-[#DCDCDC]
                  text-[14px] sm:text-[16px]
                  leading-[22px] sm:leading-[24px]
                  max-w-[420px]
                  mx-auto lg:mx-0
                "
                >
                  {item.desc}
                </p>
              </div>

              {/* IMAGE */}
              <div className="flex-1 w-full">
                <img
                  src={item.img}
                  alt={item.title}
                  className="
                    w-full
                    h-[200px]
                    sm:h-[260px]
                    md:h-[300px]

                    rounded-[120px] sm:rounded-[160px] lg:rounded-[200px]
                    object-cover
                  "
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
