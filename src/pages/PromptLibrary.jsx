"use client";
import { useState, useEffect } from "react";

const PAGE_SIZE = 6;
const CATEGORIES = ["All", "Cinematic", "Product", "Character", "Landscape", "VFX"];

export default function PromptLibrary() {
  const [category, setCategory] = useState("All");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    fetch("/api/prompts")
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setPrompts(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const filtered = category === "All" ? prompts : prompts.filter(p => p.category === category);

  return (
    <section className="bg-[#0B0F10] text-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
          <h1 className="text-3xl font-semibold">PROMPT LIBRARY</h1>
          <div className="flex gap-4">
            <select
              value={category}
              onChange={e => { setCategory(e.target.value); setVisible(PAGE_SIZE); }}
              className="bg-[#111] border border-white/10 px-4 py-2 rounded-md text-white"
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* LOADING SKELETON */}
        {loading && (
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden animate-pulse">
                <div className="w-full h-60 bg-white/10" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-white/10 rounded w-2/3" />
                  <div className="h-20 bg-white/5 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* GRID */}
        {!loading && (
          <>
            {filtered.length === 0 ? (
              <p className="text-center text-gray-500 py-20">No prompts found.</p>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {filtered.slice(0, visible).map((item, i) => (
                  <div
                    key={item._id || i}
                    className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-[#C7E36B]/40 transition group"
                  >
                    {/* IMAGE */}
                    <div className="relative">
                      <img src={item.image} alt={item.title} className="w-full h-60 object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <span className="text-sm">Preview</span>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-5">
                      <h3 className="text-md font-semibold mb-3">{item.title}</h3>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-gray-400 text-sm relative">
                        <p className="line-clamp-4">{item.text}</p>
                        <button
                          onClick={() => handleCopy(item.text, i)}
                          className={`absolute top-3 right-3 text-xs font-semibold transition-colors ${copiedIndex === i ? "text-[#C7E36B]" : "text-gray-400 hover:text-white"}`}
                        >
                          {copiedIndex === i ? "✓ Copied!" : "📋"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* LOAD MORE */}
            {visible < filtered.length && (
              <div className="flex justify-center mt-16">
                <button
                  onClick={() => setVisible(v => v + PAGE_SIZE)}
                  className="bg-[#C7E36B] text-black px-6 py-3 rounded-xl hover:opacity-90 transition"
                >
                  + Load More Prompts
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
