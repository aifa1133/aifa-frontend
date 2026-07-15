"use client";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Projects() {
  const [category, setCategory] = useState("All");

  const data = [
    { title: "Luxury Perfume Ad", desc: "A cinematic AI-generated commercial for a luxury fragrance brand using Midjourney and Runway Gen-2.", img: "/workflow/workflow1.png", tags: ["Commercial", "VFX"] },
    { title: "Cyberpunk Music Video", desc: "Futuristic music video with Stable Diffusion visuals and AI-synced lip animations for an indie artist.", img: "/workflow/workflow2.png", tags: ["Music Video", "AI Film"] },
    { title: "Sci-Fi Cinematic Short", desc: "3-minute AI short film with consistent characters, generative environments, and AI-scored music.", img: "/workflow/workflow3.png", tags: ["AI Film", "Editing"] },
    { title: "Product Launch Reel", desc: "60-second product reveal reel built entirely with AI tools — script, visuals, voiceover, and edit.", img: "/workflow/workflow4.png", tags: ["Commercial", "Editing"] },
    { title: "AI Horror Film Teaser", desc: "Dark atmospheric horror teaser using Pika Labs for motion and ElevenLabs for a spine-chilling narration.", img: "/workflow/workflow5.png", tags: ["AI Film", "VFX"] },
    { title: "AI Travel Documentary", desc: "Immersive travel doc spanning 5 locations, generated entirely using AI tools and narrated with AI voice.", img: "/workflow/workflow6.png", tags: ["Documentary", "AI Film"] },
    { title: "Fashion Lookbook Video", desc: "High-fashion lookbook video using Midjourney model generations and CapCut AI transitions.", img: "/workflow/workflow7.png", tags: ["Commercial", "Editing"] },
    { title: "Animated Kids Story", desc: "Fully AI-animated children's story with consistent characters, background music, and voiceover.", img: "/workflow/workflow8.png", tags: ["Animation", "AI Film"] },
    { title: "Corporate Brand Film", desc: "Professional 2-minute brand film for a tech company, created end-to-end with AI filmmaking tools.", img: "/workflow/workflow9.png", tags: ["Commercial", "Editing"] },
  ];

  return (
    <section className="bg-[#0B0F10] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* 🔥 HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold">PROJECTS</h2>

          <div className="flex gap-3 w-full md:w-auto">
            <select value={category} onChange={e => setCategory(e.target.value)} className="bg-[#111] border border-white/10 px-4 py-2 rounded-md w-full md:w-auto text-white">
              <option value="All">All</option>
              <option value="AI Film">AI Film</option>
              <option value="Editing">Editing</option>
              <option value="VFX">VFX</option>
              <option value="Commercial">Commercial</option>
              <option value="Music Video">Music Video</option>
              <option value="Documentary">Documentary</option>
              <option value="Animation">Animation</option>
            </select>

            <select className="bg-[#111] border border-white/10 px-4 py-2 rounded-md w-full md:w-auto">
              <option>Sub Category</option>
            </select>
          </div>
        </div>

        {/* 🔥 GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.filter(item => category === "All" || item.tags.includes(category)).map((item, i) => (
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

                <Link to={`/projects/${i + 1}`} className="text-[#C7E36B] text-sm flex items-center gap-2 hover:underline">
                  View Details →
                </Link>
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
