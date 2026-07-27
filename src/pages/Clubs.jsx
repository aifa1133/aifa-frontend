export default function ClubsPage() {
  return (
    <section className="w-full bg-[#05080D] flex justify-center">
      <div
        className="
          w-full
          max-w-[1366px]
          px-5
          md:px-[93px]
          py-[48px]
          flex
          flex-col
          justify-center
          items-center
          gap-[59px]
        "
      >
        {/* Hero Section */}
        <div className="w-full flex flex-col items-center gap-[8px]">
          <h1
            className="
              font-montserrat
              text-[28px]
              md:text-[36px]
              font-semibold
              leading-[34px]
              md:leading-[42px]
              text-center
              text-[#F0F0F0]
            "
          >
            Find Your City Club
          </h1>

          <p
            className="
              text-[#767779]
              text-center
              font-montserrat
              text-[16px]
              md:text-[18px]
              font-normal
              leading-[24px]
              md:leading-[28px]
            "
          >
            Connect with filmmakers, actors & creators in your city.
            Your local network starts here.
          </p>
        </div>

        {/* Current City Card */}
        <div
          className="
            w-full
            flex
            flex-col
            lg:flex-row
            justify-between
            items-center
            rounded-[24px]
            border
            border-[#414243]
            bg-[#D0E46A]
            shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]
            overflow-hidden
          "
        >
          {/* Left Content */}
          <div className="w-full p-5 md:p-[32px] flex flex-col gap-[16px]">
            <span
              className="
                inline-flex
                items-center
                gap-[8px]
                px-[12px]
                py-[4px]
                rounded-full
                border
                border-[#BC6853]
                bg-[#BC68531A]
                text-[#BC6853]
                font-montserrat
                text-[12px]
                font-medium
                leading-[16px]
                w-fit
              "
            >
              AUTO-DETECTED
            </span>

            <h2
              className="
                font-montserrat
                text-[24px]
                md:text-[28px]
                font-bold
                text-[#0F1112]
              "
            >
              We think you're in Hyderabad
            </h2>

            <p className="max-w-[500px] text-[14px] leading-[22px] text-[#414243]">
              Join 1,200+ local creators already collaborating in the
              Hyderabad Film Club.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="
                  w-full
                  sm:w-auto
                  flex
                  items-center
                  justify-center
                  gap-[4px]
                  px-[16px]
                  py-[8px]
                  rounded-[4px]
                  bg-[#d0eb47]
                  text-[#0F1112]
                  font-montserrat
                  text-[14px]
                  font-bold
                  leading-[24px]
                  transition-all
                  duration-300
                  hover:bg-[#C5DB5F]
                "
              >
                Join Hyderabad Club
                <img
                  src="/Arrow left club.svg"
                  alt="arrow"
                  className="w-[16px] h-[16px]"
                />
              </button>

              <button
                className="
                  w-full
                  sm:w-auto
                  flex
                  justify-center
                  items-center
                  gap-[8px]
                  px-[16px]
                  py-[8px]
                  rounded-[4px]
                  bg-[#F0F0F0]
                  text-[#0F1112]
                  font-montserrat
                  text-[14px]
                  font-bold
                  leading-[18px]
                "
              >
                Change City
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div
            className="
              relative
              w-full
              lg:w-[589px]
              h-[220px]
              md:h-[301px]
              overflow-hidden
              flex-shrink-0
            "
          >
            <img
              src="/hyderabad-city.png"
              alt="Hyderabad City"
              className="w-full h-full object-cover"
            />
          </div>
        </div>




        {/* Popular Clubs */}
       <div className="w-full flex flex-col gap-[24px]">
  {/* Header */}
  <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
    <h2 className="text-[#F0F0F0] text-[20px] md:text-[24px] font-semibold">
      Popular City Clubs
    </h2>

    <input
      placeholder="Search your city..."
      className="
        w-full
        md:w-[260px]
        h-[40px]
        rounded-[6px]
        border
        border-[#2A2D30]
        bg-transparent
        px-[12px]
        text-white
        outline-none
      "
    />
  </div>

  {[1, 2, 3].map((item) => (
    <div
      key={item}
      className="
        w-full
        flex
        flex-col
        lg:flex-row
        rounded-[16px]
        border
        border-[#303133]
        bg-[#282A2C]
        overflow-hidden
      "
    >
      {/* Image */}
      <img
        src="/Delhi.png"
        alt="Delhi Club"
        className="
          w-full
          lg:w-[288px]
          h-[220px]
          lg:h-[218px]
          object-cover
          flex-shrink-0
        "
      />

      {/* Content */}
      <div
        className="
          flex-1
          px-5
          md:px-[32px]
          py-5
          md:py-[24px]
          flex
          flex-col
          lg:flex-row
          gap-6
          lg:items-center
          justify-between
        "
      >
        {/* Left Text */}
        <div className="max-w-[620px]">
          <h3
            className="
              text-[#F0F0F0]
              font-montserrat
              text-[20px]
              md:text-[24px]
              font-bold
              leading-[28px]
              md:leading-[32px]
            "
          >
            Delhi Theater & Film
          </h3>

          <p
            className="
              mt-[8px]
              text-[#DCDCDC]
              font-montserrat
              text-[14px]
              md:text-[16px]
              font-normal
              leading-[22px]
              md:leading-[24px]
            "
          >
            Documentary and theater focus community. Join the most
            prestigious collective of stage actors and independent
            documentarians in the capital.
          </p>

          <div className="flex flex-wrap items-center gap-[12px] md:gap-[16px] mt-[12px]">
            <span className="text-[#767779] text-[12px]">
              600 Members
            </span>

            <span className="text-[#767779] text-[12px]">
              15 Events / Month
            </span>
          </div>
        </div>

        {/* Join Button */}
        <button
          className="
            w-full
            lg:w-auto
            flex
            items-center
            justify-center
            gap-[4px]
            px-[30px]
            py-[12px]
            rounded-[8px]
            bg-[#D0E46A]
            text-[#0F1112]
            font-montserrat
            text-[14px]
            font-bold
            leading-[24px]
            transition-all
            duration-300
            hover:bg-[#C5DB5F]
          "
        >
          Join Club
        </button>
      </div>
    </div>
  ))}
</div>
        {/* Benefits Section */}
<div
  className="
    w-full
    pt-[48px]
    md:pt-[64px]
    flex
    flex-col
    items-start
    border-t
    border-[#1E293B]
  "
>
  <div
    className="
      w-full
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-4
      gap-[32px]
      md:gap-[40px]
    "
  >
    <div className="flex flex-col items-center text-center">
      <div className="w-[56px] h-[56px] rounded-full bg-[#0F2347]" />

      <h3 className="mt-[24px] text-[#F0F0F0] text-[16px] md:text-[18px] font-semibold leading-[26px] md:leading-[28px]">
        Find collaborators
      </h3>

      <p className="mt-[8px] text-[#767779] text-[14px] md:text-[16px] leading-[22px] md:leading-[24px]">
        Connect with directors, DPs, and actors living in your neighborhood.
      </p>
    </div>

    <div className="flex flex-col items-center text-center">
      <div className="w-[56px] h-[56px] rounded-full bg-[#0F2347]" />

      <h3 className="mt-[24px] text-[#F0F0F0] text-[16px] md:text-[18px] font-semibold leading-[26px] md:leading-[28px]">
        Local shoots & events
      </h3>

      <p className="mt-[8px] text-[#767779] text-[14px] md:text-[16px] leading-[22px] md:leading-[24px]">
        Stay updated on casting calls and film festivals happening in your city.
      </p>
    </div>

    <div className="flex flex-col items-center text-center">
      <div className="w-[56px] h-[56px] rounded-full bg-[#0F2347]" />

      <h3 className="mt-[24px] text-[#F0F0F0] text-[16px] md:text-[18px] font-semibold leading-[26px] md:leading-[28px]">
        Real creators
      </h3>

      <p className="mt-[8px] text-[#767779] text-[14px] md:text-[16px] leading-[22px] md:leading-[24px]">
        Verified profiles and local projects to help you build your portfolio.
      </p>
    </div>

    <div className="flex flex-col items-center text-center">
      <div className="w-[56px] h-[56px] rounded-full bg-[#0F2347]" />

      <h3 className="mt-[24px] text-[#F0F0F0] text-[16px] md:text-[18px] font-semibold leading-[26px] md:leading-[28px]">
        Offline network
      </h3>

      <p className="mt-[8px] text-[#767779] text-[14px] md:text-[16px] leading-[22px] md:leading-[24px]">
        Take your online connections to the real world with city meetups.
      </p>
    </div>
  </div>
</div>

      </div>
      
    </section>
    
  );
}
