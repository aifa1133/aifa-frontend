import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";


/* ─── ICONS (inline SVG keeps bundle tiny) ─── */
const Icon = ({ d, size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={d} />
  </svg>
);
const ICONS = {
  dashboard: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
  bootcamp: "M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z",
  workshop: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z",
  video: "M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 8l-7 4V7l7 4zm2-6.5l7 4-7 4V4.5z",
  cert: "M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z",
  jobs: "M20 6h-2.18c.07-.44.18-.88.18-1.36C18 2.51 15.5 0 12.36 0c-1.73 0-3.24.87-4.16 2.16L12 6.55l3.8-3.8c.4.4.7.86.9 1.37L13.13 8H20v12H4V8h3.13L5.97 6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z",
  resources: "M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z",
  community: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
  hire: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
  bell: "M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z",
  search: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
  logout: "M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z",
  play: "M8 5v14l11-7z",
  check: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  lock: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z",
  download: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z",
  share: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z",
  more: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z",
  edit: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
  person: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
  settings: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.57 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.21.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
  wallet: "M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z",
  upload: "M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z",
  message: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z",
  back: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z",
  print: "M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z",
  filter: "M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z",
  sort: "M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z",
  eye: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z",
  star: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
  chevron: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z",
  close: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
  copy: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z",
  link: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z",
  trash: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
  help: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z",
  receipt: "M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z",
  camera: "M12 15.2c-1.77 0-3.2-1.43-3.2-3.2 0-1.77 1.43-3.2 3.2-3.2 1.77 0 3.2 1.43 3.2 3.2 0 1.77-1.43 3.2-3.2 3.2zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z",
};

const Ic = ({ name, size = 18, className = "" }) => (
  <Icon d={ICONS[name]} size={size} className={className} />
);

/* ─── NAV ITEMS ─── */
const NAV = [
  { id: "dashboard",    label: "Dashboard",    icon: "dashboard" },
  { id: "bootcamp",     label: "Bootcamp",     icon: "bootcamp"  },
  { id: "workshops",    label: "Workshops",    icon: "workshop"  },
  { id: "video-courses",label: "Video Courses",icon: "video"     },
  { id: "certificates", label: "Certificates", icon: "cert"      },
  { id: "jobs",         label: "Jobs",         icon: "jobs"      },
  { id: "resources",    label: "Resources",    icon: "resources" },
  { id: "community",    label: "Community",    icon: "community" },
  { id: "hire-talent",  label: "Hire Talent",  icon: "hire"      },
  { id: "settings",     label: "Settings",     icon: "settings"  },
];

/* ════════════════════════════════════════════
   MAIN LAYOUT
════════════════════════════════════════════ */
export default function StudentDashboard() {
  const { section } = useParams();
  const activePage = section || "dashboard";
  const navigate = useNavigate();

  const navigateTo = (page) => {
    navigate(`/dashboard/${page}`);
  };

  const goBack = () => {
    navigate(-1);
  };

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNotif, setShowNotif] = useState(false);
  const [notifCount, setNotifCount] = useState(0);
  const [notifs, setNotifs] = useState([]);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [invoiceItem, setInvoiceItem] = useState(null);
  const [liveClass, setLiveClass] = useState(null);
  const [emailVerified, setEmailVerified] = useState(() => {
    const u = JSON.parse(localStorage.getItem("aifa_user") || "{}");
    return u.emailVerified !== false;
  });
  const token = localStorage.getItem("aifa_token");
  const notifRef = useRef(null);
  const userRef = useRef(null);

  // activePage is now derived from the URL — no sessionStorage needed

  useEffect(() => {
    if (!token) { navigate("/"); return; }
    const storedUser = JSON.parse(localStorage.getItem("aifa_user") || "{}");
    if (storedUser.role === "admin") { navigate("/admin"); return; }
    fetch("/api/users/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => {
        if (d.role === "admin") { navigate("/admin"); return; }
        setProfile(d);
        setEmailVerified(!!d.emailVerified);
        setLoading(false);
        // Auto-refresh influencer token for students whose influencer account was created after login
        if (!localStorage.getItem("influencer_token")) {
          fetch("/api/auth/influencer-token", { headers: { Authorization: `Bearer ${token}` } })
            .then(r => r.ok ? r.json() : null)
            .then(data => {
              if (data?.influencerToken) {
                localStorage.setItem("influencer_token", data.influencerToken);
                if (data.influencer) localStorage.setItem("influencer_user", JSON.stringify(data.influencer));
              }
            })
            .catch(() => {});
        }
      })
      .catch(() => setLoading(false));
  }, [navigate, token]);

  /* Fetch upcoming reserved workshop within 24 hours for live banner */
  useEffect(() => {
    if (!token || !profile?._id) return;
    fetch("/api/workshops", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : [])
      .then(data => {
        if (!Array.isArray(data)) return;
        const now = Date.now();
        const upcoming = data
          .filter(w => {
            if (!w.scheduledAt) return false;
            const t = new Date(w.scheduledAt).getTime();
            const registered = Array.isArray(w.registrations) &&
              w.registrations.some(r => (r._id || r) === profile._id);
            return registered && t >= now;
          })
          .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt));
        setLiveClass(upcoming[0] || null);
      })
      .catch(() => {});
  }, [token, profile]);

  /* Fetch real notifications */
  useEffect(() => {
    if (!token) return;
    const h = { Authorization: `Bearer ${token}` };
    const load = () => {
      fetch("/api/notifications/me", { headers: h })
        .then(r => r.ok ? r.json() : [])
        .then(d => { if (Array.isArray(d)) { setNotifs(d); setNotifCount(d.filter(n => !n.isRead).length); } })
        .catch(() => {});
    };
    load();
    // Refresh every 60s for near-realtime updates
    const interval = setInterval(load, 60000);
    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false);
      if (userRef.current && !userRef.current.contains(e.target)) setShowUserMenu(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("aifa_token");
    localStorage.removeItem("aifa_user");
    localStorage.removeItem("influencer_token");
    localStorage.removeItem("influencer_user");
    navigate("/");
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0B0F10] flex items-center justify-center">
      <div className="text-white text-lg animate-pulse">Loading dashboard...</div>
    </div>
  );

  const userName = profile?.name || "Alex Rivera";
  const userInitial = userName[0]?.toUpperCase();

  return (
    <div className="flex h-screen bg-[#0B0F10] text-white overflow-hidden">
      {/* ── SIDEBAR ── */}
      <aside className="w-[160px] shrink-0 bg-[#0F1112] border-r border-white/5 flex flex-col">
        {/* Logo */}
        <div className="px-4 py-5 border-b border-white/5">
          <img src="/logos/aifabetalogo.svg" alt="AIFA" className="h-5" />
        </div>
        {/* Nav */}
        <nav className="flex-1 py-3 px-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => !item.soon && navigateTo(item.id)}
              disabled={item.soon}
              title={item.soon ? "Coming soon" : undefined}
              className={`w-full flex items-center justify-between gap-2.5 px-3 py-2.5 text-left transition-all text-[13px] font-medium rounded-xl ${
                item.soon
                  ? "text-gray-600 cursor-not-allowed"
                  : activePage === item.id
                  ? "bg-[#FBBF24]/15 text-[#FBBF24]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Ic name={item.icon} size={16} />
                {item.label}
              </span>
              {item.soon && <span className="text-[8px] bg-white/10 text-gray-500 font-bold px-1.5 py-0.5 rounded">SOON</span>}
            </button>
          ))}
        </nav>
        {/* Influencer Portal shortcut — only shown when user has influencer access */}
        {localStorage.getItem("influencer_token") && (
          <div className="border-t border-white/5 p-3">
            <button
              onClick={() => navigate("/influencer/dashboard")}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-[#C7E36B]/10 hover:bg-[#C7E36B]/20 transition-colors text-[#C7E36B] text-[11px] font-bold"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
              Influencer Portal
            </button>
          </div>
        )}
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Live Class Banner — only shown when student has a reserved workshop starting within 24h */}
        {liveClass && (
          <div className="bg-[#6B21E8] text-white text-xs flex items-center justify-between px-6 py-2 shrink-0">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <strong>NEXT LIVE CLASS</strong>
              <span className="text-white/80 ml-2">{liveClass.title}</span>
            </span>
            <span className="flex items-center gap-4">
              <span className="text-white/80">
                ⏰ Starts at {new Date(liveClass.scheduledAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" })} IST
              </span>
              {liveClass.zoomLink ? (
                <a
                  href={liveClass.zoomLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-[#6B21E8] font-bold text-xs px-3 py-1 rounded-full hover:bg-gray-100 transition-all"
                >
                  Join Session
                </a>
              ) : (
                <button className="bg-white/30 text-white font-bold text-xs px-3 py-1 rounded-full cursor-default">
                  Link Pending
                </button>
              )}
            </span>
          </div>
        )}

        {/* Top Bar */}
        <header className="bg-[#0F1112] border-b border-white/5 px-6 py-3 flex items-center justify-between shrink-0">
          <p className="text-sm text-gray-400">
            Welcome back, <span className="text-white font-semibold">{userName}</span>
          </p>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search courses..."
                className="bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#C7E36B]/50 w-[220px]"
              />
              <Ic name="search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>

            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => { setShowNotif(!showNotif); setShowUserMenu(false); }}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all relative"
              >
                <Ic name="bell" size={16} className="text-gray-400" />
                {notifCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center px-0.5">
                    {notifCount}
                  </span>
                )}
              </button>
              {showNotif && (
                <NotificationDropdown
                  notifs={notifs}
                  onClose={() => setShowNotif(false)}
                  onMarkRead={async () => {
                    await fetch("/api/notifications/read", { method:"PUT", headers:{ Authorization:`Bearer ${token}` } });
                    setNotifCount(0);
                    setNotifs(prev => prev.map(n => ({ ...n, isRead: true })));
                  }}
                />
              )}
            </div>

            {/* Avatar */}
            <div className="relative" ref={userRef}>
              <button
                onClick={() => { setShowUserMenu(!showUserMenu); setShowNotif(false); }}
                aria-label="Open user menu"
                className="relative w-8 h-8 rounded-full overflow-visible hover:opacity-90 transition-all shrink-0"
              >
                <span className="w-8 h-8 rounded-full overflow-hidden block">
                  {profile?.profilePicture
                    ? <img src={profile.profilePicture} alt="avatar" className="w-full h-full object-cover" />
                    : <span className="w-full h-full bg-[#C7E36B] text-black font-bold text-sm flex items-center justify-center">{userInitial}</span>
                  }
                </span>
                {!emailVerified && (
                  <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-red-500 border-2 border-[#0F1112] z-10" />
                )}
              </button>
              {showUserMenu && (
                <UserMenuDropdown
                  name={userName}
                  email={profile?.email}
                  avatar={profile?.profilePicture}
                  isGuest={!emailVerified}
                  onProfile={() => { navigateTo("profile"); setShowUserMenu(false); }}
                  onSettings={() => { navigateTo("settings"); setShowUserMenu(false); }}
                  onBilling={() => { navigateTo("billing"); setShowUserMenu(false); }}
                  onLogout={() => { setShowUserMenu(false); setShowLogoutModal(true); }}
                />
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-[#0B0F10]">
          {/* Email verification banner — shown on all pages until verified */}
          {!emailVerified && !invoiceItem && <EmailVerifyBanner email={profile?.email} token={token} onVerified={() => {
            setEmailVerified(true);
            const u = JSON.parse(localStorage.getItem("aifa_user") || "{}");
            u.emailVerified = true; delete u.isGuest;
            localStorage.setItem("aifa_user", JSON.stringify(u));
            window.dispatchEvent(new Event("storage"));
            if (profile) setProfile({ ...profile, emailVerified: true });
          }} />}

          {invoiceItem ? (
            <InvoiceView item={invoiceItem} onBack={() => setInvoiceItem(null)} profile={profile} />
          ) : (
            <>
              {activePage === "dashboard" && <DashboardHome profile={profile} token={token} onNavigate={navigateTo} />}
              {activePage === "bootcamp" && <BootcampSection token={token} profile={profile} />}
              {activePage === "workshops" && <WorkshopsSection token={token} />}
              {activePage === "video-courses" && <VideoCoursesSection profile={profile} onNavigate={navigateTo} />}
              {activePage === "certificates" && <CertificatesSection token={token} profile={profile} />}
              {activePage === "jobs" && <JobsSection token={token} />}
              {activePage === "resources" && <ResourcesSection token={token} />}
              {activePage === "community" && <CommunitySection token={token} profile={profile} />}
              {activePage === "hire-talent" && <HireTalentSection token={token} />}
              {activePage === "profile" && <ProfileSection profile={profile} token={token} onUpdated={setProfile} />}
              {activePage === "settings" && <SettingsSection token={token} profile={profile} />}
              {activePage === "billing" && <BillingSection onViewInvoice={setInvoiceItem} profile={profile} />}
            </>
          )}
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111315] border border-white/10 rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/15 flex items-center justify-center mx-auto mb-4">
              <Ic name="logout" size={22} className="text-red-400" />
            </div>
            <h2 className="text-base font-bold text-white mb-1">Log out of AIFA?</h2>
            <p className="text-xs text-gray-400 mb-6">You'll need to sign in again to access your dashboard.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2.5 text-sm font-semibold border border-white/15 text-gray-300 rounded-xl hover:bg-white/5 transition-all">
                Cancel
              </button>
              <button onClick={handleLogout}
                className="flex-1 py-2.5 text-sm font-bold bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all">
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════
   NOTIFICATION DROPDOWN
════════════════════════════════════════════ */
const NOTIF_STYLE = {
  announcement: { bg:"bg-red-500/20",    icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> },
  security:     { bg:"bg-yellow-500/20", icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> },
  session:      { bg:"bg-blue-500/20",   icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  payment:      { bg:"bg-purple-500/20", icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
  resource:     { bg:"bg-green-500/20",  icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> },
  update:       { bg:"bg-green-500/20",  icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> },
  general:      { bg:"bg-white/10",      icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> },
};

function timeAgoNotif(dateStr) {
  const d = new Date(dateStr); const now = new Date();
  const diff = Math.floor((now - d) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
  if (diff < 172800) return "Yesterday";
  return new Date(dateStr).toLocaleDateString("en-IN",{day:"numeric",month:"short"});
}

function NotificationDropdown({ notifs, onClose, onMarkRead }) {
  const list = notifs || [];
  const style = t => NOTIF_STYLE[t] || NOTIF_STYLE.general;
  return (
    <div className="absolute right-0 top-full mt-2 w-[360px] bg-[#111315] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <span className="font-bold text-white text-sm">Notifications</span>
        <div className="flex items-center gap-3">
          {list.some(n => !n.isRead) && (
            <button onClick={onMarkRead} className="text-[#C7E36B] text-xs font-semibold hover:underline">Mark all as read</button>
          )}
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>
      {/* List */}
      <div className="divide-y divide-white/5 max-h-[420px] overflow-y-auto">
        {list.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <svg className="w-10 h-10 text-gray-700 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <p className="text-gray-500 text-sm font-medium">No notifications yet</p>
            <p className="text-gray-600 text-xs mt-1">You're all caught up!</p>
          </div>
        ) : list.map((n, i) => {
          const s = style(n.type);
          return (
            <div key={n._id || i} className={`px-5 py-4 hover:bg-white/5 transition-all cursor-pointer ${!n.isRead ? "bg-[#C7E36B]/3" : ""}`}>
              <div className="flex gap-3">
                <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-0.5">
                    <p className={`text-sm leading-snug ${!n.isRead ? "font-bold text-white" : "font-medium text-gray-200"}`}>{n.title}</p>
                    <span className="text-[10px] text-gray-500 shrink-0 mt-0.5 whitespace-nowrap">{timeAgoNotif(n.createdAt)}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-snug">{n.message}</p>
                  {!n.isRead && <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C7E36B] mt-1.5"/>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Footer */}
      {list.length > 0 && (
        <div className="px-5 py-3 border-t border-white/5 text-center">
          <button className="text-xs text-[#C7E36B] font-semibold hover:underline">View all notifications →</button>
        </div>
      )}
    </div>
  );
}

/* ────── EMAIL VERIFY BANNER ────── */
function EmailVerifyBanner({ email, token, onVerified }) {
  const [otpSent, setOtpSent]       = useState(false);
  const [otpCode, setOtpCode]       = useState("");
  const [sending, setSending]       = useState(false);
  const [verifying, setVerifying]   = useState(false);
  const [error, setError]           = useState("");
  const [timer, setTimer]           = useState(0);

  useEffect(() => {
    if (timer <= 0) return;
    const id = setTimeout(() => setTimer(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  const sendOtp = async () => {
    setSending(true); setError("");
    try {
      const res = await fetch("/api/users/send-verify-email-otp", {
        method: "POST", headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) setError(data.message);
      else { setOtpSent(true); setTimer(30); }
    } catch { setError("Network error. Try again."); }
    setSending(false);
  };

  const verifyOtp = async () => {
    if (otpCode.length !== 6) { setError("Enter the 6-digit code"); return; }
    setVerifying(true); setError("");
    try {
      const res = await fetch("/api/users/verify-email-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ otp: otpCode }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.message);
      else onVerified();
    } catch { setError("Network error. Try again."); }
    setVerifying(false);
  };

  return (
    <div className="mx-4 mt-4 mb-0 bg-red-950/40 border border-red-500/30 rounded-xl px-5 py-3.5 flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 animate-pulse" />
          <div>
            <span className="text-red-400 font-bold text-sm">Email not verified — </span>
            <span className="text-gray-400 text-sm">Verify <strong className="text-white">{email}</strong> to secure your account</span>
          </div>
        </div>
        {!otpSent && (
          <button onClick={sendOtp} disabled={sending}
            className="shrink-0 bg-red-500 hover:bg-red-400 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all disabled:opacity-60">
            {sending ? "Sending..." : "Verify Now"}
          </button>
        )}
      </div>

      {otpSent && (
        <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-red-500/20">
          <span className="text-xs text-gray-400">Enter the 6-digit code sent to your email:</span>
          <input
            type="text" inputMode="numeric" maxLength={6}
            value={otpCode}
            onChange={e => { setOtpCode(e.target.value.replace(/\D/g,"").slice(0,6)); setError(""); }}
            placeholder="000000"
            className="w-32 bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm font-mono outline-none focus:border-[#C7E36B]/50 tracking-widest"
          />
          <button onClick={verifyOtp} disabled={verifying || otpCode.length !== 6}
            className="bg-[#C7E36B] text-black font-black text-xs px-4 py-1.5 rounded-lg hover:opacity-90 disabled:opacity-50 transition-all">
            {verifying ? "Verifying..." : "Confirm"}
          </button>
          <button onClick={sendOtp} disabled={timer > 0 || sending}
            className="text-xs text-gray-400 hover:text-white disabled:opacity-40 transition-all">
            {timer > 0 ? `Resend in ${timer}s` : "Resend"}
          </button>
          {error && <span className="text-red-400 text-xs w-full">{error}</span>}
        </div>
      )}
    </div>
  );
}

/* ────── USER MENU DROPDOWN ────── */
function UserMenuDropdown({ name, email, avatar, isGuest, onProfile, onSettings, onBilling, onLogout }) {
  return (
    <div className="absolute right-0 top-full mt-2 w-[232px] bg-white rounded-xl shadow-2xl z-50 overflow-hidden">
      {/* Incomplete profile banner for guests */}
      {isGuest && (
        <div className="px-4 py-2 bg-red-50 border-b border-red-100 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 animate-pulse" />
          <p className="text-[11px] text-red-600 font-semibold">Incomplete profile — set a password</p>
        </div>
      )}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
        <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
          {avatar
            ? <img src={avatar} alt={name} className="w-full h-full object-cover" />
            : <div className="w-full h-full bg-[#C7E36B] text-black font-bold flex items-center justify-center text-sm">{name[0]}</div>
          }
          {isGuest && (
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-red-500 border-2 border-white" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900 truncate">{name}</p>
          <p className="text-xs text-gray-500 truncate">{email}</p>
          {isGuest && <p className="text-[10px] text-red-500 font-semibold mt-0.5">Email not verified</p>}
        </div>
      </div>
      {[
        { icon: "person", label: "View Profile", action: onProfile },
        { icon: "settings", label: "Account Settings", action: onSettings },
        { icon: "help", label: "Help & Support", action: null },
        { icon: "receipt", label: "Billing & Payments", action: onBilling },
      ].map(item => (
        <button key={item.label} onClick={item.action} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-all">
          <Ic name={item.icon} size={16} className="text-gray-400" />
          {item.label}
        </button>
      ))}
      <div className="border-t border-gray-100">
        <button onClick={onLogout} title="Logout" className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-all">
          <Ic name="logout" size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   DASHBOARD HOME
════════════════════════════════════════════ */

const UPCOMING = [
  { mode: "ONLINE", date: "AUG 24, 2024", title: "UX Research: Deep Dive into User Interviews", desc: "Expert-led session on conducting high-quality user interviews." },
  { mode: "OFFLINE", date: "SEPT 02, 2024", title: "Full-Stack Career Accelerator: Intensive", desc: "A 12-week program designed to get you hired as a developer." },
];

function DashboardHome({ profile, token, onNavigate }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [upcomingWorkshops, setUpcomingWorkshops] = useState([]);
  const [certCount, setCertCount] = useState(0);

  useEffect(() => {
    const h = { Authorization: `Bearer ${token}` };
    fetch("/api/users/me/stats", { headers: h }).then(r => r.json()).then(setStats).catch(() => {});
    fetch("/api/courses/enrolled", { headers: h }).then(r => r.json()).then(d => { if (Array.isArray(d)) setEnrolledCourses(d); }).catch(() => {});
    fetch("/api/certificates/me", { headers: h }).then(r => r.json()).then(d => { if (Array.isArray(d)) setCertCount(d.length); }).catch(() => {});
    fetch("/api/workshops", { headers: h }).then(r => r.json()).then(ws => {
      if (!Array.isArray(ws)) return;
      const userId = JSON.parse(localStorage.getItem("aifa_user")||"{}")._id;
      const myUpcoming = ws.filter(w =>
        w.isPublished &&
        w.registrations?.some(r => String(r.user||r) === String(userId)) &&
        new Date(w.scheduledAt) > new Date()
      );
      setUpcomingWorkshops(myUpcoming.slice(0, 3));
    }).catch(() => {});
  }, [token]);

  const fmtDateBadge = d => {
    try {
      const dt = new Date(d);
      const mon = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][dt.getMonth()];
      const h = dt.getHours();
      const ampm = h >= 12 ? "PM" : "AM";
      const h12 = h % 12 || 12;
      return `${String(dt.getDate()).padStart(2,"0")}-${mon}-${dt.getFullYear()} | ${h12} ${ampm}`;
    } catch { return "—"; }
  };

  const coursesEnrolled   = stats?.enrolledCourses   ?? profile?.enrolledCourses?.length   ?? 0;
  const workshopsAttended = stats?.enrolledWorkshops  ?? profile?.enrolledWorkshops?.length ?? 0;

  const statCards = [
    { icon: "video",    label: "Courses Enrolled",   value: coursesEnrolled,   color: "text-blue-400",   bg: "bg-blue-500/10",    borderColor: "border-blue-500/30"    },
    { icon: "cert",     label: "Certificates Earned", value: certCount,         color: "text-[#C7E36B]",  bg: "bg-[#C7E36B]/10",   borderColor: "border-[#C7E36B]/30"   },
    { icon: "workshop", label: "Workshops Attended",  value: workshopsAttended, color: "text-purple-400", bg: "bg-purple-500/10",  borderColor: "border-purple-500/30"  },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* 3 STAT CARDS */}
      <div className="grid grid-cols-3 gap-4">
        {statCards.map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 flex items-center gap-3.5">
            <div className={`w-10 h-10 rounded-xl border ${s.borderColor} flex items-center justify-center shrink-0`}>
              <Ic name={s.icon} size={18} className={s.color}/>
            </div>
            <div>
              <p className="text-2xl font-black text-white leading-none">{String(s.value).padStart(2, "0")}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CONTINUE LEARNING */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white">Continue Learning</h2>
          <button onClick={() => onNavigate("video-courses")} className="text-xs text-[#C7E36B] hover:underline">View My Courses &gt;</button>
        </div>
        {enrolledCourses.length === 0 ? (
          <div className="bg-white/5 border border-dashed border-white/10 rounded-xl p-8 text-center">
            <p className="text-gray-400 text-sm">You haven't enrolled in any courses yet.</p>
            <button onClick={() => onNavigate("video-courses")} className="mt-3 text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg">Browse Courses</button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {enrolledCourses.slice(0, 3).map((c, i) => {
              const pct = c.percentComplete || 0;
              const lessons = c.totalLessons || c.lessons?.length || 0;
              const done    = Math.round((pct/100)*lessons);
              return (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-[#C7E36B]/30 transition-all w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] max-w-[380px]">
                  <div className="relative h-28">
                    {c.image ? <img src={c.image} alt={c.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gradient-to-br from-purple-900/60 to-blue-900/40"/>}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-white mb-2 line-clamp-1">{c.title}</h3>
                    <div className="w-full bg-white/10 rounded-full h-1.5 mb-1.5">
                      <div className="bg-[#C7E36B] h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] text-gray-400">{pct}% completed</span>
                      <span className="text-[10px] text-gray-400">{done}/{lessons} lessons</span>
                    </div>
                    <button onClick={() => navigate(`/courses/${c._id}/watch`)}
                      className="w-full bg-[#C7E36B] hover:bg-[#d4f070] text-black text-xs font-bold py-2 rounded-lg transition-all">
                      Continue
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* UPCOMING WORKSHOPS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white">Upcoming Workshops</h2>
          <button onClick={() => onNavigate("workshops")} className="text-xs text-[#C7E36B] hover:underline">View All &gt;</button>
        </div>
        {upcomingWorkshops.length === 0 ? (
          <div className="bg-white/5 border border-dashed border-white/10 rounded-xl p-6 text-center">
            <p className="text-gray-400 text-sm">No upcoming registered workshops.</p>
            <button onClick={() => onNavigate("workshops")} className="mt-3 text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg">Browse Workshops</button>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingWorkshops.map((w, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-4 hover:border-white/20 transition-all">
                {/* 16:9 banner thumbnail */}
                <div className="w-[100px] aspect-[16/9] rounded-lg bg-white/10 shrink-0 overflow-hidden">
                  {w.image
                    ? <img src={w.image} alt="" className="w-full h-full object-cover"/>
                    : <div className="w-full h-full bg-gradient-to-br from-purple-900/60 to-blue-900/40 flex items-center justify-center"><Ic name="workshop" size={20} className="text-[#C7E36B]/60"/></div>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-[#C7E36B] font-bold mb-0.5">
                    📅 {fmtDateBadge(w.scheduledAt)}
                  </p>
                  <h3 className="text-sm font-semibold text-white line-clamp-1">{w.title}</h3>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
                    {w.description?.trim() || "You're successfully registered. Get ready to join the live workshop and start creating AI-powered cinematic videos."}
                  </p>
                </div>
                <button
                  onClick={() => w._id && navigate(`/workshops/${w._id}`)}
                  className="text-xs bg-white text-[#0F1112] font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-all shrink-0"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   BOOTCAMP SECTION
════════════════════════════════════════════ */
const BC_SESSION_LIST = [
  { no:1, title:"Introduction to AI Filmmaking", tag:"Foundation", locked:false },
  { no:2, title:"Storyboarding with Midjourney", tag:"Visual Dev", locked:false },
  { no:3, title:"Generative Video Fundamentals", tag:"Video AI", locked:false },
  { no:4, title:"Prompt Engineering for Video", tag:"Prompting", locked:false },
  { no:5, title:"Cinematic Camera Movements", tag:"Cinematography", locked:false },
  { no:6, title:"AI Audio & Soundscapes", tag:"Audio", locked:false },
  { no:7, title:"Color Grading with AI Tools", tag:"Post-Prod", locked:false },
  { no:8, title:"Character Consistency in AI", tag:"Visual Dev", locked:false },
  { no:9, title:"Editing Workflows for AI Film", tag:"Editing", locked:false },
  { no:10, title:"VFX Compositing Basics", tag:"VFX", locked:false },
  { no:11, title:"Narrative Structure in AI Cinema", tag:"Storytelling", locked:true },
  { no:12, title:"Generative Video with Sora & Midjourney", tag:"Advanced", locked:true },
];
const BC_PROJECT_LIST = [
  { no:"PROJECT 01", title:"AI-Generated Cinematic Storyboard", desc:"Create a 10-frame storyboard using Midjourney or DALL-E 3.", req:[{done:true,text:"10 story frames minimum"},{done:true,text:"Consistent character design"},{done:false,text:"Export as high-resolution PDF"},{done:false,text:"Include prompt annotations"}], res:["Storyboard_Template.pdf","Reference_Guide.zip","Style_Board.pdf","Prompt_Sheet.pdf"] },
  { no:"PROJECT 02", title:"Generative Video Short (30s)", desc:"Produce a 30-second short film using Runway Gen-2 or Pika Labs.", req:[{done:true,text:"30 seconds minimum runtime"},{done:false,text:"At least 3 distinct scenes"},{done:false,text:"Original AI-generated audio"},{done:false,text:"Submit as MP4 1080p"}], res:["Video_Spec_Sheet.pdf","Audio_Guidelines.pdf","Shot_List.pdf","Export_Guide.zip"] },
  { no:"PROJECT 03", title:"AI Soundscapes & Scoring", desc:"Compose an original score for your short film using Udio or Suno AI.", req:[{done:false,text:"Minimum 2-minute composition"},{done:false,text:"3 distinct emotional shifts"},{done:false,text:"MP3 or WAV (320kbps)"},{done:false,text:"Sync to video timeline"}], res:["Music_Brief.pdf","Suno_Guide.pdf","Udio_Prompts.pdf","Audio_Template.zip"] },
  { no:"PROJECT 04", title:"Character Arc Visual Narrative", desc:"Create a character visual narrative using AI image generation.", req:[{done:false,text:"5 character state images"},{done:false,text:"Consistent visual style"},{done:false,text:"Clear story progression"},{done:false,text:"Include mood board"}], res:["Character_Sheet.pdf","Style_Reference.zip","Midjourney_Tips.pdf","Mood_Board.pdf"] },
  { no:"PROJECT 05", title:"Final AI Film Portfolio", desc:"A 3-minute capstone film integrating all bootcamp skills.", req:[{done:false,text:"Minimum 3 minutes runtime"},{done:false,text:"All techniques integrated"},{done:false,text:"Original score required"},{done:false,text:"Professional color grade"}], res:["Portfolio_Rubric.pdf","Submission_Guide.pdf","Color_LUTs.zip","Final_Checklist.pdf"] },
];

const BC_FILES = [
  { icon: "📄", color: "text-red-400",    name: "Bootcamp Broucher.pdf",          meta: "1.2 MB • PDF",       type: "download" },
  { icon: "📦", color: "text-blue-400",   name: "Prompt Engineering...",          meta: "45 MB • ZIP",        type: "download" },
  { icon: "📄", color: "text-red-400",    name: "Filmmaking Syllabu...",          meta: "1.2 MB • PDF",       type: "download" },
  { icon: "🔗", color: "text-purple-400", name: "Discord Community Server",       meta: "EXTERNAL LINK",      type: "link"     },
  { icon: "📦", color: "text-blue-400",   name: "Session 03 Assets.zip",          meta: "45 MB • ZIP",        type: "download" },
  { icon: "🔗", color: "text-purple-400", name: "Weekly Reading List",            meta: "EXTERNAL LINK",      type: "link"     },
  { icon: "📦", color: "text-blue-400",   name: "Midjourney Guide.pdf",           meta: "45 MB • ZIP",        type: "download" },
];

function timeAgo(dateStr) {
  const d = new Date(dateStr); const now = new Date();
  const diff = Math.floor((now - d) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
  return `${Math.floor(diff/86400)} days ago`;
}

function BootcampSection({ token, profile }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");
  const [showDrawer, setShowDrawer] = useState(false);
  const [showAllAnn, setShowAllAnn] = useState(false);
  const [watched, setWatched] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowDrawer(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  /* API data */
  const [bootcampData, setBootcampData] = useState(null);
  const [sessions, setSessions]         = useState([]);
  const [projects, setProjects]         = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [drawerFiles, setDrawerFiles]   = useState(BC_FILES);
  const [activeSession, setActiveSession] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [sessFilter, setSessFilter] = useState("All Sessions");
  const [videoMsg, setVideoMsg] = useState("");

  useEffect(() => {
    fetch("/api/bootcamps")
      .then(r => r.ok ? r.json() : [])
      .then(d => { if (Array.isArray(d) && d.length > 0) setBootcampData(d[0]); else setBootcampData({}); })
      .catch(() => { setBootcampData({}); });
  }, []);

  /* Derive enrollment from DB — user's _id must be in bootcamp.enrollments */
  const userId = profile?._id || JSON.parse(localStorage.getItem("aifa_user") || "{}")._id;
  const bcLoaded  = bootcampData !== null;
  const enrolled  = !!(bootcampData && userId && bootcampData.enrollments?.some(
    id => String(id) === String(userId)
  ));

  useEffect(() => {
    if (!enrolled || !bootcampData?._id) return;
    const id = bootcampData._id;
    fetch(`/api/bootcamps/${id}/sessions`)
      .then(r => r.ok ? r.json() : [])
      .then(d => {
        if (Array.isArray(d) && d.length > 0) {
          const mapped = d.map(s => ({ ...s, title: s.title || s.name || "", tag: s.tag || "" }));
          setSessions(mapped); setActiveSession(mapped[0]);
        } else { setSessions(BC_SESSION_LIST); setActiveSession(BC_SESSION_LIST[0]); }
      })
      .catch(() => { setSessions(BC_SESSION_LIST); setActiveSession(BC_SESSION_LIST[0]); });
    fetch(`/api/bootcamps/${id}/projects`)
      .then(r => r.ok ? r.json() : [])
      .then(d => {
        if (Array.isArray(d) && d.length > 0) {
          const mapped = d.map(p => ({ ...p, req: (p.requirements||[]).map(r => ({ done:false, text:r })), res: (p.resources||[]).map(r => r.name||r) }));
          setProjects(mapped); setActiveProject(mapped[0]);
        } else { setProjects(BC_PROJECT_LIST); setActiveProject(BC_PROJECT_LIST[0]); }
      })
      .catch(() => { setProjects(BC_PROJECT_LIST); setActiveProject(BC_PROJECT_LIST[0]); });
    fetch(`/api/bootcamps/${id}/announcements`)
      .then(r => r.ok ? r.json() : [])
      .then(d => { if (Array.isArray(d)) setAnnouncements(d); })
      .catch(() => {});
    fetch("/api/resources")
      .then(r => r.ok ? r.json() : [])
      .then(d => { if (Array.isArray(d) && d.length > 0) setDrawerFiles(d.map(r => ({ icon:"📄", color:"text-gray-400", name:r.title||r.name, meta:`${r.fileSize||"—"} • ${r.type||"PDF"}`, type:r.type==="LINK"?"link":"download" }))); })
      .catch(() => {});
  }, [enrolled, bootcampData?._id]);

  if (!bcLoaded) return (
    <div className="flex-1 flex items-center justify-center bg-[#0B0F10]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#C7E36B] border-t-transparent rounded-full animate-spin"/>
        <p className="text-gray-400 text-sm">Loading bootcamp...</p>
      </div>
    </div>
  );

  if (!enrolled) return (
    <div className="flex-1 overflow-y-auto bg-[#0B0F10]">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <span className="text-[10px] bg-[#7C3AED] text-white font-bold px-3 py-1 rounded-full tracking-wider">{bootcampData?.batchLabel || "Batch 2024"}</span>
          <h1 className="text-3xl font-black text-white mt-4 mb-2 leading-tight">{bootcampData?.title || "Build AI-Powered Films"}<br/>from Script to Screen</h1>
          <p className="text-gray-400 text-sm leading-relaxed max-w-lg">Transform your storytelling with cutting-edge AI tools. No prior filmmaking experience needed — just your imagination.</p>
        </div>

        <div className="grid md:grid-cols-[1fr_320px] gap-6">
          {/* Left: bullets + CTA */}
          <div>
            <div className="bg-[#0F1112] border border-white/10 rounded-2xl p-5 mb-5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">What's Included</p>
              <div className="space-y-3">
                {[
                  ["🎯", "Beginner Friendly — No prior experience needed"],
                  ["⏱", "22 Hours of live + recorded content"],
                  ["📋", "20 Hands-on Assignments"],
                  ["🎬", "5 Full Project builds"],
                  ["📥", "Downloadable Resources & Prompt Packs"],
                  ["🎓", "Certificate of Completion"],
                  ["👥", "Lifetime AIFA Community Access"],
                  ["🤝", "1-on-1 Portfolio Mentorship sessions"],
                  ["🔴", "Session Recordings — rewatch anytime"],
                ].map(([icon, text]) => (
                  <div key={text} className="flex items-start gap-3">
                    <span className="text-lg shrink-0 mt-0.5">{icon}</span>
                    <p className="text-sm text-gray-300">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Video preview */}
            {bootcampData?.previewVideoUrl ? (
              <div className="rounded-2xl overflow-hidden aspect-video border border-white/10">
                <iframe
                  src={bootcampData.previewVideoUrl.includes("watch?v=") ? bootcampData.previewVideoUrl.replace("watch?v=","embed/") : bootcampData.previewVideoUrl}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title="Bootcamp Preview"
                />
              </div>
            ) : (
              <div className="relative bg-black rounded-2xl overflow-hidden aspect-video border border-white/10 cursor-pointer group" onClick={()=>{setVideoMsg("Preview video coming soon. Join a live session to get started!");setTimeout(()=>setVideoMsg(""),4000);}}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#4C1D95]/60 via-[#7C3AED]/40 to-[#1e1b4b]/80 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Ic name="play" size={28} className="text-white ml-1"/>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-bold text-sm">Watch Bootcamp Preview</p>
                  <p className="text-white/60 text-xs">2 min overview</p>
                </div>
                {videoMsg&&<div className="absolute inset-x-4 top-4 bg-black/80 text-white text-xs rounded-lg px-3 py-2 text-center">{videoMsg}</div>}
              </div>
            )}
          </div>

          {/* Right: price card + CTA */}
          <div>
            <div className="bg-[#0F1112] border border-white/10 rounded-2xl p-5 sticky top-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-3xl font-black text-white">₹{(bootcampData?.price||14000).toLocaleString("en-IN")}</span>
                <span className="text-gray-400 line-through text-base">₹{(bootcampData?.originalPrice||19000).toLocaleString("en-IN")}</span>
              </div>
              <p className="text-[#C7E36B] text-xs font-bold mb-4">Save ₹{((bootcampData?.originalPrice||19000)-(bootcampData?.price||14000)).toLocaleString("en-IN")} — Limited seats</p>
              <div className="space-y-2 mb-5 text-xs text-gray-400">
                {["1 Month Intensive Program","Lifetime AIFA Membership (Worth ₹40,000)","Certificate of Completion","20 Assignments + 5 Projects"].map(t=>(
                  <div key={t} className="flex items-center gap-2"><span className="text-[#C7E36B] font-bold">✓</span>{t}</div>
                ))}
              </div>
              <button onClick={()=>navigate("/bootcamp/enroll", { state: { from: "/dashboard", fromPage: "bootcamp" } })} className="w-full bg-[#7C3AED] hover:bg-purple-600 text-white font-bold py-3 rounded-xl text-sm transition-all mb-3">
                ENROLL NOW →
              </button>
              <p className="text-center text-gray-500 text-[11px]">🔒 Secure payment via Razorpay</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
    <div className="flex flex-col h-full">
      <div className="relative bg-gradient-to-r from-[#0B0F1A] via-[#1a1040] to-[#0B0F1A] shrink-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80')] bg-cover bg-center opacity-20"/>
        <div className="relative px-6 py-5">
          <div className="flex items-center gap-2 mb-2 text-[10px] text-white/60">
            <button onClick={()=>navigateTo("bootcamp")} className="hover:text-white transition-colors">← Back to Bootcamps</button>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">IN PROGRESS</span>
            <span className="text-[10px] text-white/60">{bootcampData?.batchLabel || "Batch 2024"}</span>
          </div>
          <h1 className="text-2xl font-black text-white mb-1">{bootcampData?.title || "AI Filmmaking Bootcamp"}</h1>
          <div className="flex items-center gap-4 text-[11px] text-white/60">
            <span>📅 {bootcampData?.duration || "12 Weeks"} • {bootcampData?.schedule || "Mon & Wed"}</span>
            {bootcampData?.mentor && <span>👤 Mentor: <span className="text-white/80 font-medium">{bootcampData.mentor}</span></span>}
          </div>
        </div>
      </div>
      <div className="flex border-b border-gray-100 bg-white px-6 shrink-0">
        {["overview","sessions","projects"].map(t=>(
          <button key={t} onClick={()=>setTab(t)} className={`capitalize text-sm font-medium px-4 py-3 border-b-2 transition-all ${tab===t?"border-[#7C3AED] text-[#7C3AED]":"border-transparent text-gray-400 hover:text-gray-900"}`}>{t}</button>
        ))}
      </div>
      <div className="flex-1 overflow-hidden">

        {tab==="overview"&&(
          <div className="flex gap-5 p-6 h-full overflow-y-auto bg-gray-50">
            <div className="flex-1 space-y-4 min-w-0">
              <div className="bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] rounded-2xl p-5">
                <span className="flex items-center gap-1.5 text-[10px] font-bold bg-white/20 text-white px-2.5 py-1 rounded-full w-fit mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"/>NEXT LIVE
                </span>
                <h3 className="text-xl font-bold text-white mb-1">{bootcampData?.nextSessionName || "Upcoming Session"}</h3>
                <div className="flex items-center gap-4 text-white/80 text-xs mb-4">
                  <span>📅 {bootcampData?.nextSessionAt ? new Date(bootcampData.nextSessionAt).toLocaleString("en-IN",{weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}) : "TBA"}</span>
                </div>
                <div className="flex gap-3">
                  <button onClick={()=>window.open(bootcampData?.zoomLink||"https://zoom.us","_blank")} className="bg-white text-[#1D4ED8] text-sm font-bold px-5 py-2 rounded-xl hover:bg-gray-100">Join Session Now →</button>
                </div>
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Your Bootcamp Progress</h3>
                {(() => {
                  const totalSessions = sessions.length || 0;
                  const doneSessions  = sessions.filter(s => s.recordingUrl).length;
                  const totalProjects = projects.length || 0;
                  const doneProjects  = projects.filter(p => p.status === "submitted" || p.status === "completed").length;
                  const pct = totalSessions > 0 ? Math.round((doneSessions / totalSessions) * 100) : 0;
                  return (
                    <div className="grid grid-cols-3 gap-3">
                      <div className="border border-gray-200 rounded-lg p-3 text-center"><p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Overall Completed</p><p className="text-lg font-black text-gray-900">{pct}%</p></div>
                      <div className="border border-gray-200 rounded-lg p-3 text-center"><p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Sessions Completed</p><p className="text-lg font-black text-gray-900">{String(doneSessions).padStart(2,"0")}/{totalSessions}</p></div>
                      <div className="border border-gray-200 rounded-lg p-3 text-center"><p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Projects</p><p className="text-lg font-black text-gray-900">{String(doneProjects).padStart(2,"0")}/{totalProjects}</p></div>
                    </div>
                  );
                })()}
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Announcements</h3>
                  {announcements.length > 2 && <button onClick={()=>setShowAllAnn(v=>!v)} className="text-xs text-[#7C3AED] hover:underline">{showAllAnn?"Show Less":"View All"}</button>}
                </div>
                {announcements.length === 0 ? (
                  <div className="text-center py-4"><p className="text-xs text-gray-400">No announcements yet.</p></div>
                ) : null}
                {(showAllAnn ? announcements : announcements.slice(0,2)).map((a,i)=>(
                  <div key={i} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0 mb-3 last:mb-0">
                    <div className="flex items-center justify-between"><p className="text-xs font-semibold text-gray-900">{a.title}</p><span className="text-[10px] text-gray-400 shrink-0 ml-2">{a.createdAt?timeAgo(a.createdAt):a.time}</span></div>
                    <p className="text-[11px] text-gray-500 mt-1">{a.content||a.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[210px] shrink-0 space-y-4">
              <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <h3 className="text-xs font-semibold text-gray-900 mb-3">Bootcamp Resources</h3>
                {["Filmmaking Syllabus.pdf","Resource Engineering.zip","Weekly Reading List.pdf"].map((r,i)=>(
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-[10px] text-gray-600 truncate flex-1 mr-1">📄 {r}</span>
                    <button onClick={()=>alert(`Downloading ${r}...`)} className="text-gray-400 hover:text-[#7C3AED] shrink-0"><Ic name="download" size={13}/></button>
                  </div>
                ))}
                <button onClick={() => setShowDrawer(true)} className="text-xs text-[#7C3AED] hover:underline mt-2">View All Files</button>
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <h3 className="text-xs font-semibold text-gray-900 mb-3">Your Mentors</h3>
                {bootcampData?.mentors?.length > 0 ? bootcampData.mentors.map((m,i)=>(
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#7C3AED] flex items-center justify-center text-white text-[10px] font-bold">{m.name[0]}</div>
                      <div><p className="text-[10px] font-semibold text-gray-900">{m.name}</p><p className="text-[9px] text-gray-400">{m.role}</p></div>
                    </div>
                    <button onClick={()=>alert("Messaging feature coming soon! Reach your mentor via Discord for now.")} className="text-gray-400 hover:text-[#7C3AED]"><Ic name="message" size={13}/></button>
                  </div>
                )) : <p className="text-[11px] text-gray-400 py-2">No mentors assigned yet.</p>}
              </div>
            </div>
          </div>
        )}

        {tab==="sessions"&&(
          <div className="flex h-full bg-gray-50">
            <div className="w-[270px] shrink-0 border-r border-gray-100 flex flex-col bg-white">
              <div className="px-4 py-3 border-b border-gray-100 shrink-0">
                <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Course Sessions</h3>
              </div>
              <div className="flex-1 overflow-y-auto">
              {(sessions.length > 0 ? sessions : BC_SESSION_LIST).map((s,i)=>(
                <button key={i} onClick={()=>!s.locked&&setActiveSession(s)} disabled={s.locked} className={`w-full flex items-center gap-3 px-4 py-3 border-b border-gray-100 text-left transition-all ${activeSession?.no===s.no&&!s.locked?"bg-[#7C3AED]/5 border-l-2 border-l-[#7C3AED]":"hover:bg-gray-50"} ${s.locked?"opacity-40 cursor-not-allowed":""}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${s.locked?"bg-gray-100":s.recordingUrl||s.status==="COMPLETED"?"bg-green-100":"bg-[#7C3AED]/10"}`}>
                    {s.locked?<Ic name="lock" size={11} className="text-gray-400"/>:s.recordingUrl||s.status==="COMPLETED"?<Ic name="check" size={11} className="text-green-600"/>:<Ic name="play" size={11} className="text-[#7C3AED] ml-0.5"/>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[11px] font-semibold truncate ${activeSession?.no===s.no&&!s.locked?"text-[#7C3AED]":"text-gray-900"}`}>Session {s.no}</p>
                    <p className="text-[10px] text-gray-400 truncate">{s.title}</p>
                  </div>
                </button>
              ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden border border-gray-200">
                {activeSession?.recordingUrl ? (
                  <iframe
                    src={activeSession.recordingUrl.includes("watch?v=") ? activeSession.recordingUrl.replace("watch?v=", "embed/") : activeSession.recordingUrl}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    title={activeSession.title}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center cursor-pointer group" onClick={()=>{
                    if(activeSession?.status==="ACTIVE"&&bootcampData?.zoomLink){
                      window.open(bootcampData.zoomLink,"_blank");
                    } else {
                      setVideoMsg("Recording not yet available for this session. Check back after the live class.");
                      setTimeout(()=>setVideoMsg(""),4000);
                    }
                  }}>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center mx-auto mb-3 transition-all">
                        <Ic name="play" size={28} className="text-white ml-1"/>
                      </div>
                      <p className="text-xs text-gray-300 max-w-[200px]">{activeSession?.title}</p>
                      {videoMsg ? (
                        <p className="text-[11px] text-yellow-400 mt-1 max-w-[220px]">{videoMsg}</p>
                      ) : (
                        <p className="text-[10px] text-gray-500 mt-1">{activeSession?.status==="ACTIVE"&&bootcampData?.zoomLink?"Click to join live session":"Recording not yet available"}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <p className="text-[10px] text-gray-400 mb-1 uppercase tracking-wider">Session {String(activeSession?.no||1).padStart(2,"0")}</p>
                <h2 className="text-lg font-bold text-gray-900 mb-2">{activeSession?.title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed">In this session, we dive deep into the concepts and techniques needed to master {activeSession?.title?.toLowerCase()}. Follow along with hands-on exercises and real-world filmmaking examples.</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Lesson Attachments</h4>
                <div className="space-y-2">
                  {(activeSession?.resources?.length > 0 ? activeSession.resources.map(r=>r.name||r) : ["Lesson_Notes.pdf","Reference_Materials.zip","Exercise_Files.pdf"]).map((f,i)=>(
                    <div key={i} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm cursor-pointer hover:border-[#7C3AED]/30 transition-all">
                      <span className={`text-xl shrink-0 ${typeof f==="string"&&f.toLowerCase().endsWith(".zip")?"text-blue-500":"text-red-500"}`}>{typeof f==="string"&&f.toLowerCase().endsWith(".zip")?"📦":"📄"}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{f}</p>
                        <p className="text-[10px] text-gray-400">{typeof f==="string"&&f.toLowerCase().endsWith(".zip")?"ZIP Archive":"PDF Document"}</p>
                      </div>
                      <Ic name="download" size={14} className="text-gray-400 hover:text-[#7C3AED] shrink-0"/>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab==="projects"&&(
          <div className="flex h-full bg-gray-50">
            <div className="w-[260px] shrink-0 border-r border-gray-100 flex flex-col bg-white">
              <div className="px-4 pt-4 pb-3 shrink-0 border-b border-gray-100">
                <h3 className="text-sm font-bold text-gray-900">Bootcamp Projects</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">Select a project to view resources.</p>
              </div>
              <div className="flex-1 overflow-y-auto px-3 pb-3 pt-2 space-y-2">
              {(projects.length > 0 ? projects : BC_PROJECT_LIST).map((p,i)=>(
                <div key={i} onClick={()=>setActiveProject(p)} className={`p-3 border rounded-xl cursor-pointer transition-all ${activeProject?.no===p.no?"border-[#7C3AED]/40 bg-[#7C3AED]/5":"border-gray-100 hover:border-gray-200 bg-white"}`}>
                  <p className="text-[10px] text-[#7C3AED] font-bold uppercase">{p.no || `Project ${i+1}`}</p>
                  <p className="text-xs font-bold text-gray-900 mt-0.5">{p.title}</p>
                  <p className="text-[10px] text-gray-400 mt-1 line-clamp-2">{p.desc}</p>
                </div>
              ))}
              </div>
            </div>
            {activeProject ? (
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                <div>
                  <p className="text-[10px] text-[#7C3AED] font-bold uppercase mb-1">{activeProject.no || "Project"}</p>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{activeProject.title}</h2>
                  <p className="text-sm text-gray-500 leading-relaxed">{activeProject.desc || "Complete this project to demonstrate your skills from the bootcamp."}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Requirements</h4>
                  <div className="space-y-2">
                    {activeProject.req.map((r,i)=>(
                      <div key={i} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3">
                        <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all ${r.done?"bg-[#7C3AED]":"border-2 border-gray-300"}`}>
                          {r.done&&<Ic name="check" size={10} className="text-white"/>}
                        </div>
                        <p className={`text-sm ${r.done?"text-gray-400 line-through":"text-gray-700"}`}>{r.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Project Resources</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {activeProject.res.map((f,i)=>(
                      <div key={i} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-3 py-3 cursor-pointer hover:border-[#7C3AED]/40 shadow-sm transition-all">
                        <span className={`text-xl shrink-0 ${typeof f==="string"&&f.toLowerCase().endsWith(".zip")?"text-blue-500":"text-red-500"}`}>{typeof f==="string"&&f.toLowerCase().endsWith(".zip")?"📦":"📄"}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-900 font-medium truncate">{f}</p>
                          <p className="text-[10px] text-gray-400">{typeof f==="string"&&f.toLowerCase().endsWith(".zip")?"ZIP Archive":"PDF Document"}</p>
                        </div>
                        <Ic name="download" size={14} className="text-gray-400 hover:text-[#7C3AED] shrink-0"/>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center p-8">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Select a project from the list</p>
                  <p className="text-gray-400 text-xs">Complete assignments to unlock more projects.</p>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>

    {/* ── VIEW ALL FILES DRAWER ── */}
    <div>
      {/* Overlay */}
      {showDrawer && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowDrawer(false)} />}
      {/* Drawer */}
      <div className={`fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ${showDrawer ? "translate-x-0" : "translate-x-full"}`}>
        <div className="px-5 py-4 border-b border-gray-100 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📁</span>
            <div>
              <p className="text-gray-900 font-bold text-base">Bootcamp Resources</p>
              <p className="text-gray-400 text-xs mt-0.5">Access all files, guides, and templates.</p>
            </div>
          </div>
          <button onClick={() => setShowDrawer(false)} className="text-gray-400 hover:text-gray-700 text-xl mt-0.5 leading-none">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
          {drawerFiles.map((f, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl px-3 py-3 flex items-center gap-3 shadow-sm hover:border-gray-200 transition-all">
              <span className={`text-xl shrink-0 ${f.color}`}>{f.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 font-semibold text-xs truncate">{f.name}</p>
                <p className="text-gray-400 text-[10px] mt-0.5">{f.meta}</p>
              </div>
              <button
                onClick={() => alert("Download starting...")}
                className="text-gray-400 hover:text-[#7C3AED] shrink-0 transition-all"
                title={f.type === "link" ? "Open link" : "Download"}
              >
                {f.type === "link" ? "↗" : "↓"}
              </button>
            </div>
          ))}
        </div>

        <div className="px-4 py-4 border-t border-gray-100">
          <button onClick={() => alert("Download starting...")} className="w-full bg-[#C7E36B] text-black font-bold py-3 rounded-xl hover:bg-lime-300 transition-all text-sm">
            Download All
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

/* ════════════════════════════════════════════
   WORKSHOPS SECTION
════════════════════════════════════════════ */
const WORKSHOP_DATA = [
  { title: "AI Lego Animation Workshop", image: "/courses/v1.png", duration: "35 HOURS", price: "USD 999.00", mode: "ONLINE" },
  { title: "AI Cinematic Workshop", image: "/courses/v2.png", duration: "35 HOURS", price: "USD 999.00", mode: "ONLINE" },
  { title: "AI Sci-Fi Movie Creator", image: "/courses/v3.png", duration: "35 HOURS", price: "USD 999.00", mode: "ONLINE" },
  { title: "AI Fantasy World Builder", image: "/courses/v4.png", duration: "35 HOURS", price: "USD 999.00", mode: "ONLINE" },
];

const FALLBACK_WS_IMAGES = ["/courses/v1.png","/courses/v2.png","/courses/v3.png","/courses/v4.png"];

function WorkshopsSection({ token }) {
  const navigate = useNavigate();
  const [workshops, setWorkshops] = useState(WORKSHOP_DATA);
  const [loading, setLoading]     = useState(true);
  const [enrolling, setEnrolling] = useState(null);
  const [reserved, setReserved]   = useState(new Set());

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("aifa_user") || "{}")._id;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    fetch("/api/workshops", { headers })
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (Array.isArray(d) && d.length > 0) {
          setWorkshops(d);
          if (userId) {
            const myIds = new Set(
              d.filter(w =>
                w.registrations?.some(r => {
                  const rid = r?.user?._id || r?.user || r;
                  return String(rid) === String(userId);
                })
              ).map(w => String(w._id))
            );
            setReserved(myIds);
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  const handleReserve = (w, e) => {
    e?.stopPropagation();
    if (!w._id || w._id?.startsWith?.("m")) { alert("Booking coming soon!"); return; }
    if (reserved.has(w._id)) return;
    // Redirect to workshop detail page which has the full payment flow
    navigate(`/workshops/${w._id}`);
  };

  const fmtDateBox = (scheduledAt) => {
    if (!scheduledAt) return "—";
    const dt = new Date(scheduledAt);
    const mon = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"][dt.getMonth()];
    const h = dt.getHours(); const ampm = h >= 12 ? "PM" : "AM"; const h12 = h % 12 || 12;
    const mins = dt.getMinutes();
    return `${String(dt.getDate()).padStart(2,"0")}-${mon}-${dt.getFullYear()} | ${h12}${mins ? ":"+String(mins).padStart(2,"0") : ""} ${ampm}`;
  };

  const googleCalLink = (w) => {
    if (!w.scheduledAt) return null;
    const start = new Date(w.scheduledAt);
    const end = new Date(start.getTime() + 3 * 3600000);
    const fmt = d => d.toISOString().replace(/[-:]/g,"").split(".")[0]+"Z";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(w.title)}&dates=${fmt(start)}/${fmt(end)}`;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-black text-white mb-6">AI Filmmaking Workshops</h1>

      {loading && [1,2].map(n => (
        <div key={n} className="w-full rounded-[24px] overflow-hidden bg-[#0F1112] border-[6px] border-[#0F1112] animate-pulse mb-4">
          <div className="flex flex-col md:flex-row gap-[6px]">
            <div className="w-full md:w-[240px] h-[160px] bg-white/10 shrink-0"/>
            <div className="flex-1 flex flex-col gap-[6px]">
              <div className="h-[80px] bg-white/10 rounded-tr-2xl"/>
              <div className="grid grid-cols-3 gap-[6px]">{[1,2,3].map(k=><div key={k} className="h-[60px] bg-white/10 rounded"/>)}</div>
            </div>
          </div>
          <div className="h-[48px] bg-white/10"/>
        </div>
      ))}

      {!loading && (
        <div className="flex flex-col gap-[20px]">
          {workshops.map((w, i) => {
            const registered = w.registrations?.length || 0;
            const seats = w.seats || 50;
            const isFull = (seats - registered) <= 0;
            const isMock = !w._id || w._id?.startsWith?.("m");
            const isReserved = reserved.has(w._id);
            const cur = w.currency === "USD" ? "USD" : "INR";
            const priceStr = `${cur} ${parseFloat(w.price || 0).toFixed(2)}`;
            const dateBoxStr = fmtDateBox(w.scheduledAt);
            const dt = w.scheduledAt ? new Date(w.scheduledAt) : null;
            const fmtDateLong = dt ? dt.toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"}) : null;
            const fmtTime = dt ? dt.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit",hour12:true}) : null;
            const fmtTimeRange = fmtTime ? (w.endTime ? `${fmtTime} - ${w.endTime}` : fmtTime) : null;
            const calLink = googleCalLink(w);
            const statusBadge = isMock ? null : (() => {
              if (!w.isPublished) return null;
              if (!w.scheduledAt) return "Upcoming";
              const now = Date.now(), start = new Date(w.scheduledAt).getTime();
              const dur = (() => { const d=w.duration||""; const n=parseInt(d); if(!n) return 120; if(d.toLowerCase().includes("hour")||d.toLowerCase().includes("hr")) return n*60; return n; })();
              const end = start + dur*60000;
              if (now < start) return "Upcoming";
              if (now >= start && now <= end) return "Live";
              return null;
            })();

            return (
              <div key={w._id || i}
                className={`w-full rounded-[20px] overflow-hidden bg-[#0F1112] border-2 transition-all duration-300 ${isReserved ? "border-[#C7E36B]" : "border-transparent"}`}>
                {/* TOP */}
                <div className="flex flex-col md:flex-row gap-3 cursor-pointer p-3"
                  onClick={() => { if (!isMock && w._id) navigate(`/workshops/${w._id}`); }}>
                  {/* IMAGE — fills full height, badge overlaid on top-left */}
                  <div className="relative w-full md:w-[240px] min-h-[180px] md:self-stretch shrink-0 overflow-hidden rounded-tl-[18px] bg-[#1a1e1f]">
                    {w.sessionCode && (
                      <span className="absolute top-2 left-2 z-10 text-[10px] bg-[#2C3A10] text-[#D0E46A] font-bold px-2 py-0.5 rounded-full">• {w.sessionCode}</span>
                    )}
                    <img src={w.image || FALLBACK_WS_IMAGES[i % FALLBACK_WS_IMAGES.length]} alt={w.title}
                      className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={e=>{e.target.src=FALLBACK_WS_IMAGES[i%FALLBACK_WS_IMAGES.length];}}/>
                  </div>
                  <div className="flex-1 flex flex-col gap-3">
                    {/* TITLE */}
                    <div className="relative flex flex-col justify-center px-4 py-3 bg-[#DCDCDC] rounded-tr-[18px] gap-1 flex-1">
                      {(statusBadge === "Live" || statusBadge === "Upcoming") && (
                        <div>
                          {statusBadge === "Live" && <span className="text-[10px] bg-green-500 text-white font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit"><span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block"/>Live</span>}
                          {statusBadge === "Upcoming" && <span className="text-[10px] bg-blue-500/80 text-white font-bold px-2 py-0.5 rounded-full w-fit">Upcoming</span>}
                        </div>
                      )}
                      {isReserved && (
                        <span className="absolute top-3 right-3 text-[10px] bg-[#2C3A10] text-white font-black px-2.5 py-1 rounded-full tracking-wide flex items-center gap-1.5"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>CONFIRMED</span>
                      )}
                      <h3 className="text-[#2B2D30] font-black text-xl md:text-2xl leading-tight pr-24">{w.title}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] text-[#6E7072] font-semibold">
                        {w.trainer && <span>👤 {w.trainer}</span>}
                      </div>
                    </div>
                    {/* INFO BOXES */}
                    {isReserved ? (
                      <div className="flex gap-3">
                        <div className="flex flex-col items-start flex-1 gap-[4px] px-5 py-3 rounded-[8px] bg-[#DCDCDC]">
                          <p className="text-[#6E7072] text-[10px] font-semibold uppercase">⏱ Duration</p>
                          <p className="text-[#2B2D30] text-[14px] font-bold uppercase">{w.duration || "—"}</p>
                        </div>
                        <div className="flex flex-col items-start flex-1 gap-[4px] px-5 py-3 rounded-[8px] bg-[#DCDCDC]">
                          <p className="text-[#6E7072] text-[10px] font-semibold uppercase">⊞ Pricing</p>
                          <p className="text-[#2B2D30] text-[14px] font-bold uppercase">SEAT CONFIRMED</p>
                        </div>
                        <div className="flex flex-col items-start flex-1 gap-[4px] px-5 py-3 rounded-[8px] bg-[#DCDCDC]">
                          <p className="text-[#6E7072] text-[10px] font-semibold uppercase">⌨ Mode</p>
                          <p className="text-[#2B2D30] text-[14px] font-bold uppercase">{w.mode === "OFFLINE" ? "OFFLINE" : "ONLINE"}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <div className="flex flex-col items-start flex-1 gap-[4px] px-5 py-3 rounded-[8px] bg-[#DCDCDC]">
                          <p className="text-[#6E7072] text-[10px] font-semibold uppercase">⏱ Duration</p>
                          <p className="text-[#2B2D30] text-[14px] font-bold uppercase">{w.duration || "—"}</p>
                        </div>
                        <div className="flex flex-col items-start flex-1 gap-[4px] px-5 py-3 rounded-[8px] bg-[#DCDCDC]">
                          <p className="text-[#6E7072] text-[10px] font-semibold uppercase">⊞ Pricing</p>
                          <p className="text-[#2B2D30] text-[14px] font-bold">{priceStr}</p>
                        </div>
                        <div className="flex flex-col items-start flex-1 gap-[4px] px-5 py-3 rounded-[8px] bg-[#DCDCDC]">
                          <p className="text-[#6E7072] text-[10px] font-semibold uppercase">📅 Date & Time</p>
                          <p className="text-[#2B2D30] text-[12px] font-bold leading-tight">{dateBoxStr}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* BOTTOM */}
                {isReserved ? (
                  <div className="flex items-center justify-between gap-3 px-5 py-3.5 bg-[#E2F199] flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#C7E36B]/50 flex items-center justify-center shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2C3A10" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      </div>
                      <div>
                        {fmtDateLong && <p className="text-[#1a2600] text-xs font-black">DATE: {fmtDateLong}</p>}
                        {fmtTimeRange && <p className="text-[#3a5000] text-[11px] font-semibold">at {fmtTimeRange}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {w.zoomLink ? (
                        <a href={w.zoomLink} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                          className="flex items-center gap-1 bg-[#C7E36B] text-black font-black text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition whitespace-nowrap">
                          Join Workshop →
                        </a>
                      ) : (
                        <button disabled
                          className="flex items-center gap-1 bg-[#C7E36B]/40 text-black/40 font-black text-sm px-5 py-2.5 rounded-xl cursor-not-allowed whitespace-nowrap">
                          Join Workshop →
                        </button>
                      )}
                      {calLink && (
                        <a href={calLink} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                          className="flex items-center bg-white text-[#1a2600] font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-gray-50 transition border border-gray-300 whitespace-nowrap">
                          Add to calendar
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={(e) => handleReserve(w, e)}
                    disabled={isFull}
                    className={`flex justify-center items-center gap-1 px-6 py-3 w-full rounded-b-[20px] font-black text-base uppercase transition-all
                      ${isFull ? "bg-gray-400 text-white cursor-not-allowed" : "bg-[#C7E36B] text-[#0F1112] hover:opacity-90"}`}
                  >
                    {isFull ? "SOLD OUT" : <><span>RESERVE SPOT</span><span className="text-xl">→</span></>}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* WhatsApp Contact */}
      <div className="mt-6 bg-[#F4A79D] rounded-3xl px-6 py-8 flex flex-col items-center text-center">
        <div className="w-[72px] h-[72px] rounded-full overflow-hidden border-[3px] border-white/60 mb-5 shadow-md">
          <img
            src="https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=144&h=144&fit=crop&crop=face"
            alt="Support agent"
            className="w-full h-full object-cover"
            onError={e => { e.target.src = "https://randomuser.me/api/portraits/women/44.jpg"; }}
          />
        </div>
        <h2 className="text-black text-[1.75rem] leading-[1.2] mb-2" style={{ fontWeight: 900 }}>
          Not sure which<br />workshop is<br />right for you?
        </h2>
        <p className="text-black font-bold text-sm mb-6">Get personalised guidance from our team</p>
        <a
          href="https://wa.me/919052088000"
          target="_blank"
          rel="noreferrer"
          className="bg-[#C7E36B] text-black font-black text-xs px-6 py-2.5 rounded-full hover:bg-[#d4ec85] transition-colors"
        >
          Chat on Whats app
        </a>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   VIDEO COURSES SECTION
════════════════════════════════════════════ */
const FALLBACK_COURSES = [
  { _id:"c1", title:"AI Script Writing Masterclass",    image:"/courses/v1.png", duration:"1h 10m", status:"all" },
  { _id:"c2", title:"Animate Photos with AI",           image:"/courses/v2.png", duration:"1h 20m", status:"all" },
  { _id:"c3", title:"AI Avatar Masterclass",            image:"/courses/v3.png", duration:"1h 10m", status:"all" },
  { _id:"c4", title:"AI Fashion Model Creation",        image:"/courses/v4.png", duration:"2h 00m", status:"mine", progress:40 },
  { _id:"c5", title:"Master AI Color Restoration",      image:"/courses/v5.png", duration:"1h 30m", status:"mine", progress:75 },
  { _id:"c6", title:"AI Face Enhancement Masterclass",  image:"/courses/v6.png", duration:"2h 15m", status:"completed" },
];

function VideoCoursesSection({ profile, onNavigate }) {
  const navigate   = useNavigate();
  const [courses, setCourses] = useState(FALLBACK_COURSES);
  const [loading, setLoading] = useState(true);
  const [tab, setTab]         = useState("all");
  const [search, setSearch]   = useState("");
  const [sort, setSort]       = useState("Newest");
  const [sortOpen, setSortOpen] = useState(false);
  const [detailCourse, setDetailCourse] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setDetailCourse(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    fetch("/api/courses")
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (Array.isArray(d) && d.length > 0) {
          const enrolledIds  = new Set((profile?.enrolledCourses  || []).map(x => String(x?._id || x)));
          const progressMap  = {};
          (profile?.courseProgress || []).forEach(p => {
            progressMap[String(p.course)] = p.percentComplete || 0;
          });
          setCourses(d.map(c => {
            const id       = String(c._id);
            const pct      = progressMap[id];
            const enrolled = enrolledIds.has(id) || pct !== undefined;
            const done     = pct === 100;
            return {
              ...c,
              image:    c.thumbnail || c.image || "/courses/v1.png",
              duration: c.duration || "—",
              status:   done ? "completed" : enrolled ? "mine" : "all",
              progress: enrolled && !done ? (pct || 0) : undefined,
            };
          }));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [profile]);

  const parseDuration = (d = "") => {
    /* handles: "1h 30m", "6 Hours", "35 HOURS", "2h 00m", "90 min" */
    const lower = d.toLowerCase();
    const hMatch = lower.match(/(\d+\.?\d*)\s*h/);
    const mMatch = lower.match(/(\d+\.?\d*)\s*m(?!o)/); // "m" not followed by "o" (month)
    if (hMatch || mMatch) {
      return (hMatch ? parseFloat(hMatch[1]) * 60 : 0) + (mMatch ? parseFloat(mMatch[1]) : 0);
    }
    /* plain number = hours (e.g. "6 Hours") */
    const numMatch = lower.match(/(\d+\.?\d*)/);
    return numMatch ? parseFloat(numMatch[1]) * 60 : 0;
  };

  const sorted = [...courses].sort((a, b) => {
    if (sort === "Duration")           return parseDuration(a.duration) - parseDuration(b.duration);
    if (sort === "Price: Low to High") return (a.price || 0) - (b.price || 0);
    return 0; // "Newest" — keep API order (already newest-first from backend)
  });

  const filtered = sorted.filter(c =>
    (tab === "all" ? true : tab === "my" ? c.status === "mine" : c.status === "completed") &&
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Course Detail Modal */}
      {detailCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setDetailCourse(null)}>
          <div className="bg-[#0F1112] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="relative">
              <img src={detailCourse.image} alt={detailCourse.title} className="w-full h-40 object-cover" />
              <button onClick={() => setDetailCourse(null)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 text-lg">✕</button>
              <span className="absolute bottom-3 left-3 bg-black/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded">{detailCourse.duration}</span>
            </div>
            <div className="p-5 space-y-3">
              <h2 className="text-lg font-bold text-white">{detailCourse.title}</h2>
              <p className="text-sm text-gray-400 leading-relaxed">{detailCourse.description || "Master cutting-edge AI filmmaking techniques in this comprehensive course designed for creative professionals."}</p>
              <div className="grid grid-cols-3 gap-2">
                {[["🎯","Level","Beginner"],["📋","Lessons","12"],["🎓","Certificate","Yes"]].map(([ic,l,v])=>(
                  <div key={l} className="bg-white/5 rounded-lg p-2 text-center">
                    <div className="text-base">{ic}</div>
                    <p className="text-[10px] text-gray-500">{l}</p>
                    <p className="text-xs font-bold text-white">{v}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => { setDetailCourse(null); navigate(`/courses/${detailCourse._id}/watch`); }}
                className="w-full bg-[#7C3AED] hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all text-sm"
              >
                Start Course →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs + Search + Sort */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex gap-1 bg-white/5 rounded-xl p-1">
          {[["all","All Courses"],["my","My Courses"],["completed","Completed"]].map(([id,label]) => (
            <button key={id} onClick={() => setTab(id)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${tab === id ? "bg-[#C7E36B] text-black" : "text-gray-400 hover:text-white"}`}>
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
              className="bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-sm text-white placeholder-gray-500 outline-none w-[180px]" />
            <Ic name="search" size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
          <div className="relative">
            <button onClick={() => setSortOpen(!sortOpen)} className="flex items-center gap-2 bg-white/5 border border-white/10 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/10">
              Sort: {sort} <Ic name="chevron" size={14} className={sortOpen ? "rotate-90" : ""} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 bg-[#1A1D1E] border border-white/10 rounded-xl overflow-hidden z-10 w-[180px]">
                {["Newest","Price: Low to High","Duration"].map(o => (
                  <button key={o} onClick={() => { setSort(o); setSortOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-all ${sort === o ? "text-[#C7E36B] bg-white/5" : "text-gray-300 hover:bg-white/5"}`}>
                    {o}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm animate-pulse text-center py-8">Loading courses...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-white font-semibold text-sm">No courses found</p>
          <p className="text-gray-500 text-xs mt-1">Try a different filter or search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c, i) => (
            <div key={c._id || i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all">
              <div className="relative cursor-pointer" onClick={() => setDetailCourse(c)}>
                <img src={c.image} alt={c.title} className="w-full h-[160px] object-cover" />
                <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">{c.duration}</span>
                {c.status === "completed" && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">Completed</div>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2">{c.title}</h3>
                {c.progress !== undefined && (
                  <div className="mb-2">
                    <div className="w-full bg-white/10 rounded-full h-1 mb-1">
                      <div className="bg-[#7C3AED] h-1 rounded-full" style={{ width: `${c.progress}%` }} />
                    </div>
                    <span className="text-[10px] text-gray-400">{c.progress}% completed</span>
                  </div>
                )}
                {c.status === "completed" ? (
                  <div className="flex gap-2">
                    <button onClick={() => onNavigate?.("certificates")} className="flex-1 text-xs border border-[#C7E36B] text-[#C7E36B] py-1.5 rounded-lg hover:bg-[#C7E36B]/10 transition-all">View Certificate</button>
                    <button onClick={() => navigate(`/courses/${c._id}/watch`)} className="flex-1 text-xs border border-white/20 text-gray-400 py-1.5 rounded-lg hover:bg-white/5 transition-all">View Again</button>
                  </div>
                ) : c.progress !== undefined ? (
                  <button onClick={() => navigate(`/courses/${c._id}/watch`)} className="w-full text-xs bg-[#7C3AED] hover:bg-purple-700 text-white py-1.5 rounded-lg transition-all font-semibold">Continue Learning</button>
                ) : (
                  <button onClick={() => setDetailCourse(c)} className="w-full text-xs border border-white/20 text-gray-400 py-1.5 rounded-lg hover:bg-white/5 transition-all">View Details</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════
   CERTIFICATES SECTION
════════════════════════════════════════════ */

const CERT_MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const fmtCertDate = d => {
  const dt = new Date(d);
  return `${String(dt.getDate()).padStart(2,"0")}-${CERT_MONTHS[dt.getMonth()]}-${dt.getFullYear()}`;
};

/* Full certificate document — white A4-landscape style matching Figma */
function CertificateDocument({ cert, studentName }) {
  return (
    <div className="relative bg-white rounded-lg overflow-hidden select-none" style={{ fontFamily: "Georgia, 'Times New Roman', serif", border: "3px solid #b8d400" }}>
      {/* Corner bracket squares — black outline, white fill */}
      {[["top-2 left-2"],["top-2 right-2"],["bottom-2 left-2"],["bottom-2 right-2"]].map(([pos], i) => (
        <div key={i} className={`absolute ${pos} w-4 h-4 bg-white z-10`} style={{ border: "2.5px solid #111" }} />
      ))}
      {/* Watermarks — faint brand logo text, top-right and bottom-left */}
      <div className="absolute top-5 right-6 select-none pointer-events-none" style={{ fontFamily: "Arial Black, sans-serif", fontSize: "52px", fontWeight: 900, opacity: 0.055, lineHeight: 1, letterSpacing: "-1px" }}>
        <span style={{ color: "#b8d400" }}>Ai</span><span style={{ color: "#111" }}>FA</span>
      </div>
      <div className="absolute bottom-12 left-5 select-none pointer-events-none" style={{ fontFamily: "Arial Black, sans-serif", fontSize: "52px", fontWeight: 900, opacity: 0.055, lineHeight: 1, letterSpacing: "-1px" }}>
        <span style={{ color: "#b8d400" }}>Ai</span><span style={{ color: "#111" }}>FA</span>
      </div>
      {/* Content */}
      <div className="flex flex-col items-center text-center px-10 pt-8 pb-6">
        {/* Logo — green Ai + black FA */}
        <div className="mb-3" style={{ fontFamily: "Arial Black, sans-serif", fontSize: "30px", fontWeight: 900, letterSpacing: "-0.5px", lineHeight: 1 }}>
          <span style={{ color: "#b8d400" }}>Ai</span><span style={{ color: "#111" }}>FA</span>
        </div>
        <h2 className="text-xl font-bold mb-1" style={{ color: "#5a6a20", fontFamily: "Georgia, serif" }}>Certificates of Completion</h2>
        <p className="text-xs text-gray-500 mb-4">Proudly presented to</p>
        <div className="mb-3 w-full">
          <p className="text-[22px] font-bold text-gray-900 leading-tight">{studentName || "Student"}</p>
          <div className="border-b-2 border-gray-800 mt-2 mx-auto w-48" />
        </div>
        <p className="text-[10px] text-gray-500 max-w-[260px] leading-relaxed">
          has successfully completed the course <strong className="text-gray-700">"{cert.courseTitle}"</strong> under the expert guidance of AIFA.<br />
          your hard work and commitment are truly commendable.
        </p>
        <p className="mt-4 text-xs text-gray-500">
          Presented on <span className="font-bold" style={{ color: "#b8d400" }}>{fmtCertDate(cert.issuedAt)}</span>
        </p>
      </div>
      {/* Footer row */}
      <div className="flex justify-between items-end px-8 pb-6">
        <p className="text-[10px] text-gray-700">Certificate no: {cert.certificateId}</p>
        <div className="text-right border-t border-gray-800 pt-1 min-w-[100px]">
          <p className="text-[10px] font-bold text-gray-900 uppercase tracking-wide">MADHAV REDDY</p>
          <p className="text-[9px] text-gray-500">CEO, Mentor</p>
        </div>
      </div>
    </div>
  );
}

/* Certificate list thumbnail (card top half) */
function CertThumbnail({ profile }) {
  return (
    <div className="h-[160px] relative overflow-hidden" style={{ background: "linear-gradient(135deg, #2e3d1c 0%, #3b5020 50%, #283618 100%)" }}>
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] select-none pointer-events-none">
        <span className="text-[90px] font-black text-white tracking-[0.3em]">AIFA</span>
      </div>
      <div className="absolute inset-[6px] border border-[#8faa55]/35 rounded-lg pointer-events-none" />
      <div className="absolute inset-[10px] border border-[#8faa55]/15 rounded-md pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center gap-0.5">
        <img src="/logos/aifabetalogo.svg" alt="AIFA" className="h-3.5 mb-1 opacity-75 brightness-200" onError={e => e.target.style.display = "none"} />
        <p className="text-[8.5px] text-[#c5d895] font-semibold tracking-[0.18em] uppercase">Certificates of Completion</p>
        <p className="text-[7.5px] text-[#8fa870] tracking-wide">Proudly presented to</p>
        <p className="text-[14px] text-white font-bold mt-0.5" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
          {profile?.name || "Student"}
        </p>
        <div className="w-16 border-b border-[#8faa55]/40 mt-1.5" />
      </div>
    </div>
  );
}

/* Certificate detail — full-page sub-view */
function CertDetailPage({ cert, profile, onBack }) {
  const [showViewer, setShowViewer] = useState(false);

  const typeLabel = t => t === "bootcamp" ? "Bootcamp" : t === "workshop" ? "Workshop" : "Video Course";
  const typeBadgeStyle = t =>
    t === "bootcamp" ? "bg-blue-500/20 text-blue-300 border-blue-500/30" :
    t === "workshop" ? "bg-purple-500/20 text-purple-300 border-purple-500/30" :
    "bg-green-500/20 text-green-300 border-green-500/30";

  const fmtDate = d => new Date(d).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" });
  const fmtShort = d => fmtCertDate(d);

  const handleDownloadPDF = () => {
    const studentName = profile?.name || "Student";
    const date = fmtShort(cert.issuedAt);
    const win = window.open("", "_blank", "width=900,height=660");
    if (!win) { alert("Please allow popups to download the certificate."); return; }
    win.document.write(`<!DOCTYPE html><html><head><title>Certificate — ${cert.courseTitle}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:Georgia,serif}
  @media print{body{min-height:unset}@page{size:A4 landscape;margin:0}.no-print{display:none}}
  .cert{width:800px;min-height:566px;border:3px solid #b8d400;position:relative;padding:0;background:#fff;display:flex;flex-direction:column}
  .corner{position:absolute;width:18px;height:18px;border:2.5px solid #111;background:#fff}
  .tl{top:8px;left:8px} .tr{top:8px;right:8px} .bl{bottom:8px;left:8px} .br{bottom:8px;right:8px}
  .wm{position:absolute;font-size:72px;font-weight:900;opacity:.055;font-family:'Arial Black',sans-serif;letter-spacing:-2px;user-select:none;pointer-events:none}
  .wm1{top:24px;right:36px} .wm2{bottom:55px;left:20px}
  .wm .lime{color:#b8d400} .wm .dark{color:#111}
  .body{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px 80px 20px}
  .logo{font-size:36px;font-weight:900;font-family:'Arial Black',sans-serif;margin-bottom:8px;letter-spacing:-1px}
  .logo .lime{color:#b8d400} .logo .dark{color:#111}
  h1{font-size:28px;color:#5a6a20;font-family:Georgia,serif;font-weight:700;margin-bottom:6px}
  .sub{font-size:13px;color:#888;margin-bottom:20px}
  .name{font-size:30px;font-weight:700;color:#111;margin-bottom:4px}
  .line{width:200px;border-bottom:2px solid #333;margin:0 auto 16px}
  .body p{font-size:12px;color:#666;max-width:400px;line-height:1.7}
  .date{margin-top:16px;font-size:13px;color:#888}
  .date b{color:#b8d400}
  .foot{display:flex;justify-content:space-between;align-items:flex-end;padding:0 40px 30px;margin-top:auto}
  .foot .id{font-size:11px;color:#555}
  .sig{text-align:right;border-top:1.5px solid #333;padding-top:6px;min-width:140px}
  .sig .sname{font-size:11px;font-weight:700;color:#111;text-transform:uppercase;letter-spacing:.5px}
  .sig .stitle{font-size:10px;color:#888}
  .btn{margin-top:24px;padding:10px 32px;background:#b8d400;color:#000;border:none;font-size:14px;font-weight:700;cursor:pointer;border-radius:6px;font-family:sans-serif}
</style></head><body>
<div style="display:flex;flex-direction:column;align-items:center">
  <div class="cert">
    <div class="corner tl"></div><div class="corner tr"></div>
    <div class="corner bl"></div><div class="corner br"></div>
    <div class="wm wm1"><span class="lime">Ai</span><span class="dark">FA</span></div>
    <div class="wm wm2"><span class="lime">Ai</span><span class="dark">FA</span></div>
    <div class="body">
      <div class="logo"><span class="lime">Ai</span><span class="dark">FA</span></div>
      <h1>Certificates of Completion</h1>
      <p class="sub">Proudly presented to</p>
      <p class="name">${studentName}</p>
      <div class="line"></div>
      <p>has successfully completed the course <strong>"${cert.courseTitle}"</strong> under the expert guidance of AIFA. Your hard work and commitment are truly commendable.</p>
      <p class="date">Presented on <b>${date}</b></p>
    </div>
    <div class="foot">
      <div class="id">Certificate no: ${cert.certificateId}</div>
      <div class="sig">
        <div class="sname">MADHAV REDDY</div>
        <div class="stitle">CEO, Mentor</div>
      </div>
    </div>
  </div>
  <button class="btn no-print" onclick="window.print();window.close()">Print / Save as PDF</button>
</div>
</body></html>`);
    win.document.close();
    win.focus();
  };

  const Row = ({ label, children }) => (
    <div className="flex items-center justify-between py-3.5 border-b border-white/8">
      <div className="flex items-center gap-3 text-gray-400 text-sm">
        <span>{label}</span>
      </div>
      <div className="text-sm text-white text-right">{children}</div>
    </div>
  );

  return (
    <div className="p-6 max-w-[1000px]">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs mb-5">
        <button onClick={onBack} className="text-[#C7E36B] hover:underline">My Certificates</button>
        <span className="text-gray-600">›</span>
        <span className="text-gray-400">Certificates Details</span>
      </nav>

      {/* Title row */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-2xl font-bold text-white">Certificates Details</h1>
          <p className="text-gray-400 text-sm mt-1">View and download your earned certificates.</p>
        </div>
        <button onClick={onBack}
          className="flex items-center gap-2 bg-white text-black text-sm font-semibold px-4 py-2 rounded-full hover:bg-gray-100 transition-all shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
          Back to My Certificates
        </button>
      </div>

      {/* Main content card */}
      <div className="bg-[#141718] border border-white/10 rounded-2xl p-7 flex flex-col md:flex-row gap-8">
        {/* Left — certificate image */}
        <div className="md:w-[45%] shrink-0">
          <CertificateDocument cert={cert} studentName={profile?.name || "Student"} />
        </div>

        {/* Right — details */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-[#C7E36B]/15 border border-[#C7E36B]/30 flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#C7E36B">
                <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">Certificate of Completion</h2>
              <p className="text-sm text-gray-400 mt-0.5">{cert.courseTitle}</p>
            </div>
          </div>

          {/* Detail rows */}
          <div className="divide-y divide-white/8 border-t border-white/8">
            <Row label="Student Name">
              <span className="font-semibold">{profile?.name || "Student"}</span>
            </Row>
            <Row label="Issued Date">
              {fmtDate(cert.issuedAt)}
            </Row>
            <Row label="Type">
              <span className={`text-[11px] font-bold px-3 py-1 rounded-full border capitalize ${typeBadgeStyle(cert.itemType)}`}>
                {typeLabel(cert.itemType)}
              </span>
            </Row>
            <Row label="Certificate ID">
              <span className="font-mono text-[13px]">{cert.certificateId}</span>
            </Row>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-6">
            <button onClick={() => setShowViewer(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-white text-black text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-100 transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
              View Certificate
            </button>
            <button onClick={handleDownloadPDF}
              className="flex-1 flex items-center justify-center gap-2 bg-[#C7E36B] text-black text-sm font-bold py-2.5 rounded-xl hover:bg-lime-300 transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen certificate viewer */}
      {showViewer && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setShowViewer(false)}>
          <div className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowViewer(false)}
              className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
              Close
            </button>
            <CertificateDocument cert={cert} studentName={profile?.name || "Student"} />
          </div>
        </div>
      )}
    </div>
  );
}

function CertificatesSection({ token, profile }) {
  const [certs, setCerts]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortOrder, setSortOrder]   = useState("Latest");
  const [sortOpen, setSortOpen]     = useState(false);
  const [viewCert, setViewCert]     = useState(null);

  useEffect(() => {
    fetch("/api/certificates/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setCerts(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [token]);

  const typeLabel = t => t === "bootcamp" ? "Bootcamp" : t === "workshop" ? "Workshop" : "Video Course";
  const typeBadgeStyle = t =>
    t === "bootcamp" ? "border-blue-400/40 text-blue-400 bg-blue-400/10" :
    t === "workshop" ? "border-purple-400/40 text-purple-400 bg-purple-400/10" :
    "border-green-400/40 text-green-400 bg-green-400/10";

  const filtered = certs
    .filter(c => typeFilter === "all" || c.itemType === typeFilter)
    .sort((a, b) => sortOrder === "Latest" ? new Date(b.issuedAt) - new Date(a.issuedAt) : new Date(a.issuedAt) - new Date(b.issuedAt));

  /* When a cert is selected, show full-page detail instead of grid */
  if (viewCert) {
    return <CertDetailPage cert={viewCert} profile={profile} onBack={() => setViewCert(null)} />;
  }

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">My Certificates</h1>
        <p className="text-gray-400 text-sm mt-0.5">View and download certificates earned from your courses</p>
      </div>

      {/* Cards grid */}
      {loading ? (
        <p className="text-gray-500 text-sm animate-pulse text-center py-16">Loading certificates...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Ic name="cert" size={28} className="text-gray-600" />
          </div>
          <p className="text-white font-semibold text-sm">No Certificates Yet</p>
          <p className="text-gray-500 text-xs mt-1">Complete a course, workshop, or bootcamp to earn your first certificate.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filtered.map((c) => (
            <div key={c._id} className="bg-[#141718] rounded-xl overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.1)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2)] transition-all flex flex-col">
              <CertThumbnail profile={profile} />
              <div className="p-4 flex flex-col flex-1">
                <span className={`self-start text-[9px] font-bold px-2.5 py-0.5 rounded border uppercase tracking-wide mb-2 ${typeBadgeStyle(c.itemType)}`}>
                  {typeLabel(c.itemType)}
                </span>
                <p className="text-[10px] text-gray-500 mb-2">Earned on {new Date(c.issuedAt).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}</p>
                <h3 className="text-sm font-bold text-white leading-snug mb-1">{c.courseTitle}</h3>
                <p className="text-[11px] text-gray-500 line-clamp-2 mb-3">
                  {c.description ||
                    (c.itemType === "bootcamp"
                      ? "Master the complete AI filmmaking pipeline with hands-on projects and expert mentorship."
                      : c.itemType === "workshop"
                      ? "An intensive hands-on session to develop practical AI skills with industry guidance."
                      : "Learn cutting-edge AI techniques to accelerate your creative and professional career.")}
                </p>
                <div className="flex items-center justify-between pt-3 mt-auto border-t border-white/8">
                  <div>
                    <p className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider">Certificate ID</p>
                    <p className="text-[10px] text-gray-300 font-mono mt-0.5">{c.certificateId}</p>
                  </div>
                  <button onClick={() => setViewCert(c)}
                    className="bg-white text-black text-[11px] font-bold px-4 py-1.5 rounded-lg hover:bg-gray-100 transition-all">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════
   JOBS SECTION
════════════════════════════════════════════ */
const JOB_BUDGETS   = ["< ₹50/hr","₹50-100/hr","₹100-200/hr","₹200+/hr"];
const JOB_TIMELINES = ["Immediate","Within 2 Weeks","1 Month+","Flexible"];

function JobsSection({ token }) {
  const [jobs, setJobs]             = useState([]);
  const [loading, setLoading]       = useState(true);
  const [catFilter, setCat]         = useState("All");
  const [budgetFilter, setBudget]   = useState("All");
  const [timelineFilter, setTimeline] = useState("All");
  const [detailJob, setDetailJob]   = useState(null);
  const [applied, setApplied]       = useState(false);

  useEffect(() => {
    const onEsc = (e) => { if (e.key === "Escape") { setDetailJob(null); setApplied(false); } };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  useEffect(() => {
    fetch("/api/jobs")
      .then(r => r.ok ? r.json() : [])
      .then(d => { if (Array.isArray(d)) setJobs(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const allTags     = ["All", ...Array.from(new Set(jobs.map(j => j.tag).filter(Boolean)))];
  const allBudgets  = ["All", ...Array.from(new Set(jobs.map(j => j.budget).filter(Boolean)))];
  const allTimelines = ["All", ...Array.from(new Set(jobs.map(j => j.timeline).filter(Boolean)))];

  const filtered = jobs.filter(j => {
    if (catFilter      !== "All" && j.tag      !== catFilter)      return false;
    if (budgetFilter   !== "All" && j.budget   !== budgetFilter)   return false;
    if (timelineFilter !== "All" && j.timeline !== timelineFilter) return false;
    return true;
  });

  const timeAgo = (iso) => {
    if (!iso) return "";
    const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
    if (diff < 3600)  return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff/3600)>1?"s":""} ago`;
    return `${Math.floor(diff / 86400)} day${Math.floor(diff/86400)>1?"s":""} ago`;
  };

  const DropFilter = ({ val, opts, onChange, label }) => (
    <div className="relative">
      <select
        value={val}
        onChange={e => onChange(e.target.value)}
        className="appearance-none bg-[#111315] border border-white/15 text-sm text-gray-300 rounded-xl px-4 pr-9 py-2.5 outline-none cursor-pointer hover:border-white/25 transition-all min-w-[140px]"
      >
        <option value="All">{label}</option>
        {opts.filter(o => o !== "All").map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
    </div>
  );

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="flex gap-3 mb-8 flex-wrap">
        <DropFilter val={catFilter}      opts={allTags}      onChange={setCat}      label="Category" />
        <DropFilter val={budgetFilter}   opts={allBudgets}   onChange={setBudget}   label="Budget" />
        <DropFilter val={timelineFilter} opts={allTimelines} onChange={setTimeline} label="Timeline" />
        {(catFilter !== "All" || budgetFilter !== "All" || timelineFilter !== "All") && (
          <button onClick={() => { setCat("All"); setBudget("All"); setTimeline("All"); }} className="text-xs text-gray-500 hover:text-white underline self-center">Clear</button>
        )}
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm animate-pulse text-center py-12">Loading jobs...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <svg className="mx-auto mb-3 opacity-40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
          <p className="text-sm font-semibold text-white mb-1">No Jobs Found</p>
          <p className="text-xs">Try changing your filters or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((j) => (
            <div key={j._id} className="bg-[#111315] border border-white/8 rounded-2xl p-5 hover:border-white/18 transition-all flex flex-col">
              {/* Tag */}
              {j.tag && (
                <span className="text-[11px] font-bold bg-[#C7E36B] text-black px-3 py-1 rounded-full w-fit mb-3">{j.tag}</span>
              )}
              {/* Title + type */}
              <h3 className="text-base font-bold text-white mb-1 leading-snug">{j.title}</h3>
              <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wide mb-3">{j.type}</p>
              {/* Description */}
              <p className="text-sm text-gray-400 flex-1 mb-4 line-clamp-3 leading-relaxed">{j.description}</p>
              {/* View Details */}
              <button
                onClick={() => { setDetailJob(j); setApplied(false); }}
                className="text-sm text-[#C7E36B] font-semibold hover:underline text-left mb-4"
              >View Details</button>
              {/* Footer */}
              <div className="flex items-center gap-2 flex-wrap border-t border-white/8 pt-3">
                {j.budget && (
                  <span className="text-xs border border-white/15 text-gray-300 px-3 py-1 rounded-lg font-medium">{j.budget}</span>
                )}
                {(j.createdAt || j.postedAt) && (
                  <span className="text-xs border border-white/15 text-gray-400 px-3 py-1 rounded-lg">{timeAgo(j.createdAt || j.postedAt)}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {detailJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => { setDetailJob(null); setApplied(false); }}>
          <div className="bg-[#111315] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                {detailJob.tag && <span className="text-[10px] font-bold bg-[#C7E36B] text-black px-2.5 py-0.5 rounded-full">{detailJob.tag}</span>}
                <h2 className="text-lg font-bold text-white mt-2 mb-0.5">{detailJob.title}</h2>
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide">{detailJob.type}</p>
              </div>
              <button onClick={() => { setDetailJob(null); setApplied(false); }} className="text-gray-500 hover:text-white ml-4 shrink-0">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-5">{detailJob.description}</p>
            {detailJob.skills?.length > 0 && (
              <div className="mb-5">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">Required Skills</p>
                <div className="flex flex-wrap gap-2">
                  {detailJob.skills.map(s => <span key={s} className="text-xs border border-white/15 text-gray-300 px-3 py-1 rounded-full">{s}</span>)}
                </div>
              </div>
            )}
            <div className="flex gap-3 mb-5">
              {detailJob.budget && <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center flex-1"><p className="text-[9px] text-gray-500 uppercase tracking-wider mb-1">Budget</p><p className="text-sm font-bold text-white">{detailJob.budget}</p></div>}
              {detailJob.timeline && <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center flex-1"><p className="text-[9px] text-gray-500 uppercase tracking-wider mb-1">Timeline</p><p className="text-sm font-bold text-white">{detailJob.timeline}</p></div>}
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-5">
              <p className="text-xs font-bold text-gray-300 mb-1">How to Apply</p>
              <p className="text-xs text-gray-500">Submit your portfolio and a brief introduction via the AIFA platform. Shortlisted candidates will be contacted within 5 business days.</p>
            </div>
            {applied ? (
              <div className="w-full bg-[#C7E36B]/10 border border-[#C7E36B]/30 rounded-xl py-4 text-center">
                <p className="text-[#C7E36B] font-bold text-sm">Application Submitted!</p>
                <p className="text-gray-400 text-xs mt-1">We'll contact you within 5 business days.</p>
              </div>
            ) : (
              <button onClick={() => setApplied(true)} className="w-full bg-[#C7E36B] text-black font-bold py-3 rounded-xl hover:brightness-105 transition-all text-sm">Apply Now</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════
   BILLING & PAYMENTS SECTION
════════════════════════════════════════════ */
function BillingSection({ onViewInvoice, profile }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [menuPos, setMenuPos]   = useState({ top: 0, left: 0 });
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("aifa_token");
  const menuRef = useRef(null);

  /* Click-outside closes three-dot menu */
  useEffect(() => {
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setOpenMenu(null); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleMenuToggle = (e, i) => {
    if (openMenu === i) { setOpenMenu(null); return; }
    const rect = e.currentTarget.getBoundingClientRect();
    const dropdownH = 96; // approx height of 2 items
    const dropdownW = 160;
    const spaceBelow = window.innerHeight - rect.bottom;
    const top = spaceBelow < dropdownH + 8 ? rect.top - dropdownH - 4 : rect.bottom + 4;
    const left = Math.min(rect.right - dropdownW, window.innerWidth - dropdownW - 8);
    setMenuPos({ top, left });
    setOpenMenu(i);
  };

  useEffect(() => {
    fetch("/api/payments/history", { headers:{ Authorization:`Bearer ${token}` } })
      .then(r => r.ok ? r.json() : [])
      .then(d => {
        if (Array.isArray(d) && d.length > 0) {
          setPurchases(d.map(p => ({
            id: `#INV-${String(p._id).slice(-6).toUpperCase()}`,
            name: p.itemTitle || "Course",
            type: p.itemType ? p.itemType.charAt(0).toUpperCase() + p.itemType.slice(1) : "Course",
            date: new Date(p.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}),
            amount: `₹${(p.amount||0).toLocaleString("en-IN")}`,
            status: p.status === "paid" ? "Paid" : "Pending",
          })));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  return (
    <div className="p-6 bg-[#0B0F10] min-h-full">
      <h1 className="text-xl font-bold text-white mb-6">Billing & Payments</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { icon: "💰", label: "Total Amount Spent", value: loading ? "—" : `₹${purchases.filter(p=>p.status==="Paid").reduce((s,p)=>s+Number(p.amount.replace(/[₹,]/g,"")||0),0).toLocaleString("en-IN")}` },
          { icon: "🛒", label: "Total Purchases", value: loading ? "—" : String(purchases.length) },
          { icon: "📅", label: "Last Payment Date", value: purchases.length > 0 ? purchases[0].date : "—" },
        ].map(s => (
          <div key={s.label} className="bg-[#0F1112] border border-white/10 rounded-xl p-4">
            <p className="text-xs text-gray-400 flex items-center gap-2"><span>{s.icon}</span>{s.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#0F1112] border border-white/10 rounded-xl overflow-hidden">
        <h2 className="text-sm font-bold text-white px-6 py-4 border-b border-white/5">Purchase History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-[11px] text-gray-400 font-semibold uppercase bg-white/5 border-b border-white/5">
                {["Purchase ID", "Program Name", "Type", "Purchase Date", "Amount", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-6 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading && <tr><td colSpan={7} className="px-6 py-6 text-center text-gray-400 text-sm animate-pulse">Loading transactions...</td></tr>}
              {!loading && purchases.length === 0 && <tr><td colSpan={7} className="px-6 py-8 text-center text-gray-500 text-sm">No transactions yet.</td></tr>}
              {purchases.map((p, i) => (
                <tr key={i} className="hover:bg-white/[0.03] transition-all">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-300">{p.id}</td>
                  <td className="px-6 py-4 text-sm text-white font-medium">{p.name}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold ${p.type === "Bootcamp" ? "text-blue-400" : p.type === "Workshop" ? "text-purple-400" : "text-green-400"}`}>{p.type}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{p.date}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-white">{p.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${p.status === "Paid" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={(e) => handleMenuToggle(e, i)} className="text-gray-400 hover:text-white">
                      <Ic name="more" size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fixed dropdown — outside overflow containers so it's never clipped */}
      {openMenu !== null && (
        <div
          ref={menuRef}
          style={{ position: "fixed", top: menuPos.top, left: menuPos.left, zIndex: 9999 }}
          className="bg-[#0F1112] border border-white/10 rounded-xl shadow-2xl w-[160px] overflow-hidden"
        >
          <button onClick={() => { onViewInvoice(purchases[openMenu]); setOpenMenu(null); }}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white text-left">
            <Ic name="eye" size={14} className="text-gray-400" />View Invoice
          </button>
          <button onClick={() => { onViewInvoice({ ...purchases[openMenu], _triggerDownload: true }); setOpenMenu(null); }}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white text-left">
            <Ic name="download" size={14} className="text-gray-400" />Download Invoice
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── INVOICE VIEW ─── */
function InvoiceView({ item, onBack, profile }) {
  const invoiceRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onBack(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onBack]);

  const handleDownload = () => {
    const invoiceHtml = invoiceRef.current?.innerHTML || "";
    const win = window.open("", "_blank");
    win.document.write(`<!DOCTYPE html><html><head>
      <title>Invoice ${item.id}</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #fff; color: #111; padding: 40px; }
        .inv-wrap { max-width: 680px; margin: 0 auto; }
        .inv-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 36px; }
        .inv-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .inv-logo-box { width: 36px; height: 36px; background: #0B0F10; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #C7E36B; font-weight: 900; font-size: 14px; }
        .inv-logo span { font-size: 22px; font-weight: 900; color: #0B0F10; }
        .inv-addr { font-size: 11px; color: #555; line-height: 1.7; }
        .inv-addr a { color: #5a7a00; }
        .inv-title { font-size: 40px; font-weight: 900; color: #eee; letter-spacing: 6px; text-align: right; }
        .inv-meta { text-align: right; font-size: 11px; margin-top: 6px; }
        .inv-meta tr td:first-child { color: #888; padding-right: 24px; }
        .inv-meta tr td:last-child { font-weight: 700; }
        .inv-billed { margin-bottom: 28px; }
        .inv-billed .label { font-size: 9px; color: #999; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
        .inv-billed .name { font-size: 14px; font-weight: 700; }
        .inv-billed .email { font-size: 12px; color: #5a7a00; }
        .inv-billed .sid { font-size: 11px; color: #888; }
        table.items { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
        table.items th { font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: #888; border-bottom: 1.5px solid #eee; padding: 8px 0; font-weight: 600; }
        table.items th:not(:first-child), table.items td:not(:first-child) { text-align: right; }
        table.items td { font-size: 12px; padding: 12px 0; border-bottom: 1px solid #f0f0f0; }
        table.items td.desc-sub { font-size: 10px; color: #999; }
        .totals { margin-left: auto; width: 200px; font-size: 12px; }
        .totals tr td { padding: 3px 0; color: #555; }
        .totals tr td:last-child { text-align: right; }
        .totals .total-row td { font-size: 14px; font-weight: 900; color: #111; border-top: 1.5px solid #ddd; padding-top: 8px; }
        .totals .paid-row td { color: #16a34a; }
        .totals .balance-row td { font-weight: 700; color: #111; }
        .badge { display: inline-block; background: #dcfce7; color: #16a34a; font-size: 10px; font-weight: 700; padding: 3px 10px; border-radius: 99px; }
        .footer { margin-top: 48px; text-align: center; font-size: 10px; color: #bbb; }
      </style>
    </head><body>
    <div class="inv-wrap">
      <div class="inv-header">
        <div>
          <div class="inv-logo">
            <div class="inv-logo-box">A</div>
            <span>AIFA</span>
          </div>
          <div class="inv-addr">
            AIFA Film Academy<br/>
            Hyderabad, Telangana, India<br/>
            <a>info@aifa.co.in</a>
          </div>
        </div>
        <div>
          <div class="inv-title">INVOICE</div>
          <table class="inv-meta"><tbody>
            <tr><td>Invoice Number:</td><td>${item.id}</td></tr>
            <tr><td>Date of Issue:</td><td>${item.date}</td></tr>
            <tr><td>Status:</td><td><span class="badge">${item.status}</span></td></tr>
          </tbody></table>
        </div>
      </div>

      <div class="inv-billed">
        <div class="label">Billed To</div>
        <div class="name">${profile?.name || "Student"}</div>
        <div class="email">${profile?.email || ""}</div>
        <div class="sid">Student ID: STU-${String(profile?._id || "000000").slice(-6).toUpperCase()}</div>
      </div>

      <table class="items">
        <thead><tr>
          <th style="text-align:left">Description</th>
          <th>Type</th><th>Qty</th><th>Unit Price</th><th>Amount</th>
        </tr></thead>
        <tbody><tr>
          <td>${item.name}<br/><span class="desc-sub">${item.type} program</span></td>
          <td>${item.type}</td><td>1</td><td>${item.amount}</td><td>${item.amount}</td>
        </tr></tbody>
      </table>

      <table class="totals"><tbody>
        <tr><td>Subtotal</td><td>${item.amount}</td></tr>
        <tr><td>Tax (GST 18%)</td><td>₹0</td></tr>
        <tr class="total-row"><td>Total</td><td>${item.amount}</td></tr>
        <tr class="paid-row"><td>Amount Paid</td><td>-${item.amount}</td></tr>
        <tr class="balance-row"><td>Balance Due</td><td>₹0</td></tr>
      </tbody></table>

      <div class="footer">Thank you for choosing AIFA Film Academy · info@aifa.co.in</div>
    </div>
    <script>window.onload = () => { window.print(); window.onafterprint = () => window.close(); }</script>
    </body></html>`);
    win.document.close();
  };

  // Auto-trigger download when opened via "Download Invoice" from dropdown
  useEffect(() => {
    if (item?._triggerDownload) setTimeout(handleDownload, 100);
  }, []);

  return (
    <div className="p-6 bg-[#0B0F10] min-h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-400 hover:text-white">
            <Ic name="back" size={16} />Back to Billing
          </button>
          <h1 className="text-lg font-bold text-white">Invoice {item.id}</h1>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${item.status === "Paid" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>{item.status}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={handleDownload} className="flex items-center gap-2 text-xs border border-white/10 text-gray-300 px-4 py-2 rounded-xl hover:bg-white/5">
            <Ic name="print" size={14} />Print
          </button>
          <button onClick={handleDownload} className="flex items-center gap-2 text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-xl hover:opacity-90">
            <Ic name="download" size={14} />Download PDF
          </button>
        </div>
      </div>

      <div className="bg-[#0F1112] border border-white/10 rounded-xl p-8 max-w-2xl mx-auto text-white">
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-xs">A</span></div>
              <span className="text-lg font-black text-white">AIFA</span>
            </div>
            <p className="text-xs text-gray-400">AIFA Learning Platform Inc.</p>
            <p className="text-xs text-gray-400">123 Tech Avenue, Suite 400</p>
            <p className="text-xs text-gray-400">San Francisco, CA 94105</p>
            <p className="text-xs text-[#C7E36B]">billing@aifa.edu</p>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-black text-white/10 tracking-widest">INVOICE</h2>
            <div className="mt-2 space-y-1">
              <div className="flex justify-end gap-8 text-xs"><span className="text-gray-400">Invoice Number:</span><span className="font-semibold">{item.id}</span></div>
              <div className="flex justify-end gap-8 text-xs"><span className="text-gray-400">Date of Issue:</span><span className="font-semibold">{item.date}</span></div>
              <div className="flex justify-end gap-8 text-xs"><span className="text-gray-400">Payment Method:</span><span className="font-semibold">•••• 4242</span></div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-[10px] text-gray-500 font-semibold uppercase mb-1">BILLED TO</p>
          <p className="text-sm font-bold text-white">{profile?.name || "Student"}</p>
          <p className="text-xs text-[#C7E36B]">{profile?.email || "—"}</p>
          <p className="text-xs text-gray-400">Student ID: STU-{String(profile?._id || "000000").slice(-6).toUpperCase()}</p>
        </div>

        <table className="w-full mb-4">
          <thead><tr className="text-[10px] text-gray-400 uppercase border-b border-white/10">
            {["Description", "Type", "Qty", "Unit Price", "Amount"].map(h => (
              <th key={h} className={`py-2 font-semibold ${h === "Description" ? "text-left" : "text-right"}`}>{h}</th>
            ))}
          </tr></thead>
          <tbody><tr className="border-b border-white/5">
            <td className="py-3 text-sm text-white">{item.name}<br /><span className="text-xs text-gray-400">12-week intensive online program</span></td>
            <td className="py-3 text-sm text-gray-400 text-right">{item.type}</td>
            <td className="py-3 text-sm text-white text-right">1</td>
            <td className="py-3 text-sm text-white text-right">{item.amount}</td>
            <td className="py-3 text-sm font-semibold text-white text-right">{item.amount}</td>
          </tr></tbody>
        </table>

        <div className="space-y-1 ml-auto w-48 text-xs">
          <div className="flex justify-between text-gray-400"><span>Subtotal</span><span>{item.amount}</span></div>
          <div className="flex justify-between text-gray-400"><span>Tax (0%)</span><span>₹0</span></div>
          <div className="flex justify-between text-sm font-bold text-white border-t border-white/10 pt-2 mt-2"><span>Total</span><span>{item.amount}</span></div>
          <div className="flex justify-between text-gray-400 text-green-400"><span>Amount Paid</span><span>-{item.amount}</span></div>
          <div className="flex justify-between text-sm font-bold text-white"><span>Balance Due</span><span>₹0</span></div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   PROFILE SECTION
════════════════════════════════════════════ */
function ProfileSection({ profile, token, onUpdated }) {
  const [editing, setEditing]       = useState(false);
  const [name, setName]             = useState(profile?.name || "");
  const [phone, setPhone]           = useState(profile?.phone || "");
  const [linkedin, setLinkedin]     = useState(profile?.socialLinks?.linkedin || "");
  const [instagram, setInstagram]   = useState(profile?.socialLinks?.instagram || "");
  const [portfolio, setPortfolio]   = useState(profile?.socialLinks?.portfolio || "");
  const [saving, setSaving]         = useState(false);
  const [msg, setMsg]               = useState("");
  const [uploading, setUploading]   = useState(false);
  const [avatarErr, setAvatarErr]   = useState(false);
  const fileRef = useRef(null);


  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("avatar", file);
    try {
      const res = await fetch("/api/users/me/avatar", { method: "PUT", headers: { Authorization: `Bearer ${token}` }, body: fd });
      const data = await res.json();
      if (res.ok) { onUpdated(data.user); }
    } catch {}
    setUploading(false);
  };

  const handleSave = async () => {
    setSaving(true); setMsg("");
    const res = await fetch("/api/users/me", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name, phone, socialLinks: { linkedin, instagram, portfolio } }),
    });
    const data = await res.json();
    if (res.ok) {
      onUpdated(data);
      localStorage.setItem("aifa_user", JSON.stringify({ name: data.name, _id: data._id, role: data.role, profilePicture: data.profilePicture || "", emailVerified: !!data.emailVerified }));
      setMsg("Saved!"); setEditing(false);
    } else setMsg(data.message || "Failed.");
    setSaving(false);
  };

  const memberId = `AIFA-${String(profile?._id || "98234").slice(-5).toUpperCase()}`;
  const avatarSrc = profile?.profilePicture;
  const initial = (profile?.name || "A")[0].toUpperCase();
  const showAvatar = avatarSrc && !avatarErr;

  return (
    <div className="p-6 bg-[#0B0F10] min-h-full text-white">

      {/* Personal Info Card */}
      <div className="bg-[#0F1112] border border-white/10 rounded-xl p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-white">Personal Information</h2>
            <p className="text-xs text-gray-400 mt-0.5">Manage your basic profile details.</p>
          </div>
          {!editing && (
            <button onClick={() => { setName(profile?.name||""); setPhone(profile?.phone||""); setLinkedin(profile?.socialLinks?.linkedin||""); setInstagram(profile?.socialLinks?.instagram||""); setPortfolio(profile?.socialLinks?.portfolio||""); setEditing(true); }}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-all">
              <Ic name="edit" size={14} />Edit
            </button>
          )}
        </div>

        {editing ? (
          <div>
            {/* Avatar picker */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-20 h-20 mb-3 cursor-pointer" onClick={() => fileRef.current?.click()}>
                {showAvatar
                  ? <img src={avatarSrc} alt="avatar" onError={() => setAvatarErr(true)} className="w-20 h-20 rounded-full object-cover ring-2 ring-white/25" />
                  : <div className="w-20 h-20 rounded-full bg-[#C7E36B] ring-2 ring-white/25 flex items-center justify-center text-black text-2xl font-bold">{initial}</div>
                }
                {uploading
                  ? <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center"><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"/></div>
                  : <span className="absolute bottom-0.5 right-0.5 w-6 h-6 rounded-full bg-[#111315] border border-white/20 flex items-center justify-center shadow-md">
                      <Ic name="camera" size={12} className="text-gray-300" />
                    </span>
                }
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              <button onClick={() => fileRef.current?.click()} disabled={uploading} className="text-xs bg-[#C7E36B] text-black font-semibold px-4 py-2 rounded-lg hover:bg-lime-300 disabled:opacity-60">
                {uploading ? "Uploading..." : "Change Picture"}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Full Name</label>
                <input value={name} onChange={e => setName(e.target.value)}
                  className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#7C3AED]" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Email Address</label>
                <input value={profile?.email} disabled
                  className="w-full bg-white/5 border border-white/5 rounded-lg px-3 py-2 text-sm text-gray-500 cursor-not-allowed" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Mobile Number</label>
                <input
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  inputMode="numeric"
                  className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#7C3AED]" />
              </div>
            </div>

            {/* Social links */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">LinkedIn URL</label>
                <input value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="linkedin.com/in/..."
                  className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#7C3AED]" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Instagram</label>
                <input value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="@username"
                  className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#7C3AED]" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Portfolio URL</label>
                <input value={portfolio} onChange={e => setPortfolio(e.target.value)} placeholder="https://..."
                  className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#7C3AED]" />
              </div>
            </div>

            {msg && <p className={`text-xs mb-3 ${msg === "Saved!" ? "text-green-400" : "text-red-400"}`}>{msg}</p>}
            <div className="flex justify-end gap-3">
              <button onClick={() => setEditing(false)} className="px-5 py-2 text-xs border border-white/10 text-gray-300 rounded-lg hover:bg-white/5">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="px-5 py-2 text-xs bg-[#C7E36B] text-black font-semibold rounded-lg hover:bg-lime-300 disabled:opacity-60 font-bold">
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-6">
            <div className="relative shrink-0 group cursor-pointer" onClick={() => { setEditing(true); setTimeout(() => fileRef.current?.click(), 50); }}>
              {showAvatar
                ? <img src={avatarSrc} alt="avatar" onError={() => setAvatarErr(true)} className="w-16 h-16 rounded-full object-cover ring-2 ring-white/25" />
                : <div className="w-16 h-16 rounded-full bg-[#C7E36B] ring-2 ring-white/25 flex items-center justify-center text-black text-xl font-bold">{initial}</div>
              }
              <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#111315] border border-white/20 flex items-center justify-center shadow-md">
                <Ic name="camera" size={12} className="text-gray-300" />
              </span>
            </div>
            <div className="grid grid-cols-2 gap-6 flex-1">
              <div>
                <p className="text-xs text-gray-500 mb-1 font-semibold">Full Name</p>
                <p className="text-sm font-semibold text-white">{profile?.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1 font-semibold">Email Address</p>
                <p className="text-sm text-white">{profile?.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1 font-semibold">Mobile Number</p>
                <p className="text-sm text-white">{profile?.phone || "—"}</p>
              </div>
              {(profile?.socialLinks?.linkedin || profile?.socialLinks?.instagram || profile?.socialLinks?.portfolio) && (
                <div>
                  <p className="text-xs text-gray-500 mb-1 font-semibold">Social Links</p>
                  <div className="flex gap-3">
                    {profile.socialLinks.linkedin  && <a href={profile.socialLinks.linkedin}  target="_blank" rel="noreferrer" className="text-xs text-[#C7E36B] hover:underline">LinkedIn</a>}
                    {profile.socialLinks.instagram && <a href={`https://instagram.com/${profile.socialLinks.instagram.replace("@","")}`} target="_blank" rel="noreferrer" className="text-xs text-[#C7E36B] hover:underline">Instagram</a>}
                    {profile.socialLinks.portfolio  && <a href={profile.socialLinks.portfolio}  target="_blank" rel="noreferrer" className="text-xs text-[#C7E36B] hover:underline">Portfolio</a>}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Account Info */}
      <div className="mt-8">
        <h2 className="text-base font-bold text-white mb-5">Account Information</h2>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1.5">Member ID</p>
            <p className="text-sm font-bold text-white">{memberId}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1.5">Member Since</p>
            <p className="text-sm font-bold text-white">
              {new Date(profile?.createdAt || "2023-10-12").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1.5">Account Status</p>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-400 border border-green-500/50 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   SETTINGS SECTION
════════════════════════════════════════════ */
function SettingsSection({ token, profile }) {
  const [activeSection, setActiveSection] = useState("password");
  const [current, setCurrent] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const DEFAULT_PREFS = { emailNotifications: true, inAppNotifications: false, newCourses: true, workshopAlerts: true, progressEmails: false, promotions: true };
  const [prefs, setPrefs] = useState(() => ({ ...DEFAULT_PREFS, ...(profile?.notificationPrefs || {}) }));
  const [prefMsg, setPrefMsg] = useState("");
  const [prefSaving, setPrefSaving] = useState(false);

  const pwdRef  = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    if (profile?.notificationPrefs) setPrefs(p => ({ ...DEFAULT_PREFS, ...profile.notificationPrefs }));
  }, [profile]);

  const scrollTo = (section) => {
    setActiveSection(section);
    const el = section === "password" ? pwdRef.current : notifRef.current;
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePwdUpdate = async () => {
    if (!current || !newPwd || !confirm) { setMsg("Fill in all fields."); return; }
    if (newPwd.length < 6) { setMsg("New password must be at least 6 characters."); return; }
    if (newPwd !== confirm) { setMsg("Passwords do not match."); return; }
    setSaving(true); setMsg("");
    const res = await fetch("/api/users/me/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ currentPassword: current, newPassword: newPwd }),
    });
    const data = await res.json();
    setMsg(res.ok ? "Password updated successfully!" : data.message || "Failed.");
    if (res.ok) { setCurrent(""); setNewPwd(""); setConfirm(""); }
    setSaving(false);
  };

  const NAV = [
    { id: "password",      label: "Change Password" },
    { id: "notifications", label: "Notifications"   },
  ];

  return (
    <div className="p-6 bg-[#0B0F10] min-h-full text-white">
      <h1 className="text-lg font-bold text-white mb-6">Settings</h1>
      <div className="flex gap-6 items-start">

        {/* ── Left sidebar (sticky anchor nav) ── */}
        <div className="w-[200px] shrink-0 sticky top-6">
          {NAV.map(({ id, label }) => {
            const active = activeSection === id;
            return (
              <button key={id} onClick={() => scrollTo(id)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-xs rounded-xl mb-1.5 font-semibold transition-all ${
                  active
                    ? "bg-white text-[#0F1112]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}>
                {label}
                {active && <Ic name="chevron" size={14} className="text-[#0F1112]" />}
              </button>
            );
          })}
        </div>

        {/* ── Right: stacked panels ── */}
        <div className="flex-1 space-y-6">

          {/* Change Password */}
          <div ref={pwdRef} className="bg-[#0F1112] border border-white/10 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-1">Change Password</h2>
            <p className="text-xs text-gray-400 mb-6">Update your password to keep your account secure.</p>
            <div className="space-y-4 max-w-lg">
              <div>
                <label className="text-xs text-gray-400 font-medium mb-1.5 block">Current Password</label>
                <div className="relative">
                  <input type={showCurrent ? "text" : "password"} value={current} onChange={e => setCurrent(e.target.value)}
                    className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-white/30 pr-10" />
                  <button onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                    <Ic name="eye" size={16} />
                  </button>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 font-medium mb-1.5 block">New Password</label>
                <div className="relative">
                  <input type={showNew ? "text" : "password"} value={newPwd} onChange={e => setNewPwd(e.target.value)} placeholder="Enter new password"
                    className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-white/30 placeholder-gray-600 pr-10" />
                  <button onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                    <Ic name="eye" size={16} />
                  </button>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 font-medium mb-1.5 block">Confirm New Password</label>
                <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Confirm new password"
                  className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-white/30 placeholder-gray-600" />
              </div>
              {msg && <p className={`text-xs ${msg.includes("success") ? "text-green-400" : "text-red-400"}`}>{msg}</p>}
              <button onClick={handlePwdUpdate} disabled={saving}
                className="bg-white text-[#0F1112] font-bold text-xs px-6 py-2.5 rounded-lg hover:bg-gray-100 disabled:opacity-60 transition-colors">
                {saving ? "Updating..." : "Update Password"}
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div ref={notifRef} className="bg-[#0F1112] border border-white/10 rounded-xl p-6">
            <h2 className="text-sm font-bold text-white mb-1">Notifications</h2>
            <p className="text-xs text-gray-400 mb-6">Manage how you receive updates and alerts.</p>
            <div className="max-w-lg">
              {/* Primary notification toggles */}
              <div className="mb-4">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Ic name="bell" size={12} /> Notifications
                </p>
                {[
                  { key: "emailNotifications", label: "Email notifications",   desc: "Receive course and account updates via email" },
                  { key: "inAppNotifications",  label: "In-app notifications",  desc: "Push alerts inside the dashboard" },
                ].map(n => (
                  <div key={n.key} className="flex items-center justify-between py-3.5 border-b border-white/5 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-300">{n.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{n.desc}</p>
                    </div>
                    <button
                      onClick={() => setPrefs(p => ({ ...p, [n.key]: !p[n.key] }))}
                      className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${prefs[n.key] ? "bg-[#C7E36B]" : "bg-white/15"}`}
                    >
                      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${prefs[n.key] ? "left-[calc(100%-22px)]" : "left-0.5"}`} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Specific alert types */}
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Ic name="settings" size={12} /> Alert Types
                </p>
                {[
                  { key: "newCourses",     label: "New Course Alerts",   desc: "Get notified when new courses are published" },
                  { key: "workshopAlerts", label: "Workshop Alerts",     desc: "Reminders before your registered workshops" },
                  { key: "progressEmails", label: "Progress Emails",     desc: "Weekly progress summary emails" },
                  { key: "promotions",     label: "Promotions & Offers", desc: "Discounts and special offers" },
                ].map(n => (
                  <div key={n.key} className="flex items-center justify-between py-3.5 border-b border-white/5 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-300">{n.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{n.desc}</p>
                    </div>
                    <button
                      onClick={() => setPrefs(p => ({ ...p, [n.key]: !p[n.key] }))}
                      className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${prefs[n.key] ? "bg-[#C7E36B]" : "bg-white/15"}`}
                    >
                      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${prefs[n.key] ? "left-[calc(100%-22px)]" : "left-0.5"}`} />
                    </button>
                  </div>
                ))}
              </div>
              {prefMsg && <p className={`text-xs mt-3 ${prefMsg.includes("saved") ? "text-green-400" : "text-red-400"}`}>{prefMsg}</p>}
              <button onClick={async () => {
                setPrefSaving(true); setPrefMsg("");
                const res = await fetch("/api/users/me/notifications", { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(prefs) });
                setPrefMsg(res.ok ? "Preferences saved!" : "Failed to save.");
                setPrefSaving(false);
              }} disabled={prefSaving}
                className="mt-5 bg-white text-[#0F1112] font-bold text-xs px-6 py-2.5 rounded-lg hover:bg-gray-100 disabled:opacity-60 transition-colors">
                {prefSaving ? "Saving..." : "Save Preferences"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   RESOURCES SECTION
════════════════════════════════════════════ */
const RES_TABS = [
  { key: "prompt",   label: "PROMP LIBRARY" },
  { key: "workflow", label: "WORK FLOW"      },
  { key: "project",  label: "PROJECT"        },
  { key: "tip",      label: "LEARNING TIPS"  },
  { key: "deal",     label: "AI DEAL"        },
];

function ResourcesSection({ token }) {
  const navigate = useNavigate();
  const [tab, setTab]               = useState("prompt");
  const [resources, setRes]         = useState([]);
  const [loading, setLoading]       = useState(false);
  const [copied, setCopied]         = useState(null);
  const [catFilter, setCatFilter]   = useState("All");
  const [subCatFilter, setSubCatFilter] = useState("All");
  const [dealCatFilter, setDealCatFilter] = useState("All Benefits");

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setDetail(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    setLoading(true); setRes([]);
    fetch(`/api/resources?type=${tab}`)
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setRes(d); })
      .finally(() => setLoading(false));
  }, [tab]);

  const img = (r) => r.thumbnail || r.logo || null;

  const copyText = r => {
    navigator.clipboard.writeText(r.content || r.description || "").catch(() => {});
    setCopied(r._id);
    setTimeout(() => setCopied(null), 2000);
  };

  const activeTabLabel = tab === "project" ? "Projects Showcase" : tab === "tip" ? "Learning Tips" : tab === "deal" ? "AI Deals" : RES_TABS.find(t => t.key === tab)?.label || "Resources";
  const activeTabSubtitle = tab === "project"
    ? "Explore student projects and creative showcases from the AIFA community."
    : tab === "tip"
    ? "Watch curated video tips to sharpen your AI filmmaking skills."
    : tab === "deal"
    ? "Exclusive discounts and credits on top AI tools — only for AIFA members."
    : "Tools, prompts and workflows to supercharge your AI filmmaking";
  const cats    = ["All", ...Array.from(new Set(resources.map(r => r.category).filter(Boolean)))];
  const subCats = ["All", ...Array.from(new Set(resources.filter(r => catFilter === "All" || r.category === catFilter).map(r => r.subCategory).filter(Boolean)))];

  const filtered = resources.filter(r => {
    const matchCat = catFilter === "All" || r.category === catFilter;
    const matchSub = subCatFilter === "All" || r.subCategory === subCatFilter;
    return matchCat && matchSub;
  });

  return (
    <div className="p-6">
      {/* Header row: dynamic title + dropdown filters */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-black text-white">{activeTabLabel}</h1>
          <p className="text-xs text-gray-400 mt-1">{activeTabSubtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select value={catFilter} onChange={e => { setCatFilter(e.target.value); setSubCatFilter("All"); }}
              className="bg-white/5 border border-white/10 text-gray-300 text-sm rounded-xl px-4 py-2.5 outline-none appearance-none pr-8 cursor-pointer min-w-[100px]">
              {cats.map(c => <option key={c} value={c} className="bg-[#1a1e20]">{c}</option>)}
            </select>
            <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div className="relative">
            <select value={subCatFilter} onChange={e => setSubCatFilter(e.target.value)}
              className="bg-white/5 border border-white/10 text-gray-300 text-sm rounded-xl px-4 py-2.5 outline-none appearance-none pr-8 cursor-pointer min-w-[130px]">
              {subCats.map(c => <option key={c} value={c} className="bg-[#1a1e20]">{c === "All" ? "Sub category" : c}</option>)}
            </select>
            <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>
      </div>

      {/* Tab bar — underline style matching Figma */}
      <div className="flex gap-0 border-b border-white/8 mb-6">
        {RES_TABS.map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); setCatFilter("All"); setSubCatFilter("All"); setDealCatFilter("All Benefits"); }}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 -mb-px transition-all whitespace-nowrap ${tab === t.key ? "border-[#C7E36B] text-[#C7E36B]" : "border-transparent text-gray-500 hover:text-gray-300"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Deal category filters — Figma style: lime pill for active, pipe-separated text links */}
      {tab === "deal" && (
        <div className="flex items-center gap-0 flex-wrap mb-6">
          {["All Benefits", "video", "design", "marketing", "voice", "Automation"].map((c, i, arr) => (
            <span key={c} className="flex items-center">
              <button onClick={() => setDealCatFilter(c)}
                className={`text-sm font-semibold whitespace-nowrap transition-all px-3 py-1 rounded-lg ${dealCatFilter === c ? "bg-[#C7E36B] text-black" : "text-gray-400 hover:text-white"}`}>
                {c}
              </button>
              {i < arr.length - 1 && <span className="text-gray-600 mx-1 select-none">|</span>}
            </span>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-6 h-6 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-4xl mb-3">📦</p>
          <p className="font-semibold text-white">No {RES_TABS.find(t => t.key === tab)?.label} yet</p>
          <p className="text-sm mt-1">Check back soon — the team is adding content</p>
        </div>
      ) : tab === "prompt" ? (
        /* ── PROMPT LIBRARY ── */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r) => (
            <div key={r._id} className="bg-[#111315] border border-white/8 rounded-2xl overflow-hidden hover:border-white/18 transition-all">
              <div className="h-[160px] overflow-hidden bg-white/5">
                {img(r)
                  ? <img src={img(r)} alt={r.title} className="w-full h-full object-cover"/>
                  : <div className="w-full h-full flex items-center justify-center"><svg width="32" height="32" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg></div>
                }
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-white mb-3 line-clamp-1">{r.title}</h3>
                <div className="bg-[#0B0F10] border border-white/8 rounded-xl p-3 relative group">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-bold text-gray-500 tracking-widest uppercase">PROMPT</span>
                    <button onClick={() => copyText(r)} title="Copy prompt" className="p-1 rounded hover:bg-white/10 transition-all">
                      <Ic name={copied === r._id ? "check" : "copy"} size={13} className={copied === r._id ? "text-[#C7E36B]" : "text-gray-500"}/>
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-400 line-clamp-3">{r.content || r.description}</p>
                </div>
                {r.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {r.tags.slice(0, 3).map(t => (
                      <span key={t} className="text-[9px] border border-white/10 text-gray-500 px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : tab === "workflow" || tab === "project" ? (
        /* ── WORKFLOWS / PROJECTS ── */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r) => (
            <div key={r._id}
              onClick={() => {
                const path = tab === "workflow" ? `/workflow/${r._id}` : `/projects/${r._id}`;
                navigate(path, { state: { resource: r } });
              }}
              className="bg-[#111315] border border-white/8 rounded-2xl overflow-hidden hover:border-white/20 transition-all cursor-pointer group">
              <div className="h-[200px] overflow-hidden relative bg-white/5">
                {img(r)
                  ? <img src={img(r)} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  : <div className="w-full h-full flex items-center justify-center"><svg width="40" height="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg></div>
                }
                {r.category && (
                  <span className="absolute top-3 left-3 text-[9px] font-bold bg-black/70 text-[#C7E36B] px-2 py-1 rounded uppercase tracking-wider">{r.category}</span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold text-white mb-1.5">{r.title}</h3>
                <p className="text-xs text-gray-400 line-clamp-2 mb-3">{r.description}</p>
                <span className="flex items-center gap-1.5 text-sm text-[#C7E36B] font-semibold">
                  View Details
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : tab === "tip" ? (
        /* ── LEARNING TIPS ── 3-column thumbnail + Watch Now grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r) => (
            <div key={r._id} className="bg-[#111315] border border-white/8 rounded-2xl overflow-hidden group hover:border-white/18 transition-all">
              <div className="aspect-video overflow-hidden bg-white/5 relative">
                {img(r)
                  ? <img src={img(r)} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  : <div className="w-full h-full flex items-center justify-center bg-[#0B0F10]">
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                }
                {r.category && (
                  <span className="absolute top-2 left-2 text-[9px] font-bold bg-black/70 text-[#C7E36B] px-2 py-0.5 rounded uppercase tracking-wider">{r.category}</span>
                )}
              </div>
              {r.title && <p className="px-4 pt-3 pb-1 text-sm font-semibold text-white line-clamp-2">{r.title}</p>}
              {r.link
                ? <a href={r.link} target="_blank" rel="noopener noreferrer"
                    className="mx-4 mb-4 mt-2 bg-[#C7E36B] text-black text-sm font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-lime-300 transition-colors">
                    Watch Now <span>→</span>
                  </a>
                : <button className="mx-4 mb-4 mt-2 bg-[#C7E36B] text-black text-sm font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-lime-300 transition-colors w-[calc(100%-2rem)]">
                    Watch Now <span>→</span>
                  </button>
              }
            </div>
          ))}
        </div>
      ) : tab === "deal" ? (
        /* ── AI DEALS ── */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered
            .filter(r => dealCatFilter === "All Benefits" || (r.category || "").toLowerCase() === dealCatFilter.toLowerCase())
            .map((r, i) => (
            <div key={r._id} className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col">
              {/* Logo header */}
              <div className="h-[100px] bg-white flex items-center justify-center px-6 border-b border-gray-100">
                {r.logo && (r.logo.startsWith("http") || r.logo.startsWith("/"))
                  ? <img src={r.logo} alt={r.title} className="max-h-[60px] max-w-[160px] object-contain"/>
                  : <span className="text-base font-bold text-gray-800">{r.title}</span>
                }
              </div>
              {/* Category badge */}
              {r.category && (
                <div className="px-4 pt-3">
                  <span className="text-[9px] font-bold bg-gray-800 text-white px-2 py-0.5 rounded tracking-widest uppercase">{r.category}</span>
                </div>
              )}
              <div className="p-4 pt-2 flex flex-col flex-1">
                <h3 className="text-base font-bold text-gray-900 mt-1">{r.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5 flex-1">{r.description}</p>
                <p className="text-2xl font-black text-gray-900 mt-3">{r.discount}</p>
                <p className="text-[10px] text-[#C7E36B] font-semibold mt-0.5">VIA AIFA</p>
                {r.link ? (
                  <a href={r.link} target="_blank" rel="noopener noreferrer"
                    className="w-full mt-3 bg-[#C7E36B] text-black text-sm font-bold py-2.5 rounded-lg text-center hover:bg-lime-300 transition-colors block">
                    Get Deal
                  </a>
                ) : (
                  <button className="w-full mt-3 bg-[#C7E36B] text-black text-sm font-bold py-2.5 rounded-lg hover:bg-lime-300 transition-colors">
                    Get Deal
                  </button>
                )}
                <p className="text-[10px] text-gray-400 text-center mt-1.5">Redirects to official site</p>
              </div>
            </div>
          ))}
        </div>
      ) : null}

    </div>
  );
}

/* ─── COMMUNITY SECTION ─── */
const COMM_TABS = [
  { id: "discussions", label: "Discussions", icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  { id: "events",      label: "Events",      icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { id: "clubs",       label: "Clubs",       icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { id: "chats",       label: "Chats",       icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> },
  { id: "awards",      label: "Awards",      icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg> },
];

function CommunitySection({ token, profile }) {
  const [activeTab, setActiveTab]     = useState("discussions");
  const [search, setSearch]           = useState("");
  const [showNewThread, setShowNewThread] = useState(false);

  /* threads */
  const [threads, setThreads]         = useState([]);
  const [threadsLoading, setThreadsLoading] = useState(true);
  const [selectedThread, setSelectedThread] = useState(null);
  const [reply, setReply]             = useState("");
  const [repliesMap, setRepliesMap]   = useState({});
  const [newTitle, setNewTitle]       = useState("");
  const [newBody, setNewBody]         = useState("");
  const [newTag, setNewTag]           = useState("General");
  const [posting, setPosting]         = useState(false);

  /* events + clubs for sidebar + tabs */
  const [events, setEvents] = useState([]);
  const [clubs, setClubs]   = useState([]);

  useEffect(() => {
    fetch("/api/community/threads")
      .then(r => r.ok ? r.json() : [])
      .then(d => { setThreads(Array.isArray(d) ? d : []); setThreadsLoading(false); })
      .catch(() => { setThreads([]); setThreadsLoading(false); });

    fetch("/api/community/events")
      .then(r => r.ok ? r.json() : [])
      .then(d => setEvents(Array.isArray(d) ? d : []))
      .catch(() => setEvents([]));
  }, []);

  const filteredThreads = threads.filter(t =>
    !search || t.title?.toLowerCase().includes(search.toLowerCase()) || t.author?.toLowerCase().includes(search.toLowerCase())
  );

  const threadReplyCount = (t) => Array.isArray(t.replies) ? t.replies.length : (t.replies || 0);

  const timeAgo = (iso) => {
    if (!iso) return "";
    const d = new Date(iso), now = new Date();
    const diff = Math.floor((now - d) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
    return `${Math.floor(diff/86400)}d ago`;
  };

  const submitThread = async () => {
    if (!newTitle.trim() || !newBody.trim()) return;
    setPosting(true);
    const optimistic = { id: Date.now(), _id: null, title: newTitle.trim(), body: newBody.trim(), tag: newTag, author: profile?.name || "You", replies: 0, views: 0, createdAt: new Date().toISOString() };
    try {
      const res = await fetch("/api/community/threads", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: optimistic.title, body: optimistic.body, tag: optimistic.tag, author: optimistic.author }),
      });
      const data = res.ok ? await res.json() : null;
      setThreads(prev => [data || optimistic, ...prev]);
    } catch { setThreads(prev => [optimistic, ...prev]); }
    setShowNewThread(false); setNewTitle(""); setNewBody(""); setPosting(false);
  };

  const submitReply = async () => {
    if (!reply.trim() || !selectedThread) return;
    const id = selectedThread._id || selectedThread.id;
    const newReply = { id: Date.now(), text: reply.trim(), time: "Just now", author: profile?.name || "You" };
    setRepliesMap(r => ({ ...r, [id]: [...(r[id] || []), newReply] }));
    setReply("");
    if (selectedThread._id) {
      try {
        await fetch(`/api/community/threads/${selectedThread._id}/reply`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ text: newReply.text, author: newReply.author }),
        });
      } catch { /* local state already updated */ }
    }
  };

  const dbReplies   = Array.isArray(selectedThread?.replies) ? selectedThread.replies : [];
  const localReplies = repliesMap[selectedThread?._id || selectedThread?.id] || [];
  const currentReplies = [
    ...dbReplies.map(r => ({ id: r._id || r.createdAt, text: r.text, author: r.author, time: r.createdAt ? timeAgo(r.createdAt) : "" })),
    ...localReplies,
  ];

  /* ── Tab: Discussions ── */
  const DiscussionsTab = () => (
    <div className="flex gap-6 min-h-0">
      {/* Main column */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white">Latest Discussions</h2>
          <span className="text-xs text-[#C7E36B] cursor-pointer hover:underline">View all</span>
        </div>
        {threadsLoading ? (
          <p className="text-gray-500 text-sm animate-pulse">Loading discussions...</p>
        ) : filteredThreads.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <svg className="mx-auto mb-3 opacity-40" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <p className="text-sm">No discussions yet. Start one!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredThreads.map(t => (
              <div key={t._id || t.id} className="bg-[#111315] border border-white/8 rounded-2xl p-4 hover:border-white/15 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C7E36B]/20 flex items-center justify-center text-[#C7E36B] font-black shrink-0">
                    {(t.author || "?")[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white leading-snug mb-0.5">{t.title}</p>
                    <p className="text-xs text-gray-500">{t.author} &middot; {t.time || timeAgo(t.createdAt)}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        {threadReplyCount(t)} replies
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => { setSelectedThread(t); setReply(""); }}
                    className="shrink-0 text-xs border border-[#C7E36B]/40 text-[#C7E36B] font-semibold px-4 py-1.5 rounded-lg hover:bg-[#C7E36B]/10 transition-all"
                  >Reply</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="w-72 shrink-0 space-y-6">
        {/* Upcoming Events */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">Upcoming Events</h3>
            <button onClick={() => setActiveTab("events")} className="text-xs text-[#C7E36B] hover:underline">View all</button>
          </div>
          {events.length === 0 ? (
            <p className="text-xs text-gray-600">No upcoming events</p>
          ) : (
            <div className="space-y-3">
              {events.slice(0, 2).map(ev => (
                <div key={ev._id} className="bg-[#111315] border border-white/8 rounded-xl overflow-hidden">
                  {ev.thumbnail && <img src={ev.thumbnail} className="w-full h-20 object-cover" alt=""/>}
                  <div className="p-3">
                    <p className="text-xs font-semibold text-white leading-snug mb-1">{ev.title}</p>
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500 mb-2">
                      <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      {ev.date ? new Date(ev.date).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}) : "TBD"}
                      {ev.startTime && <><svg className="ml-1" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>{ev.startTime}{ev.timezone ? ` ${ev.timezone}` : ""}</>}
                    </div>
                    <button className="w-full text-[10px] bg-[#C7E36B] text-black font-bold py-1.5 rounded-lg hover:brightness-105 transition-all">View Event</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Popular Clubs */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">Popular Clubs</h3>
            <button onClick={() => setActiveTab("clubs")} className="text-xs text-[#C7E36B] hover:underline">View all</button>
          </div>
          {clubs.length === 0 ? (
            <p className="text-xs text-gray-600">No clubs yet</p>
          ) : (
            <div className="space-y-2">
              {clubs.slice(0, 3).map(cl => (
                <div key={cl._id} className="flex items-center gap-3 bg-[#111315] border border-white/8 rounded-xl p-3">
                  <div className="w-9 h-9 rounded-full bg-[#C7E36B]/20 flex items-center justify-center text-[#C7E36B] font-black text-sm shrink-0">
                    {cl.name?.[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{cl.name}</p>
                    <p className="text-[10px] text-gray-500">{cl.memberCount || cl.members?.length || 0} members</p>
                  </div>
                  <button className="text-[10px] border border-[#C7E36B]/40 text-[#C7E36B] font-semibold px-3 py-1 rounded-lg hover:bg-[#C7E36B]/10 transition-all shrink-0">Join</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  /* ── Tab: Events ── */
  const EventsTab = () => (
    <div>
      <h2 className="text-base font-bold text-white mb-4">Upcoming Events</h2>
      {events.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <svg className="mx-auto mb-3 opacity-40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <p className="text-sm">No events scheduled yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {events.map(ev => (
            <div key={ev._id} className="bg-[#111315] border border-white/8 rounded-2xl overflow-hidden hover:border-white/15 transition-all">
              {ev.thumbnail && <img src={ev.thumbnail} className="w-full h-36 object-cover" alt=""/>}
              <div className="p-4">
                <p className="text-sm font-bold text-white mb-2">{ev.title}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  {ev.date ? new Date(ev.date).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}) : "TBD"}
                </div>
                {ev.startTime && (
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    {ev.startTime}{ev.endTime ? ` - ${ev.endTime}` : ""} {ev.timezone || ""}
                  </div>
                )}
                <button className="w-full text-xs bg-[#C7E36B] text-black font-bold py-2 rounded-xl hover:brightness-105 transition-all">View Event</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  /* ── Tab: Clubs ── */
  const ClubsTab = () => (
    <div className="text-center py-20 text-gray-500">
      <svg className="mx-auto mb-3 opacity-40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      <p className="text-sm font-semibold text-white mb-1">Clubs Coming Soon</p>
      <p className="text-xs">Student clubs will be available here</p>
    </div>
  );

  /* ── Tab: Chats ── */
  const ChatsTab = () => (
    <div className="text-center py-20 text-gray-500">
      <svg className="mx-auto mb-3 opacity-40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      <p className="text-sm font-semibold text-white mb-1">Chats Coming Soon</p>
      <p className="text-xs">Community channels will be available here</p>
    </div>
  );

  /* ── Tab: Awards ── */
  const AwardsTab = () => (
    <div className="text-center py-20 text-gray-500">
      <svg className="mx-auto mb-3 opacity-40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
      <p className="text-sm font-semibold text-white mb-1">Awards & Challenges</p>
      <p className="text-xs">Challenges and leaderboards will be available here</p>
    </div>
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 shrink-0">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
          <div>
            <h1 className="text-2xl font-black text-white">Community</h1>
            <p className="text-sm text-gray-400 mt-0.5">Connect, learn, and grow together with fellow students.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search discussions, events, clubs..."
                className="bg-[#111315] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#C7E36B]/30 w-72"
              />
            </div>
            <button
              onClick={() => setShowNewThread(true)}
              className="flex items-center gap-2 bg-[#C7E36B] text-black text-sm font-bold px-5 py-2.5 rounded-xl hover:brightness-105 transition-all shrink-0"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Start Discussion
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-white/8">
          {COMM_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-all border-b-2 -mb-px ${activeTab === tab.id ? "border-[#C7E36B] text-[#C7E36B]" : "border-transparent text-gray-500 hover:text-gray-300"}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab body */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {activeTab === "discussions" && <DiscussionsTab />}
        {activeTab === "events"      && <EventsTab />}
        {activeTab === "clubs"       && <ClubsTab />}
        {activeTab === "chats"       && <ChatsTab />}
        {activeTab === "awards"      && <AwardsTab />}
      </div>

      {/* New Thread Modal */}
      {showNewThread && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={e => e.target === e.currentTarget && setShowNewThread(false)}>
          <div className="bg-[#111315] border border-white/10 rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-white">Start a Discussion</h3>
              <button onClick={() => setShowNewThread(false)} className="text-gray-500 hover:text-white">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <input
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="Write an engaging title..."
              className="w-full bg-[#0B0F10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/40 mb-3"
            />
            <textarea
              value={newBody}
              onChange={e => setNewBody(e.target.value)}
              rows={5}
              placeholder="Share your thoughts, questions, or ideas..."
              className="w-full bg-[#0B0F10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/40 resize-none mb-3"
            />
            <div className="flex items-center gap-3">
              <select value={newTag} onChange={e => setNewTag(e.target.value)} className="text-xs bg-[#0B0F10] border border-white/10 rounded-lg px-3 py-2 text-white outline-none">
                {["General","Tools","Prompts","Workflow","Resources","Certificates"].map(t => <option key={t}>{t}</option>)}
              </select>
              <div className="flex gap-2 ml-auto">
                <button onClick={() => setShowNewThread(false)} className="text-sm border border-white/10 text-gray-400 px-4 py-2 rounded-xl hover:bg-white/5">Cancel</button>
                <button onClick={submitThread} disabled={posting || !newTitle.trim() || !newBody.trim()} className="text-sm bg-[#C7E36B] text-black font-bold px-5 py-2 rounded-xl disabled:opacity-40 hover:brightness-105 transition-all">Post</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thread Reply Modal */}
      {selectedThread && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={e => e.target === e.currentTarget && setSelectedThread(null)}>
          <div className="bg-[#111315] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
            <div className="p-5 border-b border-white/8 shrink-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-bold text-white mb-1">{selectedThread.title}</p>
                  <p className="text-xs text-gray-500">by {selectedThread.author} &middot; {selectedThread.time || timeAgo(selectedThread.createdAt)}</p>
                </div>
                <button onClick={() => setSelectedThread(null)} className="text-gray-500 hover:text-white shrink-0">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              </div>
              {selectedThread.body && (
                <div className="bg-white/5 rounded-xl p-3 mt-3">
                  <p className="text-sm text-gray-300 leading-relaxed">{selectedThread.body}</p>
                </div>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {currentReplies.length === 0 ? (
                <p className="text-xs text-gray-600 text-center py-4">No replies yet — be the first!</p>
              ) : currentReplies.map(r => (
                <div key={r.id} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#C7E36B]/20 flex items-center justify-center text-[#C7E36B] text-[10px] font-black shrink-0">{(r.author || "?")[0].toUpperCase()}</div>
                  <div className="flex-1 bg-white/5 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-white">{r.author}</span>
                      <span className="text-[10px] text-gray-600">{r.time}</span>
                    </div>
                    <p className="text-sm text-gray-300">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-white/8 shrink-0">
              <div className="flex gap-2">
                <textarea
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  rows={2}
                  placeholder="Write a reply..."
                  className="flex-1 bg-[#0B0F10] border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/40 resize-none"
                  onKeyDown={e => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) submitReply(); }}
                />
                <button onClick={submitReply} disabled={!reply.trim()} className="self-end text-sm bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-xl disabled:opacity-40 hover:brightness-105 transition-all">Post</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── HIRE TALENT SECTION ─── */
const HT_CATEGORIES = ["All", "AI Filmmakers", "Video Editors", "AI Artists & Designers", "Prompt Engineers", "VFX & CGI Artists", "Sound Designers", "3D Artists"];

function HireTalentSection({ token }) {
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [catFilter, setCatFilter] = useState("All");
  const [countryFilter, setCountryFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [inquiry, setInquiry] = useState(null);
  const [inqMsg, setInqMsg] = useState("");
  const [sent, setSent] = useState(false);
  const catScrollRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") setInquiry(null); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    fetch("/api/talent")
      .then(r => r.json())
      .then(d => { setTalents(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => { setTalents([]); setLoading(false); });
  }, []);

  const filtered = talents.filter(t => {
    if (catFilter !== "All" && t.category !== catFilter) return false;
    if (countryFilter && !(t.location || "").toLowerCase().includes(countryFilter.toLowerCase())) return false;
    if (cityFilter && !(t.location || "").toLowerCase().includes(cityFilter.toLowerCase())) return false;
    return true;
  });

  const openInquiry = (t) => { setInquiry(t); setInqMsg(""); setSent(false); };

  const sendInquiry = async () => {
    if (!inqMsg.trim()) return;
    try {
      const user = JSON.parse(localStorage.getItem("aifa_user") || "{}");
      await fetch("/api/service-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({
          name: user.name || "Student",
          email: user.email || "",
          service: "hire-talent",
          message: `[Inquiry to ${inquiry.name}] ${inqMsg}`,
        }),
      });
    } catch { /* show success anyway */ }
    setSent(true);
  };

  const scrollCats = (dir) => {
    if (catScrollRef.current) catScrollRef.current.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  return (
    <div className="p-6">
      {/* Header + filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="text-xl font-bold text-white">Available Talent</h1>
        <div className="flex gap-2 flex-wrap">
          <input
            value={countryFilter}
            onChange={e => setCountryFilter(e.target.value)}
            placeholder="Select a Country"
            className="bg-[#111315] border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#C7E36B]/40 w-44"
          />
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              value={cityFilter}
              onChange={e => setCityFilter(e.target.value)}
              placeholder="City"
              className="bg-[#111315] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#C7E36B]/40 w-36"
            />
          </div>
        </div>
      </div>

      {/* Category scroll tabs with arrows */}
      <div className="flex items-center gap-2 mb-6">
        <button onClick={() => scrollCats(-1)} className="shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div ref={catScrollRef} className="flex gap-2 overflow-x-auto scrollbar-none flex-1">
          {HT_CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCatFilter(c)}
              className={`text-xs px-4 py-2 rounded-full font-semibold whitespace-nowrap shrink-0 transition-all ${catFilter === c ? "bg-[#C7E36B] text-black" : "bg-white/8 text-gray-300 hover:bg-white/15"}`}
            >{c}</button>
          ))}
        </div>
        <button onClick={() => scrollCats(1)} className="shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm animate-pulse">Loading talent...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <svg className="mx-auto mb-3 text-gray-600" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <p className="text-gray-500 text-sm">No talent found{catFilter !== "All" ? ` in ${catFilter}` : ""}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filtered.map(t => (
            <div key={t._id} className="bg-[#111315] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
              <div className="flex items-start gap-4 mb-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 relative">
                  {t.avatar
                    ? <img src={t.avatar} className="w-full h-full object-cover" alt=""
                        onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }}/>
                    : null}
                  <div className="w-full h-full bg-[#C7E36B] flex items-center justify-center text-black font-black text-lg"
                    style={{display: t.avatar ? "none" : "flex"}}>{t.name?.[0]?.toUpperCase()}</div>
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-base font-bold text-white">{t.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                    <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    {t.location}
                  </p>
                  {t.bio && <p className="text-sm text-gray-400 mt-1.5 leading-relaxed line-clamp-2">{t.bio}</p>}
                </div>
                {/* CTA */}
                <button
                  onClick={() => openInquiry(t)}
                  className="shrink-0 flex items-center gap-1.5 bg-[#C7E36B] text-black text-xs font-bold px-4 py-2 rounded-xl hover:brightness-110 transition-all"
                >
                  Send Inquiry
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>

              {/* Skills */}
              {t.skills?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {t.skills.map(s => (
                    <span key={s} className="text-[10px] border border-white/10 text-gray-400 px-2 py-0.5 rounded-full">{s}</span>
                  ))}
                </div>
              )}

              {/* Portfolio grid */}
              {t.works?.filter(Boolean).length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {t.works.filter(Boolean).slice(0, 3).map((w, i) => (
                    <div key={i} className="aspect-video rounded-xl overflow-hidden bg-white/5">
                      <img src={w} className="w-full h-full object-cover" alt=""/>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Inquiry Modal */}
      {inquiry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={e => e.target === e.currentTarget && !sent && setInquiry(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            {sent ? (
              /* Success state — matches Figma */
              <div className="p-8 text-center relative">
                <button onClick={() => setInquiry(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
                </div>
                <h3 className="text-lg font-black text-black mb-2">Inquiry Sent Successfully</h3>
                <p className="text-sm text-gray-500 mb-6">Your message has been sent to the talent. They will get back to you soon.</p>
                <button onClick={() => setInquiry(null)} className="w-full bg-[#C7E36B] text-black font-bold py-3 rounded-xl hover:brightness-105 transition-all">
                  Continue Browsing
                </button>
              </div>
            ) : (
              /* Message form */
              <div className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-[#C7E36B] flex items-center justify-center text-black font-black text-base shrink-0">
                    {inquiry.name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-black">{inquiry.name}</p>
                    <p className="text-xs text-gray-500">{inquiry.category}</p>
                  </div>
                  <button onClick={() => setInquiry(null)} className="ml-auto text-gray-400 hover:text-gray-700">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                  </button>
                </div>
                <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wide mb-2">Your Message</p>
                <textarea
                  value={inqMsg}
                  onChange={e => setInqMsg(e.target.value)}
                  rows={4}
                  placeholder={`Hi ${inquiry.name?.split(" ")[0]}, I'm interested in your services...`}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-black placeholder-gray-400 outline-none focus:border-gray-400 resize-none mb-4"
                />
                <div className="flex gap-2">
                  <button onClick={() => setInquiry(null)} className="flex-1 text-sm border border-gray-200 text-gray-500 py-2.5 rounded-xl hover:bg-gray-50 font-medium">Cancel</button>
                  <button onClick={sendInquiry} disabled={!inqMsg.trim()} className="flex-1 text-sm bg-[#C7E36B] text-black font-bold py-2.5 rounded-xl disabled:opacity-40 hover:brightness-105 transition-all">Send</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── PLACEHOLDER ─── */
function PlaceholderSection({ title }) {
  return (
    <div className="flex items-center justify-center h-64 text-gray-500">
      <div className="text-center">
        <p className="text-4xl mb-3">🚧</p>
        <p className="font-semibold text-white">{title}</p>
        <p className="text-sm mt-1">Coming soon</p>
      </div>
    </div>
  );
}

