import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

/* ─── Inline icons ─── */
const Ic = ({ d, size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={d} />
  </svg>
);
const ICONS = {
  dashboard: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
  referrals: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
  payouts: "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z",
  logout: "M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z",
};
const I = ({ name, size = 16, className = "" }) => <Ic d={ICONS[name] || ICONS.dashboard} size={size} className={className} />;

const NAV = [
  { to: "/influencer/dashboard", label: "Dashboard", icon: "dashboard" },
  { to: "/influencer/referrals", label: "Referrals", icon: "referrals" },
  { to: "/influencer/payouts", label: "Payouts", icon: "payouts" },
];

export default function InfluencerLayout() {
  const navigate = useNavigate();
  const [me, setMe] = useState(null);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("influencer_token");
    if (!token) return;

    const cached = localStorage.getItem("influencer_user");
    if (cached) { try { setMe(JSON.parse(cached)); } catch { /* ignore */ } }

    fetch("/api/influencer/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => {
        if (r.status === 401) {
          localStorage.removeItem("influencer_token");
          localStorage.removeItem("influencer_user");
          navigate("/influencer/login", { replace: true });
          return null;
        }
        return r.ok ? r.json() : null;
      })
      .then((d) => {
        if (d) {
          setMe(d);
          localStorage.setItem("influencer_user", JSON.stringify(d));
        }
      })
      .catch(() => {});
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("influencer_token");
    localStorage.removeItem("influencer_user");
    navigate("/influencer/login", { replace: true });
  };

  const name = me?.fullName || "Influencer";

  return (
    <div className="flex h-screen bg-[#0B0F10] text-white overflow-hidden">
      {/* Logout confirmation */}
      {showLogout && (
        <div className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center p-4">
          <div className="bg-[#0F1112] border border-white/10 rounded-2xl w-full max-w-xs p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <I name="logout" size={22} className="text-red-400" />
            </div>
            <h3 className="text-white font-bold text-base mb-1">Log Out?</h3>
            <p className="text-xs text-gray-400 mb-6">You will be signed out of your influencer portal.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowLogout(false)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors">
                Cancel
              </button>
              <button onClick={logout}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors">
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="w-[200px] shrink-0 bg-[#0F1112] border-r border-white/5 flex flex-col">
        <div className="px-5 py-5 border-b border-white/5 flex items-center gap-2">
          <img src="/logos/aifabetalogo.svg" alt="AIFA" className="h-5" onError={(e) => { e.target.style.display = "none"; }} />
          <div>
            <p className="text-white font-black text-sm leading-none">AIFA</p>
            <p className="text-[9px] text-[#C7E36B] font-bold uppercase tracking-wider mt-1">Influencer</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-3">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `w-full flex items-center gap-2.5 px-4 py-2.5 text-[12px] font-medium transition-all ${
                  isActive
                    ? "border-l-2 border-[#C7E36B] text-[#C7E36B] bg-white/5"
                    : "border-l-2 border-transparent text-gray-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <I name={item.icon} size={14} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/5 px-4 py-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-[#C7E36B] flex items-center justify-center">
            {me?.profilePhoto
              ? <img src={me.profilePhoto} alt="" className="w-full h-full object-cover" />
              : <span className="text-black text-xs font-black">{name[0].toUpperCase()}</span>}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] text-white font-semibold truncate">{name}</p>
            <p className="text-[9px] text-gray-500 truncate">{me?.couponCode || "—"}</p>
          </div>
          <button onClick={() => setShowLogout(true)} title="Log out"
            className="text-gray-500 hover:text-red-400 shrink-0 transition-colors">
            <I name="logout" size={13} />
          </button>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <Outlet context={{ me, setMe }} />
      </main>
    </div>
  );
}
