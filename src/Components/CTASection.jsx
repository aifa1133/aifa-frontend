"use client";

export default function CTASection() {
  return (
    <section className="w-full bg-[#0F1112] flex justify-center overflow-x-hidden">
      {/* OUTER FRAME */}
      <div className="w-full max-w-[1400px] px-[16px] sm:px-[40px] lg:px-[93px] py-[40px] sm:py-[64px] flex flex-col items-center gap-[10px]">
        {/* INNER CARD */}
        <div className="w-full bg-[#A893CF] rounded-[20px] sm:rounded-[40px] py-[40px] sm:py-[64px] flex flex-col items-center text-center">
          {/* AVATAR */}
          <div className="mb-6 sm:mb-8">
            <div className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:w-[201px] md:h-[201px] rounded-full overflow-hidden bg-[#E4A76D]">
              <img
                src="/avatar/avatar1.png"
                alt="avatar"
                className="w-full h-[501px] object-cover"
              />
            </div>
          </div>

          {/* HEADING */}
          <h2
            className="
              text-[#000000] font-montserrat font-bold
              text-[20px] leading-[26px] 
              sm:text-[36px] sm:leading-[42px] 
              md:text-[48px] md:leading-[56px] 
              lg:text-[64px] lg:leading-[70px]
              tracking-[-0.5px] 
              mb-6 sm:mb-10
            "
          >
            BOOK A FREE 30 MINS <br />
            CALL WITH OUR COUNSELLOR
          </h2>

          {/* BUTTON */}
          <button
            className="
              flex items-center justify-center gap-[6px]
              h-[44px] sm:h-[52px]
              px-[20px] sm:px-[30px]
              bg-[#D0E46A] text-[#0F1112]
              font-montserrat font-semibold
              text-[13px] sm:text-[16px]
              rounded-[8px]
              transition hover:opacity-90 active:scale-[0.98]
            "
          >
            SCHEDULE YOUR CALL NOW
            <img
              src="/Arrowleft2.svg"
              alt=""
              className="w-[12px] sm:w-[14px]"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
