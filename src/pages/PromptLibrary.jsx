"use client";
import { useState, useEffect } from "react";
import ProGate from "../Components/ProGate";

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

  function PromptCard({ item, i }) {
    return (
      <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-[#C7E36B]/40 transition group">
        <div className="relative">
          <img src={item.image} alt={item.title} className="w-full h-60 object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <span className="text-sm">Preview</span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-md font-semibold mb-3">{item.title}</h3>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-gray-400 text-sm">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => handleCopy(item.text, i)}
                className={`text-xs font-semibold transition-colors px-2 py-0.5 rounded ${copiedIndex === i ? "text-[#C7E36B]" : "text-gray-400 hover:text-white"}`}
              >
                {copiedIndex === i ? "✓ Copied!" : "📋 Copy"}
              </button>
            </div>
            <p className="line-clamp-4">{item.text}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-[#0B0F10] text-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER — always visible */}
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
              <>
                {/* First item — always visible */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <PromptCard item={filtered[0]} i={0} />
                </div>

                {/* Rest — gated */}
                {filtered.slice(1, visible).length > 0 && (
                  <ProGate preview={null}>
                    <div className="grid md:grid-cols-3 gap-6">
                      {filtered.slice(1, visible).map((item, i) => (
                        <PromptCard key={item._id || i} item={item} i={i + 1} />
                      ))}
                    </div>
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
                  </ProGate>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}
