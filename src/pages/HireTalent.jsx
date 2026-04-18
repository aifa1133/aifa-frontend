"use client";
import { useState, useRef } from "react";

export default function HireTalent() {
  const [selected, setSelected] = useState("All");
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  const filters = [
    { name: "All" },
    { name: "Logo Design", img: "/logos/logoback.jpg" },
    { name: "UI Design", img: "/logos/logoback.jpg" },
    { name: "Video Editing", img: "/logos/logoback.jpg" },
    { name: "3D Modeling", img: "/logos/logoback.jpg" },
    { name: "Animation", img: "/logos/logoback.jpg" },
    { name: "VFX", img: "/logos/logoback.jpg" },
    { name: "Sound Design", img: "/logos/logoback.jpg" },
  ];

  const talents = [
    {
      name: "Sarah Jenkins",
      location: "San Francisco, CA",
      avatar: "/talent/avatar1.jpg",
      works: ["/talent/ta1.png", "/talent/ta2.png", "/talent/ta3.png"],
    },
    {
      name: "Rajiv K",
      location: "Mumbai, India",
      avatar: "/talent/avatar2.png",
      works: ["/talent/ta4.png", "/talent/ta5.png", "/talent/ta6.png"],
    },
    {
      name: "Jessica",
      location: "New York, USA",
      avatar: "/talent/avatar3.png",
      works: ["/talent/ta7.png", "/talent/ta8.png", "/talent/ta9.png"],
    },
  ];

  return (
    <section className="bg-[#0B0F10] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* 🔥 TOP BAR */}
        <div className="flex flex-wrap justify-between items-center mb-10 gap-4">
          <h2 className="text-2xl font-semibold">Available Talent</h2>

          <div className="flex gap-4">
            <select className="bg-[#111] border border-white/10 px-4 py-2 rounded-md">
              <option>Select A Country</option>
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
                <option>Germany</option>
                <option>France</option>
                <option>Japan</option>
                <option>Australia</option>
                <option>Canada</option>
                <option>Brazil</option>
                <option>South Korea</option>
                <option>Italy</option>
                <option>Spain</option>

            </select>

            <input
              type="text"
              placeholder="City"
              className="bg-[#111] border border-white/10 px-4 py-2 rounded-md"
            />
          </div>
        </div>

        {/* 🔥 FILTER SLIDER */}
        <div className="flex items-center gap-4 mb-10">
          {/* LEFT ARROW */}
          <button
            onClick={() => scroll("left")}
            className="w-12 h-10 flex items-center justify-center rounded-full bg-white text-black"
          >
            ←
          </button>

          {/* SCROLL AREA */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide"
          >
            {filters.map((f, i) => {
              const isActive = selected === f.name;

              return (
                <button
                  key={i}
                  onClick={() => setSelected(f.name)}
                  className={`relative min-w-[180px] h-16 rounded-lg overflow-hidden flex items-center justify-center text-sm font-medium transition ${
                    isActive
                      ? "bg-[#C7E36B] text-black"
                      : "text-white border border-white/10"
                  }`}
                >
                  {/* IMAGE (except All) */}
                  {f.name !== "All" && (
                    <>
                      <img
                        src={f.img}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60" />
                    </>
                  )}

                  {/* TEXT */}
                  <span className="relative z-10">{f.name}</span>
                </button>
              );
            })}
          </div>

          {/* RIGHT ARROW */}
          <button
            onClick={() => scroll("right")}
            className="w-12 h-10 flex items-center justify-center rounded-full bg-white text-black"
          >
            →
          </button>
        </div>

        {/* 🔥 TALENT LIST */}
        <div className="space-y-16">
          {talents.map((t, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={t.avatar}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{t.name}</h3>
                    <p className="text-gray-400 text-sm">📍 {t.location}</p>
                  </div>
                </div>

                <button className="bg-[#C7E36B] text-black px-5 py-2 rounded-md font-medium hover:opacity-90">
                  + Send Inquiry →
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {t.works.map((img, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl overflow-hidden border border-white/10 group"
                  >
                    <img
                      src={img}
                      className="w-full h-52 object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 🔥 LOAD MORE */}
        <div className="flex justify-center mt-16">
          <button className="bg-white/10 px-6 py-3 rounded-md hover:bg-white/20 transition">
            + Load more profiles
          </button>
        </div>
      </div>
    </section>
  );
}
