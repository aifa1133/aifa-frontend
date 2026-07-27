"use client";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const WORKFLOW_LIBRARY = {
  "1": { title: "Idea Generation", category: "CREATIVE", readTime: "20 Min Read", description: "Generate unique story concepts, loglines, and creative briefs using AI brainstorming tools. Transform raw ideas into compelling narrative foundations.", author: { name: "Rahul Sharma", role: "Creative Director & AI Instructor" }, steps: [
    { title: "Define Your Vision", prose: "Start by clarifying what kind of story you want to tell. Think about genre, target audience, and the core emotional hook.", prompt: "Generate 5 original short film concepts about [THEME]. For each include: one-line premise, emotional hook, visual style, protagonist goal, conflict. Focus on stories achievable with AI tools in 48 hours." },
    { title: "AI Brainstorm Session", prose: "Use ChatGPT or Claude to rapidly generate variations. Push beyond your first instincts — the fifth idea is often the best.", prompt: "I have this story idea: [IDEA]. Give me 3 unexpected twists or subversions of this concept that would make it more original and cinematic. Include a different genre interpretation for each." },
    { title: "Logline & Hook", prose: "Distill your concept into a single powerful sentence. A great logline should make someone immediately want to see the film.", prompt: "Write 5 loglines for a short film about [CONCEPT]. Use the format: [PROTAGONIST] must [GOAL] before [STAKES], or face [CONSEQUENCE]. Make each emotionally compelling and specific." },
  ]},
  "2": { title: "Script Writing", category: "WRITING", readTime: "35 Min Read", description: "Write compelling screenplays using AI assistance. Structure your narrative with acts, dialogue, and scene descriptions that translate directly to visual storytelling.", author: { name: "Priya Mehta", role: "Screenwriter & AI Film Educator" }, steps: [
    { title: "Scene Structure", prose: "Break your story into three acts. Each act should have a clear purpose: Setup, Confrontation, Resolution.", prompt: "Create a 3-act structure outline for a 3-minute short film: [PREMISE]. Include scene count per act, key beats, emotional arc, and inciting incident. Format as a production-ready outline." },
    { title: "Dialogue Writing", prose: "AI can help write natural-sounding dialogue. Give it context about each character's voice, education level, and emotional state.", prompt: "Write a 2-person dialogue scene for: [SCENARIO]. Character A is [DESCRIPTION]. Character B is [DESCRIPTION]. The subtext should be [WHAT THEY REALLY MEAN]. Length: 30 seconds when spoken aloud." },
    { title: "Scene Descriptions", prose: "Write visual scene descriptions that clearly communicate what the camera will show. Be specific about location, lighting, and action.", prompt: "Write a cinematic scene description for: [SCENE BRIEF]. Include: EXT/INT, time of day, establishing shot description, character action, environmental detail, and suggested camera movement. Style: professional screenplay format." },
  ]},
  "3": { title: "Scene Creation", category: "VISUAL", readTime: "30 Min Read", description: "Design and construct cinematic scenes using AI tools. From environment design to character placement, build every visual element of your story world.", author: { name: "Arjun Nair", role: "Visual Designer & AI Artist" }, steps: [
    { title: "Environment Design", prose: "Define the visual world of your film. Consistent environments create immersion and help establish tone.", prompt: "Design a detailed environment for scene [X]: [BRIEF DESCRIPTION]. Include: architectural style, color palette, lighting conditions, time of day, atmospheric elements, key props. Suggest Midjourney parameters for generating this environment consistently." },
    { title: "Shot Composition", prose: "Plan each shot type before generation. Know whether you need wide establishing shots, medium character shots, or close-up detail shots.", prompt: "Create a shot list for scene [X]: [DESCRIPTION]. Include: shot type, camera angle, focal length, character position, action, and duration for each shot. Format as a production shot list table." },
    { title: "Consistency Prompts", prose: "Maintain visual consistency across multiple AI-generated scenes by using a consistent base prompt with variables.", prompt: "Master style prompt for [FILM TITLE]: [CHARACTER/ENVIRONMENT DESCRIPTION], [COLOR GRADING STYLE] color palette, [CAMERA STYLE] cinematography, [LIGHTING SETUP] lighting, photorealistic, 8K, --ar 16:9 --style raw --v 6 --seed [USE SAME SEED]" },
  ]},
  "4": { title: "Image Rendering", category: "GENERATION", readTime: "25 Min Read", description: "Generate high-quality AI images using Midjourney, Stable Diffusion, and DALL-E. Master prompt engineering for consistent, cinematic visual output.", author: { name: "Divya Krishnan", role: "AI Image Artist & Prompter" }, steps: [
    { title: "Midjourney Mastery", prose: "Midjourney excels at cinematic and artistic images. Use the --style raw flag for photorealistic results and --ar 16:9 for widescreen film aspect ratios.", prompt: "[SCENE DESCRIPTION], film photography style, anamorphic lens, Kodak Vision3 500T color grading, shallow depth of field, professional lighting, photorealistic, ultra detailed, 8K resolution --ar 16:9 --style raw --v 6 --chaos 0" },
    { title: "Character Consistency", prose: "Maintaining consistent character appearance across multiple images is the biggest challenge in AI filmmaking. Use reference images and character seeds.", prompt: "Consistent character prompt for [CHARACTER NAME]: [DETAILED PHYSICAL DESCRIPTION], same face, same hair, same clothing: [OUTFIT DETAILS]. Generate in style: [VISUAL STYLE]. Add --cref [URL] for face reference --cw 80 for moderate consistency." },
    { title: "Batch Generation Strategy", prose: "Generate in batches of 4 and select the best. Use /blend to combine good elements from different generations.", prompt: "Create 4 variations of: [SCENE] with different [lighting/angle/mood/weather] variations. Use these as A/B options: (A) morning golden hour, (B) midday harsh sun, (C) magic hour dusk, (D) night with artificial lighting." },
  ]},
  "5": { title: "Voice Generation", category: "AUDIO", readTime: "20 Min Read", description: "Generate professional voiceovers, character voices, and narration using ElevenLabs and other AI voice tools.", author: { name: "Sana Khan", role: "Audio Director & AI Voice Specialist" }, steps: [
    { title: "Voice Script Optimization", prose: "Write scripts specifically for AI voice generation. Short sentences, clear punctuation, and emotional cues improve output quality.", prompt: "Rewrite this narration for AI voice generation: [TEXT]. Make sentences shorter (max 15 words), add [pause] markers for natural breaks, add [*word*] emphasis markers, and ensure the reading time is approximately [X] seconds." },
    { title: "ElevenLabs Settings", prose: "For cinematic narration use Stability: 0.45, Similarity: 0.82, Style Exaggeration: 0.3. For energetic commercial voices increase Style Exaggeration to 0.7.", prompt: "Write a professional voiceover script for a [TYPE] film, [X]-second format. Tone: [TONE]. Voice character: [AGE/GENDER/ACCENT]. Include: hook, core message, emotional build, call to action. Add breathing points and emphasis markers." },
    { title: "Audio Post-Processing", prose: "After generation, process voice audio: noise reduction, EQ (boost 2-4kHz for clarity, cut 200-400Hz for mud), add subtle reverb for cinematic depth.", prompt: "Describe the ideal audio mix settings for a [FILM GENRE] short film voiceover: EQ curve, compression settings, reverb type and wet/dry ratio, background music volume relative to voice (-12dB to -18dB?), and any special effects needed." },
  ]},
  "6": { title: "Video Creation", category: "PRODUCTION", readTime: "40 Min Read", description: "Produce AI-generated video sequences using Runway Gen-3, Pika Labs, and Kling AI. Animate still images and create fully generative video content.", author: { name: "Rajan Pillai", role: "AI Video Director" }, steps: [
    { title: "Runway Gen-3 Prompts", prose: "Runway excels at smooth camera movements and realistic physics. Use motion language like 'slow push in', 'orbit around', 'parallax drift'.", prompt: "Animate this scene: [DESCRIPTION]. Camera: [slow push in / gentle orbit / static / parallax drift]. Action: [subject movement]. Duration: [4/8/16] seconds. Mood: [atmospheric adjectives]. Lighting: [consistent with source image]. Style: [cinematic/commercial/documentary]." },
    { title: "Temporal Consistency", prose: "Maintaining consistency between video clips is critical. Use the same base image, same model settings, and overlapping keyframes.", prompt: "Create a shot transition plan for scenes [A] to [B]: describe the matching elements to preserve (lighting direction, color temperature, character position), the transition type (cut/dissolve/match cut), and Runway settings to maintain visual consistency." },
    { title: "Assembling the Timeline", prose: "Plan your edit before generating video. Know exactly what each clip needs to do, how long it should be, and how it connects to the next clip.", prompt: "Create a detailed video production timeline for a [X]-second video: List each clip (in, out, duration), shot type, audio element, transition type, and on-screen text overlay. Format as a production timeline spreadsheet." },
  ]},
  "7": { title: "Editing Process", category: "POST-PROD", readTime: "30 Min Read", description: "Master the AI film editing workflow using CapCut, DaVinci Resolve, and Premiere Pro. Cut, color grade, and deliver your AI film professionally.", author: { name: "Meera Bose", role: "Film Editor & Post-Production Specialist" }, steps: [
    { title: "Assembly Edit", prose: "First pass: lay all clips in sequence without any cuts. Watch it through once, then start making rough cuts based on pacing and story flow.", prompt: "Create an editing rhythm guide for [FILM TYPE]: recommended average shot length, when to use long takes vs quick cuts, pacing for different emotional beats (action=?, dialogue=?, contemplative=?), and transition style recommendations." },
    { title: "Color Grading", prose: "Color grading unifies AI-generated images that may have different color temperatures. Start with exposure and white balance, then apply a consistent LUT.", prompt: "Describe a color grading recipe for [VISUAL STYLE] film: primary correction targets, LUT recommendation, secondary grade (skin tones, sky, shadows), creative adjustments, and export settings for social media and cinema." },
    { title: "Sound Design", prose: "Layer ambient sound, foley, music, and voice for a full audio experience. Sound design often makes or breaks an AI film.", prompt: "Create a sound design breakdown for scene [X]: [VISUAL DESCRIPTION]. List: ambient sounds needed, foley elements, music mood and tempo, voice processing, and final mix levels for each element. Format as a mixing notes sheet." },
  ]},
  "8": { title: "Sound Design", category: "AUDIO", readTime: "25 Min Read", description: "Create immersive soundscapes using AI audio tools. Generate music, ambient sound, and foley using Suno, Udio, ElevenLabs Sound Effects, and Adobe Enhance.", author: { name: "Vikram Rao", role: "Sound Designer & Music Composer" }, steps: [
    { title: "Suno AI Music Generation", prose: "Suno generates complete songs including vocals, instruments, and production. For cinematic scores, use descriptive style prompts without lyrics.", prompt: "Suno prompt for cinematic score: [MOOD] orchestral film score, [INSTRUMENTS], [TEMPO] BPM, [KEY] key, inspired by [REFERENCE COMPOSER/FILM], no lyrics, [DURATION] minutes, builds from [SOFT] to [INTENSE], cinematic, [ADDITIONAL STYLE NOTES]." },
    { title: "Ambient Sound Design", prose: "Layer multiple ambient sounds to create depth: distant sounds (city hum, wind), mid-range sounds (crowd, water), and close sounds (breathing, fabric).", prompt: "Design an ambient soundscape for: [LOCATION/ENVIRONMENT]. List the sound layers needed (close/mid/distant), suggest free sound effects sources, describe the overall frequency balance (bass-heavy rain? treble-rich forest?), and the emotional effect." },
    { title: "Audio Mixing for AI Films", prose: "AI-generated voice and music often need EQ treatment to blend naturally. Cut competing frequencies, use sidechain compression to duck music under voice.", prompt: "Write mixing notes for an AI short film with: AI voiceover, Suno background music, and generated ambient sound. Specify: relative levels (dB), EQ adjustments needed, compression settings, reverb for each element, and automation suggestions for scene changes." },
  ]},
  "9": { title: "VFX Effects", category: "VFX", readTime: "35 Min Read", description: "Add stunning visual effects to your AI film using After Effects, RunwayML, and AI-powered compositing tools. From particle effects to scene integration.", author: { name: "Kiran Desai", role: "VFX Artist & Compositor" }, steps: [
    { title: "VFX Planning", prose: "Every VFX shot needs a plan. Know what the base plate is, what VFX elements are needed, and how they will composite together before you start generating.", prompt: "Create a VFX breakdown for scene [X]: [DESCRIPTION]. List: base plate description, VFX elements needed (particle, screen replacement, sky swap, etc.), compositing order (which layer goes where), difficulty level, and time estimate per shot." },
    { title: "RunwayML Compositing", prose: "Runway's Inpainting tool can add VFX elements directly into video. Remove objects, add fire, smoke, or light effects non-destructively.", prompt: "Describe the RunwayML workflow for adding [VFX EFFECT] to [SCENE]: inpaint mask description, generation prompt for the VFX element, blending mode, and integration tips. Include alternative After Effects workflow if RunwayML result is insufficient." },
    { title: "Final Composite & Delivery", prose: "Export your final composite at the highest quality settings. Deliver a master file plus optimized versions for different platforms.", prompt: "Create a final delivery checklist for an AI short film: master export settings (codec, resolution, bitrate), platform-specific exports (YouTube 4K, Instagram Reel, TikTok), color space settings, audio loudness targets (LUFS), and file naming convention." },
  ]},
};

const WORKFLOW_DATA = {
  title: "AI Filmmaking Masterclass",
  category: "MASTERCLASS",
  readTime: "45 Min Read",
  description: "Master the complete AI filmmaking pipeline from concept to final cut. Learn how to use cutting-edge AI tools to generate scripts, create visuals, add voiceovers, and produce a professional-quality short film.",
  author: { name: "Rahul Sharma", role: "AI Film Director & Instructor" },
  steps: [
    {
      title: "Concept & Idea Generation",
      prose: "Begin by defining your film's core concept. Use AI to brainstorm unique story ideas, identify your target audience, and craft a compelling premise that will resonate with viewers.",
      prompt: `Generate 5 unique short film concepts for a 3-minute film about human connection in the digital age. For each concept, provide:
1) A one-line premise
2) The emotional hook
3) The visual style
4) Key AI tools needed
Focus on concepts that can be produced entirely with AI tools.`,
    },
    {
      title: "Script Writing with AI",
      prose: "Transform your concept into a compelling script using AI assistance. Structure your narrative with a clear beginning, middle, and end, ensuring each scene serves the story.",
      prompt: `Write a 3-minute short film script about [YOUR CONCEPT]. Structure it as follows:
- ACT 1 (30 sec): Establish character and world
- ACT 2 (90 sec): Conflict and escalation
- ACT 3 (60 sec): Resolution and impact
Include scene descriptions, dialogue, and visual cues for AI generation.`,
    },
    {
      title: "Visual Generation & Storyboarding",
      prose: "Create stunning visuals using Midjourney, Stable Diffusion, or similar tools. Generate consistent character images, backgrounds, and key scenes that match your script.",
      prompt: `Midjourney prompt for cinematic scene: [SCENE DESCRIPTION], film photography style, anamorphic lens, 4K resolution, professional lighting, [COLOR GRADING STYLE], photorealistic, ultra detailed, --ar 16:9 --style raw --v 6`,
    },
    {
      title: "Voiceover & Sound Design",
      prose: "Add professional-quality narration and sound effects using AI voice generation tools like ElevenLabs. Create an immersive audio landscape that complements your visuals.",
      prompt: `Generate a professional voiceover script for this scene: [SCENE DESCRIPTION].
Tone: [EMOTIONAL TONE]. Pace: measured and thoughtful.
Include: natural pauses [pause], emphasis on key words [*word*], and breathing points.
Duration: approximately 30 seconds when read aloud.`,
    },
    {
      title: "Final Edit & Export",
      prose: "Combine all elements in your editing software. Use AI upscaling tools to enhance video quality, add color grading, and export in the appropriate format for your distribution platform.",
      prompt: `Create a color grading LUT description for this film style: [VISUAL STYLE].
Specify: shadow lift, highlight roll-off, midtone contrast, hue rotation for skin tones, saturation curve, and grain overlay settings.
Target aesthetic: [REFERENCE FILMS].`,
    },
  ],
};

export default function WorkflowDetail() {
  const [completed, setCompleted] = useState([]);
  const [voiceScript, setVoiceScript] = useState("");
  const [copied, setCopied] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const data = WORKFLOW_LIBRARY[id] || WORKFLOW_DATA;

  const markComplete = (i) => {
    setCompleted(c => c.includes(i) ? c.filter(x => x !== i) : [...c, i]);
  };

  const copyPrompt = (prompt, i) => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(i);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const progress = data.steps.length > 0 ? completed.length / data.steps.length : 0;
  const r = 40;
  const circumference = 2 * Math.PI * r;

  return (
    <div className="bg-[#0B0F10] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex gap-8">

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-5 text-xs text-gray-500">
              <button onClick={() => navigate(-1)} className="hover:text-white transition-all">← Back</button>
              <span>·</span>
              <span className="font-bold text-[#C7E36B]">{data.category}</span>
              <span>·</span>
              <span>{data.readTime}</span>
            </div>

            {/* Hero */}
            <h1 className="text-3xl font-black text-white mb-4">{data.title}</h1>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-2xl">{data.description}</p>

            {/* Author card */}
            <div className="inline-flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl mb-10">
              <div className="w-10 h-10 rounded-full bg-[#C7E36B] flex items-center justify-center text-black font-black text-lg">
                {data.author.name[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{data.author.name}</p>
                <p className="text-xs text-gray-400">{data.author.role}</p>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-10">
              {data.steps.map((step, i) => (
                <div key={i} id={`step-${i}`} className="scroll-mt-24">
                  <div className="flex items-start gap-5">
                    {/* Step circle */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-black transition-all ${completed.includes(i) ? "bg-[#C7E36B] text-black" : "bg-white/10 text-white"}`}>
                      {completed.includes(i) ? "✓" : i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-bold text-white mb-3">{step.title}</h2>
                      <p className="text-gray-400 text-sm leading-relaxed mb-5">{step.prose}</p>

                      {/* MASTER PROMPT box */}
                      <div className="bg-[#0F1112] border border-white/10 rounded-xl mb-5 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
                          <span className="text-[10px] font-bold text-[#C7E36B] uppercase tracking-wider">MASTER PROMPT</span>
                          <button onClick={() => copyPrompt(step.prompt, i)}
                            className="flex items-center gap-1.5 text-[10px] text-gray-400 hover:text-white transition-all">
                            {copied === i
                              ? <span className="text-green-400">✓ Copied!</span>
                              : "📋 Copy"}
                          </button>
                        </div>
                        <pre className="px-4 py-4 text-xs text-gray-300 font-mono whitespace-pre-wrap leading-relaxed">{step.prompt}</pre>
                      </div>

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

            {/* Generate VO Script */}
            <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#C7E36B]/20 rounded-xl flex items-center justify-center text-xl">🎙</div>
                <div>
                  <h3 className="text-base font-bold text-white">Generate VO Script</h3>
                  <p className="text-xs text-gray-400">Auto-generate a voiceover script from your film concept</p>
                </div>
              </div>
              <textarea value={voiceScript} onChange={e => setVoiceScript(e.target.value)}
                placeholder="Describe your film concept here and we'll generate a professional VO script..."
                rows={4}
                className="w-full bg-[#1A1D1E] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#C7E36B]/50 resize-none placeholder-gray-600 mb-3" />
              <button className="bg-[#C7E36B] text-black font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-lime-300 transition-all flex items-center gap-2">
                🎙 Generate Script
              </button>
            </div>

            {/* Certificate CTA */}
            {completed.length === data.steps.length ? (
              <div className="mt-8 bg-gradient-to-r from-[#C7E36B]/20 to-[#C7E36B]/5 border border-[#C7E36B]/30 rounded-2xl p-8 text-center">
                <p className="text-3xl mb-3">🎓</p>
                <h3 className="text-xl font-bold text-white mb-2">Ready to Export?</h3>
                <p className="text-sm text-gray-400 mb-5">You've completed all {data.steps.length} steps! Claim your certificate.</p>
                <button className="bg-[#C7E36B] text-black font-bold px-8 py-3 rounded-xl hover:bg-lime-300 transition-all text-sm">
                  Claim Your Certificate →
                </button>
              </div>
            ) : (
              <div className="mt-8 bg-white/3 border border-white/8 rounded-2xl p-6">
                <p className="text-sm text-gray-500 mb-3">
                  Complete all {data.steps.length} steps to claim your certificate
                  · <span className="text-white font-semibold">{completed.length} / {data.steps.length} done</span>
                </p>
                <div className="w-full bg-white/10 rounded-full h-1.5">
                  <div className="bg-[#C7E36B] h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${(completed.length / data.steps.length) * 100}%` }} />
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="w-[280px] shrink-0">
            <div className="sticky top-24 space-y-4">

              {/* Progress ring */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <svg width="100" height="100" viewBox="0 0 100 100" className="mx-auto mb-3">
                  <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                  <circle cx="50" cy="50" r={r} fill="none" stroke="#C7E36B" strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - progress)}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    style={{ transition: "stroke-dashoffset 0.5s ease" }}
                  />
                  <text x="50" y="55" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
                    {Math.round(progress * 100)}%
                  </text>
                </svg>
                <p className="text-sm font-semibold text-white">{completed.length} / {data.steps.length} Steps Done</p>
                <p className="text-xs text-gray-400 mt-0.5">Keep going!</p>
              </div>

              {/* Contents list */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Contents</p>
                <div className="space-y-0.5">
                  {data.steps.map((step, i) => (
                    <a key={i} href={`#step-${i}`}
                      className={`flex items-center gap-2.5 text-xs py-2 px-2 rounded-lg hover:bg-white/5 transition-all ${completed.includes(i) ? "text-[#C7E36B]" : "text-gray-400 hover:text-white"}`}>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[8px] shrink-0 ${completed.includes(i) ? "bg-[#C7E36B] border-[#C7E36B] text-black font-black" : "border-white/30"}`}>
                        {completed.includes(i) ? "✓" : i + 1}
                      </span>
                      <span className="line-clamp-1">{step.title}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Book Office Hours */}
              <button className="w-full bg-white/10 border border-white/15 text-white font-semibold text-sm py-3 rounded-xl hover:bg-white/15 transition-all flex items-center justify-center gap-2">
                📅 Book Office Hours
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
