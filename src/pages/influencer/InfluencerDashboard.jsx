import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { money, METHOD_LABEL, infFetch, CopyBtn } from "../../Components/influencer/ui.jsx";

const StatusBadge = ({ s }) => {
  const styles = {
    approved: "border-green-500 text-green-400",
    completed: "border-green-500 text-green-400",
    paid: "border-green-500 text-green-400",
    pending: "border-yellow-500 text-yellow-400",
    unpaid: "border-yellow-500 text-yellow-400",
    rejected: "border-red-500 text-red-400",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${styles[s] || "border-white/20 text-gray-400"}`}>
      {s || "—"}
    </span>
  );
};

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

  const couponCode = stats?.couponCode || me?.couponCode || "—";
  const referralLink = stats?.referralLink || me?.referralLink || "";
  const couponRate = stats?.couponCommissionRate ?? me?.couponCommissionRate ?? 10;
  const referralRate = stats?.referralCommissionRate ?? me?.referralCommissionRate ?? 30;

  return (
    <div className="p-6 text-white max-w-[1200px]">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-2.5 rounded-xl mb-5">
          {error}
        </div>
      )}

      {/* STAT CARDS — no icons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Earnings", value: loading ? "—" : money(stats?.totalEarnings) },
          { label: `Coupon Earnings (${couponRate}%)`, value: loading ? "—" : money(stats?.couponEarnings) },
          { label: `Referral Link Earnings (${referralRate}%)`, value: loading ? "—" : money(stats?.referralLinkEarnings) },
          { label: "Pending Payout", value: loading ? "—" : money(stats?.pendingPayout) },
        ].map((c) => (
          <div key={c.label} className="bg-[#0F1112] border border-white/10 rounded-2xl p-5">
            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">{c.label}</p>
            <p className="text-2xl font-black text-white mt-2">{c.value}</p>
          </div>
        ))}
      </div>

      {/* COUPON + LINK */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">

        {/* Coupon card */}
        <div className="bg-[#0F1112] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Your Coupon Code</p>
            <p className="text-[11px] text-gray-500">Share your coupon to earn commission from workshop and bootcamp purchases.</p>
          </div>

          {/* Nested grey card */}
          <div className="bg-white/5 border border-white/8 rounded-xl px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[10px] text-gray-500 mb-1">Coupon</p>
              <p className="text-xl font-black text-white tracking-widest">{couponCode}</p>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-[10px] text-gray-500">Student Discount</p>
                <p className="text-sm font-bold text-white">{couponRate}%</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-gray-500">Commission</p>
                <p className="text-sm font-bold text-white">{couponRate}%</p>
              </div>
            </div>
          </div>

          <CopyBtn value={couponCode} label="Copy Coupon Code" className="w-full justify-center" />
        </div>

        {/* Referral link card */}
        <div className="bg-[#0F1112] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Your Referral Link</p>
            <p className="text-[11px] text-gray-500">
              Earn {referralRate}% commission when a student signs up directly through your referral link.
            </p>
          </div>

          <div>
            <p className="text-[10px] text-gray-500 mb-1.5">Referral URL</p>
            <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5">
              <p className="text-xs text-white break-all">{referralLink || "Not generated yet"}</p>
            </div>
            <p className="text-[11px] text-gray-500 mt-2">
              <span className="text-[#C7E36B] font-bold">{referralRate}% Commission</span> on successful direct referrals.
            </p>
          </div>

          <CopyBtn value={referralLink} label="Copy Referral Link" className="w-full justify-center" />
        </div>
      </div>

      {/* RECENT CONVERSIONS */}
      <div>
        <h2 className="text-sm font-bold text-white mb-0.5">Recent Conversions</h2>
        <p className="text-[11px] text-gray-500 mb-3">Track the latest purchases attributed to your referral assets.</p>
        <div className="border border-white/10 rounded-xl overflow-hidden bg-[#0F1112]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[540px] text-left">
              <thead className="bg-white/5">
                <tr className="text-[10px] uppercase tracking-wider text-gray-500">
                  <th className="px-4 py-3 font-bold">Student</th>
                  <th className="px-4 py-3 font-bold">Program</th>
                  <th className="px-4 py-3 font-bold">Method</th>
                  <th className="px-4 py-3 font-bold">Commission</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr><td colSpan={5} className="px-4 py-12 text-center text-gray-500 text-sm">Loading conversions…</td></tr>
                ) : recent.length === 0 ? (
                  <tr><td colSpan={5} className="px-4 py-12 text-center text-gray-500 text-sm">
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
                      <td className="px-4 py-3 text-xs text-gray-300">{METHOD_LABEL[c.method] || c.method || "—"}</td>
                      <td className="px-4 py-3 text-sm text-white font-bold">{money(c.commissionAmount)}</td>
                      <td className="px-4 py-3"><StatusBadge s={c.approvalStatus} /></td>
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
