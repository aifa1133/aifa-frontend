import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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
  cert: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z",
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
  const [activePage, setActivePage] = useState("dashboard");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNotif, setShowNotif] = useState(false);
  const [notifCount, setNotifCount] = useState(0);
  const [notifs, setNotifs] = useState([]);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [invoiceItem, setInvoiceItem] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("aifa_token");
  const notifRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    if (!token) { navigate("/"); return; }
    fetch("/api/users/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { setProfile(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [navigate, token]);

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
        <nav className="flex-1 py-3 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => !item.soon && setActivePage(item.id)}
              disabled={item.soon}
              title={item.soon ? "Coming soon" : undefined}
              className={`w-full flex items-center justify-between gap-2.5 px-4 py-2.5 text-left transition-all text-[13px] font-medium ${
                item.soon
                  ? "text-gray-600 cursor-not-allowed"
                  : activePage === item.id
                  ? "bg-[#C7E36B]/10 text-[#C7E36B] border-r-2 border-[#C7E36B]"
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
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Live Class Banner */}
        <div className="bg-[#6B21E8] text-white text-xs flex items-center justify-between px-6 py-2 shrink-0">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <strong>NEXT LIVE CLASS</strong>
            <span className="text-white/80 ml-2">AI Filmmaking Bootcamp</span>
          </span>
          <span className="flex items-center gap-4">
            <span className="text-white/80">⏰ Starts at 4:30 PM IST</span>
            <button className="bg-white text-[#6B21E8] font-bold text-xs px-3 py-1 rounded-full hover:bg-gray-100 transition-all">
              Join Session
            </button>
          </span>
        </div>

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
                className="bg-white/5 border border-white/10 rounded-lg pl-8 pr-4 py-1.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#C7E36B]/50 w-[200px]"
              />
              <Ic name="search" size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
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
                className="w-8 h-8 rounded-full overflow-hidden hover:opacity-90 transition-all shrink-0"
              >
                {profile?.profilePicture
                  ? <img src={profile.profilePicture} alt="avatar" className="w-full h-full object-cover" />
                  : <span className="w-full h-full bg-[#C7E36B] text-black font-bold text-sm flex items-center justify-center">{userInitial}</span>
                }
              </button>
              {showUserMenu && (
                <UserMenuDropdown
                  name={userName}
                  email={profile?.email}
                  onProfile={() => { setActivePage("profile"); setShowUserMenu(false); }}
                  onSettings={() => { setActivePage("settings"); setShowUserMenu(false); }}
                  onBilling={() => { setActivePage("billing"); setShowUserMenu(false); }}
                  onLogout={handleLogout}
                />
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {invoiceItem ? (
            <InvoiceView item={invoiceItem} onBack={() => setInvoiceItem(null)} profile={profile} />
          ) : (
            <>
              {activePage === "dashboard" && <DashboardHome profile={profile} token={token} onNavigate={setActivePage} />}
              {activePage === "bootcamp" && <BootcampSection token={token} profile={profile} />}
              {activePage === "workshops" && <WorkshopsSection token={token} />}
              {activePage === "video-courses" && <VideoCoursesSection profile={profile} onNavigate={setActivePage} />}
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
    </div>
  );
}

/* ════════════════════════════════════════════
   NOTIFICATION DROPDOWN
════════════════════════════════════════════ */
const TYPE_ICON = { session:"🎬", announcement:"📢", resource:"📚", payment:"💳", general:"🔔" };

const STATIC_NOTIFS = [
  { _id:"s1", type:"general", title:"Welcome to AIFA!", message:"Your account is set up. Explore your courses and bootcamp.", createdAt: new Date().toISOString(), isRead:false },
];

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
  const list = notifs && notifs.length > 0 ? notifs : STATIC_NOTIFS;
  // Use empty state when API returns empty after loading (not initial state)
  return (
    <div className="absolute right-0 top-full mt-2 w-[340px] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-100">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <span className="font-bold text-gray-900 text-sm">Notifications</span>
        <div className="flex items-center gap-3">
          <button onClick={onMarkRead} className="text-orange-500 text-xs font-medium hover:underline">Mark all as read</button>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-lg leading-none">✕</button>
        </div>
      </div>
      <div className="divide-y divide-gray-50 max-h-[400px] overflow-y-auto">
        {list.map((n, i) => (
          <div key={n._id || i} className={`px-4 py-3 hover:bg-gray-50 transition-all cursor-pointer ${!n.isRead ? "bg-orange-50/40" : ""}`}>
            <div className="flex gap-3">
              <span className="text-lg shrink-0 mt-0.5">{TYPE_ICON[n.type] || "🔔"}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-xs leading-snug ${!n.isRead ? "font-bold text-gray-900" : "font-medium text-gray-700"}`}>{n.title}</p>
                  <span className="text-[10px] text-gray-400 shrink-0 mt-0.5">{timeAgoNotif(n.createdAt)}</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1 leading-snug">{n.message}</p>
                {!n.isRead && <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5"/>}
              </div>
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <div className="px-4 py-8 text-center text-gray-400 text-sm">No notifications yet</div>
        )}
      </div>
      <div className="px-4 py-2.5 text-center border-t border-gray-100">
        <button className="text-xs text-orange-500 font-semibold hover:underline">View all notifications →</button>
      </div>
    </div>
  );
}

/* ────── USER MENU DROPDOWN ────── */
function UserMenuDropdown({ name, email, onProfile, onSettings, onBilling, onLogout }) {
  return (
    <div className="absolute right-0 top-full mt-2 w-[220px] bg-white rounded-xl shadow-2xl z-50 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#C7E36B] text-black font-bold flex items-center justify-center text-sm">{name[0]}</div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{name}</p>
          <p className="text-xs text-gray-500 truncate">{email}</p>
        </div>
      </div>
      {[
        { icon: "person", label: "View Profile", action: onProfile },
        { icon: "settings", label: "Account Settings", action: onSettings },
        { icon: "resources", label: "Help & Support", action: null },
        { icon: "wallet", label: "Billing & Payments", action: onBilling },
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
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const h = { Authorization: `Bearer ${token}` };
    fetch("/api/users/me/stats", { headers: h }).then(r => r.json()).then(setStats).catch(() => {});
    fetch("/api/courses/enrolled", { headers: h }).then(r => r.json()).then(d => { if (Array.isArray(d)) setEnrolledCourses(d); }).catch(() => {});
    Promise.all([
      fetch("/api/workshops", { headers: h }).then(r => r.json()),
      fetch("/api/bootcamps", { headers: h }).then(r => r.json()),
    ]).then(([ws, bc]) => {
      const now = Date.now();
      const wsItems = Array.isArray(ws) ? ws.filter(w => w.isPublished).map(w => ({ ...w, _kind: "Workshop" })) : [];
      const bcItems = Array.isArray(bc) ? bc.filter(b => b.isPublished).map(b => ({ ...b, _kind: "Bootcamp" })) : [];
      setUpcoming([...wsItems, ...bcItems].slice(0, 4));
    }).catch(() => {});
  }, [token]);

  const statCards = [
    { icon: "🎓", label: "Courses Enrolled",   value: stats?.enrolledCourses  ?? profile?.enrolledCourses?.length  ?? 0 },
    { icon: "✅", label: "Completed",           value: stats?.completedCourses ?? 0 },
    { icon: "🏕️", label: "Workshops Attended",  value: stats?.enrolledWorkshops?? profile?.enrolledWorkshops?.length?? 0 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* STATS */}
      <div className="grid grid-cols-3 gap-4">
        {statCards.map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
            <span className="text-3xl">{s.icon}</span>
            <div>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CONTINUE LEARNING */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-white">Continue Learning</h2>
          <button onClick={() => onNavigate("video-courses")} className="text-xs text-[#C7E36B] hover:underline">View My Courses →</button>
        </div>
        {enrolledCourses.length === 0 ? (
          <div className="bg-white/5 border border-dashed border-white/10 rounded-xl p-8 text-center">
            <p className="text-gray-400 text-sm">You haven't enrolled in any courses yet.</p>
            <button onClick={() => onNavigate("video-courses")} className="mt-3 text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg">Browse Courses</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {enrolledCourses.slice(0, 3).map((c, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-[#C7E36B]/30 transition-all">
                <div className="relative h-32">
                  <img src={c.image || `/courses/v${(i % 6) + 1}.png`} alt={c.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-white mb-2 leading-tight">{c.title}</h3>
                  <div className="w-full bg-white/10 rounded-full h-1.5 mb-1">
                    <div className="bg-[#7C3AED] h-1.5 rounded-full" style={{ width: `${c.percentComplete || 0}%` }} />
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] text-gray-400">{c.percentComplete || 0}% completed</span>
                    <span className="text-[10px] text-gray-400">{c.duration}</span>
                  </div>
                  <button onClick={() => navigate(`/courses/${c._id}/watch`)} className="w-full bg-[#7C3AED] hover:bg-purple-700 text-white text-xs font-semibold py-2 rounded-lg transition-all">
                    Continue
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* UPCOMING BOOTCAMPS & WORKSHOPS */}
      <div>
        <h2 className="text-base font-semibold text-white mb-4">Upcoming Bootcamps & Workshops</h2>
        {upcoming.length === 0 ? (
          <div className="bg-white/5 border border-dashed border-white/10 rounded-xl p-6 text-center">
            <p className="text-gray-400 text-sm">No upcoming sessions scheduled.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcoming.map((u, i) => {
              const date = u.scheduledAt || u.startDate;
              const mode = u.mode || "ONLINE";
              return (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-4">
                  <div className="w-16 h-16 bg-white/10 rounded-lg shrink-0 overflow-hidden">
                    <img src={u.image || `/courses/v${(i % 6) + 1}.png`} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${mode === "ONLINE" ? "bg-green-500/20 text-green-400" : "bg-orange-500/20 text-orange-400"}`}>{mode}</span>
                      <span className="text-[10px] text-gray-500">{u._kind}</span>
                      {date && <span className="text-[10px] text-gray-500">{new Date(date).toLocaleDateString()}</span>}
                    </div>
                    <h3 className="text-sm font-semibold text-white">{u.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{u.description}</p>
                  </div>
                  <button onClick={() => onNavigate(u._kind === "Bootcamp" ? "bootcamp" : "workshops")} className="text-xs border border-white/20 text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all shrink-0">
                    View Details
                  </button>
                </div>
              );
            })}
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

  /* API data */
  const [bootcampData, setBootcampData] = useState(null);
  const [sessions, setSessions]         = useState([]);
  const [projects, setProjects]         = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [drawerFiles, setDrawerFiles]   = useState(BC_FILES);
  const [activeSession, setActiveSession] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    fetch("/api/bootcamps")
      .then(r => r.ok ? r.json() : [])
      .then(d => { if (Array.isArray(d) && d.length > 0) setBootcampData(d[0]); })
      .catch(() => {});
  }, []);

  /* Derive enrollment from DB — user's _id must be in bootcamp.enrollments */
  const userId = profile?._id || JSON.parse(localStorage.getItem("aifa_user") || "{}")._id;
  const enrolled = !!(bootcampData && userId && bootcampData.enrollments?.some(
    id => String(id) === String(userId)
  ));

  useEffect(() => {
    if (!enrolled || !bootcampData?._id) return;
    const id = bootcampData._id;
    fetch(`/api/bootcamps/${id}/sessions`)
      .then(r => r.ok ? r.json() : [])
      .then(d => { if (Array.isArray(d) && d.length > 0) { setSessions(d); setActiveSession(d[0]); } else { setSessions(BC_SESSION_LIST); setActiveSession(BC_SESSION_LIST[0]); } })
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

            {/* Video preview placeholder */}
            <div className="relative bg-black rounded-2xl overflow-hidden aspect-video border border-white/10 cursor-pointer group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4C1D95]/60 via-[#7C3AED]/40 to-[#1e1b4b]/80 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Ic name="play" size={28} className="text-white ml-1"/>
                </div>
              </div>
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-bold text-sm">Watch Bootcamp Preview</p>
                <p className="text-white/60 text-xs">2 min overview</p>
              </div>
            </div>
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
              <button onClick={()=>navigate("/bootcamp/enroll")} className="w-full bg-[#7C3AED] hover:bg-purple-600 text-white font-bold py-3 rounded-xl text-sm transition-all mb-3">
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
      <div className="bg-[#7C3AED]/10 border-b border-[#7C3AED]/20 px-6 py-3 shrink-0 flex items-center gap-3">
        <span className="text-[10px] font-bold bg-[#7C3AED] text-white px-2.5 py-1 rounded-full">IN PROGRESS</span>
        <div>
          <h2 className="text-sm font-bold text-white">{bootcampData?.title || "AI Filmmaking Bootcamp"}</h2>
          <p className="text-[10px] text-gray-400">{bootcampData?.batchLabel || "Batch 2024"} · {bootcampData?.enrollments?.length || bootcampData?.enrolledCount || 0} students enrolled</p>
        </div>
      </div>
      <div className="flex border-b border-white/10 bg-[#0F1112] px-6 shrink-0">
        {["overview","sessions","projects"].map(t=>(
          <button key={t} onClick={()=>setTab(t)} className={`capitalize text-sm font-medium px-4 py-3 border-b-2 transition-all ${tab===t?"border-[#7C3AED] text-[#7C3AED]":"border-transparent text-gray-400 hover:text-white"}`}>{t}</button>
        ))}
      </div>
      <div className="flex-1 overflow-hidden">

        {tab==="overview"&&(
          <div className="flex gap-5 p-6 h-full overflow-y-auto">
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
                  <button onClick={()=>window.open(bootcampData?.zoomLink||"https://zoom.us","_blank")} className="bg-[#7C3AED] text-white text-sm font-bold px-5 py-2 rounded-xl hover:bg-purple-600">Join Session Now →</button>
                  <button onClick={()=>setWatched(true)} className={`text-sm font-semibold px-5 py-2 rounded-xl transition-all ${watched?"bg-green-500/20 text-green-400 border border-green-500/30":"bg-white/20 text-white hover:bg-white/30"}`}>{watched?"✓ Marked as Watched":"Mark as Watched"}</button>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-white mb-3">Your Bootcamp Progress</h3>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-3xl font-black text-white">65%</span>
                  <div className="flex-1">
                    <div className="w-full bg-white/10 rounded-full h-2 mb-1"><div className="bg-[#7C3AED] h-2 rounded-full" style={{width:"65%"}}/></div>
                    <p className="text-[10px] text-gray-500">Overall completion</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-lg p-3 text-center"><p className="text-base font-bold text-white">08/22</p><p className="text-[10px] text-gray-400 mt-0.5">Sessions Completed</p></div>
                  <div className="bg-white/5 rounded-lg p-3 text-center"><p className="text-base font-bold text-white">04/12</p><p className="text-[10px] text-gray-400 mt-0.5">Projects Done</p></div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-white">Announcements</h3>
                  {announcements.length > 2 && <button onClick={()=>setShowAllAnn(v=>!v)} className="text-xs text-[#7C3AED] hover:underline">{showAllAnn?"Show Less":"View All"}</button>}
                </div>
                {announcements.length === 0 ? (
                  <div className="text-center py-4"><p className="text-xs text-gray-500">No announcements yet.</p></div>
                ) : null}
                {(showAllAnn ? announcements : announcements.slice(0,2)).map((a,i)=>(
                  <div key={i} className="border-b border-white/5 last:border-0 pb-3 last:pb-0 mb-3 last:mb-0">
                    <div className="flex items-center justify-between"><p className="text-xs font-semibold text-white">{a.title}</p><span className="text-[10px] text-gray-500 shrink-0 ml-2">{a.createdAt?timeAgo(a.createdAt):a.time}</span></div>
                    <p className="text-[11px] text-gray-400 mt-1">{a.content||a.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[210px] shrink-0 space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-xs font-semibold text-white mb-3">Bootcamp Resources</h3>
                {["Filmmaking Syllabus.pdf","Resource Engineering.zip","Weekly Reading List.pdf"].map((r,i)=>(
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <span className="text-[10px] text-gray-300 truncate flex-1 mr-1">📄 {r}</span>
                    <button onClick={()=>alert(`Downloading ${r}...`)} className="text-gray-400 hover:text-[#7C3AED] shrink-0"><Ic name="download" size={13}/></button>
                  </div>
                ))}
                <button onClick={() => setShowDrawer(true)} className="text-xs text-[#7C3AED] hover:underline mt-2">View All Files</button>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-xs font-semibold text-white mb-3">Your Mentors</h3>
                {bootcampData?.mentors?.length > 0 ? bootcampData.mentors.map((m,i)=>(
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#7C3AED] flex items-center justify-center text-white text-[10px] font-bold">{m.name[0]}</div>
                      <div><p className="text-[10px] font-semibold text-white">{m.name}</p><p className="text-[9px] text-gray-500">{m.role}</p></div>
                    </div>
                    <button onClick={()=>alert("Messaging feature coming soon! Reach your mentor via Discord for now.")} className="text-gray-400 hover:text-[#7C3AED]"><Ic name="message" size={13}/></button>
                  </div>
                )) : <p className="text-[11px] text-gray-500 py-2">No mentors assigned yet.</p>}
              </div>
            </div>
          </div>
        )}

        {tab==="sessions"&&(
          <div className="flex h-full">
            <div className="w-[270px] shrink-0 border-r border-white/10 overflow-y-auto">
              {(sessions.length > 0 ? sessions : BC_SESSION_LIST).map((s,i)=>(
                <button key={i} onClick={()=>!s.locked&&setActiveSession(s)} disabled={s.locked} className={`w-full flex items-center gap-3 px-4 py-3 border-b border-white/5 text-left transition-all ${activeSession?.no===s.no&&!s.locked?"bg-[#7C3AED]/10 border-l-2 border-l-[#7C3AED]":"hover:bg-white/5"} ${s.locked?"opacity-40 cursor-not-allowed":""}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[9px] font-bold ${s.locked?"bg-white/5 text-gray-600":s.no<=10?"bg-green-500/20 text-green-400":"bg-[#7C3AED]/20 text-[#7C3AED]"}`}>
                    {s.locked?<Ic name="lock" size={11} className="text-gray-500"/>:s.no<=10?<Ic name="check" size={11} className="text-green-400"/>:s.no}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[11px] font-semibold truncate ${activeSession?.no===s.no&&!s.locked?"text-[#7C3AED]":"text-white"}`}>Session {s.no}</p>
                    <p className="text-[10px] text-gray-500 truncate">{s.tag}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="aspect-video bg-black rounded-xl flex items-center justify-center border border-white/5">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                    <Ic name="play" size={28} className="text-white ml-1"/>
                  </div>
                  <p className="text-xs text-gray-500 max-w-[200px]">{activeSession?.title}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider">Session {String(activeSession?.no||1).padStart(2,"0")}</p>
                <h2 className="text-lg font-bold text-white mb-2">{activeSession?.title}</h2>
                <p className="text-sm text-gray-400 leading-relaxed">In this session, we dive deep into the concepts and techniques needed to master {activeSession?.title?.toLowerCase()}. Follow along with hands-on exercises and real-world filmmaking examples.</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white mb-3">Lesson Attachments</h4>
                <div className="grid grid-cols-2 gap-2">
                  {["Lesson_Notes.pdf","Reference_Materials.zip","Exercise_Files.pdf"].map((f,i)=>(
                    <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 cursor-pointer hover:border-[#7C3AED]/30 transition-all">
                      <span className="text-base">📄</span>
                      <span className="text-xs text-gray-300 flex-1 truncate">{f}</span>
                      <Ic name="download" size={13} className="text-gray-400 hover:text-[#7C3AED] shrink-0"/>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab==="projects"&&(
          <div className="flex h-full">
            <div className="w-[250px] shrink-0 border-r border-white/10 overflow-y-auto p-3 space-y-2">
              {(projects.length > 0 ? projects : BC_PROJECT_LIST).map((p,i)=>(
                <div key={i} onClick={()=>setActiveProject(p)} className={`p-3 border rounded-xl cursor-pointer transition-all ${activeProject?.no===p.no?"border-[#7C3AED]/50 bg-[#7C3AED]/5":"border-white/10 hover:border-white/20"}`}>
                  <p className="text-[10px] text-[#7C3AED] font-bold uppercase">{p.no}</p>
                  <p className="text-xs font-bold text-white mt-0.5">{p.title}</p>
                  <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">{p.desc}</p>
                </div>
              ))}
            </div>
            {activeProject&&(
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                <div>
                  <p className="text-[10px] text-[#7C3AED] font-bold uppercase mb-1">{activeProject.no}</p>
                  <h2 className="text-xl font-bold text-white mb-2">{activeProject.title}</h2>
                  <p className="text-sm text-gray-400 leading-relaxed">{activeProject.desc}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white mb-3">Requirements</h4>
                  <div className="space-y-2.5">
                    {activeProject.req.map((r,i)=>(
                      <div key={i} className="flex items-center gap-2.5">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${r.done?"border-[#7C3AED] bg-[#7C3AED]":"border-white/20"}`}>
                          {r.done&&<Ic name="check" size={11} className="text-white"/>}
                        </div>
                        <p className={`text-xs ${r.done?"text-gray-500 line-through":"text-white"}`}>{r.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white mb-3">Project Resources</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {activeProject.res.map((f,i)=>(
                      <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-3 cursor-pointer hover:border-[#7C3AED]/40 transition-all">
                        <span className="text-xl shrink-0">📄</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-white font-medium truncate">{f}</p>
                          <p className="text-[10px] text-gray-500">Download</p>
                        </div>
                        <Ic name="download" size={14} className="text-[#7C3AED] shrink-0"/>
                      </div>
                    ))}
                  </div>
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

function WorkshopsSection({ token }) {
  const [workshops, setWorkshops] = useState(WORKSHOP_DATA);
  const [enrolling, setEnrolling] = useState(null);
  const [reserved, setReserved]   = useState(new Set());
  const [detailW, setDetailW]     = useState(null);

  useEffect(() => {
    fetch("/api/workshops")
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (Array.isArray(d) && d.length > 0) setWorkshops(d); })
      .catch(() => {});
    /* Pre-populate reserved from user profile so state persists across navigation */
    if (token) {
      fetch("/api/users/me", { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.ok ? r.json() : null)
        .then(u => {
          if (u?.enrolledWorkshops?.length > 0) {
            setReserved(new Set(u.enrolledWorkshops.map(id => String(id))));
          }
        })
        .catch(() => {});
    }
  }, [token]);

  const handleReserve = async (w) => {
    if (!w._id || w._id?.startsWith?.("m")) {
      setReserved(prev => new Set([...prev, w.title]));
      setDetailW(null);
      return;
    }
    setEnrolling(w._id);
    try {
      const res  = await fetch(`/api/workshops/${w._id}/register`, { method:"POST", headers:{ Authorization:`Bearer ${token}` } });
      const data = await res.json();
      if (res.ok || data.message === "Already registered") {
        setReserved(prev => new Set([...prev, w._id || w.title]));
      } else {
        alert(data.message || "Could not reserve. Try again.");
      }
    } catch { alert("Network error. Please try again."); }
    setEnrolling(null);
    setDetailW(null);
  };

  return (
    <div className="p-6">
      {/* Workshop Detail Modal */}
      {detailW && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setDetailW(null)}>
          <div className="bg-[#0F1112] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="relative">
              <img src={detailW.image} alt={detailW.title} className="w-full h-44 object-cover" />
              <button onClick={() => setDetailW(null)} className="absolute top-3 right-3 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80 text-lg">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <h2 className="text-lg font-bold text-white">{detailW.title}</h2>
              <div className="grid grid-cols-3 gap-3">
                {[["⏱","Duration",detailW.duration],["💰","Price",detailW.price||"USD 999"],["⌨","Mode",detailW.mode||"ONLINE"]].map(([ic,l,v])=>(
                  <div key={l} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <div className="text-xl mb-1">{ic}</div>
                    <p className="text-[10px] text-gray-500 uppercase">{l}</p>
                    <p className="text-xs font-bold text-white mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2 text-sm text-gray-400">
                <p>✓ Live sessions with industry experts</p>
                <p>✓ Hands-on AI filmmaking projects</p>
                <p>✓ Certificate of completion</p>
                <p>✓ Session recordings included</p>
              </div>
              {reserved.has(detailW._id || detailW.title) ? (
                <div className="w-full bg-green-500/10 border border-green-500/30 rounded-xl py-3 text-center">
                  <p className="text-green-400 font-bold text-sm">✓ Spot Reserved!</p>
                  <p className="text-green-300 text-xs mt-1">Check your email for confirmation details.</p>
                </div>
              ) : (
                <button
                  onClick={() => handleReserve(detailW)}
                  disabled={enrolling === detailW._id}
                  className="w-full bg-[#C7E36B] text-black font-black text-sm uppercase py-3 rounded-xl hover:bg-lime-300 transition-all disabled:opacity-60"
                >
                  {enrolling === detailW._id ? "Reserving..." : "RESERVE SPOT →"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-black text-white mb-6">AI Filmmaking Workshops</h1>
      <div className="space-y-4">
        {workshops.map((w, i) => (
          <div key={i} className="bg-[#0F1112] border border-white/10 rounded-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row gap-1.5 cursor-pointer" onClick={() => setDetailW(w)}>
              <div className="w-full md:w-[240px] h-[160px] shrink-0 overflow-hidden rounded-tl-2xl">
                <img src={w.image} alt={w.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="bg-[#DCDCDC] rounded-tr-2xl px-4 py-3 flex items-center min-h-[80px]">
                  <h3 className="text-black font-black text-2xl md:text-3xl leading-tight">{w.title}</h3>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { label:"⏱ Duration", value:w.duration },
                    { label:"⊞ Pricing",  value:w.price || "USD 999.00" },
                    { label:"⌨ Mode",     value:w.mode || "ONLINE" },
                  ].map(info => (
                    <div key={info.label} className="bg-[#DCDCDC] rounded-lg p-3">
                      <p className="text-[10px] text-gray-500 font-semibold uppercase mb-1">{info.label}</p>
                      <p className="text-sm font-bold text-gray-800">{info.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {reserved.has(w._id || w.title) ? (
              <div className="w-full bg-green-500/20 py-3 text-center rounded-b-2xl">
                <p className="text-green-400 font-bold text-sm">✓ Spot Reserved!</p>
              </div>
            ) : (
              <button
                onClick={() => handleReserve(w)}
                disabled={enrolling === w._id}
                className="w-full bg-[#C7E36B] text-black font-black text-base uppercase py-3 rounded-b-2xl hover:bg-lime-300 transition-all disabled:opacity-60 flex items-center justify-center gap-1"
              >
                {enrolling === w._id ? "Reserving..." : "RESERVE SPOT"} <span className="text-xl">→</span>
              </button>
            )}
          </div>
        ))}
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
function CertificatesSection({ token, profile }) {
  const [certs, setCerts]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortOrder, setSortOrder]   = useState("Latest");
  const [sortOpen, setSortOpen]     = useState(false);
  const [viewCert, setViewCert]     = useState(null);

  useEffect(() => {
    fetch("/api/certificates/me", { headers:{ Authorization:`Bearer ${token}` } })
      .then(r=>r.json()).then(d=>{ if(Array.isArray(d)) setCerts(d); setLoading(false); }).catch(()=>setLoading(false));
  }, [token]);

  const typeBadge = t => t==="bootcamp"?"bg-blue-500/20 text-blue-400":t==="workshop"?"bg-purple-500/20 text-purple-400":"bg-green-500/20 text-green-400";
  const typeGrad  = t => t==="bootcamp"?"from-blue-900/60 to-blue-950":t==="workshop"?"from-purple-900/60 to-purple-950":"from-[#1a1a2e] to-[#16213e]";

  const filtered = certs
    .filter(c => typeFilter==="all" || c.itemType===typeFilter)
    .sort((a, b) => sortOrder==="Latest" ? new Date(b.issuedAt)-new Date(a.issuedAt) : new Date(a.issuedAt)-new Date(b.issuedAt));

  const STATS = [
    { icon:"🏆", label:"Total Earned",       value: certs.length },
    { icon:"🎬", label:"Courses Completed",  value: certs.filter(c=>c.itemType==="course").length },
    { icon:"⏳", label:"Ongoing Courses",    value: 2 },
  ];

  return (
    <div className="p-6">
      {/* Certificate Viewer Modal */}
      {viewCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setViewCert(null)}>
          <div className="bg-[#0F1112] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
            {/* ✕ close button top-right */}
            <div className="relative">
              <button onClick={() => setViewCert(null)} className="absolute top-3 right-3 w-8 h-8 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/70 text-lg z-10">✕</button>
            </div>
            {/* Certificate preview */}
            <div className={`bg-gradient-to-br ${typeGrad(viewCert.itemType)} p-8 flex flex-col items-center border-b border-white/10`}>
              <div className="w-12 h-12 bg-[#C7E36B] rounded-xl flex items-center justify-center mb-3">
                <span className="text-black font-black text-xl">A</span>
              </div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Certificate of Completion</p>
              <p className="text-white font-black text-xl text-center mb-1">{viewCert.courseTitle}</p>
              <p className="text-gray-300 text-sm">Awarded to <span className="font-bold text-white">{profile?.name || "Student"}</span></p>
              <p className="text-gray-500 text-xs mt-2">Issued {new Date(viewCert.issuedAt).toLocaleDateString("en",{day:"numeric",month:"long",year:"numeric"})}</p>
              <code className="mt-3 text-[10px] text-[#C7E36B] font-mono bg-[#C7E36B]/10 px-3 py-1 rounded-full">{viewCert.certificateId}</code>
            </div>
            <div className="p-4 flex gap-2">
              <button
                onClick={() => { navigator.clipboard.writeText(viewCert.certificateId); }}
                className="flex-1 text-xs border border-white/20 text-gray-300 py-2.5 rounded-xl hover:bg-white/5 transition-all"
              >
                📋 Copy ID
              </button>
              <button
                onClick={() => { navigator.share ? navigator.share({ title: viewCert.courseTitle, text: `AIFA Certificate: ${viewCert.certificateId}` }) : navigator.clipboard.writeText(`AIFA Certificate ID: ${viewCert.certificateId}`); }}
                className="flex-1 text-xs border border-white/20 text-gray-300 py-2.5 rounded-xl hover:bg-white/5 transition-all"
              >
                🔗 Share
              </button>
              <button
                onClick={() => alert("PDF download coming soon!")}
                className="flex-1 text-xs bg-[#C7E36B] text-black font-bold py-2.5 rounded-xl hover:bg-lime-300 transition-all"
              >
                ↓ Download
              </button>
            </div>
            <div className="px-4 pb-4">
              <button onClick={() => setViewCert(null)} className="w-full text-xs border border-white/10 text-gray-500 py-2 rounded-xl hover:bg-white/5">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-xl font-bold text-white">My Certificates</h1>
          <p className="text-gray-400 text-xs mt-0.5">Certificates earned from your courses and programs</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Filter */}
          <select value={typeFilter} onChange={e=>setTypeFilter(e.target.value)}
            className="bg-white/5 border border-white/10 text-sm text-white px-3 py-1.5 rounded-lg outline-none">
            <option value="all">Filter by Type</option>
            <option value="course">Course</option>
            <option value="bootcamp">Bootcamp</option>
            <option value="workshop">Workshop</option>
          </select>
          {/* Sort */}
          <div className="relative">
            <button onClick={()=>setSortOpen(!sortOpen)} className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-sm text-white px-3 py-1.5 rounded-lg hover:bg-white/10">
              Sort: {sortOrder} <Ic name="chevron" size={12} className={sortOpen?"rotate-90":""}/>
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 bg-[#1A1D1E] border border-white/10 rounded-xl overflow-hidden z-10 w-[140px]">
                {["Latest","Oldest"].map(o=>(
                  <button key={o} onClick={()=>{setSortOrder(o);setSortOpen(false);}}
                    className={`w-full text-left px-4 py-2.5 text-sm ${sortOrder===o?"text-[#C7E36B] bg-white/5":"text-gray-300 hover:bg-white/5"}`}>{o}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 my-5">
        {STATS.map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl">{s.icon}</span>
            <div>
              <p className="text-xl font-bold text-white">{loading ? "—" : s.value}</p>
              <p className="text-[10px] text-gray-400">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm animate-pulse text-center py-8">Loading certificates...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Ic name="cert" size={28} className="text-gray-600" />
          </div>
          <p className="text-white font-semibold text-sm">No Certificates Yet</p>
          <p className="text-gray-500 text-xs mt-1">Complete a course, workshop, or bootcamp to earn your first certificate.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <div key={c._id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all flex flex-col">
              {/* Certificate thumbnail */}
              <div className={`bg-gradient-to-br ${typeGrad(c.itemType)} p-6 flex items-center justify-center h-[140px] relative`}>
                <div className="text-center">
                  <div className="w-10 h-10 bg-[#C7E36B] rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-black font-black text-sm">A</span>
                  </div>
                  <p className="text-[9px] text-gray-400 uppercase font-semibold tracking-wider">{c.title}</p>
                  <p className="text-[11px] text-white font-semibold mt-1">{profile?.name || "Student"}</p>
                </div>
                <span className={`absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${typeBadge(c.itemType)}`}>{c.itemType}</span>
              </div>
              {/* Card body */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-bold text-white mb-1">{c.courseTitle}</h3>
                <p className="text-[10px] text-gray-500 line-clamp-1 mb-3">Awarded on {new Date(c.issuedAt).toLocaleDateString("en",{day:"numeric",month:"short",year:"numeric"})}</p>
                <div className="border-t border-white/8 pt-3 mb-3">
                  <p className="text-[10px] text-gray-600 font-mono">CERT ID: {c.certificateId}</p>
                </div>
                <div className="flex gap-2 mt-auto">
                  <button onClick={() => { navigator.share ? navigator.share({ title: c.courseTitle, text: `I earned a certificate from AIFA: ${c.courseTitle}` }) : navigator.clipboard.writeText(c.certificateId); }}
                    className="flex items-center justify-center gap-1 text-xs border border-white/20 text-gray-400 py-1.5 px-3 rounded-lg hover:bg-white/5 transition-all">
                    <Ic name="share" size={12}/>Share
                  </button>
                  <button onClick={() => setViewCert(c)} className="flex-1 text-xs text-[#7C3AED] hover:text-purple-400 font-semibold transition-all text-center">
                    View →
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
const TAG_COLORS = { "AI Film": "bg-[#C7E36B] text-black", "AI Ads": "bg-orange-400 text-black", "AI Story": "bg-pink-400 text-black", "AI Editing": "bg-blue-400 text-black", "AI Voice": "bg-purple-400 text-white", "AI Avatar": "bg-teal-400 text-black", "AI Music": "bg-indigo-400 text-white" };

const JOB_CATEGORIES = ["Cinematography","Video Editing","Sound Design","Directing","Production Design"];
const JOB_BUDGETS    = ["< ₹50/hr","₹50-100/hr","₹100-200/hr","₹200+/hr"];
const JOB_TIMELINES  = ["Immediate","Within 2 Weeks","1 Month+","Flexible"];
const JOB_TAG_COLORS = { "AI Film":"bg-[#C7E36B]/20 text-[#C7E36B]","AI Story":"bg-purple-500/20 text-purple-300","AI Editing":"bg-blue-500/20 text-blue-300","AI Ads":"bg-orange-500/20 text-orange-300","AI Music":"bg-pink-500/20 text-pink-300" };

function JobsSection({ token }) {
  const [jobs, setJobs]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [catFilter, setCat]     = useState("All");
  const [budgetFilter, setBudget]     = useState("All");
  const [timelineFilter, setTimeline] = useState("All");
  const [detailJob, setDetailJob]     = useState(null);
  const [applied, setApplied]         = useState(false);

  useEffect(() => {
    fetch("/api/jobs")
      .then(r => r.ok ? r.json() : [])
      .then(d => { if (Array.isArray(d)) setJobs(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = jobs.filter(j => {
    if (catFilter !== "All" && !(j.skills || []).some(s => s.toLowerCase().includes(catFilter.toLowerCase()))) return false;
    if (budgetFilter !== "All" && j.budget !== budgetFilter) return false;
    if (timelineFilter !== "All" && j.timeline !== timelineFilter) return false;
    return true;
  });

  const Sel = ({ val, opts, onChange, placeholder }) => (
    <select value={val} onChange={e => onChange(e.target.value)} className="bg-white/5 border border-white/10 text-gray-300 text-sm rounded-xl px-4 py-2 outline-none hover:border-white/20 transition-all">
      <option value="All">{placeholder}</option>
      {opts.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );

  return (
    <div className="p-6">
      {/* View Details Modal */}
      {detailJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => { setDetailJob(null); setApplied(false); }}>
          <div className="bg-[#0F1112] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${TAG_COLORS[detailJob.tag] || "bg-gray-500/30 text-white"}`}>{detailJob.tag}</span>
                <h2 className="text-lg font-bold text-white mt-2">{detailJob.title}</h2>
                <p className="text-xs text-gray-500 uppercase font-semibold mt-0.5">{detailJob.type}</p>
              </div>
              <button onClick={() => { setDetailJob(null); setApplied(false); }} className="text-gray-400 hover:text-white text-xl leading-none">✕</button>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">{detailJob.description || "Exciting opportunity to work with cutting-edge AI filmmaking tools. Apply now to be part of the AIFA talent network."}</p>
            {detailJob.skills?.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Required Skills</p>
                <div className="flex flex-wrap gap-2">
                  {detailJob.skills.map(s => <span key={s} className="text-xs bg-[#7C3AED]/20 text-purple-300 border border-[#7C3AED]/30 px-3 py-1 rounded-full">{s}</span>)}
                </div>
              </div>
            )}
            <div className="flex gap-3 mb-4">
              {detailJob.budget && <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center flex-1"><p className="text-[10px] text-gray-500 uppercase">Budget</p><p className="text-sm font-bold text-white">{detailJob.budget}</p></div>}
              {detailJob.timeline && <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center flex-1"><p className="text-[10px] text-gray-500 uppercase">Timeline</p><p className="text-sm font-bold text-white">{detailJob.timeline}</p></div>}
            </div>
            <div className="bg-[#7C3AED]/10 border border-[#7C3AED]/30 rounded-xl p-4 mb-4">
              <p className="text-xs font-bold text-purple-300 mb-1">How to Apply</p>
              <p className="text-xs text-gray-400">Submit your portfolio and a brief introduction via the AIFA platform. Shortlisted candidates will be contacted within 5 business days.</p>
            </div>
            {applied ? (
              <div className="w-full bg-green-500/10 border border-green-500/30 rounded-xl py-3 text-center">
                <p className="text-green-400 font-bold text-sm">✓ Application Submitted!</p>
                <p className="text-green-300 text-xs mt-1">We'll contact you within 5 business days.</p>
              </div>
            ) : (
              <button onClick={()=>setApplied(true)} className="w-full bg-[#7C3AED] hover:bg-[#6d28d9] text-white font-bold py-3 rounded-xl transition-all text-sm">Apply Now</button>
            )}
          </div>
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Jobs</h1>
        <p className="text-gray-400 text-sm mt-1">{loading ? "Loading..." : `${filtered.length} of ${jobs.length} opportunities`}</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <Sel val={catFilter}      opts={JOB_CATEGORIES} onChange={setCat}      placeholder="All Categories" />
        <Sel val={budgetFilter}   opts={JOB_BUDGETS}    onChange={setBudget}   placeholder="All Budgets" />
        <Sel val={timelineFilter} opts={JOB_TIMELINES}  onChange={setTimeline} placeholder="All Timelines" />
        {(catFilter !== "All" || budgetFilter !== "All" || timelineFilter !== "All") && (
          <button onClick={() => { setCat("All"); setBudget("All"); setTimeline("All"); }} className="text-xs text-gray-400 hover:text-white underline">Clear</button>
        )}
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm animate-pulse text-center py-8">Loading jobs...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-white font-semibold text-sm">No Jobs Found</p>
          <p className="text-gray-500 text-xs mt-1">Try changing your filters or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((j) => (
            <div key={j._id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all flex flex-col">
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full w-fit mb-2 ${TAG_COLORS[j.tag] || "bg-gray-500/30 text-white"}`}>{j.tag}</span>
              <h3 className="text-sm font-bold text-white mb-1">{j.title}</h3>
              <p className="text-[11px] text-gray-500 uppercase font-semibold mb-2">{j.type}</p>
              <p className="text-xs text-gray-400 flex-1 mb-3 line-clamp-3">{j.description}</p>
              {j.skills?.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {j.skills.slice(0, 3).map(s => <span key={s} className="text-[10px] bg-white/10 text-gray-400 px-2 py-0.5 rounded-full">{s}</span>)}
                </div>
              )}
              <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-auto">
                <div className="flex gap-2">
                  {j.budget && <span className="text-xs bg-white/10 text-white px-2.5 py-1 rounded-full font-semibold">{j.budget}</span>}
                  {j.timeline && <span className="text-[11px] bg-white/10 text-gray-400 px-2.5 py-1 rounded-full">{j.timeline}</span>}
                </div>
                <button onClick={() => setDetailJob(j)} className="text-xs text-[#7C3AED] hover:text-purple-300 font-semibold transition-all">View Details →</button>
              </div>
            </div>
          ))}
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
    <div className="p-6 bg-[#F5F7FA] min-h-full">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Billing & Payments</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { icon: "💰", label: "Total Amount Spent", value: loading ? "—" : `₹${purchases.filter(p=>p.status==="Paid").reduce((s,p)=>s+Number(p.amount.replace(/[₹,]/g,"")||0),0).toLocaleString("en-IN")}` },
          { icon: "🛒", label: "Total Purchases", value: loading ? "—" : String(purchases.length) },
          { icon: "📅", label: "Last Payment Date", value: purchases.length > 0 ? purchases[0].date : "—" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500 flex items-center gap-2"><span>{s.icon}</span>{s.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <h2 className="text-base font-bold text-gray-900 px-6 py-4 border-b border-gray-100">Purchase History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-[11px] text-gray-500 font-semibold uppercase bg-gray-50">
                {["Purchase ID", "Program Name", "Type", "Purchase Date", "Amount", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-6 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading && <tr><td colSpan={7} className="px-6 py-6 text-center text-gray-400 text-sm animate-pulse">Loading transactions...</td></tr>}
              {!loading && purchases.length === 0 && <tr><td colSpan={7} className="px-6 py-8 text-center text-gray-400 text-sm">No transactions yet.</td></tr>}
              {purchases.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-700">{p.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{p.name}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold ${p.type === "Bootcamp" ? "text-blue-500" : p.type === "Workshop" ? "text-purple-500" : "text-green-500"}`}>{p.type}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{p.date}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{p.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${p.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 relative">
                    <button onClick={() => setOpenMenu(openMenu === i ? null : i)} className="text-gray-400 hover:text-gray-700">
                      <Ic name="more" size={18} />
                    </button>
                    {openMenu === i && (
                      <div ref={menuRef} className="absolute right-6 top-8 bg-white border border-gray-100 rounded-xl shadow-lg z-10 overflow-hidden w-[160px]">
                        <button onClick={() => { onViewInvoice(p); setOpenMenu(null); }} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                          <Ic name="eye" size={14} className="text-gray-400" />View Invoice
                        </button>
                        <button onClick={() => { alert("Invoice PDF download coming soon!"); setOpenMenu(null); }} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                          <Ic name="download" size={14} className="text-gray-400" />Download Invoice
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── INVOICE VIEW ─── */
function InvoiceView({ item, onBack, profile }) {
  return (
    <div className="p-6 bg-[#F5F7FA] min-h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800">
            <Ic name="back" size={16} />Back to Billing
          </button>
          <h1 className="text-lg font-bold text-gray-900">Invoice {item.id}</h1>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${item.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{item.status}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="flex items-center gap-2 text-sm border border-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100">
            <Ic name="print" size={14} />Print
          </button>
          <button onClick={() => alert("PDF download coming soon!")} className="flex items-center gap-2 text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800">
            <Ic name="download" size={14} />Download PDF
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8 max-w-2xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-xs">A</span></div>
              <span className="text-lg font-black text-gray-900">AIFA</span>
            </div>
            <p className="text-xs text-gray-500">AIFA Learning Platform Inc.</p>
            <p className="text-xs text-gray-500">123 Tech Avenue, Suite 400</p>
            <p className="text-xs text-gray-500">San Francisco, CA 94105</p>
            <p className="text-xs text-blue-500">billing@aifa.edu</p>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-black text-gray-200 tracking-widest">INVOICE</h2>
            <div className="mt-2 space-y-1">
              <div className="flex justify-end gap-8 text-xs"><span className="text-gray-500">Invoice Number:</span><span className="font-semibold">{item.id}</span></div>
              <div className="flex justify-end gap-8 text-xs"><span className="text-gray-500">Date of Issue:</span><span className="font-semibold">{item.date}</span></div>
              <div className="flex justify-end gap-8 text-xs"><span className="text-gray-500">Payment Method:</span><span className="font-semibold">•••• 4242</span></div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-[10px] text-gray-400 font-semibold uppercase mb-1">BILLED TO</p>
          <p className="text-sm font-bold text-gray-900">{profile?.name || "Student"}</p>
          <p className="text-xs text-blue-500">{profile?.email || "—"}</p>
          <p className="text-xs text-gray-500">Student ID: STU-{String(profile?._id || "000000").slice(-6).toUpperCase()}</p>
        </div>

        <table className="w-full mb-4">
          <thead><tr className="text-[10px] text-gray-400 uppercase border-b border-gray-100">
            {["Description", "Type", "Qty", "Unit Price", "Amount"].map(h => (
              <th key={h} className={`py-2 font-semibold ${h === "Description" ? "text-left" : "text-right"}`}>{h}</th>
            ))}
          </tr></thead>
          <tbody><tr className="border-b border-gray-50">
            <td className="py-3 text-sm text-gray-800">{item.name}<br /><span className="text-xs text-gray-400">12-week intensive online program</span></td>
            <td className="py-3 text-sm text-gray-500 text-right">{item.type}</td>
            <td className="py-3 text-sm text-gray-800 text-right">1</td>
            <td className="py-3 text-sm text-gray-800 text-right">{item.amount}</td>
            <td className="py-3 text-sm font-semibold text-gray-800 text-right">{item.amount}</td>
          </tr></tbody>
        </table>

        <div className="space-y-1 ml-auto w-48">
          <div className="flex justify-between text-sm text-gray-500"><span>Subtotal</span><span>{item.amount}</span></div>
          <div className="flex justify-between text-sm text-gray-500"><span>Tax (0%)</span><span>₹0</span></div>
          <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-200 pt-2 mt-2"><span>Total</span><span>{item.amount}</span></div>
          <div className="flex justify-between text-sm text-green-600"><span>Amount Paid</span><span>-{item.amount}</span></div>
          <div className="flex justify-between text-sm font-bold text-gray-900"><span>Balance Due</span><span>₹0</span></div>
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
      localStorage.setItem("aifa_user", JSON.stringify({ name: data.name, _id: data._id, role: data.role }));
      setMsg("Saved!"); setEditing(false);
    } else setMsg(data.message || "Failed.");
    setSaving(false);
  };

  const memberId = `AIFA-${String(profile?._id || "98234").slice(-5).toUpperCase()}`;
  const avatarSrc = profile?.profilePicture;
  const initial = (profile?.name || "A")[0].toUpperCase();

  return (
    <div className="p-6 bg-[#F5F7FA] min-h-full">
      {/* Personal Info Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-900">Personal Information</h2>
          {!editing && (
            <button onClick={() => { setName(profile?.name||""); setPhone(profile?.phone||""); setLinkedin(profile?.socialLinks?.linkedin||""); setInstagram(profile?.socialLinks?.instagram||""); setPortfolio(profile?.socialLinks?.portfolio||""); setEditing(true); }}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800">
              <Ic name="edit" size={14} />Edit
            </button>
          )}
        </div>

        {editing ? (
          <div>
            {/* Avatar picker */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-20 h-20 mb-3">
                {avatarSrc
                  ? <img src={avatarSrc} alt="avatar" className="w-20 h-20 rounded-full object-cover" />
                  : <div className="w-20 h-20 rounded-full bg-[#C7E36B] flex items-center justify-center text-black text-2xl font-bold">{initial}</div>
                }
                {uploading && <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center"><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"/></div>}
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              <button onClick={() => fileRef.current?.click()} disabled={uploading} className="text-sm bg-[#C7E36B] text-black font-semibold px-4 py-1.5 rounded-lg hover:bg-lime-300 disabled:opacity-60">
                {uploading ? "Uploading..." : "Change Photo"}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Full Name</label>
                <input value={name} onChange={e => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#7C3AED]" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Email Address</label>
                <input value={profile?.email} disabled
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 bg-gray-50 cursor-not-allowed" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Mobile Number</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#7C3AED]" />
              </div>
            </div>

            {/* Social links */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">LinkedIn URL</label>
                <input value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="linkedin.com/in/..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#7C3AED]" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Instagram</label>
                <input value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="@username"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#7C3AED]" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Portfolio URL</label>
                <input value={portfolio} onChange={e => setPortfolio(e.target.value)} placeholder="https://..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#7C3AED]" />
              </div>
            </div>

            {msg && <p className={`text-sm mb-3 ${msg === "Saved!" ? "text-green-600" : "text-red-500"}`}>{msg}</p>}
            <div className="flex justify-end gap-3">
              <button onClick={() => setEditing(false)} className="px-5 py-2 text-sm border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="px-5 py-2 text-sm bg-[#C7E36B] text-black font-semibold rounded-lg hover:bg-lime-300 disabled:opacity-60">
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-6">
            {avatarSrc
              ? <img src={avatarSrc} alt="avatar" className="w-16 h-16 rounded-full object-cover shrink-0" />
              : <div className="w-16 h-16 rounded-full bg-[#C7E36B] flex items-center justify-center text-black text-xl font-bold shrink-0">{initial}</div>
            }
            <div className="grid grid-cols-2 gap-6 flex-1">
              <div>
                <p className="text-xs text-[#7C3AED] font-semibold mb-1">Full Name</p>
                <p className="text-sm font-semibold text-gray-800">{profile?.name}</p>
              </div>
              <div>
                <p className="text-xs text-[#7C3AED] font-semibold mb-1">Email Address</p>
                <p className="text-sm text-gray-800">{profile?.email}</p>
              </div>
              <div>
                <p className="text-xs text-[#7C3AED] font-semibold mb-1">Mobile Number</p>
                <p className="text-sm text-gray-800">{profile?.phone || "—"}</p>
              </div>
              {(profile?.socialLinks?.linkedin || profile?.socialLinks?.instagram || profile?.socialLinks?.portfolio) && (
                <div>
                  <p className="text-xs text-[#7C3AED] font-semibold mb-1">Social Links</p>
                  <div className="flex gap-3">
                    {profile.socialLinks.linkedin  && <a href={profile.socialLinks.linkedin}  target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">LinkedIn</a>}
                    {profile.socialLinks.instagram && <a href={`https://instagram.com/${profile.socialLinks.instagram.replace("@","")}`} target="_blank" rel="noreferrer" className="text-xs text-pink-500 hover:underline">Instagram</a>}
                    {profile.socialLinks.portfolio  && <a href={profile.socialLinks.portfolio}  target="_blank" rel="noreferrer" className="text-xs text-gray-600 hover:underline">Portfolio</a>}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Account Info */}
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-4">Account Information</h2>
        <div className="flex items-center gap-10">
          <div>
            <p className="text-[10px] text-gray-400 font-semibold uppercase mb-1">Member ID</p>
            <p className="text-sm font-semibold text-gray-800">{memberId}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-semibold uppercase mb-1">Member Since</p>
            <p className="text-sm font-semibold text-gray-800">
              {new Date(profile?.createdAt || "2023-10-12").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-semibold uppercase mb-1">Account Status</p>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 bg-green-50 border border-green-200 px-3 py-1 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-green-500" />Active
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
  const [tab, setTab] = useState("password");
  const [current, setCurrent] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const DEFAULT_PREFS = { newCourses: true, workshopAlerts: true, progressEmails: false, promotions: true };
  const [prefs, setPrefs] = useState(() => ({ ...DEFAULT_PREFS, ...(profile?.notificationPrefs || {}) }));

  /* Sync prefs when profile loads */
  useEffect(() => {
    if (profile?.notificationPrefs) setPrefs(p => ({ ...DEFAULT_PREFS, ...profile.notificationPrefs }));
  }, [profile]);
  const [prefMsg, setPrefMsg] = useState("");
  const [prefSaving, setPrefSaving] = useState(false);

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

  return (
    <div className="p-6 bg-[#F5F7FA] min-h-full">
      <h1 className="text-lg font-bold text-gray-900 mb-6">Settings</h1>
      <div className="flex gap-6">
        {/* Sidebar tabs */}
        <div className="w-[180px] shrink-0">
          {[["password", "Change Password"], ["notifications", "Notifications"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm rounded-lg mb-1 transition-all ${tab === id ? "bg-[#7C3AED] text-white font-semibold" : "text-gray-600 hover:bg-gray-100"}`}>
              {label} {tab === id && <Ic name="chevron" size={14} />}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          {tab === "password" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 mb-1">Change Password</h2>
              <p className="text-sm text-gray-500 mb-6">Update your password to keep your account secure.</p>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="text-sm text-gray-600 font-medium mb-1.5 block">Current Password</label>
                  <div className="relative">
                    <input type={showCurrent ? "text" : "password"} value={current} onChange={e => setCurrent(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#7C3AED]" />
                    <button onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Ic name="eye" size={16} />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 font-medium mb-1.5 block">New Password</label>
                  <div className="relative">
                    <input type={showNew ? "text" : "password"} value={newPwd} onChange={e => setNewPwd(e.target.value)} placeholder="Enter new password"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#7C3AED]" />
                    <button onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Ic name="eye" size={16} />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 font-medium mb-1.5 block">Confirm New Password</label>
                  <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Confirm new password"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#7C3AED]" />
                </div>
                {msg && <p className={`text-sm ${msg.includes("success") ? "text-green-600" : "text-red-500"}`}>{msg}</p>}
                <button onClick={handlePwdUpdate} disabled={saving}
                  className="bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-800 disabled:opacity-60">
                  {saving ? "Updating..." : "Update Password"}
                </button>
              </div>
            </div>
          )}

          {tab === "notifications" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 mb-1">Notifications</h2>
              <p className="text-sm text-gray-500 mb-6">Manage how you receive updates and alerts.</p>
              <div className="space-y-4 max-w-md">
                {[
                  { key: "newCourses",     label: "New Course Alerts",    desc: "Get notified when new courses are published" },
                  { key: "workshopAlerts", label: "Workshop Alerts",      desc: "Reminders before your registered workshops" },
                  { key: "progressEmails", label: "Progress Emails",      desc: "Weekly progress summary emails" },
                  { key: "promotions",     label: "Promotions & Offers",  desc: "Discounts and special offers" },
                ].map(n => (
                  <div key={n.key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{n.label}</p>
                      <p className="text-xs text-gray-400">{n.desc}</p>
                    </div>
                    <button onClick={() => setPrefs(p => ({ ...p, [n.key]: !p[n.key] }))}
                      className={`w-12 h-6 rounded-full transition-all ${prefs[n.key] ? "bg-[#7C3AED]" : "bg-gray-200"}`}>
                      <span className={`block w-5 h-5 bg-white rounded-full shadow transition-all mx-0.5 ${prefs[n.key] ? "translate-x-6" : "translate-x-0"}`} />
                    </button>
                  </div>
                ))}
                {prefMsg && <p className={`text-sm ${prefMsg.includes("saved") ? "text-green-600" : "text-red-500"}`}>{prefMsg}</p>}
                <button onClick={async () => {
                  setPrefSaving(true); setPrefMsg("");
                  const res = await fetch("/api/users/me/notifications", { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(prefs) });
                  setPrefMsg(res.ok ? "Preferences saved!" : "Failed to save.");
                  setPrefSaving(false);
                }} disabled={prefSaving}
                  className="bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-800 disabled:opacity-60">
                  {prefSaving ? "Saving..." : "Save Preferences"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   RESOURCES SECTION
════════════════════════════════════════════ */
const RES_TABS = [
  { key: "prompt",   label: "Prompt Library" },
  { key: "workflow", label: "Workflows"       },
  { key: "project",  label: "Projects"        },
  { key: "tip",      label: "Learning Tips"   },
  { key: "deal",     label: "AI Deals"        },
];

const PLACEHOLDER_IMGS = [
  "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&q=80",
  "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
  "https://images.unsplash.com/photo-1672240651781-3562e88f6c3f?w=600&q=80",
  "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=600&q=80",
  "https://images.unsplash.com/photo-1682685797660-3d847763208e?w=600&q=80",
];

function ResourcesSection({ token }) {
  const [tab, setTab]         = useState("prompt");
  const [resources, setRes]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch]   = useState("");
  const [copied, setCopied]   = useState(null);
  const [detail, setDetail]   = useState(null);

  useEffect(() => {
    setLoading(true); setRes([]);
    fetch(`/api/resources?type=${tab}`)
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setRes(d); })
      .finally(() => setLoading(false));
  }, [tab]);

  const filtered = resources.filter(r =>
    !search || r.title.toLowerCase().includes(search.toLowerCase())
  );

  const img = (r, i) => r.logo || PLACEHOLDER_IMGS[i % PLACEHOLDER_IMGS.length];

  const copyText = r => {
    navigator.clipboard.writeText(r.content || r.description || "").catch(() => {});
    setCopied(r._id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-white">Resources</h1>
          <p className="text-xs text-gray-400 mt-0.5">Tools, prompts and workflows to supercharge your AI filmmaking</p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-white/5 rounded-xl p-1 w-fit mb-5 overflow-x-auto">
        {RES_TABS.map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); setSearch(""); }}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${tab === t.key ? "bg-[#7C3AED] text-white" : "text-gray-400 hover:text-white"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5 w-[280px]">
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder={`Search ${RES_TABS.find(t => t.key === tab)?.label.toLowerCase()}...`}
          className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#7C3AED]/50" />
        <Ic name="search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
      </div>

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
          {filtered.map((r, i) => (
            <div key={r._id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-[#7C3AED]/40 transition-all">
              <div className="h-[140px] overflow-hidden">
                <img src={img(r, i)} alt={r.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-white mb-2 line-clamp-1">{r.title}</h3>
                <div className="bg-white/5 rounded-lg p-2 mb-2 relative group">
                  <span className="text-[9px] font-bold text-[#7C3AED] tracking-widest uppercase block mb-1">PROMPT</span>
                  <p className="text-[11px] text-gray-400 line-clamp-3 pr-5">{r.content || r.description}</p>
                  <button onClick={() => copyText(r)} title="Copy prompt"
                    className="absolute top-2 right-2 p-1 rounded hover:bg-white/10 transition-all">
                    <Ic name={copied === r._id ? "check" : "copy"} size={13}
                      className={copied === r._id ? "text-green-400" : "text-gray-500"} />
                  </button>
                </div>
                {r.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {r.tags.slice(0, 3).map(t => (
                      <span key={t} className="text-[9px] bg-white/10 text-gray-400 px-1.5 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : tab === "workflow" || tab === "project" ? (
        /* ── WORKFLOWS / PROJECTS ── */
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((r, i) => (
              <div key={r._id} onClick={() => setDetail(r)}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-[#7C3AED]/40 transition-all cursor-pointer group">
                <div className="h-[160px] overflow-hidden relative">
                  <img src={img(r, i)} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  {r.category && (
                    <span className="absolute top-2 left-2 text-[9px] font-bold bg-black/70 text-[#C7E36B] px-2 py-0.5 rounded uppercase tracking-wider">{r.category}</span>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-white mb-1">{r.title}</h3>
                  <p className="text-[11px] text-gray-400 line-clamp-2 mb-2">{r.description}</p>
                  <span className="flex items-center gap-1 text-xs text-[#C7E36B] font-semibold">
                    View Details <Ic name="chevron" size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Detail Modal */}
          {detail && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setDetail(null)}>
              <div className="bg-[#0F1112] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="h-[200px] overflow-hidden rounded-t-2xl relative">
                  <img src={img(detail, 0)} alt={detail.title} className="w-full h-full object-cover" />
                  <button onClick={() => setDetail(null)}
                    className="absolute top-3 right-3 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-all">
                    <Ic name="close" size={14} className="text-white" />
                  </button>
                </div>
                <div className="p-6">
                  {detail.category && <span className="text-[10px] font-bold text-[#C7E36B] tracking-wider uppercase">{detail.category}</span>}
                  <h2 className="text-xl font-bold text-white mt-1 mb-2">{detail.title}</h2>
                  <p className="text-sm text-gray-400 mb-4">{detail.description}</p>
                  {detail.content && (
                    <div className="bg-white/5 rounded-xl p-4 mb-4">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                        {tab === "workflow" ? "Steps / Process" : "Content"}
                      </h4>
                      <p className="text-sm text-gray-300 whitespace-pre-wrap">{detail.content}</p>
                    </div>
                  )}
                  {detail.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {detail.tags.map(t => (
                        <span key={t} className="text-xs bg-[#7C3AED]/20 text-[#7C3AED] px-2 py-1 rounded-lg">{t}</span>
                      ))}
                    </div>
                  )}
                  {detail.link && (
                    <a href={detail.link} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-xl text-sm hover:opacity-90 transition-all">
                      Open Resource <Ic name="link" size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      ) : tab === "tip" ? (
        /* ── LEARNING TIPS ── */
        <div className="space-y-3 max-w-2xl">
          {filtered.map((r, i) => (
            <div key={r._id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 hover:border-[#7C3AED]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 flex items-center justify-center shrink-0 text-lg">💡</div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">{r.title}</h3>
                <p className="text-xs text-gray-400">{r.description}</p>
                {r.content && <p className="text-xs text-gray-500 mt-2 italic border-l-2 border-[#7C3AED]/40 pl-2">"{r.content}"</p>}
              </div>
            </div>
          ))}
        </div>
      ) : tab === "deal" ? (
        /* ── AI DEALS ── */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r, i) => (
            <div key={r._id} className="bg-white rounded-xl p-4 flex flex-col gap-2 shadow-sm">
              {r.logo
                ? <img src={r.logo} alt={r.title} className="h-8 object-contain" />
                : <div className="h-8 flex items-center"><span className="text-xs font-bold text-gray-800">{r.title}</span></div>
              }
              <h3 className="text-sm font-bold text-black">{r.title}</h3>
              <p className="text-xs text-gray-600 flex-1">{r.description}</p>
              {r.discount && (
                <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full w-fit">{r.discount} OFF</span>
              )}
              {r.link ? (
                <a href={r.link} target="_blank" rel="noopener noreferrer"
                  className="text-xs bg-black text-white font-bold py-2 px-3 rounded-lg text-center hover:opacity-80 transition-all">
                  Get Deal →
                </a>
              ) : (
                <button onClick={() => alert("Deal link coming soon!")} className="text-xs bg-black text-white font-bold py-2 px-3 rounded-lg hover:opacity-80 transition-all">
                  Get Deal →
                </button>
              )}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ─── COMMUNITY SECTION ─── */
const MOCK_THREADS = [
  { id: 1, title: "Best AI tools for video editing in 2024?", author: "Kiran M", avatar: "", replies: 14, views: 328, tag: "Tools", time: "2h ago", body: "Looking for recommendations on AI-powered video editing tools that integrate well with Adobe Premiere. What has your experience been with RunwayML vs Topaz?" },
  { id: 2, title: "How to write effective AI prompts for creative briefs", author: "Sarah J", avatar: "", replies: 9, views: 201, tag: "Prompts", time: "5h ago", body: "I've been experimenting with structured prompts for creative brief generation. Here's my template that's been working well across different client types..." },
  { id: 3, title: "My workflow for automating client deliverables", author: "Rajiv K", avatar: "", replies: 22, views: 512, tag: "Workflow", time: "1d ago", body: "After 3 months of iteration I've built a solid automation stack using Zapier + GPT-4 + Notion. Happy to share the full breakdown here." },
  { id: 4, title: "Certificate of AI Proficiency — what courses count?", author: "Priya S", avatar: "", replies: 6, views: 133, tag: "Certificates", time: "2d ago", body: "I completed both Bootcamp and Video Courses but the certificate still shows pending. Does the Workflow module need to be done first?" },
  { id: 5, title: "Resources for learning Motion Graphics AI?", author: "Alex T", avatar: "", replies: 11, views: 276, tag: "Resources", time: "3d ago", body: "Just joined and looking for the best starting point for AI motion graphics. Is the Bootcamp the right place or should I start with video courses?" },
];
const THREAD_TAG_COLORS = { Tools:"bg-blue-500/20 text-blue-400", Prompts:"bg-purple-500/20 text-purple-400", Workflow:"bg-orange-500/20 text-orange-400", Certificates:"bg-[#7C3AED]/20 text-[#7C3AED]", Resources:"bg-green-500/20 text-green-400", General:"bg-gray-500/20 text-gray-400" };

function CommunitySection({ token, profile }) {
  const [threads, setThreads] = useState(null); // null = loading; [] = empty from API
  const [selected, setSelected] = useState(null);
  const [filterTag, setFilterTag] = useState("All");
  const [search, setSearch] = useState("");
  const [reply, setReply] = useState("");
  const [repliesMap, setRepliesMap] = useState({});
  const [showNewThread, setShowNewThread] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newTag, setNewTag] = useState("General");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    fetch("/api/community/threads")
      .then(r => r.ok ? r.json() : [])
      .then(d => { setThreads(Array.isArray(d) ? d : []); })
      .catch(() => { setThreads([]); });
  }, []);

  /* Merge DB replies (from selected.replies array) with locally-added replies from repliesMap */
  const dbReplies = Array.isArray(selected?.replies) ? selected.replies : [];
  const localReplies = repliesMap[selected?._id || selected?.id] || [];
  const currentReplies = [
    ...dbReplies.map(r => ({ id: r._id || r.createdAt, text: r.text, author: r.author, time: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "" })),
    ...localReplies,
  ];
  const displayThreads = threads ?? MOCK_THREADS; // null=loading → show mock; []= empty from API
  const tags = ["All", ...new Set(displayThreads.map(t => t.tag))];
  const filtered = displayThreads.filter(t => (filterTag === "All" || t.tag === filterTag) && (!search || t.title.toLowerCase().includes(search.toLowerCase())));

  const submitReply = async () => {
    if (!reply.trim()) return;
    const id = selected?._id || selected?.id;
    const newReply = { id: Date.now(), text: reply.trim(), time: "Just now", author: profile?.name || "You", createdAt: new Date().toISOString() };
    setRepliesMap(r => ({ ...r, [id]: [...(r[id] || []), newReply] }));
    setReply("");
    if (selected?._id) {
      try {
        await fetch(`/api/community/threads/${selected._id}/reply`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ text: newReply.text, author: profile?.name || "You" }),
        });
      } catch { /* local state already updated */ }
    }
  };

  const submitThread = async () => {
    if (!newTitle.trim() || !newBody.trim()) return;
    setPosting(true);
    const optimistic = { id: Date.now(), _id: null, title: newTitle.trim(), body: newBody.trim(), tag: newTag, author: profile?.name || "You", replies: 0, views: 0, time: "Just now", createdAt: new Date().toISOString() };
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

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left thread list */}
      <div className="w-[340px] shrink-0 border-r border-white/5 overflow-y-auto">
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white">Community Forum</h1>
              {threads !== null && <span className="text-[10px] bg-[#7C3AED]/20 text-[#7C3AED] font-bold px-2 py-0.5 rounded-full">{displayThreads.length} Threads</span>}
            </div>
            <button onClick={() => setShowNewThread(v => !v)} className="text-xs bg-[#7C3AED] text-white font-bold px-3 py-1.5 rounded-lg hover:bg-purple-600">+ New Thread</button>
          </div>
          {showNewThread && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-3 space-y-2">
              <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Thread title..." className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none"/>
              <textarea value={newBody} onChange={e => setNewBody(e.target.value)} rows={3} placeholder="What's on your mind?" className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none resize-none"/>
              <div className="flex gap-2 items-center">
                <select value={newTag} onChange={e => setNewTag(e.target.value)} className="text-xs bg-[#1A1D1E] border border-white/10 rounded-lg px-2 py-1.5 text-white outline-none">
                  {["General","Tools","Prompts","Workflow","Resources","Certificates"].map(t => <option key={t}>{t}</option>)}
                </select>
                <button onClick={submitThread} disabled={posting || !newTitle.trim() || !newBody.trim()} className="text-xs bg-[#7C3AED] text-white font-bold px-3 py-1.5 rounded-lg disabled:opacity-40">Post</button>
                <button onClick={() => setShowNewThread(false)} className="text-xs text-gray-400 hover:text-white">Cancel</button>
              </div>
            </div>
          )}
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search threads..." className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-600 outline-none mb-3"/>
          <div className="flex gap-1 flex-wrap">
            {tags.map(t => (
              <button key={t} onClick={() => setFilterTag(t)} className={`text-[10px] px-2 py-1 rounded-full font-semibold transition-all ${filterTag === t ? "bg-[#7C3AED] text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="divide-y divide-white/5">
          {threads !== null && threads.length === 0 && filtered.length === 0 && (
            <div className="p-6 text-center text-gray-500 text-sm">No threads yet. Be the first to post!</div>
          )}
          {filtered.map(t => (
            <button key={t._id || t.id} onClick={() => setSelected(t)}
              className={`w-full text-left p-4 hover:bg-white/5 transition-all ${(selected?._id && selected._id === t._id) || (!selected?._id && selected?.id && selected.id === t.id) ? "border-l-2 border-[#7C3AED] bg-white/5" : ""}`}>
              <div className="flex items-start gap-2 mb-1">
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 mt-0.5 ${THREAD_TAG_COLORS[t.tag] || THREAD_TAG_COLORS.General}`}>{t.tag}</span>
                <p className="text-sm font-semibold text-white line-clamp-2 leading-snug">{t.title}</p>
              </div>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-[10px] text-gray-500">{t.author}</span>
                <span className="text-[10px] text-gray-600">·</span>
                <span className="text-[10px] text-gray-500">💬 {Array.isArray(t.replies) ? t.replies.length : (t.replies || 0)}</span>
                <span className="text-[10px] text-gray-500">👁 {t.views || 0}</span>
                <span className="text-[10px] text-gray-600 ml-auto">{t.time || (t.createdAt ? new Date(t.createdAt).toLocaleDateString() : "")}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right detail + reply view */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col">
        {!selected ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center"><p className="text-3xl mb-2">💬</p><p className="text-sm">Select a thread to read and reply</p></div>
          </div>
        ) : (
          <div className="max-w-2xl flex flex-col gap-5 w-full">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${THREAD_TAG_COLORS[selected.tag] || THREAD_TAG_COLORS.General}`}>{selected.tag}</span>
                <span className="text-[10px] text-gray-500">{selected.time}</span>
              </div>
              <h2 className="text-lg font-bold text-white mb-1">{selected.title}</h2>
              <p className="text-xs text-gray-400 mb-3">Posted by <span className="text-white font-semibold">{selected.author}</span></p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-sm text-gray-300 leading-relaxed">{selected.body}</p>
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                <span>💬 {currentReplies.length} {currentReplies.length === 1 ? "reply" : "replies"}</span>
                <span>👁 {selected.views || 0} views</span>
                <button
                  onClick={() => {
                    const url = `${window.location.origin}/dashboard#community`;
                    if (navigator.share) navigator.share({ title: selected.title, url });
                    else { navigator.clipboard.writeText(url); alert("Thread link copied to clipboard!"); }
                  }}
                  className="ml-auto text-[#7C3AED] hover:underline"
                >Share</button>
              </div>
            </div>

            {/* Existing replies */}
            {currentReplies.length > 0 && (
              <div className="space-y-3">
                <p className="text-[10px] text-gray-500 font-semibold uppercase">Replies</p>
                {currentReplies.map(r => (
                  <div key={r.id} className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-[#7C3AED] flex items-center justify-center text-white text-[10px] font-bold">{(r.author || "?")[0].toUpperCase()}</div>
                      <span className="text-xs font-semibold text-white">{r.author}</span>
                      <span className="text-[10px] text-gray-500 ml-auto">{r.time}</span>
                    </div>
                    <p className="text-sm text-gray-300 pl-8">{r.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Reply box */}
            <div className="border-t border-white/10 pt-4">
              <p className="text-[10px] text-gray-400 font-semibold mb-2">YOUR REPLY</p>
              <textarea value={reply} onChange={e => setReply(e.target.value)} rows={3} className="w-full bg-[#1A1D1E] border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#7C3AED]/50 resize-none mb-2" placeholder="Write a thoughtful reply..."/>
              <button onClick={submitReply} disabled={!reply.trim()} className="text-xs bg-[#7C3AED] text-white font-bold px-4 py-2 rounded-lg disabled:opacity-40 hover:bg-violet-500">Post Reply</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── HIRE TALENT SECTION ─── */
const FALLBACK_TALENT = [
  { _id: "1", name: "Sarah Jenkins", location: "New York, USA", category: "Logo Design", avatar: "", bio: "Award-winning brand identity designer with 8 years experience in logo design and visual branding for startups.", skills: ["Logo Design", "Brand Identity", "Typography", "Illustrator"], works: ["", "", ""], contactEmail: "sarah@example.com", isActive: true },
  { _id: "2", name: "Rajiv Kumar", location: "Bangalore, India", category: "UI Design", avatar: "", bio: "Senior UI/UX designer specialising in SaaS products and mobile-first design systems.", skills: ["UI Design", "Figma", "Prototyping", "Design Systems"], works: ["", "", ""], contactEmail: "rajiv@example.com", isActive: true },
  { _id: "3", name: "Jessica Park", location: "Seoul, South Korea", category: "Video Editing", avatar: "", bio: "Creative video editor and motion graphics artist working with global brands on ad campaigns and social content.", skills: ["Premiere Pro", "After Effects", "Motion Graphics", "Color Grading"], works: ["", "", ""], contactEmail: "jessica@example.com", isActive: true },
];
const HT_CATEGORIES = ["All", "Logo Design", "UI Design", "Video Editing", "3D Modeling", "Animation", "VFX", "Sound Design"];

function HireTalentSection({ token }) {
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [catFilter, setCatFilter] = useState("All");
  const [inquiry, setInquiry] = useState(null);
  const [inqMsg, setInqMsg] = useState("");
  const [sent, setSent] = useState(false);
  const [toast, setToast] = useState(""); // top-right toast: talent name

  useEffect(() => {
    fetch("/api/talent")
      .then(r => r.json())
      .then(d => { setTalents(Array.isArray(d) && d.length > 0 ? d : FALLBACK_TALENT); setLoading(false); })
      .catch(() => { setTalents(FALLBACK_TALENT); setLoading(false); });
  }, []);

  const filtered = talents.filter(t => catFilter === "All" || t.category === catFilter);

  const openInquiry = (t) => { setInquiry(t); setInqMsg(""); setSent(false); };

  const sendInquiry = async () => {
    if (!inqMsg.trim()) return;
    /* POST to service requests */
    try {
      const user = JSON.parse(localStorage.getItem("aifa_user") || "{}");
      await fetch("/api/service-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({
          name: user.name || "Student",
          email: user.email || "student@aifa.co.in",
          service: "hire-talent",
          message: `[Inquiry to ${inquiry.name}] ${inqMsg}`,
        }),
      });
    } catch { /* ignore — show success anyway */ }
    setSent(true);
    setToast(inquiry.name);
    setTimeout(() => setToast(""), 3000);
    setTimeout(() => { setInquiry(null); setSent(false); }, 2000);
  };

  /* Quick toast on card button (no modal needed for simple inquiry) */
  const quickInquiry = async (t) => {
    try {
      const user = JSON.parse(localStorage.getItem("aifa_user") || "{}");
      await fetch("/api/service-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({
          name: user.name || "Student",
          email: user.email || "student@aifa.co.in",
          service: "hire-talent",
          message: `Interest in ${t.name} (${t.category})`,
        }),
      });
    } catch { /* ignore */ }
    setToast(t.name);
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="p-6">
      {/* Top-right toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-[#C7E36B] text-black px-5 py-3 rounded-xl font-semibold shadow-lg text-sm">
          Inquiry sent to {toast}!
        </div>
      )}
      <div className="mb-5">
        <h1 className="text-xl font-bold text-white mb-1">Hire Talent</h1>
        <p className="text-xs text-gray-400">Connect with skilled creative professionals</p>
      </div>

      {/* Category scroll filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-thin">
        {HT_CATEGORIES.map(c => (
          <button key={c} onClick={() => setCatFilter(c)} className={`text-xs px-3 py-1.5 rounded-full font-semibold whitespace-nowrap shrink-0 transition-all ${catFilter === c ? "bg-[#7C3AED] text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}>{c}</button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm animate-pulse">Loading talent...</p>
      ) : (
        <div className="space-y-6">
          {filtered.map(t => (
            <div key={t._id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                  {t.avatar ? <img src={t.avatar} className="w-full h-full object-cover" alt=""/> : <div className="w-full h-full bg-gradient-to-br from-[#7C3AED] to-purple-800 flex items-center justify-center text-white font-black text-xl">{t.name[0]}</div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-base font-bold text-white">{t.name}</p>
                    <span className="text-[10px] bg-[#7C3AED]/20 text-[#7C3AED] font-bold px-2 py-0.5 rounded-full">{t.category}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">📍 {t.location}</p>
                  <p className="text-sm text-gray-300 mt-1.5 leading-relaxed">{t.bio}</p>
                </div>
                <button onClick={() => { quickInquiry(t); openInquiry(t); }} className="shrink-0 text-xs bg-[#7C3AED] text-white font-bold px-4 py-2 rounded-xl hover:bg-violet-500 transition-all">SEND INQUIRY</button>
              </div>

              {/* Skills */}
              {t.skills?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {t.skills.map(s => <span key={s} className="text-[10px] bg-white/8 border border-white/10 text-gray-300 px-2 py-0.5 rounded-full">{s}</span>)}
                </div>
              )}

              {/* Works grid */}
              {t.works?.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {t.works.map((w, i) => (
                    <div key={i} className="aspect-video rounded-lg overflow-hidden bg-white/5">
                      {w ? <img src={w} className="w-full h-full object-cover" alt=""/> : <div className="w-full h-full flex items-center justify-center text-gray-600 text-[10px]">Portfolio {i + 1}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && <div className="text-center py-12"><p className="text-gray-500 text-sm">No talent found in this category</p></div>}
        </div>
      )}

      {/* Inquiry Modal */}
      {inquiry && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={e => e.target === e.currentTarget && setInquiry(null)}>
          <div className="bg-[#0F1112] border border-white/15 rounded-2xl p-6 w-full max-w-md">
            {sent ? (
              <div className="text-center py-4">
                <p className="text-4xl mb-3">✅</p>
                <p className="text-white font-bold">Inquiry Sent!</p>
                <p className="text-xs text-gray-400 mt-1">{inquiry.name} will get back to you soon.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7C3AED] to-purple-800 flex items-center justify-center text-white font-bold">{inquiry.name[0]}</div>
                  <div><p className="text-sm font-bold text-white">{inquiry.name}</p><p className="text-[10px] text-gray-400">{inquiry.category}</p></div>
                  <button onClick={() => setInquiry(null)} className="ml-auto text-gray-500 hover:text-white"><Ic name="close" size={18}/></button>
                </div>
                <p className="text-[10px] text-gray-400 font-semibold mb-2">YOUR MESSAGE</p>
                <textarea value={inqMsg} onChange={e => setInqMsg(e.target.value)} rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#7C3AED]/50 resize-none mb-3" placeholder={`Hi ${inquiry.name.split(" ")[0]}, I'm interested in your ${inquiry.category} services...`}/>
                <div className="flex gap-2">
                  <button onClick={() => setInquiry(null)} className="flex-1 text-xs border border-white/15 text-gray-400 py-2 rounded-xl hover:bg-white/5">Cancel</button>
                  <button onClick={sendInquiry} disabled={!inqMsg.trim()} className="flex-1 text-xs bg-[#7C3AED] text-white font-bold py-2 rounded-xl disabled:opacity-40 hover:bg-violet-500">Send</button>
                </div>
              </>
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

