import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * Gate for every /influencer/* page.
 * No `influencer_token` in localStorage → bounce to the influencer login page.
 */
export default function InfluencerAuthGuard() {
  const location = useLocation();
  const token = localStorage.getItem("influencer_token");

  if (!token) {
    return <Navigate to="/influencer/login" replace state={{ from: location.pathname }} />;
  }
  return <Outlet />;
}
