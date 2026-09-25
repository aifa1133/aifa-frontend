"use client";
import { useState, useEffect } from "react";

export default function AiDeals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("All Benefits");
  const [categories, setCategories] = useState(["All Benefits"]);

  useEffect(() => {
    fetch("/api/resources?type=deal")
      .then(r => r.json())
      .then(d => {
        if (Array.isArray(d)) {
          setDeals(d);
          const cats = ["All Benefits", ...new Set(d.map(i => i.category).filter(Boolean))];
          setCategories(cats);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = active === "All Benefits" ? deals : deals.filter(d => d.category === active);

  return (
    <section className="bg-[#0B0F10] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* TITLE */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">AI Deals</h2>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-4 mb-10 text-sm">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 border border-white/10 transition ${active === cat ? "bg-[#C7E36B] text-black" : "text-gray-400 hover:text-white"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-3xl border border-white/10 overflow-hidden bg-black animate-pulse">
                <div className="h-28 bg-white/10" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-white/10 rounded w-1/3" />
                  <div className="h-5 bg-white/10 rounded w-1/2" />
                  <div className="h-3 bg-white/5 rounded" />
                  <div className="h-8 bg-white/10 rounded w-1/3" />
                  <div className="h-10 bg-white/10 rounded-xl mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-20">No deals available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <div key={item._id || i} className="rounded-3xl border border-white/10 overflow-hidden bg-black hover:border-[#C7E36B]/40 transition">
                {/* LOGO */}
                <div className="h-28 flex items-center justify-center bg-[#1a1a1a] p-4">
                  <img src={item.logo || item.thumbnail} alt={item.title} className="h-full max-h-20 object-contain" />
                </div>
                {/* CONTENT */}
                <div className="p-6">
                  <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-gray-300">{item.category}</span>
                  <h3 className="text-lg font-semibold mt-4">{item.title}</h3>
                  <p className="text-gray-400 text-sm mt-1 mb-4">{item.description}</p>
                  <h2 className="text-3xl font-bold">{item.discount}</h2>
                  <p className="text-[#C7E36B] text-xs mt-1">VIA AIFA</p>
                  <a
                    href={item.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full bg-[#C7E36B] text-black py-3 rounded-xl font-medium hover:opacity-90 transition block text-center"
                  >
                    {item.ctaText || "Get Deal"}
                  </a>
                  <p className="text-gray-500 text-xs text-center mt-2">Redirects to official site</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-300 mb-4 text-4xl font-semibold">Start Saving on AI Tools Today</p>
          <button className="bg-[#C7E36B] text-black px-6 py-3 rounded-xl font-semibold text-lg hover:opacity-90 transition">
            Explore All Deals
          </button>
        </div>
      </div>
    </section>
  );
}
