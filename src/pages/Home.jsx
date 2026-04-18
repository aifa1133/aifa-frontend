"use client";

import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Companies from "../Components/Companies";
import CourseCard from "../Components/CourseCard";
import Courses from "../Components/Courses";
import Tools from "../Components/Tools";
import Bootcamps from "../Components/Bootcamp";
import Features from "../Components/Features";
import Directors from "../Components/Directors";
import Stats from "../Components/Stats";
import Testimonial from "../Components/Testimonial";
import CTASection from "../Components/CTASection";
import Footer from "../Components/Footer";
import LoginModal from "../authentication/LoginModal";
import SignUpModal from "../authentication/SignUpModal";

export default function Home() {
  return (
    <div className="bg-[#0B0F10] min-h-screen">
      <Hero />
      <Companies />
      <CourseCard />
      <Courses />
      <Tools />
      <Bootcamps />
      <Features />
      <Directors />
      <Stats />
      <Testimonial />
      <CTASection />
    </div>
  );
}
