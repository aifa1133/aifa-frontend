export default function Forums() {
  const threads = [
    {
      votes: 24,
      tag: "SEO",
      title: "How to improve Google rankings in 2026?",
      description:
        "Looking for advanced SEO strategies that are currently working for local businesses and service-based companies.",
      author: "Saikiran",
      authorImage: "https://i.pravatar.cc/40?img=1",
      time: "2 hours ago",
      replies: 18,
    },
    {
      votes: 16,
      tag: "Marketing",
      title: "Best lead generation methods for real estate?",
      description:
        "What channels are generating the highest quality leads for real estate companies right now?",
      author: "Rahul",
      authorImage: "https://i.pravatar.cc/40?img=2",
      time: "5 hours ago",
      replies: 12,
    },
    {
      votes: 32,
      tag: "Web Development",
      title: "React vs Next.js for business websites",
      description:
        "Trying to decide whether React or Next.js is the better option for SEO-friendly company websites.",
      author: "Priya",
      authorImage: "https://i.pravatar.cc/40?img=3",
      time: "1 day ago",
      replies: 25,
    },
  ];

  return (
    <section className="w-full bg-[#05080D] px-5 md:px-[93px] py-[48px] md:py-[64px]">
      <div className="max-w-[1180px] mx-auto flex flex-col gap-6">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-start md:items-center justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <button className="px-4 py-2 rounded bg-[#D4E157] text-black text-sm font-medium">
              All Categories
            </button>

            <button className="px-4 py-2 rounded bg-[#1E2228] text-[#A1A1A1] text-sm">
              Latest
            </button>

            <button className="text-[#A1A1A1] text-sm">Most Upvoted</button>

            <button className="text-[#A1A1A1] text-sm">Unanswered</button>
          </div>

          <button className="w-full md:w-auto px-5 py-3 rounded bg-[#D4E157] text-black font-semibold">
            Create Thread
          </button>
        </div>

        {/* Threads */}
        <div className="flex flex-col gap-4">
          {threads.map((thread, index) => (
            <div
              key={index}
              className="
                bg-[#15191F]
                border
                border-[#282A2C]
                rounded-xl
                p-4
                md:p-6
                flex
                gap-4
                md:gap-5
                hover:border-[#D4E157]
                transition-all
              "
            >
              {/* Votes */}
              <div className="w-[48px] flex flex-col items-center gap-2 flex-shrink-0">
                <button className="text-[#767779] hover:text-white">↑</button>

                <span className="text-white font-semibold">{thread.votes}</span>

                <button className="text-[#767779] hover:text-white">↓</button>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="bg-[#FF7A59] text-white text-[10px] px-2 py-1 rounded">
                    {thread.tag}
                  </span>

                  <h3 className="text-white text-[18px] md:text-xl font-semibold">
                    {thread.title}
                  </h3>
                </div>

                <p className="text-[#767779] text-sm leading-6">
                  {thread.description}
                </p>

                <div className="mt-5 flex flex-col md:flex-row gap-4 md:gap-0 md:items-center justify-between">
                  <div className="flex flex-wrap items-center gap-3">
                    <img
                      src={thread.authorImage}
                      alt={thread.author}
                      className="w-6 h-6 rounded-full"
                    />

                    <span className="text-[#DCDCDC] text-sm">
                      {thread.author}
                    </span>

                    <span className="text-[#767779] text-xs">
                      {thread.time}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 md:gap-5">
                    <span className="text-[#767779] text-sm">
                      💬 {thread.replies} replies
                    </span>

                    <button className="text-[#767779] text-sm hover:text-white">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-4">
          <button
            className="
              w-full
              md:w-auto
              border
              border-[#F0F0F0]
              px-6
              py-2
              text-white
              text-sm
              rounded
              hover:bg-white
              hover:text-black
              transition-all
            "
          >
            LOAD MORE THREADS
          </button>
        </div>
      </div>
    </section>
  );
}
