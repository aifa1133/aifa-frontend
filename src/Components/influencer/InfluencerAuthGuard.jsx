import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function InfluencerAuthGuard() {
  const location = useLocation();
  const [status, setStatus] = useState(() =>
    localStorage.getItem("influencer_token") ? "ok" : "loading"
  );

  useEffect(() => {
    if (status !== "loading") return;
    const studentToken = localStorage.getItem("aifa_token");
    if (!studentToken) { setStatus("login"); return; }

    fetch("/api/auth/influencer-token", {
      headers: { Authorization: `Bearer ${studentToken}` },
    })
      .then(r => r.json())
      .then(d => {
        if (d?.influencerToken) {
          localStorage.setItem("influencer_token", d.influencerToken);
          if (d.influencer) localStorage.setItem("influencer_user", JSON.stringify(d.influencer));
          setStatus("ok");
        } else {
          setStatus("login");
        }
      })
      .catch(() => setStatus("login"));
  }, [status]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0B0F10] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#C7E36B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "login") {
    return <Navigate to="/influencer/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
