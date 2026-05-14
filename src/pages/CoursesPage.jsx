"use client";

import { useState } from "react";
import ProPlanBanner from "./ProPlanBanner";

/* ---------------- COURSES DATA ---------------- */
const courses = [
  {
    title: "AI Reels & Shorts Masterclass",
    desc: "Create Engaging Short-Form Videos Using Smart AI Tools.",
    image: "/courses/v1.png",
    duration: "1h 10m",
  },
  {
    title: "AI Social Media Design Course",
    desc: "Design Scroll-Stopping Social Content With AI Creativity.",
    image: "/courses/v2.png",
    duration: "1h 10m",
  },
  {
    title: "AI Thumbnail Creation Masterclass",
    desc: "Design High-Converting Thumbnails Using AI-Powered Tools.",
    image: "/courses/v3.png",
    duration: "1h 10m",
  },
  {
    title: "AI Video Editing Masterclass",
    desc: "Master cinematic editing using AI tools and workflows.",
    image: "/courses/v4.png",
    duration: "2h 00m",
  },
  {
    title: "AI Content Creation Bootcamp",
    desc: "Build high-quality content using AI automation tools.",
    image: "/courses/v5.png",
    duration: "1h 30m",
  },
  {
    title: "AI Cinematic Storytelling",
    desc: "Learn storytelling techniques with AI filmmaking.",
    image: "/courses/v6.png",
    duration: "2h 15m",
  },
  {
    title: "AI Scriptwriting Masterclass",
    desc: "Craft compelling scripts using AI writing tools.",
    image: "/courses/v7.png",
    duration: "1h 45m",
  },
  {
    title: "AI Visual Effects Course",
    desc: "Create stunning VFX using AI-powered software.",
    image: "/courses/v8.png",
    duration: "2h 30m",
  },
  {
    title: "AI Sound Design Masterclass",
    desc: "Design immersive soundscapes with AI audio tools.",
    image: "/courses/v9.png",
    duration: "1h 20m",
  },
];

/* ---------------- MAIN PAGE ---------------- */
export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Newest");

  const options = ["Newest", "Price: Low to High", "Duration"];

  /* FILTER */
  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()),
  );

  /* SORT */
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (selected === "Duration") {
      return a.duration.localeCompare(b.duration);
    }
    return 0;
  });

  return (
    <>
      <section
        className="
          w-full
          bg-[#0F1112]

          flex
          justify-center
        "
      >
        {/* FIGMA CONTAINER */}
        <div
          className="
            w-full
            max-w-[1366px]

            flex
            flex-col

            items-center

            gap-[11px]

            px-[93px]
            py-[64px]

            bg-[#0F1112]

            max-sm:px-[16px]
            max-sm:py-[40px]
          "
        >
          {/* INNER */}
          <div
            className="
              w-full
              max-w-[1180px]
            "
          >
            {/* SEARCH + SORT */}
            <div
              className="
                flex
                flex-col
                md:flex-row

                justify-between
                items-center

                gap-6

                mb-12

                max-sm:items-stretch
                max-sm:mb-8
              "
            >
              {/* SEARCH */}
              <div className="w-full md:w-[60%] relative">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search Videos"
                  className="
                    w-full

                    bg-transparent

                    border
                    border-[#414243]

                    rounded-[12px]

                    px-12
                    py-3

                    text-white

                    placeholder-gray-500

                    outline-none

                    focus:border-white
                  "
                />

                <span
                  className="
                    absolute
                    left-4
                    top-1/2

                    -translate-y-1/2
                  "
                >
                  <img
                    src="/Searchicon.svg"
                    alt="search"
                    className="w-[18px] h-[18px]"
                  />
                </span>
              </div>

              {/* SORT */}
              <div className="relative w-full md:w-[260px]">
                <button
                  onClick={() => setOpen(!open)}
                  className="
                    w-full

                    flex
                    justify-between
                    items-center

                    border
                    border-[#414243]

                    px-4
                    py-3

                    rounded-[12px]

                    text-white

                    transition-all
                    duration-300

                    hover:bg-white/5
                  "
                >
                  <span>Sort By: {selected}</span>

                  <span
                    className={`
                      transition-all
                      duration-300
                      ${open ? "rotate-180" : ""}
                    `}
                  >
                    <img src="/Vectorup.svg" alt="arrow" className="w-[14px]" />
                  </span>
                </button>

                {open && (
                  <div
                    className="
                      absolute
                      top-full

                      mt-2

                      w-full

                      bg-[#1A1F22]

                      border
                      border-[#414243]

                      rounded-[12px]

                      overflow-hidden

                      z-50
                    "
                  >
                    <div
                      className="
                        px-4
                        py-3

                        text-gray-400
                        text-sm

                        border-b
                        border-[#414243]
                      "
                    >
                      Sort by
                    </div>

                    {options.map((item, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setSelected(item);
                          setOpen(false);
                        }}
                        className={`
                          px-4
                          py-3

                          cursor-pointer

                          text-sm

                          transition-all
                          duration-300

                          ${
                            selected === item
                              ? "bg-white/10 text-white"
                              : "text-gray-300 hover:bg-white/5"
                          }
                        `}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* GRID */}
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3

                gap-[20px]

                w-full

                max-sm:gap-[16px]
              "
            >
              {sortedCourses.map((course, i) => (
                <div
                  key={i}
                  className="
                    flex
                    flex-col

                    items-start
                    justify-between

                    w-full
                    max-w-[386px]

                    min-h-[477px]

                    rounded-[8px]

                    border
                    border-[#414243]

                    bg-[#0F1112]

                    overflow-hidden

                    transition-all
                    duration-300

                    hover:border-[#5A5B5C]
                    hover:translate-y-[-4px]

                    max-sm:max-w-full
                  "
                >
                  {/* IMAGE */}
                  <div className="relative w-full">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="
                        w-full
                        h-[240px]

                        object-cover
                      "
                    />

                    {/* DURATION */}
                    <span
                      className="
                        absolute
                        top-[14px]
                        left-[14px]

                        bg-black/80

                        text-white

                        text-[12px]
                        font-medium

                        px-[10px]
                        py-[6px]

                        rounded-[6px]
                      "
                    >
                      {course.duration}
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div
                    className="
                      flex
                      flex-col

                      items-start

                      gap-[16px]

                      w-full

                      p-[24px]

                      flex-1

                      max-sm:p-[18px]
                    "
                  >
                    {/* TITLE */}
                    <h3
                      className="
                        text-[#F0F0F0]

                        font-black

                        text-[22px]
                        leading-[30px]

                        tracking-[-0.5px]

                        max-sm:text-[18px]
                        max-sm:leading-[26px]
                      "
                    >
                      {course.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p
                      className="
                        text-[#A9A9A9]

                        text-[14px]
                        leading-[22px]
                      "
                    >
                      {course.desc}
                    </p>

                    {/* PRICE */}
                    <div
                      className="
                        flex
                        items-center

                        gap-[10px]

                        mt-auto
                      "
                    >
                      <span
                        className="
                          text-[#C7E36B]

                          text-[14px]
                          font-semibold
                        "
                      >
                        95% off
                      </span>

                      <span
                        className="
                          line-through

                          text-[#6F6F6F]

                          text-[14px]
                        "
                      >
                        ₹799
                      </span>
                    </div>

                    {/* BUTTON */}
                    <button
                      className="
    flex
    justify-center
    items-center

    gap-[8px]

    self-stretch

    px-[16px]
    py-[8px]

    rounded-[4px]

    bg-[#F0F0F0]

    text-black

    text-[14px]
    font-semibold
    leading-[24px]

    transition-all
    duration-300

    hover:bg-white
  "
                    >
                      BUY ₹399.00
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BANNER */}
      <ProPlanBanner />
    </>
  );
}
