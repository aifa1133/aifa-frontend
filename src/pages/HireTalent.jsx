"use client";

import { useState, useRef, useEffect } from "react";

const STATIC_TALENTS = [
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

export default function HireTalent() {
  const [selected, setSelected] = useState("All");
  const scrollRef = useRef(null);
  const [talents, setTalents] = useState(STATIC_TALENTS);
  const [inquirySent, setInquirySent] = useState(null);

  useEffect(() => {
    fetch("/api/talent")
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (Array.isArray(data) && data.length > 0) setTalents(data); })
      .catch(() => {});
  }, []);

  const sendInquiry = async (talent) => {
    try {
      const token = localStorage.getItem("aifa_token");
      await fetch("/api/service-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ talentName: talent.name, type: "hire-talent" }),
      });
    } catch (_) {}
    setInquirySent(talent.name);
    setTimeout(() => setInquirySent(null), 3000);
  };

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

  return (
    <section className="bg-[#0B0F10] text-white overflow-hidden pt-[80px] sm:pt-[100px] lg:pt-[120px] pb-[64px]">
      {inquirySent && (
        <div className="fixed top-6 right-6 z-50 bg-[#C7E36B] text-black px-5 py-3 rounded-xl font-semibold shadow-lg animate-fade-in">
          Inquiry sent to {inquirySent}!
        </div>
      )}
      {/* HIDE SCROLLBAR */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div
        className="
          w-full
          max-w-[1440px]
          mx-auto
          px-[16px]
          sm:px-[24px]
          md:px-[40px]
          lg:px-[60px]
          xl:px-[93px]
        "
      >
        {/* TOP BAR */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
          <h2
            className="
              text-[#F0F0F0]
              font-[Montserrat]
              text-[28px]
              leading-[36px]
              sm:text-[32px]
              sm:leading-[40px]
              font-[900]
            "
          >
            AVAILABLE TALENT
          </h2>

          {/* FILTERS */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <select
              className="
                bg-[#111]
                border
                border-white/10
                h-[48px]
                px-4
                rounded-[6px]
                w-full
                sm:w-[220px]
                text-white
                outline-none
              "
            >
              <option>Select A Country</option>
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
            </select>

            <input
              type="text"
              placeholder="City"
              className="
                bg-[#111]
                border
                border-white/10
                h-[48px]
                px-4
                rounded-[6px]
                w-full
                sm:w-[220px]
                text-white
                outline-none
              "
            />
          </div>
        </div>

        {/* FILTER SLIDER */}
        <div className="flex items-center gap-2 mb-12">
          {/* LEFT */}
          <button
            onClick={() => scroll("left")}
            className="
              min-w-[40px]
              h-[40px]
              md:min-w-[48px]
              md:h-[48px]
              flex
              items-center
              justify-center
              rounded-full
              bg-white
            "
          >
            <img
              src="/Arrowleftnewhire1.svg"
              alt="left"
              className="w-[18px] h-[18px]"
            />
          </button>

          {/* SCROLL */}
          <div
            ref={scrollRef}
            className="
              flex
              gap-3
              overflow-x-auto
              scrollbar-hide
              flex-1
              scroll-smooth
            "
          >
            {filters.map((f, i) => {
              const isActive = selected === f.name;

              return (
                <button
                  key={i}
                  onClick={() => setSelected(f.name)}
                  className={`
                    relative
                    min-w-[150px]
                    sm:min-w-[180px]
                    md:min-w-[188px]
                    h-[56px]
                    md:h-[64px]
                    flex-shrink-0
                    rounded-[6px]
                    flex
                    items-center
                    justify-center
                    overflow-hidden
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? "bg-[#C7E36B] text-black"
                        : "text-[#F0F0F0] border border-white/10"
                    }
                  `}
                >
                  {f.name !== "All" && (
                    <>
                      <img
                        src={f.img}
                        alt={f.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-black/50" />
                    </>
                  )}

                  <span
                    className="
                      relative
                      z-10
                      text-[13px]
                      sm:text-[14px]
                      font-medium
                      px-3
                      text-center
                    "
                  >
                    {f.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* RIGHT */}
          <button
            onClick={() => scroll("right")}
            className="
              min-w-[40px]
              h-[40px]
              md:min-w-[48px]
              md:h-[48px]
              flex
              items-center
              justify-center
              rounded-full
              bg-white
            "
          >
            <img
              src="/Arrowleftnewhire.svg"
              alt="right"
              className="w-[18px] h-[18px]"
            />
          </button>
        </div>

        {/* TALENT LIST */}
        <div className="space-y-[64px]">
          {talents.map((t, i) => (
            <div key={i}>
              {/* HEADER */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mb-6">
                {/* LEFT */}
                <div className="flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="
                      w-[48px]
                      h-[48px]
                      md:w-[56px]
                      md:h-[56px]
                      rounded-full
                      object-cover
                    "
                  />

                  <div>
                    <h3
                      className="
                        text-[#F0F0F0]
                        font-[Montserrat]
                        text-[18px]
                        leading-[28px]
                        font-[700]
                      "
                    >
                      {t.name}
                    </h3>

                    <p
                      className="
                        text-[#DCDCDC]
                        font-[Montserrat]
                        text-[14px]
                        leading-[20px]
                        font-[400]
                        mt-1
                      "
                    >
                      {t.location}
                    </p>
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  onClick={() => sendInquiry(t)}
                  className="
                    flex
                    justify-center
                    items-center
                    gap-[4px]
                    bg-[#D0E46A]
                    text-black
                    px-[16px]
                    py-[10px]
                    rounded-[4px]
                    w-full
                    sm:w-auto
                    hover:opacity-90
                    transition
                  "
                >
                  <span
                    className="
                      font-[Montserrat]
                      text-[14px]
                      font-[600]
                    "
                  >
                    SEND INQUIRY
                  </span>

                  <img
                    src="/Arrowleftsend.svg"
                    alt=""
                    className="w-[20px] h-[20px]"
                  />
                </button>
              </div>

              {/* DESKTOP GRID */}
              <div
                className="
                  hidden
                  sm:grid
                  sm:grid-cols-2
                  lg:grid-cols-3
                  gap-5
                "
              >
                {t.works.map((img, idx) => (
                  <div
                    key={idx}
                    className="
                      rounded-[16px]
                      overflow-hidden
                      border
                      border-white/10
                      group
                    "
                  >
                    <img
                      src={img}
                      alt="work"
                      className="
                        w-full
                        h-[260px]
                        lg:h-[280px]
                        object-cover
                        transition
                        duration-500
                        group-hover:scale-105
                      "
                    />
                  </div>
                ))}
              </div>

              {/* MOBILE SLIDER */}
              <div
                className="
                  sm:hidden
                  flex
                  gap-4
                  overflow-x-auto
                  scrollbar-hide
                  snap-x
                  snap-mandatory
                  scroll-smooth
                  pb-2
                "
              >
                {t.works.map((img, idx) => (
                  <div
                    key={idx}
                    className="
                      min-w-[85%]
                      flex-shrink-0
                      snap-center
                      rounded-[16px]
                      overflow-hidden
                      border
                      border-white/10
                    "
                  >
                    <img
                      src={img}
                      alt="work"
                      className="
                        w-full
                        h-[240px]
                        object-cover
                      "
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* LOAD MORE */}
        <div className="flex justify-center mt-[64px]">
          <button
            className="
              flex
              justify-center
              items-center
              gap-[8px]
              bg-[#F0F0F0]
              text-black
              px-[20px]
              py-[12px]
              rounded-[4px]
              transition-all
              duration-300
              hover:bg-[#e4e4e4]
              w-full
              sm:w-auto
            "
          >
            LOAD MORE PROFILES
          </button>
        </div>
      </div>
    </section>
  );
}
