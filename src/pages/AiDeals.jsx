"use client";
import { useState } from "react";

const categories = [
  "All Benefits",
  "Video",
  "Design",
  "Marketing",
  "Image",
];

const deals = [
  {
    name: "ChatGPT",
    tag: "MARKETING",
    title: "Chat GPT",
    desc: "AI-powered cinematic video editor",
    offer: "20% OFF",
    img: "/aitech/aiimages1.png",
  },
  {
    name: "Gemini",
    tag: "DESIGN",
    title: "Gemini Pro",
    desc: "Studio-quality AI voice cloning",
    offer: "$50 CREDIT",
    img: "/aitech/aiimages2.png",
  },
  {
    name: "Freepik",
    tag: "IMAGE",
    title: "freepik",
    desc: "Generative UI & UX designer",
    offer: "FREE YEAR",
    img: "/aitech/aiimages3.png",
  },
  {
    name: "Pika",
    tag: "VIDEO",
    title: "Pika",
    desc: "AI video generation tool",
    offer: "15% OFF",
    img: "/aitech/aiimages4.png",
  },
  {
    name: "Higgsfield",
    tag: "MARKETING",
    title: "Higgsfield",
    desc: "AI marketing automation",
    offer: "$100 OFF",
    img: "/aitech/aiimages5.jpg",
  },
  {
    name: "Midjourney",
    tag: "IMAGE",
    title: "Midjourney",
    desc: "AI image generation engine",
    offer: "30% OFF",
    img: "/aitech/aiimages6.png",
  },
  {
    name: "Synthesia",
    tag: "VIDEO",
    title: "Synthesia",
    desc: "AI video generation tool",
    offer: "20% OFF",
    img: "/aitech/aiimages7.png",
  },
  {
    name: "Lumen5",
    tag: "VIDEO",
    title: "Lumen5",
    desc: "AI video creation platform",
    offer: "25% OFF",
    img: "/aitech/aiimages8.png",
  },
  {
    name: "Canva",
    tag: "DESIGN",
    title: "Canva Pro",
    desc: "Graphic design platform with AI features",
    offer: "15% OFF",
    img: "/aitech/aiimages9.png",
  },
];

export default function AiDeals() {
  const [active, setActive] = useState("All Benefits");

  return (
    <section className="bg-[#0B0F10] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* 🔥 TITLE */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">AI Deals</h2>

        {/* 🔥 FILTERS */}
        <div className="flex flex-wrap gap-4 mb-10 text-sm">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActive(cat)}
              className={`px-4 py-2  border border-white/10 transition ${
                active === cat
                  ? "bg-[#C7E36B] text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 🔥 GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.filter(d => active === "All Benefits" || d.tag.toUpperCase() === active.toUpperCase()).map((item, i) => (
            <div
              key={i}
              className="rounded-3xl border border-white/10 overflow-hidden bg-black hover:border-[#C7E36B]/40 transition"
            >
              {/* TOP LOGO AREA */}
              <div className="h-28 flex items-center justify-center bg-gradient-to-br from-white to-gray-100 p-4">
                <img
                  src={item.img}
                  className="h-full max-h-20 object-contain transition duration-300 group-hover:scale-110"
                />
              </div>
              {/* CONTENT */}
              <div className="p-6">
                {/* TAG */}
                <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-gray-300">
                  {item.tag}
                </span>

                {/* TITLE */}
                <h3 className="text-lg font-semibold mt-4">{item.title}</h3>

                {/* DESC */}
                <p className="text-gray-400 text-sm mt-1 mb-4">{item.desc}</p>

                {/* OFFER */}
                <h2 className="text-3xl font-bold">{item.offer}</h2>

                <p className="text-[#C7E36B] text-xs mt-1">VIA AIFA</p>

                {/* BUTTON */}
                <button className="mt-6 w-full bg-[#C7E36B] text-black py-3 rounded-xl font-medium hover:opacity-90 transition">
                  Get Deal
                </button>

                <p className="text-gray-500 text-xs text-center mt-2">
                  Redirects to official site
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 🔥 CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-300 mb-4 text-4xl font-semibold">
            Start Saving on AI Tools Today
          </p>

          <button className="bg-[#C7E36B] text-black px-6 py-3 rounded-xl font-semibold text-lg hover:opacity-90 transition">
            Explore All Deals
          </button>
        </div>
      </div>
    </section>
  );
}
