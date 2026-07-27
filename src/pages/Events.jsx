import { CalendarDays, Filter } from "lucide-react";

export default function EventsPage() {
  const events = [
    {
      image: "/Event Banner.png",
      tag: "WORKSHOP",
      title: "Mastering SaaS UI/UX",
      date: "Oct 24, 2026 · 10:00 AM",
      description:
        "Learn the principles of creating high-conversion SaaS interfaces with live workshops and feedback.",
      host: "Alex Rivera",
      hostImage: "/User.png",

      attendees: "42 attending",
    },
    {
      image: "/Webinar.png",
      tag: "WEBINAR",
      title: "Community Growth Strategies",
      date: "Oct 26, 2026 · 02:00 PM",
      description:
        "A deep dive into how to scale your community from 0 to 10k members organically.",
      host: "Sarah Chen",
      hostImage: "/User 2.png",
      attendees: "128 attending",
    },
    {
      image: "/Meetup.png",
      tag: "MEETUP",
      title: "Designers Social Night",
      date: "Oct 28, 2026 · 06:30 PM",
      description:
        "Casual networking event for local designers to share work and grab drinks.",
      host: "David Miller",
      hostImage: "/User 3.png",
      attendees: "15 attending",
    },
  ];

  return (
  <section className="w-full bg-[#05080D] flex justify-center">
    <div
      className="
        w-full
        max-w-[1366px]
        px-5
        md:px-[93px]
        pt-[32px]
        pb-[120px]
        md:pb-[293px]
        flex
        flex-col
        items-start
        gap-[32px]
      "
    >
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row gap-4 md:gap-0 items-start md:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <h1
            className="
              text-[#F0F0F0]
              font-montserrat
              text-[28px]
              md:text-[32px]
              font-bold
              leading-[36px]
              md:leading-[40px]
            "
          >
            Events
          </h1>

          <div className="flex bg-[#282A2C] rounded-[8px] p-[4px]">
            <button className="px-[16px] py-[6px] bg-[#0F1112] rounded-[6px] text-white text-[14px]">
              Upcoming
            </button>

            <button className="px-[16px] py-[6px] text-[#767779] text-[14px]">
              Past
            </button>
          </div>
        </div>

        <button
          className="
            w-full
            md:w-auto
            flex
            items-center
            justify-center
            gap-[4px]
            px-[16px]
            py-[8px]
            rounded-[4px]
            bg-[#D0E46A]
            text-[#0F1112]
            font-montserrat
            text-[14px]
            font-bold
            leading-[24px]
          "
        >
          Create Event
        </button>
      </div>

      {/* Filters */}
      <div className="w-full flex flex-col md:flex-row gap-4 md:gap-0 md:items-center justify-between border-t border-[#1E293B] pt-[24px]">
        <div className="flex flex-wrap gap-[12px]">
          <button
            className="
              flex
              items-center
              gap-[8px]
              px-[16px]
              py-[10px]
              rounded-[8px]
              border
              border-[#303133]
              bg-[#141618]
              text-[#DCDCDC]
            "
          >
            <CalendarDays size={16} />
            All Dates
          </button>

          <button
            className="
              flex
              items-center
              gap-[8px]
              px-[16px]
              py-[10px]
              rounded-[8px]
              border
              border-[#303133]
              bg-[#141618]
              text-[#DCDCDC]
            "
          >
            <Filter size={16} />
            All Types
          </button>
        </div>

        <div className="text-[#767779] text-[14px]">
          Sort by: <span className="text-white">Upcoming</span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
        {events.map((event, index) => (
          <div
            key={index}
            className="
              group
              bg-[#0F1112]
              border border-[#282A2C]
              rounded-2xl
              overflow-hidden
              transition-all
              duration-500
              hover:border-[#E4A76D]
              hover:-translate-y-2
              hover:shadow-[0_20px_50px_rgba(228,167,109,0.15)]
            "
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="
                  w-full
                  h-[220px]
                  md:h-[240px]
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-110
                "
              />

              <span
                className="
                  absolute
                  top-4
                  right-4
                  px-3
                  py-1
                  bg-black/60
                  backdrop-blur-md
                  border
                  border-[#E4A76D]
                  rounded-full
                  text-[#E4A76D]
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                "
              >
                {event.tag}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 md:p-6 flex flex-col">
              <p className="text-[#767779] text-sm">{event.date}</p>

              <h3
                className="
                  mt-3
                  text-white
                  text-[20px]
                  md:text-[22px]
                  font-semibold
                  leading-[30px]
                  md:leading-[32px]
                "
              >
                {event.title}
              </h3>

              <p
                className="
                  mt-3
                  text-[#9A9A9A]
                  text-[14px]
                  leading-6
                "
              >
                {event.description}
              </p>

              <div className="mt-5">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <img
                      src={event.hostImage || "/default-avatar.png"}
                      alt={event.host}
                      className="w-4 h-4 rounded-full object-cover"
                    />

                    <span className="text-[#DCDCDC] text-[12px]">
                      {event.host}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <img
                      src="/Usericon.svg"
                      alt="users"
                      className="w-4 h-4"
                    />

                    <span className="text-[#BDBDBD] text-sm">
                      {event.attendees}
                    </span>
                  </div>
                </div>

                <button
                  className="
                    w-full
                    flex
                    justify-center
                    items-center
                    gap-[4px]
                    px-[16px]
                    py-[8px]
                    rounded-[4px]
                    border
                    border-[#F0F0F0]
                    text-[#F0F0F0]
                    text-[14px]
                    font-bold
                    leading-[24px]
                    transition-all
                    duration-300
                    hover:bg-[#F0F0F0]
                    hover:text-[#0F1112]
                  "
                >
                  RSVP NOW
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)}