"use client";
import { useState, useEffect } from "react";

export default function LearningTips() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/resources?type=tip")
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setData(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-[#0B0F10] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold">LEARNING TIPS</h2>
          <div className="flex gap-3 w-full md:w-auto">
            <select className="bg-[#111] border border-white/10 px-4 py-2 rounded-md w-full md:w-auto text-white">
              <option>All</option>
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
                <div className="p-4"><div className="h-9 bg-white/10 rounded-md" /></div>
              </div>
            ))}
          </div>
        ) : data.length === 0 ? (
          <p className="text-center text-gray-500 py-20">No learning tips available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item, i) => (
              <div key={item._id || i} className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden group hover:border-[#C7E36B]/40 transition">
                <div className="relative h-48 overflow-hidden">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-4">
                  {item.title && <p className="text-sm text-white font-medium mb-2">{item.title}</p>}
                  <a
                    href={item.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#C7E36B] text-black py-2 rounded-md text-sm font-medium hover:opacity-90 transition flex items-center justify-center gap-2"
                  >
                    + Watch Now →
                  </a>
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
