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
  { id: "jobs",         label: "Jobs",         icon: "jobs",         soon: true },
  { id: "resources",    label: "Resources",    icon: "resources",    soon: true },
  { id: "community",    label: "Community",    icon: "community",    soon: true },
  { id: "hire-talent",  label: "Hire Talent",  icon: "hire",         soon: true },
];

/* ════════════════════════════════════════════
   MAIN LAYOUT
════════════════════════════════════════════ */
export default function StudentDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNotif, setShowNotif] = useState(false);
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
        <nav className="flex-1 py-3 overflow-y-auto">
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
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              {showNotif && <NotificationDropdown onClose={() => setShowNotif(false)} />}
            </div>

            {/* Avatar */}
            <div className="relative" ref={userRef}>
              <button
                onClick={() => { setShowUserMenu(!showUserMenu); setShowNotif(false); }}
                className="w-8 h-8 rounded-full bg-[#C7E36B] text-black font-bold text-sm flex items-center justify-center hover:opacity-90 transition-all"
              >
                {userInitial}
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
            <InvoiceView item={invoiceItem} onBack={() => setInvoiceItem(null)} />
          ) : (
            <>
              {activePage === "dashboard" && <DashboardHome profile={profile} token={token} onNavigate={setActivePage} />}
              {activePage === "bootcamp" && <BootcampSection token={token} />}
              {activePage === "workshops" && <WorkshopsSection token={token} />}
              {activePage === "video-courses" && <VideoCoursesSection profile={profile} />}
              {activePage === "certificates" && <CertificatesSection />}
              {activePage === "jobs" && <JobsSection />}
              {activePage === "resources" && <PlaceholderSection title="Resources" />}
              {activePage === "community" && <PlaceholderSection title="Community" />}
              {activePage === "hire-talent" && <PlaceholderSection title="Hire Talent" />}
              {activePage === "profile" && <ProfileSection profile={profile} token={token} onUpdated={setProfile} />}
              {activePage === "settings" && <SettingsSection token={token} />}
              {activePage === "billing" && <BillingSection onViewInvoice={setInvoiceItem} />}
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
const NOTIFS = [
  { icon: "⚠️", color: "text-orange-400", title: "Action Required", desc: "Your monthly performance report for October is ready for review and approval.", time: "1m ago", actions: true },
  { icon: "🔴", color: "text-red-400", title: "Security Alert", desc: "New login detected from San Francisco, CA", time: "5m ago" },
  { icon: "🔵", color: "text-blue-400", title: "System Update", desc: "Version 2.4.0 has been deployed successfully.", time: "2h ago" },
  { icon: "📅", color: "text-purple-400", title: "Upcoming Meeting", desc: "Project Sync with Operations Team starts in 1 hour.", time: "3h ago" },
  { icon: "✅", color: "text-green-400", title: "Export Complete", desc: "Your data export for 'Q3 Financials' is ready.", time: "Yesterday" },
];

function NotificationDropdown({ onClose }) {
  return (
    <div className="absolute right-0 top-full mt-2 w-[340px] bg-white rounded-xl shadow-2xl z-50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <span className="font-semibold text-gray-900 text-sm">Notifications</span>
        <button className="text-[#6B21E8] text-xs font-medium hover:underline">Mark all as read</button>
      </div>
      <div className="divide-y divide-gray-50">
        {NOTIFS.map((n, i) => (
          <div key={i} className="px-4 py-3 hover:bg-gray-50 transition-all">
            <div className="flex gap-3">
              <span className="text-lg shrink-0 mt-0.5">{n.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-gray-900">{n.title}</p>
                  <span className="text-[10px] text-gray-400 ml-2 shrink-0">{n.time}</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">{n.desc}</p>
                {n.actions && (
                  <div className="flex gap-2 mt-2">
                    <button className="text-[10px] text-gray-600 border border-gray-200 px-2 py-0.5 rounded hover:bg-gray-100">Review Report</button>
                    <button className="text-[10px] text-white bg-[#6B21E8] px-2 py-0.5 rounded hover:bg-purple-700">Dismiss</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-2.5 text-center border-t border-gray-100">
        <button className="text-xs text-[#6B21E8] font-medium hover:underline">View all notifications →</button>
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
const MOCK_COURSES_PROGRESS = [
  { title: "UI Design Basics: Master the Craft", image: "/courses/v1.png", progress: 60, total: "2/10 lessons" },
  { title: "AI Filmmaking: Future of Video", image: "/courses/v2.png", progress: 20, total: "2/9 lessons" },
  { title: "Advanced React Patterns", image: "/courses/v3.png", progress: 40, total: "6/15 lessons" },
];

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
const MODULES = [
  {
    title: "Module 1: AI Fundamentals", status: "completed", lessons: [
      { title: "Introduction to AI", duration: "12:45", status: "done" },
    ]
  },
  {
    title: "Module 2: Generative Video", status: "in-progress", lessons: [
      { title: "Introduction to Sora", duration: "12:45", status: "active", vimeoId: "" },
      { title: "2.2 Advanced Prompting", duration: "", status: "active" },
      { title: "2.3 Video Consistency", duration: "16:30", status: "pending" },
    ]
  },
  {
    title: "Module 3: AI Cinematography", status: "locked", lessons: []
  },
];

const PROJECTS = [
  { id: "PROJECT 01", title: "AI-Generated Cinematic Storyboard", status: "REVIEWED", grade: "A+", desc: "Create a 10-frame storyboard using Midjourney or DALL-E 3 depicting a sci-fi landscape with consistent character design.", submitted: "Oct 12", feedback: true },
  { id: "PROJECT 02", title: "Generative Video Short (30s)", status: "SUBMITTED", desc: "Produce a 30-second short film using Runway Gen-2 or Pika Labs focusing on environmental storytelling. Review pending (2-3 days)", quote: "Great use of temporal consistency in the second scene." },
  { id: "PROJECT 03", title: "AI Soundscapes & Scoring", status: "NOT STARTED", desc: "Compose an original background score for your short film using Udio or Suno AI, synced with visual emotional beats.", deadline: "OCT 28 (5 DAYS LEFT)" },
];

function BootcampSection({ token }) {
  const [tab, setTab] = useState("overview");
  const [activeLesson, setActiveLesson] = useState(MODULES[1].lessons[0]);
  const [activeProject, setActiveProject] = useState(PROJECTS[2]);
  const [openModule, setOpenModule] = useState(1);

  return (
    <div className="flex flex-col h-full">
      {/* Hero */}
      <div className="relative h-36 overflow-hidden shrink-0">
        <img src="/courses/v6.png" alt="bootcamp" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30 flex items-end p-6">
          <div>
            <h1 className="text-xl font-bold text-white">AI Filmmaking Bootcamp</h1>
            <p className="text-gray-300 text-xs mt-1">Batch 3 • 2024 • 24 students enrolled</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 bg-[#0F1112] px-6 shrink-0">
        {["overview", "curriculum", "projects"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`capitalize text-sm font-medium px-4 py-3 border-b-2 transition-all ${tab === t ? "border-[#C7E36B] text-[#C7E36B]" : "border-transparent text-gray-400 hover:text-white"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {tab === "overview" && <BootcampOverview />}
        {tab === "curriculum" && <BootcampCurriculum modules={MODULES} activeLesson={activeLesson} setActiveLesson={setActiveLesson} openModule={openModule} setOpenModule={setOpenModule} />}
        {tab === "projects" && <BootcampProjects projects={PROJECTS} activeProject={activeProject} setActiveProject={setActiveProject} />}
      </div>
    </div>
  );
}

function BootcampOverview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-5">
        {/* Next Session */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[10px] bg-[#C7E36B]/20 text-[#C7E36B] px-2 py-0.5 rounded-full font-bold">BEST SELLER</span>
              <h3 className="text-sm font-bold text-white mt-1">Generative Video with Sora & Midjourney</h3>
              <p className="text-xs text-gray-400 mt-0.5">📅 Today, 7:00 PM IST · Starts in 30 min</p>
            </div>
            <button className="bg-[#C7E36B] text-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-lime-300 transition-all">
              Join Session Now →
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Your Bootcamp Progress</h3>
            <span className="text-xs text-gray-400">Week 3 of 12</span>
          </div>
          <div className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">Overall Completion</span>
              <span className="text-xs font-bold text-white">65%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-[#C7E36B] h-2 rounded-full" style={{ width: "65%" }} />
            </div>
            <p className="text-[10px] text-gray-500 mt-1">600 lessons completed</p>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { label: "QUIZZES", value: "08/10" },
              { label: "ASSIGNMENTS", value: "04/06" },
              { label: "POINTS", value: "2,450 XP" },
            ].map(s => (
              <div key={s.label} className="bg-white/5 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                <p className="text-base font-bold text-white">{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Announcements</h3>
            <button className="text-xs text-[#C7E36B] hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {[
              { title: "New Resource: AI Cinematography Guide", time: "2h ago", desc: "I've just uploaded the comprehensive guide for Module 5. Please review it before today's live session." },
              { title: "Workshop Rescheduled: 1-on-1 Mentoring", time: "Yesterday", desc: "The Friday mentorship slot has been moved to 3:00 PM EST. Check the Mentorship tab for updates." },
            ].map((a, i) => (
              <div key={i} className="border-b border-white/5 last:border-0 pb-3 last:pb-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-white">{a.title}</p>
                  <span className="text-[10px] text-gray-500">{a.time}</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="space-y-4">
        {/* Resources */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="text-xs font-semibold text-white mb-3">Bootcamp Resources</h3>
          {["Filmmaking Syllabus.pdf", "Resource Engineering.zip", "Weekly Reading List"].map((r, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <span className="text-[11px] text-gray-300">{r}</span>
              <button className="text-gray-400 hover:text-[#C7E36B]"><Ic name="download" size={14} /></button>
            </div>
          ))}
          <button className="text-xs text-[#C7E36B] hover:underline mt-2">View All Files</button>
        </div>

        {/* Mentors */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="text-xs font-semibold text-white mb-3">Your Mentors</h3>
          {[
            { name: "David Fincher AI", role: "Lead Instructor - Director" },
            { name: "Sarah Jenkins", role: "Technical Mentor - AI Artist" },
          ].map((m, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#7C3AED] flex items-center justify-center text-white text-xs font-bold">{m.name[0]}</div>
                <div>
                  <p className="text-[11px] font-semibold text-white">{m.name}</p>
                  <p className="text-[10px] text-gray-500">{m.role}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-[#C7E36B]"><Ic name="message" size={14} /></button>
            </div>
          ))}
        </div>

        {/* Office Hours */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-[10px] text-gray-400 font-semibold uppercase mb-2">Office Hours</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-white">Friday, 10:00 AM</span>
            <button className="text-xs bg-[#C7E36B] text-black font-bold px-3 py-1 rounded-lg hover:bg-lime-300">Book Slot</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BootcampCurriculum({ modules, activeLesson, setActiveLesson, openModule, setOpenModule }) {
  return (
    <div className="flex gap-6 h-full">
      {/* Module List */}
      <div className="w-[280px] shrink-0 space-y-2">
        {modules.map((mod, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <button onClick={() => setOpenModule(openModule === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3 text-left">
              <div className="flex items-center gap-2">
                {mod.status === "completed" && <Ic name="check" size={14} className="text-green-400" />}
                {mod.status === "in-progress" && <span className="w-3.5 h-3.5 rounded-full border-2 border-[#C7E36B] flex items-center justify-center"><span className="w-1.5 h-1.5 rounded-full bg-[#C7E36B]" /></span>}
                {mod.status === "locked" && <Ic name="lock" size={14} className="text-gray-500" />}
                <span className={`text-xs font-semibold ${mod.status === "locked" ? "text-gray-500" : "text-white"}`}>{mod.title}</span>
              </div>
              <Ic name="chevron" size={14} className={`text-gray-400 transition-all ${openModule === i ? "rotate-90" : ""}`} />
            </button>
            {openModule === i && mod.lessons.map((lesson, j) => (
              <button key={j} onClick={() => setActiveLesson(lesson)}
                className={`w-full flex items-center justify-between px-4 py-2.5 border-t border-white/5 text-left transition-all ${activeLesson?.title === lesson.title ? "bg-[#C7E36B]/10" : "hover:bg-white/5"}`}>
                <span className={`text-xs ${activeLesson?.title === lesson.title ? "text-[#C7E36B]" : "text-gray-400"}`}>{lesson.title}</span>
                <span className="text-[10px] text-gray-500">{lesson.duration}</span>
              </button>
            ))}
          </div>
        ))}
        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
          <p className="text-[10px] text-gray-400 font-semibold mb-1">NEXT MILESTONE</p>
          <p className="text-xs font-bold text-white">AI Director Certificate</p>
          <p className="text-[10px] text-gray-500 mt-1">7 lessons to go · XP: 2,450 / 3,000</p>
        </div>
      </div>

      {/* Video + Content */}
      <div className="flex-1 space-y-4">
        <div className="aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center">
          {activeLesson?.vimeoId ? (
            <iframe src={`https://player.vimeo.com/video/${activeLesson.vimeoId}`} className="w-full h-full" allowFullScreen />
          ) : (
            <div className="text-center text-gray-500">
              <Ic name="play" size={48} className="mx-auto mb-2 text-gray-600" />
              <p className="text-sm">CINEMATIC LIGHTING TECHNIQUES</p>
            </div>
          )}
        </div>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] text-gray-500 mb-1">MODULE 2 · LESSON 2.2</p>
            <h2 className="text-lg font-bold text-white">Advanced Prompting for Cinematic Realism</h2>
            <p className="text-sm text-gray-400 mt-1">In this session, we dive deep into the technical syntax required to achieve hyper-realistic cinematic lighting and camera movements using generative AI models.</p>
          </div>
          <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#C7E36B] shrink-0 ml-4">
            <Ic name="check" size={14} />Mark as Complete
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-xs font-semibold text-white mb-3">Lesson Attachments</h4>
            {["Cinematic_Cheat_Sheet.", "Reference_Frames.zip"].map((f, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-t border-white/5 first:border-0">
                <span className="text-xs text-gray-300">📄 {f}</span>
                <button className="text-gray-400 hover:text-[#C7E36B]"><Ic name="download" size={14} /></button>
              </div>
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-xs font-semibold text-white mb-1">Lesson Quiz</h4>
            <p className="text-[11px] text-gray-400 mb-3">Test your knowledge of Module 2.2 concepts.</p>
            <button className="w-full bg-[#7C3AED] hover:bg-purple-700 text-white text-xs font-bold py-2 rounded-lg transition-all">
              START QUIZ (5 QUESTIONS)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BootcampProjects({ projects, activeProject, setActiveProject }) {
  return (
    <div className="flex gap-6">
      <div className="flex-1 space-y-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-white">Active Projects</h2>
          <select className="bg-white/5 border border-white/10 text-gray-400 text-xs rounded-lg px-2 py-1">
            <option>Sort by: Deadline</option>
          </select>
        </div>
        {projects.map((p, i) => (
          <div key={i} onClick={() => setActiveProject(p)}
            className={`bg-white/5 border rounded-xl p-4 cursor-pointer transition-all ${activeProject?.id === p.id ? "border-[#C7E36B]/50 bg-[#C7E36B]/5" : "border-white/10 hover:border-white/20"}`}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-[10px] text-gray-400 font-bold shrink-0">{p.id}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    p.status === "REVIEWED" ? "bg-blue-500/20 text-blue-400" :
                    p.status === "SUBMITTED" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-gray-500/20 text-gray-400"
                  }`}>{p.status}</span>
                </div>
                <p className="text-xs text-gray-400">{p.desc}</p>
                {p.grade && <p className="text-xs text-[#C7E36B] mt-1">Submitted {p.submitted} · GRADE: {p.grade}</p>}
                {p.deadline && <p className="text-xs text-orange-400 mt-1">📅 DEADLINE: {p.deadline}</p>}
                {p.quote && <p className="text-[11px] text-gray-500 italic mt-1">"{p.quote}"</p>}
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              {p.feedback && <button className="text-xs text-[#C7E36B] hover:underline">View Feedback →</button>}
              {p.status === "SUBMITTED" && <button className="text-xs text-gray-400 flex items-center gap-1"><Ic name="edit" size={12} />Edit Submission</button>}
              {p.status === "NOT STARTED" && <button className="text-xs bg-[#C7E36B] text-black font-bold px-3 py-1 rounded-lg hover:bg-lime-300">Start Project</button>}
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Panel */}
      {activeProject && (
        <div className="w-[280px] shrink-0 bg-white/5 border border-white/10 rounded-xl p-4 space-y-4 h-fit">
          <h3 className="text-sm font-semibold text-white">Project Details</h3>
          <div className="bg-[#C7E36B]/10 border border-[#C7E36B]/30 rounded-lg p-3">
            <p className="text-[10px] text-gray-400 mb-1">CURRENT SELECTION</p>
            <p className="text-sm font-bold text-white">{activeProject.title}</p>
            <div className="flex gap-2 mt-1">
              <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded">High Priority</span>
              <span className="text-[10px] text-gray-400">Est. time: 4-6 hours</span>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white mb-2">Requirements</h4>
            {["Minimum 2-minute original composition", "Must include at least 3 distinct emotional shifts", "Submission format: MP3 or WAV (320kbps)"].map((r, i) => (
              <div key={i} className="flex items-start gap-2 mb-1.5">
                <Ic name="check" size={12} className="text-gray-400 mt-0.5 shrink-0" />
                <p className="text-[11px] text-gray-400">{r}</p>
              </div>
            ))}
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white mb-2">Submit Your Work</h4>
            <div className="border-2 border-dashed border-white/20 rounded-xl p-4 text-center hover:border-[#C7E36B]/50 transition-all cursor-pointer">
              <Ic name="upload" size={20} className="mx-auto text-gray-500 mb-1" />
              <p className="text-[11px] text-gray-400">Click to upload or drag and drop</p>
              <p className="text-[10px] text-gray-500">Max file size: 50MB</p>
            </div>
            <input type="text" placeholder="Or paste a link (SoundCloud, Google Drive)" className="w-full mt-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#C7E36B]/50 placeholder-gray-600" />
          </div>
          <button className="w-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold py-2 rounded-lg transition-all">Submit Project</button>
          <div className="flex items-center gap-2 border-t border-white/10 pt-3">
            <div className="w-6 h-6 rounded-full bg-[#7C3AED] flex items-center justify-center text-white text-[10px] font-bold">S</div>
            <div>
              <p className="text-[11px] text-white font-semibold">Sarah Jenkins</p>
              <p className="text-[10px] text-green-400">Lead Mentor · Active now</p>
            </div>
            <button className="ml-auto text-gray-400 hover:text-[#C7E36B]"><Ic name="message" size={14} /></button>
          </div>
        </div>
      )}
    </div>
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

  useEffect(() => {
    fetch("/api/workshops").then(r => r.json())
      .then(d => { if (Array.isArray(d) && d.length > 0) setWorkshops(d); }).catch(() => {});
  }, []);

  const handleReserve = async (w) => {
    if (!w._id || w._id?.startsWith?.("m")) { alert("Booking coming soon!"); return; }
    setEnrolling(w._id);
    const res = await fetch(`/api/workshops/${w._id}/register`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    alert(res.ok ? "Spot reserved! Check your dashboard." : data.message);
    setEnrolling(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-black text-white mb-6">AI Filmmaking Workshop</h1>
      <div className="space-y-4">
        {workshops.map((w, i) => (
          <div key={i} className="bg-[#0F1112] border border-white/10 rounded-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row gap-1.5">
              <div className="w-full md:w-[240px] h-[160px] shrink-0 overflow-hidden rounded-tl-2xl">
                <img src={w.image} alt={w.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="bg-[#DCDCDC] rounded-tr-2xl px-4 py-3 flex items-center min-h-[80px]">
                  <h3 className="text-black font-black text-2xl md:text-3xl leading-tight">{w.title}</h3>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { label: "⏱ Duration", value: w.duration },
                    { label: "⊞ Pricing", value: w.price || `₹${w.price}` },
                    { label: "⌨ Mode", value: w.mode },
                  ].map(info => (
                    <div key={info.label} className="bg-[#DCDCDC] rounded-lg p-3">
                      <p className="text-[10px] text-gray-500 font-semibold uppercase mb-1">{info.label}</p>
                      <p className="text-sm font-bold text-gray-800">{info.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={() => handleReserve(w)} disabled={enrolling === w._id}
              className="w-full bg-[#C7E36B] text-black font-black text-base uppercase py-3 rounded-b-2xl hover:bg-lime-300 transition-all disabled:opacity-60 flex items-center justify-center gap-1">
              {enrolling === w._id ? "Reserving..." : "RESERVE SPOT"} <span className="text-xl">→</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   VIDEO COURSES SECTION
════════════════════════════════════════════ */
const ALL_COURSES = [
  { title: "AI Script Writing Masterclass", image: "/courses/v1.png", duration: "1h 10m", status: "all" },
  { title: "Animate Photos with AI", image: "/courses/v2.png", duration: "1h 20m", status: "all" },
  { title: "AI Avatar Masterclass", image: "/courses/v3.png", duration: "1h 10m", status: "all" },
  { title: "AI Fashion Model Creation", image: "/courses/v4.png", duration: "2h 00m", status: "mine", progress: 40 },
  { title: "Master AI Color Restoration", image: "/courses/v5.png", duration: "1h 30m", status: "mine", progress: 75 },
  { title: "AI Face Enhancement Masterclass", image: "/courses/v6.png", duration: "2h 15m", status: "completed" },
];

function VideoCoursesSection({ profile }) {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Newest");
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = ALL_COURSES.filter(c =>
    (tab === "all" ? true : tab === "my" ? c.status === "mine" : c.status === "completed") &&
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Tabs + Search + Sort */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex gap-1 bg-white/5 rounded-xl p-1">
          {[["all", "All Courses"], ["my", "My Courses"], ["completed", "Completed"]].map(([id, label]) => (
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
              Sort by: {sort} <Ic name="chevron" size={14} className={sortOpen ? "rotate-90" : ""} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 bg-[#1A1D1E] border border-white/10 rounded-xl overflow-hidden z-10 w-[180px]">
                {["Newest", "Price: Low to High", "Duration"].map(o => (
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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all">
            <div className="relative">
              <img src={c.image} alt={c.title} className="w-full h-[160px] object-cover" />
              <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">{c.duration}</span>
              {c.status === "completed" && (
                <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">Completed</div>
              )}
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold text-white mb-2">{c.title}</h3>
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
                  <button className="flex-1 text-xs border border-[#C7E36B] text-[#C7E36B] py-1.5 rounded-lg hover:bg-[#C7E36B]/10 transition-all">View Certificate</button>
                  <button className="flex-1 text-xs border border-white/20 text-gray-400 py-1.5 rounded-lg hover:bg-white/5 transition-all">View Again</button>
                </div>
              ) : c.progress !== undefined ? (
                <button className="w-full text-xs bg-[#7C3AED] hover:bg-purple-700 text-white py-1.5 rounded-lg transition-all font-semibold">Continue Learning</button>
              ) : (
                <button className="w-full text-xs border border-white/20 text-gray-400 py-1.5 rounded-lg hover:bg-white/5 transition-all">View Details</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   CERTIFICATES SECTION
════════════════════════════════════════════ */
const CERTS = [
  { type: "WORKSHOP", date: "Oct 24, 2023", title: "AI-Powered Cinematography & Lighting", desc: "Mastering generative light rigs and camera paths.", id: "AIFA-2023-08812" },
  { type: "BOOTCAMP", date: "Oct 23, 2023", title: "Advanced AI Video Editing & VFX", desc: "Professional workflows for AI-assisted post-production.", id: "AIFA-2023-88741" },
  { type: "COURSE", date: "Aug 05, 2023", title: "Prompt Engineering for Film Scripts", desc: "Generative storytelling and AI-driven structures.", id: "AIFA-2023-77610" },
];

function CertificatesSection() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">My Certificates</h1>
          <p className="text-gray-400 text-sm">Certificates earned from your courses</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 text-xs border border-white/20 text-gray-400 px-3 py-1.5 rounded-lg hover:bg-white/5">
            <Ic name="filter" size={14} />Filter by Type
          </button>
          <button className="flex items-center gap-1.5 text-xs border border-white/20 text-gray-400 px-3 py-1.5 rounded-lg hover:bg-white/5">
            <Ic name="sort" size={14} />Sort: Latest
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Earned", value: 6 },
          { label: "Courses Completed", value: 12 },
          { label: "Ongoing Courses", value: 3 },
        ].map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Cert Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CERTS.map((c, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all">
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-6 flex items-center justify-center h-[140px] relative">
              <div className="text-center">
                <div className="w-10 h-10 bg-[#C7E36B] rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-black font-black text-sm">A</span>
                </div>
                <p className="text-[10px] text-gray-400 uppercase font-semibold">Certificate of Achievement</p>
                <p className="text-[11px] text-white font-semibold mt-1">STUDENT NAME</p>
              </div>
            </div>
            <div className="p-4">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                c.type === "WORKSHOP" ? "bg-purple-500/20 text-purple-400" :
                c.type === "BOOTCAMP" ? "bg-blue-500/20 text-blue-400" :
                "bg-green-500/20 text-green-400"
              }`}>{c.type}</span>
              <p className="text-[10px] text-gray-500 mt-1">Earned on {c.date}</p>
              <h3 className="text-sm font-semibold text-white mt-2 mb-1">{c.title}</h3>
              <p className="text-[11px] text-gray-400 mb-3">{c.desc}</p>
              <p className="text-[10px] text-gray-500 mb-3">CERTIFICATE ID: {c.id}</p>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1 text-xs border border-white/20 text-gray-400 py-1.5 rounded-lg hover:bg-white/5 transition-all">
                  <Ic name="share" size={12} />Share
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 text-xs bg-[#C7E36B] text-black font-semibold py-1.5 rounded-lg hover:bg-lime-300 transition-all">
                  <Ic name="eye" size={12} />View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   JOBS SECTION
════════════════════════════════════════════ */
const JOBS_DATA = [
  { tag: "AI Film", title: "A 2 minute short AI film is needed", type: "PART-TIME", desc: "Create an AI-driven cinematic ad for a binary options trading platform, emphasizing clarity and strong user engagement.", budget: "$120 fixed", time: "1 hour ago" },
  { tag: "AI Film", title: "Create a cinematic AI short film", type: "PART-TIME", desc: "Create an AI-driven cinematic short film with strong storytelling, clear visuals, and smooth scene transitions for a professional output.", budget: "$10 per hour", time: "1 hour ago" },
  { tag: "AI Ads", title: "Build high-converting AI video ads", type: "FULL-TIME", desc: "Create an AI-driven cinematic ad focused on brand clarity, user engagement, and storytelling that improves conversions.", budget: "$3k to 5k per month", time: "1 hour ago" },
  { tag: "AI Story", title: "Develop an AI-powered story concept", type: "CONTRACT", desc: "Create an AI-driven narrative with engaging characters, structured flow, and emotional depth that connects well with the audience.", budget: "$700 fixed", time: "1 hour ago" },
  { tag: "AI Editing", title: "Edit cinematic videos using AI tools", type: "PART-TIME", desc: "Create an AI-driven cinematic edit with smooth transitions, proper pacing, and clean visuals that enhance overall video quality.", budget: "$120 fixed", time: "1 hour ago" },
  { tag: "AI Voice", title: "Generate realistic AI voiceovers", type: "PART-TIME", desc: "Create an AI-driven voiceover with natural tone, clear delivery, and emotional balance that matches the visuals perfectly.", budget: "$700 fixed", time: "1 hour ago" },
];

const TAG_COLORS = { "AI Film": "bg-[#C7E36B] text-black", "AI Ads": "bg-orange-400 text-black", "AI Story": "bg-pink-400 text-black", "AI Editing": "bg-blue-400 text-black", "AI Voice": "bg-purple-400 text-white" };

function JobsSection() {
  const [category, setCategory] = useState("All");
  const [budget, setBudget] = useState("All");
  const [timeline, setTimeline] = useState("All");

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="flex gap-3 mb-6">
        {[["Category", category, setCategory], ["Budget", budget, setBudget], ["Timeline", timeline, setTimeline]].map(([label, val, setter]) => (
          <select key={label} className="bg-white/5 border border-white/10 text-gray-300 text-sm rounded-xl px-4 py-2 outline-none hover:border-white/20 transition-all">
            <option>{label} ▼</option>
          </select>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {JOBS_DATA.map((j, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all flex flex-col">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full w-fit mb-2 ${TAG_COLORS[j.tag] || "bg-gray-500 text-white"}`}>{j.tag}</span>
            <h3 className="text-sm font-bold text-white mb-1">{j.title}</h3>
            <p className="text-[11px] text-gray-500 uppercase font-semibold mb-2">{j.type}</p>
            <p className="text-xs text-gray-400 flex-1 mb-3">{j.desc}</p>
            <button className="text-xs text-[#C7E36B] hover:underline text-left mb-3">View Details</button>
            <div className="flex items-center justify-between border-t border-white/10 pt-3">
              <span className="text-xs bg-white/10 text-white px-2.5 py-1 rounded-full font-semibold">{j.budget}</span>
              <span className="text-[11px] bg-white/10 text-gray-400 px-2.5 py-1 rounded-full">{j.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   BILLING & PAYMENTS SECTION
════════════════════════════════════════════ */
const PURCHASES = [
  { id: "#INV-2023-089", name: "Full-Stack Web Development", type: "Bootcamp", date: "Oct 24, 2023", amount: "$2,499.00", status: "Paid" },
  { id: "#INV-2023-088", name: "Advanced React Patterns", type: "Workshop", date: "Sep 12, 2023", amount: "$199.00", status: "Paid" },
  { id: "#INV-2023-087", name: "UI/UX Design Fundamentals", type: "Course", date: "Aug 05, 2023", amount: "$49.00", status: "Pending" },
];

function BillingSection({ onViewInvoice }) {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <div className="p-6 bg-[#F5F7FA] min-h-full">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Billing & Payments</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { icon: "💰", label: "Total Amount Spent", value: "$2,747.00" },
          { icon: "🛒", label: "Total Purchases", value: "3" },
          { icon: "📅", label: "Last Payment Date", value: "Oct 24, 2023" },
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
              {PURCHASES.map((p, i) => (
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
                      <div className="absolute right-6 top-8 bg-white border border-gray-100 rounded-xl shadow-lg z-10 overflow-hidden w-[160px]">
                        <button onClick={() => { onViewInvoice(p); setOpenMenu(null); }} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                          <Ic name="eye" size={14} className="text-gray-400" />View Invoice
                        </button>
                        <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
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
function InvoiceView({ item, onBack }) {
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
          <button className="flex items-center gap-2 text-sm border border-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100">
            <Ic name="print" size={14} />Print
          </button>
          <button className="flex items-center gap-2 text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800">
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
          <p className="text-sm font-bold text-gray-900">Alex Johnson</p>
          <p className="text-xs text-blue-500">alex.johnson@example.com</p>
          <p className="text-xs text-gray-500">Student ID: STU-994821</p>
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
          <div className="flex justify-between text-sm text-gray-500"><span>Tax (0%)</span><span>$0.00</span></div>
          <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-200 pt-2 mt-2"><span>Total</span><span>{item.amount}</span></div>
          <div className="flex justify-between text-sm text-green-600"><span>Amount Paid</span><span>-{item.amount}</span></div>
          <div className="flex justify-between text-sm font-bold text-gray-900"><span>Balance Due</span><span>$0.00</span></div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   PROFILE SECTION
════════════════════════════════════════════ */
function ProfileSection({ profile, token, onUpdated }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile?.name || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSave = async () => {
    setSaving(true); setMsg("");
    const res = await fetch("/api/users/me", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name, phone }),
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

  return (
    <div className="p-6 bg-[#F5F7FA] min-h-full">
      {/* Personal Info Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-900">Personal Information</h2>
          {!editing && (
            <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800">
              <Ic name="edit" size={14} />Edit
            </button>
          )}
        </div>

        {editing ? (
          <div>
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 rounded-full bg-[#C7E36B] flex items-center justify-center text-black text-2xl font-bold mb-3">
                {(name || profile?.name || "A")[0].toUpperCase()}
              </div>
              <button className="text-sm bg-[#C7E36B] text-black font-semibold px-4 py-1.5 rounded-lg hover:bg-lime-300">Change Picture</button>
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
            <div className="w-16 h-16 rounded-full bg-[#C7E36B] flex items-center justify-center text-black text-xl font-bold shrink-0">
              {(profile?.name || "A")[0].toUpperCase()}
            </div>
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
                <p className="text-sm text-gray-800">{profile?.phone || "+1 (555) 123-4567"}</p>
              </div>
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
function SettingsSection({ token }) {
  const [tab, setTab] = useState("password");
  const [current, setCurrent] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [prefs, setPrefs] = useState({ newCourses: true, workshopAlerts: true, progressEmails: false, promotions: true });
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
