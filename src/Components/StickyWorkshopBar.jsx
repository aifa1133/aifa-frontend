import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StickyWorkshopBar() {
  const navigate = useNavigate();

  return (
    <div
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-[9999]

        bg-[#0F1112]
        border-t
        border-[#222426]
      "
    >
      <div
        className="
          max-w-[1366px]
          mx-auto

          px-[24px]
          py-[24px]
        "
      >
        <div
          className="
            w-full
            max-w-[1180px]
            mx-auto

            flex
            justify-between
            items-center
          "
        >
          {/* Left */}

          <div>
            <div className="flex items-center gap-[16px]">
              <h3
                className="
                  text-white
                  font-[Montserrat]
                  text-[32px]
                  leading-none
                  font-black
                "
              >
                AI Filmmaking WORKSHOP
              </h3>

              <span
                className="
                  text-[#D0E46A]
                  text-[32px]
                  leading-none
                  font-black
                "
              >
                ₹399
              </span>

              <span
                className="
                  text-[#777777]
                  text-[24px]
                  line-through
                  font-bold
                "
              >
                ₹999
              </span>
            </div>

            <p
              className="
                mt-[4px]
                text-[#D0E46A]
                text-[13px]
                uppercase
                font-semibold
              "
            >
              LIMITED SEATS AVAILABLE
            </p>
          </div>

          {/* Button */}

          <button
            onClick={() => navigate("/workshops/confirmation")}
            className="
              flex
              h-[52px]

              px-[30px]
              py-[12px]

              justify-center
              items-center
              gap-[4px]

              rounded-[8px]

              bg-[#D0E46A]
              hover:bg-[#C4DB59]

              text-[#111111]
              font-[Montserrat]
              text-[18px]
              leading-[28px]
              font-extrabold

              transition-all
              duration-300
            "
          >
            Book your seat
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
