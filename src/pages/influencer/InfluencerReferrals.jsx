import { useEffect, useState, useCallback } from "react";
import { I, money, dateFmt, infFetch } from "../../Components/influencer/ui.jsx";

export default function InfluencerReferrals() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    const qs = new URLSearchParams({ page: String(page), limit: "20" });
    if (search.trim()) qs.set("search", search.trim());
    infFetch(`/api/influencer/referrals?${qs}`)
      .then((d) => {
        setItems(d.items || []);
        setTotal(d.total || 0);
        setPages(d.pages || 1);
        setError("");
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [page, search]);

  useEffect(() => {
    const t = setTimeout(load, search ? 350 : 0);
    return () => clearTimeout(t);
  }, [load]);

  return (
    <div className="p-6 text-white max-w-[1100px]">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white">Referrals</h1>
        <p className="text-xs text-gray-400 mt-1">
          Every student who signed up through your referral link or coupon code.
        </p>
      </div>

      {/* SEARCH */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[220px]">
          <I name="search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by name or email…"
            className="w-full bg-[#0F1112] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/60"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-2.5 rounded-xl mb-4">
          {error}
        </div>
      )}

      {/* TABLE */}
      <div className="border border-white/10 rounded-xl overflow-hidden bg-[#0F1112]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead className="bg-white/5">
              <tr className="text-[10px] uppercase tracking-wider text-gray-500">
                <th className="px-4 py-3 font-bold">Student</th>
                <th className="px-4 py-3 font-bold">Joined On</th>
                <th className="px-4 py-3 font-bold">Purchases</th>
                <th className="px-4 py-3 font-bold">Amount Earned</th>
                <th className="px-4 py-3 font-bold">Last Purchase</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-gray-500 text-sm">Loading…</td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-gray-500 text-sm">
                  No referrals yet. Share your referral link to get started.
                </td></tr>
              ) : (
                items.map((r) => (
                  <tr key={r._id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm text-white font-semibold">{r.studentName || "—"}</p>
                      <p className="text-[11px] text-gray-500">{r.studentEmail}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">{dateFmt(r.joinedAt)}</td>
                    <td className="px-4 py-3">
                      {r.purchaseCount > 0 ? (
                        <span className="text-xs font-bold px-2 py-1 rounded-lg bg-[#C7E36B]/10 text-[#C7E36B]">
                          {r.purchaseCount} purchase{r.purchaseCount !== 1 ? "s" : ""}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-600">No purchases yet</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {r.totalEarned > 0 ? (
                        <p className="text-sm text-[#C7E36B] font-black">{money(r.totalEarned)}</p>
                      ) : (
                        <p className="text-sm text-gray-600">—</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">
                      {r.lastPurchase ? dateFmt(r.lastPurchase) : "—"}
                    </td>
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
