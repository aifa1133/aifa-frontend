"use client";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PROJECT_DATA = {
  title: "AI Commercial Product Ad",
  categories: ["FILMMAKING", "PRODUCT AD"],
  description: "A complete walkthrough for producing a cinematic product advertisement using AI tools. From concept to final export, learn the entire pipeline for creating studio-quality commercial ads.",
  banner: "/workflow/workflow1.png",
  author: { name: "Priya Mehta", role: "Creative Director", views: "2.4k", replications: "187", published: "Nov 2024" },
  stats: [
    { label: "Time", value: "3–5 Days" },
    { label: "Difficulty", value: "Intermediate" },
    { label: "Tools", value: "5 AI Tools" },
  ],
  steps: [
    {
      title: "Brief & Concept",
      description: "Define the product, target audience, and key message. Create a mood board using reference images.",
      prompt: `You are a creative director for a luxury brand. Create a detailed creative brief for a 30-second product commercial.
Product: [PRODUCT NAME]
Target audience: [DEMOGRAPHICS]
Key message: [SINGLE KEY BENEFIT]
Visual style: [STYLE REFERENCE]
Include: hero shot description, supporting scenes, CTA.`,
    },
    {
      title: "Visual Generation",
      description: "Generate hero product shots and lifestyle images using Midjourney or Stable Diffusion.",
      prompt: `Product photography prompt: [PRODUCT] on [SURFACE], studio lighting, white seamless background, 8K resolution, professional product photography, specular highlights, depth of field, --ar 1:1 --style raw --v 6`,
    },
    {
      title: "Motion & Animation",
      description: "Animate still images using Runway Gen-3 or Kling AI. Create smooth product reveals and transitions.",
      prompt: `Animate this product image: slow 360-degree rotation, subtle zoom in 2%, soft bokeh background transition, studio lighting maintained throughout, 4 second loop, professional commercial feel.`,
    },
    {
      title: "Voiceover & Music",
      description: "Generate a professional voiceover using ElevenLabs. Layer with royalty-free background music.",
      prompt: `Professional commercial voiceover script for [PRODUCT], 30-second format:
- Opening hook (5 sec)
- Problem statement (5 sec)
- Product introduction (10 sec)
- Key benefits ×3 (10 sec)
- CTA (5 sec)
Tone: confident, aspirational. Target: urban professionals 25–40.`,
    },
    {
      title: "Final Edit & Delivery",
      description: "Combine all elements in CapCut or Premiere Pro. Export in multiple formats for different platforms.",
      prompt: `Color grading style for luxury product commercial: rich shadows with warm undertones, clean highlights preserving product detail, subtle film grain 15%, vignette 20% opacity, temperature +200K warm, teal-orange complementary palette for skin tones and shadows.`,
    },
  ],
  assets: [
    { name: "Project Brief Template.pdf", size: "240 KB" },
    { name: "Midjourney Prompts Pack.txt", size: "18 KB" },
    { name: "Color LUTs Collection.zip", size: "4.2 MB" },
    { name: "Sound Effects Library.zip", size: "88 MB" },
  ],
  similar: [
    { title: "AI Music Video Production", img: "/workflow/workflow2.png" },
    { title: "Documentary Filmmaking", img: "/workflow/workflow3.png" },
  ],
};

const PROJECT_LIBRARY = {
  "1": { title:"Luxury Perfume Ad", categories:["COMMERCIAL","VFX"], description:"A cinematic AI-generated commercial for a luxury fragrance brand using Midjourney and Runway Gen-2.", banner:"/workflow/workflow1.png", author:{name:"Priya Mehta",role:"Creative Director",views:"2.4k",replications:"187",published:"Nov 2024"}, stats:[{label:"Time",value:"3–5 Days"},{label:"Difficulty",value:"Intermediate"},{label:"Tools",value:"5 AI Tools"}], steps:[{title:"Concept & Moodboard",description:"Define the fragrance character and visual identity. Collect cinematic reference stills.",prompt:"Create a moodboard brief for a luxury perfume brand targeting urban professionals 25–40. Include color palette (deep jewel tones), lighting style (dramatic chiaroscuro), and 3 scene directions."},{title:"Hero Shot Generation",description:"Generate the hero product image using Midjourney with studio lighting.",prompt:"Ultra-luxury perfume bottle on black marble, golden liquid, dramatic side lighting, bokeh with gold dust particles, editorial photography, 4K --ar 4:5 --style raw --v 6"},{title:"Motion Reveal",description:"Animate the hero shot using Runway Gen-3 for a cinematic product reveal.",prompt:"Slow 360-degree bottle rotation, particle dust rising, soft bokeh transitions, studio lighting maintained, 4-second loop, luxury commercial feel."},{title:"Voiceover & Scent Story",description:"Generate evocative VO using ElevenLabs with a deep, aspirational tone.",prompt:"Luxury perfume 30-second VO: opening mood hook (5s), ingredient story (10s), emotional promise (10s), brand CTA (5s). Tone: whispered luxury, aspirational."},{title:"Final Edit",description:"Composite all elements in CapCut/Premiere and export for social + broadcast.",prompt:"Color grade: deep shadows with warm gold undertones, clean product highlights, subtle film grain 10%, teal-orange palette, vignette 15%."}], assets:[{name:"Perfume Brief Template.pdf",size:"240 KB"},{name:"Midjourney Prompts Pack.txt",size:"18 KB"},{name:"Color LUTs.zip",size:"4.2 MB"}], similar:[{title:"Fashion Lookbook Video",img:"/workflow/workflow7.png"},{title:"Product Launch Reel",img:"/workflow/workflow4.png"}] },
  "2": { title:"Cyberpunk Music Video", categories:["MUSIC VIDEO","AI FILM"], description:"Futuristic music video with Stable Diffusion visuals and AI-synced lip animations for an indie artist.", banner:"/workflow/workflow2.png", author:{name:"Arjun Sinha",role:"AI Director",views:"3.1k",replications:"214",published:"Dec 2024"}, stats:[{label:"Time",value:"5–7 Days"},{label:"Difficulty",value:"Advanced"},{label:"Tools",value:"6 AI Tools"}], steps:[{title:"Track Analysis",description:"Break the track into sections and map visual concepts to musical moments.",prompt:"Analyze this music track [TITLE] for visual storytelling: list the 5 key emotional moments, suggest a visual metaphor for each, identify the BPM and recommend cut frequency per section."},{title:"Character Design",description:"Design a consistent cyberpunk protagonist using Stable Diffusion with style locking.",prompt:"Cyberpunk female protagonist, neon-lit dystopian city, chrome exoskeleton jacket, electric blue eyes, rain-drenched setting, cinematic 35mm, consistent character seed, --ar 2:3 --style raw"},{title:"Scene Generation",description:"Generate city environments and key scenes using Midjourney.",prompt:"Cyberpunk mega-city street, neon signs Japanese + Hindi, rain-slicked asphalt reflecting holographic ads, blade runner aesthetic, anamorphic lens, --ar 21:9 --v 6"},{title:"Lip Sync Animation",description:"Sync character to vocal track using D-ID or Hedra.",prompt:"Apply lip sync animation to character still: match phonemes to audio track, maintain eye blink and subtle head movement, 24fps output, preserve background depth."},{title:"Edit & Grade",description:"Cut to music, add VFX overlays, and grade for neon-noir look.",prompt:"Color grade: deep blacks, electric cyan and magenta highlights, anamorphic lens flare overlays, chromatic aberration edges, film grain 20%, high contrast."}], assets:[{name:"Track Analysis Template.pdf",size:"180 KB"},{name:"SD Character Prompts.txt",size:"12 KB"},{name:"VFX Overlays.zip",size:"120 MB"}], similar:[{title:"AI Horror Film Teaser",img:"/workflow/workflow5.png"},{title:"AI Travel Documentary",img:"/workflow/workflow6.png"}] },
  "3": { title:"Sci-Fi Cinematic Short", categories:["AI FILM","EDITING"], description:"3-minute AI short film with consistent characters, generative environments, and AI-scored music.", banner:"/workflow/workflow3.png", author:{name:"Kavya Reddy",role:"Film Director",views:"4.2k",replications:"298",published:"Jan 2025"}, stats:[{label:"Time",value:"7–10 Days"},{label:"Difficulty",value:"Advanced"},{label:"Tools",value:"7 AI Tools"}], steps:[{title:"Script & Storyboard",description:"Write a 3-minute script with 8–10 scenes. Create an AI storyboard.",prompt:"Write a 3-minute sci-fi short film script. Setting: abandoned space station 2087. Theme: loneliness vs connection. Include: opening image, inciting incident, midpoint, climax, resolution. Format: scene heading, action, dialogue."},{title:"Character Creation",description:"Design a consistent hero character using ComfyUI with LoRA fine-tuning.",prompt:"Sci-fi protagonist, female astronaut, worn orange spacesuit, tired determined eyes, inside a dark space station corridor, emergency red lighting, cinematic composition, 8K --ar 2:3 --style raw"},{title:"Environment Generation",description:"Build all 5 locations as full-frame environment stills.",prompt:"Interior of abandoned deep-space research station, curved white corridors, broken LED strips, floating debris, emergency lighting, extreme detail, photorealistic, --ar 21:9 --v 6"},{title:"Scene Animation",description:"Animate hero shots and environments using Runway Gen-3 Alpha.",prompt:"Animate space station corridor: subtle floating debris, emergency light flicker, protagonist slow walk into frame, camera dolly forward 3%, 6-second shot, cinematic 24fps."},{title:"Music & Sound Design",description:"Score using Suno AI, add space ambience and sound effects.",prompt:"Compose orchestral sci-fi score, theme: hope in isolation, 3 minutes, 5 movements matching script structure. Instrumentation: strings, subtle synth, solo piano motif. Export stems separately."}], assets:[{name:"Script Template.pdf",size:"320 KB"},{name:"Character LoRA Guide.pdf",size:"2.1 MB"},{name:"Scene Breakdown Sheet.xlsx",size:"45 KB"}], similar:[{title:"AI Travel Documentary",img:"/workflow/workflow6.png"},{title:"Animated Kids Story",img:"/workflow/workflow8.png"}] },
  "4": { title:"Product Launch Reel", categories:["COMMERCIAL","EDITING"], description:"60-second product reveal reel built entirely with AI tools — script, visuals, voiceover, and edit.", banner:"/workflow/workflow4.png", author:{name:"Priya Mehta",role:"Creative Director",views:"1.8k",replications:"142",published:"Oct 2024"}, stats:[{label:"Time",value:"2–3 Days"},{label:"Difficulty",value:"Beginner"},{label:"Tools",value:"4 AI Tools"}], steps:[{title:"Product Brief",description:"Define the product's hero feature and target customer's pain point.",prompt:"Create a 60-second product launch brief: product name, single hero feature, target customer profile, 3 pain points solved, desired emotional response, CTA."},{title:"Visual Storyboard",description:"Generate 6 key frames: product reveal, benefit demo, lifestyle shots.",prompt:"[PRODUCT] hero reveal shot, floating on gradient background, dramatic uplighting, premium materials visible, 4K commercial photography, clean and minimal --ar 16:9 --style raw"},{title:"Script & VO",description:"Write punchy 60-second script and generate VO.",prompt:"60-second product launch script. Structure: hook (5s), problem (10s), product reveal (10s), 3 features (15s), social proof (10s), CTA (10s). Tone: confident, exciting."},{title:"Edit & Motion",description:"Cut product shots to music, add kinetic text overlays.",prompt:"Product reveal animation: slide in from right, 0.3s ease, hold 1s, subtle scale 1.02 breathe effect, exit slide left, professional commercial pacing."},{title:"Multi-Platform Export",description:"Export 16:9, 9:16, and 1:1 versions for all platforms.",prompt:"Reframe this 16:9 commercial for 9:16 vertical: keep product in frame center-bottom, reposition text to top third, adjust safe zones for platform UI overlays."}], assets:[{name:"Launch Reel Template.pdf",size:"180 KB"},{name:"Product Prompts.txt",size:"8 KB"},{name:"Aspect Ratio Guide.pdf",size:"560 KB"}], similar:[{title:"Luxury Perfume Ad",img:"/workflow/workflow1.png"},{title:"Fashion Lookbook Video",img:"/workflow/workflow7.png"}] },
  "5": { title:"AI Horror Film Teaser", categories:["AI FILM","VFX"], description:"Dark atmospheric horror teaser using Pika Labs for motion and ElevenLabs for a spine-chilling narration.", banner:"/workflow/workflow5.png", author:{name:"Rohan Das",role:"VFX Artist",views:"5.7k",replications:"412",published:"Oct 2024"}, stats:[{label:"Time",value:"3–4 Days"},{label:"Difficulty",value:"Intermediate"},{label:"Tools",value:"5 AI Tools"}], steps:[{title:"Horror Concept",description:"Define the monster, setting, and the one moment of maximum dread.",prompt:"Horror teaser concept brief: the monster (never fully shown), the forbidden location, the protagonist's fatal mistake, and the single devastating final image. Max 100 words."},{title:"Environment Generation",description:"Create dark, oppressive environments using Midjourney.",prompt:"Abandoned Victorian asylum corridor at night, peeling walls, broken flickering lights, fog rolling in, extreme shadow contrast, POV camera angle, unsettling, photorealistic --ar 21:9 --v 6"},{title:"Motion & Atmosphere",description:"Animate stills with slow ominous motion using Pika Labs.",prompt:"Animate asylum corridor: slow forward dolly 1%, lights flicker 3× in 8 seconds, shadows deepen at edges, subtle fog movement, maintain horror atmosphere throughout."},{title:"Sound & Narration",description:"Generate spine-chilling VO and horror soundscape.",prompt:"Horror teaser narration, 30 seconds: opening silence (3s), whispered hook line (5s), tension build (15s), shocking revelation (5s), blackout with sound sting (2s). Tone: terrifying yet intriguing."},{title:"Color & Grade",description:"Push the grade to maximum darkness with a single desaturated look.",prompt:"Horror grade: near-total desaturation, deep crushed blacks, single cool blue highlight source, green mold highlights in shadows, extreme vignette, 35mm film grain 30%."}], assets:[{name:"Horror Brief Template.pdf",size:"150 KB"},{name:"Atmosphere Prompts.txt",size:"10 KB"},{name:"Horror SFX Pack.zip",size:"65 MB"}], similar:[{title:"Cyberpunk Music Video",img:"/workflow/workflow2.png"},{title:"Sci-Fi Cinematic Short",img:"/workflow/workflow3.png"}] },
  "6": { title:"AI Travel Documentary", categories:["DOCUMENTARY","AI FILM"], description:"Immersive travel doc spanning 5 locations, generated entirely using AI tools and narrated with AI voice.", banner:"/workflow/workflow6.png", author:{name:"Ananya Bose",role:"Documentary Director",views:"3.4k",replications:"187",published:"Nov 2024"}, stats:[{label:"Time",value:"5–6 Days"},{label:"Difficulty",value:"Intermediate"},{label:"Tools",value:"6 AI Tools"}], steps:[{title:"Location Research",description:"Define 5 locations with distinct visual and cultural identities.",prompt:"Travel documentary location brief: for each of 5 locations list the golden-hour window, 3 iconic visual elements, local cultural moment to capture, and the single emotion the viewer should feel."},{title:"Environment Generation",description:"Generate photorealistic establishing shots for each location.",prompt:"Golden hour aerial view of [LOCATION], warm orange light, dramatic landscape, photorealistic, National Geographic style, sharp foreground, soft background depth, --ar 21:9 --v 6"},{title:"Cultural Scenes",description:"Generate human-scale cultural interaction shots.",prompt:"Street-level documentary photography, [LOCATION] local market at dawn, candid expressions, soft natural light, 35mm film aesthetic, authentic, --ar 3:2 --style raw"},{title:"Narration & Music",description:"Write and generate a documentary VO script with world music score.",prompt:"Travel documentary narration for [LOCATION] segment, 90 seconds: sense of place opening (15s), cultural context (30s), personal human story (30s), transition to next location (15s). Tone: warm, curious, respectful."},{title:"Documentary Edit",description:"Assemble the 5-location sequence with cross-fade transitions and titles.",prompt:"Documentary color grade: warm natural palette, preserve skin tones, slight desaturation in shadows, gentle film emulation, no heavy effects — keep it feeling real."}], assets:[{name:"Documentary Treatment.pdf",size:"280 KB"},{name:"Location Prompts.txt",size:"14 KB"},{name:"World Music Tracks.zip",size:"45 MB"}], similar:[{title:"Sci-Fi Cinematic Short",img:"/workflow/workflow3.png"},{title:"Animated Kids Story",img:"/workflow/workflow8.png"}] },
  "7": { title:"Fashion Lookbook Video", categories:["COMMERCIAL","EDITING"], description:"High-fashion lookbook video using Midjourney model generations and CapCut AI transitions.", banner:"/workflow/workflow7.png", author:{name:"Ishaan Kapoor",role:"Fashion Film Director",views:"2.1k",replications:"156",published:"Dec 2024"}, stats:[{label:"Time",value:"2–4 Days"},{label:"Difficulty",value:"Beginner"},{label:"Tools",value:"4 AI Tools"}], steps:[{title:"Collection Brief",description:"Define the collection's theme, target customer, and mood reference.",prompt:"Fashion lookbook brief: collection name, season, 3-word mood descriptor, target customer archetype, color palette (3 colors), 2 photographer references, editorial vs commercial?"},{title:"Model & Outfit Generation",description:"Generate consistent editorial model shots for each look.",prompt:"Editorial fashion photography, female model, [OUTFIT DESCRIPTION], studio seamless white background, dramatic side lighting, high fashion Vogue aesthetic, full body shot, 8K --ar 2:3 --style raw"},{title:"Location & Lifestyle Shots",description:"Generate outdoor and lifestyle context shots.",prompt:"Fashion editorial outdoor lifestyle shot, model in [OUTFIT] in [LOCATION], natural golden hour light, candid movement, editorial magazine quality, 35mm film, --ar 2:3 --style raw"},{title:"Transition Edit",description:"Cut between looks using CapCut AI transitions matched to the music.",prompt:"Fashion video pacing guide: intro reveal (3s), look 1-4 sequence (4s each), brand moment (5s), closing shot (5s). Music BPM: 128. Cut on beat. Use whip-pan and flash transitions."},{title:"Brand Identity",description:"Add logo, font treatments, and color grade for brand consistency.",prompt:"Fashion brand color grade: clean whites, neutral skin preservation, slight film grain 8%, warm shadows with brand color accent highlights, editorial magazine feel."}], assets:[{name:"Lookbook Brief Template.pdf",size:"200 KB"},{name:"Fashion Prompts Pack.txt",size:"16 KB"},{name:"Transition Templates.capcut",size:"12 MB"}], similar:[{title:"Product Launch Reel",img:"/workflow/workflow4.png"},{title:"Luxury Perfume Ad",img:"/workflow/workflow1.png"}] },
  "8": { title:"Animated Kids Story", categories:["ANIMATION","AI FILM"], description:"Fully AI-animated children's story with consistent characters, background music, and voiceover.", banner:"/workflow/workflow8.png", author:{name:"Meera Pillai",role:"Animation Director",views:"6.2k",replications:"534",published:"Jan 2025"}, stats:[{label:"Time",value:"5–8 Days"},{label:"Difficulty",value:"Intermediate"},{label:"Tools",value:"6 AI Tools"}], steps:[{title:"Story & Characters",description:"Write a simple 5-scene story with a hero, helper, and obstacle.",prompt:"Children's animated story brief: 5-scene structure (introduction, problem, adventure, solution, happy ending), 2 main characters with distinct visual traits, 1 magical object, moral of the story. Age group: 4–8."},{title:"Character Sheets",description:"Design each character with front, side, and expression views.",prompt:"Children's animated character: [CHARACTER NAME], round friendly shape, large expressive eyes, bright saturated colors, Pixar-inspired style, consistent design, white background, full body with 3 expressions: happy, surprised, determined --ar 3:2"},{title:"Background Environments",description:"Generate 5 distinct background environments for each scene.",prompt:"Children's animated background, [SCENE DESCRIPTION], bright warm colors, safe and inviting, detailed but not cluttered, no characters, Studio Ghibli-inspired painterly style, --ar 16:9 --v 6"},{title:"Animation & Voiceover",description:"Animate character movements and sync with child-friendly VO.",prompt:"Children's story narration for [SCENE], warm and engaging, simple vocabulary for age 4–8, 30-second segment, clear pronunciation, storytelling rhythm with pauses. Include narrator and character voices."},{title:"Music & Sound",description:"Add cheerful background score and sound effects throughout.",prompt:"Children's animated film score for [SCENE TYPE]: playful orchestral, major key, simple melody children can hum, 30-second loop, instrumentation: xylophone lead, pizzicato strings, soft percussion."}], assets:[{name:"Story Template.pdf",size:"240 KB"},{name:"Character Design Guide.pdf",size:"1.8 MB"},{name:"Kid-Safe SFX Pack.zip",size:"35 MB"}], similar:[{title:"Sci-Fi Cinematic Short",img:"/workflow/workflow3.png"},{title:"AI Travel Documentary",img:"/workflow/workflow6.png"}] },
  "9": { title:"Corporate Brand Film", categories:["COMMERCIAL","EDITING"], description:"Professional 2-minute brand film for a tech company, created end-to-end with AI filmmaking tools.", banner:"/workflow/workflow9.png", author:{name:"Vikram Nair",role:"Brand Director",views:"1.5k",replications:"98",published:"Feb 2025"}, stats:[{label:"Time",value:"4–6 Days"},{label:"Difficulty",value:"Intermediate"},{label:"Tools",value:"5 AI Tools"}], steps:[{title:"Brand Story",description:"Define the company's origin, mission, and transformation narrative.",prompt:"Corporate brand film story brief: company founding moment, the problem they solve, who their customers are, their vision for 5 years from now, and the single emotion they want viewers to feel."},{title:"Visual Language",description:"Create a consistent visual identity for the brand film.",prompt:"Corporate tech brand film visual: modern office environment, diverse team collaborating, natural window light, clean minimal aesthetic, authentic candid style, no stock photo feel, 4K --ar 16:9 --style raw"},{title:"Team & Culture Shots",description:"Generate team photography showing culture and values.",prompt:"Corporate team photo, diverse professionals in modern tech office, collaborative moment, genuine smiles, branded environment, professional natural lighting, editorial style --ar 16:9 --style raw"},{title:"Narration & Brand VO",description:"Write and record the 2-minute brand story narration.",prompt:"Corporate brand film script, 2 minutes: company origin hook (20s), problem we solve (30s), our approach (30s), team and culture (20s), vision and impact (15s), CTA (5s). Tone: confident, human, inspiring."},{title:"Brand Edit & Grade",description:"Assemble with kinetic text, logo animations, and brand color grade.",prompt:"Corporate brand color grade: clean neutral palette, slight warm push for human warmth, preserve brand colors accurately, subtle vignette, professional broadcast quality, no creative excess."}], assets:[{name:"Brand Film Brief.pdf",size:"320 KB"},{name:"Corporate Prompts.txt",size:"10 KB"},{name:"Brand Kit Template.zip",size:"8 MB"}], similar:[{title:"Product Launch Reel",img:"/workflow/workflow4.png"},{title:"Fashion Lookbook Video",img:"/workflow/workflow7.png"}] },
};

export default function ProjectDetail() {
  const [completed, setCompleted] = useState([]);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const PROJECT_DATA = PROJECT_LIBRARY[id] || PROJECT_LIBRARY["1"];

  const markComplete = (i) => {
    setCompleted(c => c.includes(i) ? c.filter(x => x !== i) : [...c, i]);
  };

  const copyPrompt = (prompt, i) => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(i);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <div className="bg-[#0B0F10] text-white min-h-screen">

      {/* ── Hero banner ── */}
      <div className="relative h-[300px] overflow-hidden">
        <img src={PROJECT_DATA.banner} alt="banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <div className="max-w-7xl mx-auto w-full">
            <button onClick={() => navigate(-1)} className="text-xs text-gray-400 hover:text-white mb-4 flex items-center gap-1 transition-all">
              ← Back to Projects
            </button>
            <div className="flex gap-2 mb-3">
              {PROJECT_DATA.categories.map(c => (
                <span key={c} className="text-[10px] font-bold bg-[#C7E36B] text-black px-2.5 py-0.5 rounded-full">{c}</span>
              ))}
            </div>
            <h1 className="text-3xl font-black text-white mb-3">{PROJECT_DATA.title}</h1>
            <p className="text-gray-300 text-sm max-w-2xl mb-5">{PROJECT_DATA.description}</p>
            <div className="flex gap-3">
              <button className="bg-[#C7E36B] text-black font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-lime-300 transition-all">
                ↗ View Workflow
              </button>
              <button className="bg-white/20 text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-white/30 transition-all backdrop-blur-sm">
                Use Prompts
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">

          {/* Main */}
          <div className="flex-1 min-w-0">

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {PROJECT_DATA.stats.map(s => (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-1">{s.label}</p>
                  <p className="text-base font-bold text-white">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Process Breakdown */}
            <h2 className="text-lg font-bold text-white mb-5">Process Breakdown</h2>
            <div className="space-y-8">
              {PROJECT_DATA.steps.map((step, i) => (
                <div key={i} id={`pstep-${i}`} className="border-l-4 border-yellow-500/50 pl-6 scroll-mt-24">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-wider">STEP {i + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-5">{step.description}</p>

                  {/* Master Prompt */}
                  <div className="bg-[#0F1112] border border-white/10 rounded-xl mb-4 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
                      <span className="text-[10px] font-bold text-[#C7E36B] uppercase tracking-wider">MASTER PROMPT</span>
                      <button onClick={() => copyPrompt(step.prompt, i)}
                        className="text-[10px] text-gray-400 hover:text-white flex items-center gap-1 transition-all">
                        {copied === i ? <span className="text-green-400">✓ Copied!</span> : "📋 Copy"}
                      </button>
                    </div>
                    <pre className="px-4 py-4 text-xs text-gray-300 font-mono whitespace-pre-wrap leading-relaxed">{step.prompt}</pre>
                  </div>

                  <button onClick={() => markComplete(i)}
                    className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all border ${completed.includes(i)
                      ? "border-[#C7E36B]/40 bg-[#C7E36B]/10 text-[#C7E36B]"
                      : "border-white/15 bg-white/5 text-gray-300 hover:bg-white/10"}`}>
                    {completed.includes(i) ? "✓ Step Complete" : `Mark Step ${i + 1} Complete`}
                  </button>
                </div>
              ))}
            </div>

            {/* Project Assets */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">Project Assets</h2>
                <button className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300 flex items-center gap-1.5 transition-all">
                  ↓ Download All (.zip)
                </button>
              </div>
              <div className="space-y-2">
                {PROJECT_DATA.assets.map((asset, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:border-white/20 transition-all">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📄</span>
                      <div>
                        <p className="text-sm font-semibold text-white">{asset.name}</p>
                        <p className="text-[10px] text-gray-500">{asset.size}</p>
                      </div>
                    </div>
                    <button className="text-xs text-[#C7E36B] hover:underline flex items-center gap-1">↓ Download</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-[280px] shrink-0">
            <div className="sticky top-24 space-y-4">

              {/* Author card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#C7E36B] flex items-center justify-center text-black font-black text-lg">
                    {PROJECT_DATA.author.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{PROJECT_DATA.author.name}</p>
                    <p className="text-xs text-gray-400">{PROJECT_DATA.author.role}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[["Views", PROJECT_DATA.author.views], ["Replications", PROJECT_DATA.author.replications], ["Published", PROJECT_DATA.author.published]].map(([l, v]) => (
                    <div key={l} className="text-center bg-white/5 rounded-lg p-2">
                      <p className="text-xs font-bold text-white">{v}</p>
                      <p className="text-[9px] text-gray-500 mt-0.5">{l}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setSaved(!saved)}
                    className={`flex-1 text-xs font-semibold py-2 rounded-lg border transition-all ${saved ? "border-[#C7E36B] text-[#C7E36B] bg-[#C7E36B]/10" : "border-white/20 text-gray-300 hover:bg-white/5"}`}>
                    {saved ? "✓ Saved" : "Save Project"}
                  </button>
                  <button className="flex-1 text-xs font-semibold py-2 rounded-lg border border-white/20 text-gray-300 hover:bg-white/5 transition-all">
                    Share
                  </button>
                </div>
              </div>

              {/* Quick Navigation */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Quick Navigation</p>
                <div className="space-y-0.5">
                  {PROJECT_DATA.steps.map((step, i) => (
                    <a key={i} href={`#pstep-${i}`}
                      className={`flex items-center gap-2 text-xs py-1.5 px-2 rounded-lg hover:bg-white/5 transition-all ${completed.includes(i) ? "text-[#C7E36B]" : "text-gray-400 hover:text-white"}`}>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[8px] shrink-0 ${completed.includes(i) ? "bg-[#C7E36B] border-[#C7E36B] text-black font-black" : "border-white/30"}`}>
                        {completed.includes(i) ? "✓" : i + 1}
                      </span>
                      <span className="line-clamp-1">{step.title}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Similar Projects */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Similar Projects</p>
                <div className="space-y-3">
                  {PROJECT_DATA.similar.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-all">
                      <img src={p.img} alt={p.title} className="w-14 h-10 object-cover rounded-lg" />
                      <p className="text-xs text-gray-300 font-medium">{p.title}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
