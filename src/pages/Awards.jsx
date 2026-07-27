export default function Awards() {
  return (
    <section className="w-full bg-[#05080D] py-[60px] md:py-[80px]">
      <div
        className="
          w-full
          max-w-[1366px]
          px-5
          md:px-[93px]
          mx-auto
          flex
          flex-col
          items-center
        "
      >
        {/* Card Image */}
        <div
          className="
            w-full
            max-w-[384px]
            h-auto
            md:w-[384px]
            md:h-[384px]
            rounded-[20px]
            overflow-hidden
            mb-6
          "
        >
          <img
            src="/clubs.jpg"
            alt="Community Clubs"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Badge */}
        <div
          className="
            px-3
            py-1
            rounded-full
            border
            border-[#414243]
            text-[10px]
            font-medium
            text-white
            mb-4
          "
        >
          NEW FEATURE
        </div>

        {/* Heading */}
        <h2
          className="
            text-white
            text-[32px]
            leading-[40px]
            md:text-[48px]
            md:leading-[56px]
            font-bold
            text-center
            mb-4
          "
        >
          Awards Coming Soon
        </h2>

        {/* Description */}
        <p
          className="
            max-w-[620px]
            text-center
            text-[#A1A1A1]
            text-[14px]
            leading-6
            md:text-base
            md:leading-7
            mb-6
          "
        >
          Join city-based creator communities, attend local meetups, and
          collaborate with people near you.
        </p>

        {/* Location Text */}
        <div
          className="
            flex
            items-center
            gap-2
            text-[#DCDCDC]
            text-[10px]
            md:text-xs
            tracking-[1px]
            uppercase
            mb-8
            text-center
          "
        >
          <span>📍</span>
          <span>Launching Soon In Major Cities</span>
        </div>

        {/* Button */}
        <button
          className="
            px-6
            md:px-8
            py-3
            rounded-md
            bg-[#D4E157]
            text-black
            text-sm
            font-semibold
            hover:opacity-90
            transition-all
          "
        >
          NOTIFY ME →
        </button>
      </div>
    </section>
  );
}
