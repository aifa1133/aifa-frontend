"use client";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export default function WorkflowDetail() {
  const [completed, setCompleted] = useState([]);
  const [copied, setCopied]       = useState(null);
  const [resource, setResource]   = useState(null);
  const [loading, setLoading]     = useState(true);

  const navigate  = useNavigate();
  const { id }    = useParams();
  const location  = useLocation();

  useEffect(() => {
    if (location.state?.resource) {
      setResource(location.state.resource);
      setLoading(false);
      return;
    }
    fetch("/api/resources?type=workflow")
      .then(r => r.ok ? r.json() : [])
      .then(d => {
        const found = Array.isArray(d) ? d.find(r => r._id === id) : null;
        setResource(found || null);
      })
      .catch(() => setResource(null))
      .finally(() => setLoading(false));
  }, [id, location.state]);

  const markComplete = (i) => setCompleted(c => c.includes(i) ? c.filter(x => x !== i) : [...c, i]);
  const copyPrompt = (text, i) => {
    navigator.clipboard.writeText(text).then(() => { setCopied(i); setTimeout(() => setCopied(null), 2000); });
  };

  if (loading) {
    return (
      <div className="bg-[#0B0F10] min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#C7E36B] border-t-transparent rounded-full animate-spin"/>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="bg-[#0B0F10] min-h-screen flex items-center justify-center text-center px-6">
        <div>
          <p className="text-gray-500 text-4xl mb-4">📋</p>
          <p className="text-white font-bold mb-2">Workflow not found</p>
          <button onClick={() => navigate(-1)} className="text-sm text-[#C7E36B] hover:underline">← Go back</button>
        </div>
      </div>
    );
  }

  const steps    = Array.isArray(resource.steps) ? resource.steps : [];
  const author   = resource.author || {};
  const progress = steps.length > 0 ? completed.length / steps.length : 0;
  const r        = 40;
  const circumference = 2 * Math.PI * r;

  return (
    <div className="bg-[#0B0F10] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex gap-8">

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-xs text-gray-500">
              <button onClick={() => navigate(-1)} className="flex items-center gap-1 hover:text-white transition-all">
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>
                Back to Work flow
              </button>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
              {resource.category && <span className="font-bold text-[#C7E36B] uppercase tracking-wider">{resource.category}</span>}
              {resource.readTime && (
                <span className="flex items-center gap-1">
                  <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  {resource.readTime}
                </span>
              )}
            </div>

            {/* Title + description */}
            <h1 className="text-3xl font-black text-white mb-4 leading-tight">{resource.title}</h1>
            {resource.description && <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-2xl">{resource.description}</p>}

            {/* Author */}
            {author.name && (
              <div className="inline-flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl mb-8">
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                  {author.avatar
                    ? <img src={author.avatar} className="w-full h-full object-cover" alt=""/>
                    : <div className="w-full h-full bg-[#C7E36B] flex items-center justify-center text-black font-black text-lg">{author.name[0]}</div>
                  }
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{author.name}</p>
                  <p className="text-xs text-gray-400">{author.role || "AIFA Instructor"}</p>
                </div>
              </div>
            )}

            {/* Hero image */}
            {(resource.thumbnail || resource.logo) && (
              <div className="rounded-2xl overflow-hidden mb-10 aspect-video bg-white/5">
                <img src={resource.thumbnail || resource.logo} className="w-full h-full object-cover" alt={resource.title}/>
              </div>
            )}

            {/* Content body (if no structured steps) */}
            {resource.content && steps.length === 0 && (
              <div className="mb-10">
                <h2 className="text-lg font-bold text-white mb-4">Introduction</h2>
                <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap">{resource.content}</p>
              </div>
            )}

            {/* Steps */}
            {steps.length > 0 && (
              <div className="space-y-10">
                {steps.map((step, i) => (
                  <div key={i} id={`step-${i}`} className="scroll-mt-24">
                    <div className="flex items-start gap-5">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-black transition-all ${completed.includes(i) ? "bg-[#C7E36B] text-black" : "bg-white/10 text-white"}`}>
                        {completed.includes(i) ? "✓" : i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-bold text-white mb-3">{step.title}</h2>
                        {step.prose && <p className="text-gray-400 text-sm leading-relaxed mb-5">{step.prose}</p>}
                        {step.description && <p className="text-gray-400 text-sm leading-relaxed mb-5">{step.description}</p>}

                        {step.prompt && (
                          <div className="bg-[#0F1112] border border-white/10 rounded-xl mb-5 overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
                              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">MASTER PROMPT</span>
                              <button onClick={() => copyPrompt(step.prompt, i)} className="flex items-center gap-1.5 text-[10px] text-gray-400 hover:text-white transition-all">
                                {copied === i
                                  ? <><svg width="11" height="11" fill="none" stroke="#C7E36B" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg><span className="text-[#C7E36B]">Copied!</span></>
                                  : <><svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy</>
                                }
                              </button>
                            </div>
                            <pre className="px-4 py-4 text-xs text-gray-300 font-mono whitespace-pre-wrap leading-relaxed">{step.prompt}</pre>
                          </div>
                        )}

                        <button onClick={() => markComplete(i)}
                          className={`text-sm font-semibold px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 border ${completed.includes(i)
                            ? "border-[#C7E36B]/40 bg-[#C7E36B]/10 text-[#C7E36B]"
                            : "border-white/15 bg-white/5 text-gray-300 hover:bg-white/10"}`}>
                          {completed.includes(i) ? "✓ Step Complete" : `Mark Step ${i + 1} Complete`}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No structured content + no link */}
            {steps.length === 0 && !resource.content && (
              <div className="text-center py-16 text-gray-500">
                <p className="text-sm">No detailed steps available for this workflow yet.</p>
              </div>
            )}

            {/* External link CTA */}
            {resource.link && (
              <div className="mt-10">
                <a href={resource.link} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#C7E36B] text-black font-bold px-6 py-3 rounded-xl text-sm hover:brightness-105 transition-all">
                  Open Workflow →
                </a>
              </div>
            )}

            {/* Completion CTA */}
            {steps.length > 0 && completed.length === steps.length && (
              <div className="mt-10 bg-[#C7E36B]/10 border border-[#C7E36B]/30 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Workflow Complete!</h3>
                <p className="text-sm text-gray-400 mb-5">You've finished all {steps.length} steps.</p>
                <button className="bg-[#C7E36B] text-black font-bold px-8 py-3 rounded-xl hover:brightness-105 transition-all text-sm">
                  Claim Your Certificate →
                </button>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          {steps.length > 0 && (
            <div className="w-[280px] shrink-0">
              <div className="sticky top-24 space-y-4">

                {/* Progress ring */}
                <div className="bg-[#111315] border border-white/8 rounded-2xl p-5 text-center">
                  <svg width="100" height="100" viewBox="0 0 100 100" className="mx-auto mb-3">
                    <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8"/>
                    <circle cx="50" cy="50" r={r} fill="none" stroke="#C7E36B" strokeWidth="8"
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference * (1 - progress)}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                      style={{ transition: "stroke-dashoffset 0.5s ease" }}
                    />
                    <text x="50" y="48" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">{Math.round(progress * 100)}%</text>
                    <text x="50" y="62" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">PROGRESS</text>
                  </svg>
                  {steps.length > 0 && completed.length > 0 && (
                    <p className="text-xs text-gray-400 mt-1">Currently on Step {completed.length + 1}</p>
                  )}
                </div>

                {/* Contents */}
                <div className="bg-[#111315] border border-white/8 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Contents</p>
                  </div>
                  <div className="space-y-0.5">
                    {steps.map((step, i) => (
                      <a key={i} href={`#step-${i}`}
                        className={`flex items-center gap-2.5 text-xs py-2 px-2 rounded-lg hover:bg-white/5 transition-all ${completed.includes(i) ? "text-[#C7E36B]" : "text-gray-400 hover:text-white"}`}>
                        <span className={`text-[9px] font-bold ${completed.includes(i) ? "text-[#C7E36B]" : "text-gray-600"}`}>0{i+1}</span>
                        <span className="line-clamp-1">{step.title}</span>
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
