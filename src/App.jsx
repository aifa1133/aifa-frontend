// import React from "react";
// import Navbar from "./Components/Navbar";
// import Hero from "./Components/Hero";
// import Companies from "./Components/Companies";
// import CourseCard from "./Components/CourseCard";
// import Courses from "./Components/Courses";
// import Tools from "./Components/Tools";
// import Bootcamps from "./Components/Bootcamp";
// import Features from "./Components/Features";
// import Directors from "./Components/Directors";
// import Stats from "./Components/Stats";
// import Testimonial from "./Components/Testimonial";
// import CTASection from "./Components/CTASection";
// import Footer from "./Components/Footer";

// const App = () => {
//   return (
//     <div>
//       <Navbar />
//       <Hero />
//       <Companies />
//       <CourseCard />
//       <Courses />
//       <Tools />
//       <Bootcamps />
//       <Features />
//       <Directors />
//       <Stats />
//       <Testimonial />
//       <CTASection />
//       <Footer/>
//     </div>
//   );
// };

// export default App;

// "use client";

// import React, { useState } from "react";
// import Navbar from "./Components/Navbar";
// import Hero from "./Components/Hero";
// import Companies from "./Components/Companies";
// import CourseCard from "./Components/CourseCard";
// import Courses from "./Components/Courses";
// import Tools from "./Components/Tools";
// import Bootcamps from "./Components/Bootcamp";
// import Features from "./Components/Features";
// import Directors from "./Components/Directors";
// import Stats from "./Components/Stats";
// import Testimonial from "./Components/Testimonial";
// import CTASection from "./Components/CTASection";
// import Footer from "./Components/Footer";
// import LoginModal from "./authentication/LoginModal";
// import SignUpModal from "./authentication/SignUpModal";

// const App = () => {
//   const [showLogin, setShowLogin] = useState(false);
//   const [showSignup, setShowSignup] = useState(false);

//   return (
//     <div className="bg-[#0B0F10] min-h-screen">
//       <Navbar
//         onLoginClick={() => {
//           setShowSignup(false);
//           setShowLogin(true);
//         }}
//         onSignupClick={() => {
//           setShowLogin(false);
//           setShowSignup(true);
//         }}
//       />

//       <Hero />
//       <Companies />
//       <CourseCard />
//       <Courses />
//       <Tools />
//       <Bootcamps />
//       <Features />
//       <Directors />
//       <Stats />
//       <Testimonial />
//       <CTASection />
//       <Footer />

//       {/* LOGIN MODAL */}
//       {/* LOGIN MODAL */}
//       {showLogin && !showSignup && (
//         <LoginModal
//           onClose={() => setShowLogin(false)}
//           onSwitchToSignup={() => {
//             setShowLogin(false);
//             setShowSignup(true);
//           }}
//         />
//       )}

//       {/* SIGNUP MODAL */}
//       {showSignup && !showLogin && (
//         <SignUpModal
//           onClose={() => setShowSignup(false)}
//           onSwitchToLogin={() => {
//             setShowSignup(false);
//             setShowLogin(true);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default App;

"use client";

import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Home from "./pages/Home";
import CoursesPage from "./pages/CoursesPage";

import LoginModal from "./authentication/LoginModal";
import SignUpModal from "./authentication/SignUpModal";

import HireTalent from "./pages/HireTalent";
import JobsSection from "./pages/JobsSection";
import PromptLibrary from "./pages/PromptLibrary";
import Workflow from "./pages/workflow";
import WorkflowDetail from "./pages/WorkflowDetail";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import LearningTips from "./pages/LearningTips";
import AiDeals from "./pages/AiDeals";
import ServicesPage from "./pages/ServicesPage";
import WorkshopsPage from "./pages/WorkshopsPage";
import Bootcamppage from "./pages/Bootcamppage";
import Forums from "./pages/Forums";
import Events from "./pages/Events";
import Clubs from "./pages/Clubs";
import Challenges from "./pages/Challenges";
import Awards from "./pages/Awards";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin";
import CoursePlayer from "./pages/CoursePlayer";
import ResetPassword from "./pages/ResetPassword";
import BootcampEnroll from "./pages/BootcampEnroll";

const FULLSCREEN_PATHS = ["/dashboard", "/admin", "/adminlogin", "/login", "/reset-password", "/bootcamp/enroll"];

function AppShell() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const location = useLocation();

  const isFullScreen =
    FULLSCREEN_PATHS.includes(location.pathname) ||
    /^\/courses\/.+\/watch$/.test(location.pathname);

  return (
    <div className={`w-full min-h-screen bg-[#0B0F10] overflow-x-hidden`}>
      {!isFullScreen && (
        <Navbar
          onLoginClick={() => { setShowSignup(false); setShowLogin(true); }}
          onSignupClick={() => { setShowLogin(false); setShowSignup(true); }}
        />
      )}

      <main className={!isFullScreen ? "w-full pt-[72px] flex flex-col" : "w-full"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/bootcamp" element={<Bootcamppage />} />
          <Route path="/bootcamp/enroll" element={<BootcampEnroll />} />
          <Route path="/hire-talent" element={<HireTalent />} />
          <Route path="/jobs" element={<JobsSection />} />
          <Route path="/prompt-library" element={<PromptLibrary />} />
          <Route path="/workflow" element={<Workflow />} />
          <Route path="/workflow/:id" element={<WorkflowDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/learning" element={<LearningTips />} />
          <Route path="/deals" element={<AiDeals />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/workshops" element={<WorkshopsPage />} />
          <Route path="/forums" element={<Forums />} />
          <Route path="/events" element={<Events />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/courses/:id/watch" element={<CoursePlayer />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </main>

      {!isFullScreen && <Footer />}

      {showLogin && !showSignup && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={() => { setShowLogin(false); setShowSignup(true); }}
        />
      )}
      {showSignup && !showLogin && (
        <SignUpModal
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={() => { setShowSignup(false); setShowLogin(true); }}
        />
      )}
    </div>
  );
}

export default function App() {
  return <AppShell />;
}
