import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function CoursePlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [completedLessons, setCompletedLessons] = useState([]);
  const [markingComplete, setMarkingComplete] = useState(false);

  const token = localStorage.getItem("aifa_token");

  useEffect(() => {
    if (!token) { navigate("/"); return; }
    const headers = { Authorization: `Bearer ${token}` };
    Promise.all([
      fetch(`/api/courses/${id}`, { headers }).then(r => r.json()),
      fetch("/api/courses/enrolled", { headers }).then(r => r.json()).catch(() => []),
    ]).then(([courseData, enrolled]) => {
      if (courseData.message) { setError(courseData.message); }
      else {
        setCourse(courseData);
        if (courseData.lessons?.length > 0) setActiveLesson(courseData.lessons[0]);
        if (Array.isArray(enrolled)) {
          const prog = enrolled.find(c => String(c._id) === id);
          if (prog?.completedLessons?.length > 0)
            setCompletedLessons(prog.completedLessons.map(String));
        }
      }
      setLoading(false);
    }).catch(() => { setError("Failed to load course."); setLoading(false); });
  }, [id, token, navigate]);

  if (loading) return (
    <div className="min-h-screen bg-[#0B0F10] flex items-center justify-center">
      <p className="text-white">Loading course...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#0B0F10] flex flex-col items-center justify-center gap-4">
      <p className="text-red-400 text-lg">{error}</p>
      <Link to="/dashboard" className="text-[#C7E36B] underline">Go to Dashboard</Link>
    </div>
  );

  if (!course) return null;

  const isLessonComplete = (lessonId) => completedLessons.includes(String(lessonId));

  const markComplete = async () => {
    if (!activeLesson || markingComplete) return;
    const lessonId = activeLesson._id;
    const alreadyDone = isLessonComplete(lessonId);
    setMarkingComplete(true);
    try {
      const res = await fetch(`/api/courses/${id}/progress`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ lessonId, completed: !alreadyDone }),
      });
      const data = await res.json();
      if (data.completedLessons) setCompletedLessons(data.completedLessons.map(String));
    } catch {}
    setMarkingComplete(false);
  };

  const getVimeoEmbed = (lesson) => {
    if (lesson.vimeoId) {
      return `https://player.vimeo.com/video/${lesson.vimeoId}?autoplay=1&color=C7E36B&title=0&byline=0&portrait=0`;
    }
    if (lesson.videoUrl) {
      if (lesson.videoUrl.includes("vimeo.com")) {
        const match = lesson.videoUrl.match(/vimeo\.com\/(\d+)/);
        if (match) return `https://player.vimeo.com/video/${match[1]}?autoplay=1&color=C7E36B`;
      }
      return lesson.videoUrl;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#0B0F10] text-white">
      <div className="max-w-[1366px] mx-auto px-4 py-6">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>›</span>
          <Link to="/courses" className="hover:text-white">Video Courses</Link>
          <span>›</span>
          <Link to="/courses" className="hover:text-white">My Courses</Link>
          <span>›</span>
          <span className="text-[#C7E36B]">{course.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* LESSON LIST */}
          <div className="w-full lg:w-[340px] shrink-0">
            <h2 className="text-lg font-semibold mb-4">Course Content</h2>
            <div className="text-sm text-gray-400 mb-3">
              {course.lessons?.length || 0} lessons • {course.duration}
            </div>

            {course.lessons?.length > 0 ? (
              <div className="flex flex-col gap-2">
                {course.lessons
                  .sort((a, b) => a.order - b.order)
                  .map((lesson, idx) => (
                    <button
                      key={lesson._id || idx}
                      onClick={() => setActiveLesson(lesson)}
                      className={`w-full text-left flex items-start gap-3 p-3 rounded-[8px] transition-all ${
                        activeLesson?._id === lesson._id || activeLesson?.title === lesson.title
                          ? "bg-[#C7E36B]/15 border border-[#C7E36B]/40"
                          : "bg-white/5 border border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        activeLesson?._id === lesson._id || activeLesson?.title === lesson.title
                          ? "bg-[#C7E36B] text-black"
                          : isLessonComplete(lesson._id)
                          ? "bg-[#C7E36B]/20 text-[#C7E36B] border border-[#C7E36B]/50"
                          : "bg-white/10 text-gray-400"
                      }`}>
                        {isLessonComplete(lesson._id) ? "✓" : idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-sm truncate ${
                          activeLesson?._id === lesson._id ? "text-[#C7E36B]" : "text-white"
                        }`}>
                          {lesson.title}
                        </p>
                        {lesson.duration && <p className="text-gray-500 text-xs mt-0.5">{lesson.duration}</p>}
                      </div>
                      {(lesson.vimeoId || lesson.videoUrl) && (
                        <span className="text-xs text-gray-500 shrink-0">▶</span>
                      )}
                    </button>
                  ))}
              </div>
            ) : (
              <div className="text-gray-500 text-sm text-center py-8 border border-white/10 rounded-[8px]">
                No lessons yet
              </div>
            )}

            {/* NEXT / PREV */}
            {course.lessons?.length > 1 && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    const idx = course.lessons.findIndex((l) => l._id === activeLesson?._id);
                    if (idx > 0) setActiveLesson(course.lessons[idx - 1]);
                  }}
                  className="flex-1 py-2 rounded-[6px] border border-white/20 text-sm hover:bg-white/5 transition-all"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => {
                    const idx = course.lessons.findIndex((l) => l._id === activeLesson?._id);
                    if (idx < course.lessons.length - 1) setActiveLesson(course.lessons[idx + 1]);
                  }}
                  className="flex-1 py-2 rounded-[6px] bg-[#C7E36B] text-black text-sm font-semibold hover:bg-lime-300 transition-all"
                >
                  Next →
                </button>
              </div>
            )}
          </div>

          {/* VIDEO PLAYER */}
          <div className="flex-1">
            <div className="w-full aspect-video bg-black rounded-xl overflow-hidden mb-4">
              {activeLesson ? (
                getVimeoEmbed(activeLesson) ? (
                  <iframe
                    src={getVimeoEmbed(activeLesson)}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={activeLesson.title}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-gray-400">
                    <div className="text-6xl">🎬</div>
                    <p className="text-lg font-semibold">{activeLesson.title}</p>
                    <p className="text-sm">No video URL configured for this lesson.</p>
                    <p className="text-xs text-gray-500">Add a Vimeo ID in the Admin Dashboard to enable playback.</p>
                  </div>
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <p>Select a lesson to start watching</p>
                </div>
              )}
            </div>

            {activeLesson && (
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="text-xl font-bold mb-1">{activeLesson.title}</h1>
                  {activeLesson.duration && (
                    <p className="text-gray-400 text-sm flex items-center gap-1">⏱ {activeLesson.duration}</p>
                  )}
                </div>
                <button
                  onClick={markComplete}
                  disabled={markingComplete}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isLessonComplete(activeLesson._id)
                      ? "bg-[#C7E36B] text-black hover:bg-lime-300"
                      : "border border-[#C7E36B] text-[#C7E36B] hover:bg-[#C7E36B]/10"
                  }`}
                >
                  {isLessonComplete(activeLesson._id) ? "✓ Marked as Complete" : "Mark as Complete"}
                </button>
              </div>
            )}

            {course.lessons?.length === 0 && (
              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm">
                No lessons have been added to this course yet. The admin needs to add video lessons via the Admin Dashboard.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
