import { useEffect, useState, useCallback } from "react";
import { money, dateFmt, infFetch } from "../../Components/influencer/ui.jsx";

const METHOD_LABEL = { coupon: "Coupon Code", referral_link: "Referral Link" };

const StatusBadge = ({ s }) => {
  const styles = {
    approved: "bg-green-500/15 border-green-500/40 text-green-400",
    completed: "bg-green-500/15 border-green-500/40 text-green-400",
    pending:   "bg-yellow-500/15 border-yellow-500/40 text-yellow-400",
    rejected:  "bg-red-500/15 border-red-500/40 text-red-400",
  };
  const label = { approved: "Approved", completed: "Approved", pending: "Pending", rejected: "Rejected" };
  return (
    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${styles[s] || "border-white/20 text-gray-400"}`}>
      {label[s] || s || "—"}
    </span>
  );
};

export default function InfluencerReferrals() {
  const [items, setItems]   = useState([]);
  const [total, setTotal]   = useState(0);
  const [pages, setPages]   = useState(1);
  const [page, setPage]     = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState("");
  const [search, setSearch] = useState("");
  const [method, setMethod] = useState("");
  const [status, setStatus] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    const qs = new URLSearchParams({ page: String(page), limit: String(limit) });
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
  }, [page, limit, search, method, status]);

  useEffect(() => {
    const t = setTimeout(load, search ? 350 : 0);
    return () => clearTimeout(t);
  }, [load]);

  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to   = Math.min(page * limit, total);

  // Visible page numbers
  const pageNums = () => {
    if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
    if (page <= 4) return [1, 2, 3, 4, 5, "...", pages];
    if (page >= pages - 3) return [1, "...", pages - 4, pages - 3, pages - 2, pages - 1, pages];
    return [1, "...", page - 1, page, page + 1, "...", pages];
  };

  return (
    <div className="p-6 text-white max-w-[1100px]">
      <div className="mb-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#C7E36B]/15 border border-[#C7E36B]/30 flex items-center justify-center flex-shrink-0">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C7E36B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-black text-white">Referrals</h1>
          <p className="text-xs text-gray-400 mt-0.5">Track every successful referral made using your coupon code or referral link.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-2.5 rounded-xl mb-4">{error}</div>
      )}

      {/* FILTERS */}
      <div className="bg-[#0F1112] border border-white/10 rounded-xl p-4 mb-4 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[180px]">
          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1.5 block">Search Student</label>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by student name"
              className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/50"
            />
          </div>
        </div>

        <div className="min-w-[150px]">
          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1.5 block">Method</label>
          <select value={method} onChange={(e) => { setMethod(e.target.value); setPage(1); }}
            className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/50 appearance-none cursor-pointer">
            <option value="">All</option>
            <option value="coupon">Coupon Code</option>
            <option value="referral_link">Referral Link</option>
          </select>
        </div>

        <div className="min-w-[150px]">
          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1.5 block">Status</label>
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="w-full bg-[#1A1D1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#C7E36B]/50 appearance-none cursor-pointer">
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="border border-white/10 rounded-xl overflow-hidden bg-[#0F1112]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left">
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
                    <td className="px-4 py-3 text-xs text-gray-300">{METHOD_LABEL[c.method] || c.method || "—"}</td>
                    <td className="px-4 py-3 text-sm text-white">{money(c.purchaseAmount)}</td>
                    <td className="px-4 py-3 text-sm text-white font-bold">{money(c.commissionAmount)}</td>
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
      <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
        <p className="text-[11px] text-gray-500">
          {total === 0 ? "No results" : `Showing ${from} to ${to} of ${total} result${total !== 1 ? "s" : ""}`}
        </p>
        {pages > 1 && (
          <div className="flex items-center gap-1">
            <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}
              className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-sm">
              ‹
            </button>
            {pageNums().map((n, i) =>
              n === "..." ? (
                <span key={`e${i}`} className="w-7 h-7 flex items-center justify-center text-gray-500 text-xs">…</span>
              ) : (
                <button key={n} onClick={() => setPage(n)}
                  className={`w-7 h-7 flex items-center justify-center rounded text-xs font-bold transition-colors ${
                    page === n ? "bg-[#C7E36B] text-black" : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}>
                  {n}
                </button>
              )
            )}
            <button disabled={page >= pages} onClick={() => setPage(p => p + 1)}
              className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-sm">
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
