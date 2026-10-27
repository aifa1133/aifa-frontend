import { useState, useEffect } from "react";

export default function WhatYouWillCreate({ onCTAClick }) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch("/api/creation-items")
      .then(r => r.json())
      .then(d => { if (Array.isArray(d) && d[0]) setItem(d[0]); })
      .catch(() => {});
  }, []);

  const label    = item?.label    || "PROJECT";
  const title    = item?.title    || "AI SHORT FILM";
  const subtitle = item?.subtitle || "By the end of this workshop, you'll build real AI filmmaking projects.";
  const image    = item?.image    || "/airplane1.png";

  return (
    <section className="w-full bg-[#0F1112]">
      <div className="
        max-w-[1366px] mx-auto
        px-[16px] sm:px-[24px] md:px-[50px] lg:px-[93px]
        py-[64px]
        flex flex-col items-center gap-[32px]
      ">
        {/* Heading */}
        <div className="text-center max-w-[700px] mx-auto">
          <h2 className="
            text-white font-black
            text-[34px] leading-[42px]
            sm:text-[46px] sm:leading-[54px]
            lg:text-[54px] lg:leading-[70px]
            tracking-[-1px]
          ">
            What You Will CREATE
          </h2>
          <p className="mt-5 text-[#9FA2A4] text-[15px] md:text-[18px] leading-7">
            {subtitle}
          </p>
        </div>

        {/* Content */}
        <div className="mt-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-14">
          {/* Left */}
          <div className="w-full lg:max-w-[360px] text-center lg:text-left">
            <span className="text-[#CFCFCF] uppercase font-bold text-[14px] tracking-wider">
              {label}
            </span>
            <h3 className="mt-3 text-white font-black text-[34px] leading-[42px] md:text-[42px] md:leading-[48px]">
              {title}
            </h3>
          </div>

          {/* Right Image */}
          <div className="w-full lg:max-w-[760px]">
            <img
              src={image}
              alt={title}
              className="w-full h-auto rounded-2xl object-cover shadow-2xl"
            />
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-[48px]">
          <button
            type="button"
            onClick={onCTAClick}
            className="
              flex h-[48px] px-[30px] py-[12px]
              justify-center items-center gap-[4px]
              rounded-[8px]
              bg-[#D0E46A] hover:bg-[#BDD253]
              text-[#0F1112] font-[Montserrat] text-[14px]
              font-bold uppercase tracking-[1px]
              transition-colors
            "
          >
            I WANT TO CREATE THIS
          </button>
        </div>
      </div>
    </section>
  );
}
