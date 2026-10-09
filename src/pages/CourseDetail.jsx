import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const DEFAULT_FAQS = [
  { q: "Who is this course for?", a: "This course is designed for beginners and intermediate learners who want to master the subject at their own pace. No prior experience is required." },
  { q: "How long do I have access to the course?", a: "Once purchased, you have lifetime access to the course content including any future updates we add." },
  { q: "Will I get a certificate?", a: "Yes! Upon completing the course, you will receive a digital certificate of completion that you can share on LinkedIn or add to your resume." },
  { q: "Can I watch on mobile?", a: "Absolutely. The course is fully responsive and accessible on any device — desktop, tablet, or mobile." },
  { q: "What if I am not satisfied?", a: "We offer a 7-day refund policy. If you are not satisfied within the first 7 days of purchase, contact us for a full refund." },
];

const YOU_GET = [
  "Lifetime Course Access",
  "HD Video Lessons",
  "Digital Certificate",
  "Step-by-step lessons",
  "Downloadable resources",
];

export default function CourseDetail() {
  const { slug: id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [showEnrollments, setShowEnrollments] = useState(false);

  const token = localStorage.getItem("aifa_token");
  const userRaw = localStorage.getItem("aifa_user");
  const user = userRaw ? JSON.parse(userRaw) : null;
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    fetch(`/api/courses/${id}`, { headers })
      .then(r => r.json())
      .then(data => {
        if (data.message) { navigate("/courses"); return; }
        setCourse(data);
        setIsEnrolled(!!data.isEnrolled);
        setLoading(false);
      })
      .catch(() => navigate("/courses"));
  }, [id, token]);

  useEffect(() => {
    if (!showEnrollments || !isAdmin || !token) return;
    setEnrollLoading(true);
    fetch(`/api/courses/${id}/enrollments`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => { setEnrollments(Array.isArray(data) ? data : []); setEnrollLoading(false); })
      .catch(() => setEnrollLoading(false));
  }, [showEnrollments, id, isAdmin, token]);

  if (loading) return (
    <div className="min-h-screen bg-[#0B0F10] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-[#C7E36B] border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Loading course...</p>
      </div>
    </div>
  );
  if (!course) return null;

  const lessons = Array.isArray(course.lessons) ? course.lessons : [];
  const faqs = Array.isArray(course.faqs) && course.faqs.length > 0 ? course.faqs : DEFAULT_FAQS;
  const youGet = Array.isArray(course.benefits) && course.benefits.length > 0 ? course.benefits : YOU_GET;
  const discountPct = course.originalPrice && course.originalPrice > course.price
    ? Math.round((1 - course.price / course.originalPrice) * 100)
    : null;

  const handlePurchase = () => {
    if (isEnrolled) navigate(`/courses/${id}/watch`);
    else if (token) navigate(`/courses/${id}/pay`);
    else navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0B0F10] text-white font-[Montserrat]">

      {/* ── BREADCRUMB ── */}
      <div className="max-w-[1200px] mx-auto px-6 pt-6 pb-4">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span className="text-gray-600">›</span>
          <Link to="/courses" className="hover:text-white transition-colors">Video Courses</Link>
          <span className="text-gray-600">›</span>
          <span className="text-[#C7E36B] truncate max-w-[300px]">{course.title}</span>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-10">
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* Thumbnail */}
          <div className="relative w-full lg:w-[480px] shrink-0 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-[300px] lg:h-[340px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="bg-[#C7E36B] text-black text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                INCLUDED IN ALL-ACCESS
              </span>
            </div>
            {course.duration && (
              <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                {course.duration}
              </div>
            )}
          </div>

          {/* Course Info */}
          <div className="flex-1 flex flex-col gap-5">
            <div>
              <p className="text-[#C7E36B] text-xs font-bold uppercase tracking-widest mb-2">
                {course.category || "Video Course"}
              </p>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">
                {course.title}
              </h1>
              <p className="text-gray-300 text-[15px] leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-white">₹{course.price}</span>
              {course.originalPrice && course.originalPrice > course.price && (
                <>
                  <span className="text-lg text-gray-500 line-through">₹{course.originalPrice}</span>
                  <span className="bg-[#C7E36B]/20 text-[#C7E36B] text-xs font-bold px-2.5 py-1 rounded-full">
                    {discountPct}% OFF
                  </span>
                </>
              )}
            </div>

            {/* CTA Button */}
            <button
              onClick={handlePurchase}
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C7E36B] text-black font-bold text-base rounded-xl hover:bg-lime-300 transition-all duration-200 shadow-lg shadow-[#C7E36B]/20"
            >
              {isEnrolled ? "WATCH NOW →" : "PURCHASE NOW →"}
            </button>

          </div>
        </div>
      </section>

      {/* ── FEATURE METRICS ── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              ),
              label: "Learn On Your Own Schedule",
              desc: "Build your skills at your own pace. All lessons and project files are available 24/7.",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              ),
              label: course.duration ? `${course.duration} of content` : "Structured Lessons",
              desc: `${course.duration || "Hours"} of structured, practical lessons focused on real-world skills.`,
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ),
              label: `${course.level || "Beginner"}-Friendly`,
              desc: `Designed for ${(course.level || "Beginner").toLowerCase()} learners — no prior experience required.`,
            },
          ].map((m, i) => (
            <div key={i} className="flex items-start gap-4 border border-white/10 rounded-xl px-5 py-5 bg-[#0D1113]">
              <span className="text-[#C7E36B] shrink-0 mt-0.5">{m.icon}</span>
              <div>
                <p className="text-sm font-bold text-white mb-1">{m.label}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="bg-[#0D1113] border-y border-white/5 py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Description */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide">Course Overview</h2>
              <div className="text-gray-300 text-[15px] leading-relaxed space-y-4">
                <p>{course.description}</p>
                {course.longDescription && <p className="text-gray-400">{course.longDescription}</p>}
                {!course.longDescription && (
                  <p className="text-gray-400">
                    This course is built to be hands-on and practical. Every lesson is crafted to build your skills step-by-step, with real-world examples and projects that you can add to your portfolio.
                  </p>
                )}
              </div>

              {/* What You'll Learn */}
              {Array.isArray(course.whatYouLearn) && course.whatYouLearn.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4">What You'll Learn</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.whatYouLearn.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <span className="text-[#C7E36B] mt-0.5 shrink-0">✓</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* You Get Checklist */}
            <div className="w-full lg:w-[320px] shrink-0">
              <div className="border border-white/10 rounded-2xl p-6 bg-[#111417]">
                <h3 className="text-lg font-bold mb-5">You Get:</h3>
                <ul className="flex flex-col gap-3">
                  {youGet.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-200">
                      <span className="w-5 h-5 rounded-full bg-[#C7E36B]/15 flex items-center justify-center shrink-0">
                        <span className="text-[#C7E36B] text-xs font-bold">✓</span>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-2 text-sm">
                  {course.language && (
                    <div className="flex justify-between text-gray-400">
                      <span>Language</span>
                      <span className="text-white font-medium">{course.language}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-400">
                    <span>Level</span>
                    <span className="text-white font-medium">{course.level || "Beginner"}</span>
                  </div>
                  {lessons.length > 0 && (
                    <div className="flex justify-between text-gray-400">
                      <span>Lessons</span>
                      <span className="text-white font-medium">{lessons.length}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SYLLABUS ── */}
      {lessons.length > 0 && (
        <section
          className="w-full py-14 px-6 lg:px-16"
          style={{
            background: "repeating-linear-gradient(90deg, #080a0b 0px, #080a0b 28px, #0e1214 28px, #0e1214 29px)",
          }}
        >
          <div className="max-w-[1200px] mx-auto">
            {/* Heading */}
            <div className="flex items-end justify-between mb-10">
              <h2 className="text-[56px] lg:text-[72px] font-black uppercase leading-[0.9] tracking-tight text-white">
                COURSE SYLLABUS
              </h2>
              <span className="text-xs text-gray-600 font-semibold uppercase tracking-wider mb-2">
                {lessons.length} lesson{lessons.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {lessons.map((lesson, i) => (
                <div
                  key={i}
                  className="group cursor-pointer"
                  onClick={() => isEnrolled && navigate(`/courses/${id}/watch`)}
                >
                  {/* Thumbnail */}
                  <div className="relative w-full overflow-hidden mb-3" style={{ aspectRatio: "16/9" }}>
                    {lesson.thumbnail ? (
                      <>
                        <img
                          src={lesson.thumbnail}
                          alt={lesson.title}
                          className="w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl ${isEnrolled ? "bg-[#C7E36B]" : "bg-black/70 border border-white/40"}`}>
                            <span className={`text-lg ${isEnrolled ? "text-black" : "text-white"}`}>{isEnrolled ? "▶" : "🔒"}</span>
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-[#151A1B] flex items-center justify-center">
                        <span className={`w-12 h-12 rounded-full flex items-center justify-center ${isEnrolled ? "bg-[#C7E36B]/15 border border-[#C7E36B]/30" : "bg-white/5 border border-white/10"}`}>
                          <span className={`text-lg ${isEnrolled ? "text-[#C7E36B]" : "text-gray-600"}`}>{isEnrolled ? "▶" : "🔒"}</span>
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <p className="text-[14px] font-bold text-white group-hover:text-[#C7E36B] transition-colors leading-snug line-clamp-2 mb-1">
                    {lesson.title || `Lesson ${i + 1}`}
                  </p>
                  {(lesson.description || lesson.desc) && (
                    <p className="text-[12px] text-gray-500 line-clamp-3 leading-relaxed">
                      {lesson.description || lesson.desc}
                    </p>
                  )}
                  {lesson.duration && (
                    <p className="text-[11px] text-gray-700 mt-1.5 font-medium">⏱ {lesson.duration}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PRICING ── */}
      <section className="bg-[#0D1113] border-y border-white/5 py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-center mb-2">
            Choose How You Want To Learn
          </h2>
          <p className="text-sm text-gray-400 text-center mb-10">Buy this course or unlock lifetime access to all courses with Pro</p>

          <div className="flex flex-col lg:flex-row gap-6 max-w-[860px] mx-auto">

            {/* Buy This Course */}
            <div className="flex-1 border border-white/15 rounded-2xl p-7 bg-[#111417] flex flex-col gap-5">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Individual Course</p>
                <h3 className="text-xl font-bold text-white mb-1">Buy this Course</h3>
                <div className="flex items-end gap-2 mt-3">
                  <span className="text-4xl font-bold text-white">₹{course.price}</span>
                  {course.originalPrice && course.originalPrice > course.price && (
                    <span className="text-lg text-gray-500 line-through mb-1">₹{course.originalPrice}</span>
                  )}
                </div>
              </div>
              <ul className="flex flex-col gap-2.5 flex-1">
                {[`${course.duration || "Hours"} of HD video`, "Step-by-step lessons", "Lifetime access to this course", "English captions", "Certificate of completion"].map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-300">
                    <span className="text-[#C7E36B] shrink-0">✓</span> {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={handlePurchase}
                className="w-full py-3.5 bg-[#C7E36B] text-black font-bold rounded-xl text-sm hover:bg-lime-300 transition-all duration-200"
              >
                {isEnrolled ? "WATCH NOW →" : "BUY THIS COURSE →"}
              </button>
            </div>

            {/* Pro Membership */}
            <div className="flex-1 border border-[#C7E36B]/40 rounded-2xl p-7 bg-[#111A0D] flex flex-col gap-5 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#C7E36B] text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                BEST VALUE
              </div>
              <div>
                <p className="text-xs font-bold text-[#C7E36B] uppercase tracking-widest mb-2">All Courses Unlocked</p>
                <h3 className="text-xl font-bold text-white mb-1">Unlock Pro Membership</h3>
                <div className="flex items-end gap-2 mt-3">
                  <span className="text-4xl font-bold text-white">₹6,999</span>
                  <span className="text-lg text-gray-500 line-through mb-1">₹15,000</span>
                </div>
              </div>
              <ul className="flex flex-col gap-2.5 flex-1">
                {["Access to all current courses", "All future courses included", "Lifetime access (one-time payment)", "Access to resources", "Community access", "Career & Job Opportunities", "Priority support & updates"].map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-300">
                    <span className="text-[#C7E36B] shrink-0">✓</span> {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/membership/pay")}
                className="w-full py-3.5 border-2 border-[#C7E36B] text-[#C7E36B] font-bold rounded-xl text-sm hover:bg-[#C7E36B] hover:text-black transition-all duration-200"
              >
                GET PRO MEMBERSHIP →
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 max-w-[800px] mx-auto px-6">
        <p className="text-[#C7E36B] text-xs font-bold uppercase tracking-widest text-center mb-2">Need More Details?</p>
        <h2 className="text-2xl font-bold uppercase tracking-wide text-center mb-10">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-3">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="border border-white/10 rounded-xl overflow-hidden bg-[#0D1113] transition-all duration-200"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
              >
                <span className="text-sm font-semibold text-white">{item.q}</span>
                <span className={`shrink-0 text-[#C7E36B] font-bold text-lg transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-gray-400 leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── ADMIN: ENROLLED STUDENTS ── */}
      {isAdmin && (
        <section className="border-t border-white/5 py-10 max-w-[1200px] mx-auto px-6">
          <button
            onClick={() => setShowEnrollments(p => !p)}
            className="flex items-center gap-3 text-sm font-semibold text-gray-400 hover:text-white transition-colors mb-6"
          >
            <span className="w-6 h-6 rounded border border-gray-600 flex items-center justify-center text-xs">
              {showEnrollments ? "▲" : "▼"}
            </span>
            Admin: View Enrolled Students
          </button>
          {showEnrollments && (
            enrollLoading ? (
              <p className="text-gray-400 text-sm">Loading...</p>
            ) : enrollments.length > 0 ? (
              <div className="border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-[#111417] border-b border-white/10">
                    <tr>
                      <th className="text-left px-5 py-3 text-gray-400 font-semibold">#</th>
                      <th className="text-left px-5 py-3 text-gray-400 font-semibold">Name</th>
                      <th className="text-left px-5 py-3 text-gray-400 font-semibold">Email</th>
                      <th className="text-left px-5 py-3 text-gray-400 font-semibold">Phone</th>
                      <th className="text-left px-5 py-3 text-gray-400 font-semibold">Enrolled At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrollments.map((s, i) => (
                      <tr key={s._id} className="border-b border-white/5 hover:bg-white/3 transition-all">
                        <td className="px-5 py-3 text-gray-500">{i + 1}</td>
                        <td className="px-5 py-3 text-white font-medium">{s.name}</td>
                        <td className="px-5 py-3 text-gray-300">{s.email}</td>
                        <td className="px-5 py-3 text-gray-400">{s.phone || s.mobile || "—"}</td>
                        <td className="px-5 py-3 text-gray-500">
                          {s.enrolledAt ? new Date(s.enrolledAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-sm py-4">No students enrolled yet.</p>
            )
          )}
        </section>
      )}

    </div>
  );
}
