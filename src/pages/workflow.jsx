"use client";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Workflow() {
  const [category, setCategory] = useState("All");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    fetch("/api/resources?type=workflow")
      .then(r => r.json())
      .then(d => {
        if (Array.isArray(d)) {
          setData(d);
          const cats = ["All", ...new Set(d.map(i => i.category).filter(Boolean))];
          setCategories(cats);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = category === "All" ? data : data.filter(i => i.category === category);

  return (
    <section className="bg-[#0B0F10] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold">WORK FLOW</h2>
          <div className="flex gap-3 w-full md:w-auto">
            <select value={category} onChange={e => setCategory(e.target.value)} className="bg-[#111] border border-white/10 px-4 py-2 rounded-md w-full md:w-auto text-white">
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
            <select className="bg-[#111] border border-white/10 px-4 py-2 rounded-md w-full md:w-auto text-white">
              <option>Sub Category</option>
            </select>
          </div>
        </div>

        {/* GRID */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-white/10" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-white/10 rounded w-2/3" />
                  <div className="h-3 bg-white/5 rounded" />
                  <div className="h-3 bg-white/5 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-20">No workflows available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <div key={item._id || i} className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden group hover:border-[#C7E36B]/40 transition">
                <div className="relative h-48 overflow-hidden">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                  <Link to={`/workflow/${item._id}`} className="text-[#C7E36B] text-sm flex items-center gap-2 hover:underline">
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LOAD MORE */}
        <div className="flex justify-center mt-12">
          <button className="bg-white/10 px-6 py-3 rounded-md hover:bg-white/20 transition w-full sm:w-auto">
            + View More
          </button>
        </div>
      </div>
    </section>
  );
}
