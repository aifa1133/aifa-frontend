"use client";

export default function VideoSection({
  image = "/videoimg.png",
  onPlay = () => {},
}) {
  return (
    <section className="w-full bg-[#0B0D0E] flex justify-center">
      {/* FIGMA CONTAINER */}
      <div
        className="
        w-full
        max-w-[1180px]

        px-[16px] sm:px-[40px] lg:px-[93px]   /* 93px desktop */
        py-[40px] sm:py-[64px]                /* 64px top/bottom */

        flex flex-col items-center
      "
      >
        {/* VIDEO CARD */}
        <div
          className="
          relative 
          w-full 
          rounded-[12px] sm:rounded-[16px]
          overflow-hidden
        "
        >
          {/* IMAGE */}
          <img
            src={image}
            alt="Video Preview"
            className="
              w-full 
              h-[200px]
              sm:h-[320px]
              md:h-[420px]
              lg:h-[520px]
              object-cover
            "
          />

          {/* GRADIENT OVERLAY */}
          <div
            className="
            absolute inset-0
            bg-gradient-to-r 
            from-black/70 
            via-transparent 
            to-black/70
          "
          />

          {/* PLAY BUTTON */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={onPlay}
              className="
                flex items-center justify-center gap-[10px]

                w-[120px] sm:w-[160px] md:w-[200px]
                h-[50px] sm:h-[70px] md:h-[90px]

                rounded-[8px]
                bg-[#D0E46A]/80
                hover:bg-[#D0E46A]

                transition
                active:scale-[0.95]
                shadow-[0_0_20px_rgba(208,228,106,0.25)]
              "
            >
              <img
                src="/Polygon 2.svg"
                alt="Play"
                className="w-[16px] sm:w-[20px] md:w-[24px]"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
