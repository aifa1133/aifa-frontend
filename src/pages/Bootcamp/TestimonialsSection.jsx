import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";

const testimonials = [
  {
    name: "K. Krishna Vamsi",
    role: "AI Filmmaker",
    text: "“Before joining AIFA, I only had theoretical knowledge. The practical sessions, mentorship, and assignments helped me build real-world skills that I can confidently apply.",
    img: "/testnew1.png",
  },
  {
    name: "CH. Sridhar",
    role: "AI Video Editor",
    text: `The learning experience was simple, practical, and career-focused.

AIFA breaks down complex AI concepts into easy-to-understand lessons.
I was able to create projects and improve my portfolio within a short time.`,
    img: "/testnew2.png",
  },
  {
    name: "M. P. C. H. Manikanta",
    role: "AI Motion Graphics Artist",
    text: "AIFA helped me build confidence for freelance opportunities. After completing the training, I was able to create better client projects and present my work professionally.",
    img: "/testnew3.png",
  },
  {
    name: "Sampath Vinay Kumar G",
    role: "AI Animator",
    text: "The course content is regularly updated with the latest AI tools and workflows. Every session is practical, engaging, and immediately useful for real client work.",
    img: "/testnew4.png",
  },
  {
    name: "Rizwan",
    role: "Freelance Graphic Designer",
    text: "AIFA completely changed the way I use AI. The hands-on projects, expert guidance, and community support helped me become more confident, efficient, and competitive.",
    img: "/testnew5.png",
  },
];

export default function TestimonialsSection() {
  const [startIndex, setStartIndex] = useState(0);

  const nextCards = () => {
    if (startIndex + 3 < testimonials.length) {
      setStartIndex(startIndex + 1);
    } else {
      setStartIndex(0);
    }
  };
  return (
    <section className="w-full bg-[#0F1112] overflow-hidden">
      <div
        className="
          w-full
          max-w-[1366px]
          mx-auto
          px-[50px]
          py-[48px]

          max-md:px-[30px]
          max-sm:px-[16px]
          max-sm:py-[40px]
        "
      >
        {/* HEADER */}
        <div
          className="
            relative
            flex
            flex-col
            items-center
            justify-center
            mb-[28px]

            max-sm:mb-[24px]
          "
        >
          {/* SMALL HEADING */}
          <p
            className="
              text-[#F0F0F0]
              text-[13px]
              font-bold
              uppercase
              tracking-[0.5px]
              leading-[20px]
              mb-[12px]

              max-sm:text-[12px]
              max-sm:mb-[8px]
            "
          >
            TESTIMONIALS
          </p>

          {/* MAIN HEADING */}
          <h2
            className="
              text-[#F0F0F0]
              text-center
              uppercase
              font-black

              text-[36px]
              leading-[42px]
              tracking-[-0.8px]

              max-md:text-[32px]
              max-md:leading-[38px]

              max-sm:text-[28px]
              max-sm:leading-[34px]
              max-sm:tracking-[-0.5px]
            "
          >
            HEAR WHAT OUR
            <br />
            TRAINEES HAVE TO SAY
          </h2>

          {/* NEXT BUTTON */}
          <button
            type="button"
            onClick={nextCards}
            aria-label="Next testimonial"
            className="
              absolute
              right-0
              bottom-[5px]

              w-[62px]
              h-[48px]

              flex
              items-center
              justify-center

              rounded-[12px]

              bg-[#D0E46A]
              text-[#0F1112]

              transition-all
              duration-300

              hover:scale-[1.05]
              hover:bg-[#E0F47A]

              max-md:hidden
            "
          >
            <FaArrowRight className="text-[16px]" />
          </button>
        </div>

        {/* TESTIMONIAL CARDS */}
        <div
          className="
    grid
    grid-cols-3
    gap-[22px]

    max-lg:grid-cols-2
    max-md:grid-cols-1
    max-sm:gap-[16px]
  "
        >
          {testimonials.slice(startIndex, startIndex + 3).map((item, index) => (
            <div
              key={index}
              className="
                flex
                flex-col

                rounded-[18px]
                overflow-hidden

                border
                border-[#343638]

                bg-[#282A2C]

                transition-all
                duration-300

                hover:border-[#D0E46A]
                hover:-translate-y-[3px]

                max-sm:rounded-[16px]
              "
            >
              {/* REVIEW */}
              <div
                className="
                  flex-1

                  px-[24px]
                  pt-[22px]
                  pb-[24px]

                  min-h-[185px]

                  max-sm:px-[18px]
                  max-sm:py-[18px]
                  max-sm:min-h-0
                "
              >
                <p
                  className="
                    text-[#F0F0F0]

                    text-[14px]
                    font-normal

                    leading-[20px]

                    max-sm:text-[13px]
                    max-sm:leading-[20px]
                  "
                >
                  {item.text}
                </p>
              </div>

              {/* DIVIDER */}
              <div className="w-full h-[1px] bg-[#3B3D3F]" />

              {/* USER DETAILS */}
              <div
                className="
                  flex
                  items-center

                  gap-[12px]

                  px-[24px]
                  py-[16px]

                  bg-[#282A2C]

                  max-sm:px-[18px]
                  max-sm:py-[14px]
                "
              >
                {/* PROFILE IMAGE */}
                <img
                  src={item.img}
                  alt={item.name}
                  className="
                    w-[42px]
                    h-[42px]

                    rounded-full
                    object-cover

                    shrink-0
                  "
                />

                {/* NAME + ROLE */}
                <div className="flex flex-col">
                  <h3
                    className="
                      text-[#F0F0F0]

                      text-[16px]
                      font-bold
                      leading-[22px]

                      max-sm:text-[15px]
                    "
                  >
                    {item.name}
                  </h3>

                  <p
                    className="
                      text-[#CFCFCF]

                      text-[12px]
                      font-normal
                      leading-[18px]

                      mt-[2px]
                    "
                  >
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
