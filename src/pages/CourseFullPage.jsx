"use client";
import { useState } from "react";
import {
  FaSignal,
  FaClock,
  FaFileAlt,
  FaDownload,
  FaLaptopCode,
  FaClosedCaptioning,
  FaCertificate,
  FaInfinity,
  FaCalendarAlt,
  FaMinus,
  FaPlus,
  FaArrowRight,
} from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function CourseAndBenefits() {
  const benefits = [
    "UNDERSTAND AI VIDEO MODELS",
    "MASTER PROMPTING FOR VISUALS",
    "CREATE CINEMATIC SCENES",
    "CONTROL STYLE & CONSISTENCY",
    "BUILD END-TO-END VIDEOS",
    "USE AI TOOLS & WORKFLOWS",
    "CREATE ADS & SOCIAL CONTENT",
    "EDIT & ENHANCE WITH AI",
    "BUILD A STRONG PORTFOLIO",
  ];
  const items = [
    {
      title: "LIFETIME AIFA MEMBERSHIP",
      desc: "Access to the AIFA ecosystem, updates, and opportunities.",
    },
    {
      title: "STEP-BY-STEP CURRICULUM",
      desc: "Follow a clear path from basics to advanced.",
    },
    {
      title: "DOWNLOADABLE PROJECT FILES",
      desc: "Access all files and resources used in the course.",
    },
    {
      title: "LIVE SESSION RECORDINGS",
      desc: "Get access to all session recordings to revisit lessons anytime.",
    },
    {
      title: "ASSIGNMENTS & PRACTICAL EXERCISES",
      desc: "Apply what you learn through hands-on projects.",
    },
    {
      title: "CERTIFICATE OF COMPLETION",
      desc: "Showcase your skills with a verified certificate.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(0);

  const sessions = [
    {
      title: "Session 1: Introduction to AI Filmmaking",
      desc: "Build a cinematic AI-powered short film from concept to final output. You'll create a compelling story, generate visuals using advanced AI tools, design scenes, craft realistic voiceovers, and add music and sound effects for a polished finish.",
    },
    {
      title: "Session 2: Screen Writing",
      desc: "Learn storytelling and script structure for cinematic output.",
    },
    {
      title: "Session 3: Previsualization",
      desc: "Plan scenes visually before production using AI tools.",
    },
    {
      title: "Session 4: Prompt Engineering",
      desc: "Master prompts to generate consistent high-quality visuals.",
    },
    {
      title: "Session 5: Creating with AI",
      desc: "Hands-on creation using multiple AI tools.",
    },
    {
      title: "Session 6: Cinematography",
      desc: "Understand camera angles, lighting, and composition.",
    },
    {
      title: "Session 7: Character Design",
      desc: "Design consistent characters using AI workflows.",
    },
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const steps = [
    {
      title: "INITIAL HR CONTACT",
      desc: "Creators and aspiring filmmakers who want to add AI skills to their creative toolkit",
    },
    {
      title: "MEETING THE TEAM",
      desc: "Designers, editors, and storytellers ready to evolve into full-stack AI filmmakers",
    },
    {
      title: "INCLUSIVE AND ACCESSIBLE",
      desc: "Students and professionals who want to learn modern AI tools and real-world production workflows",
    },
    {
      title: "INCLUSIVE AND ACCESSIBLE",
      desc: "We're committed to making our recruitment process accessible to everyone. Should you require any accommodations, please let us know. We respect your privacy and will adapt the process to meet your needs, ensuring a fair and comfortable experience for all candidates.",
    },
  ];

  const instructors = [
    {
      name: "RAVI TEJA",
      img: "/images/ravi.png",
      short:
        "Ravi Teja is an AI Filmmaker and creative technologist, and one of the lead instructors at AIFA.",
      long: "He specializes in helping creators transform ideas into cinematic visuals using AI—leveraging emerging tools not just for experimentation, but to build real-world, monetizable creative projects.",
    },
    {
      name: "SHERIN",
      img: "/images/sherin.png",
      short:
        "Ravi Teja is an AI Filmmaker and creative technologist, and one of the lead instructors at AIFA.",
      long: "He specializes in helping creators transform ideas into cinematic visuals using AI—leveraging emerging tools not just for experimentation, but to build real-world, monetizable creative projects.",
    },
    {
      name: "ARUN KUMAR",
      img: "/images/arun.png",
      short:
        "Ravi Teja is an AI Filmmaker and creative technologist, and one of the lead instructors at AIFA.",
      long: "He specializes in helping creators transform ideas into cinematic visuals using AI—leveraging emerging tools not just for experimentation, but to build real-world, monetizable creative projects.",
    },
  ];

  const faqs = [
    {
      q: "How is this microcourse different from YouTube tutorials?",
      a: "Focused, structured, and practical. Each lesson is concise and designed to deliver clear results without unnecessary fluff. You'll follow a step-by-step system that builds real photo enhancement skills, not just random tips.",
    },
    {
      q: "What’s the difference between buying a single microcourse and getting All-Access?",
      a: "All-access gives you access to every course including future updates, making it more cost-effective long term.",
    },
    {
      q: "How long will I have access to the course?",
      a: "You get lifetime access to all purchased content.",
    },
    {
      q: "Do I need prior experience with AI tools?",
      a: "No, the course is beginner-friendly and guides you step-by-step.",
    },
    {
      q: "What software do I need?",
      a: "We cover industry-standard tools and AI platforms used in modern workflows.",
    },
  ];

  const testimonials = [
    {
      name: "Prerna Singh",
      role: "Ravi Teja is an AI Filmmaker.",
      text: "He specializes in helping creators transform ideas into cinematic visuals using AI—leveraging emerging tools not just for experimentation, but to build real-world, monetizable creative projects.",
      img: "/images/user1.jpg",
    },
    {
      name: "David Robert",
      role: "Ravi Teja is an AI Filmmaker.",
      text: "He specializes in helping creators transform ideas into cinematic visuals using AI—leveraging emerging tools not just for experimentation, but to build real-world, monetizable creative projects.",
      img: "/images/user1.jpg",
    },
    {
      name: "Tejasvi Kalbu",
      role: "Ravi Teja is an AI Filmmaker.",
      text: "He specializes in helping creators transform ideas into cinematic visuals using AI—leveraging emerging tools not just for experimentation, but to build real-world, monetizable creative projects.",
      img: "/images/user1.jpg",
    },
  ];
  const data = [
    {
      title: "AI SHORT FILM",
      desc: "Create a complete story-driven video with scenes and visuals.",
      img: "/bootcamp1.jpg",
    },
    {
      title: "PRODUCT AD FILM",
      desc: "Produce a high-quality commercial-style video for products or services.",
      img: "/bootcamp6.jpg",
    },
    {
      title: "SOCIAL MEDIA REELS",
      desc: "Make scroll-stopping content optimized for Instagram, YouTube, and TikTok.",
      img: "/bootcamp3.jpg",
    },
    {
      title: "CINEMATIC POSTERS",
      desc: "Design high-impact visuals for storytelling and marketing.",
      img: "/bootcamp4.jpg",
    },
    {
      title: "PORTFOLIO-READY PROJECTS",
      desc: "Build a professional portfolio to showcase your work or get clients.",
      img: "/bootcamp5.jpg",
    },
  ];
  return (
    <div className="bg-[#0B0F19]">
      {/* ================= COURSE SECTION ================= */}
      <section className="w-full flex justify-center items-center py-24 bg-gradient-to-b from-[#0B0D0E] to-[#111315]">
        <div className="w-[90%] max-w-5xl bg-[#151718] border border-[#2A2D2F] rounded-[24px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* LEFT */}
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-[#D0E46A] text-[18px] leading-[28px] font-bold font-[Montserrat] mb-3">
              A COURSE YOU’LL ACTUALLY FINISH
            </p>

            <h1 className="text-[#F0F0F0] text-[64px] leading-[70px] font-black font-[Montserrat] mb-6 max-w-[520px]">
              Build <span>AI-Powered Films</span>
              <br /> An AI Fellowship for
              <br /> Creators
            </h1>

            <button className="flex items-center justify-center w-fit px-6 py-3 rounded-[10px] bg-[#D0E46A] text-black font-bold hover:scale-[1.05] active:scale-[0.97] transition shadow-[0_0_20px_rgba(208,228,106,0.25)]">
              ENROLL NOW
            </button>
          </div>

          {/* RIGHT */}
          <div className="flex-1 flex flex-col gap-4 justify-center">
            <Feature icon="/bootcampicons/icon1.svg" text="Beginner Friendly" />
            <Feature icon="/bootcampicons/icon2.svg" text="20 Assignments" />
            <Feature
              icon="/bootcampicons/icon3.svg"
              text="Downloadable Resources"
            />
            <Feature icon="/bootcampicons/icon4.svg" text="Hands-on Training" />
            <Feature
              icon="/bootcampicons/icon5.svg"
              text="Portfolio Mentorship"
            />
            <Feature
              icon="/bootcampicons/icon6.svg"
              text="Completion Certificate"
            />
            <Feature icon="/bootcampicons/icon7.svg" text="Class Recordings" />
            <Feature icon="/bootcampicons/icon8.svg" text="1 Month Duration" />
          </div>
        </div>
      </section>

      {/* ================= BENEFITS SECTION ================= */}
      <section className="w-full py-12 flex justify-center">
        <div className="w-[90%] max-w-6xl text-center">
          <h2 className="text-[#F0F0F0] text-[64px] leading-[70px] font-black font-[Montserrat] mb-4">
            WHAT YOU WILL LEARN
          </h2>

          <p className="text-[#DCDCDC] text-[14px] leading-[28px] font-normal font-[Montserrat] text-center max-w-2xl mx-auto mb-12">
            Master the complete process of creating high-quality, cinematic AI
            videos from idea and prompting to final output.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {benefits.map((item, index) => (
              <div
                key={index}
                className="bg-[#282A2C] 
  border border-white/10 
  rounded-2xl 
  px-6 py-6 
  text-left 
  text-[#F0F0F0] 
  text-[24px] leading-[32px] 
  font-black font-[Montserrat]
  hover:scale-[1.05] 
  transition duration-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#070B14] py-24 flex justify-center">
        <div className="w-[90%] max-w-6xl">
          {/* HEADER */}
          <div className="text-center mb-20">
            <h2 className="text-[#F0F0F0] text-[64px] leading-[70px] font-black font-[Montserrat] text-center mb-4">
              WHAT YOU WILL BUILD
            </h2>
            <p className="text-[#DCDCDC] text-[16px] leading-[28px] font-normal font-[Montserrat] text-center max-w-2xl mx-auto">
              Build real, portfolio-ready projects as you learn films, ads, and
              social content created step by step.
            </p>
          </div>

          {/* ZIG-ZAG LIST */}
          <div className="flex flex-col gap-16">
            {data.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-10 ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* TEXT */}
                <div className="flex-1">
                  <p className="text-[#F0F0F0] text-[18px] leading-[28px] font-bold font-[Montserrat] mb-2">
                    BEGINNER
                  </p>

                  <h3 className="text-[#F0F0F0] text-[32px] leading-[40px] font-black font-[Montserrat] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#DCDCDC] text-[16px] leading-[24px] font-medium font-[Montserrat] max-w-md">
                    {item.desc}
                  </p>
                </div>

                {/* IMAGE */}
                <div className="flex-1">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-[584px] h-[306px] rounded-[200px] object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full py-28 bg-[#5C6335] flex justify-center relative overflow-hidden">
        {/* 🔥 Soft Background Glow */}
        <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-[#D9E7A3]/20 blur-[120px] rounded-full"></div>

        <div className="relative w-[90%] max-w-6xl grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE */}
          <div>
            <h2 className="text-[#F0F0F0] text-[40px] leading-[48px] font-black font-[Montserrat] mb-6">
              WHAT’S INCLUDED
              <br /> WITH THE
              <br /> BOOTCAMP
            </h2>

            <p
              className="text-[#DCDCDC] text-[16px] leading-[24px] font-medium font-[Montserrat] mb-10 max-w-md"
              style={{ fontKerning: "none", fontFeatureSettings: "'liga' 0" }}
            >
              Everything you need to learn, build, and grow with AI inside and
              beyond the course.
            </p>

            {/* ✅ REACT IMAGE */}
            <div className="w-[320px]">
              <img
                src="/bootcamp2.png" // 👉 put your image here
                alt="illustration"
                className="w-full object-contain drop-shadow-xl"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-6">
            {items.map((item, index) => (
              <div
                key={index}
                className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-white/20 to-transparent"
              >
                <div
                  className="rounded-2xl bg-[#D9E7A3]/95 px-6 py-5
        text-[#2E2E2E] border border-white/20
        hover:scale-[1.05] transition duration-300"
                >
                  {/* Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-white/10 blur-xl rounded-2xl"></div>

                  {/* TITLE */}
                  <h3 className="relative z-10 text-[#585F37] text-[24px] leading-[32px] font-black font-[Montserrat] mb-1">
                    {item.title}
                  </h3>

                  <p className="relative z-10 text-xs text-[#4B4B4B]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-24 bg-[#070B14] flex justify-center">
        <div className="w-[90%] max-w-5xl">
          {/* HEADER */}
          <p className="text-[#A3E635] text-sm font-semibold mb-3">
            A PERFECTLY STRUCTURED COURSE
          </p>

          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
            COURSE CONTENT
          </h2>

          <p className="text-gray-400 text-sm mb-10">
            22 Sessions . 44 Total Hours . 20 Assignments
          </p>

          {/* ACCORDION */}
          <div className="flex flex-col gap-4">
            {sessions.map((item, index) => (
              <div
                key={index}
                className="border border-white/10 rounded-xl bg-[#0F172A]/60 backdrop-blur-md overflow-hidden"
              >
                {/* HEADER */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left text-white font-medium"
                >
                  <span>{item.title}</span>
                  {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </button>

                {/* CONTENT */}
                <div
                  className={`px-6 transition-all duration-300 ${
                    openIndex === index
                      ? "max-h-40 pb-4 opacity-100"
                      : "max-h-0 opacity-0"
                  } overflow-hidden text-gray-400 text-sm`}
                >
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-24 bg-[#070B14] flex justify-center">
        <div className="w-[90%] max-w-6xl grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE */}
          <div>
            <p className="text-gray-400 text-sm mb-3 uppercase tracking-wide">
              WHAT TO EXPECT
            </p>

            <h2 className="text-white text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              RECRUITMENT <br /> PROCESS
            </h2>

            <p className="text-gray-400 text-sm md:text-base max-w-md">
              Joining our team starts with a transparent and respectful
              recruitment journey. Although our HR team is small, with just
              Jessie – our dedicated People Operations Director, we make every
              effort to respond to each applicant. Here’s what you can expect:
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-5">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-[#1A1F2E] to-[#0F172A]
              border border-white/10
              rounded-2xl px-6 py-5
              text-white
              shadow-lg
              hover:scale-[1.02]
              transition duration-300"
              >
                <h3 className="font-bold text-sm md:text-base mb-1">
                  {step.title}
                </h3>

                <p className="text-gray-400 text-xs md:text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-24 bg-[#070B14] flex justify-center">
        <div className="w-[90%] max-w-6xl">
          {/* HEADING */}
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-12">
            GET TO KNOW OUR INSTRUCTORS
          </h2>

          {/* GRID */}
          <div className="grid md:grid-cols-3 gap-6">
            {instructors.map((person, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-[#1A1F2E] to-[#0F172A]
              border border-white/10
              rounded-2xl
              overflow-hidden
              hover:scale-[1.02]
              transition duration-300"
              >
                {/* TOP SECTION */}
                <div className="p-6 border-b border-white/10">
                  {/* IMAGE */}
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border border-white/20">
                    <img
                      src={person.img}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* NAME */}
                  <h3 className="text-white font-bold text-lg mb-2">
                    {person.name}
                  </h3>

                  {/* SHORT DESC */}
                  <p className="text-gray-400 text-sm">{person.short}</p>
                </div>

                {/* BOTTOM SECTION */}
                <div className="p-6">
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {person.long}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#070B14] py-24 flex justify-center">
        <div className="w-[90%] max-w-7xl">
          {/* HEADER */}
          <div className="text-center mb-16 relative">
            <p className="text-gray-400 text-sm mb-3 tracking-wide">
              TESTIMONIALS
            </p>

            <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight">
              HEAR WHAT OUR <br /> TRAINEES HAVE TO SAY
            </h2>

            {/* ARROW BUTTON */}
            <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#A3E635] text-black p-4 rounded-xl hover:scale-105 transition">
              <FaArrowRight />
            </button>
          </div>

          {/* CARDS */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="bg-[#1A1F2E] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:scale-[1.02] transition"
              >
                {/* TEXT */}
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {item.text}
                </p>

                {/* USER */}
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div>
                    <h4 className="text-white font-semibold text-sm">
                      {item.name}
                    </h4>
                    <p className="text-gray-400 text-xs">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full py-24 bg-[#070B14] flex justify-center">
        <div className="w-[90%] max-w-4xl text-center">
          {/* TOP TEXT */}
          <p className="text-gray-400 text-sm mb-2 uppercase tracking-wide">
            NEED MORE DETAILS?
          </p>

          <h2 className="text-white text-3xl md:text-4xl font-bold mb-12">
            FREQUENTLY-ASKED QUESTIONS
          </h2>

          {/* FAQ LIST */}
          <div className="flex flex-col gap-4 text-left">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="border border-white/10 rounded-2xl bg-[#0F172A]/60 backdrop-blur-md overflow-hidden"
              >
                {/* QUESTION */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-white font-medium"
                >
                  <span>{item.q}</span>
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </button>

                {/* ANSWER */}
                <div
                  className={`px-6 transition-all duration-300 ${
                    openIndex === index
                      ? "max-h-40 pb-5 opacity-100"
                      : "max-h-0 opacity-0"
                  } overflow-hidden text-gray-400 text-sm`}
                >
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================= REUSABLE FEATURE ================= */
function Feature({ icon, text }) {
  return (
    <div className="flex items-center gap-3 px-4 py-1 rounded-[10px]  transition">
      <img
        src={icon}
        alt={text}
        className="w-[18px] h-[18px] object-contain flex-shrink-0"
      />

      <p className="text-[14px] text-[#E6E6E6] font-medium tracking-[0.2px]">
        {text}
      </p>
    </div>
  );
}
