"use client";

export default function Testimonial() {
  return (
    <section className="w-full bg-[#0B0F10] py-4">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-20">
        {/* LEFT IMAGE (OVAL CAPSULE) */}
        <div className="flex-1 flex justify-center">
          <div className="w-[320px] h-[460px] md:w-[380px] md:h-[520px] rounded-[200px] overflow-hidden">
            <img
              src="/movies/movie.png"
              alt="person"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1">
          {/* QUOTE */}
          <h2 className="text-white text-3xl md:text-5xl font-semibold leading-tight mb-8">
            “AIFA IS A GREAT PLACE FOR THE FUTURE OF AI FILMMAKING”
          </h2>

          {/* NAME */}
          <p className="text-gray-400 text-sm uppercase tracking-wide underline">
            RAJA MOULI
          </p>
        </div>
      </div>
    </section>
  );
}
