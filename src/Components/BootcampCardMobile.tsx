"use client";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function SeatsCounter({ seed = 0 }: { seed?: number }) {
  const base = [7, 6, 5][seed % 3];
  const [seats, setSeats] = useState(base);
  const [flash, setFlash] = useState(false);
  const seatsRef = useRef(base);

  useEffect(() => {
    const tick = () => {
      setFlash(true);
      setTimeout(() => {
        seatsRef.current = seatsRef.current <= 4 ? (Math.floor(Math.random() * 3) + 5) : seatsRef.current - 1;
        setSeats(seatsRef.current);
        setFlash(false);
      }, 350);
    };
    const delay = setTimeout(() => {
      tick();
      const id = setInterval(tick, 12000 + seed * 3000);
      return () => clearInterval(id);
    }, seed * 4000 + 500);
    return () => clearTimeout(delay);
  }, []);

  return (
    <div className={`flex items-center gap-1 bg-red-600 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-lg transition-all duration-300 whitespace-nowrap select-none ${flash ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}>
      🔥 Only few seats left
    </div>
  );
}

interface Props {
  item: {
    title: string;
    image: string;
    duration: string;
    price: string;
    date: string;
    mode?: string;
  };
  onViewDetails?: () => void;
  onReserve?: () => void;
  seed?: number;
}

export default function BootcampCardMobile({
  item,
  onViewDetails,
  onReserve,
  seed = 0,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="w-full rounded-[12px] overflow-hidden bg-[#111] mb-[64px] sm:mb-0">
      {/* Image */}
      <div className="relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-[190px] object-cover rounded-[12px]"
        />

        <div className="absolute left-2 top-2 rounded-full bg-[#111]/90 px-2 py-1">
          <span className="text-[10px] font-bold text-[#D6F25C] uppercase">
            {item.mode || "LIVE/ONLINE"}
          </span>
        </div>
      </div>

      {/* Title */}
      <div className="mt-2 rounded-[8px] bg-[#D9D9D9] px-4 py-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[18px] font-bold text-[#1A1A1A] leading-snug">
            {item.title}
          </h3>
          <div className="shrink-0 mt-0.5">
            <SeatsCounter seed={seed} />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-2 grid grid-cols-3 gap-1">
        <div className="rounded bg-[#D9D9D9] p-2">
          <p className="text-[8px] font-semibold uppercase text-[#555]">
            Duration
          </p>

          <p className="mt-1 text-[14px] font-bold text-[#1A1A1A]">
            {item.duration}
          </p>
        </div>

        <div className="rounded bg-[#D9D9D9] p-2">
          <p className="text-[8px] font-semibold uppercase text-[#555]">
            Pricing
          </p>

          <p className="mt-1 text-[14px] font-bold text-[#1A1A1A]">
            {item.price}
          </p>
        </div>

        <div className="rounded bg-[#D9D9D9] p-2">
          <p className="text-[8px] font-semibold uppercase text-[#555]">
            Date & Time
          </p>

          <p className="mt-1 whitespace-pre-line text-[12px] font-bold text-[#1A1A1A]">
            {item.date}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <button
        onClick={
          onViewDetails || (() => navigate("/workshops"))
        }
        className="mt-2 h-[42px] w-full rounded-[8px] bg-[#F2FEB1] text-[15px] font-bold text-[#111]"
      >
        VIEW DETAILS
      </button>

    <button
  onClick={onReserve || (() => navigate("/workshops"))}
  className="
    mt-2
    flex
    w-full
    items-center
    justify-center
    gap-[4px]
    px-[16px]
    py-[8px]
    rounded-b-[12px]
    bg-[#D0E46A]
    text-[#111]
    text-[14px]
    font-bold
    uppercase
    transition-all
    duration-300
    hover:bg-[#C6DD5E]
  "
>
  RESERVE SPOT
  <img
    src="/Arrowleft2.svg"
    alt="arrow"
    className="w-[16px] h-[16px]"
  />
</button>
    </div>
  );
}