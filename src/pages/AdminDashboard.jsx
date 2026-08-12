import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminInfluencers from "./admin/AdminInfluencers";

/* ─── INLINE SVG ICON ─── */
const Ic = ({ d, size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={d} />
  </svg>
);
const ICONS = {
  dashboard: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
  bootcamp: "M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z",
  workshop: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z",
  video: "M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 8l-7 4V7l7 4zm2-6.5l7 4-7 4V4.5z",
  cert: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z",
  jobs: "M20 6h-2.18c.07-.44.18-.88.18-1.36C18 2.51 15.5 0 12.36 0c-1.73 0-3.24.87-4.16 2.16L12 6.55l3.8-3.8c.4.4.7.86.9 1.37L13.13 8H20v12H4V8h3.13L5.97 6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z",
  resources: "M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z",
  community: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
  service: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.57 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.21.07-.47-.12-.61l-2.01-1.58z",
  sales: "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z",
  hire: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
  users: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
  membership: "M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z",
  payments: "M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z",
  enrolments: "M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v5l-1-.75L9 9V4zm9 16H6V4h1v9l3-2.25L13 13V4h5v16z",
  analytics: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z",
  bell: "M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z",
  search: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
  logout: "M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z",
  plus: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
  edit: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
  trash: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
  eye: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z",
  check: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
  chevron: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z",
  upload: "M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z",
  warning: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z",
  back: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z",
  copy: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z",
  link: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z",
  settings: "M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.92c.04-.34.07-.68.07-1.08s-.03-.74-.07-1.08l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.34-.07.69-.07 1.08s.03.74.07 1.08l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.58 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65z",
  videocam: "M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z",
  checkCircle: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  clipboardCheck: "M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z",
  clock: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z",
};
const I = ({ name, size = 16, className = "" }) => <Ic d={ICONS[name] || ICONS.dashboard} size={size} className={className} />;

const NAV_ITEMS = [
  { id: "dashboard",          label: "Dashboard",         icon: "dashboard" },
  { id: "bootcamp",           label: "Bootcamp",          icon: "bootcamp"  },
  { id: "workshops",          label: "Workshops",         icon: "workshop"  },
  { id: "video-courses",      label: "Video Courses",     icon: "video"     },
  { id: "certificates",       label: "Certificates",      icon: "cert"      },
  { id: "resources",          label: "Resources",         icon: "resources" },
  { id: "community",          label: "Community",         icon: "community" },
  { id: "service-request",    label: "Service Request",   icon: "service"   },
  { id: "sales-consultation", label: "Sales Consultation",icon: "sales"     },
  { id: "hire-talent",        label: "Hire Requests",     icon: "hire"      },
];
const MGMT_ITEMS = [
  { id: "users",       label: "Users",       icon: "users"      },
  { id: "membership",  label: "Membership",  icon: "membership" },
  { id: "enrolments",  label: "Enrolments",  icon: "enrolments" },
  { id: "influencers", label: "Influencers", icon: "community"  },
];

/* ═══════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════ */
export default function AdminDashboard() {
  const [activePage, _setActivePage] = useState(() => sessionStorage.getItem("adminPage") || "dashboard");
  const setPage = (p) => { sessionStorage.setItem("adminPage", p); _setActivePage(p); };
  const [profile, setProfile] = useState(null);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [adminNotifs, setAdminNotifs] = useState([]);
  const [adminNotifCount, setAdminNotifCount] = useState(0);

  const navigate = useNavigate();
  const token = localStorage.getItem("aifa_token");
  const user = JSON.parse(localStorage.getItem("aifa_user") || "{}");

  useEffect(() => {
    if (!token || user.role !== "admin") return;
    const load = () => {
      fetch("/api/notifications", { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.ok ? r.json() : [])
        .then(d => {
          if (Array.isArray(d)) {
            setAdminNotifs(d.slice(0, 8));
            setAdminNotifCount(d.filter(n => !n.isRead).length);
          }
        })
        .catch(() => {});
    };
    load();
    const interval = setInterval(load, 60000);
    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    if (!token) { navigate("/adminlogin"); return; }
    if (user.role !== "admin") { navigate("/dashboard"); return; }
    fetch("/api/users/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setProfile).catch(() => {});
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("aifa_token");
    localStorage.removeItem("aifa_user");
    navigate("/");
  };

  const name = profile?.name || user?.name || "Alex Rivera";

  return (
    <div className="flex h-screen bg-[#0B0F10] text-white overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-[160px] shrink-0 bg-[#0F1112] border-r border-white/5 flex flex-col">
        <div className="px-4 py-5 border-b border-white/5">
          <img src="/logos/aifabetalogo.svg" alt="AIFA" className="h-5" onError={e => { e.target.style.display='none'; }} />
          <span className="text-white font-black text-sm">AIFA</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {[...NAV_ITEMS, { _divider: true }, ...MGMT_ITEMS].map((item, idx) => {
            if (item._divider) return <p key="div" className="text-[9px] text-gray-600 font-bold uppercase px-3 pt-3 pb-1 tracking-wider">Management</p>;
            return (
              <button key={item.id} onClick={() => !item.soon && setPage(item.id)}
                disabled={item.soon} title={item.soon ? "Coming soon" : undefined}
                className={`w-full flex items-center justify-between px-3 py-2 text-left text-[11px] font-medium transition-all ${item.soon ? "text-gray-600 cursor-not-allowed" : activePage === item.id ? "bg-[#C7E36B]/10 text-[#C7E36B] border-r-2 border-[#C7E36B]" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
                <span className="flex items-center gap-2"><I name={item.icon} size={13} />{item.label}</span>
                {item.soon && <span className="text-[8px] bg-white/10 text-gray-600 font-bold px-1 py-0.5 rounded">SOON</span>}
              </button>
            );
          })}
        </nav>
        <div onClick={() => setPage("profile")} className="border-t border-white/5 px-3 py-3 flex items-center gap-2 hover:bg-white/5 transition-all w-full text-left cursor-pointer">
          <div className="w-7 h-7 rounded-full overflow-hidden shrink-0">
            {profile?.profilePicture
              ? <img src={profile.profilePicture} alt="avatar" className="w-full h-full object-cover" />
              : <span className="w-full h-full bg-[#C7E36B] flex items-center justify-center text-black text-xs font-bold">{name[0]}</span>
            }
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] text-white font-semibold truncate">{name}</p>
            <p className="text-[9px] text-gray-500">Super Admin</p>
          </div>
          <button onClick={e => { e.stopPropagation(); handleLogout(); }} title="Logout" className="text-gray-500 hover:text-red-400 shrink-0"><I name="logout" size={12} /></button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-[#0F1112] border-b border-white/5 px-6 py-3 flex items-center justify-between shrink-0">
          <div className="relative">
            <input type="text" placeholder="Search platform..." className="bg-white/5 border border-white/10 rounded-lg pl-8 pr-4 py-1.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#C7E36B]/50 w-[240px]" />
            <I name="search" size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
          <div className="flex items-center gap-3 relative">
            {/* Bell icon with dropdown */}
            <div className="relative">
              <button onClick={()=>{ setShowNotifPanel(v=>!v); setShowProfileMenu(false);
                if(!showNotifPanel) {
                  fetch("/api/notifications",{headers:{Authorization:`Bearer ${token}`}}).then(r=>r.json()).then(d=>{
                    if(Array.isArray(d)) {
                      setAdminNotifs(d.slice(0,8));
                      setAdminNotifCount(0);
                    }
                  }).catch(()=>{});
                }
              }} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 relative transition-all">
                <I name="bell" size={16} className="text-gray-400" />
                {adminNotifCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center px-0.5">
                    {adminNotifCount}
                  </span>
                )}
              </button>
              {showNotifPanel && (
                <div className="absolute right-0 top-full mt-2 w-[340px] bg-[#0F1112] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                    <p className="text-sm font-bold text-white">Notifications</p>
                    <button onClick={()=>setShowNotifPanel(false)} className="text-gray-400 hover:text-white text-lg leading-none">✕</button>
                  </div>
                  <div className="max-h-[380px] overflow-y-auto divide-y divide-white/5">
                    {adminNotifs.length === 0
                      ? <p className="text-gray-500 text-xs text-center py-8">No notifications yet</p>
                      : adminNotifs.map((n,i) => (
                        <div key={i} className="px-4 py-3 hover:bg-white/5 transition-all">
                          <p className="text-xs font-semibold text-white">{n.title}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-2">{n.message}</p>
                          <p className="text-[10px] text-gray-600 mt-1">{n.createdAt ? new Date(n.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}) : ""}</p>
                        </div>
                      ))
                    }
                  </div>
                  <div className="px-4 py-2 border-t border-white/10">
                    <button onClick={()=>{ setShowNotifPanel(false); setPage("platform-settings"); }} className="text-xs text-[#C7E36B] hover:underline">Manage Notifications →</button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile avatar with dropdown */}
            <div className="relative">
              <button onClick={()=>{ setShowProfileMenu(v=>!v); setShowNotifPanel(false); }} className="w-8 h-8 rounded-full overflow-hidden shrink-0 hover:ring-2 hover:ring-[#C7E36B]/50 transition-all">
                {profile?.profilePicture
                  ? <img src={profile.profilePicture} alt="avatar" className="w-full h-full object-cover" />
                  : <span className="w-full h-full bg-[#C7E36B] flex items-center justify-center text-black font-bold text-sm">{name[0]}</span>
                }
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-2 w-[200px] bg-[#0F1112] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-sm font-bold text-white">{name}</p>
                    <p className="text-[10px] text-gray-400">{profile?.email || user?.email}</p>
                    <span className="text-[9px] bg-[#C7E36B]/20 text-[#C7E36B] font-bold px-2 py-0.5 rounded-full mt-1 inline-block">Super Admin</span>
                  </div>
                  <div className="py-1">
                    <button onClick={()=>{ setShowProfileMenu(false); setPage("profile"); }} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 flex items-center gap-2"><I name="edit" size={13}/>Edit Profile</button>
                    <button onClick={()=>{ setShowProfileMenu(false); setPage("platform-settings"); }} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 flex items-center gap-2"><I name="settings" size={13}/>Settings</button>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2"><I name="logout" size={13}/>Logout</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {activePage === "dashboard"       && <AdminOverview token={token} onNavigate={setPage} />}
          {activePage === "bootcamp"        && <BootcampAdmin token={token} />}
          {activePage === "workshops"       && <WorkshopsAdmin token={token} />}
          {activePage === "video-courses"   && <VideoCoursesAdmin token={token} />}
          {activePage === "resources"       && <ResourcesAdmin token={token} />}
          {activePage === "users"           && <UsersAdmin token={token} />}
          {activePage === "payments"        && <PaymentsAdmin token={token} />}
          {activePage === "enrolments"      && <EnrolmentsAdmin token={token} />}
          {activePage === "certificates"    && <CertificatesAdmin token={token} />}
          {activePage === "jobs"            && <JobsAdmin token={token} />}
          {activePage === "profile"         && <AdminProfile token={token} profile={profile} onUpdated={setProfile} />}
          {activePage === "community"         && <CommunityAdmin token={token} adminName={name} />}
          {activePage === "service-request"    && <ServiceRequestAdmin token={token} />}
          {activePage === "sales-consultation" && <SalesConsultAdmin token={token} />}
          {activePage === "hire-talent"        && <HireTalentAdmin token={token} />}
          {activePage === "membership"         && <MembershipAdmin token={token} />}
          {activePage === "influencers"        && <AdminInfluencers token={token} />}
          {activePage === "platform-settings"  && <PlatformSettings token={token} />}
        </main>
      </div>
    </div>
  );
}

/* ── ADMIN OVERVIEW ── */
function AdminOverview({ token, onNavigate }) {
  const [stats, setStats]     = useState({});
  const [recentTxs, setRecentTxs] = useState([]);

  useEffect(() => {
    const h = { Authorization:`Bearer ${token}` };
    fetch("/api/admin/stats",              { headers:h }).then(r=>r.json()).then(d=>{ if(!d.message) setStats(d); }).catch(()=>{});
    fetch("/api/admin/enrollments/recent", { headers:h }).then(r=>r.json()).then(d=>{ if(Array.isArray(d)) setRecentTxs(d); }).catch(()=>{});
  }, [token]);

  /* Format revenue with commas */
  const fmtRev = v => `₹${Number(v||0).toLocaleString("en-IN")}`;
  const pad2   = n => String(n||0).padStart(2,"0");

  const topCards = [
    {
      label: "TOTAL REVENUE",
      value: fmtRev(stats.revenue ?? 0),
      icon: "payments",
      iconBg: "bg-[#6B21A8]",
      iconColor: "text-white",
    },
    {
      label: "TOTAL ENROLLMENTS",
      value: Number(stats.enrollments ?? 0).toLocaleString("en-IN"),
      icon: "users",
      iconBg: "bg-[#1D4ED8]",
      iconColor: "text-white",
    },
    {
      label: "ACTIVE BOOTCAMPS",
      value: pad2(stats.bootcamps ?? 0),
      icon: "bootcamp",
      iconBg: "bg-[#4338CA]",
      iconColor: "text-white",
    },
    {
      label: "ACTIVE WORKSHOPS",
      value: pad2(stats.workshops ?? 0),
      icon: "workshop",
      iconBg: "bg-[#B45309]",
      iconColor: "text-white",
    },
  ];

  const quickActions = [
    { label: "Add Bootcamp",    sub: "Setup a new cohort",    icon: "plus",    page: "bootcamp"      },
    { label: "Upload Course",   sub: "Add video lessons",     icon: "upload",  page: "video-courses" },
    { label: "Create Workshop", sub: "Schedule live session", icon: "videocam",page: "workshops"     },
  ];

  /* Build activity feed */
  const activity = recentTxs.slice(0, 5).map((tx, i) => {
    const kind = i % 3;
    return {
      icon:  kind === 0 ? "users" : kind === 1 ? "payments" : "cert",
      color: kind === 0 ? "bg-[#C7E36B] text-black" : kind === 1 ? "bg-blue-500 text-white" : "bg-purple-500 text-white",
      text:  kind === 0 ? `${tx.user?.name || "A student"} enrolled in ${tx.itemTitle || "a course"}`
           : kind === 1 ? `Payment received from ${tx.user?.name || "a student"}`
                        : `Certificate issued to ${tx.user?.name || "a student"}`,
      amount: kind === 1 ? `+₹${tx.amount || 0}` : null,
      time: tx.createdAt ? new Date(tx.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—",
    };
  });
  if (activity.length === 0) {
    activity.push(
      { icon: "users",    color: "bg-[#C7E36B] text-black",      text: "No recent activity yet", amount: null, time: "—" },
    );
  }

  return (
    <div className="p-6 space-y-5">
      {/* 4 stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {topCards.map(s => (
          <div key={s.label} className="bg-[#111315] border border-white/10 rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl ${s.iconBg} flex items-center justify-center mb-4`}>
              <I name={s.icon} size={20} className={s.iconColor} />
            </div>
            <p className="text-[10px] font-bold text-gray-500 tracking-widest mb-1.5">{s.label}</p>
            <p className="text-3xl font-black text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions (left) + Recent Activity (right) */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-4">
        {/* Quick Actions — stacked vertically */}
        <div className="space-y-4">
          {quickActions.map(({ label, sub, icon, page }) => (
            <button key={label} onClick={() => onNavigate(page)}
              className="w-full bg-[#111315] border border-white/10 rounded-2xl p-5 flex items-center gap-5 hover:border-white/25 transition-all group text-left">
              <div className="w-14 h-14 rounded-full bg-white/8 flex items-center justify-center shrink-0 group-hover:bg-white/12 transition-colors">
                <I name={icon} size={24} className="text-[#C7E36B]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-bold text-white">{label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
              </div>
              <span className="text-gray-500 group-hover:text-[#C7E36B] transition-colors text-lg shrink-0">→</span>
            </button>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-[#111315] border border-white/10 rounded-2xl p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">Recent Activity</h3>
            <button onClick={() => onNavigate("enrolments")} className="text-xs text-[#C7E36B] hover:underline">View All</button>
          </div>
          <div className="flex-1 space-y-4">
            {activity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full ${a.color} flex items-center justify-center shrink-0 mt-0.5`}>
                  <I name={a.icon} size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-white leading-snug line-clamp-2">{a.text}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{a.time}</p>
                </div>
                {a.amount && <span className="text-[10px] font-bold text-green-400 shrink-0">{a.amount}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── PROJECTS TAB (extracted to avoid hook-inside-render issues) ── */
function ProjTab({ selProj, setSelProj, localProj, setLocalProj, projSaved, setProjSaved, projFileRef, projects, setProjects, bootcampId, token }) {
  const h = { Authorization:`Bearer ${token}` };
  /* Map DB field names (requirements/resources) to local keys (req/res) */
  useEffect(() => {
    if (!selProj) { setLocalProj(null); return; }
    setLocalProj({
      ...selProj,
      req: selProj.requirements || selProj.req || [],
      res: selProj.resources   || selProj.res || [],
    });
  }, [selProj?._id]);

  const [addingProj, setAddingProj] = useState(false);
  const handleAdd = async () => {
    if (addingProj) return; // prevent double-click
    setAddingProj(true);
    const no = `PROJECT ${String((projects.length || 0) + 1).padStart(2,"0")}`;
    try {
      const res = await fetch(`/api/bootcamps/${bootcampId}/projects`, {
        method:"POST", headers:{...h,"Content-Type":"application/json"},
        body: JSON.stringify({ no, title:"New Project", desc:"", requirements:[], resources:[] }),
      });
      if (res.ok) {
        const d = await res.json();
        const mapped = { ...d, req: [], res: [] };
        setProjects(prev=>[...prev, mapped]);
        setSelProj(mapped);
      }
    } finally {
      setAddingProj(false);
    }
  };

  const handleSave = async () => {
    if (!localProj?._id) return;
    await fetch(`/api/bootcamps/${bootcampId}/projects/${localProj._id}`, {
      method:"PUT", headers:{...h,"Content-Type":"application/json"},
      body: JSON.stringify({
        no: localProj.no, title: localProj.title, desc: localProj.desc,
        requirements: localProj.req || [],
        resources: (localProj.res || []).map(r => typeof r === "string" ? { name:r, size:"—", fileType:"PDF" } : r),
      }),
    });
    setProjects(prev => prev.map(p => p._id === localProj._id ? { ...localProj } : p));
    setProjSaved(true);
    setTimeout(() => setProjSaved(false), 2000);
  };

  const displayList = projects;

  return (
    <div className="flex gap-5 h-full">
      <div className="w-[260px] shrink-0 space-y-2">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">Projects <span className="text-gray-600 text-[10px]">({displayList.length})</span></h3>
          <button onClick={handleAdd} disabled={addingProj} className="text-xs bg-[#C7E36B] text-black font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed">{addingProj ? "Adding..." : <><I name="plus" size={12}/>Add</>}</button>
        </div>
        {displayList.length === 0 ? (
          <p className="text-gray-600 text-xs text-center py-6">No projects yet. Click "+ Add" to create one.</p>
        ) : displayList.map((p,i)=>(
          <div key={p._id||i} onClick={()=>setSelProj(p)} className={`p-3 border rounded-xl cursor-pointer transition-all relative group ${selProj?._id===p._id||selProj?.no===p.no?"border-[#C7E36B]/50 bg-[#C7E36B]/5":"border-white/10 bg-[#0F1112] hover:border-white/20"}`}>
            <p className="text-[10px] text-gray-400 font-semibold uppercase">{p.no}</p>
            <p className="text-xs font-bold text-white mt-0.5 pr-6">{p.title}</p>
            <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">{p.desc}</p>
            {p._id && (
              <button
                onClick={async e => {
                  e.stopPropagation();
                  if (!window.confirm("Delete this project?")) return;
                  await fetch(`/api/bootcamps/${bootcampId}/projects/${p._id}`, { method:"DELETE", headers:{ Authorization:`Bearer ${token}` } });
                  setProjects(prev => prev.filter(x => x._id !== p._id));
                  if (selProj?._id === p._id) setSelProj(null);
                }}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition-all"
                title="Delete project"
              >
                <I name="trash" size={13}/>
              </button>
            )}
          </div>
        ))}
      </div>
      {localProj&&(
        <div className="flex-1 bg-[#0F1112] border border-white/10 rounded-xl p-5 space-y-5 overflow-y-auto">
          <input type="file" ref={projFileRef} className="hidden" multiple
            onChange={e=>{
              const files=Array.from(e.target.files||[]);
              if(!files.length) return;
              setLocalProj(p=>({...p,res:[...(p.res||[]),...files.map(f=>({name:f.name,size:Math.round(f.size/1024)+"KB",fileType:f.name.split(".").pop().toUpperCase()}))]}));
              e.target.value="";
            }}/>
          <div className="grid grid-cols-2 gap-4">
            <Fld label="Project Number" value={localProj.no||""} onChange={v=>setLocalProj(p=>({...p,no:v}))} />
            <Fld label="Project Title" value={localProj.title||""} onChange={v=>setLocalProj(p=>({...p,title:v}))} />
          </div>
          <Fld label="Description" value={localProj.desc||""} onChange={v=>setLocalProj(p=>({...p,desc:v}))} textarea />
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] text-gray-400 font-semibold uppercase">Requirements</p>
              <button onClick={()=>setLocalProj(p=>({...p,req:[...(p.req||[]),""]}))} className="text-[10px] text-[#C7E36B] flex items-center gap-1"><I name="plus" size={11}/>Add Requirement</button>
            </div>
            <div className="space-y-2">
              {(localProj.req||[]).map((r,i)=>(
                <div key={i} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                  <I name="check" size={13} className="text-[#C7E36B] shrink-0"/>
                  <input
                    value={typeof r==="string"?r:r.text||""}
                    onChange={e=>setLocalProj(p=>({...p,req:(p.req||[]).map((x,j)=>j===i?e.target.value:x)}))}
                    className="text-xs text-white flex-1 bg-transparent outline-none border-b border-transparent focus:border-[#C7E36B]/50 transition-colors placeholder-gray-600"
                    placeholder="Enter requirement..."
                  />
                  <button onClick={()=>setLocalProj(p=>({...p,req:(p.req||[]).filter((_,j)=>j!==i)}))} className="text-gray-500 hover:text-red-400 shrink-0"><I name="trash" size={13}/></button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] text-gray-400 font-semibold uppercase">Project Downloads</p>
              <button onClick={()=>projFileRef.current?.click()} className="text-[10px] text-[#C7E36B] flex items-center gap-1"><I name="upload" size={11}/>Upload File</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(localProj.res||[]).length===0&&(
                <div className="col-span-2 border-2 border-dashed border-white/20 rounded-lg py-8 text-center cursor-pointer hover:border-[#C7E36B]/40 transition-all" onClick={()=>projFileRef.current?.click()}>
                  <p className="text-2xl mb-2">📎</p>
                  <p className="text-gray-400 text-xs font-semibold">No files uploaded yet.</p>
                  <p className="mt-1.5 text-[10px] text-[#C7E36B] font-bold underline">Click to upload files</p>
                </div>
              )}
              {(localProj.res||[]).map((f,i)=>(
                <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                  <span className="text-lg">📄</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white truncate">{typeof f==="string"?f:f.name||f}</p>
                    {(f.size||f.fileType)&&<p className="text-[10px] text-gray-500">{f.fileType||""} {f.size||""}</p>}
                  </div>
                  <button onClick={()=>setLocalProj(p=>({...p,res:(p.res||[]).filter((_,j)=>j!==i)}))} className="text-gray-500 hover:text-red-400 shrink-0"><I name="trash" size={12}/></button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <button onClick={()=>setLocalProj(selProj)} className="flex-1 border border-white/20 text-gray-300 text-xs font-semibold py-2 rounded-lg hover:bg-white/5">Discard</button>
            <button onClick={handleSave} className="flex-1 bg-[#C7E36B] text-black text-xs font-bold py-2 rounded-lg hover:bg-lime-300">Save Project</button>
            {projSaved&&<span className="text-green-400 text-xs font-semibold whitespace-nowrap">✓ Project saved!</span>}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── BOOTCAMP LIST SUB-COMPONENT ── */
function ListBootcampAdmin({ onSelect, token }) {
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy]             = useState("Default");
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowCreateModal(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);
  const [createSuccess, setCreateSuccess]     = useState(false);
  const [newBC, setNewBC] = useState({name:"",code:"",price:"",duration:"",status:"ACTIVE"});
  const [bootcamps, setBootcamps] = useState([]);
  const [loadingBC, setLoadingBC] = useState(true);

  const loadBCs = () => {
    fetch("/api/bootcamps/all", { headers:{ Authorization:`Bearer ${token}` } })
      .then(r => r.ok ? r.json() : [])
      .then(d => { if (Array.isArray(d)) setBootcamps(d); setLoadingBC(false); })
      .catch(() => setLoadingBC(false));
  };
  useEffect(() => { loadBCs(); }, [token]);

  const cards = bootcamps.map(b => ({
    _id: b._id, code: b.batchCode || "B??", title: b.title,
    desc: b.description || "", students: b.enrollments?.length || b.enrolledCount || 0,
    price: b.price ? `₹${b.price.toLocaleString("en-IN")}` : "—",
    duration: b.duration || "—",
    status: b.isPublished ? "ACTIVE" : (b.status || "COMING SOON"),
    raw: b,
  }));

  const filtered = cards
    .filter(b => statusFilter === "All" || b.status === statusFilter)
    .sort((a,b) => sortBy === "Name A-Z" ? a.title.localeCompare(b.title) : sortBy === "Students" ? b.students - a.students : 0);

  return (
    <div className="flex flex-col">
      {/* A: Create Bootcamp Modal */}
      {showCreateModal&&(
        <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-16 px-4" onClick={()=>setShowCreateModal(false)}>
          <div className="bg-[#0F1112] border border-white/10 rounded-2xl p-6 w-full max-w-lg" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <p className="text-white font-bold">Create New Bootcamp</p>
              <button onClick={()=>setShowCreateModal(false)} className="text-gray-400 hover:text-white text-xl leading-none">✕</button>
            </div>
            <div className="space-y-4">
              <Fld label="Bootcamp Name" value={newBC.name} onChange={v=>setNewBC(b=>({...b,name:v}))} placeholder="AI Filmmaking Bootcamp"/>
              <div className="grid grid-cols-2 gap-4">
                <Fld label="Batch Code" value={newBC.code} onChange={v=>setNewBC(b=>({...b,code:v}))} placeholder="B04"/>
                <Fld label="Price in ₹" value={newBC.price} onChange={v=>setNewBC(b=>({...b,price:v}))} placeholder="₹6,499"/>
              </div>
              <Fld label="Duration" value={newBC.duration} onChange={v=>setNewBC(b=>({...b,duration:v}))} placeholder="12 Weeks"/>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-semibold mb-2">Status</p>
                <div className="flex gap-2">
                  {["ACTIVE","COMING SOON"].map(s=>(
                    <button key={s} onClick={()=>setNewBC(b=>({...b,status:s}))} className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-all ${newBC.status===s?"bg-[#C7E36B] text-black border-[#C7E36B]":"border-white/20 text-gray-400 hover:border-white/40"}`}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={()=>setShowCreateModal(false)} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg hover:bg-white/5">CANCEL</button>
              <button onClick={async()=>{
                if (!newBC.name.trim()) { alert("Bootcamp name is required."); return; }
                try {
                  const res = await fetch("/api/bootcamps", {
                    method: "POST",
                    headers: { "Content-Type":"application/json", Authorization:`Bearer ${token}` },
                    body: JSON.stringify({
                      title: newBC.name,
                      batchCode: newBC.code,
                      price: Number(newBC.price) || 0,
                      duration: newBC.duration,
                      isPublished: newBC.status === "ACTIVE",
                      description: "",
                    }),
                  });
                  if (res.ok) {
                    const created = await res.json();
                    setBootcamps(prev => [...prev, created]);
                    setShowCreateModal(false);
                    setCreateSuccess(true);
                    setTimeout(() => setCreateSuccess(false), 3000);
                    setNewBC({ name:"", code:"", price:"", duration:"", status:"ACTIVE" });
                    setStatusFilter("All"); // reset filter so new bootcamp is visible
                  } else {
                    const d = await res.json();
                    alert(d.message || "Failed to create bootcamp.");
                  }
                } catch { alert("Network error. Please try again."); }
              }} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300">CREATE BOOTCAMP</button>
            </div>
          </div>
        </div>
      )}
      <div className="px-6 pt-5 pb-4 border-b border-white/5 flex items-center justify-between">
        <div><h1 className="text-xl font-bold text-white">Bootcamps</h1><p className="text-xs text-gray-400">Manage and monitor all bootcamp programs.</p></div>
        <button onClick={()=>setShowCreateModal(true)} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300 flex items-center gap-1.5"><I name="plus" size={14}/>Create Bootcamp</button>
      </div>
      {createSuccess&&<div className="mx-6 mt-3 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2.5 text-green-400 text-xs font-semibold">✓ Bootcamp created successfully!</div>}
      <div className="p-6 grid grid-cols-4 gap-4 border-b border-white/5">
        {[
          {icon:"users",   label:"TOTAL STUDENTS",   val: bootcamps.reduce((s,b)=>s+(b.enrollments?.length||b.enrolledCount||0),0)},
          {icon:"payments",label:"TOTAL REVENUE",     val: "₹"+bootcamps.reduce((s,b)=>s+((b.price||0)*(b.enrollments?.length||b.enrolledCount||0)),0).toLocaleString("en-IN")},
          {icon:"bootcamp",label:"TOTAL BOOTCAMPS",   val: bootcamps.length},
          {icon:"check",   label:"ACTIVE BOOTCAMPS",  val: bootcamps.filter(b=>b.isPublished).length},
        ].map(s=>(
          <div key={s.label} className="bg-[#0F1112] border border-white/10 rounded-xl p-4">
            <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center mb-3"><I name={s.icon} size={18} className="text-gray-400"/></div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">{s.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{s.val}</p>
          </div>
        ))}
      </div>
      <div className="p-6">
        {/* Gap 2: Status + Sort filters */}
        <div className="flex items-center gap-3 mb-5">
          <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="bg-[#0F1112] border border-white/10 text-gray-400 text-xs rounded-lg px-3 py-1.5 outline-none hover:border-white/20">
            {["All","ACTIVE","COMPLETED","COMING SOON"].map(o=><option key={o}>{o}</option>)}
          </select>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)} className="bg-[#0F1112] border border-white/10 text-gray-400 text-xs rounded-lg px-3 py-1.5 outline-none hover:border-white/20">
            {["Default","Name A-Z","Students"].map(o=><option key={o}>{o}</option>)}
          </select>
          <span className="text-[10px] text-gray-600">{filtered.length} of {bootcamps.length} bootcamps</span>
        </div>
        {loadingBC ? (
          <AdminLoader label="Loading Bootcamps" />
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-sm">No bootcamps found. Create your first one!</div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filtered.map(b=>(
              <div key={b._id} onClick={()=>onSelect(b.raw || b)} className="bg-[#0F1112] border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-[#C7E36B]/40 transition-all">
                <div className="relative h-[110px] bg-white/5 flex items-center justify-center">
                  <span className="text-5xl font-black text-white/20 tracking-wider">{b.code}</span>
                  <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${BC_ST[b.status]||"bg-gray-500/20 text-gray-400"}`}>{b.status}</span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-white mb-1">{b.title}</h3>
                  <p className="text-[11px] text-gray-400 mb-4 line-clamp-2">{b.desc}</p>
                  <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-3">
                    {[["Students",b.students],["Price",b.price],["Duration",b.duration]].map(([l,v])=>(
                      <div key={l}><p className="text-[10px] text-gray-500 uppercase">{l}</p><p className="text-xs font-bold text-white mt-0.5">{v}</p></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── BOOTCAMP ADMIN ── */
const BC_ST={ACTIVE:"bg-yellow-500/20 text-yellow-400",COMPLETED:"bg-green-500/20 text-green-400",CANCELLED:"bg-red-500/20 text-red-400","COMING SOON":"bg-gray-500/20 text-gray-400",DROPPED:"bg-red-500/20 text-red-400",PUBLISHED:"bg-green-500/20 text-green-400",SCHEDULED:"bg-yellow-500/20 text-yellow-400",DRAFT:"bg-gray-500/20 text-gray-400"};
/* All BC_CARDS / BC_SESS / BC_STUDS / BC_PROJS_DATA / BC_ANNS_DATA / BC_RESS removed — data comes from API only */
function BootcampAdmin({ token }) {
  const [view,setView]=useState("list");
  const [sel,setSel]=useState(null);
  const [tab,setTab]=useState("overview");
  const [selProj,setSelProj]=useState(null);
  const [selAnn,setSelAnn]=useState(null);
  const [annF,setAnnF]=useState({title:"",content:""});
  const [stgs,setStgs]=useState({name:"AI Filmmaking Bootcamp",code:"B01",startDate:"2024-10-01",endDate:"2025-01-31",status:"ACTIVE",price:"",originalPrice:"",zoomLink:"",zoomId:"",zoomPass:"",autoRecord:true,reminders:true,chat:true});
  const [mentors,setMentors]=useState([]);
  const [newMentor,setNewMentor]=useState("");
  /* Feature 5: sessions modal + search */
  const [editSession,setEditSession]=useState(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setEditSession(null);
        setShowAddSession(false);
        setViewStudent(null);
        setEditStudent(null);
        setShowAddStudent(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);
  const [sessSearch,setSessSearch]=useState("");
  const [sessStatusFilter,setSessStatusFilter]=useState("All Status");
  /* Feature 7A: students filter/sort */
  const [studStatus,setStudStatus]=useState("All Status");
  const [studSort,setStudSort]=useState("Latest Joined");
  /* Feature 7B: announcement search */
  const [annSearch,setAnnSearch]=useState("");
  /* Feature 7C: per-section save feedback */
  const [savedBatch,setSavedBatch]=useState(false);
  const [savedZoom,setSavedZoom]=useState(false);
  const save = (setter) => { setter(true); setTimeout(()=>setter(false),2000); };
  /* C: real sessions from API */
  const [sessions,setSessions]=useState([]);
  const [sessLoading,setSessLoading]=useState(false);
  /* D: real students from API */
  const [students,setStudents]=useState([]);
  /* E: Add Session modal */
  const [showAddSession,setShowAddSession]=useState(false);
  const [newSess,setNewSess]=useState({name:"",status:"COMING SOON"});
  const [sessAdded,setSessAdded]=useState(false);
  /* F: real announcements from API */
  const [annsLoading,setAnnsLoading]=useState(false);
  /* G: Edit Details modal resources + recording + status */
  const [modalResources,setModalResources]=useState([]);
  const [modalRecordingUrl,setModalRecordingUrl]=useState("");
  const [modalStatus,setModalStatus]=useState("COMING SOON");
  /* H: View Student */
  const [viewStudent,setViewStudent]=useState(null);
  /* I: Edit Student */
  const [editStudent,setEditStudent]=useState(null);
  const [editStudNote,setEditStudNote]=useState("");
  const [editStudStatus,setEditStudStatus]=useState("ACTIVE");
  /* Add Student modal */
  const [showAddStudent,setShowAddStudent]=useState(false);
  const [addStudentEmail,setAddStudentEmail]=useState("");
  const [addStudentMsg,setAddStudentMsg]=useState({text:"",type:""});
  /* J/K/L/M: Projects */
  const [localProj,setLocalProj]=useState(null);
  const [projSaved,setProjSaved]=useState(false);
  const projFileRef=useRef(null);
  /* N: Resources upload */
  const resFileRef=useRef(null);
  const [annFiles,setAnnFiles]=useState([]);
  const [annSaving,setAnnSaving]=useState(false);
  const [annSavedMsg,setAnnSavedMsg]=useState("");
  /* O: Create Folder */
  const [showFolderInput,setShowFolderInput]=useState(false);
  const [folderName,setFolderName]=useState("");
  const [folderSaved,setFolderSaved]=useState(false);
  /* Resources list for the Resources tab */
  const [resources,setResources]=useState([]);
  const h = { Authorization:`Bearer ${token}` };

  /* Sync modal fields whenever a session is opened for editing */
  useEffect(() => {
    if (editSession) {
      setModalStatus(editSession.status || "COMING SOON");
      setModalRecordingUrl(editSession.recordingUrl || "");
      setModalResources((editSession.resources || []).map(r => r.name || r));
    }
  }, [editSession?._id]);

  /* Load tab-specific data when switching tabs */
  useEffect(() => {
    if (!sel?._id) return;
    if (tab === "sessions") {
      setSessLoading(true);
      fetch(`/api/bootcamps/${sel._id}/sessions`, { headers:h })
        .then(r=>r.ok?r.json():[]).then(d=>{ setSessions(Array.isArray(d)?d:[]); setSessLoading(false); }).catch(()=>setSessLoading(false));
    }
    if (tab === "students") {
      fetch(`/api/bootcamps/${sel._id}/students`, { headers:h })
        .then(r=>r.ok?r.json():[]).then(d=>{ setStudents(Array.isArray(d)?d:[]); }).catch(()=>setStudents([]));
    }
    if (tab === "announcement") {
      setAnnsLoading(true);
      fetch(`/api/bootcamps/${sel._id}/announcements/all`, { headers:h })
        .then(r=>r.ok?r.json():[]).then(d=>{
          if (Array.isArray(d)) { setAnns(d); if(d.length>0){setSelAnn(d[0]);setAnnF({title:d[0].title,content:d[0].content,status:d[0].status});} }
          setAnnsLoading(false);
        }).catch(()=>setAnnsLoading(false));
    }
    if (tab === "resources") {
      fetch(`/api/bootcamps/${sel._id}/resources`, { headers:h })
        .then(r=>r.ok?r.json():[]).then(d=>{ if(Array.isArray(d)) setResources(d); }).catch(()=>{});
    }
    if (tab === "projects") {
      fetch(`/api/bootcamps/${sel._id}/projects`, { headers:h })
        .then(r=>r.ok?r.json():[])
        .then(d=>{
          /* Normalise DB field names to local keys */
          const mapped = Array.isArray(d) ? d.map(p=>({...p, req:p.requirements||p.req||[], res:p.resources||p.res||[] })) : [];
          if (mapped.length > 0) {
            setProjects(mapped);
            setSelProj(mapped[0]);
          } else {
            setProjects([]);
            setSelProj(null);
          }
        }).catch(()=>{});
    }
    if (tab === "settings" && sel) {
      setStgs({
        name: sel.batchName || sel.title || "",
        code: sel.batchCode || "",
        startDate: sel.startDate ? sel.startDate.split("T")[0] : "",
        endDate: sel.endDate ? sel.endDate.split("T")[0] : "",
        status: sel.isPublished ? "ACTIVE" : "COMING SOON",
        price: sel.price != null ? String(sel.price) : "",
        originalPrice: sel.originalPrice != null ? String(sel.originalPrice) : "",
        zoomLink: sel.zoomLink || "",
        zoomId: sel.zoomId || "",
        zoomPass: sel.zoomPass || "",
        autoRecord: true, reminders: true, chat: true,
      });
      setMentors(sel.mentors || []);
    }
  }, [tab, sel?._id]);

  /* Settings save functions wired to real API */
  const [batchErr, setBatchErr] = useState("");
  const saveBatchInfo = async () => {
    if (stgs.startDate && stgs.endDate && new Date(stgs.endDate) < new Date(stgs.startDate)) {
      setBatchErr("End date cannot be earlier than start date.");
      return;
    }
    setBatchErr("");
    const body = { batchName:stgs.name, batchCode:stgs.code, startDate:stgs.startDate, endDate:stgs.endDate, isPublished:stgs.status==="ACTIVE", price:Number(stgs.price)||0, originalPrice:Number(stgs.originalPrice)||0 };
    try {
      const r = await fetch(`/api/bootcamps/${sel._id}`, { method:"PUT", headers:{...h,"Content-Type":"application/json"}, body:JSON.stringify(body) });
      if (r.ok) {
        const updated = await r.json();
        setSel(prev=>({...prev,...updated}));
        save(setSavedBatch);
      } else {
        const data = await r.json();
        setBatchErr(data.message || "Failed to save batch information.");
      }
    } catch {
      setBatchErr("Network error. Please try again.");
    }
  };
  const saveZoomSettings = async () => {
    await fetch(`/api/bootcamps/${sel._id}`, { method:"PUT", headers:{...h,"Content-Type":"application/json"}, body:JSON.stringify({ zoomLink:stgs.zoomLink, zoomId:stgs.zoomId, zoomPass:stgs.zoomPass }) });
    save(setSavedZoom);
  };
  const saveMentors = async (updated) => {
    setMentors(updated);
    await fetch(`/api/bootcamps/${sel._id}`, { method:"PUT", headers:{...h,"Content-Type":"application/json"}, body:JSON.stringify({ mentors:updated }) });
  };

  const [anns,setAnns]=useState([]);
  const [projects,setProjects]=useState([]);

  const TABS=["Overview","Sessions","Students","Projects","Announcement","Resources","Settings"];

  if(view==="list") return(
    <ListBootcampAdmin token={token} onSelect={(b)=>{setSel(b);setTab("overview");setView("detail");}} />
  );

  return(
    <div className="flex flex-col h-full">
      <div className="px-6 pt-5 pb-0 border-b border-white/5">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
          <button onClick={()=>setView("list")} className="hover:text-white transition-all">Bootcamps</button>
          <span>›</span>
          <span className="text-white font-medium">{sel?.title || "Bootcamp Details"}</span>
          {tab!=="overview"&&<><span>›</span><span className="text-gray-400 capitalize">{tab}</span></>}
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={()=>setView("list")} className="text-gray-400 hover:text-white p-1"><I name="back" size={18}/></button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white">{sel?.title}</h1>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${BC_ST[sel?.status]||"bg-gray-500/20 text-gray-400"}`}>{sel?.status}</span>
              </div>
              <p className="text-xs text-gray-400">Manage structure, content, and student access for this program.</p>
            </div>
          </div>
          <div className="flex gap-2">
            {tab!=="announcement"&&(
              <button onClick={()=>{
                if(tab==="settings") save(setSavedBatch);
                else alert("Use the tab-specific save button below (e.g. 'Save Project', 'Save Change', 'Publish Now') to save changes in the current tab.");
              }} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300 flex items-center gap-1.5"><I name="check" size={14}/>{savedBatch?"✓ SAVED":"SAVE CHANGES"}</button>
            )}
          </div>
        </div>
        <div className="flex gap-0">
          {TABS.map(t=>(
            <button key={t} onClick={()=>setTab(t.toLowerCase())} className={`text-sm px-4 py-2.5 border-b-2 transition-all ${tab===t.toLowerCase()?"border-[#C7E36B] text-[#C7E36B]":"border-transparent text-gray-400 hover:text-white"}`}>{t}</button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">

        {tab==="overview"&&(
          <div className="space-y-5">
            <div className="grid grid-cols-4 gap-4">
              {[
                {icon:"users",    label:"TOTAL STUDENTS",    val: sel?.enrollments?.length ?? students.length ?? 0},
                {icon:"payments", label:"TOTAL REVENUE",     val: "₹"+((sel?.price||0)*(sel?.enrollments?.length||students.length||0)).toLocaleString("en-IN")},
                {icon:"checkCircle",  label:"SESSIONS COMPLETED",val: sessions.filter(s=>s.status==="COMPLETED").length+"/"+sessions.length || "0/0"},
                {icon:"clipboardCheck",label:"PROJECT COMPLETED",  val: "0/"+projects.length},
              ].map(s=>(
                <div key={s.label} className="bg-[#0F1112] border border-white/10 rounded-xl p-4">
                  <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center mb-3"><I name={s.icon} size={18} className="text-gray-400"/></div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">{s.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{s.val}</p>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] rounded-2xl p-6 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold bg-white/20 text-white px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"/>NEXT LIVE : SESSION 12
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Generative Video with Sora &amp; Midjourney</h2>
                <div className="flex items-center gap-5 text-white/80 text-sm mb-4">
                  <span>📅 Today, 7:00 PM EST</span><span>⏳ Starts in 2h 45m</span>
                </div>
                <div className="flex gap-3">
                  <button onClick={()=>{if(stgs.zoomLink){window.open(stgs.zoomLink,"_blank")}else{alert("No Zoom link configured. Please add it in Settings → Zoom Configuration.")}}} className="bg-[#C7E36B] text-black text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-lime-300">Join Session Now →</button>
                  <button onClick={()=>setTab("sessions")} className="bg-white/20 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-white/30">Edit Session</button>
                </div>
              </div>
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center ml-6 shrink-0">
                <I name="videocam" size={36} className="text-white"/>
              </div>
            </div>
          </div>
        )}

        {tab==="sessions"&&(
          <div>
            {/* Edit Details Modal (G: Add Resource wired) */}
            {editSession&&(
              <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-16 px-4" onClick={()=>setEditSession(null)}>
                <div className="bg-[#0F1112] border border-white/10 rounded-2xl p-6 w-full max-w-lg" onClick={e=>e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2"><I name="edit" size={16} className="text-[#C7E36B]"/><p className="text-white font-bold">Edit Details — Session {editSession.no}</p></div>
                    <button onClick={()=>setEditSession(null)} className="text-gray-400 hover:text-white text-xl leading-none">✕</button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1.5">Status</p>
                      <select value={modalStatus} onChange={e=>setModalStatus(e.target.value)} className="w-full bg-[#1A1D1E] border border-white/15 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#C7E36B]">
                        {["COMPLETED","ACTIVE","COMING SOON","CANCELLED"].map(o=><option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1.5">Recording Link</p>
                      <div className="relative">
                        <I name="link" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
                        <input value={modalRecordingUrl} onChange={e=>setModalRecordingUrl(e.target.value)} placeholder="Paste Video URL..." className="w-full bg-[#1A1D1E] border border-white/15 rounded-xl pl-9 pr-4 py-3 text-white text-sm outline-none focus:border-[#C7E36B] placeholder-gray-600"/>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] text-white uppercase font-bold">Session Resources</p>
                        <button onClick={()=>setModalResources(prev=>[...prev,"New_File.pdf"])} className="text-xs text-[#C7E36B] flex items-center gap-1"><I name="plus" size={11}/>Add Resource</button>
                      </div>
                      <div className="space-y-2">
                        {modalResources.map((f,idx)=>(
                          <div key={idx} className={`flex items-center gap-3 border rounded-lg px-3 py-2.5 ${idx===0?"border-[#C7E36B]/40 bg-[#C7E36B]/5":"border-white/10 bg-white/[0.03]"}`}>
                            <I name="resources" size={14} className="text-gray-400"/>
                            <span className="text-white text-xs flex-1">{f}</span>
                            <button onClick={()=>setModalResources(prev=>prev.filter((_,j)=>j!==idx))} className="text-gray-500 hover:text-red-400"><I name="trash" size={12}/></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <button onClick={()=>setEditSession(null)} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg hover:bg-white/5">CANCEL</button>
                    <button onClick={async()=>{
                      if (editSession?._id) {
                        const payload = {
                          status: modalStatus,
                          recordingUrl: modalRecordingUrl,
                          resources: modalResources.map(n=>({name:n,size:"—"})),
                        };
                        await fetch(`/api/bootcamps/${sel._id}/sessions/${editSession._id}`, { method:"PUT", headers:{...h,"Content-Type":"application/json"}, body:JSON.stringify(payload) });
                        setSessions(prev=>prev.map(s=>s._id===editSession._id?{...s,...payload}:s));
                        /* Notify students if recording URL was added */
                        if(payload.recordingUrl && payload.recordingUrl !== editSession.recordingUrl) {
                          fetch("/api/notifications/broadcast",{method:"POST",headers:{...h,"Content-Type":"application/json"},body:JSON.stringify({title:`Session ${editSession.no} Recording Uploaded`,message:`The recording for "${editSession.name}" is now available in the Sessions tab.`,type:"session",bootcampId:sel._id})}).catch(()=>{});
                        }
                      }
                      setEditSession(null);
                    }} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300">SAVE & UPDATE</button>
                  </div>
                </div>
              </div>
            )}

            {/* E: Add Session modal */}
            {showAddSession&&(
              <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-16 px-4" onClick={()=>setShowAddSession(false)}>
                <div className="bg-[#0F1112] border border-white/10 rounded-2xl p-6 w-full max-w-md" onClick={e=>e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-white font-bold">Add New Session</p>
                    <button onClick={()=>setShowAddSession(false)} className="text-gray-400 hover:text-white text-xl leading-none">✕</button>
                  </div>
                  <div className="space-y-4">
                    <Fld label="Session Name" value={newSess.name} onChange={v=>setNewSess({...newSess,name:v})} placeholder="Enter session title..." />
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1.5">Status</p>
                      <select value={newSess.status} onChange={e=>setNewSess({...newSess,status:e.target.value})} className="w-full bg-[#1A1D1E] border border-white/15 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#C7E36B]">
                        {["Completed","Active","Coming Soon","Cancelled"].map(o=><option key={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <button onClick={()=>setShowAddSession(false)} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg hover:bg-white/5">CANCEL</button>
                    <button onClick={async()=>{
                      if (!newSess.name.trim()) return;
                      const no = (sessions.length || 0) + 1;
                      const res = await fetch(`/api/bootcamps/${sel._id}/sessions`, { method:"POST", headers:{...h,"Content-Type":"application/json"}, body:JSON.stringify({...newSess, no}) });
                      if (res.ok) { const d = await res.json(); setSessions(prev=>[...prev,d]); }
                      setShowAddSession(false); setSessAdded(true); setTimeout(()=>setSessAdded(false),2000); setNewSess({name:"",status:"COMING SOON"});
                    }} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300">ADD SESSION</button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white">All Session</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <I name="search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
                  <input value={sessSearch} onChange={e=>setSessSearch(e.target.value)} placeholder="Search Sessions..." className="w-[240px] bg-[#0F1112] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white outline-none placeholder-gray-600"/>
                </div>
                <select value={sessStatusFilter} onChange={e=>setSessStatusFilter(e.target.value)} className="bg-[#0F1112] border border-white/10 text-gray-400 text-xs rounded-lg px-3 py-2 outline-none shrink-0">
                  {["All Status","COMPLETED","ACTIVE","COMING SOON","CANCELLED"].map(o=><option key={o}>{o}</option>)}
                </select>
                <button onClick={()=>setShowAddSession(true)} className="text-xs bg-[#C7E36B] text-black font-bold px-3 py-2 rounded-lg flex items-center gap-1 shrink-0"><I name="plus" size={12}/>Add Session</button>
              </div>
            </div>
            {sessAdded&&<p className="text-green-400 text-xs mb-3 flex items-center gap-1">✓ Session added!</p>}
            {sessLoading ? (
              <AdminLoader label="Loading Sessions" />
            ) : (
              <div className="bg-[#0F1112] border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-white/10 text-gray-400">
                    {["No.","Session Name","Status","Edit Details","View Recording"].map(hd=><th key={hd} className="text-left px-4 py-3 font-semibold">{hd}</th>)}
                  </tr></thead>
                  <tbody>
                    {sessions.length === 0 ? (
                      <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500 text-xs">No sessions yet. Click '+ Add Session' to create the first one.</td></tr>
                    ) : sessions.filter(s=>
                      (!sessSearch||s.name.toLowerCase().includes(sessSearch.toLowerCase())) &&
                      (sessStatusFilter==="All Status"||s.status===sessStatusFilter)
                    ).map(s=>(
                      <tr key={s._id||s.no} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03]">
                        <td className="px-4 py-3 text-gray-400">{String(s.no).padStart(2,"0")}</td>
                        <td className="px-4 py-3 text-white font-medium truncate max-w-xs" title={s.name}>{s.name}</td>
                        <td className="px-4 py-3"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${BC_ST[s.status]||"bg-gray-500/20 text-gray-400"}`}>{s.status}</span></td>
                        <td className="px-4 py-3"><button onClick={()=>setEditSession(s)} className="flex items-center gap-1 text-[#C7E36B] hover:underline text-xs"><I name="edit" size={12}/>Edit Details</button></td>
                        <td className="px-4 py-3">{s.status==="COMING SOON"?<span className="text-gray-600">—</span>:<button onClick={()=>s.recordingUrl?window.open(s.recordingUrl,"_blank"):alert("Recording URL not configured for this session. Use Edit Details to add one.")} className="text-blue-400 hover:underline text-xs">View Recording</button>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab==="students"&&(
          <div>
            {/* H: View Student modal */}
            {viewStudent&&(
              <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-16 px-4" onClick={()=>setViewStudent(null)}>
                <div className="bg-[#0F1112] border border-white/10 rounded-2xl p-6 w-full max-w-sm" onClick={e=>e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#C7E36B]/20 flex items-center justify-center text-[#C7E36B] font-bold">{viewStudent.name[0]}</div>
                      <p className="text-white font-bold">{viewStudent.name}</p>
                    </div>
                    <button onClick={()=>setViewStudent(null)} className="text-gray-400 hover:text-white text-xl leading-none">✕</button>
                  </div>
                  <div className="space-y-3 text-sm mb-5">
                    {[["Email",viewStudent.email],["Mobile",viewStudent.mobile],["Joined",viewStudent.joinDate]].map(([l,v])=>(
                      <div key={l} className="flex justify-between py-2 border-b border-white/5"><span className="text-gray-400">{l}</span><span className="text-white">{v}</span></div>
                    ))}
                    <div className="flex justify-between py-2"><span className="text-gray-400">Status</span><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${BC_ST[viewStudent.status]||""}`}>{viewStudent.status}</span></div>
                  </div>
                  <button onClick={()=>setViewStudent(null)} className="w-full border border-white/20 text-gray-300 text-xs font-semibold py-2 rounded-lg hover:bg-white/5">Close</button>
                </div>
              </div>
            )}
            {/* I: Edit Student modal */}
            {editStudent&&(
              <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-16 px-4" onClick={()=>setEditStudent(null)}>
                <div className="bg-[#0F1112] border border-white/10 rounded-2xl p-6 w-full max-w-md" onClick={e=>e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-white font-bold">Edit Student — {editStudent.name}</p>
                    <button onClick={()=>setEditStudent(null)} className="text-gray-400 hover:text-white text-xl leading-none">✕</button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1.5">Status</p>
                      <select value={editStudStatus} onChange={e=>setEditStudStatus(e.target.value)} className="w-full bg-[#1A1D1E] border border-white/15 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#C7E36B]">
                        {["ACTIVE","COMPLETED","DROPPED"].map(o=><option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1.5">Note</p>
                      <textarea value={editStudNote} onChange={e=>setEditStudNote(e.target.value)} rows={3} placeholder="Add note about this student..." className="w-full bg-[#1A1D1E] border border-white/15 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#C7E36B] resize-none placeholder-gray-600"/>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <button onClick={()=>setEditStudent(null)} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg hover:bg-white/5">CANCEL</button>
                    <button onClick={async()=>{
                      await fetch(`/api/bootcamps/${sel._id}/students/${editStudent._id}`,{method:"PUT",headers:{...h,"Content-Type":"application/json"},body:JSON.stringify({status:editStudStatus,notes:editStudNote})});
                      setStudents(prev=>prev.map(s=>s._id===editStudent._id?{...s,status:editStudStatus,notes:editStudNote}:s));
                      setEditStudent(null);setEditStudNote("");setEditStudStatus("ACTIVE");
                    }} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300">SAVE CHANGES</button>
                  </div>
                </div>
              </div>
            )}
            {showAddStudent&&(
              <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-16 px-4" onClick={()=>setShowAddStudent(false)}>
                <div className="bg-[#0F1112] border border-white/10 rounded-2xl p-6 w-full max-w-md" onClick={e=>e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-white font-bold">Add Student to Bootcamp</p>
                    <button onClick={()=>setShowAddStudent(false)} className="text-gray-400 hover:text-white text-xl leading-none">✕</button>
                  </div>
                  <p className="text-xs text-gray-400 mb-4">The student must already have an AIFA account. Enter their registered email to enroll them in this bootcamp.</p>
                  <div className="mb-4">
                    <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1.5">Student Email</p>
                    <input value={addStudentEmail} onChange={e=>setAddStudentEmail(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")document.getElementById("addStudentSubmit")?.click();}} placeholder="student@example.com" className="w-full bg-[#1A1D1E] border border-white/15 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#C7E36B] placeholder-gray-600"/>
                  </div>
                  {addStudentMsg.text&&<p className={`text-xs mb-4 ${addStudentMsg.type==="success"?"text-green-400":"text-red-400"}`}>{addStudentMsg.text}</p>}
                  <div className="flex justify-end gap-2">
                    <button onClick={()=>setShowAddStudent(false)} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg hover:bg-white/5">CANCEL</button>
                    <button id="addStudentSubmit" onClick={async()=>{
                      if(!addStudentEmail.trim()){setAddStudentMsg({text:"Please enter a student email.",type:"error"});return;}
                      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addStudentEmail)){setAddStudentMsg({text:"Please enter a valid email address.",type:"error"});return;}
                      try{
                        const res=await fetch(`/api/bootcamps/${sel._id}/enroll-by-email`,{method:"POST",headers:{...h,"Content-Type":"application/json"},body:JSON.stringify({email:addStudentEmail.trim()})});
                        const data=await res.json();
                        if(res.ok){
                          setAddStudentMsg({text:`✓ ${data.message||"Student enrolled successfully."}`,type:"success"});
                          const updated=await fetch(`/api/bootcamps/${sel._id}/students`,{headers:h}).then(r=>r.ok?r.json():[]).catch(()=>[]);
                          if(Array.isArray(updated))setStudents(updated);
                          setTimeout(()=>setShowAddStudent(false),1500);
                        } else {
                          setAddStudentMsg({text:data.message||"Could not enroll student. Check the email and try again.",type:"error"});
                        }
                      }catch{setAddStudentMsg({text:"Network error. Please try again.",type:"error"});}
                    }} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300">ENROLL STUDENT</button>
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-white">Enrolled Students ({students.length})</h2>
              <button onClick={()=>{setAddStudentEmail("");setAddStudentMsg({text:"",type:""});setShowAddStudent(true);}} className="text-xs bg-[#C7E36B] text-black font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"><I name="plus" size={12}/>Add Student</button>
            </div>
            <div className="flex gap-2 mb-4">
              <select value={studStatus} onChange={e=>setStudStatus(e.target.value)} className="bg-[#0F1112] border border-white/10 text-gray-400 text-xs rounded-lg px-3 py-1.5 outline-none">
                {["All Status","Active","Completed","Dropped"].map(o=><option key={o}>{o}</option>)}
              </select>
              <select value={studSort} onChange={e=>setStudSort(e.target.value)} className="bg-[#0F1112] border border-white/10 text-gray-400 text-xs rounded-lg px-3 py-1.5 outline-none">
                {["Latest Joined","Oldest First","Name A-Z"].map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="bg-[#0F1112] border border-white/10 rounded-xl overflow-hidden">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-white/10 text-gray-400">
                  {["Student","Email","Mobile","Join Date","Status","Actions"].map(h=><th key={h} className="text-left px-4 py-3 font-semibold">{h}</th>)}
                </tr></thead>
                <tbody>
                  {students.length === 0 ? (
                    <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500 text-xs">No students enrolled yet.</td></tr>
                  ) : null}
                  {students
                    .filter(s=>studStatus==="All Status"||s.status===studStatus.toUpperCase()||(studStatus==="Active"&&s.status==="ACTIVE")||(studStatus==="Completed"&&s.status==="COMPLETED")||(studStatus==="Dropped"&&s.status==="DROPPED"))
                    .sort((a,b)=>{
                      if(studSort==="Name A-Z") return a.name.localeCompare(b.name);
                      if(studSort==="Oldest First") return new Date(a.joinDate||0)-new Date(b.joinDate||0);
                      return new Date(b.joinDate||0)-new Date(a.joinDate||0); // Latest Joined
                    })
                    .map((s,i)=>(
                    <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03]">
                      <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-full bg-[#C7E36B]/20 flex items-center justify-center text-[#C7E36B] text-[10px] font-bold">{s.name[0]}</div><span className="text-white font-medium">{s.name}</span></div></td>
                      <td className="px-4 py-3 text-gray-400">{s.email}</td>
                      <td className="px-4 py-3 text-gray-400">{s.mobile}</td>
                      <td className="px-4 py-3 text-gray-400">{s.joinDate}</td>
                      <td className="px-4 py-3"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${BC_ST[s.status]||"bg-gray-500/20 text-gray-400"}`}>{s.status}</span></td>
                      <td className="px-4 py-3"><div className="flex gap-2"><button onClick={()=>setViewStudent(s)} className="text-gray-400 hover:text-[#C7E36B]"><I name="eye" size={14}/></button><button onClick={()=>{setEditStudent(s);setEditStudNote(s.notes||"");setEditStudStatus(s.status||"ACTIVE");}} className="text-gray-400 hover:text-[#C7E36B]"><I name="edit" size={14}/></button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab==="projects"&&(
          <ProjTab selProj={selProj} setSelProj={setSelProj} localProj={localProj} setLocalProj={setLocalProj} projSaved={projSaved} setProjSaved={setProjSaved} projFileRef={projFileRef} projects={projects} setProjects={setProjects} bootcampId={sel?._id} token={token} />
        )}

        {tab==="announcement"&&(
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Announcements</h2>
                <p className="text-gray-400 text-xs mt-0.5">Create and manage announcements visible to students in this batch.</p>
              </div>
              <button onClick={()=>{setSelAnn(null);setAnnF({title:"",content:"",status:"DRAFT"});setAnnFiles([]);}} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300 flex items-center gap-1.5 shrink-0"><I name="plus" size={13}/>Create Announcement</button>
            </div>
          <div className="flex gap-5">
            {/* Left sidebar — list */}
            <div className="w-[280px] shrink-0 space-y-2">
              <div className="relative mb-3">
                <I name="search" size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
                <input value={annSearch} onChange={e=>setAnnSearch(e.target.value)} placeholder="Search Announcements..." className="w-full bg-[#0F1112] border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-white outline-none placeholder-gray-600"/>
              </div>
              {anns.filter(a=>!annSearch||a.title.toLowerCase().includes(annSearch.toLowerCase())).map(a=>(
                <div key={a._id} onClick={()=>{setSelAnn(a);setAnnF({title:a.title,content:a.content,status:a.status});}} className={`p-3 border rounded-xl cursor-pointer transition-all ${selAnn?._id===a._id?"border-[#C7E36B]/50 bg-[#C7E36B]/5":"border-white/10 bg-[#0F1112] hover:border-white/20"}`}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${BC_ST[a.status]||"bg-gray-500/20 text-gray-400"}`}>{a.status}</span>
                    <p className="text-[10px] text-gray-500">{a.createdAt?new Date(a.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"short"}):a.date||""}</p>
                  </div>
                  <p className="text-xs font-bold text-white line-clamp-1 mb-1">{a.title}</p>
                  {a.content&&<p className="text-[10px] text-gray-500 line-clamp-2">{a.content}</p>}
                </div>
              ))}
              {anns.length===0&&<p className="text-[11px] text-gray-600 text-center py-6">No announcements yet.</p>}
            </div>
            {/* Right — editor */}
            <div className="flex-1 bg-[#0F1112] border border-white/10 rounded-xl overflow-hidden flex flex-col">
              {/* top meta bar */}
              <div className="flex items-center gap-4 px-5 py-3 border-b border-white/10 bg-white/[0.02]">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${BC_ST[annF.status||"DRAFT"]||"bg-gray-500/20 text-gray-400"}`}>{annF.status||"DRAFT"}</span>
                {(selAnn?.createdBy||selAnn?.createdAt)&&<span className="text-[10px] text-gray-500 flex items-center gap-1"><I name="users" size={10}/>Created by {selAnn?.createdBy||"Admin"}{selAnn?.createdAt?` · ${new Date(selAnn.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}`:""}</span>}
                {selAnn?.status==="PUBLISHED"&&selAnn?.updatedAt&&<span className="text-[10px] text-green-400 flex items-center gap-1"><I name="eye" size={10}/>Published {new Date(selAnn.updatedAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</span>}
                {selAnn?.updatedAt&&<span className="text-[10px] text-gray-500 flex items-center gap-1"><I name="clock" size={10}/>Last modified {new Date(selAnn.updatedAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</span>}
              </div>
              <div className="flex-1 p-5 space-y-4 overflow-y-auto">
                {/* Title */}
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Announcement Title</p>
                  <input value={annF.title} onChange={e=>setAnnF({...annF,title:e.target.value})} placeholder="Enter announcement title..." className="w-full bg-transparent text-xl font-bold text-white outline-none placeholder-gray-600 border-b border-white/10 pb-2"/>
                </div>
                {/* Message Content */}
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Message Content</p>
                  <div className="border border-white/10 rounded-lg overflow-hidden">
                    <div className="flex items-center gap-1 px-3 py-2 border-b border-white/10 bg-white/[0.03]">
                      {["B","I","U","|","Link","🖼","|","≡","≡≡"].map((t,i)=><button key={i} className={`text-[11px] px-2 py-0.5 rounded text-gray-400 hover:text-white hover:bg-white/10 ${t==="B"?"font-bold":""} ${t==="|"?"text-white/10 cursor-default hover:bg-transparent":""}`}>{t}</button>)}
                    </div>
                    <textarea value={annF.content} onChange={e=>setAnnF({...annF,content:e.target.value})} className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none resize-none" rows={8} placeholder="Write your announcement here..."/>
                  </div>
                </div>
                {/* File attachment */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Announcements (Optional)</p>
                    <p className="text-[10px] text-gray-600">{annFiles.length} / 3 FILES</p>
                  </div>
                  <label className="block border-2 border-dashed border-white/15 rounded-xl p-6 text-center cursor-pointer hover:border-[#C7E36B]/40 transition-all">
                    <input type="file" multiple accept=".pdf,.zip,.docx" className="hidden" onChange={e=>{
                      const ALLOWED=["pdf","zip","docx"];
                      const files=Array.from(e.target.files||[]);
                      const bad=files.filter(f=>!ALLOWED.includes((f.name.split(".").pop()||"").toLowerCase()));
                      if(bad.length){alert(`Unsupported file type: ${bad.map(f=>f.name).join(", ")}.\nAllowed: PDF, ZIP, DOCX only.`);e.target.value="";return;}
                      if(files.length) setAnnFiles(prev=>[...prev,...files.map(f=>({file:f,name:f.name,size:(f.size/1024/1024).toFixed(1)+"MB"}))]);
                      e.target.value="";
                    }}/>
                    <div className="text-2xl mb-2">⬆</div>
                    <p className="text-sm font-semibold text-white mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">Supported: PDF, ZIP, DOCX (Max 50MB)</p>
                  </label>
                  {annFiles.length>0&&(
                    <div className="mt-3 space-y-1.5">
                      {annFiles.map((f,i)=>(
                        <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
                          <span className="text-xs text-white truncate flex-1">📎 {f.name} <span className="text-gray-500 ml-1">{f.size}</span></span>
                          <button onClick={()=>setAnnFiles(prev=>prev.filter((_,j)=>j!==i))} className="text-gray-500 hover:text-red-400 ml-2 text-sm leading-none">✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Action buttons */}
                <div className="flex items-center justify-between pt-1">
                  <button onClick={async()=>{
                    if(!selAnn?._id)return;
                    if(!confirm("Delete this announcement?"))return;
                    const r=await fetch(`/api/bootcamps/${sel._id}/announcements/${selAnn._id}`,{method:"DELETE",headers:h});
                    if(r.ok){setAnns(prev=>prev.filter(a=>a._id!==selAnn._id));setSelAnn(null);setAnnF({title:"",content:"",status:"DRAFT"});}
                  }} className="text-xs text-red-400 hover:text-red-300 font-semibold px-1 disabled:opacity-30" disabled={!selAnn?._id}>Delete</button>
                  <div className="flex items-center gap-2">
                    {annSavedMsg&&<span className="text-[10px] text-green-400 font-semibold">{annSavedMsg}</span>}
                    <button onClick={async()=>{
                      if(!annF.title.trim())return;
                      setAnnSaving(true);
                      const saveBody = async(status)=>{
                        let body={title:annF.title,content:annF.content,status};
                        if(annFiles.length>0){
                          const fd=new FormData();
                          fd.append("title",annF.title);fd.append("content",annF.content);fd.append("status",status);
                          annFiles.forEach(f=>fd.append("files",f.file));
                          if(selAnn?._id){const r=await fetch(`/api/bootcamps/${sel._id}/announcements/${selAnn._id}`,{method:"PUT",headers:h,body:fd});return r;}
                          else{const r=await fetch(`/api/bootcamps/${sel._id}/announcements`,{method:"POST",headers:h,body:fd});return r;}
                        }
                        if(selAnn?._id){return fetch(`/api/bootcamps/${sel._id}/announcements/${selAnn._id}`,{method:"PUT",headers:{...h,"Content-Type":"application/json"},body:JSON.stringify(body)});}
                        else{return fetch(`/api/bootcamps/${sel._id}/announcements`,{method:"POST",headers:{...h,"Content-Type":"application/json"},body:JSON.stringify(body)});}
                      };
                      const r=await saveBody("DRAFT");
                      if(r?.ok){const d=await r.json();if(selAnn?._id)setAnns(prev=>prev.map(a=>a._id===selAnn._id?{...a,...d}:a));else{setAnns(prev=>[d,...prev]);setSelAnn(d);}setAnnFiles([]);setAnnSavedMsg("Draft saved!");setTimeout(()=>setAnnSavedMsg(""),3000);}
                      setAnnSaving(false);
                    }} disabled={annSaving} className="border border-white/20 text-gray-300 text-xs font-semibold px-5 py-2 rounded-lg hover:bg-white/5 disabled:opacity-50">Save Draft</button>
                    <button onClick={async()=>{
                      if(!annF.title.trim())return;
                      setAnnSaving(true);
                      const saveBody = async(status)=>{
                        if(annFiles.length>0){
                          const fd=new FormData();
                          fd.append("title",annF.title);fd.append("content",annF.content);fd.append("status",status);
                          annFiles.forEach(f=>fd.append("files",f.file));
                          if(selAnn?._id){return fetch(`/api/bootcamps/${sel._id}/announcements/${selAnn._id}`,{method:"PUT",headers:h,body:fd});}
                          else{return fetch(`/api/bootcamps/${sel._id}/announcements`,{method:"POST",headers:h,body:fd});}
                        }
                        const body={title:annF.title,content:annF.content,status};
                        if(selAnn?._id){return fetch(`/api/bootcamps/${sel._id}/announcements/${selAnn._id}`,{method:"PUT",headers:{...h,"Content-Type":"application/json"},body:JSON.stringify(body)});}
                        else{return fetch(`/api/bootcamps/${sel._id}/announcements`,{method:"POST",headers:{...h,"Content-Type":"application/json"},body:JSON.stringify(body)});}
                      };
                      const r=await saveBody("PUBLISHED");
                      if(r?.ok){const d=await r.json();if(selAnn?._id)setAnns(prev=>prev.map(a=>a._id===selAnn._id?{...a,...d}:a));else{setAnns(prev=>[d,...prev]);setSelAnn(d);}setAnnFiles([]);setAnnSavedMsg("Published!");setTimeout(()=>setAnnSavedMsg(""),3000);fetch("/api/notifications/broadcast",{method:"POST",headers:{...h,"Content-Type":"application/json"},body:JSON.stringify({title:annF.title,message:annF.content||"New announcement from AIFA.",type:"announcement",bootcampId:sel._id})}).catch(()=>{});}
                      setAnnSaving(false);
                    }} disabled={annSaving} className="bg-[#C7E36B] text-black text-xs font-bold px-5 py-2 rounded-lg hover:bg-lime-300 disabled:opacity-50">{annSaving?"Saving...":"Publish Now"}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        )}

        {tab==="resources"&&(
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Resources</h2>
                <p className="text-gray-400 text-xs mt-0.5">Manage all downloadable resources available to students.</p>
              </div>
              <div className="flex items-center gap-2">
                {showFolderInput?(
                  <div className="flex items-center gap-2">
                    <input autoFocus value={folderName} onChange={e=>setFolderName(e.target.value)} onKeyDown={async e=>{
                      if(e.key==="Enter"&&folderName.trim()){
                        const r=await fetch(`/api/bootcamps/${sel._id}/resources`,{method:"POST",headers:{...h,"Content-Type":"application/json"},body:JSON.stringify({name:folderName.trim(),fileType:"Folder",fileSize:"—",category:"General"})});
                        if(r.ok){const d=await r.json();setResources(prev=>[d,...prev]);}
                        setFolderName("");setShowFolderInput(false);
                      }
                      if(e.key==="Escape"){setShowFolderInput(false);setFolderName("");}
                    }} placeholder="Folder name..." className="bg-[#1A1D1E] border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-[#C7E36B] w-36 placeholder-gray-600"/>
                    <button onClick={async()=>{
                      if(!folderName.trim())return;
                      const r=await fetch(`/api/bootcamps/${sel._id}/resources`,{method:"POST",headers:{...h,"Content-Type":"application/json"},body:JSON.stringify({name:folderName.trim(),fileType:"Folder",fileSize:"—",category:"General"})});
                      if(r.ok){const d=await r.json();setResources(prev=>[d,...prev]);}
                      setFolderName("");setShowFolderInput(false);
                    }} className="text-xs bg-[#C7E36B] text-black font-bold px-3 py-1.5 rounded-lg hover:bg-lime-300">Create</button>
                    <button onClick={()=>{setShowFolderInput(false);setFolderName("");}} className="text-xs text-gray-400 hover:text-white px-2 py-1.5">Cancel</button>
                  </div>
                ):(
                  <button onClick={()=>setShowFolderInput(true)} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg hover:bg-white/5 flex items-center gap-1.5">📁 Create Folder</button>
                )}
                <label className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300 flex items-center gap-1.5 cursor-pointer">
                  <I name="upload" size={13}/> Upload Assets
                  <input type="file" multiple accept=".pdf,.zip,.docx,.pptx,.mp4" className="hidden" onChange={async e=>{
                    const files=Array.from(e.target.files||[]);
                    for(const f of files){
                      const typeMap={pdf:"PDF Document",zip:"Compressed Archive",docx:"Word Document",pptx:"Presentation",mp4:"MP4 Video"};
                      const ext=(f.name.split(".").pop()||"").toLowerCase();
                      const payload={name:f.name,fileType:typeMap[ext]||"File",fileSize:(f.size/1024/1024).toFixed(1)+" MB",category:"General"};
                      const r=await fetch(`/api/bootcamps/${sel._id}/resources`,{method:"POST",headers:{...h,"Content-Type":"application/json"},body:JSON.stringify(payload)});
                      if(r.ok){const d=await r.json();setResources(prev=>[d,...prev]);}
                    }
                    e.target.value="";
                  }}/>
                </label>
              </div>
            </div>
            {/* Stat boxes */}
            <div className="grid grid-cols-3 gap-4">
              {[
                {icon:"📄",count:resources.filter(r=>r.fileType?.includes("PDF")||r.name?.toLowerCase().endsWith(".pdf")).length,label:"PDF DOCUMENTS"},
                {icon:"🔗",count:resources.filter(r=>r.link&&!r.fileUrl).length,label:"EXTERNAL LINKS"},
                {icon:"📦",count:resources.filter(r=>r.fileType?.includes("Archive")||r.name?.toLowerCase().endsWith(".zip")).length,label:"PROJECT FILES"},
              ].map(s=>(
                <div key={s.label} className="bg-[#0F1112] border border-white/10 rounded-xl p-4 flex items-center gap-4">
                  <span className="text-3xl">{s.icon}</span>
                  <div><p className="text-2xl font-black text-white">{String(s.count).padStart(2,"0")}</p><p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">{s.label}</p></div>
                </div>
              ))}
            </div>
            {/* Table */}
            <div className="bg-[#0F1112] border border-white/10 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <p className="text-sm font-bold text-white">All Resources</p>
                <div className="flex items-center gap-2">
                  <select className="bg-[#1A1D1E] border border-white/10 text-gray-400 text-xs rounded-lg px-3 py-1.5 outline-none">
                    {["All Category","PDF Document","Compressed Archive","External URL","MP4 Video"].map(o=><option key={o}>{o}</option>)}
                  </select>
                  <button className="text-xs border border-white/20 text-gray-300 px-3 py-1.5 rounded-lg hover:bg-white/5 flex items-center gap-1"><I name="search" size={12}/>Filter</button>
                </div>
              </div>
              <table className="w-full text-xs">
                <thead><tr className="border-b border-white/10 text-gray-500 font-semibold uppercase text-[10px]">
                  {["Name & Category","Type","Size / Link","Uploaded","Downloads","Actions"].map(c=><th key={c} className="text-left px-4 py-3">{c}</th>)}
                </tr></thead>
                <tbody>
                  {resources.length===0&&<tr><td colSpan={6} className="px-4 py-8 text-center text-gray-600 text-xs">No resources uploaded yet. Click "Upload Assets" to add files.</td></tr>}
                  {resources.map((r,i)=>(
                    <tr key={r._id||i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                      <td className="px-4 py-3">
                        <p className="text-white font-semibold">{r.name}</p>
                        <p className="text-gray-600 text-[10px] uppercase font-bold mt-0.5">{r.category||"General"}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-400">{r.fileType||"File"}</td>
                      <td className="px-4 py-3 text-gray-400">{r.link||r.fileSize||"—"}</td>
                      <td className="px-4 py-3 text-gray-400">{r.createdAt?new Date(r.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}):"—"}</td>
                      <td className="px-4 py-3 text-gray-400 font-bold">{r.downloads||0}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {r.fileUrl&&<button onClick={()=>window.open(r.fileUrl,"_blank")} className="text-gray-400 hover:text-[#C7E36B]"><I name="download" size={13}/></button>}
                          <button onClick={()=>{const name=prompt("Rename resource:",r.name);if(name&&name.trim()){fetch(`/api/bootcamps/${sel._id}/resources/${r._id}`,{method:"PUT",headers:{...h,"Content-Type":"application/json"},body:JSON.stringify({name:name.trim()})}).then(res=>res.ok&&setResources(prev=>prev.map(x=>x._id===r._id?{...x,name:name.trim()}:x)));} }} className="text-gray-400 hover:text-[#C7E36B]"><I name="edit" size={13}/></button>
                          <button onClick={async()=>{if(!confirm(`Delete "${r.name}"?`))return;const res=await fetch(`/api/bootcamps/${sel._id}/resources/${r._id}`,{method:"DELETE",headers:h});if(res.ok)setResources(prev=>prev.filter(x=>x._id!==r._id));}} className="text-gray-400 hover:text-red-400"><I name="trash" size={13}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab==="settings"&&(
          <div className="max-w-2xl space-y-5">
            <Sect icon="bootcamp" title="Batch Information">
              <div className="grid grid-cols-2 gap-4">
                <Fld label="Bootcamp Name" value={stgs.name} onChange={v=>setStgs(p=>({...p,name:v}))} />
                <Fld label="Batch Code" value={stgs.code} onChange={v=>setStgs(p=>({...p,code:v}))} />
                <Fld label="Start Date" type="date" value={stgs.startDate} onChange={v=>setStgs(p=>({...p,startDate:v}))} />
                <Fld label="End Date" type="date" value={stgs.endDate} onChange={v=>setStgs(p=>({...p,endDate:v}))} />
                <Fld label="Price (₹)" value={stgs.price} onChange={v=>setStgs(p=>({...p,price:v}))} placeholder="e.g. 14000" />
                <Fld label="Original Price (₹) — strikethrough" value={stgs.originalPrice} onChange={v=>setStgs(p=>({...p,originalPrice:v}))} placeholder="e.g. 19000" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 mb-1.5 font-semibold uppercase">Batch Status</p>
                <div className="flex gap-2 flex-wrap">
                  {["ACTIVE","COMPLETED","COMING SOON","CANCELLED"].map(s=>(
                    <button key={s} onClick={()=>setStgs(p=>({...p,status:s}))} className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-all ${stgs.status===s?"bg-[#C7E36B] text-black border-[#C7E36B]":"border-white/20 text-gray-400 hover:border-white/40"}`}>{s}</button>
                  ))}
                </div>
                {stgs.status==="ACTIVE"&&<p className="text-[10px] text-yellow-400 mt-2">⚠ Only one bootcamp can be ACTIVE at a time. Saving will deactivate all other bootcamps on the website.</p>}
              </div>
              {/* Feature 7C: per-section save */}
              {batchErr&&<p className="text-red-400 text-xs font-semibold">{batchErr}</p>}
              <div className="flex justify-end items-center gap-3 pt-1">
                {savedBatch&&<span className="text-[#C7E36B] text-xs font-semibold">✓ Saved!</span>}
                <button onClick={saveBatchInfo} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300">Save Change</button>
              </div>
            </Sect>
            <Sect icon="link" title="Zoom Configuration">
              <Fld label="Meeting Link" value={stgs.zoomLink} onChange={v=>setStgs({...stgs,zoomLink:v})} placeholder="https://zoom.us/j/..." />
              <div className="grid grid-cols-2 gap-4">
                <Fld label="Meeting ID" value={stgs.zoomId} onChange={v=>setStgs({...stgs,zoomId:v})} placeholder="000 0000 0000" />
                <Fld label="Passcode" value={stgs.zoomPass} onChange={v=>setStgs({...stgs,zoomPass:v})} placeholder="••••••" />
              </div>
              <div className="grid grid-cols-3 gap-3 mt-1">
                {[["autoRecord","Record Automatically"],["reminders","Send Reminders"],["chat","Enable Chat"]].map(([k,l])=>(
                  <div key={k} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
                    <span className="text-xs text-gray-300">{l}</span>
                    <Tog value={stgs[k]} onChange={v=>setStgs({...stgs,[k]:v})} />
                  </div>
                ))}
              </div>
              {/* Feature 7C: per-section save */}
              <div className="flex justify-end items-center gap-2 pt-1">
                {savedZoom&&<span className="text-[#C7E36B] text-xs font-semibold">✓ Saved!</span>}
                <button onClick={()=>stgs.zoomLink?window.open(stgs.zoomLink,"_blank"):alert("No Zoom link set yet.")} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg hover:bg-white/5">Test Zoom Link →</button>
                <button onClick={saveZoomSettings} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300">Update Zoom Settings</button>
              </div>
            </Sect>
            <Sect icon="users" title="Mentors">
              <div className="space-y-2 mb-3">
                {mentors.map((m,i)=>(
                  <div key={i} className="flex items-center gap-3 bg-white/5 rounded-lg px-3 py-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#C7E36B]/20 flex items-center justify-center text-[#C7E36B] text-sm font-bold">{m.name[0]}</div>
                    <div className="flex-1"><p className="text-xs font-semibold text-white">{m.name}</p><p className="text-[10px] text-gray-400">{m.role}</p></div>
                    <button onClick={()=>saveMentors(mentors.filter((_,j)=>j!==i))} className="text-gray-500 hover:text-red-400"><I name="trash" size={13}/></button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input value={newMentor} onChange={e=>setNewMentor(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&newMentor.trim()){setMentors(ms=>[...ms,{name:newMentor.trim(),role:"Mentor"}]);setNewMentor("");}}} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#C7E36B]/50 placeholder-gray-600" placeholder="Mentor name..." />
                <button onClick={()=>{if(newMentor.trim()){const updated=[...mentors,{name:newMentor.trim(),role:"Mentor"}];saveMentors(updated);setNewMentor("");}}} className="text-xs bg-[#C7E36B] text-black font-bold px-3 py-2 rounded-lg flex items-center gap-1"><I name="plus" size={12}/>Add Mentor</button>
              </div>
            </Sect>
            <div className="flex justify-end gap-2">
              <button onClick={()=>setStgs(s=>({...s,name:"AI Filmmaking Bootcamp",code:"B01",startDate:"2024-10-01",endDate:"2025-01-31",status:"ACTIVE"}))} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg hover:bg-white/5">Discard Changes</button>
              <button className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300">Save Settings</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

/* ── WORKSHOPS ADMIN ── */
function WorkshopsAdmin({ token }) {
  const [view, setView] = useState("list");
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sel, setSel] = useState(null);

  const loadWorkshops = () => {
    setLoading(true);
    fetch("/api/workshops", { headers:{ Authorization:`Bearer ${token}` } })
      .then(r=>r.json()).then(d=>{ if(Array.isArray(d)) setWorkshops(d); setLoading(false); }).catch(()=>setLoading(false));
  };
  useEffect(loadWorkshops, [token]);
  const [cf, setCf] = useState({ title:"", shortDesc:"", duration:"35 Hours", price:"USD 999", mode:"ONLINE", date:"", time:"", published:true });
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const startEdit = (w) => {
    setCf({ title:w.title||"", shortDesc:w.description||"", duration:w.duration||"35 Hours", price:String(w.price||999), mode:w.mode||"ONLINE", date:"", time:"", published:!!w.isPublished });
    setIsEditing(true); setView("create");
  };

  const doCreate = async () => {
    setSaving(true);
    try {
      const body = { title:cf.title, description:cf.shortDesc, duration:cf.duration, price:parseFloat(cf.price.replace(/[^0-9.]/g,"")), mode:cf.mode.toUpperCase(), isPublished:cf.published };
      const url  = isEditing && sel?._id ? `/api/workshops/${sel._id}` : "/api/workshops";
      const meth = isEditing && sel?._id ? "PUT" : "POST";
      const res  = await fetch(url,{ method:meth, headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}, body:JSON.stringify(body) });
      const data = await res.json();
      if(res.ok){
        setSel(data); setSuccessMsg(isEditing?"Workshop Updated Successfully!":"Workshop Created Successfully!");
        if(isEditing) setWorkshops(ws=>ws.map(w=>w._id===data._id?data:w));
        else { setWorkshops(ws=>[data,...ws]); }
        setIsEditing(false); setView("manage");
      }
    } catch(e){}
    setSaving(false);
  };

  const doPublish = async (w) => {
    const res = await fetch(`/api/workshops/${w._id}`,{ method:"PUT", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}, body:JSON.stringify({ isPublished:true }) });
    const data = await res.json();
    if(res.ok){ setSel(data); setWorkshops(ws=>ws.map(x=>x._id===data._id?data:x)); setSuccessMsg("Workshop published!"); }
  };

  const doDelete = async (id) => {
    if(!window.confirm("Delete?")) return;
    await fetch(`/api/workshops/${id}`,{ method:"DELETE", headers:{Authorization:`Bearer ${token}`} });
    setWorkshops(ws=>ws.filter(w=>w._id!==id));
  };

  if(view==="create") return (
    <div className="p-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">{isEditing?"Edit Workshop":"Create Workshop"}</h1>
          <p className="text-xs text-gray-400">{isEditing?"Update workshop details":"Add workshop details for website display"}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={()=>{ setIsEditing(false); setView(isEditing?"manage":"list"); }} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg hover:bg-white/5">Cancel</button>
          <button className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300" onClick={doCreate} disabled={saving}>{saving?(isEditing?"Updating...":"Publishing..."):(isEditing?"Save Changes":"Publish Workshop")}</button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <Sect icon="resources" title="Basic Information">
            <Fld label="Workshop Title" value={cf.title} onChange={v=>setCf({...cf,title:v})} placeholder="AI Cinematography Masterclass" />
            <Fld label="Short Description" value={cf.shortDesc} onChange={v=>setCf({...cf,shortDesc:v})} textarea placeholder="Master the art of visual storytelling..." />
            <div className="border-2 border-dashed border-white/20 rounded-xl p-5 text-center cursor-pointer hover:border-[#C7E36B]/50 transition-all">
              <I name="upload" size={20} className="mx-auto text-gray-500 mb-1"/><p className="text-[11px] text-gray-400">Click to upload or drag and drop</p><p className="text-[10px] text-gray-500">PNG, JPG or WEBP (Max 5MB)</p>
            </div>
          </Sect>
          <Sect icon="service" title="Key Details">
            <div className="grid grid-cols-3 gap-3">
              <Fld label="DURATION" value={cf.duration} onChange={v=>setCf({...cf,duration:v})} />
              <Fld label="PRICING" value={cf.price} onChange={v=>setCf({...cf,price:v})} />
              <Fld label="MODE" value={cf.mode} onChange={v=>setCf({...cf,mode:v})} />
            </div>
          </Sect>
          <Sect icon="link" title="CTA Section">
            <div className="grid grid-cols-2 gap-3">
              <Fld label="Button Text" value="Reserve Spot" onChange={()=>{}} />
              <div><p className="text-[10px] text-gray-400 mb-1">Action Type</p><div className="flex gap-2"><button className="flex-1 bg-[#C7E36B] text-black text-xs font-bold py-2 rounded-lg">External Link</button><button className="flex-1 bg-white/10 text-gray-300 text-xs py-2 rounded-lg">Internal Checkout</button></div></div>
            </div>
            <Fld label="Redirect URL" value="https://checkout.aifa.com/workshop-id" onChange={()=>{}} />
          </Sect>
          <Sect icon="workshop" title="Schedule">
            <div className="grid grid-cols-3 gap-3">
              <Fld label="Date" value={cf.date} onChange={v=>setCf({...cf,date:v})} placeholder="mm/dd/yyyy" />
              <Fld label="Time" value={cf.time} onChange={v=>setCf({...cf,time:v})} placeholder="--:-- --" />
              <Fld label="Timezone" value="UTC (GMT+0)" onChange={()=>{}} />
            </div>
          </Sect>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3"><Tog value={cf.published} onChange={v=>setCf({...cf,published:v})} /><span className="text-sm text-white">Published</span></div>
            <div className="flex gap-2">
              <button onClick={()=>{ setIsEditing(false); setView(isEditing?"manage":"list"); }} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg">Cancel</button>
              <button onClick={doCreate} disabled={saving} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg">{saving?(isEditing?"Updating...":"Publishing..."):(isEditing?"Save Changes":"Publish Workshop")}</button>
            </div>
          </div>
        </div>
        <div>
          <p className="text-[10px] text-green-400 font-semibold mb-2">● LIVE PREVIEW</p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3">
            <span className="text-[10px] bg-[#C7E36B] text-black font-bold px-2 py-0.5 rounded">WORKSHOP</span>
            <p className="text-sm font-bold text-white mt-2">{cf.title||"Workshop Title"}</p>
            <p className="text-[11px] text-gray-400 mt-1">{cf.shortDesc||"Short description..."}</p>
            <div className="grid grid-cols-3 gap-1 mt-2 text-[10px] text-gray-400">
              <div><span className="text-gray-500 block">DURATION</span>{cf.duration}</div>
              <div><span className="text-gray-500 block">PRICE</span>{cf.price}</div>
              <div><span className="text-gray-500 block">MODE</span>{cf.mode}</div>
            </div>
            <button className="w-full bg-[#C7E36B] text-black text-[11px] font-bold py-1.5 rounded-lg mt-2">RESERVE SPOT</button>
          </div>
          <div className="bg-[#C7E36B]/10 border border-[#C7E36B]/20 rounded-xl p-3 mt-3">
            <p className="text-[10px] text-[#C7E36B] font-semibold mb-2">Admin Tips</p>
            {["Use high-quality 16:9 images for better card display.","Titles under 50 characters work best for mobile layouts.","Ensure the CTA redirect URL is a secure HTTPS link."].map((t,i)=>(
              <p key={i} className="text-[10px] text-gray-400 flex items-start gap-1 mb-1"><span>•</span>{t}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if(view==="manage"&&sel) return (
    <div className="p-6">
      <button onClick={()=>setView("list")} className="text-xs text-gray-400 hover:text-white flex items-center gap-1 mb-3"><I name="back" size={14}/>Back to Workshops</button>
      {successMsg && <div className="bg-[#C7E36B]/10 border border-[#C7E36B]/30 text-[#C7E36B] text-sm px-4 py-2 rounded-lg mb-4 flex items-center gap-2"><I name="check" size={14}/>{successMsg}</div>}
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="flex gap-2 mb-3"><span className={`text-[10px] font-bold px-2 py-0.5 rounded ${sel.isPublished?"bg-green-500/20 text-green-400":"bg-[#C7E36B]/20 text-[#C7E36B]"}`}>{sel.isPublished?"PUBLISHED":"DRAFT"}</span><span className="text-[10px] text-gray-400">{sel.mode||"ONLINE"}</span></div>
          <h2 className="text-2xl font-black text-white">{sel.title}</h2>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[["PRICE",sel.price||"₹1,499"],["DURATION",sel.duration||"4 Hours"],["SEAT LIMIT","50 Seats"]].map(([k,v])=>(
              <div key={k} className="bg-white/5 border border-white/10 rounded-xl p-3"><p className="text-[10px] text-gray-400 font-semibold">{k}</p><p className="text-base font-bold text-white">{v}</p></div>
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-4 flex flex-col items-center justify-center min-h-[180px]">
            <I name="users" size={32} className="text-gray-600 mb-2"/>
            <p className="text-sm text-gray-400 font-semibold">{sel.registrations?.length ? `${sel.registrations.length} registrations` : "No registrations yet"}</p>
            <p className="text-xs text-gray-500 mt-1 text-center">Once published, learner registrations will appear here in real-time.</p>
            {!sel.isPublished && (
              <button onClick={()=>doPublish(sel)} className="mt-4 bg-[#C7E36B] text-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-lime-300">📣 Publish Workshop to Live</button>
            )}
            {sel.isPublished && (
              <span className="mt-4 text-xs text-green-400 font-semibold">✓ Published and Live</span>
            )}
          </div>
        </div>
        <div className="w-[200px] shrink-0 space-y-3">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs font-semibold text-white mb-3">Management Actions</p>
            {[
              ["Edit Details","edit",()=>startEdit(sel)],
              ["Preview Website Card","eye",()=>window.open("/workshops","_blank")],
              ["Copy Registration Link","copy",()=>{ navigator.clipboard.writeText(`${window.location.origin}/workshops#${sel._id}`); alert("Link copied!"); }],
              ["Delete Workshop","trash",()=>{ doDelete(sel._id); setView("list"); }],
            ].map(([l,ic,fn])=>(
              <button key={l} onClick={fn} className={`w-full flex items-center gap-2 text-xs py-2 border-b border-white/5 last:border-0 ${l.includes("Delete")?"text-red-400":"text-gray-300"} hover:text-white`}>
                <I name={ic} size={12}/>{l}
              </button>
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs font-semibold text-white mb-3">Schedule Summary</p>
            {[
              ["DATE", sel.scheduledAt ? new Date(sel.scheduledAt).toLocaleDateString("en-IN") : "Not scheduled"],
              ["DURATION", sel.duration || "—"],
              ["MODE", sel.mode || "ONLINE"],
            ].map(([k,v])=>(
              <div key={k} className="mb-2"><p className="text-[9px] text-gray-500 font-semibold">{k}</p><p className="text-xs text-white">{v}</p></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const published = workshops.filter(w=>w.isPublished);
  const filtered = workshops.filter(w => {
    const matchSearch = w.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter==="All" || (statusFilter==="Published"&&w.isPublished) || (statusFilter==="Draft"&&!w.isPublished);
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <span className="text-[10px] bg-[#C7E36B]/20 text-[#C7E36B] font-bold px-2 py-0.5 rounded-full">{published.length} PUBLISHED WORKSHOPS</span>
          <h1 className="text-xl font-bold text-white mt-1">Workshop Repository</h1>
          <p className="text-xs text-gray-400">Manage all your published and draft workshops in one place.</p>
        </div>
        <button onClick={()=>setView("create")} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300">
          Create New Workshop
        </button>
      </div>
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search workshops by title..." className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder-gray-500 outline-none"/>
          <I name="search" size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500"/>
        </div>
        <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="bg-white/5 border border-white/10 text-gray-400 text-sm rounded-lg px-3 py-2 outline-none">
          <option>All</option><option>Published</option><option>Draft</option>
        </select>
      </div>
      {loading ? <AdminLoader label="Loading Workshops" /> : (
        <div className="space-y-3">
          {filtered.length===0 && <p className="text-gray-500 text-sm py-8 text-center">No workshops found</p>}
          {filtered.map(w=>(
            <div key={w._id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 hover:border-white/20 transition-all">
              <div className="w-[110px] h-[72px] bg-white/10 rounded-lg overflow-hidden shrink-0">
                <img src={w.image||"/courses/v1.png"} alt="" className="w-full h-full object-cover"/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${w.isPublished?"bg-green-500/20 text-green-400":"bg-yellow-500/20 text-yellow-400"}`}>{w.isPublished?"PUBLISHED":"DRAFT"}</span>
                  {w.scheduledAt && <span className="text-[10px] text-gray-500">📅 {new Date(w.scheduledAt).toLocaleDateString()}</span>}
                </div>
                <h3 className="text-sm font-bold text-white">{w.title}</h3>
                <div className="flex items-center gap-4 mt-1 text-[10px] text-gray-400">
                  <span>👥 {w.registrations?.length||0}/{w.seats||50} registered</span>
                  <span>⌨ {w.mode||"ONLINE"}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="text-base font-bold text-white">₹{w.price}</span>
                <div className="flex gap-2">
                  <button onClick={()=>{setSel(w);setView("manage");}} className={`text-xs font-bold px-3 py-1.5 rounded-lg ${w.isPublished?"bg-[#C7E36B] text-black hover:bg-lime-300":"border border-white/20 text-gray-300 hover:bg-white/5"}`}>
                    {w.isPublished?"Manage Workshop":"Continue Editing"}
                  </button>
                  <button onClick={()=>doDelete(w._id)} className="text-xs border border-red-500/30 text-red-400 px-2 py-1.5 rounded-lg hover:bg-red-500/10"><I name="trash" size={12}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-gray-500 mt-3">Showing {filtered.length} of {workshops.length} workshops</p>
    </div>
  );
}

/* ── VIDEO COURSES ADMIN ── */
function VideoCoursesAdmin({ token }) {
  const [view, setView] = useState("list");
  const [step, setStep] = useState(1);
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);

  const loadCourses = () => {
    setCoursesLoading(true);
    return fetch("/api/courses?all=true", { headers:{ Authorization:`Bearer ${token}` } })
      .then(r=>r.json()).then(d=>{ if(Array.isArray(d)) setCourses([...d].reverse()); setCoursesLoading(false); }).catch(()=>setCoursesLoading(false));
  };
  useEffect(() => { loadCourses(); }, [token]);
  const [f, setF] = useState({ title:"", shortDesc:"", fullDesc:"", category:"AI & Machine Learning", level:"Beginner", language:"English", instructor:"", price:"", discPrice:"", accessType:"Lifetime", genCert:true, allowCoupons:false });
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [sections, setSections] = useState([{ title:"Section 1: AI Fundamentals", lessons:[{ title:"Introduction to AI Cinema", duration:"09:45", type:"Video", desc:"", isFree:true }] }]);
  const [activeL, setActiveL] = useState({ s:0, l:0 });
  const [saving, setSaving]       = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [editLessons, setEditLessons] = useState([]);
  const [editSaving, setEditSaving] = useState(false);
  const [editMsg, setEditMsg]     = useState("");
  const STEPS = ["Basic Info","Curriculum","Pricing","Publish"];

  const buildPayload = (isPublished, scheduledAt=null) => ({
    title: f.title, description: f.fullDesc, shortDesc: f.shortDesc,
    category: f.category, level: f.level, language: f.language,
    instructor: f.instructor, price: parseFloat(f.price)||0,
    originalPrice: parseFloat(f.discPrice)||0, image: f.thumbnail||"",
    accessType: f.accessType, currency: f.currency||"INR (₹)",
    generateCertificate: f.genCert, allowCoupons: f.allowCoupons||false,
    ...(f.accessType==="Limited" && { accessFrom: f.accessFrom, accessTo: f.accessTo }),
    ...(scheduledAt && { scheduledAt }),
    lessons: sections.flatMap((s,si)=>s.lessons.map((l,li)=>({
      title:l.title, duration:l.duration, videoUrl:l.videoUrl||"",
      order:si*100+li, isFree:l.isFree||false, type:"Video"
    }))),
    isPublished,
  });

  const saveDraft = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/courses",{ method:"POST", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}, body:JSON.stringify(buildPayload(false)) });
      if(res.ok){ await loadCourses(); setView("list"); }
    } catch(e){}
    setSaving(false);
  };

  const publish = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/courses",{ method:"POST", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}, body:JSON.stringify(buildPayload(true)) });
      if(res.ok){ await loadCourses(); setView("list"); }
    } catch(e){}
    setSaving(false);
  };

  const schedulePublish = async () => {
    if(!scheduleDate) return;
    setSaving(true);
    try {
      const res = await fetch("/api/courses",{ method:"POST", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}, body:JSON.stringify(buildPayload(false, scheduleDate)) });
      if(res.ok){ await loadCourses(); setView("list"); }
    } catch(e){}
    setSaving(false);
  };

  const deleteCourse = async id => {
    if(!window.confirm("Delete this course permanently?")) return;
    await fetch(`/api/courses/${id}`,{ method:"DELETE", headers:{ Authorization:`Bearer ${token}` } });
    setCourses(cs=>cs.filter(c=>c._id!==id));
  };

  const addLesson = si => { const u=[...sections]; u[si].lessons.push({title:"New Lesson",duration:"",type:"Video",desc:"",isFree:false,_editing:true}); setSections(u); setActiveL({s:si,l:u[si].lessons.length-1}); };
  const updLesson = (key,val) => setSections(sections.map((s,si)=>si===activeL.s?{...s,lessons:s.lessons.map((l,li)=>li===activeL.l?{...l,[key]:val}:l)}:s));

  const fetchVideoDuration = async (url) => {
    if (!url) return;
    try {
      const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
      if (vimeoMatch) {
        const res = await fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${vimeoMatch[1]}`);
        const data = await res.json();
        if (data.duration) {
          const m = Math.floor(data.duration / 60);
          const s = String(data.duration % 60).padStart(2,"0");
          updLesson("duration", `${m}:${s}`);
        }
        return;
      }
      const ytMatch = url.match(/youtube\.com\/embed\/([^?]+)/);
      if (ytMatch) {
        const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${ytMatch[1]}&format=json`);
        const data = await res.json();
        if (data.title && !sections[activeL.s]?.lessons[activeL.l]?.title?.trim()) {
          updLesson("title", data.title);
        }
      }
    } catch {}
  };

  const [editInfo, setEditInfo] = useState({});
  const saveEditInfo = async () => {
    setEditSaving(true); setEditMsg("");
    const res = await fetch(`/api/courses/${editCourse._id}`, {
      method:"PUT", headers:{"Content-Type":"application/json", Authorization:`Bearer ${token}`},
      body: JSON.stringify(editInfo),
    });
    if(res.ok) { const d=await res.json(); setEditCourse(d); setEditMsg("Saved!"); loadCourses(); }
    else setEditMsg("Save failed.");
    setEditSaving(false); setTimeout(()=>setEditMsg(""),3000);
  };

  if (view === "edit" && editCourse) return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-5 pb-3 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => { setView("list"); setEditCourse(null); }} className="text-gray-400 hover:text-white text-xs flex items-center gap-1"><I name="back" size={14}/> Back</button>
          <div>
            <h1 className="text-lg font-bold text-white">{editCourse.title}</h1>
            <p className="text-xs text-gray-400">Edit course details and manage lesson videos</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          {editMsg && <p className={`text-xs ${editMsg === "Saved!" ? "text-green-400" : "text-red-400"}`}>{editMsg}</p>}
          <button onClick={async () => {
            setEditSaving(true); setEditMsg("");
            const payload = { ...editInfo, lessons: editLessons.map((l, i) => ({ ...l, order: i })) };
            const res = await fetch(`/api/courses/${editCourse._id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
              body: JSON.stringify(payload),
            });
            if (res.ok) { const d = await res.json(); setEditCourse(d); setEditInfo({}); setEditMsg("Saved!"); loadCourses(); }
            else setEditMsg("Save failed.");
            setEditSaving(false);
            setTimeout(() => setEditMsg(""), 3000);
          }} disabled={editSaving} className="text-xs bg-[#C7E36B] text-black font-bold px-5 py-2 rounded-lg disabled:opacity-60">
            {editSaving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Course basic info edit */}
        <Sect icon="resources" title="Course Details">
          <div className="grid grid-cols-2 gap-3">
            <Fld label="Title" value={editInfo.title ?? editCourse.title ?? ""} onChange={v=>setEditInfo(i=>({...i,title:v}))} />
            <Fld label="Price (₹)" value={String(editInfo.price ?? editCourse.price ?? "")} onChange={v=>setEditInfo(i=>({...i,price:parseFloat(v)||0}))} />
          </div>
          <Fld label="Description" value={editInfo.description ?? editCourse.description ?? ""} onChange={v=>setEditInfo(i=>({...i,description:v}))} textarea />
          <Fld label="Thumbnail URL" value={editInfo.image ?? editCourse.image ?? ""} onChange={v=>setEditInfo(i=>({...i,image:v}))} placeholder="https://..." />
          {(() => {
            const isLive = editInfo.isPublished ?? editCourse.isPublished ?? false;
            return (
              <div className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/5">
                <div className="flex items-center gap-3">
                  <Tog value={isLive} onChange={v=>setEditInfo(i=>({...i,isPublished:v}))} />
                  <div>
                    <p className="text-xs font-semibold text-white">{isLive ? "● Live — visible to students" : "○ Draft — hidden from students"}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{isLive ? "Toggle off to unpublish" : "Toggle on then Save Changes to publish"}</p>
                  </div>
                </div>
                <button onClick={async()=>{
                  const newVal = !isLive;
                  setEditInfo(i=>({...i,isPublished:newVal}));
                  const res = await fetch(`/api/courses/${editCourse._id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},body:JSON.stringify({isPublished:newVal})});
                  if(res.ok){const d=await res.json();setEditCourse(d);setEditMsg(newVal?"Published!":"Unpublished");loadCourses();setTimeout(()=>setEditMsg(""),3000);}
                }} className={`text-xs font-bold px-4 py-2 rounded-lg transition-all ${isLive?"border border-red-400/50 text-red-400 hover:bg-red-500/10":"bg-[#C7E36B] text-black hover:bg-lime-300"}`}>
                  {isLive ? "Unpublish" : "Publish Now"}
                </button>
              </div>
            );
          })()}
        </Sect>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-white">Lesson Videos</h2>
              <p className="text-xs text-gray-400">{editLessons.length} lessons · Add Vimeo embed URLs</p>
            </div>
            <button onClick={() => setEditLessons([...editLessons, { title: "", videoUrl: "", duration: "", isFree: false }])} className="text-xs bg-[#C7E36B] text-black font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"><I name="plus" size={12}/> Add Lesson</button>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-4 text-xs text-gray-400">
            <p className="font-semibold text-gray-300 mb-1">Supported embed URL formats:</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-gray-500 mb-0.5">Vimeo:</p>
                <code className="text-[10px] text-[#C7E36B]">https://player.vimeo.com/video/VIDEO_ID</code>
                <p className="mt-0.5 text-[10px] text-gray-500">Open your video → Share → Embed → copy the <strong className="text-gray-400">src</strong> value.</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 mb-0.5">YouTube:</p>
                <code className="text-[10px] text-[#C7E36B]">https://www.youtube.com/embed/VIDEO_ID</code>
                <p className="mt-0.5 text-[10px] text-gray-500">Open your video → Share → Embed → copy the <strong className="text-gray-400">src</strong> value.</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {editLessons.map((lesson, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#C7E36B]/20 text-[#C7E36B] text-xs font-bold flex items-center justify-center shrink-0">{idx + 1}</span>
                  <input value={lesson.title} onChange={e => setEditLessons(ls => ls.map((l, i) => i === idx ? { ...l, title: e.target.value } : l))} placeholder="Lesson title e.g. Introduction to AI Cinematography" className="flex-1 bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50"/>
                  <button onClick={() => setEditLessons(ls => ls.filter((_, i) => i !== idx))} className="text-gray-600 hover:text-red-400 shrink-0 transition-colors" title="Remove lesson"><I name="trash" size={14}/></button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <p className="text-[10px] text-gray-500 font-semibold mb-1">VIDEO URL</p>
                    <input
                      value={lesson.videoUrl || ""}
                      onChange={e => setEditLessons(ls => ls.map((l, i) => i === idx ? { ...l, videoUrl: e.target.value } : l))}
                      onBlur={async e => {
                        const url = e.target.value;
                        if (!url) return;
                        const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
                        if (vimeoMatch) {
                          try {
                            const r = await fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${vimeoMatch[1]}`);
                            const d = await r.json();
                            if (d.duration) {
                              const m = Math.floor(d.duration / 60);
                              const s = String(d.duration % 60).padStart(2, "0");
                              setEditLessons(ls => ls.map((l, i) => i === idx && !l.duration ? { ...l, duration: `${m}:${s}` } : l));
                            }
                          } catch {}
                        }
                      }}
                      placeholder="https://player.vimeo.com/video/...  or  https://www.youtube.com/embed/..."
                      className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50 font-mono"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-semibold mb-1">DURATION</p>
                    <input value={lesson.duration || ""} onChange={e => setEditLessons(ls => ls.map((l, i) => i === idx ? { ...l, duration: e.target.value } : l))} placeholder="e.g. 12:30" className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50"/>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {lesson.videoUrl && <a href={lesson.videoUrl} target="_blank" rel="noreferrer" className="text-[10px] text-[#C7E36B] hover:underline flex items-center gap-1"><I name="video" size={11}/> Preview URL</a>}
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-xs text-gray-400">Free Preview</span>
                    <Tog value={lesson.isFree || false} onChange={v => setEditLessons(ls => ls.map((l, i) => i === idx ? { ...l, isFree: v } : l))}/>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {editLessons.length > 0 && (
            <button onClick={() => setEditLessons([...editLessons, { title: "", videoUrl: "", duration: "", isFree: false }])} className="w-full mt-3 border-2 border-dashed border-white/10 text-gray-500 hover:border-[#C7E36B]/30 hover:text-[#C7E36B] text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-1">
              <I name="plus" size={12}/> Add Another Lesson
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if(view==="create") return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-5 pb-3 border-b border-white/5 flex items-center justify-between">
        <h1 className="text-lg font-bold text-white">Create New Course</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {STEPS.map((s,i)=>(
              <div key={s} className="flex items-center">
                <button onClick={()=>setStep(i+1)} className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${step>i+1?"bg-[#C7E36B] text-black":step===i+1?"bg-[#C7E36B] text-black":"bg-white/10 text-gray-400"}`}>
                  {step>i+1?<I name="check" size={12}/>:i+1}
                </button>
                {i<STEPS.length-1&&<div className={`w-6 h-0.5 mx-1 ${step>i+1?"bg-[#C7E36B]":"bg-white/10"}`}/>}
              </div>
            ))}
          </div>
          <button onClick={saveDraft} disabled={saving} className="text-xs border border-white/20 text-gray-300 px-3 py-1.5 rounded-lg hover:bg-white/5 disabled:opacity-50">{saving?"Saving...":"SAVE AS DRAFT"}</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        {step===1 && (
          <div className="max-w-2xl space-y-4">
            <div>
              <p className="text-[10px] text-gray-400 font-semibold uppercase mb-1.5">Course Title</p>
              {(() => {
                const isDupe = f.title.trim() && courses.some(c => c.title.trim().toLowerCase() === f.title.trim().toLowerCase());
                return (
                  <>
                    <input
                      value={f.title}
                      onChange={e=>setF({...f,title:e.target.value})}
                      placeholder="e.g. Master AI Filmmaking in 30..."
                      className={`w-full bg-[#1A1D1E] border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none transition-all ${isDupe?"border-red-500 focus:border-red-500":"border-white/10 focus:border-[#C7E36B]/50"}`}
                    />
                    {isDupe && <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">⚠ A course with this name already exists</p>}
                  </>
                );
              })()}
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold uppercase mb-1.5">Course Thumbnail (16:9)</p>
              <input type="file" accept="image/*" className="hidden" id="thumbUpload" onChange={e=>{
                const file=e.target.files?.[0]; if(!file) return;
                const reader=new FileReader();
                reader.onload=ev=>setF(p=>({...p,thumbnail:ev.target.result}));
                reader.readAsDataURL(file); e.target.value="";
              }}/>
              {f.thumbnail?(
                <div className="relative rounded-xl overflow-hidden border border-white/10 w-full mb-2" style={{aspectRatio:"16/9"}}>
                  <img src={f.thumbnail} alt="Thumbnail" className="w-full h-full object-cover"/>
                  <button onClick={()=>setF(p=>({...p,thumbnail:""}))} className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg hover:bg-red-500/80 transition-all">✕ Remove</button>
                </div>
              ):(
                <label htmlFor="thumbUpload" className="flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-xl h-[120px] cursor-pointer hover:border-[#C7E36B]/50 transition-all mb-2">
                  <I name="upload" size={22} className="text-gray-500 mb-1"/>
                  <p className="text-xs text-gray-400 font-semibold">Click to upload image</p>
                  <p className="text-[10px] text-gray-600 mt-0.5">PNG, JPG, WEBP</p>
                </label>
              )}
              <div className="flex items-center gap-2 my-2">
                <div className="flex-1 h-[1px] bg-white/10"/>
                <span className="text-[10px] text-gray-500">or paste URL</span>
                <div className="flex-1 h-[1px] bg-white/10"/>
              </div>
              <input
                value={f.thumbnail&&f.thumbnail.startsWith("data:")?"":(f.thumbnail||"")}
                onChange={e=>setF(p=>({...p,thumbnail:e.target.value}))}
                disabled={!!(f.thumbnail&&f.thumbnail.startsWith("data:"))}
                placeholder={f.thumbnail&&f.thumbnail.startsWith("data:")?"Image uploaded — remove it to paste a URL instead":"https://... (paste image URL)"}
                className={`w-full bg-[#1A1D1E] border rounded-lg px-3 py-2.5 text-sm placeholder-gray-600 outline-none transition-all ${f.thumbnail&&f.thumbnail.startsWith("data:")?"border-white/5 text-gray-600 cursor-not-allowed opacity-50":"border-white/10 text-white focus:border-[#C7E36B]/50"}`}
              />
            </div>
            <Fld label="Short Description" value={f.shortDesc} onChange={v=>setF({...f,shortDesc:v})} placeholder="A brief hook for your course..." />
            <Fld label="Full Description" value={f.fullDesc} onChange={v=>setF({...f,fullDesc:v})} textarea placeholder="Explain what students will learn..." />
            <div className="grid grid-cols-6 gap-3">
              <div className="col-span-2"><Fld label="Category" value={f.category} onChange={v=>setF({...f,category:v})} /></div>
              <Fld label="Level" value={f.level} onChange={v=>setF({...f,level:v})} />
              <Fld label="Language" value={f.language} onChange={v=>setF({...f,language:v})} />
              <div className="col-span-2"><Fld label="Instructor" value={f.instructor} onChange={v=>setF({...f,instructor:v})} placeholder="Instructor Name" /></div>
            </div>
          </div>
        )}
        {step===2 && (
          <div className="flex gap-4" style={{minHeight:"400px"}}>
            <div className="w-[250px] shrink-0">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-white">CURRICULUM</p>
              </div>
              {sections.map((sec,si)=>(
                <div key={si} className="mb-3">
                  {sec._editing?(
                    <div className="flex items-center gap-1 mb-1">
                      <input
                        autoFocus
                        value={sec.title}
                        onChange={e=>setSections(sections.map((s,i)=>i===si?{...s,title:e.target.value}:s))}
                        onKeyDown={e=>{if(e.key==="Enter")setSections(sections.map((s,i)=>i===si?{...s,_editing:false}:s));}}
                        placeholder="Section name..."
                        className="flex-1 bg-[#1A1D1E] border border-[#C7E36B]/50 rounded-lg px-2 py-1.5 text-[11px] font-semibold text-white outline-none min-w-0"
                      />
                      <button onClick={()=>setSections(sections.map((s,i)=>i===si?{...s,_editing:false}:s))} className="text-[10px] bg-[#C7E36B] text-black font-bold px-2 py-1.5 rounded-lg hover:bg-lime-300">✓</button>
                    </div>
                  ):(
                    <div className="bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 mb-1 flex items-center gap-1 group">
                      <p className="flex-1 text-[11px] font-semibold text-white truncate">{sec.title}</p>
                      <button onClick={()=>setSections(sections.map((s,i)=>i===si?{...s,_editing:true}:s))} className="text-gray-600 hover:text-[#C7E36B] shrink-0 transition-all" title="Rename">
                        <I name="edit" size={10}/>
                      </button>
                      {sections.length>1&&(
                        <button onClick={()=>{const u=sections.filter((_,i)=>i!==si);setSections(u);setActiveL({s:0,l:0});}} className="text-gray-600 hover:text-red-400 shrink-0 transition-all ml-0.5" title="Delete section">
                          <I name="trash" size={10}/>
                        </button>
                      )}
                    </div>
                  )}
                  {sec.lessons.map((les,li)=>(
                    <div key={li} className="mb-0.5">
                      {les._editing?(
                        <div className="flex items-center gap-1">
                          <input
                            autoFocus
                            value={les.title}
                            onChange={e=>{const u=sections.map((s,si2)=>si2===si?{...s,lessons:s.lessons.map((l,li2)=>li2===li?{...l,title:e.target.value}:l)}:s);setSections(u);}}
                            onKeyDown={e=>{if(e.key==="Enter"){const u=sections.map((s,si2)=>si2===si?{...s,lessons:s.lessons.map((l,li2)=>li2===li?{...l,_editing:false}:l)}:s);setSections(u);}}}
                            className="flex-1 bg-[#1A1D1E] border border-[#C7E36B]/50 rounded-lg px-2 py-1 text-[10px] text-white outline-none min-w-0"
                          />
                          <button onClick={()=>{const u=sections.map((s,si2)=>si2===si?{...s,lessons:s.lessons.map((l,li2)=>li2===li?{...l,_editing:false}:l)}:s);setSections(u);}} className="text-[10px] bg-[#C7E36B] text-black font-bold px-2 py-1 rounded-lg">✓</button>
                        </div>
                      ):(
                        <div className={`w-full flex items-center gap-1 px-2 py-1.5 text-[10px] rounded ${activeL.s===si&&activeL.l===li?"bg-[#C7E36B]/10 text-[#C7E36B]":"text-gray-400 hover:bg-white/5"}`}>
                          <button onClick={()=>setActiveL({s:si,l:li})} className="flex items-center gap-1.5 flex-1 text-left min-w-0">
                            <I name="check" size={9} className="text-green-400 shrink-0"/>
                            <span className="truncate">{les.title}</span>
                          </button>
                          <button onClick={()=>{const u=sections.map((s,si2)=>si2===si?{...s,lessons:s.lessons.map((l,li2)=>li2===li?{...l,_editing:true}:l)}:s);setSections(u);setActiveL({s:si,l:li});}} className="text-gray-600 hover:text-[#C7E36B] shrink-0 transition-all" title="Rename"><I name="edit" size={9}/></button>
                          <button onClick={()=>{const u=sections.map((s,si2)=>si2===si?{...s,lessons:s.lessons.filter((_,li2)=>li2!==li)}:s);setSections(u);if(activeL.s===si&&activeL.l===li)setActiveL({s:si,l:0});}} className="text-gray-600 hover:text-red-400 shrink-0 transition-all" title="Delete lesson"><I name="trash" size={9}/></button>
                        </div>
                      )}
                    </div>
                  ))}
                  <button onClick={()=>addLesson(si)} className="w-full text-left text-[10px] text-gray-500 hover:text-[#C7E36B] px-3 py-1 flex items-center gap-1"><I name="plus" size={9}/>Add Lesson</button>
                </div>
              ))}
              <button onClick={()=>{setSections([...sections,{title:`Section ${sections.length+1}`,lessons:[],_editing:true}]);}} className="w-full text-[10px] text-gray-500 border border-dashed border-white/20 rounded-lg py-2 hover:border-[#C7E36B]/50 hover:text-[#C7E36B] transition-all">+ Add New Section</button>
            </div>
            <div className="flex-1">
              {sections[activeL.s]?.lessons[activeL.l] && (() => {
                const les = sections[activeL.s].lessons[activeL.l];
                return (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-white">Edit Lesson</p>
                      <div />
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] text-gray-400 font-semibold uppercase">Video URL (Vimeo or YouTube)</p>
                      <input
                        value={les.videoUrl||""}
                        onChange={e=>updLesson("videoUrl",e.target.value)}
                        onBlur={e=>fetchVideoDuration(e.target.value)}
                        placeholder="https://player.vimeo.com/video/ID  or  https://www.youtube.com/embed/ID"
                        className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50 font-mono"
                      />
                      <p className="text-[10px] text-gray-500">Paste Vimeo or YouTube embed URL — duration auto-fills for Vimeo</p>
                      {les.videoUrl&&(les.videoUrl.includes("vimeo")||les.videoUrl.includes("youtube"))&&(
                        <div className="rounded-xl overflow-hidden aspect-video border border-white/10 mt-2">
                          <iframe src={les.videoUrl} className="w-full h-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title="Lesson preview"/>
                        </div>
                      )}
                    </div>
                    <Fld label="Lesson Title" value={les.title} onChange={v=>updLesson("title",v)}/>
                    <div className="grid grid-cols-2 gap-3">
                      <Fld label="Duration (auto-filled)" value={les.duration} onChange={v=>updLesson("duration",v)} placeholder="e.g. 9:45"/>
                      <div>
                        <p className="text-[10px] text-gray-400 font-semibold uppercase mb-1.5">Lesson Type</p>
                        <div className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-gray-400">Video</div>
                      </div>
                    </div>
                    <Fld label="Description" value={les.desc} onChange={v=>updLesson("desc",v)} textarea placeholder="What will students learn in this..."/>
                    <div className="flex items-center justify-between border-t border-white/5 pt-3">
                      <div />
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
        {step===3 && (
          <div className="max-w-lg space-y-5">
            <Sect icon="payments" title="Course Pricing">
              <div className="grid grid-cols-2 gap-4">
                <Fld label="Base Price (₹)" value={f.price} onChange={v=>setF({...f,price:v})} prefix="₹" placeholder="0"/>
                <Fld label="Discounted Price (₹ Optional)" value={f.discPrice} onChange={v=>setF({...f,discPrice:v})} prefix="₹"/>
              </div>
            </Sect>
            <Sect icon="eye" title="Access & Expiry">
              <div className="flex gap-2 mb-3">
                {["Lifetime","Limited"].map(t=><button key={t} onClick={()=>setF({...f,accessType:t})} className={`px-4 py-2 text-xs font-semibold rounded-lg ${f.accessType===t?"bg-[#C7E36B] text-black":"bg-white/10 text-gray-300"}`}>{t}</button>)}
              </div>
              {f.accessType==="Limited"&&(
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Fld label="From Date" type="date" min={new Date().toISOString().split("T")[0]} value={f.accessFrom||""} onChange={v=>setF({...f,accessFrom:v,accessTo:(f.accessTo&&f.accessTo<v)?v:f.accessTo})}/>
                  <Fld label="To Date (Expiry)" type="date" min={f.accessFrom||new Date().toISOString().split("T")[0]} value={f.accessTo||""} onChange={v=>setF({...f,accessTo:v})}/>
                </div>
              )}
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase mb-1.5">Currency</p>
                <div className="flex gap-2">
                  {["INR (₹)","USD ($)"].map(c=>(
                    <button key={c} onClick={()=>setF({...f,currency:c})} className={`px-4 py-2 text-xs font-semibold rounded-lg ${(f.currency||"INR (₹)")===c?"bg-[#C7E36B] text-black":"bg-white/10 text-gray-300"}`}>{c}</button>
                  ))}
                </div>
              </div>
            </Sect>
            <Sect icon="cert" title="Course Features">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between"><p className="text-xs text-white">Generate Certificate</p><Tog value={f.genCert} onChange={v=>setF({...f,genCert:v})}/></div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between"><p className="text-xs text-white">Allow Coupons</p><Tog value={f.allowCoupons||false} onChange={v=>setF({...f,allowCoupons:v})}/></div>
              </div>
            </Sect>
          </div>
        )}
        {step===4 && (
          <div className="flex gap-6">
            <div className="flex-1 space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex gap-4">
                <div className="w-[100px] h-[70px] bg-white/10 rounded-lg overflow-hidden shrink-0"><img src="/courses/v1.png" alt="" className="w-full h-full object-cover"/></div>
                <div>
                  <div className="flex gap-2 mb-1"><span className="text-[10px] bg-[#C7E36B]/20 text-[#C7E36B] font-bold px-2 py-0.5 rounded">DRAFT</span><span className="text-[10px] text-gray-400">AI Filmmaking</span></div>
                  <h3 className="text-base font-bold text-white">{f.title||"Master AI Filmmaking in 30 Days"}</h3>
                  <div className="flex gap-4 mt-2 text-[10px] text-gray-400">
                    <span>TOTAL SECTIONS: {sections.length}</span><span>LESSONS: {sections.reduce((a,s)=>a+s.lessons.length,0)}</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-white mb-3">Launch Checklist</h3>
                {["Basic information completed","Curriculum structure is valid","Pricing and access rules set"].map((item,i)=>(
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                    <div className="w-5 h-5 rounded-full bg-[#C7E36B]/20 flex items-center justify-center"><I name="check" size={10} className="text-[#C7E36B]"/></div>
                    <p className="text-xs text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[200px] shrink-0 space-y-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-xs font-semibold text-white mb-1">Ready to Launch?</p>
                <p className="text-[11px] text-gray-400 mb-3">Your course will be visible on the AIFA marketplace once published.</p>
                <button onClick={publish} disabled={saving} className="w-full bg-[#C7E36B] text-black text-xs font-bold py-2 rounded-lg hover:bg-lime-300 mb-2 disabled:opacity-50">{saving?"Publishing...":"Publish Course Now"}</button>
                {showSchedule?(
                  <div className="space-y-2">
                    <input type="datetime-local" value={scheduleDate} min={new Date().toISOString().slice(0,16)} onChange={e=>setScheduleDate(e.target.value)} className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-2 py-1.5 text-[11px] text-white outline-none focus:border-[#C7E36B]/50 [color-scheme:dark]"/>
                    <div className="flex gap-1.5">
                      <button onClick={schedulePublish} disabled={saving||!scheduleDate} className="flex-1 bg-[#C7E36B]/20 border border-[#C7E36B]/40 text-[#C7E36B] text-[10px] font-bold py-1.5 rounded-lg hover:bg-[#C7E36B]/30 disabled:opacity-50">{saving?"Saving...":"Confirm"}</button>
                      <button onClick={()=>setShowSchedule(false)} className="border border-white/20 text-gray-400 text-[10px] px-2 py-1.5 rounded-lg hover:bg-white/5">✕</button>
                    </div>
                  </div>
                ):(
                  <button onClick={()=>setShowSchedule(true)} className="w-full border border-white/20 text-gray-300 text-xs py-2 rounded-lg hover:bg-white/5">SCHEDULE FOR LATER</button>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between mt-6 pt-4 border-t border-white/5">
          <button onClick={()=>step>1?setStep(s=>s-1):setView("list")} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg hover:bg-white/5">← Back</button>
          <div className="flex gap-2">
            <button onClick={saveDraft} disabled={saving} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg hover:bg-white/5 disabled:opacity-50">{saving?"Saving...":"SAVE DRAFT"}</button>
            <button onClick={publish} disabled={saving} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300 disabled:opacity-50">{saving?"Publishing...":"Publish Course"}</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-white">Video Courses</h1>
        <button onClick={()=>{setView("create");setStep(1);}} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300 ">Create New Course</button>
      </div>
      <div className="flex gap-3 mb-4">
        <div className="relative">
          <input type="text" placeholder="Search courses..." className="bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder-gray-500 outline-none w-[200px]"/>
          <I name="search" size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500"/>
        </div>
        {["Sort By ▼","Level ▼","Category ▼"].map(f=><select key={f} className="bg-white/5 border border-white/10 text-gray-400 text-sm rounded-lg px-3 py-2 outline-none"><option>{f}</option></select>)}
      </div>
      {coursesLoading
        ? <AdminLoader label="Loading Courses" />
        : courses.length === 0
        ? <div className="text-center py-12"><p className="text-gray-400 text-sm">No courses yet.</p><button onClick={()=>{setView("create");setStep(1);}} className="mt-3 text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg">Create First Course</button></div>
        : (
        <div className="grid grid-cols-3 gap-4">
          {courses.map((c,idx)=>(
            <div key={c._id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all">
              <div className="relative h-[140px]">
                <img src={c.image||`/courses/v${(idx%6)+1}.png`} alt={c.title} className="w-full h-full object-cover"/>
                <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${c.isPublished?"bg-green-500/80 text-white":"bg-yellow-500/80 text-black"}`}>{c.isPublished?"published":"draft"}</span>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-white mb-1">{c.title}</h3>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-[#C7E36B] font-bold">₹{c.price}</span>
                  <span className="text-[10px] text-gray-400">{c.level||"Beginner"}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] text-gray-500">👥 {c.enrolledCourses?.length ?? c.enrollmentCount ?? 0} enrolled</span>
                  <button onClick={async()=>{
                    const r=await fetch(`/api/courses/${c._id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},body:JSON.stringify({isPublished:!c.isPublished})});
                    if(r.ok) setCourses(cs=>cs.map(x=>x._id===c._id?{...x,isPublished:!c.isPublished}:x));
                  }} className={`text-xs font-bold px-3 py-1 rounded-lg transition-all ${c.isPublished?"bg-green-500/20 text-green-400 hover:bg-red-500/20 hover:text-red-400":"bg-[#C7E36B] text-black animate-pulse hover:animate-none hover:bg-lime-300"}`}>
                    {c.isPublished?"● Live":"Publish"}
                  </button>
                </div>
                <div className="flex gap-2">
                  <button onClick={()=>window.open(`/courses/${c._id}/watch`,"_blank")} className="flex-1 text-xs border border-white/20 text-gray-300 py-1.5 rounded-lg hover:bg-white/5 flex items-center justify-center gap-1"><I name="eye" size={11}/>View</button>
                  <button onClick={()=>{ setEditCourse(c); setEditInfo({}); setEditLessons(c.lessons&&c.lessons.length>0?c.lessons.map(l=>({...l})):[{title:"",videoUrl:"",duration:"",isFree:false}]); setView("edit"); }} className="text-xs border border-white/20 text-gray-300 px-2 py-1.5 rounded-lg hover:bg-white/5 flex items-center gap-1"><I name="edit" size={11}/>Edit</button>
                  <button onClick={()=>deleteCourse(c._id)} className="text-xs border border-red-500/30 text-red-400 px-2 py-1.5 rounded-lg hover:bg-red-500/10"><I name="trash" size={11}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── RESOURCES ADMIN ── */
const RES_TABS = [
  { key: "prompt",   label: "PROMPT LIBRARY" },
  { key: "workflow", label: "WORK FLOW"       },
  { key: "project",  label: "PROJECT"         },
  { key: "tip",      label: "LEARNING TIPS"   },
  { key: "deal",     label: "AI DEAL"         },
];

function ResourcesAdmin({ token }) {
  const [tab, setTab]           = useState("prompt");
  const [resources, setResources] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving]     = useState(false);
  const [msg, setMsg]           = useState("");
  const [resType, setResType]   = useState("prompt");
  const [form, setForm]         = useState({ title:"", category:"", subCategory:"", description:"", thumbnail:"", content:"", allowCopy:true, isFeatured:false, discount:"", link:"", logo:"", couponCode:"", expiry:"", ctaText:"", status:"Draft" });
  const [steps, setSteps]       = useState([{ title:"", description:"" }]);
  const [tools, setTools]       = useState([]);
  const [newTool, setNewTool]   = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const [projectSearch, setProjectSearch] = useState("");
  const [catFilter, setCatFilter]         = useState("All");
  const [subCatFilter, setSubCatFilter]   = useState("All");
  const [copiedId, setCopiedId]           = useState(null);

  const load = (type) => {
    setLoading(true); setResources([]);
    fetch(`/api/resources?type=${type}`)
      .then(r=>r.json()).then(d=>{ if(Array.isArray(d)) setResources(d); setLoading(false); }).catch(()=>setLoading(false));
  };

  useEffect(() => { load(tab); setShowForm(false); }, [tab]);

  const openAddForm = () => {
    setResType(tab);
    setForm({ title:"", category:"", subCategory:"", description:"", thumbnail:"", content:"", allowCopy:true, isFeatured:false, discount:"", link:"", logo:"" });
    setSteps([{ title:"", description:"" }]);
    setTools([]);
    setMsg("");
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true); setMsg("");
    const payload = { ...form, type: resType };
    if (resType === "workflow") payload.content = JSON.stringify(steps);
    try {
      const res = await fetch("/api/resources", {
        method: "POST",
        headers: { "Content-Type":"application/json", Authorization:`Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) { setMsg("Saved!"); setShowForm(false); load(tab); }
      else setMsg(data.message || "Failed.");
    } catch { setMsg("Network error."); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resource?")) return;
    await fetch(`/api/resources/${id}`, { method:"DELETE", headers:{ Authorization:`Bearer ${token}` } });
    setResources(rs => rs.filter(r => r._id !== id));
  };

  const TYPE_OPTS = [
    { key:"prompt",   icon:"📝", label:"Prompt"   },
    { key:"workflow", icon:"🔄", label:"Workflow"  },
    { key:"project",  icon:"🎬", label:"Project"   },
    { key:"tip",      icon:"💡", label:"Tip"       },
    { key:"deal",     icon:"🏷", label:"Deal"      },
  ];

  /* ── Split-panel add form (Figma redesign) ── */
  if (showForm) {
    const lt = resType;
    const pageTitle = lt === "workflow" ? "Create Workflow" : lt === "prompt" ? "Create Prompt" : lt === "tip" ? "Add New Learning Tip" : lt === "project" ? "Create Project" : lt === "deal" ? "Add New AI Deal" : "Create Resource";
    const uploadThumb = async (file) => {
      if (!file) return;
      const fd = new FormData(); fd.append("image", file);
      try {
        const res = await fetch("/api/uploads/image", { method:"POST", headers:{ Authorization:`Bearer ${token}` }, body: fd });
        const data = await res.json();
        if (data.url) setForm(f => ({...f, thumbnail: data.url}));
      } catch {}
    };
    return (
      <div className="flex flex-col h-full overflow-hidden">
        {/* ── Top bar ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setShowForm(false)} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              Back to Resources
            </button>
            <h1 className="text-base font-bold text-white">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-4">
            {msg && <p className={`text-xs ${msg==="Saved!"?"text-green-400":"text-red-400"}`}>{msg}</p>}
            <button onClick={handleSave} disabled={saving} className="text-sm text-gray-300 hover:text-white disabled:opacity-50 transition-colors">
              Save as Draft
            </button>
            <button onClick={handleSave} disabled={saving} className="text-sm bg-[#C7E36B] text-black font-bold px-5 py-2.5 rounded-xl hover:bg-lime-300 disabled:opacity-60 transition-colors">
              {saving ? "Publishing..." : "Publish Resource"}
            </button>
          </div>
        </div>

        {/* ── Body: 65/35 split ── */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: form */}
          <div className="flex-[65] overflow-y-auto p-6 space-y-5">

            {/* 1. Select Resource Type */}
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">1. Select Resource Type</p>
              <div className="flex gap-2">
                {TYPE_OPTS.map(t => {
                  const icons = {
                    prompt: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
                    workflow: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
                    project: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
                    tip: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
                    deal: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>,
                  };
                  return (
                    <button key={t.key} onClick={() => setResType(t.key)}
                      className={`flex flex-col items-center gap-2 px-6 py-4 rounded-2xl border transition-all ${resType===t.key?"border-[#C7E36B] bg-[#C7E36B]/10 text-[#C7E36B]":"border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white"}`}>
                      {icons[t.key]}
                      <span className="text-[11px] font-bold uppercase tracking-wide">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Basic Information */}
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {lt === "project" ? "2. Project Information" : lt === "tip" ? "2. Content Details" : lt === "deal" ? "2. Deal Information" : "2. Basic Information"}
              </p>

              {/* ── Tip-specific fields ── */}
              {lt === "tip" ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Video Title</p>
                    <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                      placeholder="e.g., Mastering Midjourney v6.."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50"/>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Category</p>
                    <input value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                      placeholder="e.g., AI Tools"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50"/>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Video URL (YouTube / Embed)</p>
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3 gap-2 focus-within:border-[#C7E36B]/50">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                      <input value={form.link} onChange={e => setForm({...form, link: e.target.value})}
                        placeholder="https://youtube.com/watch?v=..."
                        className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 outline-none"/>
                    </div>
                  </div>
                </div>
              ) : lt === "deal" ? (
                /* ── Deal Information fields ── */
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Tool Name</p>
                    <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                      placeholder="e.g., Midjourney, ChatGPT"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50"/>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Category</p>
                      <input value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                        placeholder="Design AI"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50"/>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Short Description</p>
                      <input value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                        placeholder="e.g., Image Gen"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50"/>
                    </div>
                  </div>
                </div>
              ) : (
                /* ── Standard fields for prompt/workflow/project ── */
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-400 mb-1.5">
                      {lt === "workflow" ? "Workflow Title" : lt === "prompt" ? "Prompt Title" : lt === "project" ? "Project Title" : "Title"}
                    </p>
                    <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                      placeholder={lt === "workflow" ? "e.g., AI Cinematography..." : lt === "project" ? "e.g., Neo-Architecture AI..." : "Resource title..."}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50"/>
                  </div>
                  {lt !== "project" && (
                    <div>
                      <p className="text-xs text-gray-400 mb-1.5">Sub-category</p>
                      <input value={form.subCategory} onChange={e => setForm({...form, subCategory: e.target.value})}
                        placeholder="e.g., Film Production"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50"/>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-400 mb-1.5">{lt === "project" ? "Short Description (2-3 lines)" : "Short Description"}</p>
                    <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                      placeholder={lt === "project" ? "Briefly describe what makes this project unique..." : "Briefly explain what this..."} rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50 resize-none"/>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail / Brand Assets — Section 3 */}
            {(lt === "project" || lt === "tip") ? (
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  3. Thumbnail {lt === "tip" ? "" : "Upload"}
                </p>
                {form.thumbnail ? (
                  <div className="relative rounded-xl overflow-hidden border border-white/10 group">
                    <img src={form.thumbnail} alt="thumbnail" className="w-full h-44 object-cover"/>
                    <button type="button" onClick={() => setForm({...form, thumbnail:""})}
                      className="absolute top-2 right-2 bg-black/60 hover:bg-red-500/80 text-white w-8 h-8 rounded-lg flex items-center justify-center transition-all">
                      <I name="trash" size={14}/>
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-white/15 rounded-xl cursor-pointer hover:border-[#C7E36B]/40 hover:bg-[#C7E36B]/5 transition-all group">
                    <input type="file" accept="image/*" className="hidden" onChange={e => uploadThumb(e.target.files?.[0])}/>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 group-hover:text-[#C7E36B] mb-3 transition-colors">
                      <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
                    </svg>
                    <p className="text-sm text-gray-400 group-hover:text-gray-200 font-semibold transition-colors">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-600 mt-1">{lt === "tip" ? "Recommended size: 1280×720 (16:9)" : "Recommended size: 1280×720px (PNG, JPG)"}</p>
                  </label>
                )}
              </div>
            ) : lt === "deal" ? (
              /* ── Section 3: Brand Assets (logo upload + URL option) ── */
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  3. Brand Assets
                </p>
                {form.logo && (form.logo.startsWith("http") || form.logo.startsWith("/")) ? (
                  <div className="relative rounded-xl overflow-hidden border border-white/10 bg-white group h-28 flex items-center justify-center">
                    <img src={form.logo} alt="logo" className="max-h-20 max-w-[180px] object-contain"/>
                    <button type="button" onClick={() => setForm({...form, logo:""})}
                      className="absolute top-2 right-2 bg-black/60 hover:bg-red-500/80 text-white w-8 h-8 rounded-lg flex items-center justify-center transition-all">
                      <I name="trash" size={14}/>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-white/15 rounded-xl cursor-pointer hover:border-[#C7E36B]/40 hover:bg-[#C7E36B]/5 transition-all group">
                      <input type="file" accept="image/*" className="hidden" onChange={async e => {
                        const file = e.target.files?.[0]; if (!file) return;
                        const fd = new FormData(); fd.append("image", file);
                        try {
                          const res = await fetch("/api/uploads/image", { method:"POST", headers:{ Authorization:`Bearer ${token}` }, body: fd });
                          const data = await res.json();
                          if (data.url) setForm(f => ({...f, logo: data.url}));
                        } catch {}
                      }}/>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 group-hover:text-[#C7E36B] mb-2 transition-colors">
                        <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
                      </svg>
                      <p className="text-xs text-gray-400 group-hover:text-gray-200 font-semibold transition-colors">Upload a high-quality transparent PNG logo for the tool.</p>
                      <p className="text-[11px] text-gray-600 mt-0.5">Recommended size: 512×512px.</p>
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-white/10"/>
                      <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">or enter image url</span>
                      <div className="flex-1 h-px bg-white/10"/>
                    </div>
                    <input value={form.logo} onChange={e => setForm({...form, logo: e.target.value})}
                      placeholder="https://logo.clearbit.com/openai.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50"/>
                  </div>
                )}
              </div>
            ) : (
              /* Thumbnail embedded for other types */
              <div className="-mt-2">
                <p className="text-xs text-gray-400 mb-1.5">Thumbnail Image</p>
                {form.thumbnail ? (
                  <div className="relative rounded-xl overflow-hidden border border-white/10 group">
                    <img src={form.thumbnail} alt="thumbnail" className="w-full h-44 object-cover"/>
                    <button type="button" onClick={() => setForm({...form, thumbnail:""})}
                      className="absolute top-2 right-2 bg-black/60 hover:bg-red-500/80 text-white w-8 h-8 rounded-lg flex items-center justify-center transition-all">
                      <I name="trash" size={14}/>
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-white/15 rounded-xl cursor-pointer hover:border-[#C7E36B]/40 hover:bg-[#C7E36B]/5 transition-all group">
                    <input type="file" accept="image/*" className="hidden" onChange={e => uploadThumb(e.target.files?.[0])}/>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 group-hover:text-[#C7E36B] mb-2 transition-colors">
                      <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
                    </svg>
                    <p className="text-xs text-gray-400 group-hover:text-gray-200 font-semibold transition-colors">Click to upload or drag &amp; drop</p>
                    <p className="text-[11px] text-gray-600 mt-1">PNG, JPG or WEBP (Max 5MB)</p>
                  </label>
                )}
              </div>
            )}

            {/* Prompt content (prompt type only) */}
            {lt==="prompt" && (
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">3. Prompt Content</p>
                <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})}
                  placeholder="Write the full prompt text..." rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 placeholder-gray-600 outline-none focus:border-[#C7E36B]/50 resize-none font-mono"/>
                <div className="flex items-center gap-2 mt-2">
                  <Tog value={form.allowCopy} onChange={v=>setForm({...form,allowCopy:v})}/>
                  <span className="text-xs text-gray-400">Allow users to copy prompt</span>
                </div>
              </div>
            )}

            {/* Section 4: Call to Action — tip type only */}
            {lt==="tip" && (
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  4. Call to Action
                </p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#C7E36B]/10 border border-[#C7E36B]/20 flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Watch Now</p>
                    <p className="text-xs text-gray-500 mt-0.5">Fixed action for learning tips</p>
                  </div>
                  <span className="ml-auto text-[10px] text-gray-600 border border-white/10 px-2 py-1 rounded-lg">Fixed</span>
                </div>
              </div>
            )}

            {/* Workflow Steps Builder — timeline design */}
            {lt==="workflow" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] font-bold text-[#C7E36B] uppercase tracking-widest flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                    Steps Builder
                  </p>
                  <button onClick={() => setSteps([...steps, {title:"", description:""}])}
                    className="text-xs text-[#C7E36B] flex items-center gap-1 hover:opacity-80 transition-opacity">
                    + Add Step
                  </button>
                </div>
                {/* Timeline */}
                <div className="relative">
                  {/* Vertical connector line */}
                  <div className="absolute left-[19px] top-5 bottom-5 w-[2px] bg-[#C7E36B] z-0"/>
                  <div className="space-y-4">
                    {steps.map((s, i) => (
                      <div key={i} className="flex gap-4 relative z-10">
                        {/* Step number badge */}
                        <div className="w-10 h-10 rounded-full bg-[#C7E36B] text-black font-black text-sm flex items-center justify-center shrink-0 shadow-lg">
                          {i + 1}
                        </div>
                        {/* Step content */}
                        <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <input value={s.title} onChange={e => setSteps(ss => ss.map((x,j) => j===i?{...x,title:e.target.value}:x))}
                              placeholder="Step Title"
                              className="flex-1 bg-transparent text-sm font-bold text-white outline-none placeholder-gray-600 mr-3"/>
                            <div className="flex items-center gap-2 shrink-0">
                              {/* Step image upload icon */}
                              <label className="cursor-pointer text-gray-500 hover:text-[#C7E36B] transition-colors" title="Upload step image">
                                <input type="file" accept="image/*" className="hidden" onChange={async e => {
                                  const file = e.target.files?.[0]; if (!file) return;
                                  const fd = new FormData(); fd.append("image", file);
                                  try {
                                    const res = await fetch("/api/uploads/image", { method:"POST", headers:{ Authorization:`Bearer ${token}` }, body: fd });
                                    const data = await res.json();
                                    if (data.url) setSteps(ss => ss.map((x,j) => j===i?{...x,image:data.url}:x));
                                  } catch {}
                                }}/>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                              </label>
                              {/* Delete step */}
                              <button onClick={() => setSteps(ss => ss.filter((_,j) => j!==i))}
                                className="text-gray-500 hover:text-red-400 transition-colors" title="Delete step">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                              </button>
                            </div>
                          </div>
                          {s.image && <img src={s.image} alt="" className="w-full h-24 object-cover rounded-lg mb-2"/>}
                          <textarea value={s.description} onChange={e => setSteps(ss => ss.map((x,j) => j===i?{...x,description:e.target.value}:x))}
                            placeholder="Step Description" rows={2}
                            className="w-full bg-transparent text-xs text-gray-400 outline-none resize-none placeholder-gray-600"/>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={() => setSteps([...steps, {title:"", description:""}])}
                  className="w-full mt-4 border-2 border-dashed border-white/10 text-gray-500 hover:border-[#C7E36B]/30 hover:text-[#C7E36B] text-xs py-3 rounded-2xl transition-all flex items-center justify-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Add Another Step
                </button>
              </div>
            )}

            {/* Section 4 & 5 — Project-specific: Tools & Status + Project Links */}
            {lt==="project" && (
              <>
                {/* 4. Tools & Status */}
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                    4. Tools &amp; Status
                  </p>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
                    {/* Status + Tools Used in a 2-column row */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Status dropdown */}
                      <div>
                        <p className="text-xs text-gray-400 mb-2">Status</p>
                        <div className="relative">
                          <select value={form.status || "Draft"} onChange={e => setForm({...form, status: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none appearance-none cursor-pointer focus:border-[#C7E36B]/50 pr-8">
                            {["Draft","Published"].map(s => <option key={s} value={s} className="bg-[#1a1e20]">{s}</option>)}
                          </select>
                          <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                      </div>
                      {/* Tools Used (Tags) */}
                      <div>
                        <p className="text-xs text-gray-400 mb-2">Tools Used (Tags)</p>
                        <div className="flex flex-wrap items-center gap-1.5 min-h-[46px] bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                          {tools.map(t => (
                            <span key={t} className="flex items-center gap-1 text-xs font-semibold text-[#C7E36B] border border-[#C7E36B]/40 bg-[#C7E36B]/10 px-2.5 py-0.5 rounded-full">
                              {t}
                              <button onClick={() => setTools(ts => ts.filter(x => x !== t))}
                                className="text-[#C7E36B]/60 hover:text-red-400 leading-none ml-0.5 transition-colors">×</button>
                            </span>
                          ))}
                          <input value={newTool} onChange={e => setNewTool(e.target.value)}
                            onKeyDown={e => { if (e.key === "Enter" && newTool.trim()) { setTools(ts => [...ts, newTool.trim()]); setNewTool(""); e.preventDefault(); }}}
                            placeholder={tools.length === 0 ? "Add tool.." : ""}
                            className="flex-1 min-w-[80px] bg-transparent text-xs text-white outline-none placeholder-gray-600"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Project Links */}
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                    5. Project Links
                  </p>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-2">Project Details Internal Link</p>
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3 gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                      <input value={form.link} onChange={e => setForm({...form, link: e.target.value})}
                        placeholder="aifa.io/projects/your-project-slug"
                        className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 outline-none"/>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Promotional Details — deal only */}
            {lt==="deal" && (
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                  4. Promotional Details
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Deal Headline</p>
                    <input value={form.discount} onChange={e => setForm({...form, discount: e.target.value})}
                      placeholder="e.g., 20% OFF Lifetime"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50"/>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Coupon Code (Optional)</p>
                      <input value={form.couponCode} onChange={e => setForm({...form, couponCode: e.target.value})}
                        placeholder="AIFA-PROMO"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50"/>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Expiry Date</p>
                      <input type="date" value={form.expiry} onChange={e => setForm({...form, expiry: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50 [color-scheme:dark]"/>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">CTA Text</p>
                      <input value={form.ctaText} onChange={e => setForm({...form, ctaText: e.target.value})}
                        placeholder="Get Deal"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50"/>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">External Link</p>
                      <input value={form.link} onChange={e => setForm({...form, link: e.target.value})}
                        placeholder="https://..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50"/>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Featured toggle */}
            <div className="flex items-center gap-3 pb-6">
              <Tog value={form.isFeatured} onChange={v=>setForm({...form,isFeatured:v})}/>
              <span className="text-sm text-gray-400">Mark as Featured Resource</span>
            </div>
          </div>

          {/* Right: Live preview (35%) */}
          <div className="flex-[35] shrink-0 border-l border-white/10 bg-[#0A0C0D] p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7E36B] animate-pulse"/>
                Live Preview
              </p>
              <span className="text-[9px] font-bold bg-[#C7E36B] text-black px-2 py-0.5 rounded-md tracking-wide">FRONTEND CARD</span>
            </div>

            {/* Preview card */}
            {lt === "deal" ? (
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                {/* Logo header */}
                <div className="h-[100px] bg-white border-b border-gray-100 flex items-center justify-center px-6">
                  {form.logo && (form.logo.startsWith("http") || form.logo.startsWith("/"))
                    ? <img src={form.logo} alt={form.title} className="max-h-[60px] max-w-[160px] object-contain"/>
                    : <span className="text-5xl">{form.logo || "🔧"}</span>
                  }
                </div>
                {/* Category badge */}
                {form.category && (
                  <div className="px-4 pt-3">
                    <span className="text-[9px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded tracking-widest uppercase">{form.category}</span>
                  </div>
                )}
                <div className="p-4 pt-2">
                  <h3 className="font-bold text-gray-900 mt-1">{form.title||"Deal Title"}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{form.description||"Short description"}</p>
                  <p className="text-xl font-black text-gray-900 mt-3">{form.discount||"XX% OFF"}</p>
                  <p className="text-[10px] text-[#C7E36B] font-semibold mt-0.5">VIA AIFA</p>
                  <button className="w-full bg-[#C7E36B] text-black text-sm font-bold py-2.5 rounded-lg mt-3">{form.ctaText||"Get Deal"}</button>
                  <p className="text-[10px] text-gray-400 text-center mt-1.5">Redirects to official site</p>
                </div>
              </div>
            ) : lt === "tip" ? (
              /* ── Tip preview: 16:9 thumbnail + Watch Now button ── */
              <div className="bg-[#1A1D1E] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-video overflow-hidden bg-white/5">
                  {form.thumbnail
                    ? <img src={form.thumbnail} alt="" className="w-full h-full object-cover"/>
                    : <div className="w-full h-full flex items-center justify-center" style={{background:"linear-gradient(135deg,#111 0%,#1a1d2e 100%)"}}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      </div>
                  }
                </div>
                <button className="w-full bg-[#C7E36B] text-black text-sm font-bold py-3 flex items-center justify-center gap-2">
                  Watch Now! <span>→</span>
                </button>
              </div>
            ) : (
              /* ── Standard preview: image + title + description + View Details ── */
              <div className="bg-[#1A1D1E] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-[4/3] overflow-hidden bg-white/5">
                  {form.thumbnail
                    ? <img src={form.thumbnail} alt="" className="w-full h-full object-cover"/>
                    : <div className="w-full h-full flex items-center justify-center" style={{background:"linear-gradient(135deg,#1a1d2e 0%,#2d1f3d 40%,#1a2d2e 100%)"}}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                      </div>
                  }
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-white leading-snug mb-2">
                    {form.title || "Resource Title"}
                  </h3>
                  <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed mb-4">
                    {form.description || "Description will appear here..."}
                  </p>
                  {lt==="prompt" && form.content && (
                    <div className="bg-[#0F1112] border border-white/10 rounded-xl p-2.5 mb-3">
                      <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-1">PROMPT</p>
                      <p className="text-[10px] text-gray-500 line-clamp-2 font-mono">{form.content}</p>
                    </div>
                  )}
                  <button className="text-xs font-semibold text-[#FBBF24] flex items-center gap-1">
                    View Details <span>→</span>
                  </button>
                </div>
              </div>
            )}

            <p className="text-[10px] text-gray-600 mt-4 text-center">Updates in real-time as you type</p>
          </div>
        </div>
      </div>
    );
  }

  /* ── Normal list view ── */
  const activeTabLabel = tab === "project" ? "Projects Showcase" : tab === "deal" ? "AI Deals" : RES_TABS.find(t => t.key === tab)?.label || "Resources";
  const activeTabSubtitle = tab === "project" ? "Manage and curate the portfolio of student projects featured on the platform."
    : tab === "tip" ? "Manage and publish high-impact video learning content."
    : tab === "deal" ? "Manage promotional cards and exclusive offers for AI tools."
    : "Manage all learning resources by category";
  const cats    = ["All", ...Array.from(new Set(resources.map(r => r.category).filter(Boolean)))];
  const subCats = ["All", ...Array.from(new Set(resources.filter(r => catFilter === "All" || r.category === catFilter).map(r => r.subCategory).filter(Boolean)))];

  const filteredResources = resources.filter(r => {
    if (tab === "project") {
      if (catFilter === "Published") return r.isFeatured || r.isPublished;
      if (catFilter === "Draft")     return !r.isFeatured && !r.isPublished;
      return true;
    }
    if (tab === "tip") return true;
    const matchCat = catFilter    === "All" || r.category    === catFilter;
    const matchSub = subCatFilter === "All" || r.subCategory === subCatFilter;
    return matchCat && matchSub;
  });
  const visibleResources = tab === "tip" && catFilter === "Oldest First"
    ? [...filteredResources].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    : tab === "tip"
    ? [...filteredResources].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : filteredResources;

  const copyPrompt = (r) => {
    navigator.clipboard.writeText(r.content || r.description || "").then(() => {
      setCopiedId(r._id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-white">{activeTabLabel}</h1>
          <p className="text-xs text-gray-400 mt-0.5">{activeTabSubtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Category filter — hidden on project and tip tabs */}
          {tab !== "project" && tab !== "tip" && (
            <div className="relative">
              <select value={catFilter} onChange={e => { setCatFilter(e.target.value); setSubCatFilter("All"); }}
                className="bg-white/5 border border-white/10 text-gray-300 text-sm rounded-xl px-4 py-2.5 outline-none appearance-none pr-8 cursor-pointer min-w-[140px]">
                {cats.map(c => <option key={c} value={c} className="bg-[#1a1e20]">{c === "All" && tab === "deal" ? "All Categories" : c}</option>)}
              </select>
              <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          )}
          {/* Sub-category filter — hidden on workflow, project, tip and deal tabs */}
          {tab !== "workflow" && tab !== "project" && tab !== "tip" && tab !== "deal" && (
            <div className="relative">
              <select value={subCatFilter} onChange={e => setSubCatFilter(e.target.value)}
                className="bg-white/5 border border-white/10 text-gray-300 text-sm rounded-xl px-4 py-2.5 outline-none appearance-none pr-8 cursor-pointer min-w-[130px]">
                {subCats.map(c => <option key={c} className="bg-[#1a1e20]">{c === "All" ? "Sub category" : c}</option>)}
              </select>
              <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          )}
          {/* STATUS filter — only on project tab */}
          {tab === "project" && (
            <div className="relative">
              <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
                className="bg-white/5 border border-white/10 text-gray-300 text-sm rounded-xl px-4 py-2.5 outline-none appearance-none pr-8 cursor-pointer min-w-[120px]">
                {["All", "Published", "Draft"].map(c => <option key={c} value={c} className="bg-[#1a1e20]">{c === "All" ? "STATUS" : c}</option>)}
              </select>
              <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          )}
          {/* Newest First sort — only on tip tab */}
          {tab === "tip" && (
            <div className="relative">
              <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
                className="bg-white/5 border border-white/10 text-gray-300 text-sm rounded-xl px-4 py-2.5 outline-none appearance-none pr-8 cursor-pointer min-w-[140px]">
                {["Newest First", "Oldest First"].map(c => <option key={c} value={c} className="bg-[#1a1e20]">{c}</option>)}
              </select>
              <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          )}
          <button onClick={openAddForm} className="text-sm bg-[#C7E36B] text-black font-bold px-5 py-2.5 rounded-xl hover:bg-lime-300 transition-colors flex items-center gap-1.5">
            {tab === "workflow" ? "Create Workflow" : tab === "project" ? "Add Project" : tab === "tip" ? "Add Learning Tip" : tab === "deal" ? "Add New Deals" : "Add Resource"}
          </button>
        </div>
      </div>

      {/* Tabs — uppercase pill style */}
      <div className="flex gap-2 mb-6">
        {RES_TABS.map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); setCatFilter("All"); setSubCatFilter("All"); }}
            className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${tab === t.key ? "bg-[#C7E36B] text-black" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {loading ? <AdminLoader /> : visibleResources.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-sm">No {activeTabLabel} resources yet</p>
          <button onClick={openAddForm} className="mt-3 text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg">Add First</button>
        </div>
      ) : tab === "deal" ? (
        /* ── Deal cards (white cards, Figma style) ── */
        <div className="grid grid-cols-3 gap-4">
          {visibleResources.map(r => (
            <div key={r._id} className="bg-white rounded-2xl overflow-hidden shadow-sm relative group">
              {/* Partner logo header */}
              <div className="h-[100px] bg-white flex items-center justify-center px-6 border-b border-gray-100">
                {r.logo && (r.logo.startsWith("http") || r.logo.startsWith("/"))
                  ? <img src={r.logo} alt={r.title} className="max-h-[60px] max-w-[140px] object-contain"/>
                  : <span className="text-4xl">{r.logo || "🔧"}</span>
                }
              </div>
              {/* Category badge */}
              {r.category && (
                <div className="px-4 pt-3">
                  <span className="text-[9px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded tracking-widest uppercase">{r.category}</span>
                </div>
              )}
              <div className="p-4 pt-2">
                <h3 className="text-base font-bold text-gray-900 mt-1">{r.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{r.description}</p>
                <p className="text-xl font-black text-gray-900 mt-3">{r.discount}</p>
                <p className="text-[10px] text-[#C7E36B] font-semibold mt-0.5">VIA AIFA</p>
                <button className="w-full bg-[#C7E36B] text-black text-sm font-bold py-2.5 rounded-lg mt-3 hover:bg-lime-300 transition-colors">Get Deal</button>
                <p className="text-[10px] text-gray-400 text-center mt-1.5">Redirects to official site</p>
              </div>
              <button onClick={() => handleDelete(r._id)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500/80 text-white rounded-full w-6 h-6 flex items-center justify-center transition-all"><I name="trash" size={12}/></button>
            </div>
          ))}
        </div>
      ) : (
        /* ── Figma-style 3-column visual cards ── */
        <div className="grid grid-cols-3 gap-5">
          {visibleResources.map(r => (
            tab === "tip" ? (
              /* ── Learning Tip card: thumbnail only + lime Watch Now button ── */
              <div key={r._id} className="bg-[#1A1D1E] border border-white/10 rounded-2xl overflow-hidden group hover:border-white/20 transition-all">
                <div className="relative aspect-video overflow-hidden bg-white/5">
                  {r.thumbnail
                    ? <img src={r.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                    : <div className="w-full h-full flex items-center justify-center" style={{background:"linear-gradient(135deg,#111 0%,#1a1d2e 100%)"}}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      </div>
                  }
                  <button onClick={() => handleDelete(r._id)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-black/60 hover:bg-red-500/80 text-white rounded-lg w-7 h-7 flex items-center justify-center transition-all">
                    <I name="trash" size={13}/>
                  </button>
                </div>
                <button className="w-full bg-[#C7E36B] text-black text-sm font-bold py-3 flex items-center justify-center gap-2 hover:bg-lime-300 transition-colors">
                  Watch Now! <span>→</span>
                </button>
              </div>
            ) : (tab === "workflow" || tab === "project") ? (
              /* ── Workflow / Project card: image + title + description + View Details ── */
              <div key={r._id} className="bg-[#1A1D1E] border border-white/10 rounded-2xl overflow-hidden group hover:border-white/20 transition-all">
                {/* Banner image with gradient fallback */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {r.thumbnail
                    ? <img src={r.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                    : <div className="w-full h-full" style={{background:"linear-gradient(135deg,#1a1d2e 0%,#2d1f3d 40%,#1a2d2e 100%)"}}/>
                  }
                  <button onClick={() => handleDelete(r._id)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-black/60 hover:bg-red-500/80 text-white rounded-lg w-7 h-7 flex items-center justify-center transition-all">
                    <I name="trash" size={13}/>
                  </button>
                  {r.isFeatured && (
                    <span className="absolute top-2 left-2 text-[9px] font-bold bg-[#C7E36B] text-black px-2 py-0.5 rounded-full">FEATURED</span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-white leading-snug mb-2">{r.title}</h3>
                  {r.description && (
                    <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed mb-4">{r.description}</p>
                  )}
                  <button className="text-sm font-semibold text-[#FBBF24] flex items-center gap-1 hover:gap-2 transition-all">
                    View Details <span>→</span>
                  </button>
                </div>
              </div>
            ) : (
              /* ── Prompt / Tip / Project card: image + [Category/Title] + prompt box ── */
              <div key={r._id} className="bg-[#1A1D1E] border border-white/10 rounded-2xl overflow-hidden group hover:border-white/20 transition-all">
                {/* Banner image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                  {r.thumbnail
                    ? <img src={r.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                    : <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">No Image</div>
                  }
                  <button onClick={() => handleDelete(r._id)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-black/60 hover:bg-red-500/80 text-white rounded-lg w-7 h-7 flex items-center justify-center transition-all">
                    <I name="trash" size={13}/>
                  </button>
                  {r.isFeatured && (
                    <span className="absolute top-2 left-2 text-[9px] font-bold bg-[#C7E36B] text-black px-2 py-0.5 rounded-full">FEATURED</span>
                  )}
                </div>
                {/* Card body */}
                <div className="p-4 space-y-3">
                  <h3 className="text-sm font-bold text-white leading-snug">
                    [{[r.category, r.subCategory, r.title].filter(Boolean).join(" / ")}]
                  </h3>
                  {(r.content || r.description) && (
                    <div className="bg-[#0F1112] border border-white/10 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-bold text-gray-500 tracking-widest uppercase">
                          {tab === "tip" ? "TIP" : "PROMPT"}
                        </span>
                        <button onClick={() => copyPrompt(r)} className="text-gray-500 hover:text-white transition-colors" title="Copy">
                          {copiedId === r._id
                            ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                          }
                        </button>
                      </div>
                      <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-3 font-mono">
                        {r.content || r.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}

/* ── USERS ADMIN ── */
function UsersAdmin({ token }) {
  const [users, setUsers]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [uSearch, setUSearch]   = useState("");
  const [uStatus, setUStatus]   = useState("All");
  const [uRoleTab, setURoleTab] = useState("All");  // All | Student | Instructor | Admin
  const [viewUser, setViewUser]       = useState(null);
  const [showExport, setShowExport]   = useState(false);
  const [exportFmt, setExportFmt]     = useState("xlsx");
  const [togglingId, setTogglingId]   = useState(null);
  const [uPage, setUPage]             = useState(1);
  const U_PER_PAGE = 10;

  useEffect(() => {
    const h = e => { if (e.key === "Escape") { setViewUser(null); setShowExport(false); } };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  useEffect(() => {
    fetch("/api/users", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setUsers(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [token]);

  const totalUsers    = users.length;
  const activeUsers   = users.filter(u => u.isActive !== false).length;
  const inactiveUsers = users.filter(u => u.isActive === false).length;

  const filtered = users.filter(u => {
    const q = uSearch.toLowerCase();
    const matchSearch = !q || (u.name||"").toLowerCase().includes(q) || (u.email||"").toLowerCase().includes(q);
    const matchStatus = uStatus === "All" || (uStatus === "Active" ? u.isActive !== false : u.isActive === false);
    const matchRole   = uRoleTab === "All" || u.role?.toLowerCase() === uRoleTab.toLowerCase();
    return matchSearch && matchStatus && matchRole;
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const uTotalPages = Math.max(1, Math.ceil(filtered.length / U_PER_PAGE));
  const uPageSafe   = Math.min(uPage, uTotalPages);
  const paginated   = filtered.slice((uPageSafe - 1) * U_PER_PAGE, uPageSafe * U_PER_PAGE);

  /* reset to page 1 on filter change */
  useEffect(() => { setUPage(1); }, [uSearch, uStatus, uRoleTab]);

  const doExport = () => {
    const rows = [["Name","Email","Phone","Role","Status","Joined"]];
    filtered.forEach(u => rows.push([u.name||"", u.email||"", u.phone||"", u.role||"", u.isActive===false?"Inactive":"Active", new Date(u.createdAt||Date.now()).toLocaleDateString()]));
    const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    a.download = exportFmt === "csv" ? "users.csv" : "users.csv"; // both CSV for now (XLSX needs a lib)
    a.click();
    setShowExport(false);
  };

  const toggleStatus = async (u) => {
    setTogglingId(u._id);
    const newStatus = u.isActive === false;  // flip
    try {
      await fetch(`/api/users/${u._id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ isActive: newStatus }),
      });
      const updated = { ...u, isActive: newStatus };
      setUsers(us => us.map(x => x._id === u._id ? updated : x));
      setViewUser(updated);
    } catch {}
    setTogglingId(null);
  };

  const roleBadge = role => {
    if (role === "admin") return "bg-[#C7E36B]/15 text-[#C7E36B] border border-[#C7E36B]/30";
    if (role === "instructor") return "bg-purple-500/15 text-purple-300 border border-purple-500/30";
    return "bg-[#C7E36B]/15 text-[#C7E36B] border border-[#C7E36B]/30";
  };

  const ROLE_TABS = ["All", "Student", "Instructor", "Admin"];

  return (
    <div className="p-6">

      {/* ── User Detail Modal ── */}
      {viewUser && (() => {
        const isActive = viewUser.isActive !== false;
        const role = viewUser.role || "student";
        const roleLabel = role === "admin" ? "Admin" : role === "instructor" ? "Instructor" : "Student";
        return (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setViewUser(null)}>
            <div className="bg-[#111416] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>

              {/* Modal header bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <h2 className="text-base font-bold text-white">{roleLabel} Details</h2>
                <button onClick={() => setViewUser(null)} className="text-gray-400 hover:text-white w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-lg leading-none">✕</button>
              </div>

              {/* User info card */}
              <div className="p-5">
                <div className="bg-[#1a1e20] border border-white/10 rounded-xl p-4 mb-4">
                  {/* Top row: avatar + info + status badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#C7E36B] text-black font-black text-lg flex items-center justify-center shrink-0 overflow-hidden">
                      {viewUser.profilePicture
                        ? <img src={viewUser.profilePicture} alt="" className="w-full h-full object-cover" onError={e => { e.currentTarget.style.display="none"; }}/>
                        : (viewUser.name||"U")[0].toUpperCase()
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold leading-tight">{viewUser.name}</p>
                      <p className="text-xs text-gray-400 truncate mt-0.5">{viewUser.email}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{viewUser.phone || "—"}</p>
                    </div>
                    {/* Active / Inactive status badge */}
                    <span className={`text-xs font-bold px-3 py-1 rounded-lg border shrink-0 ${
                      isActive
                        ? "border-orange-500/60 text-orange-400 bg-orange-500/10"
                        : "border-white/20 text-gray-400 bg-white/5"
                    }`}>
                      {isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  {/* Joined Date + Role row */}
                  <div className="flex items-end gap-8">
                    <div>
                      <p className="text-[10px] text-gray-500 font-semibold uppercase mb-1">Joined Date</p>
                      <p className="text-sm font-bold text-white">
                        {new Date(viewUser.createdAt||Date.now()).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-semibold uppercase mb-1">Role</p>
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-lg capitalize ${roleBadge(role)}`}>{roleLabel}</span>
                    </div>
                  </div>
                </div>

                {/* Enrollments */}
                <div className="space-y-2 text-xs max-h-48 overflow-y-auto">
                  {[
                    { label: "Enrolled Courses",   icon: "📹", items: viewUser.enrolledCourses   },
                    { label: "Enrolled Workshops",  icon: "🎓", items: viewUser.enrolledWorkshops  },
                    { label: "Enrolled Bootcamps",  icon: "🚀", items: viewUser.enrolledBootcamps  },
                  ].map(s => (
                    <div key={s.label} className="bg-white/5 rounded-xl p-3">
                      <p className="text-gray-500 font-bold uppercase tracking-wider mb-1.5">{s.label} ({s.items?.length||0})</p>
                      {s.items?.length > 0
                        ? s.items.map((x,i) => <p key={i} className="text-gray-300 py-0.5">{s.icon} {x?.title||String(x).slice(-8)}</p>)
                        : <p className="text-gray-600">None</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom action button */}
              <div className="px-5 pb-5">
                {isActive ? (
                  <button
                    onClick={() => toggleStatus(viewUser)}
                    disabled={!!togglingId}
                    className="w-full py-3.5 rounded-xl border border-red-600/60 text-red-500 font-black text-sm tracking-wide hover:bg-red-500/10 transition-colors disabled:opacity-50"
                  >
                    {togglingId === viewUser._id ? "UPDATING..." : "DEACTIVATE"}
                  </button>
                ) : (
                  <button
                    onClick={() => toggleStatus(viewUser)}
                    disabled={!!togglingId}
                    className="w-full py-3.5 rounded-xl bg-[#C7E36B] text-black font-black text-sm tracking-wide hover:bg-[#d4ef7a] transition-colors disabled:opacity-50"
                  >
                    {togglingId === viewUser._id ? "UPDATING..." : `ACTIVATE ${roleLabel.toUpperCase()}`}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Users</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage student, instructors, and admin accounts across the platform.</p>
        </div>
        <button onClick={() => setShowExport(true)} className="flex items-center gap-2 border border-white/20 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-white/5 transition-all shrink-0">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export
        </button>
      </div>

      {/* ── Export Modal ── */}
      {showExport && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowExport(false)}>
          <div className="bg-[#111416] border border-white/10 rounded-2xl w-full max-w-sm overflow-hidden" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div>
                <h2 className="text-base font-bold text-white">Export Users</h2>
                <p className="text-xs text-gray-400 mt-0.5">Choose the data you want to export and the format for your file.</p>
              </div>
              <button onClick={() => setShowExport(false)} className="text-gray-400 hover:text-white w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-lg leading-none shrink-0">✕</button>
            </div>
            {/* Format selection */}
            <div className="p-6">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-3">File Format</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "csv",  label: "CSV",          desc: "Export data in CSV (Comma separated values) format." },
                  { id: "xlsx", label: "Excel (XLSX)",  desc: "Export data in Excel spreadsheet format." },
                ].map(fmt => (
                  <button key={fmt.id} onClick={() => setExportFmt(fmt.id)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      exportFmt === fmt.id
                        ? "border-[#C7E36B] bg-[#C7E36B]/5"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        exportFmt === fmt.id ? "border-[#C7E36B]" : "border-white/30"
                      }`}>
                        {exportFmt === fmt.id && <div className="w-2 h-2 rounded-full bg-[#C7E36B]"/>}
                      </div>
                      <p className={`text-sm font-bold ${exportFmt === fmt.id ? "text-white" : "text-gray-400"}`}>{fmt.label}</p>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-snug">{fmt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
            {/* Footer */}
            <div className="flex gap-3 px-6 pb-6">
              <button onClick={() => setShowExport(false)}
                className="flex-1 py-3 bg-white text-[#0F1112] font-bold text-sm rounded-xl hover:bg-gray-100 transition-colors">
                Cancel
              </button>
              <button onClick={doExport}
                className="flex-1 py-3 bg-[#C7E36B] text-black font-bold text-sm rounded-xl hover:bg-[#d4ef7a] transition-colors">
                Export
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Users",    value: totalUsers,    icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          )},
          { label: "Active Users",   value: activeUsers,   icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          )},
          { label: "Inactive Users", value: inactiveUsers, icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          )},
        ].map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#FBBF24]/10 border border-[#FBBF24]/20 flex items-center justify-center shrink-0">
              {s.icon}
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">{s.label}</p>
              <p className="text-2xl font-black text-white leading-none">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Search + Filters ── */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <input value={uSearch} onChange={e => setUSearch(e.target.value)} placeholder="Search Users..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-white/20"/>
          <I name="search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
        </div>
        <div className="relative">
          <select value={uStatus} onChange={e => setUStatus(e.target.value)}
            className="bg-white/5 border border-white/10 text-gray-400 text-sm rounded-xl px-4 py-2.5 outline-none appearance-none pr-8 cursor-pointer">
            {["All","Active","Inactive"].map(o => <option key={o} className="bg-[#1a1e20]">{o}</option>)}
          </select>
          <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        {/* Role tab pills */}
        <div className="flex gap-1 bg-white/5 rounded-xl p-1">
          {ROLE_TABS.map(tab => (
            <button key={tab} onClick={() => setURoleTab(tab)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                uRoleTab === tab ? "bg-[#C7E36B] text-black" : "text-gray-400 hover:text-white"
              }`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Table ── */}
      {loading ? <AdminLoader label="Loading Users" /> : (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 font-bold uppercase tracking-wider bg-white/5">
                <th className="text-left px-5 py-3">Users</th>
                <th className="text-left px-5 py-3">Number</th>
                <th className="text-left px-5 py-3">Role</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-right px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-10 text-center text-gray-500 text-sm">No users match your search</td></tr>
              )}
              {paginated.map(u => {
                const isActive = u.isActive !== false;
                return (
                  <tr key={u._id} className="hover:bg-white/5 transition-all">
                    {/* User: avatar + name + email */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#C7E36B] text-black font-black text-sm flex items-center justify-center shrink-0 overflow-hidden">
                          {u.profilePicture
                            ? <img src={u.profilePicture} alt="" className="w-full h-full object-cover" onError={e => { e.currentTarget.style.display="none"; }}/>
                            : (u.name||"U")[0].toUpperCase()
                          }
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white leading-tight">{u.name}</p>
                          <p className="text-[11px] text-gray-500 mt-0.5">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    {/* Phone */}
                    <td className="px-5 py-3.5 text-sm text-gray-400">{u.phone || "—"}</td>
                    {/* Role badge */}
                    <td className="px-5 py-3.5">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg capitalize ${roleBadge(u.role)}`}>
                        {u.role === "admin" ? "Admin" : u.role === "instructor" ? "Instructor" : "Student"}
                      </span>
                    </td>
                    {/* Status badge */}
                    <td className="px-5 py-3.5">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${
                        isActive
                          ? "border-orange-500/50 text-orange-400"
                          : "border-white/20 text-gray-500"
                      }`}>
                        {isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-3.5 text-right">
                      <button onClick={() => setViewUser(u)}
                        className="text-xs bg-white text-[#0F1112] font-bold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Pagination footer */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-white/5">
            <p className="text-xs text-gray-500">
              Showing {filtered.length === 0 ? 0 : (uPageSafe - 1) * U_PER_PAGE + 1}–{Math.min(uPageSafe * U_PER_PAGE, filtered.length)} of {filtered.length} users
            </p>
            {uTotalPages > 1 && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setUPage(p => Math.max(1, p - 1))}
                  disabled={uPageSafe <= 1}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                {Array.from({ length: uTotalPages }, (_, i) => i + 1)
                  .filter(n => n === 1 || n === uTotalPages || Math.abs(n - uPageSafe) <= 1)
                  .reduce((acc, n, idx, arr) => {
                    if (idx > 0 && n - arr[idx - 1] > 1) acc.push("...");
                    acc.push(n);
                    return acc;
                  }, [])
                  .map((n, i) =>
                    n === "..." ? (
                      <span key={`e${i}`} className="w-7 h-7 flex items-center justify-center text-gray-500 text-xs">…</span>
                    ) : (
                      <button key={n} onClick={() => setUPage(n)}
                        className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                          n === uPageSafe ? "bg-[#C7E36B] text-black" : "text-gray-400 hover:text-white hover:bg-white/10"
                        }`}>
                        {n}
                      </button>
                    )
                  )
                }
                <button
                  onClick={() => setUPage(p => Math.min(uTotalPages, p + 1))}
                  disabled={uPageSafe >= uTotalPages}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── PAYMENTS ADMIN ── */

function PaymentsAdmin({ token }) {
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pSearch, setPSearch] = useState("");
  const [pType, setPType] = useState("All");
  const [pStatus, setPStatus] = useState("All");
  useEffect(() => {
    fetch("/api/admin/payments", { headers:{ Authorization:`Bearer ${token}` } })
      .then(r=>r.json()).then(d=>{ if(Array.isArray(d)) setTxs(d); setLoading(false); }).catch(()=>setLoading(false));
  }, [token]);

  const total   = txs.filter(t=>t.status==="paid").reduce((s,t)=>s+t.amount,0);
  const pending = txs.filter(t=>t.status==="pending").reduce((s,t)=>s+t.amount,0);
  const thisMonth = txs.filter(t=>{ const d=new Date(t.createdAt); const n=new Date(); return t.status==="paid"&&d.getMonth()===n.getMonth()&&d.getFullYear()===n.getFullYear(); }).reduce((s,t)=>s+t.amount,0);

  const filtered = txs.filter(t => {
    const matchSearch = !pSearch || (t.user?.name||"").toLowerCase().includes(pSearch.toLowerCase()) || (t.itemTitle||"").toLowerCase().includes(pSearch.toLowerCase());
    const matchType = pType==="All" || t.itemType===pType.toLowerCase();
    const matchStatus = pStatus==="All" || t.status===pStatus.toLowerCase();
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-xl font-bold text-white">Payments</h1><p className="text-xs text-gray-400">Track all transactions and revenue</p></div>
        <div className="flex gap-3">
          {[["Total Revenue",`₹${total.toLocaleString()}`, "text-[#C7E36B]"],["This Month",`₹${thisMonth.toLocaleString()}`,"text-blue-400"],["Pending",`₹${pending.toLocaleString()}`,"text-yellow-400"]].map(([k,v,c])=>(
            <div key={k} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center"><p className="text-[10px] text-gray-400">{k}</p><p className={`text-sm font-bold ${c}`}>{v}</p></div>
          ))}
        </div>
      </div>
      {/* Search + Filters */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <input value={pSearch} onChange={e=>setPSearch(e.target.value)} placeholder="Search by student or program..." className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder-gray-500 outline-none"/>
          <I name="search" size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500"/>
        </div>
        <select value={pType} onChange={e=>setPType(e.target.value)} className="bg-white/5 border border-white/10 text-gray-400 text-sm rounded-lg px-3 py-2 outline-none">
          {["All","Course","Workshop","Bootcamp"].map(o=><option key={o}>{o}</option>)}
        </select>
        <select value={pStatus} onChange={e=>setPStatus(e.target.value)} className="bg-white/5 border border-white/10 text-gray-400 text-sm rounded-lg px-3 py-2 outline-none">
          {["All","Paid","Pending","Failed"].map(o=><option key={o}>{o}</option>)}
        </select>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="text-[11px] text-gray-500 font-semibold uppercase bg-white/5">
            {["Transaction ID","User","Program","Type","Date","Amount","Status"].map(h=><th key={h} className="text-left px-4 py-3">{h}</th>)}
          </tr></thead>
          <tbody className="divide-y divide-white/5">
            {loading ? <tr><td colSpan={7}><AdminLoader /></td></tr>
              : filtered.length === 0 ? <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-500 text-sm">No transactions yet</td></tr>
              : filtered.map((p,i)=>(
              <tr key={i} className="hover:bg-white/5 transition-all">
                <td className="px-4 py-3 text-xs font-semibold text-gray-300">#{p._id?.slice(-8).toUpperCase()}</td>
                <td className="px-4 py-3 text-sm text-white">{p.user?.name||"—"}</td>
                <td className="px-4 py-3 text-sm text-gray-300">{p.itemTitle||"—"}</td>
                <td className="px-4 py-3"><span className={`text-[10px] font-bold capitalize ${p.itemType==="bootcamp"?"text-blue-400":p.itemType==="workshop"?"text-purple-400":"text-green-400"}`}>{p.itemType}</span></td>
                <td className="px-4 py-3 text-sm text-gray-400">{new Date(p.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-sm font-bold text-white">₹{p.amount}</td>
                <td className="px-4 py-3"><span className={`text-[10px] font-bold px-2 py-1 rounded-full capitalize ${p.status==="paid"?"bg-green-500/20 text-green-400":p.status==="failed"?"bg-red-500/20 text-red-400":"bg-yellow-500/20 text-yellow-400"}`}>{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EnrolmentsAdmin({ token }) {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState("");
  const [typeFilter, setTypeFilter]   = useState("All");
  const [ePage, setEPage]             = useState(1);
  const [showExport, setShowExport]   = useState(false);
  const [exportFmt, setExportFmt]     = useState("xlsx");
  const [viewEnrollment, setViewEnrollment] = useState(null);
  const E_PER_PAGE = 10;

  useEffect(() => {
    fetch("/api/admin/enrollments", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setEnrollments(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [token]);

  useEffect(() => { setEPage(1); }, [search, typeFilter]);

  const filtered = enrollments.filter(e => {
    const q = search.toLowerCase();
    const matchSearch = !q || (e.user?.name||"").toLowerCase().includes(q) || (e.item||"").toLowerCase().includes(q);
    const matchType = typeFilter === "All" || e.type === typeFilter.toLowerCase();
    return matchSearch && matchType;
  });

  const eTotalPages = Math.max(1, Math.ceil(filtered.length / E_PER_PAGE));
  const ePageSafe   = Math.min(ePage, eTotalPages);
  const paginated   = filtered.slice((ePageSafe - 1) * E_PER_PAGE, ePageSafe * E_PER_PAGE);

  const totalAmount    = enrollments.reduce((s, e) => s + (e.price || 0), 0);
  const bootcampCount  = enrollments.filter(e => e.type === "bootcamp").length;
  const courseCount    = enrollments.filter(e => e.type === "course").length;
  const workshopCount  = enrollments.filter(e => e.type === "workshop").length;

  const typeBadge = t => {
    if (t === "bootcamp")  return "bg-purple-600 text-white";
    if (t === "workshop")  return "bg-[#C7E36B] text-black";
    return "bg-blue-600 text-white";
  };
  const typeLabel = t => t === "course" ? "Video Course" : t ? t.charAt(0).toUpperCase() + t.slice(1) : "—";

  const doExport = () => {
    const rows = [["Student","Email","Program","Type","Amount","Date"]];
    filtered.forEach(e => rows.push([
      e.user?.name||"", e.user?.email||"", e.item||"", e.type||"",
      e.price ? `₹${e.price}` : "—",
      new Date(e.enrolledAt).toLocaleDateString(),
    ]));
    const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    a.download = "enrollments.csv"; a.click();
    setShowExport(false);
  };

  return (
    <div className="p-6">

      {/* ── Enrollment Detail Modal ── */}
      {viewEnrollment && (() => {
        const en = viewEnrollment;
        const typeLabel = t => t === "course" ? "Video Course" : t ? t.charAt(0).toUpperCase() + t.slice(1) : "—";
        const typeBg    = t => t === "bootcamp" ? "bg-purple-500 text-white" : t === "workshop" ? "bg-[#C7E36B] text-black" : "bg-yellow-400 text-black";
        const payId     = `PAY-${new Date(en.enrolledAt).getFullYear()}-${String(en._id || "000000").slice(-6).toUpperCase()}`;
        const invId     = `INV-${new Date(en.enrolledAt).getFullYear()}-${String(en._id || "000000").slice(-6).toUpperCase()}`;
        return (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setViewEnrollment(null)}>
            <div className="bg-[#111416] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden" onClick={ev => ev.stopPropagation()}>
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <h2 className="text-lg font-bold text-white">Enrollment Details</h2>
                <button onClick={() => setViewEnrollment(null)} className="text-gray-400 hover:text-white w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 text-lg leading-none">✕</button>
              </div>
              <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
                {/* Payment ID */}
                <p className="text-xs text-gray-500">Payment ID: <span className="text-gray-300 font-medium">{payId}</span></p>

                {/* Student Info */}
                <div>
                  <p className="text-sm font-bold text-white mb-3">Student Information</p>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#C7E36B] text-black font-black text-lg flex items-center justify-center shrink-0">
                      {(en.user?.name||"U")[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{en.user?.name||"—"}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{en.user?.email||""}</p>
                      {en.user?.phone && <p className="text-xs text-gray-500 mt-0.5">{en.user.phone}</p>}
                    </div>
                  </div>
                </div>

                {/* Purchase Details */}
                <div>
                  <p className="text-sm font-bold text-white mb-3">Purchase Details ({typeLabel(en.type)})</p>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {en.type === "workshop" ? <><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></> : en.type === "bootcamp" ? <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/> : <polygon points="5 3 19 12 5 21 5 3"/>}
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">{en.item||"—"}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Enrolled: {new Date(en.enrolledAt).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</p>
                    </div>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-lg shrink-0 ${typeBg(en.type)}`}>{typeLabel(en.type)}</span>
                  </div>
                </div>

                {/* Order Summary */}
                <div>
                  <p className="text-sm font-bold text-white mb-3">Order Summary</p>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#C7E36B]/10 flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                      </div>
                      <p className="text-sm text-gray-300">Total Amount</p>
                    </div>
                    <p className="text-base font-black text-white">
                      {en.price ? `₹${Number(en.price).toLocaleString("en-IN")}` : "—"}
                    </p>
                  </div>
                </div>

                {/* Invoice */}
                <div>
                  <p className="text-sm font-bold text-white mb-3">Invoice</p>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white">Invoice #{invId}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {new Date(en.enrolledAt).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}
                        {en.price ? ` · ₹${Number(en.price).toLocaleString("en-IN")}` : ""}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const content = `Invoice #${invId}\nStudent: ${en.user?.name||""}\nEmail: ${en.user?.email||""}\nProgram: ${en.item||""}\nType: ${typeLabel(en.type)}\nAmount: ${en.price ? `₹${en.price}` : "—"}\nDate: ${new Date(en.enrolledAt).toLocaleDateString()}`;
                        const a = document.createElement("a");
                        a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(content);
                        a.download = `invoice-${invId}.txt`; a.click();
                      }}
                      className="text-xs border border-white/20 text-gray-300 px-3 py-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors shrink-0 whitespace-nowrap">
                      Download Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Export Modal ── */}
      {showExport && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowExport(false)}>
          <div className="bg-[#111416] border border-white/10 rounded-2xl w-full max-w-sm overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between px-6 py-5 border-b border-white/10">
              <div>
                <h2 className="text-base font-bold text-white">Export Enrollments</h2>
                <p className="text-xs text-gray-400 mt-0.5">Choose the data you want to export and the format for your file.</p>
              </div>
              <button onClick={() => setShowExport(false)} className="text-gray-400 hover:text-white w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 text-lg leading-none shrink-0">✕</button>
            </div>
            <div className="p-6">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-3">File Format</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "csv",  label: "CSV",         desc: "Export data in CSV (Comma separated values) format." },
                  { id: "xlsx", label: "Excel (XLSX)", desc: "Export data in Excel spreadsheet format." },
                ].map(fmt => (
                  <button key={fmt.id} onClick={() => setExportFmt(fmt.id)}
                    className={`text-left p-4 rounded-xl border transition-all ${exportFmt === fmt.id ? "border-[#C7E36B] bg-[#C7E36B]/5" : "border-white/10 bg-white/5 hover:border-white/20"}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${exportFmt === fmt.id ? "border-[#C7E36B]" : "border-white/30"}`}>
                        {exportFmt === fmt.id && <div className="w-2 h-2 rounded-full bg-[#C7E36B]"/>}
                      </div>
                      <p className={`text-sm font-bold ${exportFmt === fmt.id ? "text-white" : "text-gray-400"}`}>{fmt.label}</p>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-snug">{fmt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button onClick={() => setShowExport(false)} className="flex-1 py-3 bg-white text-[#0F1112] font-bold text-sm rounded-xl hover:bg-gray-100 transition-colors">Cancel</button>
              <button onClick={doExport} className="flex-1 py-3 bg-[#C7E36B] text-black font-bold text-sm rounded-xl hover:bg-[#d4ef7a] transition-colors">Export</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Enrollments</h1>
          <p className="text-xs text-gray-400 mt-0.5">Total enrolments across Bootcamp, Video Courses &amp; Workshops</p>
        </div>
        <button onClick={() => setShowExport(true)} className="flex items-center gap-2 border border-white/20 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-white/5 transition-all shrink-0">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export
        </button>
      </div>

      {/* ── 5 Stats Cards ── */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {[
          {
            label: "Total Enrollments", value: enrollments.length,
            icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="1.8" strokeLinecap="round"><path d="M12 15c-4.4 0-8 2.4-8 4v1h16v-1c0-1.6-3.6-4-8-4z"/><circle cx="12" cy="8" r="4"/></svg>
          },
          {
            label: "Bootcamp Enrolments", value: bootcampCount,
            icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="1.8" strokeLinecap="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
          },
          {
            label: "Video Course Enrolments", value: courseCount,
            icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="1.8" strokeLinecap="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          },
          {
            label: "Workshop Enrolments", value: workshopCount,
            icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          },
          {
            label: "Total Amount", value: `₹${totalAmount.toLocaleString("en-IN")}`,
            icon: <span className="text-xl font-black text-[#C7E36B] leading-none">₹</span>
          },
        ].map(s => (
          <div key={s.label} className="bg-[#111315] border border-white/10 rounded-2xl p-5 flex items-center gap-3">
            <div className="shrink-0">{s.icon}</div>
            <div className="min-w-0">
              <p className="text-xs text-gray-400 leading-tight">{s.label}</p>
              <p className="text-2xl font-black text-white leading-tight mt-1">{typeof s.value === "number" ? s.value.toLocaleString() : s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Search + Filter ── */}
      <div className="bg-[#111315] border border-white/10 rounded-2xl p-4 mb-5 flex items-end gap-4">
        <div className="relative flex-1">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..."
            className="w-full bg-transparent pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none border border-white/10 rounded-xl focus:border-[#C7E36B]/40"/>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1.5 font-medium">Program Types</p>
          <div className="relative">
            <select value={typeFilter} onChange={e => { setTypeFilter(e.target.value); setEPage(1); }}
              className="appearance-none bg-[#1A1D1E] border border-white/10 text-white text-sm rounded-xl pl-4 pr-9 py-2.5 outline-none focus:border-[#C7E36B]/40 min-w-[160px]">
              {["All","Course","Workshop","Bootcamp"].map(o => <option key={o}>{o}</option>)}
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-[#111315] border border-white/10 rounded-2xl overflow-hidden">
        {/* Header row */}
        <div className="grid grid-cols-[2fr_2fr_1.2fr_1fr_1.2fr_80px] px-5 py-3.5 border-b border-white/10">
          {["STUDENT","PROGRAM","TYPE","AMOUNT","DATE","ACTIONS"].map(h => (
            <span key={h} className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">{h}</span>
          ))}
        </div>
        {loading ? (
          <div className="py-12 flex justify-center"><AdminLoader label="Loading Enrollments"/></div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-3xl mb-3">📋</p>
            <p className="text-sm text-gray-400">No enrollments found</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {paginated.map((e, i) => (
              <div key={i} className="grid grid-cols-[2fr_2fr_1.2fr_1fr_1.2fr_80px] px-5 py-4 items-center hover:bg-white/[0.03] transition-all">
                {/* Student */}
                <div className="flex items-center gap-3">
                  {e.user?.avatar
                    ? <img src={e.user.avatar} alt="" className="w-9 h-9 rounded-full object-cover shrink-0"/>
                    : <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-xs font-bold text-white shrink-0">{(e.user?.name||"U")[0].toUpperCase()}</div>
                  }
                  <div>
                    <p className="text-sm font-semibold text-white">{e.user?.name||"—"}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{e.user?.email||""}</p>
                  </div>
                </div>
                {/* Program */}
                <span className="text-sm text-gray-300 pr-4 line-clamp-2">{e.item||"—"}</span>
                {/* Type badge */}
                <span className={`inline-flex items-center text-xs font-bold px-3 py-1 rounded-lg w-fit ${typeBadge(e.type)}`}>{typeLabel(e.type)}</span>
                {/* Amount */}
                <span className="text-sm text-gray-200">{e.price ? `₹${Number(e.price).toLocaleString("en-IN")}` : "—"}</span>
                {/* Date */}
                <span className="text-sm text-gray-300">{new Date(e.enrolledAt).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</span>
                {/* Action */}
                <button onClick={() => setViewEnrollment(e)} className="border border-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-lg hover:bg-white/10 transition-all w-fit">View</button>
              </div>
            ))}
          </div>
        )}

        {/* Pagination footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/5">
          <p className="text-xs text-gray-500">
            Showing {filtered.length === 0 ? 0 : (ePageSafe - 1) * E_PER_PAGE + 1} to {Math.min(ePageSafe * E_PER_PAGE, filtered.length)} of {filtered.length}
          </p>
          {eTotalPages > 1 && (
            <div className="flex items-center gap-1">
              <button onClick={() => setEPage(p => Math.max(1, p - 1))} disabled={ePageSafe <= 1}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              {Array.from({ length: eTotalPages }, (_, i) => i + 1)
                .filter(n => n === 1 || n === eTotalPages || Math.abs(n - ePageSafe) <= 1)
                .reduce((acc, n, idx, arr) => {
                  if (idx > 0 && n - arr[idx - 1] > 1) acc.push("...");
                  acc.push(n); return acc;
                }, [])
                .map((n, i) => n === "..." ? (
                  <span key={`e${i}`} className="w-7 h-7 flex items-center justify-center text-gray-500 text-xs">…</span>
                ) : (
                  <button key={n} onClick={() => setEPage(n)}
                    className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold transition-colors ${n === ePageSafe ? "bg-[#C7E36B] text-black" : "text-gray-400 hover:text-white hover:bg-white/10"}`}>
                    {n}
                  </button>
                ))
              }
              <button onClick={() => setEPage(p => Math.min(eTotalPages, p + 1))} disabled={ePageSafe >= eTotalPages}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AnalyticsAdmin({ token }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/analytics", { headers:{ Authorization:`Bearer ${token}` } })
      .then(r=>r.json()).then(d=>{ if(!d.message) setData(d); setLoading(false); }).catch(()=>setLoading(false));
  }, [token]);

  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const monthlyRows = data?.monthlyData || [];
  const maxCount = Math.max(1, ...monthlyRows.map(m=>m.count));
  const topCourses = data?.topCourses || [];
  const maxCourseCount = Math.max(1, ...topCourses.map(c=>c.count));

  return (
    <div className="p-6 space-y-6">
      <div><h1 className="text-xl font-bold text-white">Analytics</h1><p className="text-xs text-gray-400">Platform performance and enrollment trends</p></div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          ["Total Revenue",     data ? `₹${(data.totalRevenue||0).toLocaleString()}` : "—", "text-[#C7E36B]"],
          ["Total Enrollments", data?.totalEnrollments ?? "—",                               "text-blue-400"],
          ["Courses",           (data?.byType||[]).find(t=>t._id==="course")?.count ?? "—",  "text-green-400"],
          ["Bootcamps",         (data?.byType||[]).find(t=>t._id==="bootcamp")?.count ?? "—","text-orange-400"],
        ].map(([k,v,c])=>(
          <div key={k} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <p className={`text-xl font-bold ${c}`}>{loading?"—":v}</p>
            <p className="text-xs text-gray-400 mt-1">{k}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Enrollments by month bar chart */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Enrollments (Last 6 Months)</h3>
          {loading ? <AdminLoader />
            : monthlyRows.length === 0
            ? <p className="text-gray-500 text-sm text-center py-8">No enrollment data yet</p>
            : (
            <div className="flex items-end gap-2 h-36">
              {monthlyRows.map((m,i) => {
                const pct = Math.max(4, Math.round((m.count / maxCount) * 100));
                const mn = MONTHS[(m._id.month-1)] || m._id.month;
                return (
                  <div key={i} className="flex flex-col items-center flex-1 gap-1">
                    <span className="text-[9px] text-gray-500">{m.count}</span>
                    <div className="w-full bg-[#C7E36B] rounded-t-sm" style={{height:`${pct}%`}} />
                    <span className="text-[9px] text-gray-500">{mn}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Top courses */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Top Courses by Enrollment</h3>
          {loading ? <AdminLoader />
            : topCourses.length === 0
            ? <p className="text-gray-500 text-sm text-center py-8">No course data yet</p>
            : (
            <div className="space-y-3">
              {topCourses.map((c,i) => {
                const pct = Math.max(4, Math.round((c.count / maxCourseCount) * 100));
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-gray-300 truncate max-w-[200px]">{c._id}</p>
                      <span className="text-[10px] text-[#C7E36B] font-bold ml-2">{c.count}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5">
                      <div className="bg-[#C7E36B] h-1.5 rounded-full" style={{width:`${pct}%`}} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Revenue by type */}
      {data?.byType && data.byType.length > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Enrollments by Product Type</h3>
          <div className="flex gap-6">
            {data.byType.map((t,i) => (
              <div key={i} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${t._id==="bootcamp"?"bg-blue-400":t._id==="workshop"?"bg-purple-400":"bg-green-400"}`}/>
                <span className="text-sm text-gray-300 capitalize">{t._id}</span>
                <span className="text-sm font-bold text-white">{t.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── SHARED ── */
function Sect({ icon, title, children }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-2 pb-2 border-b border-white/5"><I name={icon} size={14} className="text-gray-400"/><h3 className="text-sm font-semibold text-white">{title}</h3></div>
      {children}
    </div>
  );
}

function AdminLoader({ label = "Loading" }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="relative">
        <img src="/logos/aifabetalogo.svg" alt="AIFA" className="h-12 animate-pulse" onError={e=>{e.target.style.display='none';}} />
        <div className="absolute -inset-3 rounded-full border-2 border-[#C7E36B]/30 animate-ping"/>
        <div className="absolute -inset-5 rounded-full border border-[#C7E36B]/10 animate-ping" style={{animationDelay:"0.3s"}}/>
      </div>
      <p className="text-gray-500 text-xs tracking-widest uppercase animate-pulse">{label}</p>
    </div>
  );
}

function Fld({ label, value, onChange, textarea, placeholder, prefix, type, min }) {
  const cls = "w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/50 placeholder-gray-600";
  return (
    <div>
      {label && <p className="text-[10px] text-gray-400 font-semibold mb-1">{label}</p>}
      <div className="relative">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{prefix}</span>}
        {textarea
          ? <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} className={`${cls} resize-none h-24 ${prefix?"pl-7":""}`}/>
          : <input type={type||"text"} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} min={min} className={`${cls} ${prefix?"pl-7":""} ${type==="date"?"[color-scheme:dark]":""}`}/>
        }
      </div>
    </div>
  );
}

function Tog({ value, onChange }) {
  return (
    <button onClick={()=>onChange(!value)} className={`w-10 h-5 rounded-full transition-all shrink-0 relative ${value?"bg-[#C7E36B]":"bg-white/20"}`}>
      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${value?"right-0.5":"left-0.5"}`}/>
    </button>
  );
}

/* ── COMMUNITY ADMIN ── */

/* ── DEMO DATA ── */
const DEMO_EVENTS = [
  { _id:"e1", title:"AI Prompt Engineering Masterclass", startTime:"18:00 - 20:00 (GMT+2)", location:"Online · Zoom",       month:"NOV", day:"12", rsvps:142, capacity:200, featured:false, limitedSeats:false, bg:"from-blue-900 via-indigo-900 to-purple-900" },
  { _id:"e2", title:"AIFA Community Mixer: London",       startTime:"14:00 - 17:00",          location:"The Shard, London",   month:"NOV", day:"15", rsvps:45,  capacity:50,  featured:true,  limitedSeats:false, bg:"from-emerald-900 via-teal-900 to-cyan-900" },
  { _id:"e3", title:'"The AI Revolution" Documentary Screening', startTime:"19:30 - 21:00",   location:"Digital Hub, Paris",  month:"NOV", day:"20", rsvps:28,  capacity:30,  featured:false, limitedSeats:true,  bg:"from-orange-900 via-red-900 to-rose-900" },
];

const THREAD_CATEGORIES = ["Prompts","General","Discussion","Announcements","Q&A","Resources","Technical"];
const THREAD_FLAIRS     = ["Fix My Prompt","Discussion","Question","Showcase","Tutorial","News","Update"];
const BLANK_THREAD_FORM = { title:"", category:"", flair:"", summary:"", content:"", visibility:"Public", allowReplies:true, pinThread:false, schedulePublish:false, publishDate:"", publishTime:"", status:"Draft" };

function CommunityAdmin({ token, adminName }) {
  /* ── Forum state ── */
  const [keywords, setKeywords]   = useState(["crypto","nft","discount"]);
  const [newKw, setNewKw]         = useState("");
  const [showAnnForm, setShowAnnForm] = useState(false);
  const [annTitle, setAnnTitle]   = useState("");
  const [annMsg, setAnnMsg]       = useState("");
  const [annSuccess, setAnnSuccess] = useState(false);
  const [threads, setThreads]     = useState([]);
  const [threadsLoading, setThreadsLoading] = useState(true);
  const [userCount, setUserCount] = useState(null);

  /* ── Create Thread state ── */
  const [showCreateThread, setShowCreateThread] = useState(false);
  const [tf, setTf]           = useState(BLANK_THREAD_FORM);
  const [coverFile, setCoverFile] = useState(null);
  const [extLink, setExtLink] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);

  /* ── Events state ── */
  const [events, setEvents]           = useState([]);
  const [eventsLoading, setEvLoading] = useState(false);
  const [eventSearch, setEventSearch] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState("All Types");
  const [showEventForm, setShowEventForm] = useState(false);
  const [event, setEvent] = useState({ title:"", type:"Workshop", mode:"ONLINE", date:"", startTime:"", endTime:"", timezone:"", duration:"2", capacity:"", description:"", link:"", location:"", openRSVP:true, featured:false });
  const [eventSuccess, setEventSuccess] = useState(false);

  /* ── Awards/Challenges state ── */
  const [challengeFilter, setChallengeFilter]   = useState("Active");
  const [showChallengeForm, setShowChallengeForm] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [challengePublishedOk, setChallengePublishedOk] = useState(false);
  const [challenge, setChallenge] = useState({ title:"", desc:"", startDate:"", endDate:"", visibility:"Public" });
  const [challengeThumb, setChallengeThumb] = useState(null);
  const [challengeSubTypes, setChallengeSubTypes] = useState(["Video"]);
  const [challengeAwards, setChallengeAwards] = useState([{ type:"Cash Reward", description:"" }]);
  const [challenges, setChallenges] = useState([]);

  /* ── Clubs state ── */
  const [clubs, setClubs]               = useState([]);
  const [showClubForm, setShowClubForm] = useState(false);
  const [clubForm, setClubForm]         = useState({ name:"", city:"", description:"", type:"Public", memberLimit:"", isPrimary:false, autoDetect:false });
  const [selectedClub, setSelectedClub] = useState(null);
  const [clubDetailTab, setClubDetailTab] = useState("feed");

  /* ── Chats state ── */
  const [channels, setChannels]               = useState([]);
  const [showChannelForm, setShowChannelForm] = useState(false);
  const [channelForm, setChannelForm]         = useState({ name:"", category:"General", description:"", inviteLink:"", access:"Public" });

  /* ── Event thumbnail ── */
  const [thumbPreview, setThumbPreview] = useState(null);

  /* ── Nav ── */
  const [commTab, setCommTab] = useState("forum");
  const [pinnedIds, setPinnedIds] = useState(new Set());
  const [openThreadMenu, setOpenThreadMenu] = useState(null);

  useEffect(() => {
    fetch("/api/community/threads")
      .then(r => r.ok ? r.json() : [])
      .then(d => { if (Array.isArray(d)) setThreads(d); setThreadsLoading(false); })
      .catch(() => setThreadsLoading(false));
  }, []);

  useEffect(() => {
    if (commTab !== "events") return;
    setEvLoading(true);
    fetch("/api/community/events", { headers:{ Authorization:`Bearer ${token}` } })
      .then(r => r.ok ? r.json() : [])
      .then(d => { setEvents(Array.isArray(d) ? d : []); setEvLoading(false); })
      .catch(() => { setEvents([]); setEvLoading(false); });
  }, [commTab, token]);

  useEffect(() => {
    fetch("/api/users", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : [])
      .then(d => { if (Array.isArray(d)) setUserCount(d.length); })
      .catch(() => {});
  }, [token]);

  /* ── helpers ── */
  const reportedThreads = threads.filter(t => t.isReported || (t.reports && t.reports.length > 0));
  const REPORT_BADGE = { "HATE SPEECH":"bg-orange-500/20 text-orange-400","SPAM":"bg-yellow-500/20 text-yellow-400","HARASSMENT":"bg-red-500/20 text-red-400","MISINFORMATION":"bg-purple-500/20 text-purple-400" };
  const getReportType = t => t.reportType || t.reports?.[0]?.type || "SPAM";
  useEffect(() => {
    if (!openThreadMenu) return;
    const close = () => setOpenThreadMenu(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [openThreadMenu]);
  const COMM_TABS = ["Forum","Events","Clubs","Chats","Awards"];
  const fmtRelTime = (dateStr) => {
    if (!dateStr) return "";
    const diff = Date.now() - new Date(dateStr).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h/24)}d ago`;
  };

  /* ══════════════════════════════════════════
     CREATE THREAD FORM (full-page)
  ══════════════════════════════════════════ */
  if (showCreateThread) {
    const today = new Date().toISOString().split("T")[0];
    const canPublish = !tf.schedulePublish || (tf.publishDate && tf.publishTime);
    const wordCount = tf.content.trim().split(/\s+/).filter(Boolean).length;
    const authorInitials = (adminName||"A").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();

    const handlePublish = async () => {
      if (!tf.title.trim() || !tf.content.trim()) return;
      setPublishing(true);
      const payload = { title: tf.title, body: tf.content, tag: tf.flair || tf.category || "General", author: adminName, summary: tf.summary, status: tf.status };
      try {
        const res = await fetch("/api/community/threads", { method:"POST", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}, body:JSON.stringify(payload) });
        if (res.ok) {
          const created = await res.json();
          setThreads(prev => [created, ...prev]);
          setShowCreateThread(false); setTf(BLANK_THREAD_FORM); setCoverFile(null); setExtLink("");
          setCreateSuccess(true); setTimeout(() => setCreateSuccess(false), 3000);
        }
      } catch {}
      setPublishing(false);
    };

    return (
      <div className="flex h-full overflow-hidden">
        {/* Left: form */}
        <div className="flex-1 overflow-y-auto">
          {/* Top bar — title only, no action buttons */}
          <div className="px-8 py-5 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <span>Community</span><span>/</span><span>Forum</span><span>/</span><span className="text-white">Create Thread</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Create Thread</h1>
            <p className="text-sm text-gray-400 mt-0.5">Create a new community discussion and publish it to the forum.</p>
          </div>

          <div className="px-8 py-6 space-y-5">
            {/* Section 1 — Thread Details */}
            <div className="bg-[#111315] border border-white/10 rounded-2xl p-6">
              <h2 className="text-sm font-bold text-white flex items-center gap-2 mb-5">
                <span className="w-6 h-6 rounded-full bg-[#C7E36B] text-black text-xs font-black flex items-center justify-center">1</span>
                Thread Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-400 mb-1.5 block">Thread Title <span className="text-red-400">*</span></label>
                  <input value={tf.title} onChange={e => setTf(f=>({...f,title:e.target.value}))} placeholder="Enter an engaging title for your thread"
                    className="w-full bg-[#0F1112] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/40"/>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-400 mb-1.5 block">Category <span className="text-red-400">*</span></label>
                    <div className="relative">
                      <select value={tf.category} onChange={e => setTf(f=>({...f,category:e.target.value}))} className="appearance-none w-full bg-[#0F1112] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#C7E36B]/40 pr-9">
                        <option value="">Select category</option>
                        {THREAD_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                      <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-400 mb-1.5 block">Flair</label>
                    <div className="relative">
                      <select value={tf.flair} onChange={e => setTf(f=>({...f,flair:e.target.value}))} className="appearance-none w-full bg-[#0F1112] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#C7E36B]/40 pr-9">
                        <option value="">Select flair (optional)</option>
                        {THREAD_FLAIRS.map(f => <option key={f}>{f}</option>)}
                      </select>
                      <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-400 mb-1.5 block">Short Description / Summary <span className="text-red-400">*</span></label>
                    <div className="relative">
                      <textarea value={tf.summary} onChange={e => setTf(f=>({...f,summary:e.target.value.slice(0,180)}))} rows={1}
                        placeholder="Briefly summarize what this thread is about..."
                        className="w-full bg-[#0F1112] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/40 resize-none"/>
                      <span className="absolute bottom-2 right-3 text-[10px] text-gray-600">{tf.summary.length}/180</span>
                    </div>
                  </div>
                </div>
                {/* Thread Content */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 mb-1.5 block">Thread Content <span className="text-red-400">*</span></label>
                  {/* Toolbar */}
                  <div className="bg-[#0F1112] border border-white/10 rounded-t-xl px-3 py-2 flex items-center gap-1 flex-wrap border-b-0">
                    {[
                      { label:"B", title:"Bold", style:"font-bold" },
                      { label:"I", title:"Italic", style:"italic" },
                      { label:"U", title:"Underline", style:"underline" },
                      { label:"S", title:"Strikethrough", style:"line-through" },
                    ].map(btn => (
                      <button key={btn.title} title={btn.title} className="w-7 h-7 flex items-center justify-center text-xs text-gray-400 hover:text-white hover:bg-white/10 rounded font-mono">
                        <span className={btn.style}>{btn.label}</span>
                      </button>
                    ))}
                    <div className="w-px h-4 bg-white/10 mx-1"/>
                    {[
                      { icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>, title:"Link" },
                      { icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>, title:"Blockquote" },
                      { icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>, title:"Code" },
                    ].map(btn => (
                      <button key={btn.title} title={btn.title} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded">{btn.icon}</button>
                    ))}
                    <div className="w-px h-4 bg-white/10 mx-1"/>
                    <div className="relative">
                      <select defaultValue="Paragraph" className="appearance-none bg-transparent text-xs text-gray-400 pr-4 outline-none cursor-pointer">
                        <option>Paragraph</option><option>Heading 1</option><option>Heading 2</option>
                      </select>
                      <svg className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                  </div>
                  <div className="relative">
                    <textarea value={tf.content} onChange={e => setTf(f=>({...f,content:e.target.value}))} rows={8}
                      placeholder="Write your thread content here. You can add details, context, examples, and any relevant information..."
                      className="w-full bg-[#0F1112] border border-white/10 rounded-b-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/40 resize-none"/>
                    <span className="absolute bottom-3 right-4 text-[10px] text-gray-600">{wordCount} words</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 — Media & Links */}
            <div className="bg-[#111315] border border-white/10 rounded-2xl p-6">
              <h2 className="text-sm font-bold text-white flex items-center gap-2 mb-5">
                <span className="w-6 h-6 rounded-full bg-[#C7E36B] text-black text-xs font-black flex items-center justify-center">2</span>
                Media &amp; Links
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold text-gray-400 mb-1.5 block">Cover Image / Attachment</label>
                  <label className="border border-dashed border-white/15 rounded-xl py-8 flex flex-col items-center justify-center cursor-pointer hover:border-white/30 transition-all">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="1.8" strokeLinecap="round" className="mb-2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    <p className="text-sm text-gray-300">Drag &amp; drop an image here</p>
                    <p className="text-xs text-gray-500">or <span className="text-[#C7E36B]">click to browse</span></p>
                    <p className="text-[10px] text-gray-600 mt-1.5">Recommended: 1280×720px (16:9), Max 5MB</p>
                    <input type="file" className="hidden" accept="image/*" onChange={e => setCoverFile(e.target.files?.[0]||null)}/>
                  </label>
                  {coverFile && <p className="mt-2 text-xs text-[#C7E36B] flex items-center gap-1"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>{coverFile.name}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 mb-1.5 block">Optional External Link</label>
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                    <input value={extLink} onChange={e => setExtLink(e.target.value)} placeholder="https://example.com"
                      className="w-full bg-[#0F1112] border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/40"/>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1.5">Add a relevant external link (optional)</p>
                </div>
              </div>
            </div>

            {/* Section 3 — Publishing Options */}
            <div className="bg-[#111315] border border-white/10 rounded-2xl p-6">
              <h2 className="text-sm font-bold text-white flex items-center gap-2 mb-5">
                <span className="w-6 h-6 rounded-full bg-[#C7E36B] text-black text-xs font-black flex items-center justify-center">3</span>
                Publishing Options
              </h2>
              <div className="grid grid-cols-4 gap-5">
                {/* Visibility */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 mb-2 block">Visibility</label>
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    <select value={tf.visibility} onChange={e => setTf(f=>({...f,visibility:e.target.value}))} className="appearance-none w-full bg-[#0F1112] border border-white/10 rounded-xl pl-8 pr-8 py-3 text-sm text-white outline-none focus:border-[#C7E36B]/40">
                      <option>Public</option><option>Members Only</option><option>Admins Only</option>
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">Visible to everyone</p>
                </div>
                {/* Allow Replies */}
                <div className="bg-[#0F1112] border border-white/5 rounded-xl p-4">
                  <label className="text-xs font-semibold text-gray-300 block mb-1">Allow Replies</label>
                  <p className="text-[10px] text-gray-500 mb-3">Members can reply to this thread</p>
                  <Tog value={tf.allowReplies} onChange={v => setTf(f=>({...f,allowReplies:v}))} />
                </div>
                {/* Pin Thread */}
                <div className="bg-[#0F1112] border border-white/5 rounded-xl p-4">
                  <label className="text-xs font-semibold text-gray-300 block mb-1">Pin Thread</label>
                  <p className="text-[10px] text-gray-500 mb-3">Pin to top of category</p>
                  <Tog value={tf.pinThread} onChange={v => setTf(f=>({...f,pinThread:v}))} />
                </div>
                {/* Schedule Publish */}
                <div className="bg-[#0F1112] border border-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-gray-300">Schedule Publish</label>
                    <Tog value={tf.schedulePublish} onChange={v => setTf(f=>({...f,schedulePublish:v,publishDate:"",publishTime:""}))} />
                  </div>
                  <p className="text-[10px] text-gray-500 mb-3">Set future date and time</p>
                  <div className={`space-y-2 transition-opacity ${tf.schedulePublish?"opacity-100":"opacity-30 pointer-events-none"}`}>
                    <div>
                      <label className="text-[10px] text-gray-500 mb-1 block">Publish Date</label>
                      <input type="date" min={today} value={tf.publishDate} disabled={!tf.schedulePublish} onChange={e => setTf(f=>({...f,publishDate:e.target.value}))}
                        className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white outline-none focus:border-[#C7E36B]/40 disabled:cursor-not-allowed"/>
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 mb-1 block">Publish Time</label>
                      <input type="time" value={tf.publishTime} disabled={!tf.schedulePublish} onChange={e => setTf(f=>({...f,publishTime:e.target.value}))}
                        className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white outline-none focus:border-[#C7E36B]/40 disabled:cursor-not-allowed"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom action bar — single source of truth */}
            <div className="flex items-center gap-3 pb-4">
              <button onClick={() => { setShowCreateThread(false); setTf(BLANK_THREAD_FORM); setCoverFile(null); setExtLink(""); }}
                className="border border-white/20 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-white/5 transition-colors">
                Cancel
              </button>
              <button onClick={() => setTf(f => ({...f, status:"Draft"}))}
                className="border border-white/20 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-white/5 transition-colors">
                Save Draft
              </button>
              <button className="flex items-center gap-2 border border-white/20 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-white/5 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                Preview
              </button>
              <button onClick={handlePublish}
                className="ml-auto bg-[#C7E36B] text-black font-semibold px-6 py-2.5 rounded-lg hover:bg-[#b8d44f] transition-colors flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                {publishing ? "Publishing..." : "Publish Thread"}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Live Preview + Guidelines + Quick Settings */}
        <div className="w-[300px] shrink-0 border-l border-white/5 bg-[#0F1112] overflow-y-auto p-5">
          {/* Live Preview */}
          <div className="mb-5">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              Live Preview
            </h3>
            {(() => {
              const previewFlair = tf.flair || tf.category || "DISCUSSION";
              const flairColors = {
                "Prompts":       { bg:"rgba(199,227,107,0.15)", color:"#C7E36B" },
                "General":       { bg:"rgba(107,114,128,0.2)",  color:"#9CA3AF" },
                "Discussion":    { bg:"rgba(59,130,246,0.15)",  color:"#93c5fd" },
                "Announcements": { bg:"rgba(245,158,11,0.15)",  color:"#FCD34D" },
                "Q&A":           { bg:"rgba(168,85,247,0.15)",  color:"#C084FC" },
                "Resources":     { bg:"rgba(16,185,129,0.15)",  color:"#6EE7B7" },
                "Technical":     { bg:"rgba(239,68,68,0.15)",   color:"#FCA5A5" },
                "Fix My Prompt": { bg:"rgba(199,227,107,0.15)", color:"#C7E36B" },
                "Showcase":      { bg:"rgba(236,72,153,0.15)",  color:"#F9A8D4" },
                "Tutorial":      { bg:"rgba(6,182,212,0.15)",   color:"#67E8F9" },
                "News":          { bg:"rgba(251,146,60,0.15)",  color:"#FD974E" },
                "Update":        { bg:"rgba(99,102,241,0.15)",  color:"#A5B4FC" },
              };
              const fc = flairColors[tf.flair] || flairColors[tf.category] || { bg:"rgba(59,130,246,0.15)", color:"#93c5fd" };
              return (
                <div className="bg-[#111315] border border-white/10 rounded-2xl p-4">
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full" style={{ background: fc.bg, color: fc.color }}>
                    {previewFlair}
                  </span>
                  <p className="text-sm font-bold text-white mt-2 mb-1 leading-snug" style={{ minHeight:"1.25rem" }}>
                    {tf.title || "Your Thread Title Will Appear Here"}
                  </p>
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black shrink-0" style={{ background:"rgba(199,227,107,0.2)", color:"#C7E36B" }}>{authorInitials}</div>
                    <span className="text-[10px] text-gray-400 font-semibold">{adminName || "Admin"}</span>
                    <span className="text-[10px] text-gray-600">· Just now</span>
                  </div>
                  <p className="text-[10px] text-gray-500 line-clamp-2 mb-3">{tf.summary || "This is a short summary of your thread that gives members a quick overview of what the discussion is about..."}</p>
                  <div className="flex items-center gap-3 text-[10px] text-gray-600 border-t border-white/5 pt-2">
                    <span className="flex items-center gap-1"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>0</span>
                    <span className="flex items-center gap-1"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>0</span>
                    <span className="flex items-center gap-1"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>0</span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Posting Guidelines */}
          <div className="mb-5">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Posting Guidelines / Admin Tips
            </h3>
            <div className="space-y-2.5">
              {["Write a clear and descriptive title.","Choose the most relevant category and flair.","Provide a helpful summary for better discoverability.","Ensure your content follows community guidelines.","Use visuals or links to add more value."].map(g => (
                <div key={g} className="flex items-start gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2.5" strokeLinecap="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>
                  <p className="text-xs text-gray-400 leading-relaxed">{g}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Settings */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M16.24 7.76a6 6 0 0 1 0 8.49"/></svg>
              Quick Settings
            </h3>
            <div className="space-y-4">
              {/* Status — Fix 1: only Draft / Active */}
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Status</p>
                <div className="flex gap-1 bg-[#111315] border border-white/10 rounded-xl p-1">
                  {["Draft","Active"].map(s => (
                    <button key={s} onClick={() => setTf(f=>({...f,status:s}))}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition-all ${tf.status===s
                        ? s==="Draft" ? "bg-white/10 text-white" : "bg-[#C7E36B] text-black"
                        : "text-gray-500 hover:text-gray-300"}`}>
                      {s === "Draft" && <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block"/>}
                      {s}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-gray-600 mt-1">{tf.status === "Draft" ? "Thread will be saved as a draft until published." : "Thread will be visible to all members."}</p>
              </div>
              {/* Category */}
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Category</p>
                <p className="text-sm text-white font-medium">{tf.category || "Not selected"}</p>
              </div>
              {/* Flair */}
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Flair</p>
                <p className="text-sm text-white font-medium">{tf.flair || "Not selected"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════
     EVENT CREATE FORM (full-page overlay)
  ══════════════════════════════════════════ */
  if (showEventForm) {
    const parseDate = d => { if (!d) return null; const a = new Date(d); if (!isNaN(a)) return a; const b = new Date(d + "T00:00:00"); return isNaN(b) ? null : b; };
    const previewDate  = parseDate(event.date);
    const previewMonth = previewDate ? previewDate.toLocaleDateString("en",{month:"short"}).toUpperCase() : null;
    const previewDay   = previewDate ? previewDate.getDate() : null;
    const previewMode  = event.mode === "ONLINE" ? (event.link ? "ONLINE (ZOOM)" : "ONLINE") : "OFFLINE";
    const durLabel     = event.duration ? (event.duration.toString().toLowerCase().includes("hour") ? event.duration : `${event.duration} Hours`) : "";
    const previewTime  = event.startTime ? `${event.startTime}${durLabel ? ` · ${durLabel}` : ""}` : "Time TBD";
    const previewCap   = event.capacity ? `${event.capacity} SEATS AVAILABLE` : "UNLIMITED SEATS";

    const doSubmit = async (status) => {
      try {
        const h = {"Content-Type":"application/json", Authorization:`Bearer ${token}`};
        const body = {...event, status, date: event.date ? new Date(event.date) : null, capacity: event.capacity ? Number(event.capacity) : null};
        const res = await fetch("/api/community/events",{method:"POST",headers:h,body:JSON.stringify(body)});
        if (res.ok) {
          const created = await res.json();
          setEvents(prev => [created, ...prev]);
          setShowEventForm(false);
          setEvent({title:"",type:"Workshop",mode:"ONLINE",date:"",startTime:"",endTime:"",timezone:"",duration:"2",capacity:"",description:"",link:"",location:"",openRSVP:true,featured:false});
          setThumbPreview(null);
          setEventSuccess(true); setTimeout(() => setEventSuccess(false), 3000);
        } else alert("Failed to create event.");
      } catch { alert("Network error."); }
    };

    return (
      <div className="flex h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Header with Save Draft + Publish Event — Fix 1 */}
          <div className="flex items-center gap-3 mb-2">
            <button onClick={() => setShowEventForm(false)} className="text-xs text-gray-400 hover:text-white border border-white/15 px-3 py-1.5 rounded-lg shrink-0">← Back</button>
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">Events / Editor</p>
              <h1 className="text-xl font-bold text-white leading-tight">Create New Event</h1>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button onClick={() => doSubmit("draft")} className="text-sm border border-white/20 text-gray-300 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors">Save Draft</button>
              <button onClick={() => doSubmit("published")} className="text-sm bg-[#C7E36B] text-black font-semibold px-4 py-2 rounded-lg hover:bg-[#b8d44f] transition-colors">Publish Event</button>
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <p className="text-xs font-bold text-white">Basic Information</p>
            </div>
            <Fld label="EVENT TITLE" value={event.title} onChange={v => setEvent({...event,title:v})} placeholder="e.g. AI Prompt Engineering Masterclass" />
            {/* Fix 1 — Thumbnail upload */}
            <div>
              <p className="text-[10px] text-gray-400 font-semibold mb-1">THUMBNAIL IMAGE</p>
              <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer transition-colors h-36 overflow-hidden ${thumbPreview?"border-[#C7E36B]/40":"border-white/15 hover:border-[#C7E36B]/40"}`}>
                {thumbPreview ? (
                  <img src={thumbPreview} alt="Thumbnail" className="w-full h-full object-cover"/>
                ) : (
                  <div className="text-center p-4">
                    <svg className="w-8 h-8 text-gray-600 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    <p className="text-sm text-gray-400">Drop your image here or <span className="text-[#C7E36B] underline">browse</span></p>
                    <p className="text-[10px] text-gray-600 mt-1">RECOMMENDED: 16:9 ASPECT RATIO</p>
                  </div>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) { const r = new FileReader(); r.onload = ev => setThumbPreview(ev.target.result); r.readAsDataURL(file); }
                }}/>
              </label>
              {thumbPreview && <button onClick={() => setThumbPreview(null)} className="mt-1 text-[10px] text-red-400 hover:text-red-300">✕ Remove image</button>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] text-gray-400 font-semibold mb-1">EVENT TYPE</p>
                <select value={event.type} onChange={e => setEvent({...event,type:e.target.value})} className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/50">
                  {["Workshop","Webinar","Masterclass","AMA","Hackathon","Screening","Networking"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold mb-1">MODE</p>
                <div className="flex gap-2">
                  {["ONLINE","OFFLINE"].map(m => (
                    <button key={m} onClick={() => setEvent({...event,mode:m})}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${event.mode===m?"border-[#C7E36B] bg-[#C7E36B]/10 text-[#C7E36B]":"border-white/15 text-gray-400 hover:border-white/30"}`}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold mb-1">DESCRIPTION</p>
              <textarea value={event.description} onChange={e => setEvent({...event,description:e.target.value})}
                placeholder="What is this event about?"
                rows={3}
                className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50 resize-none"/>
            </div>
          </div>

          {/* Schedule & Logistics */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <p className="text-xs font-bold text-white">Schedule &amp; Logistics</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Fld label="DATE" value={event.date} onChange={v => setEvent({...event,date:v})} placeholder="mm/dd/yyyy" />
              <Fld label="START TIME (24h)" value={event.startTime} onChange={v => setEvent({...event,startTime:v})} placeholder="e.g. 18:00" />
              <Fld label="END TIME (24h)" value={event.endTime} onChange={v => setEvent({...event,endTime:v})} placeholder="e.g. 20:00" />
              <Fld label="TIMEZONE" value={event.timezone} onChange={v => setEvent({...event,timezone:v})} placeholder="e.g. GMT+5:30" />
              <div className="col-span-2"><Fld label="DURATION" value={event.duration} onChange={v => setEvent({...event,duration:v})} placeholder="e.g. 1 Hour" /></div>
              <div className="col-span-2"><Fld label="MEETING LINK / VENUE ADDRESS" value={event.location||""} onChange={v => setEvent({...event,location:v})} placeholder="https://zoom.us/j/... or physical address" /></div>
            </div>
          </div>

          {/* Event Settings — Fix 2 (labels) + Fix 3 (capacity moved here) */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M16.24 7.76a6 6 0 0 1 0 8.49"/></svg>
              <p className="text-xs font-bold text-white">Event Settings</p>
            </div>
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-white">Enable RSVPs</p><p className="text-[10px] text-gray-400">Allow users to register for seats.</p></div>
              <Tog value={event.openRSVP} onChange={v => setEvent({...event,openRSVP:v})} />
            </div>
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-white">Featured Event</p><p className="text-[10px] text-gray-400">Pin to top of community feed.</p></div>
              <Tog value={event.featured} onChange={v => setEvent({...event,featured:v})} />
            </div>
            <div>
              <Fld label="CAPACITY LIMIT" value={event.capacity} onChange={v => setEvent({...event,capacity:v})} placeholder="Leave blank for unlimited" />
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex gap-3 pb-4">
            <button onClick={() => setShowEventForm(false)} className="text-sm border border-white/20 text-gray-300 px-5 py-2.5 rounded-lg hover:bg-white/5">Cancel</button>
            <button onClick={() => doSubmit("published")} className="text-sm bg-[#C7E36B] text-black font-bold px-5 py-2.5 rounded-lg hover:bg-lime-300 flex items-center gap-2"><I name="plus" size={14}/> Create Event</button>
          </div>
        </div>

        {/* Live preview panel — Fix 5 */}
        <div className="w-[300px] shrink-0 border-l border-white/5 bg-[#0F1112] p-5 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Real-Time Preview</p>
            <span className="text-[9px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">LIVE</span>
          </div>
          <div className="bg-[#111315] border border-white/10 rounded-2xl overflow-hidden">
            {/* Thumbnail */}
            <div className="h-[140px] relative overflow-hidden" style={{ background: thumbPreview ? "transparent" : "linear-gradient(135deg,#1e3a8a,#312e81,#581c87)" }}>
              {thumbPreview && <img src={thumbPreview} alt="" className="w-full h-full object-cover"/>}
              {event.type && (
                <span className="absolute top-3 left-3 text-[9px] font-black bg-black/50 text-white px-2 py-0.5 rounded uppercase tracking-wider">{event.type}</span>
              )}
              {event.featured && (
                <span className="absolute top-3 right-3 text-[9px] font-black bg-green-500 text-white px-2 py-1 rounded tracking-wider">FEATURED</span>
              )}
              {/* Date badge — reactive to date field */}
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm rounded-xl px-3 py-2 text-center min-w-[48px]">
                <p className="text-[9px] font-bold text-gray-300 uppercase tracking-wider leading-none mb-0.5">{previewMonth || "—"}</p>
                <p className="text-2xl font-black text-white leading-none">{previewDay ?? "—"}</p>
              </div>
            </div>
            {/* Card body */}
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>{previewTime}</span>
              </div>
              <h3 className="text-sm font-bold text-white leading-snug">{event.title || "AI Workshop Event"}</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
                <div>
                  <p className="text-[9px] text-gray-600 uppercase">Mode</p>
                  <p className="text-[10px] font-semibold text-gray-300">{previewMode}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-600 uppercase">Capacity</p>
                  <p className="text-[10px] font-semibold text-gray-300">{previewCap}</p>
                </div>
              </div>
              <button className="w-full mt-3 bg-[#C7E36B] text-black text-xs font-bold py-2 rounded-lg hover:bg-[#b8d44f] transition-colors">RSVP Now</button>
            </div>
          </div>
          <p className="text-[9px] text-gray-600 mt-3 text-center">This is how your event will appear in the community grid.</p>
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════
     MAIN COMMUNITY PANEL
  ══════════════════════════════════════════ */
  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* ── Tab bar ── */}
      <div className="flex items-center gap-0.5 px-6 pt-4 pb-0 shrink-0 border-b border-white/5">
        {COMM_TABS.map(t => (
          <button key={t} onClick={() => setCommTab(t.toLowerCase())}
            className={`px-5 py-2 text-sm font-semibold rounded-t-lg transition-all ${commTab === t.toLowerCase() ? "bg-[#C7E36B] text-black" : "text-gray-400 hover:text-white"}`}>
            {t}
          </button>
        ))}
      </div>

      {/* ════ FORUM TAB ════ */}
      {commTab === "forum" && (
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h1 className="text-xl font-bold text-white">Forum Management</h1>
                <p className="text-xs text-gray-400 mt-0.5">Monitor community discussions and moderate content.</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setShowAnnForm(v => !v)}
                  className={`border text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all ${showAnnForm ? "border-[#C7E36B]/50 bg-[#C7E36B]/10 text-[#C7E36B]" : "border-white/20 text-gray-300 hover:border-white/40 hover:text-white"}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"/></svg>
                  Broadcast
                </button>
                <button onClick={() => setShowCreateThread(true)}
                  className="bg-[#C7E36B] text-black font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-lime-300 flex items-center gap-2">
                  <I name="plus" size={15}/> Create Thread
                </button>
              </div>
            </div>
            {createSuccess && <div className="mb-4 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-2.5 text-green-400 text-xs font-semibold">✓ Thread published to the community!</div>}
            {annSuccess && <div className="mb-4 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2.5 text-green-400 text-xs font-semibold">✓ Announcement broadcast to all students!</div>}
            {showAnnForm && (
              <div className="mb-5 bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                <p className="text-xs font-bold text-white uppercase tracking-wide">Broadcast Announcement</p>
                <Fld label="Title" value={annTitle} onChange={setAnnTitle} placeholder="e.g. New Resource Available"/>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1">Message</p>
                  <textarea value={annMsg} onChange={e => setAnnMsg(e.target.value)} rows={3} placeholder="Message to send to all students..." className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#C7E36B]/50 resize-none placeholder-gray-600"/>
                </div>
                <div className="flex gap-2">
                  <button onClick={async () => {
                    if (!annTitle.trim()) return;
                    await fetch("/api/notifications/broadcast",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},body:JSON.stringify({title:annTitle,message:annMsg,type:"announcement"})}).catch(()=>{});
                    setShowAnnForm(false); setAnnTitle(""); setAnnMsg(""); setAnnSuccess(true); setTimeout(() => setAnnSuccess(false), 3000);
                  }} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg">Broadcast to All Students</button>
                  <button onClick={() => setShowAnnForm(false)} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg hover:bg-white/5">Cancel</button>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              {["All Categories","All Flairs","Status: Active"].map(f => (
                <button key={f} className="bg-white/5 text-white text-sm px-4 py-2 rounded-full hover:bg-white/10 transition-colors font-medium">
                  {f}
                </button>
              ))}
              <div className="ml-auto text-xs text-gray-500">Sort: <span className="text-white font-semibold">Newest</span></div>
            </div>
            <div className="space-y-3">
              {threadsLoading ? <AdminLoader label="Loading Threads" /> : threads.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-3xl mb-3">💬</p>
                  <p className="text-white font-semibold text-sm">No community threads yet</p>
                  <p className="text-gray-500 text-xs mt-1">Students can start discussions from their dashboard.</p>
                </div>
              ) : threads.map(t => {
                const isReported = t.isReported || (t.reports && t.reports.length > 0);
                const voteCount = typeof t.votes === "number" ? t.votes : (t.upvotes?.length||0)-(t.downvotes?.length||0);
                const initials = (t.author||"?").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
                return (
                  <div key={t._id} className={`border rounded-xl p-4 transition-all ${isReported?"border-red-500/50 bg-red-500/5":"border-white/10 bg-white/5 hover:border-white/20"}`}>
                    <div className="flex gap-3 items-start">
                      <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
                        <button className="text-gray-500 hover:text-[#C7E36B]"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg></button>
                        <span className="text-xs font-bold text-white">{voteCount}</span>
                        <button className="text-gray-500 hover:text-red-400"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg></button>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          {isReported ? <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">REPORTED</span>
                                      : <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#C7E36B]/20 text-[#C7E36B]">{t.tag}</span>}
                          <h3 className="text-sm font-semibold text-white">{t.title}</h3>
                        </div>
                        {isReported ? <p className="text-xs mb-2 text-gray-500 italic">Content hidden pending moderator review...</p>
                                    : <p className="text-xs mb-2 line-clamp-2 text-gray-400">{t.body}</p>}
                        <div className="flex items-center gap-2 text-[10px] text-gray-500">
                          <div className="w-5 h-5 rounded-full bg-[#C7E36B]/20 text-[#C7E36B] text-[8px] font-black flex items-center justify-center shrink-0">{initials}</div>
                          <span className="font-semibold text-gray-400">{t.author}</span>
                          <span>·</span><span>{fmtRelTime(t.createdAt)}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                            {t.replyCount ?? t.replies?.length ?? 0} {(t.replyCount ?? t.replies?.length ?? 0) === 1 ? "reply" : "replies"}
                          </span>
                        </div>
                        {isReported && (
                          <div className="flex items-center gap-1 mt-1 text-[10px] text-red-400">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                            Flagged by {t.reportCount || t.reports?.length || 1} {(t.reportCount || t.reports?.length || 1) === 1 ? "user" : "users"}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {isReported ? (
                          <button className="text-xs bg-red-500 text-white font-bold px-4 py-1.5 rounded-full hover:bg-red-600"
                            onClick={async()=>{
                              try { await fetch(`/api/community/threads/${t._id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},body:JSON.stringify({isReported:false,reports:[],reportCount:0})}); } catch {}
                              setThreads(prev=>prev.map(x=>x._id===t._id?{...x,isReported:false,reports:[],reportCount:0}:x));
                            }}>
                            Resolve
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => setPinnedIds(prev => { const n=new Set(prev); n.has(t._id)?n.delete(t._id):n.add(t._id); return n; })}
                              className={`w-7 h-7 flex items-center justify-center rounded-lg transition-all ${pinnedIds.has(t._id)?"text-[#C7E36B] bg-[#C7E36B]/10":"text-gray-500 hover:text-[#C7E36B] hover:bg-[#C7E36B]/5"}`}
                              title={pinnedIds.has(t._id)?"Unpin":"Pin thread"}>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill={pinnedIds.has(t._id)?"currentColor":"none"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            </button>
                            <button onClick={async()=>{ if(window.confirm("Delete this thread?")){ await fetch(`/api/community/threads/${t._id}`,{method:"DELETE",headers:{Authorization:`Bearer ${token}`}}); setThreads(prev=>prev.filter(x=>x._id!==t._id)); }}} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400"><I name="trash" size={13}/></button>
                            <div className="relative">
                              <button onClick={e=>{e.stopPropagation();setOpenThreadMenu(openThreadMenu===t._id?null:t._id);}} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-500 hover:text-white">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                              </button>
                              {openThreadMenu===t._id && (
                                <div className="absolute right-0 top-8 z-50 bg-[#1A1D1E] border border-white/10 rounded-xl shadow-2xl w-44 py-1 overflow-hidden" onClick={e=>e.stopPropagation()}>
                                  {["Hide Thread","Lock Thread","Move to Category"].map(action => (
                                    <button key={action} onClick={()=>setOpenThreadMenu(null)} className="w-full text-left px-4 py-2.5 text-xs text-gray-300 hover:bg-white/10 hover:text-white transition-all">{action}</button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Moderation Sidebar */}
          <div className="w-[260px] shrink-0 border-l border-white/5 bg-[#0F1112] overflow-y-auto p-4">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Moderation Hub
            </h3>
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Active Reports</p>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${reportedThreads.length>0?"bg-red-500/20 text-red-400":"bg-gray-500/20 text-gray-500"}`}>{reportedThreads.length>0?`${reportedThreads.length} New`:"0"}</span>
              </div>
              {reportedThreads.length===0 ? <p className="text-xs text-gray-500 text-center py-4">No active reports.</p> : (
                <div className="space-y-2">
                  {reportedThreads.slice(0,4).map(t=>{
                    const rType = getReportType(t);
                    const rBadge = REPORT_BADGE[rType] || "bg-yellow-500/20 text-yellow-400";
                    const isSpam = rType === "SPAM";
                    return (
                      <div key={t._id} className="bg-[#0F1112] border border-white/10 rounded-xl p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`text-[9px] font-black px-2 py-0.5 rounded ${rBadge}`}>{rType}</span>
                          <span className="text-[9px] text-gray-600">{fmtRelTime(t.createdAt)}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 line-clamp-2">Reported on: "{(t.title||"").slice(0,35)}{t.title?.length>35?"...":""}"</p>
                        <div className="flex gap-1.5">
                          {isSpam ? (
                            <button onClick={async()=>{ try{await fetch(`/api/users/${t.authorId}/warn`,{method:"POST",headers:{Authorization:`Bearer ${token}`}});}catch{}  setThreads(prev=>prev.map(x=>x._id===t._id?{...x,isReported:false,reports:[]}:x)); }} className="flex-1 text-[10px] bg-orange-500 text-white font-bold py-1.5 rounded-lg hover:bg-orange-600">Warn</button>
                          ) : (
                            <button onClick={async()=>{ try{await fetch(`/api/community/threads/${t._id}`,{method:"DELETE",headers:{Authorization:`Bearer ${token}`}});}catch{} setThreads(prev=>prev.filter(x=>x._id!==t._id)); }} className="flex-1 text-[10px] bg-red-500 text-white font-bold py-1.5 rounded-lg hover:bg-red-600">Ban</button>
                          )}
                          <button onClick={()=>setThreads(prev=>prev.map(x=>x._id===t._id?{...x,isReported:false,reports:[],reportCount:0}:x))} className="flex-1 text-[10px] bg-[#1A1D1E] text-gray-300 font-bold py-1.5 rounded-lg hover:bg-white/10">Dismiss</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="mb-5">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Flagged Keywords</p>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {keywords.map(k=>(
                  <span key={k} className="flex items-center gap-1 text-[10px] bg-white/10 text-gray-400 px-2 py-1 rounded-full">
                    {k}<button onClick={()=>setKeywords(ks=>ks.filter(x=>x!==k))} className="text-gray-600 hover:text-red-400 leading-none">×</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-1">
                <input value={newKw} onChange={e=>setNewKw(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&newKw.trim()){setKeywords(ks=>[...ks,newKw.trim()]);setNewKw("");}}} placeholder="Add keyword..." className="flex-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[11px] text-white outline-none focus:border-[#C7E36B]/50 min-w-0"/>
                <button onClick={()=>{if(newKw.trim()){setKeywords(ks=>[...ks,newKw.trim()]);setNewKw("");}}} className="text-[10px] border border-dashed border-[#C7E36B]/40 text-[#C7E36B] px-2 py-1 rounded-lg">+ Add</button>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Community Pulse</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">New Users</p>
                  <p className="text-lg font-black text-white">+{userCount??"—"}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">Total Posts</p>
                  <p className="text-lg font-black text-white">{threads.length||"—"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════ EVENTS TAB ════ */}
      {commTab === "events" && (
        <div className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Events Management</h1>
              <p className="text-sm text-gray-400 mt-1">Create and moderate community gatherings and workshops.</p>
            </div>
            <button onClick={() => setShowEventForm(true)}
              className="bg-[#C7E36B] text-black font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-[#b8d44f] flex items-center gap-2 transition-all shrink-0">
              Create Event →
            </button>
          </div>
          {eventSuccess && <div className="mb-4 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 text-green-400 text-xs font-semibold">✓ Event created successfully!</div>}
          {/* Search + filters */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input value={eventSearch} onChange={e => setEventSearch(e.target.value)} placeholder="Search events..."
                className="w-full bg-[#111315] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#C7E36B]/40"/>
            </div>
            {["All Types","Status: All"].map(f => (
              <button key={f} className="bg-white/5 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-white/10 transition-colors whitespace-nowrap">{f}</button>
            ))}
          </div>
          {/* Event cards grid */}
          {eventsLoading ? <AdminLoader label="Loading Events"/> : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {(events.filter(e => !eventSearch || e.title?.toLowerCase().includes(eventSearch.toLowerCase()))).map((ev, i) => {
                const bg = ev.bg || ["from-blue-900 to-purple-900","from-emerald-900 to-teal-900","from-orange-900 to-red-900"][i%3];
                const month = ev.month || (ev.date ? new Date(ev.date).toLocaleDateString("en",{month:"short"}).toUpperCase() : "");
                const day   = ev.day   || (ev.date ? new Date(ev.date).getDate() : "");
                const rsvps = ev.rsvps ?? 0;
                const cap   = ev.capacity ?? 50;
                const limitedSeats = !ev.featured && (cap - rsvps) <= Math.ceil(cap * 0.1);
                const fmt24 = t => { if (!t) return ""; const iso = new Date(`1970-01-01T${t}`); if (!isNaN(iso)) return iso.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",hour12:false}); const m = t.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i); if (m) { let h=parseInt(m[1]); const ampm=m[3].toUpperCase(); if(ampm==="PM"&&h!==12)h+=12; if(ampm==="AM"&&h===12)h=0; return `${String(h).padStart(2,"0")}:${m[2]}`; } return t; };
                const timeStr = [fmt24(ev.startTime), fmt24(ev.endTime)].filter(Boolean).join(" - ") + (ev.timezone ? ` [${ev.timezone}]` : "");
                return (
                  <div key={ev._id||i} className="bg-[#111315] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all group">
                    {/* Image area */}
                    <div className={`relative h-[180px] bg-gradient-to-br ${bg} overflow-hidden`}>
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2 text-center min-w-[44px]">
                        <p className="text-[9px] font-bold text-gray-300 uppercase tracking-wider leading-none mb-0.5">{month}</p>
                        <p className="text-2xl font-black text-white leading-none">{day}</p>
                      </div>
                      {ev.featured && (
                        <span className="absolute top-3 right-3 text-[9px] font-black bg-green-500 text-white px-2 py-1 rounded-lg tracking-wider">FEATURED</span>
                      )}
                      {!ev.featured && limitedSeats && (
                        <span className="absolute top-3 right-3 text-[9px] font-black bg-red-600 text-white px-2 py-1 rounded-lg tracking-wider">LIMITED SEATS</span>
                      )}
                      {/* subtle gradient overlay at bottom */}
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#111315] to-transparent"/>
                    </div>
                    {/* Card body */}
                    <div className="p-4">
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-2">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        <span>{timeStr || ev.time || "TBD"}</span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-2 line-clamp-2 leading-snug">{ev.title}</h3>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mb-4">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        <span>{ev.location || ev.mode || "Online"}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">RSVPS</p>
                          <p className="text-sm font-black"><span className="text-[#C7E36B]">{rsvps}</span><span className="text-gray-400"> / {cap}</span></p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/15 text-gray-400 hover:border-white/30 hover:text-white transition-all">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          </button>
                          <button className="bg-[#C7E36B] text-black text-sm font-bold px-4 py-1.5 rounded-lg hover:bg-lime-300 transition-all">Manage</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {events.filter(e => !eventSearch || e.title?.toLowerCase().includes(eventSearch.toLowerCase())).length === 0 && !eventsLoading && (
                <div className="col-span-3 flex flex-col items-center justify-center py-20 text-center">
                  <svg className="w-12 h-12 text-gray-700 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  <p className="text-gray-500 text-sm font-medium">No events yet</p>
                  <p className="text-gray-600 text-xs mt-1">Click "Create Event" to add your first event.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ════ CLUBS TAB ════ */}
      {commTab === "clubs" && (() => {
        /* ── Club Detail View ── */
        if (selectedClub) return (
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6">
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <button onClick={() => setSelectedClub(null)} className="text-xs text-gray-400 hover:text-white border border-white/15 px-3 py-1.5 rounded-lg shrink-0 mt-1">← Back</button>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center text-white font-black text-lg shrink-0">{selectedClub.name?.[0]}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl font-bold text-white">{selectedClub.name}</h1>
                    {selectedClub.isPrimary && <span className="text-[9px] font-black bg-[#C7E36B] text-black px-2 py-0.5 rounded">PRIMARY</span>}
                  </div>
                  <p className="text-sm text-gray-400 mt-0.5">
                    <svg className="inline w-3 h-3 mr-1 -mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {selectedClub.city} · {selectedClub.members?.toLocaleString() || 0} Members · {selectedClub.events || 0} Active Events
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button className="text-sm border border-white/20 text-gray-300 px-4 py-2 rounded-lg hover:bg-white/5 flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    Edit Club
                  </button>
                  <button className="text-sm bg-[#C7E36B] text-black font-semibold px-4 py-2 rounded-lg hover:bg-[#b8d44f] flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    New Post
                  </button>
                </div>
              </div>
              {/* Sub-tabs */}
              <div className="flex gap-0.5 border-b border-white/5 mb-5">
                {["Feed","Collaborations","Events","Members"].map(t => (
                  <button key={t} onClick={() => setClubDetailTab(t.toLowerCase())}
                    className={`px-4 py-2 text-sm font-semibold transition-colors border-b-2 -mb-px ${clubDetailTab===t.toLowerCase()?"border-[#C7E36B] text-white":"border-transparent text-gray-500 hover:text-gray-300"}`}>
                    {t}
                  </button>
                ))}
              </div>
              {/* Feed */}
              {clubDetailTab === "feed" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-bold text-white">Recent Posts</h2>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      Filter:
                      <select className="bg-transparent text-gray-300 outline-none cursor-pointer">
                        <option>All Posts</option><option>Flagged</option><option>Pinned</option>
                      </select>
                    </div>
                  </div>
                  {selectedClub.posts?.length ? selectedClub.posts.map((p, i) => (
                    <div key={i} className={`bg-[#111315] border rounded-xl p-4 mb-3 ${p.reported?"border-red-500/30":"border-white/10"}`}>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">{p.author?.[0]}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-white">{p.author}</span>
                            {p.reported && <span className="text-[9px] font-black bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded">REPORTED</span>}
                            <span className="text-[10px] text-gray-500">{p.time}</span>
                          </div>
                          <p className="text-sm text-gray-300">{p.content}</p>
                          {!p.reported && <div className="flex gap-3 mt-2 text-[10px] text-gray-500"><span>👍 {p.likes}</span><span>💬 {p.comments}</span></div>}
                        </div>
                        {p.reported ? (
                          <div className="flex gap-2 shrink-0">
                            <button className="text-[10px] font-bold text-red-400 border border-red-500/30 px-2.5 py-1 rounded hover:bg-red-500/10">REMOVE</button>
                            <button className="text-[10px] font-bold text-gray-400 border border-white/15 px-2.5 py-1 rounded hover:bg-white/5">DISMISS</button>
                          </div>
                        ) : (
                          <div className="flex gap-1.5 shrink-0">
                            <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-[#C7E36B] transition-colors">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M2 12h20" transform="rotate(45 12 12)"/></svg>
                            </button>
                            <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-red-400 transition-colors">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/></svg>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )) : (
                    <div className="flex flex-col items-center py-12 text-center">
                      <p className="text-gray-500 text-sm">No posts yet in this club.</p>
                    </div>
                  )}
                </div>
              )}
              {clubDetailTab !== "feed" && (
                <div className="flex flex-col items-center py-16 text-center">
                  <p className="text-gray-500 text-sm font-medium capitalize">{clubDetailTab} — coming soon</p>
                </div>
              )}
            </div>
            {/* Sidebar */}
            <div className="w-[260px] shrink-0 border-l border-white/5 bg-[#0F1112] p-5 overflow-y-auto space-y-4">
              <div className="bg-[#111315] border border-white/10 rounded-2xl p-4">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Moderation Summary</p>
                {[["Pending Reports",selectedClub.pendingReports??0],["Flagged Keywords",selectedClub.flaggedKeywords??0],["Banned Users",selectedClub.bannedUsers??0]].map(([k,v]) => (
                  <div key={k} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <span className="text-xs text-gray-400">{k}</span>
                    <span className="text-xs font-bold text-white">{v}</span>
                  </div>
                ))}
                <button className="w-full mt-3 bg-[#C7E36B] text-black text-xs font-bold py-2 rounded-lg hover:bg-[#b8d44f]">Moderation Settings</button>
              </div>
              <div className="bg-[#111315] border border-white/10 rounded-2xl p-4">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Club Health</p>
                {[
                  { label:"Engagement Rate", value: selectedClub.engagementRate??0, color:"#22c55e", suffix:"%" },
                  { label:"Member Growth",   value: selectedClub.memberGrowth??0, color:"#06b6d4", prefix:"+" },
                ].map(s => (
                  <div key={s.label} className="mb-3 last:mb-0">
                    <div className="flex justify-between text-[10px] mb-1.5">
                      <span className="text-gray-400">{s.label}</span>
                      <span className="font-bold text-white">{s.prefix}{s.value}{s.suffix}</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width:`${Math.min(s.value,100)}%`, background:s.color }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

        /* ── Create Club Form ── */
        if (showClubForm) return (
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <button onClick={() => setShowClubForm(false)} className="text-xs text-gray-400 hover:text-white border border-white/15 px-3 py-1.5 rounded-lg">← Back to Clubs</button>
                <div>
                  <h1 className="text-xl font-bold text-white">Create New Club</h1>
                  <p className="text-xs text-gray-400">Configure your city-based creator community.</p>
                </div>
              </div>
              {/* Basic Info */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
                <p className="text-[10px] font-bold text-[#C7E36B] uppercase tracking-wider">Basic Information</p>
                <div className="grid grid-cols-2 gap-3">
                  <Fld label="CLUB NAME" value={clubForm.name} onChange={v => setClubForm({...clubForm,name:v})} placeholder="e.g. Hyderabad Club"/>
                  <Fld label="CITY / REGION" value={clubForm.city} onChange={v => setClubForm({...clubForm,city:v})} placeholder="e.g. Telangana, India"/>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold mb-1">CLUB DESCRIPTION</p>
                  <textarea value={clubForm.description} onChange={e => setClubForm({...clubForm,description:e.target.value})} rows={3} placeholder="Tell the community what this club is about..." className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50 resize-none"/>
                </div>
              </div>
              {/* Club Settings */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
                <p className="text-[10px] font-bold text-[#C7E36B] uppercase tracking-wider">Club Settings</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] text-gray-400 font-semibold mb-1">CLUB TYPE</p>
                    <select value={clubForm.type} onChange={e => setClubForm({...clubForm,type:e.target.value})} className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/50">
                      {["Public (Open to All)","Private","Invite Only"].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <Fld label="MEMBER LIMIT" value={clubForm.memberLimit} onChange={v => setClubForm({...clubForm,memberLimit:v})} placeholder="No Limit"/>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#111315] rounded-xl">
                  <div><p className="text-sm text-white">Mark as Primary Club</p><p className="text-[10px] text-gray-400">Highlight this as the main community for the region.</p></div>
                  <Tog value={clubForm.isPrimary} onChange={v => setClubForm({...clubForm,isPrimary:v})}/>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#111315] rounded-xl">
                  <div><p className="text-sm text-white">Auto-detect City</p><p className="text-[10px] text-gray-400">Suggest this club to users based on their IP location.</p></div>
                  <Tog value={clubForm.autoDetect} onChange={v => setClubForm({...clubForm,autoDetect:v})}/>
                </div>
              </div>
              {/* Media */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <p className="text-[10px] font-bold text-[#C7E36B] uppercase tracking-wider mb-3">Media</p>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/15 rounded-xl h-32 cursor-pointer hover:border-[#C7E36B]/40 transition-colors">
                  <svg className="w-8 h-8 text-gray-600 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  <p className="text-sm text-gray-400">Click to upload banner image</p>
                  <p className="text-[10px] text-gray-600 mt-1">Recommended size: 1200×675px (16:9)</p>
                  <input type="file" accept="image/*" className="hidden"/>
                </label>
              </div>
              {/* Actions */}
              <div className="flex gap-3 pb-4">
                <button onClick={() => setShowClubForm(false)} className="text-sm border border-white/20 text-gray-300 px-5 py-2.5 rounded-lg hover:bg-white/5">Cancel</button>
                <button onClick={() => {
                  if (!clubForm.name.trim()) return;
                  const newClub = { _id:`cl${Date.now()}`, ...clubForm, type: clubForm.type.replace(" (Open to All)",""), members:0, events:0, posts:[] };
                  setClubs(prev => [newClub, ...prev]);
                  setClubForm({ name:"", city:"", description:"", type:"Public", memberLimit:"", isPrimary:false, autoDetect:false });
                  setShowClubForm(false);
                }} className="text-sm bg-[#C7E36B] text-black font-bold px-5 py-2.5 rounded-lg hover:bg-[#b8d44f] flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Create Club
                </button>
              </div>
            </div>
            {/* Live Card Preview */}
            <div className="w-[300px] shrink-0 border-l border-white/5 bg-[#0F1112] p-5 overflow-y-auto">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-4">Live Card Preview</p>
              <div className="bg-[#111315] border border-white/10 rounded-2xl overflow-hidden">
                <div className="h-[150px] bg-gradient-to-br from-blue-900 to-purple-900 relative">
                  {clubForm.isPrimary && <span className="absolute top-3 right-3 text-[9px] font-black bg-[#C7E36B] text-black px-2 py-0.5 rounded">PRIMARY CLUB</span>}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-sm font-bold text-white">{clubForm.name || "Club Name"}</h3>
                    <p className="text-[10px] text-gray-300">{clubForm.city || "City"}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div><p className="text-[9px] text-gray-500 uppercase mb-0.5">Members</p><p className="text-sm font-bold text-white flex items-center gap-1"><svg width="10" height="10" viewBox="0 0 24 24" fill="#C7E36B"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>0</p></div>
                    <div><p className="text-[9px] text-gray-500 uppercase mb-0.5">Events</p><p className="text-sm font-bold text-white flex items-center gap-1"><svg width="10" height="10" viewBox="0 0 24 24" fill="#C7E36B"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6" stroke="#C7E36B" strokeWidth="2"/><line x1="8" y1="2" x2="8" y2="6" stroke="#C7E36B" strokeWidth="2"/></svg>0 Active</p></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400"/>PUBLIC</span>
                    <button className="text-[10px] border border-white/15 text-gray-300 px-3 py-1 rounded-lg">Manage Club</button>
                  </div>
                </div>
              </div>
              <p className="text-[9px] text-gray-600 mt-3 text-center">This preview shows how the club card will appear in the main community directory for students.</p>
            </div>
          </div>
        );

        /* ── Club List View ── */
        return (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white">Clubs Management</h1>
                <p className="text-sm text-gray-400 mt-1">Oversee city-based creator communities and activities.</p>
              </div>
              <button onClick={() => setShowClubForm(true)} className="bg-[#C7E36B] text-black font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-[#b8d44f] flex items-center gap-2 shrink-0">
                <I name="plus" size={15}/> Create Club
              </button>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
              {[
                { label:"TOTAL CLUBS",   value: clubs.length, icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
                { label:"TOTAL MEMBERS", value: clubs.reduce((s,c)=>s+(c.members||0),0), icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                { label:"ACTIVE EVENTS", value: clubs.reduce((s,c)=>s+(c.events||0),0), icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
                { label:"NEW REQUESTS",  value: 0, icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="1.8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> },
              ].map(s => (
                <div key={s.label} className="bg-[#111315] border border-white/10 rounded-2xl p-5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 tracking-widest mb-1.5">{s.label}</p>
                    <p className="text-3xl font-black text-white">{s.value.toLocaleString?.() ?? s.value}</p>
                  </div>
                  <div className="opacity-80">{s.icon}</div>
                </div>
              ))}
            </div>
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {clubs.map((club, i) => {
                const grd = ["from-indigo-900 to-blue-900","from-purple-900 to-pink-900","from-teal-900 to-cyan-900"][i%3];
                const typeCls = club.type==="Private"?"bg-purple-500/20 text-purple-400":club.type==="Invite Only"?"bg-blue-500/20 text-blue-400":"bg-green-500/20 text-green-400";
                return (
                  <div key={club._id||i} className="bg-[#111315] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all cursor-pointer" onClick={() => setSelectedClub(club)}>
                    <div className={`relative h-[170px] bg-gradient-to-br ${grd}`}>
                      {club.isPrimary && <span className="absolute top-3 right-3 text-[9px] font-black bg-[#C7E36B] text-black px-2 py-0.5 rounded">PRIMARY CLUB</span>}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <h3 className="text-base font-bold text-white">{club.name}</h3>
                        <p className="text-xs text-gray-300">{club.city}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                          <p className="text-[9px] font-bold text-gray-500 uppercase mb-0.5 flex items-center gap-1"><svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" className="text-gray-500"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>Members</p>
                          <p className="text-sm font-bold text-white">{club.members?.toLocaleString()||0}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-gray-500 uppercase mb-0.5 flex items-center gap-1"><svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" className="text-gray-500"><rect x="3" y="4" width="18" height="18" rx="2"/></svg>Events</p>
                          <p className="text-sm font-bold text-white">{club.events||0} Active</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${typeCls}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"/>
                          {club.type||"Public"}
                        </span>
                        <button onClick={e => {e.stopPropagation(); setSelectedClub(club);}} className="text-xs border border-white/20 text-gray-300 px-3 py-1.5 rounded-lg hover:bg-white/5">Manage Club</button>
                      </div>
                    </div>
                  </div>
                );
              })}
              {clubs.length === 0 && (
                <div className="col-span-3 flex flex-col items-center justify-center py-20 text-center">
                  <svg className="w-12 h-12 text-gray-700 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                  <p className="text-gray-500 text-sm font-medium">No clubs yet</p>
                  <p className="text-gray-600 text-xs mt-1">Click "+ Create Club" to add the first community.</p>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* ════ CHATS TAB ════ */}
      {commTab === "chats" && (() => {
        /* ── Add Channel Form ── */
        if (showChannelForm) return (
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <button onClick={() => setShowChannelForm(false)} className="text-xs text-gray-400 hover:text-white border border-white/15 px-3 py-1.5 rounded-lg">← Back to Chats</button>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Chats / New Channel</p>
                  <h1 className="text-xl font-bold text-white">Add New Channel</h1>
                </div>
              </div>
              {/* Channel Info */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
                <p className="text-[10px] font-bold text-[#C7E36B] uppercase tracking-wider">Channel Details</p>
                <Fld label="CHANNEL NAME" value={channelForm.name} onChange={v => setChannelForm({...channelForm,name:v})} placeholder="e.g. #filmmakers-hub"/>
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold mb-1">CHANNEL CATEGORY</p>
                  <select value={channelForm.category} onChange={e => setChannelForm({...channelForm,category:e.target.value})} className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/50">
                    {["General","Study Group","Regional","Creative","Support","Announcement"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold mb-1">DESCRIPTION</p>
                  <textarea value={channelForm.description} onChange={e => setChannelForm({...channelForm,description:e.target.value})} rows={2} placeholder="What is this channel for?" className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50 resize-none"/>
                </div>
              </div>
              {/* Channel Settings */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
                <p className="text-[10px] font-bold text-[#C7E36B] uppercase tracking-wider">Channel Settings</p>
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold mb-1">ACCESS TYPE</p>
                  <div className="flex gap-2">
                    {["Public","Private","Admin Only"].map(a => (
                      <button key={a} onClick={() => setChannelForm({...channelForm,access:a})}
                        className={`flex-1 text-sm py-2 rounded-lg border font-medium transition-colors ${channelForm.access===a?"bg-[#C7E36B] text-black border-[#C7E36B]":"border-white/15 text-gray-400 hover:border-white/30"}`}>
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
                <Fld label="INVITE LINK (OPTIONAL)" value={channelForm.inviteLink} onChange={v => setChannelForm({...channelForm,inviteLink:v})} placeholder="https://discord.gg/..."/>
              </div>
              {/* Actions */}
              <div className="flex gap-3 pb-4">
                <button onClick={() => setShowChannelForm(false)} className="text-sm border border-white/20 text-gray-300 px-5 py-2.5 rounded-lg hover:bg-white/5">Cancel</button>
                <button onClick={() => {
                  if (!channelForm.name.trim()) return;
                  const catColors = { General:"bg-blue-500",  "Study Group":"bg-green-500", Regional:"bg-orange-500", Creative:"bg-purple-500", Support:"bg-yellow-500", Announcement:"bg-red-500" };
                  const newCh = { _id:`ch${Date.now()}`, ...channelForm, color: catColors[channelForm.category]||"bg-blue-500", members:0, active:0 };
                  setChannels(prev => [newCh, ...prev]);
                  setChannelForm({ name:"", category:"General", description:"", inviteLink:"", access:"Public" });
                  setShowChannelForm(false);
                }} className="text-sm bg-[#C7E36B] text-black font-bold px-5 py-2.5 rounded-lg hover:bg-[#b8d44f] flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Create Channel
                </button>
              </div>
            </div>
            {/* Live Preview */}
            <div className="w-[300px] shrink-0 border-l border-white/5 bg-[#0F1112] p-5">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-4">Live Card Preview</p>
              {(({ catColors, catIcon }) => {
                const bgs = { General:"from-blue-900 to-blue-800", "Study Group":"from-green-900 to-green-800", Regional:"from-orange-900 to-orange-800", Creative:"from-purple-900 to-purple-800", Support:"from-yellow-900 to-yellow-800", Announcement:"from-red-900 to-red-800" };
                const bg = bgs[channelForm.category]||"from-blue-900 to-blue-800";
                const accCls = { General:"bg-blue-500", "Study Group":"bg-green-500", Regional:"bg-orange-500", Creative:"bg-purple-500", Support:"bg-yellow-500", Announcement:"bg-red-500" }[channelForm.category]||"bg-blue-500";
                const accTxt = { General:"text-blue-400", "Study Group":"text-green-400", Regional:"text-orange-400", Creative:"text-purple-400", Support:"text-yellow-400", Announcement:"text-red-400" }[channelForm.category]||"text-blue-400";
                return (
                  <div className="bg-[#111315] border border-white/10 rounded-2xl overflow-hidden">
                    <div className={`flex items-center gap-3 p-4 bg-gradient-to-r ${bg} border-b border-white/5`}>
                      <div className={`w-10 h-10 rounded-xl ${accCls} flex items-center justify-center`}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white">{channelForm.name || "# channel-name"}</p>
                        <p className={`text-[9px] font-bold ${accTxt}`}>{channelForm.category}</p>
                      </div>
                      <span className={`text-[9px] font-black ${channelForm.access==="Public"?"bg-green-500/20 text-green-400":channelForm.access==="Admin Only"?"bg-red-500/20 text-red-400":"bg-gray-500/20 text-gray-400"} px-2 py-0.5 rounded-full`}>{channelForm.access}</span>
                    </div>
                    <div className="p-4 space-y-2">
                      {channelForm.description && <p className="text-xs text-gray-300">{channelForm.description}</p>}
                      <div className="flex items-center justify-between text-[10px] text-gray-500">
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400"/>0 active</span>
                        <span>0 members</span>
                      </div>
                      {channelForm.inviteLink && (
                        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2 mt-2">
                          <span className="text-[9px] text-gray-400 flex-1 truncate">{channelForm.inviteLink}</span>
                          <button className="text-[9px] text-[#C7E36B] font-bold shrink-0">Copy</button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })({})}
              <p className="text-[9px] text-gray-600 mt-3 text-center">Preview updates as you fill in the form above.</p>
            </div>
          </div>
        );

        /* ── Channel List View ── */
        const catColors = { General:"bg-blue-500", "Study Group":"bg-green-500", Regional:"bg-orange-500", Creative:"bg-purple-500", Support:"bg-yellow-500", Announcement:"bg-red-500" };
        const catTextColors = { General:"text-blue-400", "Study Group":"text-green-400", Regional:"text-orange-400", Creative:"text-purple-400", Support:"text-yellow-400", Announcement:"text-red-400" };
        const totalActive = channels.reduce((s,c) => s+(c.active||0), 0);
        const totalMembers = channels.reduce((s,c) => s+(c.members||0), 0);

        return (
          <div className="flex-1 overflow-y-auto p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <h1 className="text-2xl font-bold text-white">Community Chats</h1>
                <p className="text-sm text-gray-400 mt-1">Monitor and manage all community channels.</p>
              </div>
              <button onClick={() => setShowChannelForm(true)} className="bg-[#C7E36B] text-black font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-[#b8d44f] flex items-center gap-2 shrink-0">
                <I name="plus" size={15}/> Add New Channel
              </button>
            </div>
            {/* Discord Redirection Policy Banner */}
            <div className="bg-[#111315] border border-[#5865F2]/30 rounded-2xl p-4 mb-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#5865F2] flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028z"/></svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-bold text-white">Discord Redirection Policy</p>
                  <span className="text-[9px] font-black bg-[#5865F2]/20 text-[#5865F2] px-2 py-0.5 rounded">ACTIVE</span>
                </div>
                <p className="text-xs text-gray-400">Students are redirected to Discord channels for live community interaction. Channels shown below are linked to Discord or managed natively.</p>
              </div>
              <button className="text-xs border border-[#5865F2]/40 text-[#5865F2] px-3 py-1.5 rounded-lg hover:bg-[#5865F2]/10 shrink-0">Manage Policy</button>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-5">
              {[
                { label:"TOTAL CHANNELS", value: channels.length, color:"#C7E36B" },
                { label:"ACTIVE NOW",     value: totalActive,     color:"#22c55e" },
                { label:"TOTAL MEMBERS",  value: totalMembers,    color:"#60a5fa" },
              ].map(s => (
                <div key={s.label} className="bg-[#111315] border border-white/10 rounded-2xl p-5 text-center">
                  <p className="text-3xl font-black" style={{color:s.color}}>{s.value.toLocaleString?.()??s.value}</p>
                  <p className="text-[10px] font-bold text-gray-500 tracking-widest mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            {/* Channel cards */}
            <div className="space-y-3">
              {channels.map((ch, i) => {
                const accCls = ch.access==="Public"?"bg-green-500/20 text-green-400":ch.access==="Admin Only"?"bg-red-500/20 text-red-400":"bg-gray-500/20 text-gray-400";
                const iconBg = catColors[ch.category]||"bg-blue-500";
                const txtCol = catTextColors[ch.category]||"text-blue-400";
                return (
                  <div key={ch._id||i} className="bg-[#111315] border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:border-white/20 transition-all">
                    <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <p className="text-sm font-bold text-white">{ch.name}</p>
                        <span className={`text-[9px] font-bold ${txtCol}`}>{ch.category}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${accCls}`}>{ch.access}</span>
                      </div>
                      {ch.description && <p className="text-xs text-gray-500 truncate">{ch.description}</p>}
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-[10px] text-gray-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400"/>{ch.active||0} active</span>
                        <span className="text-[10px] text-gray-500">{ch.members||0} members</span>
                      </div>
                    </div>
                    {ch.inviteLink && (
                      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 max-w-[180px] shrink-0">
                        <span className="text-[9px] text-gray-400 flex-1 truncate">{ch.inviteLink}</span>
                        <button onClick={() => navigator.clipboard?.writeText(ch.inviteLink)} className="text-[9px] font-bold text-[#C7E36B] hover:underline shrink-0">Copy</button>
                      </div>
                    )}
                    <div className="flex items-center gap-2 shrink-0">
                      <button className="text-xs border border-white/15 text-gray-400 px-3 py-1.5 rounded-lg hover:bg-white/5">Edit</button>
                      <button onClick={() => setChannels(prev => prev.filter(c => c._id!==ch._id))} className="text-xs border border-red-500/20 text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-500/10">Delete</button>
                    </div>
                  </div>
                );
              })}
              {channels.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <svg className="w-12 h-12 text-gray-700 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
                  <p className="text-gray-500 text-sm font-medium">No channels yet</p>
                  <p className="text-gray-600 text-xs mt-1">Click "Add New Channel" to create the first community channel.</p>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* ════ AWARDS TAB ════ */}
      {commTab === "awards" && (() => {
        const resetChallengeForm = () => {
          setChallenge({ title:"", desc:"", startDate:"", endDate:"", visibility:"Public" });
          setChallengeThumb(null);
          setChallengeSubTypes(["Video"]);
          setChallengeAwards([{ type:"Cash Reward", description:"" }]);
        };

        /* ── Published Challenge Detail View ── */
        if (selectedChallenge) {
          const topAward = selectedChallenge.awards?.[0];
          return (
            <div className="flex flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6">
                {/* Breadcrumb + header */}
                <p className="text-[11px] text-gray-500 mb-3">Community &rsaquo; Challenges &rsaquo; {selectedChallenge.title}</p>
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <button onClick={() => { setSelectedChallenge(null); setChallengePublishedOk(false); }} className="text-xs text-gray-400 hover:text-white border border-white/15 px-3 py-1.5 rounded-lg">← Back</button>
                      <h1 className="text-2xl font-bold text-white">Published Challenge</h1>
                    </div>
                    <p className="text-sm text-gray-400">Manage and monitor your live challenge.</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button className="text-sm border border-white/20 text-gray-300 px-4 py-2 rounded-lg hover:bg-white/5 flex items-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      View Live Page
                    </button>
                    <button className="text-sm bg-[#C7E36B] text-black font-semibold px-4 py-2 rounded-lg hover:bg-[#b8d44f] flex items-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                      Share Challenge Link
                    </button>
                  </div>
                </div>

                {/* Success banner */}
                {challengePublishedOk && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4 flex items-start gap-3 mb-5">
                    <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white">Challenge Published Successfully</p>
                      <p className="text-xs text-gray-400 mt-0.5">Your challenge is now live and visible to all members.</p>
                    </div>
                    <button onClick={() => setChallengePublishedOk(false)} className="text-gray-500 hover:text-white">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>
                )}

                {/* Challenge card */}
                <div className="bg-[#111315] border border-white/10 rounded-2xl overflow-hidden mb-5">
                  <div className="flex gap-0 flex-col md:flex-row">
                    <div className="w-full md:w-[220px] h-[160px] shrink-0 bg-gradient-to-br from-purple-900 to-indigo-900 overflow-hidden">
                      {selectedChallenge.thumb
                        ? <img src={selectedChallenge.thumb} alt="" className="w-full h-full object-cover"/>
                        : <div className="w-full h-full flex items-center justify-center opacity-20"><svg width="60" height="60" viewBox="0 0 24 24" fill="white"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>}
                    </div>
                    <div className="flex-1 p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-black bg-green-500/20 text-green-400 px-2.5 py-0.5 rounded-full flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400"/>Published</span>
                        <span className="text-[10px] font-black bg-[#C7E36B]/10 text-[#C7E36B] px-2.5 py-0.5 rounded-full">Live</span>
                      </div>
                      <h2 className="text-lg font-bold text-white mb-1">{selectedChallenge.title}</h2>
                      <p className="text-sm text-gray-400 line-clamp-2">{selectedChallenge.desc}</p>
                      <div className="grid grid-cols-4 gap-3 mt-4">
                        {[
                          { label:"SUBMISSION TYPE", value: selectedChallenge.submissionTypes?.[0]||"Video", icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg> },
                          { label:"DEADLINE",        value: selectedChallenge.endDate||"—", icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
                          { label:"PARTICIPANTS",    value: "0 Joined", icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg> },
                          { label:"TOP PRIZE",       value: topAward?.description||"—", icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg> },
                        ].map(s => (
                          <div key={s.label} className="bg-[#0B0F10] rounded-xl p-3 flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-gray-500">{s.icon}<p className="text-[9px] font-bold uppercase tracking-wider">{s.label}</p></div>
                            <p className="text-sm font-bold text-white">{s.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submissions */}
                <div className="bg-[#111315] border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white">Submissions <span className="text-gray-500 font-normal">0</span></h3>
                    <button className="text-xs text-[#C7E36B] hover:underline font-semibold">View All Submissions →</button>
                  </div>
                  <div className="flex flex-col items-center py-10 text-center">
                    <svg className="w-10 h-10 text-gray-700 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                    <p className="text-gray-500 text-sm">No submissions yet</p>
                    <p className="text-gray-600 text-xs mt-1">Submissions will appear here once members start participating.</p>
                  </div>
                </div>
              </div>

              {/* Right sidebar */}
              <div className="w-[260px] shrink-0 border-l border-white/5 bg-[#0F1112] p-5 overflow-y-auto space-y-4">
                {/* Manage Challenge */}
                <div className="bg-[#111315] border border-white/10 rounded-2xl overflow-hidden">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider p-4 pb-2">Manage Challenge</p>
                  {[
                    { label:"Edit Challenge",      icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>, danger:false },
                    { label:"Preview Live Page",   icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>, danger:false },
                    { label:"Copy Challenge Link", icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>, danger:false },
                    { label:"Pause Challenge",     icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>, danger:false },
                    { label:"Close Challenge",     icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>, danger:true },
                  ].map(a => (
                    <button key={a.label} className={`w-full flex items-center justify-between px-4 py-3 border-t border-white/5 hover:bg-white/5 transition-colors text-sm ${a.danger?"text-red-400":"text-gray-300"}`}>
                      <span className="flex items-center gap-2">{a.icon}{a.label}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  ))}
                </div>
                {/* Challenge Summary */}
                <div className="bg-[#111315] border border-white/10 rounded-2xl p-4">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Challenge Summary</p>
                  {[
                    { label:"Deadline",        value: selectedChallenge.endDate||"—", icon:<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/></svg> },
                    { label:"Submission Type", value: selectedChallenge.submissionTypes?.join(", ")||"—", icon:<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2"/></svg> },
                    { label:"Visibility",      value: selectedChallenge.visibility||"Public", icon:<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
                  ].map(r => (
                    <div key={r.label} className="flex items-start gap-2 py-2 border-b border-white/5 last:border-0">
                      <span className="text-gray-500 mt-0.5">{r.icon}</span>
                      <div className="flex-1 flex justify-between items-start gap-2">
                        <span className="text-xs text-gray-400">{r.label}</span>
                        <span className="text-xs font-semibold text-white text-right">{r.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Reward Summary */}
                {selectedChallenge.awards?.length > 0 && (
                  <div className="bg-[#111315] border border-white/10 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Reward Summary</p>
                    </div>
                    {selectedChallenge.awards.map((aw, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                        <span className="text-xs text-gray-400">{i===0?"1st":i===1?"2nd":"3rd"} Place Winner</span>
                        <span className="text-xs font-bold text-white text-right">{aw.description||"—"}</span>
                      </div>
                    ))}
                    <button className="w-full mt-3 border border-white/15 text-gray-300 text-xs font-semibold py-2 rounded-lg hover:bg-white/5">View All Details</button>
                  </div>
                )}
                {/* Need help */}
                <div className="bg-[#111315] border border-white/10 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Need help?</p>
                  </div>
                  <p className="text-xs text-gray-400">Check our guides or contact the AIFA support team for assistance.</p>
                </div>
              </div>
            </div>
          );
        }

        /* ── Create Challenge Form ── */
        if (showChallengeForm) {
          const subTypeIcons = {
            Video: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>,
            Image: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
            Text:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>,
          };
          const isSelected = t => challengeSubTypes.includes(t);
          const toggleSubType = t => setChallengeSubTypes(prev => prev.includes(t) ? prev.filter(x=>x!==t) : [...prev, t]);
          const previewDeadline = challenge.endDate || "--/--/----";
          const previewTitle = challenge.title || "AI Cinematic Trailer Challenge";
          const previewDesc = challenge.desc || "Briefly explain what this challenge is about...";

          return (
            <div className="flex flex-1 overflow-hidden">
              {/* Left form */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <button onClick={() => setShowChallengeForm(false)} className="text-xs text-gray-400 hover:text-white border border-white/15 px-3 py-1.5 rounded-lg shrink-0">← Back to Challenges</button>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Create</p>
                    <p className="text-[10px] text-gray-600">Setup rules</p>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#C7E36B] flex items-center justify-center shrink-0">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="black"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                    </div>
                    <p className="text-sm font-bold text-white">Basic Information</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-semibold mb-1">CHALLENGE TITLE</p>
                    <input value={challenge.title} onChange={e => setChallenge({...challenge,title:e.target.value})} placeholder="e.g. AI Cinematic Trailer Challenge" className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50"/>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-semibold mb-1">THUMBNAIL UPLOAD</p>
                    <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer transition-colors h-40 overflow-hidden ${challengeThumb?"border-[#C7E36B]/40":"border-white/15 hover:border-[#C7E36B]/40"}`}>
                      {challengeThumb ? (
                        <img src={challengeThumb} alt="" className="w-full h-full object-cover"/>
                      ) : (
                        <div className="text-center p-4">
                          <svg className="w-8 h-8 text-gray-600 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/><line x1="12" y1="5" x2="12" y2="8"/><line x1="10.5" y1="6.5" x2="13.5" y2="6.5"/></svg>
                          <p className="text-sm text-gray-400">Drop your image here or <span className="text-[#C7E36B] underline">browse</span></p>
                          <p className="text-[10px] text-gray-600 mt-1">RECOMMENDED: 1280 X 720 (16:9)</p>
                        </div>
                      )}
                      <input type="file" accept="image/*" className="hidden" onChange={e => {
                        const f = e.target.files?.[0];
                        if (f) { const r = new FileReader(); r.onload = ev => setChallengeThumb(ev.target.result); r.readAsDataURL(f); }
                      }}/>
                    </label>
                    {challengeThumb && <button onClick={() => setChallengeThumb(null)} className="mt-1 text-[10px] text-red-400 hover:text-red-300">✕ Remove image</button>}
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-semibold mb-1">DESCRIPTION</p>
                    <textarea value={challenge.desc} onChange={e => setChallenge({...challenge,desc:e.target.value})} rows={3} placeholder="Briefly explain what this challenge is about..." className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50 resize-none"/>
                  </div>
                </div>

                {/* Timeline & Submission */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center shrink-0">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>
                    </div>
                    <p className="text-sm font-bold text-white">Timeline &amp; Submission</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Fld label="START DATE" value={challenge.startDate} onChange={v => setChallenge({...challenge,startDate:v})} placeholder="mm/dd/yyyy"/>
                    <Fld label="END DATE (DEADLINE)" value={challenge.endDate} onChange={v => setChallenge({...challenge,endDate:v})} placeholder="mm/dd/yyyy"/>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-semibold mb-2">ALLOWED SUBMISSION TYPES</p>
                    <div className="flex gap-2">
                      {["Video","Image","Text"].map(t => (
                        <button key={t} onClick={() => toggleSubType(t)}
                          className={`flex-1 flex items-center justify-between px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${isSelected(t)?"bg-[#C7E36B]/10 border-[#C7E36B] text-[#C7E36B]":"border-white/15 text-gray-400 hover:border-white/30"}`}>
                          <span className="flex items-center gap-2">{subTypeIcons[t]}{t}</span>
                          {isSelected(t) && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Awards & Prizes */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center shrink-0">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    </div>
                    <p className="text-sm font-bold text-white">Awards &amp; Prizes</p>
                  </div>
                  {challengeAwards.map((aw, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#C7E36B] flex items-center justify-center text-black text-[10px] font-black shrink-0">{i+1}</div>
                        <p className="text-xs font-semibold text-white">{i===0?"First":i===1?"Second":"Third"} Place Winner</p>
                        <button onClick={() => setChallengeAwards(prev => prev.filter((_,j)=>j!==i))} className="ml-auto text-[10px] text-red-400 hover:text-red-300 font-semibold">REMOVE</button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 ml-8">
                        <div>
                          <select value={aw.type} onChange={e => setChallengeAwards(prev => prev.map((a,j) => j===i ? {...a,type:e.target.value} : a))}
                            className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/50">
                            {["Cash Reward","Amazon Voucher","Certificate","Merchandise","Mentorship","Other"].map(t => <option key={t}>{t}</option>)}
                          </select>
                        </div>
                        <input value={aw.description} onChange={e => setChallengeAwards(prev => prev.map((a,j) => j===i ? {...a,description:e.target.value} : a))}
                          placeholder="e.g. $500 Amazon Voucher" className="bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50"/>
                      </div>
                    </div>
                  ))}
                  {challengeAwards.length < 3 && (
                    <button onClick={() => setChallengeAwards(prev => [...prev, { type:"Cash Reward", description:"" }])} className="w-full py-2.5 border border-dashed border-white/15 rounded-xl text-sm text-gray-500 hover:border-[#C7E36B]/40 hover:text-[#C7E36B] transition-colors">
                      + Add Ranking Award
                    </button>
                  )}
                </div>

                <div className="pb-4"/>
              </div>

              {/* Right preview */}
              <div className="w-[320px] shrink-0 border-l border-white/5 bg-[#0F1112] p-5 overflow-y-auto flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Live Card Preview</p>
                  <span className="flex items-center gap-1 text-[9px] font-bold text-green-400"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>SYNCING</span>
                </div>
                {/* Preview card */}
                <div className="bg-[#111315] border border-white/10 rounded-2xl overflow-hidden mb-4">
                  <div className="relative h-[160px] bg-gradient-to-br from-purple-900 to-indigo-900 overflow-hidden">
                    {challengeThumb ? (
                      <img src={challengeThumb} alt="" className="w-full h-full object-cover"/>
                    ) : (
                      <div className="flex items-center justify-center h-full opacity-20">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className="text-[8px] font-black bg-[#C7E36B] text-black px-2 py-0.5 rounded tracking-wider">LIVE NOW</span>
                      {challengeSubTypes[0] && <span className="text-[8px] font-bold bg-black/60 text-gray-200 px-2 py-0.5 rounded tracking-wider">{challengeSubTypes[0].toUpperCase()}</span>}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-white mb-1 line-clamp-2">{previewTitle}</h3>
                    <p className="text-[11px] text-gray-500 line-clamp-2 mb-3">{previewDesc}</p>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <p className="text-[8px] text-gray-500 uppercase mb-0.5">DEADLINE</p>
                        <p className="text-xs font-semibold text-white">{previewDeadline}</p>
                      </div>
                      <div>
                        <p className="text-[8px] text-gray-500 uppercase mb-0.5">PARTICIPANTS</p>
                        <p className="text-xs font-semibold text-white">0 Joined</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-1.5">
                        {[["#6366f1"],["#10b981"],["#f59e0b"]].map(([bg],j) => (
                          <div key={j} className="w-6 h-6 rounded-full border-2 border-[#111315]" style={{background:bg}}/>
                        ))}
                      </div>
                      <span className="text-xs text-[#C7E36B] font-bold">Manage →</span>
                    </div>
                  </div>
                </div>
                {/* Pro tip */}
                <div className="bg-[#C7E36B]/5 border border-[#C7E36B]/20 rounded-xl p-4 mb-4">
                  <p className="flex items-center gap-1.5 text-[10px] font-black text-[#C7E36B] mb-1.5">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="#C7E36B"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    PRO TIP
                  </p>
                  <p className="text-[11px] text-gray-300">Featured challenges get 3.5x more engagement. Toggle the "Featured" flag in the settings tab.</p>
                </div>
                {/* Action buttons */}
                <div className="flex gap-2 mt-auto">
                  <button onClick={() => {
                    if (!challenge.title.trim()) return;
                    const newC = { _id:`c${Date.now()}`, ...challenge, status:"draft", submissionTypes:challengeSubTypes, awards:challengeAwards, thumb:challengeThumb, participants:0 };
                    setChallenges(prev => [newC, ...prev]);
                    resetChallengeForm(); setShowChallengeForm(false);
                  }} className="flex-1 text-sm border border-white/20 text-gray-300 py-2.5 rounded-lg hover:bg-white/5 font-medium">Save Draft</button>
                  <button onClick={() => {
                    if (!challenge.title.trim()) return;
                    const newC = { _id:`c${Date.now()}`, ...challenge, status:"live", submissionTypes:challengeSubTypes, awards:challengeAwards, thumb:challengeThumb, participants:0 };
                    setChallenges(prev => [newC, ...prev]);
                    resetChallengeForm(); setShowChallengeForm(false);
                    setSelectedChallenge(newC); setChallengePublishedOk(true);
                  }} className="flex-1 text-sm bg-[#C7E36B] text-black font-bold py-2.5 rounded-lg hover:bg-[#b8d44f]">Publish Challenge</button>
                </div>
              </div>
            </div>
          );
        }

        /* ── Challenge List View ── */
        const activeChallenges = challenges.filter(c => c.status !== "completed" && c.status !== "draft");
        const completedChallenges = challenges.filter(c => c.status === "completed");
        const filteredList = challengeFilter === "Active" ? challenges.filter(c => c.status !== "completed") : completedChallenges;

        return (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white">Challenges &amp; Awards</h1>
                <p className="text-sm text-gray-400 mt-1">Create, manage, and reward community excellence.</p>
              </div>
              <button onClick={() => setShowChallengeForm(true)} className="bg-[#C7E36B] text-black font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-[#b8d44f] flex items-center gap-2 shrink-0">
                <I name="plus" size={15}/> Create Challenge
              </button>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-7">
              {[
                { label:"ACTIVE CHALLENGES", value: activeChallenges.length, icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="#f97316"><path d="M13.5 0.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5 0.67z"/></svg> },
                { label:"TOTAL SUBMISSIONS", value: challenges.reduce((s,c)=>s+(c.submissions||0),0), icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="#C7E36B"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg> },
                { label:"AWARDS ISSUED",    value: challenges.filter(c=>c.awardsAssigned).length, icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="#a855f7"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> },
                { label:"PENDING REVIEW",   value: challenges.reduce((s,c)=>s+(c.pendingReview||0),0), icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="#6366f1"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm1-8h4v2h-6V7h2v5z"/></svg> },
              ].map(s => (
                <div key={s.label} className="bg-[#111315] border border-white/10 rounded-2xl p-5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 tracking-widest mb-1.5">{s.label}</p>
                    <p className="text-3xl font-black text-white">{s.value}</p>
                  </div>
                  <div className="opacity-80">{s.icon}</div>
                </div>
              ))}
            </div>
            {/* Filter + list */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-white">Recent Challenges</h2>
              <div className="flex gap-1 bg-white/5 rounded-xl p-1">
                {["Active","Completed"].map(f => (
                  <button key={f} onClick={() => setChallengeFilter(f)}
                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${challengeFilter===f?"bg-white text-[#0F1112]":"text-gray-400 hover:text-white"}`}>{f}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredList.map((c, i) => {
                const bgs = ["from-purple-900 to-indigo-900","from-teal-900 to-cyan-900","from-orange-900 to-red-900"];
                const bg = c.bg || bgs[i%3];
                const statusBadge = c.status==="live" ? { label:"LIVE NOW", cls:"bg-[#C7E36B] text-black" } : c.status==="draft" ? { label:"DRAFT", cls:"bg-gray-600 text-gray-300" } : { label:"COMPLETED", cls:"bg-gray-700 text-gray-300" };
                return (
                  <div key={c._id||i} className="bg-[#111315] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all cursor-pointer" onClick={() => setSelectedChallenge(c)}>
                    <div className={`relative h-[180px] bg-gradient-to-br ${bg} overflow-hidden`}>
                      {c.thumb ? (
                        <img src={c.thumb} alt="" className="w-full h-full object-cover"/>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                          <svg width="80" height="80" viewBox="0 0 24 24" fill="white"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        </div>
                      )}
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg tracking-wider ${statusBadge.cls}`}>{statusBadge.label}</span>
                        {c.submissionTypes?.[0] && <span className="text-[9px] font-bold bg-black/50 text-gray-300 px-2.5 py-1 rounded-lg tracking-wider">{c.submissionTypes[0].toUpperCase()}</span>}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-bold text-white mb-1.5 line-clamp-1">{c.title}</h3>
                      <p className="text-xs text-gray-400 line-clamp-2 mb-4 leading-relaxed">{c.desc}</p>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">{c.status==="completed"?"ENDED":"DEADLINE"}</p>
                          <p className="text-sm font-semibold text-white">{c.endDate||c.ended||"—"}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">PARTICIPANTS</p>
                          <p className="text-sm font-semibold text-white">{(c.participants||0).toLocaleString()} Joined</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {c.awards?.[0]?.description ? `🏆 ${c.awards[0].description}` : "No prize set"}
                        </span>
                        <button onClick={e=>{e.stopPropagation();setSelectedChallenge(c);}} className="text-sm text-[#C7E36B] font-bold hover:underline">Manage →</button>
                      </div>
                    </div>
                  </div>
                );
              })}
              {filteredList.length === 0 && (
                <div className="col-span-3 flex flex-col items-center justify-center py-20 text-center">
                  <svg className="w-12 h-12 text-gray-700 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <p className="text-gray-500 text-sm font-medium">No challenges yet</p>
                  <p className="text-gray-600 text-xs mt-1">Click "Create Challenge" to launch your first community challenge.</p>
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
}

/* ── SERVICE REQUEST ADMIN ── */
const SR_PRIORITY_BADGE = {
  High:   "bg-orange-500 text-white",
  Medium: "bg-yellow-500 text-black",
  Urgent: "bg-red-500 text-white",
  Low:    "bg-green-600 text-white",
};
const SR_STATUS_BADGE = {
  New:              "bg-blue-600 text-white",
  "In Progress":    "bg-purple-600 text-white",
  "Waiting for User":"bg-orange-500 text-white",
  Open:             "bg-[#1A1D1E] text-green-400 border border-green-500/40",
  Resolved:         "bg-green-600 text-white",
  Closed:           "bg-gray-700 text-gray-300",
};
const SR_REQUEST_TYPES = ["Workshop Support","Certificate Issue","Payment Issue","Course Access","Technical Issue","General Inquiry","Refund Request"];
const SR_AGENTS = ["Priya Sharma","Rahul","Anika","Support Team","Ravi","Alex"];

function ServiceRequestAdmin({ token }) {
  const BLANK_FORM = { name:"", email:"", phone:"", requestType:"", subject:"", priority:"Medium", description:"", assignTo:"", status:"New" };

  const [requests, setRequests]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [tabFilter, setTabFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilterV, setStatusFilterV]   = useState("All");
  const [search, setSearch]       = useState("");
  const [page, setPage]           = useState(1);
  const [contextMenu, setContextMenu] = useState(null); // { id, x, y }
  const [showCreate, setShowCreate]   = useState(false);
  const [ticketCreated, setTicketCreated] = useState(null); // the created ticket
  const [form, setForm]           = useState(BLANK_FORM);
  const [saving, setSaving]       = useState(false);
  const [attachFile, setAttachFile] = useState(null);
  const PER = 5;

  useEffect(() => {
    fetch("/api/service-requests", { headers:{ Authorization:`Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setRequests(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [token]);

  useEffect(() => { setPage(1); }, [tabFilter, typeFilter, priorityFilter, statusFilterV, search]);

  /* Close context menu on outside click */
  useEffect(() => {
    if (!contextMenu) return;
    const close = () => setContextMenu(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [contextMenu]);

  const getRequestType = r => r.requestType || r.service || "General Inquiry";
  const getPriority    = r => r.priority || "Medium";
  const getStatus      = r => r.status    || "New";
  const getSubject     = r => r.subject   || r.message?.slice(0, 60) || "—";
  const getAssigned    = r => r.assignedTo || r.assignTo || "Unassigned";
  const fmtCreated     = r => {
    if (!r.createdAt) return "—";
    const d = new Date(r.createdAt), now = new Date();
    const diffH = Math.floor((now-d)/3600000);
    if (diffH < 1) return "Just now";
    if (diffH < 24) return `${diffH}h ago`;
    if (diffH < 48) return "Yesterday";
    return d.toLocaleDateString("en",{month:"short",day:"2-digit",year:"numeric"});
  };

  const filtered = requests.filter(r => {
    const q = search.toLowerCase();
    const matchQ = !q || r.name?.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q) || getSubject(r).toLowerCase().includes(q);
    const st = getStatus(r).toLowerCase().replace(" ","-");
    const matchTab = tabFilter === "all"
      || (tabFilter === "new" && st === "new")
      || (tabFilter === "in-progress" && st === "in-progress")
      || (tabFilter === "resolved" && (st === "resolved" || st === "closed"))
      || (tabFilter === "urgent" && getPriority(r) === "Urgent");
    const matchType = typeFilter === "All" || getRequestType(r) === typeFilter;
    const matchPri  = priorityFilter === "All" || getPriority(r) === priorityFilter;
    const matchSt   = statusFilterV === "All" || getStatus(r) === statusFilterV;
    return matchQ && matchTab && matchType && matchPri && matchSt;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER));
  const pageSafe   = Math.min(page, totalPages);
  const pageItems  = filtered.slice((pageSafe-1)*PER, pageSafe*PER);

  const counts = {
    all:         requests.length,
    new:         requests.filter(r => getStatus(r).toLowerCase() === "new").length,
    inProgress:  requests.filter(r => getStatus(r).toLowerCase() === "in progress" || getStatus(r).toLowerCase() === "in-progress").length,
    resolved:    requests.filter(r => ["resolved","closed"].includes(getStatus(r).toLowerCase())).length,
    urgent:      requests.filter(r => getPriority(r) === "Urgent").length,
  };

  const avgResponseTime = "2h 18m";
  const priorityQueue   = requests.filter(r => getPriority(r) === "Urgent" || getPriority(r) === "High").slice(0, 3);

  const patchRequest = async (id, patch) => {
    try {
      const res = await fetch(`/api/service-requests/${id}`, { method:"PUT", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}, body:JSON.stringify(patch) });
      if (res.ok) { const data = await res.json(); setRequests(rs => rs.map(r => r._id===id ? {...r,...data} : r)); }
      else { setRequests(rs => rs.map(r => r._id===id ? {...r,...patch} : r)); }
    } catch { setRequests(rs => rs.map(r => r._id===id ? {...r,...patch} : r)); }
  };

  const handleContextAction = (action, req) => {
    setContextMenu(null);
    if (action === "assign")    patchRequest(req._id, { assignedTo: "Ravi" });
    if (action === "follow")    patchRequest(req._id, { status: "In Progress" });
    if (action === "converted") patchRequest(req._id, { status: "Resolved" });
    if (action === "lost")      patchRequest(req._id, { status: "Closed" });
  };

  const handleCreate = async () => {
    if (!form.name || !form.email || !form.subject) return;
    setSaving(true);
    const ticketNum = `SR-${new Date().getFullYear()}-${String(Math.floor(1000+Math.random()*9000))}`;
    const payload = { ...form, ticketId: ticketNum, createdAt: new Date().toISOString() };
    try {
      const res = await fetch("/api/service-requests", { method:"POST", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}, body:JSON.stringify(payload) });
      const data = res.ok ? await res.json() : { ...payload, _id: `tmp_${Date.now()}` };
      setRequests(rs => [data, ...rs]);
      setTicketCreated({ ...data, ticketId: data.ticketId || ticketNum });
    } catch {
      const data = { ...payload, _id:`tmp_${Date.now()}` };
      setRequests(rs => [data, ...rs]);
      setTicketCreated(data);
    }
    setShowCreate(false); setForm(BLANK_FORM); setSaving(false);
  };

  const initials = name => (name||"?").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();

  /* ── CREATE TICKET FORM VIEW ── */
  if (showCreate) {
    const f = form;
    return (
      <div className="flex h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {/* Top bar */}
          <div className="flex items-start justify-between px-8 py-5 border-b border-white/10">
            <div>
              <h1 className="text-2xl font-bold text-white">Create Internal Ticket</h1>
              <p className="text-sm text-gray-400 mt-0.5">Manually create a support request on behalf of a learner.</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button onClick={() => setShowCreate(false)} className="border border-white/20 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-white/5">Cancel</button>
              <button className="border border-white/20 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-white/5">Save Draft</button>
              <button onClick={handleCreate} disabled={saving || !f.name || !f.email || !f.subject} className="bg-[#C7E36B] text-black font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-lime-300 disabled:opacity-50 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                {saving ? "Creating..." : "Create Ticket"}
              </button>
            </div>
          </div>
          {/* Form */}
          <div className="px-8 py-6">
            <div className="bg-[#111315] border border-white/10 rounded-2xl overflow-hidden">
              {[
                { num:1, label:"Requester Name", req:true,
                  el: <input value={f.name} onChange={e=>setForm({...f,name:e.target.value})} placeholder="Enter full name of the requester" className="flex-1 bg-transparent border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#C7E36B]/40"/> },
                { num:2, label:"Email Address", req:true,
                  el: <input type="email" value={f.email} onChange={e=>setForm({...f,email:e.target.value})} placeholder="Enter email address" className="flex-1 bg-transparent border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#C7E36B]/40"/> },
                { num:3, label:"Phone Number", req:false,
                  el: <div className="flex gap-2 flex-1">
                    <div className="flex items-center gap-1.5 bg-[#1A1D1E] border border-white/10 rounded-xl px-3 py-2.5 shrink-0">
                      <span className="text-base">🇮🇳</span><span className="text-sm text-gray-300">+91</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                    <input value={f.phone} onChange={e=>setForm({...f,phone:e.target.value})} placeholder="Enter phone number" className="flex-1 bg-transparent border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#C7E36B]/40"/>
                  </div> },
                { num:4, label:"Request Type", req:true,
                  el: <div className="relative flex-1">
                    <select value={f.requestType} onChange={e=>setForm({...f,requestType:e.target.value})} className="appearance-none w-full bg-[#1A1D1E] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#C7E36B]/40 pr-9">
                      <option value="">Select request type</option>
                      {SR_REQUEST_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div> },
                { num:5, label:"Subject", req:true,
                  el: <input value={f.subject} onChange={e=>setForm({...f,subject:e.target.value})} placeholder="Enter a short subject" className="flex-1 bg-transparent border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#C7E36B]/40"/> },
                { num:6, label:"Priority", req:true,
                  el: <div className="flex gap-3 flex-wrap">
                    {[{v:"Low",dot:"bg-green-400"},{v:"Medium",dot:"bg-yellow-400"},{v:"High",dot:"bg-orange-500"},{v:"Urgent",dot:"bg-red-500"}].map(p => (
                      <button key={p.v} onClick={()=>setForm({...f,priority:p.v})}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all ${f.priority===p.v?"border-[#C7E36B] bg-[#C7E36B]/5 text-white":"border-white/10 text-gray-400 hover:border-white/20"}`}>
                        <span className={`w-2 h-2 rounded-full ${p.dot}`}/>
                        {p.v}
                      </button>
                    ))}
                  </div> },
                { num:7, label:"Description / Message", req:true,
                  el: <div className="flex-1 relative">
                    <textarea value={f.description} onChange={e=>setForm({...f,description:e.target.value.slice(0,2000)})} rows={5} placeholder="Provide details about the issue or request..."
                      className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#C7E36B]/40 resize-none"/>
                    <span className="absolute bottom-2 right-3 text-[10px] text-gray-600">{f.description.length} / 2000</span>
                  </div> },
                { num:8, label:"Attachment", req:false,
                  el: <label className="flex-1 border border-dashed border-white/15 rounded-xl py-6 flex flex-col items-center justify-center cursor-pointer hover:border-white/30 transition-all">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="1.8" strokeLinecap="round" className="mb-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    <p className="text-sm text-gray-300">Drag and drop files here, or <span className="text-[#C7E36B]">click to browse</span></p>
                    <p className="text-xs text-gray-500 mt-1">Supports: PDF, JPG, PNG, DOC, DOCX (Max 10MB)</p>
                    <input type="file" className="hidden" onChange={e => setAttachFile(e.target.files?.[0]||null)} accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"/>
                    {attachFile && <p className="mt-2 text-xs text-[#C7E36B]">{attachFile.name}</p>}
                  </label> },
                { num:9, label:"Assign To", req:true,
                  el: <div className="relative flex-1">
                    <select value={f.assignTo} onChange={e=>setForm({...f,assignTo:e.target.value})} className="appearance-none w-full bg-[#1A1D1E] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#C7E36B]/40 pr-9">
                      <option value="">Select a support agent</option>
                      {SR_AGENTS.map(a => <option key={a}>{a}</option>)}
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div> },
                { num:10, label:"Status", req:true,
                  el: <div className="relative flex-1">
                    <select value={f.status} onChange={e=>setForm({...f,status:e.target.value})} className="appearance-none w-full bg-[#1A1D1E] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#C7E36B]/40 pr-9">
                      {["New","In Progress","Waiting for User","Open","Resolved","Closed"].map(s => <option key={s}>{s}</option>)}
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div> },
              ].map(row => (
                <div key={row.num} className="flex items-start gap-6 px-6 py-4 border-b border-white/5 last:border-0">
                  <div className="w-52 shrink-0 pt-2.5">
                    <span className="text-sm text-gray-300">{row.num}. {row.label} {row.req && <span className="text-red-400">*</span>}</span>
                  </div>
                  {row.el}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right preview sidebar */}
        <div className="w-[280px] shrink-0 border-l border-white/5 bg-[#0F1112] overflow-y-auto p-5">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            Ticket Preview
          </h3>
          <div className="space-y-3 text-xs mb-6">
            {[
              { label:"Requester Name", value: f.name || "—" },
              { label:"Email Address",  value: f.email || "—" },
              { label:"Phone Number",   value: f.phone || "—" },
              { label:"Request Type",   value: f.requestType || "—", badge: f.requestType ? "bg-blue-500/20 text-blue-400" : null },
              { label:"Subject",        value: f.subject || "—" },
              { label:"Priority",       value: f.priority, badge: f.priority ? SR_PRIORITY_BADGE[f.priority] : null },
              { label:"Assigned To",    value: f.assignTo || "—" },
              { label:"Status",         value: f.status, badge: f.status ? SR_STATUS_BADGE[f.status] : null },
            ].map(r => (
              <div key={r.label} className="flex items-start justify-between gap-2">
                <span className="text-gray-500 shrink-0">{r.label}</span>
                {r.badge
                  ? <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${r.badge}`}>{r.value}</span>
                  : <span className="text-white font-medium text-right">{r.value}</span>
                }
              </div>
            ))}
          </div>
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            Support Guidelines
          </h3>
          <div className="space-y-2.5">
            {["Ensure all required fields are filled accurately before creating the ticket.","Use clear and concise language in the subject and description.","Assign the ticket to the most relevant support agent or team.","Update the ticket status as the request progresses."].map((g,i) => (
              <div key={i} className="flex items-start gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2.5" strokeLinecap="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>
                <p className="text-xs text-gray-400 leading-relaxed">{g}</p>
              </div>
            ))}
            <div className="mt-3 bg-white/5 border border-white/10 rounded-xl p-3 flex items-start gap-2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <p className="text-[10px] text-gray-500 leading-relaxed">Internal tickets are used for escalations, learner issues, and backend resolutions within the AIFA support team.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── TICKET CREATED SUCCESS VIEW ── */
  if (ticketCreated) {
    const tc = ticketCreated;
    const ticketId = tc.ticketId || `SR-${new Date().getFullYear()}-1042`;
    return (
      <div className="flex-1 overflow-y-auto p-8">
        <h1 className="text-2xl font-bold text-white mb-1">Ticket Created Successfully</h1>
        <p className="text-sm text-gray-400 mb-6">The support ticket has been created and assigned successfully.</p>
        {/* Success banner */}
        <div className="bg-[#111315] border border-white/10 rounded-2xl px-5 py-4 flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>
            <p className="text-sm text-gray-200">Ticket <span className="text-[#C7E36B] font-bold">#{ticketId}</span> created successfully and assigned to {tc.assignTo || tc.assignedTo || "Support Team"}.</p>
          </div>
          <button onClick={() => setTicketCreated(null)} className="border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-white/5 shrink-0">View Ticket</button>
        </div>
        <div className="grid grid-cols-[1fr_320px] gap-6">
          {/* Left */}
          <div className="space-y-5">
            {/* Ticket Summary */}
            <div className="bg-[#111315] border border-white/10 rounded-2xl p-6">
              <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                Ticket Summary
              </h2>
              <div className="space-y-3">
                {[
                  { label:"Ticket ID",       value: ticketId, lime:true },
                  { label:"Requester Name",  value: tc.name },
                  { label:"Email",           value: tc.email },
                  { label:"Request Type",    value: tc.requestType || "—" },
                  { label:"Subject",         value: tc.subject },
                  { label:"Priority",        value: tc.priority, badge: SR_PRIORITY_BADGE[tc.priority] },
                  { label:"Assigned To",     value: tc.assignTo || tc.assignedTo || "—" },
                  { label:"Status",          value: tc.status, badge: SR_STATUS_BADGE[tc.status] },
                  { label:"Created On",      value: new Date().toLocaleDateString("en",{weekday:"long",hour:"2-digit",minute:"2-digit"}) },
                ].map(r => (
                  <div key={r.label} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                    <span className="text-sm text-gray-400">{r.label}</span>
                    {r.badge
                      ? <span className={`text-xs font-bold px-3 py-1 rounded-lg ${r.badge}`}>{r.value}</span>
                      : <span className={`text-sm font-semibold ${r.lime?"text-[#C7E36B]":"text-white"}`}>{r.value || "—"}</span>
                    }
                  </div>
                ))}
              </div>
            </div>
            {/* Issue Description */}
            <div className="bg-[#111315] border border-white/10 rounded-2xl p-6">
              <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                Issue Description
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">{tc.description || "No description provided."}</p>
              {attachFile && (
                <div className="mt-4">
                  <p className="text-xs font-bold text-gray-400 mb-2 flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                    Attachment
                  </p>
                  <div className="bg-[#0F1112] border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium">{attachFile.name}</p>
                        <p className="text-xs text-gray-500">{(attachFile.size/1024).toFixed(0)} KB · {attachFile.name.split(".").pop().toUpperCase()}</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-white">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Bottom actions */}
            <div className="flex gap-3">
              <button onClick={() => setTicketCreated(null)} className="border border-white/20 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-white/5 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                Back to Requests
              </button>
              <button className="border border-white/20 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-white/5 flex items-center gap-2">
                View Full Ticket
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </button>
              <button className="bg-[#C7E36B] text-black font-bold text-sm px-5 py-3 rounded-xl hover:bg-lime-300 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                Reply to Request
              </button>
            </div>
          </div>
          {/* Right */}
          <div className="space-y-4">
            {/* Next Actions */}
            <div className="bg-[#111315] border border-white/10 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2" strokeLinecap="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                Next Actions
              </h3>
              {["Notify support agent","Send acknowledgement to requester","Track resolution progress"].map(a => (
                <div key={a} className="flex items-center gap-2.5 py-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>
                  <span className="text-sm text-gray-300">{a}</span>
                </div>
              ))}
            </div>
            {/* Ticket Status */}
            <div className="bg-[#111315] border border-white/10 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Ticket Status
              </h3>
              <div className="flex flex-wrap gap-2">
                {[{s:"New",dot:"bg-blue-500"},{s:"Urgent",dot:"bg-red-500"},{s:"Assigned",dot:"bg-orange-500"}].map(x => (
                  <span key={x.s} className="flex items-center gap-1.5 bg-[#0F1112] border border-white/10 rounded-lg px-3 py-1.5 text-xs font-semibold text-white">
                    <span className={`w-2 h-2 rounded-full ${x.dot}`}/>
                    {x.s}
                  </span>
                ))}
              </div>
            </div>
            {/* Recent Activity */}
            <div className="bg-[#111315] border border-white/10 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Recent Activity
              </h3>
              <div className="space-y-4">
                {[
                  { icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>, text:"Ticket created", time:"Today, "+new Date().toLocaleTimeString("en",{hour:"2-digit",minute:"2-digit"}) },
                  { icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, text:`Assigned to ${tc.assignTo||"Support Team"}`, time:"Today, "+new Date().toLocaleTimeString("en",{hour:"2-digit",minute:"2-digit"}) },
                  { icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, text:"Acknowledgement email queued", time:"Today, "+new Date().toLocaleTimeString("en",{hour:"2-digit",minute:"2-digit"}) },
                ].map((a, i) => (
                  <div key={i} className="flex items-start gap-3 relative">
                    {i < 2 && <div className="absolute left-[11px] top-6 w-0.5 h-6 bg-[#C7E36B]/30"/>}
                    <div className="w-5 h-5 rounded-full bg-[#C7E36B] flex items-center justify-center shrink-0 text-black">{a.icon}</div>
                    <div>
                      <p className="text-sm text-white font-medium">{a.text}</p>
                      <p className="text-xs text-gray-500">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── MAIN LIST VIEW ── */
  return (
    <div className="flex h-full overflow-hidden">

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-2xl font-bold text-white">Service Request Management</h1>
            <p className="text-sm text-gray-400 mt-1">Track, assign, and resolve learner support requests.</p>
          </div>
          <button onClick={() => setShowCreate(true)} className="bg-[#C7E36B] text-black font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-lime-300 flex items-center gap-2 shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Create Request
          </button>
        </div>

        {/* Status tabs */}
        <div className="flex items-center gap-0 mb-5 border-b border-white/10">
          {[
            { id:"all",         label:"All Requests",  count: counts.all },
            { id:"new",         label:"New",           count: counts.new },
            { id:"in-progress", label:"In Progress",   count: counts.inProgress },
            { id:"resolved",    label:"Resolved",      count: counts.resolved },
            { id:"urgent",      label:"Urgent",        count: counts.urgent, warn:true },
          ].map(t => (
            <button key={t.id} onClick={() => setTabFilter(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-all -mb-px whitespace-nowrap ${tabFilter===t.id?"border-[#C7E36B] text-white":"border-transparent text-gray-400 hover:text-white"}`}>
              {t.warn && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>}
              {!t.warn && tabFilter===t.id && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>}
              {t.label}
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${tabFilter===t.id?"bg-[#C7E36B]/20 text-[#C7E36B]":"text-gray-500"}`}>{t.count}</span>
            </button>
          ))}
        </div>

        {/* Filter row */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          {[
            { label:"Request Type", val: typeFilter, opts:["All",...SR_REQUEST_TYPES], set: setTypeFilter },
            { label:"Priority",     val: priorityFilter, opts:["All","Low","Medium","High","Urgent"], set: setPriorityFilter },
            { label:"Status",       val: statusFilterV, opts:["All","New","In Progress","Waiting for User","Open","Resolved","Closed"], set: setStatusFilterV },
          ].map(f => (
            <div key={f.label} className="relative">
              <select value={f.val} onChange={e => f.set(e.target.value)}
                className="appearance-none bg-[#111315] border border-white/15 text-gray-300 text-sm font-medium rounded-xl pl-3 pr-8 py-2 outline-none focus:border-[#C7E36B]/40">
                <option value="All">{f.label}</option>
                {f.opts.slice(1).map(o => <option key={o}>{o}</option>)}
              </select>
              <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="bg-[#111315] border border-white/10 rounded-xl pl-8 pr-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#C7E36B]/40 w-48"/>
              <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <div className="relative">
              <select className="appearance-none bg-[#111315] border border-white/15 text-gray-300 text-sm rounded-xl pl-3 pr-7 py-2 outline-none">
                <option>Sort: Newest</option><option>Sort: Oldest</option>
              </select>
              <svg className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <button className="w-9 h-9 flex items-center justify-center bg-[#111315] border border-white/15 rounded-xl text-gray-400 hover:text-white">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#111315] border border-white/10 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[1.6fr_1.2fr_1.8fr_0.9fr_1.1fr_1.1fr_1fr_90px] px-5 py-3.5 border-b border-white/10">
            {["User","Request Type","Subject","Priority","Status","Assigned To","Created","Actions"].map(h => (
              <span key={h} className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">{h}</span>
            ))}
          </div>
          {loading ? (
            <div className="py-12 flex justify-center"><AdminLoader label="Loading Requests"/></div>
          ) : pageItems.length === 0 ? (
            <div className="py-14 text-center"><p className="text-3xl mb-3">📋</p><p className="text-sm text-gray-400">No requests found</p></div>
          ) : (
            <div className="divide-y divide-white/5">
              {pageItems.map((r, i) => {
                const pri  = getPriority(r);
                const stat = getStatus(r);
                return (
                  <div key={r._id||i} className="grid grid-cols-[1.6fr_1.2fr_1.8fr_0.9fr_1.1fr_1.1fr_1fr_90px] px-5 py-4 items-center hover:bg-white/[0.03] transition-all">
                    {/* User */}
                    <div className="flex items-center gap-2.5">
                      {r.avatar || r.user?.avatar
                        ? <img src={r.avatar||r.user?.avatar} alt="" className="w-8 h-8 rounded-full object-cover shrink-0"/>
                        : <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-xs font-bold text-white shrink-0">{initials(r.name)}</div>
                      }
                      <span className="text-sm font-semibold text-white truncate">{r.name||"—"}</span>
                    </div>
                    {/* Request Type */}
                    <span className="text-sm text-gray-300 truncate pr-2">{getRequestType(r)}</span>
                    {/* Subject */}
                    <span className="text-sm text-gray-300 line-clamp-2 pr-2">{getSubject(r)}</span>
                    {/* Priority */}
                    <span className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-md w-fit ${SR_PRIORITY_BADGE[pri]||"bg-white/10 text-gray-300"}`}>{pri}</span>
                    {/* Status */}
                    <span className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-md w-fit ${SR_STATUS_BADGE[stat]||"bg-white/10 text-gray-300"}`}>{stat}</span>
                    {/* Assigned To */}
                    <span className="text-sm text-gray-300 truncate">{getAssigned(r)}</span>
                    {/* Created */}
                    <span className="text-xs text-gray-400">{fmtCreated(r)}</span>
                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <button className="border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all">View</button>
                      <div className="relative">
                        <button onClick={e => { e.stopPropagation(); setContextMenu(contextMenu?.id===r._id ? null : { id:r._id, req:r }); }}
                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-400 hover:text-white">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                        </button>
                        {contextMenu?.id === r._id && (
                          <div className="absolute right-0 top-8 z-50 bg-[#1A1D1E] border border-white/10 rounded-xl shadow-2xl w-48 py-1 overflow-hidden" onClick={e=>e.stopPropagation()}>
                            {[
                              { label:"Assign To Me",    action:"assign" },
                              { label:"Schedule Call",   action:"call" },
                              { label:"Send WhatsApp",   action:"whatsapp" },
                              { label:"Send Email",      action:"email" },
                              { label:"Mark Follow-Up",  action:"follow" },
                              { label:"Mark Converted",  action:"converted" },
                              { label:"Mark Lost",       action:"lost" },
                            ].map(item => (
                              <button key={item.action} onClick={() => handleContextAction(item.action, r)}
                                className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-all">
                                {item.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-white/10">
            <p className="text-xs text-gray-500">Showing {filtered.length===0?0:(pageSafe-1)*PER+1} to {Math.min(pageSafe*PER,filtered.length)} of {filtered.length} results</p>
            <div className="flex items-center gap-1">
              <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={pageSafe<=1} className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:border-white/30 disabled:opacity-30">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              {Array.from({length:Math.min(totalPages,3)},(_,i)=>i+1).map(n=>(
                <button key={n} onClick={()=>setPage(n)} className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${pageSafe===n?"bg-[#C7E36B] text-black":"border border-white/10 text-gray-400 hover:border-white/30"}`}>{n}</button>
              ))}
              {totalPages>3 && <span className="text-gray-600 px-1">…</span>}
              {totalPages>3 && <button onClick={()=>setPage(totalPages)} className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${pageSafe===totalPages?"bg-[#C7E36B] text-black":"border border-white/10 text-gray-400 hover:border-white/30"}`}>{totalPages}</button>}
              <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={pageSafe>=totalPages} className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:border-white/30 disabled:opacity-30">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right sidebar */}
      <div className="w-[270px] shrink-0 border-l border-white/5 bg-[#0F1112] overflow-y-auto p-4">
        {/* Support Overview */}
        <div className="bg-[#111315] border border-white/10 rounded-2xl p-4 mb-4">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.9 12.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.82 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Support Overview
          </h3>
          {[
            { label:"Total Requests", value: counts.all,        color:"text-white" },
            { label:"New Requests",   value: counts.new,        color:"text-orange-400" },
            { label:"In Progress",    value: counts.inProgress, color:"text-orange-400" },
            { label:"Resolved",       value: counts.resolved,   color:"text-[#C7E36B]" },
          ].map(s => (
            <div key={s.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <div className="flex items-center gap-2">
                {s.label==="Total Requests"  && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>}
                {s.label==="New Requests"    && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>}
                {s.label==="In Progress"     && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>}
                {s.label==="Resolved"        && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>}
                <span className="text-xs text-gray-400">{s.label}</span>
              </div>
              <span className={`text-sm font-black ${s.color}`}>{s.value}</span>
            </div>
          ))}
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <div>
              <p className="text-xs text-gray-400">Avg. Response Time</p>
              <p className="text-sm font-black text-white">{avgResponseTime}</p>
              <p className="text-[10px] text-gray-600">Last 7 days</p>
            </div>
          </div>
        </div>

        {/* Priority Queue */}
        <div className="bg-[#111315] border border-white/10 rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              Priority Queue
            </h3>
            <button className="text-[10px] text-[#C7E36B] font-semibold hover:underline">View All</button>
          </div>
          {priorityQueue.length === 0 ? (
            <p className="text-xs text-gray-500 text-center py-4">No urgent tickets</p>
          ) : (
            <div className="space-y-3">
              {priorityQueue.map((r, i) => (
                <div key={r._id||i} className="bg-[#0F1112] border border-white/5 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded ${getPriority(r)==="Urgent"?"bg-red-500 text-white":"bg-orange-500/20 text-orange-400"}`}>{getPriority(r)}</span>
                    <span className="text-[10px] text-gray-500">#{r.ticketId||`SR-${String(r._id||"").slice(-4)}`}</span>
                  </div>
                  <p className="text-xs font-semibold text-white line-clamp-1">{getSubject(r)}</p>
                  <p className="text-[10px] text-gray-500 mt-1">{r.name} · {getRequestType(r)}</p>
                  <p className="text-[10px] text-gray-600 mt-0.5">{fmtCreated(r)}</p>
                </div>
              ))}
            </div>
          )}
          <button onClick={() => setTabFilter("urgent")} className="w-full mt-3 border border-white/10 text-gray-300 text-xs font-semibold py-2.5 rounded-xl hover:bg-white/5 flex items-center justify-center gap-1.5">
            View All Priority Tickets
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        {/* Help Resources */}
        <div className="bg-[#111315] border border-white/10 rounded-2xl p-4">
          <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            Help Resources
          </h3>
          <p className="text-[10px] text-gray-500 mb-3">Quick links for your support team.</p>
          {["Support Guidelines","Response Templates"].map(l => (
            <div key={l} className="flex items-center justify-between py-3 border-t border-white/5">
              <span className="text-sm text-gray-300">{l}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── SALES CONSULTATION ADMIN ── */

const SC_STATUS = {
  "New":       "bg-[#C7E36B] text-black",
  "Contacted": "bg-pink-500 text-white",
  "Booked":    "bg-blue-500 text-white",
  "Follow up": "bg-purple-500 text-white",
  "Converted": "bg-green-500 text-white",
  "Lost":      "bg-gray-600 text-gray-300",
};
const SC_PRIORITY = {
  "High":   "bg-orange-500/25 text-orange-400 border border-orange-500/30",
  "Normal": "bg-white/10 text-gray-300",
  "Low":    "bg-white/5 text-gray-500",
};

function SalesConsultAdmin({ token }) {
  const BLANK_LEAD = { name:"", phone:"", email:"", consultType:"Workshop", status:"New", priority:"Normal", date:"", assignedTo:"", source:"", note:"" };
  const BLANK_UPD  = { consultType:"", status:"", assignedTo:"", followDate:"", note:"" };

  const [leads, setLeads]             = useState([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [priorityFilter, setPriorityFilter] = useState("All Priorities");

  /* modals */
  const [viewLead, setViewLead]       = useState(null);   // details modal
  const [editLead, setEditLead]       = useState(null);   // update modal
  const [deleteLead, setDeleteLead]   = useState(null);   // delete confirm
  const [showAdd, setShowAdd]         = useState(false);  // add new lead
  const [showExport, setShowExport]   = useState(false);  // export modal
  const [exportFmt, setExportFmt]     = useState("xlsx");

  /* add lead form */
  const [newLead, setNewLead]         = useState(BLANK_LEAD);
  /* update form */
  const [upd, setUpd]                 = useState(BLANK_UPD);
  const [saving, setSaving]           = useState(false);

  useEffect(() => {
    fetch("/api/consultations", { headers:{ Authorization:`Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setLeads(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [token]);

  const openEdit = (l) => { setEditLead(l); setUpd({ consultType: l.consultType||"", status: l.status||"", assignedTo: l.assignedTo||"", followDate: l.followDate||"", note: l.note||"" }); };

  const handleUpdate = async () => {
    if (!editLead) return;
    setSaving(true);
    const merged = { ...editLead, ...upd };
    try {
      const res = await fetch(`/api/consultations/${editLead._id}`, { method:"PUT", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}, body:JSON.stringify(upd) });
      if (res.ok) { const data = await res.json(); setLeads(ls => ls.map(l => l._id===data._id ? data : l)); setEditLead(null); }
      else { setLeads(ls => ls.map(l => l._id===editLead._id ? merged : l)); setEditLead(null); }
    } catch { setLeads(ls => ls.map(l => l._id===editLead._id ? merged : l)); setEditLead(null); }
    setSaving(false);
  };

  const handleAdd = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/consultations", { method:"POST", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}, body:JSON.stringify(newLead) });
      if (res.ok) { const data = await res.json(); setLeads(ls => [data, ...ls]); }
      else { setLeads(ls => [{ ...newLead, _id:`tmp_${Date.now()}`, date: new Date().toLocaleDateString("en",{year:"numeric",month:"short",day:"numeric"}) }, ...ls]); }
    } catch { setLeads(ls => [{ ...newLead, _id:`tmp_${Date.now()}`, date: new Date().toLocaleDateString("en",{year:"numeric",month:"short",day:"numeric"}) }, ...ls]); }
    setNewLead(BLANK_LEAD); setShowAdd(false); setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteLead) return;
    try { await fetch(`/api/consultations/${deleteLead._id}`, { method:"DELETE", headers:{ Authorization:`Bearer ${token}` } }); } catch {}
    setLeads(ls => ls.filter(l => l._id !== deleteLead._id));
    setDeleteLead(null); setViewLead(null);
  };

  const handleExport = () => {
    const rows = filtered;
    if (exportFmt === "csv") {
      const hdr = ["Name","Phone","Email","Consultation Type","Status","Priority","Date","Assigned To","Note"];
      const body = rows.map(l => [l.name,l.phone,l.email,l.consultType,l.status,l.priority,l.date,l.assignedTo,l.note].map(v=>`"${(v||"").replace(/"/g,'""')}"`).join(","));
      const blob = new Blob([[hdr.join(","), ...body].join("\n")], { type:"text/csv" });
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "consultations.csv"; a.click();
    } else {
      alert("XLSX export requires a server-side endpoint. CSV is available for client-side export.");
    }
    setShowExport(false);
  };

  const filtered = leads.filter(l => {
    const q = search.toLowerCase();
    const matchQ = !q || l.name?.toLowerCase().includes(q) || l.email?.toLowerCase().includes(q) || l.phone?.includes(q);
    const matchS = statusFilter === "All Status" || l.status === statusFilter;
    const matchP = priorityFilter === "All Priorities" || l.priority === priorityFilter;
    return matchQ && matchS && matchP;
  });

  const initials = (name) => (name||"?").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();

  /* ── SELECT component ── */
  const Sel = ({ value, onChange, options, placeholder, className="" }) => (
    <div className="relative">
      <select value={value} onChange={e => onChange(e.target.value)}
        className={`appearance-none w-full bg-[#1A1D1E] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#C7E36B]/40 pr-9 ${className}`}>
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto p-6">

      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-white">Sales Consultation</h1>
          <p className="text-sm text-gray-400 mt-1">Manage and track all consultation requests from prospective students.</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button onClick={() => setShowAdd(true)} className="bg-[#C7E36B] text-black font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-lime-300 transition-all">Add New Lead</button>
          <button onClick={() => setShowExport(true)} className="border border-white/20 text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-white/5 transition-all">Export</button>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email or..."
            className="w-full bg-[#111315] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#C7E36B]/40"/>
        </div>
        <div className="relative">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="appearance-none bg-[#111315] border border-white/10 rounded-xl pl-4 pr-9 py-3 text-sm text-gray-300 outline-none focus:border-[#C7E36B]/40">
            {["All Status","New","Contacted","Booked","Follow up","Converted","Lost"].map(s => <option key={s}>{s}</option>)}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div className="relative">
          <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}
            className="appearance-none bg-[#111315] border border-white/10 rounded-xl pl-4 pr-9 py-3 text-sm text-gray-300 outline-none focus:border-[#C7E36B]/40">
            {["All Priorities","High","Normal","Low"].map(p => <option key={p}>{p}</option>)}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111315] border border-white/10 rounded-2xl overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[1.6fr_1.8fr_1.4fr_1fr_1fr_1.1fr_100px] px-5 py-3.5 border-b border-white/10">
          {["LEAD","CONTACT","CONSULTATION TYPE","STATUS","PRIORITY","DATE","ACTIONS"].map(h => (
            <span key={h} className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">{h}</span>
          ))}
        </div>

        {loading ? (
          <div className="py-16 flex justify-center"><AdminLoader label="Loading Leads"/></div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-3xl mb-3">📋</p>
            <p className="text-sm text-gray-400">No leads found</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filtered.map((l, i) => (
              <div key={l._id||i} className="grid grid-cols-[1.6fr_1.8fr_1.4fr_1fr_1fr_1.1fr_100px] px-5 py-4 items-center hover:bg-white/[0.03] transition-all">
                <span className="text-sm font-semibold text-white">{l.name}</span>
                <div>
                  <p className="text-sm text-gray-300">{l.phone}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{l.email}</p>
                </div>
                <span className="text-sm text-gray-300">{l.consultType}</span>
                <span className={`inline-flex items-center justify-center text-[11px] font-bold px-3 py-1 rounded-md w-fit ${SC_STATUS[l.status] || "bg-white/10 text-gray-300"}`}>{l.status}</span>
                <span className={`inline-flex items-center justify-center text-[11px] font-bold px-3 py-1 rounded-md w-fit ${SC_PRIORITY[l.priority] || "bg-white/10 text-gray-300"}`}>{l.priority}</span>
                <span className="text-sm text-gray-300">{l.date}</span>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => setViewLead(l)} title="View" className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                  <button onClick={() => openEdit(l)} title="Edit" className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button onClick={() => setDeleteLead(l)} title="Delete" className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-all">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── VIEW DETAILS MODAL ── */}
      {viewLead && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={e => e.target===e.currentTarget && setViewLead(null)}>
          <div className="bg-[#111315] border border-white/10 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <h2 className="text-base font-bold text-white">Consultation Details</h2>
              <button onClick={() => setViewLead(null)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-400 hover:text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            {/* Avatar + name */}
            <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C7E36B]/20 text-[#C7E36B] font-black text-sm flex items-center justify-center shrink-0">{initials(viewLead.name)}</div>
              <div>
                <p className="text-sm font-bold text-white">{viewLead.name}</p>
                <p className="text-xs text-gray-400">{viewLead.email}</p>
                <p className="text-xs text-gray-400">{viewLead.phone}</p>
              </div>
            </div>
            {/* Detail rows */}
            <div className="divide-y divide-white/5">
              {[
                { label:"Consultation Type", value: viewLead.consultType },
                { label:"Assigned To",       value: viewLead.assignedTo || "—" },
                { label:"Date",              value: viewLead.date || "—" },
                { label:"Note",              value: viewLead.note || "—" },
              ].map(r => (
                <div key={r.label} className="grid grid-cols-2 gap-2 px-5 py-3.5">
                  <span className="text-xs text-gray-500">{r.label}</span>
                  <span className="text-xs font-semibold text-white">{r.value}</span>
                </div>
              ))}
            </div>
            {/* Actions */}
            <div className="flex border-t border-white/10">
              <button onClick={() => { openEdit(viewLead); setViewLead(null); }} className="flex-1 py-3.5 text-sm font-semibold text-white hover:bg-white/5 transition-all border-r border-white/10">Edit</button>
              <button onClick={() => setDeleteLead(viewLead)} className="flex-1 py-3.5 text-sm font-semibold text-red-400 hover:bg-red-500/5 flex items-center justify-center gap-2 transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M9 6V4h6v2"/></svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── UPDATE CONSULTATION MODAL ── */}
      {editLead && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={e => e.target===e.currentTarget && setEditLead(null)}>
          <div className="bg-[#111315] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="text-base font-bold text-white">Update Consultation</h2>
              <button onClick={() => setEditLead(null)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-400 hover:text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white mb-1.5">Consultation Type</label>
                <Sel value={upd.consultType} onChange={v=>setUpd({...upd,consultType:v})} options={["Workshop","Bootcamp","One on One call","Video Course","Masterclass"]} placeholder="Select consultation type"/>
              </div>
              <div>
                <label className="block text-xs font-semibold text-white mb-1.5">Status</label>
                <Sel value={upd.status} onChange={v=>setUpd({...upd,status:v})} options={["New","Contacted","Booked","Follow up","Converted","Lost"]} placeholder="Select Status"/>
              </div>
              <div>
                <label className="block text-xs font-semibold text-white mb-1.5">Assigned To</label>
                <Sel value={upd.assignedTo} onChange={v=>setUpd({...upd,assignedTo:v})} options={["Ravi","Priya","Arun","Team Lead"]} placeholder="Select team member"/>
              </div>
              <div>
                <label className="block text-xs font-semibold text-white mb-1.5">Follow-up Date</label>
                <div className="relative">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  <input type="date" value={upd.followDate} onChange={e => setUpd({...upd,followDate:e.target.value})}
                    className="w-full bg-[#1A1D1E] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white outline-none focus:border-[#C7E36B]/40"/>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-white mb-1.5">Note <span className="text-gray-500 font-normal">(Optional)</span></label>
                <textarea value={upd.note} onChange={e => setUpd({...upd,note:e.target.value})} rows={3}
                  placeholder="Add any notes or details about..."
                  className="w-full bg-[#1A1D1E] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/40 resize-none"/>
              </div>
            </div>
            <div className="flex gap-0 border-t border-white/10">
              <button onClick={() => setEditLead(null)} className="flex-1 py-3.5 text-sm font-bold text-gray-300 hover:bg-white/5 uppercase tracking-wider transition-all">Cancel</button>
              <button onClick={handleUpdate} disabled={saving} className="flex-1 py-3.5 text-sm font-bold bg-[#C7E36B] text-black hover:bg-lime-300 disabled:opacity-60 transition-all">
                {saving ? "Saving..." : "Save Consultation"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── ADD NEW LEAD MODAL ── */}
      {showAdd && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={e => e.target===e.currentTarget && setShowAdd(false)}>
          <div className="bg-[#111315] border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between px-6 py-5 border-b border-white/10">
              <div>
                <h2 className="text-lg font-bold text-white">Add New Lead</h2>
                <p className="text-xs text-gray-400 mt-0.5">Enter lead details to track and follow up.</p>
              </div>
              <button onClick={() => setShowAdd(false)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-400 hover:text-white mt-0.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-1.5">Name</label>
                  <input value={newLead.name} onChange={e => setNewLead({...newLead,name:e.target.value})} placeholder="Enter full name"
                    className="w-full bg-[#1A1D1E] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/40"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1.5">Mobile Number</label>
                  <input value={newLead.phone} onChange={e => setNewLead({...newLead,phone:e.target.value})} placeholder="Enter Mobile Number"
                    className="w-full bg-[#1A1D1E] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/40"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1.5">Email</label>
                  <input type="email" value={newLead.email} onChange={e => setNewLead({...newLead,email:e.target.value})} placeholder="Enter full name"
                    className="w-full bg-[#1A1D1E] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/40"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1.5">Interested Program</label>
                  <Sel value={newLead.consultType} onChange={v=>setNewLead({...newLead,consultType:v})} options={["Workshop","Bootcamp","One on One call","Video Course","Masterclass"]} placeholder="Select program"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1.5">Source</label>
                  <Sel value={newLead.source} onChange={v=>setNewLead({...newLead,source:v})} options={["Instagram","Facebook","WhatsApp","Referral","Website","Other"]} placeholder="Select Source"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1.5">Assigned to</label>
                  <Sel value={newLead.assignedTo} onChange={v=>setNewLead({...newLead,assignedTo:v})} options={["Ravi","Priya","Arun","Team Lead"]} placeholder="Select team member"/>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">Follow-up Date</label>
                <div className="relative">
                  <input type="date" value={newLead.date} onChange={e => setNewLead({...newLead,date:e.target.value})}
                    className="w-full bg-[#1A1D1E] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#C7E36B]/40"/>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">Note <span className="text-gray-500 font-normal text-xs">(Optional)</span></label>
                <textarea value={newLead.note} onChange={e => setNewLead({...newLead,note:e.target.value})} rows={3}
                  placeholder="Add any notes or details about..."
                  className="w-full bg-[#1A1D1E] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/40 resize-none"/>
              </div>
            </div>
            <div className="flex border-t border-white/10">
              <button onClick={() => setShowAdd(false)} className="flex-1 py-4 text-sm font-bold text-gray-300 hover:bg-white/5 uppercase tracking-wider transition-all">Cancel</button>
              <button onClick={handleAdd} disabled={saving || !newLead.name.trim()} className="flex-1 py-4 text-sm font-bold bg-[#C7E36B] text-black hover:bg-lime-300 disabled:opacity-50 transition-all">
                {saving ? "Saving..." : "Save Lead"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── EXPORT MODAL ── */}
      {showExport && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={e => e.target===e.currentTarget && setShowExport(false)}>
          <div className="bg-[#111315] border border-white/10 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <h2 className="text-base font-bold text-white">Export Consultation</h2>
              <button onClick={() => setShowExport(false)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-400 hover:text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-gray-400 mb-5">Choose the data you want to export and the format for your file.</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">FILE FORMAT</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id:"csv",  label:"CSV",          desc:"Export data in CSV (Comma separated values) format." },
                  { id:"xlsx", label:"Excel (XLSX)",  desc:"Export data in Excel spreadsheet format." },
                ].map(f => (
                  <button key={f.id} onClick={() => setExportFmt(f.id)}
                    className={`border rounded-xl p-4 text-left transition-all ${exportFmt===f.id ? "border-[#C7E36B] bg-[#C7E36B]/5" : "border-white/10 hover:border-white/20"}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${exportFmt===f.id ? "border-[#C7E36B]" : "border-gray-500"}`}>
                        {exportFmt===f.id && <div className="w-2 h-2 rounded-full bg-[#C7E36B]"/>}
                      </div>
                      <span className="text-sm font-semibold text-white">{f.label}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">{f.desc}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button onClick={() => setShowExport(false)} className="flex-1 py-3 text-sm font-bold border border-white/20 text-gray-300 rounded-xl hover:bg-white/5 transition-all">Cancel</button>
              <button onClick={handleExport} className="flex-1 py-3 text-sm font-bold bg-[#C7E36B] text-black rounded-xl hover:bg-lime-300 transition-all">Export</button>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRM MODAL ── */}
      {deleteLead && (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={e => e.target===e.currentTarget && setDeleteLead(null)}>
          <div className="bg-[#111315] border border-white/10 rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center relative">
            <button onClick={() => setDeleteLead(null)} className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-400 hover:text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <div className="w-14 h-14 rounded-full bg-red-800/40 border border-red-700/40 flex items-center justify-center mx-auto mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Delete Consultation?</h2>
            <p className="text-sm text-gray-400 mb-7">This action cannot be undone.</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setDeleteLead(null)} className="py-3 text-sm font-bold border border-white/20 text-white rounded-xl hover:bg-white/5 transition-all">Cancel</button>
              <button onClick={handleDelete} className="py-3 text-sm font-bold bg-[#b45309] text-white rounded-xl hover:bg-orange-700 transition-all">Delete Consultation</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}

/* ── HIRE TALENT ADMIN ── */
const TALENT_CATEGORIES = ["All","Logo Design","UI Design","Video Editing","3D Modeling","Animation","VFX","Sound Design"];

function HireTalentAdmin({ token }) {
  const [talents, setTalents]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [saving, setSaving]     = useState(false);
  const [form, setForm] = useState({ name:"", location:"", category:"All", bio:"", contactEmail:"", skills:"", avatar:"", work1:"", work2:"", work3:"" });

  const load = () => {
    setLoading(true);
    fetch("/api/talent/all", { headers:{ Authorization:`Bearer ${token}` } })
      .then(r=>r.json()).then(d=>{ if(Array.isArray(d)) setTalents(d); setLoading(false); }).catch(()=>setLoading(false));
  };
  useEffect(load, [token]);

  const openAdd = () => { setEditTarget(null); setForm({ name:"",location:"",category:"All",bio:"",contactEmail:"",skills:"",avatar:"",work1:"",work2:"",work3:"" }); setShowForm(true); };
  const openEdit = (t) => {
    setEditTarget(t);
    setForm({ name:t.name,location:t.location||"",category:t.category||"All",bio:t.bio||"",contactEmail:t.contactEmail||"",skills:(t.skills||[]).join(", "),avatar:t.avatar||"",work1:t.works?.[0]||"",work2:t.works?.[1]||"",work3:t.works?.[2]||"" });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = { ...form, skills:form.skills.split(",").map(s=>s.trim()).filter(Boolean), works:[form.work1,form.work2,form.work3].filter(Boolean) };
    const url = editTarget ? `/api/talent/${editTarget._id}` : "/api/talent";
    const method = editTarget ? "PUT" : "POST";
    const res = await fetch(url, { method, headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}, body:JSON.stringify(payload) });
    if (res.ok) { setShowForm(false); load(); }
    setSaving(false);
  };

  const toggleActive = async (t) => {
    await fetch(`/api/talent/${t._id}`, { method:"PUT", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}, body:JSON.stringify({ isActive:!t.isActive }) });
    setTalents(ts=>ts.map(x=>x._id===t._id?{...x,isActive:!x.isActive}:x));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this talent profile?")) return;
    await fetch(`/api/talent/${id}`, { method:"DELETE", headers:{ Authorization:`Bearer ${token}` } });
    setTalents(ts=>ts.filter(t=>t._id!==id));
  };

  if (showForm) return (
    <div className="p-6 max-w-2xl">
      <div className="flex items-center gap-3 mb-5">
        <button onClick={()=>setShowForm(false)} className="text-xs text-gray-400 hover:text-white border border-white/15 px-3 py-1.5 rounded-lg">← Back</button>
        <h1 className="text-lg font-bold text-white">{editTarget?"Edit Talent":"Add Talent"}</h1>
      </div>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Fld label="NAME" value={form.name} onChange={v=>setForm({...form,name:v})} placeholder="Full name"/>
          <Fld label="LOCATION" value={form.location} onChange={v=>setForm({...form,location:v})} placeholder="City, Country"/>
        </div>
        <div>
          <p className="text-[10px] text-gray-400 font-semibold mb-1">CATEGORY</p>
          <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/50">
            {TALENT_CATEGORIES.map(c=><option key={c}>{c}</option>)}
          </select>
        </div>
        <Fld label="BIO" value={form.bio} onChange={v=>setForm({...form,bio:v})} textarea placeholder="Short professional bio..."/>
        <div className="grid grid-cols-2 gap-3">
          <Fld label="CONTACT EMAIL" value={form.contactEmail} onChange={v=>setForm({...form,contactEmail:v})} placeholder="email@example.com"/>
          <Fld label="SKILLS (comma-separated)" value={form.skills} onChange={v=>setForm({...form,skills:v})} placeholder="AI, Design, Motion"/>
        </div>
        <Fld label="AVATAR URL" value={form.avatar} onChange={v=>setForm({...form,avatar:v})} placeholder="https://..."/>
        <div className="grid grid-cols-3 gap-3">
          <Fld label="PORTFOLIO 1" value={form.work1} onChange={v=>setForm({...form,work1:v})} placeholder="Image URL"/>
          <Fld label="PORTFOLIO 2" value={form.work2} onChange={v=>setForm({...form,work2:v})} placeholder="Image URL"/>
          <Fld label="PORTFOLIO 3" value={form.work3} onChange={v=>setForm({...form,work3:v})} placeholder="Image URL"/>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={()=>setShowForm(false)} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg disabled:opacity-60">{saving?"Saving...":"Save"}</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-xl font-bold text-white">Hire Talent</h1><p className="text-xs text-gray-400">Manage talent profiles · {talents.length} total</p></div>
        <button onClick={openAdd} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300 ">Add Talent</button>
      </div>
      {loading ? <AdminLoader /> : (
        talents.length===0 ? (
          <div className="text-center py-12"><p className="text-gray-500 text-sm mb-3">No talent profiles yet</p><button onClick={openAdd} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg">Add First</button></div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {talents.map(t=>(
              <div key={t._id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                    {t.avatar ? <img src={t.avatar} className="w-full h-full object-cover" alt=""/> : <div className="w-full h-full bg-[#C7E36B] flex items-center justify-center text-black font-black text-lg">{t.name[0]}</div>}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white truncate">{t.name}</p>
                    <p className="text-[10px] text-gray-400 truncate">{t.location}</p>
                    <span className="text-[9px] bg-white/10 text-gray-400 px-2 py-0.5 rounded-full">{t.category}</span>
                  </div>
                </div>
                {t.skills?.length>0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {t.skills.slice(0,3).map(s=><span key={s} className="text-[9px] bg-[#C7E36B]/10 text-[#C7E36B] px-2 py-0.5 rounded-full">{s}</span>)}
                    {t.skills.length>3 && <span className="text-[9px] text-gray-500">+{t.skills.length-3} more</span>}
                  </div>
                )}
                {t.works?.length>0 && (
                  <div className="flex gap-1 mb-3">
                    {t.works.slice(0,3).map((w,i)=>(
                      <div key={i} className="flex-1 h-10 rounded-md overflow-hidden">
                        {w ? <img src={w} className="w-full h-full object-cover" alt=""/> : <div className="w-full h-full bg-white/5"/>}
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400">{t.isActive?"Active":"Inactive"}</span>
                    <Tog value={t.isActive} onChange={()=>toggleActive(t)}/>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={()=>openEdit(t)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-all"><I name="edit" size={13}/></button>
                    <button onClick={()=>handleDelete(t._id)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-all"><I name="trash" size={13}/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

/* ── MEMBERSHIP ADMIN ── */
function MembershipAdmin({ token }) {
  const [members, setMembers]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [planFilter, setPlanFilter]     = useState("All");
  const [viewMember, setViewMember]     = useState(null);
  const [showExport, setShowExport]     = useState(false);
  const [exportFmt, setExportFmt]       = useState("xlsx");
  const [page, setPage]           = useState(1);
  const PER_PAGE = 5;

  useEffect(() => {
    fetch("/api/membership/members", { headers:{ Authorization:`Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setMembers(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [token]);

  const fmtDate = (v) => {
    if (!v) return "—";
    const d = new Date(v);
    return isNaN(d) ? v : d.toLocaleDateString("en",{ month:"short", day:"2-digit", year:"numeric" }).replace(",","");
  };

  const getPlan   = m => m.membership?.plan   || m.plan   || "Basic";
  const getStatus = m => m.membership?.status || m.membershipStatus || "Active";
  const getStart  = m => fmtDate(m.membership?.startDate  || m.startedOn  || m.createdAt);
  const getRenewal= m => fmtDate(m.membership?.renewalDate || m.nextRenewal) ;
  const getPhone  = m => m.phone || m.membership?.phone || "";

  const filtered = members.filter(m => {
    const q = search.toLowerCase();
    const matchQ = !q || m.name?.toLowerCase().includes(q) || m.email?.toLowerCase().includes(q);
    const matchS = statusFilter === "All" || getStatus(m) === statusFilter;
    const matchP = planFilter   === "All" || getPlan(m)   === planFilter;
    return matchQ && matchS && matchP;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems  = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

  const totalMembers  = members.length;
  const activeCount   = members.filter(m => getStatus(m) === "Active").length;
  const expiringCount = members.filter(m => {
    const r = m.membership?.renewalDate || m.nextRenewal;
    if (!r) return false;
    const diff = new Date(r) - new Date();
    return diff > 0 && diff < 30 * 864e5;
  }).length;

  const initials = name => (name||"?").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();

  const PLAN_BADGE = {
    Basic:      "bg-[#2A2A2A] text-gray-300",
    Pro:        "bg-[#C7E36B]/15 text-[#C7E36B] border border-[#C7E36B]/30",
    Enterprise: "bg-purple-500/15 text-purple-400 border border-purple-500/30",
    Free:       "bg-white/10 text-gray-400",
  };
  const STATUS_BADGE = {
    Active:  "bg-green-600 text-white",
    Expired: "bg-red-500 text-white",
    Pending: "bg-orange-500 text-white",
    Paused:  "bg-gray-600 text-white",
  };

  const handleExport = () => {
    if (exportFmt === "csv") {
      const hdr = ["Name","Email","Phone","Plan","Status","Started On","Next Renewal"];
      const body = filtered.map(m => [m.name,m.email,getPhone(m),getPlan(m),getStatus(m),getStart(m),getRenewal(m)].map(v=>`"${(v||"").replace(/"/g,'""')}"`).join(","));
      const blob = new Blob([[hdr.join(","), ...body].join("\n")], {type:"text/csv"});
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "members.csv"; a.click();
    } else {
      alert("XLSX export requires a server-side endpoint. Use CSV for client-side export.");
    }
    setShowExport(false);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Membership</h1>
          <p className="text-sm text-gray-400 mt-1">Manage Membership plan and monitor member activity.</p>
        </div>
        <button onClick={() => setShowExport(true)} className="flex items-center gap-2 border border-white/20 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-white/5 transition-all">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label:"Total Members",      value: totalMembers,  icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="1.5" strokeLinecap="round"><path d="M12 15c-4.4 0-8 2.4-8 4v1h16v-1c0-1.6-3.6-4-8-4z"/><circle cx="12" cy="8" r="4"/></svg> },
          { label:"Active Members",     value: activeCount,   icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="1.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> },
          { label:"Expiring This Month",value: expiringCount, icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
        ].map(s => (
          <div key={s.label} className="bg-[#111315] border border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <div className="shrink-0">{s.icon}</div>
            <div>
              <p className="text-xs text-gray-400 mb-1">{s.label}</p>
              <p className="text-3xl font-black text-white">{s.value.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-[#111315] border border-white/10 rounded-2xl p-4 mb-5 flex items-center gap-4 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search by name or email..."
            className="w-full bg-transparent pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 outline-none"/>
        </div>
        {/* Status dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 whitespace-nowrap">All statuses</span>
          <div className="relative">
            <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
              className="appearance-none bg-[#1A1D1E] border border-white/10 rounded-xl pl-3 pr-8 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/40">
              {["All","Active","Expired","Pending","Paused"].map(s => <option key={s}>{s}</option>)}
            </select>
            <svg className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>
        {/* Plan filter pills */}
        <div className="flex items-center gap-1 ml-auto">
          {["All","Basic","Pro"].map(p => (
            <button key={p} onClick={() => { setPlanFilter(p); setPage(1); }}
              className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${planFilter===p ? "bg-[#C7E36B] text-black" : "text-gray-400 hover:text-white"}`}>
              {p !== "All" && <span className="mr-1">|</span>}{p}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111315] border border-white/10 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[2fr_1fr_1fr_1.2fr_1.2fr_80px] px-5 py-3.5 border-b border-white/10">
          {["MEMBER","PLAN","STATUS","STARTED ON","NEXT RENEWAL","ACTIONS"].map(h => (
            <span key={h} className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">{h}</span>
          ))}
        </div>

        {loading ? (
          <div className="py-16 flex justify-center"><AdminLoader label="Loading Members"/></div>
        ) : pageItems.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-3xl mb-3">👥</p>
            <p className="text-sm text-gray-400">No members found</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {pageItems.map((m, i) => (
              <div key={m._id||i} className="grid grid-cols-[2fr_1fr_1fr_1.2fr_1.2fr_80px] px-5 py-4 items-center hover:bg-white/[0.03] transition-all">
                {/* Member */}
                <div className="flex items-center gap-3">
                  {m.avatar
                    ? <img src={m.avatar} alt="" className="w-9 h-9 rounded-full object-cover shrink-0"/>
                    : <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-xs font-bold text-white shrink-0">{initials(m.name)}</div>
                  }
                  <div>
                    <p className="text-sm font-semibold text-white">{m.name}</p>
                    <p className="text-xs text-gray-500">{m.email}</p>
                  </div>
                </div>
                {/* Plan */}
                <span className={`inline-flex items-center text-xs font-bold px-3 py-1 rounded-md w-fit ${PLAN_BADGE[getPlan(m)] || "bg-white/10 text-gray-400"}`}>{getPlan(m)}</span>
                {/* Status */}
                <span className={`inline-flex items-center text-xs font-bold px-3 py-1 rounded-md w-fit ${STATUS_BADGE[getStatus(m)] || "bg-white/10 text-gray-300"}`}>{getStatus(m)}</span>
                {/* Started On */}
                <span className="text-sm text-gray-300">{getStart(m)}</span>
                {/* Next Renewal */}
                <span className="text-sm text-gray-300">{getRenewal(m)}</span>
                {/* Action */}
                <button onClick={() => setViewMember(m)} className="border border-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-lg hover:bg-white/10 transition-all w-fit">View</button>
              </div>
            ))}
          </div>
        )}

        {/* Pagination footer */}
        {filtered.length > 0 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-white/10">
            <p className="text-xs text-gray-500">Showing {(page-1)*PER_PAGE+1}–{Math.min(page*PER_PAGE, filtered.length)} of {filtered.length}</p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:border-white/30 disabled:opacity-30 transition-all">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              {Array.from({length: Math.min(totalPages, 5)}, (_, i) => {
                const n = i+1;
                return (
                  <button key={n} onClick={() => setPage(n)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold transition-all ${page===n ? "bg-[#C7E36B] text-black" : "border border-white/10 text-gray-400 hover:border-white/30"}`}>
                    {n}
                  </button>
                );
              })}
              {totalPages > 5 && <span className="text-gray-600 px-1">…</span>}
              {totalPages > 5 && (
                <button onClick={() => setPage(totalPages)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold transition-all ${page===totalPages ? "bg-[#C7E36B] text-black" : "border border-white/10 text-gray-400 hover:border-white/30"}`}>
                  {totalPages}
                </button>
              )}
              <button onClick={() => setPage(p => Math.min(totalPages,p+1))} disabled={page===totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:border-white/30 disabled:opacity-30 transition-all">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── MEMBER DETAILS MODAL ── */}
      {viewMember && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={e => e.target===e.currentTarget && setViewMember(null)}>
          <div className="bg-[#111315] border border-white/10 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4">
              <h2 className="text-lg font-bold text-white">Member Details</h2>
              <button onClick={() => setViewMember(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-400 hover:text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            {/* Avatar + identity */}
            <div className="px-6 pb-4 flex items-start justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                {viewMember.avatar
                  ? <img src={viewMember.avatar} alt="" className="w-12 h-12 rounded-full object-cover"/>
                  : <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-sm font-bold text-white">{initials(viewMember.name)}</div>
                }
                <div>
                  <p className="text-base font-bold text-white">{viewMember.name}</p>
                  <p className="text-xs text-gray-400">{viewMember.email}</p>
                  {getPhone(viewMember) && <p className="text-xs text-gray-400">{getPhone(viewMember)}</p>}
                </div>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-lg shrink-0 ${STATUS_BADGE[getStatus(viewMember)] || "bg-white/10 text-gray-300"}`}>{getStatus(viewMember)}</span>
            </div>
            {/* Detail rows */}
            <div className="px-4 py-2 space-y-1">
              {[
                {
                  label:"Current Plan",
                  value: getPlan(viewMember),
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="1.8" strokeLinecap="round"><path d="M12 15c-4.4 0-8 2.4-8 4v1h16v-1c0-1.6-3.6-4-8-4z"/><circle cx="12" cy="8" r="4"/></svg>,
                  plain: true,
                },
                {
                  label:"Membership Status",
                  value: getStatus(viewMember),
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="1.8" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                  badge: STATUS_BADGE[getStatus(viewMember)],
                },
                {
                  label:"Start Date",
                  value: getStart(viewMember),
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
                  plain: true,
                },
                {
                  label:"Renewal Date",
                  value: getRenewal(viewMember),
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
                  plain: true,
                },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between bg-[#0F1112] border border-white/5 rounded-xl px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    {r.icon}
                    <span className="text-sm text-white">{r.label}</span>
                  </div>
                  {r.badge
                    ? <span className={`text-xs font-bold px-3 py-1 rounded-lg ${r.badge}`}>{r.value}</span>
                    : <span className="text-sm font-bold text-white">{r.value}</span>
                  }
                </div>
              ))}
            </div>
            <div className="h-4"/>
          </div>
        </div>
      )}

      {/* ── EXPORT MODAL ── */}
      {showExport && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={e => e.target===e.currentTarget && setShowExport(false)}>
          <div className="bg-[#111315] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <h2 className="text-lg font-bold text-white">Export Members</h2>
              <button onClick={() => setShowExport(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-400 hover:text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-gray-400 mb-6">Choose the data you want to export and the format for your file.</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">FILE FORMAT</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id:"csv",  label:"CSV",          desc:"Export data in CSV (Comma separated values) format." },
                  { id:"xlsx", label:"Excel (XLSX)",  desc:"Export data in Excel spreadsheet format." },
                ].map(f => (
                  <button key={f.id} onClick={() => setExportFmt(f.id)}
                    className={`border rounded-xl p-4 text-left transition-all ${exportFmt===f.id ? "border-[#C7E36B] bg-[#C7E36B]/5" : "border-white/10 hover:border-white/20"}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${exportFmt===f.id ? "border-[#C7E36B]" : "border-gray-500"}`}>
                        {exportFmt===f.id && <div className="w-2 h-2 rounded-full bg-[#C7E36B]"/>}
                      </div>
                      <span className="text-sm font-semibold text-white">{f.label}</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button onClick={() => setShowExport(false)} className="flex-1 py-3.5 text-sm font-bold border border-white/20 text-white rounded-xl hover:bg-white/5 transition-all">Cancel</button>
              <button onClick={handleExport} className="flex-1 py-3.5 text-sm font-bold bg-[#C7E36B] text-black rounded-xl hover:bg-lime-300 transition-all">Export</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── PLATFORM SETTINGS ── */
function PlatformSettings({ token }) {
  const [configs, setConfigs] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState("");
  const [tab, setTab]         = useState("email");
  const [reveal, setReveal]   = useState({});

  useEffect(() => {
    const h = { Authorization: `Bearer ${token}` };
    fetch("/api/admin/config/seed", { method: "POST", headers: h })
      .then(() => fetch("/api/admin/config", { headers: h }))
      .then(r => r.json())
      .then(data => {
        const map = {};
        data.forEach(c => { map[c.key] = { ...c, editing: "" }; });
        setConfigs(map);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  const handleChange = (key, val) => setConfigs(prev => ({ ...prev, [key]: { ...prev[key], editing: val } }));

  const saveGroup = async (group) => {
    setSaving(true); setSaved("");
    const groupKeys = Object.values(configs).filter(c => c.group === group);
    const updates = {};
    groupKeys.forEach(c => { if (c.editing !== undefined && c.editing !== "") updates[c.key] = c.editing; });
    if (Object.keys(updates).length === 0) { setSaving(false); setSaved("No changes to save."); setTimeout(() => setSaved(""), 3000); return; }
    const res = await fetch("/api/admin/config", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      setSaved("Saved successfully!");
      setConfigs(prev => {
        const next = { ...prev };
        Object.keys(updates).forEach(k => { next[k] = { ...next[k], editing: "", hasValue: true }; });
        return next;
      });
    } else setSaved("Save failed.");
    setSaving(false);
    setTimeout(() => setSaved(""), 3000);
  };

  const revealSecret = async (key) => {
    if (key in reveal) { setReveal(r => { const n = { ...r }; delete n[key]; return n; }); return; }
    const res = await fetch(`/api/admin/config/${key}`, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) return;
    const data = await res.json();
    setReveal(r => ({ ...r, [key]: data.value ?? "" }));
  };

  const [coupons, setCoupons]               = useState([]);
  const [showCouponModal, setShowCouponModal] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowCouponModal(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);
  const [couponForm, setCouponForm]           = useState({ code:"", discountType:"flat", discountValue:"", maxUses:"0", expiresAt:"" });
  const [couponSaving, setCouponSaving]       = useState(false);

  useEffect(() => {
    if (tab === "coupons") {
      fetch("/api/coupons", { headers:{ Authorization:`Bearer ${token}` } })
        .then(r => r.ok ? r.json() : []).then(d => { if (Array.isArray(d)) setCoupons(d); }).catch(()=>{});
    }
  }, [tab, token]);

  const createCoupon = async () => {
    setCouponSaving(true);
    try {
      const res = await fetch("/api/coupons", {
        method:"POST", headers:{ "Content-Type":"application/json", Authorization:`Bearer ${token}` },
        body: JSON.stringify({ ...couponForm, code: couponForm.code.toUpperCase(), discountValue: Number(couponForm.discountValue), maxUses: Number(couponForm.maxUses) }),
      });
      if (res.ok) { const d = await res.json(); setCoupons(prev=>[d,...prev]); setShowCouponModal(false); setCouponForm({ code:"", discountType:"flat", discountValue:"", maxUses:"0", expiresAt:"" }); }
    } catch {} finally { setCouponSaving(false); }
  };

  const toggleCoupon = async (c) => {
    const res = await fetch(`/api/coupons/${c._id}`, { method:"PUT", headers:{ "Content-Type":"application/json", Authorization:`Bearer ${token}` }, body: JSON.stringify({ isActive: !c.isActive }) });
    if (res.ok) setCoupons(prev=>prev.map(x=>x._id===c._id?{...x,isActive:!x.isActive}:x));
  };

  const deleteCoupon = async (id) => {
    if (!window.confirm("Delete this coupon?")) return;
    await fetch(`/api/coupons/${id}`, { method:"DELETE", headers:{ Authorization:`Bearer ${token}` } });
    setCoupons(prev=>prev.filter(c=>c._id!==id));
  };

  const TABS = [
    { id: "email",   label: "📧 Email / SMTP"    },
    { id: "payment", label: "💳 Payment Gateway" },
    { id: "auth",    label: "🔐 Social Auth"     },
    { id: "site",    label: "🌐 Site Config"     },
    { id: "coupons",        label: "🏷 Coupons"         },
    { id: "notifications",  label: "🔔 Notifications"   },
  ];

  const [notifForm, setNotifForm]         = useState({ title:"", message:"", type:"general", recipientType:"All Students", recipientEmail:"" });
  const [notifSending, setNotifSending]   = useState(false);
  const [notifSent, setNotifSent]         = useState(false);
  const [recentNotifs, setRecentNotifs]   = useState([]);

  useEffect(() => {
    if (tab === "notifications") {
      fetch("/api/notifications", { headers:{ Authorization:`Bearer ${token}` } })
        .then(r => r.ok ? r.json() : []).then(d => { if (Array.isArray(d)) setRecentNotifs(d); }).catch(()=>{});
    }
  }, [tab]);

  const ConfigField = ({ configKey }) => {
    const c = configs[configKey];
    if (!c) return null;
    const currentVal = c.editing !== "" ? c.editing : "";
    const displayPlaceholder = c.hasValue
      ? (c.isSecret ? "••••••••  (set — type to change)" : "(already set — type to change)")
      : "Not set";
    return (
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{c.label || configKey}</p>
          {c.hasValue && <span className="text-[9px] bg-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded-full">✓ SET</span>}
        </div>
        <div className="flex gap-2">
          <input
            type={c.isSecret && !(configKey in reveal) ? "password" : "text"}
            value={configKey in reveal ? reveal[configKey] : currentVal}
            onChange={e => handleChange(configKey, e.target.value)}
            placeholder={displayPlaceholder}
            className="flex-1 bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50"
          />
          {c.isSecret && (
            <button onClick={() => revealSecret(configKey)} className="text-xs border border-white/20 text-gray-400 px-3 py-2 rounded-lg hover:text-white hover:border-white/40 shrink-0">
              {configKey in reveal ? "🙈 Hide" : "👁 Show"}
            </button>
          )}
        </div>
      </div>
    );
  };

  if (loading) return <AdminLoader label="Loading Settings" />;

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Platform Settings</h1>
        <p className="text-xs text-gray-400 mt-1">Configure credentials, keys, and site information. Changes take effect immediately.</p>
      </div>

      <div className="flex gap-1 mb-6 border-b border-white/10">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2 text-sm font-medium border-b-2 transition-all -mb-px ${tab === t.id ? "border-[#C7E36B] text-[#C7E36B]" : "border-transparent text-gray-400 hover:text-white"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "email" && (
        <div className="space-y-5">
          <div className="bg-[#C7E36B]/5 border border-[#C7E36B]/20 rounded-xl p-4 text-xs text-[#C7E36B]">
            <p className="font-bold mb-1">How to get a Gmail App Password:</p>
            <ol className="list-decimal list-inside space-y-0.5 text-[#C7E36B]/80">
              <li>Go to <strong>Google Account → Security → 2-Step Verification</strong></li>
              <li>Scroll to <strong>App Passwords</strong></li>
              <li>Select app: <strong>Mail</strong>, device: <strong>Other</strong>, name: <strong>AIFA</strong></li>
              <li>Copy the 16-character password and paste below</li>
            </ol>
          </div>
          <ConfigField configKey="EMAIL_USER"/>
          <ConfigField configKey="EMAIL_PASS"/>
          <ConfigField configKey="EMAIL_FROM_NAME"/>
          <div className="pt-2 flex items-center justify-between">
            {saved && <p className={`text-xs ${saved.includes("fail") ? "text-red-400" : "text-green-400"}`}>{saved}</p>}
            <div className="ml-auto flex gap-2">
              <button onClick={async () => {
                const res = await fetch("/api/auth/forgot-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "test@aifa.co.in" }) });
                alert(res.ok ? "Test email triggered! Check inbox." : "Email test failed — check credentials.");
              }} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg hover:bg-white/5">Send Test Email</button>
              <button onClick={() => saveGroup("email")} disabled={saving} className="text-xs bg-[#C7E36B] text-black font-bold px-5 py-2 rounded-lg disabled:opacity-60">{saving ? "Saving…" : "Save Email Settings"}</button>
            </div>
          </div>
        </div>
      )}

      {tab === "payment" && (
        <div className="space-y-5">
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 text-xs text-blue-300">
            <p className="font-bold mb-1">Where to find your Razorpay keys:</p>
            <ol className="list-decimal list-inside space-y-0.5 text-blue-300/80">
              <li>Login to <strong>dashboard.razorpay.com</strong></li>
              <li>Go to <strong>Settings → API Keys</strong></li>
              <li>Click <strong>Generate Test Key</strong> or <strong>Generate Live Key</strong></li>
              <li>Copy the Key ID and Key Secret below</li>
            </ol>
          </div>
          <ConfigField configKey="RAZORPAY_KEY_ID"/>
          <ConfigField configKey="RAZORPAY_KEY_SECRET"/>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Test Mode</p>
              <p className="text-xs text-gray-400">Use test keys — no real money charged</p>
            </div>
            <Tog value={configs["RAZORPAY_TEST_MODE"]?.value === "true"} onChange={v => handleChange("RAZORPAY_TEST_MODE", v ? "true" : "false")}/>
          </div>
          <div className="pt-2 flex items-center justify-between">
            {saved && <p className={`text-xs ${saved.includes("fail") ? "text-red-400" : "text-green-400"}`}>{saved}</p>}
            <button onClick={() => saveGroup("payment")} disabled={saving} className="ml-auto text-xs bg-[#C7E36B] text-black font-bold px-5 py-2 rounded-lg disabled:opacity-60">{saving ? "Saving…" : "Save Payment Settings"}</button>
          </div>
        </div>
      )}

      {tab === "auth" && (
        <div className="space-y-5">
          <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4 text-xs text-orange-300">
            <p className="font-bold mb-1">How to get a Google Client ID:</p>
            <ol className="list-decimal list-inside space-y-0.5 text-orange-300/80">
              <li>Go to <strong>console.cloud.google.com</strong></li>
              <li>Create a project → <strong>APIs & Services → Credentials</strong></li>
              <li>Click <strong>Create Credentials → OAuth 2.0 Client ID</strong></li>
              <li>Application type: <strong>Web application</strong></li>
              <li>Add your Vercel URL to <strong>Authorized JavaScript origins</strong></li>
              <li>Copy the Client ID below</li>
            </ol>
          </div>
          <ConfigField configKey="GOOGLE_CLIENT_ID"/>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs text-gray-400">
              <strong className="text-white">Note:</strong> After saving, also add <code className="text-[#C7E36B]">VITE_GOOGLE_CLIENT_ID</code> to your <strong>Vercel environment variables</strong> and redeploy the frontend for the Google login button to activate.
            </p>
          </div>

          <div className="border-t border-white/10 pt-5">
            <p className="text-xs font-bold text-gray-300 mb-3">📱 Phone OTP (Twilio)</p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-gray-400 mb-3">
              <p className="font-bold text-white mb-1">How to get Twilio credentials:</p>
              <ol className="list-decimal list-inside space-y-0.5">
                <li>Sign up free at <strong className="text-white">twilio.com</strong></li>
                <li>Go to <strong className="text-white">Console → Account Info</strong></li>
                <li>Copy <strong className="text-white">Account SID</strong> and <strong className="text-white">Auth Token</strong></li>
                <li>Get a phone number: <strong className="text-white">Phone Numbers → Manage → Buy</strong></li>
              </ol>
            </div>
            <div className="space-y-3">
              <ConfigField configKey="TWILIO_SID"/>
              <ConfigField configKey="TWILIO_TOKEN"/>
              <ConfigField configKey="TWILIO_PHONE"/>
            </div>
          </div>

          <div className="border-t border-white/10 pt-5">
            <p className="text-xs font-bold text-gray-300 mb-3">🤖 Cloudflare Turnstile (CAPTCHA)</p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-gray-400 mb-3">
              <p className="font-bold text-white mb-1">How to get Turnstile keys:</p>
              <ol className="list-decimal list-inside space-y-0.5">
                <li>Go to <strong className="text-white">dash.cloudflare.com → Turnstile</strong> (free)</li>
                <li>Click <strong className="text-white">Add Site</strong> → enter your domain</li>
                <li>Copy the <strong className="text-white">Site Key</strong> (public) and <strong className="text-white">Secret Key</strong> below</li>
                <li>Widget type: <strong className="text-white">Managed</strong> (recommended)</li>
              </ol>
            </div>
            <div className="space-y-3">
              <ConfigField configKey="TURNSTILE_SITE_KEY"/>
              <ConfigField configKey="TURNSTILE_SECRET_KEY"/>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            {saved && <p className={`text-xs ${saved.includes("fail") ? "text-red-400" : "text-green-400"}`}>{saved}</p>}
            <button onClick={() => saveGroup("auth")} disabled={saving} className="ml-auto text-xs bg-[#C7E36B] text-black font-bold px-5 py-2 rounded-lg disabled:opacity-60">{saving ? "Saving…" : "Save Auth Settings"}</button>
          </div>
        </div>
      )}

      {tab === "site" && (
        <div className="space-y-5">
          <ConfigField configKey="SITE_NAME"/>
          <ConfigField configKey="SITE_URL"/>
          <ConfigField configKey="SUPPORT_EMAIL"/>
          <div className="pt-2 flex items-center justify-between">
            {saved && <p className={`text-xs ${saved.includes("fail") ? "text-red-400" : "text-green-400"}`}>{saved}</p>}
            <button onClick={() => saveGroup("site")} disabled={saving} className="ml-auto text-xs bg-[#C7E36B] text-black font-bold px-5 py-2 rounded-lg disabled:opacity-60">{saving ? "Saving…" : "Save Site Settings"}</button>
          </div>
        </div>
      )}

      {tab === "coupons" && (
        <div>
          {showCouponModal && (
            <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-16 px-4" onClick={() => setShowCouponModal(false)}>
              <div className="bg-[#0F1112] border border-white/10 rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-5">
                  <p className="text-white font-bold">Create Coupon</p>
                  <button onClick={() => setShowCouponModal(false)} className="text-gray-400 hover:text-white text-xl">✕</button>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1.5">Coupon Code</p>
                    <input value={couponForm.code} onChange={e => setCouponForm(f=>({...f, code:e.target.value.toUpperCase()}))} placeholder="e.g. SAVE500" className="w-full bg-[#1A1D1E] border border-white/15 rounded-xl px-4 py-3 text-white text-sm font-mono uppercase outline-none focus:border-[#C7E36B]"/>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-semibold mb-2">Discount Type</p>
                    <div className="flex gap-2">
                      {[["flat","Flat ₹"],["percent","Percent %"]].map(([v,l]) => (
                        <button key={v} onClick={() => setCouponForm(f=>({...f,discountType:v}))} className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${couponForm.discountType===v?"border-[#C7E36B] bg-[#C7E36B]/10 text-[#C7E36B]":"border-white/15 text-gray-400"}`}>{l}</button>
                      ))}
                    </div>
                  </div>
                  <Fld label="Discount Value" value={couponForm.discountValue} onChange={v=>setCouponForm(f=>({...f,discountValue:v}))} placeholder={couponForm.discountType==="flat"?"e.g. 700":"e.g. 10"}/>
                  <Fld label="Max Uses (0 = unlimited)" value={couponForm.maxUses} onChange={v=>setCouponForm(f=>({...f,maxUses:v}))} placeholder="0"/>
                  <Fld label="Expires At (optional)" value={couponForm.expiresAt} onChange={v=>setCouponForm(f=>({...f,expiresAt:v}))} placeholder="YYYY-MM-DD"/>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button onClick={() => setShowCouponModal(false)} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg hover:bg-white/5">CANCEL</button>
                  <button onClick={createCoupon} disabled={couponSaving} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300 disabled:opacity-60">{couponSaving?"Creating...":"CREATE COUPON"}</button>
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between mb-5">
            <div><h2 className="text-lg font-bold text-white">Discount Coupons</h2><p className="text-xs text-gray-400">Create and manage promotional coupon codes</p></div>
            <button onClick={() => setShowCouponModal(true)} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300 flex items-center gap-1"><I name="plus" size={13}/>Create Coupon</button>
          </div>
          {coupons.length === 0 ? (
            <div className="text-center py-10 text-gray-500 text-sm">No coupons yet. Create your first one!</div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-white/10 text-gray-400">{["Code","Type","Value","Used/Max","Expires","Active","Actions"].map(h=><th key={h} className="text-left px-4 py-3 font-semibold">{h}</th>)}</tr></thead>
                <tbody>
                  {coupons.map(c => (
                    <tr key={c._id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03]">
                      <td className="px-4 py-3"><code className="bg-[#C7E36B]/10 text-[#C7E36B] font-mono px-2 py-0.5 rounded font-bold">{c.code}</code></td>
                      <td className="px-4 py-3 text-gray-400">{c.discountType === "flat" ? "Flat ₹" : "Percent %"}</td>
                      <td className="px-4 py-3 text-white font-semibold">{c.discountType === "flat" ? `₹${c.discountValue}` : `${c.discountValue}%`}</td>
                      <td className="px-4 py-3 text-gray-400">{c.usedCount}/{c.maxUses === 0 ? "∞" : c.maxUses}</td>
                      <td className="px-4 py-3 text-gray-400">{c.expiresAt ? new Date(c.expiresAt).toLocaleDateString("en-IN") : "No expiry"}</td>
                      <td className="px-4 py-3"><Tog value={c.isActive} onChange={() => toggleCoupon(c)}/></td>
                      <td className="px-4 py-3"><button onClick={() => deleteCoupon(c._id)} className="text-gray-400 hover:text-red-400"><I name="trash" size={13}/></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {tab === "notifications" && (
        <div className="space-y-6">
          {/* Send form */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
            <h2 className="text-base font-bold text-white">Send Notification</h2>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1.5">Recipient</p>
              <select value={notifForm.recipientType} onChange={e=>setNotifForm(f=>({...f,recipientType:e.target.value}))} className="w-full bg-[#1A1D1E] border border-white/15 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#C7E36B]">
                {["All Students","Bootcamp Students Only","Specific Email"].map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
            {notifForm.recipientType === "Specific Email" && (
              <Fld label="Email Address" value={notifForm.recipientEmail} onChange={v=>setNotifForm(f=>({...f,recipientEmail:v}))} placeholder="student@example.com"/>
            )}
            <Fld label="Title" value={notifForm.title} onChange={v=>setNotifForm(f=>({...f,title:v}))} placeholder="e.g. New session recording uploaded"/>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1.5">Message</p>
              <textarea value={notifForm.message} onChange={e=>setNotifForm(f=>({...f,message:e.target.value}))} rows={3} placeholder="Write your notification message..." className="w-full bg-[#1A1D1E] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#C7E36B]/50 resize-none placeholder-gray-600"/>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-semibold mb-2">Type</p>
              <div className="flex gap-2 flex-wrap">
                {[["session","📅 Session"],["announcement","📢 Announcement"],["resource","📚 Resource"],["general","⚠️ General"]].map(([v,l])=>(
                  <button key={v} onClick={()=>setNotifForm(f=>({...f,type:v}))} className={`text-xs px-3 py-1.5 rounded-lg font-semibold border transition-all ${notifForm.type===v?"bg-[#C7E36B] text-black border-[#C7E36B]":"border-white/20 text-gray-400 hover:border-white/40"}`}>{l}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-1">
              {notifSent && <span className="text-green-400 text-xs font-semibold">✓ Notification sent!</span>}
              <button onClick={async()=>{
                if(!notifForm.title.trim()) return;
                setNotifSending(true);
                try {
                  const body = { title:notifForm.title, message:notifForm.message, type:notifForm.type };
                  if (notifForm.recipientType === "Specific Email" && notifForm.recipientEmail) {
                    const u = await fetch("/api/users",{headers:{Authorization:`Bearer ${token}`}}).then(r=>r.json());
                    const found = Array.isArray(u) ? u.find(x=>x.email===notifForm.recipientEmail) : null;
                    if (found) body.userIds = [found._id];
                    else { alert("User with that email not found."); setNotifSending(false); return; }
                  }
                  await fetch("/api/notifications/broadcast",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},body:JSON.stringify(body)});
                  setNotifForm(f=>({...f,title:"",message:""}));
                  setNotifSent(true); setTimeout(()=>setNotifSent(false),2000);
                  fetch("/api/notifications",{headers:{Authorization:`Bearer ${token}`}}).then(r=>r.json()).then(d=>{if(Array.isArray(d))setRecentNotifs(d);}).catch(()=>{});
                } catch { alert("Failed to send notification."); }
                setNotifSending(false);
              }} disabled={notifSending || !notifForm.title.trim()} className="ml-auto text-xs bg-[#C7E36B] text-black font-bold px-5 py-2.5 rounded-xl hover:bg-lime-300 disabled:opacity-60">
                {notifSending ? "Sending..." : "Send Notification"}
              </button>
            </div>
          </div>

          {/* Recent broadcasts */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3">Recent Broadcasts</h3>
            {recentNotifs.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-6">No notifications sent yet.</p>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-white/10 text-gray-400">{["Title","Type","Sent To","Date"].map(h=><th key={h} className="text-left px-4 py-3 font-semibold">{h}</th>)}</tr></thead>
                  <tbody>
                    {recentNotifs.slice(0,20).map((n,i)=>(
                      <tr key={n._id||i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03]">
                        <td className="px-4 py-3 text-white font-medium max-w-[200px] truncate">{n.title}</td>
                        <td className="px-4 py-3"><span className="capitalize text-gray-400">{n.type}</span></td>
                        <td className="px-4 py-3 text-gray-400">{n.user?.email || "All students"}</td>
                        <td className="px-4 py-3 text-gray-500">{new Date(n.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Placeholder({ title }) {
  return (
    <div className="flex items-center justify-center h-48 text-gray-500">
      <div className="text-center"><p className="text-3xl mb-2">🚧</p><p className="font-semibold text-white text-sm">{title}</p><p className="text-xs mt-1">Coming soon</p></div>
    </div>
  );
}

/* ── ADMIN PROFILE ── */
function AdminProfile({ token, profile, onUpdated }) {
  const [editing, setEditing]     = useState(false);
  const [name, setName]           = useState(profile?.name || "");
  const [saving, setSaving]       = useState(false);
  const [msg, setMsg]             = useState("");
  const [current, setCurrent]     = useState("");
  const [newPwd, setNewPwd]       = useState("");
  const [confirm, setConfirm]     = useState("");
  const [pwdMsg, setPwdMsg]       = useState("");
  const [pwdSaving, setPwdSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const memberId = `AIFA-ADMIN-${String(profile?._id || "00001").slice(-5).toUpperCase()}`;

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("avatar", file);
    try {
      const res = await fetch("/api/users/me/avatar", { method:"PUT", headers:{ Authorization:`Bearer ${token}` }, body:fd });
      const data = await res.json();
      if (res.ok) { onUpdated(data.user); }
    } catch {}
    setUploading(false);
  };

  const handleSave = async () => {
    setSaving(true); setMsg("");
    const res = await fetch("/api/users/me", { method:"PUT", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}, body:JSON.stringify({ name }) });
    const data = await res.json();
    if (res.ok) { onUpdated(data); localStorage.setItem("aifa_user", JSON.stringify({ name:data.name, _id:data._id, role:data.role })); setMsg("Saved!"); setEditing(false); }
    else setMsg(data.message || "Failed.");
    setSaving(false);
  };

  const handlePwd = async () => {
    if (!current || !newPwd || !confirm) { setPwdMsg("Fill all fields."); return; }
    if (newPwd !== confirm) { setPwdMsg("Passwords don't match."); return; }
    if (newPwd.length < 6) { setPwdMsg("Min 6 characters."); return; }
    setPwdSaving(true); setPwdMsg("");
    const res = await fetch("/api/users/me/password", { method:"PUT", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}, body:JSON.stringify({ currentPassword:current, newPassword:newPwd }) });
    const data = await res.json();
    setPwdMsg(res.ok ? "Password updated!" : data.message || "Failed.");
    if (res.ok) { setCurrent(""); setNewPwd(""); setConfirm(""); }
    setPwdSaving(false);
  };

  return (
    <div className="p-6 max-w-2xl space-y-5">
      <h1 className="text-xl font-bold text-white">Admin Profile</h1>

      {/* Identity card */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <div className="flex items-center gap-4 mb-5">
          <div className="relative">
            <div className="w-14 h-14 rounded-full overflow-hidden">
              {profile?.profilePicture
                ? <img src={profile.profilePicture} alt="avatar" className="w-full h-full object-cover" />
                : <span className="w-full h-full bg-[#C7E36B] flex items-center justify-center text-black text-xl font-bold">{(profile?.name||"A")[0]}</span>
              }
            </div>
            {uploading && <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/></div>}
            <button onClick={() => fileRef.current?.click()} disabled={uploading} className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#C7E36B] rounded-full flex items-center justify-center hover:bg-lime-300 transition-all" title="Change photo">
              <I name="edit" size={10} className="text-black" />
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </div>
          <div>
            <p className="text-sm font-bold text-white">{profile?.name}</p>
            <p className="text-xs text-gray-400">{profile?.email}</p>
            <span className="text-[10px] bg-[#C7E36B]/20 text-[#C7E36B] font-bold px-2 py-0.5 rounded-full mt-1 inline-block">Super Admin</span>
          </div>
        </div>
        <div className="flex gap-6 mb-4 text-xs text-gray-400">
          <div><p className="text-[9px] text-gray-600 font-semibold uppercase mb-0.5">Member ID</p><p className="text-white font-semibold">{memberId}</p></div>
          <div><p className="text-[9px] text-gray-600 font-semibold uppercase mb-0.5">Member Since</p><p className="text-white font-semibold">{new Date(profile?.createdAt||Date.now()).toLocaleDateString("en-US",{year:"numeric",month:"long"})}</p></div>
          <div><p className="text-[9px] text-gray-600 font-semibold uppercase mb-0.5">Status</p><span className="flex items-center gap-1 text-green-400 font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-green-400"/>Active</span></div>
        </div>
        {editing ? (
          <div className="space-y-3">
            <Fld label="DISPLAY NAME" value={name} onChange={setName} />
            {msg && <p className={`text-xs ${msg==="Saved!"?"text-green-400":"text-red-400"}`}>{msg}</p>}
            <div className="flex gap-2">
              <button onClick={()=>setEditing(false)} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg disabled:opacity-60">{saving?"Saving...":"Save"}</button>
            </div>
          </div>
        ) : (
          <button onClick={()=>{ setName(profile?.name||""); setEditing(true); }} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg hover:bg-white/5 flex items-center gap-1.5"><I name="edit" size={12}/>Edit Name</button>
        )}
      </div>

      {/* Change password */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Change Password</h3>
        <div className="space-y-3 max-w-sm">
          <Fld label="CURRENT PASSWORD" value={current} onChange={setCurrent} placeholder="••••••••" />
          <Fld label="NEW PASSWORD" value={newPwd} onChange={setNewPwd} placeholder="••••••••" />
          <Fld label="CONFIRM NEW PASSWORD" value={confirm} onChange={setConfirm} placeholder="••••••••" />
          {pwdMsg && <p className={`text-xs ${pwdMsg.includes("updated")?"text-green-400":"text-red-400"}`}>{pwdMsg}</p>}
          <button onClick={handlePwd} disabled={pwdSaving} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg disabled:opacity-60">{pwdSaving?"Updating...":"Update Password"}</button>
        </div>
      </div>
    </div>
  );
}

/* ── CERTIFICATES ADMIN ── */
const CERT_NAV = [
  { key:"templates",  label:"Templates" },
  { key:"issued",     label:"Issued Certificates" },
  { key:"settings",   label:"Settings" },
  { key:"assignments",label:"Assignments" },
  { key:"live",       label:"Live Classes" },
  { key:"resources",  label:"Resources" },
];

function CertificatesAdmin({ token }) {
  const [certTab, setCertTab]   = useState("templates");
  const [certs, setCerts]       = useState([]);
  const [users, setUsers]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving]     = useState(false);
  const [msg, setMsg]           = useState("");
  const [form, setForm]         = useState({ userId:"", title:"Certificate of Achievement", courseTitle:"", itemType:"course" });
  const [autoIssue, setAutoIssue]           = useState(false);
  const [manualApproval, setManualApproval] = useState(false);
  const [idFormat, setIdFormat]             = useState("AIFA-[YEAR]-[ID]");
  const [editingFormat, setEditingFormat]   = useState(false);
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [certSearch, setCertSearch]         = useState("");
  const [certTypeFilter, setCertTypeFilter] = useState("All");

  const h = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("/api/certificates", { headers: h }).then(r => r.json()),
      fetch("/api/users",        { headers: h }).then(r => r.json()),
      fetch("/api/cert-settings",{ headers: h }).then(r => r.json()),
    ]).then(([cData, uData, sData]) => {
      if (Array.isArray(cData)) setCerts(cData);
      if (Array.isArray(uData)) setUsers(uData.filter(u => u.role !== "admin"));
      if (sData && !sData.message) {
        setAutoIssue(!!sData.autoIssue);
        setManualApproval(!!sData.manualApproval);
        if (sData.idFormat) setIdFormat(sData.idFormat);
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, [token]);

  const saveSettings = async (patch) => {
    setSettingsSaving(true);
    try {
      await fetch("/api/cert-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...h },
        body: JSON.stringify(patch),
      });
    } catch {}
    setSettingsSaving(false);
  };

  const toggleAutoIssue = (val) => { setAutoIssue(val); saveSettings({ autoIssue: val }); };
  const toggleManualApproval = (val) => { setManualApproval(val); saveSettings({ manualApproval: val }); };
  const saveIdFormat = () => { setEditingFormat(false); saveSettings({ idFormat }); };

  const handleIssue = async () => {
    if (!form.userId || !form.courseTitle) { setMsg("Select student and enter course title."); return; }
    setSaving(true); setMsg("");
    const res = await fetch("/api/certificates", { method:"POST", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}, body:JSON.stringify(form) });
    const data = await res.json();
    if (res.ok) {
      /* Enrich newly-created cert with populated user so table shows name immediately */
      const issuedUser = users.find(u => u._id === form.userId) || null;
      setCerts(c=>[{ ...data, user: issuedUser }, ...c]);
      setShowForm(false); setMsg(""); setForm({ userId:"", title:"Certificate of Achievement", courseTitle:"", itemType:"course" });
    }
    else setMsg(data.message || "Failed.");
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Revoke this certificate?")) return;
    await fetch(`/api/certificates/${id}`, { method:"DELETE", headers: h });
    setCerts(cs => cs.filter(c => c._id !== id));
  };

  const handleApprove = async (id) => {
    const res = await fetch(`/api/certificates/${id}/approve`, { method:"PUT", headers: h });
    if (res.ok) setCerts(cs => cs.map(c => c._id === id ? { ...c, status: "active" } : c));
  };

  const [statusFilter, setStatusFilter] = useState("All");
  const [certPage, setCertPage]         = useState(1);
  const [viewCert, setViewCert]         = useState(null);
  const [previewTpl, setPreviewTpl]     = useState(null); // "bootcamp" | "course" | "workshop"
  const PAGE_SIZE = 6;

  const typeBadge = t => t==="bootcamp"?"bg-blue-500/20 text-blue-400":t==="workshop"?"bg-purple-500/20 text-purple-400":"bg-green-500/20 text-green-400";

  const fmtDate = d => d ? new Date(d).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}) : "—";

  return (
    <div className={`flex h-full min-h-0 ${viewCert ? "overflow-hidden" : ""}`}>
    {/* Main content */}
    <div className={`flex-1 p-6 overflow-y-auto transition-all ${viewCert ? "mr-[380px]" : ""}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-white">{certTab === "template" ? "Certificate Templates" : "Certificates"}</h1>
          <p className="text-xs text-gray-400 mt-0.5">{certTab === "template" ? "Manage the templates used for automatically generated certificates." : "View and manage certificates issued for Bootcamp and Video Courses."}</p>
        </div>
        {certTab === "users" && !showForm && (
          <button onClick={() => setShowForm(true)} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300 transition">
            Issue Certificate
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-0 mb-6 border-b border-white/10">
        {[{key:"users",label:"Users"},{key:"template",label:"Certificate Template"}].map(t => (
          <button key={t.key} onClick={() => { setCertTab(t.key); setShowForm(false); setCertPage(1); setViewCert(null); }}
            className={`px-5 py-2.5 text-sm font-medium border-b-2 transition-all -mb-px ${certTab===t.key?"border-[#C7E36B] text-[#C7E36B]":"border-transparent text-gray-400 hover:text-white"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── USERS TAB ── */}
      {certTab === "users" && (
        <div>
          {/* Issue form */}
          {showForm && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6 max-w-lg space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">Issue New Certificate</h3>
                <button onClick={() => { setShowForm(false); setMsg(""); }} className="text-gray-500 hover:text-white text-xs">← Back</button>
              </div>
              {msg && <p className="text-xs text-red-400">{msg}</p>}
              <div>
                <p className="text-[10px] text-gray-400 mb-1 font-semibold uppercase">Student</p>
                <select value={form.userId} onChange={e=>setForm({...form,userId:e.target.value})} className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/50">
                  <option value="">Select student...</option>
                  {users.map(u=><option key={u._id} value={u._id}>{u.name} ({u.email})</option>)}
                </select>
              </div>
              <Fld label="Certificate Title" value={form.title} onChange={v=>setForm({...form,title:v})} />
              <Fld label="Course / Program Title" value={form.courseTitle} onChange={v=>setForm({...form,courseTitle:v})} placeholder="e.g. AI Filmmaking Bootcamp" />
              <div>
                <p className="text-[10px] text-gray-400 mb-1 font-semibold uppercase">Type</p>
                <select value={form.itemType} onChange={e=>setForm({...form,itemType:e.target.value})} className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/50">
                  <option value="course">Course</option>
                  <option value="workshop">Workshop</option>
                  <option value="bootcamp">Bootcamp</option>
                </select>
              </div>
              <div className="flex gap-2 pt-1">
                <button onClick={() => { setShowForm(false); setMsg(""); }} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg">Cancel</button>
                <button onClick={handleIssue} disabled={saving} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg disabled:opacity-60">{saving?"Issuing...":"Issue Certificate"}</button>
              </div>
            </div>
          )}

          {!showForm && (
            <>
              {/* Filters */}
              <div className="flex flex-wrap gap-3 mb-5 items-end">
                <div className="flex-1 min-w-[220px]">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1.5">Search</p>
                  <div className="relative">
                    <I name="search" size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
                    <input value={certSearch} onChange={e=>{setCertSearch(e.target.value);setCertPage(1);}} placeholder="Search by student name, phone, email or certificate ID"
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-white/20"/>
                  </div>
                </div>
                <div className="min-w-[160px]">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1.5">Workshop</p>
                  <select value={certTypeFilter} onChange={e=>{setCertTypeFilter(e.target.value);setCertPage(1);}} className="w-full bg-white/5 border border-white/10 text-gray-300 text-sm rounded-lg px-3 py-2.5 outline-none">
                    <option value="All">All Workshops</option>
                    <option value="course">Video Course</option>
                    <option value="workshop">Workshop</option>
                    <option value="bootcamp">Bootcamp</option>
                  </select>
                </div>
                <div className="min-w-[140px]">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1.5">Certificate Type</p>
                  <select value={statusFilter} onChange={e=>{setStatusFilter(e.target.value);setCertPage(1);}} className="w-full bg-white/5 border border-white/10 text-gray-300 text-sm rounded-lg px-3 py-2.5 outline-none">
                    <option value="All">Workshop Type</option>
                    <option value="active">Generated</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              {loading ? <AdminLoader /> : (() => {
                const filtered = certs.filter(c => {
                  const q = certSearch.toLowerCase();
                  const matchQ = !q || (c.user?.name||"").toLowerCase().includes(q) || (c.courseTitle||"").toLowerCase().includes(q);
                  const matchT = certTypeFilter==="All" || c.itemType===certTypeFilter;
                  const matchS = statusFilter==="All" || c.status===statusFilter;
                  return matchQ && matchT && matchS;
                });
                const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
                const page = Math.min(certPage, totalPages);
                const pageData = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);
                const start = filtered.length===0 ? 0 : (page-1)*PAGE_SIZE+1;
                const end   = Math.min(page*PAGE_SIZE, filtered.length);
                return (
                  <>
                    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="text-[10px] text-gray-500 font-bold uppercase tracking-wider bg-white/5">
                            {["Student","Workshop","Certificate Type","Certificate ID","Issued On","Status","Action"].map(col=>(
                              <th key={col} className="text-left px-4 py-3 whitespace-nowrap">{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {pageData.length === 0 ? (
                            <tr><td colSpan={7} className="px-4 py-10 text-center text-gray-500 text-sm">{certs.length===0?"No certificates issued yet":"No certificates match your filters"}</td></tr>
                          ) : pageData.map(c => {
                            const isGenerated = c.status === "active";
                            const isPending   = c.status === "pending";
                            return (
                              <tr key={c._id} className="hover:bg-white/5 transition-all">
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-full bg-[#C7E36B]/20 text-[#C7E36B] font-bold text-xs flex items-center justify-center shrink-0">{(c.user?.name||"?")[0].toUpperCase()}</div>
                                    <div>
                                      <p className="text-xs font-semibold text-white leading-tight">{c.user?.name||"—"}</p>
                                      <p className="text-[10px] text-gray-500 leading-tight">{c.user?.email||""}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-300 max-w-[180px] truncate">{c.courseTitle}</td>
                                <td className="px-4 py-3">
                                  <span className={`text-[10px] font-bold capitalize px-2.5 py-1 rounded-full ${typeBadge(c.itemType)}`}>{c.itemType}</span>
                                </td>
                                <td className="px-4 py-3 text-[11px] text-gray-400 font-mono whitespace-nowrap">{c.certificateId || "—"}</td>
                                <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{fmtDate(c.createdAt)}</td>
                                <td className="px-4 py-3">
                                  {isGenerated && <span className="text-[10px] font-bold bg-green-500/20 text-green-400 px-2.5 py-1 rounded-full">Generated</span>}
                                  {isPending   && <span className="text-[10px] font-bold bg-yellow-500/20 text-yellow-400 px-2.5 py-1 rounded-full">Pending</span>}
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    {isPending && (
                                      <button onClick={() => handleApprove(c._id)} className="text-[11px] font-bold bg-[#C7E36B] text-black px-3 py-1.5 rounded-lg hover:bg-lime-300 transition whitespace-nowrap">Approve</button>
                                    )}
                                    {isGenerated && (
                                      <button onClick={() => setViewCert(c)} className="text-[11px] font-semibold border border-white/20 text-gray-300 px-3 py-1.5 rounded-lg hover:bg-white/5 transition whitespace-nowrap">View Details</button>
                                    )}
                                    <button onClick={() => handleDelete(c._id)} className="text-gray-600 hover:text-red-400 transition-all p-1" title="Revoke"><I name="trash" size={13}/></button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-xs text-gray-500">Showing {start} to {end} of {filtered.length} results</p>
                      <div className="flex items-center gap-1">
                        <button onClick={()=>setCertPage(p=>Math.max(1,p-1))} disabled={page===1} className="w-7 h-7 rounded-lg border border-white/10 text-gray-400 hover:border-white/30 disabled:opacity-30 flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                        </button>
                        {Array.from({length: totalPages}, (_,i)=>i+1).filter(n => n===1||n===totalPages||Math.abs(n-page)<=1).reduce((acc,n,i,arr)=>{
                          if(i>0&&n-arr[i-1]>1) acc.push("…");
                          acc.push(n);
                          return acc;
                        },[]).map((n,i) => (
                          typeof n==="string"
                            ? <span key={i} className="text-gray-500 text-xs px-1">…</span>
                            : <button key={n} onClick={()=>setCertPage(n)} className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all ${page===n?"bg-[#C7E36B] text-black":"border border-white/10 text-gray-400 hover:border-white/30"}`}>{n}</button>
                        ))}
                        <button onClick={()=>setCertPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages} className="w-7 h-7 rounded-lg border border-white/10 text-gray-400 hover:border-white/30 disabled:opacity-30 flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                        </button>
                      </div>
                    </div>
                  </>
                );
              })()}
            </>
          )}
        </div>
      )}

      {/* ── CERTIFICATE TEMPLATE TAB ── */}
      {certTab === "template" && (
        <div className="space-y-6">
          {/* Template Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Bootcamp Certificate Card */}
            <div className="bg-[#1A1D1E] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all group">
              {/* Certificate Preview */}
              <div className="bg-white p-5 relative">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">AIFA ACADEMY</p>
                    <p className="text-[11px] font-black text-gray-800 mt-0.5">Certificate of Completion</p>
                  </div>
                  <div className="w-8 h-8 bg-[#C7E36B] rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-black font-black text-sm">A</span>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-2.5 mb-2.5">
                  <p className="text-[7px] text-gray-400 uppercase tracking-widest font-semibold">AWARDED TO</p>
                  <p className="text-base font-black text-gray-900 mt-0.5">Student Name</p>
                  <p className="text-[8px] text-gray-400 mt-0.5">For successful completion of Bootcamp program</p>
                </div>
                <div className="flex items-end justify-between pt-2 border-t border-gray-100">
                  <div>
                    <p className="text-[7px] text-gray-400 uppercase tracking-widest">CERTIFICATE ID</p>
                    <p className="text-[9px] text-gray-600 font-mono mt-0.5">AIFA-2026-00001</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[7px] text-gray-400 uppercase tracking-widest">DATE</p>
                    <p className="text-[9px] text-gray-600 mt-0.5">Aug 2026</p>
                  </div>
                </div>
              </div>
              {/* Card Footer */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-white">Bootcamp Certificate</h3>
                  <span className="text-[9px] bg-blue-500/20 text-blue-400 font-bold px-2 py-0.5 rounded-full">Default</span>
                </div>
                <p className="text-[10px] text-gray-500 mb-3">Issued upon completion of bootcamp programs. White background, AIFA branding.</p>
                <div className="flex gap-2">
                  <button onClick={() => setPreviewTpl("bootcamp")} className="flex-1 text-[11px] font-semibold border border-white/15 text-gray-300 py-1.5 rounded-lg hover:bg-white/5 transition">Preview</button>
                  <button onClick={() => setPreviewTpl("bootcamp-edit")} className="flex-1 text-[11px] font-semibold bg-[#C7E36B]/10 text-[#C7E36B] border border-[#C7E36B]/30 py-1.5 rounded-lg hover:bg-[#C7E36B]/20 transition">Edit Template</button>
                </div>
              </div>
            </div>

            {/* Video Course Certificate Card */}
            <div className="bg-[#1A1D1E] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all group">
              {/* Certificate Preview — green variant */}
              <div className="bg-gradient-to-br from-[#1B4332] to-[#0A2618] p-5 relative">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-[8px] text-[#C7E36B]/70 font-bold uppercase tracking-widest">AIFA ACADEMY</p>
                    <p className="text-[11px] font-black text-white mt-0.5">Certificate of Completion</p>
                  </div>
                  <div className="w-8 h-8 bg-[#C7E36B] rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-black font-black text-sm">A</span>
                  </div>
                </div>
                <div className="border-t border-white/10 pt-2.5 mb-2.5">
                  <p className="text-[7px] text-[#C7E36B]/60 uppercase tracking-widest font-semibold">AWARDED TO</p>
                  <p className="text-base font-black text-white mt-0.5">Student Name</p>
                  <p className="text-[8px] text-white/40 mt-0.5">For successful completion of Video Course</p>
                </div>
                <div className="flex items-end justify-between pt-2 border-t border-white/10">
                  <div>
                    <p className="text-[7px] text-white/40 uppercase tracking-widest">CERTIFICATE ID</p>
                    <p className="text-[9px] text-white/60 font-mono mt-0.5">AIFA-2026-00002</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[7px] text-white/40 uppercase tracking-widest">DATE</p>
                    <p className="text-[9px] text-white/60 mt-0.5">Aug 2026</p>
                  </div>
                </div>
              </div>
              {/* Card Footer */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-white">Video Course Certificate</h3>
                  <span className="text-[9px] bg-blue-500/20 text-blue-400 font-bold px-2 py-0.5 rounded-full">Default</span>
                </div>
                <p className="text-[10px] text-gray-500 mb-3">Issued upon completion of video courses. Dark green background, premium look.</p>
                <div className="flex gap-2">
                  <button onClick={() => setPreviewTpl("course")} className="flex-1 text-[11px] font-semibold border border-white/15 text-gray-300 py-1.5 rounded-lg hover:bg-white/5 transition">Preview</button>
                  <button onClick={() => setPreviewTpl("course-edit")} className="flex-1 text-[11px] font-semibold bg-[#C7E36B]/10 text-[#C7E36B] border border-[#C7E36B]/30 py-1.5 rounded-lg hover:bg-[#C7E36B]/20 transition">Edit Template</button>
                </div>
              </div>
            </div>

            {/* Workshop Certificate Card */}
            <div className="bg-[#1A1D1E] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all group">
              {/* Certificate Preview — purple variant */}
              <div className="bg-gradient-to-br from-[#2D1B69] to-[#1A0F3C] p-5 relative">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-[8px] text-purple-300/70 font-bold uppercase tracking-widest">AIFA ACADEMY</p>
                    <p className="text-[11px] font-black text-white mt-0.5">Workshop Certificate</p>
                  </div>
                  <div className="w-8 h-8 bg-[#C7E36B] rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-black font-black text-sm">A</span>
                  </div>
                </div>
                <div className="border-t border-white/10 pt-2.5 mb-2.5">
                  <p className="text-[7px] text-purple-300/60 uppercase tracking-widest font-semibold">AWARDED TO</p>
                  <p className="text-base font-black text-white mt-0.5">Student Name</p>
                  <p className="text-[8px] text-white/40 mt-0.5">For participation in Workshop</p>
                </div>
                <div className="flex items-end justify-between pt-2 border-t border-white/10">
                  <div>
                    <p className="text-[7px] text-white/40 uppercase tracking-widest">CERTIFICATE ID</p>
                    <p className="text-[9px] text-white/60 font-mono mt-0.5">AIFA-2026-00003</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[7px] text-white/40 uppercase tracking-widest">DATE</p>
                    <p className="text-[9px] text-white/60 mt-0.5">Aug 2026</p>
                  </div>
                </div>
              </div>
              {/* Card Footer */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-white">Workshop Certificate</h3>
                  <span className="text-[9px] bg-blue-500/20 text-blue-400 font-bold px-2 py-0.5 rounded-full">Default</span>
                </div>
                <p className="text-[10px] text-gray-500 mb-3">Issued for workshop participation. Deep purple background, elegant styling.</p>
                <div className="flex gap-2">
                  <button onClick={() => setPreviewTpl("workshop")} className="flex-1 text-[11px] font-semibold border border-white/15 text-gray-300 py-1.5 rounded-lg hover:bg-white/5 transition">Preview</button>
                  <button onClick={() => setPreviewTpl("workshop-edit")} className="flex-1 text-[11px] font-semibold bg-[#C7E36B]/10 text-[#C7E36B] border border-[#C7E36B]/30 py-1.5 rounded-lg hover:bg-[#C7E36B]/20 transition">Edit Template</button>
                </div>
              </div>
            </div>
          </div>

          {/* Issuance Automation */}
          <div>
            <h2 className="text-sm font-bold text-white mb-3">Issuance Automation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-white">Auto-Issue</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Issue automatically on completion</p>
                  </div>
                  <Tog value={autoIssue} onChange={toggleAutoIssue}/>
                </div>
                {autoIssue && <p className="text-[10px] text-[#C7E36B]">✓ Active — auto-issuing on payment</p>}
                {!autoIssue && <p className="text-[10px] text-gray-500">— Off (issue manually)</p>}
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-white">Manual Approval</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Admin must approve each issuance</p>
                  </div>
                  <Tog value={manualApproval} onChange={toggleManualApproval}/>
                </div>
                {manualApproval  && <p className="text-[10px] text-yellow-400">⚠ Each cert needs admin approval</p>}
                {!manualApproval && <p className="text-[10px] text-gray-500">— Auto-approved (no review required)</p>}
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-sm font-semibold text-white mb-2">Custom ID Format</p>
                {editingFormat ? (
                  <div className="flex gap-2">
                    <input value={idFormat} onChange={e=>setIdFormat(e.target.value)}
                      className="flex-1 bg-[#1A1D1E] border border-white/10 rounded-lg px-2 py-1 text-xs text-white font-mono outline-none focus:border-[#C7E36B]/50"/>
                    <button onClick={saveIdFormat} className="text-[10px] bg-[#C7E36B] text-black font-bold px-2 py-1 rounded-lg">{settingsSaving ? "…" : "Save"}</button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <code className="text-[10px] text-[#C7E36B] font-mono bg-[#C7E36B]/10 px-2 py-1 rounded">{idFormat}</code>
                    <button onClick={()=>setEditingFormat(true)} className="text-[10px] text-gray-500 hover:text-white underline ml-2">Edit</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pending Approvals */}
          {certs.filter(c => c.status === "pending").length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-yellow-400 mb-3">Pending Approvals ({certs.filter(c=>c.status==="pending").length})</h2>
              <div className="flex flex-col gap-2">
                {certs.filter(c => c.status === "pending").map(c => (
                  <div key={c._id} className="flex items-center justify-between bg-yellow-500/5 border border-yellow-500/20 rounded-xl px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{c.courseTitle}</p>
                      <p className="text-[10px] text-gray-400">{c.user?.name || c.user} · <span className="capitalize">{c.itemType}</span></p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleApprove(c._id)} className="text-xs bg-[#C7E36B] text-black font-bold px-3 py-1.5 rounded-lg hover:bg-lime-300 transition">Approve</button>
                      <button onClick={() => handleDelete(c._id)} className="text-xs border border-red-500/40 text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition">Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── ISSUED CERTIFICATES (legacy, unused) ── */}
      {certTab === "issued_DISABLED" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-400">{certs.length} certificates issued</p>
            <button onClick={()=>setShowForm(!showForm)} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300 flex items-center gap-1.5">
              {showForm?"← Back":"Issue Certificate"}
            </button>
          </div>
          {/* Search + Type filter */}
          {!showForm && (
            <div className="flex gap-3 mb-4">
              <div className="relative flex-1 max-w-xs">
                <input value={certSearch} onChange={e=>setCertSearch(e.target.value)} placeholder="Search by student or course..." className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder-gray-500 outline-none"/>
                <I name="search" size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500"/>
              </div>
              <select value={certTypeFilter} onChange={e=>setCertTypeFilter(e.target.value)} className="bg-white/5 border border-white/10 text-gray-400 text-sm rounded-lg px-3 py-2 outline-none">
                {["All","course","bootcamp","workshop"].map(o=><option key={o} value={o}>{o==="All"?"All Types":o.charAt(0).toUpperCase()+o.slice(1)}</option>)}
              </select>
            </div>
          )}
          {showForm && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-5 max-w-lg space-y-3">
              <h3 className="text-sm font-semibold text-white">Issue New Certificate</h3>
              {msg && <p className="text-xs text-red-400">{msg}</p>}
              <div>
                <p className="text-[10px] text-gray-400 mb-1 font-semibold">STUDENT</p>
                <select value={form.userId} onChange={e=>setForm({...form,userId:e.target.value})} className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/50">
                  <option value="">Select student...</option>
                  {users.map(u=><option key={u._id} value={u._id}>{u.name} ({u.email})</option>)}
                </select>
              </div>
              <Fld label="CERTIFICATE TITLE" value={form.title} onChange={v=>setForm({...form,title:v})} />
              <Fld label="COURSE / PROGRAM TITLE" value={form.courseTitle} onChange={v=>setForm({...form,courseTitle:v})} placeholder="e.g. AI Filmmaking Bootcamp" />
              <div>
                <p className="text-[10px] text-gray-400 mb-1 font-semibold">TYPE</p>
                <select value={form.itemType} onChange={e=>setForm({...form,itemType:e.target.value})} className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/50">
                  <option value="course">Course</option>
                  <option value="workshop">Workshop</option>
                  <option value="bootcamp">Bootcamp</option>
                </select>
              </div>
              <div className="flex gap-2 pt-1">
                <button onClick={()=>setShowForm(false)} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg">Cancel</button>
                <button onClick={handleIssue} disabled={saving} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg disabled:opacity-60">{saving?"Issuing...":"Issue Certificate"}</button>
              </div>
            </div>
          )}
          {loading ? <AdminLoader /> : (
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead><tr className="text-[11px] text-gray-500 font-semibold uppercase bg-white/5">
                  {["Student","Course / Program","Type","Certificate ID","Issued",""].map(h=><th key={h} className="text-left px-4 py-3">{h}</th>)}
                </tr></thead>
                <tbody className="divide-y divide-white/5">
                  {(() => {
                    const certsFiltered = certs.filter(c => {
                      const q = certSearch.toLowerCase();
                      const matchSearch = !q || (c.user?.name||"").toLowerCase().includes(q) || (c.courseTitle||"").toLowerCase().includes(q);
                      const matchType = certTypeFilter==="All" || c.itemType===certTypeFilter;
                      return matchSearch && matchType;
                    });
                    if(certsFiltered.length===0) return <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500 text-sm">{certs.length===0?"No certificates issued yet":"No certificates match your filters"}</td></tr>;
                    return certsFiltered.map((c) => (
                    <tr key={c._id} className="hover:bg-white/5 transition-all">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#C7E36B] text-black font-bold text-[11px] flex items-center justify-center">{(c.user?.name||"U")[0]}</div>
                          <div><p className="text-xs font-semibold text-white">{c.user?.name||"—"}</p><p className="text-[10px] text-gray-500">{c.user?.email}</p></div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">{c.courseTitle}</td>
                      <td className="px-4 py-3"><span className={`text-[10px] font-bold capitalize px-2 py-1 rounded-full ${typeBadge(c.itemType)}`}>{c.itemType}</span></td>
                      <td className="px-4 py-3 text-[11px] text-gray-400 font-mono">{c.certificateId}</td>
                      <td className="px-4 py-3 text-sm text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3"><button onClick={()=>handleDelete(c._id)} className="text-gray-600 hover:text-red-400 transition-all"><I name="trash" size={13}/></button></td>
                    </tr>
                  ));
                  })()}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>{/* end main content */}

    {/* Certificate Template Preview Modal */}
    {previewTpl && (() => {
      const isEdit = previewTpl.endsWith("-edit");
      const type   = isEdit ? previewTpl.replace("-edit","") : previewTpl;
      const configs = {
        bootcamp: {
          bg: "bg-white",
          header: "text-gray-400",
          title: "text-gray-800",
          divider: "border-gray-200",
          name: "text-gray-900",
          sub: "text-gray-500",
          idColor: "text-gray-600",
          label: "Bootcamp Certificate",
          cert: "Certificate of Completion",
          desc: "For successful completion of the Bootcamp program",
        },
        course: {
          bg: "bg-gradient-to-br from-[#1B4332] to-[#0A2618]",
          header: "text-[#C7E36B]/70",
          title: "text-white",
          divider: "border-white/15",
          name: "text-white",
          sub: "text-white/50",
          idColor: "text-white/60",
          label: "Video Course Certificate",
          cert: "Certificate of Completion",
          desc: "For successful completion of the Video Course",
        },
        workshop: {
          bg: "bg-gradient-to-br from-[#2D1B69] to-[#1A0F3C]",
          header: "text-purple-300/70",
          title: "text-white",
          divider: "border-white/15",
          name: "text-white",
          sub: "text-white/50",
          idColor: "text-white/60",
          label: "Workshop Certificate",
          cert: "Workshop Certificate",
          desc: "For participation in the Workshop program",
        },
      };
      const c = configs[type] || configs.bootcamp;
      return (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6" onClick={() => setPreviewTpl(null)}>
          <div className="w-full max-w-2xl" onClick={e => e.stopPropagation()}>
            {isEdit ? (
              /* Edit Template — coming soon card */
              <div className="bg-[#1A1D1E] border border-white/10 rounded-2xl p-8 text-center">
                <div className="w-14 h-14 bg-[#C7E36B]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Template Editor</h3>
                <p className="text-sm text-gray-400 mb-1">Editing: <span className="text-[#C7E36B] font-semibold">{c.label}</span></p>
                <p className="text-xs text-gray-500 max-w-xs mx-auto mt-3">Full template customisation (colours, fonts, logo, layout) is coming in a future update. The default template is automatically applied when certificates are issued.</p>
                <button onClick={() => setPreviewTpl(null)} className="mt-6 text-sm font-semibold border border-white/15 text-gray-300 px-6 py-2 rounded-xl hover:bg-white/5 transition">Close</button>
              </div>
            ) : (
              /* Full-size certificate preview */
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-bold text-white">{c.label} — Preview</p>
                    <p className="text-xs text-gray-500 mt-0.5">This is how the certificate will look when issued.</p>
                  </div>
                  <button onClick={() => setPreviewTpl(null)} className="text-gray-400 hover:text-white text-lg leading-none">✕</button>
                </div>
                <div className={`${c.bg} rounded-2xl p-10 shadow-2xl`}>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-widest ${c.header}`}>AIFA ACADEMY</p>
                      <p className={`text-2xl font-black mt-1 ${c.title}`}>{c.cert}</p>
                    </div>
                    <div className="w-14 h-14 bg-[#C7E36B] rounded-xl flex items-center justify-center shrink-0">
                      <span className="text-black font-black text-2xl">A</span>
                    </div>
                  </div>
                  {/* Divider + Awarded */}
                  <div className={`border-t ${c.divider} pt-8 mb-8`}>
                    <p className={`text-xs font-bold uppercase tracking-widest ${c.header} mb-2`}>AWARDED TO</p>
                    <p className={`text-4xl font-black ${c.name}`}>Student Name</p>
                    <p className={`text-sm mt-2 ${c.sub}`}>{c.desc}</p>
                  </div>
                  {/* Footer */}
                  <div className={`border-t ${c.divider} pt-6 flex items-end justify-between`}>
                    <div>
                      <p className={`text-[10px] uppercase tracking-widest font-bold ${c.header}`}>CERTIFICATE ID</p>
                      <p className={`text-sm font-mono mt-1 ${c.idColor}`}>AIFA-2026-00001</p>
                    </div>
                    <div className="text-center">
                      <div className={`w-24 border-t ${c.divider} mb-1`}></div>
                      <p className={`text-[10px] uppercase tracking-widest ${c.header}`}>Authorised Signature</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-[10px] uppercase tracking-widest font-bold ${c.header}`}>DATE ISSUED</p>
                      <p className={`text-sm mt-1 ${c.idColor}`}>August 2026</p>
                    </div>
                  </div>
                </div>
                <p className="text-center text-xs text-gray-600 mt-3">Click outside to close</p>
              </div>
            )}
          </div>
        </div>
      );
    })()}

    {/* Slide-in Detail Panel */}
    {viewCert && (
      <div className="fixed top-0 right-0 h-full w-[380px] bg-[#111315] border-l border-white/10 z-40 flex flex-col shadow-2xl overflow-y-auto">
        {/* Panel header */}
        <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-white/10 shrink-0">
          <div>
            <h3 className="text-sm font-bold text-white">Certificate Details</h3>
            <p className="text-[10px] text-gray-400 mt-0.5">View and manage this certificate.</p>
          </div>
          <button onClick={()=>setViewCert(null)} className="text-gray-500 hover:text-white mt-0.5">✕</button>
        </div>

        <div className="flex-1 px-5 py-4 space-y-4">
          {/* Certificate preview card */}
          <div className="bg-[#1A1D1E] border border-white/10 rounded-xl p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">AIFA ACADEMY</p>
                <p className="text-sm font-bold text-white mt-0.5">{viewCert.title || "Certificate of Completion"}</p>
              </div>
              <span className="text-[9px] font-bold bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full shrink-0">Generated</span>
            </div>
            <div className="border-t border-white/10 pt-3">
              <p className="text-[9px] text-gray-500 uppercase tracking-widest font-semibold">AWARDED TO</p>
              <p className="text-lg font-black text-white mt-1">{viewCert.user?.name || "—"}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">For successful completion of {viewCert.courseTitle}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3 border-t border-white/10 pt-3">
              <div>
                <p className="text-[9px] text-gray-500 uppercase tracking-widest font-semibold">CERTIFICATE ID</p>
                <p className="text-xs text-white font-mono mt-0.5">{viewCert.certificateId || "—"}</p>
              </div>
              <div>
                <p className="text-[9px] text-gray-500 uppercase tracking-widest font-semibold">ISSUED ON</p>
                <p className="text-xs text-white mt-0.5">{fmtDate(viewCert.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Student Information */}
          <div>
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-2">STUDENT INFORMATION</p>
            <div className="bg-[#1A1D1E] border border-white/10 rounded-xl p-4 grid grid-cols-2 gap-3">
              <div>
                <p className="text-[9px] text-gray-500 uppercase tracking-wide">Student Name</p>
                <p className="text-xs text-white font-semibold mt-0.5">{viewCert.user?.name || "—"}</p>
              </div>
              <div>
                <p className="text-[9px] text-gray-500 uppercase tracking-wide">Email</p>
                <p className="text-xs text-white font-semibold mt-0.5 break-all">{viewCert.user?.email || "—"}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[9px] text-gray-500 uppercase tracking-wide">Phone</p>
                <p className="text-xs text-white font-semibold mt-0.5">{viewCert.user?.phone || "—"}</p>
              </div>
            </div>
          </div>

          {/* Certificate Information */}
          <div>
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-2">CERTIFICATE INFORMATION</p>
            <div className="bg-[#1A1D1E] border border-white/10 rounded-xl p-4 space-y-3">
              <div>
                <p className="text-[9px] text-gray-500 uppercase tracking-wide">Workshop</p>
                <p className="text-xs text-white font-semibold mt-0.5">{viewCert.courseTitle}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-wide">Certificate Type</p>
                  <p className="text-xs text-white font-semibold mt-0.5 capitalize">{viewCert.itemType}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-wide">Certificate ID</p>
                  <p className="text-xs text-white font-mono font-semibold mt-0.5">{viewCert.certificateId || "—"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel footer */}
        <div className="px-5 py-4 border-t border-white/10 shrink-0">
          <button onClick={() => { handleDelete(viewCert._id); setViewCert(null); }} className="w-full text-xs border border-red-500/30 text-red-400 py-2.5 rounded-lg hover:bg-red-500/10 transition mb-2">Revoke Certificate</button>
          <button onClick={() => setViewCert(null)} className="w-full text-xs bg-white/5 border border-white/10 text-gray-300 py-2.5 rounded-lg hover:bg-white/10 transition">Close</button>
        </div>
      </div>
    )}
    </div>
  );
}

/* ── JOBS ADMIN ── */
const JOB_TAGS = ["AI Film","AI Ads","AI Story","AI Editing","AI Voice","AI Avatar","AI Music","General"];
const JOB_TYPES = ["PART-TIME","FULL-TIME","CONTRACT","FREELANCE"];

function JobsAdmin({ token }) {
  const [jobs, setJobs]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving]     = useState(false);
  const [msg, setMsg]           = useState("");
  const [editJob, setEditJob]   = useState(null); // null = create, object = edit
  const BLANK_FORM = { title:"", type:"PART-TIME", tag:"AI Film", description:"", budget:"", timeline:"", skills:"" };
  const [form, setForm] = useState(BLANK_FORM);

  const load = () => {
    setLoading(true);
    /* ?all=true so admin sees inactive jobs too */
    fetch("/api/jobs?all=true", { headers:{ Authorization:`Bearer ${token}` } })
      .then(r=>r.json()).then(d=>{ if(Array.isArray(d)) setJobs(d); setLoading(false); }).catch(()=>setLoading(false));
  };
  useEffect(load, [token]);

  const openEdit = (j) => {
    setEditJob(j);
    setForm({ title:j.title||"", type:j.type||"PART-TIME", tag:j.tag||"AI Film", description:j.description||"", budget:j.budget||"", timeline:j.timeline||"", skills:(j.skills||[]).join(", ") });
    setShowForm(true); setMsg("");
  };
  const openCreate = () => { setEditJob(null); setForm(BLANK_FORM); setShowForm(true); setMsg(""); };

  const toggleActive = async (j) => {
    const res = await fetch(`/api/jobs/${j._id}`, { method:"PUT", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}, body:JSON.stringify({ isActive: !j.isActive }) });
    if(res.ok) setJobs(js=>js.map(x=>x._id===j._id?{...x,isActive:!j.isActive}:x));
  };

  const handleSave = async () => {
    if (!form.title) { setMsg("Title is required."); return; }
    setSaving(true); setMsg("");
    const body = { ...form, skills: form.skills.split(",").map(s=>s.trim()).filter(Boolean) };
    const url  = editJob ? `/api/jobs/${editJob._id}` : "/api/jobs";
    const meth = editJob ? "PUT" : "POST";
    const res = await fetch(url, { method:meth, headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}, body:JSON.stringify(body) });
    const data = await res.json();
    if (res.ok) {
      if(editJob) setJobs(js=>js.map(j=>j._id===data._id?data:j));
      else setJobs(js=>[data,...js]);
      setShowForm(false); setEditJob(null); setForm(BLANK_FORM);
    } else setMsg(data.message || "Failed.");
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    await fetch(`/api/jobs/${id}`, { method:"DELETE", headers:{ Authorization:`Bearer ${token}` } });
    setJobs(js => js.filter(j => j._id !== id));
  };

  const TAG_COLORS = { "AI Film":"bg-[#C7E36B]/20 text-[#C7E36B]","AI Ads":"bg-orange-500/20 text-orange-400","AI Story":"bg-pink-500/20 text-pink-400","AI Editing":"bg-blue-500/20 text-blue-400","AI Voice":"bg-purple-500/20 text-purple-400" };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-xl font-bold text-white">Jobs</h1><p className="text-xs text-gray-400">Manage job listings · {jobs.length} total ({jobs.filter(j=>j.isActive!==false).length} active)</p></div>
        <button onClick={()=>{ if(showForm){setShowForm(false);setEditJob(null);setForm(BLANK_FORM);}else openCreate(); }} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300 flex items-center gap-1.5">
          <I name="plus" size={14}/>{showForm?"← Back":"+ Post New Job"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-5 max-w-lg space-y-3">
          <h3 className="text-sm font-semibold text-white">{editJob?"Edit Job":"Post New Job"}</h3>
          {msg && <p className="text-xs text-red-400">{msg}</p>}
          <Fld label="JOB TITLE" value={form.title} onChange={v=>setForm({...form,title:v})} placeholder="e.g. Create a cinematic AI short film" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] text-gray-400 font-semibold mb-1">TYPE</p>
              <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/50">
                {JOB_TYPES.map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold mb-1">TAG</p>
              <select value={form.tag} onChange={e=>setForm({...form,tag:e.target.value})} className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/50">
                {JOB_TAGS.map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <Fld label="DESCRIPTION" value={form.description} onChange={v=>setForm({...form,description:v})} textarea placeholder="Job description..." />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] text-gray-400 font-semibold mb-1 uppercase">Budget</p>
              <select value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})} className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/50">
                <option value="">Select budget...</option>
                {["< ₹50/hr","₹50-100/hr","₹100-200/hr","₹200+/hr"].map(b=><option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold mb-1 uppercase">Timeline</p>
              <select value={form.timeline} onChange={e=>setForm({...form,timeline:e.target.value})} className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/50">
                <option value="">Select timeline...</option>
                {["Immediate","Within 2 Weeks","1 Month+","Flexible"].map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <Fld label="SKILLS (comma-separated)" value={form.skills} onChange={v=>setForm({...form,skills:v})} placeholder="Runway, Midjourney, Pika" />
          <div className="flex gap-2 pt-1">
            <button onClick={()=>{setShowForm(false);setEditJob(null);setForm(BLANK_FORM);}} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg disabled:opacity-60">{saving?(editJob?"Saving...":"Posting..."):(editJob?"Save Changes":"Post Job")}</button>
          </div>
        </div>
      )}

      {loading ? <AdminLoader /> : (
        jobs.length === 0 ? (
          <div className="text-center py-12"><p className="text-gray-500 text-sm">No jobs posted yet</p><button onClick={()=>setShowForm(true)} className="mt-3 text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg">Post First Job</button></div>
        ) : (
          <div className="space-y-3">
            {jobs.map((j) => (
              <div key={j._id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between hover:border-white/20 transition-all">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${TAG_COLORS[j.tag]||"bg-white/10 text-gray-400"}`}>{j.tag}</span>
                    <span className="text-[10px] text-gray-500 font-semibold">{j.type}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white">{j.title}</h3>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{j.description}</p>
                  <div className="flex items-center gap-4 mt-1">
                    {j.budget && <span className="text-[10px] text-gray-500">{j.budget}</span>}
                    {j.timeline && <span className="text-[10px] text-gray-500">{j.timeline}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4 shrink-0">
                  <button onClick={()=>toggleActive(j)} title={j.isActive!==false?"Deactivate":"Activate"}
                    className={`text-[10px] font-bold px-2 py-1 rounded-full border transition-all ${j.isActive!==false?"border-green-500/30 text-green-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30":"border-gray-600 text-gray-600 hover:border-green-500/30 hover:text-green-400"}`}>
                    {j.isActive!==false?"● active":"○ inactive"}
                  </button>
                  <button onClick={()=>openEdit(j)} className="text-gray-400 hover:text-[#C7E36B] transition-all"><I name="edit" size={13}/></button>
                  <button onClick={()=>handleDelete(j._id)} className="text-gray-600 hover:text-red-400 transition-all"><I name="trash" size={14}/></button>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
