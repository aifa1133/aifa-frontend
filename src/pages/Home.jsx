"use client";

import React from "react";

import Hero from "../Components/Hero";
import Companies from "../Components/Companies";
import CourseCard from "../Components/CourseCard";
import Courses from "../Components/Courses";
import Tools from "../Components/Tools";
import Bootcamps from "../Components/Bootcamp";
import Features from "../Components/Features";
import Directors from "../Components/Directors";
import Institutions from "../Components/Institutions";
import Stats from "../Components/Stats";
import Testimonial from "../Components/Testimonial";
import CTASection from "../Components/CTASection";

export default function Home() {
  return (
    <main
      className="
        w-full
        min-h-screen

        bg-[#0B0F10]

        overflow-x-hidden
      "
    >
      {/* HERO */}
      <section className="w-full">
        <Hero />
      </section>

      {/* COMPANIES */}
      <section className="w-full">
        <Companies />
      </section>

      {/* BOOTCAMPS / WORKSHOPS */}
      <section className="w-full">
        <Bootcamps />
      </section>

      {/* COURSE CARD */}
      <section className="w-full">
        <CourseCard />
      </section>

      {/* COURSES — hidden */}
      {/* <section className="w-full">
        <Courses />
      </section> */}

      {/* TOOLS */}
      <section className="w-full">
        <Tools />
      </section>

      {/* FEATURES */}
      <section className="w-full">
        <Features />
      </section>

      {/* DIRECTORS */}
      <section className="w-full">
        <Directors />
      </section>

      {/* INSTITUTIONS */}
      <section className="w-full">
        <Institutions />
      </section>

      {/* STATS */}
      <section className="w-full">
        <Stats />
      </section>

      {/* TESTIMONIAL */}
      <section className="w-full">
        <Testimonial />
      </section>

      {/* CTA */}
      <section className="w-full">
        <CTASection />
      </section>
    </main>
  );
}
