"use client";

export default function Stats() {
  return (
    <section className="w-full bg-[#0B0F10] flex justify-center">
      <div className="w-[1400px] px-[93px] py-[64px] flex flex-col items-center gap-[64px] text-center">
        {/* HEADING */}
        <h2
          className="text-[#F0F0F0] font-montserrat font-black 
      text-[28px] leading-[34px] 
      sm:text-[34px] sm:leading-[40px] 
      md:text-[40px] md:leading-[48px]"
        >
          GROWING A COMMUNITY OF AI CREATORS
        </h2>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[64px] w-full">
          {/* ITEM */}
          <div className="flex flex-col items-center gap-3">
            <img src="/baseline-ondemand-video1.svg" className="w-10 h-10" />
            <h3 className="text-[#F0F0F0] font-montserrat font-semibold text-[36px] leading-[42px]">
              500+
            </h3>
            <p className="text-[#9CA3AF] font-montserrat font-medium text-[14px] leading-[20px]">
              Creators trained
            </p>
          </div>

          {/* ITEM */}
          <div className="flex flex-col items-center gap-3">
            <img src="/baseline-ondemand-video2.svg" className="w-10 h-10" />
            <h3 className="text-[#F0F0F0] font-montserrat font-semibold text-[36px] leading-[42px]">
              40+
            </h3>
            <p className="text-[#9CA3AF] font-montserrat font-medium text-[14px] leading-[20px]">
              Live workshops conducted
            </p>
          </div>

          {/* ITEM */}
          <div className="flex flex-col items-center gap-3">
            <img src="/baseline-ondemand-video3.svg" className="w-10 h-10" />
            <h3 className="text-[#F0F0F0] font-montserrat font-semibold text-[36px] leading-[42px]">
              60+
            </h3>
            <p className="text-[#9CA3AF] font-montserrat font-medium text-[14px] leading-[20px]">
              Student projects created
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
