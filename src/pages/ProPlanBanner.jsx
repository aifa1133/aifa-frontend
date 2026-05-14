"use client";

export default function ProPlanBanner() {
  return (
    <section className="w-full bg-[#0B0F10] py-16 flex justify-center">
      <div
        className="
          relative
          w-full
          max-w-6xl
          rounded-[40px]
          overflow-hidden
          
          /* FIGMA VALUES */
          px-[93px]
          py-[48px]

          flex
          flex-col
          justify-center
          items-center
          gap-[10px]
          self-stretch
        "
      >
        {/* 🖼️ BACKGROUND FRAME IMAGE */}
        <img
          src="/courses/frame.png"
          alt="frame"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* 🎨 GREEN OVERLAY */}
        <div className="absolute inset-0 bg-[#B7D63A]/90 z-10"></div>

        {/* ⚡ STRIPES */}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(120deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:250px_250px] opacity-40"></div>

        {/* CONTENT WRAPPER */}
        <div className="relative z-20 w-full flex flex-col md:flex-row items-center justify-between gap-10">
          {/* 📝 CONTENT */}
          <div className="max-w-lg">
            <p className="text-black text-sm font-semibold mb-3">
              AIFA PRO Plan
            </p>

            <h2
              className="
    text-[#0F1112]
    font-[Montserrat]
    text-[48px]
    font-black
    leading-[56px]
    mb-4
  "
            >
              ONE PAYMENT. <br /> LIFETIME ACCESS.
            </h2>

            <p
              className="
    text-[#0F1112]
    font-[Montserrat]
    text-[18px]
    font-medium
    leading-[28px]
    mb-6
  "
            >
              Own every current and future AIFA course for{" "}
              <span
                className="
      font-[Montserrat]
      text-[18px]
      font-bold
      leading-[28px]
      text-[#0F1112]
    "
              >
                just ₹9,999
              </span>
            </p>

            {/* BUTTON */}
            <button
              className="
    flex
    justify-center
    items-center
    gap-[8px]
    
    px-[16px]
    py-[8px]

    rounded-[4px]

    bg-[#F0F0F0]
    text-[#0F1112]

    font-[Montserrat]
    text-[16px]
    font-semibold
    leading-[24px]

    [font-variant:all-small-caps]

    hover:opacity-90
    transition
  "
            >
              UNLOCK LIFETIME ACCESS
            </button>
          </div>

          {/* 🎯 RIGHT IMAGE */}
          <div className="w-full md:w-[40%] flex justify-center">
            <img
              src="/courses/coursebanner.png"
              alt="illustration"
              className="w-full max-w-xs md:max-w-sm object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
