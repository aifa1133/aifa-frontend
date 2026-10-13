import "dotenv/config";
import mongoose from "mongoose";
import Course from "./models/Course.js";

await mongoose.connect(process.env.MONGO_URI);
console.log("Connected to MongoDB");

// Thumbnail sets per course keyword
const THUMB_SETS = {
  photo: [
    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80",
    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80",
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
    "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=600&q=80",
  ],
  video: [
    "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80",
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80",
    "https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=600&q=80",
    "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&q=80",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80",
    "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80",
  ],
  ai: [
    "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
    "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&q=80",
    "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
    "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=600&q=80",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80",
    "https://images.unsplash.com/photo-1488229297570-58520851e868?w=600&q=80",
  ],
  animation: [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
    "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=600&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=600&q=80",
    "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&q=80",
    "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&q=80",
  ],
  avatar: [
    "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=600&q=80",
    "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=600&q=80",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
    "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=600&q=80",
  ],
  fashion: [
    "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
  ],
  color: [
    "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=600&q=80",
    "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=600&q=80",
    "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=600&q=80",
    "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&q=80",
    "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=600&q=80",
    "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=600&q=80",
  ],
  default: [
    "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
    "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80",
    "https://images.unsplash.com/photo-1488229297570-58520851e868?w=600&q=80",
    "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&q=80",
    "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=600&q=80",
  ],
};

const LESSON_DESCRIPTIONS = [
  "Learn the fundamentals and build a solid foundation before diving into advanced techniques.",
  "Explore the core tools and understand how professionals approach this workflow step by step.",
  "Apply what you've learned with a hands-on project that mirrors real-world client scenarios.",
  "Discover advanced techniques that separate amateur results from professional-grade output.",
  "Understand the theory behind the technique so you can adapt it to any situation.",
  "Master the finishing touches — the small details that make a huge difference in the final result.",
];

const pickThumbs = (title) => {
  const t = title.toLowerCase();
  if (t.includes("photo") || t.includes("image") || t.includes("picture")) return THUMB_SETS.photo;
  if (t.includes("video") || t.includes("film") || t.includes("cinema") || t.includes("runway")) return THUMB_SETS.video;
  if (t.includes("avatar")) return THUMB_SETS.avatar;
  if (t.includes("fashion") || t.includes("model")) return THUMB_SETS.fashion;
  if (t.includes("color") || t.includes("colour") || t.includes("restor")) return THUMB_SETS.color;
  if (t.includes("3d") || t.includes("animat") || t.includes("motion")) return THUMB_SETS.animation;
  return THUMB_SETS.ai;
};

const courses = await Course.find({});
console.log(`Found ${courses.length} courses\n`);

let updated = 0;

for (const course of courses) {
  if (!Array.isArray(course.lessons) || course.lessons.length === 0) {
    // Add 4 sample lessons with thumbnails
    const thumbs = pickThumbs(course.title);
    course.lessons = [
      { title: "Introduction & Overview", description: LESSON_DESCRIPTIONS[0], thumbnail: thumbs[0], duration: "10:00", order: 0, isFree: true },
      { title: "Core Techniques", description: LESSON_DESCRIPTIONS[1], thumbnail: thumbs[1], duration: "18:30", order: 1, isFree: false },
      { title: "Hands-On Project", description: LESSON_DESCRIPTIONS[2], thumbnail: thumbs[2], duration: "22:15", order: 2, isFree: false },
      { title: "Advanced Workflow", description: LESSON_DESCRIPTIONS[3], thumbnail: thumbs[3], duration: "25:00", order: 3, isFree: false },
    ];
    await course.save();
    console.log(`  LESSONS ADDED  "${course.title}" (4 lessons with thumbnails)`);
    updated++;
  } else {
    // Fill in missing thumbnails on existing lessons
    const thumbs = pickThumbs(course.title);
    let changed = false;
    course.lessons.forEach((lesson, i) => {
      if (!lesson.thumbnail) {
        lesson.thumbnail = thumbs[i % thumbs.length];
        changed = true;
      }
      if (!lesson.description) {
        lesson.description = LESSON_DESCRIPTIONS[i % LESSON_DESCRIPTIONS.length];
        changed = true;
      }
    });
    if (changed) {
      await course.save();
      console.log(`  THUMBNAILS SET "${course.title}" (${course.lessons.length} lessons)`);
      updated++;
    } else {
      console.log(`  SKIP           "${course.title}" (already has thumbnails)`);
    }
  }
}

console.log(`\nDone. Updated ${updated} courses.`);
await mongoose.disconnect();
