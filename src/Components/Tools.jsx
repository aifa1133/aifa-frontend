"use client";

const tools = [
  "/Tools/newicon1.svg",
  "/Tools/newicon2.png",
  "/Tools/newicon3.svg",
  "/Tools/newicon4.png",
  "/Tools/newicon5.png",
  "/Tools/newicon6.png",
  "/Tools/newicon7.svg",
  "/Tools/newicon8.png",
  "/Tools/newicon9.png",
  "/Tools/newicon7.svg",
  "/Tools/newicon8.png",
  "/Tools/newicon9.png",
];

export default function Tools() {
  return (
    <section className="w-full bg-[#0B0F10] py-4 relative overflow-hidden">
      {/* SIDE FADE (LEFT + RIGHT) */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#0B0F10] to-transparent z-10"></div>
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#0B0F10] to-transparent z-10"></div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-20">
        {/* TITLE */}
        <h2 className="text-white text-3xl md:text-4xl font-semibold mb-14">
          Tools we will use
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {tools.map((tool, i) => (
            <div
              key={i}
              className="
                flex items-center justify-center
                h-24 md:h-28
                rounded-2xl
                bg-[#2f2f2f]
                transition duration-300
              "
            >
              <img
                src={tool}
                alt="tool"
                className="h-10 md:h-12 object-contain opacity-80"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
