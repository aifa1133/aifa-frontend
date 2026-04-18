

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
  {
    title: "AI Color Grading Course",
    desc: "Master color grading techniques using AI software.",
    image: "/courses/v10.png",
    duration: "1h 50m",
  },
  {
    title: "AI Motion Graphics Masterclass",
    desc: "Create dynamic motion graphics using AI-powered tools.",
    image: "/courses/v11.png",
    duration: "2h 00m",
  },
  {
    title: "AI Video Optimization Course",
    desc: "Optimize videos for performance using AI analytics.",
    image: "/courses/v12.png",
    duration: "1h 30m",
  },
  {
    title: "AI Content Strategy Masterclass",
    desc: "Develop effective content strategies using AI insights.",
    image: "/courses/v13.png",
    duration: "1h 40m",
  },
  {
    title: "AI Audience Engagement Course",
    desc: "Boost audience engagement using AI-driven techniques.",
    image: "/courses/v14.png",
    duration: "1h 25m",
  },
  {
    title: "AI Marketing Automation Course",
    desc: "Automate your marketing efforts using AI-powered tools.",
    image: "/courses/v15.png",
    duration: "1h 35m",
  },
  {
    title: "AI Analytics & Insights Masterclass",
    desc: "Leverage AI analytics to gain insights and optimize content.",
    image: "/courses/v16.png",
    duration: "1h 45m",
  },
  {
    title: "AI Content Monetization Course",
    desc: "Learn how to monetize your content using AI strategies.",
    image: "/courses/v17.png",
    duration: "1h 30m",
  },
  {
    title: "AI Content Monetization Course",
    desc: "Learn how to monetize your content using AI strategies.",
    image: "/courses/v10.png",
    duration: "1h 30m",
  },
];


/* ---------------- MAIN PAGE ---------------- */
export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Newest");

  const options = ["Newest", "Price: Low to High", "Duration"];

  /* 🔍 FILTER */
  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  /* 🔽 SORT */
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (selected === "Duration") {
      return a.duration.localeCompare(b.duration);
    }
    return 0;
  });

  return (
    <section className="min-h-screen bg-[#0B0F10] py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* 🔥 SEARCH + SORT */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">

          {/* SEARCH */}
          <div className="w-full md:w-[60%] relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search Videos"
              className="w-full bg-transparent border border-white/20 rounded-xl px-12 py-3 text-white placeholder-gray-500 outline-none focus:border-white"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>

          {/* SORT */}
          <div className="relative w-full md:w-[260px]">
            <button
              onClick={() => setOpen(!open)}
              className="w-full flex justify-between items-center border border-white/20 px-4 py-3 rounded-xl text-white hover:bg-white/5"
            >
              Sort By: {selected}
              <span className={`${open ? "rotate-180" : ""}`}>⌃</span>
            </button>

            {open && (
              <div className="absolute top-full mt-2 w-full bg-[#1a1f22] border border-white/10 rounded-xl overflow-hidden z-50">
                <div className="px-4 py-3 text-gray-400 text-sm border-b border-white/10">
                  Sort by
                </div>

                {options.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setSelected(item);
                      setOpen(false);
                    }}
                    className={`px-4 py-3 cursor-pointer text-sm ${
                      selected === item
                        ? "bg-white/10 text-white"
                        : "text-gray-300 hover:bg-white/5"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 🔥 GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedCourses.map((course, i) => (
            <div
              key={i}
              className="bg-[#0f1416] border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.02] hover:border-white/20 transition"
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-56 object-cover"
                />

                <span className="absolute top-3 left-3 bg-black/80 text-white text-xs px-3 py-1 rounded-md">
                  {course.duration}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h3 className="text-white text-lg font-semibold mb-2">
                  {course.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4">
                  {course.desc}
                </p>

                <div className="flex gap-3 text-sm mb-4">
                  <span className="text-[#C7E36B] font-semibold">
                    95% off
                  </span>
                  <span className="line-through text-gray-500">
                    ₹799
                  </span>
                </div>

                <button className="w-full bg-[#dcdcdc] text-black py-2.5 rounded-md font-medium hover:bg-white">
                  Buy ₹49.00
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 BANNER */}
      <ProPlanBanner />
    </section>
  );
}