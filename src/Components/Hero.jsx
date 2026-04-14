export default function Hero() {
  return (
    <section className="w-full bg-black flex justify-center py-10">
      {/* Container */}
      <div
        className="
          relative w-full max-w-7xl h-[588px]
          px-[102px] flex flex-col justify-center items-start gap-[60px]
          rounded-[24px] overflow-hidden
        "
      >
        {/* Background Image */}
        <img
          src="/background.jpg"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay (20%) */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>

        {/* Content */}
        <div className="relative z-10 max-w-xl">
          {/* Small Label */}
          <p className="text-gray-300 uppercase tracking-widest text-sm mb-2">
            Movies
          </p>

          {/* Heading */}
          <h1 className="text-white text-5xl font-extrabold leading-tight">
            Creating <br />
            Worlds of <br />
            Animation
          </h1>

          {/* Button */}
          <button className="mt-6 flex items-center gap-2 bg-primary text-black px-6 py-3 text-sm font-semibold rounded-md hover:scale-105 transition-all duration-300">
            {/* Icon */}
            <span className="text-lg">+</span>
            BOOK A FREE 30 MINS CONSULTATION
          </button>
        </div>
      </div>
    </section>
  );
}
