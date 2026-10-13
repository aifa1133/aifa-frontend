import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://Vamsi123:Vamsi%40123@cluster0.kxpzpsl.mongodb.net/lll";

async function run() {
  const action = process.argv[2];
  if (!action) {
    console.error("Usage: node qa_db_helper.js <enroll|unenroll>");
    process.exit(1);
  }

  await mongoose.connect(MONGO_URI);
  
  // Find User by email
  const user = await mongoose.connection.db.collection("users").findOne({ email: "vrasqus@gmail.com" });
  if (!user) {
    console.error("❌ User vrasqus@gmail.com not found!");
    await mongoose.disconnect();
    process.exit(1);
  }
  
  // Find Bootcamp by batchCode "BO5"
  const bootcamp = await mongoose.connection.db.collection("bootcamps").findOne({ batchCode: "BO5" });
  if (!bootcamp) {
    console.error("❌ Bootcamp BO5 not found!");
    await mongoose.disconnect();
    process.exit(1);
  }

  const userId = user._id;
  const bootcampId = bootcamp._id;

  // Check or create QA50 coupon
  const coupon = await mongoose.connection.db.collection("coupons").findOne({ code: "QA50" });
  if (!coupon) {
    await mongoose.connection.db.collection("coupons").insertOne({
      code: "QA50",
      discountType: "percent",
      discountValue: 50,
      isActive: true,
      maxUses: 100,
      usedCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log("✅ Created QA50 coupon.");
  }

  if (action === "enroll") {
    // Add user back to enrollments
    await mongoose.connection.db.collection("bootcamps").updateOne(
      { _id: bootcampId },
      { $addToSet: { enrollments: userId } }
    );
    // Add to studentMeta if not already present
    const hasMeta = bootcamp.studentMeta && bootcamp.studentMeta.some(m => String(m.userId) === String(userId));
    if (!hasMeta) {
      await mongoose.connection.db.collection("bootcamps").updateOne(
        { _id: bootcampId },
        { $push: { studentMeta: { userId, status: "ACTIVE", notes: "" } } }
      );
    }
    console.log("✅ Student enrolled successfully.");
  } else if (action === "unenroll") {
    // Remove user from enrollments and studentMeta
    await mongoose.connection.db.collection("bootcamps").updateOne(
      { _id: bootcampId },
      {
        $pull: {
          enrollments: userId,
          studentMeta: { userId: userId }
        }
      }
    );
    console.log("✅ Student unenrolled successfully.");
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
