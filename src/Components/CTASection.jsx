"use client";

export default function CTASection() {
  return (
    <section className="w-full bg-[#0F1112] flex justify-center">
      {/* OUTER FRAME (Figma Frame) */}
      <div className="w-[1366px] px-[93px] py-[64px] flex flex-col items-center gap-[10px]">
        {/* INNER CARD */}
        <div className="w-full bg-[#A893CF] rounded-[40px] py-[64px] flex flex-col items-center text-center">
          {/* AVATAR */}
          <div className="mb-8">
            <div className="w-[201px] h-[201px] rounded-full overflow-hidden bg-[#E4A76D]">
              <img
                src="/avatar/avatar1.png"
                alt="avatar"
                className="w-full h-[550px] object-cover"
              />
            </div>
          </div>

          {/* HEADING */}
          <h2
            className="text-[#000000] font-montserrat font-black 
        text-[36px] leading-[42px] 
        sm:text-[48px] sm:leading-[56px] 
        md:text-[64px] md:leading-[70px] 
        tracking-[-0.5px] mb-10"
          >
            BOOK A FREE 30 MINS <br />
            CALL WITH OUR COUNSELLOR
          </h2>

          {/* BUTTON */}
          <button
            className="flex items-center justify-center gap-[4px]
        h-[52px] px-[30px]
        bg-[#D0E46A] text-[#0F1112]
        font-montserrat font-semibold
        text-[14px] sm:text-[16px]
        rounded-[8px]
        transition hover:opacity-90 active:scale-[0.98]"
          >
            SCHEDULE YOUR CALL NOW
            <img src="/Arrowleft2.svg" alt="" className="w-[14px] h-[14px]" />
          </button>
        </div>
      </div>
    </section>
  );
}
