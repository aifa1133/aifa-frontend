"use client";
import { useState } from "react";

export default function LearningTips() {
  const data = [
    { img: "/aitools/besttools1.png", title: "Best AI Tools 2025" },
    { img: "/aitools/besttools2.png", title: "Learn AI Fast" },
    { img: "/aitools/besttools3.png", title: "Learn AI in 15 mins" },
    { img: "/aitools/besttools4.png", title: "AI Cheats" },
    { img: "/aitools/besttools5.png", title: "Made with AI" },
    { img: "/aitools/besttools6.png", title: "Top Designer Tips" },
    { img: "/aitools/besttools7.png", title: "Make Money with AI" },
    { img: "/aitools/besttools8.png", title: "Old vs AI Study" },
    { img: "/aitools/besttools9.png", title: "Unlock AI Potential" },
    { img: "/aitools/besttools10.png", title: "Future of AI" },
    { img: "/aitools/besttools11.png", title: "Best AI Tools" },
    { img: "/aitools/besttools12.png", title: "Time = Cash AI" },
  ];

  return (
    <section className="bg-[#0B0F10] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* 🔥 HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold">LEARNING TIPS</h2>

          <div className="flex gap-3 w-full md:w-auto">
            <select className="bg-[#111] border border-white/10 px-4 py-2 rounded-md w-full md:w-auto">
              <option>All</option>
            </select>

            <select className="bg-[#111] border border-white/10 px-4 py-2 rounded-md w-full md:w-auto">
              <option>Sub Category</option>
            </select>
          </div>
        </div>

        {/* 🔥 GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, i) => (
            <div
              key={i}
              className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden group hover:border-[#C7E36B]/40 transition"
            >
              {/* IMAGE */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.img}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* BUTTON */}
              <div className="p-4">
                <button className="w-full bg-[#C7E36B] text-black py-2 rounded-md text-sm font-medium hover:opacity-90 transition flex items-center justify-center gap-2">
                  + Watch Now →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 🔥 LOAD MORE */}
        <div className="flex justify-center mt-12">
          <button className="bg-white/10 px-6 py-3 rounded-md hover:bg-white/20 transition w-full sm:w-auto">
            + View More
          </button>
        </div>
      </div>
    </section>
  );
}
