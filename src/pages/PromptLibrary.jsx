"use client";
import { useState } from "react";

const PROMPT_CATEGORIES = ["All", "Cinematic", "Product", "Character", "Landscape", "VFX"];

export default function PromptLibrary() {
  const [category, setCategory] = useState("All");
  const [subCategory, setSubCategory] = useState("All");

  const prompts = [
    {
      title: "Futuristic Hologram Portrait",
      category: "Cinematic",
      img: "/prompt/pr1.png",
      text: "Hyper-realistic cinematic portrait of a young man in a dark blue futuristic studio, holding a glowing holographic film reel. Electric blue energy waves surround the hologram. Neon blue lighting with volumetric fog. Deep blue gradient background with star particles. Style: Ultra-realistic, cinematic VFX, 8K resolution, --ar 16:9 --style raw --v 6",
    },
    { title: "Sci-Fi Space Station Interior", category: "Landscape", img: "/prompt/pr2.png", text: "Hyper-realistic interior of a deep-space research station, curved white corridors with blue LED strips, astronaut in orange spacesuit walking through airlock, Earth visible through panoramic windows, dramatic natural lighting from planet below, lens flare, 8K, --ar 16:9 --v 6" },
    { title: "Vintage Film Noir Detective", category: "Character", img: "/prompt/pr3.png", text: "Film noir detective portrait, 1940s style, man in fedora and trenchcoat under a flickering street lamp in the rain, dramatic chiaroscuro lighting, heavy shadows, wet cobblestones, cigarette smoke, black and white with selective amber tone, cinematic grain, Leica 35mm --ar 4:5 --style raw" },
    { title: "Luxury Perfume Product Shot", category: "Product", img: "/prompt/pr4.png", text: "Ultra-luxury perfume bottle on black marble surface, golden liquid, studio light with dramatic side-lighting, bokeh background with gold dust particles, reflections on marble surface, editorial photography, 4K commercial quality, --ar 4:5 --style raw --v 6" },
    { title: "Cyberpunk City Street", category: "Landscape", img: "/prompt/pr5.png", text: "Cyberpunk mega-city street at night, neon signs in Japanese and Hindi, rain-slicked asphalt reflecting holographic ads, flying vehicles overhead, dense crowd with umbrellas, fog and smog, blade runner aesthetic, cinematic anamorphic lens, --ar 21:9 --v 6" },
    { title: "AI Energy Burst Portrait", category: "VFX", img: "/prompt/pr6.png", text: "Dynamic portrait of a young woman, electric golden energy bursting from her hands, particles swirling around her body, dark studio background, dramatic rim lighting, cinematic composition, high-contrast, hyperrealistic skin texture, 8K resolution --ar 2:3 --style raw" },
    { title: "Isometric Smart City", category: "Landscape", img: "/prompt/pr7.png", text: "Isometric view of a futuristic smart city at golden hour, solar panels on every rooftop, autonomous vehicles on clean white roads, vertical gardens on skyscrapers, soft warm lighting, clean graphic style, 3D render quality, detailed, --ar 1:1 --v 6" },
    { title: "Ancient Warrior Character", category: "Character", img: "/prompt/pr8.png", text: "Epic fantasy warrior, ancient Indian Rajput armour in gold and crimson, dramatic battle pose, monsoon storm background with lightning, extreme detail on armour engravings, hyper-realistic skin texture, cinematic lighting, close-up composition, --ar 2:3 --style raw --v 6" },
    { title: "AI Exploding Paint Splash VFX", category: "VFX", img: "/prompt/pr9.png", text: "Slow-motion explosion of multicolour paint against pure black background, hyper-realistic paint physics, droplets frozen in time, vivid saturated reds blues greens, studio strobe lighting, ultra-high-speed photography style, 8K --ar 16:9 --style raw" },
    { title: "Cinematic Ocean Storm", category: "Landscape", img: "/prompt/pr10.png", text: "Massive cargo ship battling a 100-foot rogue wave in a North Atlantic storm, dramatic grey sky with lightning, spray and foam, low camera angle at water level, cinematic anamorphic lens, ultra-realistic ocean simulation, photographic quality, --ar 21:9 --v 6" },
    { title: "Tech Product Reveal", category: "Product", img: "/prompt/pr11.png", text: "Next-gen wireless earbuds floating on a gradient blue-to-purple studio background, dramatic side lighting highlighting product curves, metallic finish with holographic accents, minimalist composition, Apple-style commercial photography, 4K --ar 1:1 --style raw" },
    { title: "Dramatic Sunset Portrait", category: "Cinematic", img: "/prompt/pr12.png", text: "Silhouette of a lone filmmaker standing on a hilltop at sunset, golden hour orange and purple sky, camera on tripod, cinematic wide shot, dust particles in air, dramatic rays of light through clouds, moody atmospheric, 8K, --ar 16:9 --v 6" },
    
    
    

    

  ];

  return (
    <section className="bg-[#0B0F10] text-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* 🔥 HEADER */}
        <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
          <h1 className="text-3xl font-semibold">PROMPT LIBRARY</h1>

          {/* FILTERS */}
          <div className="flex gap-4">
            <select value={category} onChange={e=>setCategory(e.target.value)} className="bg-[#111] border border-white/10 px-4 py-2 rounded-md text-white">
              {PROMPT_CATEGORIES.map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* 🔥 GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          {prompts.filter(p => category === "All" || p.category === category).map((item, i) => (
            <div
              key={i}
              className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-[#C7E36B]/40 transition group"
            >
              {/* IMAGE */}
              <div className="relative">
                <img src={item.img} className="w-full h-60 object-cover" />

                {/* HOVER OVERLAY */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="text-sm">Preview</span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h3 className="text-md font-semibold mb-3">{item.title}</h3>

                {/* PROMPT BOX */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-gray-400 text-sm relative">
                  <p className="line-clamp-4">{item.text}</p>

                  {/* COPY BUTTON */}
                  <button
                    onClick={() => navigator.clipboard.writeText(item.text)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-white"
                  >
                    📋
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 🔥 LOAD MORE */}
        <div className="flex justify-center mt-16">
          <button className="bg-[#C7E36B] text-black px-6 py-3 rounded-xl hover:opacity-90 transition">
            + Load More Prompts
          </button>
        </div>
      </div>
    </section>
  );
}
