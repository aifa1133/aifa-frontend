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
//               <span className="text-gray-300 text-xs font-semibold tracking-widest hover:text-white transition">
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

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  {
    name: "COURSES",
    dropdown: [
      { label: "BOOTCAMP", path: "/bootcamp" },
      { label: "VIDEO COURSES", path: "/courses" },
      { label: "WORKSHOPS", path: "/workshops" },
    ],
  },
  { name: "HIRE TALENT", link: "/hire-talent" },
  { name: "CourseFullPage", link: "/bootcamp" },

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
    dropdown: ["FORUMS", "EVENTS", "CLUBS", "CHALLENGES", "AWARDS"],
  },
  { name: "SERVICES", link: "/services" },
];

export default function Navbar({ onLoginClick, onSignupClick }) {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <header className="fixed top-0 w-full z-50 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* LOGO */}
        <h1 className="text-xl font-bold flex items-center">
          <img src="/logos/Group1logo.svg" alt="logo" className="h-6" />
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
                    className="text-gray-300 text-xs font-semibold tracking-widest hover:text-white transition"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span className="text-gray-300 text-xs font-semibold tracking-widest hover:text-white transition">
                    {item.name}
                  </span>
                )}

                {item.dropdown && (
                  <ChevronDown
                    size={12}
                    className="text-gray-400 group-hover:rotate-180 transition"
                  />
                )}
              </div>

              {/* UNDERLINE */}
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>

              {/* DROPDOWN */}
              {item.dropdown && (
                <div className="absolute left-0 top-full mt-3 w-48 bg-[#111] border border-white/10 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  {item.dropdown.map((sub, idx) => {
                    const isObject = typeof sub === "object";

                    return isObject ? (
                      <Link
                        key={idx}
                        to={sub.path}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                      >
                        {sub.label}
                      </Link>
                    ) : (
                      <span
                        key={idx}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer"
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
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={onLoginClick}
            className="px-3 py-1 text-xs text-black bg-white rounded hover:opacity-90 transition"
          >
            + login
          </button>

          <button
            onClick={onSignupClick}
            className="px-3 py-1 text-xs text-white border border-white rounded hover:bg-white hover:text-black transition"
          >
            JOIN
          </button>
        </div>

        {/* MOBILE TOGGLE */}
        <div className="md:hidden text-white">
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden bg-black transition-all duration-500 overflow-hidden ${
          open ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map((item, i) => (
            <div key={i} className="border-b border-gray-800 pb-2">
              {/* HEADER */}
              <div
                onClick={() => setOpenDropdown(openDropdown === i ? null : i)}
                className="flex justify-between items-center cursor-pointer"
              >
                {item.link ? (
                  <Link
                    to={item.link}
                    onClick={() => setOpen(false)}
                    className="text-gray-200 text-sm"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span className="text-gray-200 text-sm">{item.name}</span>
                )}

                {item.dropdown && <ChevronDown size={14} />}
              </div>

              {/* DROPDOWN ITEMS */}
              {item.dropdown && openDropdown === i && (
                <div className="mt-2 flex flex-col gap-2 pl-3">
                  {item.dropdown.map((sub, idx) => {
                    const isObject = typeof sub === "object";

                    return isObject ? (
                      <Link
                        key={idx}
                        to={sub.path}
                        onClick={() => setOpen(false)}
                        className="block text-gray-400 text-xs hover:text-white"
                      >
                        {sub.label}
                      </Link>
                    ) : (
                      <span
                        key={idx}
                        className="block text-gray-400 text-xs hover:text-white cursor-pointer"
                      >
                        {sub}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {/* BUTTONS */}
          <button
            onClick={onLoginClick}
            className="mt-4 py-2 bg-white text-black rounded"
          >
            + login
          </button>

          <button
            onClick={onSignupClick}
            className="py-2 border border-white text-white rounded"
          >
            JOIN
          </button>
        </div>
      </div>
    </header>
  );
}
