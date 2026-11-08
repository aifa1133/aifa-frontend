import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.jsx";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
export const GOOGLE_OAUTH_ENABLED = Boolean(GOOGLE_CLIENT_ID && !GOOGLE_CLIENT_ID.includes("your_google"));

/* ── Global fetch interceptor: prefix /api and /uploads with backend URL in production ── */
const API_BASE = import.meta.env.VITE_API_BASE || "";
const _fetch = window.fetch.bind(window);
window.fetch = async (...args) => {
  if (API_BASE) {
    const url = typeof args[0] === "string" ? args[0] : (args[0] instanceof Request ? args[0].url : "");
    if (url.startsWith("/api/") || url.startsWith("/uploads/")) {
      args[0] = API_BASE + url;
    }
  }
  const res = await _fetch(...args);
  if (res.status === 401) {
    const url = typeof args[0] === "string" ? args[0] : (args[0]?.url || "");
    // Don't intercept auth endpoints — they legitimately return 401 for wrong credentials
    if (!url.includes("/api/auth/") && !url.includes("/api/admin/login")) {
      const hasStudentToken = !!localStorage.getItem("aifa_token");
      const hasAdminToken   = !!localStorage.getItem("aifa_admin_token");
      if (hasStudentToken || hasAdminToken) {
        localStorage.removeItem("aifa_token");
        localStorage.removeItem("aifa_user");
        localStorage.removeItem("aifa_admin_token");
        localStorage.removeItem("aifa_admin_user");
        // Redirect: admin goes to /adminlogin, students go to home
        const isAdmin = window.location.pathname.startsWith("/admin");
        window.location.href = isAdmin ? "/adminlogin" : "/";
      }
    }
  }
  return res;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || "placeholder"}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
);
