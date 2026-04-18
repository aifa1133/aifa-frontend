"use client";

import { useState } from "react";

export default function LoginModal({ onClose, onSwitchToSignup }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
    >
      {/* MODAL */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[#0B0F10] rounded-2xl p-6 md:p-8 relative border border-white/10"
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-xl"
        >
          ✕
        </button>

        {/* HEADER */}
        <p className="text-gray-400 text-sm">Step 1 Of 2</p>
        <h2 className="text-white text-3xl font-semibold mb-6">Login</h2>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white mb-4 outline-none"
        />

        {/* PASSWORD */}
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter Your Password"
          className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white mb-3 outline-none"
        />

        {/* SHOW PASSWORD */}
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            onChange={() => setShowPassword(!showPassword)}
          />
          <span className="text-gray-400 text-sm">Show password</span>
        </div>

        {/* CAPTCHA */}
        <div className="bg-[#1a1f22] border border-white/10 rounded-lg p-4 flex justify-between items-center mb-6">
          <span className="text-green-400 text-sm">✔ Success!</span>
          <span className="text-xs text-gray-400">Cloudflare</span>
        </div>

        {/* BUTTON */}
        <button className="w-full bg-[#C7E36B] text-black py-3 rounded-md font-semibold mb-4">
          + VERIFY AND LOGIN
        </button>

        {/* FORGOT */}
        <p className="text-center text-blue-400 text-sm mb-6 cursor-pointer">
          forgot password?
        </p>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-[1px] bg-white/10"></div>
          <span className="text-gray-500 text-xs">OR</span>
          <div className="flex-1 h-[1px] bg-white/10"></div>
        </div>

        {/* PHONE */}
        <button className="w-full border border-white/20 text-white py-3 rounded-md mb-4">
          Login Via Phone Number
        </button>

        {/* GOOGLE */}
        <button className="w-full border border-white/20 text-white py-3 rounded-md flex justify-center gap-2">
          <img src="/icons/google.png" className="w-4 h-4" />
          Login Via Google
        </button>

        {/* SIGNUP SWITCH */}
        <p className="text-center text-gray-400 text-sm mt-6">
          or create an account on Aifa?{" "}
          <span
            onClick={onSwitchToSignup}
            className="text-white underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
