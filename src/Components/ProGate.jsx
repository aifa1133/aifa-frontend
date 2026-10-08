"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function readIsPro() {
  try {
    const user = JSON.parse(localStorage.getItem("aifa_user") || "null");
    return !!(user?.isPro || user?.role === "admin");
  } catch {
    return false;
  }
}

export function useIsPro() {
  const [isPro, setIsPro] = useState(readIsPro);
  useEffect(() => {
    const refresh = () => setIsPro(readIsPro());
    window.addEventListener("storage", refresh);
    window.addEventListener("aifa_user_updated", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("aifa_user_updated", refresh);
    };
  }, []);
  return isPro;
}

export function ProUpgradeModal({ onClose }) {
  const navigate = useNavigate();
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="relative bg-[#111315] border border-white/10 rounded-2xl p-8 w-full max-w-md text-center shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>

        <span className="inline-block bg-white/10 text-gray-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
          Pro Membership
        </span>

        <h2 className="text-white text-2xl font-black mb-3 leading-snug">
          Unlock Exclusive Student Benefits
        </h2>

        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          Your current membership doesn't include access to Jobs, Resources, and community features
        </p>

        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-gray-500 mb-8">
          {["Job Opportunities", "Premium Learning Resources", "Community Access", "Member Benefits"].map((f, i, arr) => (
            <span key={f} className="flex items-center gap-3">
              {f}
              {i < arr.length - 1 && <span className="text-white/20">|</span>}
            </span>
          ))}
        </div>

        <button
          onClick={() => navigate("/bootcamp/enroll")}
          className="w-full bg-[#C7E36B] text-black font-black py-3 rounded-xl text-base hover:opacity-90 transition"
        >
          Upgrade to Pro
        </button>
      </div>
    </div>
  );
}

export default function ProGate({ children, preview }) {
  const [showModal, setShowModal] = useState(false);
  const isPro = useIsPro();

  if (isPro) return <>{children}</>;

  return (
    <>
      {/* Preview (unblurred top section) */}
      {preview}

      {/* Blurred content with click-to-unlock overlay */}
      <div className="relative cursor-pointer" onClick={() => setShowModal(true)}>
        <div className="pointer-events-none select-none blur-sm opacity-60">
          {children}
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
          <div className="bg-[#111315]/90 border border-white/10 rounded-2xl px-6 py-4 flex items-center gap-3 shadow-xl">
            <svg width="18" height="18" fill="none" stroke="#C7E36B" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span className="text-white text-sm font-semibold">Pro Members Only — Tap to Unlock</span>
          </div>
        </div>
      </div>

      {showModal && <ProUpgradeModal onClose={() => setShowModal(false)} />}
    </>
  );
}
