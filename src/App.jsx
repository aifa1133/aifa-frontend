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

import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

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
import WorkshopDetail from "./pages/WorkshopDetail";
import WorkshopEnroll from "./pages/WorkshopEnroll";
import WorkshopConfirmation from "./pages/WorkshopConfirmation";
import AIFilmmakingPage from "./pages/Workshopspages/AIFilmmakingPage";
import AIAnimationPage from "./pages/Workshopspages/AIAnimationPage";
import AIAdvertisingPage from "./pages/Workshopspages/AIAdvertisingPage";
import AIContentCreationPage from "./pages/Workshopspages/AIContentCreationPage";
import Bootcamppage from "./pages/Bootcamppage";
import Forums from "./pages/Forums";
import Events from "./pages/Events";
import Clubs from "./pages/Clubs";
import Challenges from "./pages/Challenges";
import Awards from "./pages/Awards";
import PrivacyPolicy from "./pages/Privacypolicy";
import TermsAndConditions from "./pages/Termsandconditions";
import EndUserLicenseAgreement from "./pages/Enduserlicenseagreement";
import Copyright from "./pages/Copyright";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin";
import CoursePlayer from "./pages/CoursePlayer";
import CourseDetail from "./pages/CourseDetail";
import ResetPassword from "./pages/ResetPassword";
import BootcampEnroll from "./pages/BootcampEnroll";
import CourseEnroll from "./pages/CourseEnroll";
import CourseSetup from "./pages/CourseSetup";

/* Admin — influencer module */
import AdminInfluencers from "./pages/admin/AdminInfluencers";
import AdminCommissions from "./pages/admin/AdminCommissions";

/* Influencer portal */
import InfluencerLogin from "./pages/influencer/InfluencerLogin";
import InfluencerLayout from "./layouts/InfluencerLayout";
import InfluencerAuthGuard from "./Components/influencer/InfluencerAuthGuard";
import InfluencerDashboard from "./pages/influencer/InfluencerDashboard";
import InfluencerReferrals from "./pages/influencer/InfluencerReferrals";
import InfluencerPayouts from "./pages/influencer/InfluencerPayouts";

const FULLSCREEN_PATHS = ["/dashboard", "/admin", "/adminlogin", "/login", "/reset-password", "/bootcamp/enroll", "/influencer"];
const DASHBOARD_SECTIONS = ["dashboard","bootcamp","workshops","video-courses","certificates","jobs","resources","community","hire-talent","profile","settings","billing"];
const FULLSCREEN_PATTERNS = [
  /^\/courses\/.+\/watch$/,
  /^\/courses\/.+\/pay$/,
  /^\/courses\/.+\/setup$/,
  /^\/influencer(\/.*)?$/,
  /^\/admin(\/.*)?$/,
  /^\/dashboard(\/.*)?$/,
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppShell() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const location = useLocation();

  const isFullScreen =
    FULLSCREEN_PATHS.includes(location.pathname) ||
    FULLSCREEN_PATTERNS.some(p => p.test(location.pathname));

  // Auto-open signup when ?ref= is in the URL (influencer referral link)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("ref");
    if (ref) {
      sessionStorage.setItem("aifa_referral", ref);
      const isLoggedIn = !!localStorage.getItem("aifa_token");
      if (!isLoggedIn && !isFullScreen) {
        setShowLogin(false);
        setShowSignup(true);
      }
    }
  }, [location.search, isFullScreen]);

  return (
    <div className={`w-full min-h-screen bg-[#0B0F10] overflow-x-hidden`}>
      <ScrollToTop />
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
          <Route path="/workshops/confirmation" element={<WorkshopConfirmation />} />
          <Route path="/workshops/ai-filmmaking" element={<AIFilmmakingPage />} />
          <Route path="/workshops/ai-animation" element={<AIAnimationPage />} />
          <Route path="/workshops/ai-advertising" element={<AIAdvertisingPage />} />
          <Route path="/workshops/ai-content-creation" element={<AIContentCreationPage />} />
          <Route path="/workshops/:id" element={<WorkshopDetail />} />
          <Route path="/workshops/:id/pay" element={<WorkshopEnroll />} />
          <Route path="/forums" element={<Forums />} />
          <Route path="/events" element={<Events />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/dashboard" element={<Navigate to="/dashboard/dashboard" replace />} />
          <Route path="/dashboard/:section" element={<StudentDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/courses/:id/watch" element={<CoursePlayer />} />
          <Route path="/courses/:id/pay"   element={<CourseEnroll />} />
          <Route path="/courses/:id/setup" element={<CourseSetup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsAndConditions />} />
          <Route path="/end-user-license-agreement" element={<EndUserLicenseAgreement />} />
          <Route path="/copyright-notice" element={<Copyright />} />

          {/* Admin — influencer module */}
          <Route path="/admin/influencers" element={<AdminInfluencers />} />
          <Route path="/admin/commissions" element={<AdminCommissions />} />

          {/* Influencer portal */}
          <Route path="/influencer/login" element={<InfluencerLogin />} />
          <Route path="/influencer" element={<Navigate to="/influencer/login" replace />} />
          <Route element={<InfluencerAuthGuard />}>
            <Route element={<InfluencerLayout />}>
              <Route path="/influencer/dashboard" element={<InfluencerDashboard />} />
              <Route path="/influencer/referrals" element={<InfluencerReferrals />} />
              <Route path="/influencer/payouts" element={<InfluencerPayouts />} />
            </Route>
          </Route>
        </Routes>
      </main>

      {!isFullScreen && <Footer />}

      {/* Floating WhatsApp button */}
      {!isFullScreen && (
        <a
          href="https://wa.me/919052088000?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20AIFA."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white text-sm font-bold px-4 py-3 rounded-full shadow-lg hover:bg-[#1ebe5d] transition-all active:scale-95"
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
          Chat with us
        </a>
      )}

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
          initialReferral={sessionStorage.getItem("aifa_referral") || ""}
        />
      )}
    </div>
  );
}

export default function App() {
  return <AppShell />;
}
