"use client";

import { useNavigate } from "react-router-dom";

interface Props {
  item: {
    title: string;
    image: string;
    duration: string;
    price: string;
  };
}

export default function BootcampCardMobile({ item }: Props) {
  const navigate = useNavigate();

  return (
    <div className="w-full rounded-[10px] bg-[#3F3F3F] overflow-hidden shadow-lg">
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-[190px] object-cover"
      />

      {/* Content */}
      <div className="px-4 py-4">
        <p className="text-[9px] uppercase tracking-[0.08em] font-semibold text-[#BEBEBE]">
          Beginner
        </p>

        <h3 className="mt-2 text-white font-black uppercase text-[18px] leading-[24px]">
          AI FILMMAKING
          <br />
          BOOTCAMP
        </h3>

        <p className="mt-3 text-[#D2D2D2] text-[12px] leading-[19px]">
          Master AI-Powered Filmmaking from Concept to final cut while learning
          how to create stunning, high-quality films faster using cutting-edge
          AI tools.
        </p>

        <button
          onClick={() => navigate("/workshops")}
          className="mt-5 w-full h-[42px] rounded-[6px] bg-[#D5EC63] text-[#161616] text-[13px] font-bold uppercase transition-all duration-300 active:scale-[0.98]"
        >
          ENROLL WORKSHOP
        </button>
      </div>

      {/* Bottom Info */}
      <div className="grid grid-cols-3 gap-[2px] bg-[#0F1112]">
        {/* Duration */}
        <div className="bg-[#4A4A4A] px-2 py-2">
          <p className="text-[7px] uppercase text-[#BDBDBD] font-semibold">
            ⏱ Duration
          </p>

          <p className="mt-1 text-[11px] font-bold text-white">
            {item.duration}
          </p>
        </div>

        {/* Pricing */}
        <div className="bg-[#4A4A4A] px-2 py-2">
          <p className="text-[7px] uppercase text-[#BDBDBD] font-semibold">
            💳 Pricing
          </p>

          <p className="mt-1 text-[11px] font-bold text-white">
            ₹14,000
          </p>
        </div>

        {/* Mode */}
        <div className="bg-[#4A4A4A] px-2 py-2">
          <p className="text-[7px] uppercase text-[#BDBDBD] font-semibold">
            💻 Mode
          </p>

          <p className="mt-1 text-[11px] font-bold text-white">
            LIVE
          </p>
        </div>
      </div>
    </div>
  );
}