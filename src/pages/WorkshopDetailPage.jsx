"use client";

import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { workshops } from "../data/workshops";
import VideoSection from "./Bootcamp/Videosection";
import StudentSuccessStories from "../Components/Studentsucessstories";

import { useState } from "react";
import TestimonialsSection from "./Bootcamp/TestimonialsSection";

const faqs = [
  {
    question: "Do I need prior experience?",
    answer:
      "No, this workshop is designed for both beginners and experienced creators. We cover everything from the basics of prompt engineering to advanced cinematic workflows.",
  },
  {
    question: "How long is the workshop?",
    answer:
      "The workshop is 3 hours long, including a live Q&A session at the end where you can ask specific questions about your projects.",
  },
  {
    question: "Which tools will be covered?",
    answer:
      "We will primarily focus on Google Gemini for image generation and Runway ML for video generation, along with tools for upscaling and audio.",
  },
];

export default function WorkshopDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  // Find selected workshop
  const workshop = workshops.find((item) => item._id === id);

  // Always open page from top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // ==========================
  // WORKSHOP NOT FOUND
  // ==========================
  if (!workshop) {
    return (
      <main className="min-h-screen bg-[#0B0F10] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-white font-[Montserrat] text-[32px] md:text-[48px] font-black mb-5">
            Workshop Not Found
          </h1>

          <p className="text-[#9B9D9E] font-[Montserrat] mb-6">
            The workshop you're looking for is unavailable.
          </p>

          <button
            type="button"
            onClick={() => navigate("/workshops")}
            className="bg-[#D0E46A] text-[#0F1112] px-6 py-3 rounded-[8px] font-[Montserrat] font-black uppercase"
          >
            Back to Workshops
          </button>
        </div>
      </main>
    );
  }

  // ==========================
  // RESERVE / BOOK
  // ==========================
  const handleBooking = () => {
    const token = localStorage.getItem("aifa_token");

    if (!token) {
      alert("Please login or sign up to reserve your seat.");
      navigate("/login");
      return;
    }

    // Change this route if your checkout route is different
    navigate(`/workshops/${workshop._id}/checkout`);
  };

  return (
    <main className="min-h-screen bg-[#0B0F10] text-white font-[Montserrat]">
      {/* ==================================================
          HERO SECTION
      ================================================== */}

      <section className="w-full bg-[#0F1112]">
        <div
          className="
      max-w-[1366px]
      mx-auto

      px-[16px]
      sm:px-[24px]
      md:px-[50px]
      lg:px-[93px]

      py-[64px]

      flex
      flex-col
      gap-[32px]
    "
        >
          {/* ===========================
        Breadcrumb
    ============================ */}

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#7C8082] text-[11px] font-medium cursor-pointer hover:text-white transition">
              Home
            </span>

            <span className="text-[#7C8082]">›</span>

            <span className="text-[#7C8082] text-[11px] font-medium cursor-pointer hover:text-white transition">
              Workshop
            </span>

            <span className="text-[#7C8082]">›</span>

            <span className="text-[#D0E46A] text-[11px] font-medium">
              AI Filmmaking Workshop
            </span>
          </div>

          {/* ===========================
        HERO
    ============================ */}

          <div
            className="
        flex
        flex-col
        lg:flex-row
        justify-between
        items-start
        gap-[32px]
      "
          >
            {/* LEFT */}

            <div className="flex-1 max-w-[760px]">
              {/* Badge */}

              <div className="inline-flex items-center rounded-full bg-[#202324] border border-[#2D3132] px-[16px] py-[8px]">
                <span className="text-[#D0E46A] text-[10px] font-black uppercase tracking-wide">
                  Live Workshop
                </span>
              </div>

              {/* Heading */}

              <h1 className="mt-[24px] font-black tracking-[-1px]">
                <span className="block text-white text-[72px] leading-[72px]">
                  Create Stunning AI
                </span>

                <span className="block text-white text-[72px] leading-[72px]">
                  Films in
                </span>

                <span className="block text-[#D0E46A] text-[72px] leading-[72px]">
                  Just 1 Live Workshop
                </span>
              </h1>

              {/* Description */}

              <p className="mt-[24px] max-w-[640px] text-[#A6A8AA] text-[16px] leading-[28px]">
                Learn how to create cinematic AI videos using today's leading AI
                tools. Join a live instructor-led workshop and build
                professional-quality films, trailers, advertisements, and social
                media content from scratch.
              </p>

              {/* Pills */}

              <div className="mt-[32px] flex flex-wrap gap-[12px]">
                <div className="bg-[#232526] border border-[#323435] rounded-[6px] px-[16px] py-[12px]">
                  <p className="text-[#D0E46A] text-[13px] font-semibold">
                    Saturday, July 25
                  </p>
                </div>

                <div className="bg-[#232526] border border-[#323435] rounded-[6px] px-[16px] py-[12px]">
                  <p className="text-[#D0E46A] text-[13px] font-semibold">
                    10:00 AM IST
                  </p>
                </div>

                <div className="bg-[#232526] border border-[#323435] rounded-[6px] px-[16px] py-[12px]">
                  <p className="text-[#D0E46A] text-[13px] font-semibold">
                    Live Online
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT */}

            <div className="w-full lg:w-[320px] lg:pt-[88px]">
              <div className="flex items-end gap-[8px]">
                <h2 className="text-white text-[64px] leading-none font-black">
                  ₹399
                </h2>

                <span className="text-[#666666] text-[32px] font-bold line-through mb-[6px]">
                  ₹999
                </span>
              </div>

              <button
                onClick={() => navigate("/workshops/confirmation")}
                className="
            mt-[32px]
            w-full
            h-[60px]
            rounded-[8px]
            bg-[#D0E46A]
            hover:bg-[#C3D85C]
            transition-all
            duration-300
            text-[#111111]
            text-[16px]
            font-black
            uppercase
            tracking-wide
          "
              >
                Reserve My Seat
              </button>

              <p className="mt-[12px] text-[#7C8082] text-[11px] uppercase tracking-[1px]">
                Secure Payment & Instant Access
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ==================================================
          WORKSHOP IMAGE / VIDEO
      ================================================== */}

      <VideoSection />

      <section className="w-full bg-[#0F1112]">
        <div className="max-w-[1366px] mx-auto px-4 sm:px-6 md:px-[50px] lg:px-[93px] py-12 md:py-16">
          {/* Heading */}
          <div className="max-w-[760px] mx-auto text-center">
            <h2
              className="
          text-white
          font-black
          text-[34px]
          leading-[42px]
          sm:text-[46px]
          sm:leading-[54px]
          lg:text-[64px]
          lg:leading-[70px]
          tracking-[-1px]
        "
            >
              What You Will Learn
            </h2>

            <p
              className="
          mt-5
          text-[#9FA2A4]
          text-[15px]
          md:text-[18px]
          leading-7
          max-w-[650px]
          mx-auto
        "
            >
              Master the complete AI filmmaking workflow—from idea generation to
              exporting professional-quality videos.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                title: "AI Storytelling & Script Writing",
                desc: "Generate engaging stories and scripts using AI.",
              },
              {
                title: "Prompt Engineering",
                desc: "Write effective prompts for consistent cinematic results.",
              },
              {
                title: "Image Generation",
                desc: "Create high-quality scenes and characters with AI.",
              },
              {
                title: "AI Video Creation",
                desc: "Transform images into cinematic videos using modern AI tools.",
              },
              {
                title: "Voice, Music & Sound Design",
                desc: "Add realistic narration, music, and sound effects.",
              },
              {
                title: "Editing & Final Export",
                desc: "Combine everything into a polished final film.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="
            rounded-[20px]
            bg-[#2A2C2D]
            border
            border-[#353738]
            px-6
            py-6
            transition-all
            duration-300
            hover:border-[#D0E46A]
            hover:-translate-y-1
          "
              >
                <h3
                  className="
              text-white
              font-black
              text-[22px]
              leading-[30px]
            "
                >
                  {item.title}
                </h3>

                <p
                  className="
              mt-3
              text-[#A7A9AA]
              text-[14px]
              leading-6
            "
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#0F1112]">
        <div
          className="
      max-w-[1366px]
      mx-auto

      px-[16px]
      sm:px-[24px]
      md:px-[50px]
      lg:px-[93px]

      py-[64px]

      flex
      flex-col
      items-center
      gap-[32px]
    "
        >
          {/* Heading */}
          <div className="text-center max-w-[700px] mx-auto">
            <h2
              className="
          text-white
          font-black
          text-[34px]
          leading-[42px]
          sm:text-[46px]
          sm:leading-[54px]
          lg:text-[64px]
          lg:leading-[70px]
          tracking-[-1px]
        "
            >
              What You Will CREATE
            </h2>

            <p
              className="
          mt-5
          text-[#9FA2A4]
          text-[15px]
          md:text-[18px]
          leading-7
        "
            >
              By the end of this workshop, you'll build real AI filmmaking
              projects.
            </p>
          </div>

          {/* Content */}
          <div className="mt-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-14">
            {/* Left */}
            <div className="w-full lg:max-w-[360px] text-center lg:text-left">
              <span
                className="
            text-[#CFCFCF]
            uppercase
            font-bold
            text-[14px]
            tracking-wider
          "
              >
                Project
              </span>

              <h3
                className="
            mt-3
            text-white
            font-black
            text-[34px]
            leading-[42px]
            md:text-[46px]
            md:leading-[54px]
          "
              >
                AI SHORT FILM
              </h3>
            </div>

            {/* Right Image */}
            <div className="w-full lg:max-w-[760px]">
              <img
                src="/airplane1.png"
                alt="AI Short Film"
                className="
            w-full
            h-auto
            rounded-[48px]
            object-cover
            shadow-2xl
          "
              />
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-center mt-[48px]">
            <button
              type="button"
              className="
      flex
      h-[48px]
      px-[30px]
      py-[12px]
      justify-center
      items-center
      gap-[4px]

      rounded-[8px]

      bg-[#D0E46A]
      hover:bg-[#BDD253]

      text-[#0F1112]
      font-[Montserrat]
      text-[14px]
      leading-[28px]
      font-extrabold
      uppercase

      transition-all
      duration-300
      cursor-pointer
    "
            >
              I WANT TO CREATE THIS
            </button>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#0F1112]">
        <div className="max-w-[1366px] mx-auto px-4 sm:px-6 md:px-[50px] lg:px-[93px] py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-12 lg:gap-16 items-start">
            {/* Left Content */}
            <div>
              <span className="text-[#D0E46A] text-[13px] font-bold uppercase tracking-[1px]">
                Who It's For?
              </span>

              <h2
                className="
            mt-3
            text-white
            font-black
            uppercase
            leading-[1.05]
            tracking-[-1px]
            text-[34px]
            sm:text-[44px]
            lg:text-[50px]
          "
              >
                Who Is This
                <br />
                Workshop For?
              </h2>

              <p
                className="
            mt-5
            text-[#9FA2A4]
            text-[15px]
            md:text-[16px]
            leading-7
            max-w-[320px]
          "
              >
                Whether you're a seasoned creative or a complete beginner, this
                workshop is designed to level up your AI filmmaking skills.
              </p>
            </div>

            {/* Right Cards */}
            <div className="flex flex-col gap-4">
              {[
                {
                  title: "FILMMAKERS & VIDEO CREATORS",
                  desc: "Level up your storytelling with AI-powered video creation.",
                },
                {
                  title: "AD & MARKETING PROFESSIONALS",
                  desc: "Create high-converting ads and brand content using AI tools.",
                },
                {
                  title: "CONTENT CREATORS & INFLUENCERS",
                  desc: "Produce scroll-stopping reels and videos faster with AI.",
                },
                {
                  title: "DESIGNERS & CREATIVE PROFESSIONALS",
                  desc: "Expand your skillset with AI-driven visuals and workflows.",
                },
                {
                  title: "FREELANCERS & AGENCY OWNERS",
                  desc: "Offer AI video services and grow your income streams.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="
              w-full
              rounded-[24px]
              bg-[#282A2C]
              px-[20px]
              py-[18px]
              transition-all
              duration-300
              hover:bg-[#323436]
              hover:border
              hover:border-[#D0E46A]
            "
                >
                  <h3
                    className="
                text-white
                text-[20px]
                md:text-[24px]
                font-black
                uppercase
              "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                mt-2
                text-[#9FA2A4]
                text-[14px]
                md:text-[15px]
                leading-6
              "
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <TestimonialsSection/>
      <section
        className="relative w-full bg-[#0F1112] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bannerimage.png')", // Replace with your background image
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/55"></div>

        <div className="relative max-w-[1366px] mx-auto px-4 sm:px-6 md:px-[50px] lg:px-[93px] py-16 flex justify-center">
          <div
            className="
        relative
        w-full
        max-w-[430px]
        rounded-[24px]
        border
        border-[#D0E46A]
        bg-[#101112]
        p-8
        shadow-2xl
      "
          >
            {/* Offer Badge */}
          {/* Offer Badge */}
<div
  className="
    absolute
    top-0
    right-0

    rounded-tr-[24px]
    rounded-bl-[14px]

    bg-[#D0E46A]

    px-[20px]
    py-[8px]
  "
>
  <span
    className="
      text-[#111111]
      font-[Montserrat]
      text-[11px]
      leading-[16px]
      font-black
      uppercase
      tracking-wide
    "
  >
    70% OFF TODAY
  </span>
</div>

{/* Title */}
<h2
  className="
    mt-[8px]
    text-white
    font-[Montserrat]
    text-[36px]
    leading-[44px]
    font-black
  "
>
  Workshop Access
</h2>

{/* Subtitle */}
<p
  className="
    mt-[8px]
    text-[#A4A7A8]
    font-[Montserrat]
    text-[15px]
    leading-[22px]
    font-medium
  "
>
  Everything you need to start creating AI Films.
</p>

{/* Price */}
<div className="flex items-end gap-[8px] mt-[32px]">
  <h3
    className="
      text-white
      font-[Montserrat]
      text-[54px]
      leading-none
      font-black
    "
  >
    ₹299
  </h3>

  <span
    className="
      text-[#666666]
      font-[Montserrat]
      text-[28px]
      leading-none
      font-bold
      line-through
      mb-[6px]
    "
  >
    ₹999
  </span>
</div>

{/* Features */}
<div className="mt-[32px] space-y-[18px]">
  {[
    "Full Live Session Access",
    "Lifetime Recording Access",
    "Verified Certificate",
    "Exclusive Prompt Pack",
    "Private Community Access",
  ].map((item) => (
    <div key={item} className="flex items-center gap-[12px]">
      <div
        className="
          flex
          items-center
          justify-center
          w-[20px]
          h-[20px]
          rounded-full
          bg-[#D0E46A]
        "
      >
        <span className="text-[#111111] text-[11px] font-bold">✓</span>
      </div>

      <span
        className="
          text-[#ECECEC]
          font-[Montserrat]
          text-[16px]
          leading-[24px]
          font-medium
        "
      >
        {item}
      </span>
    </div>
  ))}
</div>

{/* Button */}
<button
  type="button"
  className="
    mt-[32px]

    flex
    w-full
    h-[52px]

    justify-center
    items-center
    gap-[4px]

    px-[30px]
    py-[12px]

    rounded-[8px]

    bg-[#D0E46A]
    hover:bg-[#C4DB59]

    text-[#111111]
    font-[Montserrat]
    text-[18px]
    leading-[28px]
    font-extrabold
    uppercase

    transition-all
    duration-300
    cursor-pointer
  "
>
  BOOK MY SEAT NOW
</button>

{/* Footer */}
<p
  className="
    mt-[12px]
    text-center
    text-[#7F8283]
    font-[Montserrat]
    text-[11px]
    leading-[16px]
    font-medium
  "
>
  Spots are filling up fast. Secure yours today.
</p>
          

      
           
          </div>
        </div>
      </section>


      <section className="w-full bg-[#0F1112]">
        <div className="max-w-[1366px] mx-auto px-4 sm:px-6 md:px-[50px] lg:px-[93px] py-16">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2
              className="
              text-white
              font-black
              uppercase
              text-[34px]
              sm:text-[44px]
              lg:text-[56px]
              tracking-[-1px]
            "
            >
              Frequently-Asked Questions
            </h2>
          </div>

          {/* FAQ Items */}
          <div className="max-w-[1180px] mx-auto space-y-6">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="
                rounded-[20px]
                border
                border-[#2F3133]
                bg-[#111214]
                overflow-hidden
              "
              >
                <button
                  onClick={() => setActive(active === index ? -1 : index)}
                  className="
                  w-full
                  flex
                  justify-between
                  items-center
                  px-7
                  py-6
                  text-left
                "
                >
                  <h3 className="text-white font-bold text-[18px] md:text-[22px]">
                    {item.question}
                  </h3>

                  <span className="text-white text-3xl font-light">
                    {active === index ? "−" : "+"}
                  </span>
                </button>

                {active === index && (
                  <div className="px-7 pb-7">
                    <p className="text-[#A2A5A6] text-[15px] md:text-[16px] leading-8">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
