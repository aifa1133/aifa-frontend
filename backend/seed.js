/**
 * Seed script — adds sample AI courses to the database.
 * Run with:  node backend/seed.js
 * Requires MONGO_URI in environment or .env file.
 */

import "dotenv/config";
import mongoose from "mongoose";
import Course from "./models/Course.js";

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("MONGO_URI not set. Create a .env file or set the variable.");
  process.exit(1);
}

const COURSES = [
  {
    title: "AI Photo Enhancement Masterclass",
    description: "Turn static photos into cinematic, visually stunning images using the latest AI tools. Learn professional retouching, color grading, and generative AI techniques used by top photographers.",
    shortDesc: "Master AI-powered photo editing with Runway, Pika, and Kling AI.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    price: 1299,
    originalPrice: 2499,
    duration: "8 Hours",
    category: "AI & Machine Learning",
    level: "Beginner",
    language: "English",
    instructor: "AIFA Team",
    isPublished: true,
    lessons: [
      {
        title: "The Photo Enhancement Mindset",
        description: "Understand what makes professional photo enhancement different from casual editing — enhancing with intention, not filters, and solving visual problems with purposeful adjustments.",
        thumbnail: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
        duration: "12:30",
        order: 0,
        isFree: true,
      },
      {
        title: "Real Client Workflow Experience",
        description: "Work through a realistic creative brief, learning how to analyze image issues, understand requirements, and deliver results aligned with client expectations.",
        thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80",
        duration: "18:45",
        order: 1,
        isFree: false,
      },
      {
        title: "Strategic Tool Selection",
        description: "Learn which AI tools to choose for different tasks — from upscaling and background removal to generative fill and color correction.",
        thumbnail: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
        duration: "15:20",
        order: 2,
        isFree: false,
      },
      {
        title: "Raw-to-Refined Workflow",
        description: "Follow a complete raw-to-final workflow on a real client image using Lightroom + AI enhancement tools in sequence.",
        thumbnail: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80",
        duration: "22:10",
        order: 3,
        isFree: false,
      },
      {
        title: "Detail Enhancements That Matter",
        description: "Zoom in on the micro-details — skin texture, fabric, product surfaces — and use AI to enhance them without looking over-processed.",
        thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80",
        duration: "19:55",
        order: 4,
        isFree: false,
      },
    ],
  },
  {
    title: "AI Video Creation with Runway Gen-3",
    description: "Create cinematic AI-generated videos from text prompts and reference images. Master Runway Gen-3 Alpha, motion control, and video-to-video transformation techniques used by leading studios.",
    shortDesc: "Generate stunning videos from text and images using Runway Gen-3.",
    image: "https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=800&q=80",
    price: 1499,
    originalPrice: 2999,
    duration: "10 Hours",
    category: "AI & Machine Learning",
    level: "Intermediate",
    language: "English",
    instructor: "AIFA Team",
    isPublished: true,
    lessons: [
      {
        title: "Introduction to AI Video Generation",
        description: "Overview of the AI video landscape — what Gen-3, Pika, and Sora can do, and how to choose the right tool for your project.",
        thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80",
        duration: "14:00",
        order: 0,
        isFree: true,
      },
      {
        title: "Text-to-Video Prompt Engineering",
        description: "Learn the exact prompt structure that gets cinematic results — camera angles, lighting descriptors, mood keywords, and motion cues.",
        thumbnail: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
        duration: "20:30",
        order: 1,
        isFree: false,
      },
      {
        title: "Image-to-Video Techniques",
        description: "Animate still images with precise control over camera movement, subject motion, and scene dynamics.",
        thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80",
        duration: "25:15",
        order: 2,
        isFree: false,
      },
      {
        title: "Building a Complete Short Film",
        description: "End-to-end project: storyboard, generate clips, edit in sequence, add sound design, and export a polished 60-second AI short film.",
        thumbnail: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&q=80",
        duration: "35:00",
        order: 3,
        isFree: false,
      },
    ],
  },
  {
    title: "AI 3D Animation for Beginners",
    description: "Create professional 3D animations using AI-powered tools without any prior 3D experience. From concept to render, learn the complete pipeline that top motion designers use.",
    shortDesc: "Create stunning 3D animations using AI — no prior 3D experience needed.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    price: 999,
    originalPrice: 1999,
    duration: "6 Hours",
    category: "AI & Machine Learning",
    level: "Beginner",
    language: "English",
    instructor: "AIFA Team",
    isPublished: true,
    lessons: [
      {
        title: "AI 3D Tools Overview",
        description: "Survey the AI 3D landscape — Spline, Meshy, Tripo3D, and more. Understand which tool fits which use case.",
        thumbnail: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=600&q=80",
        duration: "10:00",
        order: 0,
        isFree: true,
      },
      {
        title: "Text-to-3D Model Generation",
        description: "Generate 3D models from text descriptions using Meshy AI. Learn to iterate prompts for clean topology and good UV mapping.",
        thumbnail: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&q=80",
        duration: "18:00",
        order: 1,
        isFree: false,
      },
      {
        title: "Animating AI 3D Assets in Spline",
        description: "Bring your 3D models to life with keyframe animation, physics simulation, and interactive behaviors in Spline.",
        thumbnail: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=600&q=80",
        duration: "22:00",
        order: 2,
        isFree: false,
      },
    ],
  },
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  let created = 0;
  let skipped = 0;

  for (const data of COURSES) {
    const exists = await Course.findOne({ title: data.title });
    if (exists) {
      console.log(`  SKIP  "${data.title}" (already exists)`);
      skipped++;
      continue;
    }
    const course = new Course(data);
    await course.save();
    console.log(`  CREATE "${course.title}" → /courses/${course.slug}`);
    created++;
  }

  console.log(`\nDone. Created: ${created}, Skipped: ${skipped}`);
  await mongoose.disconnect();
}

seed().catch(e => { console.error(e); process.exit(1); });
