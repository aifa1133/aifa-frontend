"use client";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const FILE_ICON = (name = "") => {
  if (/\.(png|jpg|jpeg|gif|webp|svg)$/i.test(name)) return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  );
  if (/\.(mp3|wav|ogg|aac)$/i.test(name)) return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
  );
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
  );
};

export default function ProjectDetail() {
  const [completed, setCompleted] = useState([]);
  const [saved, setSaved]         = useState(false);
  const [copied, setCopied]       = useState(null);
  const [resource, setResource]   = useState(null);
  const [loading, setLoading]     = useState(true);

  const navigate  = useNavigate();
  const { id }    = useParams();
  const location  = useLocation();

  useEffect(() => {
    // First try navigation state (passed from resource card click)
    if (location.state?.resource) {
      setResource(location.state.resource);
      setLoading(false);
      return;
    }
    // Fallback: try to find in the project list
    fetch("/api/resources?type=project")
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
          <p className="text-gray-500 text-4xl mb-4">📂</p>
          <p className="text-white font-bold mb-2">Project not found</p>
          <button onClick={() => navigate(-1)} className="text-sm text-[#C7E36B] hover:underline">← Go back</button>
        </div>
      </div>
    );
  }

  const categories = resource.categories || (resource.category ? [resource.category] : []);
  const steps      = Array.isArray(resource.steps)  ? resource.steps  : [];
  const assets     = Array.isArray(resource.assets) ? resource.assets : [];
  const similar    = Array.isArray(resource.similar) ? resource.similar : [];
  const heroImg    = resource.thumbnail || resource.logo || resource.banner || null;
  const author     = resource.author || {};

  return (
    <div className="bg-[#0B0F10] text-white min-h-screen">

      {/* ── Hero banner ── */}
      <div className="relative h-[320px] overflow-hidden bg-[#111315]">
        {heroImg
          ? <img src={heroImg} alt={resource.title} className="w-full h-full object-cover"/>
          : <div className="w-full h-full flex items-center justify-center">
              <svg width="60" height="60" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
            </div>
        }
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10"/>
        <div className="absolute inset-0 flex flex-col justify-end p-8 max-w-7xl mx-auto w-full left-0 right-0">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-4 transition-all w-fit">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>
            Back to Projects
          </button>
          {categories.length > 0 && (
            <div className="flex gap-2 mb-3">
              {categories.map(c => (
                <span key={c} className="text-[10px] font-bold border border-[#C7E36B]/60 text-[#C7E36B] px-2.5 py-0.5 rounded-full uppercase tracking-wide">{c}</span>
              ))}
            </div>
          )}
          <h1 className="text-3xl font-black text-white mb-2">{resource.title}</h1>
          {resource.description && <p className="text-gray-300 text-sm max-w-2xl leading-relaxed">{resource.description}</p>}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">

          {/* ── Main ── */}
          <div className="flex-1 min-w-0">

            {/* Project Overview */}
            {(resource.timeInvested || resource.difficulty || resource.tools) && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-[#C7E36B] rounded-full"/>
                  <h2 className="text-base font-bold text-white">Project Overview</h2>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {resource.timeInvested && (
                    <div className="bg-[#111315] border border-white/8 rounded-xl p-4">
                      <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1">TIME INVESTED</p>
                      <p className="text-base font-bold text-white">{resource.timeInvested}</p>
                    </div>
                  )}
                  {resource.difficulty && (
                    <div className="bg-[#111315] border border-white/8 rounded-xl p-4">
                      <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1">DIFFICULTY</p>
                      <p className="text-base font-bold text-white">{resource.difficulty}</p>
                    </div>
                  )}
                  {resource.tools && (
                    <div className="bg-[#111315] border border-white/8 rounded-xl p-4">
                      <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1">TOOLS USED</p>
                      <p className="text-base font-bold text-white">{resource.tools}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Content body */}
            {resource.content && (
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-[#C7E36B] rounded-full"/>
                  <h2 className="text-base font-bold text-white">About this Project</h2>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap">{resource.content}</p>
              </div>
            )}

            {/* Process Breakdown */}
            {steps.length > 0 && (
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1 h-5 bg-[#C7E36B] rounded-full"/>
                  <h2 className="text-base font-bold text-white">Process Breakdown</h2>
                </div>
                <div className="space-y-8 relative">
                  {/* Timeline line */}
                  <div className="absolute left-3 top-4 bottom-4 w-px bg-white/8"/>
                  {steps.map((step, i) => (
                    <div key={i} id={`pstep-${i}`} className="pl-10 relative scroll-mt-24">
                      <div className={`absolute left-0 top-1 w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-all ${completed.includes(i) ? "bg-[#C7E36B] border-[#C7E36B] text-black" : "border-white/20 bg-[#0B0F10] text-gray-500"}`}>
                        {completed.includes(i) ? "✓" : `0${i + 1}`}
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-base font-bold text-white">{`0${i + 1}. ${step.title}`}</h3>
                        {completed.includes(i) && <span className="text-[10px] font-bold text-[#C7E36B] uppercase tracking-wider">COMPLETED</span>}
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed mb-4">{step.description}</p>
                      {step.prompt && (
                        <div className="bg-[#111315] border border-white/8 rounded-xl mb-4 overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
                            <span className="text-[9px] font-bold text-gray-500 tracking-widest uppercase">MASTER PROMPT</span>
                            <button onClick={() => copyPrompt(step.prompt, i)} className="text-gray-500 hover:text-white p-1 rounded hover:bg-white/10 transition-all">
                              {copied === i
                                ? <svg width="13" height="13" fill="none" stroke="#C7E36B" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
                                : <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                              }
                            </button>
                          </div>
                          <pre className="px-4 py-4 text-xs text-gray-300 font-mono whitespace-pre-wrap leading-relaxed">{step.prompt}</pre>
                        </div>
                      )}
                      {step.images?.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          {step.images.map((im, j) => (
                            <div key={j} className="aspect-video bg-[#111315] border border-white/8 rounded-xl overflow-hidden relative">
                              {im.url
                                ? <img src={im.url} alt={im.label} className="w-full h-full object-cover"/>
                                : <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs uppercase tracking-wider">{im.label}</div>
                              }
                              {im.label && <span className="absolute bottom-2 left-2 right-2 text-center text-[9px] font-bold uppercase tracking-widest text-gray-400">{im.label}</span>}
                            </div>
                          ))}
                        </div>
                      )}
                      <button onClick={() => markComplete(i)}
                        className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all border ${completed.includes(i)
                          ? "border-[#C7E36B]/30 bg-[#C7E36B]/10 text-[#C7E36B]"
                          : "border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"}`}>
                        {completed.includes(i) ? "✓ Step Complete" : `Mark Step ${i + 1} Complete`}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Assets */}
            {assets.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-white">Project Assets</h2>
                  <span className="text-sm text-[#C7E36B] cursor-pointer hover:underline font-semibold">Download All (.zip)</span>
                </div>
                <div className="space-y-2">
                  {assets.map((asset, i) => (
                    <div key={i} className="flex items-center justify-between bg-[#111315] border border-white/8 rounded-xl px-4 py-3 hover:border-white/15 transition-all">
                      <div className="flex items-center gap-3 text-gray-500">
                        {FILE_ICON(asset.name)}
                        <span className="text-sm font-medium text-white">{asset.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{asset.size}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* If no structured content, link out */}
            {steps.length === 0 && !resource.content && resource.link && (
              <div className="mt-8">
                <a href={resource.link} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#C7E36B] text-black font-bold px-6 py-3 rounded-xl text-sm hover:brightness-105 transition-all">
                  View Project →
                </a>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="w-[280px] shrink-0">
            <div className="sticky top-24 space-y-4">

              {/* Creator / Stats */}
              {(author.name || resource.views || resource.replications || resource.publishedAt) && (
                <div className="bg-[#111315] border border-white/8 rounded-2xl p-5">
                  {author.name && (
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                        {author.avatar
                          ? <img src={author.avatar} className="w-full h-full object-cover" alt=""/>
                          : <div className="w-full h-full bg-[#C7E36B] flex items-center justify-center text-black font-black text-lg">{author.name[0]}</div>
                        }
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{author.name}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">CREATOR</p>
                      </div>
                    </div>
                  )}
                  <div className="space-y-2 mb-4 text-xs">
                    {resource.views       && <div className="flex justify-between text-gray-400"><span>Views</span><span className="text-white font-semibold">{resource.views}</span></div>}
                    {resource.replications && <div className="flex justify-between text-gray-400"><span>Replications</span><span className="text-white font-semibold">{resource.replications}</span></div>}
                    {resource.publishedAt  && <div className="flex justify-between text-gray-400"><span>Published</span><span className="text-white font-semibold">{new Date(resource.publishedAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</span></div>}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setSaved(!saved)}
                      className={`flex-1 text-xs font-semibold py-2.5 rounded-xl border transition-all flex items-center justify-center gap-1.5 ${saved ? "border-[#C7E36B]/40 text-[#C7E36B] bg-[#C7E36B]/10" : "border-white/15 text-gray-300 hover:bg-white/5"}`}>
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                      {saved ? "Saved" : "Save Project"}
                    </button>
                    <button onClick={() => { navigator.clipboard.writeText(window.location.href); }}
                      className="flex-1 text-xs font-semibold py-2.5 rounded-xl border border-white/15 text-gray-300 hover:bg-white/5 transition-all flex items-center justify-center gap-1.5">
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                      Share
                    </button>
                  </div>
                </div>
              )}

              {/* Quick Navigation */}
              {steps.length > 0 && (
                <div className="bg-[#111315] border border-white/8 rounded-2xl p-4">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">QUICK NAVIGATION</p>
                  <div className="space-y-0.5 text-xs">
                    <a href="#top" className="block py-1.5 px-2 text-[#C7E36B] rounded-lg hover:bg-white/5">Overview</a>
                    <a href="#pstep-0" className="block py-1.5 px-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5">Process Breakdown</a>
                    {assets.length > 0 && <span className="block py-1.5 px-2 text-gray-400">Project Assets</span>}
                    {similar.length > 0 && <span className="block py-1.5 px-2 text-gray-400">Related Projects</span>}
                  </div>
                </div>
              )}

              {/* Similar Projects */}
              {similar.length > 0 && (
                <div className="bg-[#111315] border border-white/8 rounded-2xl p-4">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">SIMILAR PROJECTS</p>
                  <div className="space-y-3">
                    {similar.map((p, i) => (
                      <div key={i} className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-all">
                        <div className="w-14 h-10 rounded-lg overflow-hidden bg-white/5 shrink-0">
                          {p.img
                            ? <img src={p.img} alt={p.title} className="w-full h-full object-cover"/>
                            : <div className="w-full h-full bg-[#111315]"/>
                          }
                        </div>
                        <p className="text-xs text-gray-300 font-medium">{p.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
