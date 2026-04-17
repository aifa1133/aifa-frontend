"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

const courses = [
  {
    title: "Google Flow Masterclass",
    image: "/courses/courses1.png",
    duration: "1h 10m",
    price: "₹49.00",
  },
  {
    title: "Kling AI Video Masterclass",
    image: "/courses/courses2.png",
    duration: "1h 10m",
    price: "₹49.00",
  },
  {
    title: "AI Background Magic",
    image: "/courses/courses3.png",
    duration: "1h 10m",
    price: "₹49.00",
  },
];

export default function Courses() {
  return (
    <section className="w-full bg-[#0B0F10] py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-white text-3xl md:text-4xl font-semibold">
            Self Paced Courses
          </h2>

          <div className="flex gap-3">
            <button className="bg-[#C7E36B] p-3 rounded-md">
              <ChevronLeft size={18} />
            </button>
            <button className="bg-[#C7E36B] p-3 rounded-md">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-6">

          {courses.map((course, i) => (
            <div
              key={i}
              className="bg-[#111516] border border-white/10 rounded-xl overflow-hidden"
            >

              {/* IMAGE */}
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-[220px] object-cover"
                />

                {/* DURATION */}
                <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-md">
                  {course.duration}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-5">

                <h3 className="text-white text-base font-semibold mb-3">
                  {course.title}
                </h3>

                {/* PRICE */}
                <div className="flex items-center gap-2 text-sm mb-5">
                  <span className="text-[#C7E36B] font-semibold">
                    95% off
                  </span>
                  <span className="line-through text-gray-400">
                    ₹799
                  </span>
                </div>

                {/* BUTTON */}
                <button className="w-full bg-[#E5E5E5] text-black py-2 rounded-md text-sm font-medium hover:bg-white transition">
                  Buy {course.price}
                </button>
              </div>
            </div>
          ))}

        </div>

        {/* BOTTOM BUTTON */}
        <div className="flex justify-center mt-12">
          <button className="bg-[#C7E36B] text-black px-6 py-3 text-sm font-semibold rounded-md">
            + Explore Courses
          </button>
        </div>

      </div>
    </section>
  );
}