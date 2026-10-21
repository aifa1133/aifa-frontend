"use client";

export default function CourseContent() {
  const sessions = [
    "Session 1: Introduction to AI Filmmaking",
    "Session 2: Screen Writing",
    "Session 3: Previsualization",
    "Session 4: Prompt Engineering",
    "Session 5: Creating with AI",
    "Session 6: Cinematography",
    "Session 7: Character Design",
  ];

  return (
    <section className="w-full bg-[#0F1112] flex justify-center">
      <div className="w-full max-w-[1366px] flex flex-col justify-center items-center px-[93px] pb-[64px] max-sm:px-[16px] max-sm:pb-[40px]">
        <div className="w-full max-w-[1180px] flex flex-col gap-[32px] max-sm:gap-[24px]">
          {/* HEADER */}
          <div className="flex flex-col items-start gap-[16px] self-stretch pt-[64px] pr-[93px] pb-[48px] pl-[93px] max-sm:px-[16px] max-sm:pt-[40px] max-sm:pb-[24px]">
            <p className="text-[#D0E46A] text-[18px] font-bold uppercase tracking-[1px] leading-[28px] max-sm:text-[14px] max-sm:leading-[22px]">
              A PERFECTLY STRUCTURED COURSE
            </p>
            <h2 className="text-[#F0F0F0] font-black text-[64px] leading-[72px] tracking-[-1.5px] max-sm:text-[34px] max-sm:leading-[42px] max-sm:tracking-[-1px]">
              COURSE CONTENT
            </h2>
            <p className="text-[#767779] text-[16px] font-normal leading-[24px] max-sm:text-[14px] max-sm:leading-[22px]">
              22 Sessions . 22 Total Hours . 20 Assignments
            </p>
          </div>

          {/* SESSION LIST */}
          <div className="flex flex-col gap-[12px] max-sm:gap-[8px]">
            {sessions.map((title, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[24px] border border-[#343638] bg-[#0F1112] max-sm:rounded-[18px]"
              >
                <div className="px-[24px] py-[22px] max-sm:px-[16px] max-sm:py-[16px]">
                  <span className="text-[#F0F0F0] font-black text-[24px] leading-[32px] tracking-[-0.5px] max-sm:text-[17px] max-sm:leading-[26px]">
                    {title}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full flex justify-center pt-[16px]">
            <a
              href="/brochure/AIFA-Brochure.pdf"
              download
              className="flex items-center justify-center gap-[10px] bg-[#D0E46A] text-[#0F1112] px-[28px] py-[14px] rounded-[10px] font-bold text-[14px] sm:text-[16px] cursor-pointer hover:bg-[#F0F0F0] active:scale-[0.98] transition-all duration-300"
            >
              DOWNLOAD BROCHURE
              <img src="/Arrow left brochere.svg" alt="Arrow left" className="w-[18px] h-[18px] object-contain" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
