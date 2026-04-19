"use client";

export default function ServicesPage() {
  return (
    <div className="bg-[#0B0F10] text-white">
      {/* 🔥 HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-12 justify-center text-center">
          NEW TO 3D ANIMATION
        </h1>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="overflow-hidden rounded-[100px]">
            <img
              src="/3Dai/ai3d1.jpg"
              className="w-full h-[300px] object-cover"
            />
          </div>

          <div>
            <p className="text-gray-400 mb-2">Beginners</p>
            <h2 className="text-6xl font-bold mb-4">
              Corporate & Institutional Training
            </h2>
            <p className="text-gray-400 mb-6">
              In this 6-week cources for beginners, learn essential techniques
              for 3D animation
            </p>

            <button className="bg-[#C7E36B] text-black px-6 py-3 rounded-md">
              + Talk to Us →
            </button>
          </div>
        </div>
      </section>

      {/* 🔥 SECTION 2 */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-gray-400 mb-2">Beginners</p>
          <h2 className="text-6xl font-bold mb-4">Curriculum Consulting</h2>
          <p className="text-gray-400 mb-6">
            In this 6-week cources for beginners, learn essential techniques for
            3D animation in autodesk maya and get comfortable with the
            interface.
          </p>

          <button className="bg-[#C7E36B] text-black px-6 py-3 rounded-md">
            + Talk to Us →
          </button>
        </div>

        <div className="overflow-hidden rounded-[100px]">
          <img
          src="/3Dai/ai3d2.jpg"
            className="w-full h-[300px] object-cover"
          />
        </div>
      </section>

      {/* 🔥 SECTION 3 */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div className="overflow-hidden rounded-[100px]">
          <img
        src="/3Dai/ai3d3.jpg"
            className="w-full h-[300px] object-cover"
          />
        </div>

        <div>
          <p className="text-gray-400 mb-2">Beginners</p>
          <h2 className="text-6xl font-bold mb-4">Production Support</h2>
          <p className="text-gray-400 mb-6">
            In this 6-week cources for beginners, learn essential techniques for
            3D animation in autodesk maya and get comfortable with the
            interface. 3D navigation, and core animation tools while working
            with proffessional rigs.
          </p>

          <button className="bg-[#C7E36B] text-black px-6 py-3 rounded-md">
            + Talk to Us →
          </button>
        </div>
      </section>

      {/* 🔥 SECTION 4 */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-gray-400 mb-2">Beginners</p>
          <h2 className="text-6xl font-bold mb-4">AI Content Production</h2>
          <p className="text-gray-400 mb-6">
            In this 6-week cources for beginners, learn essential techniques for
            3D animation in autodesk maya and get comfortable with the
            interface. 3D navigation, and core animation tools while working
            with proffessional rigs.
          </p>

          <button className="bg-[#C7E36B] text-black px-6 py-3 rounded-md">
            + Talk to Us →
          </button>
        </div>

        <div className="overflow-hidden rounded-[100px]">
          <img
           src="/3Dai/ai3d4.png"
            className="w-full h-[300px] object-cover"
          />
        </div>
      </section>

      {/* 🔥 CONTACT FORM */}
      <section className="bg-[#5E6639] py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">We can help you!</h2>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            <input
              placeholder="First Name"
              className="p-4 rounded-md bg-[#C7E36B]/70 text-black"
            />
            <input
              placeholder="Last Name"
              className="p-4 rounded-md bg-[#C7E36B]/70 text-black"
            />

            <input
              placeholder="Email"
              className="p-4 rounded-md bg-[#C7E36B]/70 text-black md:col-span-2"
            />
            <input
              placeholder="Phone"
              className="p-4 rounded-md bg-[#C7E36B]/70 text-black md:col-span-2"
            />

            <select className="p-4 rounded-md bg-[#C7E36B]/70 text-black md:col-span-2">
              <option>Services</option>
            </select>

            <select className="p-4 rounded-md bg-[#C7E36B]/70 text-black md:col-span-2">
              <option>Country</option>
            </select>
          </div>

          <button className="mt-8 w-full bg-white text-black py-3 rounded-md">
            + NEXT
          </button>
        </div>
      </section>
    </div>
  );
}
