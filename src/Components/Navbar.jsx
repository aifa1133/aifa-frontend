// "use client";

// import { useState } from "react";
// import { Menu, X, ChevronDown } from "lucide-react";

// const navLinks = [
//   { name: "COURSES", dropdown: true },
//   { name: "HIRE TALENT" },
//   { name: "JOBS" },
//   { name: "RESOURCES", dropdown: true },
//   { name: "COMMUNITY", dropdown: true },
//   { name: "SERVICES" },
// ];

// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <header className="fixed top-0 w-full z-50 bg-black border-b border-white/10">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//         {/* LOGO */}
//         <h1 className="text-xl font-bold tracking-wide flex items-center">
//           <img src="/logos/Group1logo.svg" alt="logo" className="h-6" />
//         </h1>

//         {/* DESKTOP MENU */}
//         <nav className="hidden md:flex items-center gap-6">
//           {navLinks.map((item, i) => (
//             <div
//               key={i}
//               className="relative group flex items-center gap-1 cursor-pointer"
//             >
//               <span className="text-gray-300 text-xs font-semibold tracking-widest hover:text-[#C7E36B] transition">
//                 {item.name}
//               </span>

//               {item.dropdown && (
//                 <ChevronDown
//                   size={12}
//                   className="text-gray-400 group-hover:rotate-180 transition"
//                 />
//               )}

//               {/* underline */}
//               <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>
//             </div>
//           ))}
//         </nav>

//         {/* RIGHT BUTTONS */}
//         <div className="hidden md:flex items-center gap-2">
//           <button className="px-3 py-1 text-xs text-black bg-white rounded hover:opacity-90 transition">
//             + login
//           </button>

//           <button className="px-3 py-1 text-xs text-white border border-white rounded hover:bg-white hover:text-black transition">
//             JOIN
//           </button>
//         </div>

//         {/* MOBILE */}
//         <div className="md:hidden text-white">
//           <button onClick={() => setOpen(!open)}>
//             {open ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* MOBILE MENU */}
//       <div
//         className={`md:hidden bg-black transition-all duration-500 overflow-hidden ${
//           open ? "max-h-[400px]" : "max-h-0"
//         }`}
//       >
//         <div className="flex flex-col px-6 py-4 gap-4">
//           {navLinks.map((item, i) => (
//             <div
//               key={i}
//               className="flex justify-between items-center border-b border-gray-800 pb-2"
//             >
//               <span className="text-gray-200 text-sm">{item.name}</span>
//               {item.dropdown && <ChevronDown size={14} />}
//             </div>
//           ))}

//           <button className="mt-4 py-2 bg-white text-black rounded">
//             + login
//           </button>

//           <button className="py-2 border border-white text-white rounded">
//             JOIN
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const navLinks = [
  {
    name: "COURSES",
    dropdown: [
      { label: "BOOTCAMP", path: "/bootcamp" },
      { label: "VIDEO COURSES", path: "/coursespage" },
      { label: "WORKSHOPS", path: "/workshops" },
    ],
  },
  { name: "HIRE TALENT", link: "/hire-talent" },
  // { name: "CourseFullPage", link: "/bootcamp" },

  { name: "JOBS", link: "/jobs" },
  {
    name: "RESOURCES",
    dropdown: [
      { label: "PROMPT LIBRARY", path: "/prompt-library" },
      { label: "WORKFLOW", path: "/workflow" },
      { label: "PROJECTS", path: "/projects" },
      { label: "LEARNING TIPS", path: "/learning" },
      { label: "AI DEALS", path: "/deals" },
    ],
  },
  {
    name: "COMMUNITY",
    dropdown: [
      { label: "FORUMS", path: "/forums" },
      { label: "EVENTS", path: "/events" },
      { label: "CLUBS", path: "/clubs" },
      { label: "CHALLENGES", path: "/challenges" },
      { label: "AWARDS", path: "/awards" },
    ],
  },
  { name: "SERVICES", link: "/services" },
];

export default function Navbar({ onLoginClick, onSignupClick }) {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("aifa_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("aifa_token");
    localStorage.removeItem("aifa_user");
    setUser(null);
    setShowUserMenu(false);
    navigate("/");
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0F1112] border-b border-white/10">
      <div
        className="
      w-full

      flex
      items-center
      justify-between

      px-[16px]
py-[14px]

sm:px-[20px]
md:px-[40px]
lg:px-[93px]
lg:py-[20px]
    "
      >
        {/* LOGO */}
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Link to="/">
            <img
              src="/logos/aifabetalogo.svg"
              alt="logo"
              className="h-[20px] sm:h-[22px] lg:h-6 cursor-pointer"
            />
          </Link>
          {/* BETA BADGE */}
        </h1>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((item, i) => (
            <div key={i} className="relative group">
              {/* MAIN ITEM */}
              <div className="flex items-center gap-1 cursor-pointer">
                {item.link ? (
                  <Link
                    to={item.link}
                    className="text-[#F0F0F0] font-montserrat text-[14px] leading-[16px] font-bold text-center hover:text-[#C7E36B] transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span className="text-[#F0F0F0] font-montserrat text-[14px] leading-[16px] font-bold text-center hover:text-[#C7E36B] transition">
                    {item.name}
                  </span>
                )}

                {item.dropdown && (
                  <img
                    src="/logos/keywordarrow.svg"
                    alt="dropdown"
                    className="w-[16px] h-[16px]"
                  />
                )}
              </div>

              {/* UNDERLINE */}
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>

              {/* DROPDOWN */}
              {item.dropdown && (
                <div className="absolute left-0 top-full mt-3 w-[220px] bg-[#0F1112] border border-[#414243] rounded-[8px] overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  {item.dropdown.map((sub, idx) => {
                    const isObject = typeof sub === "object";

                    return isObject ? (
                      <Link
                        key={idx}
                        to={sub.path}
                        className="flex items-center gap-[10px] px-[18px] py-[16px] text-[#F0F0F0] font-montserrat text-[16px] leading-[24px] font-semibold border-t border-[#414243] first:border-none hover:bg-[#C7E36B] hover:text-[#0F1112] transition relative before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:bg-transparent hover:before:bg-[#D0E46A]"
                      >
                        {sub.label}
                      </Link>
                    ) : (
                      <span
                        key={idx}
                        className="flex items-center gap-[10px] px-[18px] py-[16px] text-[#F0F0F0] font-montserrat text-[16px] leading-[24px] font-semibold border-t border-[#414243] first:border-none hover:bg-[#C7E36B] hover:text-[#0F1112] transition cursor-pointer"
                      >
                        {sub}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* RIGHT BUTTONS */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-[16px] py-[8px] rounded-[6px] border border-white/20 text-[#F0F0F0] text-[14px] font-bold font-montserrat hover:bg-[#C7E36B] hover:text-[#0F1112] transition-all"
              >
                <span className="w-7 h-7 rounded-full bg-[#C7E36B] text-black flex items-center justify-center font-bold text-sm">
                  {user.name?.[0]?.toUpperCase()}
                </span>
                {user.name?.split(" ")[0]}
                <ChevronDown
                  size={14}
                  className={`transition-all ${showUserMenu ? "rotate-180" : ""}`}
                />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-[200px] bg-[#0F1112] border border-[#414243] rounded-[8px] overflow-hidden z-50">
                  <Link
                    to={user.role === "admin" ? "/admin" : "/dashboard"}
                    onClick={() => setShowUserMenu(false)}
                    className="block px-4 py-3 text-[#F0F0F0] text-sm hover:bg-[#C7E36B] hover:text-[#0F1112] border-b border-[#414243]"
                  >
                    My Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-400 text-sm hover:bg-[#C7E36B] hover:text-[#0F1112]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={onLoginClick}
                className="px-[16px] py-[8px] text-[#F0F0F0] text-[14px] leading-[16px] font-bold font-montserrat rounded-[6px] transition-all duration-200 hover:bg-[#C7E36B] hover:text-[#0F1112] active:scale-[0.97]"
              >
                LOGIN
              </button>
              <button
                onClick={onSignupClick}
                className="flex items-center justify-center gap-[4px] px-[16px] py-[8px] rounded-[4px] border border-[#F0F0F0] bg-transparent text-[#F0F0F0] font-montserrat text-[14px] font-bold leading-[18px] transition-all duration-300 hover:bg-[#C7E36B] hover:text-[#0F1112] hover:border-[#C7E36B] hover:cursor-pointer active:scale-[0.97]"
              >
                JOIN
              </button>
              <button className="flex items-center justify-center gap-[8px] px-[16px] py-[8px] rounded-[4px] bg-[#F0F0F0] text-[#0F1112] font-montserrat text-[14px] font-bold leading-[24px] transition-all duration-300 hover:bg-[#C7E36B] active:scale-[0.97] hover:cursor-pointer">
                TALK TO SALES
                <img
                  src="/logos/Arrowleftsales.svg"
                  alt="arrow"
                  className="w-[14px] h-[14px]"
                />
              </button>
            </>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setOpen(!open)}
            className="
      w-[40px]
h-[40px]
      flex
      items-center
      justify-center
      rounded-[8px]
      border
      border-white/10
      bg-white/5
    "
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`
    md:hidden
    overflow-hidden
    transition-all
    duration-500
    bg-[#0F1112]
    border-t
    border-white/10
    ${open ? "max-h-[1000px]" : "max-h-0"}
  `}
      >
        <div className="px-[20px] py-[20px] flex flex-col gap-[14px]">
          {navLinks.map((item, i) => (
            <div
              key={i}
              className="
          rounded-[12px]
          border
          border-white/10
          bg-white/[0.03]
          overflow-hidden
        "
            >
              <div
                onClick={() =>
                  item.dropdown &&
                  setOpenDropdown(openDropdown === i ? null : i)
                }
                className="
            flex
            items-center
            justify-between
            px-[16px]
            py-[15px]
            cursor-pointer
          "
              >
                {item.link ? (
                  <Link
                    to={item.link}
                    onClick={() => setOpen(false)}
                    className="text-[#F0F0F0] text-[14px] font-semibold"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span className="text-[#F0F0F0] text-[14px] font-semibold">
                    {item.name}
                  </span>
                )}

                {item.dropdown && (
                  <ChevronDown
                    size={16}
                    className={`transition-all duration-300 ${
                      openDropdown === i ? "rotate-180" : ""
                    }`}
                  />
                )}
              </div>

              {item.dropdown && openDropdown === i && (
                <div className="px-[16px] pb-[16px] flex flex-col gap-[12px]">
                  {item.dropdown.map((sub, idx) => {
                    const isObject = typeof sub === "object";

                    return isObject ? (
                      <Link
                        key={idx}
                        to={sub.path}
                        onClick={() => setOpen(false)}
                        className="text-[#BDBDBD] text-[13px] hover:text-[#C7E36B]"
                      >
                        {sub.label}
                      </Link>
                    ) : (
                      <span
                        key={idx}
                        className="text-[#BDBDBD] text-[13px] hover:text-[#C7E36B] cursor-pointer"
                      >
                        {sub}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {/* MOBILE BUTTONS */}
          <div className="flex flex-col gap-[12px] pt-[8px]">
            {user ? (
              <>
                <Link
                  to={user.role === "admin" ? "/admin" : "/dashboard"}
                  onClick={() => setOpen(false)}
                  className="h-[48px] rounded-[10px] bg-[#C7E36B] text-black text-[14px] font-bold flex items-center justify-center"
                >
                  My Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="h-[48px] rounded-[10px] border border-red-400 text-red-400 text-[14px] font-bold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="h-[48px] rounded-[10px] bg-[#F0F0F0] text-[#0F1112] text-[14px] font-bold"
                >
                  LOGIN
                </button>
                <button
                  onClick={onSignupClick}
                  className="h-[48px] rounded-[10px] border border-[#F0F0F0] text-[#F0F0F0] text-[14px] font-bold"
                >
                  JOIN
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
