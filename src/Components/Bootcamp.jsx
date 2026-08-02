

"use client";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BootcampCardMobile from "./BootcampCardMobile";

const bootcamps = [
  {
    title: "AI Filmmaking Workshop",

    image: "/bootcamp/bootcamp1.png",
    duration: "3 HOURS",
    price: "INR 999.00",
    date: "25-JUL-2026 | 10 AM",
  },
  {
    title: "AI Advertising Workshop",
    image: "/bootcamp/bootcamp2.png",
    duration: "3 HOURS",
    price: "INR 999.00",
    date: "28-JUL-2026 | 3 PM",
  },
  {
    title: "AI Animation Workshop",
    image: "/bootcamp/bootcamp3.png",
    duration: "3 HOURS",
    price: "INR 999.00",
    date: "30-JUL-2026 | 5 PM",
  },
  {
    title: "AI Content Creation Workshop",
    image: "/bootcamp/bootcamp4.png",
    duration: "3 HOURS",
    price: "INR 999.00",
    date: "30-JUL-2026 | 4 PM",
  },
];

export default function Bootcamps() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-[#0F1112] flex justify-center py-[40px] sm:py-[64px]">
      {/* CONTAINER */}
      <div
        className="
          w-full
          max-w-[1440px]
          mx-auto
          px-[16px]
          sm:px-[24px]
          md:px-[40px]
          lg:px-[60px]
          flex
          flex-col
          gap-[32px]
          sm:gap-[48px]
        "
      >
        {/* HEADING */}
        <h2 className="text-[#F0F0F0] font-montserrat font-black text-[22px] sm:text-[32px] md:text-[40px] text-center sm:text-left">
          AI FILMMAKING WORKSHOPS
        </h2>

        {/* LIST */}
        <div className="flex flex-col gap-[12px] sm:gap-[10px]">
          {bootcamps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="hidden sm:block bg-[#0F1415] rounded-[20px] overflow-hidden">
                {/* GRID STRUCTURE */}
                <div className="grid grid-cols-1 lg:grid-cols-[266px_1fr] grid-rows-[auto_auto] gap-[8px] p-[12px] sm:p-[16px]">
                  {/* IMAGE */}
                  <div
                    className="
                    w-full
                    h-[180px]
                    sm:h-[200px]
                    lg:w-[266px]
                    lg:h-[200px]
                    overflow-hidden
                    rounded-[20px]
                  "
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* RIGHT CONTENT */}
                  <div className="flex flex-col gap-[8px]">
                    {/* TITLE */}
                    <div className="flex flex-col justify-center items-start h-[80px] sm:h-[105px] px-[12px] py-[10px] bg-[#DCDCDC] rounded-tr-[20px]">
                      <h3 className="text-[#282A2C] font-montserrat font-bold text-[16px] sm:text-[24px] md:text-[36px] leading-tight">
                        {item.title}
                      </h3>
                    </div>

                    {/* INFO BOXES */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-[8px]">
                      {/* DURATION */}
                      <div className="flex flex-col p-[12px] sm:p-[20px] gap-[6px] bg-[#DCDCDC] rounded-[8px]">
                        <p className="flex items-center gap-[4px] text-[10px] sm:text-[12px] font-semibold text-[#414243]">
                          <img
                            src="/Clockicon.svg"
                            alt="clock"
                            className="w-[12px] h-[12px] object-contain"
                          />
                          DURATION
                        </p>

                        <p className="text-[12px] sm:text-[14px] font-bold text-[#282A2C]">
                          {item.duration}
                        </p>
                      </div>

                      {/* PRICING */}
                      <div className="flex flex-col p-[12px] sm:p-[20px] gap-[6px] bg-[#DCDCDC] rounded-[8px]">
                        <p className="flex items-center gap-[4px] text-[10px] sm:text-[12px] font-semibold text-[#414243]">
                          <img
                            src="/moneyicon.svg"
                            alt="money"
                            className="w-[12px] h-[12px] object-contain"
                          />
                          PRICING
                        </p>

                        <p className="text-[12px] sm:text-[14px] font-bold text-[#282A2C]">
                          {item.price}
                        </p>
                      </div>

                      {/* DATE & TIME */}
                      <div className="flex flex-col p-[12px] sm:p-[20px] gap-[6px] bg-[#DCDCDC] rounded-[8px]">
                        <p className="flex items-center gap-[4px] text-[10px] sm:text-[12px] font-semibold text-[#414243]">
                          <img
                            src="/laptopicon.svg"
                            alt="date"
                            className="w-[12px] h-[12px] object-contain"
                          />
                          DATE & TIME
                        </p>

                        <p className="text-[12px] sm:text-[14px] font-bold text-[#282A2C]">
                          {item.date}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* RESERVE BUTTON */}

                  {/* ACTION BUTTONS */}
                  <div className="lg:col-span-2 flex flex-col gap-[8px] mt-[8px]">
                    {/* View Details */}
                    <button
                      type="button"
                      onClick={() => navigate("/workshops/ai-filmmaking")}
                      className="
      flex
      w-full
      justify-center
      items-center
      px-[30px]
      py-[12px]
      rounded-[8px]
      bg-[#F2FEB1]
      text-[#0F1112]
      font-[Montserrat]
      text-[18px]
      font-bold
      leading-[28px]
      hover:bg-[#EAF99A]
      transition-all
      duration-300
      cursor-pointer
    "
                    >
                      View Details
                    </button>

                    {/* Reserve Spot */}
                    <button
                      type="button"
                      onClick={() => navigate("/workshops")}
                      className="
      flex
      w-full
      justify-center
      items-center
      px-[30px]
      py-[10px]
      gap-[4px]
      rounded-b-[20px]
      bg-[#D0E46A]
      text-[#1A1A1A]
      font-[Montserrat]
      text-[14px]
      font-bold
      uppercase
      hover:bg-[#BDD250]
      transition-all
      duration-300
      cursor-pointer
    "
                    >
                      RESERVE SPOT
                      <img
                        src="/Arrowleft2.svg"
                        alt="arrow"
                        className="w-[16px] h-[16px]"
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="block sm:hidden">
                <BootcampCardMobile item={item} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
