"use client";

const features = [
  {
    image: "/video/video1.png",
    title: "Host in high quality, ad-free",
  },
  {
    image: "/video/video2.png",
    title: "Host in high quality, ad-free",
  },
  {
    image: "/video/video3.png",
    title: "Host in high quality, ad-free",
  },
  {
    image: "/video/video4.png",
    title: "Host in high quality, ad-free",
  },
  {
    image: "/video/video5.png",
    title: "Host in high quality, ad-free",
  },
  {
    image: "/video/video6.jpg",
    title: "Host in high quality, ad-free",
  },
];

export default function Features() {
  return (
    <section className="w-full bg-[#0B0F10] py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* TITLE */}
        <h2 className="text-white text-3xl md:text-4xl font-semibold text-center mb-16">
          The platform that powers your video strategy
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {features.map((item, i) => (
            <div key={i}>
              {/* IMAGE */}
              <div className="overflow-hidden rounded-[28px] mb-6">
                <img
                  src={item.image}
                  alt="feature"
                  className="w-full h-[220px] object-cover"
                />
              </div>

              {/* TITLE */}
              <h3 className="text-white text-lg font-semibold mb-3">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                Ensure your video play in their highest resolution, always
                ad-free. No competitor distributions or random suggestion here
              </p>

              {/* BUTTON */}
              <button className="bg-[#C7E36B] text-black px-5 py-3 text-sm font-medium rounded-md">
                + Learn about video hosting →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
