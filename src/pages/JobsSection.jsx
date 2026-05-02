"use client";
import { useState } from "react";

export default function JobsSection() {
  const jobs = [
    {
      tag: "AI Film",
      title: "A 2 minute short AI film is needed",
      type: "PART-TIME",
      desc: "Create an AI-driven cinematic ad for a binary options trading platform, emphasizing clarity and strong user engagement.",
      price: "$120 fixed",
      time: "1 hour ago",
    },
    {
      tag: "AI Film",
      title: "Create a cinematic AI short film",
      type: "PART-TIME",
      desc: "Create an AI-driven cinematic short film with strong storytelling, clear visuals, and smooth scene transitions.",
      price: "$10 per hour",
      time: "1 hour ago",
    },
    {
      tag: "AI Ads",
      title: "Build high-converting AI video ads",
      type: "FULL-TIME",
      desc: "Create an AI-driven cinematic ad focused on brand clarity, user engagement, and storytelling that improves conversions.",
      price: "$3k to 5k per month",
      time: "1 hour ago",
    },
    {
      tag: "AI Film",
      title: "Need a 1 minute AI short film",
      type: "PART-TIME",
      desc: "Create an AI-driven cinematic short film with strong storytelling, clear visuals, and smooth scene transitions.",
      price: "$10 per hour",
      time: "1 hour ago",
    },
    {
      tag: "AI Ads",
      title: "Build high-converting AI video ads",
      type: "FULL-TIME",
      desc: "Create an AI-driven cinematic ad focused on brand clarity, user engagement, and storytelling that improves conversions.",
      price: "$3k to 5k per month",
      time: "1 hour ago",
    },
    {
      tag: "AI Film",
      title: "A 2 minute short AI film is needed",
      type: "PART-TIME",
      desc: "Create an AI-driven cinematic ad for a binary options trading platform, emphasizing clarity and strong user engagement.",
      price: "$120 fixed",
      time: "1 hour ago",
    },
    {
      tag: "AI Film",
      title: "A 2 minute short AI film is needed",
      type: "PART-TIME",
      desc: "Create an AI-driven cinematic ad for a binary options trading platform, emphasizing clarity and strong user engagement.",
      price: "$120 fixed",
      time: "1 hour ago",
    },
    {
      tag: "AI Film",
      title: "A 2 minute short AI film is needed",
      type: "PART-TIME",
      desc: "Create an AI-driven cinematic ad for a binary options trading platform, emphasizing clarity and strong user engagement.",
      price: "$120 fixed",
      time: "1 hour ago",
    },
    {
      tag: "AI Film",
      title: "A 2 minute short AI film is needed",
      type: "PART-TIME",
      desc: "Create an AI-driven cinematic ad for a binary options trading platform, emphasizing clarity and strong user engagement.",
      price: "$120 fixed",
      time: "1 hour ago",
    },
    {
      tag: "AI Film",
      title: "A 2 minute short AI film is needed",
      type: "PART-TIME",
      desc: "Create an AI-driven cinematic ad for a binary options trading platform, emphasizing clarity and strong user engagement.",
      price: "$120 fixed",
      time: "1 hour ago",
    },
    {
      tag: "AI Film",
      title: "A 2 minute short AI film is needed",
      type: "PART-TIME",
      desc: "Create an AI-driven cinematic ad for a binary options trading platform, emphasizing clarity and strong user engagement.",
      price: "$120 fixed",
      time: "1 hour ago",
    },
    {
      tag: "AI Film",
      title: "A 2 minute short AI film is needed",
      type: "PART-TIME",
      desc: "Create an AI-driven cinematic ad for a binary options trading platform, emphasizing clarity and strong user engagement.",
      price: "$120 fixed",
      time: "1 hour ago",
    },
  ];


  return (
  <section className="bg-[#0B0F10] text-white py-28">
    
    {/* MAIN CONTAINER */}
    <div className="max-w-7xl mx-auto px-6">

      {/* 🔥 FILTER BAR */}
      <div className="flex flex-wrap gap-4 mb-12">

        {["Category", "Budget", "Timeline"].map((f, i) => (
          <button
            key={i}
            className="group relative px-6 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur flex items-center gap-3 transition hover:border-[#C7E36B]/50 hover:bg-white/10"
          >
            <span className="text-sm font-medium">{f}</span>

            <span className="text-gray-400 group-hover:text-[#C7E36B] transition">
              ▾
            </span>

            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition pointer-events-none shadow-[0_0_20px_rgba(199,227,107,0.15)]"></div>
          </button>
        ))}

      </div>

      {/* 🔥 JOB CARDS */}
      <div className="grid md:grid-cols-3 gap-6">

        {jobs.map((job, i) => (
          <div
            key={i}
            className="bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-[#C7E36B]/40 transition"
          >
            <span className="bg-[#C7E36B] text-black text-xs px-3 py-1 rounded-md">
              {job.tag}
            </span>

            <h3 className="text-lg font-semibold mt-4 mb-2">
              {job.title}
            </h3>

            <p className="text-gray-400 text-xs mb-4">
              {job.type}
            </p>

            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {job.desc}
            </p>

            <button className="text-[#C7E36B] text-sm mb-6">
              View Details
            </button>

            <div className="border-t border-white/10 pt-4 flex justify-between text-sm">
              <span className="border border-white/20 px-3 py-1 rounded-md">
                {job.price}
              </span>
              <span className="border border-white/20 px-3 py-1 rounded-md">
                {job.time}
              </span>
            </div>
          </div>
        ))}

      </div>

      {/* 🔥 LOAD MORE */}
      <div className="flex justify-center mt-12">
        <button className="bg-[#C7E36B] text-black px-6 py-3 rounded-xl hover:opacity-90 transition">
          + Load more jobs →
        </button>
      </div>

    </div>
  </section>

)};