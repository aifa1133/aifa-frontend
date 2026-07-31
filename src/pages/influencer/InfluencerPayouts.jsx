import { useEffect, useState, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { I, money, dateFmt, infFetch, StatusBadge } from "../../Components/influencer/ui.jsx";

const METHOD_LABEL = { bank_transfer: "Bank Transfer", upi: "UPI" };

const maskAccount = (n) => {
  const s = String(n || "");
  if (!s) return "—";
  if (s.length <= 4) return `••••${s}`;
  return `${"•".repeat(Math.max(4, s.length - 4))}${s.slice(-4)}`;
};

const Field = ({ label, value, onChange, placeholder = "" }) => (
  <div>
    <label className="block text-[11px] text-gray-400 font-semibold mb-1.5">{label}</label>
    <input
      value={value ?? ""}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/60 transition-colors"
    />
  </div>
);

export default function InfluencerPayouts() {
  const ctx = useOutletContext() || {};
  const { me, setMe } = ctx;

  const [stats, setStats] = useState(null);
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const flash = (m) => { setToast(m); setTimeout(() => setToast(""), 2800); };

  const [showConfirm, setShowConfirm] = useState(false);
  const [requesting, setRequesting] = useState(false);

  const [editingBank, setEditingBank] = useState(false);
  const [bankForm, setBankForm] = useState({});
  const [savingBank, setSavingBank] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    Promise.all([infFetch("/api/influencer/stats"), infFetch("/api/influencer/payouts")])
      .then(([s, p]) => { setStats(s); setPayouts(Array.isArray(p) ? p : []); setError(""); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const totalEarned = stats?.totalEarnings || 0;
  const totalPaid = stats?.totalPaid || 0;
  const outstanding = stats?.pendingPayout || 0;

  const requestPayout = async () => {
    setRequesting(true);
    try {
      await infFetch("/api/influencer/payouts/request", { method: "POST" });
      setShowConfirm(false);
      flash("Payout request submitted");
      load();
    } catch (e) { flash(e.message); }
    setRequesting(false);
  };

  const startEditBank = () => {
    setBankForm({
      bankAccountHolder: me?.bankAccountHolder || "",
      bankName: me?.bankName || "",
      bankAccountNumber: me?.bankAccountNumber || "",
      bankIFSC: me?.bankIFSC || "",
      upiId: me?.upiId || "",
    });
    setEditingBank(true);
  };

  const saveBank = async () => {
    setSavingBank(true);
    try {
      const updated = await infFetch("/api/influencer/bank-details", {
        method: "PUT",
        body: JSON.stringify(bankForm),
      });
      if (setMe) setMe(updated);
      localStorage.setItem("influencer_user", JSON.stringify(updated));
      setEditingBank(false);
      flash("Bank details updated");
    } catch (e) { flash(e.message); }
    setSavingBank(false);
  };

  const hasPending = payouts.some((p) => p.status === "pending");

  return (
    <div className="p-6 text-white max-w-[1200px]">
      {toast && (
        <div className="fixed top-5 right-5 z-[10000] bg-[#C7E36B] text-black text-sm font-bold px-4 py-2.5 rounded-xl shadow-2xl">
          {toast}
        </div>
      )}

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white">Payouts</h1>
        <p className="text-xs text-gray-400 mt-1">Track your commissions and payout history.</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-2.5 rounded-xl mb-5">
          {error}
        </div>
      )}

      {/* STATS + REQUEST PAYOUT — 4-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {/* Stat: Total Earned */}
        <div className="bg-[#0F1112] border border-white/10 rounded-2xl p-5">
          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">Total Earned</p>
          <p className="text-2xl font-black text-white mt-2">{loading ? "—" : money(totalEarned)}</p>
        </div>

        {/* Stat: Total Paid */}
        <div className="bg-[#0F1112] border border-white/10 rounded-2xl p-5">
          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">Total Paid</p>
          <p className="text-2xl font-black text-white mt-2">{loading ? "—" : money(totalPaid)}</p>
          <p className="text-[10px] text-gray-500 mt-1">Processed payouts</p>
        </div>

        {/* Stat: Outstanding */}
        <div className="bg-[#0F1112] border border-white/10 rounded-2xl p-5">
          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">Outstanding</p>
          <p className="text-2xl font-black text-white mt-2">{loading ? "—" : money(outstanding)}</p>
        </div>

        {/* Request Payout card */}
        <div className="bg-[#0F1112] border border-white/10 rounded-2xl p-5 flex flex-col justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-white">Request your available earnings</p>
            <p className="text-[11px] text-gray-500 mt-1">Bank transfer or UPI based on saved details.</p>
          </div>
          <button
            onClick={() => setShowConfirm(true)}
            disabled={loading || outstanding <= 0 || hasPending}
            title={hasPending ? "You already have a pending request" : undefined}
            className="w-full bg-[#C7E36B] text-black text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-[#d4ec85] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Request Payout
          </button>
        </div>
      </div>

      {/* PAYOUT HISTORY */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-white mb-0.5">Payout History</h2>
        <p className="text-[11px] text-gray-500 mb-3">Review all requested and completed payouts.</p>
        <div className="border border-white/10 rounded-xl overflow-hidden bg-[#0F1112]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead className="bg-white/5">
                <tr className="text-[10px] uppercase tracking-wider text-gray-500">
                  <th className="px-4 py-3 font-bold">Payout ID</th>
                  <th className="px-4 py-3 font-bold">Requested On</th>
                  <th className="px-4 py-3 font-bold">Amount</th>
                  <th className="px-4 py-3 font-bold">Payment Method</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr><td colSpan={5} className="px-4 py-12 text-center text-gray-500 text-sm">Loading payouts…</td></tr>
                ) : payouts.length === 0 ? (
                  <tr><td colSpan={5} className="px-4 py-12 text-center text-gray-500 text-sm">
                    No payouts requested yet.
                  </td></tr>
                ) : (
                  payouts.map((p) => (
                    <tr key={p._id} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 text-xs font-bold text-white">{p.payoutId}</td>
                      <td className="px-4 py-3 text-xs text-gray-400">{dateFmt(p.requestedOn)}</td>
                      <td className="px-4 py-3 text-sm text-[#C7E36B] font-bold">{money(p.amount)}</td>
                      <td className="px-4 py-3 text-xs text-gray-300">{METHOD_LABEL[p.paymentMethod] || p.paymentMethod}</td>
                      <td className="px-4 py-3"><StatusBadge s={p.status} /></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* BANK DETAILS */}
      {!editingBank && (
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-white">Bank Details</h2>
          <button onClick={startEditBank}
            className="text-[11px] font-bold text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors">
            Edit Bank Details
          </button>
        </div>
      )}

      <div className="bg-[#0F1112] border border-white/10 rounded-2xl p-5">
        {!editingBank ? (
          <>
            <p className="text-[11px] text-gray-500 mb-4">Your payouts are sent using the details below.</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: "Account Holder", value: me?.bankAccountHolder },
                { label: "Bank", value: me?.bankName },
                { label: "Account Number", value: me?.bankAccountNumber ? maskAccount(me.bankAccountNumber) : null },
                { label: "IFSC", value: me?.bankIFSC },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/5 border border-white/8 rounded-xl p-4">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1.5">{label}</p>
                  <p className="text-sm font-semibold text-white break-all">{value || "—"}</p>
                </div>
              ))}
            </div>
            {me?.upiId && (
              <div className="mt-3 bg-white/5 border border-white/8 rounded-xl p-4 inline-block">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1.5">UPI ID</p>
                <p className="text-sm font-semibold text-white">{me.upiId}</p>
              </div>
            )}
            {!me?.bankAccountNumber && !me?.upiId && (
              <p className="text-[11px] text-yellow-400 mt-3">
                Add your bank details or a UPI ID before requesting a payout.
              </p>
            )}
          </>
        ) : (
          <div className="space-y-5">
            <div>
              <p className="text-sm font-bold text-white mb-0.5">Edit Banking Details</p>
              <p className="text-[11px] text-gray-500">Update the payout account used for bank transfers or UPI withdrawals.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">Account Holder</label>
                <input value={bankForm.bankAccountHolder ?? ""} onChange={(e) => setBankForm({ ...bankForm, bankAccountHolder: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/60 transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">Bank</label>
                <input value={bankForm.bankName ?? ""} onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/60 transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">Account Number</label>
                <input value={bankForm.bankAccountNumber ?? ""} onChange={(e) => setBankForm({ ...bankForm, bankAccountNumber: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/60 transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">IFSC Code</label>
                <input value={bankForm.bankIFSC ?? ""} onChange={(e) => setBankForm({ ...bankForm, bankIFSC: e.target.value.toUpperCase() })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/60 transition-colors" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">UPI ID</label>
                <input value={bankForm.upiId ?? ""} onChange={(e) => setBankForm({ ...bankForm, upiId: e.target.value })} placeholder="name@bank"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#C7E36B]/60 transition-colors" />
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setEditingBank(false)}
                className="px-5 py-2.5 rounded-xl bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors">
                Cancel
              </button>
              <button onClick={saveBank} disabled={savingBank}
                className="px-5 py-2.5 rounded-xl bg-[#C7E36B] text-black text-sm font-bold hover:bg-[#d4ec85] disabled:opacity-50 transition-colors">
                {savingBank ? "Saving…" : "Save Banking Details"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CONFIRM MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/75 z-[9999] flex items-center justify-center p-4">
          <div className="bg-[#0F1112] border border-white/10 rounded-2xl w-full max-w-sm p-6">
            <div className="w-12 h-12 rounded-full bg-[#C7E36B]/10 flex items-center justify-center mb-4">
              <I name="wallet" size={22} className="text-[#C7E36B]" />
            </div>
            <h3 className="text-white font-bold text-base mb-1">Request Payout?</h3>
            <p className="text-xs text-gray-400 mb-5">
              You are requesting a payout of your full approved balance. The AIFA finance team will process it
              to your saved {me?.bankAccountNumber ? "bank account" : "UPI ID"}.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
              <p className="text-[10px] text-gray-500 uppercase font-bold">Payout Amount</p>
              <p className="text-2xl font-black text-[#C7E36B] mt-1">{money(outstanding)}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors">
                Cancel
              </button>
              <button onClick={requestPayout} disabled={requesting}
                className="flex-1 py-2.5 rounded-xl bg-[#C7E36B] text-black text-sm font-bold hover:bg-[#d4ec85] disabled:opacity-50 transition-colors">
                {requesting ? "Submitting…" : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
