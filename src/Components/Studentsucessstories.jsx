const testimonials = [
  {
    id: 1,
    review:
      "Before joining AIFA, I only had theoretical knowledge. The practical sessions, mentorship, and assignments helped me build real-world skills that I can confidently apply.",
    name: "K. Krishna Vamsi",
    role: "AI Filmmaker",
    image: "/students/student1.png",
  },
  {
    id: 2,
    review:
      "The learning experience was simple, practical, and career-focused. I was able to create projects and improve my portfolio within a short time.",
    name: "CH. Sridhar",
    role: "AI Video Editor",
    image: "/students/student2.png",
  },
  {
    id: 3,
    review:
      "AIFA helped me build confidence and opened new opportunities. After completing the training, I started working on client projects.",
    name: "M.P.C.H. Mani",
    role: "AI Motion Graphics",
    image: "/students/student3.png",
  },
];

export default function StudentSuccessStories() {
  return (
    <section className="w-full bg-[#0F1112]">
      <div className="max-w-[1366px] mx-auto px-4 sm:px-6 md:px-[50px] lg:px-[93px] py-16">
        {/* Heading */}
        <div className="relative mb-14">
          <div className="text-center">
            <h2 className="text-white font-black text-[36px] md:text-[48px] lg:text-[56px] leading-tight">
              Student Success Stories
            </h2>

            <p className="mt-4 text-[#9FA2A4] text-[15px] md:text-[16px]">
              See what others achieved after taking this workshop.
            </p>
          </div>

          {/* Arrow */}
          <button className="hidden md:flex absolute right-0 top-4 w-14 h-14 rounded-xl bg-[#D0E46A] items-center justify-center hover:bg-[#C4DB59] transition">
            <span className="text-[#111] text-2xl">→</span>
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-[22px] overflow-hidden bg-[#282A2C] border border-[#333536] hover:border-[#D0E46A] transition-all"
            >
              {/* Review */}
              <div className="p-7 min-h-[210px]">
                <p className="text-[#D6D6D6] text-[15px] leading-7">
                  "{item.review}"
                </p>
              </div>

              {/* Bottom */}
              <div className="border-t border-[#3A3C3D] px-7 py-5 flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>
                  <h4 className="text-white font-bold text-[20px]">
                    {item.name}
                  </h4>

                  <p className="text-[#A3A6A7] text-[15px]">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
