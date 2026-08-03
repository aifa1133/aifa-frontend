"use client";

import { useNavigate } from "react-router-dom";

export default function CourseCardMobile() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#0F1112]">
      {/* Card */}
      <div className="rounded-[12px] overflow-hidden bg-[#3F3F3F]">
        {/* Image */}
        <img
          src="/courses/course.png"
          alt="AI Filmmaking Bootcamp"
          className="w-full h-[190px] object-cover"
        />

        {/* Content */}
        <div className="px-[16px] py-[16px]">
          <p className="text-[10px] font-bold uppercase text-[#D7D7D7]">
            Beginner
          </p>

          <h2 className="mt-[8px] text-[18px] leading-[24px] font-black text-white uppercase">
            AI FILMMAKING
            <br />
            BOOTCAMP
          </h2>

          <p className="mt-[12px] text-[13px] leading-[21px] text-[#CFCFCF]">
            Master AI-Powered Filmmaking from Concept to final cut while
            learning how to create stunning, high-quality films faster using
            cutting-edge AI tools.
          </p>

          <button
            onClick={() => navigate("/bootcamp")}
            className="
              mt-[20px]
              w-full
              rounded-[8px]
              bg-[#D0E46A]
              py-[10px]
              text-[14px]
              font-bold
              uppercase
              text-[#111]
            "
          >
            ENROLL WORKSHOP
          </button>
        </div>

        {/* Bottom */}
        <div className="grid grid-cols-3 gap-[2px] bg-[#0F1112]">
          {/* Duration */}
          <div className="bg-[#414243] px-[10px] py-[10px]">
            <div className="flex items-center gap-[4px]">
              <img src="/Tagicon.svg" alt="" className="w-[10px] h-[10px]" />
              <p className="text-[7px] uppercase font-semibold text-[#BDBDBD]">
                Duration
              </p>
            </div>

            <p className="mt-[6px] text-[12px] font-bold text-white">1 HOURS</p>
          </div>

          {/* Pricing */}
          <div className="bg-[#414243] px-[10px] py-[10px]">
            <div className="flex items-center gap-[4px]">
              <img src="/Tagicon1.svg" alt="" className="w-[10px] h-[10px]" />
              <p className="text-[7px] uppercase font-semibold text-[#BDBDBD]">
                Pricing
              </p>
            </div>

            <p className="mt-[6px] text-[12px] font-bold text-white">₹14,000</p>
          </div>

          {/* Mode */}
          <div className="bg-[#414243] px-[10px] py-[10px]">
            <div className="flex items-center gap-[4px]">
              <img
                src="/tabler_device-laptop.svg"
                alt=""
                className="w-[10px] h-[10px]"
              />
              <p className="text-[7px] uppercase font-semibold text-[#BDBDBD]">
                Mode
              </p>
            </div>

            <p className="mt-[6px] text-[12px] font-bold text-white">LIVE</p>
          </div>
        </div>
      </div>
    </div>
  );
}
