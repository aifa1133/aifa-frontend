import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.jsx";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
export const GOOGLE_OAUTH_ENABLED = Boolean(GOOGLE_CLIENT_ID && !GOOGLE_CLIENT_ID.includes("your_google"));

/* ── Global 401 interceptor — auto-logout on expired token ── */
const _fetch = window.fetch.bind(window);
window.fetch = async (...args) => {
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
