import { useState, useEffect, useCallback } from "react";
import AdminCommissions from "./AdminCommissions.jsx";

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

const Badge = ({ status }) => {
  const map = {
    active: "border-green-500/50 text-green-400",
    inactive: "border-gray-500/50 text-gray-400",
  };
  return (
    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase border ${map[status] || "border-white/20 text-gray-400"}`}>
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

  const [tab, setTab] = useState("influencers");
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
      <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
        <div>
          <h1 className="text-2xl font-black text-white">Influencers</h1>
          <p className="text-xs text-gray-400 mt-1">
            Manage influencer accounts, referral assets and performance.
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-[#C7E36B] text-black text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-[#d4ec85] transition-colors"
        >
          <I name="plus" size={15} /> Add Influencer
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-6 border-b border-white/10 mb-6">
        <button onClick={() => setTab("influencers")}
          className={tab === "influencers"
            ? "pb-2.5 text-sm font-bold transition-colors text-white border-b-2 border-[#C7E36B]"
            : "pb-2.5 text-sm font-bold transition-colors text-gray-500 hover:text-gray-300 border-b-2 border-transparent"
          }>
          Influencers
        </button>
        <button onClick={() => setTab("commissions")}
          className={tab === "commissions"
            ? "pb-2.5 text-sm font-bold transition-colors text-white border-b-2 border-[#C7E36B]"
            : "pb-2.5 text-sm font-bold transition-colors text-gray-500 hover:text-gray-300 border-b-2 border-transparent"
          }>
          Commissions
        </button>
      </div>

      {tab === "commissions" && <AdminCommissions token={token} />}

      {tab === "influencers" && <>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Influencers", value: stats?.totalInfluencers ?? "—" },
          { label: "Active Influencers", value: stats?.activeInfluencers ?? "—" },
          { label: "Pending Approval", value: stats?.pendingApproval ?? "—" },
          { label: "Lifetime Commission Paid", value: stats ? money(stats.lifetimeCommissionPaid) : "—" },
        ].map((c) => (
          <div key={c.label} className="bg-[#0F1112] border border-white/10 rounded-2xl p-5">
            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">{c.label}</p>
            <p className="text-2xl font-black text-white mt-2">{c.value}</p>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div className="bg-[#0F1112] border border-white/10 rounded-xl p-4 mb-4 flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1.5 block">Search Influencer</label>
          <div className="relative">
            <I name="search" size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search influencer"
              className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg pl-8 pr-4 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50"
            />
          </div>
        </div>
        <div className="min-w-[160px]">
          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1.5 block">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/50 appearance-none cursor-pointer"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="border border-white/10 rounded-xl overflow-hidden bg-[#0F1112]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left">
            <thead className="bg-white/5">
              <tr className="text-[10px] uppercase tracking-wider text-gray-500">
                <th className="px-4 py-3 font-bold">Profile</th>
                <th className="px-4 py-3 font-bold">Coupon Code</th>
                <th className="px-4 py-3 font-bold">Referral Link</th>
                <th className="px-4 py-3 font-bold">Lifetime Earnings</th>
                <th className="px-4 py-3 font-bold">Pending Commission</th>
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
                    <td className="px-4 py-3 text-sm text-white font-black">{inf.couponCode}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{inf.status === "active" ? "Active" : "Disabled"}</td>
                    <td className="px-4 py-3 text-sm text-white font-bold">{money(inf.lifetimeEarnings)}</td>
                    <td className="px-4 py-3 text-sm text-white font-bold">{money(inf.pendingCommission)}</td>
                    <td className="px-4 py-3"><Badge status={inf.status} /></td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => openDetail(inf)}
                        className="text-[11px] font-bold text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
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

      </>}

      {/* ═══ DETAIL SLIDE-IN PANEL ═══ */}
      {detail && (
        <div className="fixed inset-0 z-[9998] flex justify-end">
          <div className="absolute inset-0 bg-black/70" onClick={() => { setDetail(null); setEditing(false); }} />
          <div className="relative w-full max-w-[520px] h-full bg-[#0F1112] border-l border-white/10 overflow-y-auto">
            {/* panel header — avatar + name + status + Edit button */}
            <div className="sticky top-0 bg-[#0F1112] border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[#C7E36B] flex items-center justify-center overflow-hidden shrink-0">
                  {detail.profilePhoto
                    ? <img src={detail.profilePhoto} alt="" className="w-full h-full object-cover" />
                    : <span className="text-black font-black">{(detail.fullName || "?")[0].toUpperCase()}</span>}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white truncate">{detail.fullName}</p>
                  <p className="text-[11px] text-gray-400 capitalize">{detail.status || "Active"}</p>
                </div>
              </div>
              {!editing && (
                <button onClick={startEdit}
                  className="flex items-center gap-1.5 text-[11px] font-bold text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors shrink-0">
                  <I name="edit" size={12} /> Edit
                </button>
              )}
            </div>

            <div className="p-6 space-y-5">
              {detailLoading && <p className="text-xs text-gray-500">Loading details…</p>}

              {!editing ? (
                <>
                  {/* BANK INFORMATION */}
                  <div>
                    <h3 className="text-sm font-bold text-white mb-3">Bank Information</h3>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 grid grid-cols-2 gap-4">
                      {[
                        { label: "Account Holder", value: detail.bankAccountHolder },
                        { label: "Bank", value: detail.bankName },
                        { label: "Account Number", value: detail.bankAccountNumber || "—" },
                        { label: "IFSC", value: detail.bankIFSC },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">{label}</p>
                          <p className="text-sm font-semibold text-white break-all">{value || "—"}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BASIC INFORMATION */}
                  <div>
                    <h3 className="text-sm font-bold text-white mb-3">Basic Information</h3>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 grid grid-cols-2 gap-4">
                      {[
                        { label: "Full Name", value: detail.fullName },
                        { label: "Email Address", value: detail.email },
                        { label: "Phone Number", value: detail.phone },
                        { label: "Country", value: detail.country },
                        { label: "City", value: detail.city },
                        { label: "Joined On", value: detail.createdAt ? new Date(detail.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—" },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">{label}</p>
                          <p className="text-sm font-semibold text-white break-all">{value || "—"}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SOCIAL MEDIA */}
                  <div>
                    <h3 className="text-sm font-bold text-white mb-3">Social Media</h3>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 grid grid-cols-2 gap-4">
                      {[
                        { label: "Instagram", value: detail.instagram },
                        { label: "YouTube", value: detail.youtube },
                        { label: "LinkedIn", value: detail.linkedin },
                        { label: "Other", value: detail.otherSocial },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">{label}</p>
                          <p className="text-sm font-semibold text-white break-all">{value || "—"}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* COUPON + REFERRAL LINK */}
                  <div className="space-y-3">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">Coupon Code</p>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-lg font-black text-[#C7E36B] tracking-wide">{detail.couponCode}</span>
                        <CopyBtn value={detail.couponCode} label="Copy Coupon Code" />
                      </div>
                      <p className="text-[10px] text-gray-500 mt-2">
                        Student discount {detail.couponCommissionRate}% · Commission {detail.couponCommissionRate}%
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">Referral Link</p>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-white break-all">{detail.referralLink}</span>
                        <CopyBtn value={detail.referralLink} label="Copy Referral Link" />
                      </div>
                      <p className="text-[10px] text-gray-500 mt-2">Commission {detail.referralCommissionRate}%</p>
                    </div>
                  </div>

                  {/* LIFETIME PERFORMANCE */}
                  <div>
                    <h3 className="text-sm font-bold text-white mb-3">Lifetime Performance</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Lifetime Sales", value: money(detail.lifetimeSales) },
                        { label: "Lifetime Earnings", value: money(detail.lifetimeEarnings) },
                        { label: "Pending Approval", value: money(detail.pendingApproval) },
                        { label: "Pending Payment", value: money(detail.pendingCommission) },
                      ].map(({ label, value }) => (
                        <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                          <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">{label}</p>
                          <p className="text-base font-black text-white">{value}</p>
                        </div>
                      ))}
                      <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-4">
                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Total Paid</p>
                        <p className="text-base font-black text-white">{money(detail.totalPaid)}</p>
                      </div>
                    </div>
                  </div>

                  {/* ACTIONS — stacked full-width */}
                  <div className="space-y-2 pt-2">
                    <button onClick={toggleStatus}
                      className={detail.status === "active"
                        ? "w-full py-3 rounded-xl text-sm font-bold transition-colors bg-red-700/60 text-red-200 hover:bg-red-700/80"
                        : "w-full py-3 rounded-xl text-sm font-bold transition-colors bg-green-600/30 text-green-300 hover:bg-green-600/50"
                      }>
                      {detail.status === "active" ? "Deactivate Influencer" : "Activate Influencer"}
                    </button>
                    <button onClick={() => setResetCouponFor(detail)}
                      className="w-full py-3 rounded-xl bg-white/8 text-white text-sm font-bold hover:bg-white/15 transition-colors border border-white/10">
                      Reset Coupon Code
                    </button>
                    <button onClick={() => setResetLinkFor(detail)}
                      className="w-full py-3 rounded-xl bg-white/8 text-white text-sm font-bold hover:bg-white/15 transition-colors border border-white/10">
                      Reset Referral Link
                    </button>
                    <button onClick={() => { setDetail(null); setEditing(false); }}
                      className="w-full py-3 rounded-xl bg-white/5 text-gray-400 text-sm font-bold hover:bg-white/10 transition-colors">
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
        <div className="fixed inset-0 bg-black/75 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0F1112] border border-white/10 rounded-2xl w-full max-w-lg p-6 my-4">
            {/* Header */}
            <div className="flex items-start gap-4 mb-5">
              <div className="w-11 h-11 rounded-full bg-yellow-500/15 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-base">Reset Coupon Code</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">Generate a new unique coupon code for this influencer.</p>
              </div>
            </div>

            {/* Warning text box */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4 space-y-2">
              <p className="text-xs text-gray-300">You are about to generate a new coupon code for this influencer.</p>
              <p className="text-xs text-gray-300">The existing coupon code will become inactive immediately and can no longer be used for future purchases.</p>
              <p className="text-xs text-gray-300">Existing commissions and historical records will remain unchanged.</p>
            </div>

            {/* Current vs New coupon preview */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">Current Coupon</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base font-black text-white">{resetCouponFor.couponCode}</span>
                  <span className="px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 text-[10px] font-bold">Active</span>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">New Coupon</p>
                <p className="text-[10px] text-gray-500 mb-1.5">Automatically Generated</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base font-black text-[#C7E36B]">Auto</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#C7E36B]/20 text-[#C7E36B] text-[10px] font-bold">New</span>
                </div>
              </div>
            </div>

            {/* Information checklist */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-5">
              <p className="text-xs font-bold text-white mb-3">Information</p>
              {[
                "Existing commission records will not be affected.",
                "Future purchases will use the new coupon code.",
                "The influencer will automatically see the updated coupon code in their dashboard.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 mb-2 last:mb-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#C7E36B] mt-0.5 shrink-0">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                  <p className="text-xs text-gray-300">{item}</p>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button onClick={() => setResetCouponFor(null)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors">
                Cancel
              </button>
              <button onClick={doResetCoupon}
                className="flex-1 py-2.5 rounded-xl bg-[#C7E36B] text-black text-sm font-bold hover:bg-[#d4ec85] transition-colors">
                Generate New Coupon Code
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ RESET REFERRAL LINK MODAL ═══ */}
      {resetLinkFor && (
        <div className="fixed inset-0 bg-black/75 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0F1112] border border-white/10 rounded-2xl w-full max-w-lg p-6 my-4">
            {/* Header */}
            <div className="flex items-start gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-yellow-500/15 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-base">Reset Referral Link</h3>
              </div>
            </div>

            {/* Warning paragraphs */}
            <div className="mb-4 space-y-1.5">
              <p className="text-xs text-white">You are about to generate a new referral link for this influencer.</p>
              <p className="text-xs text-gray-400">The existing referral link will become inactive immediately and can no longer be used for new referrals.</p>
              <p className="text-xs text-gray-400">Historical conversions and commission records will remain unchanged.</p>
            </div>

            {/* Current referral link card */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-3">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-3">Current Referral Link</p>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400">
                    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
                  </svg>
                </div>
                <span className="text-xs text-white break-all">{resetLinkFor.referralLink}</span>
              </div>
            </div>

            {/* New referral link card */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">New Referral Link</p>
                <span className="text-[10px] text-[#C7E36B] font-semibold">Automatically Generated</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#C7E36B]/15 flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#C7E36B]">
                    <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-8 8s3.58 8 8 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                  </svg>
                </div>
                <span className="text-xs text-[#C7E36B]">A new unique link will be auto-generated</span>
              </div>
            </div>

            {/* Information checklist */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-5">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-3">Information</p>
              {[
                "Existing commission records will not be affected.",
                "Future referrals will use the new referral link.",
                "The influencer dashboard will automatically display the updated referral link.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 mb-2 last:mb-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#C7E36B] mt-0.5 shrink-0">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                  <p className="text-xs text-gray-300">{item}</p>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button onClick={() => setResetLinkFor(null)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors">
                Cancel
              </button>
              <button onClick={doResetLink}
                className="flex-1 py-2.5 rounded-xl bg-[#C7E36B] text-black text-sm font-bold hover:bg-[#d4ec85] transition-colors">
                Generate New Referral Link
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
const LINK_SVG = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-gray-500 shrink-0">
    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
  </svg>
);

const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/60 transition-colors";

function IconInput({ value, onChange, placeholder }) {
  return (
    <div className="relative flex items-center">
      <span className="absolute left-3">{LINK_SVG}</span>
      <input value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/60 transition-colors" />
    </div>
  );
}

function AddInfluencerModal({ headers, onClose, onCreated }) {
  const [f, setF] = useState({
    fullName: "", email: "", phone: "", password: "", country: "", city: "", profilePhoto: "",
    instagram: "", youtube: "", linkedin: "", otherSocial: "",
    couponCode: "", couponCommissionRate: 10, referralCommissionRate: 30,
    bankAccountHolder: "", bankName: "", bankAccountNumber: "", bankIFSC: "", upiId: "",
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [couponSuffix, setCouponSuffix] = useState(10);

  const set = (k) => (v) => setF((p) => ({ ...p, [k]: v }));

  const baseName = (f.fullName || "").trim().split(/\s+/)[0].replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 10) || "AUTO";
  const autoCode = `${baseName}${couponSuffix}`;
  const autoLink = `https://aifa.ai/?ref=${baseName.toLowerCase() || "auto"}`;
  const displayCode = f.couponCode || autoCode;

  const submit = async () => {
    if (!f.fullName.trim()) { setErr("Full name is required"); return; }
    if (!f.email.trim()) { setErr("Email is required"); return; }
    if (!f.phone.trim()) { setErr("Mobile number is required"); return; }
    if (!/^\d{7,15}$/.test(f.phone.replace(/[\s\-\+]/g, ""))) { setErr("Mobile number must contain only digits (7–15 digits)"); return; }
    if (f.city && /[^a-zA-Z\s]/.test(f.city)) { setErr("City name must contain only letters"); return; }
    setSaving(true); setErr("");
    try {
      const res = await fetch("/api/admin/influencers", {
        method: "POST", headers, body: JSON.stringify({ ...f, couponCode: f.couponCode || autoCode }),
      });
      let d;
      try { d = await res.json(); } catch { throw new Error("Server returned an unexpected response"); }
      if (!res.ok) throw new Error(d.message || "Could not create influencer");
      onCreated(`Influencer created. Temp password: ${d.tempPassword}`);
    } catch (e) { setErr(e.message); }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/75 z-[9999] flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-[#0F1112] border border-white/10 rounded-2xl w-full max-w-md my-8">

        {/* Header */}
        <div className="px-5 py-4 flex items-start justify-between border-b border-white/10">
          <div>
            <h3 className="text-white font-bold text-base">Add Influencer</h3>
            <p className="text-[11px] text-gray-500 mt-0.5">Create a new influencer account and generate referral assets.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white mt-0.5">
            <I name="close" size={18} />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {err && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-2.5 rounded-xl">{err}</div>}

          {/* ── BASIC INFORMATION ── */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-white">Basic Information</h4>
              <span className="text-[10px] text-gray-500">Required fields marked *</span>
            </div>

            {/* Profile Photo Upload */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                {f.profilePhoto
                  ? <img src={f.profilePhoto} alt="" className="w-full h-full object-cover" />
                  : <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-gray-500">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                }
              </div>
              <div>
                <p className="text-xs font-semibold text-white mb-2">Profile Photo</p>
                <label className="cursor-pointer inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
                  </svg>
                  Upload Photo
                  <input type="file" accept="image/png,image/jpeg,image/jpg" className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (ev) => set("profilePhoto")(ev.target.result);
                      reader.readAsDataURL(file);
                    }}
                  />
                </label>
                <p className="text-[10px] text-gray-500 mt-1.5">PNG or JPG up to 2MB</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] text-gray-400 font-semibold mb-1.5">Full Name <span className="text-red-400">*</span></label>
                <input value={f.fullName} onChange={(e) => set("fullName")(e.target.value)} placeholder="Enter influencer full name" className={inputCls} />
              </div>
              <div>
                <label className="block text-[11px] text-gray-400 font-semibold mb-1.5">Email Address <span className="text-red-400">*</span></label>
                <input type="email" value={f.email} onChange={(e) => set("email")(e.target.value)} placeholder="name@email.com" className={inputCls} />
              </div>
              <div>
                <label className="block text-[11px] text-gray-400 font-semibold mb-1.5">Mobile Number <span className="text-red-400">*</span></label>
                <input
                  value={f.phone}
                  onChange={(e) => { const v = e.target.value.replace(/[^\d\s\-\+]/g, ""); set("phone")(v); }}
                  placeholder="+91 9876543210"
                  inputMode="tel"
                  className={inputCls}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-gray-400 font-semibold mb-1.5">Country</label>
                  <select value={f.country} onChange={(e) => set("country")(e.target.value)}
                    className="w-full bg-[#1a1e20] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#C7E36B]/60 appearance-none">
                    <option value="" className="bg-[#1a1e20] text-gray-400">Select country</option>
                    {["India","USA","UK","Canada","Australia","UAE","Singapore","Germany","France","Other"].map(c => (
                      <option key={c} value={c} className="bg-[#1a1e20] text-white">{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 font-semibold mb-1.5">City</label>
                  <input
                    value={f.city}
                    onChange={(e) => { const v = e.target.value.replace(/[^a-zA-Z\s]/g, ""); set("city")(v); }}
                    placeholder="Enter city"
                    className={inputCls}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ── SOCIAL MEDIA ── */}
          <section>
            <h4 className="text-sm font-bold text-white mb-4">Social Media</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] text-gray-400 font-semibold mb-1.5">Instagram</label>
                <IconInput value={f.instagram} onChange={set("instagram")} placeholder="Instagram ID" />
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1.5">YouTube</label>
                <IconInput value={f.youtube} onChange={set("youtube")} placeholder="Youtube ID" />
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1.5">LinkedIn</label>
                <IconInput value={f.linkedin} onChange={set("linkedin")} placeholder="Linkedin ID" />
              </div>
              <div>
                <label className="block text-[11px] text-gray-400 font-semibold mb-1.5">Other</label>
                <IconInput value={f.otherSocial} onChange={set("otherSocial")} placeholder="Other ID" />
              </div>
            </div>
          </section>

          {/* ── COMMISSION SETTINGS ── */}
          <section>
            <h4 className="text-sm font-bold text-white mb-4">Commission Settings</h4>

            {/* Coupon Code card */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-3">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-xs font-semibold text-white">Coupon Code</p>
                  <p className="text-[10px] text-gray-500">Auto generated on account creation</p>
                </div>
                <button onClick={() => setCouponSuffix((n) => n + 1)}
                  className="text-[11px] font-bold text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg transition-colors shrink-0">
                  Generate Again
                </button>
              </div>
              <div className="bg-white/5 border border-white/8 rounded-lg px-3 py-2 flex items-center justify-between">
                <span className="text-sm font-black text-white">{displayCode}</span>
                <span className="text-[10px] text-gray-500">Unique code</span>
              </div>
            </div>

            {/* Referral Link card */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-3">
              <p className="text-xs font-semibold text-white mb-0.5">Referral Link</p>
              <p className="text-[10px] text-gray-500 mb-2">Auto generated and read only</p>
              <div className="bg-white/5 border border-white/8 rounded-lg px-3 py-2">
                <span className="text-[11px] text-gray-300 break-all">{autoLink}</span>
              </div>
            </div>

            {/* Commission rate cards — read only */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Coupon Commission</p>
                <p className="text-xl font-black text-white">{f.couponCommissionRate}%</p>
                <p className="text-[10px] text-gray-500 mt-1">Read only</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Referral Link Commission</p>
                <p className="text-xl font-black text-white">{f.referralCommissionRate}%</p>
                <p className="text-[10px] text-gray-500 mt-1">Read only</p>
              </div>
            </div>
          </section>

          {/* ── PAYMENT INFORMATION ── */}
          <section>
            <h4 className="text-sm font-bold text-white mb-4">Payment Information</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] text-gray-400 font-semibold mb-1.5">Account Holder Name</label>
                <input value={f.bankAccountHolder} onChange={(e) => set("bankAccountHolder")(e.target.value)} className={inputCls} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-gray-400 font-semibold mb-1.5">Bank Name</label>
                  <input value={f.bankName} onChange={(e) => set("bankName")(e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 font-semibold mb-1.5">Account Number</label>
                  <input value={f.bankAccountNumber} onChange={(e) => set("bankAccountNumber")(e.target.value)} className={inputCls} />
                </div>
              </div>
              <div>
                <label className="block text-[11px] text-gray-400 font-semibold mb-1.5">IFSC Code</label>
                <input value={f.bankIFSC} onChange={(e) => set("bankIFSC")(e.target.value.toUpperCase())} className={inputCls} />
              </div>
            </div>
          </section>
        </div>

        {/* Footer buttons */}
        <div className="px-5 py-4 flex gap-3 border-t border-white/10">
          <button onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors">
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
