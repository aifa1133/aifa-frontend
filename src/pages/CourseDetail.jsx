import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const FAQ_ITEMS = [
  { q: "How is this microcourse different from YouTube tutorials?", a: "Focused, structured, and practical. Each lesson is concise and designed to deliver clear results without unnecessary fluff. You'll follow a step-by-step system that builds real skills, not just random tips." },
  { q: "What's the difference between buying a single microcourse and getting All-Access?", a: "A single course gives you lifetime access to one specific topic. All-Access gives you every current and future AIFA course for one payment — the best value if you want to master multiple AI skills." },
  { q: "How long will I have access to the course?", a: "Lifetime access. Once you purchase, the course and any future updates are yours forever." },
];

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const token = localStorage.getItem("aifa_token");

  useEffect(() => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    fetch(`/api/courses/${id}`, { headers })
      .then(r => r.json())
      .then(data => {
        if (data.message) { navigate("/courses"); return; }
        setCourse(data);
        setIsEnrolled(data.isEnrolled === true);
        setLoading(false);
      })
      .catch(() => { navigate("/courses"); });
  }, [id, token]);

  if (loading) return (
    <div className="min-h-screen bg-[#0B0F10] flex items-center justify-center">
      <p className="text-white">Loading...</p>
    </div>
  );

  if (!course) return null;

  const discount = course.originalPrice && course.originalPrice > course.price
    ? Math.round((1 - course.price / course.originalPrice) * 100)
    : null;

  return (
    <div className="min-h-screen bg-[#0B0F10] text-white">
      {/* BREADCRUMB */}
      <div className="max-w-[1200px] mx-auto px-6 pt-6 pb-2">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>›</span>
          <Link to="/courses" className="hover:text-white">Video Courses</Link>
          <span>›</span>
          <Link to="/courses" className="hover:text-white">All Courses</Link>
          <span>›</span>
          <span className="text-[#C7E36B]">{course.title}</span>
        </div>
      </div>

      {/* HERO */}
      <div className="relative w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${course.image})`, filter: "brightness(0.25)" }}
        />
        <div className="relative max-w-[1200px] mx-auto px-6 py-12 flex flex-col md:flex-row gap-10 items-center">
          <div className="w-full md:w-[340px] shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <img src={course.image} alt={course.title} className="w-full h-[220px] object-cover" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-[#C7E36B] uppercase tracking-widest mb-3">Included in All-Access</p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{course.title}</h1>
            <p className="text-gray-300 text-base mb-6 leading-relaxed">{course.description}</p>
            {isEnrolled ? (
              <button
                onClick={() => navigate(`/courses/${id}/watch`)}
                className="px-8 py-3 bg-[#C7E36B] text-black font-bold rounded-lg text-base hover:bg-lime-300 transition-all"
              >
                Watch Now
              </button>
            ) : (
              <button
                onClick={() => token ? navigate(`/courses/${id}/pay`) : navigate("/login")}
                className="px-8 py-3 bg-[#C7E36B] text-black font-bold rounded-lg text-base hover:bg-lime-300 transition-all"
              >
                Purchase Now
              </button>
            )}
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="border-y border-white/10 bg-[#111417]">
        <div className="max-w-[1200px] mx-auto px-6 py-5 flex flex-col sm:flex-row gap-6 sm:gap-12">
          {[
            { icon: "📅", label: "Learn On Your Own Schedule", sub: "All lessons and project files are available 24/7" },
            { icon: "⏱", label: course.duration || "1+ hours", sub: "Of structured, practical lessons" },
            { icon: "📊", label: course.level || "Beginner", sub: "Designed for beginners with no prior experience" },
          ].map(({ icon, label, sub }) => (
            <div key={label} className="flex items-start gap-3">
              <span className="text-2xl mt-0.5">{icon}</span>
              <div>
                <p className="text-white font-semibold text-sm">{label}</p>
                <p className="text-gray-400 text-xs mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-12 flex flex-col gap-16">

        {/* OVERVIEW */}
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4 uppercase tracking-wide">Course Overview</h2>
            <p className="text-gray-300 leading-relaxed text-sm">
              {course.description || "Master the skills in this comprehensive course designed to take you from beginner to professional. Each lesson is carefully crafted to deliver real, practical results you can apply immediately."}
            </p>
          </div>
          <div className="w-full md:w-[300px] shrink-0 border border-white/10 rounded-2xl p-6 bg-[#111417]">
            <h3 className="text-base font-bold mb-4">You Get:</h3>
            <ul className="flex flex-col gap-3">
              {["1+ hours of video training", "PDF Cheat Sheets", "Downloadable Notes & Assets", "24/7 Community Access", "Verified Credential Upon Completion"].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-[#C7E36B] font-bold">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SYLLABUS */}
        {Array.isArray(course.lessons) && course.lessons.length > 0 && (
          <div>
            <h2 className="text-3xl font-black uppercase mb-8">Course<br />Syllabus</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {course.lessons.map((lesson, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-white/10 bg-[#111417]">
                  <div className="w-full h-[120px] bg-[#1A1D1E] flex items-center justify-center">
                    {lesson.videoUrl ? (
                      <span className="text-4xl">▶</span>
                    ) : (
                      <span className="text-4xl">🎬</span>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold text-white">{lesson.title || `Lesson ${i + 1}`}</p>
                    {lesson.duration && <p className="text-xs text-gray-500 mt-1">{lesson.duration}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRICING — only for non-enrolled */}
        {!isEnrolled && (
          <div className="text-center">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-2">Choose how you want to learn</p>
            <h2 className="text-2xl font-bold mb-8">Buy this course or unlock lifetime access to all courses with Pro</h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              {/* Buy this Course */}
              <div className="flex-1 max-w-[340px] border border-white/10 rounded-2xl p-6 bg-[#111417] text-left">
                <p className="text-sm text-gray-400 mb-1">Buy this course</p>
                <p className="text-xs text-gray-500 mb-3">Own this course forever</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-black text-white">₹{course.price}</span>
                  {discount && <span className="line-through text-gray-500 text-sm">₹{course.originalPrice}</span>}
                </div>
                <button
                  onClick={() => token ? navigate(`/courses/${id}/pay`) : navigate("/login")}
                  className="w-full mt-4 py-3 bg-[#C7E36B] text-black font-bold rounded-lg text-sm hover:bg-lime-300 transition-all"
                >
                  Buy This Course
                </button>
                <ul className="mt-5 flex flex-col gap-2">
                  {["1+ hours of HD video", "Step-by-step lessons", "Lifetime access to this course", "Downloadable assets & files", "English captions", "Certificate of completion"].map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="text-[#C7E36B]">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Pro Membership */}
              <div className="flex-1 max-w-[340px] border border-[#C7E36B]/40 rounded-2xl p-6 bg-[#111417] text-left relative">
                <span className="absolute top-4 right-4 bg-[#C7E36B] text-black text-[10px] font-bold px-2 py-1 rounded-full">BEST VALUE</span>
                <p className="text-sm text-gray-400 mb-1">Unlock Pro Membership</p>
                <p className="text-xs text-gray-500 mb-3">Get unlimited access to all courses — forever</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-black text-white">₹9,999</span>
                  <span className="line-through text-gray-500 text-sm">₹15,000</span>
                </div>
                <button className="w-full mt-4 py-3 bg-[#C7E36B] text-black font-bold rounded-lg text-sm hover:bg-lime-300 transition-all">
                  Get Pro Membership
                </button>
                <ul className="mt-5 flex flex-col gap-2">
                  {["Access to all current courses", "All future courses included", "Lifetime access (one-time payment)", "300+ hours of premium content", "Downloadable resources & assets", "Early access to new courses", "Priority support & updates"].map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="text-[#C7E36B]">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* FAQ */}
        <div>
          <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-2">Need more details?</p>
          <h2 className="text-center text-2xl font-black uppercase mb-8">Frequently-Asked Questions</h2>
          <div className="flex flex-col gap-3 max-w-[800px] mx-auto">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-white/5 transition-all"
                >
                  <span className="text-sm font-medium text-white">{item.q}</span>
                  <span className="text-gray-400 text-lg ml-4">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sm text-gray-400 leading-relaxed">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
