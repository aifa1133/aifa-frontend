"use client";

const courses = [
  {
    title: "AI Lego Animation Workshop",
    image: "/courses/v1.png",
    duration: "35 Hours",
    price: "USD 999.00",
    mode: "Online",
  },
  {
    title: "AI Lego Animation Workshop",
    image: "/courses/v2.png",
    duration: "35 Hours",
    price: "USD 999.00",
    mode: "Online",
  },
  {
    title: "AI Lego Animation Workshop",
    image: "/courses/v3.png",
    duration: "35 Hours",
    price: "USD 999.00",
    mode: "Online",
  },
  {
    title: "AI Lego Animation Workshop",
    image: "/courses/v4.png",
    duration: "35 Hours",
    price: "USD 999.00",
    mode: "Online",
  },
];


export default function WorkshopsPage() {
return (
  <>
    {/* 🔥 WORKSHOP SECTION */}
    <section className="bg-[#0B0F10] text-white py-16">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-3xl md:text-5xl font-semibold mb-12">
          AI Filmmaking Workshop
        </h2>

        <div className="space-y-12">
          {courses.map((item, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row gap-6 items-stretch"
            >

              {/* IMAGE */}
              <div className="w-full md:w-[280px] h-[200px] rounded-[24px] overflow-hidden shrink-0">
                <img
                  src={item.image}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="flex-1 flex flex-col justify-between">

                {/* TITLE BAR */}
                <div className="bg-[#D9D9D9] text-black rounded-[24px] px-6 py-6">
                  <h3 className="text-xl md:text-4xl font-semibold leading-tight">
                    {item.title}
                  </h3>
                </div>

                {/* INFO */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">

                  <div className="bg-[#D9D9D9] text-black rounded-[16px] p-4">
                    <p className="text-[11px] text-gray-600">⏱ DURATION</p>
                    <p className="font-semibold">{item.duration}</p>
                  </div>

                  <div className="bg-[#D9D9D9] text-black rounded-[16px] p-4">
                    <p className="text-[11px] text-gray-600">💳 PRICING</p>
                    <p className="font-semibold">{item.price}</p>
                  </div>

                  <div className="bg-[#D9D9D9] text-black rounded-[16px] p-4">
                    <p className="text-[11px] text-gray-600">🖥 MODE</p>
                    <p className="font-semibold">{item.mode}</p>
                  </div>

                </div>

                {/* BUTTON */}
                <button className="mt-4 w-full bg-[#C7E36B] text-black py-5 rounded-[24px] font-semibold text-sm md:text-base hover:opacity-90">
                  RESERVE SPOT →
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 🔥 HELP SECTION (FIXED UI) */}
    <section className="bg-[#0B0F10] py-16">
      <div className="max-w-6xl mx-auto px-4">

        <div className="bg-[#E39494] rounded-[40px] py-16 px-6 md:px-12 text-center">

          <img
            src="/team/support.jpg"
            className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-6"
          />

          <h2 className="text-black text-2xl md:text-5xl font-bold leading-tight mb-4">
            Not sure which workshop is right for you?
          </h2>

          <p className="text-black text-sm md:text-lg mb-8 font-medium">
            Get personalised guidance from our team
          </p>

          <button className="bg-[#C7E36B] text-black px-8 py-4 rounded-xl font-semibold hover:opacity-90">
            ← Chat on WhatsApp
          </button>

        </div>
      </div>
    </section>

   
  
     
  
  </>
)}