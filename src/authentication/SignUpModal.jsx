"use client";

export default function SignUpModal({ onClose, onSwitchToLogin }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
    >
      {/* CONTAINER */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-[#0B0F10] rounded-[32px] p-6 md:p-10 relative border border-white/10"
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white text-2xl"
        >
          ✕
        </button>

        {/* HEADER */}
        <p className="text-gray-400 text-sm mb-1">Step 1 Of 2</p>
        <h2 className="text-white text-3xl md:text-4xl font-semibold mb-8">
          Sign up
        </h2>

        {/* NAME */}
        <input
          type="text"
          placeholder="Enter Name"
          className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white mb-4 outline-none"
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white mb-4 outline-none"
        />

        {/* PHONE */}
        <div className="flex gap-3 mb-6">
          <div className="flex items-center gap-2 border border-white/20 rounded-xl px-4 py-3 text-white">
            +91
            <span className="text-xs">⌄</span>
          </div>

          <input
            type="text"
            placeholder="Enter Phone"
            className="flex-1 bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white outline-none"
          />
        </div>

        {/* BUTTON */}
        <button className="w-full bg-[#C7E36B] text-black py-3 rounded-md font-semibold">
          + CONTINUE
        </button>

        {/* ✅ LOGIN SWITCH FIX */}
        <p className="text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={onSwitchToLogin}
            className="text-blue-400 cursor-pointer"
          >
            Click here
          </span>
        </p>

        {/* TERMS */}
        <p className="text-gray-500 text-xs mt-6">
          By creating an account I have read and agree to{" "}
          <span className="text-blue-400">Terms</span> and{" "}
          <span className="text-blue-400">Privacy policy</span>
        </p>
      </div>
    </div>
  );
}
