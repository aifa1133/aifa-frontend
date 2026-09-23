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
          className="w-full max-w-[1180px] rounded-[18px] overflow-hidden border border-[#2E3133] shadow-[0_20px_80px_rgba(0,0,0,0.45)] max-sm:rounded-[14px]"
          style={{ padding: "56.25% 0 0 0", position: "relative" }}
        >
          <iframe
            src="https://player.vimeo.com/video/1229658722?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            title="Bootcamp Preview"
          />
        </div>
      </div>
    </section>
  );
}
