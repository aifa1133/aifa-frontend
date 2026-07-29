import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  I, money, dateFmt, METHOD_LABEL, infFetch, CopyBtn, StatCard, StatusBadge,
} from "../../Components/influencer/ui.jsx";

export default function InfluencerDashboard() {
  const ctx = useOutletContext() || {};
  const me = ctx.me;

  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    Promise.all([
      infFetch("/api/influencer/stats"),
      infFetch("/api/influencer/referrals?page=1&limit=5"),
    ])
      .then(([s, r]) => {
        if (!alive) return;
        setStats(s);
        setRecent(r.items || []);
      })
      .catch((e) => alive && setError(e.message))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  const firstName = (me?.fullName || "there").trim().split(/\s+/)[0];
  const couponCode = stats?.couponCode || me?.couponCode || "—";
  const referralLink = stats?.referralLink || me?.referralLink || "";
  const couponRate = stats?.couponCommissionRate ?? me?.couponCommissionRate ?? 10;
  const referralRate = stats?.referralCommissionRate ?? me?.referralCommissionRate ?? 30;

  return (
    <div className="p-6 text-white max-w-[1200px]">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white">Welcome back, {firstName}</h1>
        <p className="text-xs text-gray-400 mt-1">
          Here&apos;s how your AIFA referrals are performing.
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-2.5 rounded-xl mb-5">
          {error}
        </div>
      )}

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Earnings" value={loading ? "—" : money(stats?.totalEarnings)} icon="wallet" tone="lime" />
        <StatCard label={`Coupon Earnings (${couponRate}%)`} value={loading ? "—" : money(stats?.couponEarnings)} icon="ticket" tone="blue" />
        <StatCard label={`Referral Link Earnings (${referralRate}%)`} value={loading ? "—" : money(stats?.referralLinkEarnings)} icon="link" tone="green" />
        <StatCard label="Pending Payout" value={loading ? "—" : money(stats?.pendingPayout)} icon="clock" tone="yellow" />
      </div>

      {/* COUPON + LINK */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Coupon card */}
        <div className="bg-[#0F1112] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <I name="ticket" size={15} className="text-[#C7E36B]" />
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Your Coupon Code</p>
          </div>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <span className="text-3xl font-black text-[#C7E36B] tracking-[0.08em]">{couponCode}</span>
            <CopyBtn value={couponCode} label="Copy Code" />
          </div>
          <div className="flex flex-wrap gap-2 mt-5">
            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-gray-300 font-semibold">
              Student Discount: {couponRate}%
            </span>
            <span className="px-3 py-1.5 rounded-full bg-[#C7E36B]/10 border border-[#C7E36B]/20 text-[11px] text-[#C7E36B] font-semibold">
              Commission: {couponRate}%
            </span>
          </div>
        </div>

        {/* Referral link card */}
        <div className="bg-[#0F1112] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <I name="link" size={15} className="text-[#C7E36B]" />
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Your Referral Link</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex-1 min-w-[200px] bg-white/5 border border-white/10 rounded-xl px-3 py-2.5">
              <p className="text-xs text-white break-all">{referralLink || "Not generated yet"}</p>
            </div>
            <CopyBtn value={referralLink} label="Copy Link" />
          </div>
          <p className="text-[11px] text-gray-400 mt-5">
            <span className="text-[#C7E36B] font-bold">{referralRate}% commission</span> on successful direct referrals.
          </p>
        </div>
      </div>

      {/* RECENT CONVERSIONS */}
      <div>
        <h2 className="text-sm font-bold text-white mb-3">Recent Conversions</h2>
        <div className="border border-white/10 rounded-xl overflow-hidden bg-[#0F1112]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead className="bg-white/5">
                <tr className="text-[10px] uppercase tracking-wider text-gray-500">
                  <th className="px-4 py-3 font-bold">Student</th>
                  <th className="px-4 py-3 font-bold">Program</th>
                  <th className="px-4 py-3 font-bold">Method</th>
                  <th className="px-4 py-3 font-bold">Commission</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                  <th className="px-4 py-3 font-bold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-500 text-sm">Loading conversions…</td></tr>
                ) : recent.length === 0 ? (
                  <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-500 text-sm">
                    No conversions yet. Share your coupon code or referral link to get started.
                  </td></tr>
                ) : (
                  recent.map((c) => (
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
                      <td className="px-4 py-3 text-sm text-[#C7E36B] font-bold">{money(c.commissionAmount)}</td>
                      <td className="px-4 py-3"><StatusBadge s={c.approvalStatus} /></td>
                      <td className="px-4 py-3 text-xs text-gray-400">{dateFmt(c.purchaseDate)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
