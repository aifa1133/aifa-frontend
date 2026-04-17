"use client";

export default function CourseCard() {
  return (
    <section className="w-full bg-[#0B0F10] flex justify-center py-10">
      <div className="w-full max-w-6xl rounded-2xl overflow-hidden">
        {/* TOP SECTION */}
        <div className="grid md:grid-cols-2">
          {/* IMAGE */}
          <div className="h-[300px] md:h-auto">
            <img
              src="/courses/course.png"
              alt="course"
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT CONTENT (DARK GREY) */}
          <div className="flex flex-col justify-center px-10 py-10 bg-[#4a4a4a]">
            <p className="text-gray-300 text-xs uppercase tracking-widest mb-3">
              BEGINNER
            </p>

            <h2 className="text-white text-3xl font-bold mb-4">
              AI FILMMAKING BOOTCAMP
            </h2>

            <p className="text-gray-200 text-sm leading-relaxed mb-6 max-w-md">
              Master AI-Powered Filmmaking From Concept To Final Cut While
              Learning How To Create Stunning, High-Quality Films Faster Using
              Cutting-Edge AI Tools.
            </p>

            {/* BUTTON */}
            <button className="w-full bg-[#C7E36B] text-black py-3 text-sm font-semibold rounded-lg">
              ENROLL BOOTCAMP
            </button>
          </div>
        </div>

        {/* BOTTOM BOXES WITH GAP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          <div className="bg-[#4a4a4a] p-5 rounded-xl">
            <p className="text-xs uppercase text-gray-400">⏱ Duration</p>
            <p className="mt-1 text-white font-semibold">3 HOURS</p>
          </div>

          <div className="bg-[#4a4a4a] p-5 rounded-xl">
            <p className="text-xs uppercase text-gray-400">💳 Pricing</p>
            <p className="mt-1 text-white font-semibold">₹499.00</p>
          </div>

          <div className="bg-[#4a4a4a] p-5 rounded-xl">
            <p className="text-xs uppercase text-gray-400">💳 Pricing</p>
            <p className="mt-1 text-white font-semibold">₹499.00</p>
          </div>
        </div>
      </div>
    </section>
  );
}
