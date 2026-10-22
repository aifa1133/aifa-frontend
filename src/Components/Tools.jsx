"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const BADGE_COLORS = {
  "AI CHAT":   "bg-[#6366f1] text-white",
  "VIDEO":     "bg-[#f59e0b] text-black",
  "SEARCH":    "bg-[#10b981] text-white",
  "IMAGE":     "bg-[#3b82f6] text-white",
  "MUSIC":     "bg-[#22c55e] text-white",
  "VOICE":     "bg-[#ec4899] text-white",
  "3D / VIDEO":"bg-[#a855f7] text-white",
  "CONTENT":   "bg-[#14b8a6] text-white",
  "ENHANCE":   "bg-[#C7E36B] text-black",
};

const STATIC_TOOLS = [
  { name:"ChatGPT",    badge:"AI CHAT",    desc:"Conversational AI assistant",      logoUrl:"https://cdn.jsdelivr.net/npm/simple-icons@13/icons/openai.svg",      bgColor:"from-[#10a37f]/20 to-[#0d7a5f]/10" },
  { name:"Runway",     badge:"VIDEO",      desc:"AI video editor & generator",      logoUrl:"https://cdn.jsdelivr.net/npm/simple-icons@13/icons/runway.svg",       bgColor:"from-[#f59e0b]/20 to-[#b45309]/10" },
  { name:"Perplexity", badge:"SEARCH",     desc:"AI-powered search engine",         logoUrl:"https://cdn.jsdelivr.net/npm/simple-icons@13/icons/perplexity.svg",   bgColor:"from-[#10b981]/20 to-[#047857]/10" },
  { name:"Midjourney", badge:"IMAGE",      desc:"AI image generation tool",         logoUrl:"https://cdn.jsdelivr.net/npm/simple-icons@13/icons/midjourney.svg",   bgColor:"from-[#3b82f6]/20 to-[#1d4ed8]/10" },
  { name:"Suno AI",    badge:"MUSIC",      desc:"AI music generation",              logoText:"SUNO",                                                               bgColor:"from-[#8b5cf6]/20 to-[#6d28d9]/10" },
  { name:"Gemini",     badge:"AI CHAT",    desc:"Google's multimodal AI",           logoUrl:"https://cdn.jsdelivr.net/npm/simple-icons@13/icons/googlegemini.svg", bgColor:"from-[#6366f1]/20 to-[#4338ca]/10" },
  { name:"ElevenLabs", badge:"VOICE",      desc:"AI voice & audio synthesis",       logoUrl:"https://cdn.jsdelivr.net/npm/simple-icons@13/icons/elevenlabs.svg",   bgColor:"from-[#ec4899]/20 to-[#be185d]/10" },
  { name:"Luma AI",    badge:"3D / VIDEO", desc:"AI 3D & video generation",         logoText:"LUMA",                                                               bgColor:"from-[#a855f7]/20 to-[#7e22ce]/10" },
  { name:"Higgsfield", badge:"VIDEO",      desc:"AI Video and content",             logoText:"HF",                                                                 bgColor:"from-[#f97316]/20 to-[#c2410c]/10" },
  { name:"Claude",     badge:"AI CHAT",    desc:"Anthropic's conversational AI",    logoUrl:"https://cdn.jsdelivr.net/npm/simple-icons@13/icons/anthropic.svg",    bgColor:"from-[#d97706]/20 to-[#92400e]/10" },
  { name:"Merlin AI",  badge:"CONTENT",    desc:"AI browser copilot",               logoText:"M",                                                                  bgColor:"from-[#14b8a6]/20 to-[#0f766e]/10" },
  { name:"Topaz Labs",badge:"ENHANCE",    desc:"Video/photo enhancer",             logoText:"TL",                                                                 bgColor:"from-[#84cc16]/20 to-[#4d7c0f]/10" },
];

export default function Tools() {
  const [tools, setTools] = useState(STATIC_TOOLS);

  useEffect(() => {
    fetch("/api/tools")
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => {
        if (Array.isArray(d) && d.length > 0) {
          // Merge API data with static fallback — fill in missing logo fields
          const merged = d.map(t => {
            if (t.logoUrl || t.logoText) return t;
            const fallback = STATIC_TOOLS.find(s => s.name.toLowerCase() === t.name?.toLowerCase());
            return { ...t, logoUrl: fallback?.logoUrl || "", logoText: fallback?.logoText || "", bgColor: t.bgColor || fallback?.bgColor || "" };
          });
          setTools(merged);
        }
      })
      .catch(() => {}); // silent fallback to static list
  }, []);

  return (
    <section className="w-full bg-[#0B0F10] py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white text-center font-black text-[22px] sm:text-[32px] md:text-[38px] mb-12 tracking-tight"
        >
          TOOLS WE WILL USE
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {tools.map((tool, i) => (
            <motion.div
              key={tool._id || tool.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative bg-[#111315] border border-white/8 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.bgColor || "from-[#6366f1]/20 to-[#4338ca]/10"} opacity-60`} />
              <div className="relative h-[140px] sm:h-[160px] flex items-center justify-center">
                {tool.logoUrl ? (
                  <img
                    src={tool.logoUrl}
                    alt={tool.name}
                    className={`w-24 h-24 sm:w-28 sm:h-28 object-contain opacity-90 group-hover:scale-110 transition-transform duration-300 ${tool.logoUrl.includes("simple-icons") || tool.logoUrl.includes("jsdelivr") ? "brightness-0 invert" : ""}`}
                    onError={e => { e.target.style.display = "none"; }}
                  />
                ) : (
                  <span className="text-white font-black text-2xl sm:text-3xl tracking-widest opacity-90 group-hover:scale-110 transition-transform duration-300">
                    {tool.logoText}
                  </span>
                )}
              </div>
              <div className="relative px-4 pb-4">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="text-white font-bold text-sm sm:text-base truncate">{tool.name}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${BADGE_COLORS[tool.badge] || "bg-white/10 text-white"}`}>
                    {tool.badge}
                  </span>
                </div>
                <p className="text-gray-400 text-xs leading-snug">{tool.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
