import { useState, useEffect, useCallback } from "react";

/* ─── Inline icons ─── */
const Ic = ({ d, size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={d} />
  </svg>
);
const ICONS = {
  clock: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z",
  money: "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z",
  check: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  cancel: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z",
  search: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
  close: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
};
const I = ({ name, size = 16, className = "" }) => <Ic d={ICONS[name] || ICONS.money} size={size} className={className} />;

const money = (n) => `₹${Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
const dateFmt = (d) => (d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—");
const authToken = (t) => t || localStorage.getItem("aifa_token") || "";
const METHOD_LABEL = { coupon: "Coupon", referral_link: "Referral Link" };

function StatCard({ label, value, sub, icon, tone }) {
  const tones = {
    yellow: "bg-yellow-500/10 text-yellow-400",
    blue: "bg-blue-500/10 text-blue-400",
    green: "bg-green-500/10 text-green-400",
    red: "bg-red-500/10 text-red-400",
  };
  return (
    <div className="bg-[#0F1112] border border-white/10 rounded-2xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-black text-white mt-2">{value}</p>
          {sub && <p className="text-[11px] text-gray-500 mt-1">{sub}</p>}
        </div>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${tones[tone]}`}>
          <I name={icon} size={17} />
        </div>
      </div>
    </div>
  );
}

const ApprovalBadge = ({ s }) => {
  const map = {
    approved: "bg-green-500/20 text-green-400",
    pending: "bg-yellow-500/20 text-yellow-400",
    rejected: "bg-red-500/20 text-red-400",
  };
  return <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${map[s] || "bg-white/10 text-gray-400"}`}>{s}</span>;
};

const PaymentBadge = ({ s }) => {
  const map = { paid: "bg-green-500/20 text-green-400", unpaid: "bg-yellow-500/20 text-yellow-400" };
  return <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${map[s] || "bg-white/10 text-gray-400"}`}>{s}</span>;
};

const Row = ({ label, children }) => (
  <div className="flex items-start justify-between gap-4 py-2.5 border-b border-white/5 last:border-0">
    <span className="text-[11px] text-gray-500 font-medium shrink-0">{label}</span>
    <span className="text-xs text-white text-right break-all">{children || "—"}</span>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════════ */
export default function AdminCommissions({ token: tokenProp }) {
  const token = authToken(tokenProp);
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

  const [stats, setStats] = useState(null);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [method, setMethod] = useState("");
  const [approval, setApproval] = useState("");
  const [payment, setPayment] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [detail, setDetail] = useState(null);
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");
  const flash = (m) => { setToast(m); setTimeout(() => setToast(""), 2600); };

  const loadStats = useCallback(() => {
    fetch("/api/admin/commissions/stats", { headers })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setStats(d))
      .catch(() => {});
  }, [token]);

  const loadList = useCallback(() => {
    setLoading(true);
    const qs = new URLSearchParams({ page: String(page), limit: "20" });
    if (search.trim()) qs.set("search", search.trim());
    if (method) qs.set("method", method);
    if (approval) qs.set("approvalStatus", approval);
    if (payment) qs.set("paymentStatus", payment);
    if (from) qs.set("from", from);
    if (to) qs.set("to", to);
    fetch(`/api/admin/commissions?${qs}`, { headers })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Could not load commissions"))))
      .then((d) => {
        setItems(d.items || []);
        setTotal(d.total || 0);
        setPages(d.pages || 1);
        setError("");
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token, page, search, method, approval, payment, from, to]);

  useEffect(() => { loadStats(); }, [loadStats]);
  useEffect(() => {
    const t = setTimeout(loadList, search ? 350 : 0);
    return () => clearTimeout(t);
  }, [loadList]);

  const openDetail = (c) => { setDetail(c); setNotes(c.internalNotes || ""); };

  const act = async (path, method_ = "PUT", body) => {
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/commissions/${detail._id}${path}`, {
        method: method_, headers, body: body ? JSON.stringify(body) : undefined,
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.message || "Action failed");
      setDetail(d);
      loadList(); loadStats();
      return d;
    } catch (e) { flash(e.message); return null; }
    finally { setBusy(false); }
  };

  const resetFilters = () => {
    setSearch(""); setMethod(""); setApproval(""); setPayment(""); setFrom(""); setTo(""); setPage(1);
  };

  return (
    <div className="p-6 text-white">
      {toast && (
        <div className="fixed top-5 right-5 z-[10000] bg-[#C7E36B] text-black text-sm font-bold px-4 py-2.5 rounded-xl shadow-2xl">
          {toast}
        </div>
      )}

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white">Commissions</h1>
        <p className="text-xs text-gray-400 mt-1">
          Review, approve and settle influencer commissions earned through coupons and referral links.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Pending Approval" value={stats ? money(stats.pendingApproval) : "—"}
          sub={stats ? `${stats.pendingApprovalCount} record(s)` : ""} icon="clock" tone="yellow" />
        <StatCard label="Pending Payment" value={stats ? money(stats.pendingPayment) : "—"}
          sub={stats ? `${stats.pendingPaymentCount} record(s)` : ""} icon="money" tone="blue" />
        <StatCard label="Total Commission Paid" value={stats ? money(stats.totalCommissionPaid) : "—"} icon="check" tone="green" />
        <StatCard label="Rejected Commissions" value={stats ? money(stats.rejectedCommissions) : "—"}
          sub={stats ? `${stats.rejectedCount} record(s)` : ""} icon="cancel" tone="red" />
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <I name="search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search student, program, order ID…"
            className="w-full bg-[#0F1112] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/60"
          />
        </div>
        <select value={method} onChange={(e) => { setMethod(e.target.value); setPage(1); }}
          className="bg-[#0F1112] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#C7E36B]/60">
          <option value="">All Methods</option>
          <option value="coupon">Coupon</option>
          <option value="referral_link">Referral Link</option>
        </select>
        <select value={approval} onChange={(e) => { setApproval(e.target.value); setPage(1); }}
          className="bg-[#0F1112] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#C7E36B]/60">
          <option value="">All Approvals</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <select value={payment} onChange={(e) => { setPayment(e.target.value); setPage(1); }}
          className="bg-[#0F1112] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#C7E36B]/60">
          <option value="">All Payments</option>
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
        </select>
        <input type="date" value={from} onChange={(e) => { setFrom(e.target.value); setPage(1); }}
          className="bg-[#0F1112] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#C7E36B]/60" />
        <input type="date" value={to} onChange={(e) => { setTo(e.target.value); setPage(1); }}
          className="bg-[#0F1112] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#C7E36B]/60" />
        <button onClick={resetFilters}
          className="px-3 py-2.5 rounded-xl text-sm font-semibold bg-white/5 text-gray-400 hover:bg-white/10 transition-colors">
          Reset
        </button>
      </div>

      {/* TABLE */}
      <div className="border border-white/10 rounded-xl overflow-hidden bg-[#0F1112]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left">
            <thead className="bg-white/5">
              <tr className="text-[10px] uppercase tracking-wider text-gray-500">
                <th className="px-4 py-3 font-bold">Student</th>
                <th className="px-4 py-3 font-bold">Influencer</th>
                <th className="px-4 py-3 font-bold">Program</th>
                <th className="px-4 py-3 font-bold">Method</th>
                <th className="px-4 py-3 font-bold">Sale Amount</th>
                <th className="px-4 py-3 font-bold">Commission</th>
                <th className="px-4 py-3 font-bold">Approval</th>
                <th className="px-4 py-3 font-bold">Payment</th>
                <th className="px-4 py-3 font-bold">Purchase Date</th>
                <th className="px-4 py-3 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={10} className="px-4 py-12 text-center text-gray-500 text-sm">Loading commissions…</td></tr>
              ) : error ? (
                <tr><td colSpan={10} className="px-4 py-12 text-center text-red-400 text-sm">{error}</td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={10} className="px-4 py-12 text-center text-gray-500 text-sm">
                  No commissions match these filters yet.
                </td></tr>
              ) : (
                items.map((c) => (
                  <tr key={c._id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm text-white font-semibold">{c.studentName || "—"}</p>
                      <p className="text-[11px] text-gray-500">{c.studentEmail}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-white">{c.influencerId?.fullName || "—"}</p>
                      <p className="text-[11px] text-[#C7E36B] font-bold">{c.influencerId?.couponCode || ""}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-300">{c.program || "—"}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-white/10 text-gray-300">
                        {METHOD_LABEL[c.method] || c.method}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-white">{money(c.purchaseAmount)}</td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-[#C7E36B] font-bold">{money(c.commissionAmount)}</p>
                      <p className="text-[10px] text-gray-500">{c.commissionPercentage}%</p>
                    </td>
                    <td className="px-4 py-3"><ApprovalBadge s={c.approvalStatus} /></td>
                    <td className="px-4 py-3"><PaymentBadge s={c.paymentStatus} /></td>
                    <td className="px-4 py-3 text-xs text-gray-400">{dateFmt(c.purchaseDate)}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => openDetail(c)}
                        className="text-[11px] font-bold text-[#C7E36B] border border-[#C7E36B]/30 hover:bg-[#C7E36B]/10 px-3 py-1.5 rounded-lg transition-colors">
                        View
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
          <p className="text-[11px] text-gray-500">{total} commission{total === 1 ? "" : "s"} total</p>
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

      {/* ═══ DETAIL MODAL ═══ */}
      {detail && (
        <div className="fixed inset-0 bg-black/75 z-[9999] flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-[#0F1112] border border-white/10 rounded-2xl w-full max-w-2xl my-8">
            <div className="sticky top-0 bg-[#0F1112] border-b border-white/10 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h3 className="text-white font-bold text-base">Commission Details</h3>
                <p className="text-[11px] text-gray-500">{detail.orderId ? `Order ${detail.orderId}` : "Commission record"}</p>
              </div>
              <button onClick={() => setDetail(null)} className="text-gray-400 hover:text-white"><I name="close" size={20} /></button>
            </div>

            <div className="p-6 space-y-5">
              {/* Student */}
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                <p className="text-[10px] text-gray-500 uppercase font-bold py-2 tracking-wider">Student</p>
                <Row label="Name">{detail.studentName}</Row>
                <Row label="Email">{detail.studentEmail}</Row>
                <Row label="Phone">{detail.studentPhone}</Row>
              </div>

              {/* Purchase */}
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                <p className="text-[10px] text-gray-500 uppercase font-bold py-2 tracking-wider">Purchase</p>
                <Row label="Program">{detail.program}</Row>
                <Row label="Order ID">{detail.orderId}</Row>
                <Row label="Purchase Date">{dateFmt(detail.purchaseDate)}</Row>
                <Row label="Sale Amount">{money(detail.purchaseAmount)}</Row>
              </div>

              {/* Influencer */}
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                <p className="text-[10px] text-gray-500 uppercase font-bold py-2 tracking-wider">Influencer</p>
                <Row label="Name">{detail.influencerId?.fullName}</Row>
                <Row label="Email">{detail.influencerId?.email}</Row>
                <Row label="Method">{METHOD_LABEL[detail.method] || detail.method}</Row>
                <Row label={detail.method === "coupon" ? "Coupon Code" : "Referral Link"}>
                  {detail.method === "coupon" ? detail.couponCode : detail.referralLink}
                </Row>
              </div>

              {/* Breakdown */}
              <div className="border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-white/5">
                    <tr className="text-[10px] uppercase tracking-wider text-gray-500">
                      <th className="px-4 py-2.5 font-bold">Line</th>
                      <th className="px-4 py-2.5 font-bold text-right">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr className="hover:bg-white/5"><td className="px-4 py-2.5 text-xs text-gray-300">Sale amount</td><td className="px-4 py-2.5 text-xs text-white text-right">{money(detail.purchaseAmount)}</td></tr>
                    <tr className="hover:bg-white/5"><td className="px-4 py-2.5 text-xs text-gray-300">Commission rate</td><td className="px-4 py-2.5 text-xs text-white text-right">{detail.commissionPercentage}%</td></tr>
                    <tr className="hover:bg-white/5 bg-[#C7E36B]/5"><td className="px-4 py-2.5 text-xs font-bold text-[#C7E36B]">Commission payable</td><td className="px-4 py-2.5 text-sm font-black text-[#C7E36B] text-right">{money(detail.commissionAmount)}</td></tr>
                  </tbody>
                </table>
              </div>

              {/* Statuses */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">Approval Status</p>
                  <ApprovalBadge s={detail.approvalStatus} />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">Payment Status</p>
                  <PaymentBadge s={detail.paymentStatus} />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[11px] text-gray-400 font-semibold mb-1.5">Internal Notes</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Visible to admins only…"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/60 resize-none"
                />
                <button
                  onClick={async () => { const d = await act("/notes", "PUT", { internalNotes: notes }); if (d) flash("Notes saved"); }}
                  disabled={busy}
                  className="mt-2 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 transition-colors"
                >
                  Save Notes
                </button>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={async () => { const d = await act("/approve"); if (d) flash("Commission approved"); }}
                  disabled={busy || detail.approvalStatus === "approved"}
                  className="py-2.5 rounded-xl bg-green-500/20 text-green-400 text-sm font-bold hover:bg-green-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={async () => { const d = await act("/reject", "PUT", { internalNotes: notes }); if (d) flash("Commission rejected"); }}
                  disabled={busy || detail.approvalStatus === "rejected"}
                  className="py-2.5 rounded-xl bg-red-500/20 text-red-400 text-sm font-bold hover:bg-red-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Reject
                </button>
                <button
                  onClick={async () => { const d = await act("/mark-paid"); if (d) flash("Marked as paid"); }}
                  disabled={busy || detail.approvalStatus !== "approved" || detail.paymentStatus === "paid"}
                  className="py-2.5 rounded-xl bg-[#C7E36B] text-black text-sm font-bold hover:bg-[#d4ec85] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Mark Paid
                </button>
                <button onClick={() => setDetail(null)}
                  className="py-2.5 rounded-xl bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
