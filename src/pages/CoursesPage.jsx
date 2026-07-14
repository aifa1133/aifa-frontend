"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProPlanBanner from "./ProPlanBanner";

const parseDurationMinutes = (d) => {
  const m = d?.match(/(\d+)h\s*(\d+)m/);
  if (m) return parseInt(m[1]) * 60 + parseInt(m[2]);
  const h = d?.match(/(\d+)h/);
  if (h) return parseInt(h[1]) * 60;
  return 0;
};

const MOCK_COURSES = [
  { _id: "m1", title: "AI Reels & Shorts Masterclass", description: "Master AI-powered tools to write engaging and impactful scripts.", image: "/courses/v1.png", duration: "1h 10m", price: 399, originalPrice: 799 },
  { _id: "m2", title: "AI Social Media Design Course", description: "Transform still images into dynamic visuals using AI tools.", image: "/courses/v2.png", duration: "1h 10m", price: 299, originalPrice: 799 },
  { _id: "m3", title: "AI Thumbnail Creation Masterclass", description: "Create realistic AI avatars with advanced editing techniques.", image: "/courses/v3.png", duration: "1h 10m", price: 349, originalPrice: 799 },
  { _id: "m4", title: "AI Video Editing Masterclass", description: "Design stunning virtual fashion models using AI technology.", image: "/courses/v4.png", duration: "2h 00m", price: 499, originalPrice: 999 },
  { _id: "m5", title: "AI Content Creation Bootcamp", description: "Restore and enhance colors in photos with AI precision.", image: "/courses/v5.png", duration: "1h 30m", price: 399, originalPrice: 799 },
  { _id: "m6", title: "AI Cinematic Storytelling", description: "Enhance facial details and clarity using powerful AI tools.", image: "/courses/v6.png", duration: "2h 15m", price: 599, originalPrice: 999 },
  { _id: "m7", title: "AI Scriptwriting Masterclass", description: "Build intelligent workflows and automate tasks using AI tools.", image: "/courses/v7.png", duration: "1h 45m", price: 449, originalPrice: 899 },
  { _id: "m8", title: "AI Visual Effects Course", description: "Create stunning AI-generated videos with cinematic precision.", image: "/courses/v8.png", duration: "2h 30m", price: 649, originalPrice: 1299 },
  { _id: "m9", title: "AI Sound Design Masterclass", description: "Generate immersive backgrounds and scenes using AI tools.", image: "/courses/v9.png", duration: "1h 20m", price: 349, originalPrice: 699 },
];

const TABS = [
  { key: "all", label: "All Courses" },
  { key: "my", label: "My Courses" },
  { key: "completed", label: "Completed" },
];

export default function CoursesPage() {
  const [activeTab, setActiveTab]         = useState("all");
  const [search, setSearch]               = useState("");
  const [sortOpen, setSortOpen]           = useState(false);
  const [selected, setSelected]           = useState("Newest");
  const [courses, setCourses]             = useState(MOCK_COURSES);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();

  const token     = localStorage.getItem("aifa_token");
  const isLoggedIn = !!token;

  useEffect(() => {
    fetch("/api/courses")
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setCourses(data); })
      .catch(() => {});

    if (isLoggedIn) {
      fetch("/api/courses/enrolled", { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json())
        .then(data => { if (Array.isArray(data)) setEnrolledCourses(data); })
        .catch(() => {});
    }
  }, []);

  const enrolledIds    = new Set(enrolledCourses.map(c => String(c._id)));
  const completedCourses = enrolledCourses.filter(c => (c.percentComplete || 0) >= 100);
  const myCourses       = enrolledCourses.filter(c => (c.percentComplete || 0) < 100);

  const options = ["Newest", "Price: Low to High", "Price: High to Low", "Duration"];

  const filteredAll = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()),
  );
  const sortedAll = [...filteredAll].sort((a, b) => {
    if (selected === "Duration")            return parseDurationMinutes(a.duration) - parseDurationMinutes(b.duration);
    if (selected === "Price: Low to High")  return a.price - b.price;
    if (selected === "Price: High to Low")  return b.price - a.price;
    return 0;
  });

  const handleBuy = (course) => {
    navigate(`/courses/${course._id}/pay`);
  };

  const displayCourses =
    activeTab === "all"       ? sortedAll
    : activeTab === "my"      ? myCourses
    : completedCourses;

  const emptyMessages = {
    my:        { title: "No courses yet", sub: "Purchase a course to start learning." },
    completed: { title: "Nothing completed yet", sub: "Keep going — you're almost there!" },
  };

  return (
    <>
      <section className="w-full bg-[#0F1112] flex justify-center">
        <div className="w-full max-w-[1366px] flex flex-col items-center px-[93px] py-[64px] bg-[#0F1112] max-sm:px-[16px] max-sm:py-[40px]">
          <div className="w-full max-w-[1180px]">

            {/* TABS */}
            <div className="flex items-center gap-0 border-b border-white/10 mb-10">
              {TABS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-6 pb-3 text-[14px] font-semibold transition-colors relative ${
                    activeTab === tab.key
                      ? "text-[#C7E36B]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C7E36B] rounded-t-full" />
                  )}
                </button>
              ))}
            </div>

            {/* SEARCH + SORT — only for All Courses */}
            {activeTab === "all" && (
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 max-sm:items-stretch max-sm:mb-8">
                <div className="w-full md:w-[60%] relative">
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search Videos"
                    className="w-full bg-transparent border border-[#414243] rounded-[12px] px-12 py-3 text-white placeholder-gray-500 outline-none focus:border-white"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2">
                    <img src="/Searchicon.svg" alt="search" className="w-[18px] h-[18px]" />
                  </span>
                </div>

                <div className="relative w-full md:w-[260px]">
                  <button
                    onClick={() => setSortOpen(!sortOpen)}
                    className="w-full flex justify-between items-center border border-[#414243] px-4 py-3 rounded-[12px] text-white transition-all duration-300 hover:bg-white/5"
                  >
                    <span>Sort By: {selected}</span>
                    <span className={`transition-all duration-300 ${sortOpen ? "rotate-180" : ""}`}>
                      <img src="/Vectorup.svg" alt="arrow" className="w-[14px]" />
                    </span>
                  </button>

                  {sortOpen && (
                    <div className="absolute top-full mt-2 w-full bg-[#1A1F22] border border-[#414243] rounded-[12px] overflow-hidden z-50">
                      <div className="px-4 py-3 text-gray-400 text-sm border-b border-[#414243]">Sort by</div>
                      {options.map(item => (
                        <div
                          key={item}
                          onClick={() => { setSelected(item); setSortOpen(false); }}
                          className={`px-4 py-3 cursor-pointer text-sm transition-all duration-300 ${
                            selected === item ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/5"
                          }`}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* EMPTY STATE */}
            {activeTab !== "all" && displayCourses.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 gap-3">
                <span className="text-5xl">🎬</span>
                <p className="text-white font-semibold text-lg">{emptyMessages[activeTab]?.title}</p>
                <p className="text-gray-400 text-sm">{emptyMessages[activeTab]?.sub}</p>
                {activeTab === "my" && (
                  <button onClick={() => setActiveTab("all")} className="mt-4 px-6 py-2 bg-[#C7E36B] text-black font-bold rounded-lg text-sm hover:bg-lime-300 transition-colors">
                    Browse Courses
                  </button>
                )}
              </div>
            )}

            {/* GRID */}
            {displayCourses.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] w-full max-sm:gap-[16px]">
                {displayCourses.map((course, i) => (
                  <CourseCard
                    key={i}
                    course={course}
                    tab={activeTab}
                    isEnrolled={enrolledIds.has(String(course._id))}
                    onBuy={() => handleBuy(course)}
                    onContinue={() => navigate(`/courses/${course._id}/watch`)}
                  />
                ))}
              </div>
            )}

          </div>
        </div>
      </section>
      <ProPlanBanner />
    </>
  );
}

function CourseCard({ course, tab, isEnrolled, onBuy, onContinue }) {
  const pct = course.percentComplete || 0;

  return (
    <div className="flex flex-col items-start justify-between w-full max-w-[386px] min-h-[477px] rounded-[8px] border border-[#414243] bg-[#0F1112] overflow-hidden transition-all duration-300 hover:border-[#5A5B5C] hover:translate-y-[-4px] max-sm:max-w-full">

      {/* IMAGE */}
      <div className="relative w-full">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-[240px] object-cover"
        />
        {course.duration && (
          <span className="absolute top-[14px] left-[14px] bg-black/80 text-white text-[12px] font-medium px-[10px] py-[6px] rounded-[6px]">
            {course.duration}
          </span>
        )}
        {/* Progress bar for enrolled courses */}
        {(tab === "my" || tab === "completed" || isEnrolled) && pct > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10">
            <div className="h-full bg-[#C7E36B] transition-all" style={{ width: `${pct}%` }} />
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col items-start gap-[16px] w-full p-[24px] flex-1 max-sm:p-[18px]">
        <h3 className="text-[#F0F0F0] font-[Montserrat] text-[18px] font-semibold leading-[28px] max-sm:text-[16px] max-sm:leading-[24px]">
          {course.title}
        </h3>
        <p className="self-stretch max-h-[48px] text-[#767779] font-[Montserrat] text-[16px] font-normal leading-[24px] overflow-hidden">
          {course.description || course.desc}
        </p>

        {/* Price row (All Courses unenrolled only) */}
        {tab === "all" && !isEnrolled && (
          <div className="flex items-center gap-[8px] self-stretch mt-auto">
            {course.originalPrice && course.originalPrice > course.price && (
              <span className="text-[#C7E36B] font-[Montserrat] text-[14px] font-semibold leading-[22px]">
                {Math.round((1 - course.price / course.originalPrice) * 100)}% off
              </span>
            )}
            {course.originalPrice && course.originalPrice > course.price && (
              <span className="line-through text-[#6F6F6F] font-[Montserrat] text-[14px] font-normal leading-[22px]">
                ₹{course.originalPrice}
              </span>
            )}
          </div>
        )}

        {/* Progress label for enrolled */}
        {(tab === "my") && (
          <div className="flex items-center gap-2 self-stretch mt-auto">
            <span className="text-[#C7E36B] text-xs font-semibold">{pct}% complete</span>
          </div>
        )}

        {/* BUTTONS */}
        <div className="flex flex-col gap-2 self-stretch mt-auto">
          {/* All Courses — enrolled: Continue Learning */}
          {tab === "all" && isEnrolled && (
            <button onClick={onContinue} className="flex justify-center items-center gap-2 self-stretch px-4 py-2 rounded-[4px] bg-[#C7E36B] text-black text-[14px] font-semibold leading-[24px] transition-all duration-300 hover:bg-lime-300">
              Continue Learning
            </button>
          )}

          {/* All Courses — not enrolled: BUY */}
          {tab === "all" && !isEnrolled && (
            <button onClick={onBuy} className="flex justify-center items-center gap-2 self-stretch px-4 py-2 rounded-[4px] bg-[#F0F0F0] text-black text-[14px] font-semibold leading-[24px] transition-all duration-300 hover:bg-white">
              BUY ₹{course.price}
            </button>
          )}

          {/* My Courses: Continue Learning */}
          {tab === "my" && (
            <button onClick={onContinue} className="flex justify-center items-center gap-2 self-stretch px-4 py-2 rounded-[4px] bg-[#C7E36B] text-black text-[14px] font-semibold leading-[24px] transition-all duration-300 hover:bg-lime-300">
              Continue Learning
            </button>
          )}

          {/* Completed: View Certificate + View Again */}
          {tab === "completed" && (
            <>
              <button
                onClick={() => {/* TODO: open certificate */ }}
                className="flex justify-center items-center gap-2 self-stretch px-4 py-2 rounded-[4px] bg-[#C7E36B] text-black text-[14px] font-semibold leading-[24px] transition-all duration-300 hover:bg-lime-300"
              >
                View Certificate
              </button>
              <button
                onClick={onContinue}
                className="flex justify-center items-center gap-2 self-stretch px-4 py-2 rounded-[4px] border border-[#414243] text-white text-[14px] font-semibold leading-[24px] transition-all duration-300 hover:bg-white/5"
              >
                View Again
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
