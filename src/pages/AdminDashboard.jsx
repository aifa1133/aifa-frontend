import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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
};
const I = ({ name, size = 16, className = "" }) => <Ic d={ICONS[name] || ICONS.dashboard} size={size} className={className} />;

const NAV_ITEMS = [
  { id: "dashboard",          label: "Dashboard",      icon: "dashboard" },
  { id: "bootcamp",           label: "Bootcamp",       icon: "bootcamp"  },
  { id: "workshops",          label: "Workshops",      icon: "workshop"  },
  { id: "video-courses",      label: "Video Courses",  icon: "video"     },
  { id: "resources",          label: "Resources",      icon: "resources" },
  { id: "certificates",       label: "Certificates",   icon: "cert"     },
  { id: "jobs",               label: "Jobs",           icon: "jobs"     },
  { id: "community",          label: "Community",      icon: "community",     soon: true },
  { id: "service-request",    label: "Service Request",icon: "service",       soon: true },
  { id: "sales-consultation", label: "Sales Consult.", icon: "sales",         soon: true },
  { id: "hire-talent",        label: "Hire Talent",    icon: "hire",          soon: true },
];
const MGMT_ITEMS = [
  { id: "users",      label: "Users",      icon: "users"      },
  { id: "payments",   label: "Payments",   icon: "payments"   },
  { id: "enrolments", label: "Enrolments", icon: "enrolments" },
  { id: "analytics",  label: "Analytics",  icon: "analytics"  },
  { id: "membership", label: "Membership", icon: "membership", soon: true },
];

/* ═══════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════ */
export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("aifa_token");
  const user = JSON.parse(localStorage.getItem("aifa_user") || "{}");

  useEffect(() => {
    if (!token) { navigate("/"); return; }
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
        <nav className="flex-1 overflow-y-auto py-2">
          {[...NAV_ITEMS, { _divider: true }, ...MGMT_ITEMS].map((item, idx) => {
            if (item._divider) return <p key="div" className="text-[9px] text-gray-600 font-bold uppercase px-3 pt-3 pb-1 tracking-wider">Management</p>;
            return (
              <button key={item.id} onClick={() => !item.soon && setActivePage(item.id)}
                disabled={item.soon} title={item.soon ? "Coming soon" : undefined}
                className={`w-full flex items-center justify-between px-3 py-2 text-left text-[11px] font-medium transition-all ${item.soon ? "text-gray-600 cursor-not-allowed" : activePage === item.id ? "bg-[#C7E36B]/10 text-[#C7E36B] border-r-2 border-[#C7E36B]" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
                <span className="flex items-center gap-2"><I name={item.icon} size={13} />{item.label}</span>
                {item.soon && <span className="text-[8px] bg-white/10 text-gray-600 font-bold px-1 py-0.5 rounded">SOON</span>}
              </button>
            );
          })}
        </nav>
        <div onClick={() => setActivePage("profile")} className="border-t border-white/5 px-3 py-3 flex items-center gap-2 hover:bg-white/5 transition-all w-full text-left cursor-pointer">
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
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Welcome back, <span className="text-white font-semibold">{name}</span></span>
            <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 relative">
              <I name="bell" size={16} className="text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
              {profile?.profilePicture
                ? <img src={profile.profilePicture} alt="avatar" className="w-full h-full object-cover" />
                : <span className="w-full h-full bg-[#C7E36B] flex items-center justify-center text-black font-bold text-sm">{name[0]}</span>
              }
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {activePage === "dashboard"       && <AdminOverview token={token} onNavigate={setActivePage} />}
          {activePage === "bootcamp"        && <BootcampAdmin token={token} />}
          {activePage === "workshops"       && <WorkshopsAdmin token={token} />}
          {activePage === "video-courses"   && <VideoCoursesAdmin token={token} />}
          {activePage === "resources"       && <ResourcesAdmin token={token} />}
          {activePage === "users"           && <UsersAdmin token={token} />}
          {activePage === "payments"        && <PaymentsAdmin token={token} />}
          {activePage === "enrolments"      && <EnrolmentsAdmin token={token} />}
          {activePage === "analytics"       && <AnalyticsAdmin token={token} />}
          {activePage === "certificates"    && <CertificatesAdmin token={token} />}
          {activePage === "jobs"            && <JobsAdmin token={token} />}
          {activePage === "profile"         && <AdminProfile token={token} profile={profile} onUpdated={setProfile} />}
          {["community","service-request","sales-consultation","hire-talent","membership"].includes(activePage) && (
            <Placeholder title={[...NAV_ITEMS,...MGMT_ITEMS].find(n=>n.id===activePage)?.label} />
          )}
        </main>
      </div>
    </div>
  );
}

/* ── ADMIN OVERVIEW ── */
function AdminOverview({ token, onNavigate }) {
  const [stats, setStats] = useState({});
  const [recentTxs, setRecentTxs] = useState([]);
  useEffect(() => {
    const h = { Authorization:`Bearer ${token}` };
    fetch("/api/admin/stats", { headers: h }).then(r=>r.json()).then(d=>{ if(!d.message) setStats(d); }).catch(()=>{});
    fetch("/api/admin/enrollments/recent", { headers: h }).then(r=>r.json()).then(d=>{ if(Array.isArray(d)) setRecentTxs(d); }).catch(()=>{});
  }, [token]);

  const fmt = v => v >= 1000 ? `₹${(v/1000).toFixed(1)}K` : `₹${v}`;
  const cards = [
    { label:"Total Users",    value: stats.users     ?? 0, icon:"users",      color:"text-blue-400",   bg:"bg-blue-500/10"   },
    { label:"Active Courses", value: stats.courses   ?? 0, icon:"video",      color:"text-green-400",  bg:"bg-green-500/10"  },
    { label:"Workshops",      value: stats.workshops ?? 0, icon:"workshop",   color:"text-purple-400", bg:"bg-purple-500/10" },
    { label:"Bootcamps",      value: stats.bootcamps ?? 0, icon:"bootcamp",   color:"text-orange-400", bg:"bg-orange-500/10" },
    { label:"Total Revenue",  value: fmt(stats.revenue ?? 0), icon:"payments", color:"text-[#C7E36B]", bg:"bg-[#C7E36B]/10"  },
    { label:"Enrollments",    value: stats.enrollments ?? 0, icon:"enrolments",color:"text-pink-400",  bg:"bg-pink-500/10"   },
  ];

  const quickActions = [
    { label:"New Course",   icon:"video",    cls:"bg-blue-500/20 text-blue-400",     page:"video-courses" },
    { label:"New Workshop", icon:"workshop", cls:"bg-purple-500/20 text-purple-400", page:"workshops"     },
    { label:"New Bootcamp", icon:"bootcamp", cls:"bg-orange-500/20 text-orange-400", page:"bootcamp"      },
    { label:"View Users",   icon:"users",    cls:"bg-green-500/20 text-green-400",   page:"users"         },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-sm text-gray-400">Platform overview and key metrics</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {cards.map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
              <I name={s.icon} size={20} className={s.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3">Recent Enrollments</h3>
          {recentTxs.length === 0
            ? <p className="text-xs text-gray-500 py-4 text-center">No paid enrollments yet</p>
            : recentTxs.map((tx,i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#C7E36B] text-black font-bold text-[11px] flex items-center justify-center">{(tx.user?.name||"U")[0]}</div>
                  <div><p className="text-xs font-semibold text-white">{tx.user?.name||"User"}</p><p className="text-[10px] text-gray-500">{tx.itemTitle}</p></div>
                </div>
                <span className="text-[10px] text-gray-500">{new Date(tx.createdAt).toLocaleDateString()}</span>
              </div>
            ))
          }
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-white mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map(({label,icon,cls,page}) => (
              <button key={label} onClick={() => onNavigate(page)} className={`${cls} rounded-xl p-3 flex items-center gap-2 text-xs font-semibold hover:opacity-80 transition-all`}>
                <I name={icon} size={16}/>{label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── BOOTCAMP ADMIN ── */
function BootcampAdmin({ token }) {
  const [tab, setTab] = useState("settings");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [bootcampId, setBootcampId] = useState(null);
  const [f, setF] = useState({ title:"AI Filmmaking Bootcamp", shortDesc:"Master the art of AI-driven cinema and storytelling.", fullDesc:"A comprehensive 8-week program designed to take you from beginner to advanced in AI filmmaking.", basePrice:2499, discPrice:1999, access:"Lifetime Access", publicVis:true, certs:true, liveChat:true, drip:true });

  useEffect(() => {
    fetch("/api/bootcamps", { headers:{ Authorization:`Bearer ${token}` } })
      .then(r=>r.json()).then(d => {
        if (Array.isArray(d) && d.length > 0) {
          const b = d[0];
          setBootcampId(b._id);
          setF(prev => ({ ...prev, title: b.title || prev.title, fullDesc: b.description || prev.fullDesc, basePrice: b.price || prev.basePrice }));
        }
      }).catch(()=>{});
  }, [token]);

  const save = async () => {
    setSaving(true); setMsg("");
    try {
      const body = { title: f.title, description: f.fullDesc, price: Number(f.basePrice), isPublished: f.publicVis };
      const url = bootcampId ? `/api/bootcamps/${bootcampId}` : "/api/bootcamps";
      const method = bootcampId ? "PUT" : "POST";
      const res = await fetch(url, { method, headers:{ "Content-Type":"application/json", Authorization:`Bearer ${token}` }, body: JSON.stringify(body) });
      const data = await res.json();
      if (res.ok) { setMsg("Changes saved successfully!"); if (!bootcampId && data._id) setBootcampId(data._id); }
      else setMsg(data.message || "Save failed.");
    } catch { setMsg("Network error."); }
    setSaving(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-5 pb-0 border-b border-white/5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2"><h1 className="text-lg font-bold text-white">AI Filmmaking Bootcamp</h1><span className="text-[10px] bg-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded-full">ACTIVE</span></div>
            <p className="text-xs text-gray-400">Manage structure, content, and student access for this program.</p>
          </div>
          <div className="flex gap-2">
            <button className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg hover:bg-white/5">PREVIEW STUDENT VIEW</button>
            <button onClick={save} disabled={saving} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300 flex items-center gap-1.5">
              <I name="plus" size={14}/>{saving?"SAVING...":"+ SAVE CHANGES"}
            </button>
          </div>
        </div>
        <div className="flex gap-0">
          {["Overview","Curriculum","Enrollments","Assignments","Live Classes","Resources","Settings"].map(t=>(
            <button key={t} onClick={()=>setTab(t.toLowerCase())} className={`text-sm px-4 py-2.5 border-b-2 transition-all ${tab===t.toLowerCase()?"border-[#C7E36B] text-[#C7E36B]":"border-transparent text-gray-400 hover:text-white"}`}>{t}</button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        {tab==="settings" && (
          <div className="max-w-2xl space-y-5">
            {msg && <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-2 rounded-lg">{msg}</div>}
            <Sect icon="resources" title="General Information">
              <div className="grid grid-cols-2 gap-4">
                <Fld label="BOOTCAMP TITLE" value={f.title} onChange={v=>setF({...f,title:v})} />
                <Fld label="SHORT DESCRIPTION" value={f.shortDesc} onChange={v=>setF({...f,shortDesc:v})} />
              </div>
              <Fld label="FULL DESCRIPTION" value={f.fullDesc} onChange={v=>setF({...f,fullDesc:v})} textarea />
            </Sect>
            <Sect icon="payments" title="Pricing & Access">
              <div className="grid grid-cols-3 gap-4">
                <Fld label="BASE PRICE (USD)" value={f.basePrice} onChange={v=>setF({...f,basePrice:v})} prefix="$" />
                <Fld label="DISCOUNTED PRICE" value={f.discPrice} onChange={v=>setF({...f,discPrice:v})} prefix="$" />
                <Fld label="ACCESS DURATION" value={f.access} onChange={v=>setF({...f,access:v})} />
              </div>
            </Sect>
            <Sect icon="eye" title="Visibility & Features">
              <div className="grid grid-cols-2 gap-3">
                {[["publicVis","Public Visibility","Make this bootcamp visible on the marketplace."],["certs","Enable Certificates","Issue automated certificates upon completion."],["liveChat","Live Chat","Allow students to chat during live sessions."],["drip","Drip Content","Release modules based on a schedule."]].map(([k,l,d])=>(
                  <div key={k} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start justify-between">
                    <div><p className="text-sm font-semibold text-white">{l}</p><p className="text-[11px] text-gray-400 mt-0.5">{d}</p></div>
                    <Tog value={f[k]} onChange={v=>setF({...f,[k]:v})} />
                  </div>
                ))}
              </div>
            </Sect>
            <div className="border border-red-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3"><I name="warning" size={16} className="text-red-400"/><h3 className="text-sm font-semibold text-red-400">Danger Zone</h3></div>
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-semibold text-white">Delete this Bootcamp</p><p className="text-xs text-gray-400">Once deleted, all data including student progress will be permanently removed.</p></div>
                <div className="flex gap-2 ml-4 shrink-0">
                  <button className="text-xs bg-[#C7E36B] text-black font-bold px-3 py-2 rounded-lg">Archive Bootcamp</button>
                  <button className="text-xs border border-red-500 text-red-400 px-3 py-2 rounded-lg hover:bg-red-500/10">Delete Permanently</button>
                </div>
              </div>
            </div>
          </div>
        )}
        {tab!=="settings" && <Placeholder title={`Bootcamp ${tab.charAt(0).toUpperCase()+tab.slice(1)}`} />}
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
  const [cf, setCf] = useState({ title:"", shortDesc:"", duration:"35 Hours", price:"USD 999", mode:"Online", date:"", time:"", published:true });
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const doCreate = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/workshops",{ method:"POST", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}, body:JSON.stringify({ title:cf.title, description:cf.shortDesc, duration:cf.duration, price:parseFloat(cf.price.replace(/[^0-9.]/g,"")), mode:cf.mode.toUpperCase(), isPublished:cf.published }) });
      const data = await res.json();
      if(res.ok){ setSel(data); setSuccessMsg("Workshop Saved Successfully!"); setView("manage"); }
    } catch(e){}
    setSaving(false);
  };

  const doDelete = async (id) => {
    if(!window.confirm("Delete?")) return;
    await fetch(`/api/workshops/${id}`,{ method:"DELETE", headers:{Authorization:`Bearer ${token}`} });
    setWorkshops(ws=>ws.filter(w=>w._id!==id));
  };

  if(view==="create") return (
    <div className="p-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-xl font-bold text-white">Create Workshop</h1><p className="text-xs text-gray-400">Add workshop details for website display</p></div>
        <button className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg" onClick={doCreate} disabled={saving}>{saving?"Publishing...":"Publish Workshop"}</button>
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
              <button onClick={()=>setView("list")} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg">Save as Draft</button>
              <button onClick={doCreate} disabled={saving} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg">{saving?"Publishing...":"Publish Workshop"}</button>
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
          <div className="flex gap-2 mb-3"><span className="text-[10px] bg-[#C7E36B]/20 text-[#C7E36B] font-bold px-2 py-0.5 rounded">DRAFT</span><span className="text-[10px] text-gray-400">ONLINE</span></div>
          <h2 className="text-2xl font-black text-white">{sel.title}</h2>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[["PRICE",sel.price||"₹1,499"],["DURATION",sel.duration||"4 Hours"],["SEAT LIMIT","50 Seats"]].map(([k,v])=>(
              <div key={k} className="bg-white/5 border border-white/10 rounded-xl p-3"><p className="text-[10px] text-gray-400 font-semibold">{k}</p><p className="text-base font-bold text-white">{v}</p></div>
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-4 flex flex-col items-center justify-center min-h-[180px]">
            <I name="users" size={32} className="text-gray-600 mb-2"/>
            <p className="text-sm text-gray-400 font-semibold">No registrations yet</p>
            <p className="text-xs text-gray-500 mt-1 text-center">Once you publish the workshop, learner registrations will appear here in real-time.</p>
            <button className="mt-4 bg-[#C7E36B] text-black text-xs font-bold px-4 py-2 rounded-lg">📣 Publish Workshop to Live</button>
          </div>
        </div>
        <div className="w-[200px] shrink-0 space-y-3">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs font-semibold text-white mb-3">Management Actions</p>
            {[["Edit Details","edit"],["Preview Website Card","eye"],["Copy Registration Link","copy"],["Delete Workshop","trash"]].map(([l,ic])=>(
              <button key={l} className={`w-full flex items-center gap-2 text-xs py-2 border-b border-white/5 last:border-0 ${l.includes("Delete")?"text-red-400":"text-gray-300"} hover:text-white`}>
                <I name={ic} size={12}/>{l}
              </button>
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xs font-semibold text-white mb-3">Schedule Summary</p>
            {[["DATE","October 24, 2023"],["TIME","10:00 - 12:00 PM IST"],["LOCATION","Google Meet (Link Pending)"]].map(([k,v])=>(
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
        <button onClick={()=>setView("create")} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300 flex items-center gap-1.5">
          <I name="plus" size={14}/>+ Create New Workshop
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
      {loading ? <p className="text-gray-500 text-sm animate-pulse">Loading workshops...</p> : (
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
    fetch("/api/courses", { headers:{ Authorization:`Bearer ${token}` } })
      .then(r=>r.json()).then(d=>{ if(Array.isArray(d)) setCourses(d); setCoursesLoading(false); }).catch(()=>setCoursesLoading(false));
  };
  useEffect(loadCourses, [token]);
  const [f, setF] = useState({ title:"", shortDesc:"", fullDesc:"", category:"AI & Machine Learning", level:"Beginner", language:"English", instructor:"", price:"", discPrice:"", accessType:"Lifetime", genCert:true });
  const [sections, setSections] = useState([{ title:"Section 1: AI Fundamentals", lessons:[{ title:"Introduction to AI Cinema", duration:"09:45", type:"Video", desc:"", isFree:true }] }]);
  const [activeL, setActiveL] = useState({ s:0, l:0 });
  const [saving, setSaving] = useState(false);
  const STEPS = ["Basic Info","Curriculum","Pricing","Publish"];

  const publish = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/courses",{ method:"POST", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}, body:JSON.stringify({ title:f.title, description:f.fullDesc, shortDesc:f.shortDesc, category:f.category, level:f.level, language:f.language, instructor:f.instructor, price:parseFloat(f.price)||0, originalPrice:parseFloat(f.discPrice)||0, lessons:sections.flatMap((s,si)=>s.lessons.map((l,li)=>({title:l.title,duration:l.duration,order:si*100+li,isFree:l.isFree}))), isPublished:true }) });
      if(res.ok) { loadCourses(); }
    } catch(e){}
    setSaving(false); setView("list");
  };

  const deleteCourse = async id => {
    if(!window.confirm("Delete this course permanently?")) return;
    await fetch(`/api/courses/${id}`,{ method:"DELETE", headers:{ Authorization:`Bearer ${token}` } });
    setCourses(cs=>cs.filter(c=>c._id!==id));
  };

  const addLesson = si => { const u=[...sections]; u[si].lessons.push({title:"New Lesson",duration:"",type:"Video",desc:"",isFree:false}); setSections(u); setActiveL({s:si,l:u[si].lessons.length-1}); };
  const updLesson = (key,val) => setSections(sections.map((s,si)=>si===activeL.s?{...s,lessons:s.lessons.map((l,li)=>li===activeL.l?{...l,[key]:val}:l)}:s));

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
          <button className="text-xs border border-white/20 text-gray-300 px-3 py-1.5 rounded-lg">SAVE AS DRAFT</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        {step===1 && (
          <div className="max-w-2xl space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Fld label="Course Title" value={f.title} onChange={v=>setF({...f,title:v})} placeholder="e.g. Master AI Filmmaking in 30..." />
              <div><p className="text-[10px] text-gray-400 mb-1">Course Thumbnail (16:9)</p>
                <div className="border-2 border-dashed border-white/20 rounded-xl h-[100px] flex flex-col items-center justify-center cursor-pointer hover:border-[#C7E36B]/50">
                  <I name="upload" size={20} className="text-gray-500 mb-1"/><p className="text-[10px] text-gray-500">Click to upload</p>
                </div>
              </div>
            </div>
            <Fld label="Short Description" value={f.shortDesc} onChange={v=>setF({...f,shortDesc:v})} placeholder="A brief hook for your course..." />
            <Fld label="Full Description" value={f.fullDesc} onChange={v=>setF({...f,fullDesc:v})} textarea placeholder="Explain what students will learn..." />
            <div className="grid grid-cols-4 gap-3">
              <Fld label="Category" value={f.category} onChange={v=>setF({...f,category:v})} />
              <Fld label="Level" value={f.level} onChange={v=>setF({...f,level:v})} />
              <Fld label="Language" value={f.language} onChange={v=>setF({...f,language:v})} />
              <Fld label="Instructor" value={f.instructor} onChange={v=>setF({...f,instructor:v})} placeholder="Instructor Name" />
            </div>
          </div>
        )}
        {step===2 && (
          <div className="flex gap-4" style={{minHeight:"400px"}}>
            <div className="w-[250px] shrink-0">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-white">CURRICULUM</p>
                <button onClick={()=>setSections([...sections,{title:`Section ${sections.length+1}`,lessons:[]}])} className="text-[#C7E36B] text-[10px] flex items-center gap-1 hover:underline"><I name="plus" size={11}/>Section</button>
              </div>
              {sections.map((sec,si)=>(
                <div key={si} className="mb-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 mb-1 flex items-center justify-between">
                    <p className="text-[11px] font-semibold text-white truncate">{sec.title}</p>
                  </div>
                  {sec.lessons.map((les,li)=>(
                    <button key={li} onClick={()=>setActiveL({s:si,l:li})} className={`w-full flex items-center gap-2 px-3 py-1.5 text-left text-[10px] rounded mb-0.5 transition-all ${activeL.s===si&&activeL.l===li?"bg-[#C7E36B]/10 text-[#C7E36B]":"text-gray-400 hover:bg-white/5"}`}>
                      <I name="check" size={9} className="text-green-400 shrink-0"/>{les.title}
                    </button>
                  ))}
                  <button onClick={()=>addLesson(si)} className="w-full text-left text-[10px] text-gray-500 hover:text-[#C7E36B] px-3 py-1 flex items-center gap-1"><I name="plus" size={9}/>Add Lesson</button>
                </div>
              ))}
              <button onClick={()=>setSections([...sections,{title:`Section ${sections.length+1}`,lessons:[]}])} className="w-full text-[10px] text-gray-500 border border-dashed border-white/20 rounded-lg py-2 hover:border-[#C7E36B]/50 hover:text-[#C7E36B] transition-all">+ Add New Section</button>
            </div>
            <div className="flex-1">
              {sections[activeL.s]?.lessons[activeL.l] && (() => {
                const les = sections[activeL.s].lessons[activeL.l];
                return (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-white">Edit Lesson</p>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] text-gray-400">FREE PREVIEW</span><Tog value={les.isFree} onChange={v=>updLesson("isFree",v)}/>
                        <span className="text-[10px] text-gray-400">PUBLISHED</span><Tog value={true} onChange={()=>{}}/>
                      </div>
                    </div>
                    <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-[#C7E36B]/50 transition-all">
                      <I name="upload" size={24} className="mx-auto text-gray-500 mb-2"/>
                      <p className="text-xs text-gray-400">Upload lesson video</p>
                      <p className="text-[10px] text-gray-500">Drag and drop or click to browse. Max 2GB</p>
                      <button className="mt-3 bg-[#C7E36B] text-black text-xs font-bold px-4 py-1.5 rounded-lg">SELECT FILE</button>
                    </div>
                    <Fld label="Lesson Title" value={les.title} onChange={v=>updLesson("title",v)}/>
                    <div className="grid grid-cols-2 gap-3">
                      <Fld label="Duration (Minutes)" value={les.duration} onChange={v=>updLesson("duration",v)}/>
                      <Fld label="Lesson Type" value={les.type} onChange={v=>updLesson("type",v)}/>
                    </div>
                    <Fld label="Description" value={les.desc} onChange={v=>updLesson("desc",v)} textarea placeholder="What will students learn in this..."/>
                    <div className="flex items-center justify-between border-t border-white/5 pt-3">
                      <button className="text-xs text-gray-400 hover:text-white flex items-center gap-1"><I name="upload" size={12}/>+ Add Attachment</button>
                      <div className="flex gap-2">
                        <button className="text-xs border border-white/20 text-gray-300 px-3 py-1.5 rounded-lg">Discard Changes</button>
                        <button className="text-xs bg-[#C7E36B] text-black font-bold px-3 py-1.5 rounded-lg">Save & Update Lesson</button>
                      </div>
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
                <Fld label="Base Price" value={f.price} onChange={v=>setF({...f,price:v})} prefix="$" placeholder="0"/>
                <Fld label="Discounted Price (Optional)" value={f.discPrice} onChange={v=>setF({...f,discPrice:v})} prefix="$"/>
              </div>
            </Sect>
            <Sect icon="eye" title="Access & Expiry">
              <div className="flex gap-2 mb-3">
                {["Lifetime","Limited"].map(t=><button key={t} onClick={()=>setF({...f,accessType:t})} className={`px-4 py-2 text-xs font-semibold rounded-lg ${f.accessType===t?"bg-[#C7E36B] text-black":"bg-white/10 text-gray-300"}`}>{t}</button>)}
              </div>
              <Fld label="Currency" value="INR (₹)" onChange={()=>{}}/>
            </Sect>
            <Sect icon="cert" title="Course Features">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between"><p className="text-xs text-white">Generate Certificate</p><Tog value={f.genCert} onChange={v=>setF({...f,genCert:v})}/></div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between"><p className="text-xs text-white">Allow Coupons</p><Tog value={false} onChange={()=>{}}/></div>
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
                <button onClick={publish} disabled={saving} className="w-full bg-[#C7E36B] text-black text-xs font-bold py-2 rounded-lg hover:bg-lime-300 mb-2">{saving?"Publishing...":"Publish Course Now"}</button>
                <button className="w-full border border-white/20 text-gray-300 text-xs py-2 rounded-lg hover:bg-white/5">SCHEDULE FOR LATER</button>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between mt-6 pt-4 border-t border-white/5">
          {step>1&&<button onClick={()=>setStep(s=>s-1)} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg">← Back</button>}
          <div className="ml-auto flex gap-2">
            <button className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg">SAVE DRAFT</button>
            {step<4?<button onClick={()=>setStep(s=>s+1)} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg">Continue →</button>
              :<button onClick={publish} disabled={saving} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg">{saving?"Publishing...":"Publish Course"}</button>}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-white">Video Courses</h1>
        <button onClick={()=>{setView("create");setStep(1);}} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300 flex items-center gap-1.5"><I name="plus" size={14}/>+ Create New Course</button>
      </div>
      <div className="flex gap-3 mb-4">
        <div className="relative">
          <input type="text" placeholder="Search courses..." className="bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder-gray-500 outline-none w-[200px]"/>
          <I name="search" size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500"/>
        </div>
        {["Sort By ▼","Level ▼","Category ▼"].map(f=><select key={f} className="bg-white/5 border border-white/10 text-gray-400 text-sm rounded-lg px-3 py-2 outline-none"><option>{f}</option></select>)}
      </div>
      {coursesLoading
        ? <p className="text-gray-500 text-sm animate-pulse py-6">Loading courses...</p>
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
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-[#C7E36B] font-bold">₹{c.price}</span>
                  <span className="text-[10px] text-gray-400">{c.level||"Beginner"}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={()=>window.open(`/courses/${c._id}/watch`,"_blank")} className="flex-1 text-xs border border-white/20 text-gray-300 py-1.5 rounded-lg hover:bg-white/5 flex items-center justify-center gap-1"><I name="eye" size={11}/>View</button>
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
  { key: "prompt",   label: "Prompt Library" },
  { key: "workflow", label: "Workflows"       },
  { key: "project",  label: "Projects"        },
  { key: "tip",      label: "Learning Tips"   },
  { key: "deal",     label: "AI Deals"        },
];

function ResourcesAdmin({ token }) {
  const [tab, setTab]           = useState("prompt");
  const [resources, setResources] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving]     = useState(false);
  const [msg, setMsg]           = useState("");
  const [form, setForm] = useState({ type:"prompt", title:"", description:"", content:"", category:"", isFeatured:false, allowCopy:true, discount:"", link:"", logo:"" });

  const load = (type) => {
    setLoading(true); setResources([]);
    fetch(`/api/resources?type=${type}`)
      .then(r=>r.json()).then(d=>{ if(Array.isArray(d)) setResources(d); setLoading(false); }).catch(()=>setLoading(false));
  };

  useEffect(() => { load(tab); setShowForm(false); }, [tab]);

  const handleSave = async () => {
    setSaving(true); setMsg("");
    try {
      const res = await fetch("/api/resources", {
        method: "POST",
        headers: { "Content-Type":"application/json", Authorization:`Bearer ${token}` },
        body: JSON.stringify({ ...form, type: tab }),
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

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div><h1 className="text-xl font-bold text-white">Resources</h1><p className="text-xs text-gray-400">Manage all learning resources by category</p></div>
        <button onClick={()=>setShowForm(!showForm)} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300 flex items-center gap-1.5">
          <I name="plus" size={14}/>{showForm ? "← Back" : "+ Add Resource"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 border-b border-white/10">
        {RES_TABS.map(t => (
          <button key={t.key} onClick={()=>setTab(t.key)} className={`px-4 py-2 text-sm font-medium border-b-2 transition-all -mb-px ${tab===t.key?"border-[#C7E36B] text-[#C7E36B]":"border-transparent text-gray-400 hover:text-white"}`}>{t.label}</button>
        ))}
      </div>

      {/* Add form */}
      {showForm && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-5 space-y-3 max-w-2xl">
          <h3 className="text-sm font-semibold text-white">New {RES_TABS.find(t=>t.key===tab)?.label} Item</h3>
          {msg && <p className={`text-xs ${msg==="Saved!"?"text-green-400":"text-red-400"}`}>{msg}</p>}
          <Fld label="Title" value={form.title} onChange={v=>setForm({...form,title:v})} placeholder="Resource title..." />
          <Fld label="Description" value={form.description} onChange={v=>setForm({...form,description:v})} textarea placeholder="Short description..." />
          {(tab==="prompt"||tab==="workflow"||tab==="tip") && (
            <Fld label="Content" value={form.content} onChange={v=>setForm({...form,content:v})} textarea placeholder="Full content or prompt text..." />
          )}
          {tab==="deal" && (
            <div className="grid grid-cols-3 gap-3">
              <Fld label="Logo/Emoji" value={form.logo} onChange={v=>setForm({...form,logo:v})} placeholder="🤖" />
              <Fld label="Discount" value={form.discount} onChange={v=>setForm({...form,discount:v})} placeholder="20% OFF" />
              <Fld label="Link" value={form.link} onChange={v=>setForm({...form,link:v})} placeholder="https://..." />
            </div>
          )}
          <Fld label="Category" value={form.category} onChange={v=>setForm({...form,category:v})} placeholder="e.g. Photography" />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2"><span className="text-xs text-gray-400">Featured</span><Tog value={form.isFeatured} onChange={v=>setForm({...form,isFeatured:v})}/></div>
            {(tab==="prompt"||tab==="tip") && <div className="flex items-center gap-2"><span className="text-xs text-gray-400">Allow Copy</span><Tog value={form.allowCopy} onChange={v=>setForm({...form,allowCopy:v})}/></div>}
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={()=>setShowForm(false)} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg disabled:opacity-60">{saving?"Saving...":"Publish"}</button>
          </div>
        </div>
      )}

      {/* Resource list */}
      {loading ? <p className="text-gray-500 text-sm animate-pulse">Loading...</p> : (
        <>
          {resources.length === 0 && !showForm && (
            <div className="text-center py-12"><p className="text-gray-500 text-sm">No {RES_TABS.find(t=>t.key===tab)?.label} resources yet</p><button onClick={()=>setShowForm(true)} className="mt-3 text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg">Add First</button></div>
          )}
          {tab === "deal" ? (
            <div className="grid grid-cols-3 gap-4">
              {resources.map((r) => (
                <div key={r._id} className="bg-white rounded-xl overflow-hidden shadow-sm relative group">
                  <div className="h-[70px] bg-gray-50 flex items-center justify-center text-4xl">{r.logo || "🔧"}</div>
                  <div className="p-4">
                    <h3 className="text-base font-bold text-gray-900">{r.title}</h3>
                    <p className="text-xs text-gray-500">{r.description}</p>
                    <p className="text-xl font-black text-gray-900 mt-2">{r.discount}</p>
                    <p className="text-[10px] text-[#C7E36B] font-semibold">VIA AIFA</p>
                    <button className="w-full bg-[#C7E36B] text-black text-sm font-bold py-2 rounded-lg mt-3 hover:bg-lime-300">Get Deal</button>
                  </div>
                  <button onClick={()=>handleDelete(r._id)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500/80 text-white rounded-full w-6 h-6 flex items-center justify-center transition-all"><I name="trash" size={12}/></button>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {resources.map((r) => (
                <div key={r._id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start justify-between hover:border-white/20 transition-all">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {r.isFeatured && <span className="text-[9px] bg-[#C7E36B]/20 text-[#C7E36B] font-bold px-1.5 py-0.5 rounded">FEATURED</span>}
                      {r.category && <span className="text-[9px] bg-white/10 text-gray-400 px-1.5 py-0.5 rounded">{r.category}</span>}
                    </div>
                    <h3 className="text-sm font-semibold text-white">{r.title}</h3>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">{r.description}</p>
                    {r.content && <p className="text-[10px] text-gray-600 mt-1 line-clamp-1 font-mono">{r.content}</p>}
                  </div>
                  <button onClick={()=>handleDelete(r._id)} className="text-gray-600 hover:text-red-400 ml-4 shrink-0 transition-all"><I name="trash" size={13}/></button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ── USERS ADMIN ── */
function UsersAdmin({ token }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users",{ headers:{ Authorization:`Bearer ${token}` } })
      .then(r=>r.json()).then(d=>{ if(Array.isArray(d)) setUsers(d); setLoading(false); }).catch(()=>setLoading(false));
  },[token]);

  const toggleRole = async u => {
    const newRole = u.role==="admin"?"student":"admin";
    await fetch(`/api/users/${u._id}/role`,{ method:"PUT", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}, body:JSON.stringify({role:newRole}) });
    setUsers(us=>us.map(x=>x._id===u._id?{...x,role:newRole}:x));
  };

  const delUser = async id => {
    if(!window.confirm("Delete this user permanently?")) return;
    await fetch(`/api/users/${id}`,{ method:"DELETE", headers:{ Authorization:`Bearer ${token}` } });
    setUsers(us=>us.filter(x=>x._id!==id));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-xl font-bold text-white">Users</h1><p className="text-xs text-gray-400">Manage platform users and roles · {users.length} total</p></div>
      </div>
      {loading ? <p className="text-gray-400 text-sm animate-pulse">Loading users...</p> : (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead><tr className="text-[11px] text-gray-500 font-semibold uppercase bg-white/5">
              {["Name","Email","Role","Enrolled","Joined","Actions"].map(h=><th key={h} className="text-left px-4 py-3">{h}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-white/5">
              {users.map(u=>(
                <tr key={u._id} className="hover:bg-white/5 transition-all">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#C7E36B] text-black font-bold text-[11px] flex items-center justify-center">{(u.name||"U")[0].toUpperCase()}</div>
                      <span className="text-sm text-white font-semibold">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">{u.email}</td>
                  <td className="px-4 py-3"><span className={`text-[10px] font-bold px-2 py-1 rounded-full ${u.role==="admin"?"bg-[#C7E36B]/20 text-[#C7E36B]":"bg-blue-500/20 text-blue-400"}`}>{u.role}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-400">{u.enrolledCourses?.length||0}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{new Date(u.createdAt||Date.now()).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={()=>toggleRole(u)} className="text-[10px] border border-white/20 text-gray-300 px-2 py-1 rounded hover:bg-white/10">→ {u.role==="admin"?"Student":"Admin"}</button>
                      <button onClick={()=>delUser(u._id)} className="text-[10px] border border-red-500/30 text-red-400 px-2 py-1 rounded hover:bg-red-500/10"><I name="trash" size={11}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length===0&&<p className="text-center text-gray-500 py-8 text-sm">No users found</p>}
        </div>
      )}
    </div>
  );
}

/* ── PAYMENTS ADMIN ── */
const PAY_MOCK = [
  { id:"#PAY-001", user:"Arjun Sharma",  program:"AI Filmmaking Bootcamp",        type:"Bootcamp", date:"Oct 24, 2023", amount:"₹2,499", status:"Paid"    },
  { id:"#PAY-002", user:"Priya Patel",   program:"Advanced React Patterns",        type:"Course",   date:"Sep 12, 2023", amount:"₹999",   status:"Paid"    },
  { id:"#PAY-003", user:"Ravi Kumar",    program:"AI Cinematography Workshop",     type:"Workshop", date:"Aug 05, 2023", amount:"₹1,499", status:"Pending" },
  { id:"#PAY-004", user:"Sneha Reddy",   program:"UI/UX Design Fundamentals",     type:"Course",   date:"Jul 20, 2023", amount:"₹799",   status:"Paid"    },
];

function PaymentsAdmin({ token }) {
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/admin/payments", { headers:{ Authorization:`Bearer ${token}` } })
      .then(r=>r.json()).then(d=>{ if(Array.isArray(d)) setTxs(d); setLoading(false); }).catch(()=>setLoading(false));
  }, [token]);

  const total   = txs.filter(t=>t.status==="paid").reduce((s,t)=>s+t.amount,0);
  const pending = txs.filter(t=>t.status==="pending").reduce((s,t)=>s+t.amount,0);
  const thisMonth = txs.filter(t=>{ const d=new Date(t.createdAt); const n=new Date(); return t.status==="paid"&&d.getMonth()===n.getMonth()&&d.getFullYear()===n.getFullYear(); }).reduce((s,t)=>s+t.amount,0);

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
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="text-[11px] text-gray-500 font-semibold uppercase bg-white/5">
            {["Transaction ID","User","Program","Type","Date","Amount","Status"].map(h=><th key={h} className="text-left px-4 py-3">{h}</th>)}
          </tr></thead>
          <tbody className="divide-y divide-white/5">
            {loading ? <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-500 text-sm animate-pulse">Loading...</td></tr>
              : txs.length === 0 ? <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-500 text-sm">No transactions yet</td></tr>
              : txs.map((p,i)=>(
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
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  useEffect(() => {
    fetch("/api/admin/enrollments", { headers:{ Authorization:`Bearer ${token}` } })
      .then(r=>r.json()).then(d=>{ if(Array.isArray(d)) setEnrollments(d); setLoading(false); }).catch(()=>setLoading(false));
  }, [token]);

  const filtered = enrollments.filter(e => {
    const matchSearch = (e.user?.name||"").toLowerCase().includes(search.toLowerCase()) || (e.item||"").toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All" || e.type === typeFilter;
    return matchSearch && matchType;
  });

  const typeBadge = t => t==="bootcamp"?"bg-blue-500/20 text-blue-400":t==="workshop"?"bg-purple-500/20 text-purple-400":"bg-green-500/20 text-green-400";

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-xl font-bold text-white">Enrolments</h1><p className="text-xs text-gray-400">All student enrollments · {enrollments.length} total</p></div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[["Total Enrolments", enrollments.length, "enrolments"],["Course Enrolments", enrollments.filter(e=>e.type==="course").length,"video"],["Bootcamp Enrolments",enrollments.filter(e=>e.type==="bootcamp").length,"bootcamp"]].map(([l,v,ic])=>(
          <div key={l} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#C7E36B]/10 flex items-center justify-center shrink-0"><I name={ic} size={20} className="text-[#C7E36B]"/></div>
            <div><p className="text-2xl font-bold text-white">{v}</p><p className="text-xs text-gray-400">{l}</p></div>
          </div>
        ))}
      </div>
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by student or program..." className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder-gray-500 outline-none"/>
          <I name="search" size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500"/>
        </div>
        <select value={typeFilter} onChange={e=>setTypeFilter(e.target.value)} className="bg-white/5 border border-white/10 text-gray-400 text-sm rounded-lg px-3 py-2 outline-none">
          <option value="All">All Types</option>
          <option value="course">Course</option>
          <option value="workshop">Workshop</option>
          <option value="bootcamp">Bootcamp</option>
        </select>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="text-[11px] text-gray-500 font-semibold uppercase bg-white/5">
            {["Student","Program","Type","Enrolled On","Amount"].map(h=><th key={h} className="text-left px-4 py-3">{h}</th>)}
          </tr></thead>
          <tbody className="divide-y divide-white/5">
            {loading ? <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500 text-sm animate-pulse">Loading...</td></tr>
              : filtered.length === 0 ? <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500 text-sm">No enrollments found</td></tr>
              : filtered.map((e,i) => (
              <tr key={i} className="hover:bg-white/5 transition-all">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#C7E36B] text-black font-bold text-[11px] flex items-center justify-center">{(e.user?.name||"U")[0]}</div>
                    <div><p className="text-xs font-semibold text-white">{e.user?.name||"—"}</p><p className="text-[10px] text-gray-500">{e.user?.email||""}</p></div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-300 max-w-[200px] truncate">{e.item||"—"}</td>
                <td className="px-4 py-3"><span className={`text-[10px] font-bold capitalize px-2 py-1 rounded-full ${typeBadge(e.type)}`}>{e.type}</span></td>
                <td className="px-4 py-3 text-sm text-gray-400">{new Date(e.enrolledAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-sm font-bold text-white">{e.price ? `₹${e.price}` : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 mt-3">Showing {filtered.length} of {enrollments.length} enrollments</p>
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
          {loading ? <p className="text-gray-500 text-sm animate-pulse">Loading...</p>
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
          {loading ? <p className="text-gray-500 text-sm animate-pulse">Loading...</p>
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

function Fld({ label, value, onChange, textarea, placeholder, prefix }) {
  const cls = "w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/50 placeholder-gray-600";
  return (
    <div>
      {label && <p className="text-[10px] text-gray-400 font-semibold mb-1">{label}</p>}
      <div className="relative">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{prefix}</span>}
        {textarea
          ? <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} className={`${cls} resize-none h-24 ${prefix?"pl-7":""}`}/>
          : <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} className={`${cls} ${prefix?"pl-7":""}`}/>
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
function CertificatesAdmin({ token }) {
  const [certs, setCerts]       = useState([]);
  const [users, setUsers]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving]     = useState(false);
  const [msg, setMsg]           = useState("");
  const [form, setForm] = useState({ userId:"", title:"Certificate of Achievement", courseTitle:"", itemType:"course" });

  useEffect(() => {
    const h = { Authorization:`Bearer ${token}` };
    fetch("/api/certificates", { headers:h }).then(r=>r.json()).then(d=>{ if(Array.isArray(d)) setCerts(d); setLoading(false); }).catch(()=>setLoading(false));
    fetch("/api/users",        { headers:h }).then(r=>r.json()).then(d=>{ if(Array.isArray(d)) setUsers(d.filter(u=>u.role!=="admin")); }).catch(()=>{});
  }, [token]);

  const handleIssue = async () => {
    if (!form.userId || !form.courseTitle) { setMsg("Select student and enter course title."); return; }
    setSaving(true); setMsg("");
    const res = await fetch("/api/certificates", { method:"POST", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}, body:JSON.stringify(form) });
    const data = await res.json();
    if (res.ok) { setCerts(c=>[data,...c]); setShowForm(false); setMsg(""); setForm({ userId:"", title:"Certificate of Achievement", courseTitle:"", itemType:"course" }); }
    else setMsg(data.message || "Failed.");
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Revoke this certificate?")) return;
    await fetch(`/api/certificates/${id}`, { method:"DELETE", headers:{ Authorization:`Bearer ${token}` } });
    setCerts(cs => cs.filter(c => c._id !== id));
  };

  const typeBadge = t => t==="bootcamp"?"bg-blue-500/20 text-blue-400":t==="workshop"?"bg-purple-500/20 text-purple-400":"bg-green-500/20 text-green-400";

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-xl font-bold text-white">Certificates</h1><p className="text-xs text-gray-400">Issue and manage student certificates · {certs.length} issued</p></div>
        <button onClick={()=>setShowForm(!showForm)} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300 flex items-center gap-1.5">
          <I name="plus" size={14}/>{showForm?"← Back":"+ Issue Certificate"}
        </button>
      </div>

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

      {loading ? <p className="text-gray-500 text-sm animate-pulse">Loading...</p> : (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead><tr className="text-[11px] text-gray-500 font-semibold uppercase bg-white/5">
              {["Student","Course / Program","Type","Certificate ID","Issued",""].map(h=><th key={h} className="text-left px-4 py-3">{h}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-white/5">
              {certs.length === 0
                ? <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500 text-sm">No certificates issued yet</td></tr>
                : certs.map((c) => (
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
              ))}
            </tbody>
          </table>
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
  const [form, setForm] = useState({ title:"", type:"PART-TIME", tag:"AI Film", description:"", budget:"", timeline:"", skills:"" });

  const load = () => {
    setLoading(true);
    fetch("/api/jobs").then(r=>r.json()).then(d=>{ if(Array.isArray(d)) setJobs(d); setLoading(false); }).catch(()=>setLoading(false));
  };
  useEffect(load, []);

  const handleSave = async () => {
    if (!form.title) { setMsg("Title is required."); return; }
    setSaving(true); setMsg("");
    const body = { ...form, skills: form.skills.split(",").map(s=>s.trim()).filter(Boolean) };
    const res = await fetch("/api/jobs", { method:"POST", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}, body:JSON.stringify(body) });
    const data = await res.json();
    if (res.ok) { setJobs(js=>[data,...js]); setShowForm(false); setForm({ title:"", type:"PART-TIME", tag:"AI Film", description:"", budget:"", timeline:"", skills:"" }); }
    else setMsg(data.message || "Failed.");
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
        <div><h1 className="text-xl font-bold text-white">Jobs</h1><p className="text-xs text-gray-400">Manage job listings · {jobs.length} active</p></div>
        <button onClick={()=>setShowForm(!showForm)} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300 flex items-center gap-1.5">
          <I name="plus" size={14}/>{showForm?"← Back":"+ Post New Job"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-5 max-w-lg space-y-3">
          <h3 className="text-sm font-semibold text-white">Post New Job</h3>
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
            <Fld label="BUDGET" value={form.budget} onChange={v=>setForm({...form,budget:v})} placeholder="e.g. ₹10,000 fixed" />
            <Fld label="TIMELINE" value={form.timeline} onChange={v=>setForm({...form,timeline:v})} placeholder="e.g. 3 days" />
          </div>
          <Fld label="SKILLS (comma-separated)" value={form.skills} onChange={v=>setForm({...form,skills:v})} placeholder="Runway, Midjourney, Pika" />
          <div className="flex gap-2 pt-1">
            <button onClick={()=>setShowForm(false)} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg disabled:opacity-60">{saving?"Posting...":"Post Job"}</button>
          </div>
        </div>
      )}

      {loading ? <p className="text-gray-500 text-sm animate-pulse">Loading...</p> : (
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
                <button onClick={()=>handleDelete(j._id)} className="text-gray-600 hover:text-red-400 ml-4 shrink-0 transition-all"><I name="trash" size={14}/></button>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
