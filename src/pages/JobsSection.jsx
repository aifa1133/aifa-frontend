"use client";
import { useState, useEffect, useRef } from "react";
import { useIsPro, ProUpgradeModal } from "../Components/ProGate";

const CATEGORIES = ["Cinematography", "Video Editing", "Sound Design", "Directing", "Production Design"];
const BUDGETS = ["< ₹50/hr", "₹50–100/hr", "₹100–200/hr", "₹200+/hr"];
const TIMELINES = ["Immediate", "Within 2 Weeks", "1 Month+", "Flexible"];

const TAG_COLORS = {
  "AI Film":    "bg-[#C7E36B] text-black",
  "AI Story":   "bg-purple-500/30 text-purple-200",
  "AI Editing": "bg-blue-500/30 text-blue-200",
  "AI Ads":     "bg-orange-500/30 text-orange-200",
  "AI Music":   "bg-pink-500/30 text-pink-200",
};

function FilterDropdown({ label, options, selected, onToggle }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const activeCount = selected.length;
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-3 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all ${activeCount > 0 ? "border-[#C7E36B]/60 bg-[#C7E36B]/10 text-[#C7E36B]" : "border-white/10 bg-white/5 text-white hover:border-white/20"}`}
      >
        {label}
        {activeCount > 0 && <span className="text-[10px] bg-[#C7E36B] text-black font-bold w-4 h-4 rounded-full flex items-center justify-center">{activeCount}</span>}
        <span className={`text-xs transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open && (
        <div className="absolute top-full mt-2 left-0 min-w-[200px] bg-[#1A1D1E] border border-white/15 rounded-xl shadow-2xl z-10 overflow-hidden">
          {options.map(opt => (
            <button key={opt} onClick={() => onToggle(opt)}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left hover:bg-white/5 transition-all ${selected.includes(opt) ? "text-[#C7E36B]" : "text-gray-300"}`}>
              {opt}
              {selected.includes(opt) && <span className="text-xs">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function JobCard({ job, timeAgo, onSelect, locked, onLockedClick }) {
  const inner = (
    <>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${TAG_COLORS[job.tag] || "bg-white/10 text-white"}`}>
            {job.tag || job.category}
          </span>
          {job.source && (
            <span className="text-[9px] border border-blue-400/40 text-blue-300 px-2 py-0.5 rounded font-semibold uppercase tracking-wide">
              {job.source}
            </span>
          )}
        </div>
        {job.type && (
          <span className="text-[10px] border border-white/20 text-gray-400 px-2 py-0.5 rounded font-semibold uppercase shrink-0">
            {job.type}
          </span>
        )}
      </div>
      <h3 className="text-base font-semibold text-white mb-2 leading-tight">{job.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">{job.description || job.desc}</p>
      <div className="text-[#C7E36B] text-sm font-medium mb-4">View Details →</div>
      <div className="border-t border-white/10 pt-4 flex items-center justify-between flex-wrap gap-2">
        {job.budget && <span className="border border-white/20 text-white text-xs px-3 py-1 rounded-md font-medium">{job.budget}</span>}
        {job.timeline && <span className="border border-white/20 text-gray-400 text-xs px-3 py-1 rounded-md">{job.timeline}</span>}
        <span className="text-[11px] text-gray-600 ml-auto">{timeAgo(job.createdAt)}</span>
      </div>
    </>
  );

  if (locked) {
    return (
      <div
        className="bg-[#111] border border-white/10 rounded-2xl p-6 flex flex-col relative cursor-pointer"
        onClick={onLockedClick}
      >
        <div className="blur-sm opacity-50 pointer-events-none select-none flex flex-col flex-1">{inner}</div>
        <div className="absolute inset-0 flex items-center justify-center z-10 rounded-2xl">
          <div className="bg-[#111315]/90 border border-white/10 rounded-2xl px-5 py-3 flex items-center gap-3 shadow-xl">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span className="text-white text-xs font-semibold">Pro Members Only — Tap to Unlock</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-[#C7E36B]/40 transition-all flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${TAG_COLORS[job.tag] || "bg-white/10 text-white"}`}>
            {job.tag || job.category}
          </span>
          {job.source && (
            <span className="text-[9px] border border-blue-400/40 text-blue-300 px-2 py-0.5 rounded font-semibold uppercase tracking-wide">
              {job.source}
            </span>
          )}
        </div>
        {job.type && (
          <span className="text-[10px] border border-white/20 text-gray-400 px-2 py-0.5 rounded font-semibold uppercase shrink-0">
            {job.type}
          </span>
        )}
      </div>
      <h3 className="text-base font-semibold text-white mb-2 leading-tight">{job.title}</h3>
      {job.company && <p className="text-xs text-gray-500 mb-1">{job.company}{job.location ? ` · ${job.location}` : ""}</p>}
      <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">{job.description || job.desc}</p>
      <button onClick={() => onSelect(job)} className="text-[#C7E36B] text-sm font-medium hover:underline text-left mb-4">
        View Details →
      </button>
      <div className="border-t border-white/10 pt-4 flex items-center justify-between flex-wrap gap-2">
        {job.budget && <span className="border border-white/20 text-white text-xs px-3 py-1 rounded-md font-medium">{job.budget}</span>}
        {job.timeline && <span className="border border-white/20 text-gray-400 text-xs px-3 py-1 rounded-md">{job.timeline}</span>}
        <span className="text-[11px] text-gray-600 ml-auto">{timeAgo(job.createdAt)}</span>
      </div>
    </div>
  );
}

export default function JobsSection() {
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [extPage, setExtPage] = useState(1);
  const [extTotal, setExtTotal] = useState(0);
  const [catFilter, setCatFilter]   = useState([]);
  const [budgetFilter, setBudgetFilter] = useState([]);
  const [timelineFilter, setTimelineFilter] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const isPro = useIsPro();

  const STATIC_JOBS = [
    { tag: "AI Film",    title: "A 2-minute short AI film needed",          type: "PART-TIME",  description: "Create an AI-driven cinematic ad emphasizing clarity and strong user engagement.", budget: "< ₹50/hr",    timeline: "Immediate",     category: "Cinematography",    createdAt: new Date() },
    { tag: "AI Ads",     title: "Build high-converting AI video ads",       type: "FULL-TIME",  description: "Create an AI-driven cinematic ad focused on brand clarity and user engagement.",  budget: "₹200+/hr",    timeline: "Within 2 Weeks", category: "Video Editing",      createdAt: new Date() },
    { tag: "AI Story",   title: "AI short film with strong storytelling",   type: "PART-TIME",  description: "Create an AI-driven cinematic short film with strong storytelling.",              budget: "₹50–100/hr",  timeline: "1 Month+",       category: "Directing",          createdAt: new Date() },
    { tag: "AI Editing", title: "AI post-production editing needed",        type: "CONTRACT",   description: "Professional video editing for AI-generated film sequences.",                     budget: "₹100–200/hr", timeline: "Flexible",       category: "Video Editing",      createdAt: new Date() },
    { tag: "AI Music",   title: "AI sound design for short film",           type: "PART-TIME",  description: "Compose and design AI-driven sound for a 5-minute short film.",                  budget: "₹50–100/hr",  timeline: "Immediate",      category: "Sound Design",       createdAt: new Date() },
    { tag: "AI Film",    title: "Production design for AI sci-fi project",  type: "FULL-TIME",  description: "Design visual language and production design for an AI science fiction short.",   budget: "₹100–200/hr", timeline: "Within 2 Weeks", category: "Production Design",  createdAt: new Date() },
  ];

  useEffect(() => {
    Promise.all([
      fetch("/api/jobs").then(r => r.json()).catch(() => []),
      fetch("/api/jobs/external?page=1").then(r => r.json()).catch(() => ({})),
    ]).then(([internal, extResp]) => {
      const extJobs = extResp?.jobs || (Array.isArray(extResp) ? extResp : []);
      const combined = [
        ...(Array.isArray(internal) ? internal : []),
        ...extJobs,
      ];
      setAllJobs(combined.length > 0 ? combined : STATIC_JOBS);
      setExtTotal(extResp?.total || 0);
      setExtPage(1);
      setLoading(false);
    });
  }, []);

  const handleLoadMore = async () => {
    if (!isPro) { setShowModal(true); return; }
    setLoadingMore(true);
    const nextPage = extPage + 1;
    try {
      const res = await fetch(`/api/jobs/external?page=${nextPage}`);
      const data = await res.json();
      const newJobs = data?.jobs || [];
      if (newJobs.length > 0) {
        setAllJobs(prev => [...prev, ...newJobs]);
        setExtPage(nextPage);
        setExtTotal(data.total || extTotal);
      }
    } catch {}
    setLoadingMore(false);
  };

  const toggle = (setter) => (val) => setter(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);

  const filtered = allJobs.filter(j => {
    if (catFilter.length      && !catFilter.includes(j.category)) return false;
    if (budgetFilter.length   && !budgetFilter.includes(j.budget)) return false;
    if (timelineFilter.length && !timelineFilter.includes(j.timeline)) return false;
    return true;
  });

  const clearAll = () => { setCatFilter([]); setBudgetFilter([]); setTimelineFilter([]); };
  const hasFilters = catFilter.length + budgetFilter.length + timelineFilter.length > 0;

  const timeAgo = (date) => {
    const mins = Math.floor((Date.now() - new Date(date)) / 60000);
    if (mins < 60) return `${mins || 1}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <section className="bg-[#0B0F10] text-white py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Find AI Filmmaking Jobs</h1>
          <p className="text-gray-400 text-sm">{loading ? "Loading..." : `${filtered.length} opportunities available`}</p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <FilterDropdown label="Category"  options={CATEGORIES} selected={catFilter}      onToggle={toggle(setCatFilter)} />
          <FilterDropdown label="Budget"    options={BUDGETS}    selected={budgetFilter}   onToggle={toggle(setBudgetFilter)} />
          <FilterDropdown label="Timeline"  options={TIMELINES}  selected={timelineFilter} onToggle={toggle(setTimelineFilter)} />
          {hasFilters && (
            <button onClick={clearAll} className="text-xs text-gray-400 hover:text-white underline transition-all">Clear all</button>
          )}
          <div className="ml-auto">
            <span className="text-xs text-gray-500">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
          </div>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid md:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 animate-pulse h-52" />
            ))}
          </div>
        )}

        {/* No results */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl mb-2">🎬</p>
            <p className="text-white font-semibold">No jobs match your filters</p>
            <p className="text-gray-500 text-sm mt-1">Try removing some filters</p>
            <button onClick={clearAll} className="mt-4 text-sm text-[#C7E36B] underline">Clear all filters</button>
          </div>
        )}

        {/* Job grid — first card always open, rest locked for non-Pro */}
        {!loading && filtered.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            {filtered.map((job, i) => (
              <JobCard
                key={job._id || i}
                job={job}
                timeAgo={timeAgo}
                onSelect={setSelectedJob}
                locked={i > 0 && !isPro}
                onLockedClick={() => setShowModal(true)}
              />
            ))}
          </div>
        )}

        {/* Load more */}
        {!loading && (extTotal === 0 || allJobs.length < extTotal) && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="bg-[#C7E36B] text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-60"
            >
              {loadingMore ? "Loading…" : "+ Load more jobs →"}
            </button>
          </div>
        )}
      </div>

      {/* Pro upgrade modal */}
      {showModal && <ProUpgradeModal onClose={() => setShowModal(false)} />}

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setSelectedJob(null)}>
          <div className="bg-[#111] border border-white/15 rounded-2xl max-w-lg w-full p-6 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedJob(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg leading-none">✕</button>
            <div className="flex items-start gap-3 mb-4">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${TAG_COLORS[selectedJob.tag] || "bg-white/10 text-white"}`}>
                {selectedJob.tag || selectedJob.category}
              </span>
              {selectedJob.type && (
                <span className="text-[10px] border border-white/20 text-gray-400 px-2 py-0.5 rounded font-semibold uppercase self-center">
                  {selectedJob.type}
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-white mb-1">{selectedJob.title}</h2>
            {selectedJob.company && (
              <p className="text-sm text-gray-400 mb-3">{selectedJob.company}{selectedJob.location ? ` · ${selectedJob.location}` : ""}</p>
            )}
            <p className="text-gray-300 text-sm leading-relaxed mb-5">{selectedJob.description || selectedJob.desc}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {selectedJob.budget && <span className="border border-white/20 text-white text-xs px-3 py-1 rounded-md">{selectedJob.budget}</span>}
              {selectedJob.timeline && <span className="border border-white/20 text-gray-300 text-xs px-3 py-1 rounded-md">{selectedJob.timeline}</span>}
              {selectedJob.category && <span className="border border-white/20 text-gray-300 text-xs px-3 py-1 rounded-md">{selectedJob.category}</span>}
            </div>
            <button
              onClick={() => selectedJob.link ? window.open(selectedJob.link, "_blank") : setSelectedJob(null)}
              className="w-full bg-[#C7E36B] text-black py-3 rounded-xl font-semibold hover:opacity-90 transition-all"
            >
              {selectedJob.link ? "Apply Now →" : "Contact to Apply"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
