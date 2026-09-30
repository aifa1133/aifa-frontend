"use client";
import { useState, useEffect } from "react";
import { useIsPro, ProUpgradeModal } from "../Components/ProGate";

const LockOverlay = () => (
  <div className="absolute inset-0 flex items-center justify-center z-10 rounded-2xl">
    <div className="bg-[#111315]/90 border border-white/10 rounded-2xl px-5 py-3 flex items-center gap-3 shadow-xl">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
      <span className="text-white text-xs font-semibold">Pro Members Only — Tap to Unlock</span>
    </div>
  </div>
);

export default function LearningTips() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const isPro = useIsPro();

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
            {data.map((item, i) => {
              const locked = i > 0 && !isPro;
              return (
                <div
                  key={item._id || i}
                  className={`bg-[#111] border border-white/10 rounded-2xl overflow-hidden relative transition ${locked ? "cursor-pointer" : "group hover:border-[#C7E36B]/40"}`}
                  onClick={locked ? () => setShowModal(true) : undefined}
                >
                  <div className={locked ? "blur-sm opacity-50 pointer-events-none select-none" : ""}>
                    <div className="relative h-48 overflow-hidden">
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    </div>
                    <div className="p-4">
                      {item.title && <p className="text-sm text-white font-medium mb-2">{item.title}</p>}
                      <a
                        href={item.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => locked && e.preventDefault()}
                        className="w-full bg-[#C7E36B] text-black py-2 rounded-md text-sm font-medium hover:opacity-90 transition flex items-center justify-center gap-2"
                      >
                        + Watch Now →
                      </a>
                    </div>
                  </div>
                  {locked && <LockOverlay />}
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <button
            onClick={() => !isPro && setShowModal(true)}
            className="bg-white/10 px-6 py-3 rounded-md hover:bg-white/20 transition w-full sm:w-auto"
          >
            + View More
          </button>
        </div>
      </div>
      {showModal && <ProUpgradeModal onClose={() => setShowModal(false)} />}
    </section>
  );
}
