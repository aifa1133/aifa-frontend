import { useState, useEffect, useCallback } from "react";

const money = (n) => `₹${Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
const dateFmt = (d) => (d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—");
const authToken = (t) => t || localStorage.getItem("aifa_token") || "";
const METHOD_LABEL = { coupon: "Coupon Code", referral_link: "Referral Link" };

const CLOSE_PATH = "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z";
const SEARCH_PATH = "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z";

/* Stat card — no icons, with subtitle */
function StatCard({ label, value, sub }) {
  return (
    <div className="bg-[#0F1112] border border-white/10 rounded-2xl p-5">
      <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-black text-white mt-2">{value}</p>
      {sub && <p className="text-[11px] text-gray-500 mt-1">{sub}</p>}
    </div>
  );
}

/* Bordered pill badges */
const ApprovalBadge = ({ s }) => {
  const map = {
    approved: "border-green-500/50 text-green-400",
    pending:  "border-yellow-500/50 text-yellow-400",
    rejected: "border-red-500/50 text-red-400",
  };
  const label = { approved: "Approved", pending: "Pending", rejected: "Rejected" };
  return (
    <span className={"px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase " + (map[s] || "border-white/20 text-gray-400")}>
      {label[s] || s || "—"}
    </span>
  );
};

const PaymentBadge = ({ s }) => {
  const map = { paid: "border-green-500/50 text-green-400", unpaid: "border-yellow-500/50 text-yellow-400" };
  const label = { paid: "Paid", unpaid: "Unpaid" };
  return (
    <span className={"px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase " + (map[s] || "border-white/20 text-gray-400")}>
      {label[s] || s || "—"}
    </span>
  );
};

const Row = ({ label, children }) => (
  <div className="flex items-start justify-between gap-4 py-2.5 border-b border-white/5 last:border-0">
    <span className="text-[11px] text-gray-500 font-medium shrink-0">{label}</span>
    <span className="text-xs text-white text-right break-all">{children || "—"}</span>
  </div>
);

/* Date-range helper — converts "last_30" etc. to from/to ISO strings */
function dateRangeFromPreset(preset) {
  const now = new Date();
  const to = now.toISOString().split("T")[0];
  if (!preset || preset === "all") return { from: "", to: "" };
  const days = { last_7: 7, last_30: 30, last_90: 90 }[preset];
  if (!days) return { from: "", to: "" };
  const d = new Date(now);
  d.setDate(d.getDate() - days);
  return { from: d.toISOString().split("T")[0], to };
}

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
  const [datePreset, setDatePreset] = useState("last_30");

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
    const { from, to } = dateRangeFromPreset(datePreset);
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
  }, [token, page, search, method, approval, payment, datePreset]);

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
    setSearch(""); setMethod(""); setApproval(""); setPayment(""); setDatePreset("last_30"); setPage(1);
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
          Review, approve and manage influencer commissions generated through Coupon Codes and Referral Links.
        </p>
      </div>

      {/* STAT CARDS — no icons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Pending Approval"      value={stats ? money(stats.pendingApproval)      : "—"} sub="Awaiting admin review" />
        <StatCard label="Pending Payment"       value={stats ? money(stats.pendingPayment)       : "—"} sub="Approved and unpaid" />
        <StatCard label="Total Commission Paid" value={stats ? money(stats.totalCommissionPaid)  : "—"} sub="Processed payouts" />
        <StatCard label="Rejected Commissions"  value={stats ? money(stats.rejectedCommissions)  : "—"} sub="Declined entries" />
      </div>

      {/* FILTERS — unified container */}
      <div className="bg-[#0F1112] border border-white/10 rounded-xl p-4 mb-4">
        <div className="flex flex-wrap items-end gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <path d={SEARCH_PATH} />
            </svg>
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by Influencer or Coupon Code"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/60"
            />
          </div>

          {/* Method */}
          <div className="min-w-[130px]">
            <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Method</label>
            <select value={method} onChange={(e) => { setMethod(e.target.value); setPage(1); }}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/60 appearance-none">
              <option value="">All</option>
              <option value="coupon">Coupon Code</option>
              <option value="referral_link">Referral Link</option>
            </select>
          </div>

          {/* Approval Status */}
          <div className="min-w-[140px]">
            <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Approval Status</label>
            <select value={approval} onChange={(e) => { setApproval(e.target.value); setPage(1); }}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/60 appearance-none">
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Payment Status */}
          <div className="min-w-[140px]">
            <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Payment Status</label>
            <select value={payment} onChange={(e) => { setPayment(e.target.value); setPage(1); }}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/60 appearance-none">
              <option value="">All</option>
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="min-w-[140px]">
            <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Date Range</label>
            <select value={datePreset} onChange={(e) => { setDatePreset(e.target.value); setPage(1); }}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/60 appearance-none">
              <option value="all">All time</option>
              <option value="last_7">Last 7 days</option>
              <option value="last_30">Last 30 days</option>
              <option value="last_90">Last 90 days</option>
            </select>
          </div>
        </div>
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
                <th className="px-4 py-3 font-bold">Approval Status</th>
                <th className="px-4 py-3 font-bold">Payment Status</th>
                <th className="px-4 py-3 font-bold">Purchase Date</th>
                <th className="px-4 py-3 font-bold">Action</th>
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
                    <td className="px-4 py-3 text-sm text-white font-bold">{money(c.commissionAmount)}</td>
                    <td className="px-4 py-3"><ApprovalBadge s={c.approvalStatus} /></td>
                    <td className="px-4 py-3"><PaymentBadge s={c.paymentStatus} /></td>
                    <td className="px-4 py-3 text-xs text-gray-400">{dateFmt(c.purchaseDate)}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => openDetail(c)}
                        className="text-[11px] font-bold text-black bg-white hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors">
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
          <div className="bg-[#0F1112] border border-white/10 rounded-2xl w-full max-w-lg my-8">

            {/* Header — title + status badge */}
            <div className="px-5 py-4 flex items-start justify-between border-b border-white/10">
              <div>
                <h3 className="text-white font-bold text-base mb-1.5">Commission Details</h3>
                <ApprovalBadge s={detail.approvalStatus} />
              </div>
              <button onClick={() => setDetail(null)} className="text-gray-400 hover:text-white mt-0.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d={CLOSE_PATH} /></svg>
              </button>
            </div>

            <div className="p-5 space-y-4">

              {/* Student Information — 2-col grid */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-sm font-bold text-white mb-3">Student Information</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  <div>
                    <p className="text-[10px] text-gray-500 mb-0.5">Student Name</p>
                    <p className="text-sm text-white font-semibold">{detail.studentName || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 mb-0.5">Email</p>
                    <p className="text-sm text-white break-all">{detail.studentEmail || "—"}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] text-gray-500 mb-0.5">Phone Number</p>
                    <p className="text-sm text-white">{detail.studentPhone || "—"}</p>
                  </div>
                </div>
              </div>

              {/* Purchase Details — 2x2 grid */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-sm font-bold text-white mb-3">Purchase Details</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  <div>
                    <p className="text-[10px] text-gray-500 mb-0.5">Program</p>
                    <p className="text-sm text-white">{detail.program || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 mb-0.5">Purchase Amount</p>
                    <p className="text-sm text-white font-semibold">{money(detail.purchaseAmount)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 mb-0.5">Purchase Date</p>
                    <p className="text-sm text-white">{dateFmt(detail.purchaseDate)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 mb-0.5">Order ID</p>
                    <p className="text-xs text-white break-all">{detail.orderId || "—"}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] text-gray-500 mb-1">Payment Status</p>
                    <span className="px-2.5 py-1 rounded-md border border-green-500/50 text-green-400 text-[10px] font-bold">
                      Successful
                    </span>
                  </div>
                </div>
              </div>

              {/* Influencer Information */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-sm font-bold text-white mb-3">Influencer Information</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] text-gray-500 mb-0.5">Influencer</p>
                    <p className="text-sm text-white">{detail.influencerId?.fullName || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 mb-0.5">Conversion Method</p>
                    <p className="text-sm text-white">{METHOD_LABEL[detail.method] || detail.method || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 mb-1">{detail.method === "coupon" ? "Coupon Code" : "Referral Link"}</p>
                    <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                      <p className="text-xs text-gray-300 break-all">
                        {detail.method === "coupon" ? detail.couponCode : detail.referralLink || "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Commission Breakdown — 3 side-by-side cards */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-sm font-bold text-white mb-3">Commission Breakdown</p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-gray-500 mb-1">Sale Amount</p>
                    <p className="text-sm font-bold text-white">{money(detail.purchaseAmount)}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-gray-500 mb-1">Percentage</p>
                    <p className="text-sm font-bold text-white">{detail.commissionPercentage}%</p>
                  </div>
                  <div className="bg-[#C7E36B]/10 border border-[#C7E36B]/30 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-[#C7E36B]/70 mb-1">Amount</p>
                    <p className="text-sm font-bold text-[#C7E36B]">{money(detail.commissionAmount)}</p>
                  </div>
                </div>
              </div>

              {/* Commission Status */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-sm font-bold text-white mb-2">Commission Status</p>
                <p className="text-[10px] text-gray-500 mb-1.5">Commission Status</p>
                <ApprovalBadge s={detail.approvalStatus} />
              </div>

              {/* Payment Information */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-sm font-bold text-white mb-2">Payment Information</p>
                <p className="text-[10px] text-gray-500 mb-1.5">Payment Status</p>
                <PaymentBadge s={detail.paymentStatus} />
              </div>

              {/* Internal Notes */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-sm font-bold text-white mb-2">Internal Notes</p>
                <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add internal notes for finance or management."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/60 resize-none"
                />
              </div>

              {/* Actions */}
              <div>
                <p className="text-sm font-bold text-white mb-3">Actions</p>
                <div className="flex gap-3 mb-3">
                  <button
                    onClick={async () => {
                      const d = await act("/notes", "PUT", { internalNotes: notes });
                      if (d) { const r = await act("/approve"); if (r) flash("Commission approved"); }
                    }}
                    disabled={busy || detail.approvalStatus === "approved"}
                    className="flex-1 py-2.5 rounded-xl bg-[#C7E36B] text-black text-sm font-bold hover:bg-[#d4ec85] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                    Approve Commission
                  </button>
                  <button
                    onClick={async () => { const d = await act("/reject", "PUT", { internalNotes: notes }); if (d) flash("Commission rejected"); }}
                    disabled={busy || detail.approvalStatus === "rejected"}
                    className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white text-sm font-bold hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                    Reject Commission
                  </button>
                </div>

                {detail.approvalStatus === "approved" && (
                  <div className="mb-3">
                    <p className="text-[10px] text-gray-500 mb-2">Approved state preview</p>
                    <button
                      onClick={async () => { const d = await act("/mark-paid"); if (d) flash("Marked as paid"); }}
                      disabled={busy || detail.paymentStatus === "paid"}
                      className="w-full py-2.5 rounded-xl bg-[#C7E36B] text-black text-sm font-bold hover:bg-[#d4ec85] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                      Mark as Paid
                    </button>
                  </div>
                )}

                <button onClick={() => setDetail(null)}
                  className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-colors">
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
