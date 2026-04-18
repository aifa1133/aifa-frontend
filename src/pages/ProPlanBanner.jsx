"use client";

export default function ProPlanBanner() {
  return (
    <section className="w-full bg-[#0B0F10] py-16 flex justify-center">
      <div className="relative w-full max-w-6xl rounded-[40px] overflow-hidden px-6 md:px-12 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-10">

        {/* 🖼️ BACKGROUND FRAME IMAGE */}
        <img
          src="/courses/frame.png" // 👈 YOUR FRAME IMAGE
          alt="frame"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* 🎨 GREEN OVERLAY */}
        <div className="absolute inset-0 bg-[#B7D63A]/90 z-10"></div>

        {/* ⚡ STRIPES */}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(120deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:250px_250px] opacity-40"></div>

        {/* 📝 CONTENT */}
        <div className="relative z-20 max-w-lg">
          <p className="text-black text-sm font-semibold mb-3">
            AIFA PRO Plan
          </p>

          <h2 className="text-black text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            ONE PAYMENT. <br /> LIFETIME ACCESS.
          </h2>

          <p className="text-black/80 text-sm md:text-base mb-6">
            Own every current and future AIFA course for{" "}
            <span className="font-semibold">just $99.</span>
          </p>

          {/* BUTTON */}
          <button className="bg-black text-white px-6 py-3 rounded-md text-sm font-medium hover:opacity-90 transition">
            + Get Access
          </button>
        </div>

        {/* 🎯 RIGHT IMAGE */}
        <div className="relative z-20 w-full md:w-[40%] flex justify-center">
          <img
           src="/courses/coursebanner.png" // 👈 YOUR MAIN IMAGE
            alt="illustration"
            className="w-full max-w-xs md:max-w-sm object-contain"
          />
        </div>

      </div>
    </section>
  );
}

