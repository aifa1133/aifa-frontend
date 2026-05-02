"use client";

export default function CTASection() {
  return (
    <section className="w-full bg-[#0B0F10] py-20 flex justify-center">
      {/* BIG CONTAINER */}
      <div className="w-full max-w-7xl bg-[#a893cf] rounded-[40px] px-6 md:px-16 py-16 text-center">
        {/* AVATAR */}
        <div className="flex justify-center mb-8">
          <div className="w-[201px] h-[201px] rounded-full overflow-hidden bg-[#E4A76D] mx-auto">
            <img
              src="/avatar/avatar1.png"
              alt="avatar"
              className="w-full h-full object-cover object-[50%_10%]"
            />
          </div>
        </div>

        {/* HEADING */}
        <h2
          className="text-[#000000] text-center font-montserrat font-black 
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
          className="mx-auto flex items-center justify-center gap-[4px]
h-[52px] px-[30px]
bg-[#D0E46A] text-[#0F1112]
font-montserrat font-semibold
text-[14px] leading-[20px]
sm:text-[16px] sm:leading-[24px]
rounded-[8px]
transition hover:opacity-90 active:scale-[0.98]"
        >
         SCHEDULE YOUR CALL NOW
          <img
            src="/Arrowleft2.svg"
            alt="arrow"
            className="w-[14px] h-[14px]"
          />
        </button>
      </div>
    </section>
  );
}
