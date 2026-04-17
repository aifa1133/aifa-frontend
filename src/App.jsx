import React from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Companies from "./Components/Companies";
import CourseCard from "./Components/CourseCard";
import Courses from "./Components/Courses";
import Tools from "./Components/Tools";
import Bootcamps from "./Components/Bootcamp";
import Features from "./Components/Features";
import Directors from "./Components/Directors";
import Stats from "./Components/Stats";
import Testimonial from "./Components/Testimonial";
import CTASection from "./Components/CTASection";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
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
      <Footer/>
    </div>
  );
};

export default App;
