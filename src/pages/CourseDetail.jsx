import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollments, setEnrollments] = useState([]);
  const [enrollLoading, setEnrollLoading] = useState(false);

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
        setIsEnrolled(Array.isArray(data.lessons) && data.lessons.length > 0);
        setLoading(false);
      })
      .catch(() => navigate("/courses"));
  }, [id, token]);

  useEffect(() => {
    if (activeTab !== "enrollments" || !isAdmin || !token) return;
    setEnrollLoading(true);
    fetch(`/api/courses/${id}/enrollments`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => { setEnrollments(Array.isArray(data) ? data : []); setEnrollLoading(false); })
      .catch(() => setEnrollLoading(false));
  }, [activeTab, id, isAdmin, token]);

  if (loading) return (
    <div className="min-h-screen bg-[#0B0F10] flex items-center justify-center">
      <p className="text-white">Loading...</p>
    </div>
  );
  if (!course) return null;

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "curriculum", label: "Curriculum" },
    ...(isAdmin ? [{ key: "enrollments", label: "Enrollments" }] : []),
  ];

  return (
    <div className="min-h-screen bg-[#0B0F10] text-white">
      {/* BREADCRUMB */}
      <div className="max-w-[1200px] mx-auto px-6 pt-6 pb-2">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>›</span>
          <Link to="/courses" className="hover:text-white">Video Courses</Link>
          <span>›</span>
          <span className="text-[#C7E36B]">{course.title}</span>
        </div>
      </div>

      {/* HERO */}
      <div className="relative w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${course.image})`, filter: "brightness(0.2)" }}
        />
        <div className="relative max-w-[1200px] mx-auto px-6 py-10 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-[300px] shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <img src={course.image} alt={course.title} className="w-full h-[200px] object-cover" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-[#C7E36B] uppercase tracking-widest mb-2">{course.category || "Video Course"}</p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">{course.title}</h1>
            <p className="text-gray-300 text-sm mb-5 leading-relaxed line-clamp-3">{course.description}</p>
            <div className="flex flex-wrap gap-3">
              {isEnrolled ? (
                <button
                  onClick={() => navigate(`/courses/${id}/watch`)}
                  className="px-6 py-3 bg-[#C7E36B] text-black font-bold rounded-lg text-sm hover:bg-lime-300 transition-all"
                >
                  Watch Now →
                </button>
              ) : (
                <button
                  onClick={() => token ? navigate(`/courses/${id}/pay`) : navigate("/login")}
                  className="px-6 py-3 bg-[#C7E36B] text-black font-bold rounded-lg text-sm hover:bg-lime-300 transition-all"
                >
                  Purchase Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="border-b border-white/10 bg-[#0B0F10] sticky top-0 z-10">
        <div className="max-w-[1200px] mx-auto px-6 flex gap-1">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-5 py-4 text-sm font-semibold uppercase tracking-wide transition-all border-b-2 ${
                activeTab === t.key
                  ? "border-[#C7E36B] text-[#C7E36B]"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="max-w-[1200px] mx-auto px-6 py-10">

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-10">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-4 uppercase tracking-wide">Course Overview</h2>
                <p className="text-gray-300 leading-relaxed text-sm">
                  {course.description || "Master the skills in this comprehensive course designed to take you from beginner to professional."}
                </p>
                {course.longDescription && (
                  <p className="text-gray-400 leading-relaxed text-sm mt-4">{course.longDescription}</p>
                )}
              </div>
              <div className="w-full md:w-[280px] shrink-0 border border-white/10 rounded-2xl p-6 bg-[#111417]">
                <h3 className="text-base font-bold mb-4">Course Details</h3>
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-white font-medium">{course.duration || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Level</span>
                    <span className="text-white font-medium">{course.level || "Beginner"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Lessons</span>
                    <span className="text-white font-medium">{Array.isArray(course.lessons) ? course.lessons.length : 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price</span>
                    <span className="text-[#C7E36B] font-bold">₹{course.price}</span>
                  </div>
                  {course.language && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Language</span>
                      <span className="text-white font-medium">{course.language}</span>
                    </div>
                  )}
                </div>
                <hr className="border-white/10 my-4" />
                <h4 className="text-sm font-bold mb-3">You Get:</h4>
                <ul className="flex flex-col gap-2">
                  {["HD video lessons", "Downloadable assets", "Lifetime access", "Certificate on completion", "Community access"].map(item => (
                    <li key={item} className="flex items-center gap-2 text-xs text-gray-300">
                      <span className="text-[#C7E36B]">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* What you'll learn */}
            {Array.isArray(course.whatYouLearn) && course.whatYouLearn.length > 0 && (
              <div className="border border-white/10 rounded-2xl p-6 bg-[#111417]">
                <h2 className="text-lg font-bold mb-4">What You'll Learn</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.whatYouLearn.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-[#C7E36B] mt-0.5">✓</span> {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* CURRICULUM TAB */}
        {activeTab === "curriculum" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold uppercase tracking-wide">Course Curriculum</h2>
              <p className="text-sm text-gray-400">{Array.isArray(course.lessons) ? course.lessons.length : 0} lessons</p>
            </div>
            {Array.isArray(course.lessons) && course.lessons.length > 0 ? (
              <div className="flex flex-col gap-3">
                {course.lessons.map((lesson, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 border border-white/10 rounded-xl p-4 bg-[#111417] hover:bg-[#151A1B] transition-all cursor-pointer"
                    onClick={() => isEnrolled && navigate(`/courses/${id}/watch`)}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#1A1D1E] flex items-center justify-center shrink-0 text-sm font-bold text-gray-400">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{lesson.title || `Lesson ${i + 1}`}</p>
                      {lesson.description && <p className="text-xs text-gray-500 mt-0.5 truncate">{lesson.description}</p>}
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {lesson.duration && <span className="text-xs text-gray-500">{lesson.duration}</span>}
                      {isEnrolled ? (
                        <span className="text-[#C7E36B] text-xs font-medium">▶ Play</span>
                      ) : (
                        <span className="text-gray-600 text-xs">🔒</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-500">
                <p className="text-4xl mb-3">📚</p>
                <p className="font-medium">No lessons added yet</p>
              </div>
            )}
          </div>
        )}

        {/* ENROLLMENTS TAB (admin only) */}
        {activeTab === "enrollments" && isAdmin && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold uppercase tracking-wide">Enrolled Students</h2>
              {!enrollLoading && <p className="text-sm text-gray-400">{enrollments.length} students</p>}
            </div>
            {enrollLoading ? (
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
              <div className="text-center py-20 text-gray-500">
                <p className="text-4xl mb-3">👥</p>
                <p className="font-medium">No students enrolled yet</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
