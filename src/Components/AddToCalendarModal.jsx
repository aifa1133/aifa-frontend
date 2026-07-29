export default function AddToCalendarModal({ item, onSkip, onDone }) {
  const scheduledAt = item?.scheduledAt ? new Date(item.scheduledAt) : null;

  const dateStr = scheduledAt
    ? scheduledAt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Kolkata" })
    : "Date TBD";

  const startTime = scheduledAt
    ? scheduledAt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" })
    : "Time TBD";

  // Compute end time from duration
  const endTime = (() => {
    if (!scheduledAt || !item?.duration) return null;
    const hrs = parseInt(item.duration) || 2;
    const end = new Date(scheduledAt.getTime() + hrs * 3600000);
    return end.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" });
  })();

  const fmt = d => d?.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const gcStart = scheduledAt ? fmt(scheduledAt) : "";
  const gcEnd   = scheduledAt && item?.duration
    ? fmt(new Date(scheduledAt.getTime() + (parseInt(item.duration) || 2) * 3600000))
    : gcStart;

  const gcLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(item?.title || "")}&dates=${gcStart}/${gcEnd}&details=${encodeURIComponent("AIFA Workshop")}&location=Online`;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
      <div className="w-full max-w-[380px] bg-[#0F1112] rounded-2xl p-6 border border-white/10 shadow-2xl">

        {/* Header */}
        <div className="flex items-start justify-between mb-1">
          <div>
            <h3 className="text-white font-black text-base">Add to Calendar</h3>
            <p className="text-gray-400 text-xs mt-0.5">Save this {item?.type || "course"} schedule</p>
          </div>
          <button onClick={onSkip} className="text-gray-500 hover:text-white text-lg leading-none mt-0.5">✕</button>
        </div>

        {/* Event details */}
        <div className="mt-4 flex flex-col gap-2.5">
          <div className="flex items-center gap-3">
            <span className="text-lg">📅</span>
            <span className="text-white text-sm font-semibold">{item?.title}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lg">🗓</span>
            <span className="text-gray-300 text-sm">{dateStr}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lg">⏰</span>
            <span className="text-gray-300 text-sm">{startTime}{endTime ? ` - ${endTime}` : ""}</span>
          </div>
        </div>

        {/* Calendar options */}
        <div className="mt-5 flex flex-col gap-2">
          <a href={gcLink} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all cursor-pointer"
            onClick={onDone}>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded flex items-center justify-center text-sm">🗓</div>
              <span className="text-white text-sm font-semibold">Google Calendar</span>
            </div>
            <span className="text-gray-400 text-sm">›</span>
          </a>

          <button onClick={onDone}
            className="flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all w-full text-left">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded flex items-center justify-center text-sm">📱</div>
              <span className="text-white text-sm font-semibold">Apple Calendar</span>
            </div>
            <span className="text-gray-400 text-sm">›</span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-5">
          <button onClick={onSkip}
            className="flex-1 py-2.5 text-gray-400 font-semibold text-sm hover:text-white transition-all">
            Skip
          </button>
          <button onClick={onDone}
            className="flex-1 bg-[#C7E36B] text-black font-black text-sm py-2.5 rounded-xl hover:opacity-90 transition-all">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
