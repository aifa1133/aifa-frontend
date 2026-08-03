import { Calendar, Clock3, Globe, CheckCircle2 } from "lucide-react";

export default function WorkshopConfirmation() {
  return (
    <section className="w-full bg-[#0F1112] py-16">
      <div className="max-w-[1366px] mx-auto px-4 sm:px-6 md:px-10 lg:px-[132px]">
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div>
            <img
              src="/workshops/confirmation-image.webp"
              alt="Workshop"
              className="w-full h-[280px] md:h-[420px] object-cover rounded-xl"
            />
          </div>

          {/* Right Content */}
          <div>
            <div className="inline-flex px-4 py-2 rounded-full bg-[#2B2D2F] text-[#D0E46A] text-xs font-bold uppercase">
              Online Workshop
            </div>

            <h1 className="mt-6 text-white text-4xl md:text-6xl font-black leading-tight">
              AI Filmmaking
              <br />
              Workshop
            </h1>

            <p className="mt-6 text-[#A5A8AA] text-lg leading-8">
              You're successfully registered. Get ready to join the live
              workshop and start creating AI-powered cinematic videos.
            </p>

            {/* Info */}
            <div className="flex items-center gap-8 mt-8 text-[#CFCFCF]">
              <div className="flex items-center gap-2">
                <Clock3 size={20} />
                <span>3 Hours</span>
              </div>

              <div className="flex items-center gap-2">
                <Globe size={20} />
                <span>Online</span>
              </div>
            </div>

            {/* Success Card */}
            <div className="mt-8 rounded-xl bg-gradient-to-r from-[#1F3613] to-[#26351A] border border-[#42592C] p-6 flex flex-col md:flex-row justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#547F1C] flex items-center justify-center">
                  <CheckCircle2 className="text-[#D0E46A]" size={28} />
                </div>

                <div>
                  <h3 className="text-[#D0E46A] text-xl font-bold">
                    Purchased
                  </h3>
                  <p className="text-white">Seat Confirmed</p>
                </div>
              </div>

              <div className="text-left md:text-right">
                <p className="text-[#C7C7C7]">
                  Order ID :
                  <span className="text-[#D0E46A] font-bold"> #AIWA12345</span>
                </p>

                <p className="text-[#B3B5B6] text-sm mt-2">
                  Purchased on 07 Jul 2026
                </p>
              </div>
            </div>

            {/* Button */}
            <button className="mt-8 w-full h-16 rounded-lg bg-[#D0E46A] hover:bg-[#C2D95A] text-[#111] font-black text-lg uppercase transition">
              Join Live Workshop
            </button>
          </div>
        </div>

        {/* Countdown Card */}
        <div className="mt-16 rounded-2xl border border-[#2E3032] bg-[#181A1B] p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left */}
            <div className="flex gap-6">
              <div className="w-20 h-20 rounded-full bg-[#2A2C2D] flex items-center justify-center">
                <Calendar className="text-white" size={36} />
              </div>

              <div>
                <p className="text-[#A5A8AA]">Next Live Session</p>

                <h2 className="text-white text-4xl font-black mt-2">
                  25 Jul 2026,
                  <br />
                  10:00 AM (IST)
                </h2>

                <p className="text-[#A5A8AA] mt-5">Workshop Starts In</p>

                <div className="flex flex-wrap gap-4 mt-5">
                  {[
                    ["17", "Days"],
                    ["14", "Hours"],
                    ["28", "Minutes"],
                    ["45", "Seconds"],
                  ].map(([num, label]) => (
                    <div
                      key={label}
                      className="w-20 h-20 rounded-lg bg-[#2C2E30] flex flex-col justify-center items-center"
                    >
                      <span className="text-white text-2xl font-bold">
                        {num}
                      </span>
                      <span className="text-[#A4A7A8] text-xs">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right */}

            <div className="flex flex-col justify-center">
              <h3 className="text-white text-3xl font-bold">
                Get ready for an interactive learning experience.
              </h3>

              <div className="mt-8 space-y-5">
                {[
                  "Join a live hands-on session with the instructor",
                  "Ask questions and get real-time feedback",
                  "Work on practical exercises",
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2
                      className="text-[#D0E46A] shrink-0 mt-1"
                      size={20}
                    />

                    <p className="text-[#C7C7C7]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
