import "dotenv/config";
import mongoose from "mongoose";
import Course from "./models/Course.js";

await mongoose.connect(process.env.MONGO_URI);
const courses = await Course.find({ slug: { $exists: false } });
console.log(`Found ${courses.length} courses without slugs`);
for (const c of courses) {
  await c.save(); // pre-save hook generates slug
  console.log(`  Updated "${c.title}" → ${c.slug}`);
}
if (courses.length === 0) console.log("All courses already have slugs.");
await mongoose.disconnect();
