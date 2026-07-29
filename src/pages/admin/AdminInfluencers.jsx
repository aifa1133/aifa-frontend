import { useState, useEffect, useCallback } from "react";

/* ─── Inline icons ─── */
const Ic = ({ d, size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={d} />
  </svg>
);
const ICONS = {
  users: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
  check: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  clock: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z",
  money: "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z",
  search: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
  copy: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z",
  plus: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
  close: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
  warning: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z",
  refresh: "M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-8 8s3.58 8 8 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z",
  edit: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
};
const I = ({ name, size = 16, className = "" }) => <Ic d={ICONS[name] || ICONS.users} size={size} className={className} />;

/* ─── Helpers ─── */
const money = (n) => `₹${Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
const authToken = (t) => t || localStorage.getItem("aifa_token") || "";

function CopyBtn({ value, label = "Copy", className = "" }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value || "");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = value || "";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch { /* ignore */ }
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
        copied ? "bg-[#C7E36B] text-black" : "bg-white/10 text-gray-300 hover:bg-white/20"
      } ${className}`}
    >
      <I name="copy" size={11} />
      {copied ? "Copied!" : label}
    </button>
  );
}

function StatCard({ label, value, icon, tone = "lime" }) {
  const tones = {
    lime: "bg-[#C7E36B]/10 text-[#C7E36B]",
    green: "bg-green-500/10 text-green-400",
    yellow: "bg-yellow-500/10 text-yellow-400",
    blue: "bg-blue-500/10 text-blue-400",
  };
  return (
    <div className="bg-[#0F1112] border border-white/10 rounded-2xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-black text-white mt-2">{value}</p>
        </div>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${tones[tone]}`}>
          <I name={icon} size={17} />
        </div>
      </div>
    </div>
  );
}

const Badge = ({ status }) => {
  const map = {
    active: "bg-green-500/20 text-green-400",
    inactive: "bg-red-500/20 text-red-400",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${map[status] || "bg-white/10 text-gray-400"}`}>
      {status}
    </span>
  );
};

const Field = ({ label, value, onChange, type = "text", placeholder = "", required = false }) => (
  <div>
    <label className="block text-[11px] text-gray-400 font-semibold mb-1.5">
      {label}{required && <span className="text-red-400"> *</span>}
    </label>
    <input
      type={type}
      value={value ?? ""}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/60 transition-colors"
    />
  </div>
);

const Row = ({ label, children }) => (
  <div className="flex items-start justify-between gap-4 py-2.5 border-b border-white/5 last:border-0">
    <span className="text-[11px] text-gray-500 font-medium shrink-0">{label}</span>
    <span className="text-xs text-white text-right break-all">{children || "—"}</span>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════════ */
export default function AdminInfluencers({ token: tokenProp }) {
  const token = authToken(tokenProp);

  const [stats, setStats] = useState(null);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [detail, setDetail] = useState(null);        // influencer being viewed
  const [detailLoading, setDetailLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [resetCouponFor, setResetCouponFor] = useState(null);
  const [resetLinkFor, setResetLinkFor] = useState(null);
  const [toast, setToast] = useState("");

  const flash = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2600); };

  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

  const loadStats = useCallback(() => {
    fetch("/api/admin/influencers/stats", { headers })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setStats(d))
      .catch(() => {});
  }, [token]);

  const loadList = useCallback(() => {
    setLoading(true);
    const qs = new URLSearchParams({ page: String(page), limit: "20" });
    if (search.trim()) qs.set("search", search.trim());
    if (statusFilter) qs.set("status", statusFilter);
    fetch(`/api/admin/influencers?${qs}`, { headers })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Could not load influencers"))))
      .then((d) => {
        setList(d.items || []);
        setTotal(d.total || 0);
        setPages(d.pages || 1);
        setError("");
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token, page, search, statusFilter]);

  useEffect(() => { loadStats(); }, [loadStats]);
  useEffect(() => {
    const t = setTimeout(loadList, search ? 350 : 0);
    return () => clearTimeout(t);
  }, [loadList]);

  const openDetail = (inf) => {
    setDetail(inf);
    setEditing(false);
    setDetailLoading(true);
    fetch(`/api/admin/influencers/${inf._id}`, { headers })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setDetail(d))
      .catch(() => {})
      .finally(() => setDetailLoading(false));
  };

  const startEdit = () => {
    setEditForm({ ...detail });
    setEditing(true);
  };

  const saveEdit = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/influencers/${detail._id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(editForm),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.message || "Save failed");
      setDetail({ ...detail, ...d });
      setEditing(false);
      flash("Influencer updated");
      loadList(); loadStats();
    } catch (e) { flash(e.message); }
    setSaving(false);
  };

  const toggleStatus = async () => {
    const next = detail.status === "active" ? "inactive" : "active";
    try {
      const res = await fetch(`/api/admin/influencers/${detail._id}/status`, {
        method: "PUT", headers, body: JSON.stringify({ status: next }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.message || "Update failed");
      setDetail({ ...detail, status: next });
      flash(next === "active" ? "Influencer activated" : "Influencer deactivated");
      loadList(); loadStats();
    } catch (e) { flash(e.message); }
  };

  const doResetCoupon = async () => {
    try {
      const res = await fetch(`/api/admin/influencers/${resetCouponFor._id}/reset-coupon`, { method: "POST", headers });
      const d = await res.json();
      if (!res.ok) throw new Error(d.message || "Reset failed");
      setDetail((p) => (p ? { ...p, couponCode: d.couponCode } : p));
      setResetCouponFor(null);
      flash(`New coupon code: ${d.couponCode}`);
      loadList();
    } catch (e) { flash(e.message); }
  };

  const doResetLink = async () => {
    try {
      const res = await fetch(`/api/admin/influencers/${resetLinkFor._id}/reset-referral-link`, { method: "POST", headers });
      const d = await res.json();
      if (!res.ok) throw new Error(d.message || "Reset failed");
      setDetail((p) => (p ? { ...p, referralLink: d.referralLink } : p));
      setResetLinkFor(null);
      flash("Referral link regenerated");
      loadList();
    } catch (e) { flash(e.message); }
  };

  return (
    <div className="p-6 text-white">
      {toast && (
        <div className="fixed top-5 right-5 z-[10000] bg-[#C7E36B] text-black text-sm font-bold px-4 py-2.5 rounded-xl shadow-2xl">
          {toast}
        </div>
      )}

      {/* HEADER */}
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-black text-white">Influencers</h1>
          <p className="text-xs text-gray-400 mt-1">
            Manage AIFA influencer partners, their coupon codes, referral links and commission rates.
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-[#C7E36B] text-black text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-[#d4ec85] transition-colors"
        >
          <I name="plus" size={15} /> Add Influencer
        </button>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Influencers" value={stats?.totalInfluencers ?? "—"} icon="users" tone="lime" />
        <StatCard label="Active Influencers" value={stats?.activeInfluencers ?? "—"} icon="check" tone="green" />
        <StatCard label="Pending Approval" value={stats?.pendingApproval ?? "—"} icon="clock" tone="yellow" />
        <StatCard label="Lifetime Commission Paid" value={stats ? money(stats.lifetimeCommissionPaid) : "—"} icon="money" tone="blue" />
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[220px]">
          <I name="search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by name, email or coupon code..."
            className="w-full bg-[#0F1112] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/60"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="bg-[#0F1112] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#C7E36B]/60"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="border border-white/10 rounded-xl overflow-hidden bg-[#0F1112]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-white/5">
              <tr className="text-[10px] uppercase tracking-wider text-gray-500">
                <th className="px-4 py-3 font-bold">Profile</th>
                <th className="px-4 py-3 font-bold">Coupon Code</th>
                <th className="px-4 py-3 font-bold">Referral Link</th>
                <th className="px-4 py-3 font-bold">Lifetime Earnings</th>
                <th className="px-4 py-3 font-bold">Pending Commission</th>
                <th className="px-4 py-3 font-bold">Signup Leads</th>
                <th className="px-4 py-3 font-bold">Status</th>
                <th className="px-4 py-3 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-500 text-sm">Loading influencers…</td></tr>
              ) : error ? (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-red-400 text-sm">{error}</td></tr>
              ) : list.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-500 text-sm">
                  No influencers yet. Click “Add Influencer” to create the first one.
                </td></tr>
              ) : (
                list.map((inf) => (
                  <tr key={inf._id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-[#C7E36B] flex items-center justify-center">
                          {inf.profilePhoto
                            ? <img src={inf.profilePhoto} alt="" className="w-full h-full object-cover" />
                            : <span className="text-black font-black text-sm">{(inf.fullName || "?")[0].toUpperCase()}</span>}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-white font-semibold truncate">{inf.fullName}</p>
                          <p className="text-[11px] text-gray-500 truncate">{inf.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block bg-[#C7E36B]/15 text-[#C7E36B] text-[11px] font-black px-2.5 py-1 rounded-lg">
                        {inf.couponCode}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 max-w-[240px]">
                        <span className="text-[11px] text-gray-400 truncate">{inf.referralLink}</span>
                        <CopyBtn value={inf.referralLink} label="" />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-white font-bold">{money(inf.lifetimeEarnings)}</td>
                    <td className="px-4 py-3 text-sm text-yellow-400 font-bold">{money(inf.pendingCommission)}</td>
                    <td className="px-4 py-3 text-sm text-[#C7E36B] font-bold">{inf.signupLeads ?? 0} leads</td>
                    <td className="px-4 py-3"><Badge status={inf.status} /></td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => openDetail(inf)}
                        className="text-[11px] font-bold text-[#C7E36B] border border-[#C7E36B]/30 hover:bg-[#C7E36B]/10 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      {pages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-[11px] text-gray-500">{total} influencer{total === 1 ? "" : "s"} total</p>
          <div className="flex items-center gap-2">
            <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 text-gray-300 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed">
              Previous
            </button>
            <span className="text-xs text-gray-400">Page {page} of {pages}</span>
            <button disabled={page >= pages} onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 text-gray-300 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
      )}

      {/* ═══ DETAIL SLIDE-IN PANEL ═══ */}
      {detail && (
        <div className="fixed inset-0 z-[9998] flex justify-end">
          <div className="absolute inset-0 bg-black/70" onClick={() => { setDetail(null); setEditing(false); }} />
          <div className="relative w-full max-w-[520px] h-full bg-[#0F1112] border-l border-white/10 overflow-y-auto">
            {/* panel header */}
            <div className="sticky top-0 bg-[#0F1112] border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[#C7E36B] flex items-center justify-center overflow-hidden shrink-0">
                  {detail.profilePhoto
                    ? <img src={detail.profilePhoto} alt="" className="w-full h-full object-cover" />
                    : <span className="text-black font-black">{(detail.fullName || "?")[0].toUpperCase()}</span>}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white truncate">{detail.fullName}</p>
                  <p className="text-[11px] text-gray-500 truncate">{detail.email}</p>
                </div>
              </div>
              <button onClick={() => { setDetail(null); setEditing(false); }} className="text-gray-400 hover:text-white shrink-0">
                <I name="close" size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {detailLoading && <p className="text-xs text-gray-500">Loading details…</p>}

              {!editing ? (
                <>
                  {/* stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Lifetime Earned</p>
                      <p className="text-base font-black text-white mt-1">{money(detail.lifetimeEarnings)}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Pending</p>
                      <p className="text-base font-black text-yellow-400 mt-1">{money(detail.pendingCommission)}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Signup Leads</p>
                      <p className="text-base font-black text-[#C7E36B] mt-1">{detail.signupLeads ?? 0}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Purchases</p>
                      <p className="text-base font-black text-white mt-1">{detail.totalReferrals ?? 0}</p>
                    </div>
                  </div>

                  {/* coupon + link */}
                  <div className="space-y-3">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">Coupon Code</p>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-lg font-black text-[#C7E36B] tracking-wide">{detail.couponCode}</span>
                        <CopyBtn value={detail.couponCode} />
                      </div>
                      <p className="text-[10px] text-gray-500 mt-2">
                        Student discount {detail.couponCommissionRate}% · Commission {detail.couponCommissionRate}%
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">Referral Link</p>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-white break-all">{detail.referralLink}</span>
                        <CopyBtn value={detail.referralLink} />
                      </div>
                      <p className="text-[10px] text-gray-500 mt-2">Commission {detail.referralCommissionRate}%</p>
                    </div>
                  </div>

                  {/* info */}
                  <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                    <p className="text-[10px] text-gray-500 uppercase font-bold py-2">Basic Info</p>
                    <Row label="Phone">{detail.phone}</Row>
                    <Row label="Country">{detail.country}</Row>
                    <Row label="City">{detail.city}</Row>
                    <Row label="Status"><Badge status={detail.status} /></Row>
                    <Row label="Joined">{detail.createdAt ? new Date(detail.createdAt).toLocaleDateString("en-IN") : ""}</Row>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                    <p className="text-[10px] text-gray-500 uppercase font-bold py-2">Social Media</p>
                    <Row label="Instagram">{detail.instagram}</Row>
                    <Row label="YouTube">{detail.youtube}</Row>
                    <Row label="LinkedIn">{detail.linkedin}</Row>
                    <Row label="Other">{detail.otherSocial}</Row>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                    <p className="text-[10px] text-gray-500 uppercase font-bold py-2">Payment Info</p>
                    <Row label="Account Holder">{detail.bankAccountHolder}</Row>
                    <Row label="Bank">{detail.bankName}</Row>
                    <Row label="Account No.">{detail.bankAccountNumber}</Row>
                    <Row label="IFSC">{detail.bankIFSC}</Row>
                    <Row label="UPI ID">{detail.upiId}</Row>
                  </div>

                  {/* actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={startEdit}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#C7E36B] text-black text-sm font-bold hover:bg-[#d4ec85] transition-colors">
                      <I name="edit" size={14} /> Edit
                    </button>
                    <button onClick={toggleStatus}
                      className={`py-2.5 rounded-xl text-sm font-bold transition-colors ${
                        detail.status === "active"
                          ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                          : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                      }`}>
                      {detail.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                    <button onClick={() => setResetCouponFor(detail)}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors">
                      <I name="refresh" size={14} /> Reset Coupon
                    </button>
                    <button onClick={() => setResetLinkFor(detail)}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors">
                      <I name="refresh" size={14} /> Reset Link
                    </button>
                    <button onClick={() => setDetail(null)}
                      className="col-span-2 py-2.5 rounded-xl bg-white/5 text-gray-400 text-sm font-bold hover:bg-white/10 transition-colors">
                      Close
                    </button>
                  </div>
                </>
              ) : (
                /* ═══ EDIT MODE ═══ */
                <>
                  <p className="text-[10px] text-gray-500 uppercase font-bold">Basic Info</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Full Name" value={editForm.fullName} onChange={(v) => setEditForm({ ...editForm, fullName: v })} required />
                    <Field label="Email" type="email" value={editForm.email} onChange={(v) => setEditForm({ ...editForm, email: v })} required />
                    <Field label="Phone" value={editForm.phone} onChange={(v) => setEditForm({ ...editForm, phone: v })} />
                    <Field label="Profile Photo URL" value={editForm.profilePhoto} onChange={(v) => setEditForm({ ...editForm, profilePhoto: v })} />
                    <Field label="Country" value={editForm.country} onChange={(v) => setEditForm({ ...editForm, country: v })} />
                    <Field label="City" value={editForm.city} onChange={(v) => setEditForm({ ...editForm, city: v })} />
                  </div>

                  <p className="text-[10px] text-gray-500 uppercase font-bold">Social Media</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Instagram" value={editForm.instagram} onChange={(v) => setEditForm({ ...editForm, instagram: v })} />
                    <Field label="YouTube" value={editForm.youtube} onChange={(v) => setEditForm({ ...editForm, youtube: v })} />
                    <Field label="LinkedIn" value={editForm.linkedin} onChange={(v) => setEditForm({ ...editForm, linkedin: v })} />
                    <Field label="Other" value={editForm.otherSocial} onChange={(v) => setEditForm({ ...editForm, otherSocial: v })} />
                  </div>

                  <p className="text-[10px] text-gray-500 uppercase font-bold">Commission Settings</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Coupon Commission %" type="number" value={editForm.couponCommissionRate} onChange={(v) => setEditForm({ ...editForm, couponCommissionRate: v })} />
                    <Field label="Referral Commission %" type="number" value={editForm.referralCommissionRate} onChange={(v) => setEditForm({ ...editForm, referralCommissionRate: v })} />
                  </div>

                  <p className="text-[10px] text-gray-500 uppercase font-bold">Payment Info</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Account Holder" value={editForm.bankAccountHolder} onChange={(v) => setEditForm({ ...editForm, bankAccountHolder: v })} />
                    <Field label="Bank Name" value={editForm.bankName} onChange={(v) => setEditForm({ ...editForm, bankName: v })} />
                    <Field label="Account Number" value={editForm.bankAccountNumber} onChange={(v) => setEditForm({ ...editForm, bankAccountNumber: v })} />
                    <Field label="IFSC" value={editForm.bankIFSC} onChange={(v) => setEditForm({ ...editForm, bankIFSC: v })} />
                    <Field label="UPI ID" value={editForm.upiId} onChange={(v) => setEditForm({ ...editForm, upiId: v })} />
                    <Field label="New Password (optional)" type="password" value={editForm.password} onChange={(v) => setEditForm({ ...editForm, password: v })} placeholder="Min 6 characters" />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setEditing(false)}
                      className="flex-1 py-2.5 rounded-xl bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors">
                      Cancel
                    </button>
                    <button onClick={saveEdit} disabled={saving}
                      className="flex-1 py-2.5 rounded-xl bg-[#C7E36B] text-black text-sm font-bold hover:bg-[#d4ec85] disabled:opacity-50 transition-colors">
                      {saving ? "Saving…" : "Save Changes"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══ RESET COUPON MODAL ═══ */}
      {resetCouponFor && (
        <div className="fixed inset-0 bg-black/75 z-[9999] flex items-center justify-center p-4">
          <div className="bg-[#0F1112] border border-white/10 rounded-2xl w-full max-w-md p-6">
            <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4">
              <I name="warning" size={22} className="text-yellow-400" />
            </div>
            <h3 className="text-white font-bold text-base mb-1">Reset Coupon Code?</h3>
            <p className="text-xs text-gray-400 mb-5">
              The current coupon code will stop working immediately. Any student using the old code at checkout
              will see it as invalid. Existing commissions are not affected.
            </p>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1.5 rounded-full bg-red-500/15 text-red-400 text-xs font-black line-through">
                {resetCouponFor.couponCode}
              </span>
              <span className="text-gray-600">→</span>
              <span className="px-3 py-1.5 rounded-full bg-[#C7E36B]/15 text-[#C7E36B] text-xs font-black">
                New code auto-generated
              </span>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setResetCouponFor(null)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors">
                Cancel
              </button>
              <button onClick={doResetCoupon}
                className="flex-1 py-2.5 rounded-xl bg-[#C7E36B] text-black text-sm font-bold hover:bg-[#d4ec85] transition-colors">
                Reset Coupon
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ RESET REFERRAL LINK MODAL ═══ */}
      {resetLinkFor && (
        <div className="fixed inset-0 bg-black/75 z-[9999] flex items-center justify-center p-4">
          <div className="bg-[#0F1112] border border-white/10 rounded-2xl w-full max-w-md p-6">
            <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4">
              <I name="warning" size={22} className="text-yellow-400" />
            </div>
            <h3 className="text-white font-bold text-base mb-1">Reset Referral Link?</h3>
            <p className="text-xs text-gray-400 mb-5">
              The existing referral URL will no longer track sign-ups. Anything the influencer has already shared
              publicly will stop attributing new referrals.
            </p>
            <div className="space-y-2 mb-6">
              <div className="px-3 py-2 rounded-xl bg-red-500/10 text-red-400 text-[11px] font-semibold break-all">
                {resetLinkFor.referralLink}
              </div>
              <div className="px-3 py-2 rounded-xl bg-[#C7E36B]/10 text-[#C7E36B] text-[11px] font-semibold">
                A new unique link will be generated
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setResetLinkFor(null)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors">
                Cancel
              </button>
              <button onClick={doResetLink}
                className="flex-1 py-2.5 rounded-xl bg-[#C7E36B] text-black text-sm font-bold hover:bg-[#d4ec85] transition-colors">
                Reset Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ ADD INFLUENCER MODAL ═══ */}
      {showAdd && (
        <AddInfluencerModal
          headers={headers}
          onClose={() => setShowAdd(false)}
          onCreated={(msg) => { setShowAdd(false); flash(msg); loadList(); loadStats(); }}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ADD INFLUENCER MODAL
═══════════════════════════════════════════════════════════ */
function AddInfluencerModal({ headers, onClose, onCreated }) {
  const [f, setF] = useState({
    fullName: "", email: "", phone: "", password: "", country: "", city: "", profilePhoto: "",
    instagram: "", youtube: "", linkedin: "", otherSocial: "",
    couponCode: "", couponCommissionRate: 10, referralCommissionRate: 30,
    bankAccountHolder: "", bankName: "", bankAccountNumber: "", bankIFSC: "", upiId: "",
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const set = (k) => (v) => setF((p) => ({ ...p, [k]: v }));

  /* Preview of the auto-generated coupon code */
  const autoCode = (() => {
    const first = (f.fullName || "").trim().split(/\s+/)[0].replace(/[^a-zA-Z0-9]/g, "");
    return first ? `${first.toUpperCase().slice(0, 12)}10` : "AUTO10";
  })();

  const submit = async () => {
    if (!f.fullName.trim() || !f.email.trim()) { setErr("Full name and email are required"); return; }
    setSaving(true); setErr("");
    try {
      const res = await fetch("/api/admin/influencers", {
        method: "POST", headers, body: JSON.stringify(f),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.message || "Could not create influencer");
      onCreated(`Influencer created. Temp password: ${d.tempPassword}`);
    } catch (e) { setErr(e.message); }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/75 z-[9999] flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-[#0F1112] border border-white/10 rounded-2xl w-full max-w-3xl my-8">
        <div className="bg-[#0F1112] border-b border-white/10 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h3 className="text-white font-bold text-base">Add Influencer</h3>
            <p className="text-[11px] text-gray-500">Create a new influencer partner account.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><I name="close" size={20} /></button>
        </div>

        <div className="p-6 space-y-6">
          {err && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-2.5 rounded-xl">{err}</div>}

          <section>
            <p className="text-[10px] text-gray-500 uppercase font-bold mb-3 tracking-wider">1 · Basic Info</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Full Name" value={f.fullName} onChange={set("fullName")} required placeholder="Alex Rivera" />
              <Field label="Email" type="email" value={f.email} onChange={set("email")} required placeholder="alex@example.com" />
              <Field label="Phone" value={f.phone} onChange={set("phone")} placeholder="+91 90000 00000" />
              <Field label="Temp Password" type="text" value={f.password} onChange={set("password")} placeholder="Leave blank to auto-generate" />
              <Field label="Country" value={f.country} onChange={set("country")} placeholder="India" />
              <Field label="City" value={f.city} onChange={set("city")} placeholder="Mumbai" />
              <div className="md:col-span-2">
                <Field label="Profile Photo URL" value={f.profilePhoto} onChange={set("profilePhoto")} placeholder="https://…" />
              </div>
            </div>
          </section>

          <section>
            <p className="text-[10px] text-gray-500 uppercase font-bold mb-3 tracking-wider">2 · Social Media</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Instagram" value={f.instagram} onChange={set("instagram")} placeholder="@handle or URL" />
              <Field label="YouTube" value={f.youtube} onChange={set("youtube")} placeholder="Channel URL" />
              <Field label="LinkedIn" value={f.linkedin} onChange={set("linkedin")} placeholder="Profile URL" />
              <Field label="Other Social" value={f.otherSocial} onChange={set("otherSocial")} placeholder="X / Threads / …" />
            </div>
          </section>

          <section>
            <p className="text-[10px] text-gray-500 uppercase font-bold mb-3 tracking-wider">3 · Commission Settings</p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-3">
              <p className="text-[11px] text-gray-400 mb-1">Auto-generated coupon code</p>
              <div className="flex items-center gap-3">
                <span className="text-lg font-black text-[#C7E36B] tracking-wide">{f.couponCode || autoCode}</span>
                <span className="text-[10px] text-gray-500">Referral link is generated automatically from the name.</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field label="Custom Coupon Code (optional)" value={f.couponCode} onChange={(v) => set("couponCode")(v.toUpperCase())} placeholder={autoCode} />
              <Field label="Coupon Commission %" type="number" value={f.couponCommissionRate} onChange={set("couponCommissionRate")} />
              <Field label="Referral Commission %" type="number" value={f.referralCommissionRate} onChange={set("referralCommissionRate")} />
            </div>
          </section>

          <section>
            <p className="text-[10px] text-gray-500 uppercase font-bold mb-3 tracking-wider">4 · Payment Info</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Account Holder Name" value={f.bankAccountHolder} onChange={set("bankAccountHolder")} />
              <Field label="Bank Name" value={f.bankName} onChange={set("bankName")} />
              <Field label="Account Number" value={f.bankAccountNumber} onChange={set("bankAccountNumber")} />
              <Field label="IFSC Code" value={f.bankIFSC} onChange={(v) => set("bankIFSC")(v.toUpperCase())} />
              <div className="md:col-span-2">
                <Field label="UPI ID" value={f.upiId} onChange={set("upiId")} placeholder="name@bank" />
              </div>
            </div>
          </section>
        </div>

        <div className="px-6 py-4 flex gap-3 rounded-b-2xl">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors">
            Cancel
          </button>
          <button onClick={submit} disabled={saving}
            className="flex-1 py-2.5 rounded-xl bg-[#C7E36B] text-black text-sm font-bold hover:bg-[#d4ec85] disabled:opacity-50 transition-colors">
            {saving ? "Creating…" : "Create Influencer"}
          </button>
        </div>
      </div>
    </div>
  );
}
