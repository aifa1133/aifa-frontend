import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ─── Inline icon helper ─── */
const Icon = ({ d, size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={d} />
  </svg>
);
const ICONS = {
  dashboard: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
  referrals: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
  payouts: "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z",
  logout: "M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z",
  copy: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z",
  link: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z",
  payments: "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z",
  search: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
  edit: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
  check: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
  bank: "M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zM11.5 1L2 6v2h19V6l-9.5-5z",
};
const I = ({ name, size = 18, className = "" }) => <Icon d={ICONS[name]||ICONS.dashboard} size={size} className={className}/>;

/* ─── NAV ─── */
const NAV = [
  { id:"dashboard", label:"Dashboard",  icon:"dashboard"  },
  { id:"referrals", label:"Referrals",  icon:"referrals"  },
  { id:"payouts",   label:"Payouts",    icon:"payouts"    },
];

/* ─── MOCK DATA (replace with real API calls) ─── */
const MOCK_STATS = {
  totalEarnings: 12400,
  couponEarnings: 3200,
  referralEarnings: 9200,
  pendingPayout: 2800,
};
const MOCK_COUPON = { code: "ALEX10", studentDiscount: 10, commission: 10 };
const MOCK_REFERRAL_LINK = "https://aifa.co.in?ref=ALEX_REF_30";

const MOCK_CONVERSIONS = [
  { student:"Rahul Sharma",   program:"AI Film Bootcamp",    method:"Coupon Code",    commission:890,  status:"Approved" },
  { student:"Priya Nair",     program:"Video Course - AI Ads", method:"Referral Link",commission:1200, status:"Pending"  },
  { student:"Kiran Mehta",    program:"AI Workshop",         method:"Coupon Code",    commission:450,  status:"Approved" },
  { student:"Sneha Joshi",    program:"AI Film Bootcamp",    method:"Referral Link",  commission:890,  status:"Rejected" },
];

const MOCK_REFERRALS = [
  { student:"Rahul Sharma",  program:"AI Film Bootcamp",    method:"Coupon Code",  amount:8900, commission:890,  status:"Approved", date:"2026-07-15" },
  { student:"Priya Nair",    program:"Video Course - AI Ads",method:"Referral Link",amount:1200,commission:120,  status:"Pending",  date:"2026-07-18" },
  { student:"Kiran Mehta",   program:"AI Workshop",         method:"Coupon Code",  amount:4500, commission:450, status:"Approved", date:"2026-07-20" },
  { student:"Sneha Joshi",   program:"AI Film Bootcamp",    method:"Referral Link", amount:8900,commission:890, status:"Rejected", date:"2026-07-22" },
  { student:"Dev Patel",     program:"AI Story Course",     method:"Referral Link", amount:2400,commission:720, status:"Approved", date:"2026-07-24" },
];

const MOCK_PAYOUTS = [
  { id:"PAY-001", requested:"2026-07-01", amount:5200, method:"Bank Transfer", status:"Completed" },
  { id:"PAY-002", requested:"2026-07-15", amount:2800, method:"Bank Transfer", status:"Pending"   },
];

const MOCK_BANK = { holder:"Alex Rivera", bank:"HDFC Bank", account:"XXXX XXXX 4521", ifsc:"HDFC0001234" };

/* ════════════════════════════════════════════
   MAIN
════════════════════════════════════════════ */
export default function InfluencerDashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");
  const token = localStorage.getItem("aifa_token");
  const user  = JSON.parse(localStorage.getItem("aifa_user")||"{}");

  useEffect(() => {
    if (!token) { navigate("/login"); return; }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("aifa_token");
    localStorage.removeItem("aifa_user");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-[#0B0F10] text-white overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-[180px] shrink-0 bg-[#0F1112] border-r border-white/5 flex flex-col">
        <div className="px-5 py-5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#C7E36B] rounded flex items-center justify-center"><span className="text-black font-black text-xs">A</span></div>
            <span className="text-white font-black text-sm">AIFA</span>
          </div>
          <p className="text-[10px] text-gray-500 mt-1">Influencer Portal</p>
        </div>
        <nav className="flex-1 py-3">
          {NAV.map(item=>(
            <button key={item.id} onClick={()=>setActivePage(item.id)}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-[12px] font-medium transition-all ${activePage===item.id?"bg-[#C7E36B]/10 text-[#C7E36B] border-r-2 border-[#C7E36B]":"text-gray-400 hover:text-white hover:bg-white/5"}`}>
              <I name={item.icon} size={14}/>{item.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-white/5 px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-[#C7E36B] text-black font-bold text-xs flex items-center justify-center shrink-0">
              {(user.name||"I")[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-white font-semibold truncate">{user.name||"Influencer"}</p>
              <p className="text-[9px] text-gray-500">Influencer</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 text-[11px] text-gray-500 hover:text-red-400 transition-colors py-1">
            <I name="logout" size={13}/>Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto">
        {activePage==="dashboard" && <InfluencerHome token={token} />}
        {activePage==="referrals" && <InfluencerReferrals token={token} />}
        {activePage==="payouts"   && <InfluencerPayouts token={token} />}
      </main>
    </div>
  );
}

/* ════════════════════════════════════════════
   DASHBOARD HOME
════════════════════════════════════════════ */
function InfluencerHome({ token }) {
  const [copied, setCopied] = useState("");
  const fmtRev = v => v >= 1000 ? `₹${(v/1000).toFixed(1)}K` : `₹${v}`;

  const copy = (text, key) => {
    navigator.clipboard.writeText(text).then(()=>{ setCopied(key); setTimeout(()=>setCopied(""),2000); }).catch(()=>{});
  };

  const statCards = [
    { label:"Total Earnings",        value:fmtRev(MOCK_STATS.totalEarnings),   color:"text-[#C7E36B]", bg:"bg-[#C7E36B]/10"  },
    { label:"Coupon Earnings (10%)", value:fmtRev(MOCK_STATS.couponEarnings),  color:"text-blue-400",  bg:"bg-blue-500/10"   },
    { label:"Referral Link (30%)",   value:fmtRev(MOCK_STATS.referralEarnings),color:"text-purple-400",bg:"bg-purple-500/10" },
    { label:"Pending Payout",        value:fmtRev(MOCK_STATS.pendingPayout),   color:"text-orange-400",bg:"bg-orange-500/10" },
  ];

  const statusColor = s => s==="Approved"?"text-green-400 bg-green-500/10":s==="Pending"?"text-yellow-400 bg-yellow-500/10":"text-red-400 bg-red-500/10";

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Influencer Dashboard</h1>
        <p className="text-xs text-gray-400">Track your earnings, referrals, and performance</p>
      </div>

      {/* 4 stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map(s=>(
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
              <I name="payments" size={18} className={s.color}/>
            </div>
            <p className="text-xs text-gray-400 mb-0.5 leading-snug">{s.label}</p>
            <p className="text-2xl font-black text-white">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Coupon Code Card */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-1">Your Coupon Code</h3>
          <p className="text-xs text-gray-500 mb-4">Share this code with students to earn commission</p>
          <div className="bg-[#0B0F10] border border-[#C7E36B]/20 rounded-xl p-4 mb-4">
            <p className="text-2xl font-black text-[#C7E36B] tracking-widest text-center">{MOCK_COUPON.code}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white/5 rounded-lg px-3 py-2 text-center">
              <p className="text-[10px] text-gray-500">Student Discount</p>
              <p className="text-sm font-bold text-white">{MOCK_COUPON.studentDiscount}%</p>
            </div>
            <div className="bg-white/5 rounded-lg px-3 py-2 text-center">
              <p className="text-[10px] text-gray-500">Your Commission</p>
              <p className="text-sm font-bold text-[#C7E36B]">{MOCK_COUPON.commission}%</p>
            </div>
          </div>
          <button onClick={()=>copy(MOCK_COUPON.code,"coupon")}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#C7E36B] text-black font-bold text-sm hover:bg-[#d4f070] transition-colors">
            <I name="copy" size={16}/>{copied==="coupon"?"Copied!":"Copy Coupon Code"}
          </button>
        </div>

        {/* Referral Link Card */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-1">Your Referral Link</h3>
          <p className="text-xs text-gray-500 mb-4">Earn 30% commission on every purchase via your link</p>
          <div className="bg-[#0B0F10] border border-white/10 rounded-xl p-3 mb-4">
            <p className="text-xs text-gray-400 break-all font-mono">{MOCK_REFERRAL_LINK}</p>
          </div>
          <div className="bg-[#0B5F2A]/30 border border-[#C7E36B]/20 rounded-xl px-4 py-2 mb-4 flex items-center gap-2">
            <I name="check" size={14} className="text-[#C7E36B] shrink-0"/>
            <p className="text-xs text-[#C7E36B] font-semibold">30% commission on every successful referral</p>
          </div>
          <button onClick={()=>copy(MOCK_REFERRAL_LINK,"link")}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-sm hover:bg-white/20 transition-colors">
            <I name="link" size={16}/>{copied==="link"?"Copied!":"Copy Referral Link"}
          </button>
        </div>
      </div>

      {/* Recent Conversions */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5">
          <h3 className="text-sm font-bold text-white">Recent Conversions</h3>
        </div>
        <table className="w-full">
          <thead><tr className="text-[11px] text-gray-500 font-semibold uppercase bg-white/5">
            {["STUDENT","PROGRAM","METHOD","COMMISSION","STATUS"].map(h=><th key={h} className="text-left px-5 py-3">{h}</th>)}
          </tr></thead>
          <tbody className="divide-y divide-white/5">
            {MOCK_CONVERSIONS.map((c,i)=>(
              <tr key={i} className="hover:bg-white/5">
                <td className="px-5 py-3 text-sm font-semibold text-white">{c.student}</td>
                <td className="px-5 py-3 text-sm text-gray-400">{c.program}</td>
                <td className="px-5 py-3">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${c.method==="Coupon Code"?"bg-blue-500/20 text-blue-400":"bg-purple-500/20 text-purple-400"}`}>{c.method}</span>
                </td>
                <td className="px-5 py-3 text-sm font-bold text-[#C7E36B]">₹{c.commission}</td>
                <td className="px-5 py-3">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${statusColor(c.status)}`}>{c.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   REFERRALS PAGE
════════════════════════════════════════════ */
function InfluencerReferrals({ token }) {
  const [search, setSearch] = useState("");
  const [method, setMethod] = useState("All");
  const [status, setStatus] = useState("All");

  const filtered = MOCK_REFERRALS.filter(r=>{
    const q = search.toLowerCase();
    const matchSearch = !q || r.student.toLowerCase().includes(q) || r.program.toLowerCase().includes(q);
    const matchMethod = method==="All" || r.method===method;
    const matchStatus = status==="All" || r.status===status;
    return matchSearch && matchMethod && matchStatus;
  });

  const statusColor = s => s==="Approved"?"text-green-400 bg-green-500/10":s==="Pending"?"text-yellow-400 bg-yellow-500/10":"text-red-400 bg-red-500/10";

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-xl font-bold text-white">Referrals</h1>
        <p className="text-xs text-gray-400">Track all your referrals and their status</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search student name..."
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder-gray-500 outline-none"/>
          <I name="search" size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500"/>
        </div>
        <select value={method} onChange={e=>setMethod(e.target.value)} className="bg-white/5 border border-white/10 text-gray-400 text-sm rounded-lg px-3 py-2 outline-none">
          {["All","Coupon Code","Referral Link"].map(o=><option key={o}>{o}</option>)}
        </select>
        <select value={status} onChange={e=>setStatus(e.target.value)} className="bg-white/5 border border-white/10 text-gray-400 text-sm rounded-lg px-3 py-2 outline-none">
          {["All","Pending","Approved","Rejected"].map(o=><option key={o}>{o}</option>)}
        </select>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="text-[11px] text-gray-500 font-semibold uppercase bg-white/5">
            {["STUDENT","PROGRAM","METHOD","PURCHASE AMT","COMMISSION","STATUS","DATE"].map(h=><th key={h} className="text-left px-4 py-3">{h}</th>)}
          </tr></thead>
          <tbody className="divide-y divide-white/5">
            {filtered.length===0&&<tr><td colSpan={7} className="px-4 py-8 text-center text-gray-500 text-sm">No referrals found</td></tr>}
            {filtered.map((r,i)=>(
              <tr key={i} className="hover:bg-white/5">
                <td className="px-4 py-3 text-sm font-semibold text-white">{r.student}</td>
                <td className="px-4 py-3 text-sm text-gray-400 max-w-[160px]"><p className="truncate">{r.program}</p></td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${r.method==="Coupon Code"?"bg-blue-500/20 text-blue-400":"bg-purple-500/20 text-purple-400"}`}>{r.method}</span>
                </td>
                <td className="px-4 py-3 text-sm text-white">₹{r.amount.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3 text-sm font-bold text-[#C7E36B]">₹{r.commission.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${statusColor(r.status)}`}>{r.status}</span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">{new Date(r.date).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   PAYOUTS PAGE
════════════════════════════════════════════ */
function InfluencerPayouts({ token }) {
  const [editBank, setEditBank] = useState(false);
  const [bank, setBank]         = useState(MOCK_BANK);
  const [bankForm, setBankForm] = useState({ ...MOCK_BANK });

  const fmtRev = v => v >= 1000 ? `₹${(v/1000).toFixed(1)}K` : `₹${v}`;
  const statusColor = s => s==="Completed"?"text-green-400 bg-green-500/10":"text-yellow-400 bg-yellow-500/10";

  const payoutStatCards = [
    { label:"Total Earned",   value:fmtRev(MOCK_STATS.totalEarnings),  color:"text-[#C7E36B]", bg:"bg-[#C7E36B]/10" },
    { label:"Total Paid",     value:fmtRev(5200),                       color:"text-green-400", bg:"bg-green-500/10" },
    { label:"Outstanding",    value:fmtRev(MOCK_STATS.pendingPayout),   color:"text-orange-400",bg:"bg-orange-500/10"},
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Payouts</h1>
        <p className="text-xs text-gray-400">Manage your earnings and payout requests</p>
      </div>

      {/* 3 stat cards + Request Payout */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {payoutStatCards.map(s=>(
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-3`}><I name="payments" size={18} className={s.color}/></div>
            <p className="text-xs text-gray-400 mb-0.5">{s.label}</p>
            <p className="text-2xl font-black text-white">{s.value}</p>
          </div>
        ))}
        {/* Request Payout card */}
        <div className="bg-[#0B5F2A]/30 border border-[#C7E36B]/20 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Available to Request</p>
            <p className="text-2xl font-black text-[#C7E36B]">{fmtRev(MOCK_STATS.pendingPayout)}</p>
          </div>
          <button onClick={()=>alert("Payout request submitted!")}
            className="mt-3 w-full py-2 rounded-xl bg-[#C7E36B] text-black font-bold text-sm hover:bg-[#d4f070] transition-colors">
            Request Payout
          </button>
        </div>
      </div>

      {/* Payout History */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5">
          <h3 className="text-sm font-bold text-white">Payout History</h3>
        </div>
        <table className="w-full">
          <thead><tr className="text-[11px] text-gray-500 font-semibold uppercase bg-white/5">
            {["PAYOUT ID","REQUESTED ON","AMOUNT","PAYMENT METHOD","STATUS"].map(h=><th key={h} className="text-left px-5 py-3">{h}</th>)}
          </tr></thead>
          <tbody className="divide-y divide-white/5">
            {MOCK_PAYOUTS.map((p,i)=>(
              <tr key={i} className="hover:bg-white/5">
                <td className="px-5 py-3 text-sm font-mono font-semibold text-[#C7E36B]">{p.id}</td>
                <td className="px-5 py-3 text-sm text-gray-400">{new Date(p.requested).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</td>
                <td className="px-5 py-3 text-sm font-bold text-white">₹{p.amount.toLocaleString("en-IN")}</td>
                <td className="px-5 py-3 text-sm text-gray-400">{p.method}</td>
                <td className="px-5 py-3"><span className={`text-[10px] font-bold px-2 py-1 rounded-full ${statusColor(p.status)}`}>{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bank Details */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <I name="bank" size={18} className="text-[#C7E36B]"/>
            <h3 className="text-sm font-bold text-white">Bank Details</h3>
          </div>
          {!editBank && (
            <button onClick={()=>{ setBankForm({...bank}); setEditBank(true); }}
              className="text-xs text-[#C7E36B] hover:underline flex items-center gap-1">
              <I name="edit" size={13}/>Edit Bank Details
            </button>
          )}
        </div>

        {editBank ? (
          <div className="space-y-3">
            {[["Account Holder","holder"],["Bank Name","bank"],["Account Number","account"],["IFSC Code","ifsc"]].map(([label,key])=>(
              <div key={key}>
                <label className="text-xs text-gray-400 mb-1 block">{label}</label>
                <input value={bankForm[key]} onChange={e=>setBankForm(f=>({...f,[key]:e.target.value}))}
                  className="w-full bg-[#0B0F10] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/50"/>
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              <button onClick={()=>setEditBank(false)} className="flex-1 py-2.5 rounded-xl border border-white/20 text-gray-300 text-sm font-semibold hover:bg-white/5 transition-colors">Cancel</button>
              <button onClick={()=>{ setBank({...bankForm}); setEditBank(false); }}
                className="flex-1 py-2.5 rounded-xl bg-[#C7E36B] text-black text-sm font-bold hover:bg-[#d4f070] transition-colors">
                Save Banking Details
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 text-xs">
            {[["Account Holder",bank.holder],["Bank Name",bank.bank],["Account Number",bank.account],["IFSC Code",bank.ifsc]].map(([label,value])=>(
              <div key={label} className="bg-white/5 rounded-lg px-3 py-2.5">
                <p className="text-gray-500 mb-0.5">{label}</p>
                <p className="text-white font-semibold">{value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
