"use client";

export default function Footer() {
  const socialIcons = [
    { src: "/Vector 1.svg", alt: "LinkedIn", link: "#" },
    { src: "/Icon 21.svg", alt: "YouTube", link: "#" },
    { src: "/Group 21.svg", alt: "Facebook", link: "#" },
    { src: "/Vector 21.svg", alt: "Instagram", link: "#" },
  ];

  return (
    <footer className="w-full bg-[#0B0F10] pt-8 md:pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* 🔝 TOP BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 bg-gradient-to-r from-[#2a2d31] to-[#3a3d42] rounded-xl px-4 md:px-6 py-4">
          {/* LEFT */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-white text-center md:text-left">
            <span className="text-xs md:text-sm font-medium">FOLLOW US</span>

            {/* SOCIAL ICONS */}
            <div className="flex gap-2 md:gap-3">
              {socialIcons.map((icon, i) => (
                <a
                  key={i}
                  href={icon.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 p-2 rounded-md hover:bg-white/20 transition"
                >
                  <img
                    src={icon.src}
                    alt={icon.alt}
                    className="w-4 h-4 object-contain"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT DROPDOWN */}
          <div className="flex items-center gap-2 border border-white/20 px-3 md:px-4 py-2 rounded-lg text-white text-xs md:text-sm cursor-pointer hover:bg-white/10 transition">
            INR
            <img
              src="/Vector 212.svg"
              alt="arrow"
              className="w-3 h-3 md:w-4 md:h-4 opacity-70"
            />
          </div>
        </div>

        {/* 🔽 BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-gray-400 text-xs md:text-sm gap-3 md:gap-4 text-center md:text-left">
          {/* LEFT */}
          <p>© AIFA AI Film Academy</p>

          {/* RIGHT LINKS */}
          <div className="flex flex-wrap gap-3 md:gap-6 justify-center">
            <span className="hover:text-white cursor-pointer transition">
              PRIVACY POLICY
            </span>
            <span className="hover:text-white cursor-pointer transition">
              TERMS & CONDITIONS
            </span>
            <span className="hover:text-white cursor-pointer transition">
              END-USER LICENSE AGREEMENTS
            </span>
            <span className="hover:text-white cursor-pointer transition">
              COPYRIGHTS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
