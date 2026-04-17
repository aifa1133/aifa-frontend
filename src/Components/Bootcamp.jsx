"use client";

const bootcamps = [
  {
    title: "AI Lego Animation Workshop",
    image: "/bootcamp/bootcamp1.png",
    duration: "35 HOURS",
    price: "USD 999.00",
    mode: "ONLINE",
  },
  {
    title: "AI Lego Animation Workshop",
    image: "/bootcamp/bootcamp2.jpg",
    duration: "35 HOURS",
    price: "USD 999.00",
    mode: "ONLINE",
  },
  {
    title: "AI Lego Animation Workshop",
    image: "/bootcamp/bootcamp3.jpg",
    duration: "35 HOURS",
    price: "USD 999.00",
    mode: "ONLINE",
  },
];

export default function Bootcamps() {
  return (
    <section className="w-full bg-[#0B0F10] py-14">
      <div className="max-w-7xl mx-auto px-6">
        {/* TITLE */}
        <h2 className="text-white text-4xl font-semibold mb-10">
          AI Filmmaking Bootcamp
        </h2>

        {/* LIST */}
        <div className="flex flex-col gap-8">
          {bootcamps.map((item, i) => (
            <div key={i} className="rounded-2xl overflow-hidden">
              {/* TOP SECTION */}
              <div className="flex flex-col md:flex-row bg-[#dcdcdc] rounded-t-2xl">
                {/* IMAGE */}
                <img
                  src={item.image}
                  alt="bootcamp"
                  className="w-full md:w-[220px] h-[180px] object-cover"
                />

                {/* CONTENT */}
                <div className="flex-1 px-8 py-6">
                  {/* TITLE */}
                  <h3 className="text-black text-3xl font-semibold mb-6">
                    {item.title}
                  </h3>

                  {/* INFO BOXES */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#cfcfcf] rounded-xl p-4">
                      <p className="text-xs text-black/60 uppercase">
                        ⏱ Duration
                      </p>
                      <p className="mt-1 font-semibold text-black">
                        {item.duration}
                      </p>
                    </div>

                    <div className="bg-[#cfcfcf] rounded-xl p-4">
                      <p className="text-xs text-black/60 uppercase">
                        💳 Pricing
                      </p>
                      <p className="mt-1 font-semibold text-black">
                        {item.price}
                      </p>
                    </div>

                    <div className="bg-[#cfcfcf] rounded-xl p-4">
                      <p className="text-xs text-black/60 uppercase">Mode</p>
                      <p className="mt-1 font-semibold text-black">
                        {item.mode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM BUTTON */}
              <div className="bg-[#C7E36B] text-center py-4 text-base font-semibold text-black rounded-b-2xl">
                RESERVE SPOT →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
