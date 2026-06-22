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
  settings: "M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.92c.04-.34.07-.68.07-1.08s-.03-.74-.07-1.08l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.34-.07.69-.07 1.08s.03.74.07 1.08l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.58 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65z",
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
  { id: "community",          label: "Community",      icon: "community" },
  { id: "service-request",    label: "Service Request",icon: "service"   },
  { id: "sales-consultation", label: "Sales Consult.", icon: "sales"     },
  { id: "hire-talent",        label: "Hire Talent",    icon: "hire"      },
  { id: "platform-settings", label: "Settings",       icon: "settings"  },
];
const MGMT_ITEMS = [
  { id: "users",      label: "Users",      icon: "users"      },
  { id: "payments",   label: "Payments",   icon: "payments"   },
  { id: "enrolments", label: "Enrolments", icon: "enrolments" },
  { id: "analytics",  label: "Analytics",  icon: "analytics"  },
  { id: "membership", label: "Membership", icon: "membership" },
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
          {activePage === "community"         && <CommunityAdmin token={token} />}
          {activePage === "service-request"    && <ServiceRequestAdmin token={token} />}
          {activePage === "sales-consultation" && <SalesConsultAdmin token={token} />}
          {activePage === "hire-talent"        && <HireTalentAdmin token={token} />}
          {activePage === "membership"         && <MembershipAdmin token={token} />}
          {activePage === "platform-settings"  && <PlatformSettings token={token} />}
        </main>
      </div>
    </div>
  );
}

/* ── ADMIN OVERVIEW ── */
function AdminOverview({ token, onNavigate }) {
  const [stats, setStats]       = useState({});
  const [analytics, setAnalytics] = useState(null);
  const [recentTxs, setRecentTxs] = useState([]);
  const [chartRange, setChartRange] = useState("30d");

  useEffect(() => {
    const h = { Authorization:`Bearer ${token}` };
    fetch("/api/admin/stats",              { headers:h }).then(r=>r.json()).then(d=>{ if(!d.message) setStats(d); }).catch(()=>{});
    fetch("/api/admin/analytics",          { headers:h }).then(r=>r.json()).then(d=>{ if(!d.message) setAnalytics(d); }).catch(()=>{});
    fetch("/api/admin/enrollments/recent", { headers:h }).then(r=>r.json()).then(d=>{ if(Array.isArray(d)) setRecentTxs(d); }).catch(()=>{});
  }, [token]);

  const fmtRev = v => v >= 100000 ? `₹${(v/100000).toFixed(1)}L` : v >= 1000 ? `₹${(v/1000).toFixed(1)}K` : `₹${v}`;
  const fmtPct = (n, total) => total ? ((n/total)*100).toFixed(1)+"%" : "0%";

  const topCards = [
    { label:"Total Revenue",     value: fmtRev(stats.revenue??0),     icon:"payments",   color:"text-[#C7E36B]", bg:"bg-[#C7E36B]/10", trend:"+12.5%", up:true  },
    { label:"Total Enrollments", value: stats.enrollments??0,          icon:"enrolments", color:"text-blue-400",  bg:"bg-blue-500/10",  trend:"+8.2%",  up:true  },
    { label:"Active Users",      value: stats.users??0,                icon:"users",      color:"text-green-400", bg:"bg-green-500/10", trend:"+4.1%",  up:true  },
    { label:"Courses",           value: (stats.courses??0)+(stats.workshops??0)+(stats.bootcamps??0), icon:"video", color:"text-purple-400", bg:"bg-purple-500/10", trend:"-2.4%", up:false },
  ];

  /* Build chart data from analytics.monthlyData (last 6 points) */
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const chartData = analytics?.monthlyData?.slice(-6).map(m => ({
    label: MONTHS[m._id.month-1],
    count: m.count,
    rev:   m.revenue,
  })) ?? [];
  const maxCount = Math.max(...chartData.map(d=>d.count), 1);
  const maxRev   = Math.max(...chartData.map(d=>d.rev), 1);

  const topCourses = analytics?.topCourses ?? [];

  const quickActions = [
    { label:"Add Bootcamp",    icon:"bootcamp", bg:"bg-white/5 hover:bg-white/10", page:"bootcamp"      },
    { label:"Create Workshop", icon:"workshop", bg:"bg-white/5 hover:bg-white/10", page:"workshops"     },
    { label:"Upload Course",   icon:"upload",   bg:"bg-white/5 hover:bg-white/10", page:"video-courses" },
    { label:"View Users",      icon:"users",    bg:"bg-white/5 hover:bg-white/10", page:"users"         },
  ];

  /* Build activity feed from recent txs + static items */
  const activity = recentTxs.slice(0,4).map((tx,i) => ({
    icon: i%3===0?"users": i%3===1?"payments":"cert",
    color: i%3===0?"bg-[#C7E36B] text-black": i%3===1?"bg-blue-500 text-white":"bg-purple-500 text-white",
    text: i%3===0 ? `${tx.user?.name||"A student"} enrolled in ${tx.itemTitle||"a course"}`
                  : i%3===1 ? `Payment received from ${tx.user?.name||"a student"}`
                            : `Certificate issued for ${tx.itemTitle||"a course"}`,
    amount: i%3===1 ? `+₹${tx.amount||0}` : null,
    time: tx.createdAt ? new Date(tx.createdAt).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) : "—",
  }));
  if (activity.length === 0) {
    activity.push({ icon:"users", color:"bg-[#C7E36B] text-black", text:"No recent activity yet", amount:null, time:"—" });
  }

  return (
    <div className="p-6 space-y-5">
      {/* 4 top stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {topCards.map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                <I name={s.icon} size={18} className={s.color} />
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${s.up ? "text-green-400 bg-green-500/10":"text-red-400 bg-red-500/10"}`}>
                {s.up?"↑":"↓"} {s.trend}
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-0.5">{s.label}</p>
            <p className="text-2xl font-black text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Revenue chart + Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-4">
        {/* Revenue Overview */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h3 className="text-sm font-bold text-white">Revenue Overview</h3>
              <p className="text-[10px] text-gray-500">Detailed financial growth metrics</p>
            </div>
            <div className="flex gap-1">
              {["7d","30d","3m"].map(r => (
                <button key={r} onClick={() => setChartRange(r)}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all ${chartRange===r?"bg-[#C7E36B] text-black":"bg-white/10 text-gray-400 hover:bg-white/20"}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          {chartData.length === 0 ? (
            <div className="h-[140px] flex items-center justify-center text-xs text-gray-600">No data yet — make some sales!</div>
          ) : (
            <div className="mt-4">
              {/* CSS bar chart for enrollments */}
              <div className="flex items-end gap-2 h-[120px]">
                {chartData.map((d,i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col justify-end" style={{height:"100px"}}>
                      <div className="w-full bg-[#C7E36B]/80 rounded-t transition-all hover:bg-[#C7E36B]"
                        style={{height:`${Math.max(4,(d.count/maxCount)*100)}px`}}
                        title={`${d.count} enrollments`} />
                    </div>
                    <span className="text-[9px] text-gray-500">{d.label}</span>
                  </div>
                ))}
              </div>
              {/* Revenue sparkline — simple dots */}
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/5 text-[10px] text-gray-500">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#C7E36B] inline-block" /> Enrollments</span>
                <span className="ml-auto text-gray-400">Total: {analytics?.totalEnrollments??0} paid enrollments</span>
              </div>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">Recent Activity</h3>
            <button onClick={() => onNavigate("enrolments")} className="text-[10px] text-[#C7E36B] hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {activity.map((a,i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className={`w-7 h-7 rounded-full ${a.color} flex items-center justify-center shrink-0`}>
                  <I name={a.icon} size={13} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-white leading-snug line-clamp-2">{a.text}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{a.time}</p>
                </div>
                {a.amount && <span className="text-[10px] font-bold text-green-400 shrink-0">{a.amount}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Courses + Quick Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-4">
        {/* Top courses */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">Top Performing Courses</h3>
            <button className="text-[10px] text-gray-500 hover:text-white">• • •</button>
          </div>
          {topCourses.length === 0 ? (
            <p className="text-xs text-gray-500 text-center py-6">No course enrollments yet</p>
          ) : topCourses.map((c,i) => (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <I name="video" size={15} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white line-clamp-1">{c._id}</p>
                  <p className="text-[10px] text-gray-500">Course · {c.count} students</p>
                </div>
              </div>
              <div className="text-right shrink-0 ml-3">
                <p className="text-xs font-bold text-white">{fmtRev(c.revenue)}</p>
                <p className="text-[10px] text-green-400">+ growth</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions grid (2×2) */}
        <div className="grid grid-cols-2 gap-3 content-start" style={{minWidth:"260px"}}>
          {quickActions.map(({label,icon,bg,page}) => (
            <button key={label} onClick={() => onNavigate(page)}
              className={`${bg} border border-white/10 rounded-xl p-4 flex flex-col items-center gap-2 text-xs font-semibold text-white hover:border-white/20 transition-all`}>
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                <I name={icon} size={18} className="text-gray-300" />
              </div>
              <span className="text-center leading-tight">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── PROJECTS TAB (extracted to avoid hook-inside-render issues) ── */
function ProjTab({ selProj, setSelProj, localProj, setLocalProj, projSaved, setProjSaved, projFileRef }) {
  useEffect(() => { setLocalProj(selProj); }, [selProj]);
  return (
    <div className="flex gap-5 h-full">
      <div className="w-[260px] shrink-0 space-y-2">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">Projects</h3>
          <button className="text-xs bg-[#C7E36B] text-black font-bold px-2.5 py-1 rounded-lg flex items-center gap-1"><I name="plus" size={12}/>Add</button>
        </div>
        {BC_PROJS_DATA.map((p,i)=>(
          <div key={i} onClick={()=>setSelProj(p)} className={`p-3 border rounded-xl cursor-pointer transition-all ${selProj?.no===p.no?"border-[#C7E36B]/50 bg-[#C7E36B]/5":"border-white/10 bg-[#0F1112] hover:border-white/20"}`}>
            <p className="text-[10px] text-gray-400 font-semibold uppercase">{p.no}</p>
            <p className="text-xs font-bold text-white mt-0.5">{p.title}</p>
            <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">{p.desc}</p>
          </div>
        ))}
      </div>
      {localProj&&(
        <div className="flex-1 bg-[#0F1112] border border-white/10 rounded-xl p-5 space-y-5 overflow-y-auto">
          <input type="file" ref={projFileRef} className="hidden"/>
          <div className="grid grid-cols-2 gap-4">
            <Fld label="Project Number" value={localProj.no} onChange={v=>setLocalProj(p=>({...p,no:v}))} />
            <Fld label="Project Title" value={localProj.title} onChange={v=>setLocalProj(p=>({...p,title:v}))} />
          </div>
          <Fld label="Description" value={localProj.desc} onChange={v=>setLocalProj(p=>({...p,desc:v}))} textarea />
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] text-gray-400 font-semibold uppercase">Requirements</p>
              <button onClick={()=>setLocalProj(p=>({...p,req:[...p.req,"New requirement..."]})) } className="text-[10px] text-[#C7E36B] flex items-center gap-1"><I name="plus" size={11}/>Add Requirement</button>
            </div>
            <div className="space-y-2">
              {localProj.req.map((r,i)=>(
                <div key={i} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                  <I name="check" size={13} className="text-[#C7E36B] shrink-0"/>
                  <span className="text-xs text-white flex-1">{r}</span>
                  <button onClick={()=>setLocalProj(p=>({...p,req:p.req.filter((_,j)=>j!==i)}))} className="text-gray-500 hover:text-red-400"><I name="trash" size={13}/></button>
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
              {localProj.res.map((f,i)=>(
                <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                  <span className="text-lg">📄</span>
                  <span className="text-xs text-white flex-1 truncate">{f}</span>
                  <button onClick={()=>setLocalProj(p=>({...p,res:p.res.filter((_,j)=>j!==i)}))} className="text-gray-500 hover:text-red-400 shrink-0"><I name="trash" size={12}/></button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <button onClick={()=>setLocalProj(selProj)} className="flex-1 border border-white/20 text-gray-300 text-xs font-semibold py-2 rounded-lg hover:bg-white/5">Discard</button>
            <button onClick={()=>{setProjSaved(true);setTimeout(()=>setProjSaved(false),2000);}} className="flex-1 bg-[#C7E36B] text-black text-xs font-bold py-2 rounded-lg hover:bg-lime-300">Save Project</button>
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
  const [createSuccess, setCreateSuccess]     = useState(false);
  const [newBC, setNewBC] = useState({name:"",code:"",price:"",duration:"",status:"ACTIVE"});
  const [bootcamps, setBootcamps] = useState([]);
  const [loadingBC, setLoadingBC] = useState(true);

  useEffect(() => {
    fetch("/api/bootcamps", { headers:{ Authorization:`Bearer ${token}` } })
      .then(r => r.ok ? r.json() : [])
      .then(d => { if (Array.isArray(d)) setBootcamps(d); setLoadingBC(false); })
      .catch(() => setLoadingBC(false));
  }, [token]);

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
    <div className="flex flex-col h-full">
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
              <button onClick={()=>{setShowCreateModal(false);setCreateSuccess(true);setTimeout(()=>setCreateSuccess(false),3000);setNewBC({name:"",code:"",price:"",duration:"",status:"ACTIVE"});}} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300">CREATE BOOTCAMP</button>
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
        {[{icon:"users",label:"TOTAL STUDENTS",val:"35"},{icon:"payments",label:"TOTAL REVENUE",val:"₹1,82,900"},{icon:"bootcamp",label:"TOTAL BOOTCAMPS",val:"3"},{icon:"check",label:"ACTIVE BOOTCAMPS",val:"1"}].map(s=>(
          <div key={s.label} className="bg-[#0F1112] border border-white/10 rounded-xl p-4">
            <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center mb-3"><I name={s.icon} size={18} className="text-gray-400"/></div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">{s.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{s.val}</p>
          </div>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        {/* Gap 2: Status + Sort filters */}
        <div className="flex items-center gap-3 mb-5">
          <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="bg-[#0F1112] border border-white/10 text-gray-400 text-xs rounded-lg px-3 py-1.5 outline-none hover:border-white/20">
            {["All","ACTIVE","COMPLETED","COMING SOON"].map(o=><option key={o}>{o}</option>)}
          </select>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)} className="bg-[#0F1112] border border-white/10 text-gray-400 text-xs rounded-lg px-3 py-1.5 outline-none hover:border-white/20">
            {["Default","Name A-Z","Students"].map(o=><option key={o}>{o}</option>)}
          </select>
          <span className="text-[10px] text-gray-600">{filtered.length} of {BC_CARDS.length} bootcamps</span>
        </div>
        {loadingBC ? (
          <p className="text-gray-500 text-sm animate-pulse text-center py-8">Loading bootcamps...</p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-sm">No bootcamps found. Create your first one!</div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filtered.map(b=>(
              <div key={b._id} onClick={()=>onSelect(b.raw || b)} className="bg-[#0F1112] border border-white/10 rounded-xl p-5 cursor-pointer hover:border-[#C7E36B]/40 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[10px] bg-white/10 text-gray-400 font-bold px-2 py-0.5 rounded">{b.code}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${BC_ST[b.status]||"bg-gray-500/20 text-gray-400"}`}>{b.status}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{b.title}</h3>
                <p className="text-[11px] text-gray-400 mb-4 line-clamp-2">{b.desc}</p>
                <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-3">
                  {[["Students",b.students],["Price",b.price],["Duration",b.duration]].map(([l,v])=>(
                    <div key={l}><p className="text-[10px] text-gray-500 uppercase">{l}</p><p className="text-xs font-bold text-white mt-0.5">{v}</p></div>
                  ))}
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
const BC_ST={ACTIVE:"bg-green-500/20 text-green-400",COMPLETED:"bg-blue-500/20 text-blue-400",CANCELLED:"bg-red-500/20 text-red-400","COMING SOON":"bg-yellow-500/20 text-yellow-400",DROPPED:"bg-red-500/20 text-red-400",PUBLISHED:"bg-green-500/20 text-green-400",SCHEDULED:"bg-yellow-500/20 text-yellow-400",DRAFT:"bg-gray-500/20 text-gray-400"};
const BC_CARDS=[
  {_id:"b1",code:"B01",title:"AI Filmmaking Bootcamp",desc:"Master AI-powered filmmaking from script to screen in 12 intensive weeks.",students:21,price:"₹6,499",duration:"12 Weeks",status:"ACTIVE"},
  {_id:"b2",code:"B02",title:"Advanced VFX with AI",desc:"Deep dive into visual effects using generative AI tools and pipelines.",students:14,price:"₹4,999",duration:"8 Weeks",status:"COMPLETED"},
  {_id:"b3",code:"B03",title:"AI Screenwriting Workshop",desc:"Learn to write compelling scripts using AI-assisted tools and prompting.",students:0,price:"₹3,499",duration:"4 Weeks",status:"COMING SOON"},
];
const BC_SESS=[
  {no:1,name:"Introduction to AI Filmmaking",status:"COMPLETED"},{no:2,name:"Storyboarding with Midjourney",status:"COMPLETED"},
  {no:3,name:"Generative Video Fundamentals",status:"COMPLETED"},{no:4,name:"Prompt Engineering for Video",status:"COMPLETED"},
  {no:5,name:"Cinematic Camera Movements",status:"COMPLETED"},{no:6,name:"AI Audio & Soundscapes",status:"COMPLETED"},
  {no:7,name:"Color Grading with AI Tools",status:"COMPLETED"},{no:8,name:"Character Consistency in AI",status:"COMPLETED"},
  {no:9,name:"Editing Workflows for AI Film",status:"COMPLETED"},{no:10,name:"VFX Compositing Basics",status:"COMPLETED"},
  {no:11,name:"Narrative Structure in AI Cinema",status:"COMPLETED"},{no:12,name:"Generative Video with Sora & Midjourney",status:"ACTIVE"},
  {no:13,name:"Advanced Temporal Consistency",status:"COMING SOON"},{no:14,name:"Multi-Scene Storytelling",status:"COMING SOON"},
];
const BC_STUDS=[
  {name:"Rajesh Kumar",email:"rajesh@gmail.com",mobile:"+91 98765 43210",joinDate:"Oct 1, 2024",status:"ACTIVE"},
  {name:"Priya Sharma",email:"priya@gmail.com",mobile:"+91 87654 32109",joinDate:"Oct 1, 2024",status:"ACTIVE"},
  {name:"Amit Patel",email:"amit@gmail.com",mobile:"+91 76543 21098",joinDate:"Oct 3, 2024",status:"COMPLETED"},
  {name:"Sneha Reddy",email:"sneha@gmail.com",mobile:"+91 65432 10987",joinDate:"Oct 5, 2024",status:"DROPPED"},
  {name:"Vikram Singh",email:"vikram@gmail.com",mobile:"+91 54321 09876",joinDate:"Oct 1, 2024",status:"ACTIVE"},
];
const BC_PROJS_DATA=[
  {no:"PROJECT 01",title:"AI-Generated Cinematic Storyboard",desc:"Create a 10-frame storyboard using Midjourney or DALL-E 3 depicting a sci-fi landscape.",req:["Minimum 10 story frames","Consistent character design throughout","Export as high-resolution PDF","Include prompt annotations"],res:["Storyboard_Template.pdf","Reference_Guide.zip"]},
  {no:"PROJECT 02",title:"Generative Video Short (30s)",desc:"Produce a 30-second short film using Runway Gen-2 or Pika Labs focusing on environmental storytelling.",req:["Minimum 30 seconds runtime","At least 3 distinct scenes","Original AI-generated audio","Submit as MP4 1080p"],res:["Video_Spec_Sheet.pdf","Audio_Guidelines.pdf"]},
  {no:"PROJECT 03",title:"AI Soundscapes & Scoring",desc:"Compose an original background score for your short film using Udio or Suno AI.",req:["Minimum 2-minute composition","3 distinct emotional shifts","Submission format: MP3 or WAV (320kbps)"],res:["Music_Brief.pdf"]},
  {no:"PROJECT 04",title:"Character Arc Visual Narrative",desc:"Create a complete character visual narrative using AI image generation tools.",req:["5 character state images","Consistent visual style","Clear story progression"],res:["Character_Sheet.pdf","Style_Reference.zip"]},
  {no:"PROJECT 05",title:"Final AI Film Portfolio",desc:"A 3-minute capstone film integrating all bootcamp skills learned throughout the program.",req:["Minimum 3 minutes runtime","All previous techniques integrated","Original score","Professional color grade"],res:["Portfolio_Rubric.pdf","Submission_Guide.pdf"]},
];
const BC_ANNS_DATA=[
  {id:1,title:"New Resource: AI Cinematography Guide",date:"Nov 15, 2024",status:"PUBLISHED",content:"I've just uploaded the comprehensive guide for Module 5. Please review it before today's live session at 7 PM EST."},
  {id:2,title:"Workshop Rescheduled: 1-on-1 Mentoring",date:"Nov 12, 2024",status:"PUBLISHED",content:"The Friday mentorship slot has been moved to 3:00 PM EST. Check the Mentorship tab for updates."},
  {id:3,title:"Upcoming: Guest Lecture by AI Director",date:"Nov 20, 2024",status:"SCHEDULED",content:"We have a special guest lecture coming up. A renowned AI film director will join us for a Q&A session."},
  {id:4,title:"Project 03 Deadline Extended",date:"Nov 10, 2024",status:"DRAFT",content:"Due to popular request, the deadline for Project 03 has been extended by one week."},
];
const BC_RESS=[
  {name:"AI Filmmaking Syllabus",category:"Course Material",type:"PDF",size:"2.4 MB",uploaded:"Oct 1",dl:145},
  {name:"Midjourney Prompt Cheatsheet",category:"Reference",type:"PDF",size:"1.2 MB",uploaded:"Oct 5",dl:203},
  {name:"Session Recording – Week 1",category:"Recording",type:"MP4",size:"1.8 GB",uploaded:"Oct 7",dl:67},
  {name:"Runway Gen-2 Tutorial Pack",category:"Project Files",type:"ZIP",size:"240 MB",uploaded:"Oct 10",dl:89},
  {name:"Color Grading LUTs Pack",category:"Project Files",type:"ZIP",size:"85 MB",uploaded:"Oct 15",dl:112},
  {name:"AIFA Community Discord",category:"External",type:"LINK",size:"—",uploaded:"Oct 1",dl:0},
];
function BootcampAdmin({ token }) {
  const [view,setView]=useState("list");
  const [sel,setSel]=useState(null);
  const [tab,setTab]=useState("overview");
  const [selProj,setSelProj]=useState(BC_PROJS_DATA[0]);
  const [selAnn,setSelAnn]=useState(null);
  const [annF,setAnnF]=useState({title:"",content:""});
  const [stgs,setStgs]=useState({name:"AI Filmmaking Bootcamp",code:"B01",startDate:"2024-10-01",endDate:"2025-01-31",status:"ACTIVE",zoomLink:"",zoomId:"",zoomPass:"",autoRecord:true,reminders:true,chat:true});
  const [mentors,setMentors]=useState([{name:"David Fincher AI",role:"Lead Instructor"},{name:"Sarah Jenkins",role:"Technical Mentor"}]);
  const [newMentor,setNewMentor]=useState("");
  /* Feature 5: sessions modal + search */
  const [editSession,setEditSession]=useState(null);
  const [sessSearch,setSessSearch]=useState("");
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
  /* G: Edit Details modal resources */
  const [modalResources,setModalResources]=useState(["Slides.pdf","Notes.pdf"]);
  /* H: View Student */
  const [viewStudent,setViewStudent]=useState(null);
  /* I: Edit Student */
  const [editStudent,setEditStudent]=useState(null);
  const [editStudNote,setEditStudNote]=useState("");
  /* J/K/L/M: Projects */
  const [localProj,setLocalProj]=useState(BC_PROJS_DATA[0]);
  const [projSaved,setProjSaved]=useState(false);
  const projFileRef=useRef(null);
  /* N: Resources upload */
  const resFileRef=useRef(null);
  /* O: Create Folder */
  const [showFolderInput,setShowFolderInput]=useState(false);
  const [folderName,setFolderName]=useState("");
  const [folderSaved,setFolderSaved]=useState(false);
  const h = { Authorization:`Bearer ${token}` };

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
    if (tab === "settings" && sel) {
      setStgs({
        name: sel.batchName || sel.title || "",
        code: sel.batchCode || "",
        startDate: sel.startDate ? sel.startDate.split("T")[0] : "",
        endDate: sel.endDate ? sel.endDate.split("T")[0] : "",
        status: sel.isPublished ? "ACTIVE" : "COMING SOON",
        zoomLink: sel.zoomLink || "",
        zoomId: sel.zoomId || "",
        zoomPass: sel.zoomPass || "",
        autoRecord: true, reminders: true, chat: true,
      });
      setMentors(sel.mentors || []);
    }
  }, [tab, sel?._id]);

  /* Settings save functions wired to real API */
  const saveBatchInfo = async () => {
    await fetch(`/api/bootcamps/${sel._id}`, { method:"PUT", headers:{...h,"Content-Type":"application/json"}, body:JSON.stringify({ batchName:stgs.name, batchCode:stgs.code, startDate:stgs.startDate, endDate:stgs.endDate, isPublished:stgs.status==="ACTIVE" }) });
    save(setSavedBatch);
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

  const TABS=["Overview","Sessions","Students","Projects","Announcement","Resources","Settings"];

  if(view==="list") return(
    <ListBootcampAdmin token={token} onSelect={(b)=>{setSel(b);setTab("overview");setView("detail");}} />
  );

  return(
    <div className="flex flex-col h-full">
      <div className="px-6 pt-5 pb-0 border-b border-white/5">
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
            <button onClick={()=>window.open("/dashboard","_blank")} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg hover:bg-white/5">PREVIEW STUDENT VIEW</button>
            <button onClick={()=>save(setSavedBatch)} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300 flex items-center gap-1.5"><I name="check" size={14}/>{savedBatch?"✓ SAVED":"SAVE CHANGES"}</button>
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
              {[{icon:"users",label:"TOTAL STUDENTS",val:"21"},{icon:"payments",label:"TOTAL REVENUE",val:"₹64,200"},{icon:"check",label:"SESSIONS COMPLETED",val:"08/22"},{icon:"resources",label:"PROJECT COMPLETED",val:"4/12"}].map(s=>(
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
                <I name="video" size={36} className="text-white"/>
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
                      <select defaultValue={editSession.status} className="w-full bg-[#1A1D1E] border border-white/15 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#C7E36B]">
                        {["Completed","Active","Coming Soon","Cancelled"].map(o=><option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1.5">Recording Link</p>
                      <div className="relative">
                        <I name="link" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
                        <input placeholder="Paste Video URL..." className="w-full bg-[#1A1D1E] border border-white/15 rounded-xl pl-9 pr-4 py-3 text-white text-sm outline-none focus:border-[#C7E36B] placeholder-gray-600"/>
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
                        await fetch(`/api/bootcamps/${sel._id}/sessions/${editSession._id}`, { method:"PUT", headers:{...h,"Content-Type":"application/json"}, body:JSON.stringify({ resources: modalResources.map(n=>({name:n,size:"—"})) }) });
                        setSessions(prev=>prev.map(s=>s._id===editSession._id?{...s,resources:modalResources.map(n=>({name:n,size:"—"}))}:s));
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

            <div className="flex items-center justify-between mb-2 gap-3">
              <div className="relative flex-1 max-w-xs">
                <I name="search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
                <input value={sessSearch} onChange={e=>setSessSearch(e.target.value)} placeholder="Search Sessions..." className="w-full bg-[#0F1112] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white outline-none placeholder-gray-600"/>
              </div>
              <button onClick={()=>setShowAddSession(true)} className="text-xs bg-[#C7E36B] text-black font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shrink-0"><I name="plus" size={12}/>Add Session</button>
            </div>
            {sessAdded&&<p className="text-green-400 text-xs mb-3 flex items-center gap-1">✓ Session added!</p>}
            {sessLoading ? (
              <p className="text-gray-500 text-sm animate-pulse text-center py-6">Loading sessions...</p>
            ) : (
              <div className="bg-[#0F1112] border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-white/10 text-gray-400">
                    {["No.","Session Name","Status","Edit Details","View Recording"].map(hd=><th key={hd} className="text-left px-4 py-3 font-semibold">{hd}</th>)}
                  </tr></thead>
                  <tbody>
                    {sessions.length === 0 ? (
                      <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500 text-xs">No sessions yet. Click '+ Add Session' to create the first one.</td></tr>
                    ) : sessions.filter(s=>!sessSearch||s.name.toLowerCase().includes(sessSearch.toLowerCase())).map(s=>(
                      <tr key={s._id||s.no} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03]">
                        <td className="px-4 py-3 text-gray-400">{String(s.no).padStart(2,"0")}</td>
                        <td className="px-4 py-3 text-white font-medium">{s.name}</td>
                        <td className="px-4 py-3"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${BC_ST[s.status]||"bg-gray-500/20 text-gray-400"}`}>{s.status}</span></td>
                        <td className="px-4 py-3"><button onClick={()=>setEditSession(s)} className="text-[#C7E36B] hover:underline text-xs">Edit Details</button></td>
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
                      <select defaultValue={editStudent.status} className="w-full bg-[#1A1D1E] border border-white/15 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#C7E36B]">
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
                    <button onClick={()=>{setEditStudent(null);setEditStudNote("");}} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300">SAVE CHANGES</button>
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-white">Enrolled Students ({students.length})</h2>
              <button onClick={()=>alert("Enter student email to add:\n(Invite feature — student must sign up first, then admin can assign them to this bootcamp.)")} className="text-xs bg-[#C7E36B] text-black font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"><I name="plus" size={12}/>Add Student</button>
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
                    .sort((a,b)=>studSort==="Name A-Z"?a.name.localeCompare(b.name):0)
                    .map((s,i)=>(
                    <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03]">
                      <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-full bg-[#C7E36B]/20 flex items-center justify-center text-[#C7E36B] text-[10px] font-bold">{s.name[0]}</div><span className="text-white font-medium">{s.name}</span></div></td>
                      <td className="px-4 py-3 text-gray-400">{s.email}</td>
                      <td className="px-4 py-3 text-gray-400">{s.mobile}</td>
                      <td className="px-4 py-3 text-gray-400">{s.joinDate}</td>
                      <td className="px-4 py-3"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${BC_ST[s.status]||"bg-gray-500/20 text-gray-400"}`}>{s.status}</span></td>
                      <td className="px-4 py-3"><div className="flex gap-2"><button onClick={()=>setViewStudent(s)} className="text-gray-400 hover:text-[#C7E36B]"><I name="eye" size={14}/></button><button onClick={()=>{setEditStudent(s);setEditStudNote("");}} className="text-gray-400 hover:text-[#C7E36B]"><I name="edit" size={14}/></button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab==="projects"&&(
          <ProjTab selProj={selProj} setSelProj={setSelProj} localProj={localProj} setLocalProj={setLocalProj} projSaved={projSaved} setProjSaved={setProjSaved} projFileRef={projFileRef} />
        )}

        {tab==="announcement"&&(
          <div className="flex gap-5">
            <div className="w-[260px] shrink-0 space-y-2">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white">Announcements</h3>
                <button onClick={()=>{setSelAnn(null);setAnnF({title:"",content:"",status:"DRAFT"});}} className="text-xs bg-[#C7E36B] text-black font-bold px-2.5 py-1 rounded-lg flex items-center gap-1"><I name="plus" size={12}/>Create Announcement</button>
              </div>
              <div className="relative mb-2">
                <I name="search" size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
                <input value={annSearch} onChange={e=>setAnnSearch(e.target.value)} placeholder="Search Announcements..." className="w-full bg-[#0F1112] border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-white outline-none placeholder-gray-600"/>
              </div>
              {anns.filter(a=>!annSearch||a.title.toLowerCase().includes(annSearch.toLowerCase())).map(a=>(
                <div key={a.id} onClick={()=>{setSelAnn(a);setAnnF({title:a.title,content:a.content,status:a.status});}} className={`p-3 border rounded-xl cursor-pointer transition-all ${selAnn?.id===a.id?"border-[#C7E36B]/50 bg-[#C7E36B]/5":"border-white/10 bg-[#0F1112] hover:border-white/20"}`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-bold text-white line-clamp-1 flex-1 pr-1">{a.title}</p>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${BC_ST[a.status]}`}>{a.status}</span>
                  </div>
                  <p className="text-[10px] text-gray-500">{a.date}</p>
                </div>
              ))}
            </div>
            <div className="flex-1 bg-[#0F1112] border border-white/10 rounded-xl p-5 space-y-4">
              <Fld label="Announcement Title" value={annF.title} onChange={v=>setAnnF({...annF,title:v})} placeholder="Enter announcement title..." />
              <div>
                <p className="text-[10px] text-gray-400 mb-1.5 font-semibold uppercase">Content</p>
                <div className="border border-white/10 rounded-lg overflow-hidden">
                  <div className="flex items-center gap-1 px-3 py-2 border-b border-white/10 bg-white/[0.03]">
                    {["B","I","U","Link"].map(t=><button key={t} className={`text-[11px] px-2 py-0.5 rounded text-gray-400 hover:text-white hover:bg-white/10 ${t==="B"?"font-bold":""}`}>{t}</button>)}
                  </div>
                  <textarea value={annF.content} onChange={e=>setAnnF({...annF,content:e.target.value})} className="w-full bg-transparent px-3 py-3 text-xs text-white outline-none resize-none" rows={7} placeholder="Write your announcement here..." />
                </div>
              </div>
              <div className="border-2 border-dashed border-white/10 rounded-lg p-3 text-center hover:border-[#C7E36B]/30 cursor-pointer transition-all">
                <I name="upload" size={18} className="mx-auto text-gray-500 mb-1"/>
                <p className="text-[11px] text-gray-400">Attach files (PDF, ZIP, etc.)</p>
              </div>
              <div className="flex gap-2">
                <button onClick={async()=>{
                  const body={title:annF.title,content:annF.content,status:"DRAFT"};
                  if(selAnn?._id){const r=await fetch(`/api/bootcamps/${sel._id}/announcements/${selAnn._id}`,{method:"PUT",headers:{...h,"Content-Type":"application/json"},body:JSON.stringify(body)});if(r.ok)setAnns(prev=>prev.map(a=>a._id===selAnn._id?{...a,...body}:a));}
                  else{const r=await fetch(`/api/bootcamps/${sel._id}/announcements`,{method:"POST",headers:{...h,"Content-Type":"application/json"},body:JSON.stringify(body)});if(r.ok){const d=await r.json();setAnns(prev=>[d,...prev]);setSelAnn(d);}}
                }} className="flex-1 border border-white/20 text-gray-300 text-xs font-semibold py-2 rounded-lg hover:bg-white/5">Save Draft</button>
                <button onClick={async()=>{
                  const body={title:annF.title,content:annF.content,status:"PUBLISHED"};
                  if(selAnn?._id){const r=await fetch(`/api/bootcamps/${sel._id}/announcements/${selAnn._id}`,{method:"PUT",headers:{...h,"Content-Type":"application/json"},body:JSON.stringify(body)});if(r.ok)setAnns(prev=>prev.map(a=>a._id===selAnn._id?{...a,...body}:a));}
                  else{const r=await fetch(`/api/bootcamps/${sel._id}/announcements`,{method:"POST",headers:{...h,"Content-Type":"application/json"},body:JSON.stringify(body)});if(r.ok){const d=await r.json();setAnns(prev=>[d,...prev]);setSelAnn(d);}}
                }} className="flex-1 bg-[#C7E36B] text-black text-xs font-bold py-2 rounded-lg hover:bg-lime-300">Publish Now</button>
              </div>
              {/* Gap 3: Preview Panel */}
              {(annF.title||annF.content)&&(
                <div className="border border-white/10 rounded-xl overflow-hidden">
                  <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center gap-2">
                    <I name="eye" size={12} className="text-gray-500"/>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Preview</p>
                  </div>
                  <div className="p-4 bg-[#0F1112]">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[9px] font-bold bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded-full">{annF.status||"DRAFT"}</span>
                      <span className="text-[10px] text-gray-500">Preview</span>
                    </div>
                    {annF.title&&<p className="text-sm font-bold text-white mb-1">{annF.title}</p>}
                    {annF.content&&<p className="text-xs text-gray-400 leading-relaxed whitespace-pre-wrap">{annF.content}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {tab==="resources"&&(
          <div className="space-y-5">
            <input type="file" multiple ref={resFileRef} className="hidden"/>
            {/* Feature 6: redesigned header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Resources</h2>
                <p className="text-gray-400 text-xs mt-0.5">Manage all downloadable resources available to students.</p>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>setShowFolderInput(v=>!v)} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg hover:bg-white/5">CREATE FOLDER</button>
                <button onClick={()=>resFileRef.current?.click()} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300 flex items-center gap-1"><I name="upload" size={12}/>Upload Resources</button>
              </div>
            </div>
            {showFolderInput&&(
              <div className="flex items-center gap-2 bg-[#0F1112] border border-white/10 rounded-xl px-4 py-3">
                <span className="text-lg">📁</span>
                <input value={folderName} onChange={e=>setFolderName(e.target.value)} placeholder="New folder name..." className="flex-1 bg-transparent text-sm text-white outline-none placeholder-gray-600"/>
                <button onClick={()=>{setShowFolderInput(false);setFolderName("");setFolderSaved(true);setTimeout(()=>setFolderSaved(false),2000);}} className="text-xs bg-[#C7E36B] text-black font-bold px-3 py-1.5 rounded-lg">Create</button>
                <button onClick={()=>{setShowFolderInput(false);setFolderName("");}} className="text-gray-400 hover:text-white text-lg leading-none">✕</button>
              </div>
            )}
            {folderSaved&&<p className="text-green-400 text-xs flex items-center gap-1">✓ Folder created!</p>}

            {/* Drag & Drop Zone */}
            <label className="block border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-[#C7E36B]/40 transition-all">
              <input type="file" multiple className="hidden"/>
              <div className="text-3xl mb-2">↑</div>
              <p className="text-white font-bold text-sm mb-1">Drag & Drop to Upload</p>
              <p className="text-gray-400 text-xs mb-4">or click to browse from your computer</p>
              <div className="flex justify-center gap-2 flex-wrap">
                {["PDF","ZIP","DOCX","PPTX","MEDIA"].map(t=>(
                  <span key={t} className="bg-white/10 text-gray-400 text-xs px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </label>

            {/* All Resources list */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-white text-sm font-bold">All Resources</p>
                <div className="relative">
                  <I name="search" size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
                  <input className="bg-[#0F1112] border border-white/10 rounded-xl pl-8 pr-4 py-2 text-xs text-white outline-none placeholder-gray-600 w-[200px]" placeholder="Search resources..."/>
                </div>
              </div>
              <div className="divide-y divide-white/5">
                {BC_RESS.map((r,i)=>(
                  <div key={i} className="flex items-center gap-3 py-3">
                    <I name="resources" size={16} className="text-gray-500 shrink-0"/>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{r.name}</p>
                      <p className="text-gray-500 text-xs">{r.category}</p>
                    </div>
                    <span className="text-gray-400 text-xs shrink-0">{r.size}</span>
                    <span className="text-gray-400 text-xs shrink-0">Jun 12, 2026</span>
                    <div className="flex gap-2 shrink-0">
                      <button className="text-gray-400 hover:text-[#C7E36B]"><I name="edit" size={13}/></button>
                      <button className="text-gray-400 hover:text-red-400"><I name="trash" size={13}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab==="settings"&&(
          <div className="max-w-2xl space-y-5">
            <Sect icon="bootcamp" title="Batch Information">
              <div className="grid grid-cols-2 gap-4">
                <Fld label="Bootcamp Name" value={stgs.name} onChange={v=>setStgs({...stgs,name:v})} />
                <Fld label="Batch Code" value={stgs.code} onChange={v=>setStgs({...stgs,code:v})} />
                <Fld label="Start Date" value={stgs.startDate} onChange={v=>setStgs({...stgs,startDate:v})} />
                <Fld label="End Date" value={stgs.endDate} onChange={v=>setStgs({...stgs,endDate:v})} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 mb-1.5 font-semibold uppercase">Batch Status</p>
                <div className="flex gap-2 flex-wrap">
                  {["ACTIVE","COMPLETED","COMING SOON","CANCELLED"].map(s=>(
                    <button key={s} onClick={()=>setStgs({...stgs,status:s})} className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-all ${stgs.status===s?"bg-[#C7E36B] text-black border-[#C7E36B]":"border-white/20 text-gray-400 hover:border-white/40"}`}>{s}</button>
                  ))}
                </div>
              </div>
              {/* Feature 7C: per-section save */}
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
  const [saving, setSaving]       = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [editLessons, setEditLessons] = useState([]);
  const [editSaving, setEditSaving] = useState(false);
  const [editMsg, setEditMsg]     = useState("");
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
            const res = await fetch(`/api/courses/${editCourse._id}/lessons`, {
              method: "PUT",
              headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
              body: JSON.stringify({ lessons: editLessons.map((l, i) => ({ ...l, order: i })) }),
            });
            if (res.ok) { setEditMsg("Saved!"); loadCourses(); }
            else setEditMsg("Save failed.");
            setEditSaving(false);
            setTimeout(() => setEditMsg(""), 3000);
          }} disabled={editSaving} className="text-xs bg-[#C7E36B] text-black font-bold px-5 py-2 rounded-lg disabled:opacity-60">
            {editSaving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4">
          {editCourse.thumbnail && <img src={editCourse.thumbnail} alt="" className="w-24 h-16 rounded-lg object-cover shrink-0"/>}
          <div>
            <p className="text-xs text-gray-400 mb-1">{editCourse.level} · {editCourse.category} · {editCourse.language}</p>
            <p className="text-sm text-gray-300 line-clamp-2">{editCourse.description}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-white">Lesson Videos</h2>
              <p className="text-xs text-gray-400">{editLessons.length} lessons · Add YouTube or Vimeo embed URLs</p>
            </div>
            <button onClick={() => setEditLessons([...editLessons, { title: "", videoUrl: "", duration: "", isFree: false }])} className="text-xs bg-[#C7E36B] text-black font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"><I name="plus" size={12}/> Add Lesson</button>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-4 text-xs text-gray-400">
            <p className="font-semibold text-gray-300 mb-1">Supported video URL formats:</p>
            <div className="grid grid-cols-2 gap-2">
              <div><p className="text-[#C7E36B] font-semibold">YouTube Embed:</p><code className="text-[10px]">https://www.youtube.com/embed/VIDEO_ID</code></div>
              <div><p className="text-[#C7E36B] font-semibold">Vimeo Embed:</p><code className="text-[10px]">https://player.vimeo.com/video/VIDEO_ID</code></div>
            </div>
            <p className="mt-2 text-[10px] text-gray-500">To get YouTube embed URL: Open video → Share → Embed → copy the src URL (starts with https://www.youtube.com/embed/)</p>
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
                    <input value={lesson.videoUrl || ""} onChange={e => setEditLessons(ls => ls.map((l, i) => i === idx ? { ...l, videoUrl: e.target.value } : l))} placeholder="https://www.youtube.com/embed/..." className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50 font-mono"/>
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
                  <button onClick={()=>{ setEditCourse(c); setEditLessons(c.lessons&&c.lessons.length>0?c.lessons.map(l=>({...l})):[{title:"",videoUrl:"",duration:"",isFree:false}]); setView("edit"); }} className="text-xs border border-white/20 text-gray-300 px-2 py-1.5 rounded-lg hover:bg-white/5 flex items-center gap-1"><I name="edit" size={11}/>Edit</button>
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
  const [resType, setResType]   = useState("prompt");
  const [form, setForm]         = useState({ title:"", category:"", subCategory:"", description:"", thumbnail:"", content:"", allowCopy:true, isFeatured:false, discount:"", link:"", logo:"" });
  const [steps, setSteps]       = useState([{ title:"", description:"" }]);
  const [tools, setTools]       = useState([]);
  const [newTool, setNewTool]   = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const [projectSearch, setProjectSearch] = useState("");

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

  /* ── Split-panel add form ── */
  if (showForm) {
    const lt = resType;
    return (
      <div className="flex h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold text-white">Add Resource</h1>
            <div className="flex gap-2">
              <button onClick={()=>setShowForm(false)} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg hover:bg-white/5">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="text-xs border border-[#C7E36B]/40 text-[#C7E36B] font-bold px-4 py-2 rounded-lg hover:bg-[#C7E36B]/10 disabled:opacity-60">Save as Draft</button>
              <button onClick={handleSave} disabled={saving} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg disabled:opacity-60">{saving?"Saving...":"Publish Resource"}</button>
            </div>
          </div>
          {msg && <p className={`text-xs ${msg==="Saved!"?"text-green-400":"text-red-400"}`}>{msg}</p>}

          {/* Type selector */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Select Resource Type</p>
            <div className="flex gap-2 flex-wrap">
              {TYPE_OPTS.map(t => (
                <button key={t.key} onClick={()=>setResType(t.key)}
                  className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl border transition-all ${resType===t.key?"border-[#C7E36B] bg-[#C7E36B]/10 text-[#C7E36B]":"border-white/15 text-gray-400 hover:border-white/30 hover:text-white"}`}>
                  <span className="text-xl">{t.icon}</span>
                  <span className="text-[10px] font-semibold">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Basic info */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Basic Information</p>
            <Fld label="TITLE" value={form.title} onChange={v=>setForm({...form,title:v})} placeholder="Resource title..." />
            <div className="grid grid-cols-2 gap-3">
              <Fld label="CATEGORY" value={form.category} onChange={v=>setForm({...form,category:v})} placeholder="e.g. Photography" />
              <Fld label="SUB-CATEGORY" value={form.subCategory} onChange={v=>setForm({...form,subCategory:v})} placeholder="e.g. Lighting" />
            </div>
            <Fld label="SHORT DESCRIPTION" value={form.description} onChange={v=>setForm({...form,description:v})} textarea placeholder="Brief description..." />
            <Fld label="THUMBNAIL URL" value={form.thumbnail} onChange={v=>setForm({...form,thumbnail:v})} placeholder="https://..." />
          </div>

          {/* Prompt / Tip content */}
          {(lt==="prompt"||lt==="tip") && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{lt==="prompt"?"Prompt Content":"Tip Content"}</p>
              <Fld label="CONTENT" value={form.content} onChange={v=>setForm({...form,content:v})} textarea placeholder={lt==="prompt"?"Write the full prompt text...":"Write the learning tip..."} />
              <div className="flex items-center gap-3"><span className="text-xs text-gray-400">Allow Copy</span><Tog value={form.allowCopy} onChange={v=>setForm({...form,allowCopy:v})}/></div>
            </div>
          )}

          {/* Workflow Steps Builder */}
          {lt==="workflow" && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Steps Builder</p>
                <button onClick={()=>setSteps([...steps,{title:"",description:""}])} className="text-[10px] text-[#C7E36B] border border-dashed border-[#C7E36B]/40 px-2 py-1 rounded-lg hover:bg-[#C7E36B]/10 flex items-center gap-1"><I name="plus" size={10}/>+ Add Step</button>
              </div>
              <div className="space-y-3">
                {steps.map((s,i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-5 h-5 rounded-full bg-[#C7E36B] text-black text-[10px] font-black flex items-center justify-center shrink-0">{i+1}</span>
                      <input value={s.title} onChange={e=>setSteps(ss=>ss.map((x,j)=>j===i?{...x,title:e.target.value}:x))}
                        placeholder={`Step ${i+1} Title`}
                        className="flex-1 bg-transparent border-0 text-sm text-white outline-none placeholder-gray-600"/>
                      {steps.length>1 && <button onClick={()=>setSteps(ss=>ss.filter((_,j)=>j!==i))} className="text-gray-600 hover:text-red-400 shrink-0"><I name="trash" size={12}/></button>}
                    </div>
                    <textarea value={s.description} onChange={e=>setSteps(ss=>ss.map((x,j)=>j===i?{...x,description:e.target.value}:x))}
                      placeholder="Step description..." rows={2}
                      className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-gray-300 outline-none focus:border-[#C7E36B]/40 resize-none placeholder-gray-600"/>
                  </div>
                ))}
              </div>
              <button onClick={()=>setSteps([...steps,{title:"",description:""}])} className="w-full border-2 border-dashed border-white/10 text-gray-500 hover:border-[#C7E36B]/30 hover:text-[#C7E36B] text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1">
                <I name="plus" size={12}/> + Add Another Step
              </button>
            </div>
          )}

          {/* Project tools */}
          {lt==="project" && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tools & Links</p>
              <div className="flex flex-wrap gap-1.5">
                {tools.map(t=>(
                  <span key={t} className="flex items-center gap-1 text-[10px] bg-white/10 text-gray-400 px-2 py-1 rounded-full">
                    {t}<button onClick={()=>setTools(ts=>ts.filter(x=>x!==t))} className="text-gray-600 hover:text-red-400">×</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input value={newTool} onChange={e=>setNewTool(e.target.value)}
                  onKeyDown={e=>{if(e.key==="Enter"&&newTool.trim()){setTools(ts=>[...ts,newTool.trim()]);setNewTool("");}}}
                  placeholder="Add tool (e.g. Midjourney)..." className="flex-1 bg-[#1A1D1E] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white outline-none focus:border-[#C7E36B]/50 min-w-0"/>
                <button onClick={()=>{if(newTool.trim()){setTools(ts=>[...ts,newTool.trim()]);setNewTool("");}}}
                  className="text-[10px] border border-dashed border-[#C7E36B]/40 text-[#C7E36B] px-2 py-1.5 rounded-lg">+ Add</button>
              </div>
              <Fld label="INTERNAL LINK" value={form.link} onChange={v=>setForm({...form,link:v})} placeholder="/projects/my-project"/>
            </div>
          )}

          {/* Deal fields */}
          {lt==="deal" && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Deal Details</p>
              <div className="grid grid-cols-3 gap-3">
                <Fld label="LOGO/EMOJI" value={form.logo} onChange={v=>setForm({...form,logo:v})} placeholder="🤖"/>
                <Fld label="DISCOUNT" value={form.discount} onChange={v=>setForm({...form,discount:v})} placeholder="20% OFF"/>
                <Fld label="DEAL LINK" value={form.link} onChange={v=>setForm({...form,link:v})} placeholder="https://..."/>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">Featured Resource</span>
            <Tog value={form.isFeatured} onChange={v=>setForm({...form,isFeatured:v})}/>
          </div>
        </div>

        {/* Live preview */}
        <div className="w-[280px] shrink-0 border-l border-white/5 bg-[#0F1112] p-5 overflow-y-auto">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-4">Live Preview</p>
          {lt==="deal" ? (
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="h-[70px] bg-gray-100 flex items-center justify-center text-4xl">{form.logo||"🔧"}</div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900">{form.title||"Deal Title"}</h3>
                <p className="text-xs text-gray-500">{form.description||"Description"}</p>
                <p className="text-xl font-black text-gray-900 mt-2">{form.discount||"XX% OFF"}</p>
                <p className="text-[10px] text-[#C7E36B] font-semibold">VIA AIFA</p>
                <button className="w-full bg-[#C7E36B] text-black text-sm font-bold py-2 rounded-lg mt-3">Get Deal</button>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              {form.thumbnail ? <img src={form.thumbnail} alt="" className="w-full h-28 object-cover"/> : <div className="w-full h-28 bg-white/5 flex items-center justify-center text-gray-600 text-xs">Thumbnail Preview</div>}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {form.category && <span className="text-[9px] bg-[#C7E36B]/20 text-[#C7E36B] font-bold px-2 py-0.5 rounded-full">{form.category}</span>}
                  {lt==="workflow" && <span className="text-[9px] bg-white/10 text-gray-400 px-2 py-0.5 rounded-full">SEO Optimized</span>}
                  {lt==="workflow" && <span className="text-[9px] bg-white/10 text-gray-400 px-2 py-0.5 rounded-full">Mobile Responsive</span>}
                  {lt==="project" && form.isFeatured && <span className="text-[9px] bg-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded-full">PUBLISHED</span>}
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{form.title||"Resource Title"}</h3>
                <p className="text-[10px] text-gray-400 line-clamp-2">{form.description||"Description will appear here"}</p>
                {lt==="workflow" && steps.length>0 && (
                  <div className="mt-3 border-t border-white/5 pt-3">
                    <p className="text-[9px] text-gray-500 font-semibold mb-1">{steps.length} STEP{steps.length!==1?"S":""}</p>
                    {steps.slice(0,2).map((s,i)=><p key={i} className="text-[10px] text-gray-400 truncate">· {s.title||`Step ${i+1}`}</p>)}
                  </div>
                )}
                <button className="text-[#C7E36B] text-xs mt-3 flex items-center gap-1">View Details →</button>
              </div>
            </div>
          )}
          <div className="mt-4 bg-[#C7E36B]/5 border border-[#C7E36B]/20 rounded-xl p-3">
            <p className="text-[9px] font-bold text-[#C7E36B] mb-1">EDITOR NOTE</p>
            <p className="text-[10px] text-gray-400">Preview updates as you type. Publish when ready or save as draft to review later.</p>
          </div>
        </div>
      </div>
    );
  }

  /* ── Normal list view ── */
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div><h1 className="text-xl font-bold text-white">Resources</h1><p className="text-xs text-gray-400">Manage all learning resources by category</p></div>
        <button onClick={openAddForm} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300 flex items-center gap-1.5">
          <I name="plus" size={14}/>{tab==="project"?"+ Add Project":"+ Add Resource"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 border-b border-white/10">
        {RES_TABS.map(t => (
          <button key={t.key} onClick={()=>setTab(t.key)} className={`px-4 py-2 text-sm font-medium border-b-2 transition-all -mb-px ${tab===t.key?"border-[#C7E36B] text-[#C7E36B]":"border-transparent text-gray-400 hover:text-white"}`}>{t.label}</button>
        ))}
      </div>

      {/* Projects showcase */}
      {tab==="project" && (
        <div>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="flex gap-1 bg-white/5 rounded-xl p-1">
              {[["all","All Projects"],["published","Published"],["draft","Drafts"]].map(([k,l])=>(
                <button key={k} onClick={()=>setProjectFilter(k)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${projectFilter===k?"bg-[#C7E36B] text-black":"text-gray-400 hover:text-white"}`}>{l}</button>
              ))}
            </div>
            <input value={projectSearch} onChange={e=>setProjectSearch(e.target.value)} placeholder="Search projects..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-600 outline-none max-w-[240px]"/>
          </div>
          {loading ? <p className="text-gray-500 text-sm animate-pulse">Loading...</p> : (
            resources.length===0 ? (
              <div className="text-center py-12"><p className="text-gray-500 text-sm">No projects yet</p><button onClick={openAddForm} className="mt-3 text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg">Add First Project</button></div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {resources.filter(r=>projectSearch?r.title.toLowerCase().includes(projectSearch.toLowerCase()):true).map(r=>(
                  <div key={r._id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group hover:border-white/20 transition-all">
                    <div className="relative h-36 overflow-hidden">
                      {r.thumbnail ? <img src={r.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt=""/> : <div className="w-full h-full bg-white/5 flex items-center justify-center text-gray-600 text-sm">No Image</div>}
                      <button onClick={()=>handleDelete(r._id)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500/80 text-white rounded-full w-6 h-6 flex items-center justify-center transition-all"><I name="trash" size={12}/></button>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-white mb-1">{r.title}</h3>
                      <p className="text-[10px] text-gray-400 line-clamp-2 mb-2">{r.description}</p>
                      <button className="text-[#C7E36B] text-xs">View Details →</button>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      )}

      {/* Other tabs: list/deal view */}
      {tab!=="project" && (
        <>
          {loading ? <p className="text-gray-500 text-sm animate-pulse">Loading...</p> : (
            <>
              {resources.length===0 && (
                <div className="text-center py-12"><p className="text-gray-500 text-sm">No {RES_TABS.find(t=>t.key===tab)?.label} resources yet</p><button onClick={openAddForm} className="mt-3 text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg">Add First</button></div>
              )}
              {tab==="deal" ? (
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

/* ── COMMUNITY ADMIN ── */
const MOCK_THREADS = [
  { id:1, votes:142, tag:"DISCUSSION", tagCls:"bg-green-500/20 text-green-400",  title:"The future of Sora in commercial filmmaking?",          excerpt:"I've been testing some of the new clips and the temporal consistency is actually impressive for short-form ads...", author:"Sarah Chen",  time:"2h ago",  replies:48, flagged:false },
  { id:2, votes:12,  tag:"REPORTED",   tagCls:"bg-red-500/20 text-red-400",     title:"Spam link detected in prompt sharing",                    excerpt:"Content hidden pending moderator review...",                                                                       author:"User_9921", time:"5h ago",  replies:0,  flagged:true  },
  { id:3, votes:89,  tag:"FIX MY PROMPT",tagCls:"bg-yellow-500/20 text-yellow-400",title:"Help! My Midjourney hands are still looking like claws",excerpt:"I've tried --v 6 and specific negative prompts but I can't get it right...",                                      author:"David Miller",time:"8h ago", replies:12, flagged:false },
];
const MOCK_REPORTS = [
  { type:"HATE SPEECH", typeCls:"bg-red-500",    content:'Reported on: "Is AI taking over..."', time:"10m ago", actions:["Ban","Dismiss"]   },
  { type:"SPAM",        typeCls:"bg-orange-500",  content:'Reported on: "Check my new tool..."', time:"45m ago", actions:["Warn","Dismiss"]  },
];

function CommunityAdmin({ token }) {
  const [keywords, setKeywords]     = useState(["crypto","nft","discount"]);
  const [newKw, setNewKw]           = useState("");
  const [showEventForm, setShowEventForm] = useState(false);
  const [event, setEvent] = useState({ title:"", type:"Workshop", mode:"ONLINE", date:"", startTime:"", duration:"2", capacity:"50", link:"", openRSVP:true, featured:false });

  if (showEventForm) {
    const previewDate = event.date ? new Date(event.date + "T00:00:00") : null;
    return (
      <div className="flex h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <button onClick={()=>setShowEventForm(false)} className="text-xs text-gray-400 hover:text-white border border-white/15 px-3 py-1.5 rounded-lg">← Back</button>
            <h1 className="text-xl font-bold text-white">Create New Event</h1>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Basic Info</p>
            <Fld label="EVENT TITLE" value={event.title} onChange={v=>setEvent({...event,title:v})} placeholder="e.g. AI Filmmaking Masterclass" />
            <div>
              <p className="text-[10px] text-gray-400 font-semibold mb-1">EVENT TYPE</p>
              <select value={event.type} onChange={e=>setEvent({...event,type:e.target.value})} className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/50">
                {["Workshop","Webinar","Masterclass","AMA","Hackathon"].map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold mb-2">MODE</p>
              <div className="flex gap-2">
                {["ONLINE","OFFLINE"].map(m=>(
                  <button key={m} onClick={()=>setEvent({...event,mode:m})}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${event.mode===m?"border-[#C7E36B] bg-[#C7E36B]/10 text-[#C7E36B]":"border-white/15 text-gray-400 hover:border-white/30"}`}>
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Schedule</p>
            <div className="grid grid-cols-2 gap-3">
              <Fld label="DATE" value={event.date} onChange={v=>setEvent({...event,date:v})} placeholder="YYYY-MM-DD" />
              <Fld label="START TIME" value={event.startTime} onChange={v=>setEvent({...event,startTime:v})} placeholder="e.g. 7:00 PM IST" />
              <Fld label="DURATION (hrs)" value={event.duration} onChange={v=>setEvent({...event,duration:v})} placeholder="2" />
              <Fld label="CAPACITY" value={event.capacity} onChange={v=>setEvent({...event,capacity:v})} placeholder="50" />
            </div>
            {event.mode==="ONLINE" && <Fld label="MEETING LINK" value={event.link} onChange={v=>setEvent({...event,link:v})} placeholder="https://meet.google.com/..." />}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Event Controls</p>
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-white">Open RSVP</p><p className="text-[10px] text-gray-400">Allow students to register</p></div>
              <Tog value={event.openRSVP} onChange={v=>setEvent({...event,openRSVP:v})}/>
            </div>
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-white">Featured Event</p><p className="text-[10px] text-gray-400">Show prominently on homepage</p></div>
              <Tog value={event.featured} onChange={v=>setEvent({...event,featured:v})}/>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={()=>setShowEventForm(false)} className="text-xs border border-white/20 text-gray-300 px-5 py-2.5 rounded-lg hover:bg-white/5">Cancel</button>
            <button className="text-xs bg-[#C7E36B] text-black font-bold px-5 py-2.5 rounded-lg hover:bg-lime-300 flex items-center gap-2"><I name="plus" size={14}/> Create Event</button>
          </div>
        </div>
        {/* Live preview */}
        <div className="w-[280px] shrink-0 border-l border-white/5 bg-[#0F1112] p-5 overflow-y-auto">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-4">Live Preview</p>
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="bg-[#C7E36B] text-black px-4 pt-4 pb-3">
              <p className="text-3xl font-black leading-none">{previewDate ? previewDate.getDate() : "—"}</p>
              <p className="text-xs font-bold uppercase">{previewDate ? previewDate.toLocaleDateString("en",{month:"long",year:"numeric"}) : "Date TBD"}</p>
            </div>
            <div className="p-4 space-y-2">
              {event.featured && <span className="text-[9px] bg-orange-500/20 text-orange-400 font-bold px-2 py-0.5 rounded-full">FEATURED</span>}
              <h3 className="text-sm font-bold text-white">{event.title || "Event Title"}</h3>
              <div className="text-[10px] text-gray-400 space-y-1">
                <p>🕐 {event.startTime || "Time TBD"} · {event.duration}h</p>
                <p>📍 {event.mode}</p>
                <p>👥 {event.capacity} spots</p>
              </div>
              {event.openRSVP && <button className="w-full mt-2 bg-[#C7E36B] text-black text-xs font-bold py-2 rounded-lg">RSVP Now →</button>}
            </div>
          </div>
          <p className="text-[9px] text-gray-600 mt-4 text-center">Preview updates in real-time</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full overflow-hidden">
      {/* Main panel */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold text-white">Forum Management</h1>
            <p className="text-xs text-gray-400 mt-0.5">Monitor community discussions and moderate content.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={()=>setShowEventForm(true)} className="bg-white/10 text-white font-bold text-sm px-4 py-2 rounded-xl hover:bg-white/20 flex items-center gap-2">
              📅 Create Event
            </button>
            <button className="bg-[#C7E36B] text-black font-bold text-sm px-4 py-2 rounded-xl hover:opacity-90 flex items-center gap-2">
              <I name="plus" size={15} /> Create Thread
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          {["All Categories","All Flairs","Status: Active"].map(f => (
            <button key={f} className="text-xs border border-white/15 text-gray-400 px-3 py-1.5 rounded-lg hover:border-white/30 hover:text-white transition-all">
              {f}
            </button>
          ))}
          <div className="ml-auto text-xs text-gray-500">
            Sort: <span className="text-white font-semibold">Newest</span>
          </div>
        </div>

        {/* Thread list */}
        <div className="space-y-3">
          {MOCK_THREADS.map(t => (
            <div key={t.id} className={`border rounded-xl p-4 transition-all ${t.flagged ? "border-red-500/30 bg-red-500/5" : "border-white/10 bg-white/5 hover:border-white/20"}`}>
              <div className="flex gap-4">
                {/* Vote column */}
                <div className="flex flex-col items-center gap-0.5 shrink-0 w-8 pt-0.5">
                  <button className="text-gray-600 hover:text-[#C7E36B] text-xs leading-none">▲</button>
                  <span className="text-xs font-bold text-white">{t.votes}</span>
                  <button className="text-gray-600 hover:text-red-400 text-xs leading-none">▼</button>
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${t.tagCls}`}>{t.tag}</span>
                    <h3 className="text-sm font-semibold text-white">{t.title}</h3>
                  </div>
                  <p className={`text-xs mb-2 line-clamp-2 ${t.flagged ? "text-gray-500 italic" : "text-gray-400"}`}>{t.excerpt}</p>
                  <div className="flex items-center gap-3 text-[10px] text-gray-500 flex-wrap">
                    {t.flagged && <span className="text-red-400 font-semibold">⚠ Flagged by 3 users</span>}
                    <span className="font-semibold text-gray-400">{t.author}</span>
                    <span>• {t.time}</span>
                    {t.replies > 0 && <span>💬 {t.replies} replies</span>}
                  </div>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  {t.flagged && (
                    <button className="text-[10px] bg-red-500/20 text-red-400 font-bold px-2 py-1 rounded-lg hover:bg-red-500/30 mr-1">Resolve</button>
                  )}
                  <button title="Pin" className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-500 hover:text-white text-xs transition-all">📌</button>
                  <button title="Delete" className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-all"><I name="trash" size={13} /></button>
                  <button title="Move" className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-500 hover:text-white text-xs transition-all">⇅</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Moderation Hub sidebar */}
      <div className="w-[260px] shrink-0 border-l border-white/5 bg-[#0F1112] overflow-y-auto p-4">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">🛡 Moderation Hub</h3>

        {/* Active Reports */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Active Reports</p>
            <span className="text-[9px] bg-red-500/20 text-red-400 font-bold px-1.5 py-0.5 rounded">12 New</span>
          </div>
          <div className="space-y-2">
            {MOCK_REPORTS.map((r, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[9px] font-bold text-white px-1.5 py-0.5 rounded ${r.typeCls}`}>{r.type}</span>
                  <span className="text-[10px] text-gray-500">{r.time}</span>
                </div>
                <p className="text-[11px] text-gray-400 mb-2">{r.content}</p>
                <div className="flex gap-2">
                  <button className="flex-1 text-[10px] bg-red-500/20 text-red-400 font-bold py-1 rounded-lg hover:bg-red-500/30 transition-all">{r.actions[0]}</button>
                  <button className="flex-1 text-[10px] bg-white/10 text-gray-400 font-bold py-1 rounded-lg hover:bg-white/20 transition-all">{r.actions[1]}</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flagged Keywords */}
        <div className="mb-5">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Flagged Keywords</p>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {keywords.map(k => (
              <span key={k} className="flex items-center gap-1 text-[10px] bg-white/10 text-gray-400 px-2 py-1 rounded-full">
                {k}
                <button onClick={() => setKeywords(ks => ks.filter(x => x !== k))} className="text-gray-600 hover:text-red-400 leading-none">×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-1">
            <input value={newKw} onChange={e => setNewKw(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && newKw.trim()) { setKeywords(ks => [...ks, newKw.trim()]); setNewKw(""); } }}
              placeholder="Add keyword..." className="flex-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[11px] text-white outline-none focus:border-[#C7E36B]/50 min-w-0" />
            <button onClick={() => { if (newKw.trim()) { setKeywords(ks => [...ks, newKw.trim()]); setNewKw(""); } }}
              className="text-[10px] border border-dashed border-[#C7E36B]/40 text-[#C7E36B] px-2 py-1 rounded-lg hover:border-[#C7E36B]/80 transition-all">+ Add</button>
          </div>
        </div>

        {/* Community Pulse */}
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Community Pulse</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-[9px] text-gray-500 uppercase tracking-wider mb-1">New Users</p>
              <p className="text-base font-bold text-[#C7E36B]">+242</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-[9px] text-gray-500 uppercase tracking-wider mb-1">Total Posts</p>
              <p className="text-base font-bold text-white">1.2k</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SERVICE REQUEST ADMIN ── */
const SR_STATUS_COLORS = { new:"bg-blue-500/20 text-blue-400", "in-progress":"bg-yellow-500/20 text-yellow-400", completed:"bg-green-500/20 text-green-400", rejected:"bg-red-500/20 text-red-400" };
const SR_SERVICE_LABELS = { "corporate-training":"Corporate Training","curriculum-consulting":"Curriculum Consulting","production-support":"Production Support","ai-content":"AI Content Production" };
const SR_SERVICE_COLORS = { "corporate-training":"bg-purple-500/20 text-purple-400","curriculum-consulting":"bg-blue-500/20 text-blue-400","production-support":"bg-orange-500/20 text-orange-400","ai-content":"bg-[#C7E36B]/20 text-[#C7E36B]" };

function ServiceRequestAdmin({ token }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);
  const [saving, setSaving]     = useState(false);
  const [filter, setFilter]     = useState("all");
  const [note, setNote]         = useState("");
  const [status, setStatus]     = useState("");

  useEffect(() => {
    fetch("/api/service-requests", { headers:{ Authorization:`Bearer ${token}` } })
      .then(r=>r.json()).then(d=>{ if(Array.isArray(d)) setRequests(d); setLoading(false); }).catch(()=>setLoading(false));
  }, [token]);

  const selectReq = (r) => { setSelected(r); setNote(r.adminNote||""); setStatus(r.status); };

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    const res = await fetch(`/api/service-requests/${selected._id}`, { method:"PUT", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}, body:JSON.stringify({ status, adminNote:note }) });
    const data = await res.json();
    if (res.ok) { setRequests(rs=>rs.map(r=>r._id===data._id?data:r)); setSelected(data); }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!selected || !window.confirm("Delete this request?")) return;
    await fetch(`/api/service-requests/${selected._id}`, { method:"DELETE", headers:{ Authorization:`Bearer ${token}` } });
    setRequests(rs=>rs.filter(r=>r._id!==selected._id)); setSelected(null);
  };

  const filtered = requests.filter(r=>filter==="all"||r.status===filter);
  const newCount = requests.filter(r=>r.status==="new").length;

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left list */}
      <div className="w-[340px] shrink-0 border-r border-white/5 overflow-y-auto">
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-base font-bold text-white">Service Requests</h1>
            {newCount>0 && <span className="text-[10px] bg-blue-500/20 text-blue-400 font-bold px-2 py-0.5 rounded-full">{newCount} New</span>}
          </div>
          <div className="flex gap-1 flex-wrap">
            {["all","new","in-progress","completed","rejected"].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} className={`text-[10px] px-2 py-1 rounded-full font-semibold capitalize transition-all ${filter===f?"bg-[#C7E36B] text-black":"bg-white/5 text-gray-400 hover:bg-white/10"}`}>{f==="all"?"All":f}</button>
            ))}
          </div>
        </div>
        {loading ? <p className="text-gray-500 text-sm animate-pulse p-4">Loading...</p> : (
          <div className="divide-y divide-white/5">
            {filtered.length===0 && <p className="text-gray-500 text-sm p-4">No requests</p>}
            {filtered.map(r=>(
              <button key={r._id} onClick={()=>selectReq(r)} className={`w-full text-left p-4 hover:bg-white/5 transition-all ${selected?._id===r._id?"border-l-2 border-[#C7E36B] bg-white/5":""}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-white">{r.name}</span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full capitalize ${SR_STATUS_COLORS[r.status]}`}>{r.status}</span>
                </div>
                <p className="text-[10px] text-gray-500 mb-1">{r.email}</p>
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${SR_SERVICE_COLORS[r.service]}`}>{SR_SERVICE_LABELS[r.service]}</span>
                  {r.company && <span className="text-[10px] text-gray-500">{r.company}</span>}
                </div>
                <p className="text-[10px] text-gray-600 mt-1">{new Date(r.createdAt).toLocaleDateString()}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right detail */}
      <div className="flex-1 overflow-y-auto p-6">
        {!selected ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center"><p className="text-3xl mb-2">📋</p><p className="text-sm">Select a request to view details</p></div>
          </div>
        ) : (
          <div className="max-w-2xl space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">{selected.name}</h2>
                <p className="text-sm text-gray-400">{selected.email} {selected.phone && `· ${selected.phone}`}</p>
                {selected.company && <p className="text-xs text-gray-500">{selected.company}</p>}
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${SR_SERVICE_COLORS[selected.service]}`}>{SR_SERVICE_LABELS[selected.service]}</span>
            </div>
            {selected.message && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-[10px] text-gray-500 font-semibold uppercase mb-2">Message</p>
                <p className="text-sm text-gray-300 leading-relaxed">{selected.message}</p>
              </div>
            )}
            {selected.budget && <div className="bg-white/5 border border-white/10 rounded-xl p-4"><p className="text-[10px] text-gray-500 font-semibold uppercase mb-1">Budget</p><p className="text-sm text-white">{selected.budget}</p></div>}
            <div>
              <p className="text-[10px] text-gray-400 font-semibold mb-1">STATUS</p>
              <select value={status} onChange={e=>setStatus(e.target.value)} className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/50">
                <option value="new">New</option><option value="in-progress">In Progress</option><option value="completed">Completed</option><option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold mb-1">ADMIN NOTE</p>
              <textarea value={note} onChange={e=>setNote(e.target.value)} rows={3} className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/50 resize-none" placeholder="Add internal notes..."/>
            </div>
            <div className="flex gap-3">
              <button onClick={handleSave} disabled={saving} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg disabled:opacity-60">{saving?"Saving...":"Save Changes"}</button>
              <button onClick={handleDelete} className="text-xs border border-red-500/30 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/10">Delete</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── SALES CONSULTATION ADMIN ── */
const CON_STATUS_COLORS = { pending:"bg-orange-500/20 text-orange-400", confirmed:"bg-blue-500/20 text-blue-400", completed:"bg-green-500/20 text-green-400", cancelled:"bg-red-500/20 text-red-400" };

function SalesConsultAdmin({ token }) {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [saving, setSaving]     = useState(false);
  const [filter, setFilter]     = useState("all");
  const [status, setStatus]     = useState("");
  const [meetLink, setMeetLink] = useState("");
  const [note, setNote]         = useState("");

  useEffect(() => {
    fetch("/api/consultations", { headers:{ Authorization:`Bearer ${token}` } })
      .then(r=>r.json()).then(d=>{ if(Array.isArray(d)) setConsultations(d); setLoading(false); }).catch(()=>setLoading(false));
  }, [token]);

  const selectC = (c) => { setSelected(c); setStatus(c.status); setMeetLink(c.meetLink||""); setNote(c.adminNote||""); };

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    const res = await fetch(`/api/consultations/${selected._id}`, { method:"PUT", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}, body:JSON.stringify({ status, meetLink, adminNote:note }) });
    const data = await res.json();
    if (res.ok) { setConsultations(cs=>cs.map(c=>c._id===data._id?data:c)); setSelected(data); }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!selected || !window.confirm("Delete this consultation?")) return;
    await fetch(`/api/consultations/${selected._id}`, { method:"DELETE", headers:{ Authorization:`Bearer ${token}` } });
    setConsultations(cs=>cs.filter(c=>c._id!==selected._id)); setSelected(null);
  };

  const filtered = consultations.filter(c=>filter==="all"||c.status===filter);
  const newCount = consultations.filter(c=>c.status==="pending").length;

  return (
    <div className="flex h-full overflow-hidden">
      <div className="w-[340px] shrink-0 border-r border-white/5 overflow-y-auto">
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-base font-bold text-white">Sales Consultations</h1>
            {newCount>0 && <span className="text-[10px] bg-orange-500/20 text-orange-400 font-bold px-2 py-0.5 rounded-full">{newCount} Pending</span>}
          </div>
          <div className="flex gap-1 flex-wrap">
            {["all","pending","confirmed","completed","cancelled"].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} className={`text-[10px] px-2 py-1 rounded-full font-semibold capitalize transition-all ${filter===f?"bg-[#C7E36B] text-black":"bg-white/5 text-gray-400 hover:bg-white/10"}`}>{f==="all"?"All":f}</button>
            ))}
          </div>
        </div>
        {loading ? <p className="text-gray-500 text-sm animate-pulse p-4">Loading...</p> : (
          <div className="divide-y divide-white/5">
            {filtered.length===0 && <p className="text-gray-500 text-sm p-4">No consultations</p>}
            {filtered.map(c=>(
              <button key={c._id} onClick={()=>selectC(c)} className={`w-full text-left p-4 hover:bg-white/5 transition-all ${selected?._id===c._id?"border-l-2 border-[#C7E36B] bg-white/5":""}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-white">{c.name}</span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full capitalize ${CON_STATUS_COLORS[c.status]}`}>{c.status}</span>
                </div>
                <p className="text-[10px] text-gray-500 mb-1">{c.email}</p>
                {c.preferredDate && <p className="text-[10px] text-gray-400">{c.preferredDate} {c.preferredTime && `at ${c.preferredTime}`}</p>}
                {c.topic && <p className="text-[10px] text-gray-600 mt-1 line-clamp-1">{c.topic}</p>}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        {!selected ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center"><p className="text-3xl mb-2">📅</p><p className="text-sm">Select a consultation to view details</p></div>
          </div>
        ) : (
          <div className="max-w-2xl space-y-5">
            <div>
              <h2 className="text-lg font-bold text-white">{selected.name}</h2>
              <p className="text-sm text-gray-400">{selected.email} {selected.phone && `· ${selected.phone}`}</p>
            </div>
            {(selected.preferredDate||selected.preferredTime) && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-6">
                <div><p className="text-[10px] text-gray-500 uppercase font-semibold mb-0.5">Date</p><p className="text-sm text-white">{selected.preferredDate||"—"}</p></div>
                <div><p className="text-[10px] text-gray-500 uppercase font-semibold mb-0.5">Time</p><p className="text-sm text-white">{selected.preferredTime||"—"}</p></div>
              </div>
            )}
            {selected.topic && <div className="bg-white/5 border border-white/10 rounded-xl p-4"><p className="text-[10px] text-gray-500 uppercase font-semibold mb-2">Topic</p><p className="text-sm text-gray-300">{selected.topic}</p></div>}
            <div>
              <p className="text-[10px] text-gray-400 font-semibold mb-1">STATUS</p>
              <select value={status} onChange={e=>setStatus(e.target.value)} className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/50">
                <option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold mb-1">MEET LINK</p>
              <div className="flex gap-2">
                <input value={meetLink} onChange={e=>setMeetLink(e.target.value)} placeholder="https://meet.google.com/..." className="flex-1 bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/50"/>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold mb-1">ADMIN NOTE</p>
              <textarea value={note} onChange={e=>setNote(e.target.value)} rows={3} className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/50 resize-none" placeholder="Add internal notes..."/>
            </div>
            <div className="flex gap-3">
              <button onClick={handleSave} disabled={saving} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg disabled:opacity-60">{saving?"Saving...":"Save Changes"}</button>
              <button onClick={()=>console.log("Send confirmation email to", selected.email)} className="text-xs border border-blue-500/30 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500/10">Send Confirmation</button>
              <button onClick={handleDelete} className="text-xs border border-red-500/30 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/10">Delete</button>
            </div>
          </div>
        )}
      </div>
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
        <button onClick={openAdd} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300 flex items-center gap-1.5"><I name="plus" size={14}/>+ Add Talent</button>
      </div>
      {loading ? <p className="text-gray-500 text-sm animate-pulse">Loading...</p> : (
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
const DEFAULT_PLANS = [
  { name:"Free",       price:0,    billingCycle:"monthly", color:"#6B7280", features:["5 Free Prompts","Community Access","Basic Resources"] },
  { name:"Pro",        price:999,  billingCycle:"monthly", color:"#C7E36B", features:["Unlimited Prompts","All Resources","Priority Support","Certificate Downloads"] },
  { name:"Enterprise", price:4999, billingCycle:"monthly", color:"#8B5CF6", features:["Everything in Pro","Custom Curriculum","Dedicated Manager","Team Dashboard","White-label Options"] },
];

function MembershipAdmin({ token }) {
  const [plans, setPlans]       = useState([]);
  const [members, setMembers]   = useState([]);
  const [tab, setTab]           = useState("plans");
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editPlan, setEditPlan] = useState(null);
  const [saving, setSaving]     = useState(false);
  const [memberSearch, setMemberSearch] = useState("");
  const [form, setForm] = useState({ name:"", price:0, billingCycle:"monthly", color:"#C7E36B", features:[], isActive:true });
  const [newFeature, setNewFeature] = useState("");

  const loadAll = async () => {
    setLoading(true);
    const [p, m] = await Promise.all([
      fetch("/api/membership/plans").then(r=>r.json()).catch(()=>[]),
      fetch("/api/membership/members", { headers:{ Authorization:`Bearer ${token}` } }).then(r=>r.json()).catch(()=>[]),
    ]);
    const planList = Array.isArray(p) ? p : [];
    setPlans(planList);
    if (Array.isArray(m)) setMembers(m);
    if (planList.length===0) {
      for (const def of DEFAULT_PLANS) {
        await fetch("/api/membership/plans", { method:"POST", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}, body:JSON.stringify(def) });
      }
      fetch("/api/membership/plans").then(r=>r.json()).then(d=>{ if(Array.isArray(d)) setPlans(d); });
    }
    setLoading(false);
  };
  useEffect(()=>{ loadAll(); }, [token]);

  const openAdd = () => { setEditPlan(null); setForm({ name:"",price:0,billingCycle:"monthly",color:"#C7E36B",features:[],isActive:true }); setShowForm(true); };
  const openEdit = (p) => { setEditPlan(p); setForm({ name:p.name,price:p.price,billingCycle:p.billingCycle,color:p.color,features:[...p.features],isActive:p.isActive }); setShowForm(true); };

  const handleSavePlan = async () => {
    setSaving(true);
    const url = editPlan ? `/api/membership/plans/${editPlan._id}` : "/api/membership/plans";
    const method = editPlan ? "PUT" : "POST";
    await fetch(url, { method, headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}, body:JSON.stringify(form) });
    setShowForm(false); loadAll(); setSaving(false);
  };

  const togglePlanActive = async (p) => {
    await fetch(`/api/membership/plans/${p._id}`, { method:"PUT", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}, body:JSON.stringify({ isActive:!p.isActive }) });
    setPlans(ps=>ps.map(x=>x._id===p._id?{...x,isActive:!x.isActive}:x));
  };

  const deletePlan = async (id) => {
    if (!window.confirm("Delete this plan?")) return;
    await fetch(`/api/membership/plans/${id}`, { method:"DELETE", headers:{ Authorization:`Bearer ${token}` } });
    setPlans(ps=>ps.filter(p=>p._id!==id));
  };

  const filteredMembers = members.filter(m => !memberSearch || m.name?.toLowerCase().includes(memberSearch.toLowerCase()) || m.email?.toLowerCase().includes(memberSearch.toLowerCase()));

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-white">Membership</h1>
        {tab==="plans" && !showForm && <button onClick={openAdd} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300 flex items-center gap-1.5"><I name="plus" size={14}/>+ Create Plan</button>}
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 mb-5 border-b border-white/10">
        {["plans","members"].map(t=>(
          <button key={t} onClick={()=>{setTab(t);setShowForm(false);}} className={`px-4 py-2 text-sm font-medium border-b-2 transition-all -mb-px capitalize ${tab===t?"border-[#C7E36B] text-[#C7E36B]":"border-transparent text-gray-400 hover:text-white"}`}>{t}</button>
        ))}
      </div>

      {/* PLANS TAB */}
      {tab==="plans" && (
        showForm ? (
          <div className="max-w-lg space-y-3">
            <div className="flex items-center gap-3 mb-4">
              <button onClick={()=>setShowForm(false)} className="text-xs text-gray-400 hover:text-white border border-white/15 px-3 py-1.5 rounded-lg">← Back</button>
              <h2 className="text-base font-bold text-white">{editPlan?"Edit Plan":"Create Plan"}</h2>
            </div>
            <Fld label="PLAN NAME" value={form.name} onChange={v=>setForm({...form,name:v})} placeholder="e.g. Pro"/>
            <div className="grid grid-cols-2 gap-3">
              <Fld label="PRICE (₹)" value={String(form.price)} onChange={v=>setForm({...form,price:Number(v)||0})} placeholder="999"/>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold mb-1">BILLING CYCLE</p>
                <select value={form.billingCycle} onChange={e=>setForm({...form,billingCycle:e.target.value})} className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/50">
                  <option value="monthly">Monthly</option><option value="yearly">Yearly</option><option value="lifetime">Lifetime</option>
                </select>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold mb-1">COLOR</p>
              <div className="flex items-center gap-2">
                <input type="color" value={form.color} onChange={e=>setForm({...form,color:e.target.value})} className="w-10 h-9 rounded-lg border-0 cursor-pointer bg-transparent"/>
                <input value={form.color} onChange={e=>setForm({...form,color:e.target.value})} className="flex-1 bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/50 font-mono"/>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-semibold mb-2">FEATURES</p>
              <div className="space-y-1.5 mb-2">
                {form.features.map((f,i)=>(
                  <div key={i} className="flex items-center gap-2">
                    <input value={f} onChange={e=>setForm({...form,features:form.features.map((x,j)=>j===i?e.target.value:x)})} className="flex-1 bg-[#1A1D1E] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white outline-none focus:border-[#C7E36B]/50"/>
                    <button onClick={()=>setForm({...form,features:form.features.filter((_,j)=>j!==i)})} className="text-gray-600 hover:text-red-400 shrink-0"><I name="trash" size={12}/></button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input value={newFeature} onChange={e=>setNewFeature(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&newFeature.trim()){setForm({...form,features:[...form.features,newFeature.trim()]});setNewFeature("");}}} placeholder="Add feature..." className="flex-1 bg-[#1A1D1E] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white outline-none focus:border-[#C7E36B]/50 min-w-0"/>
                <button onClick={()=>{if(newFeature.trim()){setForm({...form,features:[...form.features,newFeature.trim()]});setNewFeature("");}}} className="text-[10px] border border-dashed border-[#C7E36B]/40 text-[#C7E36B] px-2 py-1.5 rounded-lg">+ Add</button>
              </div>
            </div>
            <div className="flex items-center gap-3"><span className="text-xs text-gray-400">Active</span><Tog value={form.isActive} onChange={v=>setForm({...form,isActive:v})}/></div>
            <div className="flex gap-3 pt-2">
              <button onClick={()=>setShowForm(false)} className="text-xs border border-white/20 text-gray-300 px-4 py-2 rounded-lg">Cancel</button>
              <button onClick={handleSavePlan} disabled={saving} className="text-xs bg-[#C7E36B] text-black font-bold px-4 py-2 rounded-lg disabled:opacity-60">{saving?"Saving...":"Save Plan"}</button>
            </div>
          </div>
        ) : (
          loading ? <p className="text-gray-500 text-sm animate-pulse">Loading plans...</p> : (
            <div className="grid grid-cols-3 gap-4">
              {plans.map(p=>(
                <div key={p._id} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xl font-black" style={{color:p.color}}>{p.name}</p>
                      <p className="text-2xl font-bold text-white">{p.price===0?"FREE":`₹${p.price}`}</p>
                      <p className="text-[10px] text-gray-500 capitalize">/{p.billingCycle}</p>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={()=>openEdit(p)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-all"><I name="edit" size={12}/></button>
                      <button onClick={()=>deletePlan(p._id)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-all"><I name="trash" size={12}/></button>
                    </div>
                  </div>
                  <ul className="space-y-1.5 mb-4">
                    {p.features.map((f,i)=>(
                      <li key={i} className="flex items-center gap-1.5 text-[11px] text-gray-300"><span style={{color:p.color}}>✓</span>{f}</li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">{p.isActive?"Active":"Inactive"}</span>
                    <Tog value={p.isActive} onChange={()=>togglePlanActive(p)}/>
                  </div>
                </div>
              ))}
              {plans.length===0 && <div className="col-span-3 text-center py-12"><p className="text-gray-500 text-sm">No plans yet</p></div>}
            </div>
          )
        )
      )}

      {/* MEMBERS TAB */}
      {tab==="members" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-400">{members.length} members</p>
            <input value={memberSearch} onChange={e=>setMemberSearch(e.target.value)} placeholder="Search members..." className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-600 outline-none w-[220px]"/>
          </div>
          {loading ? <p className="text-gray-500 text-sm animate-pulse">Loading members...</p> : (
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead><tr className="text-[11px] text-gray-500 font-semibold uppercase bg-white/5">
                  {["Name","Email","Enrolled","Member Since","Plan"].map(h=><th key={h} className="text-left px-4 py-3">{h}</th>)}
                </tr></thead>
                <tbody className="divide-y divide-white/5">
                  {filteredMembers.length===0 ? (
                    <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500 text-sm">No members found</td></tr>
                  ) : filteredMembers.map(m=>(
                    <tr key={m._id} className="hover:bg-white/5 transition-all">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#C7E36B] text-black font-bold text-[11px] flex items-center justify-center">{(m.name||"U")[0]}</div>
                          <span className="text-sm font-semibold text-white">{m.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-400">{m.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-400">{(m.enrolledCourses?.length||0)+(m.enrolledWorkshops?.length||0)+(m.enrolledBootcamps?.length||0)}</td>
                      <td className="px-4 py-3 text-sm text-gray-400">{new Date(m.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3"><span className="text-[10px] bg-white/10 text-gray-400 px-2 py-0.5 rounded-full font-semibold">Free</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
    { id: "coupons", label: "🏷 Coupons"         },
  ];

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

  if (loading) return <div className="p-6 text-gray-500 text-sm animate-pulse">Loading settings...</div>;

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
const MOCK_TEMPLATES = [
  { id:1, name:"Standard Completion Award",  category:"Course Completion",   issued:142, updated:"Oct 12, 2024", grad:"from-[#1a1a2e] to-[#16213e]" },
  { id:2, name:"Cinematography Bootcamp",    category:"Bootcamp Completion", issued:38,  updated:"Nov 5, 2024",  grad:"from-[#0d1b2a] to-[#1b263b]" },
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
  const [autoIssue, setAutoIssue]       = useState(true);
  const [manualApproval, setManualApproval] = useState(false);
  const [idFormat, setIdFormat]         = useState("AIFA-[COURSE_CODE]-[YEAR]-[ID]");
  const [editingFormat, setEditingFormat] = useState(false);

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
      <div className="mb-4">
        <h1 className="text-xl font-bold text-white">Certificates</h1>
        <p className="text-xs text-gray-400">Manage templates, issue, and automate certificates</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-0.5 mb-6 border-b border-white/10 overflow-x-auto">
        {CERT_NAV.map(t => (
          <button key={t.key} onClick={()=>{ setCertTab(t.key); setShowForm(false); }}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all whitespace-nowrap -mb-px ${certTab===t.key?"border-[#C7E36B] text-[#C7E36B]":"border-transparent text-gray-400 hover:text-white"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── TEMPLATES ── */}
      {certTab === "templates" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {MOCK_TEMPLATES.map(tpl => (
              <div key={tpl.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group hover:border-white/20 transition-all">
                <div className={`h-32 bg-gradient-to-br ${tpl.grad} flex items-center justify-center relative`}>
                  <div className="text-center px-4">
                    <div className="w-8 h-8 bg-[#C7E36B] rounded-lg flex items-center justify-center mx-auto mb-2"><span className="text-black font-black text-sm">A</span></div>
                    <p className="text-[9px] text-gray-400 uppercase font-semibold">AIFA</p>
                    <p className="text-xs text-white font-semibold mt-0.5">{tpl.name}</p>
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                    <button className="text-[10px] bg-white text-black font-bold px-2.5 py-1.5 rounded-lg">Edit</button>
                    <button className="text-[10px] bg-white/20 text-white font-bold px-2.5 py-1.5 rounded-lg">Duplicate</button>
                    <button className="text-[10px] bg-red-500/80 text-white font-bold px-2.5 py-1.5 rounded-lg">Delete</button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-white">{tpl.name}</h3>
                    <span className="text-[9px] bg-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded-full">ACTIVE</span>
                  </div>
                  <p className="text-[10px] text-gray-500">{tpl.category}</p>
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-600">
                    <span>{tpl.issued} issued</span><span>·</span><span>Updated {tpl.updated}</span>
                  </div>
                </div>
              </div>
            ))}
            {/* Create New Template */}
            <button className="border-2 border-dashed border-white/15 rounded-xl h-[200px] flex flex-col items-center justify-center gap-2 hover:border-[#C7E36B]/40 transition-all text-gray-500 hover:text-[#C7E36B]">
              <div className="w-10 h-10 rounded-full border-2 border-dashed border-current flex items-center justify-center">
                <I name="plus" size={18}/>
              </div>
              <p className="text-sm font-semibold">Create New Template</p>
              <p className="text-xs">Design a custom certificate</p>
            </button>
          </div>

          {/* Issuance Automation */}
          <h2 className="text-sm font-bold text-white mb-3">⚡ Issuance Automation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-white">Auto-Issue</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Issue automatically on completion</p>
                </div>
                <Tog value={autoIssue} onChange={setAutoIssue}/>
              </div>
              {autoIssue && <p className="text-[10px] text-[#C7E36B]">✓ Active — auto-issuing on course completion</p>}
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-white">Manual Approval</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Admin must approve each issuance</p>
                </div>
                <Tog value={manualApproval} onChange={setManualApproval}/>
              </div>
              {!manualApproval && <p className="text-[10px] text-gray-500">— Auto-approved (no review required)</p>}
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-sm font-semibold text-white mb-2">Custom ID Format</p>
              {editingFormat ? (
                <div className="flex gap-2">
                  <input value={idFormat} onChange={e=>setIdFormat(e.target.value)}
                    className="flex-1 bg-[#1A1D1E] border border-white/10 rounded-lg px-2 py-1 text-xs text-white font-mono outline-none focus:border-[#C7E36B]/50"/>
                  <button onClick={()=>setEditingFormat(false)} className="text-[10px] bg-[#C7E36B] text-black font-bold px-2 py-1 rounded-lg">Save</button>
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
      )}

      {/* ── ISSUED CERTIFICATES ── */}
      {certTab === "issued" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-400">{certs.length} certificates issued</p>
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
      )}

      {/* ── OTHER TABS ── */}
      {!["templates","issued"].includes(certTab) && (
        <div className="text-center py-16">
          <p className="text-3xl mb-3">🏗</p>
          <p className="text-white font-semibold text-sm capitalize">{CERT_NAV.find(t=>t.key===certTab)?.label} — Coming Soon</p>
          <p className="text-gray-500 text-xs mt-1">This section is under construction.</p>
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
