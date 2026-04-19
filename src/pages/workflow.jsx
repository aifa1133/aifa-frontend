"use client";
import { useState } from "react";

export default function Workflow() {
  const [category, setCategory] = useState("All");

  const data = [
    {
      title: "Idea Generation",
      desc: "Generate unique story ideas instantly using powerful AI tools for filmmakers  ",
      img: "/workflow/workflow1.png",
    },
    {
      title: "Script Writing",
      desc: "Write engaging scripts automatically with AI assistance for storytelling ",
      img: "/workflow/workflow2.png",
    },
    {
      title: "Scene Creation",
      desc: "Design cinematic scenes using AI tools with detailed control over visuals",
      img: "/workflow/workflow3.png",
    },
    {
      title: "Image Rendering",
      desc: "Generate high-quality images using AI models for concept art and storyboarding",
      img: "/workflow/workflow4.png",
    },
    {
      title: "Voice Generation",
      desc: "Convert text into realistic voiceovers using AI-based text-to-speech technology",
      img: "/workflow/workflow5.png",
    },
    {
      title: "Video Creation",
      desc: "Produce AI-powered videos with smooth transitions and cinematic effects",
      img: "/workflow/workflow6.png",
    },
    {
      title: "Editing Process",
      desc: "Refine visuals using AI tools for editing and post-production",
      img: "/workflow/workflow7.png",
    },
    {
      title: "Sound Design",
      desc: "Enhance audio using AI-based sound tools for immersive soundscapes",
      img: "/workflow/workflow8.png",
    },
    {
      title: "VFX Effects",
      desc: "Add cinematic VFX effects using AI tools for stunning visuals",
      img: "/workflow/workflow9.png",
    },
  ];

  return (
    <section className="bg-[#0B0F10] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* 🔥 HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold">WORK FLOW</h2>

          <div className="flex gap-3 w-full md:w-auto">
            <select className="bg-[#111] border border-white/10 px-4 py-2 rounded-md w-full md:w-auto">
              <option>All</option>
              <option>AI Film</option>
              <option>Editing</option>
                <option>VFX</option>

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

              {/* CONTENT */}
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>

                <p className="text-gray-400 text-sm mb-4">{item.desc}</p>

                <button className="text-[#C7E36B] text-sm flex items-center gap-2">
                  View Details →
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
