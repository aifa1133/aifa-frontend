"use client";

export default function CTASection() {
  return (
    <section className="w-full bg-[#0B0F10] py-20 flex justify-center">
      
      {/* BIG CONTAINER */}
      <div className="w-full max-w-7xl bg-[#a893cf] rounded-[40px] px-6 md:px-16 py-16 text-center">

        {/* AVATAR */}
        <div className="flex justify-center mb-8">
          <img
            src="/avatar/avatar1.png"
            alt="avatar"
            className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover"
          />
        </div>

        {/* HEADING */}
        <h2 className="text-black text-3xl md:text-6xl font-extrabold leading-tight mb-10">
          BOOK A FREE 30 MINS <br />
          CALL WITH OUR COUNSELLOR
        </h2>

        {/* BUTTON */}
        <button className="bg-[#C7E36B] text-black px-8 py-4 text-base font-semibold rounded-md hover:opacity-90 transition">
          + DISCOVER OUR JOB POSITINGS →
        </button>

      </div>
    </section>
  );
}