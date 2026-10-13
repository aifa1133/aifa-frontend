import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log('Connected to MongoDB');

const toolSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  badge:    { type: String, default: "AI CHAT" },
  desc:     { type: String, default: "" },
  logoUrl:  { type: String, default: "" },
  logoText: { type: String, default: "" },
  bgColor:  { type: String, default: "from-[#6366f1]/20 to-[#4338ca]/10" },
  order:    { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Tool = mongoose.models.Tool || mongoose.model('Tool', toolSchema);

const tools = [
  { name:"ChatGPT",    badge:"AI CHAT",    desc:"Conversational AI assistant",      logoUrl:"https://cdn.jsdelivr.net/npm/simple-icons@13/icons/openai.svg",      bgColor:"from-[#10a37f]/20 to-[#0d7a5f]/10", order:1 },
  { name:"Runway",     badge:"VIDEO",      desc:"AI video editor & generator",      logoUrl:"https://cdn.jsdelivr.net/npm/simple-icons@13/icons/runway.svg",       bgColor:"from-[#f59e0b]/20 to-[#b45309]/10", order:2 },
  { name:"Perplexity", badge:"SEARCH",     desc:"AI-powered search engine",         logoUrl:"https://cdn.jsdelivr.net/npm/simple-icons@13/icons/perplexity.svg",   bgColor:"from-[#10b981]/20 to-[#047857]/10", order:3 },
  { name:"Midjourney", badge:"IMAGE",      desc:"AI image generation tool",         logoUrl:"https://cdn.jsdelivr.net/npm/simple-icons@13/icons/midjourney.svg",   bgColor:"from-[#3b82f6]/20 to-[#1d4ed8]/10", order:4 },
  { name:"Suno AI",    badge:"MUSIC",      desc:"AI music generation",              logoText:"SUNO",                                                               bgColor:"from-[#8b5cf6]/20 to-[#6d28d9]/10", order:5 },
  { name:"Gemini",     badge:"AI CHAT",    desc:"Google's multimodal AI",           logoUrl:"https://cdn.jsdelivr.net/npm/simple-icons@13/icons/googlegemini.svg", bgColor:"from-[#6366f1]/20 to-[#4338ca]/10", order:6 },
  { name:"ElevenLabs", badge:"VOICE",      desc:"AI voice & audio synthesis",       logoUrl:"https://cdn.jsdelivr.net/npm/simple-icons@13/icons/elevenlabs.svg",   bgColor:"from-[#ec4899]/20 to-[#be185d]/10", order:7 },
  { name:"Luma AI",    badge:"3D / VIDEO", desc:"AI 3D & video generation",         logoText:"LUMA",                                                               bgColor:"from-[#a855f7]/20 to-[#7e22ce]/10", order:8 },
  { name:"Higgsfield", badge:"VIDEO",      desc:"AI Video and content",             logoText:"HF",                                                                 bgColor:"from-[#f97316]/20 to-[#c2410c]/10", order:9 },
  { name:"Claude",     badge:"AI CHAT",    desc:"Anthropic's conversational AI",    logoUrl:"https://cdn.jsdelivr.net/npm/simple-icons@13/icons/anthropic.svg",    bgColor:"from-[#d97706]/20 to-[#92400e]/10", order:10 },
  { name:"Merlin AI",  badge:"CONTENT",    desc:"AI browser copilot",               logoText:"M",                                                                  bgColor:"from-[#14b8a6]/20 to-[#0f766e]/10", order:11 },
  { name:"Topaz Labs",badge:"ENHANCE",    desc:"Video/photo enhancer",             logoText:"TL",                                                                 bgColor:"from-[#84cc16]/20 to-[#4d7c0f]/10", order:12 },
];

const existing = await Tool.countDocuments();
if (existing > 0) {
  console.log(`Tools collection already has ${existing} tools. Clearing and re-seeding...`);
  await Tool.deleteMany({});
}

await Tool.insertMany(tools);
console.log(`✓ Inserted ${tools.length} tools into MongoDB`);

await mongoose.disconnect();
console.log('Done.');
