"use client";

import Hero from "./Bootcamp/Hero";
import VideoSection from "./Bootcamp/Videosection";
import LearnSection from "./Bootcamp/LearnSection";
import BuildSection from "./Bootcamp/BuildSection";
import FAQSection from "./Bootcamp/FAQSection";
import TestimonialsSection from "./Bootcamp/TestimonialsSection";
import InstructorsSection from "./Bootcamp/InstructorsSection";
import WhoSection from "./Bootcamp/WhoSection";

export default function Bootcamppage() {
  return (
    <div className="bg-[#0B0F19] flex flex-col">
      {/* HERO */}
      <Hero />

      {/* VIDEO */}
      <VideoSection />

      {/* WHAT YOU LEARN */}
      <LearnSection />

      {/* WHAT YOU BUILD */}
      <BuildSection />

      {/* WHO IT'S FOR */}
      <WhoSection />

      {/* INSTRUCTORS */}
      <InstructorsSection />

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* FAQ */}
      <FAQSection />
    </div>
  );
}
