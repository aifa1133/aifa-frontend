import { useEffect, useState, useCallback } from "react";
import { I, money, dateFmt, METHOD_LABEL, infFetch, StatusBadge } from "../../Components/influencer/ui.jsx";

export default function InfluencerReferrals() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [method, setMethod] = useState("");
  const [status, setStatus] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    const qs = new URLSearchParams({ page: String(page), limit: "10" });
    if (search.trim()) qs.set("search", search.trim());
    if (method) qs.set("method", method);
    if (status) qs.set("status", status);
    infFetch(`/api/influencer/referrals?${qs}`)
      .then((d) => {
        setItems(d.items || []);
        setTotal(d.total || 0);
        setPages(d.pages || 1);
        setError("");
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [page, search, method, status]);

  useEffect(() => {
    const t = setTimeout(load, search ? 350 : 0);
    return () => clearTimeout(t);
  }, [load]);

  return (
    <div className="p-6 text-white max-w-[1200px]">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white">Referrals</h1>
        <p className="text-xs text-gray-400 mt-1">
          Every student who purchased through your coupon code or referral link.
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[220px]">
          <I name="search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by student or program…"
            className="w-full bg-[#0F1112] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/60"
          />
        </div>
        <select value={method} onChange={(e) => { setMethod(e.target.value); setPage(1); }}
          className="bg-[#0F1112] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#C7E36B]/60">
          <option value="">All Methods</option>
          <option value="coupon">Coupon</option>
          <option value="referral_link">Referral Link</option>
        </select>
        <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="bg-[#0F1112] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#C7E36B]/60">
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-2.5 rounded-xl mb-4">
          {error}
        </div>
      )}

      {/* TABLE */}
      <div className="border border-white/10 rounded-xl overflow-hidden bg-[#0F1112]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left">
            <thead className="bg-white/5">
              <tr className="text-[10px] uppercase tracking-wider text-gray-500">
                <th className="px-4 py-3 font-bold">Student</th>
                <th className="px-4 py-3 font-bold">Program</th>
                <th className="px-4 py-3 font-bold">Method</th>
                <th className="px-4 py-3 font-bold">Purchase Amount</th>
                <th className="px-4 py-3 font-bold">Commission</th>
                <th className="px-4 py-3 font-bold">Status</th>
                <th className="px-4 py-3 font-bold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-500 text-sm">Loading referrals…</td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-500 text-sm">
                  No referrals match these filters yet.
                </td></tr>
              ) : (
                items.map((c) => (
                  <tr key={c._id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm text-white font-semibold">{c.studentName || "—"}</p>
                      <p className="text-[11px] text-gray-500">{c.studentEmail}</p>
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
                    <td className="px-4 py-3"><StatusBadge s={c.approvalStatus} /></td>
                    <td className="px-4 py-3 text-xs text-gray-400">{dateFmt(c.purchaseDate)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-[11px] text-gray-500">{total} referral{total === 1 ? "" : "s"} total</p>
        {pages > 1 && (
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
        )}
      </div>
    </div>
  );
}
