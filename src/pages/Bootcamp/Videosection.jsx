"use client";

export default function VideoSection({
  image = "/videoimg.png",
  onPlay = () => {},
}) {
  return (
    <section
      className="
        w-full

        flex
        justify-center

        bg-[#0B0D0E]
      "
    >
      {/* FIGMA EXACT OUTER CONTAINER */}
      <div
        className="
          relative

          w-full
          max-w-[1366px]

          flex
          flex-col
          justify-center
          items-center

          self-stretch

          px-[93px]
          py-[64px]

          overflow-hidden

          max-sm:px-[16px]
          max-sm:py-[40px]
        "
      >
        {/* RADIAL GRADIENT BG */}
        <div
          className="
            absolute
            inset-0

            bg-[radial-gradient(50.09%_50.09%_at_50%_49.95%,rgba(208,228,106,0.50)_0%,rgba(153,153,153,0.00)_100%)]

            pointer-events-none
          "
        />

        {/* VIDEO CARD */}
        <div
          className="
            relative

            w-full
            max-w-[1180px]

            rounded-[18px]

            overflow-hidden

            border
            border-[#2E3133]

            shadow-[0_20px_80px_rgba(0,0,0,0.45)]

            max-sm:rounded-[14px]
          "
        >
          {/* IMAGE */}
          <img
            src={image}
            alt="Video Preview"
            className="
              w-full

              h-[601px]

              object-cover

              max-sm:h-[240px]
            "
          />

          {/* DARK OVERLAY */}
          <div
            className="
              absolute
              inset-0

              bg-black/25
            "
          />

          {/* CENTER PLAY BUTTON */}
          <div
            className="
              absolute
              inset-0

              flex
              items-center
              justify-center
            "
          >
            <button
              onClick={onPlay}
              className="
                flex
                items-center
                justify-center

                w-[180px]
                h-[70px]

                bg-[#D0E46A]

                transition-all
                duration-300

                hover:scale-[1.05]
                active:scale-[0.96]

                shadow-[0_0_40px_rgba(208,228,106,0.45)]

                max-sm:w-[90px]
                max-sm:h-[50px]
              "
            >
              <img
                src="/Polygon 2.svg"
                alt="Play"
                className="
                  w-[28px]
                  h-[28px]

                  ml-[6px]

                  max-sm:w-[18px]
                  max-sm:h-[18px]
                  max-sm:ml-[3px]
                "
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
