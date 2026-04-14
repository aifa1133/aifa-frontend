import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { name: "COURSES", dropdown: true },
  { name: "HIRE TALENT" },
  { name: "JOBS" },
  { name: "RESOURCES", dropdown: true },
  { name: "COMMUNITY", dropdown: true },
  { name: "SERVICES" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-black">
      {/* Gradient strip background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a0000_0%,#2a0000_20%,#1a0000_40%,#2a0000_60%,#1a0000_80%,#2a0000_100%)] opacity-90"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold tracking-wide">
          <span className="text-yellow-400">AI</span>
          <span className="text-white">VA</span>
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item, i) => (
            <div
              key={i}
              className="relative group flex items-center gap-1 cursor-pointer"
            >
              <span className="text-gray-200 text-xs font-semibold tracking-widest hover:text-white transition">
                {item.name}
              </span>

              {item.dropdown && (
                <ChevronDown
                  size={14}
                  className="text-gray-400 transition-transform duration-300 group-hover:rotate-180"
                />
              )}

              {/* underline animation */}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </div>
          ))}
        </nav>

        {/* Right Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button className="px-4 py-1 text-xs text-white border border-gray-500 rounded bg-white/10 hover:bg-white hover:text-black transition">
            + Login
          </button>

          <button className="px-4 py-1 text-xs text-white border border-gray-500 rounded hover:bg-white hover:text-black transition">
            JOIN
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden text-white">
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-black transition-all duration-500 overflow-hidden ${
          open ? "max-h-[400px]" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b border-gray-800 pb-2"
            >
              <span className="text-gray-200 text-sm">{item.name}</span>

              {item.dropdown && (
                <ChevronDown size={16} className="text-gray-400" />
              )}
            </div>
          ))}

          <button className="mt-4 py-2 border border-gray-600 text-white rounded">
            + Login
          </button>

          <button className="py-2 border border-gray-600 text-white rounded">
            JOIN
          </button>
        </div>
      </div>
    </header>
  );
}
