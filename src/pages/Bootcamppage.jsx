"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "./Bootcamp/Hero";
import VideoSection from "./Bootcamp/Videosection";
import LearnSection from "./Bootcamp/LearnSection";
import BuildSection from "./Bootcamp/BuildSection";
import FAQSection from "./Bootcamp/FAQSection";
import TestimonialsSection from "./Bootcamp/TestimonialsSection";
import InstructorsSection from "./Bootcamp/InstructorsSection";
import WhoSection from "./Bootcamp/WhoSection";
import CourseContent from "./Bootcamp/CourseContent";
import IncludedSection from "./Bootcamp/IncludedSection";

export default function Bootcamppage() {
  const [showBar, setShowBar] = useState(false);
  const [bootcamp, setBootcamp] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/bootcamps").then(r => r.ok ? r.json() : []).then(d => { if (Array.isArray(d) && d.length > 0) setBootcamp(d[0]); }).catch(() => {});
  }, []);

  useEffect(() => {
    const handle = () => {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight;
      const winH = window.innerHeight;
      setShowBar(scrollY > 300 && scrollY + winH < docH - 300);
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <div className="bg-[#0B0F19] flex flex-col">
      <Hero />
      <VideoSection />
      <LearnSection />
      <BuildSection />
      <IncludedSection />
      <CourseContent />
      <WhoSection />
      <InstructorsSection />
      <TestimonialsSection />
      <FAQSection />

      {/* ── STICKY PRICE BAR ── */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 bg-[#0B0F10] border-t border-white/10 transition-transform duration-300 ${showBar ? "translate-y-0" : "translate-y-full"}`}>
        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto px-8 py-4">
          <div>
            <div className="flex items-center gap-4">
              <p className="text-white font-bold text-base">AI Filmmaking Bootcamp</p>
              <span className="text-[#C7E36B] font-bold text-2xl">₹{(bootcamp?.price||14000).toLocaleString("en-IN")}</span>
              <span className="text-gray-400 line-through text-sm">₹{(bootcamp?.originalPrice||19000).toLocaleString("en-IN")}</span>
            </div>
            <p className="text-gray-400 text-xs mt-0.5">1 month Program + Lifetime AIFA Membership (Worth ₹40,000)</p>
          </div>
          <button onClick={() => navigate("/bootcamp/enroll")} className="bg-[#C7E36B] text-black font-bold px-8 py-3 rounded-xl hover:bg-lime-300 transition-all text-sm">
            Book your seat →
          </button>
        </div>
        {/* Mobile */}
        <div className="md:hidden px-4 py-4">
          <div className="flex items-center justify-between mb-1">
            <p className="text-white font-bold text-sm">AI Filmmaking Bootcamp</p>
            <span className="text-gray-400 line-through text-xs">₹{(bootcamp?.originalPrice||19000).toLocaleString("en-IN")}</span>
          </div>
          <p className="text-[#C7E36B] font-bold text-2xl mb-3">₹{(bootcamp?.price||14000).toLocaleString("en-IN")}</p>
          <button onClick={() => navigate("/bootcamp/enroll")} className="w-full bg-[#C7E36B] text-black font-bold py-3 rounded-xl hover:bg-lime-300 transition-all text-sm">
            Book your seat →
          </button>
        </div>
      </div>
    </div>
  );
}
